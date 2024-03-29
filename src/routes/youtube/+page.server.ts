export const prerender = false;

import { redis, redis_cached } from "$lib/server/redis";
import { get_youtube_stats } from "./stats";
import { get_latest_video } from "./video";

const one_day = 24 * 60 * 60;

const get_cached_youtube_stats = redis_cached(
	redis,
	"stats",
	get_youtube_stats,
	one_day,
);

const get_cached_latest_video = redis_cached(
	redis,
	"video",
	get_latest_video,
	one_day,
);

export const load = async () => {
	const stats = await get_cached_youtube_stats();
	const video = await get_cached_latest_video();
	const meta = {
		title: "Script Raccoon - YouTube",
		description: "About my YouTube channel",
	};
	return { stats, video, meta };
};
