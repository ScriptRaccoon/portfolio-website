<script lang="ts">
	import { selected_tag } from "./stores";
	import type { tag } from "./tags";
	export let show_selection = true;
	export let tag: tag;
</script>

<button
	role="option"
	on:click={() => ($selected_tag = tag)}
	aria-selected={tag === $selected_tag}
	class:show_selection
>
	{tag}
</button>

<style>
	button {
		font-size: 0.75rem;
		background-color: var(--tag-color);
		color: var(--gray-color);
		padding: 0.2rem 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button[aria-selected="true"].show_selection {
		outline: 0.1rem solid var(--font-color);
	}
</style>
