<script lang="ts">
	import logo from "$lib/assets/ScriptRaccoon.png";
	import {
		faCodepen,
		faGit,
		faGithub,
		faTwitter,
	} from "@fortawesome/free-brands-svg-icons";
	import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
</script>

<h1>Script Raccoon</h1>

<p>Welcome! I am Martin, a web developer based in Berlin, Germany.</p>

<p>
	Here you can find out more <a href="/about">about myself</a> and my
	<a href="/projects">personal projects</a>. I also write
	<a href="/blog">blog posts</a>.
</p>

<p class="logo-container">
	<img src={logo} alt="raccoon logo" />
</p>

<ul class="no-bullets socials">
	<li>
		<a
			aria-label="Email"
			href="mai&#108;t&#111;&#58;s&#99;r%69pt%72%61cc%6F&#111;%6E%40&#103;mail&#46;c%6&#70;m"
		>
			<Fa icon={faEnvelope} />
		</a>
	</li>
	<li>
		<a
			aria-label="Twitter"
			href="https://twitter.com/scriptraccoon"
			target="_blank"
		>
			<Fa icon={faTwitter} /></a
		>
	</li>

	<li>
		<a
			aria-label="GitHub"
			href="https://github.com/scriptraccoon"
			target="_blank"
		>
			<Fa icon={faGithub} />
		</a>
	</li>
	<li>
		<a
			aria-label="Codepen"
			href="https://codepen.com/scriptraccoon"
			target="_blank"
		>
			<Fa icon={faCodepen} />
		</a>
	</li>
</ul>

<style lang="scss">
	.logo-container {
		margin-block: 2rem;
		display: flex;
		justify-content: center;
		img {
			width: min(70vw, 8rem);
			border-radius: 50%;
			box-shadow: 0rem 0rem 1rem var(--shadow-color);
		}
	}
	.socials {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1.5rem;
		font-size: 1.5rem;
	}
</style>
