// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session_id: string
		}
		// interface Platform {}

		interface PageData {
			meta: {
				title: string
				description: string
			}
		}
	}
}

export {}
