import { writable } from "svelte/store";

export const allow_animation = writable(
	typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: no-preference)")
			.matches,
);
