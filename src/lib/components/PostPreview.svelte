<script lang="ts">
	import PreviewCard from '$lib/components/PreviewCard.svelte'
	import type { PublishedPostMetaData } from '$lib/shared/types'
	import More from './More.svelte'

	type Props = {
		post: PublishedPostMetaData
	}

	let { post }: Props = $props()
</script>

<PreviewCard href="/blog/{post.id}">
	<h2>
		{post.title}
	</h2>
	<div class="date">
		{post.published.toLocaleDateString()}
	</div>
	<p>
		{post.description}
	</p>
	<More />
</PreviewCard>

<style>
	.date {
		color: var(--secondary-font-color);
		font-size: var(--small-font);
		margin-bottom: 0.5rem;
	}
</style>
