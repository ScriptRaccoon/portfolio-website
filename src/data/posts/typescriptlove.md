---
title: Why I Love TypeScript
published: 2023-06-17
updated: 2023-06-17
description: TypeScript is used for autocompletion, better documentation and understanding of code, and to reduce bugs.
---

## Introduction

TypeScript and I weren't good friends from the start. I despised it and thought that it slows me down because I need to need to write more code and get more errors during development. It was a hassle to fix them. I thought that I can be more "free" when writing plain JavaScript. This has changed quite a bit ...

Today, I never write non-typed JavaScript unless there are technical reasons which prevent me from writing TypeScript. This is because this language gives me extra features and a far better development experience which I do not want to miss anymore. Even for small projects or quick animations such as [this one](/projects/pixel-animation) I use TypeScript.

Let me explain what I love about TypeScript, in combination with Visual Studio Code.

## Autocompletion

Whenever I begin to type something, TypeScript gives me indications of how it can be completed. This speeds up the development process a lot since I can just accept the completion by Enter or Tab. There is no need to write down all the letters. When multiple completions are possible, I navigate to the correct one with the arrow keys.

I like this in particular with SvelteKit. Say you are in a `load` function of the route `/blog/[id]`. It accepts an event object, which is automatically typed. When I type `event.` (with the dot at the end) I get a list of all possible functions and properties on the event object. One of these is `event.params`. When I type this and add another dot, I get the _only_ possible parameter `id` already autocompleted. I just need to accept with "Enter". So the following code is written basically in no time.

```typescript
export const load = async (event) => {
    const id = event.params.id;
    // ...
};
```

And there is no need to guess or remember if the property was called `searchParams` or `parameters` or something else. If you write something which doesn't fit the type definition of the event object, the TypeScript compiler will yell at you. This, of course, also means that you will produce fewer bugs!

Autocompletion is even more useful when you are working with an object or an API you are not very familiar with. For example, when you are new to [Supabase](https://supabase.com) and you use their JavaScript / TypeScript client, it is just so nice that you only need to type `await supabase.` to get all the functions the Supabase client offers. For example, the following code inserts an array of posts into a corresponding table.

```typescript
await supabase.from("posts").insert(posts);
```

You don't need to learn or remember the syntax! Autocompletion will guide you. And even more: if the array of posts does not fit the database schema (which you can import as a type definition file), you will get an error, during development!

## Documentation

Consider the following function in JavaScript:

```javascript
function remove_duplicates(array) {
    // ...
}
```

Without looking at the implementation, can you be sure if this function returns a new array without duplicates, or instead if it mutates the array in place and does not return anything? These two options can be documented much better in TypeScript:

```typescript
function without_duplicates<T>(array: T[]): T[] {
    // ...
}

function remove_duplicates<T>(array: T[]): void {
    // ...
}
```

It is immediately clear, both from the name and the type declarations, that the first function returns a new array, without duplicates, while the second function mutates the given array. You don't have to look at the implementation. This, by the way, is also the reason why I like to write down function return types even though they usually can be inferred correctly.

When you use these functions somewhere else in the codebase, you can just hover over them and immediately see the return type. And the TypeScript compiler will yell at you when you write something like

```typescript
let tags: string[] = remove_duplicates(["..."]);
```

since the return type of the function does not match with the variable type.

## What is this?

At my job, we mostly do not use TypeScript. As a consequence, often I just do not know what the variables are exactly. A typical situation is that a variable is declared like this:

```javascript
const similar_products = [];
```

Alright, this will be an array containing all the similar products. But which properties do these objects have? Sometimes, you can already derive from the existing code which properties are present, but

-   there could be more properties
-   nothing guarantees us that these properties are _actually_ there before we execute the code
-   often I need other properties as well

As a consequence, I need to do a lot of time-consuming console logging.

This is so much easier with TypeScript. First, we make a single console log of a product which leads us to the definition of a type (an interface would also work). It could look as follows.

```typescript
type product = {
    id: string;
    name: string;
    quantity: string;
    colors: string[];
    sizes: string[];
    price: string;
    discounted: boolean;
    brand: string;
};
```

Then, we declare the array like so:

```typescript
const similar_products: product[] = [];
```

Now, when we loop over the array (later, when it has some entries)
to render the products, I know exactly which properties can be accessed.

```svelte
{#each similar_products as product (product.id)}
    <h2>{product.name}</h2>
{/each}
```

Of course, the `name` is autocompleted. The TypeScript compiler will error when I type `displayName` instead.

## Refactoring

TypeScript helps a lot during refactoring code. After the first change of implementation, it guides you (via its type errors) on which other changes need to be made.

Say, you have a function that draws a circle on a canvas:

```typescript
export function draw_circle(x: number, y: number, r: number) {
    // ...
}
```

You execute this function in multiple places of the codebase. It could look like this:

```typescript
draw_circle(10, 10, 2);
```

At some point, you realize that this function call is not very explicit. The meaning of the three parameters is not clear when reading just the function call. So you refactor the function definition as follows:

```typescript
export function draw_circle(options: {
    x: number;
    y: number;
    r: number;
}) {
    // ...
}
```

TypeScript will immediately tell you that the function call above is not correct anymore:

> Expected 1 arguments, but got 3.

When you hover over the function, you see the type it expects. So you change the function call to

```typescript
draw_circle({ x: 10, y: 10, r: 2 });
```

and TypeScript is happy. This also means that it is very likely that your code will be working again. Of course, JavaScript would not have told you anything about the bug you need to fix.

This is a rather trivial example. But even bigger refactorings are like a charm with TypeScript. Often, you find that a change produces a "cascade" of type errors. And this is good. You fix these type errors one by one. And when you are done, usually your refactoring is complete!

## Fewer bugs

We have already seen in the previous sections why TypeScript will prevent us from writing stupid bugs. The type errors tell us _during development_ which bugs will most likely appear when running the code. I cannot stress enough how convenient this feature is. This is even more true in big codebases when reloading the dev server and logging can be very time-consuming.

For example, how many times did we encounter the following type of error when running JavaScript code?

> Uncaught TypeError: Cannot read properties of undefined (reading 'age')

How many hours did we spend debugging such issues? When we pay attention to the
errors detected by TypeScript during development _and_ avoid the type `any`, with TypeScript this error will (almost) never happen again.

## Conclusion

In the introduction, I wrote that I felt more "free" writing JavaScript. Well, from today's perspective, this was merely the freedom to produce more bugs, and I am very OK with losing this freedom.

TypeScript is JavaScript with superpowers. If you haven't done it yet, give it a try. The [official documentation](https://typescriptlang.org/docs) is very good. If you know German, you can also have a look at my [YouTube crash course](https://www.youtube.com/watch?v=I4w4zO8AVes) on TypeScript.
