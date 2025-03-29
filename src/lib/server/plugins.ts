import shiki from 'shiki'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import { createMathjaxInstance } from '@mdit/plugin-mathjax'

/**
 * Plugin to automatically add target="_blank" to external links,
 * those starting with http:// or https://.
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

		if (href?.startsWith('http')) {
			token.attrSet('target', '_blank')
		}

		return slf.renderToken(tokens, idx, options)
	}
}

/**
 * Shiki highlighter for code highlighting
 */
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

/**
 * Plugin to highlight code with Shiki
 */
export function highlight(code: string, lang: string): string {
	const highlighted_code = shiki_highlighter.codeToHtml(code, { lang })
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
 * Plugin configuration to highlight math formulas with MathJax
 */
export const mathjax_instance = createMathjaxInstance({
	loader: { load: ['input/tex', 'output/svg'] },
	tex: {
		// @ts-ignore shut up
		inlineMath: [['$', '$']],
	},
	mathml: {
		enabled: true,
	},
	a11y: false, // FIXME. When true, formulas are rendered twice.
	enableAssistiveMml: false,
})

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
