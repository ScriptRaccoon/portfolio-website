<script lang="ts">
	import BarChart from '$lib/components/BarChart.svelte'

	let { data } = $props()
</script>

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
</style>
