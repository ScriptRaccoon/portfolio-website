<script lang="ts">
	import { page } from '$app/state'
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

	<!-- meta tags -->
	<title>{page.data.meta?.title ?? ''}</title>
	<meta property="og:title" content={page.data.meta?.title ?? ''} />
	<meta
		property="og:description"
		content={page.data.meta?.description ?? ''}
	/>
	<meta name="description" content={page.data.meta?.description ?? ''} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://scriptraccoon.dev" />
	<meta property="og:site_name" content="Script Raccoon" />
	<meta
		property="og:image"
		content="https://scriptraccoon.dev/media/general/ScriptRaccoon.png"
	/>
</svelte:head>
