import { DB_AUTH_TOKEN, DB_URL } from '$env/static/private'
import { createClient, type LibsqlError } from '@libsql/client'

export const db = createClient({
	url: DB_URL,
	authToken: DB_AUTH_TOKEN,
})

export async function query<T = unknown>(sql: string, args?: any[]) {
	try {
		const { rows } = args
			? await db.execute(sql, args)
			: await db.execute(sql)
		return { rows: rows as T[], err: null }
	} catch (err) {
		console.error(err)
		return { rows: null, err: err as LibsqlError }
	}
}
