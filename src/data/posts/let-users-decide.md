---
title: Let users decide
published: 2025-10-19
updated:
description: Why web developers should stop making assumptions about user behavior
---

## Introduction

A common mistake in web development, particularly among beginners, is assuming how users will behave and building features around that assumption. This often creates accessibility and usability problems. This post collects a few examples and suggests better alternatives. In short, it is about letting users decide how to interact with the application.

## Notifications

Toast notifications are commonly used to inform users of successful actions. They appear briefly and disappear automatically. This pattern works fine for non-critical messages.

The problem arises when the notification is about an error, such as a failed save. If the user needs longer to read, is distracted or away from the screen, they may miss important information. This can lead to confusion and frustration.

The issue is that the application decides both how long a message is visible and _that_ and _when_ it should be removed from the screen, without any knowledge about the user. Important messages should remain visible until the user actively dismisses them. Toast notifications are not inherently problematic, but users should be be able to decide when to close them.

**Let the users decide when to dismiss a notification.**

## Menus

Hover menus are still common but very problematic from an accessibility perspective. Perhaps the most frustrating issue is that they often disappear accidentally when the mouse moves slightly. There are several alternatives that clearly indicate the user's intent:

- clicking a close button
- clicking outside the menu
- pressing the `Escape` key

Clicks _inside_ the menu should not automatically close it. For example, in my recent browser game [_Slidorus_](/projects/slidorus), the level selector dialog remains open after the user has selected a level and its preview is shown. This allows the user to choose another level without repeatedly reopening the menu. I have done this so that user can decide when they are done selecting a level.

**Let the users decide when they are done interacting with a menu.**

## Input Methods

Many web applications assume the user is interacting with a mouse. This leads to features like hover menus, drag-and-drop interfaces, or small clickable targets that only work reliably with a mouse. These assumptions ignore users on touchscreens, keyboards, or those relying on assistive technologies.

Instead, make sure that your application supports keyboard navigation, touch-friendly controls, and compatibility with screen readers.

**Let the users decide which device to use.**

## Privacy Settings

Web applications often assume a default level of data collection, sharing, or tracking without asking the user. This takes control away and can violate user expectations or even legal requirements.

For example, apps may enable analytics, location tracking, or personalized ads by default, requiring the user to opt out if they prefer more privacy. Users may not know about these settings or how to change them.

It is better to give users full control over their privacy. They should be asked for consent before collecting any data. Users should be able to change these settings easily at any time. It is a mistake to assume a single privacy preference.

**Let the users decide how their information is handled.**

## Dark Mode

It has been exactly 0 days since [this](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWR2d2w0czNmaXYyd2kwZnZuNWk2YWFjdmJrMTVtNTZzc3F3YWlmaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3VSM58Eu7kR4A/giphy.gif) happened to me by opening a website that only supports light mode.

Just like me, many users prefer dark mode, for example to reduce eye strain or save battery life. It is easy to respect the user's preferred theme by using the CSS media feature `prefers-color-scheme`. Also, there should be a switch between light and dark mode. I have written about an implementation in SvelteKit in [this post](/blog/darkmode-toggle-sveltekit).

**Let the users decide how they want to view your content.**
