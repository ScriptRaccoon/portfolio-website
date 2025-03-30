---
name: Week planner made with React and Svelte
teaser: to compare the developer experience of both frameworks
repository: https://github.com/ScriptRaccoon/week-planning-react
repository2: https://github.com/ScriptRaccoon/week-planning-svelte
url: https://week-planner-react.netlify.app/
url2: https://week-planner-svelte.netlify.app/
tutorial:
tags: ['React', 'Svelte', 'TypeScript']
date: 2025-03-14
---

This is a week planner app made both with React and Svelte. The app is accessible via keyboard navigation and screen reader usage. It turns out that the DX and the bundle size of Svelte is much better.

Many concepts are very similar between Svelte and React, especially since Svelte 5 came out, but there are many differences when it comes to the details.

In Svelte, updating the plans in the application (for example, renaming them) can be done easily in their respective child components, since state is reactive on a fine-grained level by default. But in the React version, this is more complicated, and the state change needs to be communicated to the top level App component and handled there.

The state changes are much more cumbersome to write in the React version, since they need to be functional. This would probably be easier with a React state library, but this would be an unfair comparison since Svelte does not require one.

The application needs conditional classes and transitions of elements. These are already built into Svelte. The React version requires the additional npm packages `classnames` and `react-transition-group`.

I made a [similar project with Vue and Svelte](/projects/quiz-app).
