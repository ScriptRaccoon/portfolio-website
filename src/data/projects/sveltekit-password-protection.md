---
name: How to password-protect SvelteKit pages
teaser: using page server loads and environment variables
repository: https://github.com/ScriptRaccoon/sveltekit-password
url: https://sveltekit-password.netlify.app/
tutorial: https://youtu.be/Gf5cOJCAh4U
tags: ['Authentication', 'SvelteKit', 'Tutorial', 'TypeScript']
date: 2023-03-16
---

This repository demonstrates how to password-protect single or multiple pages inside of a SvelteKit application.

The rough idea is as follows: when a user has no valid session cookie and opens a protected page, the server redirects them to a login page with a password prompt. When that is input correctly, we generate a session cookie and send it to the browser.

The password is saved as an environment variable and is only verified on the server side. A complete explanation can be found in the README of the repository.
