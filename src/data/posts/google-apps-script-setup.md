---
title: Google script development with TypeScript and bundling
published: 2024-06-30
updated: 2024-07-04
description: A setup for developing Google scripts with all the good stuff
---

## Introduction

Google Apps Script is a powerful platform which makes it easy to automate and connect several Google services like Gmail, Google Drive, Google Forms, etc. with JavaScript. Triggers can execute scripts on a time-based schedule or events like form submissions. Consult the [documentation](https://www.google.com/script/start/) for more information.

In this blog post, I will explain how to set up a Google Apps Script project with TypeScript support, multiple files, and bundling in your editor of choice.

## Issues with Google's editor

The usual way of coding a Google script is via the editor on [script.google.com](https://script.google.com). Here, click on "New Project" and start coding in Google's editor. This editor is easy to use and offers many of the features we want, but it has some drawbacks as well.

1. There is no TypeScript support, which is kind of [bad](/blog/typescriptlove).
2. You can write [types with JSDocs](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) and get autocompletion from it. Also, Google's classes like `DocumentApp`, etc. are properly documented and typed with JSDocs. However, there is no way to tell if there is a type error, the JSDocs don't have proper syntax highlighting, and not every type construction is possible in JSDocs.
3. To modularize the code, several files are possible. When you define the constant `const answer = 42` in a file `config.gs`, you can just use it another file `main.gs`. Google itself writes [here](https://developers.google.com/apps-script/guides/import-export#features_and_limitations) that "All of the server files are loaded into the same global namespace". The issue, however, is that there are no _explicit_ import/export statements in the code you see. In fact, you are not allowed to use import/export in a Google script.
4. This makes the code also more error-prone, since your editor will not tell you that something like `console.log(answr)` is wrong. It will error only during runtime.
5. There is no version control with Git.
6. There is no automatic formatting of the code. For example, when you are in team semicolon, you might forget to add some semicolons in the code, and the editor will not tell you, let alone just add them for you. You also need to fix the indentation manually, which sucks.
7. There is no support for dark mode. For Chrome, you may use the extension [AppsScript Color](https://chromewebstore.google.com/detail/appsscript-color/ciggahcpieccaejjdpkllokejakhkome?pli=1). But this has some limitations, for example the menu bar is still light.

## Limitations of clasp

Some of these issues can be solved with **clasp**. This is a tool that lets you develop a Google script locally within your preferred editor (VS Code, Vim, Webstorm, ...) and then sync it with the script hosted on Google's platform. It is very easy to use, more on that later. See also the [documentation](https://developers.google.com/apps-script/guides/clasp).

Some of the issues mentioned above will perhaps be fixed in future iterations on Google's editor. But we don't have to wait for that to happen and may work directly in our editor of choice.

But even with clasp you will still run into linting errors when using multiple files. The variables created in other files are not known. You cannot use import/export either. Clasp supports TypeScript and converts it to JavaScript for you, but its features are [limited](https://github.com/google/clasp/blob/master/docs/typescript.md), in particular, because currently only an old version of TypeScript is supported. It is also awkward that this conversion is only done when the code is pushed to Google.

So what to do instead? My suggestion is to set up a local TypeScript project as you like, then bundle and transpile the files together with a bundler like `esbuild`, and then push just the single output file to Google. This way, all the issues mentioned above are gone. The developer experience is superb.

In the next sections, I will explain step by step how this setup works. I will use the [package manager `pnpm`](https://pnpm.io/), with `npm` and `yarn` the commands are similar.

## First steps with clasp

Obviously, you need a Google account first. Open a terminal and install `clasp` globally with

```bash
pnpm add -g clasp
```

To authenticate yourself, run

```bash
clasp login
```

and follow the steps in the browser. To make clasp work, you also need to activate the Google Apps Script API on [https://script.google.com/home/usersettings](https://script.google.com/home/usersettings).

Create a new folder for your project and navigate to that project in your terminal.

```bash
mkdir clasp-typescript-sample
cd clasp-typescript-sample
```

Create a new [standalone Google script](https://developers.google.com/apps-script/guides/standalone) with clasp.

```bash
clasp create --type standalone --title "choose some nice title"
```

Clasp will tell you the URL of the created Google script. You can either open it manually or run `clasp open`. But currently, it's empty. So let us create the first file.

Open your preferred editor and create `main.js` in the root of the project.

```js
// main.js
console.log('hi mom!')
```

Also notice that the folder already has two files created by `clasp`, namely `.clasp.json` which has the ID of the script, and the so-called manifest file `appscript.json`. Don't worry about these for now.

Now let us push this code to Google with the following command.

```bash
clasp push
```

When you open your Google script (or refresh the page if you already had it open), it will show the file `main.gs`. Notice the extension for Google scripts is `.gs`. But locally you can use the extension `.js` (or `.ts` later).

Sometimes you may also want to edit your script directly in Google's editor in the browser. In this case, you can pull this to your local editor with `clasp pull`. But with the setup of this blog post, I would not recommend doing that. The local folder should be the single source of truth.

You may also now create a Git repository (and commit the changes we make later).

```bash
git init
git add .
git commit -m "setup of clasp"
```

## Installing the dependencies

By now it is already clear that this is a project requiring clasp to work. We also need TypeScript and [esbuild](https://esbuild.github.io/) later. So let us install them right away as dev dependencies.

```bash
pnpm init
pnpm add -D clasp typescript esbuild
```

This means that the _global_ installation of clasp before was redundant. I included this to get started more easily. Make sure to add `node_modules` to the `.gitignore` file.

In `package.json`, let us specify `type=module` and write a script for our push command.

```json
{
	"type": "module",
	"scripts": {
		"push": "clasp push"
	}
}
```

Then `pnpm push` will push our code to Google.

## TypeScript setup

Rename the file `main.js` to `main.ts` and move it to a new folder `src`.

```ts
// src/main.ts
console.log('hi mom!')
```

Generate a [TypeScript configuration file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) `tsconfig.json` in the root of the project and adjust it to your needs.

```json
{
	"compilerOptions": {
		"target": "ESNext",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"moduleResolution": "node",
		"resolveJsonModule": true
	},
	"include": ["src/**/*.ts"]
}
```

We will not use TypeScript to generate JavaScript output files, this will be done in the next step with esbuild. We only use TypeScript to get autocompletion and to ensure type safety and thus avoid runtime errors.

## Bundling with esbuild

We can now also use several files and bundle them together. For illustration, create a new file that has _the_ answer and exports it.

```ts
// src/answer.ts
export const answer = 42
```

Import it in the main file and do something with it.

```ts
// src/main.ts
import { answer } from './answer'

console.log('The answer is', answer)
```

We now create a build script that uses esbuild to bundle the files together into one output file, `dist/code.js`. We also run a type check before.

```json
{
	"scripts": {
		"push": "clasp push",
		"build": "tsc --noEmit && esbuild src/main.ts --bundle --platform=node --outfile=dist/code.js"
	}
}
```

For the transpilation, esbuild uses your `tsconfig.json`.

After running `pnpm build`, the output file will look like this.

```js
// dist/code.js

'use strict'

// src/answer.ts
var answer = 42

// src/main.ts
console.log('The answer is', answer)
```

Unfortunately, I did not find a way to configure esbuild to avoid having the outdated `var` keyword in the output. But it does not matter that much if we keep the TypeScript source files as our single source of truth.

Add the output file `dist/code.js` to the `.gitignore` file.

You may also want to create a dev script that creates the output file as soon as some source file has changed.

```json
{
	"scripts": {
		"dev": "tsc --noEmit && esbuild src/main.ts --bundle --platform=node --watch --outfile=dist/code.js"
	}
}
```

But since we are not running the code here in any way, this might not be necessary, except for debugging purposes as for the bundling process itself.

For the build script, you should not use the `--minify` option by esbuild. The reason is that you want to access the functions in Google's editor by their original names to set up triggers later. (And to my surprise the esbuild option `--keep-names` does not do that.) However, you may use `--minify-whitespace` and/or `--minify-syntax`.

```json
{
	"scripts": {
		"push": "clasp push",
		"build": "tsc --noEmit && esbuild src/main.ts --bundle --minify-whitespace --minify-syntax --platform=node --outfile=dist/code.js"
	}
}
```

Applying both yields the much shorter output

```text
"use strict";console.log("The answer is",42);
```

Minification of your code will probably not be necessary, but once pushed, it will make quite clear that the code in Google's editor should not be touched.

## Adjust clasp

Now since the actual code for the Google script has moved to the `dist` folder, we need to

1. move the `appscript.json` to the `dist` folder
2. Keep the `.clasp.json` in the root, but change the `rootDir` property inside of it to `./dist`.

```json
{ "scriptId": "123456789", "rootDir": "./dist" }
```

You could also move the `.clasp.json` file to the `dist` folder, but this would also require a change of the `push` command like so: `cd dist && clasp push && cd ..`. I do not recommend doing that and instead suggest keeping all the configuration files in the root of the project.

Try if `pnpm push` still works. It should now only upload the `code.js` file to Google. All the TypeScript stuff with multiple files is just for your local development pleasure.

## Formatting

You can set up the formatting in this project to your needs and let the editor do all the manual work for you. For example, if you are using Prettier, add a configuration file `.prettierrc` in the root.

```json
{
	"useTabs": true,
	"printWidth": 120,
	"semi": true,
	"trailingComma": "all",
	"singleQuote": false
}
```

To not (automatically) format the output file, add `dist/code.js` in the file `.prettierignore`.

This alone is an argument for using clasp, even when you are mainly developing in Google's editor and do not follow the setup here. From time to time, do `clasp pull`, format locally, do `clasp push`, and the formatting is done.

## Google services

When the Google script is accessing Google's services via classes such as `SpreadsheetApp`, you want to add the corresponding types so that you get autocompletion and also no type errors in your local editor.

```bash
pnpm add -D @types/google-apps-script
```

For example, if you are dealing with a script that is [bound to a spreadsheet](https://developers.google.com/apps-script/guides/bound), you can now safely access that spreadsheet with

```ts
const sheet = SpreadsheetApp.getActiveSpreadsheet()
```

When writing `sheet.` you will get a very convenient list of all the available methods on the sheet. Notice that this is also true for Google's editor in the browser, and it is even better there since JSDocs provide comprehensive documentation. In my experience, these JSDocs often make it unnecessary to consult the documentation pages by Google. Unfortunately, they are not present in our local editor.

## Triggers

There is still an issue with [triggers](https://developers.google.com/apps-script/guides/triggers/installable) that we need to address.

Say you have implemented a function that syncs events from a Google calendar with a Google spreadsheet.

```ts
// src/main.ts
function sync_calendar_events() {
	// some logic
}
```

As soon as this function is implemented in the Google script, you can add a trigger for this function that executes it, say, every hour.

Try to add the function above to `main.ts`, run `pnpm build`, and have a look at `dist/code.js`. The function is not there. The reason is that the function is not used, and esbuild automatically gets rid of unused code, also when you don't minify.

The function will be there when you add

```ts
// src/main.ts
sync_calendar_events()
```

to the code. However, this is not what we want. Whenever any function in the script is run via a trigger, the rest of the code is run as well. This means that the function `sync_calendar_events` will always be executed, even if you don't want that. In particular, in the trigger for `sync_calendar_events` itself, the function will be run twice.

I tried to find a clean solution to this problem and convince esbuild to include unexecuted functions, but I did not succeed. There is a workaround, though.

The trick is to somehow use the function without executing it. For example:

```ts
// src/main.ts
if (1 < 0) console.log(typeof sync_calendar_events)
```

Alternative:

```ts
// src/main.ts
const isOK = typeof sync_calendar_events === 'function'
if (!isOK) console.warn('function is not defined!')
```

You are probably ...triggered by this piece of code. And I am too. It is stupid. The if-condition is always false, so the code in the if-block is not run. But at least, it does the job.

When you now run `pnpm build`, the function (and the stupid code) _will_ be in the output. In particular, you will be able to add a trigger for the function.

The problem can also not be solved by executing the function in some other file, since remember that in the end there will be just one output file, either explicitly via our build process, or implicitly via Google's internal bundling.

Also, the problem remains when implementing triggers by code, since here functions are just referenced by their names, which are strings.

```ts
ScriptApp.newTrigger('sync_calendar_events').timeBased().everyHours(1).create()
```

In other words, even with this piece of code neither your editor nor esbuild will know that the function is being used.

If you really want to get rid of the stupid code, a post-build script can do this for you automatically. That is, write some cleanup logic in `cleanup.js` for `dist/code.js`, and then execute it like so:

```json
{
	"scripts": {
		"build": "tsc --noEmit && esbuild src/main.ts --bundle --platform=node --outfile=dist/code.js && pnpm cleanup",
		"cleanup": "node cleanup.js"
	}
}
```

If you know better approaches, please let me know.

## What about web apps?

Google scripts can also be deployed as [web applications](https://developers.google.com/apps-script/guides/web). These are usually written in Vanilla JavaScript. It seems plausible that the setup here can be extended in such a way that also web frameworks such as my beloved [Svelte](https://svelte.dev) can be used for Google web apps. A quick search brought up two repositories ([gas-svelte-app](https://github.com/mikedownesdev/gas-svelte-app), [Google-Apps-Script-Svelte-Starter](https://github.com/thinkle/Google-Apps-Script-Svelte-Starter)) doing exactly this. Maybe this is the topic for another blog post then.
