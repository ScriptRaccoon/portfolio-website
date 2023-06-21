<script lang="ts">
	import { fade } from "svelte/transition";
	import type { project } from "./types";
	export let project: project;
	const image_src = new URL(
		`../../lib/assets/projects/${project.id}_thumb.webp`,
		import.meta.url,
	).href;
</script>

<li transition:fade|local={{ duration: 200 }}>
	<a href="../projects/{project.id}">
		<div>
			<h2>{project.name}</h2>
			<div class="teaser">{project.teaser}</div>
			<div class="more">More...</div>
		</div>
		<div class="image-container">
			<img src={image_src} alt="screenshot" loading="lazy" />
		</div>
	</a>
</li>

<style>
	a {
		text-decoration: none;
		padding-block: 1rem;
		border-bottom: 1px solid var(--border-color);
		display: block;
	}

	.teaser {
		color: var(--secondary-font-color);
		margin-bottom: 0.5rem;
	}

	.more {
		font-size: var(--small-font);
		text-decoration: underline;
		margin-bottom: 1rem;
	}

	.image-container {
		display: flex;
		justify-content: center;
	}

	@media (min-width: 30rem) {
		a {
			display: grid;
			grid-template-columns: 2fr 1fr;
			align-items: center;
			gap: 0.5rem;
		}
		.more {
			margin-bottom: 0rem;
		}
	}
</style>
