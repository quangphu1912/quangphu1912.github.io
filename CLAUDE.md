# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
bundle install

# Local dev server
# rbenv lazy init is broken in Claude Code's shell — use absolute paths
~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll serve --livereload

# Production build
JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build
```

## Deployment

GitHub Pages deploys via **GitHub Actions** (`.github/workflows/jekyll.yml`) triggered on every push to `main`. No manual step needed.

```bash
git push origin main   # triggers build + deploy automatically
```

## Branch Workflow

- Feature work → feature branch → merge to `develop` → merge to `main` → push
- Pre-commit hook **blocks direct commits to `develop` and `main`** — always use a feature branch

## Edit → Verify → Ship Workflow

The reliable loop for any change (CSS, markup, JS, content):

1. **Branch** — work on a feature branch off `main` (the pre-commit hook blocks direct commits to `main`/`develop`).
2. **Edit** — surgical changes that match surrounding code. All styles live in the single flat `assets/css/main.css`; JS in `assets/js/`; templates in `_includes/` + `_layouts/`.
3. **Build** — always verify with a production build:
   ```bash
   JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build
   ```
   rbenv lazy-init is broken in this shell — use the absolute paths. Watch the output for `error` / `Liquid Warning`.
4. **Verify in the built output** — check `_site/`, **not** just the source. Some things only manifest at build (rendered Liquid, front-matter → `<meta>`, filtered CSS):
   ```bash
   grep -o "<your-rule>[^}]*" _site/assets/css/main.css   # did the CSS ship?
   grep -o "<title>[^<]*</title>" _site/index.html        # rendered HTML?
   ```
   grep is **line-based** — for multi-line CSS rules, search a unique fragment, not the whole block.
5. **Visual check (optional)** — serve `_site` and screenshot with headless Chrome:
   ```bash
   (cd _site && python3 -m http.server 8765 &)
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
     --hide-scrollbars --window-size=1280,1100 --screenshot=/tmp/shot.png http://localhost:8765/index.html
   ```
6. **Commit** — conventional commits (`feat:` / `fix:` / `refactor:` …) on the feature branch.
7. **Ship** — fast-forward the feature branch into `main` and push (triggers the Actions deploy):
   ```bash
   git checkout main && git merge --ff-only feat/<branch> && git push origin main
   ```
8. **Verify deploy** — the `gh run list` CLI has a caching quirk; query the API instead and poll to `completed/success`:
   ```bash
   gh api repos/quangphu1912/quangphu1912.github.io/actions/runs \
     --jq '.workflow_runs[0] | "\(.status)/\(.conclusion)  \(.head_sha[0:7])"'
   ```
9. **Verify live** — fetch the deployed site and confirm the change landed (GitHub Pages updates within ~1 min of a green run):
   ```bash
   curl -s https://quangphu1912.github.io/ | grep -c "<your-marker>"
   ```

## Architecture

### Content Model

Content collections:

| Collection | Directory | URL | Layout | Purpose |
|---|---|---|---|---|
| `projects` | `_projects/` | `/projects/:name/` | `project.html` | Full project pages (single source of truth — home cards + detail). Supports an optional `featured: true` flag that floats a project to the top of the listing and home teaser. |
| `notebooks` | `_notebooks/` | `/notebooks/:name/` | `notebook.html` | Jupyter notebooks (reserved, empty) |

Each `_projects/` file is the single document for a project (home page renders cards from the same collection). There is no separate deep-dive collection.

Layout defaults are set in `_config.yml` — **do not add `layout:` front matter** to collection files.

### Layout Chain

```
default.html          ← base: <head>, header, footer, JSON-LD Person schema, JS
  page.html           ← static pages (about, privacy, 404)
  project.html        ← _projects/ detail pages
  notebook.html       ← _notebooks/
```

`jekyll-seo-tag` (via `{% seo %}` in `default.html`) auto-emits WebSite + BlogPosting schemas (BlogPosting includes `image`, `author`, `datePublished`). The only hand-rolled schema is the Person block in `default.html` — do **not** re-add per-page Article JSON-LD; it would duplicate seo-tag's BlogPosting.

### Data-Driven Sections

Home page sections pull from:
- `_data/skills.yml` — skill categories → rendered as tag clouds

### JavaScript

- `nav.js` — mobile hamburger toggle + email obfuscation (email never appears in static HTML; reassembled from `data-user` / `data-domain` attributes on click)
- `reveal.js` — `IntersectionObserver` scroll-reveal for `[data-reveal]` elements; gracefully degrades under `prefers-reduced-motion`
- `count-up.js` — animates any `[data-countup]` element from 0 → target once on scroll-into-view (expo curve). Progressive enhancement: no-JS / `prefers-reduced-motion` leaves the static value. Prefix/suffix text lives *outside* the `[data-countup]` span.

### CSS

Single flat file: `assets/css/main.css`. No preprocessor, no build step. CSS custom properties (variables) handle theming and dark mode.

### Hero Images

`_includes/image-hero.html` accepts these parameters:
- `image`, `alt`, `title`, `subtitle`, `lead`, `creds` — content slots
- `show_cta=true` — renders "View Projects" + "About Me" buttons

Images are auto-switched from `.jpg` to `.webp` via a `replace` filter in the include.

### Résumé

No standalone PDF — the live site serves as the résumé. Canonical experience & credentials live in `about.md`; skills live in `_data/skills.yml` (rendered on Home). When updating résumé content, edit those two files. The legacy `assets/Phu-Le-Resume.pdf` was removed. LinkedIn/GitHub handles come from `_config.yml` (`linkedin_username`, `github_username`).

### Key `_config.yml` fields

- `job_title` — used in Person JSON-LD schema
- `footer_tagline` — footer copy (separate from `description` which goes in `<meta>`)
- `google_analytics` — GA4 Measurement ID (currently blank; analytics only load in `JEKYLL_ENV=production`)

### Nav

Three items: **Home · Projects · About**. "Projects" links to `/projects/`. Active state is set via Liquid `url contains` checks in `_includes/header.html`.
