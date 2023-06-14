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
	<ul class="no-bullets">
		{#each links as { name, href }}
			<li>
				<a {href} class:current={$page.url.pathname === href}>
					{#if name === "Home"}
						<img class="logo" src={logo} alt="Home" />
					{:else}
						{name}
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	nav {
		padding-block: 1rem;
		border-bottom: 1px solid var(--light-color);
		position: sticky;
		top: 0;
		background-color: var(--bg-color);
		box-shadow: 0rem -2rem 0rem 2rem var(--bg-color);

		@media (max-width: 38rem) {
			padding-block: 0.5rem;
		}
	}

	ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;

		@media (max-width: 38rem) {
			font-size: var(--small-font);
			row-gap: 0rem;
			column-gap: 0.75rem;
			justify-content: start;
		}
	}

	.current {
		color: var(--primary-color);
	}

	.logo {
		width: 2rem;
	}
</style>
