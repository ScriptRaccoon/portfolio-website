import fm from "front-matter";
import type { frontmatter } from "./types";
import { PUBLIC_SHOW_ALL_POSTS } from "$env/static/public";

const posts_markdown = import.meta.glob("/src/data/posts/*.md", {
	as: "raw",
	eager: true,
});

export const load = async () => {
	const unsorted_posts: frontmatter[] = Object.entries(
		posts_markdown,
	).map(([path, markdown]) => {
		const id = path.split("/").at(-1)!.replace(".md", "");
		const { attributes } = fm<Omit<frontmatter, "id">>(markdown);
		return { ...attributes, id };
	});

	const public_posts =
		PUBLIC_SHOW_ALL_POSTS === "true"
			? unsorted_posts
			: unsorted_posts.filter((p) => p.public === true);

	const posts = public_posts.sort(
		(p, q) => q.published.getTime() - p.published.getTime(),
	);

	return { posts };
};
