<script module lang="ts">
	import { browser } from '$app/environment'
	import { NOTRACK_STORAGE_KEY } from '$lib/client/track'
	export const device_is_tracked = $state({ value: false })

	if (browser) {
		device_is_tracked.value =
			!window.localStorage.getItem(NOTRACK_STORAGE_KEY)
	}
</script>

<script lang="ts">
	function track_device() {
		if (!browser) return
		device_is_tracked.value = true
		window.localStorage.removeItem(NOTRACK_STORAGE_KEY)
	}

	function untrack_device() {
		if (!browser) return
		device_is_tracked.value = false
		window.localStorage.setItem(NOTRACK_STORAGE_KEY, '1')
	}
</script>

{#if device_is_tracked.value}
	<button class="button" onclick={untrack_device}>
		Do not track this device
	</button>
{:else}
	<button class="button" onclick={track_device}>Track this device</button>
{/if}
