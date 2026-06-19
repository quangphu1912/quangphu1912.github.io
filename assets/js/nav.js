(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  function open() {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    var firstLink = menu.querySelector('.nav-link');
    if (firstLink) firstLink.focus();
  }
  function close(returnFocus) {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (menu.classList.contains('open')) close(false); else open();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) close(true); });
  menu.addEventListener('click', function (e) { if (e.target.classList.contains('nav-link')) close(false); });
})();

// Email obfuscation: reassemble address on click so it never appears in static HTML.
// Markup: <a data-user="local" data-domain="example.com">.
document.querySelectorAll('a[data-user][data-domain]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'mailto:' + a.dataset.user + '@' + a.dataset.domain;
  });
});
