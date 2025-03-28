import shiki from 'shiki'
import markdownit from 'markdown-it'

const shiki_highlighter = await shiki.getHighlighter({
	theme: 'slack-dark',
	langs: [
		'javascript',
		'html',
		'css',
		'svelte',
		'scss',
		'git-commit',
		'markdown',
		'json',
		'pug',
	],
})

function highlight(code: string, lang: string): string {
	const highlighted_code = shiki_highlighter.codeToHtml(code, { lang })
	const highlighted_code_without_bg = highlighted_code.replace(
		/<pre([^>]*)style="[^"]*background-color:[^"]*"(.*?)>/g,
		'<pre$1$2>',
	)
	return highlighted_code_without_bg
}

const md = new markdownit({
	highlight,
})

export function render_markdown(str: string): string {
	return md.render(str)
}
