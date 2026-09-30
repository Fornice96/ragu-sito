/**
 * Photo gallery that scrolls slowly on its own but can also be moved by
 * hand: swipe on a phone, trackpad/scrollbar or the ‹ › buttons on a
 * computer. The photos are cloned once (hidden from screen readers and
 * keyboard) so the strip loops with no end; after the visitor touches it,
 * the automatic movement waits a moment and then picks up again.
 *
 * With the OS-level "reduce motion" preference the strip never moves on
 * its own — swiping and the buttons still work.
 */
(function(){
  const strip = document.querySelector('.gallery-strip');
  if (!strip) return;
  const track = strip.querySelector('.gallery-track');

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SPEED = reduceMotion ? 0 : 30; // px per second
  const RESUME_AFTER = 2500;           // ms of calm before auto-scroll restarts

  const originals = Array.from(track.children);
  originals.forEach(function(link){
    const clone = link.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('tabindex', '-1');
    track.appendChild(clone);
  });

  // distance from a photo to its clone: scrolling by this much looks identical
  // (re-read every frame: follows resizes and late-loading photos for free)
  let half = 0;

  let pos = 0;          // where we want the strip, kept as a float for smooth slow motion
  let lastSet = 0;      // scrollLeft as the browser rounded it after our last write
  let target = null;    // set by the buttons, eased towards in the loop
  let hovering = false;
  let userUntil = 0;    // timestamp until which the visitor is in control

  function userActive(){ return performance.now() < userUntil; }
  function holdForUser(){ userUntil = performance.now() + RESUME_AFTER; }

  // Swipe / trackpad / scrollbar: any scroll we didn't cause belongs to the visitor.
  strip.addEventListener('scroll', function(){
    if (Math.abs(strip.scrollLeft - lastSet) > 1){
      pos = strip.scrollLeft;
      target = null;
      holdForUser();
    }
  }, {passive:true});
  ['touchstart', 'wheel', 'pointerdown'].forEach(function(type){
    strip.addEventListener(type, holdForUser, {passive:true});
  });
  // pause under a real mouse only (touch screens fire enter without leave)
  strip.addEventListener('pointerenter', function(e){ if (e.pointerType === 'mouse') hovering = true; });
  strip.addEventListener('pointerleave', function(){ hovering = false; });
  strip.addEventListener('focusin', holdForUser);

  document.querySelectorAll('.gallery-btn').forEach(function(btn){
    btn.hidden = false;
    btn.addEventListener('click', function(){
      const step = strip.clientWidth * 0.8 * (btn.dataset.dir === 'prev' ? -1 : 1);
      target = (target === null ? pos : target) + step;
      holdForUser();
    });
  });

  let last = performance.now();
  function frame(now){
    const dt = Math.min(now - last, 100) / 1000;
    last = now;
    const busy = userActive();
    half = track.children[originals.length].offsetLeft - track.children[0].offsetLeft;

    if (target !== null){
      pos += (target - pos) * 0.15;
      if (Math.abs(target - pos) < 0.5){ pos = target; target = null; }
    } else if (!busy && !hovering){
      pos += SPEED * dt;
    }

    // Loop: jump by one set when running off either end. While the visitor
    // is swiping, only do it at the very edges so momentum isn't cut short.
    const max = strip.scrollWidth - strip.clientWidth;
    let shift = 0;
    if (half > 0 && (!busy || target !== null || pos < 1 || pos > max - 1)){
      if (pos >= half) shift = -half;
      else if (pos < 1) shift = half;
      pos += shift;
      if (target !== null) target += shift;
    }
    const wrapped = shift !== 0;

    // while the visitor swipes, leave scrollLeft to the browser unless we had to wrap
    if (!busy || target !== null || wrapped) strip.scrollLeft = pos;
    lastSet = strip.scrollLeft;
    requestAnimationFrame(frame);
  }
  strip.classList.add('is-moving');
  requestAnimationFrame(frame);
})();
