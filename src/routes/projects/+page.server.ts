import type { project } from "./types";
import { get_frontmatter } from "$lib/server/frontmatter";

export const load = async () => {
	const unsorted_projects = get_frontmatter<project>(
		import.meta.glob("/src/data/projects/*.md", {
			as: "raw",
			eager: true,
		}),
	);

	const projects = [...unsorted_projects].sort(
		(p, q) => q.date.getTime() - p.date.getTime(),
	);

	const year_list = unsorted_projects.map((p) =>
		p.date.getFullYear(),
	);
	const years = [...new Set(year_list)].sort((a, b) => a - b);

	const tag_list = projects.map((p) => p.tags).flat();
	const tags = [...new Set(tag_list)].sort((a, b) =>
		a.localeCompare(b),
	);

	const meta = {
		title: "Script Raccoon - Projects",
		description:
			"Find out about my personal projects in web development",
	};

	return { meta, projects, tags, years };
};
