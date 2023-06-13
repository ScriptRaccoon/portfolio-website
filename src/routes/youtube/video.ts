import { SECRET_YOUTUBE_API_KEY } from "$env/static/private";
import {
	PUBLIC_YOUTUBE_API_URL,
	PUBLIC_YOUTUBE_CHANNEL_ID,
	PUBLIC_YOUTUBE_SHORT_URL,
} from "$env/static/public";

export type video = {
	title: string;
	url: string;
	thumbnail_url: string;
};

export async function get_latest_video(): Promise<video | null> {
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
		console.log("Request failed for ", url);
		return null;
	}
}
