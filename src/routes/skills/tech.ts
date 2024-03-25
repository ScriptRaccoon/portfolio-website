export type tech_level = "expert" | "familiar" | "basic" | "nogo";

type tech = {
	name: string;
	url: string;
	level: tech_level;
};

export const headings: Record<tech_level, string> = {
	expert: "Expert knowledge",
	familiar: "Familiarity",
	basic: "Basic knowledge",
	nogo: "I am familiar with it but won't use it since it's a maintainability nightmare",
};

export const tech_list: tech[] = [
	{
		name: "JavaScript",
		url: "https://developer.mozilla.org/de/docs/Web/JavaScript",
		level: "expert",
	},
	{
		name: "TypeScript",
		url: "https://www.typescriptlang.org/",
		level: "expert",
	},
	{
		name: "CSS",
		url: "https://developer.mozilla.org/de/docs/Web/CSS",
		level: "expert",
	},
	{
		name: "Git",
		url: "https://git-scm.com/",
		level: "expert",
	},
	{
		name: "GitHub",
		url: "https://github.com/",
		level: "expert",
	},
	{
		name: "Sass",
		url: "https://sass-lang.com",
		level: "expert",
	},
	{
		name: "Canvas API",
		url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API",
		level: "expert",
	},
	{
		name: "HTML",
		url: "https://developer.mozilla.org/de/docs/Web/HTML",
		level: "expert",
	},
	{
		name: "Svelte",
		url: "https://svelte.dev/",
		level: "expert",
	},
	{
		name: "SvelteKit",
		url: "https://kit.svelte.dev/",
		level: "expert",
	},
	{
		name: "Node.js",
		url: "https://nodejs.org",
		level: "expert",
	},
	{
		name: "Google Apps Script",
		url: "https://developers.google.com/apps-script",
		level: "expert",
	},
	{
		name: "Visual Studio Code",
		url: "https://code.visualstudio.com/",
		level: "expert",
	},
	{
		name: "jQuery",
		url: "https://jquery.com/",
		level: "expert",
	},
	{
		name: "Astro",
		url: "https://astro.build",
		level: "familiar",
	},
	{
		name: "Firebase",
		url: "https://firebase.google.com/",
		level: "familiar",
	},
	{
		name: "MongoDB",
		url: "https://mongodb.com",
		level: "familiar",
	},
	{
		name: "Supabase",
		url: "https://supabase.com",
		level: "familiar",
	},
	{
		name: "Vite",
		url: "https://vitejs.dev",
		level: "familiar",
	},
	{
		name: "Vue.js",
		url: "https://vuejs.org/",
		level: "familiar",
	},
	{
		name: "React",
		url: "https://reactjs.org/",
		level: "familiar",
	},
	{
		name: "Next.js",
		url: "https://nextjs.org/",
		level: "familiar",
	},
	{
		name: "PHP",
		url: "https://www.php.net/",
		level: "familiar",
	},
	{
		name: "Python",
		url: "https://www.python.org/",
		level: "familiar",
	},
	{
		name: "Express",
		url: "http://expressjs.com/",
		level: "familiar",
	},
	{
		name: "EJS",
		url: "https://ejs.co/",
		level: "familiar",
	},
	{
		name: "Mocha",
		url: "https://mochajs.org/",
		level: "familiar",
	},
	{
		name: "Chai",
		url: "https://www.chaijs.com/",
		level: "familiar",
	},
	{
		name: "Jest",
		url: "https://jestjs.io/",
		level: "familiar",
	},
	{
		name: "Cypress",
		url: "https://cypress.io",
		level: "familiar",
	},
	{
		name: "Cucumber",
		url: "https://cucumber.io/",
		level: "familiar",
	},
	{
		name: "SVG",
		url: "https://developer.mozilla.org/en-US/docs/Web/SVG?",
		level: "familiar",
	},
	{
		name: "esbuild",
		url: "https://esbuild.github.io/",
		level: "familiar",
	},
	{
		name: "gulp",
		url: "https://gulpjs.com/",
		level: "familiar",
	},
	{
		name: "Java",
		url: "https://www.java.com",
		level: "basic",
	},
	{
		name: "MySQL",
		url: "https://www.mysql.com/",
		level: "basic",
	},

	{
		name: "Lit",
		url: "https://lit.dev",
		level: "basic",
	},
	{
		name: "Alpine",
		url: "https://alpinejs.dev",
		level: "basic",
	},
	{
		name: "SolidJS",
		url: "https://solidjs.com",
		level: "basic",
	},
	{
		name: "Pug",
		url: "https://pugjs.org/",
		level: "basic",
	},
	{
		name: "Tailwind",
		url: "blog/tailwind-disadvantages",
		level: "nogo",
	},
];
