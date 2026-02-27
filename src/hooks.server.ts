import { handle_session } from '$lib/server/sessions'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	handle_session(event)

	return await resolve(event)
}
