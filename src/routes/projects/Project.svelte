<script lang="ts">
	import Tag from "./Tag.svelte";
	import { show_tags } from "./stores";
	import type { project } from "./projects";
	export let project: project;
</script>

<article>
	<h2>
		{project.name}
	</h2>
	<div class="year">
		{project.year}
	</div>
	<p>
		{@html project.description}
	</p>
	<div class="links">
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
	</div>
	{#if $show_tags}
		<ul class="tag-list" aria-label="list of tags">
			{#each [...project.tags].sort() as tag}
				<li>
					<Tag {tag} interactive={false} />
				</li>
			{/each}
		</ul>
	{/if}
</article>

<style>
	article {
		padding-block: 1rem;
		border-bottom: 1px solid var(--light-color);
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
