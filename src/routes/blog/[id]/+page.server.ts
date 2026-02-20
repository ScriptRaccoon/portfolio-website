import fm from 'front-matter'
import { error } from '@sveltejs/kit'
import { type PostMetaData } from '$lib/types'

import { render_markdown } from '$lib/server/markdown'
import { get_table_of_contents } from '$lib/server/toc'
import { is_published } from '$lib/server/utils'

export const load = async (event) => {
	const id = event.params.id
	const path = `/src/data/posts/${id}.md`

	const posts_record = import.meta.glob('/src/data/posts/*.md', {
		query: '?raw',
		import: 'default',
	})

	const loader = posts_record[path]

	if (!loader) error(404, 'Not Found')

	const markdown = (await loader()) as string

	const { attributes: _attributes, body } =
		fm<Omit<PostMetaData, 'id'>>(markdown)

	const attributes: PostMetaData = { ..._attributes, id }

	if (!is_published(attributes)) {
		error(404, 'Not Found')
	}

	const html_code = render_markdown(body)

	const toc = get_table_of_contents(html_code)

	return { attributes, html_code, toc, id }
}
