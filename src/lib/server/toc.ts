export function get_table_of_contents(
	html_content: string,
): { text: string; id: string }[] {
	const matches = html_content.match(
		/<h2[^>]*id="([^"]+)"[^>]*>(.*?)<\/h2>/gi,
	)
	if (!matches) return []

	return matches.map((match) => {
		const id_match = match.match(/id="([^"]+)"/)
		const text_match = match.replace(/<\/?h2[^>]*>/g, '')
		const id = id_match ? id_match[1] : ''
		const text = text_match.trim()
		return { text, id }
	})
}
