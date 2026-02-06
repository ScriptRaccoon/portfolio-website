<script lang="ts">
	import './app.css'

	import { setContext } from 'svelte'
	import Nav from '$lib/components/Nav.svelte'
	import ScrollUp from '$lib/components/ScrollUp.svelte'
	import { onNavigate } from '$app/navigation'
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

<svelte:head>
	<!-- favicons -->
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />

	<!-- global meta tags -->
	<title>Script Raccoon - Web Developer</title>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://scriptraccoon.dev" />
	<meta property="og:site_name" content="Script Raccoon" />
	<meta
		property="og:image"
		content="https://scriptraccoon.dev/media/general/ScriptRaccoon.png"
	/>
</svelte:head>

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
