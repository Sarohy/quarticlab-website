#!/usr/bin/env bash
# resolve-tree.sh - print a component's imported CSS module(s) and local
# sub-component files, resolving the @component/* -> src/* alias (jsconfig.json).
# Usage: resolve-tree.sh <component-path | component-name>
# Output sections: TARGET / STYLES / COMPONENTS  (one repo-relative path per line)
# Bash 3.2 compatible. Run from the repo root.
set -u

ROOT="$(pwd)"
target="${1:-}"
[ -n "$target" ] || { echo "usage: resolve-tree.sh <path|name>" >&2; exit 2; }

# Resolve a bare name to a file under src/
if [ ! -f "$target" ]; then
  cand=$(find src -type f \( -name "${target}.js" -o -name "${target}.jsx" \
        -o -name "${target}.tsx" -o -name "$target" \) 2>/dev/null | head -1)
  [ -n "$cand" ] && target="$cand"
fi
[ -f "$target" ] || { echo "could not resolve target to a file: $1" >&2; exit 1; }

base="$(dirname "$target")"

# Join base + relative spec and normalize to a repo-relative path (no ext resolve).
reljoin() {
  d=$(cd "$ROOT/$1" 2>/dev/null && cd "$(dirname "$2")" 2>/dev/null && pwd) || return 1
  rel="${d#$ROOT/}"
  [ "$rel" = "$d" ] && rel="."   # spec resolved to repo root
  printf '%s/%s' "$rel" "$(basename "$2")"
}

# Print the first existing file for a repo-relative path stem (tries extensions + index).
try_file() {
  p="$1"
  for ext in "" .js .jsx .ts .tsx .module.css; do
    if [ -f "$p$ext" ]; then printf '  %s\n' "$p$ext"; return 0; fi
  done
  for idx in /index.js /index.jsx /index.tsx; do
    if [ -f "$p$idx" ]; then printf '  %s\n' "$p$idx"; return 0; fi
  done
  printf '  UNRESOLVED: %s\n' "$p"
  return 1
}

resolve_spec() {
  spec="$1"
  case "$spec" in
    @component/*) try_file "src/${spec#@component/}" ;;
    ./*|../*)     p=$(reljoin "$base" "$spec") && try_file "$p" \
                    || printf '  UNRESOLVED(rel): %s\n' "$spec" ;;
    next/*|react|react-dom|react/*) : ;;   # framework - skip
    *) : ;;                                # bare module (node_modules) - skip
  esac
}

echo "TARGET: $target"

echo "STYLES:"
grep -nE "from[[:space:]]+['\"][^'\"]*\.module\.css['\"]" "$target" \
  | sed -E "s/.*from[[:space:]]+['\"]([^'\"]+)['\"].*/\1/" \
  | sort -u \
  | while read -r spec; do [ -n "$spec" ] && resolve_spec "$spec"; done

echo "COMPONENTS:"
grep -nE "^import .* from[[:space:]]+['\"](@component/|\.\.?/)" "$target" \
  | sed -E "s/.*from[[:space:]]+['\"]([^'\"]+)['\"].*/\1/" \
  | grep -vE '\.css($|['\''"])' \
  | sort -u \
  | while read -r spec; do [ -n "$spec" ] && resolve_spec "$spec"; done

echo "GLOBAL: src/styles/globals.css (always in scope for token + antipattern checks)"
