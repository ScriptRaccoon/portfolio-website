export const NO_TAG = "All";

export const all_tags = [
	NO_TAG,
	"3D",
	"Alpine",
	"Astro",
	"Authentication",
	"Browser game",
	"Creative Coding",
	"CSS",
	"Data visualization",
	"Express",
	"Firebase",
	"Full Stack",
	"HTML Canvas",
	"Lit",
	"MongoDB",
	"Music",
	"React",
	"Sass",
	"socket.io",
	"SolidJS",
	"Supabase",
	"Svelte",
	"SvelteKit",
	"Tool",
	"Vanilla JS",
	"Vue",
] as const;

export type tag = (typeof all_tags)[number];
