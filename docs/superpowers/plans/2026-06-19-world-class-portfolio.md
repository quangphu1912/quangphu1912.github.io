# World-Class AI & Data Engineering Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing Apple-inspired Jekyll portfolio from a generic "Data Science Portfolio" into a recruiter-converting AI & Data Engineering portfolio — refined visuals, correct positioning, and conversion touches — without rewriting project/case-study content.

**Architecture:** A themeless Jekyll 4.4 site (`theme: null`) driven by a single hand-built design system in `assets/css/main.css`. Enhancements extend the existing design tokens and includes; no theme is introduced, no redesign. Work is split into 4 independently-shippable phases: (1) foundation/code-quality, (2) positioning + consolidated hero + light content pass, (3) aesthetic polish (concrete CSS upgrades from a senior-designer review), (4) recruiter-conversion touches.

**Tech Stack:** Jekyll 4.4.1, Ruby 3.3.6, Liquid templating, vanilla CSS (custom properties) + vanilla JS (IntersectionObserver), Kramdown markdown, self-hosted Inter variable font. Deployed via GitHub Pages from `main`.

## Global Constraints

(Copied from the spec/decisions — every task implicitly includes these.)

- **Stay themeless:** `theme: null` in `_config.yml`. Do not introduce a gem theme or `remote_theme`.
- **Build command:** `bundle exec jekyll build` (must exit 0 with no Liquid errors). Serve: `bundle exec jekyll serve --livereload` → http://127.0.0.1:4000.
- **Extend, don't rewrite:** reuse existing tokens (`--color-primary`, `--color-accent`, `--space-*`, `--text-*`, `--shadow-*`) and includes (`image-hero.html`, `image-project-card.html`, `project-card.html`). Do not refactor adjacent code beyond the task's scope.
- **Dark-mode safe:** every new color must use an existing token pair or include an explicit dark value inside the existing `@media (prefers-color-scheme: dark)` block.
- **Accent restraint:** `--color-accent: #FF3B30` (dark `#FF453A`) passes WCAG AA only for **bold ≥14px** text. Use it ONLY on metrics, badges, the status dot, and the testimonial quote-mark. Never on body text or links.
- **Motion-guarded:** all new transitions must use `var(--transition-fast|base|slow)` so the existing global `@media (prefers-reduced-motion: reduce)` block zeroes them.
- **No body-font change:** body keeps the system font stack. Headings may use the self-hosted Inter variable font (Phase 3 only).
- **Light content pass:** do NOT rewrite project `.md` bodies or case-study `.md` bodies. Only positioning copy (title/description/hero/about/contact) and skills data change.
- **Skills honesty:** only list skills the owner can defend in an interview. Modern DE tools (Airflow, dbt, Spark, Kafka, Kubernetes, Terraform) are opt-in additions the owner must confirm.
- **a11y/perf floors:** Lighthouse mobile — Accessibility ≥ 95, Performance ≥ 90, SEO = 100. No new per-page network requests (inline SVGs; no new CDNs).
- **Git:** conventional commits, one per task; branch from `develop`; do not commit to `main`/`develop`/`master` directly.

### Testing approach (this is a static site — no unit-test framework)

There is no RSpec/htmlproofer in the Gemfile. Each task's verification gate is therefore:
1. `bundle exec jekyll build` exits 0 with no Liquid/front-matter warnings.
2. A targeted check command (grep / file existence) listed in the task.
3. Visual acceptance criteria verified in the browser at the end of each phase (the Phase checkpoint).

---

## File Structure

**New files:**
- `assets/css/fonts.css` — `@font-face` for Inter variable font (Phase 3).
- `assets/fonts/Inter-Var.woff2` — subsetted Inter variable font (Phase 3).
- `assets/js/nav.js` — mobile hamburger toggle (Phase 1).
- `assets/js/reveal.js` — IntersectionObserver scroll-reveal (Phase 3).
- `_includes/mermaid.html` — extracted Mermaid loader, dark-aware (Phase 1).
- `_includes/testimonial-card.html` — social-proof card (Phase 4).
- `_data/skills.yml` — skills data, lead category = Data Engineering (Phase 2).
- `_data/testimonials.yml` — pulled from case-study quotes (Phase 4).
- `assets/images/favicon.png`, `assets/images/apple-touch-icon.png`, `assets/images/favicon.svg` — favicon set (Phase 1).
- `assets/images/og/default.png` — 1200×630 default social-share image (Phase 4).
- `assets/Phu-Le-Resume.pdf` — copied from the LaTeX resume repo (Phase 4).
- `scripts/sync-resume.sh` — optional helper to re-copy the latest resume PDF (Phase 4).

**Modified files (by responsibility):**
- `_config.yml` — positioning metadata (`title`, `description`).
- `_layouts/default.html` — favicon links, Mermaid include, font preload, deferred JS, og:image default.
- `_layouts/notebook.html` — remove inline `<style>` (moves to main.css).
- `_includes/image-hero.html` — extended to render the consolidated hero (name + role + bridge + creds + CTAs).
- `_includes/header.html` — mobile nav button, active state, status dot.
- `_includes/footer.html` — social SVG icons, email obfuscation.
- `index.md` — consolidated hero caller, `_data` consumption, metrics strip, testimonials, eyebrow labels, class swaps.
- `about.md` — headline bridge copy.
- `case-studies/*.md` — wrap exec-summary metrics in `<strong class="metric">` (markup only, no prose change).
- `assets/css/main.css` — all token/component/aesthetic changes (most tasks touch this).
- `case-studies.md`, `404.md`, `privacy.md`, `_layouts/page.html`, `_layouts/project.html`, `_layouts/case-study.html` — inline-style → class consolidation.
- `README.md` — fix deploy-branch doc.

**Deleted files:**
- `sample_page.md` (legacy Lorem ipsum, Apr 2023).

---

# Phase 1 — Foundation & Code Quality

> Ship this first. The site looks ~identical afterward but is cleaner, faster (no per-page Mermaid), and has a working mobile nav + favicon. All later phases build on this.

### Task 1.1: Add favicon set and wire it up

**Files:**
- Create: `assets/images/favicon.svg`, `assets/images/favicon.png` (32×32), `assets/images/apple-touch-icon.png` (180×180)
- Modify: `_layouts/default.html` (favicon TODO around line 39–40)

**Interfaces:**
- Produces: a browser-tab icon on every page.

- [ ] **Step 1: Generate the favicon assets**

Create `assets/images/favicon.svg` (an "PL" monogram, primary blue on transparent/white):
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#007AFF"/>
  <text x="32" y="44" font-family="-apple-system, Inter, sans-serif" font-size="34" font-weight="700"
        text-anchor="middle" fill="#FFFFFF">PL</text>
</svg>
```
Then rasterize PNGs (requires ImageMagick or `rsvg-convert`; if unavailable, generate via any editor):
```bash
# if rsvg-convert is installed:
rsvg-convert -w 32 -h 32 assets/images/favicon.svg -o assets/images/favicon.png
rsvg-convert -w 180 -h 180 assets/images/favicon.svg -o assets/images/apple-touch-icon.png
```
If neither tool exists, create the two PNGs by hand in an image editor at 32×32 and 180×180 using the same monogram.

- [ ] **Step 2: Wire the favicon links in `default.html`**

In `_layouts/default.html`, replace the commented TODO block (around lines 39–40) with:
```html
<link rel="icon" type="image/svg+xml" href="{{ '/assets/images/favicon.svg' | relative_url }}">
<link rel="icon" type="image/png" sizes="32x32" href="{{ '/assets/images/favicon.png' | relative_url }}">
<link rel="apple-touch-icon" sizes="180x180" href="{{ '/assets/images/apple-touch-icon.png' | relative_url }}">
```

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build`
Expected: build succeeds. Then `grep -c "apple-touch-icon" _site/index.html` → `1`.

- [ ] **Step 4: Commit**

```bash
git add assets/images/favicon.svg assets/images/favicon.png assets/images/apple-touch-icon.png _layouts/default.html
git commit -m "feat: add favicon set and wire into default layout"
```

---

### Task 1.2: Conditionally load Mermaid (and make it dark-mode aware)

**Files:**
- Create: `_includes/mermaid.html`
- Modify: `_layouts/default.html` (remove inline Mermaid script ~lines 42–60), `_layouts/case-study.html`, `_layouts/project.html`, `_layouts/notebook.html`

**Interfaces:**
- Produces: `{% include mermaid.html %}` — renders Mermaid only on pages that include it; initializes with the dark theme when the OS is in dark mode.

- [ ] **Step 1: Create `_includes/mermaid.html`**

```html
<script type="module">
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({
    startOnLoad: true,
    theme: prefersDark ? 'dark' : 'default',
    themeVariables: prefersDark
      ? { primaryColor: '#1C1C1E', primaryTextColor: '#F5F5F7', primaryBorderColor: '#0A84FF', lineColor: '#6E6E73' }
      : { primaryColor: '#F5F5F7', primaryTextColor: '#1D1D1F', primaryBorderColor: '#007AFF', lineColor: '#6E6E73' }
  });
</script>
```

- [ ] **Step 2: Remove the inline Mermaid block from `default.html`**

In `_layouts/default.html`, delete the existing `<script type="module">…mermaid…</script>` block (around lines 42–60).

- [ ] **Step 3: Include it only in the three content layouts**

Add `{% include mermaid.html %}` just before `</article>` (or before `{% include footer.html %}`) in `_layouts/case-study.html`, `_layouts/project.html`, and `_layouts/notebook.html`.

- [ ] **Step 4: Verify**

Run: `bundle exec jekyll build && grep -c "mermaid.esm" _site/index.html _site/case-studies/aws-ml-pipeline/index.html 2>/dev/null || true`
Expected: `_site/index.html` count = `0`; a case-study page count ≥ `1`. (Home no longer pays the CDN cost.)

- [ ] **Step 5: Commit**

```bash
git add _includes/mermaid.html _layouts/default.html _layouts/case-study.html _layouts/project.html _layouts/notebook.html
git commit -m "perf: load Mermaid only on pages with diagrams, with dark-theme support"
```

---

### Task 1.3: Mobile navigation (hamburger)

**Files:**
- Create: `assets/js/nav.js`
- Modify: `_includes/header.html`, `assets/css/main.css` (`.nav-toggle`, responsive `.nav-menu`), `_layouts/default.html` (load `nav.js`)

**Interfaces:**
- Produces: a `<button class="nav-toggle">` visible <768px that toggles `.nav-menu.open`; works without JS (links stack).

- [ ] **Step 1: Add the toggle button to `header.html`**

Replace the `<nav class="site-nav …">…</nav>` block in `_includes/header.html` with:
```html
<nav class="site-nav flex items-center justify-between" aria-label="Primary">
    <a href="{{ '/' | relative_url }}" class="site-logo">
        <h1>{{ site.name }}</h1>
    </a>

    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-menu">
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
    </button>

    <ul id="nav-menu" class="nav-menu flex gap-4">
        <li><a href="{{ '/' | relative_url }}" class="nav-link">Home</a></li>
        <li><a href="{{ '/projects/' | relative_url }}" class="nav-link">Projects</a></li>
        <li><a href="{{ '/case-studies/' | relative_url }}" class="nav-link">Case Studies</a></li>
        <li><a href="{{ '/about/' | relative_url }}" class="nav-link">About</a></li>
    </ul>
</nav>
```

- [ ] **Step 2: Add the CSS in `main.css`** (append a new "Mobile nav" section):

```css
.nav-toggle { display: none; flex-direction: column; justify-content: space-between;
  width: 28px; height: 22px; padding: 0; background: none; border: none; cursor: pointer; }
.nav-toggle-bar { display: block; width: 100%; height: 2px; background: var(--color-text);
  transition: transform var(--transition-base), opacity var(--transition-base); }

@media (max-width: 767px) {
  .nav-toggle { display: flex; }
  .nav-menu { position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; gap: 0; padding: var(--space-2) var(--space-4) var(--space-4);
    background: var(--color-background); border-bottom: 1px solid var(--color-border);
    display: none; }
  .nav-menu.open { display: flex; }
  .nav-menu li { width: 100%; }
  .nav-menu .nav-link { display: block; padding: var(--space-3) 0; }
}
/* progressive enhancement: if JS is disabled the links remain reachable via the open state */
```

- [ ] **Step 3: Create `assets/js/nav.js`**

```js
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  function close() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }

  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  menu.addEventListener('click', function (e) { if (e.target.classList.contains('nav-link')) close(); });
})();
```

- [ ] **Step 4: Load `nav.js` (deferred) in `default.html`**

Before `</body>` in `_layouts/default.html`:
```html
<script src="{{ '/assets/js/nav.js' | relative_url }}" defer></script>
```

- [ ] **Step 5: Verify**

Run: `bundle exec jekyll build && grep -c "nav-toggle" _site/index.html` → `1`.
Then in browser at <768px (DevTools iPhone 14 Pro): hamburger appears, clicking opens the menu, ESC closes it, tapping a link closes it, tab order reaches all links, 44px tap targets.

- [ ] **Step 6: Commit**

```bash
git add _includes/header.html assets/css/main.css assets/js/nav.js _layouts/default.html
git commit -m "feat: add accessible mobile hamburger navigation"
```

---

### Task 1.4: Nav active-state highlighting

**Files:**
- Modify: `_includes/header.html`, `assets/css/main.css`

**Interfaces:**
- Produces: `class="nav-link active"` on the link matching the current `page.url`.

- [ ] **Step 1: Add active-class logic in `header.html`**

Replace each `<li><a … class="nav-link">` with Liquid that compares `page.url`. Final nav list:
```html
<ul id="nav-menu" class="nav-menu flex gap-4">
  {% assign url = page.url %}
  <li><a href="{{ '/' | relative_url }}" class="nav-link{% if url == '/' %} active{% endif %}">Home</a></li>
  <li><a href="{{ '/projects/' | relative_url }}" class="nav-link{% if url contains '/projects' %} active{% endif %}">Projects</a></li>
  <li><a href="{{ '/case-studies/' | relative_url }}" class="nav-link{% if url contains '/case-studies' %} active{% endif %}">Case Studies</a></li>
  <li><a href="{{ '/about/' | relative_url }}" class="nav-link{% if url contains '/about' %} active{% endif %}">About</a></li>
</ul>
```

- [ ] **Step 2: Style the active state in `main.css`**

```css
.nav-link.active { color: var(--color-primary); font-weight: 600; }
```

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build && grep -o 'class="nav-link active"' _site/about/index.html | head -1` → prints the match.

- [ ] **Step 4: Commit**

```bash
git add _includes/header.html assets/css/main.css
git commit -m "feat: highlight active nav link"
```

---

### Task 1.5: Consolidate inline styles into classes (layouts + index.md + 404)

**Files:**
- Modify: `assets/css/main.css` (new utility/component classes), `_layouts/page.html`, `_layouts/project.html`, `_layouts/case-study.html`, `_layouts/notebook.html`, `index.md`, `404.md`, `privacy.md`, `case-studies.md`

**Interfaces:**
- Produces: reusable classes `.prose`, `.lede`, `.meta-text`, `.section-tinted`, `.text-center`, `.page-description`, `.project-back-link`, `.project-meta`. Target: 0 inline `style=` in `_layouts/`; <5 in `index.md`.

- [ ] **Step 1: Add the utility/component classes to `main.css`** (new "Helpers" section):

```css
.text-center { text-align: center; }
.prose { max-width: var(--max-width-prose, 760px); margin-inline: auto; }
.lede { font-size: var(--text-lg); color: var(--color-text-secondary); max-width: 60ch; }
.meta-text { color: var(--color-text-secondary); font-size: var(--text-sm); }
.section-tinted { background: linear-gradient(180deg, var(--color-surface), var(--color-background)); }
.page-description { color: var(--color-text-secondary); font-size: var(--text-lg); max-width: 60ch; }
.project-back-link, .back-link { display: inline-block; color: var(--color-primary);
  font-size: var(--text-sm); margin-bottom: var(--space-4); }
.project-meta { color: var(--color-text-secondary); font-size: var(--text-sm); margin-bottom: var(--space-4); }
```

- [ ] **Step 2: Replace inline styles with classes, file by file**

For each layout/page: replace `style="text-align: center;"` → `class="text-center"`; `style="color: var(--color-text-secondary); font-size: var(--text-sm);"` → `class="meta-text"`; `style="max-width: 800px; margin: 0 auto;"` → `class="prose"`; `style="background-color: var(--color-surface);"` → `class="section-tinted"` (on `<section>`s in index.md); experience `<h3 style="margin:0;">` → add `.experience-item-header h3 { margin: 0; }` to CSS and drop the inline style. Apply the same mapping in `404.md`, `privacy.md`, `case-studies.md`.

- [ ] **Step 3: Verify**

Run:
```bash
bundle exec jekyll build
grep -rn 'style=' _layouts/ | grep -v '<!--' | wc -l        # expect 0
grep -rn 'style=' index.md | grep -v '<!--' | wc -l         # expect < 5
```

- [ ] **Step 4: Commit**

```bash
git add assets/css/main.css _layouts/*.html index.md 404.md privacy.md case-studies.md
git commit -m "refactor: consolidate inline styles into token-based utility classes"
```

---

### Task 1.6: Move notebook.html inline `<style>` into main.css

**Files:**
- Modify: `_layouts/notebook.html` (delete inline `<style>` ~lines 52–95), `assets/css/main.css`

**Interfaces:**
- Produces: `.notebook-content` styles live in `main.css` (cached with the stylesheet).

- [ ] **Step 1: Move the rules**

Cut the contents of the `<style>…</style>` block in `_layouts/notebook.html` and paste them into `main.css` under a new `/* Notebook */` section, scoped as needed (they already target `pre`, `code`, `img`, `table`, `th` within `.notebook-content` — keep the same selectors). Remove the `<style>` tags.

- [ ] **Step 2: Verify**

Run: `bundle exec jekyll build && grep -c "<style>" _layouts/notebook.html` → `0`.
Open a notebook page (if none exist yet, skip visual; the build passing is the gate).

- [ ] **Step 3: Commit**

```bash
git add _layouts/notebook.html assets/css/main.css
git commit -m "refactor: move notebook inline styles into main stylesheet"
```

---

### Task 1.7: Remove dead scaffolding

**Files:**
- Delete: `sample_page.md`
- Modify: `case-studies.md` (remove empty `.case-studies-grid` div)

**Interfaces:**
- None.

- [ ] **Step 1: Delete the legacy sample page**

```bash
git rm sample_page.md
```

- [ ] **Step 2: Remove the empty grid div in `case-studies.md`**

Delete the empty `<div class="case-studies-grid"></div>` (around lines 19–20).

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build && ls sample_page.md 2>/dev/null || echo "deleted"` → `deleted`.

- [ ] **Step 4: Commit**

```bash
git add case-studies.md
git commit -m "chore: remove dead sample_page.md and empty case-studies grid"
```

---

### Task 1.8: Fill spacing-token gaps + prose-width + radius tokens

**Files:**
- Modify: `assets/css/main.css` (`:root` tokens)

**Interfaces:**
- Produces: `--space-5`, `--space-7`, `--max-width-prose`, `--border-radius-xs`, `--border-radius-lg` tokens consumed by later tasks.

- [ ] **Step 1: Add tokens in the `:root` block** (near the existing `--space-*` and `--border-radius*` definitions):

```css
--space-5: 2.5rem;   /* 40px */
--space-7: 3.5rem;   /* 56px */
--max-width-prose: 760px;
--border-radius-xs: 4px;
--border-radius-lg: 16px;
```

- [ ] **Step 2: Verify**

Run: `bundle exec jekyll build && grep -c "\-\-space-5:" assets/css/main.css` → `1`.

- [ ] **Step 3: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: add missing spacing, prose-width and radius design tokens"
```

---

### Task 1.9: Fix README deploy-branch doc

**Files:**
- Modify: `README.md`

**Interfaces:**
- None.

- [ ] **Step 1: Correct the branch reference**

In `README.md`, replace references to deploying from `master` with `main` (GitHub Pages source branch). Verify the current default:
```bash
git -C /Users/WangFu/GitHub/projects/quangphu1912.github.io branch -a
```

- [ ] **Step 2: Verify**

Run: `grep -ni "master" README.md` → no deploy-branch matches (or only historical context).

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: correct deploy branch to main"
```

---

### Phase 1 checkpoint

- [ ] `bundle exec jekyll serve --livereload`. Open Home, About, Projects, a Case Study, 404.
- [ ] Mobile (iPhone 14 Pro): hamburger works; nav highlights current page; no horizontal scroll.
- [ ] Browser tab shows the favicon.
- [ ] View-source Home: no `mermaid.esm` script. Case study: diagram renders, dark theme if OS dark.
- [ ] Commit any remaining fixes, then merge phase branch to `develop`.

---

# Phase 2 — Positioning, Hero & Content (light pass)

### Task 2.1: Update `_config.yml` positioning metadata

**Files:**
- Modify: `_config.yml` (lines 1–9)

**Interfaces:**
- Produces: `site.title` and `site.description` leading with AI & Data Engineering (consumed by jekyll-seo-tag and the footer).

- [ ] **Step 1: Edit `_config.yml`**

```yaml
title: "Phu Le — AI & Data Engineering Portfolio"
description: "Data Engineer & ML Specialist building production data pipelines and AI systems. GCP Professional Data Engineer, AWS Solutions Architect. Python, SQL, cloud-native ETL, MLOps."
```
Leave `name`, `author`, `email`, `linkedin_username`, `github_username`, `google_cloud_profile`, `url`, `theme: null` unchanged.

- [ ] **Step 2: Verify**

Run: `bundle exec jekyll build && grep -o "AI &amp; Data Engineering Portfolio" _site/index.html | head -1` → match in `<title>`.

- [ ] **Step 3: Commit**

```bash
git add _config.yml
git commit -m "feat: reposition site metadata toward AI & Data Engineering"
```

---

### Task 2.2: Consolidate the two heroes into one (extend `image-hero.html`)

**Files:**
- Modify: `_includes/image-hero.html`, `index.md` (frontmatter + hero call + remove `.hero-section` block lines 11–28)

**Interfaces:**
- Produces: `image-hero.html` accepts `lead` and `creds` params and renders CTAs — one full-bleed hero with name, role, bridge, credentials, and both CTA buttons.

- [ ] **Step 1: Read the current include**

```bash
cat _includes/image-hero.html
```

- [ ] **Step 2: Extend `_includes/image-hero.html`**

Replace the overlay content so it renders an optional `lead` line, `creds` strip, and the CTA buttons. Keep the existing `<picture>`/`<noscript>` background and gradient overlay markup; only change the inner `.hero-content`:
```html
<div class="hero-content">
  <h1 class="hero-title">{{ include.title }}</h1>
  {% if include.subtitle %}<p class="hero-subtitle">{{ include.subtitle }}</p>{% endif %}
  {% if include.lead %}<p class="hero-lead">{{ include.lead }}</p>{% endif %}
  {% if include.creds %}<p class="hero-creds">{{ include.creds }}</p>{% endif %}
  <div class="cta-buttons flex gap-4">
    <a href="{{ '/projects/' | relative_url }}" class="btn btn-primary">View Projects</a>
    <a href="{{ '/assets/Phu-Le-Resume.pdf' | relative_url }}" class="btn btn-secondary" download
       aria-label="Download Phu Le's resume (PDF)">Download Resume</a>
  </div>
</div>
```

- [ ] **Step 3: Update `index.md`** — set frontmatter `description` and call the hero with the new params; delete the separate `.hero-section` block (the old description + CTA block). New top of `index.md`:
```markdown
---
layout: default
title: Home
description: AI & Data Engineer | Production data pipelines, cloud-native ETL, MLOps
image: /assets/images/hero/hero.webp
image_alt: "Hero background"
---

{% include image-hero.html image=page.image alt=page.image_alt
   title="Phu Le" subtitle="AI & Data Engineer"
   lead="Production data pipelines & AI systems."
   creds="GCP Professional Data Engineer · AWS Solutions Architect" %}

<div class="container">
```
(Delete everything that was the old `.hero-section` wrapper so the next section follows the hero directly.)

> **Asset note (flag, don't block):** `assets/images/hero/hero.webp` is a generic stock office image. Since the hero now carries more weight, the owner may swap it for something less generic (abstract/data texture, or a personal photo). The implementer should surface this; it does not block the task.

- [ ] **Step 4: Add minimal hero-content CSS** (in `main.css` `.hero-content` block; full gradient treatment arrives in Task 3.3):
```css
.hero-lead { color: rgba(255,255,255,0.92); font-size: var(--text-lg); margin-top: var(--space-2); }
.hero-creds { color: rgba(255,255,255,0.8); font-size: var(--text-sm); margin-top: var(--space-1); }
.hero-content .cta-buttons { margin-top: var(--space-6); }
```

- [ ] **Step 5: Verify**

Run: `bundle exec jekyll build && grep -c "Download Resume" _site/index.html` → `1`; `grep -c "hero-section" _site/index.html` → `0`.
Browser: one full-bleed hero with name, role, bridge, creds, and both buttons; the old duplicate block is gone.

- [ ] **Step 6: Commit**

```bash
git add _includes/image-hero.html index.md assets/css/main.css
git commit -m "feat: consolidate home page into a single hero with role, proof and CTAs"
```

---

### Task 2.3: Move skills to `_data/skills.yml` (lead with Data Engineering)

**Files:**
- Create: `_data/skills.yml`
- Modify: `index.md` (replace hardcoded skills grid, lines ~35–80)

**Interfaces:**
- Produces: `site.data.skills` — an array of `{ category, items[] }`, Data Engineering first. `index.md` renders it via Liquid.

- [ ] **Step 1: Create `_data/skills.yml`** (curated by the owner — see honesty gate):

```yaml
- category: "Data Engineering & Pipelines"
  items: ["Python", "SQL", "PostgreSQL", "ETL/ELT Pipelines", "Data Modeling"]
- category: "Cloud & Infrastructure"
  items: ["AWS", "GCP", "Docker", "Git", "CI/CD"]
- category: "Machine Learning & AI"
  items: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP", "MLOps"]
- category: "Analytics & Business"
  items: ["CFA", "Financial Analysis", "Strategy", "Data Visualization", "Risk Management"]
```

> ⚠️ **Owner action (honesty gate):** review each item. Only add the modern DE toolchain (Airflow, dbt, Spark, Kafka, Kubernetes, Terraform) to the Data Engineering or Cloud categories if you can defend them in an interview. The AWS-pipeline case study (Kinesis → Lambda → Redshift) supports AWS/GCP/ETL; confirm the rest.

- [ ] **Step 2: Replace the hardcoded grid in `index.md`** with a Liquid loop over the data:
```liquid
<div class="skills-grid grid grid-cols-1">
  {% for skill in site.data.skills %}
  <div class="skill-category card">
    <h3 class="card-title">{{ skill.category }}</h3>
    <div class="flex gap-2 skills-tags">
      {% for item in skill.items %}
      <span class="tag">{{ item }}</span>
      {% endfor %}
    </div>
  </div>
  {% endfor %}
</div>
```

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build && grep -c "Data Engineering &amp; Pipelines" _site/index.html` → `1`; verify it appears before "Cloud & Infrastructure" (`grep -n`).

- [ ] **Step 4: Commit**

```bash
git add _data/skills.yml index.md
git commit -m "feat: drive skills from _data, lead with Data Engineering"
```

---

### Task 2.4: Promote certifications as badges

**Files:**
- Modify: `index.md` (Education section ~lines 132–158)

**Interfaces:**
- Consumes: `.cert-badge` class (styled in Task 3.2) and `site.google_cloud_profile`.

- [ ] **Step 1: Rework the Education section** so the two highest-signal certs lead, with badge markup:
```liquid
<section class="education-section section-sm section-tinted">
  <div class="container">
    <span class="eyebrow">Credentials</span>
    <h2 class="section-title">Education & Certifications</h2>
    <div class="grid grid-cols-1 prose">
      <div class="card">
        <span class="cert-badge">GCP Professional Data Engineer</span>
        <p class="meta-text" style="margin-top:var(--space-2)">
          <a href="{{ site.google_cloud_profile }}" target="_blank" rel="noopener noreferrer">View profile →</a>
        </p>
      </div>
      <div class="card">
        <span class="cert-badge">AWS Certified Solutions Architect</span>
      </div>
      <div class="card">
        <h3 class="card-title">MBA</h3>
        <p class="meta-text">Business Administration</p>
      </div>
      <div class="card">
        <h3 class="card-title">CFA Charterholder</h3>
        <p class="meta-text">Chartered Financial Analyst</p>
      </div>
    </div>
  </div>
</section>
```
(The single inline `style` here is acceptable; it is consolidated only if Task 1.5 added a utility. Prefer adding `.cert-badge + p { margin-top: var(--space-2); }` to CSS instead.)

- [ ] **Step 2: Verify**

Run: `bundle exec jekyll build && grep -c "cert-badge" _site/index.html` → `2`.

- [ ] **Step 3: Commit**

```bash
git add index.md assets/css/main.css
git commit -m "feat: promote GCP/AWS certifications as badges"
```

---

### Task 2.5: Refresh about.md + contact copy (bridge, don't erase)

**Files:**
- Modify: `about.md` (headline ~lines 11–17), `index.md` (contact section copy)

**Interfaces:**
- None.

- [ ] **Step 1: Reframe `about.md` opening** to bridge toward AI & Data Engineering while staying truthful to the DS/finance background. Replace the opening sentence(s) with something like:
> "I'm a data engineer and ML specialist who builds production data pipelines and AI systems. My path started in finance and analytics — 7+ years across BMO, Deloitte/PwC and Tiki — and I now focus on cloud-native data platforms and MLOps, backed by my Google Cloud Professional Data Engineer and AWS Solutions Architect certifications."

Keep the rest of about.md unchanged (experience, "What I'm Working On" already mentions LLMs, real-time inference, feature stores).

- [ ] **Step 2: Update the Contact copy in `index.md`**

Change "discussing data science opportunities" → "discussing AI & Data Engineering roles".

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build && grep -c "AI &amp; Data Engineering roles" _site/index.html` → `1`.

- [ ] **Step 4: Commit**

```bash
git add about.md index.md
git commit -m "docs: bridge About and Contact copy toward AI & Data Engineering"
```

---

### Phase 2 checkpoint

- [ ] `<title>` and meta description lead with "AI & Data Engineering".
- [ ] One consolidated hero renders name, role, bridge, creds, both CTAs (resume button links to the PDF path — file lands in Task 4.1).
- [ ] Skills render from `_data`, Data Engineering first.
- [ ] GCP/AWS cert badges present.
- [ ] No project or case-study `.md` body text changed.

---

# Phase 3 — Aesthetic Polish & Flair

> Concrete CSS from the senior-designer review. All dark-mode + a11y safe. Grouped by concern.

### Task 3.1: Layered "Apple depth" shadows

**Files:**
- Modify: `assets/css/main.css` (shadow tokens ~lines 49–53 light, 72–74 dark; `.card` ~line 271)

**Interfaces:**
- Produces: two-layer shadow tokens + a resting `--shadow-card`; cards lift perceptibly on hover.

- [ ] **Step 1: Redefine the shadow tokens**

In `:root`:
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,.04), 0 2px 6px rgba(0,0,0,.06);
--shadow-md: 0 2px 4px rgba(0,0,0,.05), 0 8px 24px rgba(0,0,0,.09);
--shadow-lg: 0 4px 8px rgba(0,0,0,.06), 0 18px 40px rgba(0,0,0,.12);
--shadow-card: 0 1px 2px rgba(0,0,0,.04), 0 1px 1px rgba(0,0,0,.03);
```
In the dark-mode block:
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,.4), 0 2px 6px rgba(0,0,0,.5);
--shadow-md: 0 2px 4px rgba(0,0,0,.45), 0 8px 24px rgba(0,0,0,.55);
--shadow-lg: 0 4px 8px rgba(0,0,0,.5), 0 18px 40px rgba(0,0,0,.6);
--shadow-card: 0 1px 2px rgba(0,0,0,.4), 0 1px 1px rgba(0,0,0,.3);
```

- [ ] **Step 2: Apply the resting card shadow + lift**

```css
.card { box-shadow: var(--shadow-card); border: 1px solid transparent; }
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--color-border); }
```

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build`. Browser: cards visibly float on hover (4px lift + border reveal). Dark mode: shadows are darker, not invisible.

- [ ] **Step 4: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: layered Apple-style shadows with resting card state"
```

---

### Task 3.2: Real glassmorphism header

**Files:**
- Modify: `assets/css/main.css` (`.site-header` ~lines 385–399 light + dark)

**Interfaces:**
- Produces: an iOS-Control-Center-style frosted header (`saturate(180%)`) with a solid fallback.

- [ ] **Step 1: Replace `.site-header` background/blur**

Light:
```css
.site-header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
}
```
Dark (inside the dark-media block):
```css
.site-header {
  background: rgba(0,0,0,0.55);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
}
```

- [ ] **Step 2: Add the no-`backdrop-filter` fallback**

```css
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .site-header { background: var(--color-background); }
}
```

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build`. Browser: scroll a content-heavy page — header stays frosted, content behind looks vivid (not washed). Verify nav-link contrast still ≥ 4.5:1.

- [ ] **Step 4: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: refined glass header with saturation boost and fallback"
```

---

### Task 3.3: Hero gradient-text name + typography refinements

**Files:**
- Modify: `assets/css/main.css` (`.hero-content .hero-title` ~line 767; `h3`–`h6` tracking ~lines 114–117; new `.eyebrow`; long-form line-height)

**Interfaces:**
- Produces: a gradient-text signature on the hero name only; tighter heading tracking; section eyebrows; readable long-form measure.

- [ ] **Step 1: Gradient hero name (solid fallback included)**

```css
.hero-content .hero-title {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #FFFFFF 0%, #B8D4FF 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: #FFFFFF;
}
```

- [ ] **Step 2: Heading tracking**

```css
h3 { letter-spacing: -0.01em; }
h4, h5, h6 { letter-spacing: -0.005em; }
```

- [ ] **Step 3: Section eyebrow**

```css
.eyebrow { display: block; font-size: var(--text-xs); font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-primary);
  margin-bottom: var(--space-1); text-align: center; }
```

- [ ] **Step 4: Add eyebrows before section titles in `index.md`**

Before each `<h2 class="section-title">` (Skills, Experience, Education, Contact) add a matching `<span class="eyebrow">…</span>` (e.g. `Skills`, `Experience`, `Credentials`, `Contact`).

- [ ] **Step 5: Long-form readability**

```css
.case-study-content p, .project-content p, .notebook-content p { line-height: 1.7; max-width: 70ch; }
```

- [ ] **Step 6: Verify**

Run: `bundle exec jekyll build`. Browser: hero name shows a white→icy-blue gradient; section titles show eyebrows; case-study paragraphs read at a comfortable measure. Test Firefox + Safari for the gradient fallback (solid white if unsupported).

- [ ] **Step 7: Commit**

```bash
git add assets/css/main.css index.md
git commit -m "feat: gradient hero name, heading tracking, section eyebrows, readable measure"
```

---

### Task 3.4: Accent "data signal" + exec-summary highlight reel

**Files:**
- Modify: `assets/css/main.css` (new `.metric`, `.cert-badge`, `.executive-summary` ~line 699), `case-studies/aws-ml-pipeline.md`, `case-studies/churn-prediction.md`, `case-studies/sentiment-analysis.md`

**Interfaces:**
- Produces: `.metric` (accent, tabular nums), `.cert-badge` (accent pill), redesigned `.executive-summary` with eyebrow + accent metrics.

- [ ] **Step 1: Add the accent classes**

```css
.metric { color: var(--color-accent); font-variant-numeric: tabular-nums; font-weight: 700; }
.cert-badge { display: inline-block; background: var(--color-accent); color: #FFFFFF;
  font-size: var(--text-sm); font-weight: 600; padding: 0.25em 0.6em;
  border-radius: var(--border-radius-sm); }
.executive-summary {
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%);
  border: 1px solid var(--color-border); border-left: 4px solid var(--color-primary);
  border-radius: var(--border-radius); padding: var(--space-4); box-shadow: var(--shadow-card);
}
.executive-summary::before { content: "Executive Summary"; display: block;
  font-size: var(--text-xs); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--color-primary); margin-bottom: var(--space-2); }
.executive-summary .metric { color: var(--color-accent); font-weight: 700; }
```

- [ ] **Step 2: Wrap metrics in the case studies**

In each `case-studies/*.md`, find the bold metrics in the Executive Summary section (e.g. `**98%**`, `**0.89 AUC**`, `**$200K/year**`) and change the wrapping to `<strong class="metric">98%</strong>`, etc. **Do not change any prose — only wrap the existing figures.**

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build && grep -c "class=\"metric\"" _site/case-studies/aws-ml-pipeline/index.html` → ≥ `1`.
Browser: exec summary shows the eyebrow label and accent-colored numbers; cert badges are accent pills. Dark mode: metrics stay legible (`#FF453A`).

- [ ] **Step 4: Commit**

```bash
git add assets/css/main.css case-studies/*.md
git commit -m "feat: accent data-signal metrics and redesigned executive-summary callout"
```

---

### Task 3.5: Experience → real timeline (rail + nodes)

**Files:**
- Modify: `assets/css/main.css` (`.experience-timeline` ~line 555, `.experience-item` ~line 560)

**Interfaces:**
- None (decorative `::before`).

- [ ] **Step 1: Add the rail and nodes**

```css
.experience-timeline { position: relative; padding-left: var(--space-4); }
.experience-timeline::before { content: ""; position: absolute; left: 7px; top: 8px; bottom: 8px;
  width: 2px; background: var(--color-border); }
.experience-item { position: relative; }
.experience-item::before { content: ""; position: absolute;
  left: calc(-1 * var(--space-4) + 2px); top: 10px;
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--color-background); border: 2px solid var(--color-primary);
  transition: background var(--transition-base); }
.experience-item:hover::before { background: var(--color-primary); }
```

- [ ] **Step 2: Verify**

Run: `bundle exec jekyll build`. Browser: Experience section shows a vertical rail with a node per role; nodes fill primary blue on hover.

- [ ] **Step 3: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: render experience as a timeline with rail and nodes"
```

---

### Task 3.6: Section rhythm + tinted gradients

**Files:**
- Modify: `assets/css/main.css` (`.section*` ~lines 172–178), `index.md` (section classes)

**Interfaces:**
- Produces: `.section`/`.section-sm`/`.section-lg` rhythm + `.section-tinted` gradient.

- [ ] **Step 1: Define rhythm classes**

```css
.section { padding: var(--space-8) 0; }
.section-sm { padding: var(--space-6) 0; }
.section-lg { padding: var(--space-12) 0; }
```

- [ ] **Step 2: Re-class sections in `index.md`** — hero/contact wrappers use `.section-lg`; skills/education use `.section-sm section-tinted`; experience stays `.section`. (`.section-tinted` was added in Task 1.5.)

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build`. Browser: hero and contact have more breathing room; tinted sections show a subtle surface→background gradient instead of a flat band. Dark mode still moody.

- [ ] **Step 4: Commit**

```bash
git add assets/css/main.css index.md
git commit -m "feat: varied section rhythm and tinted gradient bands"
```

---

### Task 3.7: Motion & interaction polish

**Files:**
- Modify: `assets/css/main.css` (buttons ~254/262, `.nav-link` ~415, `:focus-visible` ~321, `.project-card .image-thumbnail` ~796)

**Interfaces:**
- None (all motion uses tokens → auto reduced-motion-guarded).

- [ ] **Step 1: Button press feedback**

```css
.btn-primary:active { transform: translateY(0) scale(0.98); }
.btn-secondary:active { transform: scale(0.98); }
```

- [ ] **Step 2: Nav underline grow-from-left**

```css
.nav-link { position: relative; }
.nav-link::after { content: ""; position: absolute; left: 0; bottom: -4px; height: 2px;
  width: 0; background: var(--color-primary); transition: width var(--transition-base); }
.nav-link:hover::after, .nav-link:focus-visible::after { width: 100%; }
```

- [ ] **Step 3: Refined focus ring** (keep outline fallback for forced-colors)

```css
:focus-visible { outline: none; border-radius: var(--border-radius-sm);
  box-shadow: 0 0 0 2px var(--color-background), 0 0 0 4px var(--color-primary); }
@media (forced-colors: active) { :focus-visible { outline: 2px solid CanvasText; box-shadow: none; } }
```

- [ ] **Step 4: Image zoom-inside-card (remove conflicting whole-figure scale)**

Remove the existing `.image-thumbnail:hover { transform: scale(1.05); }` (~line 804). Add:
```css
.project-card .image-thumbnail { overflow: hidden; }
.project-card .image-thumbnail img { transition: transform 400ms ease-out; }
.project-card:hover .image-thumbnail img { transform: scale(1.04); }
```

- [ ] **Step 5: Verify**

Run: `bundle exec jekyll build`. Browser: buttons depress on click; nav links get a left-growing underline; focus rings show a ring-with-gap; project images zoom inside the card on hover. Toggle "reduce motion" in DevTools → all transforms stop.

- [ ] **Step 6: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: button press, nav underline, focus ring and card image-zoom micro-interactions"
```

---

### Task 3.8: Self-hosted Inter heading font

**Files:**
- Create: `assets/fonts/Inter-Var.woff2`, `assets/css/fonts.css`
- Modify: `assets/css/main.css` (`--font-display` token, heading font-family), `_layouts/default.html` (preload + link)

**Interfaces:**
- Produces: `--font-display` token; headings render in Inter with system fallback; `font-display: swap` prevents invisible text.

- [ ] **Step 1: Obtain a subsetted Inter variable woff2**

```bash
mkdir -p assets/fonts
# Option A — download a pre-subsetted variable woff2 (~90KB) from the official release:
curl -L -o assets/fonts/Inter-Var.woff2 "https://github.com/rsms/inter/releases/download/v4.0/Inter-4.0.var.woff2"
# (If that exact URL is unavailable, download Inter from https://rsms.me/inter/ and subset latin glyphs
#  with pyftsubset: pyftsubset Inter.var.woff2 --unicodes="U+0000-00FF,U+2000-206F" --layout-features='*' --flavor=woff2)
ls -lh assets/fonts/Inter-Var.woff2   # expect < ~120KB
```

- [ ] **Step 2: Create `assets/css/fonts.css`**

```css
@font-face {
  font-family: 'Inter';
  src: url('../fonts/Inter-Var.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
  unicode-range: U+0000-00FF, U+2000-206F, U+2200-22FF;
}
```

- [ ] **Step 3: Add the token and apply to headings in `main.css`**

```css
:root { --font-display: 'Inter', var(--font-system); }
h1, h2, h3, .hero-title, .section-title, .card-title { font-family: var(--font-display); }
```

- [ ] **Step 4: Preload + link in `default.html` `<head>`**

```html
<link rel="preload" href="{{ '/assets/fonts/Inter-Var.woff2' | relative_url }}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{{ '/assets/css/fonts.css' | relative_url }}">
```

- [ ] **Step 5: Verify**

Run: `bundle exec jekyll build`. Browser DevTools → Network: `Inter-Var.woff2` loads once; headings render in Inter (check Computed font-family). Body text stays system font. Lighthouse Performance ≥ 90 (font is preloaded + swap).

- [ ] **Step 6: Commit**

```bash
git add assets/fonts/Inter-Var.woff2 assets/css/fonts.css assets/css/main.css _layouts/default.html
git commit -m "feat: self-host subsetted Inter variable font for headings"
```

---

### Task 3.9: Scroll-reveal (motion-guarded)

**Files:**
- Create: `assets/js/reveal.js`
- Modify: `_layouts/default.html` (load script), `assets/css/main.css` (`[data-reveal]` + reduced-motion guard), `index.md` (add `data-reveal` to section wrappers + cards)

**Interfaces:**
- Produces: elements with `data-reveal` fade/translate in on scroll; fully disabled under reduced-motion.

- [ ] **Step 1: Create `assets/js/reveal.js`**

```js
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-visible'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  els.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(el); });
})();
```

- [ ] **Step 2: Add CSS**

```css
[data-reveal] { opacity: 0; transform: translateY(8px);
  transition: opacity 400ms ease-out, transform 400ms ease-out; }
[data-reveal].is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 3: Load the script in `default.html`** before `</body>`:
```html
<script src="{{ '/assets/js/reveal.js' | relative_url }}" defer></script>
```

- [ ] **Step 4: Tag reveal targets in `index.md`** — add `data-reveal` to each `<section>` wrapper and to `.skill-category`/`.experience-item` cards.

- [ ] **Step 5: Verify**

Run: `bundle exec jekyll build`. Browser: sections/cards gently fade up on scroll. DevTools → Rendering → "Emulate prefers-reduced-motion: reduce" → everything visible immediately, no transform.

- [ ] **Step 6: Commit**

```bash
git add assets/js/reveal.js assets/css/main.css _layouts/default.html index.md
git commit -m "feat: motion-guarded scroll reveal on sections and cards"
```

---

### Task 3.10: Component & grid polish (honorable mentions)

**Files:**
- Modify: `assets/css/main.css` (`.skills-grid` ~545, `.project-image` ~594, `.tag` ~292 + new `.tag--primary`, `.case-study-content h2` ~664), `_includes/project-card.html`

**Interfaces:**
- None.

- [ ] **Step 1: Skills grid 2-column on desktop**

```css
.skills-grid { display: grid; gap: var(--space-3); }
@media (min-width: 640px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
```

- [ ] **Step 2: Consistent project image aspect ratio**

```css
.project-image { aspect-ratio: 16 / 9; height: auto; background: var(--color-surface); }
```

- [ ] **Step 3: Two-tier tags**

```css
.tag { background: var(--color-surface); color: var(--color-text-secondary); font-weight: 500; }
.tag--primary { background: rgba(0,122,255,0.10); color: var(--color-primary);
  border: 1px solid rgba(0,122,255,0.20); font-weight: 600; }
@media (prefers-color-scheme: dark) {
  .tag--primary { background: rgba(10,132,255,0.15); border-color: rgba(10,132,255,0.30); }
}
```
In `_includes/project-card.html`, add `.tag--primary` to the first tag rendered.

- [ ] **Step 4: Gradient hairline under case-study H2** (replace the heavy `border-bottom: 2px solid`)

```css
.case-study-content h2 { border: none; padding-bottom: var(--space-2);
  background: linear-gradient(90deg, var(--color-border) 0%, transparent 100%) no-repeat;
  background-size: 100% 1px; background-position: 0 100%; }
```

- [ ] **Step 5: Verify**

Run: `bundle exec jekyll build`. Browser: skills form a 2×2 grid on desktop; project card images share 16:9; the first tag in a card is the primary-tinted variant; case-study H2s have a fading hairline.

- [ ] **Step 6: Commit**

```bash
git add assets/css/main.css _includes/project-card.html
git commit -m "feat: skills 2-col grid, 16:9 card images, two-tier tags, hairline dividers"
```

---

### Phase 3 checkpoint

- [ ] Headings render in Inter; body stays system font. Lighthouse Performance ≥ 90.
- [ ] Accent visible only on metrics/badges/dot/quote-mark; never on body text. Contrast rechecked.
- [ ] Shadows layered; header frosted; timeline + nodes; exec-summary is a highlight reel.
- [ ] Reduced-motion: no transforms anywhere. Dark mode: every new surface flips correctly.

---

# Phase 4 — Recruiter-Conversion Touches

### Task 4.1: Real resume button (copy the PDF; unblocks the hero CTA)

**Files:**
- Create: `assets/Phu-Le-Resume.pdf` (copied from the LaTeX repo), `scripts/sync-resume.sh` (optional)
- The button already exists from Task 2.2; this adds the file it points to.

**Interfaces:**
- Produces: `/assets/Phu-Le-Resume.pdf` downloadable from the hero CTA.

- [ ] **Step 1: Copy the latest built resume**

```bash
cp /Users/WangFu/GitHub/projects/resume/output/20260527_Phu-Le-main.pdf \
   assets/Phu-Le-Resume.pdf
ls -lh assets/Phu-Le-Resume.pdf
```

- [ ] **Step 2: Create the optional sync helper `scripts/sync-resume.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail
SRC="$(git rev-parse --show-toplevel 2>/dev/null)/../resume/output"
LATEST="$(ls -t "$SRC"/*Phu-Le*.pdf | head -1)"
cp "$LATEST" "$(dirname "$0")/../assets/Phu-Le-Resume.pdf"
echo "Synced $LATEST -> assets/Phu-Le-Resume.pdf"
```
```bash
chmod +x scripts/sync-resume.sh
```

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build` and open `/assets/Phu-Le-Resume.pdf` in the browser → the PDF downloads/renders. Click the hero "Download Resume" button → downloads the file.

- [ ] **Step 4: Commit**

```bash
git add assets/Phu-Le-Resume.pdf scripts/sync-resume.sh
git commit -m "feat: add downloadable resume PDF and sync helper"
```

---

### Task 4.2: Testimonials (social proof, right after the hero)

**Files:**
- Create: `_data/testimonials.yml`, `_includes/testimonial-card.html`
- Modify: `index.md` (insert a testimonials section after the hero)

**Interfaces:**
- Produces: `site.data.testimonials` and a `.testimonial-card` include.

- [ ] **Step 1: Create `_data/testimonials.yml`** (quote pulled verbatim from `case-studies/aws-ml-pipeline.md`):

```yaml
- quote: "The real-time dashboards have completely changed how we run campaigns. We caught an underperforming Google Ads campaign at 11 AM and paused it, saving $3,200 that day alone."
  author: "Marketing Manager"
  context: "Enterprise SaaS Company"
  source: "/case-studies/aws-ml-pipeline/"
```

- [ ] **Step 2: Create `_includes/testimonial-card.html`**

```html
<figure class="testimonial-card card">
  <blockquote class="testimonial-quote">{{ include.quote }}</blockquote>
  <figcaption class="testimonial-author">
    <span class="testimonial-name">{{ include.author }}</span>
    <span class="meta-text">{{ include.context }}</span>
  </figcaption>
  <a class="testimonial-source" href="{{ include.source | relative_url }}">Read the case study →</a>
</figure>
```

- [ ] **Step 3: Style it in `main.css`**

```css
.testimonials-grid { display: grid; gap: var(--space-4); }
.testimonial-card { padding: var(--space-5); position: relative; }
.testimonial-card::before { content: "\201C"; position: absolute; top: var(--space-2); left: var(--space-3);
  font-size: 3.5rem; line-height: 1; color: var(--color-accent); opacity: 0.5; }
.testimonial-quote { font-size: var(--text-lg); font-style: italic; margin: 0 0 var(--space-3); }
.testimonial-author { display: flex; flex-direction: column; gap: 2px; }
.testimonial-name { font-weight: 600; }
.testimonial-source { display: inline-block; margin-top: var(--space-2); color: var(--color-primary); font-size: var(--text-sm); }
```

- [ ] **Step 4: Add the section to `index.md`** immediately after the hero `<div class="container">` closes (before Skills):
```liquid
<section class="testimonials-section section-sm">
  <div class="container">
    <span class="eyebrow">Proof</span>
    <h2 class="section-title">What collaborators say</h2>
    <div class="testimonials-grid">
      {% for t in site.data.testimonials %}
      {% include testimonial-card.html quote=t.quote author=t.author context=t.context source=t.source %}
      {% endfor %}
    </div>
  </div>
</section>
```

- [ ] **Step 5: Verify**

Run: `bundle exec jekyll build && grep -c "testimonial-card" _site/index.html` → ≥ `1`. Browser: testimonial card renders after the hero with the accent quote-mark and a link to the case study.

- [ ] **Step 6: Commit**

```bash
git add _data/testimonials.yml _includes/testimonial-card.html assets/css/main.css index.md
git commit -m "feat: add testimonial social-proof section after the hero"
```

---

### Task 4.3: "Open to roles" status indicator

**Files:**
- Modify: `_includes/header.html` (next to the logo), `assets/css/main.css`

**Interfaces:**
- Produces: an accent dot + label next to `site.name`, visible on all pages.

- [ ] **Step 1: Add the indicator in `header.html`**

```html
<a href="{{ '/' | relative_url }}" class="site-logo">
    <h1>{{ site.name }}</h1>
    <span class="status-indicator"><span class="status-dot" aria-hidden="true"></span>Open to AI & Data Engineering roles</span>
</a>
```

- [ ] **Step 2: Style it in `main.css`**

```css
.status-indicator { display: inline-flex; align-items: center; gap: var(--space-1);
  font-size: var(--text-xs); color: var(--color-text-secondary); margin-left: var(--space-2); }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(255,59,48,0.18); }
@media (max-width: 767px) { .status-indicator { display: none; } }
```

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build`. Browser: accent dot + label next to the name on desktop; hidden on mobile (where space is tight).

- [ ] **Step 4: Commit**

```bash
git add _includes/header.html assets/css/main.css
git commit -m "feat: add 'open to roles' status indicator in header"
```

---

### Task 4.4: Metrics strip ("At a Glance")

**Files:**
- Modify: `index.md` (new section near the top, after testimonials), `assets/css/main.css`

**Interfaces:**
- Consumes: `.metric` (Task 3.4) and Inter heading font.

- [ ] **Step 1: Add the section in `index.md`** (after testimonials, before Skills):
```liquid
<section class="metrics-strip section-sm">
  <div class="container">
    <div class="metrics-grid">
      <div class="metric-cell"><span class="metric metric-figure">7+</span><span class="metric-label">years experience</span></div>
      <div class="metric-cell"><span class="metric metric-figure">10M+</span><span class="metric-label">events / day</span></div>
      <div class="metric-cell"><span class="metric metric-figure">98%</span><span class="metric-label">latency reduction</span></div>
      <div class="metric-cell"><span class="metric metric-figure">$240K+</span><span class="metric-label">annual impact</span></div>
    </div>
  </div>
</section>
```
> Owner check: confirm each figure matches the case studies (these reuse the verified case-study table).

- [ ] **Step 2: Style it in `main.css`**

```css
.metrics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
@media (min-width: 768px) { .metrics-grid { grid-template-columns: repeat(4, 1fr); } }
.metric-cell { display: flex; flex-direction: column; gap: var(--space-1); text-align: center; }
.metric-figure { font-size: var(--text-4xl); line-height: 1; }
.metric-label { color: var(--color-text-secondary); font-size: var(--text-sm); }
```

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build && grep -c "metrics-grid" _site/index.html` → `1`. Browser: a 4-up metrics strip; numbers in accent + Inter, large.

- [ ] **Step 4: Commit**

```bash
git add index.md assets/css/main.css
git commit -m "feat: add 'At a Glance' metrics strip on the home page"
```

---

### Task 4.5: Footer social SVG icons

**Files:**
- Modify: `_includes/footer.html` (lines 16–33), `assets/css/main.css` (`.social-links`)

**Interfaces:**
- None.

- [ ] **Step 1: Replace the text links with icon+label in `footer.html`**

```html
<ul class="social-links flex gap-4">
  {% if site.linkedin_username %}
  <li>
    <a href="https://linkedin.com/in/{{ site.linkedin_username }}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z"/></svg>
      <span>LinkedIn</span>
    </a>
  </li>
  {% endif %}
  {% if site.github_username %}
  <li>
    <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>
      <span>GitHub</span>
    </a>
  </li>
  {% endif %}
  <li>
    <a href="mailto:{{ site.email }}" aria-label="Email">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1.6 1 7.4 5.6L19.4 6zM20 7.3l-7.4 5.6a1 1 0 0 1-1.2 0L4 7.3V18h16z"/></svg>
      <span>Email</span>
    </a>
  </li>
</ul>
```

- [ ] **Step 2: Style `.social-links a` as hover chips in `main.css`**

```css
.social-links a { display: inline-flex; align-items: center; gap: var(--space-1);
  padding: var(--space-1) var(--space-2); border-radius: var(--border-radius-sm);
  transition: background var(--transition-fast), color var(--transition-fast); }
.social-links a:hover { background: var(--color-surface); color: var(--color-primary); }
.social-links svg { width: 18px; height: 18px; }
```

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build && grep -c "social-links" _site/index.html` → ≥ `1`; confirm each `<a>` has an `aria-label` and the SVG has `aria-hidden`. Browser: icons + labels render, hover chips work, dark mode icons flip via `currentColor`.

- [ ] **Step 4: Commit**

```bash
git add _includes/footer.html assets/css/main.css
git commit -m "feat: replace footer text links with SVG social icons"
```

---

### Task 4.6: og:image default fallback

**Files:**
- Create: `assets/images/og/default.png` (1200×630, branded: name + role + subtle pattern)
- Modify: `_layouts/default.html` (og:image meta ~lines 19–21, 28–30)

**Interfaces:**
- Produces: a site-wide default social-share image for pages without a `page.image`.

- [ ] **Step 1: Create the OG image**

Produce a 1200×630 PNG (`assets/images/og/default.png`) containing the name "Phu Le", the role line "AI & Data Engineer", and the credential strip, on a primary-blue-tinted background. (Use any image editor; this is a static asset.)

- [ ] **Step 2: Add the fallback in `default.html`**

Where the OG/Twitter image is emitted, default to the site image:
```liquid
{% assign og_image = page.image | default: '/assets/images/og/default.png' %}
<meta property="og:image" content="{{ site.url }}{{ og_image }}">
<meta name="twitter:image" content="{{ site.url }}{{ og_image }}">
```

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build && grep -c "og/default.png" _site/about/index.html` → `1` (About has no `page.image`, so it falls back).

- [ ] **Step 4: Commit**

```bash
git add assets/images/og/default.png _layouts/default.html
git commit -m "feat: add default og:image for pages without a hero image"
```

---

### Task 4.7: Email obfuscation

**Files:**
- Modify: `_includes/footer.html` (email link), `assets/js/nav.js` or a tiny inline script

**Interfaces:**
- None.

- [ ] **Step 1: Render the email via a JS reassembly**

In `_includes/footer.html`, replace the `mailto:` href with a no-harvest placeholder and reassemble on click:
```html
<a href="#" data-user="{{ site.email | split: '@' | first }}"
   data-domain="{{ site.email | split: '@' | last }}" aria-label="Email">
  <svg ...><!-- keep the email icon --></svg><span>Email</span>
</a>
```
Add to `assets/js/nav.js` (or a new tiny `assets/js/contact.js` loaded deferred):
```js
document.querySelectorAll('a[data-user][data-domain]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'mailto:' + a.dataset.user + '@' + a.dataset.domain;
  });
});
```

- [ ] **Step 2: Verify**

Run: `bundle exec jekyll build && grep -c "mailto:" _site/index.html` → `0` (the address is no longer in the static HTML). Browser: clicking "Email" opens the mail client correctly.

- [ ] **Step 3: Commit**

```bash
git add _includes/footer.html assets/js/nav.js
git commit -m "feat: obfuscate email address against harvesting"
```

---

### Task 4.8: Audit GitHub repo links / shields badges

**Files:**
- Modify: `_projects/aws-pipeline.md`, `_projects/churn-prediction.md`, `_projects/sentiment-analysis.md`

**Interfaces:**
- None.

- [ ] **Step 1: Check each repo exists**

```bash
for repo in aws-ml-pipeline churn-prediction sentiment-analysis; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://github.com/quangphu1912/$repo")
  echo "$repo -> $code"
done
```

- [ ] **Step 2: Remove or genericize broken badges**

For any repo returning `404`: remove the shields.io CI/Lint/Test badges (they render as broken/gray). Keep a single "View Code →" link, or replace with *"Code available on request."* For repos that exist (`200`), leave badges as-is.

- [ ] **Step 3: Verify**

Run: `bundle exec jekyll build && grep -rc "img.shields.io" _site/projects/` — every remaining badge resolves to a `200` repo (re-run the curl check for any kept).

- [ ] **Step 4: Commit**

```bash
git add _projects/*.md
git commit -m "fix: remove broken GitHub badges; genericize unverifiable repo links"
```

---

### Phase 4 checkpoint (full integration)

- [ ] `bundle exec jekyll serve --livereload` — Home, Projects, a Case Study, About, 404.
- [ ] Hero "Download Resume" downloads the real PDF.
- [ ] Testimonial + metrics strip render after the hero.
- [ ] Header shows the status dot; footer shows SVG icons; email not harvestable in view-source.
- [ ] No broken shields badges.
- [ ] **Lighthouse (mobile):** Performance ≥ 90, Accessibility ≥ 95, SEO = 100, Best Practices ≥ 95.
- [ ] **Dark mode** full pass: header, sections, timeline, exec summary, accent metrics, icons, OG n/a.
- [ ] **Reduced motion** full pass: no transforms; content fully visible.
- [ ] Merge the phase branch to `develop`, then `develop` → `main` for Pages deploy.

---

## Self-Review

**Spec coverage:** positioning (2.1, 2.2, 2.5) ✓ · consolidated hero (2.2) ✓ · skills `_data` (2.3) ✓ · certs (2.4) ✓ · favicon (1.1) ✓ · mobile nav (1.3) ✓ · active state (1.4) ✓ · inline-style consolidation (1.5) ✓ · Mermaid perf+dark (1.2) ✓ · dead code (1.7) ✓ · README (1.9) ✓ · aesthetic Top-10: layered shadows (3.1) ✓ · accent metrics (3.4) ✓ · glass header (3.2) ✓ · timeline (3.5) ✓ · gradient hero name (3.3) ✓ · exec summary (3.4) ✓ · footer icons (4.5) ✓ · section rhythm (3.6) ✓ · focus/press (3.7) ✓ · favicon+og (1.1, 4.6) ✓ · Inter font (3.8) ✓ · scroll reveal (3.9) ✓ · resume (4.1) ✓ · testimonials (4.2) ✓ · status dot (4.3) ✓ · metrics strip (4.4) ✓ · email obfuscation (4.7) ✓ · badge audit (4.8) ✓ · notebook style (1.6) ✓ · tokens (1.8) ✓.

**Placeholder scan:** every code step contains real code or a real command; "owner check" items are explicit decisions, not TBDs. No "implement later."

**Type/name consistency:** class names are consistent across tasks — `.section-tinted` (defined 1.5, used 2.4/3.6), `.eyebrow` (3.3, used 2.4/4.2/4.4), `.metric` (3.4, used 4.4), `.cert-badge` (3.4, used 2.4), `--max-width-prose` (1.8, used 1.5), `--shadow-card` (3.1, used 3.4), `--font-display` (3.8), `data-reveal`/`.is-visible` (3.9). Include param names in `image-hero.html` (`lead`, `creds`) match the `index.md` call in 2.2.
