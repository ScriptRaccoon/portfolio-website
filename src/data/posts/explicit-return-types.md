---
title: Benefits of explicit function return types in TypeScript
published: 2023-06-20
updated: 2023-06-24
description: Explicit return types improve documentation, code correctness and the refactoring experience.
---

## Introduction

TypeScript offers the feature to infer function return types automatically for you. In most cases, the inferred return type is exactly the one you want.

Here is a simple example.

```typescript
function add_one(a: number) {
    return a + 1;
}

const x = add_one(42);
```

When hovering over the function in Visual Studio Code, the tooltip reads

```typescript
function add_one(a: number): number;
```

so that the return type is inferred correctly. Also, the type of `x` is inferred correctly. It is of type `number`.

Still, there is a case for writing down the function return type explicitly like so:

```typescript
function add_one(a: number): number {
    return a + 1;
}
```

Here are **five benefits** of explicit return types:

## Documentation

When you check the code on GitHub, for example for a code review, you cannot see the inferred return type. The type becomes only visible when it is written down as part of the code.

Above, we had a quite simple example, where this is not a big deal. But with more complex functions, it is very useful to see the return type already directly in the line where the function definition starts. It provides better documentation.

This also comes in handy when working in the editor since you do not need to hover anything to see the return types. You can just read it. The code is better self-documented, which makes it cleaner.

To illustrate this, here is a more complex function from my little [URL shortener](/projects/urlshortener):

```typescript
export async function create_redirection(
    url: string,
): Promise<{ errors: string[] } | { shortcut: string }> {
    const connection = await connect_to_db();
    if (!connection) {
        return { errors: ["No database connection."] };
    }

    const visits = 0;
    const shortcut = id();
    const redirection = new Redirection({ shortcut, url, visits });

    const error = redirection.validateSync();

    if (error) {
        return {
            errors: Object.values(error.errors).map((e) => e.message),
        };
    }

    try {
        await redirection.save();
        return { shortcut };
    } catch (e) {
        console.log(e);
        return { errors: ["Internal server error."] };
    }
}
```

Quite a bit is happening here, but right away in the third line you already know that the function is async and returns an array of errors or a shortcut, without looking at the implementation.

Also, keep in mind that other developers will read your code. Better documentation makes their life easier and also improves code maintainability.

## Wrongly inferred types

Sometimes, the inferred return type is not the one intended. For the function `create_redirection` above, TypeScript infers:

```typescript
interface Promise<
    | {
          errors: string[];
          shortcut?: undefined;
      }
    | {
          shortcut: string;
          errors?: undefined;
      }
>;
```

which is not quite right (ignore the `interface` which was only added for proper syntax highlighting). Maybe it doesn't make a big difference, but this return type is much more confusing than

```typescript
interface Promise<{ errors: string[] } | { shortcut: string }>;
```

JavaScript has a built-in function that generates unique, random IDs:

```javascript
crypto.randomUUID();
```

Unfortunately, the return type is a concatenation of five strings. You probably want to view this just as a string. So when you use this function within a function that generates an object containing an ID, the inferred return type is probably not the one you want. You need to make it explicit.

## Correctness

An explicit return type gives you a better chance that the implementation of the function is correct.

Assume we change the implementation of our previous `add_one` function as follows.

```typescript
function add_one(a: number) {
    a += 1;
}
```

This means that the implementation is not correct, but TypeScript does not tell us, since there is no explicit return type that describes the intention of the function. The inferred return type is `void`. If we had added the return type `number`, TypeScript would detect an error, telling us that

> A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.

In general, when I start to implement a function, I think about what types of arguments it has and what type of return value it produces. In the above example, I would therefore just start to write:

```typescript
function add_one(a: number): number {
    // TODO
}
```

TypeScript will inform me right away that this is not correct, since I do not return a number. Then I write the implementation, and when this is finished, the type error should go away. If not, there is a very good chance that my implementation is not correct, yet.

This type of guidance by the TypeScript compiler is very convenient, and it is only possible when using explicit function return types. Again, the advantage only reveals when working with more complex functions.

When the error annoys me too much during the implementation, I return a dummy value in the beginning.

```typescript
function add_one(a: number): number {
    // TODO
    return 0;
}
```

Here is another example of an incorrect implementation:

```typescript
function sign(a: number): number {
    if (a < 0) return -1;
    if (a > 0) return +1;
}
```

TypeScript will complain about this function because the inferred return type `number | undefined` does not match the written return type `number`, which eventually makes you realize that you forgot to handle the case `a == 0`.

## Refactoring

Say you want to refactor the implementation of a function. How do you know that the implementation is still correct? If unit tests for the function are available, just run them. In practice, this is not always the case.

In any case, it would be good to know that the return type did not change. If we let TypeScript infer the function return type, there is no way to tell this. If an error appears, it will most likely show up elsewhere.

Consider the following example.

```typescript
function add_one(a: number) {
    a += 1;
}

const x = add_one(42) + 1;
```

TypeScript has no problem with the function, it will only complain about the invalid definition of `x`:

> Operator '+' cannot be applied to types 'void' and 'number'.

In real world examples, these errors can be anywhere in the codebase, which makes it harder to pin down their actual cause. By writing an explicit return type, the error will be alerted exactly where it comes from, making it easier to be fixed.

## Performance

Writing explicit return types improves the performance of the TypeScript compiler. To quote from the [TS wiki](https://github.com/microsoft/TypeScript/wiki/Performance#using-type-annotations):

> Adding type annotations, especially return types, can save the compiler a lot of work. In part, this is because named types tend to be more compact than anonymous types (which the compiler might infer), which reduces the amount of time spent reading and writing declaration files (e.g. for incremental builds). Type inference is very convenient, so there's no need to do this universally - however, it can be a useful thing to try if you've identified a slow section of your code.

## Final remarks

If you are working with ESlint and want to enforce writing explicit function return types, there is a plugin for that:
[explicit-function-return-type](https://typescript-eslint.io/rules/explicit-function-return-type/).

There is arguably only one downside in writing explicit return types. You need to write more. But here, Visual Studio Code can help you out, at least when the implementation is already done: Right-click on the function > "Refactor" > "Infer function return type". Alternatively, press `Cmd + .` on Mac or `Ctrl + .` on Windows when the cursor is on the function name, and select "Infer function return type".

TypeScript also infers types in other situations. I would not go so far as to also write explicit types for variable definitions. This is the kind of work the TypeScript compiler should do for us.
