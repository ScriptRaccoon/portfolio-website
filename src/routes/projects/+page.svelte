<script lang="ts">
	import { fade } from "svelte/transition";
	import { getContext } from "svelte";

	import ProjectsFilter from "$lib/components/ProjectFilter.svelte";
	import ProjectPreview from "$lib/components/ProjectPreview.svelte";
	import { project_filter } from "$lib/shared/stores.js";

	let { data } = $props();
	const { projects, tags, years } = data;

	const animation_options = getContext("allow_animation")
		? { duration: 200, delay: 200 }
		: { duration: 0, delay: 0 };

	let filtered_projects = $derived(
		projects.filter(
			(project) =>
				$project_filter.tags.every((tag) =>
					project.tags.includes(tag),
				) &&
				($project_filter.years.length == 0 ||
					$project_filter.years.includes(project.date.getFullYear())),
		),
	);
</script>

<h1>Projects</h1>

<p>This is a selection of my personal projects in web development.</p>

<ProjectsFilter {tags} {years} />

{#if filtered_projects.length > 0}
	<ol class="no-bullets">
		{#each filtered_projects as project (project.id)}
			<ProjectPreview {project} />
		{/each}
	</ol>
{:else}
	<p in:fade={animation_options}>No projects within this filter</p>
{/if}

<style>
	ol {
		margin-top: 1rem;
	}
</style>
