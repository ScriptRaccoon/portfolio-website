<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte'
	import PostPreview from '$lib/components/PostPreview.svelte'

	let { data } = $props()
</script>

<MetaTags
	title="Script Raccoon - Blog"
	description="My thoughts on web development"
/>

<header>
	<h1>Blog</h1>
</header>

<p>Here you find thoughts and tutorials on web development.</p>

<ol class="no-bullets">
	{#each data.posts as post (post.id)}
		<li>
			<PostPreview {post} />
		</li>
	{/each}
</ol>
