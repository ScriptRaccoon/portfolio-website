<script lang="ts">
	import Controls from '$lib/components/Controls.svelte'
	import MetaTags from '$lib/components/MetaTags.svelte'

	let { data } = $props()

	let {
		id,
		name,
		url,
		repository,
		url2,
		repository2,
		tutorial,
		tags,
		date,
		teaser,
	} = $derived(data.attributes)

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

<MetaTags title={name} description={teaser} />

<Controls />

<header>
	<h1>{name}</h1>

	<span class="year" aria-label="year">
		{date.getFullYear()}
	</span>
</header>

<ul class="no-bullets tag-list" aria-label="list of tags">
	{#each tags as tag}
		<li class="tag">
			{tag}
		</li>
	{/each}
</ul>

<section class="links" aria-label="links">
	{#each links as { href, label }}
		<a {href} target="_blank">{label}</a>
	{/each}
</section>

<img src={`/media/projects/${id}.webp`} alt="screenshot of the application" />

<article>
	{@html data.html_code}
</article>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.year {
		font-size: var(--small-font);
		color: var(--secondary-font-color);
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-block: 1rem;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	img {
		margin-block: 1.5rem;
	}
</style>
