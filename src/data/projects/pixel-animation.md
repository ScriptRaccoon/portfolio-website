---
name: Beautiful pixel animation
teaser: transitioning between any set of images
repository: https://github.com/ScriptRaccoon/words-of-pixels
url: https://wordsofpixels.netlify.app/
tutorial: https://youtu.be/4p8Y0wL3gdk
tags: ['Creative Coding', 'HTML Canvas', 'TypeScript', 'CSS', 'Tutorial']
date: 2023-05-21
---

This is an animation that creates a sequence of images built up from moving pixels. The images are fully customizable.

How it works: Each pixel is a div. The images are drawn on an invisible canvas. Then, we extract all the pixel data from the canvas. Pixels that are light enough are added to an array of positions. When we go from one image to the next one, each pixel div chooses randomly one of these positions.

The animation itself is done via a CSS transition. A pinch of randomness to the pixel's delays makes the animation look more natural.

The code is written in TypeScript. I put some effort to make the code very clean: every function does just _one thing_.
