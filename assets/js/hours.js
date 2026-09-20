/**
 * Opening-hours status pill, "today" row highlight, and footer year.
 *
 * Time is read via Intl in the Europe/London timezone rather than the
 * visitor's local clock, so the restaurant reads correctly as open/closed
 * for someone browsing from anywhere, and DST is handled for free.
 */
'use strict';

(function(){
  /** @returns {{day: number, minutes: number}} day: 0=Sun..6=Sat; minutes: minutes since local midnight, Europe/London. */
  function londonNow(){
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone:'Europe/London', weekday:'short', hour:'2-digit', minute:'2-digit', hour12:false
    }).formatToParts(new Date());
    const map = {}; parts.forEach(function(p){ map[p.type] = p.value; });
    const dayIndex = {Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[map.weekday];
    return { day: dayIndex, minutes: parseInt(map.hour,10)*60 + parseInt(map.minute,10) };
  }

  const now = londonNow();
  const OPEN_FROM = 12 * 60;   // 12:00
  const OPEN_TO = 20 * 60;     // 20:00
  const CLOSED_DAY = 2;        // Tuesday
  const isTuesday = now.day === CLOSED_DAY;
  const withinHours = now.minutes >= OPEN_FROM && now.minutes < OPEN_TO;
  const isOpen = !isTuesday && withinHours;

  const pill = document.getElementById('statusPill');
  const text = document.getElementById('statusText');
  if (pill && text){
    pill.classList.add(isOpen ? 'open' : 'closed');
    if (isOpen){
      text.textContent = 'Open now · until 8:00pm';
    } else if (isTuesday){
      text.textContent = 'Closed today · back tomorrow at noon';
    } else if (now.minutes < OPEN_FROM){
      text.textContent = 'Opens today at 12:00pm';
    } else {
      text.textContent = 'Closed now · opens tomorrow at noon';
    }
  }

  const rows = document.querySelectorAll('#hoursTable tr[data-day]');
  rows.forEach(function(row){
    if (parseInt(row.getAttribute('data-day'),10) === now.day) row.classList.add('today');
  });

  const yearEl = document.getElementById('footerYear');
  if (yearEl){
    const y = new Date().getFullYear();
    yearEl.textContent = '© ' + y + ' Ragù Italian Bistro, Preston.';
  }
})();
