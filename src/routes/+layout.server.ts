import { TRACKED_PATHS } from '$lib/server/config'

export const prerender = true

export const load = async () => {
	return { tracked_paths: TRACKED_PATHS }
}
