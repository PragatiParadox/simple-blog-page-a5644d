# The Slow Margin

A simple, static blog page with three sample essays. Each post shows its title, author, publication date, category, reading time, and a short summary on the homepage, and opens into a full article page.

## Features

- Homepage with a hero and a responsive grid of post cards
- Article pages with author byline, date, reading time, and styled Markdown
- Category filter pages
- Google Fonts (Fraunces, Literata, IBM Plex Mono), a warm paper-toned palette, and hover effects on cards, links, and category pills

## Tech

- [TanStack Start](https://tanstack.com/start) + React 19
- [Content Collections](https://www.content-collections.dev/) for Markdown posts in `content/posts/`
- Tailwind CSS v4 with the Typography plugin
- Deployed on Netlify

## Run locally

```bash
pnpm install
pnpm dev        # or: netlify dev
```

## Writing a post

Add a Markdown file to `content/posts/` with frontmatter:

```yaml
---
date: '2026-10-21'
title: 'My new post'
author: 'Your Name'
summary: 'One or two sentences shown on the homepage.'
categories:
  - Rituals
---
```
