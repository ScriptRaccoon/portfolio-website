<script lang="ts">
	import {
		faCodepen,
		faGithub,
		faTwitter,
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

<style>
	ul {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1.5rem;
		font-size: var(--large-font);
	}
</style>
