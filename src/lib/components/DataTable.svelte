<script lang="ts">
	type Props = {
		objects: Record<string, string | number | null>[]
		labels: Record<string, string>
		ids?: string[]
	}

	let { objects, labels, ids = [] }: Props = $props()
</script>

{#if objects.length}
	<div class="wrapper">
		<table>
			<thead>
				<tr>
					{#each Object.values(labels) as label}
						<th>{label}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each objects as obj}
					<tr>
						{#each Object.keys(labels) as key}
							{@const short = String(obj[key]).substring(0, 8)}
							<td>
								{#if ids.includes(key)}
									<span title={String(obj[key])}>
										{short}
									</span>
								{:else}
									{obj[key]}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p>No data yet</p>
{/if}

<style>
	.wrapper {
		overflow: auto;
		max-height: 10lh;
		scrollbar-width: thin;
		scrollbar-color: var(--secondary-font-color) var(--code-bg-color);
		margin-block: 1rem;
	}

	thead {
		position: sticky;
		top: 0;
	}

	table {
		border-collapse: collapse;
		font-size: var(--tiny-font);
		width: 100%;
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
		white-space: nowrap;
	}

	th,
	tr:nth-child(2n) {
		background-color: var(--border-color);
	}
</style>
