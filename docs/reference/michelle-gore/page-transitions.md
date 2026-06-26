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

The effect is an **opaque pull-down**: both pages stay fully solid and slide as one
continuous downward motion — the old page exits out the bottom while the new page
enters from directly above, like scrolling up to a page stacked overhead. **No
crossfade.** Live frame-by-frame capture of michellegore.com confirmed her pages
never ghost over each other; each frame is crisp and opaque, which is why the new
page reads as "everything at once" the instant it lands.

```css
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root) {
    animation: vt-page-exit 560ms cubic-bezier(0, 0.55, 0.45, 1) both;
    z-index: 1;
  }
  ::view-transition-new(root) {
    animation: vt-page-enter 560ms cubic-bezier(0, 0.55, 0.45, 1) both;
    z-index: 2;          /* new on top → clean descending seam */
  }
}

@keyframes vt-page-exit  { to   { transform: translateY(100%); } }  /* old exits bottom */
@keyframes vt-page-enter { from { transform: translateY(-100%); } } /* new enters from above */
```

### Why the seam stays glued (the math)

The two sheets must move in perfect lockstep or the join between them tears. At
animation progress `p` (0→1), with the snapshot box = one viewport tall:

- new occupies `[(p−1)·100vh, p·100vh]` → its bottom edge sits at `y = p·vh`
- old occupies `[p·100vh, (p+1)·100vh]` → its top edge sits at `y = p·vh`

They share the boundary `y = p·vh` exactly — new above it, old below it, zero overlap.
The viewport shows new filling from the top down while old is pushed out the bottom.
This only holds if **duration, easing, and delay are identical on both** — any
mismatch opens a gap or an overlap at the seam.

### Design decisions

| Decision | Rationale |
|---|---|
| **Both pages opaque** | The defining difference from a crossfade. You never see two ghosted layers; the new page is solid the whole way down → "everything appears at once." |
| **Lockstep (identical 560ms + circ.out, no delay)** | Keeps the seam between the two sheets perfectly aligned. Asymmetric timing tore the join. |
| **old → +100%, new → −100%** | One continuous downward travel; reads as scrolling to a page stacked above, not a swap. |
| **new on top (z-index 2)** | The descending edge is the new page's, so the seam is clean and the new page is what you watch arrive. |
| **`circ.out` (`0,.55,.45,1`)** | Semplice's content-slide easing — fast start, soft landing. |
| **`vt-phu` name morph removed** | A `view-transition-name` lifts that element out of the root snapshot and tweens it separately, tearing a hole in the cohesive slide. Dropped so the name slides with the page. `vt-{{ slug }}` (card→project image morph) is left in place — verified the full-page slide does not fight it on project nav. |

### Polish layered on top (closer to Semplice's feel)

| Enhancement | How |
|---|---|
| **Persistent header** | `.site-header { view-transition-name: vt-header; }` lifts the wordmark + nav into their own group so they stay pinned while content slides underneath — the app-shell feel. Only the active-nav underline differs page-to-page, so it cross-fades cleanly inside the group. |
| **Leading-edge shadow** | `box-shadow: 0 10px 30px rgba(0,0,0,.55)` on `::view-transition-new(root)`. The `+10px` y-offset means only the bottom edge's shadow shows, and only while sliding (at rest that edge is off-screen) — so the descending page reads as a physical sheet, with zero shadow once settled. |
| **Directional forward/back** | `assets/js/transition-direction.js` tags each transition `forward`/`back` (via `pageswap` + `pagereveal`, reading `navigation.activation` history indices). CSS `:root:active-view-transition-type(back)` swaps to reversed keyframes (old exits up, new rises from below), keeping the shared 600ms/circ.out. No-ops where the Navigation API or cross-doc VT is unsupported. |
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
