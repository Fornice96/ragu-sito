/**
 * Click-to-load Google map. The iframe isn't in the page until the visitor
 * clicks "Show the map", because Google Maps can set its own cookies and
 * UK rules (PECR) want consent before that. The "Open in Google Maps" link
 * next to it works without loading anything.
 */
(function(){
  const box = document.getElementById('mapEmbed');
  const btn = document.getElementById('mapLoad');
  if (!box || !btn) return;

  btn.addEventListener('click', function(){
    const frame = document.createElement('iframe');
    frame.src = box.dataset.src;
    frame.title = 'Map showing Ragù Italian Bistro at 5–7 Guildhall Street, Preston';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    box.replaceChildren(frame);
    frame.focus();
  });
})();
