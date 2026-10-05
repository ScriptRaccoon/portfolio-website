import { createHighlighter } from 'shiki'
import type { MarkdownIt, Token } from 'markdown-it'
import { createMathjaxInstance, type TexPackage } from '@mdit/plugin-mathjax'

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
 * MathJax TeX packages: all packages loaded by @mdit/plugin-mathjax by default,
 * except "bboldx", which redefines \mathbb to use a font extension
 * that is not installed (so \mathbb{Z} would render as a plain Z).
 * The type cast is necessary since TexPackage does not include "base".
 */
const mathjax_packages = [
	'base',
	'action',
	'ams',
	'amscd',
	'bbm',
	'bbox',
	'begingroup',
	'boldsymbol',
	'braket',
	'bussproofs',
	'cancel',
	'cases',
	'centernot',
	'color',
	'colortbl',
	'colorv2',
	'configmacros',
	'dsfont',
	'empheq',
	'enclose',
	'extpfeil',
	'gensymb',
	'html',
	'mathtools',
	'mhchem',
	'newcommand',
	'noerrors',
	'noundefined',
	'physics',
	'setoptions',
	'tagformat',
	'texhtml',
	'textcomp',
	'textmacros',
	'unicode',
	'units',
	'upgreek',
	'verb',
] as TexPackage[]

/**
 * Plugin configuration to highlight math formulas with MathJax
 */
export const mathjax_instance = await createMathjaxInstance({
	loader: { load: ['input/tex', 'output/svg'] },
	tex: {
		packages: mathjax_packages,
		// @ts-ignore shut up
		inlineMath: [['$', '$']],
	},
	mathml: {
		enabled: true,
	},
	a11y: false,
	enableAssistiveMml: false,
})

/**
 * Glyphs for variants such as \mathbb live in dynamically loaded font files,
 * which cannot be loaded during the synchronous markdown rendering.
 */
if (!mathjax_instance) throw new Error('MathJax could not be initialized')

await mathjax_instance.documentOptions.OutputJax.font.loadDynamicFiles()

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
