# AEO / GEO Playbook (operational summary)

Full evidence + verdicts: `research-dossier.md` §4 and §7. This is the short, actionable version the content + audit procedures cite.

**Mental model:** AEO in 2026 = fundamentals (crawlable SSR HTML + topical authority + freshness + off-site brand mentions + named authors + answer-first prose) plus a few formatting moves. It is NOT a separate discipline and NOT a meaningful traffic channel yet (~1–2% of B2B traffic) — it's a **brand-influence play**. Budget accordingly.

## Proven levers — DO

1. **Discoverability + freshness.** Pages must be in the sitemap with real `lastmod`, SSR'd to full HTML (most AI crawlers — GPTBot, ClaudeBot, PerplexityBot — execute **no JavaScript**), and carry a visible "Last updated" date. Quartic Lab already SSRs; the gap is the blog sitemap exclusion (Phase 1).
2. **Off-page entity building.** ~85% of the brand mentions AI engines ingest come from third-party pages; brand mentions correlate ~3× more with AI citations than backlinks (Ahrefs 0.664 vs 0.218 — correlation, not causation). This is the single biggest gap (thin profile today). → drive `backlink` tasks.
3. **Named human authors** (`Person` schema + visible byline/bio). One of the few corroborated levers. Frame qualitatively — never quote vendor "+X%" figures.
4. **Answer-first chunks, tables, tight lists in VISIBLE HTML.** Engines extract visible prose and ignore hidden schema at answer time. Each H2 = the buyer's literal question; first 1–2 sentences = a self-contained answer.
5. **Original data + opinion density.** Unique facts/stats are preferentially cited. → `add-blog` original-research posts.
6. **Per-engine source strategy.** Only ~11% domain overlap between ChatGPT and Perplexity. Gemini → brand-owned + editorial roundups; ChatGPT → third-party/directories; Perplexity → Reddit/reviews; Google AI → YouTube. Don't assume one placement covers all engines.

## Hype / DO NOT (these are tasks the brain must never generate)

- `llms.txt` — dead lever, no engine fetches it.
- More schema to chase citations — causal tests show no uplift. Keep existing schema as infrastructure only.
- Keyword-stuffed FAQs / "mention-density" theater.
- Chasing Reddit/Wikipedia for bottom-funnel B2B agency queries (they win broad queries, not "AI development company" specifics — niche directories + industry blogs win there).
- Treating "rank #1 = cited" as true (decoupled; ~90% of ChatGPT citations come from URLs ranked 21+). Do classic SEO AND off-site presence.

## How the content procedures apply this

- `p3-content-draft`: answer-first intro (3-sentence rule), question-format H2s, ≥1 comparison/cost `<table>`, named author, real sources, cross-links to the service pillar.
- `p1-audit`'s AEO block scores a page on: answer-first first paragraph, question H2s, `Person` author, visible "Last updated", in-sitemap, SSR full-HTML.
- Measurement: track **visibility rate** (% of panel prompts where the brand appears across many runs), never a single AI "rank" (lists repeat <1% run-to-run).
