---
title: How to implement a cookie-based dark mode toggle in SvelteKit
published: 2023-06-23
updated: 2023-06-24
description: Implemented using server-side rendering and SvelteKit's handle hook.
---

## Introduction

Implementing a basic dark mode toggle is a fairly easy task. One idea might be to use a button that toggles a class called `dark` on the `body` element, and this class sets the corresponding theme. However, this solution

1. does not remember the user's choice,
2. does not use the user's theme from the system settings.

To address (1), one might save the preference in the browser's local storage. With every page visit, we check with it if a theme is saved. This works well, but it will cause the website to flash because it takes some time to download and execute the JavaScript.

This is a bad user experience. We need the correct theme to be rendered already on the server. This will be covered in this post, using **cookies** and SvelteKit's **handle hook**. (See the later-added [Bonus](#bonus) section on how to fix this with `localStorage` directly.)

To address (2), we can use a media query:

```css
@media (prefers-color-scheme: dark) {
	/* ... */
}
```

Media queries can also be checked within the (client-side) JavaScript. We will use this method only on the user's first visit to the page.

The finished code of this post is available on [GitHub](https://github.com/ScriptRaccoon/sveltekit-darkmode-toggler).

## Setup

I assume that you are familiar with the basics of SvelteKit. We start with a simple SvelteKit application with the following structure:

```markdown
-- src/
---- lib/
------ components/
-------- Nav.svelte
---- routes/
------ about/
-------- +page.svelte
------ +layout.svelte
------ +page.svelte
------ app.css
```

So we have a Home page, an About page, and a layout that combines both. That layout imports the global CSS file as well as a navigation component that has links to both pages. The precise content is irrelevant to this post. You can also use an existing SvelteKit project.

I will use TypeScript below, but you can easily extract the JavaScript if you are not familiar with it.

## Theming with CSS variables

Theming is achieved via CSS variables (official name: CSS custom properties). In `app.css` we add the following:

```css
html {
	--font-color: #222;
	--bg-color: #fff;
	--accent-color: steelblue;
	--nav-color: #eee;
}
```

We can use these colors like so:

```css
body {
	color: var(--font-color);
	background-color: var(--bg-color);
}

h1 {
	color: var(--accent-color);
}
```

In `Nav.svelte` we use `--nav-color`, but of course you can use or add any colors you like.

The colors above represent a light mode. When the user switches to dark mode, we will add a corresponding attribute to the `html` element. We change the CSS variables accordingly:

```css
html[data-theme="dark"] {
	--font-color: #fff;
	--bg-color: #222;
	--accent-color: #ff0050;
	--nav-color: #444;
}
```

You can test this by adding `data-theme="dark"` to the `html` element in `src/app.html`.

You might think, why not replace our first colors block with `html[data-theme="light"]`? This is because we want to display some default theme to the user before any client-side JavaScript is loaded (in case no cookie is set, more on that later).

If you want to make the transition between the two themes more smooth, you can add CSS transitions, for example:

```css
body {
	transition: color 200ms linear;
}
```

## Saving the theme as a cookie

In `Nav.svelte`, we need to calculate the current theme. We will do this in the `onMount` lifecycle function.

Either there is already a theme set on the `html` element, or we retrieve it from a media query, as follows.

```typescript
let current_theme: string;

onMount(() => {
	const saved_theme =
		document.documentElement.getAttribute("data-theme");
	if (saved_theme) {
		current_theme = saved_theme;
		return;
	}

	const preference_is_dark = window.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches;

	const theme = preference_is_dark ? "dark" : "light";
	set_theme(theme); // TODO
});
```

The function `set_theme` adjusts the `data-theme` attribute of the `html` and also sets a cookie that lasts for one year. We set `path=/` so that the cookie is available on other pages such as our About page as well.

```typescript
function set_theme(theme: string) {
	const one_year = 60 * 60 * 24 * 365;
	document.cookie = `theme=${theme}; max-age=${one_year}; path=/`;
	document.documentElement.setAttribute("data-theme", theme);
	current_theme = theme;
}
```

When you open the page and check the developer tools, you will now find a cookie called `theme` whose value is determined by your system settings. It is either `light` or `dark`. Also, the page should indeed have the corresponding theme. Yay!

Try to change the system settings or the browser theme. Refreshing the page should also change its theme.

By the way, you probably want to validate in the code above that only `light` and `dark` are allowed to be set as a theme. You can find a possible solution in the GitHub repository.

## Toggling themes

Let us add a toggle button in the markup of our `Nav.svelte`.

```svelte
<button aria-label="toggle theme" on:click={toggle_theme}>
	<Sun />
</button>
```

Inside it, we can render a sun component or whatever we like. We can also go fancy and add an animation that interpolates between a sun and a moon (depending on the state of `current_theme`), just as on the [SvelteKit website](https://kit.svelte.dev/), but this will not be covered here.

The button triggers a function that toggles the theme:

```typescript
function toggle_theme(): void {
	const theme = current_theme === "light" ? "dark" : "light";
	set_theme(theme);
}
```

You can now change the theme with that button. Also, your choice will be remembered, thanks to the cookie. Yay!

However, there is an issue. When you open the website and have chosen dark mode, you will notice that the page is showing the light theme for a short period. (It will even be longer if you have opted for a CSS transition above.) This happens because the theme is only evaluated with client-side JavaScript.

This flashing is annoying. We need to improve this.

## The handle hook

Before we go on, we add an empty theme to the `html` tag in `src/app.html`:

```html
<!DOCTYPE html>
<html lang="en" data-theme="">
	...
</html>
```

SvelteKit offers us to intercept server requests with the server-side handle hook. This is a function that is exported from the `src/hooks.server.ts` file. This is somewhat similar to **middleware** which you might know from the Express framework.

We will use this hook to change the `data-theme` attribute above. This happens on the server so that the user will not see any flashing anymore. For this to work, you cannot use a [prerendered website](https://kit.svelte.dev/docs/page-options).

The default handle hook looks like this.

```typescript
// src/hooks.server.ts

export const handle = async ({ event, resolve }) => {
	// before the server handles the request,
	// you can do stuff here

	// the server handles the request
	// and generates a response
	const response = await resolve(event);

	// after the server handles the request,
	// you can do stuff here

	// the response is sent to the browser
	return response;
};
```

If you want to know more, definitely check out [Learn SvelteKit Hooks Through Example](https://joyofcode.xyz/sveltekit-hooks) by Joy of Code.

Inside the handle hook, we first check if the cookie is not present. This will be the case when the user visits the page for the first time, or the cookie has expired after one year. In this case, we just return the default response.

```typescript
export const handle = async ({ event, resolve }) => {
	const theme = event.cookies.get("theme");
	if (!theme) {
		return await resolve(event);
	}
	// ...
};
```

Now we need to treat the case that the cookie or theme is present.

The `resolve` function accepts a second parameter with options, including a function `transformPageChunk` that can replace the HTML string for us. In our case, we will replace an empty `data-theme` attribute with the correct one:

```typescript
return await resolve(event, {
	transformPageChunk: ({ html }) => {
		return html.replace('data-theme=""', `data-theme="${theme}"`);
	},
});
```

And this is it! Since now the page is server-side rendered with the correct theme, there will be no flashing.

Well, except maybe for the very first visit. I do not know if there is a good way to prevent this from happening. A really dirty approach is to hide the HTML as long as no theme is set on the client, but this also means that users with a slow connection have to wait for the JavaScript to run before the content becomes visible, which is certainly against the idea of server-side rendering. But this will only happen once a year (per user), so maybe it's not a big deal.

Another option would be to just ignore the media query and always initially set a default theme on the first visit. You can do some tracking to check which theme is most common among your users and use this to decide upon your default theme.

## Recap

1. When the user visits the page for the first time, since no cookie is present, the HTML is returned with a default theme.
2. The client-side JavaScript retrieves the preferred theme with a media query and saves it as a long-lasting cookie.
3. The theme is saved as an attribute on the HTML element, which then changes the colors in the CSS.
4. The toggle button changes the theme variable as well as the cookie.
5. With every server request that includes a cookie, we adjust the HTML with the server-side handle hook so that the theme attribute is already set when the HTML arrives in the browser.

## References

I have used the following videos as a reference:

- WebJeda, [Dark mode toggle (cookie based) with SSR in Sveltekit](https://www.youtube.com/watch?v=mt56gKUeppk)
- WebJeda, [Dark mode toggle with prefers-color-scheme in Sveltekit](https://www.youtube.com/watch?v=dORbhEZuKmE)

A different, much more server-side approach is taken here:

- HuntaByte, [SvelteKit Dark Mode Toggle/Theme Selector (with SSR)](https://www.youtube.com/watch?v=3GpZkVBjXfE)

This prevents the initial flashing but does not take into account the initial user preference with a media query, as far as I can tell.

A similar cookie-based approach is taken in this video (with the deprecated SvelteKit routing system, though):

- Johnny Magrippis, [How to: SvelteKit SSR Dark Mode 🌒 with cookies!](https://www.youtube.com/watch?v=5A21S5mMijI)

## Bonus

After publishing this post, I was made aware that we can make the `localStorage` solution work also without flashing. Then we do not need any server-side logic and can also work with prerendered pages (such as a blog). In fact, the initial theme can be retrieved (via a media query or a `localStorage` value if it exists) in a script tag which is directly put into the `body` element of the `app.html`. You can also make it a static file `static/darkmode.js` and import it like so:

```html
<body data-sveltekit-preload-data="hover">
	<script src="%sveltekit.assets%/darkmode.js"></script>
	<div style="display: contents">%sveltekit.body%</div>
</body>
```

The rest is an easy exercise... Please check out [this repository](https://github.com/ScriptRaccoon/sveltekit-darkmode-toggler-localstorage/) for more details. This approach is also used (more or less) on [Svelte's website](https://svelte.dev).
