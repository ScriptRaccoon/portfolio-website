---
name: Wordle clone "Svordle"
teaser: made with Svelte and serverless functions
repository: https://github.com/ScriptRaccoon/Svordle
url: https://svordle.netlify.app
tutorial: https://youtu.be/CMIwJLS0dns
tags:
    ["Svelte", "Browser game", "Full Stack", "Tutorial", "Serverless"]
date: 2022-02-10
---

This is a version of the [Wordle game](https://www.nytimes.com/games/wordle) made with Svelte. You can choose between English and German. You can also share your result after each game.

As in the original, the game can be played both with a normal keyboard (when using a PC) and an integrated keyboard (when using a mobile device). Several animations improve the user experience.

The backend uses [Netlify's serverless functions](https://www.netlify.com/products/functions/). The correct word is encrypted and is never visible to the client (unless the guess is correct, of course). Notice that in the original Wordle game, the correct word is visible in the browser's local storage, allowing users to cheat. This is not possible here.
