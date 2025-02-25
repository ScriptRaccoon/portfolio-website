import fs from "fs";
import path from "path";

import { google } from "googleapis";
import {
	PUBLIC_YOUTUBE_CHANNEL_ID,
	PUBLIC_YOUTUBE_SHORT_URL,
	SECRET_YOUTUBE_API_KEY,
} from "./env";

const youtube = google.youtube({
	version: "v3",
	auth: SECRET_YOUTUBE_API_KEY!,
});

async function get_youtube_stats() {
	try {
		// https://developers.google.com/youtube/v3/docs/channels/list
		const response = await youtube.channels.list({
			part: ["statistics"],
			id: [PUBLIC_YOUTUBE_CHANNEL_ID!],
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

export type video = {
	title: string;
	url: string;
	thumbnail_url: string;
};

async function get_latest_video() {
	try {
		// https://developers.google.com/youtube/v3/docs/search/list
		const response = await youtube.search.list({
			part: ["id", "snippet"],
			type: ["video"],
			channelId: PUBLIC_YOUTUBE_CHANNEL_ID!,
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

		const url = `${PUBLIC_YOUTUBE_SHORT_URL!}/${id}`;
		const title = video.snippet.title ?? "";
		const thumbnail_url = video.snippet.thumbnails?.medium?.url ?? "";

		return { url, title, thumbnail_url };
	} catch (err) {
		console.error(err);
		return null;
	}
}

async function update_static_youtube_data() {
	console.info("fetching youtube data...");

	const [stats, video] = await Promise.all([
		get_youtube_stats(),
		get_latest_video(),
	]);

	if (!stats || !video) {
		console.error("failed to fetch data, aborting");
		return;
	}

	const json = JSON.stringify({ stats, video });

	console.info("save data to static JSON file ...");
	fs.writeFileSync(
		path.resolve("src", "data", "youtube", "data.json"),
		json,
		"utf-8",
	);

	console.info("done");
}

update_static_youtube_data();
