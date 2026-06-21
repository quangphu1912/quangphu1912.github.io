# michellegore.com/project/fitbit — Case-study spec (the key page)

The page the user most wants to replicate: **cover → scroll-down arrow → content → prev/next**.
`1rem = 18px` (Semplice base). px values at ×18.

## Sources
- Page HTML: `https://michellegore.com/project/fitbit`
- Theme CSS: `…/themes/semplice5/assets/css/frontend.min.css?ver=5.3.5`
- Theme JS: `…/themes/semplice5/assets/js/frontend.min.js?ver=5.3.5`
- Fonts: `https://use.typekit.net/xbb8sor.css` + Google (Karla, Inter)

**Global config (inline `var semplice={…}`):** `frontend_mode:"dynamic"` (AJAX nav ON),
`static_transitions:"disabled"`, **`sr_status:"disabled"`** → **per-element scroll-reveal is OFF**.
Body content appears statically; the only motion is the cover, the scroll-cue smooth scroll, the nav
transparency toggle, AJAX page transitions, and Flickity carousels.

## 1. Cover / hero

| Property | Value |
|---|---|
| Height | `100vh` (`data-height="fullscreen"`, also JS-forced to `window.height`) |
| Background | looping muted autoplay **`<video>`**, `object-fit:cover`, `poster=Fitbit-Cover.png`, src `fitbit-cover-full.mp4` |
| Title | **baked image** (`cover-logo-fitbit.svg`), left-aligned — NOT HTML text |
| Parallax | `data-cover-effect="parallax"` applies `translate3d(0,scrollTop/3,0)` to `.cover-image` — but this page has a `.background-video`, so **the video does not parallax** |
| Scrim | none; legibility via `text-shadow: 0 0 0.444rem rgba(0,0,0,1)` (≈8px black blur) on the meta block |
| Metadata block | left column `width=3` (25%), `data-valign=center`, left-aligned, white |

Metadata pairs (label → value), each separated by a 1px white divider at `opacity:0.1`,
`padding-top:0.889rem≈16px`:
- **Role** → Web Design, UI/UX Design
- **Duration** → 6 Weeks
- **Tools** → Sketch, Zeplin
- **Team** → Copy Writer / Project Manager

Labels: Inter 700, 0.778rem (**14px**), white. Values: Inter 400, 0.889rem (**16px**), white.

**Transparent nav over cover:** `.semplice-navbar{height:3.889rem (70px); background:#f5f5f5;
position:absolute; z-index:120; transition:background-color .2s linear}`. While the cover is on screen
the nav carries `.cover-transparent{background:rgba(0,0,0,0)!important}`; it goes opaque once
`scrollTop >= coverHeight − (navHeight+20)`.

## 2. Scroll-down arrow

```html
<a class="show-more show-more-visible semplice-event" data-event="scrollToContent">
  <svg width="53px" height="20px" viewBox="0 0 53 20">
    <g><polygon points="26.5,17.688 9.114,3.779 10.303,2.312 26.5,15.269 42.697,2.313 43.886,3.779 "/></g>
  </svg>
</a>
```
- Simple downward chevron (a `>` pointing down), 53×20 viewBox, `fill:#fff`.
- `position:absolute; bottom:14px; width:100%; display:flex; justify-content:center; padding:30px`.
- **No bounce/loop/pulse keyframe** (verified — no `animation` on `.show-more`).
- Behavior = click → smooth scroll only: `gsap.to(window, 1, {scrollTo:{y: coverHeight − navOffset},
  ease:"expo.inOut"})` → **1.0s, expo.inOut**, lands at the cover bottom.

## 3. Section-by-section scroll reveals

**None active** (`sr_status:"disabled"` → `s4.helper.reveal()` never runs). 11 static `content-block`
sections after the cover. Two are tinted: `background:#dfe5e6` (device-mockup section). Section padding
e.g. `5.556rem (100px)` top/bottom.

For completeness, Semplice's default reveal config (would fire if enabled — the canonical "Semplice feel"):
```
viewFactor:0.2, opacity:0, distance:"0px", easing:"ease-out", duration:700, scale:1, mobile:false
```
i.e. a **700ms opacity fade, ease-out, trigger at 20% in view, no translate, no scale** (ScrollReveal.js,
not GSAP).

## 4. Image treatments
- Content images full-bleed within the 1170px container: `{width:100%; height:auto}`. `.ce-image{font-size:0;line-height:0}` kills inline gaps.
- One mockup card: `box-shadow:0 0.556rem 2.778rem 0 rgba(0,0,0,0.25)` (≈0 10px 50px).
- **PhotoSwipe lightbox present in theme but NOT used on this page** (0 `.gallery-item`). No image hover.
- **2 Flickity carousels** (`data-module="gallery"`): `autoPlay:2000, wrapAround:true,
  prevNextButtons:false, pageDots:false, selectedAttraction:0.025, friction:0.28` — auto-advancing, looping, no controls.

## 5. Prev/next navigation

```html
<section class="semplice-next-prev" data-pn-layout="container" data-np-text-position="overlay"
         data-np-image-visibility="hidden" data-np-mouseover="none" data-np-sep-visibility="hidden">
  <a class="semplice-prev np-link" href="/project/airbnb">
    <span class="np-label-above">Prev</span><span class="np-label">Airbnb</span>
  </a>
  <a class="semplice-next np-link" href="/project/hackdavis">
    <span class="np-label-above">Next</span><span class="np-label">HackDavis</span>
  </a>
</section>
```
- **Full-width band**, white bg, height **10rem (180px)**, two links justified to the edges
  (`data-np-justify="edge"`, vertically middle). Prev left, Next right.
- Each link: small uppercase kicker **above** the project name. Labels are the **actual project names**, not generic.
- Typography: kicker `.np-label-above{color:#aaaaaa; font-size:0.667rem (12px); text-transform:uppercase;
  letter-spacing:1px}`; main `.np-label{color:#000; font-size:1.333rem (24px)}`; both Inter 400.
  `.np-text-above` padding-bottom `0.444rem (8px)`.
- **Hover ≈ none** in this config: `.np-link:hover{background:#fff}`, labels stay `#000`. Separator hidden.

## 6. Page transitions (AJAX, GSAP)

Navigating between projects is AJAX (`frontend_mode:"dynamic"`):
- Content slide: `gsap.to(".transition-wrap", d, {top:"-…px", ease:"circ.out"})` with
  **`d = 10·|offsetTop/viewportHeight·100|/1000` s** (scroll-distance-scaled, ~0.3–1s). **circ.out**.
- Reveal/cover wipe: `gsap.to("#apg-transition-…", 1, {width:"100%", height:vp, ease:"expo.inOut"})` —
  **1.0s expo.inOut**; paired thumbnail `gsap.to(.post-thumbnail img, 1, {scale:1, ease:"expo.inOut"})`.
- Navbar: out `gsap.to(navbar, .7, {yPercent:-100, ease:"expo.inOut"})`; in `.8 {yPercent:100/opacity,
  ease:"expo.out"}`.
- Content fade: `gsap.to(content, .8, {opacity:1, ease:"none"})` (or `.4 expo.OutIn` on append).
- Back-to-top: fades in once `scrollTop>400`; click → `.9s expo.inOut` to top. SVG `fill:#8c8c8c`.

## 7. Typography + color

Primary UI = **Inter** (300/400/500/600/700); **Karla** (nav/logo); europa/minion-3/proxima-nova available.

| Use | Size | Line-height | Font |
|---|---|---|---|
| Page H1 ("Fitbit Stress Management Page") | 2.222rem / **40px** | 2.667rem (48px) | Inter 700, `#000` |
| Section heading ("Context") | 1.667rem / **30px** | 2.222rem (40px) | Inter 700 |
| Lead / large body | 1.333rem / **24px** | 2.111rem (38px) | Inter 700 `#4f4f4f` / Inter 400 |
| Body | 1.111rem / **20px** | 1.833rem (33px) | Inter 400/600 |
| Date subtitle ("September 2020") | 1.111rem / **20px** | — | Inter 500, `#a5a5a5` |
| Meta value / small body | 0.889rem / **16px** | 1.444rem (26px) | Inter 400 |
| Meta label, footnote | 0.778rem / **14px** | — | Inter 700 / 400 |
| Prev/Next name | 1.333rem / **24px** | — | Inter 400, `#000` |
| Prev/Next kicker | 0.667rem / **12px**, uppercase, ls 1px | — | Inter 400, `#aaaaaa` |

**Palette:** text primary `#000`; secondary `#4f4f4f`; muted `#a5a5a5`/`#999`/`#aaa`; cover text `#fff`;
links `#6b6b6b`→`#a5a5a5`; bg page `#fff`, nav `#f5f5f5`, tinted section `#dfe5e6`, panel `#f5f5f5`;
back-to-top `#8c8c8c`; nprogress `#efeaff`.

## 8. Native replica notes

| Original (GSAP/Semplice) | Native equivalent |
|---|---|
| Cover 100vh video | `<video autoplay muted loop playsinline poster>`, `height:100svh`, `object-fit:cover`, behind content; reduced-motion → poster. |
| Cover parallax (`scroll/3`) — not active on video | for an image cover: `animation-timeline: view()`/`scroll()` translateY, or rAF `transform`. Faithful = no parallax on video. |
| Scroll cue: click → 1s expo.inOut scroll | `<a href="#overview">` + `html{scroll-behavior:smooth}`. For exact 1s/expo.inOut: a small JS scroll tween with `cubic-bezier(.87,0,.13,1)`. Chevron = inline SVG. No keyframe needed (matches original). |
| Section reveals (disabled) | Match shipped site = render statically. For a richer feel: IO (`threshold:0.2`) class toggle, `transition:opacity 700ms ease-out`, no translate. |
| Flickity carousels | CSS scroll-snap + `setInterval` autoplay (closest; momentum won't match). |
| PhotoSwipe (unused) | skip; if needed elsewhere: `<dialog>` + image clone, or CSS `:target`. |
| Prev/next band | flex band `justify-content:space-between; align-items:center; min-height:180px`; two `<a>`, uppercase kicker + project name; hover minimal. |
| AJAX page transition (circ.out/expo.inOut) | **CSS View Transitions**: `@view-transition{navigation:auto}` + `view-transition-name` on the cover image (morph); tune `::view-transition-group` `animation-duration:.6s; animation-timing-function: cubic-bezier(.16,1,.3,1)`. |
| Nav transparent→opaque at cover bottom | IO on cover/sentinel toggling `.is-solid`; CSS `transition:background-color .2s linear`. |
| Back-to-top | IO/scroll toggle visibility; click → JS scroll tween 900ms `cubic-bezier(.87,0,.13,1)`. |

**Easing conversions:** `expo.out → cubic-bezier(.16,1,.3,1)`; `expo.inOut → cubic-bezier(.87,0,.13,1)`;
`circ.out → cubic-bezier(0,.55,.45,1)`; `Power0/none → linear`; ScrollReveal `ease-out → cubic-bezier(0,0,.58,1)`.

**Hard to match:** scroll-distance-scaled transition duration (`d`); Flickity physics; exact expo curve
on programmatic scroll (needs a JS tween). Everything else maps cleanly to vanilla CSS + IO + View Transitions.

> Note for our site: we keep abstract SVG art and use a **tall ~62svh cover** (not full 100vh) with an
> HTML `<h1>` title (not a baked image), so recruiters see the first content line above the fold.
