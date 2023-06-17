<script lang="ts">
	import { strengths } from "./strengths";
	import { headings, tech_list } from "./tech";
	const levels = Object.keys(headings);
</script>

<h1>Skills</h1>

<section>
	<h2>Strengths</h2>
	<ul>
		{#each strengths as strength}
			<li>
				<span>{strength}</span>
			</li>
		{/each}
	</ul>
</section>

{#each levels as level}
	{@const list = tech_list.filter((tech) => tech.level === level)}
	<section>
		<h2>{headings[level]}</h2>
		<ul>
			{#each list as tech}
				<li>
					<a href={tech.url} target="_blank">
						{tech.name}
					</a>
				</li>
			{/each}
		</ul>
	</section>
{/each}

<style>
	section {
		margin-block: 1rem 1.75rem;
	}
</style>
