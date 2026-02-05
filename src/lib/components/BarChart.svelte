<script lang="ts">
	type Props = {
		data: [string, number][]
	}

	let { data }: Props = $props()

	let max_value = $derived(Math.max(...data.map((x) => x[1])))
</script>

{#if data.length}
	<div class="chart">
		{#each data as [_, value]}
			<div
				class="bar"
				style:--value={value}
				style:--max-value={max_value}
			></div>
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
	}

	.bar {
		width: 1rem;
		height: calc(100% * var(--value) / var(--max-value));
		background-color: var(--bar-color);
	}

	details {
		margin-top: 1rem;
		font-size: 0.875rem;
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
