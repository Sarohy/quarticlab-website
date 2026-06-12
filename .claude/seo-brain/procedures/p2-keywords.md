# p2 — Keyword & Cluster Map

Produce grouped, long-tail, high-intent keyword clusters for both Google SEO and AEO (conversational AI queries). Quality over quantity: max 10 clusters total. Seed from the dossier's cluster map (§6) so this is anchored, not invented from scratch.

## Inputs
1. `research-dossier.md` §6 (content-cluster map across the 8 service areas) — the starting blueprint.
2. `site-memory.md` — Niche, audience, Published pages, existing Content queue (don't duplicate active clusters).
3. `outputs/keyword-clusters.md` if it exists — don't re-emit still-active clusters.
4. If GSC is live (`site-memory` → GSC Status: live), read the latest `inputs/gsc-*` export and fold in real queries the site already gets impressions for (these are the highest-confidence clusters — prioritize them).

## Constraints
- **Long-tail only** — every keyword 4+ words or a full question. No head terms.
- **Map to a real pillar** — each cluster ties to one `/services/<slug>` pillar (commercial) or proposes a `blogs` post (informational). Keep clean boundaries (don't blur AI ↔ blockchain).
- **High intent** — searcher is comparing, costing, or hiring.
- **Cluster size** 3–5 terms. **Total ≤ 10.**

## Output → `outputs/keyword-clusters.md` (overwrite)
```markdown
# Keyword Clusters — <YYYY-MM-DD>
> Pillars: the 8 /services/<slug> pages. Source: dossier §6 + (GSC if live).

## Google SEO Clusters
### G1 — <name>
- Intent: Informational / Commercial / Transactional
- Pillar: `/services/<slug>` (or "new blogs post")
- Suggested page type: blog post / comparison / cost page / service pillar
- Target page: <existing URL or "new">
- Keywords:
  - <long-tail 1>
  - <long-tail 2>
  - <long-tail 3>

## AEO Clusters (AI-assistant queries)
### A1 — <name>
- Intent + Pillar + Suggested type (FAQ-bearing blog / comparison)
- Conversational queries (full sentences a buyer asks ChatGPT/Perplexity):
  - "<question 1>"
  - "<question 2>"
```

## Selection rules
- Google: prefer `best/top X 2026`, `X vs Y`, `cost to build X`, `hire X developers`, `X development company`.
- Tag commercial/transactional → service pillar; informational → blog cluster.
- AEO: phrase as spoken questions answerable in 1–3 sentences (citable verbatim). Mirror ≥2 AEO clusters to Google clusters so one strong page with a FAQ/answer-first section satisfies both.
- Each cluster gets a one-line "why winnable" note (low competition / existing impressions / topical fit) so `p7` can prioritize.

## End
Print: `Generated <N> clusters → outputs/keyword-clusters.md.`
