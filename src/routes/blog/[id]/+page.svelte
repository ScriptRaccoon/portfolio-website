<script lang="ts">
	import GoBack from "$lib/components/GoBack.svelte";

	export let data;
	const { title, updated, published, description, id, showtoc } =
		data.attributes;
	const { html_code, toc } = data;
</script>

<svelte:head>
	<title>{title}</title>

	<meta property="og:title" content="{title} - by Script Raccoon" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta
		property="og:url"
		content="https://scriptraccoon.dev/posts/{id}"
	/>
	<meta property="og:site_name" content="Script Raccoon" />
</svelte:head>

<GoBack />

<h1>
	{title}
</h1>

<div class="dates">
	<div>Published: {published.toLocaleDateString()}</div>
	{#if updated}
		<div>Updated: {updated.toLocaleDateString()}</div>
	{/if}
</div>

{#if showtoc}
	<details class="toc">
		<summary>Table of Contents</summary>
		<ol>
			{#each toc as item}
				<li>
					<a href="#{item.id}">{item.text}</a>
				</li>
			{/each}
		</ol>
	</details>
{/if}

<main>
	{@html html_code}
</main>

<div class="back">
	<GoBack />
</div>

<style lang="scss">
	h1 {
		margin-block: 1rem;
	}

	.dates {
		font-size: var(--small-font);
		color: var(--gray-color);
	}

	.toc {
		margin-top: 1rem;
	}

	main {
		:global(h2) {
			padding-top: 5rem;
			margin-top: -3.5rem;
		}

		:global(blockquote) {
			margin-left: 1.5rem;
			padding-left: 0.5rem;
			color: var(--gray-color);
			font-size: var(--small-font);
		}

		:global(pre) {
			border-radius: 0.4rem;
			font-size: var(--small-font);
			padding: 1rem;
			overflow: auto;
			max-height: 30rem;
		}

		:global(p > code) {
			font-family: "Courier New", Courier, monospace;
			font-weight: 600;
			color: var(--primary-color);
		}
	}

	.back {
		margin-block: 1rem 2rem;
	}
</style>
