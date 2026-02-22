<script lang="ts">
	import PreviewCard from '$lib/components/PreviewCard.svelte'
	import type { PublishedPostMetaData } from '$lib/types'
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
	<div class="secondary small">
		{post.published.toLocaleDateString()}
	</div>
	<p>
		{post.description}
	</p>
	<More />
</PreviewCard>
