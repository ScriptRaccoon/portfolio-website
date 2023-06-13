export const prerender = false;

import { get_youtube_stats, type stats } from "./stats";
import { get_latest_video, type video } from "./video";

type cache_type = { video: video; stats: stats; date: Date } | null;

let cache: cache_type = null;

export const load = async () => {
	if (cache_is_recent()) {
		const { stats, video } = cache!;
		return { stats, video };
	}

	const stats = await get_youtube_stats();
	const video = await get_latest_video();

	if (stats && video) {
		cache = { stats, video, date: new Date() };
	}

	return { stats, video };
};

function cache_is_recent() {
	const one_day = 24 * 60 * 60 * 1000;
	const now = new Date();
	return cache && now.getTime() - cache.date.getTime() <= one_day;
}
