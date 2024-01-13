<script lang="ts">
	import { fade } from "svelte/transition";
	import { getContext } from "svelte";

	import Filter, {
		active_filter,
	} from "$lib/components/Filter.svelte";
	import ProjectPreview from "$lib/components/ProjectPreview.svelte";

	export let data;
	const { projects, tags, years } = data;

	const animation_options = getContext("allow_animation")
		? { duration: 200, delay: 200 }
		: { duration: 0, delay: 0 };

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

<p>This is a selection of my personal projects in web development.</p>

<Filter {tags} {years} />

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
