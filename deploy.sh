#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Baut die Website und pusht das Ergebnis als Branch `deploy` zum Remote.
# Green-Git-Integration: Branch `deploy` auswählen, Zielverzeichnis = Web-Root.
# Es wird KEIN Build auf dem Server gemacht — hier wird gebaut, nur dist/
# landet im Deploy-Branch (Branch-Inhalt = Website, sonst nichts).
# ---------------------------------------------------------------------------
set -euo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)"
cd "$SRC"

BRANCH="${DEPLOY_BRANCH:-deploy}"
REMOTE="${DEPLOY_REMOTE:-origin}"

echo "→ Build (astro)"
npm run build

[ -f dist/index.html ] || { echo "FEHLER: dist/index.html fehlt — Build unvollständig."; exit 1; }

REMOTE_URL="$(git remote get-url "$REMOTE" 2>/dev/null || true)"
SRC_REV="$(git rev-parse --short HEAD 2>/dev/null || echo 'kein-commit')"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cd "$TMP"
git init -q -b "$BRANCH"
cp -R "$SRC/dist/." .
git add -A
git -c user.email="deploy@duetsch.net" -c user.name="Deploy" \
    commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ) · Quelle ${SRC_REV}"

echo "→ Deploy-Commit: $(git rev-parse --short HEAD) ($(git ls-files | wc -l | tr -d ' ') Dateien)"

if [ -n "$REMOTE_URL" ]; then
  echo "→ Push nach ${REMOTE} ($REMOTE_URL) Branch ${BRANCH}"
  git push --force "$REMOTE_URL" "HEAD:refs/heads/${BRANCH}"
  echo "✓ Fertig. Im Green-Panel: Git-Integration → Pull (Branch ${BRANCH})."
else
  echo "! Kein Remote '${REMOTE}' konfiguriert."
  echo "  Entweder Green-Panel-Repo-URL als Remote setzen:"
  echo "      git remote add origin <URL aus dem Green-Panel>"
  echo "  oder GitHub-Repo verwenden (dann zieht das Panel von dort)."
  echo "  Der Deploy-Commit liegt lokal auf Branch ${BRANCH}."
fi
