import youtube_data from "../../data/youtube/youtube.json";

export const load = async () => {
	const { stats, video } = youtube_data;

	const meta = {
		title: "Script Raccoon - YouTube",
		description: "About my YouTube channel",
	};
	return { stats, video, meta };
};
