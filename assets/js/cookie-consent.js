/**
 * Cookie notice bar.
 *
 * ANALYTICS_ENABLED: leave this false until Google Analytics (or any other
 * non-essential tracker) is actually added to the site. Today the site sets
 * no cookies of its own, so a consent banner isn't legally required yet —
 * the bar is just an honest heads-up with a link to the Privacy Policy,
 * dismissed with a single acknowledgement button.
 *
 * When Google Analytics is ready to go live:
 *   1. Set ANALYTICS_ENABLED = true below.
 *   2. Replace the single "Got it" button in the #cookieBar markup with
 *      two real buttons — Accept / Reject — wired to
 *      grantAnalyticsConsent() / declineAnalyticsConsent() (both stay on
 *      window so they can be called directly from onclick attributes).
 *   3. Load the Google Analytics snippet ONLY from inside
 *      grantAnalyticsConsent() (and again on future visits if consent was
 *      already stored as "granted") — never load it unconditionally.
 */
'use strict';

const ANALYTICS_ENABLED = false;
const COOKIE_STORAGE_KEY = 'raguCookieNoticeSeen';

function grantAnalyticsConsent(){
  try { localStorage.setItem(COOKIE_STORAGE_KEY, 'granted'); } catch (e) {}
  const bar = document.getElementById('cookieBar');
  if (bar) bar.hidden = true;
  // Placeholder for later: inject the Google Analytics <script> tag here
  // once ANALYTICS_ENABLED is true. Nothing loads today.
}

function declineAnalyticsConsent(){
  try { localStorage.setItem(COOKIE_STORAGE_KEY, 'declined'); } catch (e) {}
  const bar = document.getElementById('cookieBar');
  if (bar) bar.hidden = true;
}

(function(){
  const bar = document.getElementById('cookieBar');
  const okBtn = document.getElementById('cookieOk');
  if (!bar || !okBtn) return;

  try {
    if (!localStorage.getItem(COOKIE_STORAGE_KEY)) bar.hidden = false;
  } catch (e) {
    bar.hidden = false;
  }

  okBtn.addEventListener('click', function(){
    bar.hidden = true;
    try { localStorage.setItem(COOKIE_STORAGE_KEY, 'acknowledged'); } catch (e) {}
  });
})();
