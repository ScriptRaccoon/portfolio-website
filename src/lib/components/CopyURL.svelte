<script lang="ts">
	import { page } from "$app/stores";
	import Fa from "svelte-fa";
	import { faRetweet } from "@fortawesome/free-solid-svg-icons";

	let pending = false;

	async function copy_url() {
		if (pending) return;
		const url = $page.url.href;
		pending = true;
		await window.navigator.clipboard.writeText(url);
		setTimeout(() => {
			pending = false;
		}, 1000);
	}
</script>

<button
	on:click={copy_url}
	aria-label="copy URL to clipboard"
	aria-live="polite"
>
	<Fa icon={faRetweet} />
	{#if pending}
		<span class="message"> Copied URL </span>
	{/if}
</button>

<style>
	button {
		position: relative;
	}
	.message {
		background-color: var(--bg-color);
		border: 1px solid var(--border-color);
		padding: 0.25rem;
		border-radius: 0.25rem;
		white-space: nowrap;
		position: absolute;
		top: -0.25rem;
		right: 0;
	}
</style>
