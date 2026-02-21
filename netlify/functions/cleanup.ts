import { type Client, createClient } from '@libsql/client/web'
import type { Config } from '@netlify/functions'

export const config: Config = {
	schedule: '@monthly',
}

export default async () => {
	if (!process.env.DB_URL) {
		console.error('Missing DB_URL')
		return
	}

	if (!process.env.DB_AUTH_TOKEN) {
		console.error('Missing DB_AUTH_TOKEN')
		return
	}

	const db = createClient({
		authToken: process.env.DB_AUTH_TOKEN,
		url: process.env.DB_URL,
	})

	console.info('Start cleanup...')

	try {
		await remove_aggregated_sessions(db)
		await remove_aggregated_visits(db)
	} catch (err) {
		console.error(err)
	}

	console.info('Cleanup finished')
}

async function remove_aggregated_sessions(db: Client) {
	console.info('Remove aggregated sessions...')

	const sql = `
        DELETE FROM sessions_live
        WHERE aggregated_at IS NOT NULL
        AND aggregated_at < datetime('now', '-7 days')`

	try {
		const res = await db.execute(sql)
		console.info(`Removed ${res.rowsAffected} sessions`)
	} catch (err) {
		console.error('Failed to remove sessions:', err)
	}
}

async function remove_aggregated_visits(db: Client) {
	console.info(`Remove aggregated visits...`)

	const sql = `
        DELETE FROM visits_live
        WHERE aggregated_at IS NOT NULL
        AND aggregated_at < datetime('now', '-7 days')`

	try {
		const res = await db.execute(sql)
		console.info(`Removed ${res.rowsAffected} visits`)
	} catch (err) {
		console.error('Failed to remove visits:', err)
	}
}
