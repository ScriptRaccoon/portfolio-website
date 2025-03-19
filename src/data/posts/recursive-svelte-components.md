---
title: Recursive Svelte components
published: 2025-03-19
updated:
description: Svelte components may render themselves. We demonstrate this with practical applications and visualizations of fractals.
---

## Preliminaries

A Svelte component may render itself. This pattern has several practical applications, but it also makes it possible to visualize fractals in Svelte. In this blog, post we will have a closer look at these.

![Pythagorean Tree Visualization](/media/blog/recursive-tree.png)

Notice that the code for this blog post can be found at [GitHub](https://github.com/ScriptRaccoon/recursive-svelte-components). An interactive visualization of a collection of recursive Svelte components is available [on this site](https://recursive-svelte-components.netlify.app/).

## Introduction

When a component is supposed to render itself, one has to prevent infinite loops. One way of doing this is to have a prop called `depth` which increases with every call and has a maximum `MAX_DEPTH`. Another way is using a prop called `maxDepth` which decreases with every call and has `0` as the minimum. We take the latter approach, since it involves less code.

So the basic structure of a recursive component `A.svelte` looks as follows.

```svelte
<!-- A.svelte -->

<script lang="ts">
	// self-import:
	import A from "./A.svelte";

	let { maxDepth }: { maxDepth: number } = $props();
</script>

{#if maxDepth >= 0}
	<!-- The component renders itself! -->
	<A maxDepth={maxDepth - 1} />
{/if}
```

Then in your app you may call it as follows.

```svelte
<!-- App.svelte -->

<A maxDepth={10} />
```

Notice that in older versions of Svelte you needed to use the special component `<svelte:self>` for a recursive component, but that is not needed anymore. You can just import `A` inside of `A`. The only issue that I encountered is that Visual Studio Code does not import it automatically when I use it.

## The Sierpinski Carpet

Let us start by visualizing the [Sierpinski carpet](https://en.wikipedia.org/wiki/Sierpi%C5%84ski_carpet) with a recursive Svelte component.

![Preview of Sierpinski Carpet](/media/blog/recursive-carpet-small.png)

The idea is to have a grid of size 3x3, fill the inner square, and apply recursion to the 8 outer squares. To achieve this, we create a component `Carpet.svelte` which does exactly this. In the script tag, we just declare `maxDepth` as explained before.

```svelte
<script lang="ts">
	import Carpet from "./Carpet.svelte";

	type Props = {
		maxDepth: number;
	};

	let { maxDepth }: Props = $props();
</script>
```

The markup has the grid of size 3x3. In each cell we render a div. It will be filled in the center, and otherwise inside of that div we render the component itself, decreasing the maximal depth. The whole block is guarded by a check for `maxDepth >= 0` to prevent an infinite loop.

```svelte
{#if maxDepth >= 0}
	<div class="grid">
		{#each { length: 3 } as _, i}
			{#each { length: 3 } as _, j}
				{@const isCenter = i === 1 && j === 1}
				<div class:filled={isCenter}>
					{#if !isCenter}
						<!-- The component renders itself! -->
						<Carpet maxDepth={maxDepth - 1} />
					{/if}
				</div>
			{/each}
		{/each}
	</div>
{/if}
```

Here are the styles:

```svelte
<style>
	.grid {
		/* for square-shape: */
		aspect-ratio: 1;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
	}

	.filled {
		/* choose any color you like: */
		background: white;
	}
</style>
```

Then, anywhere in our application, we may render the carpet like so:

```svelte
<Carpet maxDepth={4} />
```

In the [visualization here](https://recursive-svelte-components.netlify.app/carpet) I also added a range input that allows you to change the maximal depth. It makes sense to limit that number since already for a maximal depth of 5 the browser has too muck work to do.

## Folders and Files

On a more practical side of things, imagine you want to develop a file explorer in Svelte. Each folder consists of folders and files, so the display of a folder will be recursive.

![Preview of folders with files and subfolders](/media/blog/recursive-folder-small.png)

These are our types:

```ts
// types.ts

export type FileData = {
	name: string;
	extension: string;
};

export type FolderData = {
	name: string;
	files: FileData[];
	subfolders: FolderData[];
};
```

First, we create a component to render a file. This is not recursive and quite simple. We also use an icon to make it obvious that it is a file.

```svelte
<!-- File.svelte -->

<script lang="ts">
	import Fa from "svelte-fa";
	import { faFileAlt } from "@fortawesome/free-regular-svg-icons";

	import type { FileData } from "./types";

	let { file }: { file: FileData } = $props();
</script>

<div>
	<Fa icon={faFileAlt} />
	{file.name}.{file.extension}
</div>
```

The folder component is recursive. Besides from the folder data, we also save the information if the component is open or closed, and make the necessary imports for later.

```svelte
<script lang="ts">
	import Fa from "svelte-fa";
	import {
		faFolderClosed,
		faFolderOpen,
	} from "@fortawesome/free-regular-svg-icons";

	import File from "./File.svelte";
	import Folder from "./Folder.svelte";
	import type { FolderData } from "./types";

	type Props = {
		folder: FolderData;
		open?: boolean;
	};

	let { folder, open = false }: Props = $props();
</script>
```

To achieve the open-close mechanism without any JavaScript, we simply use the HTML native `<details>` element (along with its `<summary>` child).

```svelte
<details bind:open>
	<summary>
		<Fa icon={open ? faFolderOpen : faFolderClosed} />
		{folder.name}
	</summary>

	<ul>
		<!-- TOOD -->
	</ul>
</details>
```

In the list, we first render all subfolders and then all files.

```svelte
<ul>
	{#each folder.subfolders as subfolder}
		<li>
			<!-- The component renders itself! -->
			<Folder folder={subfolder} />
		</li>
	{/each}

	{#each folder.files as file}
		<li>
			<File {file} />
		</li>
	{/each}
</ul>
```

Notice that this recursion will end automatically after finitely many
steps since for our initial `folder` object we cannot have infinitely many
nested `.subolders` inside.

Some styles are necessary to make this look good, in particular to indent the list. Thanks to Svelte's scoped styles, we may style via element selectors.

```svelte
<style>
	summary {
		/* removes triangle */
		list-style: none;
	}

	summary::-webkit-details-marker {
		/* removes triangle for webkit */
		display: none;
	}

	ul {
		/* indent the list to the right */
		translate: 1.5rem 0;
		list-style: none;
	}
</style>
```

To use that anywhere in your Svelte application, write:

```svelte
<Folder folder={sampleFolder} />
```

You can see the result [on this site](https://recursive-svelte-components.netlify.app/folders).

## The Fibonacci Sequence

The [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_sequence) may be generated with Svelte. We mimic the definition

<math>F_n = F\_{n-1} + F\_{n-2}</math>

by saying that the component `Fibonacci.svelte` calls itself twice, once with a decrement index and once with a two-times decremented index. When the index is one, we simply render exactly one block (since <math>F_1 = 1</math>), and we render nothing when the index is zero (since <math>F_0 = 0</math>). This means that eventually we have rendered <math>F_n</math> many blocks.

```svelte
<script lang="ts">
	import Fibonacci from "./Fibonacci.svelte";

	let { index }: {index: number }; = $props();
</script>

{#if index === 1}
	<div class="block"></div>
{:else if index >= 2}
	<!-- The component renders itself! -->
	<Fibonacci index={index - 1} />
	<Fibonacci index={index - 2} />
{/if}
```

Style the `block` in any way you like. Then, for example `<Fibonacci index={8} />` renders 21 blocks since <math>F_8 = 21</math>. The consumer of that component may also count the blocks with some Vanilla JS and inscribe their number (as is done [here](https://recursive-svelte-components.netlify.app/fibonacci)) and play around with the controls.

![21 Blocks counting the 8th Fibonacci number](/media/blog/recursive-fibonacci.png)

## Pythagorean Tree

The [Pythgorean tree](<https://en.wikipedia.org/wiki/Pythagoras_tree_(fractal)>) is a fascinating fractal that we may generate with recursive Svelte components as well. You can see it [here](https://recursive-svelte-components.netlify.app/tree).

![Pythagorean Tree Visualization](/media/blog/recursive-tree.png)

The idea of the recursion is quite simple: on top of a square (or rather the bottom, since we draw from top to bottom here), we create a right triangle at a certain angle. The two open sides of that triangle form the base of a another square, etc. The implementation involves some math which I will explain below.

We start with the script tag of our `Tree.svelte`, where we declare the maximal depth, the angle (which remains constant through all iterations), and the current size of the square as props.

```svelte
<!-- Tree.svelte -->

<script lang="ts">
	import Tree from "./Tree.svelte";

	type Props = {
		maxDepth: number;
		angle: number;
		size: number;
	};

	const unit = Math.PI / 180; // converts degrees to radians

	let { maxDepth, size, angle }: Props = $props();
</script>
```

The basic idea of the markup is the following.

```svelte
{#if maxDepth >= 0}
	<div class="square">
		<div class="left">
			<!-- The component renders itself! -->
			<Tree
				maxDepth={maxDepth - 1}
				size={size * Math.cos(unit * angle)}
				{angle}
			/>
		</div>
		<div class="right">
			<!-- The component renders itself! -->
			<Tree
				maxDepth={maxDepth - 1}
				size={size * Math.cos(unit * angle)}
				{angle}
			/>
		</div>
	</div>
{/if}
```

The size props passed to the nested Trees are derived using basic trigonmetry, to be precise the trigonometric definition of sine and cosine: If <math>s</math> is the length of the hypothenuse of a right triangle, and <math>\alpha</math> denotes one of its angles, then the legs have lengths <math>s \cdot \cos(\alpha)</math> and <math>s \cdot \sin(\alpha)</math>.

Notice that we put the left and the right part into the square so that CSS will take care of all the correct positioning for us in the browser.

To give the div `.square` the appearance of an actual square with the correct size, we add the CSS variable `style:--size="{size}px"` in its markup and add these basic styles:

```css
.square {
	position: absolute;
	background-image: white; /* or any color you like */
	width: var(--size);
	aspect-ratio: 1;
}
```

The styles also require the angle, so we will add the corresponding CSS variable.

```svelte
<div
	class="square"
	style:--size="{size}px"
	style:--angle="{angle}deg"
>
	...
</div>
```

In the CSS, both the left and the right part are pushed down. The left part is rotated according to the angle.

```css
.left,
.right {
	position: absolute;
	top: 100%;
}

.left {
	rotate: var(--angle);
}
```

When removing the right part from the component, it currently looks as follows.

![Only left part](/media/blog/recursive-only-left.png)

The right part is a bit more tricky, though. You cannot just mirror the styles for the left part since this would mean that the recursion would start on the wrong side.

![Wrong right part](/media/blog/recursive-wrong-right.png)

We have to do this instead: First, pass the size of the right side as a CSS variable.

```svelte
<div
	class="right"
	style:--smaller-size="{size * Math.sin(unit * angle)}px"
>
	...
</div>
```

In the CSS, we shift it to the right, shift it back according to its size (so that now, its right hande is at the right hand side of the outer square), and then rotate it in the other direction.

```css
.right {
	right: 0;
	transform: translateX(calc(-1 * var(--smaller-size)));
	rotate: calc(var(--angle) - 90deg);
}
```

The end result will look as shown above.

## Conclusion

You can do many more things with recursive Svelte components. See [here](https://recursive-svelte-components.netlify.app/).

![Recursive Tiling](/media/blog/recursive-tiling.png)

![Inscribed Squares](/media/blog/recursive-inscribed.png)

Other articles have been written on recursive Svelte components as well.

- <https://geoffrich.net/posts/svelte-tower-of-hanoi/>
- <https://app.studyraid.com/en/read/6598/151194/svelteself-for-recursive-components>
- <https://dev.to/flodev/recursive-components-4jp5>

As explained, you may ignore their mentioning of `<svelte:self>`, but the rest works as before.
