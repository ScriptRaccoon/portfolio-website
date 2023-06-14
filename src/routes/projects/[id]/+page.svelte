<script lang="ts">
	import GoBack from "$lib/components/GoBack.svelte";

	export let data;

	const { name, url, repository, tutorial, date } = data.attributes;

	const year = date.getFullYear();

	const htmlContent = data.htmlContent;

	const tag_list = data.tag_list;

	const links = [
		{ label: "URL", href: url },
		{ label: "Repository", href: repository },
		{ label: "Tutorial", href: tutorial },
	].filter((link) => link.href?.length > 0);
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

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

<main>
	{@html htmlContent}
</main>

<ul class="no-bullets tag-list" aria-label="list of tags">
	{#each tag_list as tag}
		<li class="tag">
			{tag}
		</li>
	{/each}
</ul>

<style>
	h1 {
		margin-block: 1rem;
	}

	a {
		font-size: 1rem;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.year {
		font-size: 1rem;
		color: var(--gray-color);
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-block: 1.5rem;
	}
</style>
