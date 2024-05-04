<script lang="ts">
	import {
		soft_skills,
		hard_skills,
		tool_data,
	} from "./skills.config";
</script>

<h1>Skills</h1>

<p>
	This page lists some of my skills with a focus on web development.
</p>

<section>
	<h2>Hard skills</h2>
	<ul>
		{#each hard_skills as skill}
			<li>
				<span>{skill}</span>
			</li>
		{/each}
	</ul>
</section>

<section>
	<h2>Soft skills</h2>
	<ul>
		{#each soft_skills as soft_skill}
			<li>
				<span>{soft_skill}</span>
			</li>
		{/each}
	</ul>
</section>

<section>
	<h2>Tools and languages</h2>
</section>

{#each tool_data as tool_list}
	<section>
		<h3>{tool_list.level}</h3>
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

<style>
	section {
		margin-block: 1.5rem 1.75rem;
	}
</style>
