<script lang="ts">
	import GoBack from "$lib/components/GoBack.svelte";
	import Tag from "../Tag.svelte";

	import type { attributes } from "../types";

	export let data: { attributes: attributes; htmlContent: string };

	const { name, tags, url, repository, tutorial, date } =
		data.attributes;

	const year = date.getFullYear();
	const sorted_tags = tags.split(",").sort();

	const { htmlContent } = data;
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<GoBack />

<h1>
	{name}
</h1>

<div class="year">
	{year}
</div>

<p>
	{@html htmlContent}
</p>

<section aria-label="links">
	{#if url}
		<div>
			<a href={url} target="_blank">URL</a>
		</div>
	{/if}

	{#if repository}
		<div>
			<a href={repository} target="_blank">Repository</a>
		</div>
	{/if}

	{#if tutorial}
		<div>
			<a href={tutorial} target="_blank">Tutorial</a>
		</div>
	{/if}
</section>

<ul class="tag-list" aria-label="list of tags">
	{#each sorted_tags as tag}
		<li>
			<Tag {tag} interactive={false} />
		</li>
	{/each}
</ul>

<style>
	h1 {
		margin-top: 1rem;
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
