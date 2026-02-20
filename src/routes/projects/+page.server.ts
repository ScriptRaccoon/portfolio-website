import type { ProjectMetaData } from '$lib/types'
import { get_frontmatter } from '$lib/server/frontmatter'
import { PROJECT_TAGS } from '$lib/server/config'
import { error } from '@sveltejs/kit'

export const load = async () => {
	const unsorted_projects = get_frontmatter<ProjectMetaData>(
		import.meta.glob('/src/data/projects/*.md', {
			query: '?raw',
			import: 'default',
			eager: true,
		}),
	)

	const projects = [...unsorted_projects].sort(
		(p, q) => q.date.getTime() - p.date.getTime(),
	)

	const year_list = unsorted_projects.map((p) => p.date.getFullYear())
	const years = [...new Set(year_list)].sort((a, b) => a - b)

	const tag_list = projects.map((p) => p.tags).flat()

	const invalid_tag = tag_list.find((tag) => !PROJECT_TAGS.includes(tag))

	if (invalid_tag) {
		error(400, `Invalid tag found: ${invalid_tag}`)
	}

	const tags = [...new Set(tag_list)].sort((a, b) => a.localeCompare(b))

	return { projects, tags, years }
}
