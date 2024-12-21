<script lang="ts">
	import Fa from "svelte-fa";
	import { faMoon } from "@fortawesome/free-solid-svg-icons";
	import { faSun } from "@fortawesome/free-regular-svg-icons";
	import { current_theme } from "$lib/shared/stores";

	function toggle_theme(): void {
		const new_theme = $current_theme === "dark" ? "light" : "dark";
		set_theme(new_theme);
	}

	function set_theme(theme: "light" | "dark") {
		$current_theme = theme;
		localStorage.setItem("theme", theme);
		document.body.setAttribute("data-theme", theme);
	}
</script>

<button onclick={toggle_theme} aria-label="Toggle theme">
	<Fa icon={faMoon} class="moon" />
	<Fa icon={faSun} class="sun" />
</button>

<style lang="scss">
	button {
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	button :global(svg) {
		position: absolute;

		@media (prefers-reduced-motion: no-preference) {
			transition: opacity 250ms linear, rotate 250ms linear;
		}
	}

	:global(body[data-theme="dark"] .sun),
	:global(body[data-theme="light"] .moon) {
		opacity: 0;
		rotate: 45deg;
	}
</style>
