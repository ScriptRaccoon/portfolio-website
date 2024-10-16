type tool = {
	name: string;
	url: string;
};

type tool_list = {
	level: string;
	data: tool[];
};

export const tool_data: tool_list[] = [
	{
		level: "Expert knowledge",
		data: [
			{
				name: "JavaScript",
				url: "https://developer.mozilla.org/de/docs/Web/JavaScript",
			},
			{
				name: "TypeScript",
				url: "https://www.typescriptlang.org/",
			},
			{
				name: "CSS",
				url: "https://developer.mozilla.org/de/docs/Web/CSS",
			},
			{
				name: "Python",
				url: "https://www.python.org/",
			},
			{
				name: "Git",
				url: "https://git-scm.com/",
			},
			{
				name: "GitHub",
				url: "https://github.com/",
			},
			{
				name: "GitHub Copilot",
				url: "https://github.com/features/copilot/",
			},
			{
				name: "Sass",
				url: "https://sass-lang.com",
			},
			{
				name: "Canvas API",
				url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API",
			},
			{
				name: "HTML",
				url: "https://developer.mozilla.org/de/docs/Web/HTML",
			},
			{
				name: "Svelte",
				url: "https://svelte.dev/",
			},
			{
				name: "SvelteKit",
				url: "https://kit.svelte.dev/",
			},
			{
				name: "Node.js",
				url: "https://nodejs.org",
			},
			{
				name: "Express",
				url: "http://expressjs.com/",
			},
			{
				name: "Google Apps Script",
				url: "https://developers.google.com/apps-script",
			},
			{
				name: "Visual Studio Code",
				url: "https://code.visualstudio.com/",
			},
			{
				name: "Jest",
				url: "https://jestjs.io/",
			},
			{
				name: "jQuery",
				url: "https://jquery.com/",
			},
		],
	},
	{
		level: "Advanced knowledge",
		data: [
			{
				name: "Astro",
				url: "https://astro.build",
			},
			{
				name: "Firebase",
				url: "https://firebase.google.com/",
			},
			{
				name: "MongoDB",
				url: "https://mongodb.com",
			},
			{
				name: "Supabase",
				url: "https://supabase.com",
			},
			{
				name: "Vite",
				url: "https://vitejs.dev",
			},
			{
				name: "Vue.js",
				url: "https://vuejs.org/",
			},
			{
				name: "React",
				url: "https://reactjs.org/",
			},
			{
				name: "Next.js",
				url: "https://nextjs.org/",
			},
			{
				name: "PHP",
				url: "https://www.php.net/",
			},
			{
				name: "EJS",
				url: "https://ejs.co/",
			},
			{
				name: "Mocha",
				url: "https://mochajs.org/",
			},
			{
				name: "Chai",
				url: "https://www.chaijs.com/",
			},
			{
				name: "Cypress",
				url: "https://cypress.io",
			},
			{
				name: "Cucumber",
				url: "https://cucumber.io/",
			},
			{
				name: "SVG",
				url: "https://developer.mozilla.org/en-US/docs/Web/SVG?",
			},
			{
				name: "esbuild",
				url: "https://esbuild.github.io/",
			},
			{
				name: "gulp",
				url: "https://gulpjs.com/",
			},
			{
				name: "Tailwind",
				url: "blog/tailwind-disadvantages",
			},
		],
	},
	{
		level: "Basic knowledge",
		data: [
			{
				name: "Java",
				url: "https://www.java.com",
			},
			{
				name: "MySQL",
				url: "https://www.mysql.com/",
			},
			{
				name: "Lit",
				url: "https://lit.dev",
			},
			{
				name: "Alpine",
				url: "https://alpinejs.dev",
			},
			{
				name: "SolidJS",
				url: "https://solidjs.com",
			},
			{
				name: "Pug",
				url: "https://pugjs.org/",
			},
		],
	},
];
