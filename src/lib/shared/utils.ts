import type { PostMetaData, PublishedPostMetaData } from './types'

export const is_published = (
	metadata: PostMetaData,
): metadata is PublishedPostMetaData => {
	return metadata.published !== null
}
