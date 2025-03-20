import type { post, published_post } from "./types";

export function compose<X>(funs: ((x: X) => X)[]): (x: X) => X {
	if (funs.length === 0) return (x) => x;
	const [first, ...rest] = funs;
	return (x) => compose(rest)(first(x));
}

export const is_published = (data: post): data is published_post => {
	return data.published !== null;
};
