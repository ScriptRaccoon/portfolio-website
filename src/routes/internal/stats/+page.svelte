<script lang="ts">
	import { browser } from '$app/environment'
	import BarChart from '$lib/components/BarChart.svelte'
	import MetaTags from '$lib/components/MetaTags.svelte'

	let { data } = $props()

	let device_is_tracked = $state(false)

	if (browser) {
		device_is_tracked = !window.localStorage.getItem('notrack')
	}

	function untrack_device() {
		if (!browser) return
		window.localStorage.setItem('notrack', 'true')
		device_is_tracked = false
	}

	function track_device() {
		if (!browser) return
		window.localStorage.removeItem('notrack')
		device_is_tracked = true
	}
</script>

<MetaTags
	title="Script Raccoon – Page Stats"
	description="A basic analytics dashboard"
/>

<header>
	<h1>Page Stats</h1>
</header>

{#each data.paths as { path, total, monthly } (path)}
	<section>
		<h2 class="path">{path}</h2>

		<p>
			<span class="total">{total}</span> total visits
		</p>

		<BarChart data={monthly} />
	</section>
{/each}

<div class="actions">
	{#if device_is_tracked}
		<button class="button" onclick={untrack_device}>
			Don't track this device
		</button>
	{:else}
		<button class="button" onclick={track_device}>
			Track this device
		</button>
	{/if}
</div>

<style>
	h2 {
		color: var(--h1-color);
	}

	section {
		border-bottom: 1px solid var(--border-color);
		padding-block: 1rem;
	}

	.total {
		font-size: 1.5rem;
		color: var(--bar-color);
	}

	.actions {
		margin-top: 2rem;
	}
</style>
