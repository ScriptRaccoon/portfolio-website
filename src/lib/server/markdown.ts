import markdownit from 'markdown-it'
import {
	add_ids_to_headings,
	handle_external_links,
	highlight,
	mathjax_instance,
} from './plugins'
import { mathjax } from '@mdit/plugin-mathjax'

const md = new markdownit({
	highlight,
})

md.use(handle_external_links)
md.use(add_ids_to_headings)
md.use(mathjax, mathjax_instance)

export function render_markdown(str: string): string {
	return md.render(str)
}
