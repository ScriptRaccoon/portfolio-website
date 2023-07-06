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

<button on:click={copy_url} aria-label="copy URL to clipboard">
	{#if pending}
		Copied URL
	{:else}
		<Fa icon={faRetweet} />
	{/if}
</button>
