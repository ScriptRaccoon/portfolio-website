<h1>About me</h1>

<div class="intro">
	<img src="portrait.webp" alt="Martin portrait" />
	<p class="subtitle">
		Mathematician | Web developer | Content creator
	</p>
	<p class="me">
		My name is Martin Brandenburg. I live in Berlin, Germany. 🏡
	</p>
</div>

<p>
	Before coming to web development, I devoted most years of my life to
	<strong>pure mathematics</strong>, which is one of my biggest
	passions and strongest skills. I worked at the university and
	completed my Ph.D. in 2014. 🎓
</p>

<p>
	My mathematical publications are listed at
	<a
		href="https://ncatlab.org/nlab/show/Martin+Brandenburg"
		target="_blank">my nLab page</a
	>, but I have also written thousands of posts in discussion forums,
	notably on
	<a
		href="https://mathoverflow.net/users/2841/martin-brandenburg"
		target="_blank">mathoverflow</a
	>
	and
	<a
		href="https://math.stackexchange.com/users/1650/martin-brandenburg"
		target="_blank">math.stackexchange</a
	>. In 2014 I left academia, but I still publish research articles
	from time to time. I also published a
	<a
		href="https://link.springer.com/book/10.1007/978-3-662-53521-9"
		target="_blank">textbook on category theory</a
	>. 📚
</p>

<p>
	After leaving university, I worked as an IT admin in a non-profit
	organization for animal welfare. In this context, I learned the
	basics of web development and devoted most of my free time on it
	since 2019. I also observed many parallels between mathematics and
	web development, and my problem-solving skills helped me a lot.
	Around that time I also created my
	<a href="/youtube"><strong>YouTube channel</strong></a> on web development.
	💻
</p>

<p>
	Since 2022 I work as a full stack <strong>web developer</strong>
	for a company in the sports retail industry. If you are interested, see
	<a href="/skills">Skills</a> for a more complete list of my web development
	skills. 🧪
</p>

<p>
	In the context of web development, on YouTube and Twitter I go by
	the name
	<strong>Script Raccoon</strong>. And yes, raccoons are my favorite
	animals! 🦝
</p>
<p>
	When I am not sitting at my laptop coding SvelteKit apps, you can
	probably find me in the rehearsal room
	<strong>playing the drums</strong>. 🥁
</p>

<style>
	img {
		border-radius: 100vw;
		width: 130px;
	}

	.intro {
		display: grid;
	}

	.subtitle {
		color: var(--h3-color);
	}

	img {
		grid-row: 2;
		justify-self: center;
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

		.subtitle {
			margin: 0;
		}

		.me {
			grid-row: 2;
		}
	}
</style>
