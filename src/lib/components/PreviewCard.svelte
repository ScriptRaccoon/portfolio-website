<script lang="ts">
	export let href: string;
</script>

<a {href} class="plain"><slot /></a>

<style>
	a {
		display: block;
		padding-block: 1.25rem;
		border-bottom: 1px solid var(--border-color);
	}

	a :global(.more) {
		font-size: var(--small-font);
	}
</style>
