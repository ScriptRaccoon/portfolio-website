import { browser } from "$app/environment";
import type { ProjectFilterData } from "./types";

export const project_filter = $state<{ value: ProjectFilterData }>({
	value: { tags: [], years: [] },
});

const initial_theme =
	browser && localStorage.getItem("theme") === "dark"
		? "dark"
		: "light";

export const current_theme = $state<{
	value: "light" | "dark";
	toggle: () => void;
}>({
	value: initial_theme,
	toggle: () => {
		if (!browser) return;
		const new_theme =
			current_theme.value === "dark" ? "light" : "dark";
		current_theme.value = new_theme;
		localStorage.setItem("theme", new_theme);
		document.body.setAttribute("data-theme", new_theme);
	},
});
