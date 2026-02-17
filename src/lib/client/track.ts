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

/**
 * temporary code to estimate how many users are using which theme
 */
export async function track_theme(theme: 'dark' | 'light') {
	if (!browser) return
	if (window.sessionStorage.getItem('tracked-theme')) return
	if (window.localStorage.getItem(NOTRACK_STORAGE_KEY)) return

	try {
		await fetch('/api/track-theme', {
			method: 'POST',
			body: JSON.stringify({ theme }),
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (err) {
		console.error(err)
	}

	window.sessionStorage.setItem('tracked-theme', '1')
}
