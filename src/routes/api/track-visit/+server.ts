import { json, type RequestHandler } from '@sveltejs/kit'
import { is_bot, is_same_origin } from '$lib/server/utils'
import { query } from '$lib/server/db'
import { TRACKED_PATHS } from '$lib/server/config'
import * as v from 'valibot'

const request_body_schema = v.object({
	path: v.pipe(
		v.string(),
		v.nonEmpty(),
		v.check((path) => path.startsWith('/')),
	),
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

	const { path } = parsed_body.output

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

	const sql = `
		INSERT INTO visits_live
			(session_id, path)
		VALUES (?, ?)
		ON CONFLICT DO NOTHING`

	const args = [session_id, path]

	const { err } = await query(sql, args)

	if (err) return json({ error: 'Database error' }, { status: 500 })

	return json({ message: 'Page visit has been tracked' })
}
