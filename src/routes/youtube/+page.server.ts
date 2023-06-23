import { SECRET_REDIS_URL } from "$env/static/private";
import Redis from "ioredis";
const redis = new Redis(SECRET_REDIS_URL);

import { redis_cached } from "$lib/server/redis-cache";
import { get_youtube_stats } from "./stats";
import { get_latest_video } from "./video";

export const load = async () => {
	const stats = await get_cached_youtube_stats();
	const video = await get_cached_latest_video();
	const meta = {
		title: "Script Raccoon - YouTube",
		description: "About my YouTube channel",
	};
	return { stats, video, meta };
};

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
