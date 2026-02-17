<script lang="ts">
	import {
		faBluesky,
		faCodepen,
		faGithub,
		faXTwitter,
		faYoutube,
	} from '@fortawesome/free-brands-svg-icons'
	import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
</script>

<ul class="no-bullets">
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
			aria-label="GitHub"
			href="https://github.com/scriptraccoon"
			target="_blank"
		>
			<Fa icon={faGithub} />
		</a>
	</li>

	<li>
		<a aria-label="YouTube" href="https://www.youtube.com/scriptraccoon">
			<Fa icon={faYoutube} />
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

	<li>
		<a
			aria-label="Twitter"
			href="https://twitter.com/scriptraccoon"
			target="_blank"
		>
			<Fa icon={faXTwitter} />
		</a>
	</li>

	<li>
		<a
			aria-label="Bluesky"
			href="https://bsky.app/profile/scriptraccoon.dev"
			target="_blank"
		>
			<Fa icon={faBluesky} />
		</a>
	</li>
</ul>

<style>
	ul {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1.5rem;
		font-size: var(--large-font);
	}
</style>
