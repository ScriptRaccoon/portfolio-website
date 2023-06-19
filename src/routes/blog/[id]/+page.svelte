<script lang="ts">
	import GoBack from "$lib/components/GoBack.svelte";

	export let data;

	const {
		attributes: { title, updated, published, show_toc },
		html_code,
		toc,
	} = data;
</script>

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

{#if show_toc}
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

<article>
	{@html html_code}
</article>

<div class="back">
	<GoBack />
</div>

<style lang="scss">
	.dates {
		margin-top: -0.5rem;
		font-size: var(--small-font);
		color: var(--gray-color);
	}

	.toc {
		margin-top: 1rem;
	}

	article {
		:global(h2) {
			padding-top: 5rem;
			margin-top: -3.5rem;
		}

		:global(blockquote) {
			margin-left: 1rem;
			padding-left: 0.5rem;
			color: var(--gray-color);
			font-size: var(--small-font);
			border-left: 0.2rem solid var(--light-color);
			line-height: 1.6;
		}

		:global(pre) {
			border-radius: 0.4rem;
			font-size: var(--small-font);
			padding: 1rem;
			overflow: auto;
			max-height: 30rem;
			scrollbar-width: thin;

			&::-webkit-scrollbar {
				width: 6px;
				height: 6px;
			}

			&::-webkit-scrollbar-thumb {
				background-color: var(--gray-color);
			}
		}

		:global(code:not(pre code)) {
			font-family: monospace;
			background-color: var(--gray-color);
			color: var(--inverted-font-color);
			padding-inline: 0.5rem;
			padding-block: 0.05rem;
			border-radius: 0.2rem;
			font-size: var(--small-font);
			white-space: nowrap;
		}
	}

	.back {
		margin-block: 1rem 2rem;
	}
</style>
