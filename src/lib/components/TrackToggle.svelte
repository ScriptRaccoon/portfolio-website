<script lang="ts">
	import { browser } from '$app/environment'
	import { NOTRACK_STORAGE_KEY } from '$lib/client/track'

	let device_is_tracked = $state(false)

	if (browser) {
		device_is_tracked = !window.localStorage.getItem(NOTRACK_STORAGE_KEY)
	}

	function track_device() {
		if (!browser) return
		device_is_tracked = true
		window.localStorage.removeItem(NOTRACK_STORAGE_KEY)
	}

	function untrack_device() {
		if (!browser) return
		device_is_tracked = false
		window.localStorage.setItem(NOTRACK_STORAGE_KEY, '1')
	}
</script>

{#if device_is_tracked}
	<button class="button" onclick={untrack_device}>
		Do not track this device
	</button>
{:else}
	<button class="button" onclick={track_device}>Track this device</button>
{/if}
