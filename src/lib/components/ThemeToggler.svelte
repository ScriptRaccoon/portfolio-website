<script lang="ts">
	import { browser } from "$app/environment";
	import Fa from "svelte-fa";
	import { faMoon } from "@fortawesome/free-solid-svg-icons";
	import { faSun } from "@fortawesome/free-regular-svg-icons";

	type theme_type = "light" | "dark";

	let theme: theme_type = "light";

	if (browser) compute_user_preference();

	function compute_user_preference() {
		const saved_theme = localStorage.getItem(
			"theme",
		) as theme_type | null;

		if (saved_theme) {
			theme = saved_theme;
			if (theme === "dark") {
				document.documentElement.classList.add("dark");
			}
		} else if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			theme = "dark";
			document.documentElement.classList.add("dark");
		}
	}

	function toggle_theme() {
		theme = theme === "light" ? "dark" : "light";
		document.documentElement.classList.toggle("dark");
		localStorage.setItem("theme", theme);
	}
</script>

<button
	on:click={toggle_theme}
	aria-label="Toggle theme, current theme is {theme}"
>
	<Fa icon={theme === "dark" ? faMoon : faSun} />
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
