import { type Client, createClient } from '@libsql/client/web'
import type { Config } from '@netlify/functions'

export const config: Config = {
	schedule: '@daily',
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

	console.info('Start aggregation...')

	try {
		await aggregate_monthly_sessions(db)
		await aggregate_monthly_visits(db)
	} catch (err) {
		console.error(err)
	}

	console.info('Aggregation finished')
}

async function aggregate_monthly_sessions(db: Client) {
	console.info('Aggregate monthly sessions...')

	const tx = await db.transaction('write')

	try {
		const res_update = await tx.execute(`
            UPDATE sessions_live
            SET aggregated_at = CURRENT_TIMESTAMP
            WHERE aggregated_at IS NULL
            RETURNING id, created_at`)

		const updates = res_update.rows as unknown as {
			id: string
			created_at: string
		}[]

		console.info(`Processing ${updates.length} sessions`)

		const map: Record<string, number> = {}

		for (const { created_at } of updates) {
			const month = created_at.slice(0, 7) // 'YYYY-MM'
			map[month] = (map[month] || 0) + 1
		}

		for (const [month, count] of Object.entries(map)) {
			await tx.execute({
				sql: `
                    INSERT INTO sessions_monthly (month, counter)
                    VALUES (?, ?)
                    ON CONFLICT (month)
                    DO UPDATE SET counter = counter + excluded.counter`,
				args: [month, count],
			})
		}

		await tx.commit()
		console.info(`Added ${Object.keys(map).length} months`)
	} catch (err) {
		await tx.rollback()
		console.error(err)
	}
}

async function aggregate_monthly_visits(db: Client) {
	console.info(`Aggregate monthly visits...`)

	const tx = await db.transaction('write')

	try {
		const res_update = await tx.execute(`
            UPDATE visits_live
            SET aggregated_at = CURRENT_TIMESTAMP
            WHERE aggregated_at IS NULL
            RETURNING id, path, created_at`)

		const updates = res_update.rows as unknown as {
			id: string
			path: string
			created_at: string
		}[]

		console.info(`Processing ${updates.length} visits`)

		const map: Record<string, number> = {}

		for (const { path, created_at } of updates) {
			const month = created_at.slice(0, 7) // 'YYYY-MM'
			const key = JSON.stringify({ month, path })
			map[key] = (map[key] || 0) + 1
		}

		for (const [key, count] of Object.entries(map)) {
			const { month, path } = JSON.parse(key)

			await tx.execute({
				sql: `
                    INSERT INTO visits_monthly (month, path, counter)
                    VALUES (?, ?, ?)
                    ON CONFLICT (month, path)
                    DO UPDATE SET counter = counter + excluded.counter`,
				args: [month, path, count],
			})
		}
		tx.commit()
		console.info(`Added ${Object.keys(map).length} month-path pairs`)
	} catch (err) {
		await tx.rollback()
		console.error(err)
	}
}
