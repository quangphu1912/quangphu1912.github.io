(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  // The header holds the toggle + links; everything else (skip-link, main,
  // footer) is background that should be unreachable while the drawer is open.
  var header = toggle.closest('header');
  var backdrop = header
    ? Array.prototype.filter.call(header.parentElement.children, function (c) { return c !== header; })
    : [];
  var desktop = window.matchMedia('(min-width: 768px)');

  function isOpen() { return menu.classList.contains('open'); }

  function open() {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.setAttribute('data-nav-open', '');
    // `inert` traps Tab within the header and hides the rest from AT in one go.
    backdrop.forEach(function (el) { el.setAttribute('inert', ''); });
    var firstLink = menu.querySelector('.nav-link');
    if (firstLink) firstLink.focus();
  }
  function close(returnFocus) {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.removeAttribute('data-nav-open');
    backdrop.forEach(function (el) { el.removeAttribute('inert'); });
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (isOpen()) close(false); else open();
  });
  // Esc dismisses and returns focus so keyboard users aren't stranded.
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) close(true); });
  // Clicking a link navigates; clear drawer state regardless.
  menu.addEventListener('click', function (e) { if (e.target.closest('.nav-link')) close(false); });
  // Clicking outside the drawer (e.g. the header logo / padding) dismisses it.
  document.addEventListener('click', function (e) {
    if (isOpen() && !menu.contains(e.target) && !toggle.contains(e.target)) close(false);
  });
  // Growing past the mobile breakpoint must never leave the page inert.
  desktop.addEventListener('change', function (e) { if (e.matches && isOpen()) close(false); });
})();

// Transparent header over a full-bleed cover (home hero / project cover): the bar floats
// chrome-less over the dark cover, then swaps to the solid frosted bar once the cover scrolls
// past. michellegore.com's transparent-nav-over-hero pattern, via IntersectionObserver.
(function () {
  var header = document.querySelector('.site-header');
  var cover = document.querySelector('.hero-home, .project-cover');
  if (!header || !cover || !('IntersectionObserver' in window)) return;

  function apply(over) { header.classList.toggle('is-over-cover', over); }

  // Set the initial state before first paint to avoid a solid-bar flash over the cover.
  apply(cover.getBoundingClientRect().bottom > header.offsetHeight);

  // Shrinking the IO root by the header height flips the class exactly when the cover's bottom
  // edge passes beneath the bar (cover under header -> transparent; scrolled past -> solid).
  var io = new IntersectionObserver(function (entries) {
    apply(entries[0].isIntersecting);
  }, { rootMargin: '-' + header.offsetHeight + 'px 0px 0px 0px', threshold: 0 });
  io.observe(cover);
})();

// Email obfuscation: reassemble address on click so it never appears in static HTML.
// Markup: <a data-user="local" data-domain="example.com">.
document.querySelectorAll('a[data-user][data-domain]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'mailto:' + a.dataset.user + '@' + a.dataset.domain;
  });
});
