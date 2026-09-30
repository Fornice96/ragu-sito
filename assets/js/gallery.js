/**
 * Makes the photo gallery scroll slowly on its own. The photos are cloned
 * once (hidden from screen readers and keyboard) so the CSS animation can
 * loop without a gap; hovering or focusing a photo pauses it.
 *
 * Respects the visitor's OS-level "reduce motion" preference: in that case
 * nothing is cloned and the gallery stays a row you can swipe by hand.
 */
(function(){
  const strip = document.querySelector('.gallery-strip');
  if (!strip) return;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const track = strip.querySelector('.gallery-track');
  Array.from(track.children).forEach(function(link){
    const clone = link.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('tabindex', '-1');
    track.appendChild(clone);
  });
  strip.classList.add('is-moving');
})();
