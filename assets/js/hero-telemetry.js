// Hero telemetry: count the figures up exactly once, on the page's own easing curve.
// Degrades safely — with JS off or reduced motion, the truthful static values remain.
(function () {
  var els = document.querySelectorAll('.hero-telemetry [data-countup]');
  if (!els.length) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window) || !('requestAnimationFrame' in window)) return;

  // cubic-bezier(0.2, 0.7, 0.2, 1) — matches --ease-out-expo
  function bezier(x1, y1, x2, y2) {
    function A(a, b) { return 1 - 3 * b + 3 * a; }
    function B(a, b) { return 3 * b - 6 * a; }
    function C(a) { return 3 * a; }
    function calc(t, a, b) { return ((A(a, b) * t + B(a, b)) * t + C(a)) * t; }
    function slope(t, a, b) { return 3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a); }
    return function (x) {
      var t = x;
      for (var i = 0; i < 5; i++) { var s = slope(t, x1, x2); if (!s) break; t -= (calc(t, x1, x2) - x) / s; }
      return calc(t, y1, y2);
    };
  }
  var ease = bezier(0.2, 0.7, 0.2, 1);

  function fmt(n, d) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }

  function run(el) {
    var target = parseFloat(el.getAttribute('data-countup'));
    var d = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var dur = 1400, t0 = performance.now();
    (function tick(now) {
      var p = Math.min((now - t0) / dur, 1);
      el.textContent = fmt(target * ease(p), d);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target, d); // settle on exact truth
    })(t0);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.6 });

  els.forEach(function (el) { el.textContent = '0'; io.observe(el); });
})();
