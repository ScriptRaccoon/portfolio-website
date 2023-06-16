import { marked } from "marked";
import fm from "front-matter";
import { error } from "@sveltejs/kit";
import type { frontmatter } from "../types";
import { PUBLIC_SHOW_ALL_POSTS } from "$env/static/public";

const posts_markdown = import.meta.glob("/src/data/posts/*.md", {
	as: "raw",
	eager: true,
});

export const load = async (event) => {
	const id = event.params.id;
	const path = `/src/data/posts/${id}.md`;

	if (!(path in posts_markdown)) {
		throw error(404, "There is no post with this ID");
	}

	const markdown = posts_markdown[path];
	const { attributes, body } = fm<frontmatter>(markdown);

	if (
		PUBLIC_SHOW_ALL_POSTS === "false" &&
		attributes.public === false
	) {
		throw error(403, "This post is not public");
	}

	const htmlContent = marked(body, {
		mangle: false,
		headerIds: false,
	});

	return { attributes, htmlContent };
};
