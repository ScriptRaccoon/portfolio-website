---
name: Pool game
teaser: made with Vanilla JS, featuring rich graphics
repository: https://github.com/ScriptRaccoon/pool-game
url: https://pool-game.netlify.app
tutorial: https://www.youtube.com/playlist?list=PL1LHMFscti8vGfIvK5-9P5RAavTxzoQWP
tags: ["Vanilla JS", "HTML Canvas", "Browser game", "Tutorial"]
date: 2022-04-17
---

This is a pool game, written in Vanilla JS. It features rich graphics, including light effects and shadows. All drawing operations are done with an HTML canvas. No graphics library is used. Sound effects are also available.

The collision between the balls uses the 2-dimensional elastic collision. Of course, the balls also bounce off the borders, but also the polygon-shaped bumpers. This requires some mathematical calculations.

The mouse is used to determine the orientation and energy of the next shot.

There are popups when the game is won (all balls are pocketed, the black one last) or lost (the black ball is pocketed too early, or the black and the white ball are both pocketed).
