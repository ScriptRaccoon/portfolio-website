<script lang="ts">
	import { fade } from 'svelte/transition'
	import { getContext } from 'svelte'

	import ProjectsFilter from '$lib/components/ProjectFilter.svelte'
	import ProjectPreview from '$lib/components/ProjectPreview.svelte'
	import type { ProjectMetaData } from '$lib/types'
	import MetaTags from '$lib/components/MetaTags.svelte'

	let { data } = $props()
	const { projects, tags, years } = $derived(data)

	const allow_animation = getContext<boolean>('allow_animation')

	let selected_years = $state<number[]>([])
	let selected_tags = $state<string[]>([])

	const satisfies_filter = (project: ProjectMetaData) =>
		selected_tags.every((tag) => project.tags.includes(tag)) &&
		(selected_years.length == 0 ||
			selected_years.includes(project.date.getFullYear()))

	let filtered_projects = $derived(projects.filter(satisfies_filter))
</script>

<MetaTags
	title="Script Raccoon - Projects"
	description="Find out about my personal projects in web development"
/>

<header>
	<h1>Projects</h1>
</header>

<p>A selection of personal web development projects.</p>

<ProjectsFilter {tags} {years} bind:selected_tags bind:selected_years />

{#if filtered_projects.length > 0}
	<ol class="no-bullets">
		{#each filtered_projects as project (project.id)}
			<li transition:fade={{ duration: allow_animation ? 200 : 0 }}>
				<ProjectPreview {project} />
			</li>
		{/each}
	</ol>
{:else}
	<p>No projects matching this filter</p>
{/if}
