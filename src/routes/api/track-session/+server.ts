import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { query } from '$lib/server/db'
import * as v from 'valibot'
import { get_device_data, get_geo_data } from '$lib/server/utils'
import { is_same_origin } from '$lib/server/utils'
import { is_bot } from '$lib/server/utils'

const request_body_schema = v.object({
	theme: v.pipe(v.string(), v.nonEmpty()),
	referrer: v.pipe(v.string(), v.nonEmpty()),
})

export const POST: RequestHandler = async (event) => {
	if (!is_same_origin(event.request, event.url.origin)) {
		return json({ error: 'Forbidden' }, { status: 403 })
	}

	if (is_bot(event.request)) {
		return json({ error: 'Forbidden' }, { status: 403 })
	}

	if (event.request.headers.get('Content-Type') !== 'application/json') {
		return json({ error: 'Forbidden' }, { status: 403 })
	}

	const body: unknown = await event.request.json()

	const parsed_body = v.safeParse(request_body_schema, body)

	if (!parsed_body.success) {
		return json({ error: 'Invalid request body' }, { status: 400 })
	}

	const { theme, referrer } = parsed_body.output

	const session_id = event.locals.session_id

	const user_agent = event.request.headers.get('user-agent') || null

	const { browser, os } = get_device_data(event.request)
	const { country, city } = get_geo_data(event.request)

	const sql = `
		INSERT INTO sessions_live
			(id, referrer, user_agent, browser, os, country, city, theme)
		VALUES
			(?, ?, ?, ?, ?, ?, ?, ?)
		ON CONFLICT (id) DO NOTHING`

	const args = [
		session_id,
		referrer,
		user_agent,
		browser,
		os,
		country,
		city,
		theme,
	]

	const { err } = await query(sql, args)

	if (err) return json({ error: 'Database error' }, { status: 500 })

	return json({ message: 'Session has been tracked' })
}
