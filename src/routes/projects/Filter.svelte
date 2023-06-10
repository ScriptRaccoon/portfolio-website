<script lang="ts">
	import { selected_tag } from "./stores";
	import Tag from "./Tag.svelte";
	import { all_tags } from "./tags";
</script>

<section aria-label="Filters">
	<details>
		<summary aria-live="polite">
			Applied filter: {$selected_tag}
		</summary>
		<div class="tag-list" role="listbox" aria-label="list of tags">
			{#each all_tags as tag}
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
