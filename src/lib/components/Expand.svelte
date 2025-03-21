<script lang="ts">
	import { getContext } from "svelte";
	import { slide } from "svelte/transition";
	import type { Snippet } from "svelte";

	type Props = {
		summary: string;
		children: Snippet;
	};

	let { summary, children }: Props = $props();

	let open = $state(false);

	const duration = getContext<boolean>("allow_animation") ? 200 : 0;
	const button_id = crypto.randomUUID();
	const content_id = crypto.randomUUID();

	function toggle_open() {
		open = !open;
	}
</script>

<button
	id={button_id}
	aria-expanded={open}
	aria-controls={content_id}
	onclick={toggle_open}
	class:closed={!open}
>
	{summary}
</button>

<div id={content_id} aria-labelledby={button_id}>
	{#if open}
		<div transition:slide={{ duration }}>
			{@render children()}
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
