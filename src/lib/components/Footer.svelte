<script lang="ts">
	import { page } from '$app/state'

	const SOURCE_CODE_BASE_URL =
		'https://github.com/ScriptRaccoon/portfolio-website/blob/main/src'

	function get_source_code_url(path: string): string {
		const blog_match = path.match(/^\/blog\/(.+)$/)
		if (blog_match) {
			const slug = blog_match[1]
			return `${SOURCE_CODE_BASE_URL}/data/posts/${slug}.md`
		}
		const projects_match = path.match(/^\/projects\/(.+)$/)
		if (projects_match) {
			const slug = projects_match[1]
			return `${SOURCE_CODE_BASE_URL}/data/projects/${slug}.md`
		}
		return 'https://github.com/ScriptRaccoon/portfolio-website'
	}
</script>

<footer class="secondary">
	<div class="links">
		<a href={get_source_code_url(page.url.pathname)} target="_blank">
			Source Code
		</a>
		<a href="/legal/privacy-policy">Privacy Policy</a>
	</div>
</footer>

<style>
	.links {
		font-size: var(--small-font);
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 2rem;
	}
</style>
