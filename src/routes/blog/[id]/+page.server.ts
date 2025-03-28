import fm from 'front-matter'
import { error } from '@sveltejs/kit'
import {
	type PostMetaData,
	type PublishedPostMetaData,
} from '$lib/shared/types'
import {
	add_ids_to_headings,
	get_table_of_contents,
	render_formulas,
	transform_external_links,
	render_markdown,
} from '$lib/server/blog-processing'
import { compose, is_published } from '$lib/shared/utils'

const posts_record = import.meta.glob('/src/data/posts/*.md', {
	as: 'raw',
	eager: true,
})

export const load = async (event) => {
	const id = event.params.id
	const path = `/src/data/posts/${id}.md`

	if (!(path in posts_record)) {
		error(404, 'There is no post with this ID')
	}

	const markdown = posts_record[path]

	const { attributes: _attributes, body } =
		fm<Omit<PostMetaData, 'id'>>(markdown)

	const attributes: PostMetaData = { ..._attributes, id }

	if (!is_published(attributes)) {
		error(404, 'This post is not published')
	}

	attributes satisfies PublishedPostMetaData

	const html_raw = render_markdown(body)

	const html_code = compose([
		render_formulas,
		transform_external_links,
		add_ids_to_headings,
	])(html_raw)

	const toc = get_table_of_contents(html_raw)

	const { title, description } = attributes
	const meta = { title, description }

	return { meta, attributes, html_code, toc, id }
}
