import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/server/db'
import { add_month } from '$lib/server/utils'

export const prerender = false

const sql_stats = `
	SELECT path, month, visits
	FROM page_stats
	ORDER BY path, month`

const sql_month_range = `
	SELECT
		MIN(month) as min_month,
		MAX(month) as max_month
	FROM page_stats`

export const load: PageServerLoad = async () => {
	try {
		const [res_stats, res_month_range] = await db.batch([
			{ sql: sql_stats },
			{ sql: sql_month_range },
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

		const rows = res_stats.rows as unknown as {
			path: string
			month: string
			visits: number
		}[]

		type PathsRec = Record<
			string,
			{ total: number; monthly: Record<string, number> }
		>

		const paths_rec: PathsRec = {}

		for (const { path, month, visits } of rows) {
			paths_rec[path] ??= {
				total: 0,
				monthly: Object.fromEntries(month_list.map((m) => [m, 0])),
			}

			paths_rec[path].total += visits
			paths_rec[path].monthly[month] = visits
		}

		const paths = Object.entries(paths_rec)
			.map(([path, { total, monthly }]) => ({
				path,
				total,
				monthly: Object.entries(monthly),
			}))
			.sort((a, b) => b.total - a.total)

		return { paths }
	} catch (err) {
		console.error(err)
		error(500, 'Could not load stats')
	}
}
