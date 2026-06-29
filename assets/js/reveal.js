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

  // Defer one frame past first paint so the work-rows slide-in entrance actually plays on a cold
  // load / refresh / typed-URL arrival (revealing before paint makes them "pop in" fully formed -
  // the abrupt landing 13d7006 set out to fix). The in-site-nav case is handled SEPARATELY by a
  // synchronous inline reveal in _layouts/default.html: a cross-document View Transition snapshots
  // the incoming page before this deferred module runs (Safari captures it blank = the flash), so
  // the nav path must reveal pre-snapshot during parse, which a deferred module can't do. On a VT
  // nav the inline script has already set is-visible on in-view rows; this rAF re-adds it as a
  // harmless no-op. Off-screen rows still reveal on scroll via the observer above.
  requestAnimationFrame(() => requestAnimationFrame(revealInView));
}
