import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	PAGEVISITS_CREDENTIALS: {
		static: true,
		description: 'Basic authentication for analytics page',
		schema: (value) => {
			if (!value?.match(/^.+:.+$/)) {
				throw new Error('Expected <username>:<password')
			}
			return value
		},
	},
	DB_URL: {
		static: true,
		description: 'URL of Turso database',
	},
	DB_AUTH_TOKEN: {
		static: true,
		description: 'Token of Turso database',
	},
})
