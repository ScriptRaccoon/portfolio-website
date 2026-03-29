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

<p class="coffee-container">
	<a class="coffee-link" href="https://buymeacoffee.com/scriptraccoon">
		Buy me a coffee
	</a>
</p>

<SocialLinks />

<style>
	.coffee-container {
		text-align: center;
		margin-block: 2.5rem;
	}

	.coffee-link {
		text-decoration: none;
		background-color: var(--accent-color);
		color: var(--inverted-font-color);
		padding: 0.5rem 1.25rem;
		border-radius: 100vw;
	}
</style>
