<script lang="ts">
	import SocialLinks from '$lib/components/SocialLinks.svelte'
</script>

<h1>Script Raccoon</h1>

<p>Welcome! I am Martin, a web developer based in Berlin, Germany.</p>

<p>
	Here you can find out more <a href="/about">about myself</a> and my
	<a href="/projects">personal projects</a>.
</p>

<p>
	I run a <a href="/youtube">Youtube channel</a> and also write
	<a href="/blog">blog posts</a>.
</p>

<p class="logo-container">
	<img src="/media/general/ScriptRaccoon.png" alt="raccoon logo" />
</p>

<SocialLinks />

<style lang="scss">
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
