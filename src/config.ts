// ---------------------------------------------------------------------------
// Zentrale Konfiguration — die einzige Stelle, an der diese Werte stehen.
// ---------------------------------------------------------------------------

export const site = {
  email: 'marco@duetsch.net',

  // Cal.com-Buchungslink im Format "<username>/<event-slug>", abgelesen aus der
  // eigenen Cal.com-URL:  https://cal.com/max-muster/erstgespraech
  //                   →   'max-muster/erstgespraech'
  // TODO(cal.com): echten Handle/Event-Slug einsetzen (steht noch als Platzhalter).
  calLink: 'marco-duetsch/erstgespraech',
  calOrigin: 'https://cal.com',
} as const;

export const calUrl = `${site.calOrigin}/${site.calLink}`;
