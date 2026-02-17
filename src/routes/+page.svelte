<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte'
	import SocialLinks from '$lib/components/SocialLinks.svelte'
</script>

<MetaTags
	title="Script Raccoon – Web developer"
	description="Find more about me and my personal projects in web development"
/>

<header>
	<h1>Script Raccoon</h1>
</header>

<p>Welcome. I'm Martin, a web developer based in Berlin, Germany.</p>

<p>
	This site is a brief overview of my <a href="/projects">personal projects</a
	>. You can also find out more <a href="/about">about myself</a>.
</p>

<p>
	I run a <a href="/youtube">Youtube channel</a> and write about web
	development on my
	<a href="/blog">blog</a>.
</p>

<p class="logo-container">
	<img src="/media/general/ScriptRaccoon.webp" alt="raccoon logo" />
</p>

<SocialLinks />

<style>
	.logo-container {
		margin-block: 2rem;
		display: flex;
		justify-content: center;

		img {
			width: min(70vw, 8rem);
			border-radius: 50%;
			box-shadow: 0rem 0rem 1rem var(--shadow-color);
		}
	}
</style>
