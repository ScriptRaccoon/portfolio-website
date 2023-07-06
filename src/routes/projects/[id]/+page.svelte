<script lang="ts">
	import Controls from "$lib/components/Controls.svelte";

	export let data;

	const {
		attributes: { name, url, repository, tutorial, date, tags, id },
		html_code,
	} = data;

	const year = date.getFullYear();

	const links = [
		{ label: "URL", href: url },
		{ label: "Repository", href: repository },
		{ label: "Tutorial", href: tutorial },
	].filter((link) => link.href?.length > 0);

	const image_src = new URL(
		`../../../lib/assets/projects/${id}.webp`,
		import.meta.url,
	).href;
</script>

<Controls variant="top" />

<h1>
	{name}
</h1>

<p class="year">
	{year}
</p>

<section aria-label="links" class="links">
	{#each links as { href, label }}
		<a {href} target="_blank">{label}</a>
	{/each}
</section>

<article>
	{@html html_code}
</article>

<img src={image_src} alt="screenshot" />

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
