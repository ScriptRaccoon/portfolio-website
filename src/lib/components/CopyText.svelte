<script lang="ts">
	import { getContext } from 'svelte'
	import { fade } from 'svelte/transition'
	import Fa from 'svelte-fa'
	import { faRetweet } from '@fortawesome/free-solid-svg-icons'

	let pending = $state(false)

	type Props = {
		text?: string
		name?: string
	}

	let { text = '', name = '' }: Props = $props()

	async function copy_text() {
		if (pending) return
		pending = true
		await window.navigator.clipboard.writeText(text)
		setTimeout(() => (pending = false), 1500)
	}

	const allow_animation = getContext('allow_animation')
	const animation_speed = allow_animation ? 150 : 0
</script>

<button
	onclick={copy_text}
	aria-label="copy {name} to clipboard"
	aria-live="polite"
>
	<Fa icon={faRetweet} />

	{#if pending}
		<span transition:fade={{ duration: animation_speed }}>
			Copied {name}
		</span>
	{/if}
</button>

<style>
	button {
		position: relative;
	}

	span {
		font-size: var(--small-font);
		border-radius: 0.25rem;
		padding: 0.4rem 0.8rem;
		border: 1px solid var(--border-color);
		background-color: var(--bg-color);
		white-space: nowrap;
		position: absolute;
		top: calc(100% + 0.25rem);
		right: 0;
		z-index: 1;
	}
</style>
