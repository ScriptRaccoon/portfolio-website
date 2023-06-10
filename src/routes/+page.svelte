<script lang="ts">
	import logo from "$lib/assets/ScriptRaccoon.png";
</script>

<svelte:head>
	<title>Script Raccoon - Web developer</title>
</svelte:head>

<h1>Script Raccoon</h1>

<p>Welcome! I am Martin, a web developer based in Berlin, Germany.</p>

<p>
	Here you can find out more <a href="/about">about myself</a> and my
	<a href="/projects">personal projects</a>.
</p>

<p class="logo-container">
	<img class="logo" src={logo} alt="raccoon logo" />
</p>

<style>
	.logo-container {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
	}
	.logo {
		width: min(70vw, 8rem);
		border-radius: 50%;
		box-shadow: 0rem 0rem 1rem var(--light-color);
	}
</style>
