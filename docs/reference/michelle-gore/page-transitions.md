# michellegore.com — Page Transition Analysis & Native Implementation

Live session observations (2026-06-26) via Chrome browser automation.

## How Semplice 5 does it

**Stack confirmed**: WordPress + Semplice 5.3.5. Body classes: `dynamic-mode mejs-semplice-ui`.  
**Config**: `window.semplice.frontend_mode = "dynamic"`, `static_transitions = "disabled"`.

Semplice's "dynamic mode" intercepts every same-origin link click, AJAX-fetches the next page,
and plays a transition animation while the new DOM loads. The transition runs entirely in JS:
1. GSAP animates the current `.semplice-section` content out (slide left + fade, `circ.out`).
2. New page DOM is injected.
3. New content animates in from the right (`circ.out`, offset ~50–100px).
4. Navbar slides up then back down in the same timeline (expo.inOut, ~0.4s).

The "page turn" feeling comes from: **directionality** (old exits left, new enters from right)
+ **slight easing asymmetry** (exit is faster/sharper than enter) + **no crossfade** (content
never overlaps; it's a sequential replace, not a blend).

## What makes it feel premium

- Exit and enter are **not simultaneous** — exit completes (or nearly so) before enter starts.
  This reads as "the page is being turned aside to reveal the next one."
- The **navbar** animates independently (slides away, then back) reinforcing the layer separation.
- Duration is short (~350–450ms total) — never lingers.
- `circ.out` easing (`cubic-bezier(0, .55, .45, 1)`) has a fast start and soft landing, the
  opposite of a bounce, giving it physical weight.

## Native replica for this site

We use the **CSS View Transitions API** (`@view-transition { navigation: auto }`) which gives us
`::view-transition-old(root)` and `::view-transition-new(root)` as animatable pseudo-elements.

### Implemented in `assets/css/main.css` (VIEW TRANSITIONS section, after line ~1150)

The effect is an **opaque rise** (forward nav): both pages stay fully solid and slide
as one continuous **upward** motion — the new page rises from below while the old page
exits up and out the top, like scrolling down to the next section. **No crossfade.**
Frame-by-frame capture of michellegore.com (Home→Work, Home→About) confirmed her
forward transitions bring content *up* from the bottom, fully rendered as it rises —
that "content rising, then properly displayed" is the feel we match here. Browser-back
reverses it (new descends from above).

```css
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root) {
    animation: vt-page-exit 600ms cubic-bezier(0, 0.55, 0.45, 1) both;
    z-index: 1;
  }
  ::view-transition-new(root) {
    animation: vt-page-enter 600ms cubic-bezier(0, 0.55, 0.45, 1) both;
    z-index: 2;          /* new on top → clean rising seam */
  }
}

/* forward: new rises from below, old exits up */
@keyframes vt-page-exit  { to   { transform: translateY(-100%); } } /* old exits up/top */
@keyframes vt-page-enter { from { transform: translateY(100%); } }  /* new rises from below */
/* back (reversed, via :active-view-transition-type(back)) */
@keyframes vt-page-exit-back  { to   { transform: translateY(100%); } }
@keyframes vt-page-enter-back { from { transform: translateY(-100%); } }
```

### Why the seam stays glued (the math)

The two sheets must move in perfect lockstep or the join between them tears. For the
forward (rising) case, at animation progress `p` (0→1) with the snapshot box = one
viewport tall:

- new occupies `[(1−p)·100vh, (2−p)·100vh]` → its top edge sits at `y = (1−p)·vh`
- old occupies `[−p·100vh, (1−p)·100vh]` → its bottom edge sits at `y = (1−p)·vh`

They share the boundary `y = (1−p)·vh` exactly — old above it, new below it, zero
overlap. The viewport shows new filling from the bottom up while old is pushed out the
top. This only holds if **duration, easing, and delay are identical on both** — any
mismatch opens a gap or an overlap at the seam.

### Design decisions

| Decision | Rationale |
|---|---|
| **Both pages opaque** | The defining difference from a crossfade. You never see two ghosted layers; the new page is solid the whole way down → "everything appears at once." |
| **Lockstep (identical 600ms + circ.out, no delay)** | Keeps the seam between the two sheets perfectly aligned. Asymmetric timing tore the join. |
| **forward: old → −100%, new → +100%** | One continuous upward travel; new content rises into place (matches michellegore.com's forward nav), not a swap. Back reverses it. |
| **new on top (z-index 2)** | The rising edge is the new page's, so the seam is clean and the new page is what you watch arrive. |
| **Content ready on arrival** (`reveal.js`) | `[data-reveal]` elements already in the incoming viewport are revealed **synchronously at script load** (before first paint), so the page rises with its content fully shown instead of fading in a beat late underneath the slide. A `pagereveal` listener was tried first but registers too late to catch the incoming page's own reveal. Below-fold elements still reveal on scroll. |
| **`circ.out` (`0,.55,.45,1`)** | Semplice's content-slide easing — fast start, soft landing. |
| **`vt-phu` name morph removed** | A `view-transition-name` lifts that element out of the root snapshot and tweens it separately, tearing a hole in the cohesive slide. Dropped so the name slides with the page. `vt-{{ slug }}` (card→project image morph) is left in place — verified the full-page slide does not fight it on project nav. |

### Polish layered on top (closer to Semplice's feel)

| Enhancement | How |
|---|---|
| **Persistent header** | `.site-header { view-transition-name: vt-header; }` lifts the wordmark + nav into their own group so they stay pinned while content slides underneath — the app-shell feel. Only the active-nav underline differs page-to-page, so it cross-fades cleanly inside the group. |
| **Leading-edge shadow + accent** | Multi-layer `box-shadow` on `::view-transition-new(root)`: a crisp brand-blue line (`--color-accent #0A84FF`) + soft blue glow + black depth shadow. For the forward (rising) case they sit at **negative** y-offset so they ride the new page's top (leading) edge; the back override flips them to positive y for the descending edge. Visible only while sliding (off-screen at rest). The blue is the restrained answer to michellegore.com's transition colour — her pages are full-bleed coloured (e.g. bright-green WhatsApp case study); we keep the dark theme and just accent the moving seam. |
| **Directional forward/back** | `assets/js/transition-direction.js` tags each transition `forward`/`back` (via `pageswap` + `pagereveal`, reading `navigation.activation` history indices). CSS `:root:active-view-transition-type(back)` swaps to reversed keyframes (new descends from above instead of rising), keeping the shared 600ms/circ.out. The `pageswap` tag (set on the outgoing page, registered well in advance) is what reliably drives it. No-ops where the Navigation API or cross-doc VT is unsupported. |
| **600ms settle** | Bumped from 560ms for a slightly more luxurious finish. |

### Reduced-motion handling

The existing `@media (prefers-reduced-motion: reduce) { @view-transition { navigation: none; } }`
rule at line 1149 disables cross-document View Transitions entirely for motion-sensitive users.
The new keyframes are only declared inside `prefers-reduced-motion: no-preference`, so there is
no redundant override needed.

## Easing reference (Semplice → native)

| Semplice uses | CSS equivalent | Where |
|---|---|---|
| `circ.out` | `cubic-bezier(0, .55, .45, 1)` | Content slide on page transition |
| `expo.inOut` | `cubic-bezier(.87, 0, .13, 1)` | Navbar slide in/out |
| `expo.out` | `cubic-bezier(.16, 1, .3, 1)` | Entrances |

Our `--ease-out-expo: cubic-bezier(0.2, 0.7, 0.2, 1)` is gentler than `expo.out` — good for
our enter animation (soft landing). For a sharper enter, swap to `cubic-bezier(.16,1,.3,1)`.

## What we deliberately did NOT replicate

| Feature | Reason |
|---|---|
| Navbar slides up/down during transition | Requires JS intercepting navigation clicks; adds complexity for marginal gain |
| Full content-area wipe (no overlap) | Sequential timing with 60ms delay achieves the same perception without JS |
| Video background hero | Heavy asset; our telemetry instrument is the signature element |
| `circ.out` specifically | `--ease-out-expo` is slightly gentler; matches the rest of the site's motion vocabulary |
