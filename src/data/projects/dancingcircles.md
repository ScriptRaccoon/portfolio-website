---
id: dancingcircles
name: Dancing circles simulation
teaser: producing fascinating patterns from a simple rule
repository: https://github.com/ScriptRaccoon/dancing-circles
url: https://dancing-circles.netlify.app
tutorial:
tags: ["Vanilla JS", "HTML Canvas", "Creative Coding"]
date: 2022-04-09
---

This browser game lets you create circles that "dance" with each other when they are close enough. Very interesting and complex patterns emerge from a simple rule.

More precisely, when two circles are close to each other (say, less than 100 pixels apart), they start to rotate around the midpoint of their midpoints. The rotation is clockwise by default. Circles that get outside of the canvas are removed.

When this rule is applied to many circles at a time, it produces a complex movement. Very interesting and non-predictable systems can arise already with 4 circles.

Mixing clockwise and anticlockwise circles can produce chaos, wild dancing, or even "black holes": these are groups of fast-rotating circles that converge towards a point and eventually suck in all nearby circles.

How to use the simulation: Click the canvas anywhere to generate a new circle at this point. In the menu, you can adjust the size and the orientation of the next circle, adjust the global dance threshold, remove the last circle or even all circles, toggle trails of the circles, toggle lines between dancing circles, and toggle dark mode.
