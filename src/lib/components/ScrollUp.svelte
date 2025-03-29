<script lang="ts">
	import { fade } from 'svelte/transition'
	import { getContext } from 'svelte'
	import Fa from 'svelte-fa'
	import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

	let show = $state(false)
	let timer: number | null = null
	let scroll_position = 0

	const duration = getContext<boolean>('allow_animation') ? 150 : 0

	$effect(() => {
		scroll_position = window.scrollY
		window.addEventListener('scroll', handle_scroll)
		;() => {
			window.removeEventListener('scroll', handle_scroll)
		}
	})

	function handle_scroll() {
		if (window.scrollY === 0) {
			show = false
		} else if (window.scrollY < scroll_position) {
			show = true
			scroll_position = window.scrollY
			if (timer) clearTimeout(timer)
			timer = window.setTimeout(() => (show = false), 3000)
		}
		scroll_position = window.scrollY
	}

	function scroll_to_top() {
		window.scrollTo(0, 0)
	}
</script>

{#if show}
	<button
		onclick={scroll_to_top}
		aria-label="scroll up"
		transition:fade={{ duration }}
	>
		<Fa icon={faAngleUp} />
	</button>
{/if}

<style>
	button {
		position: fixed;
		bottom: 0.75rem;
		right: 0.75rem;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		display: grid;
		place-content: center;
		background-color: var(--accent-color);
		color: var(--inverted-font-color);
		z-index: 10;
	}
</style>
