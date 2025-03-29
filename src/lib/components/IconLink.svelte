<script lang="ts">
	import Fa from 'svelte-fa'

	import { type IconDefinition as IconDefinitionSolid } from '@fortawesome/free-solid-svg-icons'
	import { type IconDefinition as IconDefinitionBrand } from '@fortawesome/free-brands-svg-icons'

	type Props = {
		path: string
		icon: IconDefinitionSolid | IconDefinitionBrand
		name: string
	}

	let { path, icon, name }: Props = $props()
</script>

<a href={path}>
	<Fa {icon} />
	<span>{name}</span>
</a>

<style lang="scss">
	a {
		text-decoration: none;
	}

	span {
		font-size: var(--small-font);

		@media (max-width: 38rem) {
			position: absolute;
			left: -100vw;
		}
	}
</style>
