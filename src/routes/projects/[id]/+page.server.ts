import { marked } from "marked";
import fm from "front-matter";
import { error } from "@sveltejs/kit";
import type { frontmatter } from "../types";

const projects_markdown = import.meta.glob(
	"/src/data/projects/*.md",
	{ as: "raw", eager: true },
);

export const load = async (event) => {
	const id = event.params.id;
	const path = `/src/data/projects/${id}.md`;

	if (!(path in projects_markdown)) {
		throw error(404, "There is no project with this ID");
	}

	const markdown = projects_markdown[path];
	const { attributes, body } = fm(markdown) as frontmatter;

	const tag_list = attributes.tags
		.split(",")
		.map((t) => t.trim())
		.sort();

	const htmlContent = marked(body, {
		mangle: false,
		headerIds: false,
	});

	return { attributes, tag_list, htmlContent };
};
