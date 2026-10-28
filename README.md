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
    linkLabel: 'Biergame spielen →',  // Link-Text, wenn url gesetzt ist
    description: 'Ein bis drei Sätze zum Tool.',
    points: ['Stichpunkt 1', 'Stichpunkt 2'],   // optional
    url: '',                     // öffentliche Adresse, z. B. 'https://biergame.duetsch.net'
  },
] as const;
```

- `url` **leer** → die Karte zeigt den `status` («In Vorbereitung») statt eines Links.
- `url` **gesetzt** → die Karte zeigt den Link (`linkLabel`, sonst «Tool öffnen →»;
  öffnet in neuem Tab).
- Verlinkte Tools erscheinen nur als normale Links, **nicht** als Embed — so bleibt
  die Regel «keine externen Requests beim Seitenaufruf» gewahrt.
- Danach `npm run build` (bzw. `npm run deploy`) — fertig.

## Struktur

```
src/pages/        index, leistungen, projekte, ueber-mich, kontakt, impressum, datenschutz
src/layouts/      Base.astro (Header, Footer, SEO, Canonical)
src/styles/       global.css (Design-Tokens, kein Framework nötig)
public/           favicon.svg, robots.txt
brand/            Logo-Varianten A–D (SVG) + logo-varianten.html (Vergleichsseite)
dist/             Build-Ergebnis (wird deployt, NICHT eingecheckt)
deploy.sh         Build + Push des dist/ auf Branch `deploy`
```

## Marke / Logo

Das Marken-Icon steht im Header links vor dem Namen «Marco Dütsch» und ist
gleichzeitig das Favicon. Es gibt **vier Varianten** im Grünton `#0b6e4f`; alle
liegen als SVG in **`brand/`**, inklusive Vergleichsseite und Anleitung zum
Wechseln — siehe [`brand/README.md`](brand/README.md).

Im Einsatz ist derzeit **Variante B (Knoten-Kette)** — eingebaut inline in
`src/layouts/Base.astro` (folgt dem CSS-Token `--accent`) und als
`public/favicon.svg`.

## Repositories

- **GitHub `origin`** — Quellcode und Backup dieser Website, inkl. aller
  Logo-Varianten: `marcoduetsch-oc/duetsch-net-website` (**privat**, Default `main`)
- **GitHub `deployrepo`** — reiner Build-Output für den Green-Pull:
  `marcoduetsch-oc/duetsch-net-deploy` (**öffentlich**, Default-Branch `deploy`,
  enthält nur das fertige `dist/` — sonst nichts)
- **Green-Panel `green`** — optionaler Remote, falls das Panel eine eigene
  Repository-URL ausgibt (dann nur Branch `deploy` pushen).

```bash
DEPLOY_REMOTE=deployrepo npm run deploy   # baut + pusht Branch deploy zu GitHub
```

Das Deploy-Repo ist absichtlich **öffentlich**: das Green-Panel klont ohne
Zugangsdaten, es liegt kein Token im Panel, und der Inhalt ist ohnehin die
öffentliche Website. Der Quellcode bleibt im privaten Repo.

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

1. **Web-Root leeren.** Im Panel-Datei-Manager alle alten WordPress-Dateien
   (`index.php`, `wp-*`, `xmlrpc.php`, `wp-content/`, `wp-config.php`) in einen
   Unterordner `_wp-archiv-2026/` verschieben. Solange `index.php` im Root liegt,
   kann sie `index.html` verdrängen.
2. **Git-Integration anlegen** (Panel → Domain `duetsch.net` → Git-Integration):
   - **Git Repository URL:** `https://github.com/marcoduetsch-oc/duetsch-net-deploy.git`
   - **Repository ist öffentlich** ✔ (das Deploy-Repo ist public, kein Token nötig)
   - **Zielverzeichnis:** Web-Root von `duetsch.net` (Stammverzeichnis der Domain).
     ⚠️ **Nicht** den Panel-Default `/httpdocs/git` übernehmen — damit läge die
     Seite unter `duetsch.net/git/`. Falls `/httpdocs` das Stammverzeichnis der
     Domain ist, dort `/httpdocs` eintragen.
3. **Pull auslösen** (Branch `deploy` — bei externem Repo zieht das Panel den
   Default-Branch, der genau `deploy` ist).
4. **Prüfen:** `curl -I https://www.duetsch.net/` und Startseite im Browser;
   `wp-login.php` muss danach 404 liefern.

> ⚠️ **DNS nicht anfassen.** Die DNS-Verwaltung im Green-Panel muss auf
> **«Manuell»** bleiben. Ein Wechsel auf «Automatisch» löscht alle
> benutzerdefinierten Einträge — inklusive MX/SPF für `marco@duetsch.net`.

## Vor dem Go-Live noch einsetzen

- [x] `src/config.ts`: echter Cal.com-Handle eingesetzt (20.10.2026)
- [x] `/projekte/`: `url` des Supply-Chain-Simulators gesetzt →
      `https://biergame.duetsch.net`, Link-Text «Biergame spielen →» (28.10.2026)
- [x] `impressum.astro`: Strasse und PLZ eingesetzt — Falkenstrasse 20,
      8400 Winterthur (28.10.2026)
- [ ] `impressum.astro`: Rechtsform, UID/MWST (falls vorhanden)
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
