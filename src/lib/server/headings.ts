export function add_ids_to_headings(htmlContent: string): string {
	const modifiedHtmlCode = htmlContent
		.replace(/<h2>(.*?)<\/h2>/gi, (_, content) => {
			const id = content.trim().toLowerCase().replace(/\s+/g, "-");
			return `<h2 id="${id}">${content}</h2>`;
		})
		.replace(/<h3>(.*?)<\/h3>/gi, (_, content) => {
			const id = content.trim().toLowerCase().replace(/\s+/g, "-");
			return `<h3 id="${id}">${content}</h3>`;
		});

	return modifiedHtmlCode;
}
