<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		href: string;
		children: Snippet;
	};

	let { href, children }: Props = $props();
</script>

<a {href}>
	{@render children()}
</a>

<style>
	a {
		text-decoration: none;
		display: block;
		padding-block: 1.25rem;
		border-bottom: 1px solid var(--border-color);
	}
</style>
