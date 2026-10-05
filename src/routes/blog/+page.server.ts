import type { PostMetaData } from '#lib/types.js'
import { get_frontmatter } from '#lib/server/frontmatter.js'
import { is_published } from '#lib/server/utils.js'

export const load = async () => {
	const unsorted_posts = get_frontmatter<PostMetaData>(
		import.meta.glob('/src/data/posts/**/*.md', {
			query: '?raw',
			import: 'default',
			eager: true,
		}),
	)

	const published_posts = unsorted_posts.filter(is_published)

	const posts = published_posts.sort(
		(p, q) => q.published.getTime() - p.published.getTime(),
	)

	return { posts }
}
