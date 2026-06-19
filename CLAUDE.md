# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
bundle install

# Local dev server (use rbenv exec — lazy rbenv init is broken in this shell)
rbenv exec bundle exec jekyll serve --livereload

# Production build
rbenv exec bundle exec jekyll build JEKYLL_ENV=production
```

## Deployment

GitHub Pages is configured to deploy from **`master`**, not `main` (legacy build type — cannot be changed via API; only accepts `gh-pages`, `master`, or `master /docs`).

All development targets `main`. To deploy:

```bash
git push origin main:master
```

## Branch Workflow

- Feature work → feature branch → merge to `develop` → merge to `main` → push `main:master`
- Pre-commit hook **blocks direct commits to `develop` and `main`** — always use a feature branch

## Architecture

### Content Model

Two parallel content systems serve different purposes:

| Collection | Directory | URL | Layout | Purpose |
|---|---|---|---|---|
| `projects` | `_projects/` | `/projects/:name/` | `project.html` | Project overview cards (home page) |
| `portfolio` | `_portfolio/` | `/portfolio/:name/` | `portfolio-item.html` | Deep-dive breakdowns |
| `notebooks` | `_notebooks/` | `/notebooks/:name/` | `notebook.html` | Jupyter notebooks (reserved, empty) |

Each `_projects/` file links to its corresponding `_portfolio/` deep-dive via a `## Deep Dive` section at the bottom. They are separate documents, not generated from each other.

Layout defaults are set in `_config.yml` — **do not add `layout:` front matter** to collection files.

### Layout Chain

```
default.html          ← base: <head>, header, footer, JSON-LD Person schema, JS
  page.html           ← static pages (about, privacy, 404)
  project.html        ← _projects/ detail pages + Article JSON-LD
  portfolio-item.html ← _portfolio/ detail pages + Article JSON-LD
  notebook.html       ← _notebooks/
```

`jekyll-seo-tag` (via `{% seo %}` in `default.html`) auto-emits WebSite + BlogPosting schemas. The hand-rolled Person schema in `default.html` and Article schemas in `project.html`/`portfolio-item.html` complement rather than duplicate these.

### Data-Driven Sections

Home page sections pull from:
- `_data/skills.yml` — skill categories → rendered as tag clouds
- `_data/testimonials.yml` — 3 testimonials with `source` links to `/portfolio/` items

⚠️ The 3 testimonials are **placeholder quotes** — replace with real ones before job applications.

### JavaScript

- `nav.js` — mobile hamburger toggle + email obfuscation (email never appears in static HTML; reassembled from `data-user` / `data-domain` attributes on click)
- `reveal.js` — `IntersectionObserver` scroll-reveal for `[data-reveal]` elements; gracefully degrades under `prefers-reduced-motion`

### CSS

Single flat file: `assets/css/main.css`. No preprocessor, no build step. CSS custom properties (variables) handle theming and dark mode.

### Hero Images

`_includes/image-hero.html` accepts these parameters:
- `image`, `alt`, `title`, `subtitle`, `lead`, `creds` — content slots
- `show_cta=true` — renders "View Projects" + "Download Resume" buttons

Images are auto-switched from `.jpg` to `.webp` via a `replace` filter in the include.

### Key `_config.yml` fields

- `job_title` — used in Person JSON-LD schema
- `footer_tagline` — footer copy (separate from `description` which goes in `<meta>`)
- `google_analytics` — GA4 Measurement ID (currently blank; analytics only load in `JEKYLL_ENV=production`)

### Nav

Three items: **Home · Projects · About**. "Projects" links to `/portfolio/` (the deep-dive collection), not `/projects/`. Active state is set via Liquid `url contains` checks in `_includes/header.html`.
