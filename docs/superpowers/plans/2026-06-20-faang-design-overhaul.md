# FAANG-Level Design Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Raise the portfolio's *visual framework* — typography, palette depth, hero signature, motion, layout, and craft — to top-of-class (FAANG-tier) while keeping the Apple-minimalist DNA. Content/copy reconciliation is explicitly deferred.

**Architecture:** Jekyll static site, single token-based CSS file, vanilla JS only. We deepen the design tokens (elevation ladder + accent ramp + cool neutrals + rich dark mode), self-host Inter and give it a *characterful display cut* via variable axes + stylistic sets, replace the photo-overlay hero with a typographic hero whose co-protagonist is a one-time **SVG pipeline-telemetry** signature, make project presentation editorial/left-aligned, add cross-document View Transitions, and layer in the craft details (selection, scrollbar, underlines, dark-mode imagery) — all behind a strict a11y/performance floor.

**Tech Stack:** Jekyll (Ruby 3.3.6 via rbenv), Liquid, vanilla CSS custom properties, vanilla JS (`IntersectionObserver`, `requestAnimationFrame`, cubic-bezier easing), self-hosted Inter variable woff2, SVG + CSS `offset-path`, CSS View Transitions API.

> **Design intent (why this plan goes past "clean"):** A reviewer flagged that an Inter-on-white Apple clone with one counter is *competent, not elite*. The fixes below spend a deliberate amount of boldness in a few authentic places — a characterful display cut, an instrument-panel telemetry signature, a real depth/craft layer — while keeping everything else disciplined and quiet. Authenticity anchor: a data/AI engineer's world is **telemetry, pipelines, precision** (mono voice, instrument panels, left-aligned editorial grid). We reject serif-display / warm-paper / acid-accent template looks.

## Global Constraints

- **Identity (locked):** Elevate Apple-minimalist. Refined blue accent *ramp*, glass header, layered elevation, rounded cards, generous left-aligned whitespace.
- **Hero (locked):** Typographic + a one-time SVG telemetry signature as co-protagonist. **Portrait does NOT appear in the hero** — it stays on About.
- **Fonts:** Self-hosted only (no external CDN). One family: **Inter** (variable) — but the *display* role uses Inter's optical-size axis + stylistic sets so headings don't read as default Inter. Keep the SF-Mono stack as the deliberate **second voice** (eyebrows, labels, telemetry, captions, figures).
- **First-paint type:** `font-display: swap` **plus** a metrics-matched fallback `@font-face` (the fallback neutralizes CLS; `swap` guarantees the characterful face actually renders on the first visit — `optional` would hide it from first-time visitors, defeating the type strategy).
- **Accessibility floor (non-negotiable):** WCAG AA — small text ≥ 4.5:1 on both `#FFF` and `#000`; the existing **gapped focus ring** (box-shadow `0 0 0 2px bg, 0 0 0 4px accent`) is the system focus aesthetic (do not regress to a flat outline); `prefers-reduced-motion: reduce` zeroes all motion; full keyboard nav; correct SR semantics.
- **No-JS integrity:** Every real value is in static HTML. JS only *enhances* (animates). JS off → page is complete and truthful.
- **Canonical numbers (verified vs résumé source of truth — use verbatim):** `~3,000,000 records/day`, `~7 min` runtime, pipeline `S3 · RDS · Redshift → MWAA → Datamart`. **Never surface the fabricated `10M / Kinesis / $40K` figures from `_projects/aws-pipeline.md`.**
- **Motion:** one shared curve everywhere — `--ease-out-expo: cubic-bezier(0.2, 0.7, 0.2, 1)` — **including the count-up JS** (port the bezier into JS). One orchestrated load sequence whose climax is the telemetry; no blanket "everything fades up on scroll."
- **Git:** `feat/design-overhaul` off `develop` (hook blocks direct `develop`/`main` commits). Conventional commits, one per task.
- **Verification (every task):** build stays green + change visually confirmed.
  - Build: `JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build` → exits 0, no Liquid warnings.
  - Serve: `~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll serve --livereload` → inspect light + dark, desktop + ~360px, reduced-motion + JS-off.

---

## Scope

**In scope:** the design framework — fonts + display cut, token depth, type treatment, hero + SVG telemetry, editorial cards, project-detail visual system, View Transitions, unified motion, craft details, a11y/perf floor.

**Deferred (separate content plan):** hero/About/project copy, About narrative + human-dimension, outcome-first teasers, and content-integrity reconciliation of `_projects/*.md`. Hero copy here is minimal/placeholder; the telemetry uses canonical numbers so the *design* is truthful today. A "Deferred Content Phase" stub is at the end.

---

## Design language (the spec these tasks implement)

**Palette — depth, not flatness:**
- **Elevation ladder** (each step a measured value + matching shadow tier): `--color-bg` → `--color-surface` → `--color-surface-alt` → `--color-surface-raised`. Header, telemetry panel, and cards sit at *distinguishable* elevations.
- **Cool neutrals:** nudge surfaces/borders a few points toward cool-grey (Apple's greys are subtly blue), lifting the palette out of "default grey."
- **Accent ramp (a system, not one blue):** `--color-accent` (chrome/large figures) · `--color-accent-text` (small text/links, AA-split per theme) · `--color-accent-subtle` (~10% tint: telemetry fill, active-nav bg, focus halo) · `--color-accent-deep` (pressed).
- **Rich dark mode:** not flat `#000` everywhere — a near-black ladder (`#000` bg → `#161617` → `#1C1C1E` → `#242426`) with surfaces that genuinely lighten, faint cool cast, and a slightly desaturated accent so it doesn't vibrate on black.

**Type — a real pairing, in one family:**
- **Display role** = Inter with `font-optical-sizing: auto` + stylistic sets (`"ss03","cv05","cv08"` — geometric `g`, single-story `a`, disambiguated `1lI`), weight 700, tracking `-0.04em` at hero scale. This is what stops it reading as default Inter.
- **Body role** = Inter 400–500, neutral.
- **Mono voice** = SF-Mono stack, used deliberately and consistently as the system's signature texture (eyebrows, telemetry, meta, captions, figures). The sans/mono tension *is* the pairing.
- Tabular + slashed-zero figures on every number; balanced/pretty wrapping; hand-tuned wordmark; em-dashes in prose.

**Layout — an editorial spatial system:** **left-aligned throughout** (no centered section titles — that inconsistency reads unfinished); one deliberate **asymmetry** (mono eyebrow/number in a narrow left rail, content in the main column on desktop, collapsing to one column on mobile); vertical rhythm tied to the type scale.

**Motion:** subtle, unified on `--ease-out-expo`. One orchestrated page-load beat (eyebrow → name → lead → panel → numbers count → pulse traverses). Scroll-reveal is deliberate (first below-fold section), not blanket.

**Signature:** a framed **instrument panel** under the hero — real numbers counting up once over an **SVG pipeline** whose pulse travels *through* the node circles (`S3·RDS·Redshift→MWAA→Datamart`). Impossible to copy without faking numbers; native to a data engineer.

**Craft layer:** `::selection` in accent-subtle; restrained custom scrollbar; editorial prose underlines (`text-underline-offset`/`thickness`/reduced-opacity color); dark-mode image treatment (hairline border + slight contrast reduction).

---

## File structure

| File | Responsibility | Action |
|---|---|---|
| `assets/fonts/InterVariable.woff2` + `OFL.txt` | Self-hosted variable face + license | Create |
| `assets/css/main.css` | All tokens + components (single source) | Modify |
| `_layouts/default.html` | Font preload; telemetry script | Modify |
| `_includes/hero-home.html` | Typographic hero + telemetry slot | Create |
| `_includes/hero-telemetry.html` | SVG instrument panel (static truth) | Create |
| `assets/js/hero-telemetry.js` | One-time count-up (expo easing; safe degrade) | Create |
| `index.md` | Wire new hero | Modify (`:9-13`) |
| `_includes/project-card.html` | Editorial, single-focusable card | Modify |
| `_includes/project-meta.html` | `Role · Domain · Stack` meta line | Create |
| `_layouts/project.html` | Meta block + figure hooks + VT name | Modify |
| `_includes/image-project-card.html` | VT name on thumbnail | Modify |
| `_includes/image-hero.html` + `.hero-image*` CSS | Old photo-overlay hero (replaced) | Delete (final task) |

---

### Task 1: Branch + baseline build

**Files:** Modify: none (setup).

- [ ] **Step 1: Branch**

```bash
cd /Users/WangFu/GitHub/projects/quangphu1912.github.io
git checkout develop && git pull
git checkout -b feat/design-overhaul
```

- [ ] **Step 2: Baseline build is green**

Run: `JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build`
Expected: exits 0, `_site/` built, no warnings.

---

### Task 2: Self-host Inter (swap + metrics-matched fallback)

**Files:**
- Create: `assets/fonts/InterVariable.woff2`, `assets/fonts/OFL.txt`
- Modify: `assets/css/main.css` (top), `_layouts/default.html:30`

**Interfaces:** Produces `"InterVariable"` + `"Inter Fallback"` families for Task 3.

- [ ] **Step 1: Add font + license**

```bash
mkdir -p assets/fonts
curl -L -o assets/fonts/InterVariable.woff2 \
  https://github.com/rsms/inter/raw/master/docs/font-files/InterVariable.woff2
curl -L -o assets/fonts/OFL.txt \
  https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt
```
(If 404, grab `InterVariable.woff2` from the latest https://github.com/rsms/inter/releases.)

- [ ] **Step 2: Declare faces (top of `main.css`)**

```css
/* ---------- Self-hosted face: Inter (variable) ---------- */
@font-face {
  font-family: "InterVariable";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;                /* characterful face renders on first visit */
  src: url("/assets/fonts/InterVariable.woff2") format("woff2");
}
/* Metrics-matched fallback → identical metrics → zero CLS while Inter loads */
@font-face {
  font-family: "Inter Fallback";
  src: local("Arial");
  ascent-override: 90%;
  descent-override: 22.43%;
  line-gap-override: 0%;
  size-adjust: 107.4%;
}
```

- [ ] **Step 3: Preload in `<head>`** (above the stylesheet `<link>` at `:30`)

```html
  <link rel="preload" href="{{ '/assets/fonts/InterVariable.woff2' | relative_url }}" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
```

- [ ] **Step 4: Build + verify** font 200s once, no console errors. (No visible change until Task 4.)

- [ ] **Step 5: Commit**

```bash
git add assets/fonts _layouts/default.html assets/css/main.css
git commit -m "feat: self-host Inter variable with swap + metrics-matched fallback"
```

---

### Task 3: Token depth — accent ramp, elevation ladder, cool neutrals, rich dark mode

**Files:** Modify `assets/css/main.css` `:root` (~9–63) + dark block (~67–83).

**Interfaces:** Produces tokens consumed everywhere: `--font-display/-body/-mono`, `--font-feature-figures`, accent ramp, surface ladder, `--ease-out-expo`, `--space-section`.

- [ ] **Step 1: Font-role + figure tokens** (replace lines ~21–22)

```css
  --font-display: "InterVariable", "Inter Fallback", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body:    "InterVariable", "Inter Fallback", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono:    "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Source Code Pro", monospace;
  --font-feature-figures: "tnum" 1, "zero" 1;
```

- [ ] **Step 2: Light palette — accent ramp + cool-neutral surface ladder** (replace the accent/surface lines ~9–18)

```css
  /* accent ramp */
  --color-accent:        #0A84FF;   /* large figures / chrome */
  --color-accent-text:   #0063CC;   /* small text/links on white — ≥4.5:1 */
  --color-accent-subtle: #E8F1FE;   /* ~10% tint: panel fill, active nav, focus halo */
  --color-accent-deep:   #0050B3;   /* pressed */
  --color-primary: var(--color-accent);
  --color-primary-hover: var(--color-accent-deep);
  /* cool-neutral elevation ladder */
  --color-bg:             #FFFFFF;
  --color-surface:        #F4F5F7;  /* faint cool cast */
  --color-surface-alt:    #ECEDF1;
  --color-surface-raised: #FFFFFF;  /* cards sit above tinted surfaces via shadow */
  --color-background: var(--color-bg);
  --color-text: #1D1D1F;
  --color-text-secondary: #6E6E73;
  --color-border: #D6D7DD;          /* cool */
```

- [ ] **Step 3: Dark palette — near-black ladder + tuned accent** (in the dark block ~67–83)

```css
  --color-accent:        #0A84FF;
  --color-accent-text:   #4DA3FF;   /* small text on black — ≥4.5:1 */
  --color-accent-subtle: #0E2438;   /* deep tint panel fill */
  --color-accent-deep:   #0063CC;
  --color-bg:             #000000;
  --color-surface:        #161617;
  --color-surface-alt:    #1C1C1E;
  --color-surface-raised: #242426;  /* surfaces genuinely lighten */
  --color-background: var(--color-bg);
  --color-text: #F5F5F7;
  --color-text-secondary: #A1A1A6;
  --color-border: #2E2E30;
```

- [ ] **Step 4: Easing + section rhythm** (near transition tokens ~47–63)

```css
  --ease-out-expo: cubic-bezier(0.2, 0.7, 0.2, 1);
  --space-section: clamp(4rem, 8vw, 7rem);
```

- [ ] **Step 5: Verify contrast** — `#0063CC`/`#FFF` and `#4DA3FF`/`#000` ≥ 4.5:1; record ratios in commit body. Build green.

- [ ] **Step 6: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: token depth — accent ramp, cool-neutral elevation ladder, rich dark mode, easing"
```

---

### Task 4: Typographic treatment — characterful display, mono voice, left-aligned system

**Files:** Modify `assets/css/main.css` (body base; heading scale ~112–125; section-title; add helpers); em-dash sweep in prose.

- [ ] **Step 1: Body + headings to roles, with a characterful display cut**

```css
body { font-family: var(--font-body); }
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-optical-sizing: auto;
  font-feature-settings: "ss03" 1, "cv05" 1, "cv08" 1;   /* geometric g, single-story a, disambiguated 1lI */
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.03em;
  text-wrap: balance;
}
h1 { letter-spacing: -0.04em; }
```

- [ ] **Step 2: Tabular figures helper**

```css
.tnum, .metric, .metric-figure, .metric-label, .tl-figure, .tl-unit, .experience-date {
  font-feature-settings: var(--font-feature-figures);
  font-variant-numeric: tabular-nums slashed-zero;
}
```

- [ ] **Step 3: Left-aligned editorial system (kill centered titles)**

```css
.section-title { text-align: left; max-width: 60rem; }
/* desktop: narrow left rail for mono eyebrow/number + main content column */
@media (min-width: 768px) {
  .section--railed { display: grid; grid-template-columns: 8rem 1fr; gap: var(--space-4); align-items: start; }
  .section--railed .rail { font-family: var(--font-mono); font-size: var(--text-sm); letter-spacing: 0.12em; color: var(--color-text-secondary); padding-top: 0.4rem; }
}
```
(Apply `section--railed` + a `.rail` eyebrow to the metrics/skills/projects sections in `index.md`; on mobile the rail stacks above content.)

- [ ] **Step 4: Wordmark + mono-voice tracking**

```css
.site-name { font-family: var(--font-display); letter-spacing: -0.02em; }
.eyebrow, .site-tagline, .hero-creds, .rail { letter-spacing: 0.12em; }
.pullquote { hanging-punctuation: first; }
```

- [ ] **Step 5: Em-dash sweep** — in `about.md` / `_projects/*.md` prose, replace ` - ` used as a dash with ` — `. Don't touch compounds, code, or YAML.

- [ ] **Step 6: Verify + commit** — headings render with the geometric `g`/single-story `a` (visibly not default Inter), numbers tabular, titles left-aligned, rail eyebrows present on desktop.

```bash
git add assets/css/main.css index.md about.md _projects
git commit -m "feat: characterful Inter display cut, mono voice, left-aligned editorial system"
```

---

### Task 5: Typographic hero (portrait off; telemetry as co-protagonist)

**Files:** Create `_includes/hero-home.html`; modify `index.md:9-13`, `main.css` (`.hero-home`).

- [ ] **Step 1: Create `_includes/hero-home.html`** — name + lead composed *with* the telemetry as one unit, not stacked stat band:

```html
{% comment %} Typographic hero. Copy minimal; refined in deferred content phase. {% endcomment %}
<section class="hero-home" data-reveal>
  <div class="container hero-home__inner">
    <p class="eyebrow hero-home__eyebrow">{{ include.eyebrow }}</p>
    <h1 class="hero-home__title">{{ include.title }}</h1>
    {% if include.lead %}<p class="hero-home__lead">{{ include.lead }}</p>{% endif %}
    {% include hero-telemetry.html %}
    <div class="hero-home__cta cta-buttons flex gap-4">
      <a href="{{ '/projects/' | relative_url }}" class="btn btn-primary">View work</a>
      <a href="{{ '/about/' | relative_url }}" class="btn btn-secondary">About</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Wire in `index.md`** (replace `image-hero.html` at `:9-13`)

```liquid
{% include hero-home.html
   eyebrow="DATA & AI ENGINEER · TORONTO · AWS CERTIFIED"
   title="Phu Le"
   lead="I build the cloud data platforms that power AI — production pipelines and the data-quality infrastructure that makes downstream ML trustworthy." %}
```

- [ ] **Step 3: `.hero-home` styles**

```css
.hero-home { padding-block: var(--space-section); }
.hero-home__inner { max-width: 62rem; }
.hero-home__eyebrow { color: var(--color-accent-text); margin-bottom: var(--space-2); }
.hero-home__title { font-size: clamp(3rem, 1.2rem + 7vw, 6rem); line-height: 1.0; margin: 0 0 var(--space-2); }
.hero-home__lead { font-size: clamp(1.25rem, 1rem + 1vw, 1.6rem); color: var(--color-text-secondary); max-width: 42ch; margin-bottom: var(--space-4); text-wrap: pretty; }
.hero-home__cta { margin-top: var(--space-5); }
@media (prefers-reduced-motion: no-preference) {
  .hero-home__inner > * { animation: heroIn 0.7s var(--ease-out-expo) backwards; }
  .hero-home__eyebrow { animation-delay: 0.05s; }
  .hero-home__title   { animation-delay: 0.12s; }
  .hero-home__lead    { animation-delay: 0.22s; }
  .hero-home .hero-telemetry { animation-delay: 0.32s; }
  .hero-home__cta     { animation-delay: 0.46s; }
}
```

- [ ] **Step 4: Verify + commit** — no photo; large characterful headline; staggered entrance; static + complete under reduced-motion.

```bash
git add _includes/hero-home.html index.md assets/css/main.css
git commit -m "feat: typographic home hero composed with telemetry signature"
```

---

### Task 6: Telemetry signature — SVG instrument panel

**Files:** Create `_includes/hero-telemetry.html`, `assets/js/hero-telemetry.js`; modify `main.css`, `_layouts/default.html`.

**Interfaces:** Consumes `.hero-home` slot. `[data-countup]` contract: real value in `textContent`; JS zeroes then eases to `data-countup` once on the page curve. Pulse traverses the SVG `#tl-path` via `offset-path`.

- [ ] **Step 1: `_includes/hero-telemetry.html` (framed panel, static truth, SVG pipeline)**

```html
<div class="hero-telemetry" role="group" aria-label="Pipeline throughput: about 3 million records per day in about 7 minutes">
  <dl class="hero-telemetry__figures">
    <div class="tl-item">
      <dt class="tl-label">RECORDS / DAY</dt>
      <dd class="tl-value"><span aria-hidden="true">~</span><span class="tl-figure" data-countup="3000000" data-decimals="0">3,000,000</span></dd>
    </div>
    <div class="tl-item">
      <dt class="tl-label">PIPELINE RUNTIME</dt>
      <dd class="tl-value"><span aria-hidden="true">~</span><span class="tl-figure" data-countup="7" data-decimals="0">7</span> <span class="tl-unit">min</span></dd>
    </div>
  </dl>
  <div class="hero-telemetry__flow" aria-hidden="true">
    <svg class="tl-pipe" viewBox="0 0 600 24" preserveAspectRatio="none" role="presentation">
      <path id="tl-path" d="M12 12 H588" fill="none" stroke="var(--color-border)" stroke-width="2"/>
      <g class="tl-nodes">
        <circle cx="12"  cy="12" r="5"/><circle cx="156" cy="12" r="5"/><circle cx="300" cy="12" r="5"/>
        <circle cx="444" cy="12" r="6" class="tl-node--proc"/><circle cx="588" cy="12" r="5"/>
      </g>
      <circle class="tl-pulse" r="4" fill="var(--color-accent)"/>
    </svg>
    <ul class="tl-legend">
      <li>S3</li><li>RDS</li><li>Redshift</li><li class="tl-legend--proc">MWAA</li><li>Datamart</li>
    </ul>
  </div>
</div>
```

- [ ] **Step 2: `assets/js/hero-telemetry.js` (count-up on the page's bezier; safe degrade)**

```js
(function () {
  var els = document.querySelectorAll('.hero-telemetry [data-countup]');
  if (!els.length) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window) || !('requestAnimationFrame' in window)) return; // keep static truth

  // cubic-bezier(0.2,0.7,0.2,1) — same curve as --ease-out-expo
  function bezier(x1, y1, x2, y2) {
    function A(a,b){return 1-3*b+3*a;} function B(a,b){return 3*b-6*a;} function C(a){return 3*a;}
    function calc(t,a,b){return ((A(a,b)*t+B(a,b))*t+C(a))*t;}
    function slope(t,a,b){return 3*A(a,b)*t*t+2*B(a,b)*t+C(a);}
    return function (x) { var t=x; for (var i=0;i<5;i++){var s=slope(t,x1,x2); if(!s)break; t-=(calc(t,x1,x2)-x)/s;} return calc(t,y1,y2); };
  }
  var ease = bezier(0.2, 0.7, 0.2, 1);

  function fmt(n, d){ return Number(n).toLocaleString('en-US', { minimumFractionDigits:d, maximumFractionDigits:d }); }
  function run(el){
    var target=parseFloat(el.getAttribute('data-countup')), d=parseInt(el.getAttribute('data-decimals')||'0',10);
    var dur=1400, t0=performance.now();
    (function tick(now){ var p=Math.min((now-t0)/dur,1); el.textContent=fmt(target*ease(p),d); if(p<1)requestAnimationFrame(tick); else el.textContent=fmt(target,d); })(t0);
  }
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ run(e.target); io.unobserve(e.target);} }); }, { threshold:0.6 });
  els.forEach(function(el){ el.textContent='0'; io.observe(el); });
})();
```

- [ ] **Step 3: Load script** in `_layouts/default.html` after `reveal.js` (~`:61`)

```html
  <script src="{{ '/assets/js/hero-telemetry.js' | relative_url }}" defer></script>
```

- [ ] **Step 4: Style the instrument panel + node pipeline + traversal**

```css
/* ---------- Telemetry signature (instrument panel) ---------- */
.hero-telemetry {
  margin-top: var(--space-5); max-width: 44rem;
  padding: var(--space-3) var(--space-4);
  background: var(--color-accent-subtle);
  border: 1px solid var(--color-border); border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,.05);
}
.hero-telemetry__figures { display: flex; gap: var(--space-6); margin: 0 0 var(--space-3); }
.tl-item { display: flex; flex-direction: column; gap: 4px; }
.tl-label { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: 0.12em; color: var(--color-text-secondary); }
.tl-value { font-family: var(--font-mono); font-weight: 700; color: var(--color-accent); font-size: clamp(1.5rem, 1rem + 2vw, 2.25rem); font-variant-numeric: tabular-nums slashed-zero; }
.hero-telemetry__flow .tl-pipe { width: 100%; height: 24px; display: block; }
.tl-nodes circle { fill: var(--color-surface-raised); stroke: var(--color-border); stroke-width: 1.5; }
.tl-nodes .tl-node--proc { stroke: var(--color-accent); }
.tl-legend { list-style: none; display: flex; justify-content: space-between; margin: 6px 0 0; padding: 0; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-secondary); }
.tl-legend--proc { color: var(--color-accent-text); }
.tl-pulse { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .tl-pulse { offset-path: path("M12 12 H588"); animation: tl-flow 1.8s var(--ease-out-expo) 0.6s 1 both; }
  @keyframes tl-flow { 0%{offset-distance:0%;opacity:0;} 8%{opacity:1;} 92%{opacity:1;} 100%{offset-distance:100%;opacity:0;} }
}
@media (max-width: 640px) { .hero-telemetry__figures { gap: var(--space-4); } }
```

- [ ] **Step 5: Verify the three integrity modes**
  1. **JS + motion on:** figures count up once to `3,000,000`/`7`; the pulse travels *through* the nodes once; nothing loops.
  2. **Reduced motion:** figures show real values immediately; no count-up; no pulse.
  3. **JS off:** real values + full SVG render; layout intact.

- [ ] **Step 6: Commit**

```bash
git add _includes/hero-telemetry.html assets/js/hero-telemetry.js assets/css/main.css _layouts/default.html
git commit -m "feat: SVG telemetry signature — pulse traverses pipeline, count-up on page easing, safe degrade"
```

---

### Task 7: Editorial project cards (stretched link without clipping the target)

**Files:** Modify `_includes/project-card.html`, `main.css`.

**Bug fix (must):** `-webkit-line-clamp` creates `overflow:hidden`; if it sits on the element that owns the stretched-link's positioning context it clips the `::after` and collapses the click target. So clamp goes on an **inner title span**, while the stretched-link `::after` is anchored on `.project-card`.

- [ ] **Step 1: Rewrite `_includes/project-card.html`**

```html
{% assign project = include.project %}
<article class="project-card card">
  {% if project.image %}
    {% include image-project-card.html image=project.image alt=project.title project=project %}
  {% else %}
    <div class="project-card__noimg" aria-hidden="true">no preview</div>
  {% endif %}
  <h3 class="card-title"><a class="card-title__link" href="{{ project.url | relative_url }}"><span class="card-title__text">{{ project.title }}</span></a></h3>
  <p class="card-description">{{ project.description }}</p>
  {% if project.tags %}
  <div class="project-tags flex gap-2">{% for tag in project.tags %}<span class="tag">{{ tag }}</span>{% endfor %}</div>
  {% endif %}
</article>
```

- [ ] **Step 2: CSS — stretched link, clamp on inner span, hover choreography, aspect lock**

```css
.project-card { text-align: left; align-items: stretch; position: relative; background: var(--color-surface-raised); transition: transform var(--transition-base) var(--ease-out-expo), box-shadow var(--transition-base) var(--ease-out-expo); }
.card-title__link::after { content: ""; position: absolute; inset: 0; }      /* whole card is the target */
.card-title__text { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; } /* clamp the TEXT, not the link box */
.project-card:focus-within { box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-accent); }            /* gapped ring */
.card-title__link:focus-visible { outline: none; }
/* hover: lift + image zoom inside a locked frame */
.project-card .image-thumbnail { aspect-ratio: 16/9; overflow: hidden; border-radius: var(--border-radius-sm); }
.project-card .image-thumbnail img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow) var(--ease-out-expo); }
.project-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.project-card:hover .image-thumbnail img { transform: scale(1.04); }
.project-card__noimg { aspect-ratio: 16/9; display: grid; place-items: center; background: var(--color-surface-alt); color: var(--color-text-secondary); font-family: var(--font-mono); font-size: var(--text-sm); border-radius: var(--border-radius-sm); }
```

- [ ] **Step 3: Verify + commit** — cards left-aligned; **entire card clickable** (click bottom-right padding → navigates); one gapped focus ring per card; long title clamps at 2 lines without breaking the target; hover lifts + image zooms; missing-image tile shows.

```bash
git add _includes/project-card.html assets/css/main.css
git commit -m "feat: editorial cards — stretched link (clamp on inner span), hover choreography, aspect lock"
```

---

### Task 8: Project-detail visual system + metadata block

**Files:** Create `_includes/project-meta.html`; modify `_layouts/project.html`, `main.css`.

- [ ] **Step 1: `_includes/project-meta.html`**

```html
{% assign p = include.project %}
{% if p.role or p.domain or p.stack %}
<dl class="project-meta" aria-label="Project context">
  {% if p.role %}<div class="project-meta__item"><dt>Role</dt><dd>{{ p.role }}</dd></div>{% endif %}
  {% if p.domain %}<div class="project-meta__item"><dt>Domain</dt><dd>{{ p.domain }}</dd></div>{% endif %}
  {% if p.stack %}<div class="project-meta__item"><dt>Stack</dt><dd>{{ p.stack }}</dd></div>{% endif %}
</dl>
{% endif %}
```

- [ ] **Step 2: Insert under the `<h1>` in `_layouts/project.html`**

```html
{% include project-meta.html project=page %}
```
(Renders nothing until front matter exists — build stays green.)

- [ ] **Step 3: CSS — meta line, rhythm, figure captions, dark-mode images**

```css
.project-meta { display: flex; flex-wrap: wrap; gap: var(--space-4); margin: var(--space-3) 0 var(--space-5); padding-bottom: var(--space-3); border-bottom: 1px solid var(--color-border); }
.project-meta__item dt { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: 0.12em; color: var(--color-text-secondary); text-transform: uppercase; }
.project-meta__item dd { margin: 2px 0 0; font-weight: 500; }
.project-content { line-height: 1.75; }
.project-content > h2 { margin-top: var(--space-7); }
.project-content .mermaid { border: 1px solid var(--color-border); border-radius: var(--border-radius); padding: var(--space-3); background: var(--color-surface); }
.project-content figure figcaption { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-secondary); margin-top: 8px; }
@media (prefers-color-scheme: dark) {
  .project-content img:not([src$=".svg"]) { border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); filter: brightness(0.92) contrast(0.96); } /* bright rasters don't punch holes */
}
```

- [ ] **Step 4: Verify + commit**

```bash
git add _includes/project-meta.html _layouts/project.html assets/css/main.css
git commit -m "feat: project-detail system — meta block, rhythm, captions, dark-mode image treatment"
```

---

### Task 9: Cross-document View Transitions (slug-pinned)

**Files:** Modify `main.css`, `_includes/image-project-card.html`, `_layouts/project.html`.

**Fix:** derive `view-transition-name` from `page.slug` on **both** sides (not `alt|slugify`) to avoid name collisions/broken morphs.

- [ ] **Step 1: Opt-in + reduced-motion guard**

```css
@view-transition { navigation: auto; }
@media (prefers-reduced-motion: reduce) { @view-transition { navigation: none; } }
::view-transition-group(*) { animation-timing-function: var(--ease-out-expo); }
```

- [ ] **Step 2: Name on the card thumbnail** — `_includes/image-project-card.html` wrapper (the include now receives `project`):

```html
style="view-transition-name: vt-{{ include.project.slug }};"
```

- [ ] **Step 3: Name on the detail hero** — `_layouts/project.html` hero figure/image:

```html
style="view-transition-name: vt-{{ page.slug }};"
```

- [ ] **Step 4: Verify + commit** — Chromium: card thumbnail morphs into detail hero, back reverses; reduced-motion → instant; Firefox/Safari hard-cut, no console errors.

```bash
git add assets/css/main.css _includes/image-project-card.html _layouts/project.html
git commit -m "feat: slug-pinned cross-document View Transitions (card to detail)"
```

---

### Task 10: Unified, orchestrated motion

**Files:** Modify `main.css` (reveal block ~434–445; hero/card transitions), `assets/js/reveal.js` (only if reveal scope changes).

- [ ] **Step 1: Route reveal + interactive transitions through the shared curve**

```css
[data-reveal] { transition: opacity var(--transition-slow) var(--ease-out-expo), transform var(--transition-slow) var(--ease-out-expo); }
```

- [ ] **Step 2: Make reveals deliberate, not blanket** — keep `data-reveal` on the **hero** and the **first below-fold section** only; remove `data-reveal` from subsequent sections in `index.md` so the page has one orchestrated entrance rather than every block fading up (the AI-generated tell). The count-up (Task 6) is the load climax.

- [ ] **Step 3: Confirm reduced-motion coverage** — the existing `@media (prefers-reduced-motion: reduce)` block (~425–431) must zero `.hero-home`, `.hero-telemetry` (`.tl-pulse`), and view transitions. Add selectors if any aren't covered.

- [ ] **Step 4: Verify + commit** — one easing throughout; entrance reads as a single beat; reduced-motion fully static.

```bash
git add assets/css/main.css assets/js/reveal.js index.md
git commit -m "refactor: unify motion on expo easing; one orchestrated entrance; reduced-motion verified"
```

---

### Task 11: Craft details (the ceiling, not just the floor)

**Files:** Modify `main.css`.

- [ ] **Step 1: Selection + scrollbar + prose underlines**

```css
::selection { background: var(--color-accent-subtle); color: var(--color-text); }
/* restrained custom scrollbar */
* { scrollbar-color: var(--color-border) transparent; }
::-webkit-scrollbar { width: 11px; height: 11px; }
::-webkit-scrollbar-thumb { background: var(--color-border); border: 3px solid var(--color-bg); border-radius: 8px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-text-secondary); }
/* editorial underlines in prose only */
.prose a, .about-body a, .project-content a {
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--color-accent-text) 45%, transparent);
  text-underline-offset: 0.18em; text-decoration-thickness: 1.5px;
  transition: text-decoration-color var(--transition-fast) var(--ease-out-expo);
}
.prose a:hover, .about-body a:hover, .project-content a:hover { text-decoration-color: var(--color-accent-text); }
```

- [ ] **Step 2: Verify + commit** — text selection shows brand tint; scrollbar is subtle and theme-aware; prose links have offset underlines that solidify on hover.

```bash
git add assets/css/main.css
git commit -m "feat: craft layer — ::selection, custom scrollbar, editorial prose underlines"
```

---

### Task 12: Quality floor — print, focus, contrast, semantics, responsive

**Files:** Modify `main.css`.

- [ ] **Step 1: Print stylesheet** (the live site is the résumé)

```css
@media print {
  .site-header, .nav-menu, .nav-toggle, .cta-buttons, .hero-telemetry__flow, .skip-to-content, footer { display: none !important; }
  :root { --color-text: #000; --color-background: #fff; --color-bg: #fff; }
  body { background: #fff; color: #000; }
  a { color: #000; text-decoration: underline; }
  .hero-home, .section, .section-sm { padding-block: 1rem; }
  .project-card, .card { break-inside: avoid; box-shadow: none; border: 1px solid #ccc; }
}
```

- [ ] **Step 2: Keep the gapped focus ring as the system aesthetic** (do not regress to a flat outline). Confirm the existing base ring applies to nav links, buttons, cards, cred links, and the email link in both themes:

```css
a:focus-visible, button:focus-visible, .btn:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-accent); border-radius: var(--border-radius-xs); }
```

- [ ] **Step 3: Small-text accent sweep** — `grep -n "color-accent)" assets/css/main.css`; any rule on text < ~24px must use `var(--color-accent-text)`.

- [ ] **Step 4: Responsive + SR** — at ~360px: hero title doesn't overflow, telemetry figures + legend wrap, cards stack, hamburger works. VoiceOver: the telemetry group announces its `aria-label` once and does not read every animated tick (figures are inside the labelled group; ticks aren't in a live region).

- [ ] **Step 5: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: quality floor — print, gapped focus ring, contrast sweep, SR + responsive pass"
```

---

### Task 13: Remove dead code + final production build

**Files:** Delete `_includes/image-hero.html`; modify `main.css`.

- [ ] **Step 1: Confirm unreferenced** — `grep -rn "image-hero" . --include=*.md --include=*.html` → no callers. Then `git rm _includes/image-hero.html`.

- [ ] **Step 2: Remove dead CSS** — `.hero-image-wrapper/.hero-image/.hero-overlay/.hero-content*` (old photo hero ~840–904 / 1031–1043) and any `.tag--primary`. Keep `@keyframes heroIn` (reused by `.hero-home`).

- [ ] **Step 3: Final build + full sweep** — production build exits 0; walk Home / Projects / a project / About in light+dark, desktop+~360px, reduced-motion + JS-off.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove replaced photo-hero include and dead CSS"
```

---

## Deferred Content Phase (tracked, NOT this plan)

A later content plan should: reconcile `_projects/aws-pipeline.md` to canonical facts (~3M/day, ~7 min, MWAA/RDS/Redshift/S3) and drop the `10M/Kinesis/$40K` fabrications; label real-vs-illustrative projects (résumé has no Projects section); author `role`/`domain`/`stack`/`outcome` front matter + outcome-first teasers; rewrite each case study to problem→approach-as-decisions→tradeoff→quantified-results→reflection; add the About narrative arc + human-dimension section; tighten hero/About copy. Consider replacing themed-mermaid with hand-authored SVG diagrams matching the telemetry's visual language.

---

## Self-Review

- **Spec coverage:** fonts + display cut (T2, T4), token depth/accent ramp/dark mode (T3), type + left-aligned system (T4), hero (T5), SVG telemetry signature (T6), editorial cards (T7), detail system (T8), view transitions (T9), unified/orchestrated motion (T10), craft layer (T11), a11y/perf floor (T2 CLS, T6 no-JS, T10 reduced-motion, T12 print/focus/contrast/SR), cleanup (T13). All review P0/P1 items mapped; P2 bugs fixed (clamp/stretched-link in T7, slug-pinned VT in T9, `swap` in T2, gapped ring in T12).
- **Type consistency:** tokens (`--font-display`, accent ramp, surface ladder, `--ease-out-expo`, `--space-section`) defined in T2–T3, consumed verbatim later. `[data-countup]` defined/used only in T6 with the bezier matching `--ease-out-expo`. `view-transition-name: vt-{{ slug }}` paired across T9.2/T9.3 from `page.slug`/`include.project.slug`. `.image-thumbnail` hover (T7) matches the include's existing class.
- **No placeholders:** every step shows real CSS/HTML/JS. Hero copy is intentionally minimal and flagged deferred — not a TODO.
- **Risk notes:** `offset-path` on SVG circle (T6) is supported in current Chromium/Firefox/Safari; with no support the pulse simply stays hidden (`opacity:0`) — acceptable. Fallback `size-adjust`/override metrics (T2) may need a one-step tune if the wordmark shifts on cold load — verify in T4. `color-mix` (T11) is broadly supported; if a target browser lacks it, swap to a static rgba.
