export type attributes = {
	id: string;
	name: string;
	repository: string;
	url: string;
	tutorial: string;
	tags: string;
	teaser: string;
	date: Date;
};

export type frontmatter = {
	body: string;
	attributes: attributes;
};
