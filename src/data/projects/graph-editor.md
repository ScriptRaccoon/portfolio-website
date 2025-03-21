---
name: Graph editor
teaser: made with Svelte and SVGs
repository: https://github.com/ScriptRaccoon/graph-editor-svg
url: https://graph-editor-svg.netlify.app/
tutorial: https://www.youtube.com/watch?v=ot4pcN_IQn8
tags: ['Svelte', 'Tool', 'Tutorial', 'SVG']
date: 2022-09-30
---

This is an interactive graph editor made with Svelte. It doesn't have any menus. Instead, it is controlled via mouse and keyboard – so mobile is not supported.

Create nodes by clicking on the canvas. Select a node by clicking on it, then it follows your mouse. Clicking again deselects it.

Create lines by double-clicking nodes. The first double-clicked node is the start, the second one is the end of the line. Select or delete a line by clicking on it.

When a node or line is selected, it can be edited with the keyboard: **+** and **-** control the size, **r** removes the element. When nothing is selected, **r** removes everything.

For a selected node, pressing **c** cycles through colors. For a selected line, **t** cycles through the four arrow types (one-sided, reversed, two-sided, none).

You can also watch a [demo video](https://graph-editor-svg.netlify.app/demo.mp4).
