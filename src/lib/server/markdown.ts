import markdownit from 'markdown-it'
import {
	add_ids_to_headings,
	handle_external_links,
	highlight,
} from './plugins'

const md = new markdownit({
	highlight,
})

md.use(handle_external_links)
md.use(add_ids_to_headings)

export function render_markdown(str: string): string {
	return md.render(str)
}
