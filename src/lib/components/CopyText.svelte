<script lang="ts">
	import { getContext } from "svelte";
	import { slide } from "svelte/transition";
	import Fa from "svelte-fa";
	import { faRetweet } from "@fortawesome/free-solid-svg-icons";

	let pending = false;

	export let text: string = "";
	export let name: string = "";

	async function copy_text() {
		if (pending) return;
		pending = true;
		await window.navigator.clipboard.writeText(text);
		setTimeout(() => (pending = false), 1500);
	}

	const allow_animation = getContext("allow_animation");
	const animation_speed = allow_animation ? 150 : 0;
</script>

<button
	on:click={copy_text}
	aria-label="copy {name} to clipboard"
	aria-live="polite"
>
	<Fa icon={faRetweet} />

	{#if pending}
		<span transition:slide={{ duration: animation_speed }}>
			Copied {name}
		</span>
	{/if}
</button>

<style>
	button {
		position: relative;
	}
	span {
		font-size: var(--small-font);
		border-radius: 0.25rem;
		white-space: nowrap;
		position: absolute;
		top: 100%;
		right: 0;
	}
</style>
