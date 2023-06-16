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
This post attempts to give a summary of them. I have also included my own
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

```
div {
  margin-top: 1rem;
  color: #991b1b;
  display: flex;
  align-items: center;
}
```

in a CSS file, with Tailwind you write the following directly in your HTML:

```
<div class="mt-4 text-red-800 flex items-center">...</div>
```

Check the [Tailwind Docs](https://tailwindcss.com/docs) for more details.

Tailwind makes the following promises (and some others as well):

- Write CSS faster
- Unified design system
- Avoids switching between HTML and CSS files
- Smaller bundle size

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

```HTML
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
      <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
        In stock
      </div>
    </div>
    <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
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
          <input class="sr-only peer" name="size" type="radio" value="s" />
          <div
            class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
          >
            S
          </div>
        </label>
        <label>
          <input class="sr-only peer" name="size" type="radio" value="m" />
          <div
            class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
          >
            M
          </div>
        </label>
        <label>
          <input class="sr-only peer" name="size" type="radio" value="l" />
          <div
            class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white"
          >
            L
          </div>
        </label>
        <label>
          <input class="sr-only peer" name="size" type="radio" value="xl" />
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
        <svg width="20" height="20" fill="currentColor" aria-hidden="true">
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
disadvantages, in particular with regards to maintainability and
readability:

First of all, the Tailwind classes for one element are gathered inside of a
long horizontal string, a "class soup". This happens even though the snippet
uses Prettier with a maximal print-width of 80: Prettier cannot linebreak
long string literals. This makes it hard to find which property resp.
utility class you need to adjust. Often you need to scroll. And even if you
turn on word wrap in your editor, or take the manual work to indent the
lines somehow, it takes time to find the relevant class. Adjusting a single
property is much easier with regular CSS, since here every property has its
own line as a key value pair.

Readability is also negatively impacted by the lack of syntax highlighting:
Tailwind class names are just displayed as strings. Also, they tend to be
short but not descriptive enough (more on that later).

Another problem is that the actual text content in the markup is harder to
find, because it is "hidden" between the dozens of class names.

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
is <i>ugly</i>. Although this impression is clearly subjective, it is
closely connected to the (more objective) lack of readability of the code.
Many people initially share this feeling that Tailwind code is ugly, but got
used to it after some time. This did not happen to me, though.
Other aspects of maintainability will be covered in the sections below.</p>

What do the [Tailwind Docs](https://tailwindcss.com/docs/utility-first) write about maintainability?

> "[...] maintaining a utility-first CSS project turns out to be a lot easier than maintaining a large CSS codebase, simply because HTML is so much easier to maintain than CSS. Large companies like GitHub, Netflix, Heroku, Kickstarter, Twitch, Segment, and more are using this approach with great success."

There is literally no justification for the claim that HTML is easier to
maintain than CSS, in particular when it is littered with utility classes
and no descriptive <a href="#class_names">class names</a>. Then they go
ahead and tell us how many companies already use Tailwind. This is just poor
marketing inside of a documentation page (?!) and does not tell us anything
about why Tailwind is maintainable (which it isn't).

TO BE CONTINUED ...
