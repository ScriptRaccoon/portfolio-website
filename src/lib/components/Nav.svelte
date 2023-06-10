<script lang="ts">
	import { page } from "$app/stores";

	import logo from "$lib/assets/ScriptRaccoon.png";

	type link = {
		name: string;
		href: string;
	};

	const links: link[] = [
		{ name: "Home", href: "/" },
		{ name: "YouTube", href: "/youtube" },
		{ name: "Projects", href: "/projects" },
		// { name: "Blog", href: "/blog" },
		{ name: "About", href: "/about" },
		{ name: "Contact", href: "/contact" },
	];
</script>

<nav>
	<ul>
		{#each links as { name, href }}
			<li>
				<a {href} class:current={$page.url.pathname === href}>
					{#if name === "Home"}
						<img src={logo} alt="Home" />
					{:else}
						{name}
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		padding-block: 1rem;
		border-bottom: 1px solid var(--light-color);
		position: sticky;
		top: 0;
		background-color: var(--bg-color);
		box-shadow: 0rem -2rem 0rem 2rem var(--bg-color);
	}

	ul {
		list-style-type: none;
		margin: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.current {
		color: var(--primary-color);
	}

	img {
		width: 2rem;
	}

	@media (max-width: 38rem) {
		nav {
			padding-block: 0.5rem;
		}
		ul {
			font-size: 1rem;
			row-gap: 0rem;
			column-gap: 0.75rem;
			justify-content: start;
		}
	}
</style>
