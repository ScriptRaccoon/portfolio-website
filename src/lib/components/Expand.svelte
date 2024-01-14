<script lang="ts">
	import { getContext } from "svelte";
	import { slide } from "svelte/transition";

	export let open: boolean = false;
	export let summary: string = "Toggle";
	export let animated: boolean = true;
	export let role: string;

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
	on:click={toggle_open}
	class:closed={!open}
>
	{summary}
</button>

<div id={contents_id} aria-labelledby={button_id} {role}>
	{#if open}
		<div transition:slide={{ duration }}>
			<slot />
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
