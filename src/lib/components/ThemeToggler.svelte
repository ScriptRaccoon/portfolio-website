<script lang="ts">
	import Fa from "svelte-fa";
	import { faMoon } from "@fortawesome/free-solid-svg-icons";
	import { faSun } from "@fortawesome/free-regular-svg-icons";
	import { onMount } from "svelte";
	import { THEMES } from "$lib/shared/config";

	let current_theme: string;

	onMount(() => {
		const saved_theme =
			document.documentElement.getAttribute("data-theme");
		if (saved_theme && Object.values(THEMES).includes(saved_theme)) {
			current_theme = saved_theme;
			return;
		}

		const preference_is_dark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		const theme = preference_is_dark ? THEMES.DARK : THEMES.LIGHT;

		set_theme(theme);
	});

	function set_theme(theme: string) {
		if (!Object.values(THEMES).includes(theme)) return;
		const one_year = 60 * 60 * 24 * 365;
		document.cookie = `theme=${theme}; max-age=${one_year}; path=/`;
		document.documentElement.setAttribute("data-theme", theme);
		current_theme = theme;
	}

	function toggle_theme(): void {
		const theme =
			current_theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
		set_theme(theme);
	}
</script>

<button
	on:click={toggle_theme}
	aria-label="Toggle theme, current theme is {current_theme}"
>
	<Fa icon={current_theme === THEMES.DARK ? faMoon : faSun} />
</button>

<style>
	button {
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
