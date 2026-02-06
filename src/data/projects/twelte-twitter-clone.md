---
name: Twitter clone "Twelte"
teaser: Twitter clone made with SvelteKit
repository: https://github.com/ScriptRaccoon/twelte
url: https://twelte.netlify.app/
tutorial:
tags: ['SvelteKit', 'SQLite', 'Full Stack', 'Authentication', 'TypeScript']
date: 2025-04-24
---

_Twelte_ is a Twitter clone made with SvelteKit and SQLite.

Here is a rough summary of the **features**:

- Intuitive and Responsive UI
- User authentication
- Email verification
- Password reset
- Account Page
- Profile Page
- Avatar upload
- Create, Like, and Reply to Posts
- Automatic Hashtags generation
- Follow other users
- Feed with all posts
- Feed with followed posts
- Infinite Loading
- Page with popular hashtags
- Notifications
- Notification settings

Everything is self-made as far as possible. This includes in particular a self-made authentication process, and the usage of raw SQL. The only dependencies are the following.

- **[SvelteKit](https://svelte.dev)** (framework)
- **[libsql](https://github.com/tursodatabase/libsql)** (queries to SQLite database)
- **[Turso](https://turso.tech)** (deployment of SQLite database)
- **[Netlify](https://www.netlify.com)** (deployment of the application)
- **[Netlify Functions](https://docs.netlify.com/functions/overview)** (scheduled database cleanup)
- **[bcrypt](https://www.npmjs.com/package/bcryptjs)** (hashing of passwords)
- **[cloudinary](https://cloudinary.com)** (image upload)
- **[nodemailer](https://nodemailer.com)** (emails)
- **[Zod](https://zod.dev)** (data verification and parsing)
