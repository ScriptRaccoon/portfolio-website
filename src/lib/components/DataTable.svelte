<script lang="ts">
	type Props = {
		data_points: [string, number][]
		labels: [string, string]
	}

	let { data_points, labels }: Props = $props()
</script>

<table>
	<thead>
		<tr>
			<th>{labels[0]}</th>
			<th>{labels[1]}</th>
		</tr>
	</thead>
	<tbody>
		{#each data_points as [label, value]}
			<tr>
				<td>{label}</td>
				<td>{value}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
		margin-block: 1rem;
		font-size: var(--small-font);
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
