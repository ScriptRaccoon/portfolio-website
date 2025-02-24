import { SECRET_YOUTUBE_API_KEY } from "$env/static/private";
import { google } from "googleapis";

export const youtube = google.youtube({
	version: "v3",
	auth: SECRET_YOUTUBE_API_KEY,
});
