---
name: Planning Poker app
teaser: made with SvelteKit and Socket.IO
repository: https://github.com/ScriptRaccoon/planning-poker
url: https://planning-poker-g2q2.onrender.com/
tutorial:
tags:
    [
        'SvelteKit',
        'Socket.IO',
        'Tool',
        'Authentication',
        'Full Stack',
        'TypeScript',
    ]
date: 2023-03-18
---

Planning Poker is played in Scrum teams to estimate the complexity of stories for an upcoming sprint. This app is made with SvelteKit and deployed as a Node app via the corresponding adapter. To this Node app, we attach a Socket.IO instance for real-time communication within each room.

In the app, you can

- log in with a name (which is saved as a cookie)
- create a room
- join an existing room
- give an estimate
- reveal all estimates in the room
- reset all estimates
