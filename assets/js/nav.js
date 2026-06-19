(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  function close() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }

  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  menu.addEventListener('click', function (e) { if (e.target.classList.contains('nav-link')) close(); });
})();

// Email obfuscation: reassemble address on click so it never appears in static HTML.
// Markup: <a data-user="local" data-domain="example.com">.
document.querySelectorAll('a[data-user][data-domain]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'mailto:' + a.dataset.user + '@' + a.dataset.domain;
  });
});
