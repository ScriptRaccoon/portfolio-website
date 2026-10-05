import { createHighlighter } from 'shiki'
import type { MarkdownIt, Token } from 'markdown-it'
import katex from 'katex'

/**
 * Plugin to automatically add target="_blank" to external links
 */
export function handle_external_links(md: MarkdownIt): void {
	md.renderer.rules.link_open = (
		tokens: Token[],
		idx: number,
		options: any,
		_env: any,
		slf: any,
	): string => {
		const token = tokens[idx]
		const href = token.attrGet('href')

		if (typeof href === 'string' && href.startsWith('http')) {
			token.attrSet('target', '_blank')
		}

		return slf.renderToken(tokens, idx, options)
	}
}

/**
 * Shiki highlighter for code highlighting
 */
const shiki_highlighter = await createHighlighter({
	themes: ['slack-dark'],
	langs: [
		'javascript',
		'bash',
		'html',
		'css',
		'svelte',
		'scss',
		'git-commit',
		'markdown',
		'json',
		'pug',
		'sql',
	],
})

/**
 * Plugin to highlight code with Shiki
 */
export function highlight(code: string, lang: string): string {
	const highlighted_code = shiki_highlighter.codeToHtml(code, {
		theme: 'slack-dark',
		lang,
	})
	if (!lang) console.error('Missing language for code snippet:', code)
	const highlighted_code_without_bg = highlighted_code.replace(
		/<pre([^>]*)style="[^"]*background-color:[^"]*"(.*?)>/g,
		'<pre$1$2>',
	)
	return highlighted_code_without_bg
}

/**
 * Function to generate an ID from a heading.
 * Example: "Hello World!" -> "hello-world"
 */
function generate_id(heading: string): string {
	return heading
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
}

/**
 * Plugin to add IDs to H2 headings
 */
export function add_ids_to_headings(md: MarkdownIt): void {
	md.renderer.rules.heading_open = (
		tokens: any[],
		idx: number,
		options: any,
		_env: any,
		slf: any,
	): string => {
		const token = tokens[idx]

		if (token.tag === 'h2') {
			const headingText = tokens[idx + 1].content
			const id = generate_id(headingText)

			token.attrSet('id', id)
		}

		return slf.renderToken(tokens, idx, options)
	}
}

/**
 * Plugin to render math formulas with KaTeX.
 * Inline formulas are written as $...$, display formulas as $$...$$.
 * Following Pandoc, the opening $ must not be followed by whitespace,
 * and the closing $ must not be preceded by whitespace nor followed
 * by a digit (so that "$5 to $10" is not treated as math).
 */
export function render_math(md: MarkdownIt): void {
	md.inline.ruler.after('escape', 'math', (state, silent) => {
		const src = state.src
		const start = state.pos
		if (src[start] !== '$') return false

		const display = src[start + 1] === '$'
		const delimiter = display ? '$$' : '$'
		const content_start = start + delimiter.length

		if (!display && /\s/.test(src[content_start] ?? ' ')) return false

		let end = content_start
		while (true) {
			end = src.indexOf(delimiter, end)
			if (end === -1) return false
			if (src[end - 1] === '\\') {
				end++
				continue
			}
			if (!display && /\s/.test(src[end - 1])) return false
			if (!display && /\d/.test(src[end + 1] ?? '')) return false
			break
		}

		const formula = src.slice(content_start, end)
		if (!formula.trim()) return false

		if (!silent) {
			const token = state.push('math', 'math', 0)
			token.content = formula
			token.markup = delimiter
		}

		state.pos = end + delimiter.length
		return true
	})

	md.renderer.rules.math = (tokens, idx) => {
		const { content, markup } = tokens[idx]
		return katex.renderToString(content, {
			displayMode: markup === '$$',
			throwOnError: true,
		})
	}
}

/**
 * Plugin that adds a button to copy the code to clipboard
 */
export function add_copy_buttons(md: MarkdownIt) {
	const default_fence =
		md.renderer.rules.fence ??
		((tokens, idx, options, _env, self) =>
			self.renderToken(tokens, idx, options))

	md.renderer.rules.fence = (tokens, idx, options, env, self) => {
		const codeHtml = default_fence(tokens, idx, options, env, self)

		return `
		<div class="code-block">
			<button class="copy-btn">Copy</button>
		  	${codeHtml}
		</div>`
	}
}
