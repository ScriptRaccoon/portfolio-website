import data from "../../data/youtube/data.json";

export const load = async () => {
	const { stats, video } = data;

	const meta = {
		title: "Script Raccoon - YouTube",
		description: "About my YouTube channel",
	};
	return { stats, video, meta };
};
