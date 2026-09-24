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

## Ancora aperto — lavoro di contenuto/codice, ma più corposo
- Pubblicare i 4 menù PDF come HTML completo (il clone Word editabile è già pronto, vedi Project) — include il menù bambini, che nel PDF originale non ha quasi testo estraibile.
- Date e citazioni dirette dagli articoli di stampa nella sezione Press.
- Blocco FAQ risposta-diretta (5-6 domande tipo "A che ora apre Ragù Preston stasera?").
- Lavorare la frase di ricerca locale principale ("Italian restaurant" + nome del locale) in title e H1 (oggi solo nel footer).
- Cambiare `sameAs` da Messenger a una vera Facebook Page, quando esiste.
- Immagini ancora in JPEG classico, nessun WebP/AVIF né srcset responsive — 96% del peso pagina, causa diretta di un LCP mobile di 5.0s (soglia: 2.5s). Cache immagini a 1 ora invece di long-lived.
- CSS che blocca il first paint + catena di 5 font Poppins caricati in serie.
- `privacy.html` ha ancora CSS/JS inline (viola la regola di questo repository di codice sempre esterno) → per questo non ha la CSP stretta; da rifattorizzare per allinearla al resto del sito.
