<script lang="ts">
	import PreviewCard from "$lib/components/PreviewCard.svelte";
	import type { post } from "$lib/shared/types";

	export let post: post;

	$: draft = post.id.startsWith("_draft");
</script>

<li>
	<PreviewCard href="/blog/{post.id}">
		<h2 class:draft>
			{post.title}
		</h2>
		<div class="date">
			{post.published.toLocaleDateString()}
		</div>
		<p>
			{post.description}
		</p>
		<div class="more">More...</div>
	</PreviewCard>
</li>

<style lang="scss">
	.date {
		color: var(--secondary-font-color);
		font-size: var(--small-font);
		margin-bottom: 0.5rem;
	}

	.draft {
		opacity: 0.5;
		&::before {
			content: "[Draft] ";
		}
	}
</style>
