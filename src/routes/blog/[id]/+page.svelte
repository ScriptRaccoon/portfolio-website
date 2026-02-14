<script lang="ts">
	import Controls from '$lib/components/Controls.svelte'
	import Expand from '$lib/components/Expand.svelte'
	import Comments from '$lib/components/Comments.svelte'
	import { onMount } from 'svelte'
	import MetaTags from '$lib/components/MetaTags.svelte'

	let { data } = $props()

	let { title, published, updated, description, id } = $derived(
		data.attributes,
	)

	async function copy_code(button: HTMLButtonElement) {
		const code = button.nextElementSibling?.querySelector('code')
		if (!code) return
		await navigator.clipboard.writeText(code.innerText)
		button.innerText = 'Copied!'
		button.classList.add('copied')
		setTimeout(() => {
			button.innerText = 'Copy'
			button.classList.remove('copied')
		}, 2000)
	}

	onMount(() => {
		const copy_buttons =
			document.querySelectorAll<HTMLButtonElement>('button.copy-btn')

		copy_buttons.forEach((button) => {
			button.addEventListener('click', () => {
				copy_code(button as HTMLButtonElement)
			})
		})
	})
</script>

<MetaTags
	{title}
	{description}
	image="https://scriptraccoon.dev/media/og_images/og_{id}.webp"
/>

<Controls />

<header>
	<h1>{title}</h1>
</header>

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

<div class="control-container">
	<Controls />
</div>

<Comments />

<style>
	.dates {
		margin-top: -0.5rem;
		margin-bottom: 1rem;
		font-size: var(--small-font);
		color: var(--secondary-font-color);
		display: flex;
		justify-content: space-between;
	}

	.toc {
		padding-top: 1rem;
	}

	article {
		:global(h2) {
			/* adjusts scroll position */
			padding-top: 5rem;
			margin-top: -3.5rem;
		}

		:global(blockquote) {
			margin-block: 1rem;
			margin-left: 1rem;
			padding-left: 0.5rem;
			font-size: var(--small-font);
			border-left: 0.2rem solid var(--border-color);
			line-height: 1.6;
		}

		:global(.code-block) {
			margin-block: 1rem;
			position: relative;
		}

		:global(.copy-btn) {
			position: absolute;
			top: 0.25rem;
			right: 0.25rem;
			font-size: var(--tiny-font);
			font-family: monospace;
			background-color: var(--inline-code-bg-color);
			color: var(--inverted-font-color);
			padding: 0.25rem 0.5rem;
			border-radius: 0.25rem;
			opacity: 0.5;
			transition: opacity 0.2s;
		}

		:global(.copy-btn.copied),
		:global(.copy-btn:hover),
		:global(.copy-btn:focus-visible) {
			opacity: 1;
		}

		:global(pre) {
			border-radius: 0.4rem;
			border: 0.15rem solid var(--code-border-color);
			font-size: var(--small-font);
			padding: 1rem;
			overflow: auto;
			max-height: 30rem;
			background-color: var(--code-bg-color);
			tab-size: 4;

			scrollbar-width: thin;
			&::-webkit-scrollbar {
				width: 0.4rem;
				height: 0.4rem;
			}
			scrollbar-color: var(--secondary-font-color) var(--code-bg-color);
			&::-webkit-scrollbar-thumb {
				background-color: var(--secondary-font-color);
			}
		}

		:global(code:not(pre code)) {
			font-family: monospace;
			background-color: var(--inline-code-bg-color);
			padding: 0.05rem 0.5rem;
			border-radius: 0.2rem;
			font-size: var(--small-font);
			white-space: nowrap;
		}

		:global(img) {
			border-radius: 0.4rem;
			border: 0.15rem solid var(--code-border-color);
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

	.control-container {
		margin-block: 1rem 2rem;
	}
</style>
