import type { tag } from "./tags";

export type project = {
	name: string;
	id: string;
	tags: tag[];
	description: string;
	repository: string;
	tutorial?: string;
	url?: string;
	year: number;
	text: string;
};

export const all_projects: project[] = [
	{
		name: "URL shortener <i>svt.ink</i>",
		repository: "https://github.com/ScriptRaccoon/svt.ink",
		url: "https://svt.ink/",
		tags: ["SvelteKit", "Tool", "Full Stack", "MongoDB"],
		description: "made with SvelteKit and MongoDB",
		id: "urlshortener",
		year: 2023,
		text: "This is a URL shortener made with SvelteKit. The redirections are stored in a MongoDB database.",
	},
	{
		name: "User authentication in SvelteKit",
		repository:
			"https://github.com/ScriptRaccoon/sveltekit-mongodb-auth",
		url: "https://sveltekit-auth.netlify.app/",
		tutorial: "https://youtu.be/gNOzCaOCxBU",
		tags: [
			"Authentication",
			"Full Stack",
			"SvelteKit",
			"MongoDB",
			"Tutorial",
		],
		description:
			"with JWTs, users being stored in a MongoDB database",
		id: "sveltekituserauth",
		year: 2023,
		text: "This is a template of a SvelteKit project which authenticates users stored in MongoDB, using JWTs. Users can register, login, open a dashboard and an account page.",
	},

	{
		name: "How to password-protect SvelteKit pages",
		repository: "https://github.com/ScriptRaccoon/sveltekit-password",
		url: "https://sveltekit-password.netlify.app/",
		tags: ["Authentication", "SvelteKit", "Tutorial"],
		description: "using page server loads and environment variables",
		id: "passwordprotection",
		year: 2023,
		tutorial: "https://youtu.be/Gf5cOJCAh4U",
		text: "This repository demonstrates how to password-protect a single or multiple pages inside of a SvelteKit application.",
	},

	{
		name: "Codeblock components with Shiki",
		repository: "https://github.com/ScriptRaccoon/codeblocks",
		url: "https://codeblocks-shiki.netlify.app/",
		tags: ["SvelteKit"],
		description: "to easily display code in Svelte projects",
		id: "codeblocks",
		year: 2023,
		text: "This repository shows how to implement reusable Codeblock components inside of a SvelteKit project, with syntax highlighting by Shiki. This is an alternative to the more common approach with markdown.",
	},

	{
		name: "Animated pie charts in Svelte",
		repository: "https://github.com/ScriptRaccoon/Abgeordnete",
		url: "https://abgeordnete.netlify.app/",
		tags: ["Data visualization", "Svelte", "SVG"],
		description: 'showing the distribution of the German "Bundestag"',
		id: "piecharts",
		year: 2023,
		text: 'An animated pie chart (made with Svelte) that visualizes the distribution of the members of the German "Bundestag" for different age groups.',
	},

	{
		name: "Beautiful pixel animation",
		repository: "https://github.com/ScriptRaccoon/words-of-pixels",
		url: "https://wordsofpixels.netlify.app/",
		tags: ["Creative Coding", "HTML Canvas"],
		description: "creating sequences of images",
		id: "pixelanimation",
		year: 2023,
		text: "This is an animation that creates a sequence of images built up from moving pixels.",
	},

	{
		name: "Quiz app made with Vue and Svelte",
		repository: "https://github.com/ScriptRaccoon/quiz-about-vue",
		url: "https://quiz-about-vue.netlify.app/",
		tags: ["Vue", "Svelte"],
		description:
			"to compare the developer experience of both frameworks",
		id: "quizapp",
		year: 2023,
		text: "This is a small quiz app made with Vue, serving as a demonstration to a feature-identical app made with Svelte. The app is also accessible via keyboard navigation and screen reader usage.",
	},

	{
		name: "Planning Poker app",
		repository: "https://github.com/ScriptRaccoon/planning-poker",
		url: "https://planning-poker-g2q2.onrender.com/",
		tags: [
			"SvelteKit",
			"socket.io",
			"Tool",
			"Authentication",
			"Full Stack",
		],
		description: "made with SvelteKit and socket.io",
		id: "planningpoker",
		year: 2023,
		text: "Planning Poker is played in Scrum teams to estimate tickets for an upcoming sprint. This app is made with SvelteKit and uses socket.io for real-time communication.",
	},

	{
		name: "Google Forms clone <i>Svorm</i>",
		repository: "https://github.com/ScriptRaccoon/svorm",
		url: "https://svorm.netlify.app/",
		tags: ["SvelteKit", "Tool", "Supabase", "Full Stack", "Tutorial"],
		description: "made with SvelteKit and Supabase",
		tutorial:
			"https://www.youtube.com/watch?v=Ab0P2u0XFtY&list=PL1LHMFscti8sJ1R9qn_0fuQMZaSYURQhf",
		id: "svorm",
		year: 2023,
		text: "Google Forms clone made with SvelteKit and Supabase. The forms ('svorms') can be created, answered, and evaluated.",
	},

	{
		name: "Drum Computer",
		repository: "https://github.com/ScriptRaccoon/drumcomputer",
		url: "https://drumcomputer.netlify.app/",
		tags: ["Svelte", "Music", "Tool"],
		description: "accessible to anyone",
		id: "drumcomputer",
		year: 2023,
		text: "This is a drum computer in the browser. It is supposed to be accessible to anyone, even without any knowledge about music. Tracks can be shared with URLs.",
	},

	{
		name: "Chat App",
		repository: "https://github.com/ScriptRaccoon/svelte-chat-app",
		url: "https://svelte-chat-app.onrender.com/",
		tags: [
			"Svelte",
			"Express",
			"socket.io",
			"Tutorial",
			"Full Stack",
		],
		description: "made with Svelte and socket.io",
		id: "chatapp",
		tutorial: "https://www.youtube.com/watch?v=f5Mbd4txon4",
		year: 2023,
		text: "Chat App made with Svelte on the front-end and Express / socket.io on the back-end.",
	},

	{
		name: "Translations of web development terms",
		repository:
			"https://github.com/ScriptRaccoon/translations-web-dev-astro",
		url: "https://translations-web-dev.netlify.app/",
		tags: [
			"Astro",
			"Data visualization",
			"Tool",
			"Tutorial",
			"Svelte",
		],
		description: "made with Astro",
		id: "translations",
		tutorial: "https://www.youtube.com/watch?v=aHZCEiQh9AI",
		year: 2022,
		text: "This Astro project provides a searchable list of translations (English to German) of terms that are commonly used in web development.",
	},

	{
		name: "Beautiful image puzzle effect",
		repository:
			"https://github.com/ScriptRaccoon/image-puzzle-effect",
		url: "https://puzzle-effect.netlify.app/",
		tags: ["CSS", "Creative Coding", "Tutorial"],
		description: "fully customizable",
		id: "imagepuzzleeffect",
		tutorial: "https://www.youtube.com/watch?v=fT1VR5LF-Cs",
		year: 2022,
		text: "Beautiful puzzle effect for images. It is fully customizable.",
	},

	{
		name: "Conway's Game of Life",
		repository:
			"https://github.com/ScriptRaccoon/game-of-life-svelte",
		url: "https://game-of-life-svelte.netlify.app/",
		tags: ["Svelte", "Browser game", "Creative Coding", "Tutorial"],
		description: "made with Svelte",
		id: "gameoflife",
		tutorial: "https://www.youtube.com/watch?v=_JT3w4y-Dlc",
		year: 2022,
		text: "Conway's Game of Life as a fullscreen browser game, made with Svelte.",
	},

	{
		name: "Rock, Paper, Scissors game with CSS only",
		repository:
			"https://github.com/ScriptRaccoon/rock-paper-scissors-css",
		url: "https://rps-css.netlify.app/",
		tags: ["CSS", "Browser game", "Tutorial"],
		description: "without JavaScript!",
		id: "rockpaperscissors",
		tutorial: "https://www.youtube.com/watch?v=raxsg0Lxdqg",
		year: 2022,
		text: "This Rock, Paper, Scissors game is written in HTML and CSS. No JavaScript is required! The state management is done with CSS selectors.",
	},

	{
		name: "Graph editor",
		repository: "https://github.com/ScriptRaccoon/graph-editor-svg",
		url: "https://graph-editor-svg.netlify.app/",
		tags: ["Svelte", "Tool", "Tutorial", "SVG"],
		description: "made with Svelte and SVG",
		id: "grapheditor",
		tutorial: "https://www.youtube.com/watch?v=ot4pcN_IQn8",
		year: 2022,
		text: "Interactive graph editor made with Svelte and SVG. Nodes and edges can be edited easily by clicking on them.",
	},

	{
		name: "Complex to-do app",
		repository: "https://github.com/ScriptRaccoon/GetThisDone",
		url: "https://get-this-done.netlify.app/",
		tags: ["Svelte", "Tool", "Tutorial"],
		tutorial: "https://www.youtube.com/watch?v=ksHlDm727u4",
		description:
			"made with Svelte, with multiple task lists and animations",
		id: "getthisdone",
		year: 2022,
		text: "This is a (not so basic) to-do app made with Svelte, featuring in particular many of the built-in animations of Svelte. The tasks can be structured within several lists.",
	},

	{
		name: "Rubik's Cube with CSS",
		description: "fully functional, made with Svelte",
		url: "https://rubikscubesvelte.netlify.app",
		repository: "https://github.com/ScriptRaccoon/RubiksCubeSvelte",
		tags: ["Svelte", "CSS", "Browser game", "3D", "Tutorial"],
		tutorial: "https://www.youtube.com/watch?v=GdlUdnYZnfc",
		id: "rubikscube",
		year: 2022,
		text: "Fully functional Rubik's Cube. The graphics are made with 3-dimensional CSS, no graphics library is used. Svelte makes it easy to construct the cube from its components.",
	},

	{
		name: "Secure wordle clone <i>Svorlde</i>",
		description: "made with Svelte and serverless functions",
		url: "https://svordle.netlify.app",
		repository: "https://github.com/ScriptRaccoon/Svordle",
		tags: [
			"Svelte",
			"Browser game",
			"Full Stack",
			"Tutorial",
			"Serverless",
		],
		tutorial: "https://youtu.be/CMIwJLS0dns",
		id: "svordle",
		year: 2022,
		text: "The <a href='https://www.nytimes.com/games/wordle' target='_blank'>Wordle game</a> built with Svelte on the front-end and Netlify's serverless functions on the back-end. Cheating is impossible since the correct word gets encrypted.",
	},

	{
		name: "Pool game",
		description: "made with Vanilla JS, featuring rich graphics",
		url: "https://pool-game.netlify.app",
		repository: "https://github.com/ScriptRaccoon/pool-game",
		tags: ["Vanilla JS", "HTML Canvas", "Browser game", "Tutorial"],
		tutorial:
			"https://www.youtube.com/playlist?list=PL1LHMFscti8vGfIvK5-9P5RAavTxzoQWP",
		id: "poolgame",
		year: 2022,
		text: "Fun pool game written in Vanilla JS. All drawing operations are done with an HTML canvas. Includes physics, light effects, shadows, and sound effects.",
	},

	{
		name: "Sphere animation",
		description: "made with 3-dimensional CSS",
		url: "https://css-sphere.netlify.app",
		repository: "https://github.com/ScriptRaccoon/css-sphere",
		tags: ["3D", "CSS", "Creative Coding"],
		id: "sphereanimation",
		year: 2022,
		text: "An animated sphere made with 3-dimensional CSS. You can also put the view inside of the sphere. This works by animating the perspective. Works best in Chrome.",
	},

	{
		name: "Run diary",
		description: "made with Svelte, clone of Strava's training log",
		repository: "https://github.com/ScriptRaccoon/run-diary",
		tags: ["Tool", "Svelte", "Data visualization"],
		id: "rundiary",
		year: 2022,
		text: "This is a clone of Strava's training log which is otherwise only available in the paid version. It shows all of your runs as bubbles whose sizes correspond to the total distance.",
	},

	{
		name: "Doodle clone made with SvelteKit",
		description: "made with SvelteKit",
		url: "https://svoodle.netlify.app",
		repository: "https://github.com/ScriptRaccoon/svoodle",
		tags: ["Full Stack", "SvelteKit", "Firebase", "Tool"],
		id: "svoodle",
		year: 2022,
		text: "A <a href='https://doodle.com' target='_blank'>doodle</a>-like app made with SvelteKit and Firebase which lets you quickly create polls that can be shared via links. Polls get deleted after a month.",
	},

	{
		name: "Comparison of 7 JavaScript frameworks",
		description: "by coding the same app 7 times",
		url: "https://shopping-list-made-with-vanilla-js.netlify.app",
		repository:
			"https://github.com/ScriptRaccoon/shopping-list-frameworks",
		tags: [
			"Vanilla JS",
			"Svelte",
			"React",
			"SolidJS",
			"Vue",
			"Lit",
			"Alpine",
		],
		id: "comparisonframeworks",
		year: 2022,
		text: "The very same shopping list single-page application made with 7 different JavaScript frameworks in order to compare them with respect to developer experience and bundle size.",
	},

	{
		name: "Digital bookshelf",
		description: "made with Svelte and 3-dimensional CSS",
		url: "https://bookshelfsvelte.netlify.app",
		repository: "https://github.com/ScriptRaccoon/BookShelf",
		tags: ["3D", "Svelte", "CSS", "Tool", "Tutorial"],
		tutorial: "https://www.youtube.com/watch?v=gWYgy_JVLlQ",
		id: "bookshelf",
		year: 2022,
		text: "Create a personal digital library. Features 3-dimensional animations for opening/closing the book covers. This project mainly illustrates Svelte components.",
	},

	{
		name: "Weather app",
		description: "made with SvelteKit",
		url: "https://weather-sveltekit.netlify.app/",
		repository: "https://github.com/ScriptRaccoon/sveltekit-weather",
		tags: ["Full Stack", "SvelteKit", "Tutorial"],
		tutorial: "https://youtu.be/akJEOD3El8I",
		id: "weatherapp",
		year: 2022,
		text: "A simple weather app made with SvelteKit. The data comes from <a href='https://openweathermap.org/' target='_blank'>OpenWeather API</a> via a SvelteKit endpoint. Notice that this project uses the old SvelteKit routing structure.",
	},

	{
		name: "Slide puzzles",
		description: "featuring nice graphics and smooth animations",
		repository: "https://github.com/ScriptRaccoon/slidepuzzles",
		url: "https://slidepuzzles.netlify.app/",
		tags: ["Browser game", "CSS", "Vanilla JS"],
		id: "slidepuzzles",
		year: 2022,
		text: "The classical 4 &times; 4 slide puzzle as a browser game, which can be resized up to 10 &times; 10. Featuring nice graphics and smooth animations.",
	},

	{
		name: "Spotify playlist finder",
		description:
			"to find all playlists which contain a specific song",
		repository:
			"https://github.com/ScriptRaccoon/spotify-playlist-finder",
		url: "https://spotify-playlist-finder.onrender.com/",
		tags: ["Tool", "Express", "Vanilla JS", "Authentication"],
		id: "spotifyplaylistfinder",
		year: 2021,
		text: "This tool finds all of your Spotify playlists that contain a specific song. Surprisingly, this specific feature is not built into the Spotify app.",
	},

	{
		name: "onetimesecret clone <i>Whisper Note</i>",
		description: "share secrets via one-time links",
		url: "https://whispernote.onrender.com",
		repository: "https://github.com/ScriptRaccoon/WhisperNote",
		tags: ["Full Stack", "Express", "Firebase", "Tool", "Tutorial"],
		tutorial:
			"https://www.youtube.com/playlist?list=PL1LHMFscti8s2_B2xJaEwMrR5fR73_9U9",
		id: "whispernote",
		year: 2021,
		text: "Share secrets via a one-time link and an optional password, very similar to <a href='https://onetimesecret.com/' target='_blank'>onetimesecret</a>. The data is encrypted and stored in Firebase.",
	},

	{
		name: "Sprite animations",
		description: "made with Vanilla JS",
		repository: "https://github.com/ScriptRaccoon/Sprite-Animation",
		url: "https://sprite-anima.netlify.app/",
		tutorial:
			"https://www.youtube.com/playlist?list=PL1LHMFscti8uBdhvhRqIMBeX_4D-blFo6",
		tags: ["Browser game", "Vanilla JS", "HTML Canvas", "Tutorial"],
		id: "spriteanimations",
		year: 2021,
		text: "This project shows how to make sprite animations with Vanilla JS on an HTML canvas. The code serves as a template for more complex browser games.",
	},

	{
		name: "Space shooter game",
		description: "made with Vanilla JS",
		url: "https://spaceship-parallax.netlify.app",
		repository: "https://github.com/ScriptRaccoon/spaceship-parallax",
		tags: ["Browser game", "Vanilla JS", "HTML Canvas", "Tutorial"],
		tutorial:
			"https://www.youtube.com/playlist?list=PL1LHMFscti8sBtJOzgVKFHpxuMa-moSPX",
		id: "spaceshooter",
		year: 2021,
		text: "In this space shooter game, you navigate a spaceship through space and shoot asteroids with lasers. The stars in the background show a parallax effect, therefore the name.",
	},

	{
		name: "Calendar app",
		description: "made with Vanilla JS and Firebase",
		repository: "https://github.com/ScriptRaccoon/calendar",
		url: "https://wherethetimegoes.netlify.app/",
		tutorial:
			"https://www.youtube.com/playlist?list=PL1LHMFscti8twqDyMR9nb8Eh1pxsn3nlw",
		tags: [
			"Full Stack",
			"Authentication",
			"Tool",
			"Firebase",
			"Vanilla JS",
			"CSS",
			"Tutorial",
		],
		id: "calendar",
		year: 2021,
		text: "Calendar app built with Vanilla JS. Firebase is used for the authentication and storage of events. Responsive design makes it possible to use the calendar on your phone.",
	},

	{
		name: "Cell simulation",
		description: "with several stages of evolution",
		repository: "https://github.com/ScriptRaccoon/Cell-Simulation",
		url: "https://cell-simulation.netlify.app/",
		tags: ["Vanilla JS", "HTML Canvas", "Creative Coding"],
		id: "cellsimulation",
		year: 2021,
		text: "A simulation of cells that are attracted to food and swim toward it. In later stages, various types of other cells with individual behaviors are introduced.",
	},

	{
		name: "Chess program",
		description: "fully featured, made with Vanilla JS",
		repository: "https://github.com/ScriptRaccoon/chess-singleplayer",
		url: "https://chess-singleplayer.netlify.app/",
		tags: ["Browser game", "Vanilla JS", "CSS"],
		id: "chess",
		year: 2020,
		text: "A single-player chess program made with Vanilla JS and Sass. All chess rules are supported. There are highlights for previous and allowed moves.",
	},

	{
		name: "Dancing circles simulation",
		description: "producing fascinating patterns from a simple rule",
		url: "https://dancing-circles.netlify.app",
		repository: "https://github.com/ScriptRaccoon/dancing-circles",
		tags: ["Vanilla JS", "HTML Canvas", "Creative Coding"],
		id: "dancingcircles",
		year: 2020,
		text: "Create circles that dance with each other when they are close enough. Very interesting and complex patterns emerge from a simple rule.",
	},

	{
		name: "Mahjong solitaire game",
		description: "made with Vanilla JS",
		repository: "https://github.com/ScriptRaccoon/mahjong-solitaire",
		url: "https://mahjong-solitaire.netlify.app/",
		tutorial: "https://youtu.be/oWDB4LaO4MU",
		tags: ["Browser game", "Vanilla JS", "CSS", "Tutorial"],
		id: "mahjong",
		year: 2020,
		text: "The classical Mahjong solitaire as a browser game written with Vanilla JS and CSS. You have to select pairs of identical open tiles to remove them from the board until no tiles are left.",
	},
];
