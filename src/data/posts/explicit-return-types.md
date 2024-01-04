---
title: Benefits of explicit function return types in TypeScript
published: 2023-06-20
updated: 2024-01-04
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

Keep in mind that other developers will read your code. Better documentation makes their life easier and also improves code maintainability.

### Example 1

To illustrate this, here is a function from my little [URL shortener](/projects/url-shortener):

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

### Example 2

In the `update_position` method below, it is very convenient to immediately know from its signature that it does not return anything (such as the updated position). We don't have to parse the code.

```typescript
class Ball {
	constructor(
		public x: number,
		public y: number,
		public vx: number,
		public vy: number,
	) {}

	update_position(): void {
		this.x += this.vx;
		this.y += this.vy;
	}
}
```

We can argue that the choice of the method name should already make clear if data is returned or not. But in some cases, the name is not clear enough.

## Wrongly inferred types

Sometimes, the inferred return type by the TypeScript compiler is not the one intended or unnecessarily complex. Then you need to specify the intended return type anyway.

### Example 1

For the function `create_redirection` above, TypeScript infers:

```typescript
type return_type = Promise<
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

Maybe it doesn't make a big difference, but this return type is much more confusing than

```typescript
type return_type = Promise<
	{ errors: string[] } | { shortcut: string }
>;
```

### Example 2

Here is a similar example:

```typescript
function return_something(condition: boolean) {
	if (condition) {
		return {
			message: "ok",
			status_code: 200,
		};
	} else {
		return {
			error: "not ok",
			status_code: 400,
		};
	}
}
```

The inferred return type is

```typescript
type return_type =
	| { message: string; status_code: number; error?: undefined }
	| { error: string; status_code: number; message?: undefined };
```

which is much more complex and repetitive than

```typescript
type return_type = { status_code: number } & (
	| { message: string }
	| { error: string }
);
```

### Example 3

Consider the following TypeScript code.

```typescript
type Coord = [number, number];

function generate_coord(row: number, col: number) {
	return [row, col];
}

function swap_coord(coord: Coord) {
	return [coord[1], coord[0]];
}

const coord = generate_coord(1, 2);
const swapped = swap_coord(coord);
```

The TypeScript compiler will tell you that the last line does not work since `coord` is of type `number[]`, which is not the input type of `swap_coord`. It could not automatically infer `Coord` as the return type of `generate_coord` (same for `swap_coord`). We should better manually type it. Writing

```typescript
function generate_coord(row: number, col: number): Coord {
	return [row, col];
}
```

also provides, again, better documentation of this function.

### Example 4

TypeScript has no problems with the following code, even though it is not type-safe.

```typescript
async function get_api_response() {
	const response = await fetch("/some/api");
	return await response.json();
}

async function process_api_response() {
	const data = await get_api_response();
	console.log(data.message);
}
```

In fact, the inferred return type of `get_api_response` is `Promise<any>`, which means TypeScript allows us to do everything with the awaited return value. But since the API can return _anything_ to us, we should be more careful.

We can do this by providing the explicit return type `Promise<unknown>`. With this adjustment, accessing `data.message` will be recognized as a type error unless we add the necessary checks beforehand.

```typescript
async function get_api_response(): Promise<unknown> {
	const response = await fetch("/some/api");
	const data = await response.json();
	return data;
}

async function process_api_response(): Promise<void> {
	const data = await get_api_response();
	if (
		typeof data === "object" &&
		data !== null &&
		"message" in data
	) {
		console.log(data.message);
	}
}
```

## Correctness

An explicit return type gives you a better chance that the implementation of the function is correct. It implements a _contract_ that validates the implementation.

### Example 1

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

This type of guidance by the TypeScript compiler is very convenient, and it is only possible when using explicit function return types. Again, the advantage is only revealed when working with more complex functions.

When the error annoys me too much during the implementation, I return a dummy value in the beginning.

```typescript
function add_one(a: number): number {
	// TODO
	return 0;
}
```

Continuing this example, with the incorrect implementation of `add_one` TypeScript will not have a problem with it, but for example,

```typescript
const x = add_one(42) + 1;
```

will let it complain about the invalid definition of `x`:

> Operator '+' cannot be applied to types 'void' and 'number'.

In real-world examples, these errors can be anywhere in the codebase, which makes it harder to pin down their actual cause. By writing explicit return types, the error will be alerted exactly where it comes from, making it easier to fix.

### Example 2

Here is another example of an incorrect implementation:

```typescript
function sign(a: number): number {
	if (a < 0) return -1;
	if (a > 0) return +1;
}
```

TypeScript will complain about this function because the inferred return type `number | undefined` does not match the written return type `number`, which eventually makes you realize that you forgot to handle the case `a == 0`. Without adding the return type here, TypeScript would have been happy with the incorrect implementation.

## Refactoring

Say you want to refactor the implementation of a function. How do you know that the implementation is still correct? If unit tests for the function are available, just run them. In practice, this is not always the case.

In any case, it would be good to know that the return type did not change. If we let TypeScript infer the function return type, there is no way to tell this. If an error appears, it will most likely show up elsewhere.

### Example 1

Consider the following function that reverses a string.

```typescript
function reverse_string(str: string) {
	return str.split("").reverse().join("");
}
```

Let's refactor it:

```typescript
function reverse_string(str: string) {
	let reversed = "";
	for (let i = str.length - 1; i >= 0; i--) {
		reversed += str[i];
	}
}
```

Did you immediately recognize the error? Of course, we need to add `return reversed`. But TypeScript was not aware of this error, since it was not aware that you want to return a string. So better to add `string` as a return type so that TypeScript will catch this error for you.

### Example 2

Explicit return types also help to refactor on a large scale, not just single functions. Imagine we want to change the type of coordinates

```typescript
type Coord = [number, number];
```

from above to

```typescript
type Coord = { x: number; y: number };
```

This invalidates the implementation of the function `generate_coord` from above, but TypeScript does _not_ tell us when we don't specify the return type (it will report some errors, but elsewhere). Instead, when we write

```typescript
function generate_coord_1(row: number, col: number): Coord {
	return [row, col];
}
```

it will immediately notice the non-matching return type. So we know that we have to refactor this function.

When you have explicit return types everywhere, this offers an awesome developer experience in which _refactoring is guided by TypeScript_. When we change the data structure and hence the type of some part of the code, TypeScript will immediately alert all the places that need to be adjusted. And when the type errors are gone, usually the refactoring is already complete. This is incredibly useful.

## Performance

Writing explicit return types improves the performance of the TypeScript compiler. To quote from the [TS wiki](https://github.com/microsoft/TypeScript/wiki/Performance#using-type-annotations):

> Adding type annotations, especially return types, can save the compiler a lot of work. In part, this is because named types tend to be more compact than anonymous types (which the compiler might infer), which reduces the amount of time spent reading and writing declaration files (e.g. for incremental builds). Type inference is very convenient, so there's no need to do this universally - however, it can be a useful thing to try if you've identified a slow section of your code.

But I am not sure if this makes a difference in practice.

## Final remarks

If you are working with ESlint and want to enforce writing explicit function return types, there is a plugin for that:
[explicit-function-return-type](https://typescript-eslint.io/rules/explicit-function-return-type/).

There is arguably only one downside in writing explicit return types. You need to write more. But here, Visual Studio Code can help you out, at least when the implementation is already done: Right-click on the function > "Refactor" > "Infer function return type". Alternatively, press `Cmd + .` on Mac or `Ctrl + .` on Windows when the cursor is on the function name, and select "Infer function return type".

TypeScript also infers types in other situations. I would not go so far as to also write explicit types for variable definitions. This is the kind of work the TypeScript compiler should do for us.
