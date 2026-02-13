<script lang="ts">
	import BarChart from '$lib/components/BarChart.svelte'
	import DataTable from '$lib/components/DataTable.svelte'
	import MetaTags from '$lib/components/MetaTags.svelte'
	import TrackToggle from '$lib/components/TrackToggle.svelte'
	import { faEye } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	let { data } = $props()
</script>

<MetaTags title="Script Raccoon – Page Visits" description="Basic analytics" />

<header>
	<h1>Page Visits</h1>
</header>

{#each data.paths as { path, total, monthly_visits } (path)}
	<section>
		<h2 class="path">{path}</h2>

		<div aria-label="{total} visits in total" class="total">
			<Fa icon={faEye} />
			{total}
		</div>

		<BarChart data_points={monthly_visits} />

		<details>
			<summary>Show details</summary>
			<DataTable
				data_points={monthly_visits}
				labels={['Month', 'Visits']}
			/>
		</details>
	</section>
{/each}

<div class="actions">
	<TrackToggle />
</div>

<style>
	section {
		border-bottom: 1px solid var(--border-color);
		padding-block: 1rem;
	}

	.path {
		color: var(--h1-color);
	}

	h2 {
		margin-bottom: 0.5rem;
	}

	.total {
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: var(--small-font);
	}

	details {
		margin-top: 1rem;
	}

	summary {
		width: fit-content;
		color: var(--secondary-font-color);
		font-size: var(--small-font);
	}

	.actions {
		margin-top: 2rem;
	}
</style>
