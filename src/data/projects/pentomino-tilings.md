---
name: Pentomino tilings and the exact cover problem
teaser: made with Svelte and Python
repository: https://github.com/ScriptRaccoon/pentomino-tilings
url: https://pentomino-tilings.netlify.app/
tutorial:
tags: ["Svelte", "Algorithms", "TypeScript", "Python"]
date: 2023-11-12
---

The pentomino tilings of a rectangle, where every one of the 12 pentominoes appears exactly one, can be interpreted as an exact cover problem and hence enumerated with Knuth's algorithm. The repository contains

- a Python implementation of this algorithm
- a visualization of these made with Svelte

The exact cover algorithm in `exactcover.py` may not be optimized, but the code is incredibly short because we use Python sets (not incidence matrices) and generators - we don't need the usual "select and deselect" step.
