<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte'
</script>

<MetaTags
	title="Script Raccoon - About"
	description="About my journey becoming a web developer"
/>

<header>
	<h1>About me</h1>
</header>

<div class="intro">
	<img src="/media/general/portrait.webp" alt="Martin portrait" />
	<p class="roles">Mathematician | Web developer | Content creator</p>
	<p class="me">
		My name is Martin Brandenburg. I live in Berlin, Germany. 🏡
	</p>
</div>

<p>
	At university I studied <strong>pure mathematics</strong>, which is one of
	my biggest passions and strongest skills. My main expertise is category
	theory and algebraic geometry, and I completed my Ph.D. in 2014. My
	mathematical publications are listed at
	<a href="https://ncatlab.org/nlab/show/Martin+Brandenburg" target="_blank"
		>my nLab page</a
	>. In 2014 I left university, but I still publish and review research
	articles from time to time. I also published a
	<a href="https://www.kategorientheorie.de" target="_blank"
		>textbook on category theory</a
	>. 📚
</p>

<p>
	After leaving university, I worked as an IT admin in a <a
		href="https://albert-schweitzer-stiftung.de/"
		target="_blank">non-profit organization for animal welfare</a
	>. In this context, I learned
	<strong>web development</strong> and devoted most of my free time on it. I also
	observed many parallels between mathematics and web development, and my problem-solving
	skills helped me a lot. 💻
</p>

<p>
	From 2022 to 2025 I worked as a <strong>full stack web developer</strong>
	for a company in the sports retail industry. If you are interested, see
	<a href="/about/tools">Tools</a> for the list of tools I am familiar with. 🧪
</p>

<p>
	I am also actively involved in several online communities. I have written
	thousands of posts in mathematical discussion forums, notably on
	<a
		href="https://mathoverflow.net/users/2841/martin-brandenburg"
		target="_blank">mathoverflow</a
	>,
	<a
		href="https://math.stackexchange.com/users/1650/martin-brandenburg"
		target="_blank">math.stackexchange</a
	>
	and
	<a
		href="https://matheplanet.de/matheplanet/nuke/html/user.php?op=userinfo&uname=Triceratops"
		target="_blank">Matheplanet</a
	>. For the latter I also wrote many expository articles. 📝
</p>

<p>
	In 2019 I created my
	<a href="/youtube">YouTube channel</a> on web development, in which context
	I go by the name
	<strong>Script Raccoon</strong>. In 2024 I also started a
	<a href="https://www.youtube.com/@cuberaccoon" target="_blank"
		>second YouTube channel</a
	>
	on twisty puzzles under the name <strong>Cube Raccoon</strong>. 🦝
</p>

<p>I am also a passionate drummer. 🥁</p>

<style>
	.intro {
		display: grid;
	}

	img {
		border-radius: 100vw;
		width: 130px;
		grid-row: 2;
		justify-self: center;
	}

	.roles {
		color: var(--h3-color);
	}

	@media (min-width: 38rem) {
		.intro {
			column-gap: 2rem;
			grid-template-rows: auto 1fr;
			padding-inline: 1rem;
		}

		img {
			grid-row: 1 / span 2;
		}

		.roles {
			margin: 0;
		}

		.me {
			grid-row: 2;
		}
	}
</style>
