<script lang="ts">
	import { selected_tag, show_tags } from "./stores";
	import Tag from "./Tag.svelte";
	import { all_tags } from "./tags";
</script>

<section aria-label="Filters">
	<details>
		<summary>
			Applied filter: {$selected_tag}
		</summary>
		<div class="tag-list" role="listbox">
			{#each all_tags as tag}
				<Tag {tag} />
			{/each}
		</div>
		<div>
			<label for="tag-toggle">Show tags per project</label>
			<input
				id="tag-toggle"
				type="checkbox"
				bind:checked={$show_tags}
			/>
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
