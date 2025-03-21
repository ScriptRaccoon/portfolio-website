<script lang="ts">
	import tools from './tools.json'
</script>

<h1>Tools and languages</h1>

<p>
	This page lists some of the tools and languages I am familiar with in the
	context of web development.
</p>

{#each tools as tool_list}
	<section>
		<h2>{tool_list.level}</h2>
		<ul>
			{#each tool_list.data as tool}
				<li>
					<a href={tool.url} target="_blank">
						{tool.name}
					</a>
				</li>
			{/each}
		</ul>
	</section>
{/each}
