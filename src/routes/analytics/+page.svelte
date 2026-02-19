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

	<DataTable
		objects={data.sessions_live}
		labels={{
			id: 'ID',
			created_at: 'Date',
			referrer: 'Referrer',
			browser: 'Browser',
			os: 'OS',
			country: 'Country',
			city: 'City',
			theme: 'Theme',
		}}
	/>
</section>

<section>
	<h2>Live Visits</h2>

	<DataTable
		objects={data.visits_live}
		labels={{
			session_id: 'Session ID',
			path: 'Path',
			created_at: 'Date',
		}}
	/>
</section>

<section>
	<h2>Monthly Sessions</h2>

	<DataTable
		objects={data.sessions_monthly}
		labels={{ month: 'Month', counter: '#' }}
	/>
</section>

<section>
	<h2>Monthly Visits</h2>

	{#each Object.keys(data.grouped_visits_monthly) as path}
		<h3>{path}</h3>
		<DataTable
			objects={data.grouped_visits_monthly[path]}
			labels={{ month: 'Month', counter: '#' }}
		/>
	{/each}
</section>

<section>
	<h2>Referrers</h2>

	<DataTable
		objects={data.referrers_total}
		labels={{ referrer: 'Referrer', counter: '#', percentage: '%' }}
	/>
</section>

<section>
	<h2>Browsers</h2>

	<DataTable
		objects={data.browsers_total}
		labels={{ browser: 'Browser', counter: '#', percentage: '%' }}
	/>
</section>

<section>
	<h2>Operating Systems</h2>

	<DataTable
		objects={data.os_total}
		labels={{ os: 'OS', counter: '#', percentage: '%' }}
	/>
</section>

<section>
	<h2>Countries</h2>

	<DataTable
		objects={data.countries_total}
		labels={{ country: 'Country', counter: '#', percentage: '%' }}
	/>
</section>

<section>
	<h2>Themes</h2>

	<DataTable
		objects={data.themes_total}
		labels={{ theme: 'Theme', counter: '#', percentage: '%' }}
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
