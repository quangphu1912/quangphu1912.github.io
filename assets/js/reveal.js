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

  // A cross-document View Transition (clicking a nav link, not a reload) captures a snapshot of
  // the INCOMING page and animates it rising into place. `pagereveal` fires before that snapshot
  // is taken - and before the new document's first render - in every browser that runs the
  // transition (Chrome + Safari 18.2+). Reveal in-view content synchronously here so it's captured
  // VISIBLE and rises WITH the page, instead of an empty snapshot that fills in a beat AFTER the
  // rise lands (the Safari flash - Chrome happened to tolerate the deferred-reveal timing, Safari
  // didn't). Running before first render means no half-played opacity transition leaks into the
  // snapshot. transition-direction.js already listens to pagereveal the same way.
  window.addEventListener('pagereveal', (event) => {
    if (event.viewTransition) revealInView();
  });

  // Cold load / refresh / bfcache restore (no View Transition, so pagereveal either doesn't fire
  // or carries no viewTransition): reveal one frame AFTER first paint so the entrance transition
  // plays (the work-rows slide-in). Revealing before paint is what made the cards pop in fully
  // formed - the "abrupt" landing on a refresh. The double rAF guarantees we're a frame past first
  // paint before the class flips. On a VT nav this still runs but only re-adds is-visible (no-op).
  requestAnimationFrame(() => requestAnimationFrame(revealInView));
}
