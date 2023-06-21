<script lang="ts">
	import { browser } from "$app/environment";
	import Fa from "svelte-fa";
	import { faMoon } from "@fortawesome/free-solid-svg-icons";
	import { faSun } from "@fortawesome/free-regular-svg-icons";

	type theme_type = "light" | "dark";

	let theme: theme_type = "light";

	if (
		browser &&
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		theme = "dark";
		document.documentElement.classList.add("dark");
	}

	function toggle_theme() {
		theme = theme === "light" ? "dark" : "light";
		document.documentElement.classList.toggle("dark");
	}
</script>

<button on:click={toggle_theme} aria-label="Toggle dark mode">
	<Fa icon={theme === "dark" ? faMoon : faSun} />
</button>
