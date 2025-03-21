<script lang="ts">
	import { project_filter } from '$lib/shared/state.svelte'
	import type { ProjectFilterData } from '$lib/shared/types'
	import Expand from './Expand.svelte'

	type Props = ProjectFilterData

	let { tags, years }: Props = $props()
</script>

<section aria-label="Project Filters">
	<Expand summary="Toggle filters">
		<div class="filter-list" role="group">
			{#each tags as tag}
				<label
					class="tag"
					class:selected={project_filter.value.tags.includes(tag)}
				>
					<input
						type="checkbox"
						value={tag}
						bind:group={project_filter.value.tags}
						class="visually-hidden"
					/>
					{tag}
				</label>
			{/each}

			{#each years as year}
				<label
					class="tag"
					class:selected={project_filter.value.years.includes(year)}
				>
					<input
						type="checkbox"
						value={year}
						bind:group={project_filter.value.years}
						class="visually-hidden"
					/>
					{year}
				</label>
			{/each}
		</div>
	</Expand>
</section>

<style lang="scss">
	.filter-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-block: 1rem;
	}

	label {
		cursor: pointer;

		&.selected {
			background-color: var(--accent-color);
			color: var(--inverted-font-color);
		}

		&:has(:focus-visible) {
			outline: 0.1rem solid var(--accent-color);
		}
	}
</style>
