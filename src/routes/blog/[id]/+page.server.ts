import fm from "front-matter";
import { error } from "@sveltejs/kit";
import type { post } from "../types";
import { highlight } from "$lib/server/highlight";

import markdownit from "markdown-it";
import {
	add_ids_to_headings,
	get_table_of_contents,
} from "$lib/server/headings";
import { transform_external_links } from "$lib/server/external-links";
const md = new markdownit();

const posts_record = import.meta.glob("/src/data/posts/*.md", {
	as: "raw",
	eager: true,
});

export const load = async (event) => {
	const id = event.params.id;
	const path = `/src/data/posts/${id}.md`;

	if (!(path in posts_record)) {
		throw error(404, "There is no post with this ID");
	}

	const markdown = posts_record[path];
	const { attributes: _attributes, body } =
		fm<Omit<post, "id">>(markdown);
	const attributes: post = { ..._attributes, id };

	const html_code_raw = md.render(body);
	const toc = get_table_of_contents(html_code_raw);
	const html_code_raw2 = transform_external_links(html_code_raw);
	const html_code_raw3 = add_ids_to_headings(html_code_raw2);
	const html_code = highlight(html_code_raw3);

	const { title, description } = attributes;
	const meta = { title, description };

	return { meta, attributes, html_code, toc };
};
