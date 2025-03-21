<script lang="ts">
	import { setContext, type Snippet } from "svelte";

	import "./app.css";
	import Nav from "$lib/components/Nav.svelte";
	import ScrollUp from "$lib/components/ScrollUp.svelte";
	import { onNavigate } from "$app/navigation";
	import MetaTags from "$lib/components/MetaTags.svelte";

	type Props = {
		children?: Snippet;
	};

	let { children }: Props = $props();

	const allow_animation =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: no-preference)")
			.matches;

	setContext<boolean>("allow_animation", allow_animation);

	onNavigate((navigation) => {
		if (!document.startViewTransition || !allow_animation) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<MetaTags />

<ScrollUp />

<div class="wrapper">
	<Nav />
	<main>
		{@render children?.()}
	</main>
</div>

<style>
	.wrapper {
		max-width: 52rem;
		margin-inline: auto;
	}
	main {
		padding-inline: 0.75rem;
		padding-top: 1rem;
	}
</style>
