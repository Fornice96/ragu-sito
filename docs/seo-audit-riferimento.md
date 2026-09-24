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
- Verificato (24/09/2026): nessun crawler AI è bloccato da `robots.txt` (`User-agent: * / Allow: /` copre anche GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, ecc. — non serve aggiungere righe dedicate). Il sito è inoltre interamente statico e renderizzato lato server: nessun contenuto dipende da JavaScript per essere visibile ai crawler. Due punti di forza confermati, nessuna azione da fare.
- Le 7 foto usate in `index.html` hanno ora anche una versione WebP servita via `<picture>` (fallback JPEG automatico) — -21% di peso scaricato da un browser moderno. Manca ancora AVIF (nessun encoder disponibile in locale) e lo `srcset` responsive multi-risoluzione: miglioria ulteriore possibile, non urgente.
- Cache-Control su `/assets/*` alzata da 1 ora a 7 giorni (`stale-while-revalidate` 30 giorni).
- Preload dei due pesi Poppins più usati (400 e 600) in `index.html` per velocizzare la comparsa del testo. La catena di 9 file font resta invariata (ridurla richiederebbe eliminare pesi non usati o un font variabile — intervento più corposo, non fatto).
- Il menu mobile (`assets/js/nav.js`) ora sposta il focus al suo interno all'apertura (con focus trap su Tab/Shift+Tab) e lo riporta sul pulsante hamburger alla chiusura. Aggiunto anche un link "Skip to content" a inizio pagina.
- `llms.txt` riformattato secondo lo standard proposto (titolo, sommario, sezioni con link in formato markdown) — stessi dati di prima, solo formato corretto.
- Tutti i fix sopra: 24/09/2026, in locale, in attesa di push.

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
- Manca un paragrafo "definitorio" e autosufficiente in cima alla pagina (formato risposta diretta, circa 130-170 parole, es. "Ragù Italian Bistro è un ristorante napoletano a Preston che serve...") che un motore AI possa citare senza altro contesto. Oggi il testo più vicino a questo è nella sezione "Our story", più in basso nella pagina — i modelli AI citano soprattutto il primo 30% della pagina. È una modifica di copy/tono di voce, da proporre a Ciro prima di pubblicarla, non solo tecnica.
- Nessuna presenza del locale su Wikipedia/Reddit/YouTube/LinkedIn: secondo gli studi più recenti le menzioni del brand su queste piattaforme correlano con la citabilità nei motori AI più dei backlink classici (di cui si parla già sopra per l'articolo del Lancashire Post). Azione esterna, non di codice.
- Il numero di telefono come unico canale di prenotazione diventa sempre meno "azionabile" per un agente AI, man mano che questi motori aggiungono prenotazioni automatizzate (es. Google AI Mode); rinforza — non sostituisce — il punto già aperto sopra "un vero sistema di prenotazione online".

## Ancora aperto — lavoro di contenuto/codice, ma più corposo
- Pubblicare i 4 menù PDF come HTML completo (il clone Word editabile è già pronto, vedi Project) — include il menù bambini, che nel PDF originale non ha quasi testo estraibile.
- Date e citazioni dirette dagli articoli di stampa nella sezione Press.
- Blocco FAQ risposta-diretta (5-6 domande tipo "A che ora apre Ragù Preston stasera?").
- Lavorare la frase di ricerca locale principale ("Italian restaurant" + nome del locale) nell'H1 (oggi già presente nel `<title>`, non ancora nell'H1 della hero — anche questo è copy, da proporre a Ciro).
- Cambiare `sameAs` da Messenger a una vera Facebook Page, quando esiste (serve sapere se/quando la pagina Facebook vera viene creata).
- AVIF e `srcset` responsive multi-risoluzione per le immagini (oltre al WebP già fatto) — miglioria ulteriore, non urgente.
- 4 PDF dei menù pesanti (816KB–1.9MB l'uno) — da comprimere, ma serve un tool (Ghostscript o qpdf) non ancora installato in locale, e va verificato che il testo resti leggibile e i prezzi/allergeni accurati dopo la compressione.
