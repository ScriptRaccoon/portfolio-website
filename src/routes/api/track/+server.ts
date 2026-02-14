import { json, type RequestHandler } from '@sveltejs/kit'
import { Crawler } from 'es6-crawler-detect'
import { get_current_month } from '$lib/server/utils'
import { db } from '$lib/server/db'
import { TRACKED_PATHS } from '$lib/server/config'

const CrawlerDetector = new Crawler()

const visits_cache: Map<string, number> = new Map()

function clean_cache() {
	const now = Date.now()
	for (const [key, expires_at] of visits_cache.entries()) {
		if (expires_at <= now) visits_cache.delete(key)
	}
}

function is_valid_body(body: unknown): body is { path: string } {
	return (
		typeof body === 'object' &&
		body !== null &&
		'path' in body &&
		typeof body.path === 'string'
	)
}

function is_same_origin(request: Request, site_origin: string): boolean {
	const origin = request.headers.get('origin')
	const referer = request.headers.get('referer')

	if (origin !== null) return origin === site_origin
	if (referer !== null) return referer.startsWith(site_origin)

	return false
}

export const POST: RequestHandler = async (event) => {
	if (!is_same_origin(event.request, event.url.origin)) {
		return json({ error: 'Forbidden' }, { status: 403 })
	}

	const ua = event.request.headers.get('user-agent') ?? ''
	if (CrawlerDetector.isCrawler(ua)) {
		return json({ error: 'Forbidden' }, { status: 403 })
	}

	const content_type = event.request.headers.get('Content-Type')
	if (content_type !== 'application/json') {
		return json({ error: 'Forbidden' }, { status: 403 })
	}

	const body: unknown = await event.request.json()

	if (!is_valid_body(body)) {
		return json({ error: 'Invalid request body' }, { status: 400 })
	}

	const { path } = body

	const trackable =
		TRACKED_PATHS.includes(path) ||
		TRACKED_PATHS.some(
			(p) =>
				p.endsWith('*') &&
				path.startsWith(p.substring(0, p.length - 1)),
		)

	if (!trackable) {
		return json({ error: 'Forbidden' }, { status: 403 })
	}

	const session_id = event.locals.session_id

	clean_cache()

	const cache_key = `${session_id}:${path}`
	if (visits_cache.has(cache_key)) {
		return json({ message: 'Page visit has been tracked before' })
	}

	const month = get_current_month()

	const country = event.request.headers.get('x-country')

	const sql_month = `
        INSERT INTO page_visits
            (path, month, visits)
        VALUES
            (?, ?, 1)
        ON CONFLICT (path, month)
            DO UPDATE SET visits = visits + 1`

	const sql_log = `
		INSERT INTO page_visit_logs
			(path, country)
		VALUES (?, ?)`

	try {
		await db.batch([
			{ sql: sql_month, args: [path, month] },
			{ sql: sql_log, args: [path, country] },
		])
	} catch (err) {
		console.error(err)
		return json({ error: 'Database error' }, { status: 500 })
	}

	const expires_at = Date.now() + 1000 * 60 * 60 // 1h
	visits_cache.set(cache_key, expires_at)

	return json({ message: 'Page visit has been tracked successfully' })
}
