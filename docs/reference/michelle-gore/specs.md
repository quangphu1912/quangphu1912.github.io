# michellegore.com — Cross-page synthesis, premium features & native replication map

Reference for replicating michellegore.com's feel on this Jekyll/GitHub Pages site **natively** (vanilla
CSS + IntersectionObserver + CSS View Transitions — no GSAP, no jQuery, no build step, $0 recurring).

See per-page detail in [`main.md`](main.md), [`work.md`](work.md), [`project.md`](project.md),
[`about.md`](about.md).

## Her stack vs ours

| | michellegore.com | This site |
|---|---|---|
| Platform | WordPress 6.0 + **Semplice 5.3.5** (paid theme, ~$119–229) | Jekyll static site |
| Hosting | PHP/MySQL host (recurring ~$4–15/mo) | **GitHub Pages (free)** |
| Animation | **GSAP** + ScrollTrigger + jQuery (~96–114 KB gzip) | native CSS + IntersectionObserver (**~0 KB**) |
| Page transitions | GSAP AJAX swap | **CSS View Transitions** (already enabled) |
| Fonts | Adobe Typekit (europa) + Google (Karla, Inter) | Inter (already) |

**Verdict (bar-raiser + fact-checked, 2026):** matching her *level* costs ~$0 — GSAP is now free,
GitHub Pages is free, CSS View Transitions are free. Adopting her stack would *add* recurring cost and
get no closer to her look. The gap is **craft, not tooling**.

## The restraint finding (most important takeaway)

Her case-study and about pages run with per-element scroll-reveal **disabled** (`sr_status:"disabled"`).
The premium feel comes from a small set of high-craft moments, not busy content animation:

1. **Full-bleed covers** (image/video, parallax, 100vh) — the dominant device.
2. **Buttery page-to-page transitions** with expo/circ easing.
3. **Disciplined typography & whitespace** (1170px grid, generous 100–160px section padding, tiny
   uppercase eyebrows, large clear titles).
4. **Tiny tactile hovers** (button fill, image zoom, link color, CTA "track-open").
5. **Restraint** — one accent (soft violet) used only in motion chrome; otherwise grayscale on white.

→ For an engineer's portfolio this is *good news*: the expensive-to-fake part (busy JS animation) isn't
even what makes it feel premium. Build the few moments well; leave the rest quiet.

## Easing dictionary (GSAP → cubic-bezier)

| GSAP | cubic-bezier | Use in her site |
|---|---|---|
| `expo.out` | `cubic-bezier(.16, 1, .3, 1)` | entrances, navbar-in |
| `expo.inOut` | `cubic-bezier(.87, 0, .13, 1)` | programmatic scroll, navbar-out, cover wipe |
| `circ.out` | `cubic-bezier(0, .55, .45, 1)` | content slide on page transition |
| `Power0 / none` | `linear` | homepage card reveal, content fade |
| `Power1.easeInOut` | `ease-in-out` ≈ `cubic-bezier(.42,0,.58,1)` | CTA hover slide |
| ScrollReveal `ease-out` | `cubic-bezier(0,0,.58,1)` | (disabled) default reveal |

This site's existing token `--ease-out-expo: cubic-bezier(0.2, 0.7, 0.2, 1)` is gentler than her
`expo.out`; keep it for reveals. Consider an additional `--ease-expo-out: cubic-bezier(.16,1,.3,1)` for
cover/transition moments if a sharper curve is wanted.

## Premium feature → native technique map

| Feature (where) | GSAP/Semplice mechanic | Native replica | Adopt here? |
|---|---|---|---|
| **Scroll-down arrow** (home, covers) | `.show-more` chevron, click → 1s `expo.inOut` scroll; **no bounce** | inline SVG/CSS chevron, `<a href="#…">` + `scroll-behavior:smooth` | **Yes** — `.scroll-cue`, with a subtle reduced-motion-gated bob (a deliberate enhancement; original is static) |
| **Card reveal on scroll** (home) | ScrollTrigger `scrub:0`, horizontal slide+fade, 0.8s linear, alt L/R | IntersectionObserver + CSS transition (already shipped as `[data-reveal]`) | **Yes** — move `data-reveal` to each card for individual stagger |
| **Full-bleed cover** (work, project) | 100vh `.semplice-cover`, image/video bg | CSS `min-height:100svh` (we use **~62svh** for skimmability) + `object-fit:cover` | **Yes (adapted)** — tall cover on the project **detail** page |
| **Cover parallax** (work) | `transform: translate3d(0, scrollTop/3, 0)`, wrapper `scale(1.2)` | rAF scroll handler or `animation-timeline: scroll()` | **No (for now)** — adds JS; not needed for the detail cover |
| **Ambient cover zoom** (work) | `@keyframes coverZoom` 50s linear infinite | verbatim CSS keyframe, reduced-motion-gated | **Optional** — nice idle motion if desired |
| **Prev/next** (project) | 180px edge-justified band, kicker over project name | flex band + Liquid neighbor lookup | **Yes** — and fix ordering to match the listing sort |
| **Page transitions** (all) | GSAP AJAX: content fade + navbar slide, expo/circ | `@view-transition{navigation:auto}` (already on) + `view-transition-name` shared elements | **Yes** — already live; tune the cover morph + nav slide |
| **Transparent nav over cover** (project) | `.cover-transparent` toggled past cover bottom | IO/sentinel toggling `.is-solid` + `transition:background-color .2s` | **Optional** — extra JS; skip unless wanted |
| **Outline→fill button** (work) | `transition:all .2s linear`, transparent→white | pure CSS | **Optional** |
| **Image zoom hover** (grid) | `transform:scale(1.15)`, .3s ease + overlay | pure CSS (this site already has `.card` image zoom) | already present |
| **NProgress bar** (all) | lavender top bar on nav | CSS keyframe on `pageswap`, or omit | **No** — VT cross-fade already signals nav |

## Browser support & graceful degradation (June 2026)

| API | Support | Fallback |
|---|---|---|
| IntersectionObserver | Baseline, ~97% | n/a (primary reveal mechanism) |
| `scroll-behavior: smooth` | Baseline, ~97% | instant jump |
| `min-height: 100svh` | Baseline, ~96% | `@supports` → `100vh` |
| Same-document View Transitions | **Baseline** (Oct 2025) | — |
| **Cross-document** View Transitions (`@view-transition{navigation:auto}`) | Chrome/Edge 126+, Safari 18.2+ (~83–85%); **Firefox: no** | at-rule ignored → normal navigation, no error |
| `animation-timeline: view()/scroll()` | Chrome/Edge 115+, Safari 26+ (~83%); **Firefox: no** | static styles remain (IO covers reveal) |

Firefox users (~6–8%) get instant navigation + static (non-scrubbed) content — **graceful degradation,
not breakage**. Layer IO + CSS transitions as the baseline; treat View Transitions and
`animation-timeline` as enhancements.

## View Transitions gotchas (from the cross-doc fact-check)

1. **4-second timeout** — if the destination page doesn't reach a renderable state within 4s of
   navigation, the transition silently dies. Keep cover images `loading="eager"` and avoid render-blocking
   fonts/assets on project pages.
2. **`object-fit: cover` on the pseudo-elements** — when a shared element changes aspect ratio (card
   thumbnail → big cover), the browser crossfades screenshots and **stretches** the image. Fix:
   `::view-transition-old(vt-…), ::view-transition-new(vt-…) { object-fit: cover; }`.
3. **`view-transition-name` uniqueness** — only one element per page may hold a given name at a time.
   This site uses `vt-{{ slug }}` per card/detail (unique per page) — OK; confirm no duplicates at build.
4. **Both pages must opt in** + **same-origin only** — `@view-transition` lives in the global `main.css`,
   so both ends already opt in.

## Adoption summary for this site

- Keep abstract SVG project art (no case-study content edits); keep Inter; keep free Jekyll/GH-Pages stack.
- Build, restrained: a **tall (~62svh) project cover** with an HTML title + scroll-cue arrow; **per-card
  staggered reveal**; **classy, correctly-ordered prev/next**; **tuned page transitions** (cover morph +
  nav slide). All gated on `.js` + `prefers-reduced-motion`.
- Defer/skip: cover parallax, transparent-nav toggle, NProgress bar, full 100vh covers, the cover deck
  layout — none are needed for a credibility-focused engineer portfolio.
