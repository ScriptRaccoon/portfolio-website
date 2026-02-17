import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { db } from '$lib/server/db'

function is_valid_body(body: unknown): body is { theme: string } {
	return (
		typeof body === 'object' &&
		body !== null &&
		'theme' in body &&
		typeof body.theme === 'string'
	)
}

/**
 * temporary endpoint to estimate how many users are using which theme
 */
export const POST: RequestHandler = async (event) => {
	const body: unknown = await event.request.json()

	if (!is_valid_body(body)) {
		return json({ error: 'Invalid request body' }, { status: 400 })
	}

	const { theme } = body

	const sql = `
        UPDATE theme_stats
        SET count = count + 1
        WHERE theme = ?`

	try {
		await db.execute(sql, [theme])
	} catch (err) {
		console.error(err)
		return json({ error: 'Database error' }, { status: 500 })
	}

	return json({ message: 'Theme has been tracked successfully' })
}
