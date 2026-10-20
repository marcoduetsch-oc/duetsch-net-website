# Marke / Logo — Marco Dütsch

Marken-Icon für Header und Favicon der Website. Vier Varianten, alle im Grünton
`#0b6e4f`, alle als reine SVG-Vektorgrafik (skaliert verlustfrei, kein Bitmap).

## Übersicht

| Variante | Datei | Motiv / Bedeutung |
|---|---|---|
| A | `logo-a-monogramm-d.svg` | Monogramm «D» — klassisch, klar auf den Namen bezogen |
| B | `logo-b-knoten-kette.svg` | Knoten-Kette — Netzwerk, Lieferkette, Datenfluss |
| C | `logo-c-balken.svg` | Balken — Wachstum, Kennzahlen, Analytics |
| D | `logo-d-fluss-kurve.svg` | Fluss-Kurve — Transformation, Route, Prozess |

**Aktuell im Einsatz: Variante B (Knoten-Kette)** — im Header aller Seiten und im
`public/favicon.svg` (Browser-Tab, Lesezeichen, Suchergebnisse).

Alle vier Varianten im Grössenvergleich ansehen: [`logo-varianten.html`](logo-varianten.html)
(im Browser öffnen, keine Internetverbindung nötig).

## Gestaltungsregeln

- **Grundform:** abgerundetes Quadrat, `viewBox="0 0 32 32"`, Eckenradius `rx="9"`
  (≈ 28 % der Kantenlänge). Grösse im Header: **30 px** (mobil 27 px), Favicon 16–32 px.
- **Farbe:** Fläche = `#0b6e4f` (Akzentgrün der Website), Symbol = Weiss `#fff`.
  Im Header wird die Fläche mit `currentColor` gezeichnet, damit sie dem
  CSS-Token `--accent` folgt; in den Einzeldateien steht der Hex-Wert fest.
- **Kein Text im Icon**, keine Verläufe, keine Schatten — damit es bei 16 px noch
  scharf bleibt.
- Das Icon steht immer **links neben** dem Namen «Marco Dütsch», Abstand 10 px,
  vertikal zentriert.

## Variante wechseln

1. In **`src/layouts/Base.astro`** den `<svg class="brand-mark" …>`-Block im
   `<a class="brand">` durch den gewünschten Block unten ersetzen.
2. **`public/favicon.svg`** mit derselben Variante überschreiben (Inhalt der
   entsprechenden Datei aus diesem Ordner, Fläche auf `#0b6e4f`).
3. `npm run build` bzw. `npm run deploy`.

Die vier Blöcke für `Base.astro`:

### A · Monogramm «D»
Datei: [`logo-a-monogramm-d.svg`](logo-a-monogramm-d.svg) — Charakter: Klassisches «D» im grünen Quadrat. Ruhig, klar auf den Namen bezogen — entspricht dem früheren Favicon.

```html
<svg class="brand-mark" viewBox="0 0 32 32" width="30" height="30" role="img" aria-label="Marco Dütsch">
  <rect width="32" height="32" rx="9" fill="currentColor" />
  <path d="M10.5 23V9h5.6c4.3 0 6.9 2.7 6.9 7s-2.6 7-6.9 7h-5.6zm3.4-2.9h2.1c2.3 0 3.6-1.4 3.6-4.1s-1.3-4.1-3.6-4.1h-2.1v8.2z" fill="#fff" />
</svg>
```

### B · Knoten-Kette
Datei: [`logo-b-knoten-kette.svg`](logo-b-knoten-kette.svg) — Charakter: Drei verbundene Knoten auf einer Diagonale — Netzwerk, Lieferkette, Datenfluss. **Live auf der Website** (Header und Favicon).

```html
<svg class="brand-mark" viewBox="0 0 32 32" width="30" height="30" role="img" aria-label="Marco Dütsch">
  <rect width="32" height="32" rx="9" fill="currentColor" />
  <path d="M10 22 L22 10" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none" />
  <circle cx="10" cy="22" r="3" fill="#fff" />
  <circle cx="16" cy="16" r="3" fill="#fff" />
  <circle cx="22" cy="10" r="3" fill="#fff" />
</svg>
```

### C · Balken
Datei: [`logo-c-balken.svg`](logo-c-balken.svg) — Charakter: Drei aufsteigende Balken — Wachstum, Kennzahlen, Analytics.

```html
<svg class="brand-mark" viewBox="0 0 32 32" width="30" height="30" role="img" aria-label="Marco Dütsch">
  <rect width="32" height="32" rx="9" fill="currentColor" />
  <g fill="#fff">
    <rect x="8" y="17" width="4" height="7" rx="2" />
    <rect x="14" y="13" width="4" height="11" rx="2" />
    <rect x="20" y="8" width="4" height="16" rx="2" />
  </g>
</svg>
```

### D · Fluss-Kurve
Datei: [`logo-d-fluss-kurve.svg`](logo-d-fluss-kurve.svg) — Charakter: Geschwungener Pfad von A nach B — Transformation, Route, Prozess.

```html
<svg class="brand-mark" viewBox="0 0 32 32" width="30" height="30" role="img" aria-label="Marco Dütsch">
  <rect width="32" height="32" rx="9" fill="currentColor" />
  <path d="M9.5 22.5C9.5 16 22.5 16 22.5 9.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none" />
  <circle cx="9.5" cy="22.5" r="3" fill="#fff" />
  <circle cx="22.5" cy="9.5" r="3" fill="#fff" />
</svg>
```
