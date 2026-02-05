/**
 * Returns the current month in the format YYYY-MM.
 */
export function get_current_month(): string {
	const today = new Date()
	return today.toISOString().substring(0, 7)
}

/**
 * Adds a month for a date string in the format YYYY-MM.
 * For example: 2025-06 ---> 2025-07
 */
export function add_month(month_str: string): string {
	const [year_str, month_str_part] = month_str.split('-')
	let year = Number(year_str)
	let month = Number(month_str_part)

	month++

	if (month > 12) {
		month = 1
		year++
	}

	return `${year}-${String(month).padStart(2, '0')}`
}
