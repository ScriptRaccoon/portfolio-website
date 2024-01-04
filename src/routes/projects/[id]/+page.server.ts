import fm from "front-matter";
import { error } from "@sveltejs/kit";
import type { project } from "../types";
import {
	transform_external_links,
	render_markdown,
} from "$lib/server/blog-processing";

const projects_record = import.meta.glob("/src/data/projects/*.md", {
	as: "raw",
	eager: true,
});

export const load = async (event) => {
	const id = event.params.id;
	const path = `/src/data/projects/${id}.md`;

	if (!(path in projects_record)) {
		error(404, "There is no project with this ID");
	}

	const markdown = projects_record[path];
	const { attributes: _attributes, body } =
		fm<Omit<project, "id">>(markdown);
	const attributes: project = { ..._attributes, id };

	attributes.tags.sort((a, b) => a.localeCompare(b));

	const html_raw = render_markdown(body);
	const html_code = transform_external_links(html_raw);

	const meta = {
		title: attributes.name,
		description: attributes.teaser,
	};

	return { meta, attributes, html_code };
};
