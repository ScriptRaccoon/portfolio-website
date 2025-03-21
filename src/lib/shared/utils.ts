import type { PostMetaData, PublishedPostMetaData } from './types'

export function compose<X>(funs: ((x: X) => X)[]): (x: X) => X {
	if (funs.length === 0) return (x) => x
	const [first, ...rest] = funs
	return (x) => compose(rest)(first(x))
}

export const is_published = (
	metadata: PostMetaData,
): metadata is PublishedPostMetaData => {
	return metadata.published !== null
}
