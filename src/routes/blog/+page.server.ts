import type { PostMetaData } from '$lib/shared/types'
import { get_frontmatter } from '$lib/server/blog-processing'
import { is_published } from '$lib/shared/utils'

export const load = async () => {
	const unsorted_posts = get_frontmatter<PostMetaData>(
		import.meta.glob('/src/data/posts/**/*.md', {
			as: 'raw',
			eager: true,
		}),
	)

	const published_posts = unsorted_posts.filter(is_published)

	const posts = published_posts.sort(
		(p, q) => q.published.getTime() - p.published.getTime(),
	)

	const meta = {
		title: 'Script Raccoon - Blog',
		description: 'Some thoughts on web development',
	}

	return { meta, posts }
}
