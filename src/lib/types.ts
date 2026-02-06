export type PostMetaData = {
	id: string
	title: string
	published: Date | null
	updated: Date | null
	description: string
}

export type PublishedPostMetaData = PostMetaData & {
	published: Date
}

export type ProjectMetaData = {
	id: string
	name: string
	repository: string | null
	repository2?: string
	url: string | null
	url2?: string
	tutorial: string | null
	tags: string[]
	teaser: string
	date: Date
}
