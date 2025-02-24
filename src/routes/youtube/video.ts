import {
	PUBLIC_YOUTUBE_CHANNEL_ID,
	PUBLIC_YOUTUBE_SHORT_URL,
} from "$env/static/public";
import { redis_cached } from "$lib/server/redis/cache";
import { youtube } from "./youtube";

export type video = {
	title: string;
	url: string;
	thumbnail_url: string;
};

async function get_latest_video(): Promise<video | null> {
	try {
		// https://developers.google.com/youtube/v3/docs/search/list
		const response = await youtube.search.list({
			part: ["id", "snippet"],
			type: ["video"],
			channelId: PUBLIC_YOUTUBE_CHANNEL_ID,
			maxResults: 1,
			order: "date",
		});

		const videos = response.data.items;
		if (!videos?.length) {
			throw new Error("No videos found in response");
		}

		const video = videos[0];

		if (!video.snippet) {
			throw new Error("No snippet found in video");
		}

		const id = video?.id?.videoId;

		if (!id) {
			throw new Error("No videoId found in video");
		}

		const url = `${PUBLIC_YOUTUBE_SHORT_URL}/${id}`;
		const title = video.snippet.title ?? "";
		const thumbnail_url = video.snippet.thumbnails?.medium?.url ?? "";

		return { url, title, thumbnail_url };
	} catch (err) {
		console.error(err);
		return null;
	}
}

export const get_cached_latest_video = redis_cached(
	"video",
	get_latest_video,
	24 * 60 * 60, // one day
);
