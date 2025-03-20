<script lang="ts">
	import { getContext } from "svelte";
	import { fade } from "svelte/transition";

	import type { ProjectMetaData } from "$lib/shared/types";
	import PreviewCard from "$lib/components/PreviewCard.svelte";

	type Props = {
		project: ProjectMetaData;
	};

	let { project }: Props = $props();

	const duration = getContext("allow_animation") ? 200 : 0;
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
					style="view-transition-name: image_{project.id}"
					src={`/media/projects/${project.id}_thumb.webp`}
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
