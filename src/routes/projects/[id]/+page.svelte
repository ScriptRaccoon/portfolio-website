<script lang="ts">
	import Controls from '$lib/components/Controls.svelte'

	let { data } = $props()

	let { id, name, url, repository, url2, repository2, tutorial, tags, date } =
		$derived(data.attributes)

	let links = $derived(
		[
			{ label: 'URL', href: url },
			{ label: 'URL (2)', href: url2 },
			{ label: 'Repository', href: repository },
			{ label: 'Repository (2)', href: repository2 },
			{ label: 'Tutorial', href: tutorial },
		].filter((link) => link.href),
	)
</script>

<Controls />

<h1>
	{name}
</h1>

<ul class="no-bullets tag-list" aria-label="list of tags">
	{#each tags as tag}
		<li class="tag">
			{tag}
		</li>
	{/each}
</ul>

<p class="year" aria-label="year">
	{date.getFullYear()}
</p>

<section class="links" aria-label="links">
	{#each links as { href, label }}
		<a {href} target="_blank">{label}</a>
	{/each}
</section>

<article>
	{@html data.html_code}
</article>

<img src={`/media/projects/${id}.webp`} alt="screenshot of the application" />

<style>
	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: -0.75rem;
		margin-bottom: 1.5rem;
	}

	.year {
		font-size: var(--small-font);
		color: var(--secondary-font-color);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		font-size: var(--small-font);
	}

	img {
		margin-block: 1.5rem;
	}
</style>
