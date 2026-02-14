<script lang="ts">
	import { page } from '$app/state'
	import GoBack from '$lib/components/GoBack.svelte'
	import MetaTags from '$lib/components/MetaTags.svelte'
</script>

<MetaTags title="Script Raccoon - Error" description="Error Page" />

<header>
	<h1>{page.status}</h1>
</header>

<p>{page.error?.message}</p>

<GoBack />
