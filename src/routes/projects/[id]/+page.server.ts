import { all_projects } from "../projects";

export const load = async (event) => {
	const id = event.params.id;
	const project = all_projects.find((p) => p.id === id);
	return { project };
};
