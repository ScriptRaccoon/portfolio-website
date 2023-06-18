---
title: Disadvantages of Tailwind
published: 3000-01-01
updated: null
public: false
description: Why the popular CSS framework is not maintainable
showtoc: true
---

## Introduction

This post explains the disadvantages of using [TailwindCSS](https://tailwindcss.com/).

Numerous blog posts, articles, and tweets have been written on the subject. Here I will give a summary of them. I have also included my own concerns with Tailwind and write about my frustrating experience of working with Tailwind within a large codebase at my job.

I understand that many people enjoy working with Tailwind. And that's fine. I also enjoyed working with Tailwind on a small personal project. But maybe you will find something here that makes you reconsider your choice. Many of the issues presented here do apply to every utility-based CSS framework.

## What is Tailwind

_Skip this section if you are already familiar with Tailwind._

Tailwind is a CSS framework that seeks to style every HTML element using predefined utility classes. For (almost) every CSS property you can imagine there is a corresponding Tailwind utility class. So for example instead of writing

```css
div {
    margin-top: 1rem;
    color: #991b1b;
    display: flex;
    align-items: center;
}
```

in a CSS file, with Tailwind you write the following directly in your HTML:

```html
<div class="mt-4 text-red-800 flex items-center">
    <!-- markup -->
</div>
```

Check the [Tailwind Docs](https://tailwindcss.com/docs) for more details.

Tailwind makes the following promises (and some others as well):

-   Write CSS faster
-   Unified design system
-   Avoids switching between HTML and CSS files
-   Smaller bundle size

In the following sections, these promises will be debunked, and several disadvantages of Tailwind will be exposed as well.

## Maintainability

We all know that it is hard to read long lines of text. The wider text is, the harder it becomes to jump to the exact next line for our eyes, and the more likely it is that we get lost in the middle of a line. This is why books have their common layout and why we design our websites accordingly (such as this one), setting a `max-width` to text containers. There is no precise rule, but up to 70 characters per line are usually OK.

The same rule applies to the code we read and write. Code formatters such as Prettier do the job for us and set appropriate line breaks automatically.

Keep this in mind when reading the following example, which is taken directly from the Tailwind website. You will find similar code in every Tailwind project.

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
            <h1
                class="flex-auto text-lg font-semibold text-slate-900"
            >
                Classic Utility Jacket
            </h1>
            <div class="text-lg font-semibold text-slate-500">
                $110.00
            </div>
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

Clearly, the HTML is bloated with lots of utility classes, which are necessary with Tailwind to achieve the desired styles. This has numerous disadvantages, in particular concerning maintainability and readability:

First of all, the Tailwind classes for one element are gathered inside a long horizontal string, a "class soup". This happens even though the snippet uses Prettier with a maximal print width of 80: Prettier cannot linebreak long string literals. This makes it hard to find which property or utility class you need to adjust. Often you need to scroll. And even if you turn on word wrap in your editor, or take the manual work to indent the lines somehow, it takes time to find the relevant class. Adjusting a single property is much easier with regular CSS, since here every property has an individual line as a key-value pair.

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

And now try to find and change the background color in the corresponding CSS (or Sass) code:

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

You will find the CSS property faster, right? This is because you only need to scan the keys, which are under each other and visible clearly. Alternatively, you can look for the values and quickly identify the colors. You can also skip the whole first selector since only the second one is about the checked state.

Readability is also negatively impacted by the lack of syntax highlighting: Tailwind class names are just displayed as strings. Also, they tend to be short but not descriptive enough (more on that later). CSS code is much more expressive.

Another problem is that the actual text content in the markup is harder to find because it is "hidden" between the dozens of class names.

As a consequence, reading and maintaining Tailwind code can be quite frustrating. Many Tailwind users emphasize that Tailwind classes are so fast to write down. This may be true in some cases (more on that later). But writing code fast has never been an indicator of code quality. The code has to be easy to maintain. This is easily forgotten when you follow Tailwind's philosophy and quickly write down all these utility classes. We should not just talk about how fast the code can be written, but (maybe even more) how fast it can be _understood_ by other developers (or ourselves in the future).

The initial reaction when looking at some Tailwind code as above is that it is _ugly_. Although this impression is subjective, it is closely connected to the (more objective) lack of readability of the code. Many people initially share this feeling that Tailwind code is ugly, but got used to it after some time. This did not happen to me, though. Other aspects of maintainability will be covered in the sections below.

What do the [Tailwind Docs](https://tailwindcss.com/docs/utility-first) write about maintainability?

> Maintaining a utility-first CSS project turns out to be a lot easier than maintaining a large CSS codebase, simply because HTML is so much easier to maintain than CSS. Large companies like GitHub, Netflix, Heroku, Kickstarter, Twitch, Segment, and more are using this approach with great success.

There is no justification for the claim that HTML is easier to maintain than CSS, in particular when it is littered with utility classes and no descriptive [class names](#class-names). Then they go ahead and tell us how many companies already use Tailwind. This is just poor marketing inside of a documentation page (what?!) and does not tell us anything about why Tailwind is maintainable (which it isn't).

## Translation from Tailwind to CSS

The Tailwind class names are short and hence (in theory) fast to write (see the section on [speed](#speed) for how to achieve the same with Vanilla CSS) but suffer from bad readability since, after all, they are just abbreviations.

After working with Tailwind for a while, of course, you know what most of these abbreviations mean. For example, `pt-4` stands for top padding of 4 units. You have to remember that 1 unit is 0.25rem (if not configured otherwise). You need to do this translation in your mind or look it up, whereas there is no translation necessary when reading:

```css
* {
    padding-top: 1rem;
}
```

With Vanilla CSS, you get what you read. With Tailwind, every single class (of which there can be many for every element, as we have seen) needs to be translated in your head. This is cognitive overload and an unnecessary one.

Most of the time developers within a big project do not write code: they _read_ code, since this is a prerequisite for adjusting it, and it is also done during code reviews. As a consequence, using Tailwind classes will slow you (and the whole team) down. After some time you will notice that the slowdown decreases, but it will always be there when compared to Vanilla CSS.

A long list of Tailwind classes such as

```html
<div
    class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
/>
```

resembles very much _minified code_. No developer would get the idea to write minified JavaScript &ndash; this is the job of build tools. Why? Because it is hard to write, read, and maintain. But this applies to every language, and CSS is no exception. Writing minified CSS is bad for maintainability.

## Translation from CSS to Tailwind

It is well understood that CSS is a prerequisite for using Tailwind (which is what some beginners seem to misunderstand, who are afraid to learn CSS properly and hence jump on Tailwind too fast). But even experienced Tailwind users will have the Tailwind Docs open all the time and use the search function. Why? Because it is hard to remember all the Tailwind utility classes (their names and their definitions). You will be able to remember some of the classes, but never all of those you need. Do you know immediately what

```css
.grid {
    flex-basis: 2.5rem;
    grid-template-columns: auto 1fr;
    background-image: linear-gradient(20deg, transparent, #ddd);
}
```

translates to in Tailwind?

This means that Tailwind's marketing promise of writing CSS faster (which is often praised by Tailwind users) is, in fact, a lie because you constantly lose time while looking up the Tailwind style of writing CSS. You have to learn a whole new language, with its own grammar, just to write CSS.

In case you are just building a simple landing page with nothing complicated happening with regards to the CSS, Tailwind could make you faster. When you work on other projects, however, Tailwind will slow you down.

A related problem is that Tailwind's class names are not consistent. For example, `justify-content: center` becomes `justify-center`, but `align-items: center` (for some reason) does not become `align-center`, but rather `items-center`. When I wanted to add a border of size 1, I was confused that `border-1` does not do anything. So I went to the [border documentation](https://tailwindcss.com/docs/border-width) and found that you have to write `border`, whereas `border-2` indeed yields a border of size 2. I will probably not stumble upon this again but have to remember all these quirks of the language. Speaking of borders, a border at the top is abbreviated by `border-t`, but the [top property](https://tailwindcss.com/docs/top-right-bottom-left) is abbreviated `top`.

## Code duplication

Since Tailwind's philosophy is against using reusable classes but your page will usually contain several elements which should behave and look similar (links, buttons, headings, inputs, ...), you are likely to repeat the same Tailwind utility classes over and over again. This leads to code duplication, which is a [code smell](https://en.wikipedia.org/wiki/Code_smell). The code becomes [wet](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

Let's have a look at a real-world example, the footer on Netlify's page:

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

Of course, this is only the compiled HTML code. In development, you will create a reusable component (in this case, for a type of link) and only write the Tailwind classes once. This is what it could look like:

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

But this solution means that you are dependent on a component framework to avoid code duplication with Tailwind. Even though such frameworks are common for most web applications, it is not something you would normally consider when you are about to quickly spin up a simple landing page with HTML and CSS, for example.

For example, to style all inline code like `this one` on this page, I have added the following to my stylesheet.

```css
p > code {
    font-family: "Courier New", Courier, monospace;
    font-weight: 600;
    color: var(--primary-color);
}
```

Then I can just use these `<code>like so</code>`. It would be much more cumbersome to first generate a component for this.

In his course [Tailwind CSS from Scratch](https://www.udemy.com/course/tailwind-from-scratch/) by Brad Traversy (from whom I learned a lot in the past!) several projects suffer from code duplication for exactly this reason. My concern is that he did not even mention that this is a problem, even copy-pasted code several times. Newcomers might not understand that code duplication needs to be avoided. Brad Traversy has hundreds of thousands of followers, and thousands of people start learning Tailwind via his course, which effectively teaches one of the biggest code smells out there.

Of course, not every Tailwind course will do this. The issue, however, is that Tailwind's philosophy nudges you toward code duplication. You have to actively do something to avoid it. In contrast, Vanilla CSS with its class system is tailored towards avoiding code duplication. In the example above, we simply declare a class `.link` once and use it wherever we like.

Another issue is that your Tailwind-bloated HTML output _does_ contain code duplication, thereby increasing its file size; more on that later.

The Tailwind docs have a [dedicated page](https://tailwindcss.com/docs/reusing-styles) on how to deal with Tailwind's inherent code duplication. It is quite astonishing how they downplay the problem. It is claimed that often the code duplication is only in one place and hence can be edited with the multi-cursor feature of your editor. There is so much wrong with this:

-   Code duplication is rarely only in one place. And even if it was: how can you guarantee this for sure? Do you always search for the whole Tailwind class string through the whole codebase?
-   Multi-cursor editing is cumbersome and error-prone.
-   This approach does not get rid of the code duplication.
-   Their arguments are not Tailwind-specific and try to persuade us that code duplication is not a big deal in general. Many decades of research and practice in software development by thousands of professionals have shown and confirmed that code duplication needs to be avoided in every programming language, and Tailwind responds with "Nah it's ok because you can edit with multi-cursor". This is just absurd.

They also suggest using loops in your markup, which is a valid approach, but again only works with frameworks, and does not always fit either. For instance, when you have three buttons (Login, Logout, Dashboard) in a menu, do you want to create an array for the button data and loop over them? In any case, it is so much easier to just declare a `.btn` class and attach it to the buttons.

And what happens, in this example, when you want to add a fourth button? Do you want to add a fourth element to an array, just to render a button? With Tailwind, many developers will instead just copy-paste the existing code, since this is the easiest Tailwind-compatible solution here, thus producing code duplication. With regular CSS, you do not need to touch the `.btn` class at all and just add a button with that class. It cannot be any simpler, and Tailwind prevents you from doing this.

They also mention component frameworks, which are not always suitable as already mentioned, and the @apply directive, which will be addressed in a [separate section](#the-@apply-directive).

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

Or even shorter:

```css
.link:is(:focus, :hover) {
    color: blue;
    text-decoration: underline;
    font-weight: bold;
}
```

Tailwind requires you to repeat `hover:` and `focus:` three times. You need six classes to achieve the styling. With regular CSS, you only need to specify one selector and three properties. When you want to add another property (when the link is focussed or hovered), with Tailwind you have to add three classes. With regular CSS it is just one property.

In general, Tailwind requires you to write `n * m` classes when you want to have `n` properties across `m` states. The regular CSS version only has one selector describing the `m` states and then `n` properties, each in its own line.

The code repetition here is of course bad for maintainability. Say you want to change `bold` to `semibold`. In the Tailwind code, you need to make three adjustments. In the CSS code, you just change `font-weight` to 600 _once_, and you are done.

## The @apply directive

When I speak up about [code duplication](#code-duplication) and [ugly HTML](#maintainability) with Tailwind, I often hear that Tailwind offers a solution to this problem: the [@apply directive](https://tailwindcss.com/docs/reusing-styles). On the other hand, Tailwind creator Adam Wathan himself does not recommend using it. He admits in a [tweet](https://twitter.com/adamwathan/status/1226511611592085504) that it

> [...] basically only exists to trick people who are put off by long lists of classes into trying the framework.

In another [tweet](https://twitter.com/adamwathan/status/1559250403547652097), he even says that @apply should not have been included in Tailwind. So, should we use it now, or not? And if we should not use it, why on earth is this feature still available in Tailwind and described in its documentation?

Here are some problems with the @apply directive:

-   It contradicts Tailwind's core principle of using utilities only.
-   It can only be used in a separate CSS file. So it is also against Tailwind's promise to have only one file for markup and styling.
-   The feature is very similar to CSS classes but is a useless abstraction of these.

To elaborate on the last point, let us look at the example from the Tailwind documentation (removing the focus styles for simplicity):

```css
.btn-primary {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700;
}
```

Why would you prefer this over the CSS or SCSS version?

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

You just write a minified version of a regular CSS class which suffers from worse maintainability.

## Limited Features

When it comes to new or complex CSS features, Tailwind will always lack behind. Since it is a library on top of CSS, new features will take some time and need additional implementation before they arrive in Tailwind. Why not just work with CSS and enjoy all new features directly?

For example, try to write the following with Tailwind! This CSS code gives a form a red outline when it has an invalid, non-focussed input field.

```css
form:has(input:invalid:not(:focus)) {
    outline: 0.1rem solid red;
}
```

Actually, CSS is such a complex and powerful programming language, that it will never be possible to achieve the same with utility classes, no matter how many utility classes you are using.

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

In particular, when you only want to use it once, this seems to be overly complicated compared to writing regular CSS. Also, you will have to come up with a name, which was one of the promises of Tailwind that you don't have to do.

But also very basic CSS features are missing in Tailwind, by design so to say. For instance, there is no equivalent of the child or sibling selectors. Tailwind users would argue that you don't need this, since you can just style the element directly. Ok, say I want to style always the first paragraph inside of a section, which follows a heading. With CSS, we can simply write:

```css
section > h2 + p {
    border-left: 0.1rem solid gray;
    padding-left: 0.5rem;
}
```

This is simply not possible with Tailwind. We would need to manually repeat the corresponding utility classes for every paragraph of this kind (which leads to [code duplication](#code-duplication)). Which also means that when we want to switch these paragraphs, we need to switch the classes as well.

What can also be quite frustrating is that many values are missing. For example, there are only six available [z-indices](https://tailwindcss.com/docs/z-index) by default. In order to use other values, you have to expand your theme or use arbitrary values (which, again, bails out of Tailwind's philosophy). In the codebase at my job, we have often run into this issue, and for technical reasons the two alternatives did not work (see also [Setup](#setup)). With regular CSS there would be absolutely no problem to use any z-index value you like. Similarly, the available [width classes](https://tailwindcss.com/docs/width) are very limited, by default.

## Speed

One of Tailwind's biggest selling points is that you can style your HTML very fast (which is not quite true, as we have seen above). But you do not need Tailwind to write CSS fast. Here are two methods:

First, use autocompletion of your IDE. For example, in Visual Studio Code, simply typing `tex` autocompletes to `text-align`. The value `center` is now already preselected, you just have to confirm. With just 5 keystrokes (t, e, x, Tab, Tab) you can write:

```css
* {
    text-align: center;
}
```

With just 6 keystrokes (d, i, s, Tab, f, Tab) you can write:

```css
* {
    display: flex;
}
```

I do this all the time. I rarely write any CSS property till the end.

A second, much more powerful method is to use the [Emmet extension](https://docs.emmet.io) (which is preinstalled in Visual Studio Code). Many developers are familiar with this fantastic extension inside HTML files since it boosts development speed a lot. But Emmet is also capable of writing CSS for us.

Here are some examples:

```css
* {
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

Both of these methods have a big advantage over Tailwind in that, in the end, your source code is regular CSS, thus very easy to maintain.

While writing Tailwind code can be fast, seeing the result in the browser can take longer. This is because recompiling CSS is much faster than recompiling HTML. This means that, when you work with Tailwind, your changes will be slower to see. In a large-scale project, it can take a couple of seconds. Regular CSS would be updated instantly. There is no problem in waiting once for a couple of seconds. The problem is that you have to wait _again and again_ for every little change you make in your Tailwind-authored CSS.

## Class names

Tailwind users praise the fact that they do not have to come up with class names for their elements to style them. This is true since you can just style any element by attaching utility classes to it. However, this is not the whole story.

When you style an element, you need to know _which_ element you are currently styling. When you want to change the styles of some element (which you have identified by looking at the website), you have to _find_ it in the code. Both tasks are difficult when you do not have any name for the element. It helps when you style a semantic element, for example when you have exactly one button in the component, which makes it easy to find. But less so for containers.

For example, imagine a footer with different containers with social media links, internal links, logos, and lots of other stuff. Your task is to change the spacing of the social media icons. How fast will you be able to find it inside of Tailwind code? And how fast will you be able to find it if the container had a class name `social-media-icons` which you can find _immediately_ by searching in your editor for `social`?

These things happen to me all the time at my job: I have to scroll and search for quite a while, again and again, before I find the element which I need to adjust. Sometimes, I find myself adding comments in the markup to remember what is what.

```html
<!-- container of cart item -->
<div
    class="some-extremely-long-class-list-without-any-descriptive-name"
></div>
```

One of many good measures of software quality is how descriptive the objects, variables, and functions are named. Names which are very short or even abbreviated (like `strlen` in PHP) are not good, since they do not speak for themselves. Tailwind just ignores this core principle of clean code and removes all names. It is not surprising that maintainability will suffer from this approach.

That being said, I do not understand why it should be complicated to come up with class names. You do not have to follow any naming methodology (like BEM) either, just keep it simple. Imagine someone came up with a JavaScript framework where no variables have names because _it is too hard to come up with good names_. Of course, this would be mad. With every programming language, including CSS.

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
        <p class="chat-notification-message">
            You have a new message!
        </p>
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

With the upcoming [CSS nesting](https://developer.chrome.com/articles/css-nesting/), which we have been already using for years with the help of preprocessors such as Sass, we can write it even more simply:

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

The Tailwind docs make you believe that CSS is complicated, only because they do not use their most basic features, namely element selectors and combinators!

The Tailwind docs on [Reusing styles](https://tailwindcss.com/docs/reusing-styles) make an exaggerated claim:

> You have to think up class names all the time &mdash; nothing will slow you down or drain your energy like coming up with a class name for something that doesn't deserve to be named.

Really? Developers have much more energy-draining tasks. And again: having a descriptive name such as "logo-wrapper" in the component will be very useful when you need to adjust the component!

Finally, it is worth mentioning that many frameworks make it easy to make styles _scoped_ to the respective component. In this case, you can usually style elements just by their tag name. In the above example, we can style the dialog simply by selecting `dialog`.

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

This is a valid Svelte and Astro component and in Vue.js you have to write `<style scoped>`. Because of scoping, the style for the paragraph will not leak outside of the component, and you do not need to come up with a class name such as `subtitle` (which would not be hard anyway). I code a lot in Svelte and rarely need to use class names because of this and since I use semantic HTML tags if possible.

## Developer tools

When working on a large-scale web application, you will often find yourself wondering where an element (or a component) can be found in the codebase &ndash; in particular when you are new to the project. So you open the inspector tool in the developers tools, find a class that is on (or close to) your element, copy it, paste it into your editor and voilà, you can start to work on it.

This works in particular well when all your classes have descriptive names such as `.social-media-list` for a list of social media links. Probably you will find this only once in your codebase.

With Tailwind, however, you will only find a long list of class names such as

```html
flex justify-center flex-col md:flex-row gap-5
```

which &ndash; by design &ndash; can be found everywhere in your codebase. Even pasting the whole class name string will not always help you out, since there can be many search results, or in fact no results when the classes were applied conditionally or were authored with a CSS-in-JS solution. Therefore, inspection gets much harder.

Tailwind also prevents you to change the styling of all elements of a given type in your developer tools, which can be helpful to tweak the design during development. Instead, you can always adjust only one element.

## There is no way back

Imagine a big project takes the endeavor to refactor all its CSS to Tailwind. Let's imagine this process is finished and the team works with Tailwind for some years. These days, Tailwind is very popular, and it seems like it will stay here for a while.

But for how long, exactly? What happens when Tailwind will not be maintained at some point in the future? Or what happens when a new, much better paradigm of writing CSS will emerge and you would like to switch? Or maybe you find out that Tailwind (as explained in the other sections) actually was a bad choice since it cripples the maintainability of your codebase and slows your team down?

The problem is that, as soon as you have removed all the class names and semantics from your codebase, there is no way to get them back. Converting a codebase from regular CSS to Tailwind is feasible (and can even be automated to some extent), but it does not work the other way around. This means that, once you are using Tailwind throughout your project, you are locked into Tailwind's paradigm of utility classes.

This is something projects which will be maintained for many years (or even decades) need to keep in mind. Of course, regular CSS will not go anywhere.

## Bundle size

Tailwind promises to produce smaller bundle sizes of the CSS since only those utility classes are included in the bundle which are actually used in the markup. This prevents teams to ship CSS which is not used in production.

This is only one half of the reality. Namely, the HTML gets _much_ bigger when it is bloated with Tailwind utility classes. And even though you write your CSS in the markup, the browser still has to fetch the CSS file generated by Tailwind, so that the number of network requests is not decreased either. And since the HTML contains the same classes over and over again (see also [code duplication](#code-duplication)), Tailwind increases the size of the HTML far more than the size of a regular CSS file.

But it is not a good argument either: removing unnecessary classes from your CSS files is part of the development process, the same way that unnecessary variables and functions are removed from the JavaScript. There are also developer tools to make this easier for us. For example, when you work with Svelte, the Svelte extension for VS Code warns you about unused classes.

When a codebase contains lots of unused CSS, this is a sign that the development process has serious flaws, that the code lacks quality, and that maybe even the developers are not able to write clean code. This issue cannot be solved by writing CSS in a different way. This will not change the code quality of the codebase. The bad quality will emerge everywhere else. Ironically, we have seen that introducing Tailwind produces even more non-clean code (bad readability, bad maintainability, code duplication).

## Consistent design

Tailwind is claimed to provide a consistent design system for free, which is not true. For example, you can add arbitrary paddings like `p-2`, `p-3`, `p-4`, ... to any element you like. You can even put arbitrary values with `p-[5.5rem]`. You would still need a documentation page associated with your project which dictates in which situations which spaces should be used. But in practice, this does not exist. Every developer writes whatever padding or margin he/she finds suitable.

This is even more true with colors. With Tailwind, you can give one button a background color of `sky-400`, the other one `blue-400`, and nothing in the editor will tell you about this inconsistency.

Of course, in practice, you will have a button component, maybe with some adjustable theme such as primary, secondary, etc. In this case, the background color is only declared in one file, which is good and prevents inconsistencies.

But for that, you do not need Tailwind at all. Consistency is achieved by a set of reusable components and CSS custom properties (which I simply call CSS variables). For example, you can declare a CSS variable

```css
:root {
    --spacing-1: 0.25rem;
}
```

in your root selector and use that variable wherever you want. This feature is built into CSS, there is no need to use a framework for that. If you are using Sass, you can declare a (static) variable as follows:

```scss
$spacing-1: 0.25rem;
```

But otherwise, it works the same. It is also remarkable that [Theming in Tailwind](https://tailwindcss.com/docs/theme) requires a JavaScript file. Yes, you need a JavaScript file to adjust your CSS.

## Multiple files

Tailwind promises that styling and markup can be found in only one file, and that this speeds up our development. It is claimed that we do need to switch less often between files.

Theoretically, this is true by design: we put all the styles directly on the HTML elements, so that the HTML is (or should be) the single source of truth for markup and design. In practice, this is not the case. In fact, Tailwind forces you to switch between files quite often:

-   Not every portion of CSS can be realized with Tailwind. Sometimes, this is due to the complexity of the CSS. Sometimes, this is due to newer or less common CSS features which are not (yet) implemented in Tailwind. So you do end up with a separate CSS file. And now every time you want to change the styling you have to ask yourself which file you need to look at!
-   The standard configuration of Tailwind can be adjusted, and many projects do this. Often you have to check this custom configuration to know what certain Tailwind classes actually mean. This applies in particular to custom colors and sizes.
-   At my job, we have a large codebase, which has started to migrate the styles from Less (a CSS preprocessor) to Tailwind. The migration is incomplete (and takes a lot of time). The Less files are considered to be legacy, but there are still a lot of them. And it is not clear when and sometimes even how (as mentioned above) to migrate these. So again we have to switch between our Tailwind-styled markup and CSS resp. Less files. I am aware that not everyone using Tailwind will face this issue, but on the other hand I can imagine that this kind of incomplete migration is not untypical.

This kind of switching is yet another reason why working with Tailwind will
slow you down.

## Setup

When you want to work with Tailwind on a project, you have to set it up first. With Vanilla CSS, you do not have to do anything.

This is a kind of trivial remark, of course. When Tailwind had a lot of benefits, the setup would be beneficial, after all. The problem, however, is that with every additional framework you attach to your project, things might go wrong.

Let me give you an example from the codebase at my job. For some reason, the purging process of Tailwind is broken. (This is the process of removing all unused utilities from the CSS output.) As a result, as of writing this, I am not able to add any less common CSS grid styles with Tailwind, even though they are supported by Tailwind, generally speaking. Debugging already took hours, and the problem is still not fixed, also because it is a large and complex codebase. Fixing the issue will require several hours for the engineers who built the infrastructure. I know (and hope) that not many people will face these issues, but I wanted to mention them, since they add to my frustration with using Tailwind.

## Useless diffs

When a commit contains a change in a long line of Tailwind classes, the diff may not be shown clearly &ndash; both in your editor and on GitHub. Here is an example commit, which I saw during a code review at my job. We use a prefix for our Tailwind classes, which I have replaced by `tw`, since the specific prefix does not matter.

```diff
<a
- href="tw-flex tw-flex-col tw-bg-white tw-rounded-md gt-tablet:tw-flex-row tw-p-4 gt-tablet:tw-p-6 tw-gap-4 tw-mx-4 hover:tw-shadow-md"
+ href="tw-flex tw-flex-col tw-bg-white tw-rounded-md gt-tablet:tw-flex-row tw-items-center tw-p-4 gt-tablet:tw-p-6 tw-gap-4 tw-mx-4 hover:tw-shadow-md"
  >...</a
>
```

It seems like the whole line has been adjusted! How long does it take you to find out that the author only added the class `tw-items-center`? But even after you have found this, notice that you need to check the remaining classes as well, since something might have changed there as well. This is a bit cumbersome here since the corresponding classes are shifted.

Normally, we can rely on GitHub which highlights the part which has changed. But here, it highlighted `items-start tw-` which indicates that actually two classes have been adjusted somehow. This is quite confusing. The first time it took me about one minute to understand what had changed.

This confusion will never happen with regular CSS, since here every property has its own line, and the diff will be displayed correctly and in a very clear way. You only need two seconds to see what has changed here:

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

Of course, we could also write Tailwind this way, or even write editor
extensions that format the classes automatically, but the point is (again)
that Tailwind forces us to _fix_ its inherent maintainability issues.

## Separation of concerns

Perhaps you remember that old-school HTML had elements for styling content, such as the `<center>` and the `<font>` elements. There was a good reason to deprecate all such elements, improve the CSS language and do all the styling in separate CSS files. In fact, CSS was actually invented to separate content/structure from its presentation. It is kind of curious that Tailwind reverses the history of HTML without learning from it.

Separating markup from styling had (and still has) many advantages:

-   When you want to change the styling, you know exactly where to go: to the CSS file. When you want to change the markup or content, you know exactly where to go: to the HTML file. Since each file is smaller as compared to a combination file of HTML and CSS, you will find the relevant code faster.

-   By using CSS classes for reoccurring elements (such as buttons or headings), you do not have to repeat the same styles again and again. See also [code duplication](#code-duplication).

Some Tailwind users have suggested that the 'separation of concerns' principle is simply not working. I highly disagree and still have not seen any proof of why this principle does not work in practice.

## Side effects

An alleged advantage of Tailwind is the absence of unexpected side effects of CSS classes. Because every HTML element gets only those "atomic" utility classes that are visible on it, it cannot be affected by other styles which are defined somewhere else. The latter is common in CSS. For example, you can put a margin on all paragraphs in a global stylesheet, and then when adding a new paragraph you might be surprised about this margin and where it comes from.

What is considered to be a bug by Tailwind's marketing, is indeed a useful feature. Even more: Tailwind removes most of the great CSS features, most notably the cascade! (See also [Limited Features](#limited-features)).

Literally _every_ non-functional programming language has side effects, and this applies in particular to CSS. And we as developers already know how to deal with it: scoping and modularization.

By the way, if you doubt that CSS is a programming language, watch the great talk [CSS Algorithms](#https://www.youtube.com/watch?v=dxY5CdZNzsk) by Lara Schenck, or check out these amazing [14 Pure CSS Games](#https://freefrontend.com/css-games/). Whatever principles you know about programming languages apply to CSS as well.

Component frameworks such as React, Vue, and Svelte make it easy to author our CSS in a modular way. Styles in Svelte are scoped by default, in Vue this is achieved by adding the _scoped_ keyboard to the style block, and with React you can use [CSS modules](https://github.com/css-modules/css-modules), for instance. This means that many of the alleged painpoints of unexpected class effects have already been dealt with. And with these solutions, we can still write regular CSS and do not face any of the maintainability issues of Tailwind which we saw before.

Also, Tailwind sometimes requires you to [write regular CSS](https://tailwindcss.com/docs adding-custom-styles) because of its limited features, but these classes could have unexpected side effects, too. Tailwind's marketing is inconsistent.

## Community

This section is about the Tailwind community. Strictly speaking, nothing of this speaks against using Tailwind. Feel free to just ignore all these statements, and make up your own mind. But I wanted to include this here, since it also makes it quite clear that Tailwind users have almost nothing substantial to say against the disadvantages outlined above.

Oftentimes criticism about Tailwind is silenced by saying "When you don't like it, just don't use it". Imagine someone saying "I don't like cars because they pollute the environment" and the response is "When you don't like cars, don't drive them!". Clearly, this type of reasoning cannot refute any of the disadvantages of Tailwind &ndash; it is just a cheap way of ending the conversation. Ironically, the same people will tell you that this is the future of writing CSS. Now what?

And in fact, it is not true either. When you work in a company where some engineering managers (or ill-informed developers) have decided to adopt Tailwind for the project, you have no choice (unless you quit the job). You are forced to use Tailwind. This will also become more common the more popular Tailwind becomes. (And keep in mind that popularity does not need to correlate with quality.)

For example, in my team, every developer I talked with about Tailwind shares my concerns. But we cannot do anything about it. We have to use this framework, although we know how regular CSS could make our lives much easier.

Another weird claim is that "Yeah Tailwind is ugly first, but you will get used to it!", which you can also find very prominently on the website. What is strange since there is no other technology which needs to make this excuse for marketing &ndash; or do I miss something? And also it is just not true. At least speaking of me, Tailwind did not lose any of its initial ugliness.

But the most absurd claim I got several times is "You clearly haven't used Tailwind yet. You don't know what you are talking about!". Seriously, is there any web technology whose users argue like this? For me, this is a desperate attempt to defend a seriously flawed technology. And clearly all these defenses have literally nothing to do with Tailwind itself. They are just cheap ad hominem attacks.

What is also strange is that many Tailwind users admit that they do not like or even are not able to write regular CSS. They claim that Tailwind makes their life so much easier. This is really strange since CSS is a prerequisite for Tailwind. The Tailwind docs also do not teach you CSS, you need to know it already.

Someone argued that Tailwind is not an all-or-nothing thing. You can use its utility classes as much as you like, but use regular CSS for everything else. This sounds like a reasonable idea at first. But this worsens the problem of [Multiple Files][#multiple-files]. It adds unnecessary complexity to your codebase since you always have to a) decide if your class should be written with Tailwind or with regular CSS, and b) look at two files (minimum) to understand how an element is styled. And this suggestion is something the Tailwind docs and its community clearly do not recommend at all. They suggest that you should write all your styles with Tailwind, which also explains why limitations such as missing values have been clumsily solved with the [bracket syntax](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values).

Some statements in the Tailwind Docs are also quite remarkable. The page on [Utility-First Fundamentals](https://tailwindcss.com/docs/utility-first) claims:

> When you realize how productive you can be working exclusively in HTML with predefined utility classes, working any other way will feel like torture.

What the f\*\*k?! Tailwind should be the only reasonable way to write CSS? Maybe CSS is torture for Adam Wathan and some of his followers, but certainly not for most web developers. Why don't they just write "When working exclusively in HTML with predefined utility classes, you will feel a big boost in productivity"? This, at least, is not a slap in the face of all CSS developers and maintainers out there.

Here is another quote from the page on [Reusing styles](https://tailwindcss.com/docs/reusing-styles):

> Yes, HTML templates littered with Tailwind classes are kind of ugly. Making changes in a project that has tons of custom CSS is worse.

Again, there is no justification for this bold claim.

## The solution

This page gathered a lot of disadvantages of using Tailwind. But is there
any solution? How we can write CSS then?

The solution is quite simple.
**Write regular CSS**. Learn all the fundamentals of CSS, and
then dive into the more advanced parts of CSS. Follow CSS experts like Kevin
Powell, Sara Soueidan, Adam Argyle, Lea Verou, Chris Coyier, Ahmad Shadeed,
Jhey Tompkins, Temani Afif, Zoran Jambor, Stephanie Eckles and others. You
will be amazed at what Vanilla CSS is capable of.

Try to run the following.

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

This will make you a better developer, and you will always have the most
modern features of CSS at your fingertips, while not having to deal with
_any_ of the mentioned drawbacks of Tailwind.

If necessary, use CSS preprocessors such as
[Sass](https://sass-lang.com),
[Less](https://lesscss.org), etc. They make your
CSS more powerful without destroying its core syntax. Also keep in mind that
many of their features are arriving at Vanilla CSS sooner or later (such as
nesting, and we already have CSS variables and CSS modules).

## References

Below you will find some other references which describe the disadvantages
of using Tailwind.

-   [Why I Don't Like Tailwind CSS](https://www.aleksandrhovhannisyan.com/blog/why-i-dont-like-tailwind-css) by Aleksandr Hovhannisyan
-   [Why I don't use Tailwind CSS in Production](https://blog.shimin.io/why-i-dont-use-tailwind-in-production/) by Shimin Zhang
-   [TailwindCSS: Adds complexity, does nothing.](https://dev.to/brianboyko/tailwindcss-adds-complexity-does-nothing-3hpn) by Brian Boyko
-   [Why Tailwind Isn't for Me](https://www.spicyweb.dev/why-tailwind-isnt-for-me/) by Jared White
