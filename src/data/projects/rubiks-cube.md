---
name: Rubik's Cube
teaser: fully functional, made with CSS and Svelte
repository: https://github.com/ScriptRaccoon/RubiksCubeSvelte
url: https://rubikscubesvelte.netlify.app
tutorial: https://www.youtube.com/watch?v=GdlUdnYZnfc
tags:
    ["Svelte", "CSS", "Browser game", "3D", "Tutorial", "Mathematics"]
date: 2022-03-05
---

This is a fully functional Rubik's Cube in the browser, made primarily with 3-dimensional CSS. No graphics library is used. Svelte is used for interactivity and to construct the cube from its components: the cube consists of 26 cubies, and each cubie consists of 6 faces.

A help menu shows the various keys to interact with the cube. All layers can be rotated. When multiple rotations are made in a row, they are put on a task queue to be executed one after another.

Additionally, the cube can be

-   rotated in all directions
-   zoomed in/out
-   scrambled
-   reset to its original position
-   made half-transparent
