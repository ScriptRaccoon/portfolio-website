import type { PostMetaData, PublishedPostMetaData } from '$lib/types'
import { Crawler } from 'es6-crawler-detect'
import { UAParser } from 'my-ua-parser'

const CrawlerDetector = new Crawler()

export function is_published(
	metadata: PostMetaData,
): metadata is PublishedPostMetaData {
	return metadata.published !== null
}

export function get_geo_data(request: Request): {
	country: string | null
	city: string | null
} {
	// Netlify specific header
	const geo_header = request.headers.get('x-nf-geo')

	if (!geo_header) return { country: null, city: null }

	try {
		const decoded = JSON.parse(atob(geo_header))
		const city = decoded.city || null
		const country = decoded.country?.name || null
		return { country, city }
	} catch (_) {
		return { country: null, city: null }
	}
}

export function get_device_data(request: Request) {
	const ua = request.headers.get('user-agent')
	const parser = new UAParser(ua || '')
	const browser = parser.getBrowser().name || null
	const os = parser.getOS().name || null
	return { browser, os }
}

export function is_bot(request: Request): boolean {
	const ua = request.headers.get('user-agent') ?? ''
	return CrawlerDetector.isCrawler(ua)
}

export function is_same_origin(request: Request, site_origin: string): boolean {
	const origin = request.headers.get('origin')
	const referer = request.headers.get('referer')

	if (origin !== null) return origin === site_origin
	if (referer !== null) return referer.startsWith(site_origin)

	return false
}

function round_two_digits(num: number) {
	return Math.round(num * 100) / 100
}

export function add_percentages<T extends { counter: number }>(
	arr: T[],
): (T & { percentage: number })[] {
	const sum = arr.reduce((prev, curr) => prev + curr.counter, 0)
	return arr.map((obj) => ({
		...obj,
		percentage: round_two_digits((100 * obj.counter) / sum),
	}))
}
