<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		href: string;
		children?: Snippet;
	}

	let { href, children }: Props = $props();
</script>

<a {href}>{@render children?.()}</a>

<style>
	a {
		text-decoration: none;
		display: block;
		padding-block: 1.25rem;
		border-bottom: 1px solid var(--border-color);
	}

	a :global(.more) {
		font-size: var(--small-font);
		text-decoration: underline;
		text-decoration-color: var(--secondary-font-color);
	}
</style>
