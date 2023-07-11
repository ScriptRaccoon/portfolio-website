import { redis } from "$lib/server/redis-client.js";
import { error, json } from "@sveltejs/kit";
import { dev } from "$app/environment";
import {
	rate_limited,
	set_rate_limit,
} from "$lib/server/redis-rate-limit.js";

export const POST = async (event) => {
	if (dev) return json({ likes: 0 });
	const pathname = await event.request.text();
	if (!pathname) throw error(400);
	const ip = event.getClientAddress();
	if (await rate_limited(ip)) throw error(405);
	const key = get_key(pathname);
	const likes = await redis.incr(key);
	set_rate_limit(ip);
	return json({ likes });
};

export const GET = async (event) => {
	if (dev) return json({ likes: 0 });
	const pathname = event.url.searchParams.get("pathname");
	if (!pathname) throw error(400);
	const key = get_key(pathname);
	const likes = parseInt((await redis.get(key)) ?? "0");
	return json({ likes });
};

function get_key(pathname: string): string {
	return `$like${pathname.replaceAll("/", ":")}`;
}
