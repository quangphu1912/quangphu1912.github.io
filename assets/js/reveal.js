// Scroll-reveal via IntersectionObserver.
// Early-returns to "show all" under prefers-reduced-motion OR no IntersectionObserver,
// so content is always visible without motion.
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll("[data-reveal]");

  // Reduced motion or unsupported → reveal everything immediately.
  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

  els.forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 60 + "ms";
    io.observe(el);
  });
})();
