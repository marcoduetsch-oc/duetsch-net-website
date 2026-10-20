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
