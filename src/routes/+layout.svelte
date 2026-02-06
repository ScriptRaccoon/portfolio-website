<script lang="ts">
	import { setContext } from 'svelte'

	import './app.css'
	import Nav from '$lib/components/Nav.svelte'
	import ScrollUp from '$lib/components/ScrollUp.svelte'
	import { onNavigate } from '$app/navigation'
	import MetaTags from '$lib/components/MetaTags.svelte'
	import { track_visit } from '$lib/client/track'
	import { page } from '$app/state'
	import { browser } from '$app/environment'

	let { data, children } = $props()

	const allow_animation =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: no-preference)').matches

	setContext<boolean>('allow_animation', allow_animation)

	onNavigate((navigation) => {
		if (!document.startViewTransition || !allow_animation) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

	$effect(() => {
		if (browser && !window.localStorage.getItem('notrack')) {
			track_visit(page.url.pathname, data.tracked_paths)
		}
	})
</script>

<MetaTags />

<div class="wrapper">
	<Nav />
	<main>
		{@render children?.()}
	</main>
</div>

<ScrollUp />

<style>
	.wrapper {
		max-width: 52rem;
		margin-inline: auto;
	}

	main {
		padding-inline: 0.75rem;
		padding-top: 1rem;
	}
</style>
