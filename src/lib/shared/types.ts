export type post = {
	id: string;
	title: string;
	published: Date;
	updated: Date | null;
	description: string;
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
