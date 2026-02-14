<div class="scene">
	<div class="cube">
		<div class="front"></div>
		<div class="back"></div>
		<div class="left"></div>
		<div class="right"></div>
		<div class="top"></div>
		<div class="bottom"></div>
	</div>
</div>

<style>
	.scene {
		perspective: 20rem;
		display: grid;
		place-items: center;
		max-width: 22rem;
		aspect-ratio: 1/1;
		margin: 1rem auto;
		overflow: hidden;
	}

	.scene * {
		position: absolute;
		transform-style: preserve-3d;
	}

	.cube {
		display: grid;
		place-items: center;
		animation: rotate 20s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotateX(330deg) rotateY(-30deg);
		}
		to {
			transform: rotateX(-30deg) rotateY(330deg);
		}
	}

	.cube > div {
		width: 10rem;
		height: 10rem;
		background-color: var(--color);
		opacity: 0.8;
	}

	.front {
		--color: green;
		transform: translateZ(5rem);
	}

	.back {
		--color: blue;
		transform: translateZ(-5rem);
	}
	.left {
		--color: darkorange;
		transform: rotateY(-90deg) translateZ(5rem);
	}

	.right {
		--color: red;
		transform: rotateY(90deg) translateZ(5rem);
	}

	.top {
		--color: white;
		transform: rotateX(90deg) translateZ(5rem);
	}

	.bottom {
		--color: yellow;
		transform: rotateX(-90deg) translateZ(5rem);
	}
</style>
