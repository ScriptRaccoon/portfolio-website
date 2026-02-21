<script lang="ts">
	import DataTable from '$lib/components/DataTable.svelte'
	import MetaTags from '$lib/components/MetaTags.svelte'
	import TrackToggle from '$lib/components/TrackToggle.svelte'

	let { data } = $props()
</script>

<MetaTags
	title="Script Raccoon – Analytics"
	description="Sessions, Page visits, and more"
/>

<header>
	<h1>Analytics</h1>
</header>

<p>
	<TrackToggle />
</p>

<section>
	<h2>Live Sessions</h2>

	<div class="full_bleed">
		<DataTable
			objects={data.sessions_live}
			labels={{
				id: 'ID',
				created_at: 'Date',
				country: 'Country',
				city: 'City',
				device_type: 'Device Type',
				browser: 'Browser',
				os: 'OS',
				theme: 'Theme',
				referrer: 'Referrer',
			}}
			ids={['id']}
		/>
	</div>
</section>

<section>
	<h2>Live Visits</h2>

	<DataTable
		objects={data.visits_live}
		labels={{
			session_id: 'Session ID',
			created_at: 'Date',
			path: 'Path',
		}}
		ids={['session_id']}
		widths={[20, 30, 50]}
	/>
</section>

<section>
	<h2>Monthly Sessions</h2>

	<DataTable
		objects={data.sessions_monthly}
		labels={{ month: 'Month', counter: '#' }}
		widths={[50, 50]}
	/>
</section>

<section>
	<h2>Monthly Visits</h2>

	{#each Object.keys(data.grouped_visits_monthly) as path}
		<h3>{path}</h3>
		<DataTable
			objects={data.grouped_visits_monthly[path]}
			labels={{ month: 'Month', counter: '#' }}
			widths={[50, 50]}
		/>
	{:else}
		<p>No data yet</p>
	{/each}
</section>

<section>
	<h2>Countries</h2>

	<DataTable
		objects={data.countries_total}
		labels={{ country: 'Country', counter: '#', percentage: '%' }}
		widths={[50, 25, 25]}
	/>
</section>

<section>
	<h2>Device Types</h2>

	<DataTable
		objects={data.device_types_total}
		labels={{ device_type: 'Device Type', counter: '#', percentage: '%' }}
		widths={[50, 25, 25]}
	/>
</section>

<section>
	<h2>Browsers</h2>

	<DataTable
		objects={data.browsers_total}
		labels={{ browser: 'Browser', counter: '#', percentage: '%' }}
		widths={[50, 25, 25]}
	/>
</section>

<section>
	<h2>Operating Systems</h2>

	<DataTable
		objects={data.os_total}
		labels={{ os: 'OS', counter: '#', percentage: '%' }}
		widths={[50, 25, 25]}
	/>
</section>

<section>
	<h2>Themes</h2>

	<DataTable
		objects={data.themes_total}
		labels={{ theme: 'Theme', counter: '#', percentage: '%' }}
		widths={[50, 25, 25]}
	/>
</section>

<section>
	<h2>Referrers</h2>

	<DataTable
		objects={data.referrers_total}
		labels={{ referrer: 'Referrer', counter: '#', percentage: '%' }}
		widths={[50, 25, 25]}
	/>
</section>

<style>
	section:first-of-type {
		margin-top: 2rem;
	}

	section {
		margin-bottom: 3rem;
	}
</style>
