<script>
	function go_back() {
		history.back();
	}
</script>

<button on:click={go_back}>Go back</button>

<style>
	button {
		text-decoration: underline;
		text-underline-offset: 0.1rem;
		font-size: var(--small-font);
		color: var(--secondary-font-color);
	}
</style>
