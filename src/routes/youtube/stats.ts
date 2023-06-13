import { SECRET_YOUTUBE_API_KEY } from "$env/static/private";
import {
	PUBLIC_YOUTUBE_API_URL,
	PUBLIC_YOUTUBE_CHANNEL_ID,
} from "$env/static/public";

export type stats = {
	subscriber_count: number;
	video_count: number;
};

export async function get_youtube_stats(): Promise<stats | null> {
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
	} else {
		console.log("Request failed for ", url);
		console.log(data?.error?.message);
		return null;
	}
}
