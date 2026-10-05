# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio site (https://scriptraccoon.dev) built with SvelteKit 3 + Svelte 5, deployed on Netlify. It contains projects, a blog, a YouTube overview, and a self-hosted privacy-friendly analytics system backed by a Turso (libSQL) database.

## Commands

Package manager is pnpm.

- `pnpm dev` — dev server (exposed on the network via `--host`)
- `pnpm build` / `pnpm preview`
- `pnpm check` — `svelte-kit sync` + `svelte-check` (type checking). Runs on the husky **pre-push** hook.
- `pnpm lint` / `pnpm format` — Prettier check / write (tabs, width 4, single quotes, no semicolons, trailing commas)
- `pnpm seed` — create schema in local SQLite DB (`database/local.db`) from `database/seed.sql`; `pnpm mock` loads mock data; `pnpm db` opens a sqlite3 shell
- `pnpm post` — interactive script (`tools/post.py`) that scaffolds a new blog post in `src/data/posts/`

There is no test suite.

Env vars (see `.env.example`): `DB_URL` (e.g. `file:database/local.db` locally), `DB_AUTH_TOKEN`, `PAGEVISITS_CREDENTIALS` (`user:password`). They are declared and validated in `src/env.ts` via `defineEnvVars` and imported from `$app/env/private`.

## Architecture

**Imports:** use the Node subpath alias `#lib/...` (defined in `package.json` `imports`) rather than `$lib`, with `.js` extensions, e.g. `import { query } from '#lib/server/db.js'`. SvelteKit 3 env/runtime modules are `$app/env` and `$app/env/private`. SvelteKit config (adapter, preprocess) lives in `vite.config.ts`; there is no `svelte.config.js`.

**Content as Markdown:** projects and posts are Markdown files with YAML frontmatter in `src/data/projects/` and `src/data/posts/`; the filename is the route id. Loaders read them via `import.meta.glob(..., { query: '?raw' })` and parse with `front-matter` (`src/lib/server/frontmatter.ts`). Frontmatter shapes are `ProjectMetaData` / `PostMetaData` in `src/lib/types.ts`.

- Posts with `published: null` are drafts and are hidden/404 (`is_published`).
- Every project tag must appear in `PROJECT_TAGS` in `src/lib/server/config.ts`, otherwise `/projects` throws a 400.
- Project images go in `static/media/projects/<id>.webp` and `<id>_thumb.webp` (576px large, 190px small); blog images in `static/media/blog/`. `convert-png-to-webp.sh` helps convert.

**Markdown rendering** (`src/lib/server/markdown.ts`, `plugins.ts`): markdown-it with Shiki highlighting (fixed language list in `plugins.ts` — add a language there if a code block uses a new one; code fences must specify a language), KaTeX (`$...$` inline, `$$...$$` display; custom inline rule `render_math`), IDs on `h2` headings (used to build the table of contents in `toc.ts`), copy buttons on code blocks, and `target="_blank"` on external links.

**Prerendering:** the root layout sets `prerender = true`, so the site is mostly static. `/analytics` opts out with `prerender = false`; the `/api/*` POST endpoints run as Netlify functions.

**Analytics pipeline:**

1. `src/hooks.server.ts` assigns a `session_id` cookie on every request (`src/lib/server/sessions.ts`).
2. The root layout calls `track()` (`src/lib/client/track.ts`) on navigation, which POSTs once per browser session to `/api/track-session` and per page to `/api/track-visit`. Users can opt out via a `notrack` localStorage flag.
3. API endpoints reject cross-origin requests, bots, non-JSON bodies, and paths not in `TRACKED_PATHS` (`config.ts`; `*` suffix = prefix match — the same matching logic is duplicated client-side). Bodies are validated with valibot. Geo data comes from Netlify's `x-nf-geo` header.
4. Data lands in `sessions_live` / `visits_live`. SQL triggers in `database/seed.sql` keep `*_total` aggregate tables updated.
5. Netlify scheduled functions in `netlify/functions/`: `aggregation.ts` (daily) rolls live rows into `*_monthly` tables; `cleanup.ts` (monthly) deletes aggregated live rows older than 7 days.
6. `/analytics` displays everything behind HTTP Basic auth (`PAGEVISITS_CREDENTIALS`; skipped in dev).

DB access goes through `query()` in `src/lib/server/db.ts`, which returns `{ rows, err }` instead of throwing. Schema changes must be made in `database/seed.sql` (and applied to the Turso DB manually).

**YouTube data:** `src/data/youtube/youtube.json` is generated — do not edit by hand. It is produced by `scripts/youtube.ts` (a separate pnpm package in `scripts/` with its own deps and `.env`, run with `pnpm run update:youtube`), executed weekly by the GitHub Action `.github/workflows/update.yml`, which commits the result.
