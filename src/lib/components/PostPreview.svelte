<script lang="ts">
	import PreviewCard from "$lib/components/PreviewCard.svelte";
	import type { published_post } from "$lib/shared/types";

	interface Props {
		post: published_post;
	}

	let { post }: Props = $props();
</script>

<li>
	<PreviewCard href="/blog/{post.id}">
		<h2 class:draft={post.id.startsWith("_draft")}>
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
