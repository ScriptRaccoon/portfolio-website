<script lang="ts">
	import PreviewCard from "$lib/components/PreviewCard.svelte";

	export let data;
	const { posts } = data;
</script>

<h1>Blog</h1>

<ol class="no-bullets">
	{#each posts as post (post.id)}
		{@const draft = post.id.includes("_draft")}
		<li class:draft>
			<PreviewCard href="/blog/{post.id}">
				<h2>
					{#if draft}Draft:{/if}
					{post.title}
				</h2>

				<div class="date">{post.published.toLocaleDateString()}</div>
				<p class="description">{post.description}</p>
				<div class="more">More...</div>
			</PreviewCard>
		</li>
	{:else}
		<p>No post published yet</p>
	{/each}
</ol>

<style>
	ol {
		margin-top: 1rem;
	}

	.date {
		color: var(--secondary-font-color);
		font-size: var(--small-font);
		margin-bottom: 0.5rem;
	}

	.draft {
		opacity: 0.6;
	}
</style>
