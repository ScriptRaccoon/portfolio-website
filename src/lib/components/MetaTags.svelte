<script lang="ts">
	type Props = {
		title: string
		description: string
		image?: string
	}

	let { title, description, image }: Props = $props()
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="description" content={description} />

	{#if image}
		<meta property="og:image" content={image} />
	{/if}
</svelte:head>
