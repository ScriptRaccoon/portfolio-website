export const prerender = false;

import { SECRET_YOUTUBE_API_KEY } from "$env/static/private";
import {
	PUBLIC_YOUTUBE_API_URL,
	PUBLIC_YOUTUBE_CHANNEL_ID,
} from "$env/static/public";

export const load = async () => {
	const stats = await get_youtube_stats();
	return { stats };
};

type youtube_stats = {
	subscriberCount: number;
	videoCount: number;
};

let cache: (youtube_stats & { date: Date }) | null = null;

async function get_youtube_stats(): Promise<youtube_stats | null> {
	const one_day = 24 * 60 * 60 * 1000;

	const now = new Date();

	if (cache && now.getTime() - cache.date.getTime() <= one_day) {
		const { subscriberCount, videoCount } = cache;
		return { subscriberCount, videoCount };
	}

	const param_data = {
		part: "statistics",
		id: PUBLIC_YOUTUBE_CHANNEL_ID,
		key: SECRET_YOUTUBE_API_KEY,
	};
	const params = new URLSearchParams(param_data);

	const url = `${PUBLIC_YOUTUBE_API_URL}/channels?${params.toString()}`;

	const response = await fetch(url);

	if (response.ok) {
		const data = await response.json();
		const statistics = data?.items?.[0]?.statistics;
		const subscriberCount = parseInt(statistics.subscriberCount);
		const videoCount = parseInt(statistics.videoCount);
		cache = { subscriberCount, videoCount, date: now };
		return { subscriberCount, videoCount };
	} else {
		console.log("YouTube API request failed: " + response.statusText);
		console.log("URL:", url);
		return null;
	}
}
