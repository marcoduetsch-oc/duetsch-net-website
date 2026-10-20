# duetsch.net — Website (Marco Dütsch)

Statische Website (Astro), gebaut für die **Green.ch Git-Integration**.
Kein Server-Build, keine Datenbank, keine externen Requests beim Seitenaufruf
(Systemschriften, keine eigenen Cookies, kein Tracking). Einzige Ausnahme ist die
Terminbuchung über **Cal.com**, und die wird per Zwei-Klick-Prinzip erst nach
aktivem Klick geladen — passt zum revDSG-Text in `/datenschutz/`.

## Konfiguration

Alle änderbaren Werte stehen in **`src/config.ts`**: E-Mail-Adresse, der
Cal.com-Buchungslink (`calLink` im Format `username/event-slug`) und die Liste
**`projects`** für die Seite `/projekte/`. Auf der Website gibt es **keine
Telefonnummer**; der Kontaktweg ist Cal.com oder E-Mail.

## Projekte pflegen (`/projekte/`)

Die Projektliste ist ein Array in `src/config.ts`. Neues Tool = neues Objekt
anhängen (Reihenfolge im Array = Reihenfolge auf der Seite):

```ts
export const projects = [
  {
    title: 'Supply-Chain-Simulator',
    status: 'In Vorbereitung',   // erscheint, solange url leer ist
    description: 'Ein bis drei Sätze zum Tool.',
    points: ['Stichpunkt 1', 'Stichpunkt 2'],   // optional
    url: '',                     // öffentliche Adresse, z. B. 'https://biergame.duetsch.net'
  },
] as const;
```

- `url` **leer** → die Karte zeigt den `status` («In Vorbereitung») statt eines Links.
- `url` **gesetzt** → die Karte zeigt «Tool öffnen →» (öffnet in neuem Tab).
- Verlinkte Tools erscheinen nur als normale Links, **nicht** als Embed — so bleibt
  die Regel «keine externen Requests beim Seitenaufruf» gewahrt.
- Danach `npm run build` (bzw. `npm run deploy`) — fertig.

## Struktur

```
src/pages/        index, leistungen, projekte, ueber-mich, kontakt, impressum, datenschutz
src/layouts/      Base.astro (Header, Footer, SEO, Canonical)
src/styles/       global.css (Design-Tokens, kein Framework nötig)
public/           favicon.svg, robots.txt
dist/             Build-Ergebnis (wird deployt, NICHT eingecheckt)
deploy.sh         Build + Push des dist/ auf Branch `deploy`
```

## Lokal

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # gebaute Seite lokal prüfen
```

## Deployment nach Green (Git-Integration)

**Kurz:** `npm run deploy` baut die Seite und pusht sie als Branch `deploy`
(enthalten ist nur das fertige `dist/`, kein Quellcode, kein Build-Schritt).

1. **Remote setzen.** Im Green-Panel die Git-Integration öffnen und die dort
   angezeigte Repository-URL als Remote eintragen:
   `git remote add origin <URL aus dem Panel>`
   (Alternativ ein GitHub-Repo verwenden und im Panel «externes Repository» +
   Webhook konfigurieren.)
2. **Deployen:** `npm run deploy`
3. **Im Panel:** Git-Integration → Pull ausführen, Branch **`deploy`**,
   Zielverzeichnis = **Web-Root der Domain** (`duetsch.net`).
4. **Prüfen:** `curl -I https://www.duetsch.net/` und Startseite im Browser.

> ⚠️ **DNS nicht anfassen.** Die DNS-Verwaltung im Green-Panel muss auf
> **«Manuell»** bleiben. Ein Wechsel auf «Automatisch» löscht alle
> benutzerdefinierten Einträge — inklusive MX/SPF für `marco@duetsch.net`.

## Vor dem Go-Live noch einsetzen

- [x] `src/config.ts`: echter Cal.com-Handle eingesetzt (20.10.2026)
- [ ] `/projekte/`: `url` des Supply-Chain-Simulators eintragen, sobald er unter
      der Subdomain erreichbar ist (heute zeigt die Karte «In Vorbereitung»)
- [ ] `impressum.astro`: Strasse, PLZ, Rechtsform, UID/MWST (falls vorhanden)
- [ ] `datenschutz.astro`: Aufbewahrungsdauer der Logfiles ([AUFBEWAHRUNGSDAUER])
- [ ] `ueber-mich.astro`: Portraitfoto (optional), ggf. Abschlüsse/Zertifikate
- [ ] Zahlen/Referenzen in `index.astro` (nur echte, belegbare Angaben)
- [ ] Arbeitgeber-Nennung: aktuell als «internationaler Möbel- und
      Detailhandelskonzern» beschrieben — bewusst ohne Namen (läuft noch)
- [ ] Apex/www klären: aktuell leitet die alte WordPress-Seite `duetsch.net`
      auf `www.duetsch.net` um. Nach dem Umbau entweder beide Domains auf
      dasselbe Zielverzeichnis zeigen lassen oder eine Weiterleitung im Panel
      setzen — und die Canonical-URL (`astro.config.mjs`, `site:`) dazu passend
      wählen.
- [ ] Alte WordPress-Dateien im Web-Root entfernen (sonst bleiben
      `wp-login.php` & Co. erreichbar)

## Deployment-Kette (entschieden 20.10.2026)

Website → **Green Webhosting + Git-Integration** (kein DNS-Eingriff, keine
Zusatzkosten). Biergame (Streamlit) → **Railway**, weil Shared Hosting keine
laufenden Prozesse/Ports erlaubt.
