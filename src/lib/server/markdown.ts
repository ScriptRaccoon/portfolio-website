import markdownit from 'markdown-it'
import {
	add_ids_to_headings,
	add_copy_buttons,
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
md.use(add_copy_buttons)

export function render_markdown(str: string): string {
	return md.render(str)
}
