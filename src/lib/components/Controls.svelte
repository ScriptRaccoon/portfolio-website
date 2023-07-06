<script lang="ts">
	import CopyURL from "./CopyURL.svelte";
	import GoBack from "./GoBack.svelte";
	export let variant = "top";
</script>

<div class={variant}>
	<GoBack />
	<CopyURL />
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
