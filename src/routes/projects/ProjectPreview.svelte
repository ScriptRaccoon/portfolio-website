<script lang="ts">
	import type { project } from "./projects";
	export let project: project;
</script>

<a href="/projects/{project.id}">
	<h2>{project.name}</h2>
	<span>More...</span>
</a>

<style>
	a {
		text-decoration: none;
		display: block;
		padding-block: 1rem;
		border-bottom: 1px solid var(--light-color);
	}
	span {
		font-size: 1rem;
		text-decoration: underline;
	}
</style>
