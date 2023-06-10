<script lang="ts">
	import type { project } from "./projects";
	export let project: project;
</script>

<a href="/projects/{project.id}">
	<h2>{@html project.name}</h2>
	<div class="description">{project.description}</div>
	<div class="more">More...</div>
</a>

<style>
	a {
		text-decoration: none;
		display: block;
		padding-block: 1rem;
		border-bottom: 1px solid var(--light-color);
	}
	.description {
		color: var(--gray-color);
		margin-bottom: 0.5rem;
	}

	.more {
		font-size: 1rem;
		text-decoration: underline;
	}
</style>
