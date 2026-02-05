import type { RequestEvent } from '@sveltejs/kit'
import crypto from 'node:crypto'

const SESSION_COOKIE = 'session_id'

export function handle_session(event: RequestEvent) {
	const saved_session_id = event.cookies.get(SESSION_COOKIE)

	if (saved_session_id) {
		event.locals.session_id = saved_session_id
		return
	}

	const session_id = crypto.randomUUID()

	event.cookies.set(SESSION_COOKIE, session_id, {
		path: '/',
		maxAge: 60 * 60, // 1h
		sameSite: true,
		httpOnly: true,
		secure: true,
	})

	event.locals.session_id = session_id
}
