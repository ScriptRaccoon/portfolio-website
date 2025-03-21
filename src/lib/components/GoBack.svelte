<script lang="ts">
	import Fa from 'svelte-fa'
	import { faLeftLong } from '@fortawesome/free-solid-svg-icons'

	function go_back() {
		history.back()
	}
</script>

<button onclick={go_back} aria-label="Go back">
	<Fa icon={faLeftLong} />
</button>
