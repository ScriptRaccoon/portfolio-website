<script>
	import "./app.css";
	import Nav from "$lib/components/Nav.svelte";
</script>

<svelte:head>
	<!-- favicons -->
	<link
		rel="apple-touch-icon"
		sizes="180x180"
		href="/apple-touch-icon.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="32x32"
		href="/favicon-32x32.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="16x16"
		href="/favicon-16x16.png"
	/>
	<link rel="manifest" href="/site.webmanifest" />
	<link
		rel="mask-icon"
		href="/safari-pinned-tab.svg"
		color="#5bbad5"
	/>
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />

	<!-- meta tags -->
	<title>Script Raccoon - Web developer</title>
	<meta
		property="og:title"
		content="Script Raccoon - Web developer"
	/>
	<meta
		property="og:description"
		content="Find more about me and my personal projects in web development"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://scriptraccoon.dev" />
	<meta property="og:site_name" content="Script Raccoon" />
	<meta property="og:image" content="/assets/ScriptRaccoon.png" />
</svelte:head>

<div class="wrapper">
	<Nav />
	<main>
		<slot />
	</main>
</div>

<style>
	.wrapper {
		max-width: 38rem;
		margin-inline: auto;
		padding-inline: 1rem;
	}
	main {
		padding-block: 1rem;
	}
</style>
