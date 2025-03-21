---
name: Sprite animations
teaser: made with Vanilla JavaScript
repository: https://github.com/ScriptRaccoon/Sprite-Animation
url: https://sprite-anima.netlify.app/
tutorial: https://www.youtube.com/playlist?list=PL1LHMFscti8uBdhvhRqIMBeX_4D-blFo6
tags: ['Browser game', 'Vanilla JS', 'HTML Canvas', 'Tutorial']
date: 2021-12-08
---

This project shows how to make a Platformer game in Vanilla JavaScript on an HTML canvas, with a focus on how to create sprite animations. The code serves as a template for more complex browser games.

There are three canvases, one for the background, one for the tiles (not redrawn during the game loop) and one for the game entities.

The game entities follow an object-oriented pattern and are divided into the following classes:

- Rectangles
- Sprites (can be animated, follow some physics, and may have optional features)
- Players (sprites with collision detection which can be controlled to walk, jump and plant flowers)
- Birds (sprites that fly back and forth)

Both controls and features are made reusable so that they can also be applied to other classes of sprites. It is not a complete game and has just one level, but it can easily be extended to a proper game.

This is a continuation of my [previous template](https://github.com/ScriptRaccoon/jump-and-run-template) where all entities were just drawn as plain rectangles.
