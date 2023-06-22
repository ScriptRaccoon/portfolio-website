<script lang="ts">
	import { page } from "$app/stores";

	import logo from "$lib/assets/ScriptRaccoon.png";
	import ThemeToggler from "./ThemeToggler.svelte";

	import Fa from "svelte-fa";
	import {
		faYoutube,
		type IconDefinition,
	} from "@fortawesome/free-brands-svg-icons";
	import {
		faCircleQuestion,
		faClipboardList,
		faEnvelope,
		faPenToSquare,
	} from "@fortawesome/free-solid-svg-icons";

	type link = {
		name: string;
		href: string;
		icon?: IconDefinition;
	};

	const links: link[] = [
		{ name: "Home", href: "/" },
		{ name: "YouTube", href: "/youtube", icon: faYoutube },
		{ name: "Projects", href: "/projects", icon: faClipboardList },
		{ name: "Blog", href: "/blog", icon: faPenToSquare },
		{ name: "About", href: "/about", icon: faCircleQuestion },
		{ name: "Contact", href: "/contact", icon: faEnvelope },
	];
</script>

<nav>
	<ul class="no-bullets">
		{#each links as { name, href, icon }}
			<li
				class:current={(href === "/" && $page.url.pathname === "/") ||
					(href !== "/" && $page.url.pathname.startsWith(href))}
			>
				<a {href}>
					{#if name === "Home"}
						<img class="logo" src={logo} alt="Home" />
					{:else}
						<Fa {icon} />
						<span class="name">{name}</span>
					{/if}
				</a>
			</li>
		{/each}
		<li>
			<ThemeToggler />
		</li>
	</ul>
</nav>

<style>
	nav {
		padding-block: 1rem;
		border-bottom: 1px solid var(--border-color);
		position: sticky;
		top: 0;
		background-color: var(--bg-color);
		box-shadow: 0rem -2rem 0rem 2rem var(--bg-color);
		z-index: 1;
	}

	ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.logo {
		width: 2rem;
		border-radius: 50%;
	}

	a {
		text-decoration: none;
	}

	li {
		position: relative;
	}

	li.current::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: -0.15rem;
		height: 0.1rem;
		background-color: var(--accent-color);
		border-radius: 100vw;
	}

	.name {
		font-size: var(--small-font);
	}

	@media (max-width: 38rem) {
		nav {
			padding-block: 0.5rem;
		}

		li:not(.current) .name {
			/* visually hidden */
			width: 1;
			height: 1;
			overflow: hidden;
			position: absolute;
			left: -10000px;
		}
	}
</style>
