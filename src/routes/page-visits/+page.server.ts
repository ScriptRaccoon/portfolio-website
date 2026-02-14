import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { add_month } from '$lib/server/utils'
import { PAGEVISITS_CREDENTIALS } from '$env/static/private'

export const prerender = false

const sql_visits = `
	SELECT path, month, visits
	FROM page_visits
	ORDER BY path, month`

const sql_month_range = `
	SELECT
		MIN(month) as min_month,
		MAX(month) as max_month
	FROM page_visits`

const sql_logs = `
	SELECT date, path, country
	FROM page_visit_logs
	ORDER BY date DESC`

export const load: PageServerLoad = async (event) => {
	const auth_header = event.request.headers.get('authorization')

	if (auth_header !== `Basic ${btoa(PAGEVISITS_CREDENTIALS)}`) {
		event.setHeaders({ 'WWW-Authenticate': 'Basic realm="Protected"' })
		error(401, 'Unauthorized')
	}

	try {
		const [res_visits, res_month_range, res_logs] = await db.batch([
			{ sql: sql_visits },
			{ sql: sql_month_range },
			{ sql: sql_logs },
		])

		const min_month = res_month_range.rows[0].min_month as string | null
		const max_month = res_month_range.rows[0].max_month as string | null

		const month_list: string[] = []

		if (min_month && max_month) {
			month_list.push(min_month)
			let current_month = min_month
			while (current_month !== max_month) {
				current_month = add_month(current_month)
				month_list.push(current_month)
			}
		}

		const rows = res_visits.rows as unknown as {
			path: string
			month: string
			visits: number
		}[]

		type PathsRec = Record<
			string,
			{ total: number; monthly_visits: Record<string, number> }
		>

		const paths_rec: PathsRec = {}

		for (const { path, month, visits } of rows) {
			paths_rec[path] ??= {
				total: 0,
				monthly_visits: Object.fromEntries(
					month_list.map((m) => [m, 0]),
				),
			}

			paths_rec[path].total += visits
			paths_rec[path].monthly_visits[month] = visits
		}

		const paths = Object.entries(paths_rec)
			.map(([path, { total, monthly_visits }]) => ({
				path,
				total,
				monthly_visits: Object.entries(monthly_visits),
			}))
			.sort((a, b) => b.total - a.total)

		const logs_objects = res_logs.rows as unknown as {
			date: string
			path: string
			country: string | null
		}[]

		const logs = logs_objects.map((log) => [
			log.date,
			log.path,
			log.country ?? '',
		])

		return { paths, logs }
	} catch (err) {
		console.error(err)
		error(500, 'Could not load page visits')
	}
}
