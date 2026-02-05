import { TRACKED_PATHS } from '$lib/server/config'

export const prerender = true

export const load = async () => {
	const meta = {
		title: 'Script Raccoon - Web developer',
		description:
			'Find more about me and my personal projects in web development',
	}
	return { meta, tracked_paths: TRACKED_PATHS }
}
