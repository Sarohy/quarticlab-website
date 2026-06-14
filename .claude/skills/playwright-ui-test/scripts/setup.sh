#!/usr/bin/env bash
# setup.sh - idempotent one-time prep for the playwright-ui-test runner.
# Installs the ISOLATED runner deps (never touches the project's package.json),
# ensures the Chromium browser is present (reuses the global cache if already there),
# and reports whether the dev server is reachable.
# Usage: setup.sh [base-url]   (default base-url: http://localhost:3000)
set -u

SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RUNNER="$SKILL_DIR/runner"
BASE="${1:-http://localhost:3000}"

echo "== playwright-ui-test setup =="
echo "runner: $RUNNER"

# 1. isolated node deps
if [ ! -d "$RUNNER/node_modules/playwright" ] || [ ! -d "$RUNNER/node_modules/@axe-core/playwright" ]; then
  echo "-- installing isolated runner deps (playwright + @axe-core/playwright + axe-core) ..."
  ( cd "$RUNNER" && npm install --no-audit --no-fund ) || { echo "FAIL: npm install in runner"; exit 1; }
else
  echo "-- runner deps already installed (skip)"
fi

# 2. chromium browser (idempotent; reuses ~/Library/Caches/ms-playwright if present)
echo "-- ensuring Chromium is installed (reuses cache if present) ..."
if [ -x "$RUNNER/node_modules/.bin/playwright" ]; then
  ( cd "$RUNNER" && ./node_modules/.bin/playwright install chromium ) || echo "WARN: chromium install reported an issue; will retry at probe time"
else
  echo "WARN: runner playwright CLI not found; deps install may have failed"
fi

# 3. dev server reachability (informational; the agent starts it if down)
echo "-- checking dev server at $BASE ..."
code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "$BASE" 2>/dev/null)"
if [ "$code" = "200" ] || [ "$code" = "304" ]; then
  echo "OK: dev server is up ($code)"
else
  echo "NOTE: dev server not reachable (got '$code'). Start it with: npm run dev"
fi

echo "== setup done =="
