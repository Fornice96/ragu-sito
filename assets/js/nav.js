/**
 * Mobile navigation: opens/closes the full-screen menu panel from the
 * hamburger button, and closes it again on a link click, Escape, or the
 * dedicated close button.
 *
 * Keyboard users get the same experience as a mouse user: opening the panel
 * moves focus inside it and traps Tab/Shift+Tab within its focusable
 * elements, closing it returns focus to the hamburger button that opened it.
 */
'use strict';

(function(){
  const toggle = document.getElementById('navToggle');
  const closeBtn = document.getElementById('navClose');
  const panel = document.getElementById('mobileNav');
  if (!toggle || !closeBtn || !panel) return;

  const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

  function trapFocus(e){
    if (e.key !== 'Tab') return;
    const focusable = Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first){
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last){
      e.preventDefault();
      first.focus();
    }
  }

  function openNav(){
    panel.hidden = false;
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
    panel.addEventListener('keydown', trapFocus);
  }
  function closeNav(){
    panel.hidden = true;
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
    panel.removeEventListener('keydown', trapFocus);
    toggle.focus();
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
