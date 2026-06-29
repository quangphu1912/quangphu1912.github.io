// Top loading bar (michellegore.com style).
//
// A thin accent bar pinned to the very top of the viewport eases left -> right as a page
// arrives, then fades out. It's the page-change "highlight" that replaced the old blue seam
// glow on the rising page (see assets/css/main.css, VIEW TRANSITIONS). Tuned to read like
// michellegore.com's bar: slow and smooth, a deliberate "loading" beat rather than a snap.
//
// One sweep per arrival, whatever fires. Browsers differ on which lifecycle events fire for a
// navigation: some emit `pagereveal` (with a viewTransition) AND `pageshow`, some only `pageshow`.
// A `swept` latch checked at fire time means the first event to land sweeps and any later one is a
// no-op - so the bar never runs twice. We never touch viewTransition.finished, so a skipped or
// interrupted transition can't surface an AbortError.
//
// Timing: when `pagereveal` is available the fill starts there, overlapping the ~600ms page-rise
// (cross-document View Transitions are snapshot-based - the live bar is hidden behind the overlay
// while the rise plays, so it's partway done when the overlay clears, then finishes in view).
// Otherwise it starts on `pageshow` after first paint. Cold load / refresh / bfcache restore glide
// the same way.
//
// Progressive enhancement + accessibility: no bar element, or prefers-reduced-motion, leaves this a
// no-op (the bar is also display:none under reduced motion), so navigation still works without it.

const bar = document.querySelector('.page-progress');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (bar && !reduce) {
  // Fill from empty: clear prior state, force a reflow so the scaleX(0) start is applied, then add
  // .is-active to transition scaleX(0) -> scaleX(1). Fade out once the fill (transform) completes.
  const sweep = () => {
    bar.classList.remove('is-active', 'is-done');
    void bar.offsetWidth;
    bar.classList.add('is-active');
  };
  bar.addEventListener('transitionend', (event) => {
    if (event.propertyName === 'transform') bar.classList.add('is-done');
  });

  // Sweep exactly once per page arrival, no matter how many lifecycle events fire.
  let swept = false;
  const sweepOnce = () => {
    if (swept) return;
    swept = true;
    sweep();
  };

  // Prefer pagereveal (overlaps the page-rise) when the browser fires it for a real transition;
  // pageshow covers everything else (cold load, refresh, bfcache, browsers without pagereveal).
  window.addEventListener('pagereveal', (event) => {
    if (event.viewTransition) sweepOnce();
  });
  window.addEventListener('pageshow', () => {
    requestAnimationFrame(sweepOnce);
  });
}
