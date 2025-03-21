<script lang="ts">
	import { page } from "$app/state";
	import { getContext } from "svelte";

	import ThemeToggler from "./ThemeToggler.svelte";

	import { faYoutube } from "@fortawesome/free-brands-svg-icons";
	import {
		faCircleQuestion,
		faClipboardList,
		faPenToSquare,
	} from "@fortawesome/free-solid-svg-icons";
	import IconLink from "./IconLink.svelte";
	import HomeLink from "./HomeLink.svelte";
	import NavUnderline from "./NavUnderline.svelte";

	const links = [
		{
			name: "YouTube",
			path: "/youtube",
			icon: faYoutube,
		},
		{
			name: "Projects",
			path: "/projects",
			icon: faClipboardList,
		},
		{
			name: "Blog",
			path: "/blog",
			icon: faPenToSquare,
		},
		{
			name: "About",
			path: "/about",
			icon: faCircleQuestion,
		},
	] as const;

	let current_path = $derived(page.url.pathname);

	let page_pos = $derived.by(() => {
		if (current_path === "/") return 0;
		return (
			1 + links.findIndex(({ path }) => current_path.startsWith(path))
		);
	});

	const animated = getContext<boolean>("allow_animation");

	const items = links.length + 2;
</script>

<nav>
	<ul class="no-bullets" style:--cols={items}>
		<li class:current={page_pos === 0}>
			<HomeLink />
		</li>
		{#each links as { name, path, icon }, index}
			<li class:current={page_pos == index + 1}>
				<IconLink {path} {icon} {name} />
			</li>
		{/each}
		<li>
			<ThemeToggler />
		</li>
		<NavUnderline pos={page_pos} {animated} cols={items} />
	</ul>
</nav>

<style>
	nav {
		padding-block: 0.5rem;
		border-bottom: 1px solid var(--border-color);
		position: sticky;
		top: 0;
		background-color: var(--bg-color);
		box-shadow: 0rem -2rem 0rem 2rem var(--bg-color);
		z-index: 5;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		position: relative;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: 0.1rem;
	}

	@media (min-width: 38rem) {
		nav {
			padding-block: 1rem;
		}
	}
</style>
