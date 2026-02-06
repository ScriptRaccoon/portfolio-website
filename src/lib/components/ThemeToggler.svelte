<script lang="ts">
	import Fa from 'svelte-fa'
	import { faMoon } from '@fortawesome/free-solid-svg-icons'
	import { faSun } from '@fortawesome/free-regular-svg-icons'
	import { theme } from '$lib/client/theme.svelte'
</script>

<button
	onclick={theme.toggle}
	aria-label="Toggle theme, current theme is {theme.value}"
	class={theme.value}
>
	<Fa icon={faMoon} class="moon" />
	<Fa icon={faSun} class="sun" />
</button>

<style>
	button {
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		:global(svg) {
			position: absolute;

			@media (prefers-reduced-motion: no-preference) {
				transition: opacity 250ms linear;
			}
		}
	}

	button.light :global(.moon),
	button.dark :global(.sun) {
		opacity: 0;
	}
</style>
