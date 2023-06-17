<script lang="ts">
	import { active_filter, filters_expanded } from "./stores";
	export let tags: string[];
	export let years: number[];
	let focussed_tag: string | null = null;
	let focussed_year: number | null = null;
</script>

<section aria-label="Filters">
	<details bind:open={$filters_expanded}>
		<summary>Filters</summary>
		<div class="filter-list">
			{#each tags as tag}
				<label
					class="tag"
					class:selected={$active_filter.tags.includes(tag)}
					class:focus={focussed_tag === tag}
					on:focusin={() => (focussed_tag = tag)}
					on:focusout={() => (focussed_tag = null)}
				>
					<input
						type="checkbox"
						value={tag}
						bind:group={$active_filter.tags}
						class="visually-hidden"
					/>
					{tag}
				</label>
			{/each}
			{#each years as year}
				<label
					class="tag"
					class:selected={$active_filter.years.includes(year)}
					class:focus={focussed_year === year}
					on:focusin={() => (focussed_year = year)}
					on:focusout={() => (focussed_year = null)}
				>
					<input
						type="checkbox"
						value={year}
						bind:group={$active_filter.years}
						class="visually-hidden"
					/>
					{year}
				</label>
			{/each}
		</div>
	</details>
</section>

<style lang="scss">
	.filter-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-block: 1rem;
	}
	label {
		cursor: pointer;
		&.selected {
			background-color: var(--primary-color);
			color: var(--inverted-font-color);
		}
		&.focus {
			outline: 0.1rem solid var(--primary-color);
			outline-offset: 0.15rem;
		}
	}
</style>
