---
name: Pure CSS 3-dimensional sphere
teaser: without any JavaScript!
repository: https://github.com/ScriptRaccoon/css-sphere
url: https://css-sphere.netlify.app
tutorial:
tags: ["3D", "CSS", "Creative Coding", "Mathematics"]
date: 2022-02-20
---

Even though it is not the primary goal of CSS, interesting 3-dimensional models can be realized with CSS, without any graphics library and without JavaScript. See for example my fully functional [Rubik's Cube](/projects/rubiks-cube) and the impressive work by [Amit Sheen](https://codepen.io/amit_sheen).

Still, it is a non-trivial problem to properly render 3-dimensional spheres in CSS. This project is an attempt to do exactly this by dissecting the sphere into longitudes and latitudes, which are just circles with borders and thus easy to render. Sass is used to define their positions in a single loop.

The sphere is rotating to improve the 3-dimensional feeling. You can also move inside the sphere. During this movement, the perspective is animated smoothly. This fascinating effect gained some attraction in the corresponding [Codepen](https://codepen.io/scriptraccoon/pen/BamrmYK).

The demo works best in Chrome due to heavy computations.
