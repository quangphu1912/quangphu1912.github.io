# michellegore.com/work — Projects listing spec

`1rem = 18px` (Semplice base `html{font-size:18px}`). px values computed at ×18.

## Sources
- Page HTML: `https://michellegore.com/work` (= `/work/`, `page-id-479`)
- Fonts: `https://use.typekit.net/xbb8sor.css` (europa, minion-3, proxima-nova) + Google (Karla, Inter)
- Theme CSS: `…/themes/semplice5/assets/css/frontend.min.css?ver=5.3.5`
- Theme JS: `…/themes/semplice5/assets/js/frontend.min.js` (parallax + easing)
- Inline `<style>`: `#semplice-webfonts-css`, `#semplice-custom-css`, `#479-post-css`

## 0. What this page is (critical framing)

`/work` is **not a thumbnail grid**. It is a vertical stack of **5 full-viewport "cover" sections**,
one per project, scrolled through like a deck:

| # | Project | Cover | Detail link |
|---|---|---|---|
| 1 | WhatsApp | `whatsapp-cover.jpg` | `/project/whatsapp` |
| 2 | Apple | `Apple-Full.png` | `/project/apple` |
| 3 | Airbnb | `Airbnbcover.png` | `/project/airbnb` |
| 4 | Fitbit | background-video | `/project/fitbit` |
| 5 | HackDavis | background-video | `/project/hackdavis` |

Each section = `<section class="semplice-cover" data-height="fullscreen" data-valign="center"
data-cover-effect="parallax">` containing: a full-bleed `.cover-image` background (project name baked
into the image), a left-aligned **25%-width metadata column** (Role/Duration/Tools/Team) in white, a
centered outline **"VIEW PROJECT"** button near the bottom, and a chevron scroll cue.

Parallax engine (`frontend.min.js`):
```js
"parallax"==$(s4.cover).attr("data-cover-effect") && 0==$("#coverslider").length &&
  (t=$(window).scrollTop()/3, $(".cover-image").css({transform:"translate3d(0px,"+t+"px,0px)"}))
```

## 1. Typography

Base `html{font-size:18px; line-height:1.6667; font-family:"Open Sans",Arial,sans-serif}`. Visible HTML
text uses **Inter**; project names are rasterized into the cover images.

| Role | Font class | Family/weight | Size | Letter-spacing | Transform | Color |
|---|---|---|---|---|---|---|
| Metadata LABEL ("Role"…) | `font_x6tx5d5fi` | **Inter 700** | 0.778rem = **14px** | 0 | none | `#ffffff` |
| Metadata VALUE | `font_3qmflxvbd` | **Inter 400** | 0.889rem = **16px** | normal | none | `#ffffff` |
| "View Project" button | (Karla 600 / generated) | 0.722rem = **13px** | 0.167rem = **3px** | uppercase | `#ffffff` |
| Project titles | — | baked into cover image | — | — | — | — |

```css
.font_x6tx5d5fi {font-family:"Inter",sans-serif; font-weight:700;}   /* labels */
.font_3qmflxvbd {font-family:"Inter",sans-serif; font-weight:400;}   /* values */
.font_n9wcytiar {font-family:"Karla",sans-serif; font-weight:600;}   /* button */
```

## 2. Color

| Hex | Usage |
|---|---|
| `#ffffff` | overlaid metadata + button (over dark covers) |
| `#020202` | button label on hover (bg flips white) |
| `#000000` | detail-panel labels/titles |
| `#999999` | detail subtitle |
| `#4f4f4f` | body copy |
| `#6b6b6b` → `#a5a5a5` | link default / hover |
| `#f9f9f9` | one non-cover section bg |
| `#7566F6` @ 50% (`rgba(117,102,246,.5)`) | portfolio-grid thumb hover overlay (brand purple) |
| `#e4afff` | active overlay-menu item |
| `#efeaff` | NProgress page-load bar (pale lavender) |
| `#8c8c8c` | chevron / back-to-top SVG fill |

Page chrome = white + grayscale with a **lavender/purple accent** (`#7566F6` / `#e4afff` / `#efeaff`)
surfacing only in motion chrome. Cover artwork supplies the dominant color.

## 3. Layout

```css
.container{max-width:1170px}      /* custom override (frontend default 1230) */
.row{display:flex; flex-wrap:wrap}
[data-xl-width="3"]{flex-basis:25%}
```
Gutters: column `padding:0 5px` (≥1170px) / `0 2.5px` (below).

Cover section:
```css
.semplice-cover{display:flex; flex-direction:column; position:relative; width:100%}
[data-height=fullscreen] .container{min-height:100vh}
.cover-image{width:100%;height:100%;position:absolute;top:0;z-index:-1;
  background-size:cover; background-position:50% 50%; background-attachment:scroll}
.cover-image-wrapper{transform:scale(1.2)!important}   /* parallax headroom */
```
Metadata column: `width=3` (25%), `data-valign=center`, left side. Items stack label (14px bold) →
value (16px), separated by faint divider spacers (`padding-top:0.889rem=16px`, `opacity:0.1`). Cluster
starts `padding-top:3.333rem=60px`.

View Project button:
```css
.view-project{position:absolute; bottom:3.333rem /*60px*/; width:100%; text-align:center; z-index:10000}
.view-project a{display:inline-block; font-size:13px; letter-spacing:2px; text-transform:uppercase;
  padding:8px 24px; color:#fff; background:transparent; border:1px solid rgba(255,255,255,.7); border-radius:2px}
```

Chevron cue:
```css
.semplice-cover .show-more{position:absolute; bottom:2px; width:100%; z-index:105;
  display:flex; justify-content:center; padding:30px; cursor:pointer}
.semplice-cover .show-more svg{width:2.944rem /*53px*/; height:auto; fill:#8c8c8c}
```

Responsive: metadata column `width=12` on phones (≤544px); button shrinks to `font-size:11px; padding:0 10px`.
`background-attachment:scroll` (not fixed) — parallax is JS, mobile-safe.

## 4. Motion / timing

### 4a. Cover parallax (signature)
On every scroll, `.cover-image` is translated down at **1/3 scroll speed**: `translate3d(0, scrollTop/3, 0)`.
Wrapper pre-scaled `1.2` so edges never show. ~33% parallax. Raw `scrollTop` listener, not a timeline.

### 4b. Ambient cover zoom (alternate `data-cover-effect=zoom` mode)
```css
@keyframes coverZoom{0%,100%{transform:scale(1)} 50%{transform:scale(1.24)}}
.cover-image{transform-origin:50% 80%; animation:coverZoom linear 50s infinite}
```
Slow 50s breathing zoom 1.0→1.24→1.0, linear, infinite.

### 4c. Page-load entrance
- Content fade: `gsap.to(content, .8, {opacity:1, ease:"none"})` — **0.8s linear**.
- Navbar slide: `gsap.to(navbar, .8, {opacity:1, y:0, ease:"expo.out"})` — **0.8s expo.out**.
- NProgress bar (`#efeaff`) across the top.

### 4d. Smooth-scroll navigation
```js
// chevron scrollToContent:
gsap.to(window, 1, {scrollTo:{y: coverHeight - navOffset}, ease:"expo.inOut"});   // 1.0s
// back-to-top:
gsap.to(window, .9, {scrollTo:{y:0}, ease:"expo.inOut"});                          // 0.9s
```

### 4e. Overlay menu stagger
```js
gsap.to(item, .35, {opacity:1, y:0, delay:t});  t += .08;   // 0.35s each, 0.08s stagger
```

### 4f. Hover micro-interactions
- View Project button: transparent → `background:#fff; color:#020202`, via global `transition:all .2s linear`.
- Portfolio-grid thumb: `img{transition:all .3s ease} :hover img{transform:scale(1.15)}` + overlay
  `rgba(117,102,246,.5)` fade-in; hover title/category white.
- Links: `#6b6b6b → #a5a5a5`, `all .2s linear`.

**Easing vocabulary:** `expo.inOut` (scroll/page), `expo.out` (entrances), `circ.out` (content reveal),
`all .2s linear` (hovers), `all .3s ease` (image zoom).

## 5. Signature details
1. Full-viewport, image-first storytelling — no card chrome; each project owns the whole screen.
2. Depth parallax — foreground stays crisp while the image drifts at 1/3 speed (scale(1.2) = no seams).
3. Restrained overlay metadata — tiny 14px labels + 16px values, lots of breathing room in a 25% column.
4. Outline → fill button.
5. Expo/circ easing everywhere (reads "expensive").
6. Chevron + smooth deck-scroll (one cover at a time).
7. Lavender accent restraint in micro-moments only.

## 6. Native replica notes

| Effect | Native equivalent | Notes |
|---|---|---|
| Cover parallax (`scrollTop/3`) | rAF-throttled scroll handler writing `transform: translate3d(0,${y/3}px,0)`, image wrapper `scale(1.2); overflow:hidden`. Or `animation-timeline: scroll()`. | `animation-timeline` ~83% (no Firefox stable June 2026); keep a rAF fallback. Avoid `background-attachment:fixed` (mobile-broken). |
| Full-viewport covers | `section{min-height:100svh}` (svh, not vh — dodges mobile URL-bar jump). | — |
| Metadata column | `grid-template-columns:repeat(12,1fr)` span 3; stack to 100% under 544px. | — |
| coverZoom 50s | verbatim CSS `@keyframes` + `animation:coverZoom 50s linear infinite`, wrapped in `prefers-reduced-motion:no-preference`. | fully native |
| Page-load fade/rise (0.8s) | CSS keyframe or IO class toggle; `expo.out ≈ cubic-bezier(.16,1,.3,1)`, `expo.inOut ≈ cubic-bezier(.87,0,.13,1)`, `circ.out ≈ cubic-bezier(0,.55,.45,1)`. | — |
| Menu 0.08s stagger | `transition-delay: calc(var(--i) * 80ms)`. | — |
| Smooth chevron/back-to-top scroll | `scrollIntoView({behavior:'smooth'})` or `scrollTo`; native curve ≠ expo (a tiny rAF tween is the only exact match — the one place dropping GSAP costs fidelity). | respect reduced-motion |
| Button outline→fill | `.btn{border:1px solid #fff;color:#fff;transition:all .2s linear} :hover{background:#fff;color:#020202}`. | native verbatim |
| Thumb zoom + overlay | `img{transition:transform .3s ease} :hover img{transform:scale(1.15)}` + overlay `::after`. | native |
| Page→detail transition | **CSS View Transitions** (`@view-transition{navigation:auto}`, Chrome/Edge/Safari 18+, FF flagged) + shared-element morph of the cover image. Better than GSAP AJAX. | no-op fallback for FF |

**Hard to match:** exact `expo.inOut` programmatic scroll (needs a rAF tween); cross-browser
scroll-linked parallax (rAF remains the portable path); Flickity momentum physics. Everything else maps
cleanly to vanilla CSS + IntersectionObserver + View Transitions.

> Note for our site: we use a **card grid / scroller**, not a full-screen cover deck. We adopt the
> *cover treatment + parallax + outline button* selectively on the project **detail** page, not the listing.
