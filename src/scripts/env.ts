import dotenv from "dotenv";
dotenv.config();

const SECRET_YOUTUBE_API_KEY = process.env.SECRET_YOUTUBE_API_KEY;

const PUBLIC_YOUTUBE_CHANNEL_ID =
	process.env.PUBLIC_YOUTUBE_CHANNEL_ID;

const PUBLIC_YOUTUBE_SHORT_URL = process.env.PUBLIC_YOUTUBE_SHORT_URL;

if (!SECRET_YOUTUBE_API_KEY) {
	throw new Error("SECRET_YOUTUBE_API_KEY is not set");
}

if (!PUBLIC_YOUTUBE_CHANNEL_ID) {
	throw new Error("PUBLIC_YOUTUBE_CHANNEL_ID is not set");
}

if (!PUBLIC_YOUTUBE_SHORT_URL) {
	throw new Error("PUBLIC_YOUTUBE_SHORT_URL is not set");
}

export {
	SECRET_YOUTUBE_API_KEY,
	PUBLIC_YOUTUBE_CHANNEL_ID,
	PUBLIC_YOUTUBE_SHORT_URL,
};
