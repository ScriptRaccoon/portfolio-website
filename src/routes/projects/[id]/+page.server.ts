import fm from 'front-matter'
import { error } from '@sveltejs/kit'
import type { ProjectMetaData } from '$lib/types'
import { render_markdown } from '$lib/server/markdown'

const projects_record = import.meta.glob('/src/data/projects/*.md', {
	as: 'raw',
	eager: true,
})

export const load = async (event) => {
	const id = event.params.id
	const path = `/src/data/projects/${id}.md`

	if (!(path in projects_record)) {
		error(404, 'There is no project with this ID')
	}

	const markdown = projects_record[path]
	const { attributes: _attributes, body } =
		fm<Omit<ProjectMetaData, 'id'>>(markdown)

	const attributes: ProjectMetaData = { ..._attributes, id }

	attributes.tags.sort((a, b) => a.localeCompare(b))

	const html_code = render_markdown(body)

	return { attributes, html_code }
}
