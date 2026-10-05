import type { Handle } from '@sveltejs/kit/hooks'
import { handle_session } from '#lib/server/sessions.js'

export const handle: Handle = async ({ event, resolve }) => {
	handle_session(event)

	return await resolve(event)
}
