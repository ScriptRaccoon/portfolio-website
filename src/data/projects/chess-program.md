---
name: Single-player Chess program
teaser: fully featured, made with Vanilla JS
repository: https://github.com/ScriptRaccoon/chess-singleplayer
url: https://chess-singleplayer.netlify.app/
tutorial:
tags: ['Browser game', 'Vanilla JS', 'CSS']
date: 2020-06-05
---

This is a single-player chess program made with HTML, JavaScript, and CSS. Apart from Sass for CSS, no libraries or frameworks are used. All chess rules are supported.

In the control panel on the left (or bottom on mobile devices), you can see the current turn, rotate the board, restart, draw, and resign the game. You can also toggle highlights for the previous move, allowed squares, and checks.

In the board in the middle, you can move the pieces either by selecting them with a click and then selecting their target square or by dragging and dropping them.

In the notation panel on the right (or top on mobile devices), you can see the previous moves. You can also click on them or use the arrow keys to restore previous game positions. The game outcome is also displayed here.

Apart from a stalemate, there are three situations in which the game automatically draws:

- There is insufficient material.
- For 75 moves no pawn has been moved and no piece has been captured.
- The same position has been on the board 5 times for the same player.

Chess is played with two players, but this program only works in one window in which both players have to alternate making moves. (I have implemented this later in [Multi-player Chess program](/projects/chess-multiplayer-svelte).)

The game design is responsive so that it changes when you resize the window or use a mobile device.
