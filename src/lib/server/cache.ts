/**
 * This is a general decorator function which caches the
 * return value of a function for a specified amount of time.
 * This can be used to save responses from API requests for example.
 * @param fun any function (without arguments)
 * @param duration caching duration in milliseconds
 * @returns the function return value when the cache is empty or old, or the cache value
 */
export function cached<T>(fun: () => T, duration: number) {
	let date: Date | null = null;
	let cache: T | null = null;
	return function (): T {
		if (
			cache &&
			date &&
			new Date().getTime() - date.getTime() <= duration
		) {
			return cache;
		}
		const result = fun();
		cache = result;
		date = new Date();
		return result;
	};
}
