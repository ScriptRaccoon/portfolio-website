<script lang="ts">
	import Controls from "$lib/components/Controls.svelte";

	let { data } = $props();

	let { id, name, url, repository, tutorial, tags, date } = $derived(
		data.attributes,
	);

	let links = $derived(
		[
			{ label: "URL", href: url },
			{ label: "Repository", href: repository },
			{ label: "Tutorial", href: tutorial },
		].filter((link) => link.href),
	);
</script>

<Controls variant="top" />

<h1>
	{name}
</h1>

<p class="year">
	{date.getFullYear()}
</p>

<section aria-label="links" class="links">
	{#each links as { href, label }}
		<a {href} target="_blank">{label}</a>
	{/each}
</section>

<article>
	{@html data.html_code}
</article>

<img
	style="view-transition-name: image_{id}"
	src={`/media/projects/${id}.webp`}
	alt="screenshot"
/>

<ul class="no-bullets tag-list" aria-label="list of tags">
	{#each tags as tag}
		<li class="tag">
			{tag}
		</li>
	{/each}
</ul>

<style>
	img {
		margin-block: 1.5rem;
	}
	.year {
		margin-top: -0.5rem;
		font-size: var(--small-font);
		color: var(--secondary-font-color);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		font-size: var(--small-font);
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>
