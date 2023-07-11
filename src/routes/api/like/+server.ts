import { redis } from "$lib/server/redis.js";
import { error, json } from "@sveltejs/kit";
import { dev } from "$app/environment";

export const POST = async (event) => {
	const pathname = await event.request.text();
	if (!pathname) throw error(400);
	const key = get_key(pathname);
	const likes = await redis.incr(key);
	return json({ likes });
};

export const GET = async (event) => {
	const pathname = event.url.searchParams.get("pathname");
	if (!pathname) throw error(400);
	const key = get_key(pathname);
	const likes = parseInt((await redis.get(key)) ?? "0");
	return json({ likes });
};

function get_key(pathname: string): string {
	const prefix = dev ? "dev:" : "";
	return `${prefix}like${pathname.replaceAll("/", ":")}`;
}
