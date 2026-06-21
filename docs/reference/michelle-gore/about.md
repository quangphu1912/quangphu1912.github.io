# michellegore.com/about — About-page spec

`1rem = 18px` (Semplice base). px values at ×18. `frontend_mode:"dynamic"` (AJAX page transitions LIVE);
`sr_status:"disabled"` (no per-element scroll-reveal). Page id 488.

## Sources
- Page: `https://michellegore.com/about`
- Theme CSS: `…/themes/semplice5/assets/css/frontend.min.css?ver=5.3.5`
- Transition JS: `…/themes/semplice5/assets/js/frontend.min.js?ver=5.3.5`
- Inline: `<style id="488-post-css">`, `<style id="semplice-webfonts-css">`, `<style id="semplice-custom-css">`

## 1. Page transition (priority — the brand's transition vocabulary)

Dynamic mode: clicking an internal link runs an out-animation, AJAX-loads new content + its
`<style id="{id}-post-css">`, then an in-animation. NProgress drives a top bar.

| Phase | Element | Tween | Duration | Easing |
|---|---|---|---|---|
| Out — content | `#content-holder` | `gsap.to(.., .7, {opacity:0, ease:"none"})` | **0.7s** | linear |
| Out — navbar | `.semplice-navbar` | `gsap.to(.., .7, {yPercent:-100, ease:"expo.inOut"})` | **0.7s** | expo.inOut |
| Loading bar | `#nprogress .bar` | `NProgress.start()` | trickles | — |
| Scroll reset | `window` | `gsap.to(window, .9, {scrollTo:{y:0}, ease:"expo.inOut"})` | **0.9s** | expo.inOut |
| In — content | `#content-{id}` | `gsap.to(.., .4, {opacity:1, ease:"expo.OutIn"})` | **0.4s** | expo.outIn |
| In — navbar | `.semplice-navbar` | `gsap.to(.., .8, {yPercent:100 / opacity:1, ease:"expo.out"})` | **0.8s** | expo.out |

Before content-in the container is locked (`height:innerHeight; overflow:hidden`) and `.transition-wrap`
gets `top:-{scroll}px` so the page "stays put" then resets to top.

**Overlay (hamburger) menu — same vocabulary:** backdrop `gsap.to(#overlay-menu, .35, {opacity})`;
items stagger `gsap.to(item, .35, {opacity:1, y:0, delay:t})` with **`t += .08`** (80ms).

**NProgress bar:** theme default `#999`, 3px (`height:.1667rem`); **brand override `background:#efeaff`**
(pale lavender). Spinner disabled.

### Replicate with CSS View Transitions
```css
@view-transition { navigation: auto; }
::view-transition-old(root){ animation: vt-fade-out .7s linear both; }
::view-transition-new(root){ animation: vt-fade-in .4s cubic-bezier(.87,0,.13,1) both; }
@keyframes vt-fade-out{ to{opacity:0} }
@keyframes vt-fade-in { from{opacity:0} }
.site-nav{ view-transition-name: nav; }                                   /* persistent → slides */
::view-transition-group(nav){ animation-duration:.8s; animation-timing-function:cubic-bezier(.16,1,.3,1); }
```
For an MPA (Jekyll) each navigation is a real load, so scroll starts at top naturally — no JS scroll
reset needed. Cross-document VT works between static pages in Chromium; degrades to instant nav elsewhere.

## 2. Layout (top → bottom)

12-col grid, `.container{max-width:1170px}`, column `padding:0 5px` (≥1170px). Breakpoints 1170/992/768/544.

**Section 1 — Profile + Bio + Experience + Values** (`#section_84124bdbd`):
`padding: 5.556rem (100px) top / 8.889rem (160px) bottom`, white bg.
- Two-column split: left `width=6` (content), `width=1` spacer, right `width=5` (decorative image).
- Left column stacks: eyebrow "A LITTLE ABOUT ME" → headshot `Profile.png` **160×160** + "Hi, I'm
  Michelle!" → bio paragraph → "EXPERIENCE" eyebrow + 6 entries (title + date) + "Download full resume
  here ↓" → "MY VALUES" eyebrow + 4 value blocks (emoji title + paragraph).
- Right column: decorative `beachpolaroid.png` (1034×901), `data-scaling:no`.
- Rhythm (rem @18): intro `mt .667 / mb 1.333`; EXPERIENCE eyebrow `mt 1.667`; entry title `mt .444`;
  download `pt 1.667`; MY VALUES eyebrow `mt 2.778`, `.889` between blocks.

> The experience entries and values are **single-column vertical stacks**, NOT a 4-up grid. A 4-up
> values grid would be a deliberate enhancement, not a copy.

**Section 2 — CTA footer** (`#section_352d7dcec`):
`padding: 3.111rem (56px) top / 5.556rem (100px) bottom`, **`background:#f9f9f9`** (only tinted band).
Full-width header ("Thanks for stopping by, let's chat!") then **three `width=4` columns**:
1. CONTACT ME → email (Cloudflare-obfuscated)
2. LET'S CONNECT → Linkedin | Resume | Work
3. ©2021 MICHELLE GORE + "Made with 💛 & 🍵"

Headshot 160×160, square (no radius/shadow). Lazyload via 1px gif placeholder → native `loading="lazy"`.

## 3. Typography (rem @18)

Body/heading = **Inter**; **Karla** for eyebrows/labels; europa available (used on other pages).

| Element | Face / weight | Size | Letter-spacing | Color |
|---|---|---|---|---|
| Eyebrow ("A LITTLE ABOUT ME" / "EXPERIENCE" / "MY VALUES") | **Karla 600** | 0.889rem → **16px** | 0.111rem → **2px** | `#a5a5a5`, UPPERCASE |
| Intro "Hi, I'm Michelle!" | **Inter 600** | 1.667rem → **30px** (lh 40px) | — | `#4f4f4f` |
| Bio body | **Inter 400** | 0.889rem → **16px** (lh 1.667) | 0 | `#4f4f4f` |
| Experience title | **Inter 600** | 0.778rem → **14px** | — | `#4f4f4f` |
| Experience date | Inter 400 | 0.778rem → **14px** | — | `#a5a5a5` |
| Value title ("💛 Passion is everything.") | **Inter 600** | 1rem → **18px** (lh 40px) | — | `#4f4f4f` |
| Value body | Inter 400 | 0.889rem → **16px** | — | `#4f4f4f` |
| CTA headline | **Inter 600** | 1.278rem → **23px** | — | `#4f4f4f` |
| CTA eyebrows (CONTACT ME…) | **Inter 400** | 0.889rem → **16px** | 0.167rem → **3px** | `#aaaaaa`, UPPERCASE |
| CTA links | **Inter 700** | inherit | — | `#6b6b6b` → `#a5a5a5` |
| Logo | europa/Inter | 0.889rem → **16px** | 0.083rem → **1.5px** | `#020202`, UPPERCASE |
| Nav items (Work/Play/About) | — | — | 0 | `#020202`; hover/active underline |

Site defaults: `h1{font-size:2.667rem (48px)}`, `p/li{font-size:.889rem; line-height:1.667}`,
paragraph `margin-bottom:1.667em`. h1/h2 Inter 700, h4/h5 Inter 600.

## 4. Color

| Hex | Usage |
|---|---|
| `#ffffff` | page bg (Section 1) |
| `#f9f9f9` | CTA footer band |
| `#f5f5f5` | navbar bg; overlay-menu bg |
| `#020202` | logo + nav text |
| `#4f4f4f` | primary body/heading text |
| `#6b6b6b` → `#a5a5a5` | links / hover |
| `#a5a5a5` / `#aaaaaa` | eyebrow labels, muted dates |
| `#8c8c8c` | back-to-top SVG |
| `#efeaff` | NProgress bar (pale lavender — brand accent) |
| `rgba(117,102,246,.5)` | thumb hover overlay (`#7566F6`, not on About body) |

Brand accent is a **soft violet** (`#7566f6` / `#efeaff`) surfacing only in motion chrome; About text is
grayscale on white.

## 5. Reveal / scroll effects

**None** (`sr_status:"disabled"`). The only entrance is the page-load transition (§1): content fades in
`0.4s expo.outIn`, navbar slides in `0.8s expo.out`. (Semplice's blog-only default would be 15px rise,
700ms, opacity 0.8→1 — use those numbers if you want a richer-than-original reveal.)

## 6. Native replica notes

| Original | Native equivalent |
|---|---|
| AJAX page transition | **CSS cross-document View Transitions**; persistent navbar as `view-transition-name:nav` shared element (slides, not cross-fades). |
| NProgress lavender bar | optional `<div>` + CSS keyframe on `pageswap`; or omit (MPA loads are fast). Keep `#efeaff` for the cue. |
| Navbar `yPercent` slides | `::view-transition-group(nav)` with `cubic-bezier(.87,0,.13,1)`/`(.16,1,.3,1)`. |
| Overlay menu 0.08s stagger | `transition-delay: calc(var(--i)*80ms)`; `<details>` or a tiny click handler. |
| Scroll reveals | none on original; if desired, IO (`threshold≈0.2`) `translateY(15px)→0` + `opacity .8→1`, 700ms `ease-in-out`. |
| Values "4-up" | `grid-template-columns:repeat(4,1fr); gap:2rem` → 1 col under 768px (an intentional upgrade). |
| 6+1+5 / 12-col split | `grid-template-columns:6fr 1fr 5fr`; CTA `repeat(3,1fr)`; `max-width:1170px; margin-inline:auto`. |
| reduced-motion | wrap everything; `@media (prefers-reduced-motion:reduce){ ::view-transition-*{animation:none} }`. |

**Hard to match:** `expo.outIn` (compound curve — split into 2 keyframe halves for exactness, or use
`expo.inOut` as a single-bezier stand-in); scroll-coupled `circ.out` move (no CSS equivalent; instant
MPA scroll-to-top is the substitute); Safari/Firefox cross-doc VT support (Chromium-first — ensure the
instant-nav fallback looks right).

**rem reference (18px base):** `0.778=14 · 0.889=16 · 1=18 · 1.111=20 · 1.278=23 · 1.667=30 · 2.222=40 ·
2.667=48 · 3.111=56 · 5.556=100 · 8.889=160`px. For a 16px-base site, port the px values directly.
