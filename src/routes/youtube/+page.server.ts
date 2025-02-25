export const prerender = false;

import { get_cached_youtube_stats } from "./stats";
import { get_cached_latest_video } from "./video";

export const load = async () => {
	const [stats, video] = await Promise.all([
		get_cached_youtube_stats(),
		get_cached_latest_video(),
	]);

	const meta = {
		title: "Script Raccoon - YouTube",
		description: "About my YouTube channel",
	};
	return { stats, video, meta };
};
