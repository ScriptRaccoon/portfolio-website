<script lang="ts" module>
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
	import Expand from "./Expand.svelte";

	interface Props {
		tags: string[];
		years: number[];
	}

	let { tags, years }: Props = $props();

	let focussed_tag: string | null = $state(null);
	let focussed_year: number | null = $state(null);
</script>

<section aria-label="Filters">
	<Expand summary="Toggle filters" role="group">
		<div class="filter-list">
			{#each tags as tag}
				<label
					class="tag"
					class:selected={$active_filter.tags.includes(tag)}
					class:focus={focussed_tag === tag}
					onfocusin={() => (focussed_tag = tag)}
					onfocusout={() => (focussed_tag = null)}
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
					onfocusin={() => (focussed_year = year)}
					onfocusout={() => (focussed_year = null)}
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
		&.focus {
			outline: 0.1rem solid var(--accent-color);
		}
	}
</style>
