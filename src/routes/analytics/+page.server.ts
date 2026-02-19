import { query } from '$lib/server/db'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { add_percentages } from '$lib/server/utils'
import { PAGEVISITS_CREDENTIALS } from '$env/static/private'

export const prerender = false

type SessionLive = {
	id: string
	created_at: string
	referrer: string
	browser: string | null
	os: string | null
	country: string | null
	city: string | null
	theme: string
}

type SessionsMonthly = {
	month: string
	counter: number
}

type ReferrersTotal = {
	referrer: string
	counter: number
}

type BrowsersTotal = {
	browser: string
	counter: number
}

type OSTotal = {
	os: string
	counter: number
}

type CountriesTotal = {
	country: string
	counter: number
}

type ThemesTotal = {
	theme: string
	counter: number
}

type VisitLive = {
	id: number
	session_id: string
	path: string
	created_at: string
}

type VisitMonthly = {
	id: number
	month: string
	path: string
	counter: number
}

type MonthlyGroupedVisits = Record<string, { month: string; counter: number }[]>

export const load: PageServerLoad = async (event) => {
	const auth_header = event.request.headers.get('authorization')

	if (auth_header !== `Basic ${btoa(PAGEVISITS_CREDENTIALS)}`) {
		event.setHeaders({ 'WWW-Authenticate': 'Basic realm="Protected"' })
		error(401, 'Unauthorized')
	}

	const sql_sessions_live = `
        SELECT
            id, created_at, referrer, browser, os, country, city, theme
        FROM sessions_live
        WHERE aggregated_at IS NULL
        ORDER BY created_at DESC`

	const { rows: sessions_live, err: err_sessions_live } =
		await query<SessionLive>(sql_sessions_live)
	if (err_sessions_live) error(500, 'Could not load live sessions')

	const sql_sessions_monthly = `
        SELECT month, counter
        FROM sessions_monthly
        ORDER BY month ASC`

	const { rows: sessions_monthly, err: err_sessions_monthly } =
		await query<SessionsMonthly>(sql_sessions_monthly)
	if (err_sessions_monthly) error(500, 'Could not load monthly sessions')

	const sql_referrers_total = `
        SELECT referrer, counter
        FROM referrers_total
        ORDER BY counter DESC`

	const { rows: referrers_total, err: err_referrers_total } =
		await query<ReferrersTotal>(sql_referrers_total)
	if (err_referrers_total) error(500, 'Could not load referrers')

	const sql_browsers_total = `
        SELECT browser, counter
        FROM browsers_total
        ORDER BY counter DESC`

	const { rows: browsers_total, err: err_browsers_total } =
		await query<BrowsersTotal>(sql_browsers_total)
	if (err_browsers_total) error(500, 'Could not load browsers')

	const sql_os_total = `
        SELECT os, counter
        FROM os_total
        ORDER BY counter DESC`

	const { rows: os_total, err: err_os_total } =
		await query<OSTotal>(sql_os_total)
	if (err_os_total) error(500, 'Could not load operating systems')

	const sql_countries_total = `
        SELECT country, counter
        FROM countries_total
        ORDER BY counter DESC`

	const { rows: countries_total, err: err_countries_total } =
		await query<CountriesTotal>(sql_countries_total)
	if (err_countries_total) error(500, 'Could not load countries')

	const sql_themes_total = `
        SELECT theme, counter
        FROM themes_total
        ORDER BY counter DESC`

	const { rows: themes_total, err: err_themes_total } =
		await query<ThemesTotal>(sql_themes_total)
	if (err_themes_total) error(500, 'Could not load themes')

	const sql_visits_live = `
		SELECT
			id, session_id, path, created_at
		FROM visits_live
		WHERE aggregated_at IS NULL
		ORDER BY created_at DESC`

	const { rows: visits_live, err: err_visits_live } =
		await query<VisitLive>(sql_visits_live)
	if (err_visits_live) error(500, 'Could not load live visits')

	const sql_visits_monthly = `
		SELECT
			id, month, path, counter
		FROM visits_monthly
		ORDER BY path, month ASC`

	const { rows: visits_monthly, err: err_visits_monthly } =
		await query<VisitMonthly>(sql_visits_monthly)
	if (err_visits_monthly) error(500, 'Could not load monthly visits')

	const grouped_visits_monthly: MonthlyGroupedVisits = {}

	for (const visit of visits_monthly) {
		const { path, month, counter } = visit
		grouped_visits_monthly[path] ??= []
		grouped_visits_monthly[path].push({ month, counter })
	}

	return {
		sessions_live,
		sessions_monthly,
		referrers_total: add_percentages(referrers_total),
		browsers_total: add_percentages(browsers_total),
		os_total: add_percentages(os_total),
		countries_total: add_percentages(countries_total),
		themes_total: add_percentages(themes_total),
		visits_live,
		grouped_visits_monthly,
	}
}
