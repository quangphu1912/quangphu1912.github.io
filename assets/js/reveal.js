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
    // Already in the viewport at load — whether a cold load or arriving via a page
    // transition? Reveal it immediately so it's fully present as the page appears,
    // instead of fading in a beat late underneath the slide. This runs before first
    // paint (deferred module), so no transition plays. Off-screen elements still reveal
    // on scroll via the observer above. (Synchronous on purpose: a 'pagereveal' listener
    // would register too late to catch the incoming page's own reveal.)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('is-visible');
  });
}
