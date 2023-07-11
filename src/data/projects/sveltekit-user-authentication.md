---
name: User authentication in SvelteKit
teaser: with cookies, without any auth library
repository: https://github.com/ScriptRaccoon/sveltekit-mongodb-auth
url: https://sveltekit-auth.netlify.app/
tutorial: https://youtu.be/gNOzCaOCxBU
tags:
    [
        "Authentication",
        "Full Stack",
        "SvelteKit",
        "MongoDB",
        "Tutorial",
        "TypeScript",
    ]
date: 2023-04-22
---

This is a template of a SvelteKit project which authenticates users stored in MongoDB. No auth library is used.

Users can register, log in, open a dashboard (which is just a placeholder here), and visit an account page. On the account page, their name and email can be changed, and logout is possible.

The users are stored in a MongoDB Atlas database. Authentication is implemented with JSON web tokens which are stored as HTTP-only cookies. After login, user name and email are stored as cookies as well.

Basic validation is implemented for the forms during login and registration. The application works without client-side JavaScript, thanks to SvelteKit's server-side rendering and form actions.
