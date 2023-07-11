<script context="module" lang="ts">
	import { writable } from "svelte/store";
	const likes = writable<Record<string, number>>({});
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
	import { onMount } from "svelte";
	import Fa from "svelte-fa";

	const API_ROUTE = "/api/like";
	let liked = false;
	$: pathname = $page.url.pathname;

	async function like() {
		if (liked) return;
		const response = await fetch(API_ROUTE, {
			method: "POST",
			headers: { "Content-Type": "text/plain" },
			body: pathname,
		});
		if (!response.ok) return;
		const data = await response.json();
		$likes[pathname] = data.likes;
		liked = true;
	}

	async function get_likes() {
		const response = await fetch(`${API_ROUTE}?pathname=${pathname}`);
		if (!response.ok) return;
		const data = await response.json();
		$likes[pathname] = data.likes;
	}

	onMount(() => {
		get_likes();
	});
</script>

<button on:click={like} aria-label={liked ? "liked" : "like"}>
	<span class:liked>
		<Fa icon={faThumbsUp} />
	</span>
	<span class="likes">
		{$likes[pathname] ?? ""}
	</span>
</button>

<style>
	.liked {
		display: inline-block;
		animation: grow 200ms ease-in-out forwards;
	}

	@keyframes grow {
		0%,
		100% {
			scale: 1;
			color: var(--font-color);
		}
		50% {
			scale: 1.3;
		}
	}

	.likes {
		font-size: var(--small-font);
	}
</style>
