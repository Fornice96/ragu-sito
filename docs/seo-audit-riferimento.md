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
- `privacy.html` non ha più CSS/JS inline: ora carica `assets/css/styles.css` (sezione 17, "Privacy policy page") e `assets/js/cookie-consent.js`, come le altre pagine. Di conseguenza `_headers` applica la stessa CSP stretta di `index.html` anche a `/privacy.html` (24/09/2026).
- Verificato (24/09/2026): nessun crawler AI è bloccato da `robots.txt` (`User-agent: * / Allow: /` copre anche GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, ecc. — non serve aggiungere righe dedicate). Il sito è inoltre interamente statico e renderizzato lato server: nessun contenuto dipende da JavaScript per essere visibile ai crawler. Due punti di forza confermati, nessuna azione da fare.
- Le 7 foto usate in `index.html` hanno ora anche una versione WebP servita via `<picture>` (fallback JPEG automatico) — -21% di peso scaricato da un browser moderno. Manca ancora AVIF (nessun encoder disponibile in locale) e lo `srcset` responsive multi-risoluzione: miglioria ulteriore possibile, non urgente.
- Cache-Control su `/assets/*` alzata da 1 ora a 7 giorni (`stale-while-revalidate` 30 giorni).
- Preload dei due pesi Poppins più usati (400 e 600) in `index.html` per velocizzare la comparsa del testo. La catena di 9 file font resta invariata (ridurla richiederebbe eliminare pesi non usati o un font variabile — intervento più corposo, non fatto).
- Il menu mobile (`assets/js/nav.js`) ora sposta il focus al suo interno all'apertura (con focus trap su Tab/Shift+Tab) e lo riporta sul pulsante hamburger alla chiusura. Aggiunto anche un link "Skip to content" a inizio pagina.
- `llms.txt` riformattato secondo lo standard proposto (titolo, sommario, sezioni con link in formato markdown) — stessi dati di prima, solo formato corretto.
- I 4 PDF dei menù sono stati compressi con Ghostscript (`-dPDFSETTINGS=/screen`): da 4,5MB a ~620KB totali (-86%). Il testo dei piatti/prezzi è vettoriale e resta identico; a perdere un po' di nitidezza sono solo le foto/sfondo (200→72 PPI), verificato pagina per pagina che restino leggibili e presentabili.
- `sameAs` nello schema.org e i link "Facebook" (mobile nav, footer di `index.html` e `404.html`) ora puntano alla vera Pagina Facebook (`https://www.facebook.com/profile.php?id=61586330701725`, confermata da Ciro il 24/09/2026) invece che a Messenger. Il bottone "Message on Facebook" nella hero resta su `m.me`, corretto per quel caso d'uso. **Attenzione:** è ancora l'URL numerico di default (`profile.php?id=...`) — quando Vincenzo/Luca impostano uno username personalizzato su Facebook, va aggiornato in tutti e 4 i punti sopra.
- Il primo paragrafo di "Our story" ora apre con una frase autosufficiente e citabile (chi siamo, dove, cosa serviamo) prima di raccontare la storia dei due chef, per i motori di ricerca AI che privilegiano risposte dirette nel primo 30% della pagina. Nessun dato nuovo, solo fatti già presenti altrove sul sito.
- Frase di ricerca locale principale ("Italian restaurant" + nome del locale): già presente nel `<title>` ("Ragù Italian Bistro | Neapolitan Restaurant in Preston"), che è il segnale che conta di più. Deciso di **non** toccare anche l'H1 della hero ("Real Neapolitan cooking, in the heart of Preston.") solo per infilarci la parola "restaurant": guadagno SEO marginale contro il rischio di appiattire un H1 scritto con cura (24/09/2026).
- Tutti i fix sopra: 24/09/2026, pushati su main.

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

## Ancora aperto — readiness per motori/agenti AI (GEO, revisione 24/09/2026)
- Nessuna presenza del locale su Wikipedia/Reddit/YouTube/LinkedIn: secondo gli studi più recenti le menzioni del brand su queste piattaforme correlano con la citabilità nei motori AI più dei backlink classici (di cui si parla già sopra per l'articolo del Lancashire Post). Azione esterna, non di codice.
- Il numero di telefono come unico canale di prenotazione diventa sempre meno "azionabile" per un agente AI, man mano che questi motori aggiungono prenotazioni automatizzate (es. Google AI Mode); rinforza — non sostituisce — il punto già aperto sopra "un vero sistema di prenotazione online".

## Ancora aperto — lavoro di contenuto/codice, ma più corposo
- Pubblicare i 4 menù PDF come HTML completo (il clone Word editabile è già pronto, vedi Project) — include il menù bambini, che nel PDF originale non ha quasi testo estraibile.
- Date e citazioni dirette dagli articoli di stampa nella sezione Press.
- Blocco FAQ risposta-diretta (5-6 domande tipo "A che ora apre Ragù Preston stasera?").
- AVIF e `srcset` responsive multi-risoluzione per le immagini (oltre al WebP già fatto) — miglioria ulteriore, non urgente.
