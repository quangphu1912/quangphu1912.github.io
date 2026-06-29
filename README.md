# Phu Le - AI & Data Engineering Portfolio

The live résumé and project portfolio for Phu Le (AI & Data Engineer, Toronto). A hand-built [Jekyll](https://jekyllrb.com) static site, deployed to GitHub Pages via GitHub Actions.

**Live site:** <https://quangphu1912.github.io>

## Tech stack

- **Jekyll `~> 4.3`** on Ruby `~> 3.3.6` (Bundler-managed gems)
- **`theme: null`** - fully custom CSS in one flat file (`assets/css/main.css`); no preprocessor, no framework
- **Plugins:** `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`
- **Self-hosted Inter** variable font (`assets/fonts/InterVariable.woff2`)
- **Dark theme only** - one theme for every visitor, no light mode
- **Deploy:** GitHub Pages via GitHub Actions (`.github/workflows/jekyll.yml`)

## Local development

```bash
bundle install

# rbenv lazy-init is broken in some shells (e.g. Claude Code's); use absolute paths:
~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll serve --livereload
# → http://localhost:4000

# Production build (matches what Actions ships):
JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build
```

## Project structure

```
.
├── _config.yml            # Identity, socials, collections, plugins, exclude list
├── _layouts/              # default · page · project · notebook
├── _includes/             # header, footer, hero-home, hero-telemetry, scroll-cue,
│                          # project-card, image-project-card, project-meta, profile-avatar,
│                          # mermaid, analytics
├── _projects/             # Project pages, single source of truth (home cards + detail)
├── _notebooks/            # Jupyter notebooks (reserved, currently empty)
├── assets/
│   ├── css/main.css       # All styles, one flat file
│   ├── js/                # nav.js · count-up.js · transition-direction.js · page-progress.js
│   ├── fonts/             # InterVariable.woff2 + OFL.txt
│   └── images/
├── index.md               # Home: typographic hero + metrics strip + selected work
├── projects.md            # Projects listing
├── about.md               # Résumé: experience timeline, credentials, contact CTA
├── privacy.md
└── 404.md
```

`_config.yml`'s `exclude:` keeps `README.md`, `CLAUDE.md`, `docs/`, `openspec/`, and `scripts/` out of the build.

## Content model

**Add a project** → create one Markdown file in `_projects/`. It becomes both the home/`projects.md` card and the `/projects/<name>/` detail page (no separate deep-dive file).

```yaml
---
title: "Project Title"
description: "One-line summary for cards and SEO."
date: 2026-01-15
tags: [Data Engineering, AWS, Real-Time Analytics]
role: "Data Engineer"
domain: "Real-Time Analytics"
stack: "Kinesis · Lambda · Redshift · MWAA"
image: /assets/images/projects/your-project.png       # raster PNG (1200×675) → og:image / social cards
hero_image: /assets/images/projects/your-project.svg  # SVG → crisp visible hero + card thumbnail
image_alt: "Describe the illustration"
featured: true   # optional, floats this project to the top
---
```

`role` / `domain` / `stack` render via `_includes/project-meta.html`. Layout is set by `_config.yml` defaults, so don't add `layout:` to collection files.

**Edit the résumé** → `about.md` (experience timeline, credentials with verification links, and the "GET IN TOUCH" CTA are all hardcoded there). Social handles come from `_config.yml`.

## Deployment

Pushing to `main` triggers `.github/workflows/jekyll.yml`: Ruby 3.3 + Bundler cache → `JEKYLL_ENV=production jekyll build` → Pages artifact → `actions/deploy-pages`. No custom domain.

```bash
git push origin main
```

## License

Released into the **public domain** ([Unlicense](http://unlicense.org)), see [LICENSE](LICENSE).

## Contact

- **LinkedIn:** [linkedin.com/in/quangphu1912](https://linkedin.com/in/quangphu1912)
- **GitHub:** [github.com/quangphu1912](https://github.com/quangphu1912)

The contact email on the live site is obfuscated (reassembled client-side from `data-user` / `data-domain`), so it never appears in the rendered HTML.

---

See [`CLAUDE.md`](CLAUDE.md) for the detailed architecture, the edit → verify → ship loop, and repo-specific gotchas.
