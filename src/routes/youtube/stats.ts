import { PUBLIC_YOUTUBE_CHANNEL_ID } from "$env/static/public";
import { redis_cached } from "$lib/server/redis/cache";
import { youtube } from "./youtube";

export type stats = {
	subscriber_count: number;
	video_count: number;
};

async function get_youtube_stats(): Promise<stats | null> {
	try {
		// https://developers.google.com/youtube/v3/docs/channels/list
		const response = await youtube.channels.list({
			part: ["statistics"],
			id: [PUBLIC_YOUTUBE_CHANNEL_ID],
		});

		const statistics = response.data?.items?.[0].statistics;
		if (!statistics) {
			throw new Error("No statistics found in item");
		}

		const subscriber_count = Number(statistics.subscriberCount ?? 0);
		const video_count = Number(statistics.videoCount ?? 0);

		return { subscriber_count, video_count };
	} catch (err) {
		console.error(err);
		return null;
	}
}
export const get_cached_youtube_stats = redis_cached(
	"stats",
	get_youtube_stats,
	24 * 60 * 60, // one day
);
