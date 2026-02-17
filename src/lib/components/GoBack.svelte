<script lang="ts">
	import Fa from 'svelte-fa'
	import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

	function go_back() {
		history.back()
	}
</script>

<button onclick={go_back} aria-label="Go back">
	<Fa icon={faAngleLeft} scale={1.25} />
</button>

<style>
	button {
		padding-inline: 0.5rem;
	}
</style>
