#!/usr/bin/env bash
# validate-report.sh - assert a UI/UX audit report is machine-consumable.
# Usage: validate-report.sh <report.md>
# Checks: exactly one ```json fence that parses; required top-level keys;
# summary counts reconcile to findings.length; apply_order is a permutation of ids;
# depends_on is acyclic and references known ids; every fix.before occurs exactly
# once in its target_file. Exits non-zero on any failure. Uses node (always present).
set -u

report="${1:-}"
[ -f "$report" ] || { echo "FAIL: report not found: $report" >&2; exit 2; }

REPORT="$report" node <<'JS'
const fs = require('fs');
const p = process.env.REPORT;
const text = fs.readFileSync(p, 'utf8');

const fences = [...text.matchAll(/```json\s*\n([\s\S]*?)\n```/g)];
if (fences.length !== 1) {
  console.log(`FAIL: expected exactly one \`\`\`json fence, found ${fences.length}`);
  process.exit(1);
}
let data;
try { data = JSON.parse(fences[0][1]); }
catch (e) { console.log('FAIL: json block does not parse: ' + e.message); process.exit(1); }

const errors = [];
for (const k of ['schema_version', 'summary', 'findings']) {
  if (!(k in data)) errors.push('missing top-level key: ' + k);
}
const findings = Array.isArray(data.findings) ? data.findings : [];
const ids = findings.map(f => f.id);
if (new Set(ids).size !== ids.length) errors.push('duplicate finding ids');

// required per-finding fields
const REQ = ['id','rule_id','dimension','title','severity','severity_rationale',
  'confidence','autofix','location','evidence','root_cause','fix','target_file',
  'acceptance_criteria','depends_on','fingerprint'];
for (const f of findings) {
  for (const k of REQ) if (!(k in f)) errors.push(`${f.id || '?'}: missing field ${k}`);
  if (Array.isArray(f.acceptance_criteria) && f.acceptance_criteria.length === 0)
    errors.push(`${f.id}: acceptance_criteria is empty`);
}

const s = data.summary || {};
if (s.total != null && s.total !== findings.length)
  errors.push(`summary.total ${s.total} != findings ${findings.length}`);

if (s.by_severity) {
  const c = {};
  for (const f of findings) c[f.severity] = (c[f.severity] || 0) + 1;
  for (const k of Object.keys(s.by_severity))
    if ((c[k] || 0) !== s.by_severity[k])
      errors.push(`by_severity[${k}] ${s.by_severity[k]} != actual ${c[k] || 0}`);
}

if (Array.isArray(s.apply_order) && s.apply_order.length) {
  const a = [...s.apply_order].sort();
  const b = [...ids].sort();
  if (a.length !== b.length || a.some((x, i) => x !== b[i]))
    errors.push('apply_order is not a permutation of finding ids');
}

// depends_on DAG
const g = {};
for (const f of findings) g[f.id] = Array.isArray(f.depends_on) ? f.depends_on : [];
const color = {};
let cycle = false;
function dfs(n) {
  color[n] = 1;
  for (const m of (g[n] || [])) {
    if (!(m in g)) { errors.push(`${n}: depends_on unknown id ${m}`); continue; }
    if (color[m] === 1) cycle = true;
    else if (!color[m]) dfs(m);
  }
  color[n] = 2;
}
for (const n of Object.keys(g)) if (!color[n]) dfs(n);
if (cycle) errors.push('depends_on has a cycle');

// fix.before occurs exactly once in target_file
for (const f of findings) {
  const before = f.fix && f.fix.before;
  const tf = f.target_file;
  if (before && tf) {
    if (!fs.existsSync(tf)) { errors.push(`${f.id}: target_file not found: ${tf}`); continue; }
    const txt = fs.readFileSync(tf, 'utf8');
    let i = 0, c = 0, idx;
    while ((idx = txt.indexOf(before, i)) !== -1) { c++; i = idx + before.length; }
    if (c !== 1) errors.push(`${f.id}: fix.before occurs ${c}x in ${tf} (must be exactly 1)`);
  }
}

if (errors.length) {
  console.log('FAIL:');
  for (const e of errors) console.log('  - ' + e);
  process.exit(1);
}
console.log(`OK: ${findings.length} findings, schema ${data.schema_version}, report is machine-consumable`);
JS
