#!/usr/bin/env bash
# resolve-target.sh - map a component/page (path or name) to the ROUTE URL(s) that
# render it in the browser, plus the source scope to read when confirming signals.
# There is no Storybook in this repo, so runtime testing is ROUTE-based: a page is
# tested at its own route; a shared component is tested on the route(s) that import it.
#
# Usage: resolve-target.sh <component-path | component-name | route>
# Output sections (one item per line):
#   ROUTES        - route path(s) to probe, e.g. "/projects" or "/services/<slug>"
#   TARGET        - resolved source file
#   STYLES        - imported *.module.css (edit-sites for styling fixes)
#   COMPONENTS    - local/@component sub-components rendered inside the target
#   NOTES         - dynamic-route / shared-component caveats
# Bash 3.2 compatible. Run from repo root.
set -u

ROOT="$(pwd)"
target="${1:-}"
[ -n "$target" ] || { echo "usage: resolve-target.sh <path|name|route>" >&2; exit 2; }

# A bare route ("/projects") passed straight through.
case "$target" in
  /*) echo "ROUTES:"; echo "  $target";
      echo "TARGET:"; echo "  (route given directly; no source file resolved)";
      echo "NOTES:"; echo "  caller passed a route - probe it as-is"; exit 0 ;;
esac

# Resolve a bare name to a file under src/
if [ ! -f "$target" ]; then
  cand=$(find src -type f \( -name "${target}.js" -o -name "${target}.jsx" \
        -o -name "${target}.tsx" -o -name "$target" \) 2>/dev/null | head -1)
  [ -n "$cand" ] && target="$cand"
fi
[ -f "$target" ] || { echo "could not resolve target to a file: $1" >&2; exit 1; }

base="$(dirname "$target")"

# pages/foo.js -> /foo ; pages/foo/index.js -> /foo ; pages/index.js -> /
page_to_route() {
  p="$1"
  case "$p" in src/pages/*) ;; *) return 1 ;; esac
  r="${p#src/pages}"                       # /foo.js, /foo/index.js, /index.js
  r="${r%.js}"; r="${r%.jsx}"; r="${r%.tsx}"
  r="${r%/index}"                          # strip trailing /index
  [ "$r" = "/index" ] && r="/"
  [ -z "$r" ] && r="/"
  printf '%s\n' "$r"
}

echo "ROUTES:"
if route="$(page_to_route "$target")"; then
  case "$route" in
    */"[slug]"*|*"[slug]"*) echo "  ${route/\[slug\]/<slug>}  (DYNAMIC - supply a real slug from the data source)";;
    *) echo "  $route";;
  esac
else
  # Component: find page files that import it by basename, map to routes.
  name="$(basename "$target")"; name="${name%.*}"
  found=0
  global=0
  # CommonComponents/* (Header, Footer, CookieConsent, Seo, ...) are app-wide: they are
  # rendered on every route via Layout (imported in _app.js), so treat them as global.
  case "$target" in src/Components/CommonComponents/*|src/Components/Layout/*) global=1;; esac
  # search pages + Layout + _app for either a module-specifier OR a named/default import.
  importers=$(grep -rlE "from[[:space:]]+['\"][^'\"]*${name}['\"]|/${name}(/index)?['\"]|^import[^;]*[^A-Za-z0-9_]${name}[^A-Za-z0-9_].*from" src/pages src/Components/Layout src/pages/_app.js 2>/dev/null | sort -u)
  for imp in $importers; do
    case "$imp" in src/Components/Layout/*|src/pages/_app.js) global=1;; esac
  done
  if [ "$global" = "1" ]; then
    echo "  /              (shared/layout component - rendered on every route; '/' is representative)"
    echo "  /projects      (a content-heavy route to exercise it under real content)"
    found=1
  fi
  for imp in $importers; do
    if r="$(page_to_route "$imp")"; then echo "  $r"; found=1; fi
  done
  [ "$found" = "0" ] && echo "  (no route found that imports ${name}; probe '/' or pass a route explicitly)"
fi

echo "TARGET:"
echo "  $target"

# Join base + relative spec -> repo-relative path (no ext resolve).
reljoin() {
  d=$(cd "$ROOT/$1" 2>/dev/null && cd "$(dirname "$2")" 2>/dev/null && pwd) || return 1
  rel="${d#$ROOT/}"; [ "$rel" = "$d" ] && rel="."
  printf '%s/%s' "$rel" "$(basename "$2")"
}
try_file() {
  p="$1"
  for ext in "" .js .jsx .ts .tsx .module.css; do
    [ -f "$p$ext" ] && { printf '  %s\n' "$p$ext"; return 0; }
  done
  for idx in /index.js /index.jsx /index.tsx; do
    [ -f "$p$idx" ] && { printf '  %s\n' "$p$idx"; return 0; }
  done
  printf '  UNRESOLVED: %s\n' "$p"; return 1
}
resolve_spec() {
  spec="$1"
  case "$spec" in
    @component/*) try_file "src/${spec#@component/}" ;;
    ./*|../*)     p=$(reljoin "$base" "$spec") && try_file "$p" || printf '  UNRESOLVED(rel): %s\n' "$spec" ;;
    *) : ;;
  esac
}

echo "STYLES:"
grep -nE "from[[:space:]]+['\"][^'\"]*\.module\.css['\"]" "$target" \
  | sed -E "s/.*from[[:space:]]+['\"]([^'\"]+)['\"].*/\1/" | sort -u \
  | while read -r spec; do [ -n "$spec" ] && resolve_spec "$spec"; done

echo "COMPONENTS:"
grep -nE "^import .* from[[:space:]]+['\"](@component/|\.\.?/)" "$target" \
  | sed -E "s/.*from[[:space:]]+['\"]([^'\"]+)['\"].*/\1/" \
  | grep -vE '\.css($|['\''"])' | sort -u \
  | while read -r spec; do [ -n "$spec" ] && resolve_spec "$spec"; done

echo "NOTES:"
echo "  Runtime findings are observed in the browser; the source files above are where"
echo "  the fixing agent applies edits. CSS-module class names render hashed at runtime"
echo "  (e.g. landing_hero__a1b2c) - the prefix maps back to the *.module.css above."
