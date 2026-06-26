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

### Implemented in `assets/css/main.css` (MOTION CRAFT section, after line ~1153)

```css
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root) {
    animation: vt-page-exit 260ms ease-in both;
  }
  ::view-transition-new(root) {
    animation: vt-page-enter 380ms var(--ease-out-expo) 60ms both;
  }
}

@keyframes vt-page-exit {
  to { opacity: 0; transform: translateX(-32px) scale(0.99); }
}

@keyframes vt-page-enter {
  from { opacity: 0; transform: translateX(48px); }
}
```

### Design decisions

| Decision | Rationale |
|---|---|
| **60ms delay on enter** | Exit starts first; creates the sequential "turn" feel, not a crossfade |
| **Exit 260ms, enter 380ms** | Exit is faster (sharper, like pushing a page aside); enter is slower (settling) |
| **translateX -32px / +48px** | Shallow offsets — subtle directional cue, not a full-slide. Avoids fighting the image morph on card → project navigation |
| **scale(0.99) on exit** | Almost imperceptible shrink adds depth — old page recedes, new page arrives |
| **`ease-in` exit, `--ease-out-expo` enter** | Exit accelerates away; enter decelerates to rest. Matches physical page-turn kinematics |
| **Named elements unaffected** | `vt-phu` and `vt-{{ slug }}` image morphs run in their own layer; root slide doesn't touch them |

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
