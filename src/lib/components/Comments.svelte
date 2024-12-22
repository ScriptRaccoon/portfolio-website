<script lang="ts">
	import { current_theme } from "$lib/shared/state.svelte";
	import Giscus from "@giscus/svelte";
</script>

<Giscus
	id="comments"
	repo="ScriptRaccoon/portfolio-website"
	repoId="R_kgDOJtR4lw"
	category="Announcements"
	categoryId="DIC_kwDOJtR4l84ChMV2"
	mapping="pathname"
	term="Welcome to @giscus/svelte component!"
	reactionsEnabled="1"
	emitMetadata="0"
	inputPosition="top"
	theme={current_theme.value}
	lang="en"
	loading="lazy"
/>
