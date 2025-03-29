<script lang="ts">
	import tools from './tools.json'
</script>

<h1>Tools and languages</h1>

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
	h2 {
		margin-block: 2rem 0.5rem;
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
