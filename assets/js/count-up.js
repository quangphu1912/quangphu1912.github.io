// Count-up: animate any [data-countup] element from 0 to its target exactly
// once, on scroll-into-view, on the site's --ease-out-expo curve.
// Progressive enhancement - with JS off or prefers-reduced-motion, the truthful
// static values remain (prefix/suffix text lives outside the [data-countup] span).
const els = document.querySelectorAll('[data-countup]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (els.length && !reduce && 'IntersectionObserver' in window && 'requestAnimationFrame' in window) {
  // cubic-bezier(0.2, 0.7, 0.2, 1) - matches --ease-out-expo
  const bezier = (x1, y1, x2, y2) => {
    const A = (a, b) => 1 - 3 * b + 3 * a;
    const B = (a, b) => 3 * b - 6 * a;
    const C = (a) => 3 * a;
    const calc = (t, a, b) => ((A(a, b) * t + B(a, b)) * t + C(a)) * t;
    const slope = (t, a, b) => 3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a);
    return (x) => {
      let t = x;
      for (let i = 0; i < 5; i++) {
        const s = slope(t, x1, x2);
        if (!s) break;
        t -= (calc(t, x1, x2) - x) / s;
      }
      return calc(t, y1, y2);
    };
  };
  const ease = bezier(0.2, 0.7, 0.2, 1);

  const fmt = (n, d) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

  const run = (el) => {
    const target = parseFloat(el.getAttribute('data-countup'));
    const d = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const dur = 1400;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = fmt(target * ease(p), d);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target, d); // settle on exact truth
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.6 });

  els.forEach((el) => { el.textContent = '0'; io.observe(el); });
}
