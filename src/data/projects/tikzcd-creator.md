---
name: tikzcd creator
teaser: to create TikZ commutative diagrams visually
repository: https://github.com/ScriptRaccoon/tikzcd-creator
url: https://tikzcd-creator.netlify.app/
tutorial:
tags: ['Tool', 'Mathematics', 'CSS', 'Svelte', 'TypeScript']
date: 2025-01-03
---

Graphical editor for [tikzcd diagrams](https://ctan.org/pkg/tikz-cd) that generates the code for you. The idea of the user interface is to make it dead simple and also enjoyable to use. The diagram is generated step by step:

- nodes
- arrows
- arrow types
- node labels
- arrow labels

This is a very basic editor (on purpose). There are more fully featured and advanced editors out there, namely [quiver](https://github.com/varkor/quiver) and [tikzcd-editor](https://github.com/yishn/tikzcd-editor), but whose user interface I find less intuitive.

This is one of the first projects of mine that works with [Svelte 5](https://svelte.dev/docs/svelte/v5-migration-guide). As with many of my other projects, most of it is "hand-made". In particular, the arrows are custom HTML elements.
