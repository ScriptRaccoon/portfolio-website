---
name: Svalendar
teaser: fully-functional calendar application made with SvelteKit
repository: https://github.com/ScriptRaccoon/svalendar
url: https://svalendar.netlify.app/
tutorial:
tags:
    [
        'SvelteKit',
        'SQLite',
        'Full Stack',
        'Authentication',
        'TypeScript',
        'Tool',
    ]
date: 2025-05-09
---

Svalendar is an open-source calendar app designed to help you organize your life.
It provides a simple and privacy-focused way to manage your schedule across
devices.

- **Mobile-Friendly:** The app is fully responsive and works well on
  mobile devices, tablets, and desktops.
- **Event Sharing:** Share events with other users, who can accept or
  decline invitations.
- **Multiple Calendars:** Create and manage separate calendars for different
  purposes.
- **Event Templates:** Create reusable templates to quickly set up new
  events.
- **Open Source:** The code is open for anyone to view, contribute
  to, or host themselves.
- **No Vendor Lock-In:** The app does not depend on services like Google
  or Microsoft, so your data stays under your control.
- **Backup to JSON:** Calendars can be backed up to a JSON file for
  easy data portability.
- **Block Users:** Block specific users to prevent receiving event invites
  from them.

The app avoids third-party integrations and unnecessary client-side JavaScript,
ensuring a fast and secure experience. Most functionality works without
client-side JavaScript, thanks to SvelteKit's form actions.

The titles, descriptions, and locations of all calendar events are encrypted in
the database. This means that even if someone gains access to the database, they
cannot read your event details without the encryption keys.

This app is built with **SvelteKit**, a modern framework for creating
fast and lightweight web applications. It uses **SQLite** for data storage,
ensuring reliability and simplicity. The combination of these technologies allows the app to function efficiently without unnecessary complexity.
