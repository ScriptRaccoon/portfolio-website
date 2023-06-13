export const prerender = false;

import { cached } from "$lib/server/cache";

import { get_youtube_stats } from "./stats";
import { get_latest_video } from "./video";

export const load = async () => {
	return await get_youtube_data();
};

const one_day = 24 * 60 * 60 * 1000;

const get_youtube_data = cached(async () => {
	const stats = await get_youtube_stats();
	const video = await get_latest_video();
	return { stats, video };
}, one_day);
