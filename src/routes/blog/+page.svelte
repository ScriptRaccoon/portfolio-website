<script lang="ts">
	export let data;
	const { posts } = data;
</script>

<svelte:head>
	<title>Script Raccoon - Blog</title>
</svelte:head>

<h1>Blog</h1>

<ol class="no-bullets">
	{#each posts as post (post.id)}
		<li>
			<a href="/blog/{post.id}">
				<h2>
					{post.title}
					{#if !post.public}
						[DRAFT]
					{/if}
				</h2>
				<div class="date">{post.published.toLocaleDateString()}</div>
				<p class="description">{post.description}</p>
				<div class="more">More...</div>
			</a>
		</li>
	{:else}
		<p>No post published yet</p>
	{/each}
</ol>

<style>
	ol {
		margin-block: 1rem;
	}

	a {
		text-decoration: none;
		display: block;
		padding-block: 1rem;
		border-bottom: 1px solid var(--light-color);
	}

	.date {
		color: var(--gray-color);
		font-size: var(--small-font);
		margin-bottom: 0.5rem;
	}

	.more {
		font-size: var(--small-font);
		text-decoration: underline;
	}
</style>
