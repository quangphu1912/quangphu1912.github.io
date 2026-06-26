# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
bundle install

# Local dev server
# rbenv lazy init is broken in Claude Code's shell - use absolute paths
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

- Feature work → feature branch → fast-forward into `main` → push (`develop` exists but the real flow skips it)
- Pre-commit hook **blocks direct commits to `main` and `develop`** - always use a feature branch

## Edit → Verify → Ship

The reliable loop for any change (CSS, markup, JS, content). Keep edits surgical - match surrounding code, touch only what the request requires.

1. **Branch** off `main` (pre-commit hook blocks direct commits to `main`/`develop`). Code lives in: `assets/css/main.css` (one flat file), `assets/js/`, `_includes/` + `_layouts/`.
2. **Build** - `JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build`. Watch for `error` / `Liquid Warning`.
3. **Verify in `_site/`**, not the source - rendered Liquid, front-matter → `<meta>`, and filtered CSS only exist after build. grep a unique fragment (grep is line-based; for multi-line CSS rules don't match the whole block).
4. **Commit** - conventional (`feat:` / `fix:` / `refactor:` / `docs:`) on the feature branch.
5. **Ship** - `git checkout main && git merge --ff-only <branch> && git push origin main` (triggers the Actions deploy).

**Gotchas that have bitten this repo:**
- **rbenv** - lazy-init is broken in this shell; always use the absolute paths above.
- **Deploy status** - `gh run list` is cached; poll the API to `completed/success`: `gh api repos/quangphu1912/quangphu1912.github.io/actions/runs --jq '.workflow_runs[0] | "\(.status)/\(.conclusion)  \(.head_sha[0:7])"'`.
- **CDN cache** - right after a green run the Pages CDN can still serve the *old* asset for ~1 min; cache-bust with `?cb=$RANDOM`: `curl -s "https://quangphu1912.github.io/assets/css/main.css?cb=$RANDOM" | grep -c "<your-rule>"`.
- **Visual check (optional)** - serve `_site` (`python3 -m http.server`) and screenshot with headless Chrome.
- **Boolean attributes** - Jekyll renders a bare `data-reveal` as `data-reveal=""` in `_site`. CSS `[data-reveal]` and `querySelectorAll("[data-reveal]")` match either form, so verify with value-agnostic matching (`grep 'data-reveal'`), not a literal `data-reveal>`.
- **Headless screenshots are dark by default** - the site is dark-theme only and declares `color-scheme: dark`, so plain `--headless=new` already renders dark. Do **NOT** pass `--force-dark-mode`: its auto-dark algorithm repaints `transparent` elements (it injected a phantom background onto the floating header). To preview a light-OS visitor (who still gets the dark site), use `--blink-settings=preferredColorScheme=1` as its own arg.

## Architecture

### Content Model

Content collections:

| Collection | Directory | URL | Layout | Purpose |
|---|---|---|---|---|
| `projects` | `_projects/` | `/projects/:name/` | `project.html` | Full project pages (single source of truth - home cards + detail). Supports an optional `featured: true` flag that floats a project to the top of the listing and home teaser. |
| `notebooks` | `_notebooks/` | `/notebooks/:name/` | `notebook.html` | Jupyter notebooks (reserved, empty) |

Each `_projects/` file is the single document for a project (home page renders cards from the same collection). There is no separate deep-dive collection.

Layout defaults are set in `_config.yml` - **do not add `layout:` front matter** to collection files.

### Layout Chain

```
default.html          ← base: <head>, header, footer, JSON-LD Person schema, JS
  page.html           ← static pages (about, privacy, 404)
  project.html        ← _projects/ detail pages
  notebook.html       ← _notebooks/
```

`jekyll-seo-tag` (via `{% seo %}` in `default.html`) auto-emits WebSite + BlogPosting schemas (BlogPosting includes `image`, `author`, `datePublished`). The only hand-rolled schema is the Person block in `default.html` - do **not** re-add per-page Article JSON-LD; it would duplicate seo-tag's BlogPosting.

### Includes

Reusable partials in `_includes/`:
- `header.html` / `footer.html` - transparent scroll-away header; footer is a single line of icon-only socials (LinkedIn, GitHub) + an obfuscated email link
- `hero-home.html` + `hero-telemetry.html` - home hero (a text column plus a right-column "telemetry" instrument, no `<img>`)
- `scroll-cue.html` - scroll-to-content cue used in the home hero and project covers
- `project-card.html` → `image-project-card.html` - card + its single `<img>` thumbnail
- `project-meta.html` - renders the project's `role` / `domain` / `stack` front matter as a `<dl>`
- `profile-avatar.html` - the About avatar `<img>`
- `icon-external.html` - the icon-only external-link affordance reused on each About credential row (one source of truth for the SVG; takes `href` + `label`)
- `mermaid.html` - Mermaid diagrams, hard-set to the dark theme
- `analytics.html` - GA4 loader, production-gated on `site.google_analytics`, with a `localStorage 'analytics-opt-out'` opt-out

There is no per-element `view-transition-name` morph. Card→detail navigation uses the same root page transition as everywhere else (the opaque rise in the VIEW TRANSITIONS section of `main.css`), so the cover image rises *with* the page instead of morphing out of it - one consistent motion across all navigation. (An earlier `vt-{{ slug }}` card→cover image morph was removed because it made the cover picture appear abruptly rather than rise.)

### JavaScript

All three are ES modules, loaded with `<script type="module">` in `_layouts/default.html` (modules defer automatically, so `defer` is omitted). Each file is self-initializing top-level code that runs once, after the DOM is parsed.

- `nav.js` - mobile nav (hamburger toggle, `inert` focus-trap, Esc / outside-click close, scroll-lock, resize guard) + email obfuscation (email never appears in static HTML; reassembled from `data-user` / `data-domain` attributes on click)
- `reveal.js` - `IntersectionObserver` scroll-reveal for `[data-reveal]` elements; gracefully degrades under `prefers-reduced-motion`
- `count-up.js` - animates any `[data-countup]` element from 0 → target once on scroll-into-view (expo curve). Progressive enhancement: no-JS / `prefers-reduced-motion` leaves the static value. Prefix/suffix text lives *outside* the `[data-countup]` span.

### CSS

Single flat file: `assets/css/main.css`. No preprocessor, no build step. CSS custom properties (variables) handle theming. The file opens with a grep-by-banner **table of contents** (jump with e.g. `grep 'COMPONENTS' assets/css/main.css`).

**Self-hosted Inter** (`assets/fonts/InterVariable.woff2`, preloaded in `default.html`) drives all type - it's load-bearing; don't fall back to a system-font stack.

**Dark theme only (one theme for every visitor).** `:root` holds the dark palette and declares `color-scheme: dark`; `_layouts/default.html` also sets `<meta name="color-scheme" content="dark">`. There is **no light mode** - do **not** add `@media (prefers-color-scheme: dark)` branches (the one exception is the `@media print` block, which intentionally overrides tokens to ink-on-white). Mermaid (`_includes/mermaid.html`) is hard-set to the dark theme.

**Header (top-of-page, scrolls away, fully transparent).** `.site-header` is `position: absolute` (NOT fixed/sticky) so it sits at the top of the page and **scrolls away with the content** - michellegore.com's nav that only appears at the top. It is **transparent on every page** (home, project, about) - no background, border, blur, or shadow (no "stripe"), just the wordmark + nav in white over whatever is behind it. One consistent bar, no solid/frosted state, no `is-over-cover` toggle (removed, no JS). Smaller minimalist font; the tagline is hidden so it reads as wordmark + nav. `main` reserves the header height via `padding-top: var(--header-h)` so non-cover content isn't hidden under it at the top; cover pages (`.hero-home` / `.project-cover`) cancel that with `margin-top: calc(-1 * var(--header-h))` so the cover bleeds up behind the transparent header. There is no reading-progress bar (removed). The skip-to-content link is hidden off-screen via `transform: translateY(-200%)`. Do not make the header `fixed`/`sticky` or add a background without asking - it is meant to scroll away.

### Project Images (visible hero vs. social og:image)

There is **no** `_includes/image-hero.html` and **no** `.jpg`→`.webp` `replace` filter - both were aspirational doc that never matched the code. The home hero is typographic (`_includes/hero-home.html`, no `<img>`). The real image chain:

- `page.image` feeds **both** `jekyll-seo-tag`'s `og:image` / BlogPosting JSON-LD (`_layouts/default.html` `{% seo %}`) **and** the raster fallback. For projects it's the **raster** (`.png`, 1200×675) so social cards render - Twitter/LinkedIn/Slack silently drop SVG.
- The **visible** project art is the SVG in `_includes/projects/<slug>.svg`, **inlined** (not `<img>`) via `{% include projects/{{ slug }}.svg %}` in `_layouts/project.html` (cover) and `_includes/image-project-card.html` (card thumbnail). It's inlined so it can inherit the category hue via `currentColor` - an external `<img src=*.svg>` can't be CSS-tinted (see Project category color below). The SVGs are authored with a navy base + `currentColor`-at-opacity accents.
- `hero_image` front matter is now just a **presence flag** ("this project has an inline SVG"); its path value is legacy/unused (the art is resolved by `slug`, not by that path). When absent, both surfaces fall back to the raster `<img>`.
- `image_alt` labels the cover (`role="img"` wrapper); the inline SVGs also carry their own `role="img"`/`aria-label`.

### Project category color (design decision)

Projects are colored **by category, not per-project**, so the listing reads as a curated set and a 10th project needs no new color invented. A curated triad, tuned for the navy dark theme, keys off the *kind* of work:

| `category:` | Token | Hue | Meaning |
|---|---|---|---|
| `data` | `--proj-data` | `#3DD6C0` teal | Data Engineering / Pipelines |
| `ml` | `--proj-ml` | `#A78BFA` violet | Machine Learning / Predictive |
| `bi` | `--proj-bi` | `#F5B544` amber | Analytics / BI |

**Mechanism.** Each project declares `category:` in front matter. The card (`_includes/project-card.html`) and detail article (`_layouts/project.html`) emit `data-category="…"`; CSS rules `[data-category="…"] { --proj-accent: …; --proj-wash: …; }` (top of `main.css`, just after `:root`) set two custom properties that **cascade** to descendants. The inline cover/thumbnail SVGs pick up `--proj-accent` through `color:` → `currentColor`; the chrome (cover eyebrow, cover wash-glow, listing hover-arrow/CTA, thumbnail hover hairline) reads the same var. Missing/unknown category falls back to **brand blue** (`--proj-accent` defaults to `--color-accent`).

**Reach (deliberate).** Category hue touches **only project surfaces**: cover art + eyebrow + wash, listing thumbnail art + hover affordances. **Brand blue stays the global UI accent** - buttons, focus rings, the page-transition edge, telemetry, hero, and the global `.eyebrow` (home/section kickers). The listing card kicker (date · tag) stays muted on purpose; the colored art carries grid identity. Do **not** recolor the global `.eyebrow` to a category hue - it would bleed into home/section headers.

**Adding a project:** set `category: data|ml|bi` and author `_includes/projects/<slug>.svg` with a navy base + `currentColor`-at-opacity accents (keep `preserveAspectRatio="xMidYMid slice"` so it fills the tall cover). A genuinely new category needs a token pair + one `[data-category]` rule.

### Résumé

No standalone PDF - the live site serves as the résumé. All résumé content (experience timeline, credentials with Credly/CFA/GCP verification links, the "GET IN TOUCH" CTA) is **hardcoded in `about.md`**, laid out as a 2-column card grid (Story|Experience, Currently|Credentials) with a vertical `.xp-timeline` and a full-width connect CTA - edit there. (Home has no CTA; it was moved to About.) Social handles come from `_config.yml`: `linkedin_username`, `github_username`, `google_cloud_profile`.

### Key `_config.yml` fields

- `job_title` - used in Person JSON-LD schema
- `description` - the `<meta name="description">` content (the default when a page has none of its own)
- `email` - contact email; the footer icon + `nav.js` obfuscation reassemble it from `data-user` / `data-domain` (it never appears in static HTML)
- `google_cloud_profile` - GCP skills-profile link rendered on About
- `google_analytics` - GA4 Measurement ID (currently blank; analytics only load in `JEKYLL_ENV=production`)

### Nav

Three items: **Home · Projects · About**. "Projects" links to `/projects/`. Active state is set via Liquid `url contains` checks in `_includes/header.html`.
