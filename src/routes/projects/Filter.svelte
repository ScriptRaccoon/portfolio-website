<script lang="ts">
	import { selected_tag, NO_TAG } from "./stores";
	import Tag from "./Tag.svelte";
	export let tags: string[];
	const _tags = [NO_TAG, ...tags];
</script>

<section aria-label="Filters">
	<details>
		<summary aria-live="polite">
			Applied filter: {$selected_tag}
		</summary>
		<div class="tag-list" role="listbox" aria-label="list of tags">
			{#each _tags as tag}
				<Tag {tag} interactive={true} />
			{/each}
		</div>
	</details>
</section>

<style>
	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-block: 1rem;
	}
</style>
