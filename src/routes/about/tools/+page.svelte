<script lang="ts">
	import Controls from '$lib/components/Controls.svelte'
	import MetaTags from '$lib/components/MetaTags.svelte'
	import tools from './tools.json'
</script>

<MetaTags
	title="Script Raccoon - Tools"
	description="The tools and languages I use to create applications"
/>

<Controls />

<header>
	<h1>Tools and languages</h1>
</header>

<p>
	This page lists some of the tools and languages I am familiar with in the
	context of software development.
</p>

{#each tools as tool_list}
	<section>
		<h2>{tool_list.level}</h2>
		<ul class="no-bullets">
			{#each tool_list.data as tool}
				<li>
					<a class="tag" href={tool.url} target="_blank">
						{tool.name}
					</a>
				</li>
			{/each}
		</ul>
	</section>
{/each}

<style>
	section {
		margin-block: 2rem;
	}

	h2 {
		margin-bottom: 1rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	a {
		text-decoration: none;
	}
</style>
