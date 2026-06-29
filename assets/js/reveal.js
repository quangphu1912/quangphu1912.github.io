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

  // Reveal in-view content on the next frame AFTER first paint, on EVERY arrival - cold load,
  // refresh, and in-site nav alike. Deferring past the first paint is what lets the entrance
  // transition play (the work-rows slide-in); revealing before paint is what made the cards pop
  // in fully formed - the "abrupt" landing on a refresh. This is deliberately deterministic: it
  // does NOT special-case View Transitions / pagereveal (their firing is inconsistent across
  // browsers), so the cards always animate in and a refresh is never abrupt. The double rAF
  // guarantees we're a frame past first paint before the class flips.
  requestAnimationFrame(() => requestAnimationFrame(revealInView));
}
