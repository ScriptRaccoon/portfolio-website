<script lang="ts">
	import { page } from "$app/stores";
	import { getContext } from "svelte";

	import logo from "$lib/assets/ScriptRaccoon.png";
	import ThemeToggler from "./ThemeToggler.svelte";

	import Fa from "svelte-fa";
	import {
		faYoutube,
		type IconDefinition as IconDefinitionBrand,
	} from "@fortawesome/free-brands-svg-icons";
	import {
		faCircleQuestion,
		faClipboardList,
		faPenToSquare,
		type IconDefinition as IconDefinitionSolid,
	} from "@fortawesome/free-solid-svg-icons";

	type link = {
		name: string;
		path: string;
		icon: IconDefinitionSolid | IconDefinitionBrand | null;
		nested: boolean;
	};

	const links: link[] = [
		{ name: "Home", path: "/", icon: null, nested: false },
		{
			name: "YouTube",
			path: "/youtube",
			icon: faYoutube,
			nested: false,
		},
		{
			name: "Projects",
			path: "/projects",
			icon: faClipboardList,
			nested: true,
		},
		{
			name: "Blog",
			path: "/blog",
			icon: faPenToSquare,
			nested: true,
		},
		{
			name: "About",
			path: "/about",
			icon: faCircleQuestion,
			nested: false,
		},
	];

	$: current_path = $page.url.pathname;

	$: page_pos = links.findIndex(
		(link) =>
			link.path === current_path ||
			(link.nested && current_path.startsWith(link.path)),
	);

	const items_count = links.length + 1;

	const allow_animation = getContext("allow_animation");
</script>

<nav>
	<ul class="no-bullets" style:--items-count={items_count}>
		<li class:current={current_path === "/"}>
			<a href="/">
				<img src={logo} alt="Home" class="logo" />
			</a>
		</li>
		{#each links.slice(1) as { name, path, icon }}
			<li class:current={current_path.startsWith(path)}>
				<a href={path}>
					<Fa {icon} />
					<span class="name">{name}</span>
				</a>
			</li>
		{/each}
		<li>
			<ThemeToggler />
		</li>
		<div
			aria-hidden="true"
			class="underline"
			style:--pos={page_pos}
			class:invisible={page_pos < 0}
			class:animated={allow_animation}
		/>
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
		grid-template-columns: repeat(var(--items-count), 1fr);
		position: relative;
	}

	.logo {
		width: 1.75rem;
		border-radius: 50%;
		outline: 0.1rem solid var(--border-color);
	}

	a {
		text-decoration: none;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: 0.1rem;
	}

	.name {
		font-size: var(--small-font);
		position: absolute;
		left: -100vw;
	}

	.underline {
		position: absolute;
		height: 0.1rem;
		top: 100%;
		left: 0;
		transform: translateX(calc(var(--pos) * 100%));
		width: calc(100% / var(--items-count));
	}

	.underline.animated {
		transition: transform 200ms ease, opacity 200ms ease;
	}

	.underline.invisible {
		opacity: 0;
	}

	.underline::before {
		content: "";
		position: absolute;
		left: 10%;
		width: 80%;
		height: 100%;
		background-color: var(--accent-color);
	}

	@media (min-width: 38rem) {
		nav {
			padding-block: 1rem;
		}

		.name {
			position: unset;
			left: unset;
		}
	}
</style>
