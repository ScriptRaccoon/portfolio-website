import { browser } from '$app/environment'

const initial_theme =
	browser && localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'

export const theme = $state<{
	value: 'light' | 'dark'
	toggle: () => void
}>({
	value: initial_theme,
	toggle: () => {
		if (!browser) return
		const new_value = theme.value === 'dark' ? 'light' : 'dark'
		theme.value = new_value
		localStorage.setItem('theme', new_value)
		document.body.setAttribute('data-theme', new_value)
	},
})
