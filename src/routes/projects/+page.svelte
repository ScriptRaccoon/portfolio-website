<script lang="ts">
	import { fade } from 'svelte/transition'
	import { getContext } from 'svelte'

	import ProjectsFilter from '$lib/components/ProjectFilter.svelte'
	import ProjectPreview from '$lib/components/ProjectPreview.svelte'
	import { project_filter } from '$lib/shared/state.svelte'
	import type { ProjectMetaData } from '$lib/shared/types.js'

	let { data } = $props()
	const { projects, tags, years } = data

	const allow_animation = getContext<boolean>('allow_animation')

	const satisfies_filter = (project: ProjectMetaData) =>
		project_filter.value.tags.every((tag) => project.tags.includes(tag)) &&
		(project_filter.value.years.length == 0 ||
			project_filter.value.years.includes(project.date.getFullYear()))

	let filtered_projects = $derived(projects.filter(satisfies_filter))
</script>

<h1>Projects</h1>

<p>This is a selection of my personal projects in web development.</p>

<ProjectsFilter {tags} {years} />

{#if filtered_projects.length > 0}
	<ol class="no-bullets">
		{#each filtered_projects as project (project.id)}
			<li transition:fade={{ duration: allow_animation ? 200 : 0 }}>
				<ProjectPreview {project} />
			</li>
		{/each}
	</ol>
{:else}
	<p>No projects within this filter</p>
{/if}
