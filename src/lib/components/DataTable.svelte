<script lang="ts">
	type Props = {
		data_points: (string | number)[][]
		labels: string[]
	}

	let { data_points, labels }: Props = $props()
</script>

<table>
	<thead>
		<tr>
			{#each labels as label}
				<th>{label}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data_points as row_data}
			<tr>
				{#each row_data as item}
					<td>{item}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
		margin-block: 1rem;
		font-size: var(--tiny-font);
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

	th,
	tr:nth-child(2n) {
		background-color: var(--border-color);
	}
</style>
