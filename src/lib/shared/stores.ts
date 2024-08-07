import { writable } from "svelte/store";

export const current_theme = writable<"light" | "dark">(
	typeof window !== "undefined" &&
		localStorage.getItem("theme") === "dark"
		? "dark"
		: "light",
);
