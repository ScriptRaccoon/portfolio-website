import { browser } from '$app/environment'

export const NOTRACK_STORAGE_KEY = 'notrack'
const TRACKED_SESSION_KEY = 'tracked-session'

export async function track_session(theme: 'dark' | 'light') {
	if (!browser) return
	if (window.localStorage.getItem(NOTRACK_STORAGE_KEY)) return
	if (window.sessionStorage.getItem(TRACKED_SESSION_KEY)) return

	const referrer = document.referrer || 'unknown'
	const viewport_width = window.innerWidth

	try {
		await fetch('/api/track-session', {
			method: 'POST',
			body: JSON.stringify({ theme, referrer, viewport_width }),
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (err) {
		console.error(err)
	}

	window.sessionStorage.setItem(TRACKED_SESSION_KEY, '1')
}

export async function track_visit(path: string, tracked_paths: string[]) {
	if (!browser) return
	if (window.localStorage.getItem(NOTRACK_STORAGE_KEY)) return

	const trackable =
		tracked_paths.includes(path) ||
		tracked_paths.some(
			(p) =>
				p.endsWith('*') &&
				path.startsWith(p.substring(0, p.length - 1)),
		)

	if (!trackable) return

	try {
		await fetch('/api/track-visit', {
			method: 'POST',
			body: JSON.stringify({ path }),
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (err) {
		console.error(err)
	}
}
