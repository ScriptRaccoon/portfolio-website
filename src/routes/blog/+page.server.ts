export const prerender = true;

import type { post } from "./types";
import { PUBLIC_SHOW_ALL_POSTS } from "$env/static/public";
import { get_frontmatter } from "$lib/server/frontmatter";

export const load = async () => {
	const unsorted_posts = get_frontmatter<post>(
		import.meta.glob("/src/data/posts/*.md", {
			as: "raw",
			eager: true,
		}),
	);

	const public_posts =
		PUBLIC_SHOW_ALL_POSTS === "true"
			? unsorted_posts
			: unsorted_posts.filter((p) => p.public);

	const posts = public_posts.sort(
		(p, q) => q.published.getTime() - p.published.getTime(),
	);

	const meta = {
		title: "Script Raccoon - Blog",
		description: "Some thoughts on web development",
	};

	return { meta, posts };
};
