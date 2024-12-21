<script lang="ts">
	import { getContext } from "svelte";
	import { slide } from "svelte/transition";
	import type {Snippet} from "svelte";

	interface Props {
		open?: boolean;
		summary?: string;
		animated?: boolean;
		role: string;
		children?: Snippet;
	}

	let {
		open = $bindable(false),
		summary = "Toggle",
		animated = true,
		role,
		children
	}: Props = $props();

	const duration =
		getContext("allow_animation") && animated ? 200 : 0;
	const button_id = crypto.randomUUID();
	const contents_id = crypto.randomUUID();

	function toggle_open() {
		open = !open;
	}
</script>

<button
	id={button_id}
	aria-expanded={open}
	aria-controls={contents_id}
	onclick={toggle_open}
	class:closed={!open}
>
	{summary}
</button>

<div id={contents_id} aria-labelledby={button_id} {role}>
	{#if open}
		<div transition:slide={{ duration }}>
			{@render children?.()}
		</div>
	{/if}
</div>

<style>
	button {
		transition: color 200ms linear;
	}

	button.closed {
		color: var(--secondary-font-color);
	}
</style>
