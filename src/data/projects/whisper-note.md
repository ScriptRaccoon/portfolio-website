---
name: Whisper Note
teaser: tool for sharing secrets via a one-time link
repository: https://github.com/ScriptRaccoon/WhisperNote
url: https://whispernote.onrender.com
tutorial: https://www.youtube.com/playlist?list=PL1LHMFscti8s2_B2xJaEwMrR5fR73_9U9
tags: ['Full Stack', 'Express', 'Firebase', 'Tool', 'Tutorial', 'EJS']
date: 2021-10-13
---

This is a tool to share secrets via a one-time link, very similar to [One-Time Secret](https://onetimesecret.com/).

The front-end is built with [EJS templates](https://ejs.co/). The back-end is built with [Express](https://expressjs.com/), following the model-view-controller architecture. The secrets are encrypted with Node's crypto package and stored in a [Firestore](https://firebase.google.com/docs/firestore) database.

What makes this tool secure:

- Secrets are encrypted (with Node's crypto package) before being sent to the database.
- Secrets expire after a custom amount of time.
- Secrets will be destroyed once they have been opened.
- Secrets can also be protected with an additional password, so that not just the link is sufficient to open them.
- That password is hashed before it is added to the database.
