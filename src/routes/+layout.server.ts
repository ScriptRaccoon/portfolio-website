import { TRACKED_PATHS } from '#lib/server/config.js'

export const prerender = true

export const load = async () => {
	return { tracked_paths: TRACKED_PATHS }
}
