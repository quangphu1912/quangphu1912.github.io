// Mobile nav drawer + email obfuscation. Progressive enhancement.
// ES module: top-level code runs once, after the DOM is parsed (modules defer).

const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');

if (toggle && menu) {
  // The header holds the toggle + links; everything else (skip-link, main,
  // footer) is background that should be unreachable while the drawer is open.
  const header = toggle.closest('header');
  const backdrop = header
    ? Array.from(header.parentElement.children).filter((c) => c !== header)
    : [];
  const desktop = window.matchMedia('(min-width: 768px)');

  const isOpen = () => menu.classList.contains('open');

  const open = () => {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.setAttribute('data-nav-open', '');
    // `inert` traps Tab within the header and hides the rest from AT in one go.
    backdrop.forEach((el) => el.setAttribute('inert', ''));
    const firstLink = menu.querySelector('.nav-link');
    if (firstLink) firstLink.focus();
  };

  const close = (returnFocus) => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.removeAttribute('data-nav-open');
    backdrop.forEach((el) => el.removeAttribute('inert'));
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    if (isOpen()) close(false);
    else open();
  });
  // Esc dismisses and returns focus so keyboard users aren't stranded.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close(true);
  });
  // Clicking a link navigates; clear drawer state regardless.
  menu.addEventListener('click', (e) => {
    if (e.target.closest('.nav-link')) close(false);
  });
  // Clicking outside the drawer (e.g. the header logo / padding) dismisses it.
  document.addEventListener('click', (e) => {
    if (isOpen() && !menu.contains(e.target) && !toggle.contains(e.target)) close(false);
  });
  // Growing past the mobile breakpoint must never leave the page inert.
  desktop.addEventListener('change', (e) => {
    if (e.matches && isOpen()) close(false);
  });
}

// Email obfuscation: reassemble the address on click so it never appears in
// static HTML. Markup: <a data-user="local" data-domain="example.com">.
document.querySelectorAll('a[data-user][data-domain]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `mailto:${a.dataset.user}@${a.dataset.domain}`;
  });
});
