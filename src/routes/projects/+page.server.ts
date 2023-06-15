import fm from "front-matter";
import type { frontmatter } from "./types";

const projects_markdown = import.meta.glob(
	"/src/data/projects/*.md",
	{ as: "raw", eager: true },
);

export const load = async () => {
	const unsorted_projects = Object.values(projects_markdown).map(
		(markdown) => {
			const { attributes } = fm(markdown) as frontmatter;
			return attributes;
		},
	);

	const projects = unsorted_projects.sort(
		(p, q) => q.date.getTime() - p.date.getTime(),
	);

	const year_list = unsorted_projects.map((p) =>
		p.date.getFullYear(),
	);
	const years = [...new Set(year_list)].sort();

	const tag_list = projects.map((p) => p.tags).flat();
	const tags = [...new Set(tag_list)].sort();

	return { projects, tags, years };
};
