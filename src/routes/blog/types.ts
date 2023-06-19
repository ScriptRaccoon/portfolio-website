export type post = {
	id: string;
	title: string;
	published: Date;
	updated: Date | null;
	public: boolean;
	description: string;
	show_toc: boolean;
};
