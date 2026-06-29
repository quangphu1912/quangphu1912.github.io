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
- **Boolean attributes** - Jekyll renders a bare `data-reveal` as `data-reveal=""` in `_site`. The CSS `[data-reveal]` attribute selector matches either form, so verify with value-agnostic matching (`grep 'data-reveal'`), not a literal `data-reveal>`.
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
- `header.html` / `footer.html` - transparent scroll-away header; footer is a warm sign-off (michellegore.com style): a "Thanks for stopping by, let's chat 👋" headline over a 3-column row - **Contact** (a "Say hello" link; the raw email never appears in static HTML, `nav.js` reassembles `data-user`/`data-domain` into a `mailto:` on click), **Connect** (LinkedIn · GitHub text links via `social-url.html`), **©** ({year} {name}). No `Made with…` sign-off line. The old icon-only `.footer-bar`/`.footer-icons` is gone
- `hero-home.html` + `hero-telemetry.html` - home hero (a centered stack: title + lead above the "telemetry" instrument, no `<img>`)
- `scroll-cue.html` - scroll-to-content cue used in the home hero and project covers
- `project-card.html` → `image-project-card.html` - the card thumbnail (callee reads the project directly: inline SVG when `hero_image`, else raster `<img>`)
- `project-meta.html` - renders the project's `role` / `domain` / `stack` front matter as a `<dl>`
- `profile-avatar.html` - the About avatar `<img>`
- `icon-external.html` - the icon-only external-link affordance reused on each About credential row (one source of truth for the SVG; takes `href` + `label`)
- `social-url.html` - single source for the LinkedIn/GitHub profile URLs (footer icons, About CTA, Person JSON-LD `sameAs`); takes `network`
- `mermaid.html` - Mermaid diagrams, hard-set to the dark theme
- `analytics.html` - GA4 loader, production-gated on `site.google_analytics`, with a `localStorage 'analytics-opt-out'` opt-out

There is no per-element `view-transition-name` morph. Card→detail navigation uses the same root page transition as everywhere else (the opaque rise in the VIEW TRANSITIONS section of `main.css`), so the cover image rises *with* the page instead of morphing out of it - one consistent motion across all navigation. (An earlier `vt-{{ slug }}` card→cover image morph was removed because it made the cover picture appear abruptly rather than rise.)

### JavaScript

All four are ES modules, loaded with `<script type="module">` in `_layouts/default.html` (modules defer automatically, so `defer` is omitted). Each file is self-initializing top-level code that runs once, after the DOM is parsed.

> **Scroll-reveal is pure CSS, not JS** (the `[data-reveal]` rise + the `.work-rows` directional slide-in, plus `.section-title`). It uses **scroll-driven animations** (`animation-timeline: view()`) in `assets/css/main.css`: content is **visible by default** and the entrance is a function of the element's scroll position, so it degrades to fully-visible under `prefers-reduced-motion` / no `animation-timeline` support. **Why CSS, not the old `reveal.js`:** a cross-document View Transition snapshots the incoming page *before* any module runs, so a JS-revealed element (`opacity:0` waiting on `is-visible`) was captured blank on Safari = a flash that four timing fixes couldn't kill (`c9cc0e3`→`5eeff3b`). Scroll-driven CSS has no JS in the motion path, so the snapshot is always solid and the flash is structurally impossible. (Our north star michellegore.com avoids the same race by using a same-document curtain, not cross-doc VT - see the `michellegore-transition-mechanism` memory.) This is the reusable motion primitive: add new reveals with `[data-reveal]`, bespoke per-surface motion with the `view()` / `scroll()` keyframe pattern. `hero-home__title` is the one remaining **time-based** load flourish (a masked line-rise); it's cold-load-safe but, being time-based, would be a candidate for the same treatment if it ever visibly flashes on a VT nav to home.

- `nav.js` - mobile nav (hamburger toggle, `inert` focus-trap, Esc / outside-click close, scroll-lock, resize guard) + email obfuscation (email never appears in static HTML; reassembled from `data-user` / `data-domain` attributes on click)
- `count-up.js` - animates any `[data-countup]` element from 0 → target once on scroll-into-view (expo curve). Progressive enhancement: no-JS / `prefers-reduced-motion` leaves the static value. Prefix/suffix text lives *outside* the `[data-countup]` span.
- `transition-direction.js` - direction-aware cross-document View Transitions; tags each navigation `back` / `forward` so CSS (`:active-view-transition-type`) can reverse the page-reveal pull-down. Progressive enhancement: a no-op without the Navigation API / cross-document VT.
- `page-progress.js` - the top loading bar (`.page-progress`, michellegore.com style): a thin brand-blue bar pinned to the viewport top that sweeps left→right on each page arrival then fades. Sweeps **after** the View Transition overlay clears (`viewTransition.finished`) on in-site nav, and once after first paint on cold load / refresh / bfcache. This is the page-change highlight that **replaced the old blue seam glow** on the rising page. No-op under `prefers-reduced-motion` (the bar is `display:none` there too).

### CSS

Single flat file: `assets/css/main.css`. No preprocessor, no build step. CSS custom properties (variables) handle theming. The file opens with a grep-by-banner **table of contents** (jump with e.g. `grep 'COMPONENTS' assets/css/main.css`).

**Type system (one font + a code voice; all self-hosted + preloaded in `default.html`, all OFL - don't fall back to a system-font stack).** **Hanken Grotesk** (`assets/fonts/HankenGrotesk-Variable.woff2`, latin subset) is the *single* typeface for **display + body + every label** (`--font-display` / `--font-body` / `--font-system` all resolve to it as primary) - an even, Europa-cousin grotesque chosen over Jost (Jost's Futura forms render with uneven letter heights at small sizes, "some characters higher than others"). One font across the page like michellegore's Europa, so headings and body never read as "two fonts". Labels (`.eyebrow`, CTA, metric labels/figures, telemetry, timeline periods, meta `dt`, captions, kickers) are Hanken Grotesk **bold + uppercase + tracked** via the shared `--tracking-label` token - solid like her condensed labels, not airy monospace. **Inter** (`InterVariable.woff2`) is **fallback only** (kept preloaded so non-latin glyphs like → fall through instantly). **Mono** (`--font-mono`, SF Mono stack) is **code-only** (`code` / `pre` / `.notebook-content code` / Mermaid) - do **not** re-apply it to labels (monospace has fixed advance width, so it read thin/airy/spacedy; michellegore uses bold proportional labels, not mono). **michellegore boldness inversion**: big display is *light* (hero/cover/identity names 500, other headings 600), labels are *bold* (`.eyebrow` 700); bold **metric figures** (`7+`, `$150M`) stay 700 - bold data is the signature.

**Dark theme only (one theme for every visitor).** `:root` holds the dark palette and declares `color-scheme: dark`; `_layouts/default.html` also sets `<meta name="color-scheme" content="dark">`. There is **no light mode** - do **not** add `@media (prefers-color-scheme: dark)` branches (the one exception is the `@media print` block, which intentionally overrides tokens to ink-on-white). Mermaid (`_includes/mermaid.html`) is hard-set to the dark theme.

**Header (top-of-page, scrolls away, fully transparent).** `.site-header` is `position: absolute` (NOT fixed/sticky) so it sits at the top of the page and **scrolls away with the content** - michellegore.com's nav that only appears at the top. It is **transparent on every page** (home, project, about) - no background, border, blur, or shadow (no "stripe"), just the wordmark + nav in white over whatever is behind it. One consistent bar, no solid/frosted state, no `is-over-cover` toggle (removed, no JS). Smaller minimalist font; the tagline is hidden so it reads as wordmark + nav. `main` reserves the header height via `padding-top: var(--header-h)` so non-cover content isn't hidden under it at the top; cover pages (`.hero-home` / `.project-cover`) cancel that with `margin-top: calc(-1 * var(--header-h))` so the cover bleeds up behind the transparent header. There is no reading-progress bar (removed). The skip-to-content link is hidden off-screen via `transform: translateY(-200%)`. Do not make the header `fixed`/`sticky` or add a background without asking - it is meant to scroll away.

**Covers (`.hero-home` + `.projects-hero`) - shared layout, distinct surfaces.** Both full-bleed covers share the `.hero-home, .projects-hero { … }` **layout** shell (bleed-behind-header `margin-top`, `min-height:100vh/svh`, flex-center, white text) - the `min-height` is what gives the work-rows slide its headroom (the first row must start below the fold), so **don't shrink it**. The **surface** is deliberately different so Home→Projects never reads as the same page twice: **Home = identity** (mono-blue glow that *slowly drifts* via the `heroAurora` keyframe on `.hero-home::before`, reduced-motion-gated, transform/opacity only so it's VT-snapshot-safe); **Projects = the work taxonomy** (`.projects-hero` overrides the surface with a **tri-color teal/violet/amber wash** keyed off the `--proj-*` tokens, and promotes the `.projects-hero__cats` Data/ML/BI legend to the signature). Differentiate covers by colour/content, not height. Per-cover entrances stay transform-only (no opacity) so the VT snapshot is never blank.

### Project Images (visible hero vs. social og:image)

There is **no** `_includes/image-hero.html` and **no** `.jpg`→`.webp` `replace` filter - both were aspirational doc that never matched the code. The home hero is typographic (`_includes/hero-home.html`, no `<img>`). The real image chain:

- `page.image` feeds **both** `jekyll-seo-tag`'s `og:image` / BlogPosting JSON-LD (`_layouts/default.html` `{% seo %}`) **and** the raster fallback. For projects it's the **raster** (`.png`, 1200×675) so social cards render - Twitter/LinkedIn/Slack silently drop SVG.
- The **visible** project art is the SVG in `_includes/projects/<slug>.svg`, **inlined** (not `<img>`) via `{% include projects/{{ slug }}.svg %}` in `_layouts/project.html` (cover) and `_includes/image-project-card.html` (card thumbnail). It's inlined so it can inherit the category hue via `currentColor` - an external `<img src=*.svg>` can't be CSS-tinted (see Project category color below). The SVGs are authored with a navy base + `currentColor`-at-opacity accents.
- `hero_image: true` is a **boolean presence flag** ("this project has an inline SVG cover"); its value is not a path - the art is resolved by `slug` (`_includes/projects/<slug>.svg`), which is **required** when the flag is set (a missing file fails the build loudly, by design - both the cover and the card include it). When absent, both surfaces fall back to the raster `page.image` `<img>`.
- `image_alt` labels the cover (`role="img"` wrapper); the inline SVGs also carry their own `role="img"`/`aria-label`.

### Project category color (design decision)

Projects are colored **by category, not per-project**, so the listing reads as a curated set and a 10th project needs no new color invented. A curated triad, tuned for the navy dark theme, keys off the *kind* of work:

| `category:` | Token | Hue | Meaning |
|---|---|---|---|
| `data` | `--proj-data` | `#3DD6C0` teal | Data Engineering / Pipelines |
| `ml` | `--proj-ml` | `#A78BFA` violet | Machine Learning / Predictive |
| `bi` | `--proj-bi` | `#F5B544` amber | Analytics / BI |

**Mechanism.** Each project declares `category:` in front matter. The card (`_includes/project-card.html`), the detail article (`_layouts/project.html`), and `<body>` (`_layouts/default.html`, `{% if page.category %}`) all emit `data-category="…"` - the `<body>` one is what lets the hue cascade **up to the transparent header**. CSS rules `[data-category="…"] { --proj-accent: …; --proj-wash: …; }` (top of `main.css`, just after `:root`) set two custom properties that **cascade** to descendants. The inline cover/thumbnail SVGs pick up `--proj-accent` through `color:` → `currentColor`; the chrome (cover eyebrow, cover wash-glow, listing hover-arrow/CTA, thumbnail hover hairline) reads the same var. On project detail pages the **header nav** (hover text + underline + active item) also reads it, via `body[data-category]`-scoped rules so non-project pages are unaffected. Missing/unknown category falls back to **brand blue** (`--proj-accent` defaults to `--color-accent`).

**Reach (deliberate).** Category hue touches **only project surfaces**: cover art + eyebrow + wash, listing thumbnail art + hover affordances, and - on project detail pages only - the **header nav** (hover text + underline + active). **Brand blue stays the global UI accent** everywhere else - buttons, focus rings, the page-transition edge, telemetry, hero, and the global `.eyebrow` (home/section kickers). The nav is the one UI surface that adopts the category hue, scoped to `body[data-category]` (project detail pages); home / about / the projects listing keep white-hover + brand-blue active. The listing card kicker (date · tag) stays muted on purpose; the colored art carries grid identity. Do **not** recolor the global `.eyebrow` to a category hue - it would bleed into home/section headers.

**Adding a project:** set `category: data|ml|bi` (only these three have hues - anything else falls back to brand blue) and `hero_image: true`, then author the **required** `_includes/projects/<slug>.svg` with a navy base + `currentColor`-at-opacity accents (keep `preserveAspectRatio="xMidYMid slice"` so it fills the tall cover). A genuinely new category needs a token pair + one `[data-category]` rule. The featured-first/date-desc sort is duplicated in `_includes/project-list.html` (listing) and `_layouts/project.html` (prev/next) - Liquid can't share the array via an include, so if you change the sort, change it in **both**.

### Project detail header (michellegore.com cover composition)

`_layouts/project.html` mirrors michellegore.com's project cover: a **meta column on the left, art bleeding on the right**, vertically centred, on the dark art (no centered-in-a-void). Nothing repeats:
- **Cover (hero):** a left column (`.project-cover__text`, `max-width: 34rem`) holds eyebrow (date · first tag) → title → the **single `description`** → the **credits** (`project-meta.html` → `.project-meta-block`): each Role / Domain / Stack value renders as a shared `.tag` pill (Stack splits on ` · ` into multiple pills; Domain stays one literal pill even when its text contains ` · `), label-over-pills with hairline rules - her treatment. The cover pills are **neutral white**, brightened via `.project-cover .tag` to read on the dark art (**no category hue** - the art + eyebrow already carry the hue). The inline SVG art fills the cover; a `linear-gradient(90deg, …)` **left scrim** keeps the text legible while the art reads on the right. There is **one** `description` per project - a combined hook-plus-substance line (no em dashes, no separate `intent:` field); it headlines the cover **and** feeds `jekyll-seo-tag`. Keep the description column narrow (`~38ch`) so text never sits on the bright center of the art.
- **Body:** opens straight into `{{ content }}` → prev/next. There is **no** tag chip row and **no** `## Tech Stack` section in the body - both duplicated the cover pills and were removed, so the cover credits are the single source of tech context (`tags:` front matter stays, feeding the cover eyebrow + the listing-card kicker in `project-card.html`). Credits are **not** repeated here (they live on the cover). No Timeline row: the cover eyebrow already shows the date. The cover has **no** Back-to-Projects link - the transparent header's Projects nav is the way back (and it's themed to the project). An image-less project (no `page.image`) falls back to a body `.detail-back-row` back-link + plain `<h1>` instead of the cover.
- Don't re-center the cover or move credits back to the body without asking - the left-column composition is deliberate.

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
