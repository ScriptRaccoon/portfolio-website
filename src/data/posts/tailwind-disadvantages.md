---
title: Disadvantages of Tailwind
published: 2024-03-23
updated:
description: Why the popular CSS framework is not maintainable
---

## Introduction

This post explains the disadvantages of using [TailwindCSS](https://tailwindcss.com/). I share my (rather frustrating) experience of working with Tailwind in a large codebase at my job but also attempt to give a summary of the numerous posts and articles that have covered the subject, in particular with regards to maintainability concerns.

As you can probably tell from the length of this blog post, I have tried to cover as many topics as possible and to explore them in depth. I also reflect on the common responses to criticism against Tailwind and explain their shortcomings.

I understand that many people enjoy working with Tailwind. Many developers have reported being more productive with Tailwind. And that's fine. I also enjoyed working with Tailwind on a small personal project. But maybe you will find something in this post that makes you reconsider your choice.

Many of the issues presented here apply to every utility-based CSS framework. Notice that this blog post is based on Tailwind 3, and there might be changes in the already announced version 4.

## What is Tailwind

Skip this section if you are already familiar with Tailwind.

Tailwind is a CSS framework that seeks to style every HTML element using predefined utility classes. For almost every CSS property you can imagine there is a corresponding Tailwind utility class. So for example instead of writing

```css
div {
	margin-top: 1rem;
	color: #991b1b;
	display: flex;
	align-items: center;
}
```

in a CSS file, with Tailwind you will write the following directly in your HTML:

```html
<div class="mt-4 text-red-800 flex items-center">
	<!-- markup -->
</div>
```

Check the [Tailwind Docs](https://tailwindcss.com/docs) for more details.

Tailwind makes the following promises (and some others as well):

- Write CSS faster
- Unified design system
- Avoids switching between HTML and CSS files
- Smaller bundle size
- Easier to see right away which styles are applied to a given HTML element

In the following sections, these promises will be debunked, and several disadvantages of Tailwind will be exposed as well.

## Maintainability issues

### Bloated HTML

We all know that it is hard to read long lines of text. The wider the text is, the harder it becomes to jump to the exact next line for our eyes, and the more likely it is that we get lost in the middle of a line. This is why books have their common layout and why we design our websites accordingly, setting a `max-width` to text containers. There is no precise rule, but up to 70 characters per line are usually OK.

The same rule applies to the code we read and write. Code formaters such as Prettier do the job for us and set appropriate line breaks automatically.

Keep this in mind when reading the following example, which is taken directly from the Tailwind website which is supposed to sell us their framework. You will find similar code in every Tailwind project.

```html
<div class="flex font-sans">
	<div class="flex-none w-48 relative">
		<img
			src="/classic-utility-jacket.jpg"
			alt=""
			class="absolute inset-0 w-full h-full object-cover"
			loading="lazy"
		/>
	</div>
	<form class="flex-auto p-6">
		<div class="flex flex-wrap">
			<h1 class="flex-auto text-lg font-semibold text-slate-900">
				Classic Utility Jacket
			</h1>
			<div class="text-lg font-semibold text-slate-500">$110.00</div>
			<div
				class="w-full flex-none text-sm font-medium text-slate-700 mt-2"
			>
				In stock
			</div>
		</div>
		<div
			class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"
		>
			<div class="space-x-2 flex text-sm">
				<label>
					<input
						class="sr-only peer"
						name="size"
						type="radio"
						value="xs"
						checked
					/>
					<div
						class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
					>
						XS
					</div>
				</label>
				<label>
					<input
						class="sr-only peer"
						name="size"
						type="radio"
						value="s"
					/>
					<div
						class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
					>
						S
					</div>
				</label>
				<label>
					<input
						class="sr-only peer"
						name="size"
						type="radio"
						value="m"
					/>
					<div
						class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
					>
						M
					</div>
				</label>
				<label>
					<input
						class="sr-only peer"
						name="size"
						type="radio"
						value="l"
					/>
					<div
						class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
					>
						L
					</div>
				</label>
				<label>
					<input
						class="sr-only peer"
						name="size"
						type="radio"
						value="xl"
					/>
					<div
						class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
					>
						XL
					</div>
				</label>
			</div>
		</div>
		<div class="flex space-x-4 mb-6 text-sm font-medium">
			<div class="flex-auto flex space-x-4">
				<button
					class="h-10 px-6 font-semibold rounded-md bg-black text-white"
					type="submit"
				>
					Buy now
				</button>
				<button
					class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
					type="button"
				>
					Add to bag
				</button>
			</div>
			<button
				class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
				type="button"
				aria-label="Like"
			>
				<svg
					width="20"
					height="20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
					/>
				</svg>
			</button>
		</div>
		<p class="text-sm text-slate-700">
			Free shipping on all continental US orders.
		</p>
	</form>
</div>
```

Clearly, the HTML is bloated with lots of utility classes, which are necessary with Tailwind to achieve the desired styles. The initial reaction when looking at some Tailwind code as above is that it is ugly. Although this impression is subjective, it is closely connected to the (more objective) lack of maintainability and readability of the code, which we will expose next.

Homer Gaines has put out [a tweet](https://twitter.com/xirclebox/status/1673557143088242689) that demonstrates side-by-side how Tailwind code is less readable when compared to HTML with regular CSS.

Many people initially shared this feeling that Tailwind code is ugly, but got used to it after some time. This did not happen to me, though.

### Changing styles

The Tailwind classes for one element are gathered inside a long horizontal string, a "class soup". This happens even though the snippet above uses Prettier with a maximal print width of 80 characters. Prettier cannot linebreak long string literals. This makes it hard to find which property or utility class you need to adjust. Often you need to scroll.

Even if you turn on word wrap in your editor, or take the manual work to indent the lines somehow, it takes time to find the relevant class. Adjusting a single property is much easier with regular CSS, since here every property has an individual line as a key-value pair.

For example, in the following snippet from the code above, try to find and then change the background color of the label when the radio button is checked. How long does it take you?

```html
<label>
	<input class="sr-only peer" name="size" type="radio" value="m" />
	<div
		class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
	>
		M
	</div>
</label>
```

Now try to find and change the background color in the corresponding CSS code:

```scss
.size-label {
	width: 2.25rem;
	height: 2.25rem;
	border-radius: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgb(51, 65, 85);
}

.size-input:checked + .size-label {
	color: white;
	font-weigt: 600;
	background-color: rgb(15, 23, 42);
}
```

You will find the CSS property faster, right? This is because you only need to scan the keys, which are aligned under each other and hence easy to see. Alternatively, you can look for the values and quickly identify the colors. You can also skip the whole first selector since only the second one is about the checked state. In a Tailwind class string, you cannot skip anything. You are also faster at looking for the background color in the CSS code since the whole string `background-color` is present in the code, not just its abbreviation `bg`.

You might argue that the Tailwind code could also be written like so:

```html
<label>
	<input class="sr-only peer" name="size" type="radio" value="m" />
	<div
		class="w-9
               h-9
               rounded-lg
               flex
               items-center
               justify-center
               text-slate-700
               peer-checked:font-semibold
               peer-checked:bg-slate-900
               peer-checked:text-white"
	>
		M
	</div>
</label>
```

This looks a bit better, indeed. The issue is that this indentation takes extra, manual work. Prettier does not do it for you. Apart from that, I have never seen this in practice. At my job, where we also use Tailwind, I started to group related utility classes in one line.

Readability is also negatively impacted by the lack of syntax highlighting: Tailwind class names are just displayed as strings. Also, they tend to be short but not descriptive enough (more on that later). CSS code is much more expressive and therefore easier to understand.

### Changing text content

Another problem is that the actual text content in the markup is harder to find because it is "hidden" between the dozens of class names. For example, imagine you want to change "Add to bag" to "Add to cart" in the first snippet above. So first, you have to find that text. This is made difficult by the abundance of utility classes.

A potential solution for this problem is to use VS Code extensions such as [Inline Fold](https://github.com/moalamri/vscode-inline-fold) or [Tailwind Fold](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold) which collapse or expand all the utility classes. However, this introduces an extra step to edit the CSS or HTML, which goes against Tailwind's marketing promise that you can edit the CSS easily in your HTML.

In reality, Tailwind introduces maintainability issues that need to be fixed, for example, with VS Code extensions. This will be a common theme in the following sections.

The general problem is that even when you do not want to adjust the styling of your markup and instead want to adjust the content or add new stuff, Tailwind's utility classes are always in your way. As a consequence, reading and maintaining HTML littered with Tailwind classes will take longer.

### And the docs?

What do the [Tailwind Docs](https://tailwindcss.com/docs/utility-first) write about maintainability?

> Maintaining a utility-first CSS project turns out to be a lot easier than maintaining a large CSS codebase, simply because HTML is so much easier to maintain than CSS. Large companies like GitHub, Netflix, Heroku, Kickstarter, Twitch, Segment, and more are using this approach with great success.

There is no justification for the claim that HTML is easier to maintain than CSS, which I highly doubt when it is littered with utility classes and no descriptive class names (see also the section on [class names](#class-names-are-useful)). With Tailwind you create hard-to-maintain HTML instead of hard-to-maintain CSS.

Then they go ahead and tell us how many companies already use Tailwind. This is just poor marketing inside of a documentation page, where it does not belong. It sounds to me like a desperate attempt to convince the reader. It also does not tell us anything about why Tailwind is maintainable.

Here is another quote, from the page on [Reusing styles](https://tailwindcss.com/docs/reusing-styles):

> Yes, HTML templates littered with Tailwind classes are kind of ugly. Making changes in a project that has tons of custom CSS is worse.

Again, there is no justification for this bold claim.

This is only the beginning. Other aspects of maintainability will be covered in the sections below.

## Translation from Tailwind to CSS

The Tailwind class names are short and hence (in theory) fast to write (see the section on [fast development](#fast-development) for how to achieve the same with Vanilla CSS). But they also suffer from bad readability when compared to normal CSS since, after all, they are just abbreviations.

After working with Tailwind for a while, of course, you know what most of these abbreviations mean. For example, `pt-4` stands for top padding of 4 units. You have to remember that 1 unit is 0.25rem (if not configured otherwise). You need to do this translation in your mind or look it up, whereas there is no translation necessary when reading:

```css
* {
	padding-top: 1rem;
}
```

With Vanilla CSS, you get what you read. With Tailwind, every single class (of which there can be many for every element, as we have seen) needs to be translated into your head. This is cognitive overload and an unnecessary one. By the way, did you know that Tailwind's `text-lg` does not just change your font size?

To reduce cognitive overload, you will most likely want to install [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) in VS Code. Tailwind users praise the fact that (a) it autocompletes classes for you and (b) shows the CSS definitions on hover. This is true, but (a) autocompletion also works in CSS files (see also the section on [fast development](#fast-development)), and (b) would not even be necessary if you authored CSS without an additional abstraction.

Most of the time developers within a big project do not write code: they _read_ code (and talk about it), since this is a prerequisite for adjusting it, and it is also done during code reviews. As a consequence, using Tailwind classes will slow you (and the whole team) down. After some time you will notice that the slowdown decreases, but it will always be there when compared to Vanilla CSS.

### Minified code

Because Tailwind is just a bunch of abbreviations, a long list of Tailwind classes such as

```html
<div
	class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
/>
```

resembles very much _minified code_. No developer would get the idea to write minified JavaScript, this is the job of build-tools. Why? Because it is hard to write, read, understand and maintain. But this applies to every language, and CSS is no exception. Writing minified CSS is bad for maintainability.

## Translation from CSS to Tailwind

Some web developers like using Tailwind because they find it harder to work with regular CSS, some of them even have never learned CSS properly. Naturally, this approach will have its revenge sooner or later. CSS is a prerequisite for using Tailwind.

But even experienced Tailwind users will have the Tailwind Docs open more than often and use the search function. Why? Because it is hard to remember all the Tailwind utility classes (their names and their definitions). You will be able to remember some of the classes, but never all of those you need.

Do you know immediately what

```css
.grid {
	flex-basis: 2.5rem;
	grid-template-columns: auto 1fr;
	background-image: linear-gradient(20deg, transparent, #ddd);
}
```

translates to in Tailwind?

This means that Tailwind's marketing promise of writing CSS faster (which is often praised by Tailwind users) is a lie because you constantly lose time while looking up the Tailwind style of authoring CSS. You have to learn a whole new language, with its own grammar, just to write CSS.

In case you are just building a simple landing page with nothing complicated happening with regards to the CSS, Tailwind could make you faster. When you work on other projects, however, Tailwind will slow you down.

### Tailwind's syntax is inconsistent

A related problem is that Tailwind's class names are not consistent. For example, `justify-content: center` becomes `justify-center`, but `align-items: center` does not become `align-center` for some reason, but rather `items-center`. Once I wanted to add a border of size 1 with Tailwind, and I was confused that `border-1` does not do anything. So I went to the [border documentation](https://tailwindcss.com/docs/border-width) and found that you have to write `border`, whereas `border-2` indeed yields a border of size 2. When working regularly with Tailwind, I will probably not stumble upon this again but have to remember all these quirks of the language. Speaking of borders, a border at the top is abbreviated by `border-t`, but the [top property](https://tailwindcss.com/docs/top-right-bottom-left) is abbreviated `top`.

The following quote describes best how I feel writing Tailwind.

> CSS is like writing with your hands, Tailwind is like cutting words from a newspaper.

I cannot just write CSS like I normally would, instead I need to find utility classes (words) that achieve what I want.

## Code duplication

Since Tailwind's philosophy is against using reusable classes, but your page will usually contain several elements that should behave and look similar (links, buttons, headings, inputs, ...), you are likely to repeat the same Tailwind utility classes over and over again. This leads to code duplication, which is a [code smell](https://en.wikipedia.org/wiki/Code_smell). The code becomes [wet](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

Already our first code snippet from Tailwind's website in the section on [maintainability](#maintainability-issues) suffers from code duplication, it repeats the classes

```
w-9 h-9 rounded-lg flex items-center justify-center text-slate-700
```

five times! But let's rather have a look at a real-world example, the footer on Netlify's website:

```html
<footer class="app-footer" role="contentinfo">
	<div class="container">
		<nav>
			<ul
				class="tw-flex tw-flex-wrap tw-list-none tw-mx-[-12px] tw-my-0 tw-p-0 tw-items-center"
				aria-label="External links"
			>
				<li class="tw-flex tw-items-center tw-m-[4px]">
					<a
						class="btn btn-default btn-tertiary btn-tertiary--standard tw-w-auto tw-font-semibold tw-p-1 tw-min-h-4 tw-leading-3 tw-text-left dark:hover:tw-text-teal-lightest dark:hover:tw-bg-teal-darkest tw-text-gray-darker dark:tw-text-gray-light tw-text-textMuted hover:tw-text-teal-darkest"
						href="https://docs.netlify.com/"
						>Docs</a
					>
				</li>
				<li class="tw-flex tw-items-center tw-m-[4px]">
					<a
						class="btn btn-default btn-tertiary btn-tertiary--standard tw-w-auto tw-font-semibold tw-p-1 tw-min-h-4 tw-leading-3 tw-text-left dark:hover:tw-text-teal-lightest dark:hover:tw-bg-teal-darkest tw-text-gray-darker dark:tw-text-gray-light tw-text-textMuted hover:tw-text-teal-darkest"
						href="https://www.netlify.com/pricing/"
						>Pricing</a
					>
				</li>
				<li class="tw-flex tw-items-center tw-m-[4px]">
					<a
						class="btn btn-default btn-tertiary btn-tertiary--standard tw-w-auto tw-font-semibold tw-p-1 tw-min-h-4 tw-leading-3 tw-text-left dark:hover:tw-text-teal-lightest dark:hover:tw-bg-teal-darkest tw-text-gray-darker dark:tw-text-gray-light tw-text-textMuted hover:tw-text-teal-darkest"
						href="https://www.netlify.com/support/"
						>Support</a
					>
				</li>
				<li class="tw-flex tw-items-center tw-m-[4px]">
					<a
						class="btn btn-default btn-tertiary btn-tertiary--standard tw-w-auto tw-font-semibold tw-p-1 tw-min-h-4 tw-leading-3 tw-text-left dark:hover:tw-text-teal-lightest dark:hover:tw-bg-teal-darkest tw-text-gray-darker dark:tw-text-gray-light tw-text-textMuted hover:tw-text-teal-darkest"
						href="https://www.netlify.com/blog/"
						>Blog</a
					>
				</li>
				<li class="tw-flex tw-items-center tw-m-[4px]">
					<a
						class="btn btn-default btn-tertiary btn-tertiary--standard tw-w-auto tw-font-semibold tw-p-1 tw-min-h-4 tw-leading-3 tw-text-left dark:hover:tw-text-teal-lightest dark:hover:tw-bg-teal-darkest tw-text-gray-darker dark:tw-text-gray-light tw-text-textMuted hover:tw-text-teal-darkest"
						href="https://www.netlify.com/blog/tags/changelog/"
						>Changelog</a
					>
				</li>
				<li class="tw-flex tw-items-center tw-m-[4px]">
					<a
						class="btn btn-default btn-tertiary btn-tertiary--standard tw-w-auto tw-font-semibold tw-p-1 tw-min-h-4 tw-leading-3 tw-text-left dark:hover:tw-text-teal-lightest dark:hover:tw-bg-teal-darkest tw-text-gray-darker dark:tw-text-gray-light tw-text-textMuted hover:tw-text-teal-darkest"
						href="https://www.netlify.com/legal/terms-of-use/"
						>Terms</a
					>
				</li>
			</ul>
		</nav>
		<p><small>© 2023 Netlify</small></p>
	</div>
</footer>
```

Here, every link has an extremely long list of utility classes attached (they use Tailwind with a `tw`-prefix), and this list is repeated 6 times in this code snippet alone.

### Reusable components

Of course, this is only the compiled HTML code. In development, you will likely create a reusable component (in this case, for a type of link) and only write the Tailwind classes once. This is what it could look like:

```html
<!-- Link.svelte -->

<script>
	export let href = "";
	export let text = "";
</script>

<a
	class="btn btn-default btn-tertiary btn-tertiary--standard tw-w-auto tw-font-semibold tw-p-1 tw-min-h-4 tw-leading-3 tw-text-left dark:hover:tw-text-teal-lightest dark:hover:tw-bg-teal-darkest tw-text-gray-darker dark:tw-text-gray-light tw-text-textMuted hover:tw-text-teal-darkest"
	{href}
>
	{text}
</a>
```

This is still ugly and suffers from bad maintainability as already explained before, but at least we removed the code duplication.

But this solution means that you are dependent on a component framework such as Svelte, React, Astro, etc. to avoid code duplication with Tailwind (web components don't play well with Tailwind). Even though such frameworks are common for most web applications, it is not something you would normally consider when you are about to quickly spin up a simple landing page with HTML and CSS, for example.

For example, to style all inline code snippets like `this one` on this page, I can simply add the following to my stylesheet.

```css
p > code {
	font-family: monospace;
	background-color: var(--inline-code-bg-color);
	border-radius: 0.2rem;
}
```

Then I can just use these `<code>like so</code>` in any HTML file. It would be much more cumbersome to first generate a component for achieving such a simple styling. In any case, I don't want to repeat the same set of utility classes for every code snippet appearing in my HTML files.

### Teaching

Several projects in Brad Traversy's course [Tailwind CSS from Scratch](https://www.udemy.com/course/tailwind-from-scratch/) suffer from code duplication for exactly this reason. My concern is that he did not even mention that this is a problem, even copy-pasted code several times. Newcomers might not understand that code duplication needs to be avoided. Brad Traversy has hundreds of thousands of followers, and thousands of people have started learning Tailwind via his course, which effectively teaches one of the biggest code smells out there.

Of course, not every Tailwind course will do this. The issue, however, is that Tailwind's philosophy nudges you toward code duplication. You have to actively do something to avoid it. In contrast, Vanilla CSS with its class system is tailored towards avoiding code duplication. In the example above, we could simply declare a `.link` class once and use it wherever we like.

### And the docs?

The Tailwind docs have a [dedicated page](https://tailwindcss.com/docs/reusing-styles) on how to deal with Tailwind's inherent code duplication. It is quite astonishing how they downplay the problem. It is claimed that often the code duplication is only in one place and hence can be edited with the multi-cursor feature of your editor.

There is so much wrong with this:

- Code duplication is rarely only in one place. And even if it was: how can you guarantee this for sure? Do you always search for the whole Tailwind class string through the whole codebase?
- How to deal with permutations of the class names?
- Multi-cursor editing is cumbersome and error-prone.
- This approach does not get rid of the code duplication.

Their arguments are not Tailwind-specific and try to persuade us that code duplication is not a big deal in general. Many decades of research and practice in software development by thousands of professionals have shown and confirmed that code duplication needs to be avoided in every programming language, and Tailwind responds with "Nah it's ok because you can edit with multi-cursor". This is just absurd.

They also suggest using loops in your markup, which is a valid approach, but again only works with frameworks, and does not always fit either.

For instance, when you have three buttons (Login, Logout, Dashboard) in a menu, do you really want to create an array for the button data and loop over them just for styling purposes? In any case, it is so much easier to just declare a `.btn` class and attach it to the buttons.

And what happens in this example when you want to add a fourth button? Do you want to add a fourth element to an array, just to render a button? With Tailwind, many developers will instead just copy-paste the existing code, since this is the easiest Tailwind-compatible solution here, thus producing code duplication. With regular CSS, you do not need to touch the `.btn` class at all and just add another button with that class. It cannot be any simpler, and Tailwind prevents you from doing this.

The docs also mention component frameworks, which are not always suitable as already mentioned, and the @apply directive, which will be addressed in a [separate section](#the-@apply-directive).

### Pseudo-classes

There is yet another feature of Tailwind that leads to code duplication. Say you want to style a link when it is focussed or hovered. In these cases, it should become blue and underlined. With Tailwind, it would look like this:

```html
<a
	class="hover:text-blue-700 hover:underline hover:font-bold focus:text-blue-700 focus:underline focus:font-bold"
	href="/"
	>...</a
>
```

With regular CSS, it would look like this:

```css
.link:focus,
.link:hover {
	color: blue;
	text-decoration: underline;
	font-weight: bold;
}
```

This is much shorter and easier to scan. We can go even shorter:

```css
.link:is(:focus, :hover) {
	color: blue;
	text-decoration: underline;
	font-weight: bold;
}
```

Tailwind requires you to repeat the two pseudo-classes `hover:` and `focus:` three times each, so that in total you need six classes. With regular CSS, you only need to specify one selector and three properties. When you want to add another property (when the link is focussed or hovered), with Tailwind you have to add three classes, but with regular CSS it is just one property.

In general, Tailwind requires you to write `n * m` classes when you want to have `n` properties across `m` states (represented by pseudo-classes). The regular CSS version only has one selector describing the `m` states and then `n` properties, each in its own line.

The code repetition here is of course bad for maintainability. Say you want to change `bold` to `semibold`. In the Tailwind code, you need to make three adjustments. In the CSS code, you just set the `font-weight` to 600 once, and you are done.

### Media queries

The same remarks apply to media queries. Here is a simple example:

```html
<div class="flex gap-2 flex-col sm:gap-5 sm:flex-row sm:text-lg" />
```

With regular CSS you don't need to repeat the media query decorator (here I write Sass, the CSS version is similar since CSS now also supports nesting).

```scss
.container {
	display: flex;
	gap: 0.5rem;
	flex-direction: column;

	@media (min-width: 640px) {
		gap: 1.25rem;
		flex-direction: row;
		font-size: 1.125rem;
		line-height: 1.75rem;
	}
}
```

## The @apply directive

When I speak up about [code duplication](#code-duplication) and [bloated HTML](#maintainability-issues) with Tailwind, I often hear that Tailwind offers a solution to this problem: the [@apply directive](https://tailwindcss.com/docs/reusing-styles), which offers to create CSS classes out of Tailwind's utility classes.

On the other hand, Tailwind creator Adam Wathan himself does not recommend using it. He admits in a [tweet](https://twitter.com/adamwathan/status/1226511611592085504) that it

> [...] basically only exists to trick people who are put off by long lists of classes into trying the framework.

In another [tweet](https://twitter.com/adamwathan/status/1559250403547652097), he even says that @apply should not have been included in Tailwind. So, should we use it now, or not? And if we should not use it, why on earth is this feature still available in Tailwind and described in its documentation?

Here are some problems with the @apply directive:

- It contradicts Tailwind's core principle of using utilities only.
- It can only be used in a separate CSS file. So it is also against Tailwind's promise to have only one file for markup and styling.
- The feature is very similar to CSS classes but is a useless abstraction of these.

To elaborate on the last point, let us look at the example from the Tailwind docs (removing the focus styles for simplicity):

```css
.btn-primary {
	@apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700;
}
```

Why should this be any better than the regular CSS version?

```scss
.btn-primary {
	background-color: #3c83f6;
	color: white;
	font-weight: 600;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	box-shadow: 0 4px 6px -1px #0002;

	&:hover {
		background-color: #1d4fd7;
	}
}
```

You effectively are writing a minified version of a regular CSS class which suffers from worse maintainability and also requires an extra build tool. Perhaps the only remaining advantage would be that you can type the Tailwind version faster, but we will see [below](#fast-development) that typing the regular CSS can also be done very fast.

## Missing Features

### Modern CSS

CSS has integrated new features at a remarkable pace in the last few years. But when it comes to new or complex CSS features, Tailwind will always lag behind. Since it is a library on top of CSS, new features will take some time and need additional implementation before they arrive in Tailwind. When we stick to CSS, we can enjoy all new features directly.

For example, try to write the following CSS code with Tailwind. It gives a form a red outline when it has an invalid, non-focussed input field. Good luck!

```css
form:has(input:invalid:not(:focus)) {
	outline: 0.1rem solid red;
}
```

Actually, CSS is such a complex and powerful programming language, that it will never be possible to achieve the same with utility classes, no matter how many utility classes you are using.

### CSS Grid

Even quite basic CSS tasks can be a pain with a Tailwind. Let us look at the following grid layout:

```css
.grid {
	display: grid;
	grid-template-columns: auto auto 1fr;
	grid-template-rows: 1fr auto;
}
```

Since Tailwind's predefined [grid utilities](https://tailwindcss.com/docs/grid-template-columns) are quite limited, Tailwind requires you to bail out of its system and use arbitrary values and a really strange syntax instead.

```html
<div
	class="grid grid-cols-[auto_auto_1fr] grid-rows-[1fr_auto]"
></div>
```

The docs also suggest expanding your theme file, which is not something you want to do every time you want to use a simple grid layout.

```javascript
// tailwind.config.js

module.exports = {
	theme: {
		extend: {
			gridTemplateColumns: {
				mygrid: "auto auto 1fr",
			},
			gridTemplateRows: {
				mygrid: "1fr auto",
			},
		},
	},
};
```

In particular, when you only want to use it once, this seems to be overly complicated compared to writing regular CSS. Also, you will have to come up with a name, which was one of the promises of Tailwind that you don't have to do. Tailwind is contradicting itself here.

Tailwind is good when it comes to repeating declarations, but it cannot erase the fact that some classes are quite unique which makes it awkward to build them with utilities only.

### Siblings and children

But also very basic CSS features are missing in Tailwind, by design. For instance, there is no equivalent of the child or sibling selectors. Tailwind users argue that you don't need them since you can just style each element directly.

Ok, say I want to style always the first paragraph inside of a section, which follows a heading. With CSS, we can simply write:

```css
section > h2 + p {
	border-left: 0.1rem solid gray;
	padding-left: 0.5rem;
}
```

This is simply not possible with Tailwind. We would need to manually repeat the corresponding utility classes for every paragraph of this kind (which leads to [code duplication](#code-duplication)). This also means that when we want to switch these paragraphs, we need to switch the classes as well.

### Missing values

What can also be quite frustrating is that many values are missing. For example, there are only six available [z-indices](https://tailwindcss.com/docs/z-index) by default. To use other values, you have to expand your theme or use arbitrary values (which, again, bails out of Tailwind's philosophy).

At my job, we have often run into this issue, and for technical reasons, the two mentioned alternatives did not work. With regular CSS there would be absolutely no problem to use any z-index value you like.

Similarly, the available [width classes](https://tailwindcss.com/docs/width) are very limited, by default.

### Gradients

Linear gradients in Tailwind are only supported for the (most common) [8 directions](https://tailwindcss.com/docs/background-image). So for example, I cannot add a linear gradient with 20 degrees with Tailwind's predefined utilities. As of writing this post, radial gradients and conic gradients are [not supported](https://github.com/tailwindlabs/tailwindcss/discussions/2599) at all. To use them, I need to add them to the config file (in case they are used often) or use the awful bracket syntax.

```html
<div class="bg-[conic-gradient(at_left_center,red,blue)]"></div>
```

### Widths

Tailwind does not offer the property `inline-size`, which is the logical property for `width`. Now imagine you are working with a component library whose components have defined an `inline-size` property, but in one situation you need to adjust the width (and there are good reasons to do so). You think you are lucky because the components accept class props. But with Tailwind alone you won't be able to update the width, even when you pass a width class. This has happened several times at my job (not just to myself, but also to my colleagues), required hours of debugging and resulted in non-clean band-aid solutions.

You might argue that this is the problem of the component library. But the point is: This problem would not exist at all without Tailwind. The framework makes adjusting CSS unnecessarily complicated.

### Other examples

There are many more examples of CSS features not supported in Tailwind (for example, 3-dimensional CSS and rotations around the x-axis) without using additional plugins - at least as of writing this, it may change in the future.

## Leaky abstraction

Have a look at the following Tailwind code.

```html
<div class="mt-4 mt-0">Hi there</div>
```

Which one of these classes will win? You might think that `mt-0` wins since it comes at last. This is how regular CSS would handle this. But Tailwind generates a CSS output file that defines `mt-4` _always_ after `mt-0`. This is because it starts from a list of margin utilities with increasing values and then purges the unused ones.

This is an example of a [leaky abstraction](https://en.wikipedia.org/wiki/Leaky_abstraction). What is leaking here is the order in which Tailwind compiles the CSS file.

In practice, you will not write the code above directly, and maybe you even get a warning when using some VS code extension or linter. However, it may result from using a component (Svelte, React, etc.) that has some base classes and offers to add some additional classes from the consumer. Exactly this happened to me many times at my job. For some reason, the classes that I needed to add had no effect. Debugging took hours, and eventually, it became clear that in fact, it was because of Tailwind's output order mentioned above. There was no clean workaround without changing the component itself.

On the one hand, Tailwind claims to abstract away the inner workings of CSS for us and that we can style every element with atomic classes that don't interfere with each other. In practice, this is not the case.

What is also leaky about Tailwind is that you have to know CSS to use it properly (as compared to Bootstrap, for example), so it does not fully abstract CSS away from us. It does not reach the level of abstraction you should expect from a framework.

## Fast development

One of Tailwind's biggest selling points is that you can style your HTML very fast. We have already seen in the previous sections that this is not quite true because of the additional layer of abstraction. But in any case, writing code _fast_ has never been an indicator of code quality. The code has to be easy to maintain, and we already saw that (and why) Tailwind suffers from bad maintainability.

This is easily forgotten when you follow Tailwind's philosophy to write down utility classes as quickly as possible. We should not just talk about how fast the code can be written, but also how fast it can be understood and extended by other developers (or ourselves in the future).

The good news is that you do not need Tailwind to write CSS fast:

### Autocompletion

First, use autocompletion of your IDE. For example, in VS Code simply typing `tex` autocompletes to `text-align`. The value `center` is now already preselected, you just have to confirm. With just 5 keystrokes (t, e, x, Tab, Tab) you can write:

```css
.myclass {
	text-align: center;
}
```

With just 6 keystrokes (d, i, s, Tab, f, Tab) you can write:

```css
.myclass {
	display: flex;
}
```

I do this all the time. I rarely write any CSS property till the end. In case you are using it, GitHub Copilot will also offer further suggestions.

### Emmet

A second, much more powerful method is to use the [Emmet extension](https://docs.emmet.io), which is preinstalled in VS Code. Many developers are familiar with this fantastic extension inside HTML files since it boosts development speed a lot. But Emmet is also capable of writing CSS for us.

Here are some examples:

```css
.myclass {
	/* type: m0 */
	margin: 0;
	/* type: p5rem */
	padding: 5rem;
	/* type: d:f */
	display: flex;
	/* type: bxz */
	box-sizing: border-box;
	/* type: tac */
	text-align: center;
	/* type: gca */
	grid-column: auto;
	/* type: bg#fff */
	background: #fff;
}
```

For a list of all abbreviations, see the [Emmet Cheat Sheet](https://docs.emmet.io/cheat-sheet/) (section on CSS).

Both of these methods have a big advantage over Tailwind in that, in the end, your source code is regular CSS, thus easier to maintain.

### Compilation

While writing Tailwind code can be fast, seeing the result in the browser can take longer. This is because recompiling CSS is much faster than recompiling HTML. This means that, when you work with Tailwind, your changes will be slower to see. In a large-scale project, it can take a couple of seconds. Regular CSS would be updated instantly.

Surely, there is no problem in waiting once for a couple of seconds. The problem is that you have to wait _again and again_ for every little styling change you make in your Tailwind project.

## Class names are useful

Tailwind users praise the fact that they do not have to come up with class names for their elements to style them. This is true since you can just style any element by attaching utility classes to it. However, this is not the whole story.

### Identification

When you style an element, as a developer you need to know _which_ element you are currently styling. When you want to change the styles of some element that you have identified by looking at the website, you have to first find it in the code. Both tasks are difficult when you do not have any name for the element. It helps when you style a semantic element, for example when you have exactly one button in the component, which makes it easy to find. But less so for containers. Put differently, class names help to conceptualize UI elements.

For example, imagine a footer with different containers with social media links, internal links, logos, and lots of other stuff. Your task is to change the spacing of the social media icons. How fast will you be able to find it inside of Tailwind code? And how fast will you be able to find it if the container had a class name `social-media-icons` which you can immediately find by searching for `social` in your editor?

These things happen to me all the time at my job: I have to scroll and search for quite a while before I find the element that I need to adjust. Sometimes, I find myself adding comments in the markup to remember what is what.

```html
<!-- container of cart item -->
<div
	class="some-extremely-long-class-list-without-any-descriptive-name"
></div>
```

Again we see that Tailwind introduces maintainability issues that we need to fix to work efficiently.

Similar remarks apply to code reviews: when reading through the code of your colleagues, class names will help you a lot to understand the purpose of each HTML element.

### Naming things

One of many good measures of software quality is how descriptive the objects, variables, and functions are named. Names which are very short or even abbreviated (like `strlen` in PHP) are not good, since they do not speak for themselves. Tailwind just ignores this core principle of software quality and removes all names. It is not surprising that maintainability will suffer from this approach.

That being said, I do not understand why it should be complicated to come up with class names. You do not have to follow any naming methodology (like BEM) either, just keep it simple. Imagine someone came up with a JavaScript framework where no variables have names because _it is too hard to come up with good names_. Of course, this would be mad. With every programming language, including CSS.

### And the docs?

To support their claim that it is hard to come up with class names, the [Tailwind docs](https://tailwindcss.com/docs/utility-first) have a quite contrived example:

```html
<div class="chat-notification">
	<div class="chat-notification-logo-wrapper">
		<img
			class="chat-notification-logo"
			src="/img/logo.svg"
			alt="ChitChat Logo"
		/>
	</div>
	<div class="chat-notification-content">
		<h4 class="chat-notification-title">ChitChat</h4>
		<p class="chat-notification-message">You have a new message!</p>
	</div>
</div>

<style>
	.chat-notification {
		/* ... */
	}
	.chat-notification-logo-wrapper {
		/* ... */
	}
	.chat-notification-logo {
		/* ... */
	}
	.chat-notification-content {
		/* ... */
	}
	.chat-notification-title {
		/* ... */
	}
	.chat-notification-message {
		/* ... */
	}
</style>
```

Nothing forces you to declare a class for every single HTML element to style it. Here is how you can do it (and there are other ways as well):

```html
<dialog class="chat-notification">
	<div class="logo-wrapper">
		<img src="/img/logo.svg" alt="ChitChat Logo" />
	</div>
	<div class="content">
		<h4>ChitChat</h4>
		<p>You have a new message!</p>
	</div>
</dialog>

<style>
	.chat-notification {
		/* ... */
	}
	.chat-notification .logo-wrapper {
		/* ... */
	}
	.chat-notification img {
		/* ... */
	}
	.chat-notification .content {
		/* ... */
	}
	.chat-notification .content h4 {
		/* ... */
	}
	.chat-notification .content p {
		/* ... */
	}
</style>
```

With the recent introduction of [CSS nesting](https://developer.chrome.com/articles/css-nesting/), which we have been already using for years with the help of preprocessors such as Sass, we can write it even more simply:

```scss
.chat-notification {
	/* ... */

	.logo-wrapper {
		/* ... */
	}

	img {
		/* ... */
	}

	.content {
		/* ... */

		h4 {
			/* ... */
		}

		p {
			/* ... */
		}
	}
}
```

The Tailwind docs make you believe that CSS is complicated, only because they avoid its most basic features, namely element selectors and combinators!

The Tailwind docs on [Reusing styles](https://tailwindcss.com/docs/reusing-styles) claim:

> You have to think up class names all the time &mdash; nothing will slow you down or drain your energy like coming up with a class name for something that doesn't deserve to be named.

Really? Developers have much more energy-draining tasks. Again: having a descriptive name such as "logo-wrapper" in the component will be very useful when you or your colleagues need to adjust the component in the future! And it requires little to zero effort to come up with such a name.

### Scoped styles

Many component frameworks make it easy to make styles scoped to the respective component. In this case, you can usually style elements just by their tag name without running into any collisions, so that you don't have to invent any class names either. In the example above, we can style the dialog simply by using the element selector `dialog`.

For another example, consider this header component:

```svelte
<header>
	<h1>Tailwind</h1>
	<p>A utility-first CSS framework</p>
</header>

<style>
	p {
		color: #555;
	}
</style>
```

This is a valid Svelte and Astro component, and in Vue.js you have to write `<style scoped>`. Because of scoping, the style for the paragraph will not leak outside of the component, and you do not need to come up with a class name such as `subtitle` (which would not be hard anyway).

I code a lot in Svelte and rarely need to use class names for this reason, but also because my components are small and I use semantic HTML tags.

### Developer tools

There is yet another reason why class names are useful.

When working on a large-scale web application, you will often find yourself wondering where an element or a component can be found in the codebase, in particular when you are new to the project. So you open the inspector in the developer tools, find a class name that is on (or close to) your element, copy it, paste it into your editor, and voilà, you can start to work on it.

This works in particular well when all your classes have descriptive names such as `.social-media-list` for a list of social media links. Probably you will find this only once or twice in your codebase.

With Tailwind, however, you will only find a long list of class names such as

```html
flex justify-center flex-col md:flex-row gap-5
```

which by design can be found everywhere in your codebase. Even pasting the whole class name string will not always help you out, since there can be many search results, or in fact, no results when the classes were applied conditionally or were authored with a CSS-in-JS solution. Therefore, inspecting elements gets much harder.

Tailwind also prevents you from changing the styling of all elements of a given type in your developer tools, which can be helpful to tweak the design during development. Instead, you can always only adjust one element.

When you want to add a Tailwind class in the developer tools, there is a good chance that it is not yet contained in the build (Tailwind strips away all unused classes, which is good) and hence does not apply. You can use [DevTools for Tailwind](https://devtoolsfortailwind.com/) to fix this issue, and once again, Tailwind introduces maintainability issues that need to be fixed by yourself; in this case also by spending money.

## Technical dependencies

### Setup

When you want to work with Tailwind on a project, you have to set it up first. With Vanilla CSS, you do not have to do anything.

This is a kind of trivial remark, of course. When Tailwind had a lot of benefits, the setup would be beneficial, after all. Also, many web frameworks make it very easy to add Tailwind or even offer to include it during the creation of the project. The problem, however, is that with every additional framework you attach to your project, things might go wrong, and you are introducing another technical dependency.

Let me give you an example from my job. Not all people will face these issues, but I wanted to mention them since they add to my frustration with using Tailwind.

For some reason, our purging process of Tailwind is broken during local development. (This is the process of removing all unused utilities from the CSS output.) As a result, as of writing this, I am not able to add any less common CSS grid styles with Tailwind, even though they are supported by Tailwind, generally speaking. Debugging already took hours, and the problem is still not fixed, also because it is a large and complex codebase. Fixing the issue will require several hours for the engineers who built the infrastructure.

### There is no way back

Imagine a big project takes the endeavor to refactor all its CSS to Tailwind. Let's imagine this process is finished and the team works with Tailwind for some years. These days, Tailwind is very popular, and it seems like it will stay here for a while.

But for how long, exactly? What happens when Tailwind will not be maintained at some point in the future? Or what happens when a new, much better paradigm of writing CSS will emerge and you would like to switch? Or maybe you find out that Tailwind (as explained in the other sections) actually was a bad choice since it cripples the maintainability of your codebase and slows down your team?

The problem is that, as soon as you have removed all the class names and semantics from your codebase, there is no way to get them back. Converting a codebase from regular CSS to Tailwind is feasible (and can even be automated to some extent), but it does not work the other way around. This means that, once you are using Tailwind throughout your project, you are locked into Tailwind's paradigm of utility classes.

This is something we need to keep in mind for projects that will be maintained for many years (or even decades). Of course, regular CSS will not go anywhere.

Notice that this problem does not exist when switching from one JavaScript framework to a different JavaScript framework since they share [many concepts](https://component-party.dev/) so the (manual or automatic) translation will be feasible.

## Bundle size

### Don't forget the HTML

Tailwind promises to produce smaller bundle sizes of the CSS since only those utility classes are included in the bundle that are actually used in the markup. This prevents teams from shipping CSS which is not used in production.

This is only one half of the truth. Namely, the HTML gets much bigger when it is bloated with Tailwind utility classes. And even though you write your CSS in the markup, the browser still has to fetch the CSS file generated by Tailwind, so that the number of network requests is not decreased either. And since the HTML contains the same classes over and over again (see also the section on [code duplication](#code-duplication)), Tailwind increases the size of the HTML far more than the size of a regular CSS file.

### Benchmarks

Since I could not find any evidence for Tailwind's smaller bundle sizes, I did a first [benchmark](https://github.com/ScriptRaccoon/tailwind-benchmark) and found that indeed Tailwind's bundle size is bigger. Based on some comments on Twitter that presumably my benchmark is not adequate, I made a [second](https://github.com/ScriptRaccoon/tailwind-benchmark-2) and even a [third one](https://github.com/ScriptRaccoon/tailwind-benchmark-3), and in each case, I disproved Tailwind's claim. I am very grateful for the constructive comments by [Thomas G. Lopes](https://github.com/TGlide) and his following [benchmark](https://github.com/TGlide/tailwind-benchmark) in which indeed Tailwind produced a smaller bundle size. Check out the readmes of the linked repositories for more details about the benchmarks.

What we can conclude from these experiments is that Tailwind will not always create a smaller bundle size. It seems to be only happening when you are reusing the same utility classes over and over again with lots of combinations thereof. For small to medium landing pages, my benchmarks indicate that Tailwind's bundle size will be larger.

### Quality assurance

Tailwind's ability to remove unused CSS from your CSS is not a good argument for using it either:

Removing unnecessary classes from your CSS files should be part of the development process, the same way that unnecessary variables and functions are removed from the JavaScript. There are also developer tools to make this easier for us. For example, when you work with Svelte, the Svelte extension for VS Code warns you about unused classes.

For example, when a PR removes an element `<div class="media-list">...</div>` from the markup, the developer and the reviewer of the PR need to check if the class `media-list` is still used anywhere else. If not, removing it belongs to the PR.

When a codebase contains lots of unused CSS, this is a sign that the development process has serious flaws, that the code lacks quality, and that maybe even the developers are not able to write clean code or are not spending enough time with code reviews.

This issue cannot be solved by writing CSS differently. This will not change the code quality of the codebase. The bad quality will emerge everywhere else. Ironically, we have seen in the previous sections that introducing Tailwind produces even more non-clean code.

## Multiple files

Tailwind promises that styling and markup can be found in only one file and that this speeds up our development. It is claimed that we need to switch less often between files. After all, we put all the styles directly on the HTML elements so that the HTML is (or should be) the single source of truth for markup and design.

But in practice, this is not the case, and Tailwind forces you to switch between files quite often:

- Not every portion of CSS can be realized with Tailwind. Sometimes, this is due to the complexity of the CSS. Sometimes, this is due to newer or less common CSS features that are not (yet) implemented in Tailwind (see also the section on [missing features](#missing-features)). So you do end up with a separate CSS file. And now every time you want to change the styling you have to ask yourself which file you need to look at!
- The same happens when you use the [@apply directive](#the-@apply-directive). This will be in a CSS file.
- The standard configuration of Tailwind can be adjusted (`tailwind.config.js`), and many projects need to do this. You have to check this custom configuration to know what certain Tailwind classes actually mean. This applies in particular to custom colors and sizes.
- Some of the applied styles are contained in Tailwind's CSS reset file _preflight_. Maybe that file has been adjusted as well.
- At my job, we have a large codebase that has started to migrate the styles from [Less](https://lesscss.org/) to Tailwind. The migration is incomplete (and takes a lot of time). The Less files are considered to be legacy, but there are still hundreds of them. And it is not clear when and sometimes even how (as mentioned above) to migrate these. So again we have to switch between our Tailwind-styled markup and CSS resp. Less files. I am aware that not everyone using Tailwind will face this issue, in particular, if you start a project with Tailwind right away, but on the other hand, I can imagine that this kind of incomplete migration is not untypical.

Switching often between files is yet another reason why working with Tailwind will
slow you down.

## Consistent design

Tailwind is claimed to provide a consistent design system for free, which is not completely true.

For example, you can add arbitrary paddings like `p-2`, `p-3`, `p-4`, ... to any element you like. You can even put arbitrary values with `p-[5.5rem]`. You would still need a documentation page associated with your project which dictates in which situations which spaces should be used. But in practice, this does not always exist. Then every developer writes whatever padding or margin they find suitable (and exactly this is happening at my job).

The whole idea of a design system is that it dictates _globally_ how elements in your product look like. By default, Tailwind styles every element _locally_. See the difference? Imagine that within a large-scale application, you want to give all elements some more room and hence increase their padding. How do you want to do this with Tailwind, where every element is styled in isolation?

The arbitrariness is even more true with colors. With Tailwind, you can give one button a background color of `sky-400`, and the other one `blue-400`, and nothing in the editor will tell you about this inconsistency. Although you can and probably have to expand [Tailwind's theme](https://tailwindcss.com/docs/theme) to add custom colors, this again goes against Tailwind's claims of not requiring any names and having the markup as the single source of truth. Also, it is not guaranteed that only these colors will be used.

Of course, in practice, you will have a button component, maybe with some adjustable theme such as primary, secondary, etc. In this case, the background color is only declared in one file, which is good and prevents inconsistencies.

But you do not need Tailwind at all to achieve this. Consistency is achieved by a set of reusable components and CSS custom properties (aka CSS variables). For example, you can declare a CSS variable

```css
:root {
	--spacing-1: 0.25rem;
}
```

in your root selector and use that variable wherever you want. This feature is built into CSS, there is no need to use a framework for that. If you are using Sass, you can declare a (static) variable as follows:

```scss
$spacing-1: 0.25rem;
```

But otherwise, it works the same.

It is also remarkable that theming in Tailwind requires a JavaScript file. This detour is unnecessary. We can just author our CSS directly without any problems.

## Useless diffs

When a commit contains a change in a long line of Tailwind classes, the diff may not be shown clearly, both in your editor and on GitHub.

Here is an example snippet from a commit that I had to review at my job. We use a prefix for our Tailwind classes, which I have replaced with `tw` since the specific prefix does not matter.

```diff
<a
- href="tw-flex tw-flex-col tw-bg-white tw-rounded-md gt-tablet:tw-flex-row tw-p-4 gt-tablet:tw-p-6 tw-gap-4 tw-mx-4 hover:tw-shadow-md"
+ href="tw-flex tw-flex-col tw-bg-white tw-rounded-md gt-tablet:tw-flex-row tw-items-center tw-p-4 gt-tablet:tw-p-6 tw-gap-4 tw-mx-4 hover:tw-shadow-md"
  >...</a
>
```

At first glance, it seems like the whole line has been adjusted, but of course, this is not true. How long does it take you to find out that the author only added the class `tw-items-center`? But even after you have found this, notice that you need to check the remaining classes as well, since something might have changed there as well. This is a bit cumbersome here since the corresponding class names in the diff are shifted.

Normally, we can rely on GitHub which highlights the part which has changed. But here, it highlighted `items-start tw-` which suggests that somehow two classes have been adjusted. This is quite confusing and can take a while to understand what is happening.

There is no such confusion with regular CSS, since here every property has its own line, and the diff will be displayed correctly and in a very clear way. You only need two seconds to see what has changed here:

```diff
a {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 0.375rem;
-   align-items: center;
    padding: 1rem;
}
```

## Separation of concerns

Perhaps you remember that 1000 years ago HTML had elements for styling content, such as the `<center>` and the `<font>` elements. There was a good reason to deprecate all such elements, improve the CSS language and do all the styling in separate CSS files. CSS was indeed invented to separate content (and structure) from its presentation. It is kind of curious that Tailwind reverses the history of HTML without learning from it.

Separating markup from styling had (and still has) many advantages:

- When you want to change the styling, you know exactly where to go: to the CSS file. When you want to change the markup or content, you know exactly where to go: to the HTML file. Since each file is smaller as compared to a file combined of HTML and CSS, you will find the relevant code faster.

- By using CSS classes for reoccurring elements (such as buttons or headings) you do not have to repeat the same styles again and again. See also [code duplication](#code-duplication).

Some Tailwind users have suggested that the 'separation of concerns' principle is simply not working. I highly disagree and still have not seen any proof of why this principle does not work in practice.

While Adam Wathan's blog post [CSS Utility Classes and "Separation of Concerns"](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/) back from 2017 (around the time he created Tailwind) makes a good point that the usual way of writing CSS does not fully separate concerns and that utility classes solve some of the problems imposed by that, I do not agree with Adam's conclusion to only use utility classes.

## Inline styles

Some critics of Tailwind say that it is "inline styles with extra steps". This is not exactly true, since Tailwind consists of reusable utility classes. Utility classes solve in particular the specificity and performance issues of inline styles.

However, the method of using utility classes exclusively is similar to inline styles in several ways. In fact, many of the disadvantages of inline styles apply verbatim to utility classes. To quote from [Avoiding Inline Styles for CSS Design](https://www.thoughtco.com/avoid-inline-styles-for-css-3466846):

- Inline styles don't separate content from design
- Inline styles cause maintenance headaches
- Inline styles are not as accessible
- Inline styles make your pages bigger

The first three apply to utility classes as well, and the last one only partially (see [Bundle size](#bundle-size)). Reading through the StackOverflow discussion [What's so bad about in-line CSS?](https://stackoverflow.com/questions/2612483/whats-so-bad-about-in-line-css), almost all of the points against inline styles also speak against using utility classes exclusively. (Of course, nothing speaks against defining a handful of utility classes.) The only exception is the maximal specificity of inline styles.

Just to mention two examples (even though we already covered this before):

### Example 1

Say you want to style some paragraphs on a page with inline styles by changing their color. On other pages, you add the same inline styles. This is a violation of the DRY principle.

```html
<p style="color: #444">...</p>
<p style="color: #444">...</p>
<p style="color: #444">...</p>
```

When you want to change that color at some point or add other styles to these paragraphs, this will be a pain. Creating a class for these paragraphs is the solution here.

Exactly the same problem arises with Tailwind.

```html
<p class="text-gray-700">...</p>
<p class="text-gray-700">...</p>
<p class="text-gray-700">...</p>
```

### Example 2

Compare the following:

```html
<!-- inline styles -->
<div
	style="padding-top: 1rem; font-style: italic; color: #444; font-size: 1.5rem"
>
	What is this?
</div>

<!-- Tailwind -->
<div class="pt-4 italic text-gray-700 text-2xl">What is this?</div>

<!-- good old CSS -->
<div class="subtitle">Ah, it's a subtitle!</div>
```

The inline style variant is equally confusing as the Tailwind one since it is unclear which (or what type of) element you are styling since the [descriptive class name](#class-names-are-useful) is missing.

## Side effects

An alleged advantage of Tailwind is the absence of unexpected side effects of CSS classes. Because every HTML element gets only those "atomic" utility classes that are visible on it, it cannot be affected by other styles that are defined somewhere else. The latter is common in CSS. For example, you can put a margin on all paragraphs in a global stylesheet, and then when adding a new paragraph you might be surprised about this margin and where it comes from.

What Tailwind's marketing claims to be an inconvenience is indeed a useful feature. Even more: Tailwind removes most of the great CSS features, most notably the cascade! See also the section on [missing features](#missing-features).

Literally every non-functional programming language has side effects, and this applies in particular to CSS. And we as developers already know how to deal with it: **scoping** and **modularization**.

> By the way, if you doubt that CSS is a programming language, watch the great talk on [CSS Algorithms](https://www.youtube.com/watch?v=dxY5CdZNzsk) by Lara Schenck, or check out these amazing [14 Pure CSS Games](https://freefrontend.com/css-games/). Whatever principles you know about programming languages apply to CSS as well.

Component frameworks make it easy to author our CSS in a modular way. [Styles in Svelte](https://svelte.dev/docs/svelte-components#style) and [Astro](https://docs.astro.build/en/guides/styling/#scoped-styles) are scoped by default, [in Vue](https://vuejs.org/api/sfc-css-features.html#scoped-css) this is achieved by adding the `scoped` keyboard to the style block, and with React you can use [CSS modules](https://github.com/css-modules/css-modules), for instance. With [Sass](https://sass-lang.com/documentation/at-rules/use/) we can use namespaces for imports, and [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) introduced in 2022 make it possible to control the cascade at a more granular level.

This means that many of the alleged pain points of unexpected CSS side effects have already been dealt with. With these solutions, we can still write regular CSS and do not face any of the maintainability issues of Tailwind which we saw before.

Also, Tailwind sometimes requires you to write
[regular CSS classes](https://tailwindcss.com/docs/adding-custom-styles) because of its [limited features](#missing-features), but these classes could have unexpected side effects, too. Tailwind's marketing promises are contradictory.

## Accessibility issues

### Bad reset

Tailwind's CSS reset removes many of the browser's standard styles for HTML elements. For example, links are not underlined anymore, and headings have the same text size as normal text. The idea is of course good, namely that developers and designers can start from a clean slate and don't have to write any reset on their own.

The issue, though, is that these resets are more opinionated than you think (just have a look into preflight), and they also hurt accessibility. Links should usually be underlined so that they are easy to recognize as links. To quote from [WebAIM](https://webaim.org/techniques/hypertext/link_text):

> Browsers underline hypertext links by default. It is possible to remove the underline using Cascading Style Sheets (CSS), but this is a bad idea most of the time. Users are accustomed to seeing links underlined. In body text, they may or may not be able to figure out which text is linked if the underline convention is not used.

There are exceptions, but they are not the rule:

> Although users are accustomed to seeing links in the main content underlined, they are also accustomed to seeing tabs and main navigational features (oftentimes created as graphics rather than text) without underlining. In these cases, the linked items should be designed so it is apparent that the user can click on them to perform an action.

Also, [headings](https://webaim.org/techniques/semanticstructure/#headings) should be larger than the text (by default) so that the sections of the page can be identified more easily.

These are just some examples. The browser defaults are actually very good when it comes to accessibility, and Tailwind's reset destroys this feature.

You might argue that in any case, it is the developer's job to educate themselves about accessibility and get it right. Yes, but unfortunately the reality is that many don't have the proper education. Many developers are even indifferent towards the topic. To build a better, more accessible web, I think we should start with an accessible baseline: the browser defaults.

### Semantic HTML

Using semantic HTML elements and understanding their use cases is essential for the development of accessible websites. However, I have seen Tailwind users (not necessarily the Tailwind docs) again and again using and advocating div-soups all the way. When they want to create an element, it will be a div by default, the styling will be done by Tailwind, and the content can be written inside, done. There is no consideration of what type of element they are working with.

Just to give a prominent example: Brad Traversy had been teaching semantic HTML on his channel, but in his already mentioned [Tailwind course](https://www.udemy.com/course/tailwind-from-scratch/) all that knowledge seems to be gone. He prefers div-soups now.

I suspect this is because Tailwind already removes some of the semantics by erasing [class names](#class-names-are-useful). Tailwind actively disregards the [separation of concerns](#separation-of-concerns) which apparently easily leads to the confusion that HTML elements are also all the same, only distinguished by styling and their behavior implemented via JavaScript.

Just to make this clear: you can perfectly author semantic HTML with Tailwind. My observation, however, is that this is the exception.

### Tailwind's website

The [axe Devtools](https://www.deque.com/axe/devtools/chrome-browser-extension/) find 140 accessibility issues on [tailwindcss.com](https://tailwindcss.com).

- "Elements must meet minimum color contrast ratio thresholds" (4 times)
- "Scrollable region must have keyboard access" (13 times)
- "Ensures landmarks are unique" (1 time)
- "All page content should be contained by landmarks" (122 times)

Other subpages have similar issues. And these are just the ones that can be automatically detected! Manual testing usually reveals even more issues.

This does not speak against using Tailwind CSS. However, it indicates that the very creators of Tailwind CSS either do not care about accessibility or are ignorant about it. It is likely that then this topic will also not be prioritized in the framework itself. The website mainly focuses on the convenience Tailwind brings to the developer, not the user of the website.

At least, Tailwind offers a [utility class for screen readers](https://tailwindcss.com/docs/screen-readers), which is nice.

## Discussions on Tailwind

This section describes my experience with discussions on Tailwind on social media platforms such as Twitter. Nothing of this speaks against using Tailwind. Feel free to just ignore this section, and make up your mind. But I wanted to include this here since it also adds to my frustration with Tailwind. The culture of discussion also seems to be unique in the web development community.

### Toxic culture

In my experience, when you write about a disadvantage of Tailwind, their fans will tell you immediately how great Tailwind is ("But Tailwind makes me so much faster!", etc.), neglecting the mentioned disadvantage as if it does not exist at all. This is just whataboutism. Maybe the disadvantage is not relevant, but then it should be explained why.

Here is a concrete example: under the already mentioned [tweet by Homer Gaines](https://twitter.com/xirclebox/status/1673557143088242689) someone writes:

> You're missing the point of tailwind by eliminating the overhead of developers needing come up with class names and maintaining style's separate from the element. This is not about readability but about convenience.

The flaw that Tailwind code is less readable is not addressed, instead, other advantages of Tailwind are mentioned (which we already debunked in the previous sections), and the importance of readability is downplayed altogether.

Oftentimes criticism about Tailwind is silenced by saying "When you don't like it, just don't use it". Imagine someone saying "I don't like cars because they pollute the environment" and the response is "When you don't like cars, don't drive them!". This type of reasoning cannot refute any of the disadvantages of Tailwind. It is just a cheap way of ending the conversation. Ironically, the same people will tell you that this is the future of writing CSS. Now what?

In fact, our decision is not completely free. When you work in a company where some engineering managers (or ill-informed developers) have decided to adopt Tailwind for the project, you have no choice but to work with it (unless you quit the job). You are forced to use Tailwind. This will also become more common the more popular Tailwind becomes. (And keep in mind that popularity does not need to correlate with quality.) For example, several of my colleagues (not all of them) share my concerns with Tailwind, but we cannot do anything about it (the infrastructure is defined by other, more global teams). We have to use this framework, although we know how regular CSS could make our lives much easier.

Another weird claim is "Yeah Tailwind is ugly first, but you will get used to it!", which you can also find very prominently on the website. I find that strange since there is no other technology that needs to make this excuse for marketing, or did I miss something? And also it is just not true. At least speaking of me, Tailwind did not lose any of its initial ugliness.

But the most absurd claim I got several times is "You clearly haven't used Tailwind yet. You don't know what you are talking about!". Seriously, is there any web technology whose users argue like this? For me, this is a desperate attempt to defend a seriously flawed technology. And clearly, all these defenses have literally nothing to do with Tailwind itself. They are just cheap ad hominem attacks. I could mention that I work with Tailwind at my job, but even if I didn't this would not change the validity of the mentioned concerns.

What is also strange is that many Tailwind users admit that they do not like or even are not able to write regular CSS. They claim that Tailwind makes their life so much easier. This is very strange since CSS is a prerequisite for Tailwind. The Tailwind docs also do not teach you CSS, you need to know it already.

On Twitter, regularly the following type of conversation takes place:

1. A developer shares their frustration with Tailwind and explains why Tailwind is not maintainable for them.
2. A Tailwind user answers, but does _not_ address the concerns with Tailwind and instead writes "Not again the Tailwind drama ..." or any other sarcastic comment.

This is not constructive at all. It is just another attempt to silence the discussion. It also involves downplaying and disregarding the significance of other developers' thoughts. And if you wonder why these posts pop up again and again: maybe it is because there is some truth in it. How many times have you heard of people writing about their frustration with Vue.js, for example?

Oftentimes, sharing frustration with a framework is confused with _hating_ it. This is not the same. Hate is irrational and subjective. What developers present, again and again, are rational and objective disadvantages of Tailwind. This blog post here is an example of this.

### All or nothing

Some people argue that Tailwind is not an all-or-nothing thing. You can use its utility classes as much as you like, but use regular CSS for everything else. This sounds like a reasonable idea at first. But this worsens the problem of [Multiple Files](#multiple-files). It adds unnecessary complexity to your codebase since you always have to decide if your class should be written with Tailwind or with regular CSS, and then look at two files (minimum) to understand how an element is styled.

Also, this suggestion is something the Tailwind docs and its community do not recommend at all. They suggest that you should write all your styles with Tailwind, which also explains why limitations such as missing values have been clumsily solved with the [bracket syntax](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values).

However, many of the disadvantages of Tailwind presented in this blog post can indeed be weakened by writing regular CSS from time to time.

### And the docs?

Some statements in the Tailwind Docs are also quite remarkable, and they are recited by Tailwind users as well. The page on [Utility-First Fundamentals](https://tailwindcss.com/docs/utility-first) claims:

> When you realize how productive you can be working exclusively in HTML with predefined utility classes, working any other way will feel like torture.

Tailwind should be the only reasonable way to write CSS?! Maybe CSS is torture for Adam Wathan and some of his followers, but certainly not for most web developers. Why don't they just write "When working exclusively in HTML with predefined utility classes, you will feel a big boost in productivity"? This, at least, is not a slap in the face of all CSS developers and maintainers out there.

## Conclusion

This page gathered a lot of disadvantages of using Tailwind. But is there any solution? How we can write CSS then? It's quite simple.

**Write regular CSS.**

Learn all the fundamentals of CSS, and then dive into the more advanced parts of CSS. Follow CSS experts like Kevin Powell, Sara Soueidan, Adam Argyle, Lea Verou, Chris Coyier, Ahmad Shadeed, Jhey Tompkins, Temani Afif, Zoran Jambor, Stephanie Eckles, and others. You will be amazed at what Vanilla CSS is capable of.

The following code produces a 3-dimensional rotating cube with CSS ([preview](/etc/cube)). Isn't that awesome?!

```html
<div class="scene">
	<div class="cube">
		<div class="front" />
		<div class="back" />
		<div class="left" />
		<div class="right" />
		<div class="top" />
		<div class="bottom" />
	</div>
</div>

<style>
	.scene {
		perspective: 20rem;
		display: grid;
		place-items: center;
		background-color: #222;
		max-width: 22rem;
		aspect-ratio: 1/1;
		margin: 1rem auto;
		border-radius: 0.75rem;
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
```

Learning CSS properly will make you a better developer, and you will always have the most modern features of CSS at your fingertips, while not having to deal with any of the mentioned drawbacks of Tailwind.

If necessary, use CSS preprocessors such as [Sass](https://sass-lang.com) or [Less](https://lesscss.org). They make your CSS more powerful without destroying its core syntax. Also keep in mind that many of their features are arriving at Vanilla CSS sooner or later (such as [nesting](https://caniuse.com/css-nesting), and we already have CSS variables and CSS modules).

This post is already quite long, but I have cut out some material since otherwise I would never have finished it.

### References

Below you will find some other references that describe the disadvantages of using Tailwind. Apart from my own experience with Tailwind, I have mainly used these as a source of inspiration for this blog post.

1. [Why I Don't Like Tailwind CSS](https://www.aleksandrhovhannisyan.com/blog/why-i-dont-like-tailwind-css) by Aleksandr Hovhannisyan
2. [Why I don't use Tailwind CSS in Production](https://blog.shimin.io/why-i-dont-use-tailwind-in-production/) by Shimin Zhang
3. [TailwindCSS: Adds complexity, does nothing.](https://dev.to/brianboyko/tailwindcss-adds-complexity-does-nothing-3hpn) by Brian Boyko
4. [Why Tailwind Isn't for Me](https://www.spicyweb.dev/why-tailwind-isnt-for-me/) by Jared White
5. [Why you’ll probably regret using Tailwind](https://johanronsse.be/2020/07/08/why-youll-probably-regret-using-tailwind/) by Johan Ronsse
6. [Why I personally hate Tailwind](https://www.reddit.com/r/webdev/comments/y7lkgs/why_i_personally_hate_tailwind/) by u/Normal_Fishing9824
7. [I really wanted to like Tailwind](https://www.jitbit.com/alexblog/tailwind/) by Alex Yumashev
8. [Is Tailwind CSS Worth It?](https://joshblf.medium.com/is-tailwind-css-worth-it-2e1eeed9489) by Josh Hicks
9. [Tailwind is a leaky abstraction](https://jakelazaroff.com/words/tailwind-is-a-leaky-abstraction/) by Jake Lazaroff
