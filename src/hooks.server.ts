import { handle_session } from '$lib/server/sessions'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	handle_session(event)

	// TEMP LOGS
	console.info({
		method: event.request.method,
		path: event.url.pathname,
		date: new Date().toISOString(),
		ua: event.request.headers.get('user-agent'),
		session_id: event.locals.session_id,
	})

	return await resolve(event)
}
