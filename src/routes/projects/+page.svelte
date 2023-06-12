<script lang="ts">
	import { fade } from "svelte/transition";
	import Filter from "./Filter.svelte";
	import { selected_tag, NO_TAG } from "./stores";
	import type { attributes } from "./types";

	export let data;
	const { projects, tags } = data;

	$: filtered_projects = projects.filter((project) =>
		match(project, $selected_tag),
	);

	function match(project: attributes, tag: string) {
		if (tag === NO_TAG) return true;
		return project.tags.includes(tag);
	}
</script>

<svelte:head>
	<title>Script Raccoon - Projects</title>
</svelte:head>

<h1>Projects</h1>

<Filter {tags} />

<ol class="no-bullets">
	{#each filtered_projects as project (project.id)}
		<li transition:fade|local={{ duration: 200 }}>
			<a href="/projects/{project.id}">
				<h2>{project.name}</h2>
				<div class="teaser">{project.teaser}</div>
				<div class="more">More...</div>
			</a>
		</li>
	{/each}
</ol>

<style>
	ol {
		margin-block: 1rem;
	}

	a {
		text-decoration: none;
		display: block;
		padding-block: 1rem;
		border-bottom: 1px solid var(--light-color);
	}

	.teaser {
		color: var(--gray-color);
		margin-bottom: 0.5rem;
	}

	.more {
		font-size: 1rem;
		text-decoration: underline;
	}
</style>
