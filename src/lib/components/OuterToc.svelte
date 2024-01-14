<script lang="ts">
	export let toc: { id: string; text: string }[] = [];
</script>

<div
	class="outer-toc"
	aria-hidden="true"
	class:long={toc.length >= 10}
>
	<ol>
		{#each toc as item}
			<li>
				<a tabindex="-1" href="#{item.id}">{item.text}</a>
			</li>
		{/each}
	</ol>
</div>

<style lang="scss">
	ol {
		margin-left: 0;
		padding-left: 2rem;
		border-left: 1px solid var(--border-color);
	}

	.outer-toc {
		opacity: 0;
		pointer-events: none;

		@media (min-width: 90rem) {
			opacity: 1;
			pointer-events: initial;
			transform: translateX(52rem);
		}

		@media (prefers-reduced-motion: no-preference) {
			transition: opacity 250ms linear, transform 250ms ease-in-out;
		}

		position: fixed;
		top: 0;
		bottom: 0;
		transform: translateX(54rem);

		padding-top: 4.25rem;
		padding-bottom: 0.5rem;
		color: var(--secondary-font-color);

		overflow-y: auto;
		scrollbar-width: thin;

		::-webkit-scrollbar {
			width: 5px;
		}

		&.long {
			padding-top: 1rem;

			ol {
				padding-left: 3rem;
			}
		}
	}

	a:hover {
		color: var(--font-color);
	}
</style>
