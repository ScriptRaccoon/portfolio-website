<script lang="ts">
	import Expand from './Expand.svelte'

	type Props = {
		tags: string[]
		years: number[]
		selected_tags: string[]
		selected_years: number[]
	}

	let {
		tags,
		years,
		selected_tags = $bindable(),
		selected_years = $bindable(),
	}: Props = $props()
</script>

<Expand summary="Toggle filters">
	<div class="filter-list" role="group">
		{#each tags as tag}
			<label class="tag" class:selected={selected_tags.includes(tag)}>
				<input
					type="checkbox"
					value={tag}
					bind:group={selected_tags}
					class="sr-only"
				/>
				{tag}
			</label>
		{/each}

		{#each years as year}
			<label class="tag" class:selected={selected_years.includes(year)}>
				<input
					type="checkbox"
					value={year}
					bind:group={selected_years}
					class="sr-only"
				/>
				{year}
			</label>
		{/each}
	</div>
</Expand>

<style>
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
