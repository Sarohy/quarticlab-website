#!/usr/bin/env bash
# validate-report.sh - assert a runtime UI-test report is machine-consumable.
# Usage: validate-report.sh <report.md>
# Checks: exactly one ```json fence that parses; required top-level keys; required
# per-finding fields; viewports non-empty & valid; summary counts reconcile to
# findings.length; apply_order is a permutation of ids; depends_on acyclic & known;
# and - WHEN a finding ships an exact code edit - suggested_fix.before occurs exactly
# once in suggested_fix.target_file. Runtime findings may omit before/target_file
# (the fixer must locate the source), so that check is conditional. Uses node.
set -u

report="${1:-}"
[ -f "$report" ] || { echo "FAIL: report not found: $report" >&2; exit 2; }

REPORT="$report" node <<'JS'
const fs = require('fs');
const text = fs.readFileSync(process.env.REPORT, 'utf8');

const fences = [...text.matchAll(/```json\s*\n([\s\S]*?)\n```/g)];
if (fences.length !== 1) {
  console.log(`FAIL: expected exactly one \`\`\`json fence, found ${fences.length}`);
  process.exit(1);
}
let data;
try { data = JSON.parse(fences[0][1]); }
catch (e) { console.log('FAIL: json block does not parse: ' + e.message); process.exit(1); }

const errors = [];
for (const k of ['schema_version', 'summary', 'findings']) if (!(k in data)) errors.push('missing top-level key: ' + k);

const findings = Array.isArray(data.findings) ? data.findings : [];
const ids = findings.map(f => f.id);
if (new Set(ids).size !== ids.length) errors.push('duplicate finding ids');

const VALID_VIEWPORTS = new Set(['desktop', 'ipad', 'phone']);
const REQ = ['id','probe_id','category','title','severity','severity_rationale','confidence',
  'autofix','viewports','evidence','runtime_location','root_cause','suggested_fix',
  'acceptance_criteria','depends_on','fingerprint'];
const SEV = new Set(['blocker','critical','major','minor','info']);
const FIX = new Set(['autofixable','needs-human','unsafe']);

for (const f of findings) {
  const id = f.id || '?';
  for (const k of REQ) if (!(k in f)) errors.push(`${id}: missing field ${k}`);
  if (f.severity && !SEV.has(f.severity)) errors.push(`${id}: bad severity ${f.severity}`);
  if (f.autofix && !FIX.has(f.autofix)) errors.push(`${id}: bad autofix ${f.autofix}`);
  if (!Array.isArray(f.viewports) || f.viewports.length === 0) errors.push(`${id}: viewports must be a non-empty array`);
  else for (const v of f.viewports) if (!VALID_VIEWPORTS.has(v)) errors.push(`${id}: unknown viewport ${v}`);
  if (Array.isArray(f.acceptance_criteria) && f.acceptance_criteria.length === 0) errors.push(`${id}: acceptance_criteria is empty`);
}

const s = data.summary || {};
if (s.total != null && s.total !== findings.length) errors.push(`summary.total ${s.total} != findings ${findings.length}`);
if (s.by_severity) {
  const c = {};
  for (const f of findings) c[f.severity] = (c[f.severity] || 0) + 1;
  for (const k of Object.keys(s.by_severity)) if ((c[k] || 0) !== s.by_severity[k]) errors.push(`by_severity[${k}] ${s.by_severity[k]} != actual ${c[k] || 0}`);
}
if (Array.isArray(s.apply_order) && s.apply_order.length) {
  const a = [...s.apply_order].sort(), b = [...ids].sort();
  if (a.length !== b.length || a.some((x, i) => x !== b[i])) errors.push('apply_order is not a permutation of finding ids');
}

// depends_on DAG
const g = {};
for (const f of findings) g[f.id] = Array.isArray(f.depends_on) ? f.depends_on : [];
const color = {}; let cycle = false;
function dfs(n) {
  color[n] = 1;
  for (const m of (g[n] || [])) {
    if (!(m in g)) { errors.push(`${n}: depends_on unknown id ${m}`); continue; }
    if (color[m] === 1) cycle = true; else if (!color[m]) dfs(m);
  }
  color[n] = 2;
}
for (const n of Object.keys(g)) if (!color[n]) dfs(n);
if (cycle) errors.push('depends_on has a cycle');

// conditional: when an exact edit is shipped, its anchor must occur exactly once
for (const f of findings) {
  const sf = f.suggested_fix || {};
  const before = sf.before, tf = sf.target_file;
  if (before && tf) {
    if (!fs.existsSync(tf)) { errors.push(`${f.id}: suggested_fix.target_file not found: ${tf}`); continue; }
    const txt = fs.readFileSync(tf, 'utf8');
    let i = 0, c = 0, idx;
    while ((idx = txt.indexOf(before, i)) !== -1) { c++; i = idx + before.length; }
    if (c !== 1) errors.push(`${f.id}: suggested_fix.before occurs ${c}x in ${tf} (must be exactly 1 when present)`);
  }
}

if (errors.length) {
  console.log('FAIL:');
  for (const e of errors) console.log('  - ' + e);
  process.exit(1);
}
console.log(`OK: ${findings.length} findings, schema ${data.schema_version}, report is machine-consumable`);
JS
