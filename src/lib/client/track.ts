import { browser } from '$app/environment'

export const NOTRACK_STORAGE_KEY = 'notrack'

export async function track_view(path: string, tracked_paths: string[]) {
	if (!browser || window.localStorage.getItem(NOTRACK_STORAGE_KEY)) {
		return
	}

	const trackable =
		tracked_paths.includes(path) ||
		tracked_paths.some(
			(p) =>
				p.endsWith('*') &&
				path.startsWith(p.substring(0, p.length - 1)),
		)

	if (!trackable) return

	try {
		await fetch('/api/track', {
			method: 'POST',
			body: JSON.stringify({ path }),
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (err) {
		console.error(err)
	}
}
