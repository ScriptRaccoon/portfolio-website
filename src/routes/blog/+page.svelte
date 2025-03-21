<script lang="ts">
	import PostPreview from "$lib/components/PostPreview.svelte";

	let { data } = $props();
</script>

<h1>Blog</h1>

<p>Here you find thoughts and tutorials on web development.</p>

<ol class="no-bullets">
	{#each data.posts as post (post.id)}
		<li>
			<PostPreview {post} />
		</li>
	{/each}
</ol>

<style>
	ol {
		margin-top: 1rem;
	}
</style>
