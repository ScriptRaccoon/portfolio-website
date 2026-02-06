<script lang="ts">
	type Props = {
		data: [string, number][]
	}

	let { data }: Props = $props()

	let max_value = $derived(Math.max(...data.map((x) => x[1])))
</script>

{#if data.length}
	<div class="chart">
		{#each data as [month, value]}
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="bar"
				style:--value={value}
				style:--max-value={max_value}
				tabindex="0"
			>
				<span class="value">{value}</span>
				<span class="month">{month}</span>
			</div>
		{/each}
	</div>

	<details>
		<summary>Show details</summary>
		<table>
			<thead>
				<tr>
					<th>Month </th>
					<th>Visits</th>
				</tr>
			</thead>
			<tbody>
				{#each data as [label, value]}
					<tr>
						<td>{label}</td>
						<td>{value}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</details>
{:else}
	<p>No data</p>
{/if}

<style>
	.chart {
		display: flex;
		gap: 3px;
		align-items: end;
		height: 5rem;
		margin-block: 2rem;
	}

	.bar {
		width: 1rem;
		height: calc(100% * var(--value) / var(--max-value));
		background-color: var(--bar-color);
		position: relative;
		font-family: monospace;
		font-size: var(--tiny-font);
		text-wrap: nowrap;
	}

	.value {
		position: absolute;
		bottom: 100%;
		opacity: 0;
	}

	.month {
		position: absolute;
		top: 100%;
		opacity: 0;
	}

	.bar:hover,
	.bar:focus-visible {
		outline: none;
		background-color: var(--accent-color);

		.value,
		.month {
			opacity: 1;
		}
	}

	details {
		margin-top: 1rem;
		font-size: var(--small-font);
	}

	summary {
		width: fit-content;
		color: var(--secondary-font-color);
	}

	table {
		border-collapse: collapse;
		margin-block: 1rem;
	}

	tbody {
		font-family: monospace;
	}

	th {
		text-align: left;
	}

	th,
	td {
		border: 1px solid var(--border-color);
		padding: 0.25rem 0.5rem;
	}
</style>
