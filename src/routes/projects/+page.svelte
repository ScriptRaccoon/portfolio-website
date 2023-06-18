<script lang="ts">
	import { fade } from "svelte/transition";
	import Filter from "./Filter.svelte";
	import { active_filter } from "./stores";
	import ProjectPreview from "./ProjectPreview.svelte";

	export let data;
	const { projects, tags, years } = data;

	$: filtered_projects = projects.filter(
		(project) =>
			$active_filter.tags.every((tag) =>
				project.tags.includes(tag),
			) &&
			($active_filter.years.length == 0 ||
				$active_filter.years.includes(project.date.getFullYear())),
	);
</script>

<h1>Projects</h1>

<Filter {tags} {years} />

<ol class="no-bullets">
	{#each filtered_projects as project (project.id)}
		<ProjectPreview {project} />
	{:else}
		<p in:fade|local={{ duration: 200, delay: 200 }}>
			No projects within this filter
		</p>
	{/each}
</ol>

<style>
	ol {
		margin-top: 1rem;
	}
</style>
