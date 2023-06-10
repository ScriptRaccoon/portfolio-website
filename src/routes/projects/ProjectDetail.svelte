<script lang="ts">
	import type { project } from "./projects";
	import Tag from "./Tag.svelte";
	export let project: project;
</script>

<svelte:head>
	<title>{project.name}</title>
</svelte:head>

<h1>
	{@html project.name}
</h1>

<div class="year">
	{project.year}
</div>

<p>
	{@html project.text}
</p>

<section aria-label="links">
	{#if project.url}
		<div>
			<a href={project.url} target="_blank">URL</a>
		</div>
	{/if}

	{#if project.repository}
		<div>
			<a href={project.repository} target="_blank">Repository</a>
		</div>
	{/if}

	{#if project.tutorial}
		<div>
			<a href={project.tutorial} target="_blank">Tutorial</a>
		</div>
	{/if}
</section>

<ul class="tag-list" aria-label="list of tags">
	{#each [...project.tags].sort() as tag}
		<li>
			<Tag {tag} interactive={false} />
		</li>
	{/each}
</ul>

<style>
	h1 {
		margin-bottom: 1rem;
	}
	a {
		font-size: 1rem;
	}
	.year {
		font-size: 1rem;
		color: var(--gray-color);
	}
	.tag-list {
		margin: 0;
		list-style-type: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}
</style>
