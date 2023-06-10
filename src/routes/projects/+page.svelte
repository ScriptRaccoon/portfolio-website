<script lang="ts">
	import { fade } from "svelte/transition";
	import Filter from "./Filter.svelte";
	import ProjectPreview from "./ProjectPreview.svelte";
	import { all_projects, type project } from "./projects";
	import { selected_tag } from "./stores";
	import { NO_TAG } from "./tags";

	$: filtered_projects =
		$selected_tag && all_projects.filter(project_matches);

	function project_matches(project: project) {
		if ($selected_tag === NO_TAG) return true;
		return project.tags.includes($selected_tag);
	}
</script>

<svelte:head>
	<title>Script Raccoon - Projects</title>
</svelte:head>

<h1>Projects</h1>

<Filter />

<ol>
	{#each filtered_projects as project (project.name)}
		<li transition:fade|local={{ duration: 200 }}>
			<ProjectPreview {project} />
		</li>
	{/each}
</ol>

<style>
	ol {
		list-style-type: none;
		margin: 1rem 0rem 2rem 0rem;
	}
</style>
