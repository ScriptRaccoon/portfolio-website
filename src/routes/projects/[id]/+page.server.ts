import fm from 'front-matter'
import { error } from '@sveltejs/kit'
import type { ProjectMetaData } from '$lib/types'
import { render_markdown } from '$lib/server/markdown'

export const load = async (event) => {
	const id = event.params.id
	const path = `/src/data/projects/${id}.md`

	const projects_record = import.meta.glob('/src/data/projects/*.md', {
		query: '?raw',
		import: 'default',
	})

	const loader = projects_record[path]

	if (!loader) error(404, 'Not Found')

	const markdown = (await loader()) as string

	const { attributes: _attributes, body } =
		fm<Omit<ProjectMetaData, 'id'>>(markdown)

	const attributes: ProjectMetaData = { ..._attributes, id }

	attributes.tags.sort((a, b) => a.localeCompare(b))

	const html_code = render_markdown(body)

	return { attributes, html_code }
}
