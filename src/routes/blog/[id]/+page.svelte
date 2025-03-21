<script lang="ts">
	import Controls from "$lib/components/Controls.svelte";
	import Expand from "$lib/components/Expand.svelte";
	import Comments from "$lib/components/Comments.svelte";

	let { data } = $props();

	let { title, published, updated } = $derived(data.attributes);
</script>

<Controls variant="top" />

<h1>
	{title}
</h1>

<div class="dates">
	<div>Published: {published.toLocaleDateString()}</div>
	{#if updated}
		<div>Updated: {updated.toLocaleDateString()}</div>
	{/if}
</div>

{#if data.toc.length > 0}
	<Expand summary="Table of Contents">
		<ol class="toc" role="navigation">
			{#each data.toc as item}
				<li>
					<a href="#{item.id}">{item.text}</a>
				</li>
			{/each}
		</ol>
	</Expand>
{/if}

<article>
	{@html data.html_code}
</article>

<Controls variant="bottom" />

<Comments />

<style lang="scss">
	@mixin bordered() {
		border-radius: 0.4rem;
		border: 0.15rem solid var(--code-border-color);
	}

	.dates {
		margin-top: -0.5rem;
		margin-bottom: 1rem;
		font-size: var(--small-font);
		color: var(--secondary-font-color);
	}

	.toc {
		padding-top: 1rem;

		a {
			text-decoration-color: var(--secondary-font-color);
		}
	}

	article {
		:global(h2) {
			padding-top: 5rem;
			margin-top: -3.5rem;
		}

		:global(blockquote) {
			margin-block: 1rem;
			margin-left: 1rem;
			padding-left: 0.5rem;
			color: var(--secondary-font-color);
			font-size: var(--small-font);
			border-left: 0.2rem solid var(--border-color);
			line-height: 1.6;
		}

		:global(pre) {
			@include bordered();
			font-size: var(--small-font);
			padding: 1rem;
			margin-block: 1rem;
			overflow: auto;
			max-height: 30rem;
			background-color: var(--code-bg-color);
			tab-size: 4;

			scrollbar-width: thin;

			&::-webkit-scrollbar {
				width: 0.4rem;
				height: 0.4rem;
			}

			scrollbar-color: var(--secondary-font-color)
				var(--code-bg-color);

			&::-webkit-scrollbar-thumb {
				background-color: var(--secondary-font-color);
			}
		}

		:global(code:not(pre code)) {
			font-family: monospace;
			background-color: var(--inline-code-bg-color);
			padding-inline: 0.5rem;
			padding-block: 0.05rem;
			border-radius: 0.2rem;
			font-size: var(--small-font);
			white-space: nowrap;
		}

		:global(img) {
			@include bordered();
			margin-inline: auto;
		}

		:global(table) {
			border-collapse: collapse;

			:global(td) {
				width: 50%;
				padding: 0.25rem;
			}
		}
	}
</style>
