import type { Redis } from "ioredis";

export async function rate_limited(
	redis: Redis,
	ip: string,
): Promise<boolean> {
	const limit = await redis.get(`limiter:${ip}`);
	if (limit) {
		set_rate_limit(redis, ip);
		return true;
	}
	return false;
}

export async function set_rate_limit(
	redis: Redis,
	ip: string,
): Promise<void> {
	await redis.set(`limiter:${ip}`, 1, "EX", 2);
}
