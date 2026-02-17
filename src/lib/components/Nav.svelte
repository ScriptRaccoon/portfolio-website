<script lang="ts">
	import { page } from '$app/state'
	import { getContext } from 'svelte'
	import ThemeToggler from './ThemeToggler.svelte'
	import { faYoutube } from '@fortawesome/free-brands-svg-icons'
	import { faDisplay, faUser } from '@fortawesome/free-solid-svg-icons'
	import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
	import IconLink from './IconLink.svelte'
	import HomeLink from './HomeLink.svelte'
	import NavUnderline from './NavUnderline.svelte'

	const links = [
		{
			name: 'YouTube',
			path: '/youtube',
			icon: faYoutube,
		},
		{
			name: 'Projects',
			path: '/projects',
			icon: faDisplay,
		},
		{
			name: 'Blog',
			path: '/blog',
			icon: faPenToSquare,
		},
		{
			name: 'About',
			path: '/about',
			icon: faUser,
		},
	] as const

	let page_pos = $derived.by(() => {
		const pathname = page.url.pathname
		if (pathname === '/') return 0
		const index = links.findIndex(({ path }) => pathname.startsWith(path))
		return index >= 0 ? index + 1 : -1
	})

	const animated = getContext<boolean>('allow_animation')

	const number_items = links.length + 2
</script>

<nav>
	<ul class="no-bullets" style:--cols={number_items}>
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
		<NavUnderline pos={page_pos} {animated} cols={number_items} />
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

		@media (min-width: 38rem) {
			padding-block: 1rem;
		}
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
</style>
