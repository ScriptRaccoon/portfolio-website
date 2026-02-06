<script lang="ts">
	type Props = {
		title: string
		description: string
	}

	let { title, description }: Props = $props()
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="description" content={description} />
</svelte:head>
