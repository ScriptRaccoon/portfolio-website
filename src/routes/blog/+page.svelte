<script lang="ts">
	import PostPreview from "$lib/components/PostPreview.svelte";

	let { data } = $props();
	const { posts } = data;
</script>

<h1>Blog</h1>

<p>Here you find thoughts and tutorials on web development.</p>

<ol class="no-bullets">
	{#each posts as post (post.id)}
		<PostPreview {post} />
	{/each}
</ol>

<style>
	ol {
		margin-top: 1rem;
	}
</style>
