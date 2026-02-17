<script lang="ts">
	import { getContext } from 'svelte'
	import { fade } from 'svelte/transition'
	import Fa from 'svelte-fa'
	import { faCopy } from '@fortawesome/free-regular-svg-icons'

	type Props = { text: string; name: string }

	let { text, name }: Props = $props()

	let copied = $state(false)

	async function copy_text() {
		if (copied) return
		copied = true
		await window.navigator.clipboard.writeText(text)
		setTimeout(() => (copied = false), 2000)
	}

	const allow_animation = getContext<boolean>('allow_animation')
	const animation_speed = allow_animation ? 150 : 0
</script>

<button
	onclick={copy_text}
	aria-label="copy {name} to clipboard"
	aria-live="polite"
>
	<Fa icon={faCopy} />

	{#if copied}
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
		position: absolute;
		top: calc(100% + 0.25rem);
		right: 0;
		z-index: 1;
		font-size: var(--small-font);
		border-radius: 0.25rem;
		padding: 0.2rem 0.6rem;
		border: 1px solid var(--border-color);
		background-color: var(--bg-color);
		white-space: nowrap;
	}
</style>
