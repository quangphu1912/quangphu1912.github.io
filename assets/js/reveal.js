// Scroll-reveal via IntersectionObserver.
// Reduced motion, or no IntersectionObserver support, reveals everything
// immediately, so content is always visible without motion.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const els = document.querySelectorAll('[data-reveal]');

if (reduce || !('IntersectionObserver' in window)) {
  els.forEach((el) => el.classList.add('is-visible'));
} else {
  // Project rows (.work-rows) re-trigger their slide-in on every entry, so the
  // effect plays whether you scroll down OR back up. Everything else reveals once.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const repeat = entry.target.closest?.('.work-rows');
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (!repeat) io.unobserve(entry.target);
      } else if (repeat) {
        entry.target.classList.remove('is-visible');
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  els.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 60}ms`;
    io.observe(el);
  });

  // Reveal everything already in the viewport at load. Off-screen elements still reveal on
  // scroll via the observer above.
  const revealInView = () => {
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('is-visible');
    });
  };

  // WHEN in-view content reveals depends on HOW we arrived, because clicking an in-site link runs a
  // cross-document View Transition that snapshots the incoming page and animates it rising up:
  //
  //   - In-site nav / back-forward (a VT is rising the page): reveal SYNCHRONOUSLY now - at module
  //     eval, before first paint, so before the VT snapshot is captured. The content is solid in the
  //     snapshot and rises WITH the page. Setting is-visible before first paint plays no transition,
  //     so the work-rows image+text ride up with the page instead of sliding in separately a beat
  //     LATER (which left them at opacity 0 in the snapshot = the Safari flash, then a slide, then a
  //     snapshot->live jump). We deliberately do NOT use the pagereveal/event.viewTransition hook:
  //     Safari runs the CSS rise but leaves that JS handle null, so the hook is unreliable there. We
  //     infer the transition from the navigation type + a same-origin referrer, which both browsers
  //     report consistently.
  //   - Refresh, or a cold / typed-URL / external arrival (no VT): defer one frame past first paint
  //     so the work-rows slide-in entrance actually plays. Revealing before paint here is what made
  //     a refresh "pop in" fully formed - the abrupt landing 13d7006 set out to fix.
  const nav = performance.getEntriesByType('navigation')[0];
  const arrivingViaTransition =
    (nav?.type === 'navigate' && document.referrer.startsWith(`${location.origin}/`)) ||
    nav?.type === 'back_forward';

  if (arrivingViaTransition) {
    revealInView();
  } else {
    requestAnimationFrame(() => requestAnimationFrame(revealInView));
  }
}
