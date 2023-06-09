<script lang="ts">
	import { fade } from "svelte/transition";
	import Filter from "./Filter.svelte";
	import Project from "./Project.svelte";
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
		<li transition:fade={{ duration: 200 }}>
			<Project {project} />
		</li>
	{/each}
</ol>

<style>
	ol {
		list-style-type: none;
		margin: 0;
		margin-bottom: 2rem;
	}
</style>
