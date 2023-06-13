export const prerender = false;

import { SECRET_YOUTUBE_API_KEY } from "$env/static/private";
import {
	PUBLIC_YOUTUBE_API_URL,
	PUBLIC_YOUTUBE_CHANNEL_ID,
	PUBLIC_YOUTUBE_SHORT_URL,
} from "$env/static/public";

export const load = async () => {
	const stats = await get_youtube_stats();
	const video = await get_latest_video();
	return { stats, video };
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

interface video {
	title: string;
	url: string;
	thumbnail_url: string;
}

async function get_latest_video(): Promise<video | null> {
	const param_data = {
		part: "snippet",
		type: "video",
		channelId: PUBLIC_YOUTUBE_CHANNEL_ID,
		key: SECRET_YOUTUBE_API_KEY,
		maxResults: "1",
		order: "date",
	};

	const params = new URLSearchParams(param_data);

	const url = `${PUBLIC_YOUTUBE_API_URL}/search?${params.toString()}`;

	const response = await fetch(url);

	if (response.ok) {
		const data = await response.json();
		const item = data?.items?.[0];
		const id = item?.id?.videoId;
		const url = `${PUBLIC_YOUTUBE_SHORT_URL}/${id}`;
		const title = item?.snippet.title;
		const thumbnail_url = item?.snippet?.thumbnails?.medium?.url;
		return { url, title, thumbnail_url };
	} else {
		console.log("YouTube API request failed: " + response.statusText);
		console.log("URL:", url);
		return null;
	}
}
