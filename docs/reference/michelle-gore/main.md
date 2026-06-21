# michellegore.com — Homepage spec

Reverse-engineered for replication on a vanilla-CSS + IntersectionObserver + CSS View Transitions
Jekyll site. **All measurements derive from `html { font-size: 18px }`** (Semplice base), so
`1rem = 18px` throughout; px values below are computed from that.

## Sources

| Asset | URL |
|---|---|
| Page HTML | `https://michellegore.com/` |
| Fonts (Adobe/Typekit) | `https://use.typekit.net/xbb8sor.css` |
| Theme base CSS | `…/themes/semplice5/assets/css/frontend.min.css?ver=5.3.5` |
| Per-page generated CSS | inline `<style>` block in the HTML |
| Font-class map | inline `<style id="semplice-webfonts-css">` |
| GSAP animation config | inline `<script>` (Semplice `s4.animate.gsap` engine) |

Base rule: `html{font-size:18px;line-height:1.6666666667;font-family:"Open Sans",Arial,sans-serif}`

Stack: WordPress 6.0 + Semplice 5.3.5 + GSAP (+ScrollTrigger) + jQuery + Cloudflare email-protection.

## 1. Typography

Type services: **Adobe Fonts/Typekit** (`xbb8sor.css`) loads `europa`, `minion-3`, `proxima-nova`
(+condensed). **Karla** and **Inter** come from Google. The homepage uses only **europa, Karla, Inter**.

| Role | Where | Family + weight | Size | Line-height | Letter-spacing | Transform | Color |
|---|---|---|---|---|---|---|---|
| Big name | Hero "Michelle Gore" | **europa 700** | 3.333rem = **60px** (→36px sm) | 6.667rem=120px (→75px sm) | 0 | none | `#ffffff` |
| Eyebrow | "PRODUCT DESIGNER" | **Karla 600** | 1rem = **18px** | — | 0.167rem = **3px** | uppercase | `#ffffff` |
| Role callout | "Senior Product Designer @ Meta" | **Karla 400** | 0.889rem = **16px** | — | 0.028rem = **0.5px** | none | `#ffffff` |
| Logo | nav "MICHELLE GORE" | **Karla 500** | 0.889rem = **16px** | — | 0.083rem = **1.5px** | uppercase | `#ffffff` |
| Nav links | Work · Play · About | **Karla 400** | ~0.889rem=16px | — | small | none | `#ffffff`; hover/active = white underline |
| Card eyebrow | "META SENIOR PRODUCT DESIGNER" | **Karla 600** | 0.889rem=**16px** (→12px sm) | 1.333rem=24px (sm) | 0.111rem = **2px** | uppercase | `#a5a5a5` |
| Card title | "Designing an incentive ecosystem…" | **Inter 600** | 1.667rem = **30px** | 2.222rem = **40px** | 0 | none | `#000000` |
| Card body | description | **Inter 400** | 1.111rem = **20px** | ~1.4 | 0 | none | `#000` / `#686868` |
| "VIEW PROJECT ➞" | card CTA | **Karla 600** | 1rem = **18px** | — | 0 → 0.028rem on hover | none | `#686868` → `#00b709` hover |

Notes: europa is a clean geometric grotesque (Avenir/Futura-ish) — the only display face. The arrow is
the literal **➞** glyph (U+279E), not an icon.

## 2. Color

| Token | Hex | Usage |
|---|---|---|
| Hero background | `#020202` | video fallback |
| Page background | `#ffffff` (one section `#f9f9f9`) | body / sections |
| Primary text | `#000000` | card titles |
| Secondary text | `#686868` / `#6b6b6b` | CTA default, muted body |
| Tertiary / card eyebrow | `#a5a5a5` | kicker labels |
| Hero text | `#ffffff` | hero copy over video |
| Hero text shadow | `rgba(32,21,131,1)` deep indigo | `text-shadow: 0 0.556rem 2.778rem` (0 10px 50px) |
| CTA hover accent | `#00b709` (green) | "VIEW PROJECT" hover |
| Per-project accents (cover SVGs) | `#e4afff` lavender, `#ed6665` coral, `#db7fa2` pink, `#a3ccce` teal, `#8c51bf` purple | each project's cover art is a brand-colored SVG tile |

The Gutenberg `--wp--preset--color--*` palette in the page is boilerplate, **not** the design system.

## 3. Layout

Top → bottom:
1. **Overlay nav** — logo left, menu right; white over the hero. Hamburger (24px wide, 2px bars) on mobile.
2. **Hero** — `.semplice-cover { height: 100vh; overflow-x: hidden }`, full-viewport **background video**
   (animated blue/purple/magenta liquid-marble loop, `opacity: 0.75`, `background-size: cover`, fallback
   `#020202`). Centered stack: eyebrow → big name → role callout. 3D context
   `transform: translateZ(0) perspective(2000px); transform-style: preserve-3d` (all rotations 0 — drop it).
3. **Scroll cue** — `.show-more` at hero bottom: `position:absolute; bottom:14px; width:100%;
   display:flex; justify-content:center; padding:30px`. White SVG chevron, `width: 2.944rem ≈ 53px`.
   `data-event="scrollToContent"` (click → smooth scroll to first section).
4. **Project sections** (one per project). Each is a 12-col `.row` with **two `width=5` columns**
   (text + cover image) separated by `width=1` **spacer columns** → `5 / 1 / 5 / 1` (~42% + ~42%,
   ~8% gutters). **Text and image swap sides** project-to-project (alternating).

Container `max-width: 1170px`; column padding 5px (≥1170px) / 2.5px (below). Project sections
`padding-top: 8.889rem = 160px` (some 200px); hero inner column padding `5.556rem = 100px` top/bottom.
Breakpoints: 1170 / 992 / 768 / 544px (type scales down via duplicated `data-content-for` blocks).

## 4. Motion / timing

Engine = Semplice's **GSAP + ScrollTrigger**: per element `gsap.set(el,{translateX:<offset>})`,
CSS pre-set `opacity:0`, then `.to(el,{opacity:1,x:0,y:0,duration,ease,delay})`, timeline `.pause()`d and
played by the scrollTrigger.

ScrollTrigger settings found:
```
{ start: "top bottom",      end: "...top+=100%", scrub: 0, pin: false }  // container columns
{ start: "top bottom-=25%", end: "...top+=75%",  scrub: 0, pin: false }  // content blocks
```
`scrub: 0` ⇒ NOT tied to scroll position — the timeline **plays once** when the element crosses the
trigger line. This is exactly IntersectionObserver behavior.

### Card / content reveal (the signature)
- **Property**: horizontal slide + fade — `opacity 0→1`, `translateX → 0`. **`translateY: 0` for all**
  (motion is purely on the X axis — content swoops in sideways, not up).
- **Start offsets** (alternating L/R per column): `-100px / -50px / -10px / +50px / +100px / ±200px`.
  Big image columns slide far (±100–200px); text/labels slide small (10–50px).
- **Duration** `0.8s`; **ease** `Power0.easeNone` (**linear**); **delay** `0` (natural stagger comes
  from each element having its own trigger at `top bottom-=25%`, so items reveal in DOM order).

### Hero entrance
No GSAP load-in tween on the hero copy — the looping video carries the motion; the hero text is still.

### "VIEW PROJECT ➞" hover
Dedicated timeline on mouseover/out: `gsap.set(…translateX:-10px) → .to({x:0, duration:0.2,
ease:"Power1.easeInOut"})` (label/arrow slides right ~10px), `.reverse()` on out. Simultaneously (CSS):
color `#686868 → #00b709`, `letter-spacing 0 → 0.5px` with `margin-right: -0.5px` (text tracks open).

### Scroll cue
Static white chevron at `bottom:14px`, click → smooth `scrollToContent`. **No bounce keyframe** in CSS.

### Ambient
Background video only (liquid-gradient loop @ 0.75 opacity). No custom cursor, no marquee.

## 5. Signature details
1. **The liquid-marble hero video** — slow full-bleed flowing blue/purple/magenta behind crisp white
   europa type with a deep-indigo glow shadow (`0 10px 50px rgba(32,21,131,1)`). Does most of the work.
2. **Sideways scroll reveals, linear ease** — content slides in horizontally (alternating L/R to match
   image side), `opacity 0→1`, `0.8s linear`, distance scaled to element size. Reads "editorial/architectural".
3. **CTA that greens + tracks open on hover** — gray→`#00b709`, +0.5px tracking, +10px arrow slide.

## 6. Native replica notes (no GSAP/jQuery)

| Original (GSAP) | Native equivalent |
|---|---|
| ScrollTrigger `start:"top bottom-=25%"`, `scrub:0`, play once | IntersectionObserver `rootMargin:"0px 0px -25% 0px"`, `threshold:0`, `unobserve` after first hit. Or `animation-timeline: view()` `animation-range: entry 0% cover 25%`. |
| `gsap.set(translateX:-100px) → .to(x:0,opacity:1, 0.8s linear)` | `[data-reveal]{opacity:0; transform:translateX(var(--from)); transition:opacity .8s linear, transform .8s linear} .is-visible{opacity:1; transform:none}`; set `--from` per element. `Power0.easeNone` = `linear`. |
| Alternating L/R | toggle `--from` sign by column index / nth-child. |
| Hero video | `<video autoplay muted loop playsinline>` cover, `opacity:.75`, poster `#020202`; `prefers-reduced-motion` → poster only. |
| Scroll cue click | anchor `<a href="#work">` + `html{scroll-behavior:smooth}`. |
| "VIEW PROJECT" hover | `transition: color .2s ease-in-out, letter-spacing .2s, transform .2s; :hover{color:#00b709; letter-spacing:.5px; transform:translateX(10px)}`. Power1.easeInOut ≈ `ease-in-out`. |

**Hard to match / caveats:** the `perspective(2000px)` adds nothing here (drop it). The marble video is
an authored asset, not code (a CSS animated gradient only approximates it). europa is Adobe Fonts
(needs a Typekit kit or a free geometric-grotesque substitute — Avenir Next / Nunito Sans / Mulish).
Karla + Inter are free Google Fonts (self-host woff2). **This site already uses Inter — keep it.**
