<script lang="ts">
	import BarChart from '$lib/components/BarChart.svelte'
	import DataTable from '$lib/components/DataTable.svelte'
	import Expand from '$lib/components/Expand.svelte'
	import MetaTags from '$lib/components/MetaTags.svelte'
	import TrackToggle from '$lib/components/TrackToggle.svelte'

	let { data } = $props()
</script>

<MetaTags title="Script Raccoon – Page Visits" description="Basic analytics" />

<header>
	<h1>Page Visits</h1>
</header>

<p>
	<TrackToggle />
</p>

<Expand summary="Show 100 most recent visits">
	<DataTable
		data_points={data.logs}
		labels={['Date', 'Path', 'Country', 'City']}
	/>
</Expand>

{#each data.paths as { path, total, monthly_visits } (path)}
	<section>
		<h2>
			<a class="path" href={path}>{path}</a>
		</h2>

		<div class="total">
			<strong class="number">{total}</strong> visits in total
		</div>

		<div class="chart-wrapper">
			<BarChart data_points={monthly_visits} />
		</div>

		<Expand summary="Show details">
			<DataTable
				data_points={monthly_visits}
				labels={['Month', 'Visits']}
			/>
		</Expand>
	</section>
{/each}

<style>
	section {
		border-bottom: 2px solid var(--border-color);
		padding-block: 1rem;
	}

	section:first-of-type {
		margin-top: 2rem;
	}

	.path {
		color: var(--h1-color);
		text-decoration: none;
	}

	.total {
		color: var(--secondary-font-color);

		.number {
			color: var(--font-color);
		}
	}

	.chart-wrapper {
		margin-block: 1rem;
	}
</style>
