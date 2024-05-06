<script lang="ts">
	import { tool_data } from "./tools.config";
</script>

<h1>Tools and languages</h1>

<p>
	This page lists some of the tools and languages I am familiar with
	in the context of web development.
</p>

{#each tool_data as tool_list}
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
