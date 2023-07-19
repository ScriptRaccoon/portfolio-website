import { redis } from "./redis-client";

export async function rate_limited(ip: string): Promise<boolean> {
	const limit = await redis.get(`limiter:${ip}`);
	if (limit) {
		set_rate_limit(ip);
		return true;
	}
	return false;
}

export async function set_rate_limit(ip: string): Promise<void> {
	await redis.set(`limiter:${ip}`, 1, "EX", 2);
}
