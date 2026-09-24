# Riferimento SEO — problemi noti (da non reintrodurre) e punti ancora aperti

Condensato dei due audit SEO fatti finora (22 e 23 settembre 2026, punteggio 62/100 poi 67/100). Il report completo di ciascuno resta nel Project "Ragu Italian Bistrot" su claude.ai (`claude/seo-audit-settembre-2026.md`) — qui solo l'essenziale per non perdere il filo lavorando da questo repository.

## Già risolto — attenzione a non reintrodurlo per sbaglio
- Il dominio corretto è `ragu-italian-bistrot.netlify.app` (non il vecchio `dashing-dolphin-1b1c28.netlify.app`, morto) — controllare sempre og:url, og:image, twitter:image, `url`/`image` nello schema.org, sitemap.xml, robots.txt se si tocca uno di questi.
- `<link rel="canonical">` deve restare su `index.html` e `privacy.html`.
- Grafia del brand: **sempre "Bistro"**, mai "Bistrot" (decisione di Ciro, 23/09/2026) — vale per testo, meta tag, futuri contenuti. Il dominio netlify.app resta "bistrot" per ora (non cambiarlo da solo), ma un futuro dominio proprio va scelto con "bistro".
- Schema.org Restaurant: `acceptsReservations` è un booleano (`true`), non una stringa `"True"`. Presenti anche `@id`, `logo`, `foundingDate`, `hasMenu` (PDF + riferimento al blocco `Menu` con gli 8 piatti in HTML), `geo`, `sameAs`.
- `sitemap.xml` non deve contenere pagine con `noindex` (es. non rimettere `privacy.html` in sitemap).
- `_redirects` gestisce `/privacy` → `/privacy.html` (301) — non serve altro redirect per quello.
- Header di sicurezza in `_headers`: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS (`Strict-Transport-Security`) — presenti su tutti e 4 i blocchi (`/`, `/index.html`, `/privacy.html`, `/assets/*`), non solo su uno.
- Nessun file generato da macOS (`.DS_Store`) va committato — c'è un `.gitignore` apposta.
- `privacy.html` non ha più CSS/JS inline: ora carica `assets/css/styles.css` (sezione 17, "Privacy policy page") e `assets/js/cookie-consent.js`, come le altre pagine. Di conseguenza `_headers` applica la stessa CSP stretta di `index.html` anche a `/privacy.html` (24/09/2026, fix in locale, in attesa di push).

## Ancora aperto — azioni esterne (non risolvibili da codice)
- Google Business Profile non ancora confermata/collegata — il fattore singolo più pesante per il local ranking.
- Zero recensioni visibili ovunque (sito, GBP, directory) — serve un processo di raccolta (QR code, richiesta post-visita).
- Nessun dominio personalizzato — il sito gira su un sottodominio netlify.app gratuito.
- Il sito non compare nella propria ricerca brand-name (battuto da stampa/social) — conseguenza diretta dei tre punti sopra.
- Nessun backlink dall'articolo del Lancashire Post — da richiedere.
- Badge di attribuzione Netlify — si disattiva solo dalla dashboard Netlify (Site configuration → General), non da codice.

## Ancora aperto — serve info vera da Vincenzo (non inventare)
- Credenziali/background dei due chef (formazione, esperienza) per rafforzare l'E-E-A-T.
- Contenuto FAQ pre-visita: parcheggio, accessibilità, policy di prenotazione, gruppi/eventi privati.
- Un vero sistema di prenotazione online (oggi solo telefono in orario di apertura).
- Forma societaria/stato IVA (vedi `docs/normative-uk.md`).

## Ancora aperto — accessibilità, interventi di codice piccoli e a basso rischio
- Il menu mobile (`assets/js/nav.js`), aperto da tastiera, non sposta il focus dentro il pannello e non lo riporta sul pulsante hamburger alla chiusura (niente focus trap) — problema reale per chi naviga senza mouse, non solo teorico.
- Manca un link "skip to content" a inizio pagina per chi usa tastiera o screen reader e vuole saltare la navigazione.
- Individuati durante la revisione del 24/09/2026, non ancora presenti nei due audit SEO precedenti.

## Ancora aperto — lavoro di contenuto/codice, ma più corposo
- Pubblicare i 4 menù PDF come HTML completo (il clone Word editabile è già pronto, vedi Project) — include il menù bambini, che nel PDF originale non ha quasi testo estraibile.
- Date e citazioni dirette dagli articoli di stampa nella sezione Press.
- Blocco FAQ risposta-diretta (5-6 domande tipo "A che ora apre Ragù Preston stasera?").
- Lavorare la frase di ricerca locale principale ("Italian restaurant" + nome del locale) in title e H1 (oggi solo nel footer).
- Cambiare `sameAs` da Messenger a una vera Facebook Page, quando esiste.
- Immagini ancora in JPEG classico, nessun WebP/AVIF né srcset responsive — 96% del peso pagina, causa diretta di un LCP mobile di 5.0s (soglia: 2.5s). Cache immagini a 1 ora invece di long-lived.
- CSS che blocca il first paint + catena di 9 font woff2 (Poppins in 8 pesi + Baloo 2) caricati in parallelo, nessun `<link rel="preload">` sui pesi critici.
- 4 PDF dei menù pesanti (816KB–1.9MB l'uno) — da valutare una compressione, con attenzione a non perdere leggibilità.
