<script lang="ts">
	type Props = {
		pos: number
		animated: boolean
		cols: number
	}

	let { pos, animated, cols }: Props = $props()
</script>

<div
	aria-hidden="true"
	class="underline"
	style:--pos={pos}
	style:--cols={cols}
	class:invisible={pos < 0}
	class:animated
></div>

<style>
	.underline {
		position: absolute;
		height: 0.1rem;
		top: 100%;
		left: 0;
		transform: translateX(calc(var(--pos) * 100%));
		width: calc(100% / var(--cols));
	}

	.underline.animated {
		transition:
			transform 200ms ease,
			opacity 200ms ease;
	}

	.underline.invisible {
		opacity: 0;
	}

	.underline::before {
		content: '';
		position: absolute;
		left: 10%;
		width: 80%;
		height: 100%;
		background-color: var(--accent-color);
	}
</style>
