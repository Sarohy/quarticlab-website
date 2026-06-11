#!/usr/bin/env bash
# scan.sh - deterministic UI/UX seed-signal scanner (READ-ONLY).
# Usage: scan.sh <file> [file ...]
# Emits one line per signal:  <file>:<line>:<RULE_ID>:<detail>
# These are SEEDS, not findings. Confirm each by reading the code before reporting.
# Bash 3.2 compatible (macOS default). No associative arrays / no mapfile.
set -u

emit() { printf '%s:%s:%s:%s\n' "$1" "$2" "$3" "$4"; }

scan_css() {
  f="$1"

  grep -nE 'max-width:[[:space:]]*1200px' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "VIS-02" "max-width 1200px drifts from --max-width (1100px)"
  done

  grep -nE 'outline:[[:space:]]*(none|0)\b' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "A11Y-FOCUS-VISIBLE" "outline removed - confirm a :focus-visible replacement exists for this selector"
  done

  grep -nE '#[0-9a-fA-F]{3,6}\b' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "VIS-01" "hardcoded hex - map to a --ql-* token if one matches (design-tokens.md)"
  done

  grep -nE 'oklch\(' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "VIS-01" "raw oklch() - check literal->var table in design-tokens.md"
  done

  grep -nE 'font-family[^;]*Poppins' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "VIS-03" "Poppins font literal - map to var(--font-*)"
  done

  grep -nE '!important' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "VIS-10" "!important - fragile override (esp. global / third-party)"
  done

  grep -nE '(margin|width|left|right)[^;:{]*:[[:space:]]*[0-9.]+vw' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "RPM-01" "viewport-width sizing hack (vw in margin/width/left)"
  done

  grep -nE '(min-)?height:[[:space:]]*100vh' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "RPM-02" "100vh - prefer 100svh / 100dvh"
  done

  grep -nE 'will-change:[^;]*(flex-grow|width|height|top|left|margin)' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "RPM-06" "will-change on a layout property"
  done

  grep -nE '(transition|animation):[^;]*(width|height|top|left|margin|flex-grow)' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "RPM-06" "transition/animation on a layout property - animate transform/opacity"
  done

  grep -nE '\.css-[a-z0-9]+-Mui' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "VIS-12" "MUI hashed Emotion class override - fragile across upgrades"
  done

  # fixed-px headings >= 24px
  grep -nE 'font-size:[[:space:]]*[0-9]+(\.[0-9]+)?px' "$f" | while IFS= read -r line; do
    ln="${line%%:*}"
    px=$(printf '%s\n' "$line" | grep -oE '[0-9]+(\.[0-9]+)?px' | head -1 | sed 's/px$//')
    [ -n "$px" ] || continue
    if awk "BEGIN{exit !($px>=24)}"; then
      emit "$f" "$ln" "VIS-04" "fixed-px font-size ${px}px (>=24) - use clamp() if this is a heading"
    fi
  done

  # file animates but has no reduced-motion block
  if grep -qE '@keyframes|animation:|transition:' "$f"; then
    if ! grep -qE 'prefers-reduced-motion' "$f"; then
      emit "$f" "1" "RPM-07" "file animates but declares no prefers-reduced-motion block"
    fi
  fi
}

scan_jsx() {
  f="$1"

  # onClick on a non-button element - multi-line tag aware (perl slurp), grep fallback.
  # [^<]*? bounds the match to a single tag's attribute list (won't cross into a child),
  # so it survives arrow functions (=>) and multi-line JSX that a line-based grep misses.
  if command -v perl >/dev/null 2>&1; then
    perl -0777 -e '
      my $f=shift; open(my $fh,"<",$f) or exit 0; local $/; my $s=<$fh>;
      while ($s =~ /<(div|article|span|li|section)\b[^<]*?\bonClick\b/sg) {
        my $line = 1 + (substr($s,0,$-[0]) =~ tr/\n//);
        print "$f:$line:USA-IU-02:onClick on non-button <$1> - use <button> or role+tabIndex+onKeyDown\n";
      }' "$f"
  else
    grep -nE '<(div|article|span|li|section)[^>]*onClick' "$f" | while IFS=: read -r ln _; do
      emit "$f" "$ln" "USA-IU-02" "onClick on non-button element - use <button> or role+tabIndex+onKeyDown"
    done
  fi

  grep -nE 'onMouseEnter' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "A11Y-KEYBOARD-OPERABLE" "onMouseEnter - confirm keyboard path + aria-expanded/haspopup"
  done

  grep -nE 'onClick=\{[^}]*(async|fetch|axios|router\.push|\.then\()' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "USA-IU-01" "possible async action - confirm loading/disabled feedback"
  done

  grep -nE '\.map\(' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "USA-STATE-02" "list render - confirm a length===0 empty-state branch exists"
  done

  grep -nE 'placeholder=' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "USA-RECOGNITION-01" "placeholder used - confirm a persistent <label htmlFor> exists (A11Y-LABEL)"
  done

  grep -nE 'outline:[[:space:]]*(none|0)\b|outline-style' "$f" | while IFS=: read -r ln _; do
    emit "$f" "$ln" "A11Y-FOCUS-VISIBLE" "inline outline change - confirm :focus-visible replacement"
  done

  if grep -qE '<Image\b|next/image' "$f"; then
    emit "$f" "1" "RPM-03" "uses next/image - confirm each <Image fill> parent reserves space and LCP image has priority"
    emit "$f" "1" "A11Y-NAME" "uses next/image - confirm every <Image> has a meaningful alt (or alt='' if decorative)"
  fi

  # JS-driven animation without a reduced-motion guard
  if grep -qE 'requestAnimationFrame|setTimeout\(|setInterval\(' "$f"; then
    if grep -qE 'classList\.(add|toggle|remove)|\.style\.|\.animate\(' "$f"; then
      if ! grep -qE 'prefers-reduced-motion' "$f"; then
        emit "$f" "1" "RPM-07" "JS animation without a prefers-reduced-motion (matchMedia) guard"
      fi
    fi
  fi
}

[ "$#" -ge 1 ] || { echo "usage: scan.sh <file> [file ...]" >&2; exit 2; }

for f in "$@"; do
  if [ ! -f "$f" ]; then echo "skip (not a file): $f" >&2; continue; fi
  case "$f" in
    *.css)              scan_css "$f" ;;
    *.js|*.jsx|*.ts|*.tsx) scan_jsx "$f" ;;
    *) echo "skip (unsupported ext): $f" >&2 ;;
  esac
done
