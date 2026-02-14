<script lang="ts">
	import { getContext } from 'svelte'
	import { slide } from 'svelte/transition'
	import type { Snippet } from 'svelte'
	import Fa from 'svelte-fa'
	import {
		faCaretDown,
		faCaretRight,
	} from '@fortawesome/free-solid-svg-icons'

	type Props = {
		summary: string
		children: Snippet
	}

	let { summary, children }: Props = $props()

	let open = $state(false)

	const duration = getContext<boolean>('allow_animation') ? 200 : 0
	const button_id = crypto.randomUUID()
	const content_id = crypto.randomUUID()

	function toggle_open() {
		open = !open
	}
</script>

<button
	id={button_id}
	aria-expanded={open}
	aria-controls={content_id}
	onclick={toggle_open}
	class:closed={!open}
>
	<span>{summary}</span>
	<Fa icon={open ? faCaretRight : faCaretDown} />
</button>

<div id={content_id} aria-labelledby={button_id} role="region">
	{#if open}
		<div transition:slide={{ duration }}>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	div {
		max-width: 100%;
		overflow-x: auto;
	}
	span {
		margin-right: 0.25rem;
	}
</style>
