<script>
	import ProjectDetail from "../ProjectDetail.svelte";
	export let data;
	const { project } = data;
</script>

{#if project === undefined}
	There is no project with this ID.
{:else}
	<ProjectDetail {project} />
{/if}
