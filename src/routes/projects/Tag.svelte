<script lang="ts">
	import { selected_tag } from "./stores";
	import type { tag } from "./tags";
	export let interactive = true;
	export let tag: tag;
</script>

{#if interactive}
	<button
		class="tag"
		role="option"
		on:click={() => ($selected_tag = tag)}
		aria-selected={tag === $selected_tag}
	>
		{tag}
	</button>
{:else}
	<span class="tag">
		{tag}
	</span>
{/if}

<style>
	.tag {
		font-size: 0.75rem;
		background-color: var(--tag-color);
		color: var(--gray-color);
		padding: 0.2rem 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tag[aria-selected="true"] {
		outline: 0.1rem solid var(--font-color);
	}
</style>
