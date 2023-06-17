---
id: tailwind
title: Disadvantages of Tailwind
published: 3000-01-01
updated: null
public: false
---

## Introduction

This post explains the disadvantages of using [TailwindCSS](https://tailwindcss.com/).

Numerous blog posts, articles, and tweets have been written on the subject.
This post attempts to give a summary of them. I have also included my
concerns with Tailwind and write about my experience of working with
Tailwind within a large codebase. Many of the issues presented here apply to
every utility-based CSS framework.

I understand that many people enjoy working with Tailwind. And that's
fine. But maybe you find something on this page which makes you
reconsider your choice.

## What is Tailwind

Skip this section if you are already familiar with Tailwind.

Tailwind is a CSS framework that seeks to style every HTML element using predefined utility classes. For (almost) every CSS property you can
imagine there is a corresponding Tailwind utility class. So for example
instead of writing

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
<div class="mt-4 text-red-800 flex items-center">...</div>
```

Check the [Tailwind Docs](https://tailwindcss.com/docs) for more details.

Tailwind makes the following promises (and some others as well):

-   Write CSS faster
-   Unified design system
-   Avoids switching between HTML and CSS files
-   Smaller bundle size

In the following sections, these promises will be debunked, and several disadvantages of Tailwind will be exposed as well.

## Maintainability

We all know that it is hard to read long lines of text. The wider text is,
the harder it becomes to jump to the exact next line for our eyes, and the
more likely it is that we get lost in the middle of a line. This is why
books have their common layout and why we design our websites accordingly
(such as this one), setting a `max-width` to large text containers.
There is no precise rule, but up to 70 characters per line are usually OK.

The same rule applies to the code we read and write. Code formatters such as
Prettier do the job for us and set appropriate line breaks automatically.

Keep this in mind when reading the following example, which is taken
directly from the Tailwind website. You will find similar code in every
Tailwind project.

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

Clearly, the HTML is bloated with lots of utility classes, which are
necessary with Tailwind to achieve the desired styles. This has numerous
disadvantages, in particular concerning maintainability and
readability:

First of all, the Tailwind classes for one element are gathered inside a
long horizontal string, a "class soup". This happens even though the snippet
uses Prettier with a maximal print width of 80: Prettier cannot linebreak
long string literals. This makes it hard to find which property or
utility class you need to adjust. Often you need to scroll. And even if you
turn on word wrap in your editor, or take the manual work to indent the
lines somehow, it takes time to find the relevant class. Adjusting a single
property is much easier with regular CSS, since here every property has an
individual line as a key-value pair.

Readability is also negatively impacted by the lack of syntax highlighting:
Tailwind class names are just displayed as strings. Also, they tend to be
short but not descriptive enough (more on that later).

Another problem is that the actual text content in the markup is harder to
find because it is "hidden" between the dozens of class names.

As a consequence, reading and maintaining Tailwind code can be
frustrating. Many Tailwind users emphasize that Tailwind classes are so fast
to write down. This may be true in some cases (more on that later). But
writing code fast has never been an indicator of code quality. The code has
to be easy to maintain. This is easily forgotten when you follow Tailwind's
philosophy and quickly write down all these utility classes. We should not
just talk about how fast the code can be written, but (maybe even more) how
fast it can be
_understood_ by other developers (or ourselves in the future).

The initial reaction when looking at some Tailwind code as above is that it
is _ugly_. Although this impression is subjective, it is
closely connected to the (more objective) lack of readability of the code.
Many people initially share this feeling that Tailwind code is ugly, but got
used to it after some time. This did not happen to me, though.
Other aspects of maintainability will be covered in the sections below.</p>

What do the [Tailwind Docs](https://tailwindcss.com/docs/utility-first) write about maintainability?

> [...] maintaining a utility-first CSS project turns out to be a lot easier than maintaining a large CSS codebase, simply because HTML is so much easier to maintain than CSS. Large companies like GitHub, Netflix, Heroku, Kickstarter, Twitch, Segment, and more are using this approach with great success.

There is no justification for the claim that HTML is easier to
maintain than CSS, in particular when it is littered with utility classes
and no descriptive [class names](#class_names). Then they go
ahead and tell us how many companies already use Tailwind. This is just poor
marketing inside of a documentation page (?!) and does not tell us anything
about why Tailwind is maintainable (which it isn't).

## Translation from Tailwind to CSS

The Tailwind class names are short and hence (in theory) fast to write (see
the section on [speed](#speed) for how to achieve the same with Vanilla
CSS) but suffer from bad readability since, after all, they are just abbreviations.

After working with Tailwind for a while, of course, you know what most of
these abbreviations mean. For example, `pt-4` stands for
top padding of 4 units. You have to remember that 1 unit is 0.25rem (if not
configured otherwise). You need to do this translation in your mind or look
it up, whereas there is no translation necessary when reading:

```css
* {
    padding-top: 1rem;
}
```

With Vanilla CSS, you get what you read. With Tailwind, every single class
(of which there can be many for every element, as we have seen) needs to be
translated in your head. This is cognitive overload and an unnecessary one.

Most of the time developers within a big project do not write code: they
_read_ code, since this is a prerequisite for adjusting it, and it is also
done during code reviews. As a consequence, using Tailwind classes will slow
you (and the whole team) down. After some time you will notice that the slowdown
decreases, but it will always be there when compared to Vanilla CSS.

A long list of Tailwind classes such as

```html
<div
    class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
/>
```

resembles very much _minified code_. No developer would get the idea to write minified
JavaScript -- this is the job of build tools. Why? Because it is hard
to write, read, and maintain. But this applies to every language, and CSS
is no exception. Writing minified CSS is bad for maintainability.

## Translation from CSS to Tailwind

It is well understood that CSS is a prerequisite for using Tailwind (which
is what some beginners seem to misunderstand, who are afraid to learn CSS
properly and hence jump on Tailwind too fast). But even experienced Tailwind
users will have the Tailwind Docs open all the time and use the search
function. Why? Because it is hard to remember all the Tailwind utility
classes (their names and their definitions). You will be able to remember
some of the classes, but never all of those you need. Do you know
immediately what

```css
.grid {
    flex-basis: 2.5rem;
    grid-template-columns: auto 1fr;
    background-image: linear-gradient(20deg, transparent, #ddd);
}
```

translates to in Tailwind?

This means that Tailwind's marketing promise of writing CSS faster (which
is often praised by Tailwind users) is, in fact, a lie because you
constantly lose time while looking up the Tailwind style of writing CSS.
You have to learn a whole new language, with its own grammar,
just to write CSS.

In case you are just building a simple landing page with nothing
complicated happening with regards to the CSS, Tailwind could make you
faster. When you work on other projects, however, Tailwind will slow you
down.

A related problem is that Tailwind's class names are not consistent. For
example, `justify-content: center` becomes `justify-center`, but
`align-items: center` (for some reason) does not become `align-center`, but rather `items-center`. When I wanted to add a border of size 1, I was confused that `border-1`
does not do anything. So I went to the [border documentation](https://tailwindcss.com/docs/border-width) and found that you have to write `border`, whereas `border-2`
indeed yields a border of size 2. I will probably not stumble upon this again
but have to remember all these quirks of the language. Speaking of borders, a
border at the top is abbreviated by `border-t`, but the
[top property](https://tailwindcss.com/docs/top-right-bottom-left)
is abbreviated `top`.

## Code duplication

Since Tailwind's philosophy is against using reusable classes but your page
will usually contain several elements which should behave and look similar
(links, buttons, headings, inputs, ...), you are likely to repeat the same
Tailwind utility classes over and over again. This leads to code
duplication, which is a [code smell](https://en.wikipedia.org/wiki/Code_smell). The code
becomes [wet](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

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

Here, every link has an extremely long list of utility classes attached
(they use Tailwind with a `tw`-prefix), and this list is
repeated 6 times in this code snippet alone.

Of course, this is only the compiled HTML code. In development, you will
create a reusable component (in this case, for a type of link) and only
write the Tailwind classes once. This is what it could look like:

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

This is still ugly and suffers from bad maintainability as already explained
before, but at least we removed the code duplication.

But this solution means that you are dependent on a component framework to avoid code duplication with Tailwind.
Even though such frameworks are common for most web applications, it is not something you would normally
consider when you are about to quickly spin up a simple landing page with
HTML and CSS, for example.

For example, to style all inline code like `this one` on
this page, I have added the following to my stylesheet.

```css
p > code {
    font-family: "Courier New", Courier, monospace;
    font-weight: 600;
    color: var(--primary-color);
}
```

Then I can just use these `<code>like so</code>`. It would be much more
cumbersome to first generate a component for this.

In his course [Tailwind CSS from Scratch](https://www.udemy.com/course/tailwind-from-scratch/) by Brad Traversy (from whom I learned a lot in the past!) several projects suffer
from code duplication for exactly this reason. My concern is that he did not
even mention that this is a problem, even copy-pasted code several times. Newcomers
might not understand that code duplication needs to be avoided. Brad Traversy
has hundreds of thousands of followers, and thousands of people start learning
Tailwind via his course, which effectively teaches one of the biggest code smells
out there.

Of course, not every Tailwind course will do this. The issue, however, is
that Tailwind's philosophy nudges you toward code duplication. You have to
actively do something to avoid it. In contrast, Vanilla CSS with
its class system is tailored towards avoiding code duplication. In the
example above, we simply declare a class `.link` once and use it wherever
we like.

Another issue is that your Tailwind-bloated HTML output _does_ contain code
duplication, thereby increasing its file size; more on that later.

The Tailwind docs have a [dedicated page](https://tailwindcss.com/docs/reusing-styles)

on how to deal with Tailwind's inherent code duplication. It is quite astonishing how they downplay the problem. It is claimed that often the code duplication is only in one place and hence can be edited with the multi-cursor feature of your editor. There is so much wrong with this:

-   Code duplication is rarely only in one place. And even if it
    was: how can you guarantee this for sure? Do you always search for the
    whole Tailwind class string through the whole codebase?
-   Multi-cursor editing is cumbersome and error-prone.
-   This approach does not get rid of the code duplication.
-   Their arguments are not Tailwind-specific and try to persuade us
    that code duplication is not a big deal in general. Many decades of
    research and practice in software development by thousands of
    professionals have shown and confirmed that code duplication needs to be
    avoided in every programming language, and Tailwind responds with "Nah
    it's ok because you can edit with multi-cursor". This is just absurd.

They also suggest using loops in your markup, which is a valid approach,
but again only works with frameworks, and does not always fit either. For
instance, when you have three buttons (Login, Logout, Dashboard) in a menu,
do you want to create an array for the button data and loop over them? In
any case, it is so much easier to just declare a `.btn` class
and attach it to the buttons.

And what happens, in this example, when you want to add a fourth button? Do
you want to add a fourth element to an array, just to render a
button? With Tailwind, many developers will instead just copy-paste the
existing code, since this is the easiest Tailwind-compatible solution
here, thus producing code duplication. With regular CSS, you do
not need to touch the `.btn` class at all and just add a button with
that class. It cannot be any simpler, and Tailwind prevents you from doing this.

They also mention component frameworks, which are not always suitable as
already mentioned, and the @apply feature, which will be addressed in a [separate section](#apply).

There is yet another feature of Tailwind that leads to code duplication.
Say you want to style a link when it is focussed or hovered. In these cases,
it should become blue and underlined. With Tailwind, it would look like
this:

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

Tailwind requires you to repeat `hover:` and `focus:` three
times. You need six classes to achieve the styling. With regular CSS, you only
need to specify one selector and three properties. When you want to add another
property (when the link is focussed or hovered), with Tailwind you have to add
three classes. With regular CSS it is just one property.

In general, Tailwind requires you to write `n * m` classes when
you want to have `n` properties across `m` states. The regular CSS version only has
one selector describing the `m` states and then `n` properties,
each in its own line.

The code repetition here is of course bad for maintainability. Say you want
to change `bold` to `semibold`. In the Tailwind code,
you need to make three adjustments. In the CSS code, you just change the
`font-weight` to 600 _once_, and you are done.
