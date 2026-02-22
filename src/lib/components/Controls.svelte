<script lang="ts">
	import { page } from '$app/state'
	import CopyText from './CopyText.svelte'
	import GoBack from './GoBack.svelte'
</script>

<div class="secondary">
	<GoBack />
	<CopyText text={page.url.href} name="URL" />
</div>

<style>
	div {
		display: flex;
		justify-content: space-between;
	}
</style>
