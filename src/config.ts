// ---------------------------------------------------------------------------
// Zentrale Konfiguration — die einzige Stelle, an der diese Werte stehen.
// ---------------------------------------------------------------------------

export const site = {
  email: 'marco@duetsch.net',

  // Cal.com-Buchungslink im Format "<username>/<event-slug>", abgelesen aus der
  // eigenen Cal.com-URL:  https://cal.com/max-muster/erstgespraech
  //                   →   'max-muster/erstgespraech'
  calLink: 'marco-dutsch-t0qumc/ersttermin-45-minuten-unverbindlich',
  calOrigin: 'https://cal.com',
} as const;

export const calUrl = `${site.calOrigin}/${site.calLink}`;

// ---------------------------------------------------------------------------
// Projekte & eigene Tools — Inhalt der Seite /projekte/
// ---------------------------------------------------------------------------
// Neuen Eintrag: Objekt unten anhängen. Reihenfolge hier = Reihenfolge auf der
// Seite. `url` auf die öffentliche Adresse setzen, sobald das Tool erreichbar
// ist — bleibt `url` leer, zeigt die Karte den `status` statt eines Links.
// `points` sind die Stichpunkte in der Karte (Technik, Funktionen, Umfang).
export const projects = [
  {
    title: 'Supply-Chain-Simulator',
    status: 'In Vorbereitung', // erscheint nur, solange `url` leer ist
    linkLabel: 'Biergame spielen →', // Text des Links, wenn `url` gesetzt ist
    description:
      'Multi-Agenten-Simulation einer vollständigen Lieferkette: fünf KI-Agenten ' +
      '(Nachfrage, Beschaffung, Produktion, Lager, Logistik) entscheiden autonom ' +
      'und stimmen sich über einen Event Bus ab. Das Dashboard zeigt Bestände, ' +
      'Fill Rate, Kosten und Deckungsbeitrag in Echtzeit.',
    points: [
      'Nachfrageprognose mit Saisonalität, Trend und Rauschen',
      'Bestellpolitik (s,Q) mit Sicherheitsbestand',
      'Engpass- und Stockout-Analyse über den gesamten Verlauf',
      'Python, Streamlit, Plotly',
    ],
    url: 'https://biergame.duetsch.net',
  },
] as const;
