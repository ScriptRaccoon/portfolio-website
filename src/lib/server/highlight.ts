import he from "he";
import shiki from "shiki";

const highlighter = await shiki.getHighlighter({
	theme: "material-theme-darker",
	langs: [
		"javascript",
		"html",
		"css",
		"svelte",
		"scss",
		"git-commit",
		"bash",
	],
});

const code_regex =
	/<pre><code\s+class="language-(\w+)">([\s\S]+?)<\/code><\/pre>/gi;

export function highlight(htmlContent: string) {
	return htmlContent.replace(code_regex, (_, lang, code) => {
		code = he.decode(code);
		return highlighter.codeToHtml(code.trim(), { lang });
	});
}
