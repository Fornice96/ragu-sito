/**
 * Gentle reveal-on-scroll for section intros. Elements carrying the
 * `.reveal` class fade and slide into place the first time they cross
 * into view, then stop being observed — the effect runs once per element,
 * not on every scroll past it.
 *
 * Respects the visitor's OS-level "reduce motion" preference, and
 * degrades to "just show everything" if IntersectionObserver isn't
 * available at all. The matching CSS lives in styles.css under
 * "16. Reveal-on-scroll animation" — it only takes effect once this
 * script adds .js-reveal-ready to <html>, so a page with JS disabled
 * never hides this content in the first place.
 */
'use strict';

(function(){
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)){
    targets.forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }

  document.documentElement.classList.add('js-reveal-ready');

  const OBSERVER_OPTIONS = {
    threshold: 0.15,        // fire once 15% of the element is visible
    rootMargin: '0px 0px -8% 0px', // trigger a touch before it reaches the very bottom edge
  };

  const io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, OBSERVER_OPTIONS);

  targets.forEach(function(el){ io.observe(el); });
})();
