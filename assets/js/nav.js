/**
 * Mobile navigation: opens/closes the full-screen menu panel from the
 * hamburger button, and closes it again on a link click, Escape, or the
 * dedicated close button.
 */
'use strict';

(function(){
  const toggle = document.getElementById('navToggle');
  const closeBtn = document.getElementById('navClose');
  const panel = document.getElementById('mobileNav');
  if (!toggle || !closeBtn || !panel) return;

  function openNav(){
    panel.hidden = false;
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeNav(){
    panel.hidden = true;
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  panel.querySelectorAll('nav a').forEach(function(a){
    a.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && !panel.hidden) closeNav();
  });
})();
