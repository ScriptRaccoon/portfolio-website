import { SECRET_YOUTUBE_API_KEY } from "$env/static/private";
import {
	PUBLIC_YOUTUBE_API_URL,
	PUBLIC_YOUTUBE_CHANNEL_ID,
	PUBLIC_YOUTUBE_SHORT_URL,
} from "$env/static/public";
import { redis_cached } from "$lib/server/redis/cache";

export type video = {
	title: string;
	url: string;
	thumbnail_url: string;
};

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
	const data = await response.json();

	if (response.ok) {
		const item = data?.items?.[0];
		const id = item?.id?.videoId;
		const url = `${PUBLIC_YOUTUBE_SHORT_URL}/${id}`;
		const title = item?.snippet.title;
		const thumbnail_url = item?.snippet?.thumbnails?.medium?.url;
		return { url, title, thumbnail_url };
	}

	console.error("Request failed for ", url);
	console.error(data?.error?.message);
	return null;
}

export const get_cached_latest_video = redis_cached(
	"video",
	get_latest_video,
	30 * 24 * 60 * 60, // thirty days (currently I don't publish any new videos)
);
