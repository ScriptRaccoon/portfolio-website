<script lang="ts">
	import { fade } from "svelte/transition";
	import type { project } from "./types";
	import PreviewCard from "$lib/components/PreviewCard.svelte";
	export let project: project;
	const image_src = new URL(
		`../../lib/assets/projects/${project.id}_thumb.webp`,
		import.meta.url,
	).href;
</script>

<li transition:fade|local={{ duration: 200 }}>
	<PreviewCard href="../projects/{project.id}">
		<div class="grid">
			<div>
				<h2>{project.name}</h2>
				<div class="teaser">{project.teaser}</div>
				<div class="more">More...</div>
			</div>
			<div class="image-container">
				<img
					src={image_src}
					alt="screenshot of the project"
					loading="lazy"
				/>
			</div>
		</div>
	</PreviewCard>
</li>

<style>
	.grid {
		display: grid;
		grid-template-columns: 3fr 2fr;
		align-items: center;
		gap: 0.25rem;
	}

	.teaser {
		color: var(--secondary-font-color);
		margin-bottom: 0.5rem;
	}

	.image-container {
		display: flex;
		justify-content: center;
	}
</style>
