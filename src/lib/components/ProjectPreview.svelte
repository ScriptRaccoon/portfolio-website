<script lang="ts">
	import type { ProjectMetaData } from '$lib/shared/types'
	import PreviewCard from '$lib/components/PreviewCard.svelte'
	import More from './More.svelte'

	type Props = {
		project: ProjectMetaData
	}

	let { project }: Props = $props()
</script>

<PreviewCard href="/projects/{project.id}">
	<div class="grid">
		<div>
			<h2>
				{project.name}
			</h2>
			<div class="teaser">
				{project.teaser}
			</div>
			<More />
		</div>
		<div class="image-container">
			<img
				src={`/media/projects/${project.id}_thumb.webp`}
				alt="screenshot of the project"
				loading="lazy"
			/>
		</div>
	</div>
</PreviewCard>

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
