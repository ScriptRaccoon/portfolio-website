<script lang="ts">
	import { page } from "$app/stores";
	import CopyText from "./CopyText.svelte";
	import GoBack from "./GoBack.svelte";

	type Props = {
		variant: "top" | "bottom";
	};

	let { variant }: Props = $props();
</script>

<div class={variant}>
	<GoBack />
	<CopyText text={$page.url.href} name="URL" />
</div>

<style>
	div {
		display: flex;
		justify-content: space-between;
		color: var(--secondary-font-color);
	}
	div.bottom {
		margin-block: 1rem 2rem;
	}
</style>
