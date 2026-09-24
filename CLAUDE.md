# Ragù Italian Bistro — sito web

## Contesto
Sito del ristorante italiano di Vincenzo Gaglione (chef) e Luca Scognamiglio, entrambi di Napoli — cucina napoletana autentica, aperto dal 15 marzo 2026 a 5–7 Guildhall Street, Preston (UK), PR1 3NU. Vincenzo non è tecnico: ogni proposta che lo riguarda va spiegata in modo semplice. Ciro (il proprietario di questo repository) segue la parte online/digitale del locale.

Sito statico, nessun build step: HTML/CSS/JS puro. Repository su GitHub, deploy automatico su Netlify a ogni push su `main`.

Il resto del progetto (pianificazione, contenuti social, menù di Natale, ricerca competitor, roadmap generale) vive in un Project separato su claude.ai — questo repository copre solo la parte tecnica del sito. Riferimenti utili tenuti anche qui, per non dipendere da quel Project durante il lavoro di codice:
- `docs/identita-visiva.md` — loghi, colori, font del marchio
- `docs/normative-uk.md` — checklist normativa UK per il sito (non consulenza legale formale)
- `docs/seo-audit-riferimento.md` — problemi noti/aperti dai due audit SEO fatti finora (22 e 23 settembre 2026), da ricontrollare prima di ogni modifica strutturale per non reintrodurre un problema già segnalato

## 1. Struttura pulita, niente codice "alla buona" dentro l'HTML
- Niente `<style>` o `<script>` scritti inline dentro `index.html` (o le altre pagine `.html`). Il CSS sta in `assets/css/styles.css`, il JavaScript in file separati sotto `assets/js/`, uno per responsabilità (`nav.js` per il menu mobile, `hours.js` per orari/stato aperto-chiuso, `reveal.js` per animazioni, `cookie-consent.js` per il banner cookie), ciascuno con un breve commento in cima che spiega cosa fa.
- Niente attributi `style="..."` scritti a mano nei tag HTML: se serve uno stile puntuale, diventa una classe CSS vera, nel punto giusto del foglio di stile.
- `assets/css/styles.css` ha un indice in testa (elenco delle sezioni) per orientarsi subito.
- Codice moderno e coerente: `const`/`let` invece di `var`, funzioni commentate quando la logica non è ovvia a colpo d'occhio, nomi chiari.

## 2. Verifica prima di dare per buona una modifica
Per una correzione piccola e ovvia (un refuso, un colore, un testo) si può intervenire direttamente. Per qualunque modifica più strutturale (refactor, riorganizzazione, nuova funzionalità che tocca più punti, cambi al JSON-LD/schema):
1. Rileggere il diff (`git diff`) prima di committare: deve contenere solo le righe volute, niente effetti collaterali.
2. Se la modifica cambia qualcosa di visibile o di logica time-dependent (es. `hours.js`), verificarla con un server locale (`python3 -m http.server` nella cartella del sito) e un browser reale, non solo leggendo il codice — in particolare per la logica legata all'ora/al giorno corrente, vale la pena controllare più casi (oggi, un giorno con orario diverso, prima/dopo l'apertura) invece di fidarsi a occhio.
3. Controllare che il JSON-LD resti valido (si può incollare in https://validator.schema.org/ o fare un parse JSON al volo) dopo ogni modifica ai blocchi `<script type="application/ld+json">`.

## 3. Commit e pubblicazione
- Ogni commit ha un messaggio che spiega cosa cambia e perché. Se è un refactor "invisibile" (nessun cambiamento visivo o di comportamento, solo pulizia del codice), dirlo esplicitamente nel messaggio di commit.
- **Il push non va mai fatto di iniziativa (regola di Ciro): dopo ogni modifica committata chiedere esplicitamente "faccio il push?" e aspettare la risposta.** Ciro può rispondere no più volte di fila (le modifiche restano committate in locale, pronte) e dare l'ok in un momento a sua scelta — a quel punto si pusha tutto quello che si è accumulato in un colpo solo. Non dare per scontato un "sì" da un contesto precedente: chiederlo di nuovo ogni volta che c'è qualcosa di nuovo pronto.

## 4. Risparmiare crediti Netlify
Il progetto Netlify (`ragu-italian-bistrot`, piano Free del team `fornice96`) usa il sistema di billing a crediti: 300 crediti/mese, hard limit — se finiscono, il sito va in pausa e i visitatori vedono "Site not available". Ogni **deploy di produzione (push su `main`) costa 15 crediti**, indipendentemente da quanto è piccola la modifica; i **deploy preview/branch sono gratuiti e illimitati**. Di conseguenza:
- Raggruppare più modifiche correlate in un solo commit/push, invece di pubblicare ogni piccola modifica separatamente (motivo pratico dietro la regola del punto 3).
- Per una modifica rischiosa o su cui non si è sicuri al 100% nemmeno dopo il test in locale, si può pushare prima su un branch separato (deploy preview gratuito) per vedere il risultato vero su Netlify, e mergiare su `main` solo quando si è certi che va bene.
- Se il sito risulta "in pausa" o irraggiungibile, la prima cosa da controllare è il saldo crediti sulla dashboard Netlify (Team settings → Billing).

## 5. Decisioni prese da tenere a mente
- **Grafia del brand: "Bistro" ovunque** (non "Bistrot"), decisione di Ciro del 23/09/2026. Il dominio temporaneo `ragu-italian-bistrot.netlify.app` resta così com'è per ora, ma un futuro dominio proprio va scelto con "bistro", non "bistrot".
- Orari attuali (verificare comunque con Ciro/Vincenzo prima di usarli in un contenuto pubblico, possono cambiare): aperto tutti i giorni, 12:00–20:00 lunedì–giovedì e domenica, 12:00–21:00 venerdì–sabato.
- Ogni dato del locale (orari, menù, prezzi, food hygiene rating) va riverificato al momento dell'uso, non dato per scontato da una sessione precedente.
