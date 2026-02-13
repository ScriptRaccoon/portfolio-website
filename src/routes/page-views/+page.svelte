<script lang="ts">
	import BarChart from '$lib/components/BarChart.svelte'
	import DataTable from '$lib/components/DataTable.svelte'
	import MetaTags from '$lib/components/MetaTags.svelte'
	import TrackToggle from '$lib/components/TrackToggle.svelte'
	import { faEye } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	let { data } = $props()
</script>

<header>
	<h1>Page Views</h1>
</header>

<MetaTags title="Script Raccoon – Page Views" description="Basic analytics" />

{#each data.paths as { path, total, monthly_views } (path)}
	<section>
		<h2 class="path">{path}</h2>

		<div aria-label="{total} views in total" class="total">
			<Fa icon={faEye} />
			{total}
		</div>

		<BarChart data_points={monthly_views} />

		<details>
			<summary>Show details</summary>
			<DataTable
				data_points={monthly_views}
				labels={['Month', 'Views']}
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
