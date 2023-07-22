<script lang="ts" context="module">
	import { writable } from "svelte/store";

	type filter = {
		tags: string[];
		years: number[];
	};

	export const active_filter = writable<filter>({
		tags: [],
		years: [],
	});
</script>

<script lang="ts">
	export let tags: string[];
	export let years: number[];
	let focussed_tag: string | null = null;
	let focussed_year: number | null = null;
	let open = false;
</script>

<section aria-label="Filters">
	<details bind:open>
		<summary class:open>Filters</summary>
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
	summary {
		color: var(--secondary-font-color);
		width: fit-content;
		&.open {
			color: var(--font-color);
		}
	}

	.filter-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-block: 1rem;
	}

	label {
		cursor: pointer;
		&.selected {
			background-color: var(--accent-color);
			color: var(--inverted-font-color);
		}
		&.focus {
			outline: 0.1rem solid var(--accent-color);
		}
	}
</style>
