import { error } from "@sveltejs/kit";

export const prerender = false;

export const load = () => {
	if (process.env.NODE_ENV !== "development")
		throw error(404, "Not Found");
};
