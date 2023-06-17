<script lang="ts">
	import GoBack from "$lib/components/GoBack.svelte";

	export let data;
	const { title, updated, published } = data.attributes;
	const { htmlContent } = data;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<GoBack />

<h1>
	{title}
</h1>

<div class="dates">
	<div>
		Published: {published.toLocaleDateString()}
	</div>
	{#if updated}
		<div>
			Last updasted: {updated.toLocaleDateString()}
		</div>
	{/if}
</div>

<main>
	{@html htmlContent}
</main>

<style lang="scss">
	h1 {
		margin-block: 1rem;
	}

	.dates {
		font-size: var(--small-font);
		color: var(--gray-color);
		display: flex;
		flex-wrap: wrap;
		column-gap: 0.5rem;
		justify-content: space-between;
	}

	main {
		:global(h2) {
			margin-top: 1.5rem;
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
</style>
