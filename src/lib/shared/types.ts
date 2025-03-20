export type post = {
	id: string;
	title: string;
	published: Date | null;
	updated: Date | null;
	description: string;
};

export type published_post = post & {
	published: Date;
};

export type project = {
	id: string;
	name: string;
	repository: string;
	url: string;
	tutorial: string;
	tags: string[];
	teaser: string;
	date: Date;
};
