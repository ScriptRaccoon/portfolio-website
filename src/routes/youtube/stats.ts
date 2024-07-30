import { SECRET_YOUTUBE_API_KEY } from "$env/static/private";
import {
	PUBLIC_YOUTUBE_API_URL,
	PUBLIC_YOUTUBE_CHANNEL_ID,
} from "$env/static/public";
import { redis_cached } from "$lib/server/redis/cache";

export type stats = {
	subscriber_count: number;
	video_count: number;
};

async function get_youtube_stats(): Promise<stats | null> {
	const param_data = {
		part: "statistics",
		id: PUBLIC_YOUTUBE_CHANNEL_ID,
		key: SECRET_YOUTUBE_API_KEY,
	};

	const params = new URLSearchParams(param_data);

	const url = `${PUBLIC_YOUTUBE_API_URL}/channels?${params.toString()}`;
	const response = await fetch(url);
	const data = await response.json();

	if (response.ok) {
		const statistics = data?.items?.[0]?.statistics;
		const subscriber_count = parseInt(statistics.subscriberCount);
		const video_count = parseInt(statistics.videoCount);
		return { subscriber_count, video_count };
	}

	console.error("Request failed for ", url);
	console.error(data?.error?.message);
	return null;
}

export const get_cached_youtube_stats = redis_cached(
	"stats",
	get_youtube_stats,
	24 * 60 * 60, // one day
);
