<script lang="ts">
	import BarChart from '$lib/components/BarChart.svelte'
	import DataTable from '$lib/components/DataTable.svelte'
	import Expand from '$lib/components/Expand.svelte'
	import MetaTags from '$lib/components/MetaTags.svelte'
	import TrackToggle from '$lib/components/TrackToggle.svelte'
	import { faEye } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	let { data } = $props()
</script>

<MetaTags title="Script Raccoon – Page Visits" description="Basic analytics" />

<header>
	<h1>Page Visits</h1>

	<TrackToggle />
</header>

<Expand summary="Show 100 most recent visits">
	<DataTable
		data_points={data.logs}
		labels={['date', 'path', 'country', 'city']}
	/>
</Expand>

{#each data.paths as { path, total, monthly_visits } (path)}
	<section class="path-section">
		<h2>
			<a class="path" href={path}>{path}</a>
		</h2>

		<div aria-label="{total} visits in total" class="total">
			<Fa icon={faEye} />
			{total}
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
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	section {
		border-bottom: 1px solid var(--border-color);
		padding-block: 1rem;
	}

	section:first-of-type {
		margin-top: 1rem;
		border-top: 1px solid var(--border-color);
	}

	.path {
		color: var(--h1-color);
		text-decoration: none;
	}

	.total {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.chart-wrapper {
		margin-block: 1rem;
	}
</style>
