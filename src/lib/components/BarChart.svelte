<script lang="ts">
	/**
	 * @deprecated
	 */
	type Props = {
		data_points: [string, number][]
	}

	let { data_points }: Props = $props()

	let max_value = $derived(Math.max(...data_points.map((x) => x[1])))
</script>

<div class="chart">
	{#each data_points as [label, value]}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class="bar"
			style:--value={value}
			style:--max-value={max_value}
			tabindex="0"
		>
			{#if value > 0}
				<span class="value">{value}</span>
				<span class="label">{label}</span>
			{/if}
		</div>
	{/each}
</div>

<style>
	.chart {
		display: flex;
		gap: 3px;
		align-items: end;
		height: 5rem;
	}

	.bar {
		width: 1rem;
		flex: 1;
		height: calc(100% * var(--value) / var(--max-value));
		background-color: var(--bar-color);
		font-family: monospace;
		font-size: 0.875rem;
		text-wrap: nowrap;
		position: relative;

		.value {
			position: absolute;
			bottom: 100%;
			opacity: 0;
		}

		.label {
			position: absolute;
			top: 100%;
			opacity: 0;
		}

		&:hover,
		&:focus-visible {
			outline: none;
			background-color: var(--accent-color);

			.label,
			.value {
				opacity: 1;
			}
		}
	}
</style>
