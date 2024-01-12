<script lang="ts">
	import { fade } from "svelte/transition";
	import type { project } from "$lib/shared/types";
	import PreviewCard from "$lib/components/PreviewCard.svelte";
	import { allow_animation } from "$lib/shared/stores";

	export let project: project;

	const duration = $allow_animation ? 200 : 0;

	const image_src = new URL(
		`../assets/projects/${project.id}_thumb.webp`,
		import.meta.url,
	).href;
</script>

<li transition:fade={{ duration }}>
	<PreviewCard href="/projects/{project.id}">
		<div class="grid">
			<div>
				<h2>
					{project.name}
				</h2>
				<div class="teaser">
					{project.teaser}
				</div>
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
