---
id: drumcomputer
name: Drum Computer
teaser: accessible without any music knowledge
repository: https://github.com/ScriptRaccoon/drumcomputer
url: https://drumcomputer.netlify.app/
tutorial:
tags: Svelte, Music, Tool, TypeScript
date: 2023-02-25
---

This is a drum computer in the browser. It is supposed to be accessible to anyone, even without any music knowledge.

Each row in the timeline represents an instrument (like a bass drum, snare, etc.) within a drum set. You can simply add or remove notes by clicking on the respective buttons in the timeline. The playback function in the menu gives you immediate feedback on how the track sounds like. Keyboard navigation is fully supported.

The timeline is divided into beats. Their number can be adjusted via the buttons to the right of the timeline. By default, the number of subdivisions per beat is 4. This number can be adjusted on the settings page. There you can also toggle timeline scrolling and adjust the speed in bpm (beats per minute).

On startup, the app always loads an example track, which can then be edited.

You can also share your track with others via a link. When this link is opened, it loads the track saved in the URL parameters. Thus, the sharing function does not require any database.
