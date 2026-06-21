# Michelle-Gore Cover / Scroll-Cue / Prev-Next — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the portfolio michellegore.com's premium feel — a confident project **cover** with a **scroll-down cue**, a home-hero scroll-cue, a per-card reveal cascade, a labelled **prev/next** band, and a clean card → cover **view-transition** — using only native CSS/Liquid/IntersectionObserver (no new dependencies).

**Architecture:** Jekyll static site. All styles live in the single flat `assets/css/main.css`; templates in `_includes/`/`_layouts/`; motion in `assets/js/` (already shipped: `reveal.js`, `count-up.js`). This plan is almost entirely **CSS + small markup edits** — the cover markup, `scroll-cue.html`, and prev/next logic are **already committed**; what remains is the CSS to style them plus three small markup tweaks. Every effect degrades gracefully (gated on the `.js` class and `prefers-reduced-motion`).

**Tech Stack:** Jekyll 4 / Liquid, vanilla CSS (custom properties, `@view-transition`, `@keyframes`, `svh`), IntersectionObserver (existing `reveal.js`). No build step beyond `jekyll build`.

## Current State (do NOT redo)

Already committed on this branch (`fa2544a` + merge `b0853c7`):
- `docs/reference/michelle-gore/{main,work,project,about,specs}.md` — the 4-page teardown (Deliverable A, done).
- `_includes/scroll-cue.html` — reusable chevron anchor: `{% include scroll-cue.html target="<id>" label="<a11y>" %}`.
- `_layouts/project.html` — cover markup (`.project-cover` / `__head` / `__eyebrow` / `__title` / `__media` with `view-transition-name: vt-{{ page.slug }}`), cue targeting `#project-body`, and listing-ordered prev/next (`.project-nav.detail-nav` with `__link--prev/--next`, `__kicker`, `__title`).
- `_includes/image-project-card.html` — card thumbnail already carries `view-transition-name: vt-{{ slug }}` (the morph's other half).

**The gap:** none of the cover/cue/nav CSS exists in `main.css` yet, so the committed cover renders unstyled. This plan supplies that CSS plus the home-hero cue and per-card reveal.

## Global Constraints

Every task implicitly includes these (copied from CLAUDE.md + project memory):
- **No em dashes** in any copy, comment, or markup. Use `-` or `,` (e.g. write `featured-first, then date-desc`, never `featured-first — then`).
- **Conventional commits** (`feat:` / `fix:` / `refactor:` / `docs:`).
- **Feature branch only.** Current branch `worktree-michelle-gore-anlysis`. The pre-commit hook blocks direct commits to `main`/`develop`. Ship = fast-forward into `main`.
- **All motion gated** on the `.js` class AND `prefers-reduced-motion` — content must be fully visible/usable with JS off or reduced motion on.
- **Single flat CSS file** `assets/css/main.css`. No preprocessor, no new files for styles.
- **Verify in `_site/`, not source.** Liquid only renders at build.
- **Build command (exact, rbenv lazy-init is broken in this shell):**
  ```bash
  JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build
  ```
  Watch output for `error` / `Liquid Warning`.
- **Reuse existing tokens** — never hardcode values that have a variable: spacing `--space-1..12`, `--ease-out-expo`, `--transition-fast/base/slow`, `--text-*`, `--tracking-label`, `--font-mono`, colors `--color-text(-secondary)` / `--color-accent-text` / `--color-border` / `--color-background`, radii `--border-radius(-lg)`, `--shadow-md`.

---

### Task 1: Cover / scroll-cue / prev-next CSS foundation

Styles the already-committed cover markup, defines the reusable `.scroll-cue` (used again in Task 2), restyles the prev/next band, and tunes the view-transition + smooth scroll. One cohesive CSS addition appended to `main.css`.

**Files:**
- Modify: `_layouts/project.html` (drop the now-redundant `detail-nav` class from the nav element — `.project-nav` + the existing `.detail-nav` separator both apply; we keep `detail-nav` for the separator, see note).
- Modify: `assets/css/main.css` (append one new section before the print block at EOF).

**Interfaces:**
- Consumes (already in markup): `.project-cover`, `.project-cover__head`, `.project-cover__eyebrow`, `.project-cover__title`, `.project-cover__media`, `.scroll-cue` + `.scroll-cue__icon` (from `scroll-cue.html`), `.project-nav` + `.project-nav__link--prev/--next` + `.project-nav__kicker` + `.project-nav__title`, target id `#project-body`.
- Produces (Task 2 reuses): styled `.scroll-cue` / `.scroll-cue__icon` + `scroll-cue-bob` keyframe; target-offset rule keyed on `#project-body, #glance`.

**Note on `.detail-nav`:** the committed nav is `<nav class="project-nav detail-nav" ...>`. The existing `.detail-nav` rule (`main.css:303`) already gives `margin-top/padding-top/border-top` — exactly the band separator we want, so we KEEP it and add `.project-nav` only for flex layout + kicker/title. `.detail-nav-row` (`main.css:304`) is now dead (old markup no longer emits it) — leave it, do not delete (out of scope; flag only).

- [ ] **Step 1: Append the CSS block to `assets/css/main.css`**

Append exactly this at the end of the file, BEFORE the `@media print { ... }` block. (If easier, insert immediately after the VIEW TRANSITIONS block that ends at the `.hero-home__title, .identity-name { view-transition-name: vt-phu; }` line — either location works since these selectors don't conflict.)

```css
/* ============================================
   PROJECT COVER + SCROLL CUE  (michellegore.com-inspired)
   ============================================ */

/* Tall cover: eyebrow + title on top, natural 16:9 media, scroll cue pinned bottom.
   min-height (not height) so content never clips on short/wide viewports.
   svh avoids the mobile URL-bar jump; the vh line is the fallback for older engines. */
.project-cover {
  display: flex;
  flex-direction: column;
  min-height: 62vh;
  min-height: 62svh;
  margin-bottom: var(--space-6);
}
.project-cover__head { margin-bottom: var(--space-4); }
.project-cover__eyebrow { margin-bottom: var(--space-2); }
.project-cover__title {
  margin: 0;
  font-size: clamp(2.25rem, 1.4rem + 3.4vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
}

/* Media keeps its natural 16:9 so the card -> cover view-transition scales cleanly
   (old and new snapshots share an aspect ratio). Reuses the .project-hero scrim. */
.project-cover__media {
  position: relative;
  margin: 0;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}
.project-cover__media img { display: block; width: 100%; height: auto; }
.project-cover__media::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 62%, color-mix(in srgb, var(--color-background) 22%, transparent));
}

/* Scroll cue: centered chevron link, reused by the project cover AND the home hero. */
.scroll-cue {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin: var(--space-4) auto 0;
  color: var(--color-text-secondary);
  transition: color var(--transition-base);
}
.project-cover .scroll-cue { margin-top: auto; }   /* pin to the bottom of the flex cover */
.scroll-cue:hover, .scroll-cue:focus-visible { color: var(--color-accent-text); }
.scroll-cue__icon { display: block; fill: currentColor; }

/* Restrained "scroll down" bob - off under reduced motion (cue stays static, still usable). */
@media (prefers-reduced-motion: no-preference) {
  .scroll-cue__icon { animation: scroll-cue-bob 2.4s var(--ease-out-expo) infinite; }
}
@keyframes scroll-cue-bob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(4px); }
}

/* Prev/next band: layout only. The .detail-nav class on the same element supplies
   the top border + spacing. Empty <span> placeholders keep one-sided nav aligned. */
.project-nav { display: flex; justify-content: space-between; gap: var(--space-4); }
.project-nav__link {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  max-width: 22rem;
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-fast);
}
.project-nav__link--prev { margin-right: auto; }
.project-nav__link--next { margin-left: auto; text-align: right; }
.project-nav__kicker {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-text-secondary);
}
.project-nav__title { font-size: var(--text-lg); font-weight: 600; letter-spacing: -0.01em; }
.project-nav__link:hover .project-nav__title,
.project-nav__link:focus-visible .project-nav__title { color: var(--color-accent-text); }

/* Sticky-header offset so scroll-cue anchor jumps don't tuck the target under the header.
   #project-body = project cover target; #glance = home hero cue target (added in Task 2). */
#project-body, #glance { scroll-margin-top: var(--space-8); }

/* Card -> cover morph: keep both snapshots filling their box so a differing aspect ratio
   scales instead of stretching (also smooths the Home <-> About title morph). */
::view-transition-old(*), ::view-transition-new(*) { object-fit: cover; }

/* Smooth in-page scrolling for the cue anchors - disabled under reduced motion. */
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

- [ ] **Step 2: Drop the redundant `detail-nav`? No — keep it. Confirm the nav class string is unchanged.**

Open `_layouts/project.html` and confirm the nav element reads exactly:

```html
<nav class="project-nav detail-nav" aria-label="Project navigation">
```

No edit needed — `.detail-nav` provides the separator, `.project-nav` (Step 1) provides layout. (This step exists so the executor verifies the class contract rather than assuming.) If the class string differs, restore it to the above.

- [ ] **Step 3: Build and watch for errors**

Run:
```bash
JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build 2>&1 | tail -15
```
Expected: ends with `done in N seconds.`, NO `error`, NO `Liquid Warning`.

- [ ] **Step 4: Verify the CSS shipped into `_site` (not just source)**

Run:
```bash
grep -c "62svh" _site/assets/css/main.css
grep -c "scroll-cue-bob" _site/assets/css/main.css
grep -o "view-transition-old(\*)[^}]*object-fit: cover" _site/assets/css/main.css
grep -o "scroll-behavior: smooth" _site/assets/css/main.css
```
Expected: the first prints `1` (the `62svh` min-height rule shipped - `svh` lives in `.project-cover`, not `.project-cover__media`, so we grep the value directly); the second prints `2` (keyframe def + the animation reference both contain the token — `2` confirms the block shipped; `1` is also acceptable if only the `@keyframes` name matched, anything `>=1` passes); the third prints the `object-fit: cover` rule; the fourth prints `scroll-behavior: smooth`.

- [ ] **Step 5: Screenshot the project cover (served `_site`)**

Run:
```bash
(cd _site && python3 -m http.server 8765 >/dev/null 2>&1 &) ; sleep 1
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --hide-scrollbars --window-size=1280,1100 \
  --screenshot=/tmp/cover.png http://localhost:8765/projects/churn-prediction/index.html
```
Expected: `/tmp/cover.png` written. Read it. Verify: tall cover (~62% viewport), eyebrow (date + first tag) above a large title, 16:9 cover image with a soft bottom scrim, a centered chevron near the bottom, and the prev/next band at the page bottom shows a "Previous project" / "Next project" kicker over each title, edge-justified.

- [ ] **Step 6: Commit**

```bash
git add assets/css/main.css _layouts/project.html
git commit -m "feat: style project cover, scroll cue, and prev/next band"
```

---

### Task 2: Home-hero scroll-cue

Adds the inviting chevron under the home hero (Michelle's signature entry cue), linking to the first section below. Reuses the `.scroll-cue` styling from Task 1.

**Files:**
- Modify: `_includes/hero-home.html` (add an optional cue after `.hero-home__inner`).
- Modify: `index.md` (pass `cue_target`, add the matching `id` to the metrics section).

**Interfaces:**
- Consumes: `scroll-cue.html` include (`target`, `label` params); `.scroll-cue` CSS from Task 1; `#glance` offset rule from Task 1.
- Produces: nothing downstream.

- [ ] **Step 1: Add the optional cue to `_includes/hero-home.html`**

The hero is two-column; the cue should center under both columns, so it goes INSIDE `.hero-home` but AFTER `.hero-home__inner`. Change the end of the file from:

```html
    <div class="hero-home__aside">
      {% include hero-telemetry.html %}
    </div>
  </div>
</section>
```

to:

```html
    <div class="hero-home__aside">
      {% include hero-telemetry.html %}
    </div>
  </div>
  {% if include.cue_target %}{% include scroll-cue.html target=include.cue_target label="Scroll to highlights" %}{% endif %}
</section>
```

- [ ] **Step 2: Pass `cue_target` and add the target id in `index.md`**

Change the hero include (currently lines 9-12) from:

```liquid
{% include hero-home.html
   eyebrow="DATA & AI ENGINEER · TORONTO · AWS CERTIFIED"
   title="Phu Le"
   lead="I build the cloud data platforms that power AI, production pipelines and the data-quality infrastructure that makes downstream ML trustworthy." %}
```

to (add the `cue_target` line):

```liquid
{% include hero-home.html
   eyebrow="DATA & AI ENGINEER · TORONTO · AWS CERTIFIED"
   title="Phu Le"
   lead="I build the cloud data platforms that power AI, production pipelines and the data-quality infrastructure that makes downstream ML trustworthy."
   cue_target="glance" %}
```

Then add the matching `id` to the metrics section. Change (currently line 15):

```html
<section class="metrics-strip section-sm" data-reveal>
```

to:

```html
<section id="glance" class="metrics-strip section-sm" data-reveal>
```

- [ ] **Step 3: Build**

Run:
```bash
JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build 2>&1 | tail -8
```
Expected: `done in N seconds.`, no `error`/`Liquid Warning`.

- [ ] **Step 4: Verify the cue + anchor target shipped to the home page**

Run:
```bash
grep -o 'class="scroll-cue" href="#glance"' _site/index.html
grep -o 'id="glance"' _site/index.html
```
Expected: both print a match (the cue links to `#glance`, and the metrics section carries `id="glance"`).

- [ ] **Step 5: Screenshot the home hero**

Run (server from Task 1 still up; if not, restart it):
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --hide-scrollbars --window-size=1280,1100 \
  --screenshot=/tmp/home.png http://localhost:8765/index.html
```
Expected: `/tmp/home.png` written. Read it. Verify a centered chevron sits below the hero columns, above the "At a Glance" metrics.

- [ ] **Step 6: Commit**

```bash
git add _includes/hero-home.html index.md
git commit -m "feat: add scroll cue to home hero linking to highlights"
```

---

### Task 3: Per-card staggered reveal

Moves scroll-reveal from the work CONTAINERS onto each card so projects cascade in (Michelle's "cards appear with effect"), using `reveal.js`'s existing `(i % 4) * 60ms` stagger. No JS change.

**Files:**
- Modify: `_includes/project-card.html` (add `data-reveal` to the article).
- Modify: `index.md` (remove `data-reveal` from `.work-scroller`).
- Modify: `projects.md` (remove `data-reveal` from `.work-rows`).

**Interfaces:**
- Consumes: existing `.js [data-reveal]` / `.is-visible` CSS (`main.css:474-485`) and `reveal.js` stagger (`assets/js/reveal.js`).
- Produces: nothing downstream.

**Why move it off the container:** if both the container AND its cards carry `data-reveal`, the gallery double-reveals (container fades up while cards inside also fade). Per-card reveal alone gives the staggered cascade. On the home horizontal `.work-scroller`, cards initially in the viewport reveal on vertical scroll-in; cards overflowed to the right reveal as they scroll into horizontal view (intended gallery behavior). With JS off or reduced motion, all cards are visible immediately (existing `reveal.js` early-return).

- [ ] **Step 1: Add `data-reveal` to the card article in `_includes/project-card.html`**

Change (line 3):
```html
<article class="project-card card">
```
to:
```html
<article class="project-card card" data-reveal>
```

- [ ] **Step 2: Remove container reveal in `index.md`**

Change (line 58):
```html
  <div class="work-scroller" data-reveal>
```
to:
```html
  <div class="work-scroller">
```

- [ ] **Step 3: Remove container reveal in `projects.md`**

Change (line 20):
```html
    <div class="work-rows" data-reveal>
```
to:
```html
    <div class="work-rows">
```

- [ ] **Step 4: Build**

Run:
```bash
JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build 2>&1 | tail -8
```
Expected: `done in N seconds.`, no `error`/`Liquid Warning`.

- [ ] **Step 5: Verify reveal lives on cards, not the containers**

Run:
```bash
grep -o '<article class="project-card card" data-reveal>' _site/projects/index.html | head -1
grep -c 'work-scroller" data-reveal' _site/index.html
grep -c 'work-rows" data-reveal' _site/projects/index.html
```
Expected: first prints the card-with-`data-reveal` markup; second AND third print `0` (no container-level reveal remains).

- [ ] **Step 6: Screenshot the projects listing (JS-on cascade vs JS-off visible)**

Run:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --hide-scrollbars --window-size=1280,1400 \
  --screenshot=/tmp/projects.png http://localhost:8765/projects/index.html
```
Expected: `/tmp/projects.png` written. Read it. Verify the work-rows render (headless Chrome runs JS, so cards above the fold should be revealed; the IntersectionObserver reveals the rest on scroll). Confirm no card is permanently invisible above the fold.

- [ ] **Step 7: Commit**

```bash
git add _includes/project-card.html index.md projects.md
git commit -m "refactor: per-card scroll-reveal cascade instead of container fade"
```

---

### Task 4: Full graceful-degradation verification

One reviewer gate covering dark mode, mobile width, and reduced motion across the three changed surfaces. No code unless a defect is found.

**Files:** none (verification only). If a defect is found, fix in the relevant file from Tasks 1-3 and re-run that task's build + grep before continuing.

- [ ] **Step 1: Ensure a fresh build is served**

Run:
```bash
JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build 2>&1 | tail -3
(cd _site && python3 -m http.server 8765 >/dev/null 2>&1 &) ; sleep 1
```
Expected: build clean; server up.

- [ ] **Step 2: Dark mode — project cover**

Run:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --hide-scrollbars --window-size=1280,1100 --force-dark-mode \
  --screenshot=/tmp/cover-dark.png http://localhost:8765/projects/churn-prediction/index.html
```
Read `/tmp/cover-dark.png`. Verify: cover title/eyebrow legible on dark bg, scrim still reads, chevron + prev/next visible (not black-on-black).

- [ ] **Step 3: Mobile width (~390px) — home + project**

Run:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --hide-scrollbars --window-size=390,1500 \
  --screenshot=/tmp/home-mobile.png http://localhost:8765/index.html
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --hide-scrollbars --window-size=390,1500 \
  --screenshot=/tmp/cover-mobile.png http://localhost:8765/projects/churn-prediction/index.html
```
Read both. Verify: home cue centers and does not overlap the metrics; cover title scales down (clamp) without clipping; prev/next stacks/wraps acceptably (still tappable, no overflow off-screen).

- [ ] **Step 4: Reduced motion — confirm no animation, all visible**

Run:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --hide-scrollbars --window-size=1280,1400 --force-prefers-reduced-motion \
  --screenshot=/tmp/projects-rm.png http://localhost:8765/projects/index.html
```
Read `/tmp/projects-rm.png`. Verify: ALL cards fully visible (no `opacity:0` left behind), chevron static (no bob — static is correct in a screenshot regardless, but the CSS gating is what matters here). Cross-check the gate shipped:
```bash
grep -c "scroll-behavior: smooth" _site/assets/css/main.css   # expect 1 (inside no-preference media)
```

- [ ] **Step 5: Stop the preview server**

Run:
```bash
( pkill -f "http.server 8765" 2>/dev/null ) ; echo "server stopped"
```

- [ ] **Step 6: No commit** — verification only. If Steps 2-4 surfaced a defect, the fix was committed under its originating task; otherwise nothing to commit here.

---

### Task 5: Ship to production

Fast-forward the feature branch into `main`, push, confirm the GitHub Actions deploy goes green, and confirm the change is live.

**Files:** none (git + deploy only).

- [ ] **Step 1: Confirm a clean working tree and clean build**

Run:
```bash
git status -sb
JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build 2>&1 | tail -3
```
Expected: `git status` shows only the branch line (no uncommitted changes); build clean.

- [ ] **Step 2: Fast-forward into `main` and push**

Run:
```bash
git checkout main && git merge --ff-only worktree-michelle-gore-anlysis && git push origin main
git checkout worktree-michelle-gore-anlysis
```
Expected: fast-forward succeeds (no merge commit — this branch already contains `origin/main`); push accepted. (If `--ff-only` is rejected because `main` advanced, run `git fetch origin main`, merge `origin/main` into this branch, re-verify build, then retry.)

- [ ] **Step 3: Poll the Actions run to green**

Run:
```bash
for i in $(seq 1 20); do
  gh api repos/quangphu1912/quangphu1912.github.io/actions/runs \
    --jq '.workflow_runs[0] | "\(.status)/\(.conclusion)  \(.head_sha[0:7])"'
  sleep 15
done | awk '!seen[$0]++'
```
Expected: progresses to `completed/success  <sha>` where `<sha>` matches the just-pushed `main` HEAD (`git rev-parse --short main`).

- [ ] **Step 4: Confirm live (cache-bust the CDN)**

Run:
```bash
curl -s "https://quangphu1912.github.io/assets/css/main.css?cb=$RANDOM" | grep -c "scroll-cue-bob"
curl -s "https://quangphu1912.github.io/?cb=$RANDOM" | grep -c 'href="#glance"'
```
Expected: both `>= 1` (cover CSS live; home cue live). GitHub Pages updates within ~1 min of a green run; if `0`, wait 60s and re-run with a fresh `?cb=`.

---

## Self-Review

**Spec coverage** (against the user's four asks + the locked plan):
- Home scroll-arrow into revealing cards → Task 2 (hero cue) + Task 3 (per-card cascade). ✓
- Project cover + scroll-down cue → Task 1 CSS over the committed markup. ✓
- Prev/next project nav → committed markup + Task 1 band styling (listing order verified in Task 1 Step 5). ✓
- Page-to-page transition → `@view-transition` already shipped; Task 1 adds `object-fit: cover` morph fix. ✓
- Reference docs (Deliverable A) → already committed; out of scope here (noted in Current State). ✓

**Placeholder scan:** every code step shows the full before/after; every command states expected output. No TBD/TODO/"handle edge cases". ✓

**Type/name consistency:** `.scroll-cue` / `.scroll-cue__icon` / `scroll-cue-bob` used identically in Task 1 (def) and Task 2 (reuse). `#glance` is defined as the offset target in Task 1 Step 1 and created in Task 2 Step 2 — Task 1's `scroll-margin-top` rule references it before it exists in markup, which is harmless (a CSS rule with no matching element is a no-op until Task 2 lands). `cue_target` Liquid param matches between `hero-home.html` (consumer) and `index.md` (provider). ✓

**Known dead code (flag, do not delete):** `.detail-nav-row` (`main.css:304`) is unused by the current `project.html` markup. Left in place per surgical-coding rule 3.
