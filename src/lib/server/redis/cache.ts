import { SECRET_REDIS_URL } from "$env/static/private";
import Redis from "ioredis";

const redis = new Redis(SECRET_REDIS_URL);

/**
 * This is a general decorator function that caches the
 * return value of a function for a specified amount of time
 * inside of a redis database. This can be used
 * to save responses from API requests, for example.
 * Caveat: This function is not typesafe, since we don't know
 * which type of data is saved in the redis database.
 * @param key key in the Redis database
 * @param fun any function (without arguments)
 * @param duration caching duration in seconds
 * @returns the function return value when the cache is empty or expired, or the cached value
 */
export function redis_cached<T>(
	key: string,
	fun: () => Promise<T>,
	duration: number,
) {
	return async function (): Promise<T | null> {
		try {
			const cached_value = await redis.get(key);
			if (cached_value) return JSON.parse(cached_value);

			const result = await fun();
			redis.set(key, JSON.stringify(result), "EX", duration);
			return result;
		} catch (error) {
			console.error(error);
			return null;
		}
	};
}
