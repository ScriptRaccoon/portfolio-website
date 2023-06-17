<script lang="ts">
	import GoBack from "$lib/components/GoBack.svelte";

	export let data;

	const { name, url, repository, tutorial, date, tags, id } =
		data.attributes;

	const year = date.getFullYear();

	const { html_code } = data;

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

<GoBack />

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
	h1 {
		margin-block: 1rem;
	}

	.year {
		font-size: var(--small-font);
		color: var(--gray-color);
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
		margin-block: 1.5rem;
	}
</style>
