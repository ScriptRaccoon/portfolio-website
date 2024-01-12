---
title: How not to use TypeScript
published: 2024-01-10
updated:
description: and common misconceptions about TypeScript
---

## Introduction

Some JavaScript developers have problems when switching to TypeScript or even have aversions against TypeScript and will never use it. And some developers may use TypeScript, but use it in a "wrong" way. All of this is rooted in a couple of misconceptions about TypeScript. Let's see what they are and how to use TypeScript properly instead.

I already wrote about [Why I love TypeScript](/blog/typescriptlove) before, and there will be some duplication here.

## Ignoring the TypeScript compiler

I have seen developers writing JavaScript code inside of TypeScript files, letting the TypeScript compiler complain about type errors, ignore the type errors, and just keep writing JavaScript code and only (much) later try to add the types. This is a mistake. It will lead to a quite frustrating developer experience, coupled with several misconceptions about TypeScript.

1. We will get the (wrong!) impression that TypeScript is just about adding unnecessary stuff to our otherwise perfect JavaScript code (after all, the code also worked in the browser without the types).
2. We get the (wrong!) impression that TypeScript just introduces errors that would not even exist in the first place when writing plain JavaScript.
3. We get the (wrong!) impression that the TypeScript compiler works _against_ us.

When using this (bad) method, we will spend quite a lot of time fixing type errors, and it feels annoying. I have been there, too, by the way.

But this is not what TypeScript is made for.

## TypeScript is a programming language

First of all, we should imagine that TypeScript is a whole new language. We don't write JavaScript with extra stuff on top. We should write TypeScript. Let's even imagine we write code for a browser in the future that _only_ understands TypeScript. When the TypeScript compiler throws an error, this is not just some sign of bad quality of our code: it will mean that our code will crash, and so we should _immediately_ do something about it.

In the real world as it is now, the code will perhaps not crash, and browsers don't understand TypeScript without the compilation step in between, but the picture is helpful nonetheless, in particular, because code that is not type-safe will have a much higher chance to crash.

Assuming that we already decided to work with TypeScript, we should take this plan seriously and read what the TypeScript compiler has to say. Otherwise, we will end up with a lot of errors such as "cannot read property x of undefined" during runtime which can easily be avoided.

## The compiler is our companion

What the TypeScript compiler says is not just some random annoying message. It is pointing to an issue in our code that we should fix. Now. Why not postpone it? Because the type errors will pile up, and fixing many errors later is more complex and will certainly be more frustrating.

Instead of imagining the TypeScript compiler as someone working against us making progress, we should see it as a companion, guiding us to write bug-free and better code. When we ignore its advice, we will regret it sooner or later. When the message is cryptic, we can ask our favorite search engine or ChatGPT for some explanation. After some time, we will notice that we get less and less errors, and even when they occur, we will know what to do.

One of the best experiences when writing TypeScript is refactoring and restructuring code. When we change, say, the signature of one function because we decide to change how the data flows, other parts of the codebase have to be adjusted as well. The TypeScript compiler will immediately tell us all the places that need to be adjusted. There is _nothing_ like that in plain JavaScript land.

When using the TypeScript compiler this way, as a tool to restructure our code, it is hard to work without such a tool anymore (or work with any dynamically typed language, for that matter).

## Write type-safe code

We should get into the habit of writing type-safe code in the first place (thus, getting fewer Type errors). This means avoiding the `any` type (always) and avoiding typecasting if possible, since these will undermine the benefits of TypeScript. Using TypeScript's `strict` compiler option is also beneficial since it gives us the most secure form of type checking.

For example, when we write a function that expects some argument `x` of which we don't know the type yet, we _don't implement the function_ and write something like `myFun(x) {...}`. It's too early. The first job is to find out the type of that argument `x`. The same goes for the return type of that function (I have written about [return types](/blog/explicit-return-types) before). When we don't know it, maybe it is best to sit back and think about how to define the return type first.

Also, when we get annoyed that TypeScript tells us that an object might be `null` so that accessing some of its properties is not secure: we should not just ignore this hint or even use `!` or any other workaround to mute the TypeScript compiler. Instead, we create an `if`-clause to check if that object is not `null`. Alternatively, we can introduce an early return if it is `null`.

## Thinking in types

When initializing, say, an array of objects, we most certainly already know what _type_ (in the informal sense of that word) of objects will be added to this array. So we should not write `const items: Array<any> = []` or even just `const items = []` (this is JavaScript, not TypeScript). Instead, we can use the informal idea of the type to create a type alias, say `type Item = {...}` and then write `Array<Item>` or `Item[]` to properly type that array of items. TypeScript will help us (or force us, if you will) to document and write down the concepts we already have in our minds anyway. As a result, the code will become much more readable, documented and type-safe.

## Transforming JS to TS

Once I had the idea to add types to an existing JavaScript project. There was no plan to expand the functionalities of the project, just to "improve" its structure by making the code type-safe. It was not easy, but somehow I managed to do it.

It was nonsense.

TypeScript is not something you need to add to existing JavaScript code. The compiler removes the types anyway. As explained before, TypeScript, more than anything else, changes your development workflow. When you didn't use it while writing the original JavaScript code, you have actually lost all of its benefits.

Having said this, transforming a JavaScript project to a TypeScript project only makes sense if you want to keep working on this project for a long time. If this is not the case, just take this as a learning and better start every upcoming web development project with TypeScript by default.

## Example

Let me explain all of this more concretely with an example.

Let's say we want to create a quiz app. For rendering the questions, we probably need an array of questions. What does a question consist of? Maybe the question itself, the list of answers, and the correct answer - which we can encode with its index in the list of all answers. So we _first_ create a type

```typescript
type Question = {
	text: string;
	answers: string[];
	correct_answer_index: number;
};
```

and only now we can create the list of questions, fill it in later and render it with our [favorite web framework](https://svelte.dev).

```typescript
const questions: Question[] = [];
```

At some point, we will need to evaluate the user's answer to a given question. So we implement for example a function with the signature

```typescript
function evaluate(question: Question, answer: number): boolean {
    ...
}
```

We add the types before actually implementing the function so that we and also the TypeScript compiler know what sorts of objects we deal with. In case we make a mistake during the implementation (for example, when we accidentally write `question.correct_answer`), the TypeScript compiler will most likely tell us.

Now let's imagine we have implemented the whole quiz app, but we want to add a new feature: the user should be able to choose a difficulty for the quiz. So obviously, each question also should have a corresponding key for storing its difficulty. What difficulties are there? We could model these with numbers `0,1,2` (where `2` is the most difficult one), or with strings, but we can always change that later. What's important now is that we add this to our type.

```typescript
type Question = {
	text: string;
	answers: string[];
	correct_answer_index: number;
	difficulty: number;
};
```

Immediately we get some errors, for example when we create a question from some sample data or API, probably it will not have the difficulty set. But this is _not_ an annoying error. It is just the TypeScript compiler helping us to do the next step of the implementation, namely adding the difficulty to each question we create.

Next, we will probably implement some functionality for filtering or selecting the questions by difficulty. Because of our approach, we will have a nice autocompletion from TypeScript when we write `question.` (where `question` is of type `Question`), it will suggest to us the newly added `difficulty` property. When we accidentally perform actions with that difficulty that do not work with numbers, the TypeScript compiler will help us to catch these mistakes during development. That's very nice!

We should _not_ start this whole feature by implementing this filtering function first, since we would immediately run into type errors, don't get any autocompletion from TypeScript, and also have no idea what type of value `question.difficulty` actually is.
