import mathjax from "mathjax";

const MathJax = await mathjax.init({
	loader: { load: ["input/tex", "output/svg"] },
});

function render_formula(formula) {
	const svg = MathJax.tex2svg(formula, {
		display: false,
	});
	return MathJax.startup.adaptor.innerHTML(svg);
}

const math_tag_regex = /&lt;math&gt;(.*?)&lt;\/math&gt;/g;

export function render_formulas(htmlContent) {
	const renderedHtml = htmlContent.replace(
		math_tag_regex,
		(_, formula) => {
			return render_formula(formula);
		},
	);

	return renderedHtml;
}
