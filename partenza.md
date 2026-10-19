# Partenza — dove eravamo rimasti

Aggiornato il 19/10/2026. Leggilo all'inizio di una nuova sessione, poi `CLAUDE.md` per le regole del progetto.

## Stato attuale (online su https://raguitalianbistro.co.uk)
- Hosting **Cloudflare** (Worker `ragu-sito`), deploy automatico con **GitHub Actions** a ogni push su `main` (~30 s). Netlify dismesso, `workers.dev` spento. Dettagli e procedura d'emergenza in `CLAUDE.md` §4 e §4b.
- Ultima versione online: commit `00bfb6f` (Gift Card). Locale e GitHub allineati.
- Sezioni recenti:
  - **Ordini Uber Eats in primo piano**: hero, barra mobile Call · Order · Directions, nav, JSON-LD `OrderAction`.
  - **Natale 2026** (concept 1 "Bordeaux & Oro", pulsanti verdi): Christmas Menu 27/11–31/01 (pranzo £28.90, cena £32.90, caparra £10 pp per tavoli da 5+), Christmas Day 25/12 12–16 (£69.99/£29.99, caparra £20 pp, opzioni veg/GF). Fonti: versioni FINALI nei LEGGIMI di `../Menu/Menù di Natale/`. Stagionale: istruzioni per toglierla in `CLAUDE.md`.
  - **Gift Card**: niente pagamento online, si chiama/scrive al locale; importo libero, scadenza non indicata.
  - **Mappa** = immagine fissa stile Google (`assets/map-preston.*`), niente iframe.
  - **Galleria** con 15 foto nuove (fatto da un'altra chat).

## Lavori paralleli
- Un'altra chat sta facendo il **sito v2** in `../sito-web-v2` (hero a tutto schermo con foto che scorrono, stile romanosrestaurant.co.uk). Non toccare quella cartella da qui.
- Ramo locale `gift-slideshow` (non pubblicato): prova dell'hero stile Romanos, superata dal v2 — si può eliminare. Ramo `natale`: già confluito in `main`, si può eliminare.

## In attesa di risposte dallo zio di Ciro (poi implementare)
1. Gift card: importi liberi o tagli fissi (minimo?), scadenza, dove valgono (menù di Natale/25 dicembre, bevande, asporto, uso in più volte), come si consegna (ritiro, posta, digitale), come si paga, foto di una gift card stampata.
2. Uber Eats: orari di consegna uguali a quelli del ristorante?
3. Foto del locale addobbato per Natale (per la sezione Natale e per il v2).

## Promemoria
- Togliere la scheda Christmas Day dopo il 25/12/2026 e l'intera sezione Natale dopo il 31/01/2027.
- Backup su Google Drive (`Documenti/Ciro/Z_Altro/Ragù - Sito web/`): ultimo del 19/10 (versione `d11dccb`), da rifare dopo le modifiche importanti (comandi in `CLAUDE.md` §4b).
- Push sempre solo dopo ok esplicito di Ciro; rispondere sempre in italiano.
