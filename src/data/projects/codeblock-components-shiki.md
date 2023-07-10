---
name: Codeblock components with Shiki
teaser: to easily display code in Svelte projects
repository: https://github.com/ScriptRaccoon/codeblocks
url: https://codeblocks-shiki.netlify.app/
tutorial: https://www.youtube.com/watch?v=MzoPVWyov2k
tags: ["SvelteKit", "TypeScript", "Tutorial"]
date: 2023-05-18
---

This repository shows how to implement reusable Codeblock components inside of a SvelteKit project, with syntax highlighting by Shiki. This is an alternative to the more common approach via markdown.

All snippets are stored in a separate folder in the codebase. This means that your code editor does the formatting for you. On the server, we read all their file contents and convert them, with Shiki, to beautiful HTML code. In the Codeblock component, we can then retrieve the HTML code of the snippet which is passed as a prop.

The REAMDE of the repository contains a more detailed explanation.
