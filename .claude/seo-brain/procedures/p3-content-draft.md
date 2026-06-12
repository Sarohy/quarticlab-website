# p3 — Content Drafter

Produce one publish-ready draft from a keyword cluster, optimized for Google ranking AND AI citation, in THIS repo's Firestore `blogs` shape. No `publish_blog.py` exists here — publishing is a manual Firestore add (covered in `p8`).

## Inputs
1. The cluster passed by the orchestrator (from `outputs/keyword-clusters.md`). If none, ask which cluster and stop.
2. `site-memory.md` — niche, audience, voice, the service pillar to cross-link.
3. `knowledge/aeo-playbook.md` — apply the answer-first + table + author rules.

## Step 0 — Deep research BEFORE writing (mandatory)
Do not write from general knowledge. Run 4–6 `WebSearch` queries (latest trends / statistics+data / real examples / expert quotes / common mistakes / agency-angle best practices), then `WebFetch` 2–3 highest-signal sources (analyst reports, dev surveys, vendor benchmarks). Extract: stats with attribution `(Source, Year)`, named real examples, expert quotes (name/title/company), technical depth competitors skip, counter-arguments. **Never invent a stat.** Cite ≥3 distinct sources in the draft.

## Required structure (in order)
1. **Front matter** (in the .md, not published): slug (≤60 chars), primary keyword, secondary keywords, page type, target pillar to link.
2. **H1** — contains primary keyword, ≤70 chars, natural.
3. **Meta title** — ≤60 chars, keyword near front.
4. **Meta description** — ≤155 chars, keyword once, soft CTA. (→ Firestore `metaDescription`.)
5. **Intro (3-sentence rule, answer-first)** — S1 answers the page's core question; S2 who it's for; S3 what they'll be able to do. Must read correctly when an AI engine quotes it standalone.
6. **Body — 3–5 H2s.** At least one H2 phrased as the buyer's literal question, answered in the first 2 sentences. 150–300 words each, lead with the claim. Use real semantic `<table>`/`<ul>` where they carry information (tech tradeoffs, pricing tiers, comparison) — never an image of a table.
7. **First-hand Experience block** — a "in our experience building X for client Y…" passage. Insert a `[PERSONALIZE]` marker if specifics are needed:
   `> [PERSONALIZE: one real client/project example — name (or anonymized), what they did, what changed]`
8. **Concrete result marker** — `> [PERSONALIZE: one measurable result — e.g. "cut deploy time 38%"]`
9. **FAQ — 5+ questions.** `## FAQ`, each `### <question as asked>`, each answer one self-contained 2–4 sentence paragraph (citable without surrounding context). Pull ≥2 from the cluster's AEO queries. Keep the markup but know FAQ rich-result snippets are retired (still aids Bing/LLMs).
10. **Conclusion + ONE CTA** (2–3 sentences, single unambiguous CTA → /contact or book-a-call).
11. **Internal links** — 3–5 descriptive-anchor links UP to the service pillar and SIDEWAYS to sibling cluster posts (never "click here"). List them explicitly so `p8` can verify.
12. **Sources** — `### Sources` with the URLs actually fetched (≥3). → Firestore `sources` array.

## Image
This repo has no brand kit / `/brand-image`. For the hero (and any inline diagram that carries information), write a plain instruction block naming the 1200×630 asset + its purpose + destination: the hero becomes the Firestore `heroImage` URL (upload to Firebase Storage). Do not embed `/brand-image` commands.

## Voice — anti-AI rules (non-negotiable)
**Banned phrases:** landscape, paradigm shift, leverage/leveraging, "in today's …", game-changer, "it's important to note", "in conclusion"/"in summary", "unlock/unleash the potential", cutting-edge/state-of-the-art/next-generation, revolutionize, "at the end of the day", dive/delve/deep dive, seamless(ly), robust/comprehensive solution, empower (verbs), journey, synergy.
**Requirements:** 2–4 sentence paragraphs; mix sentence lengths; specifics beat adjectives ("shipped in 38 days" > "shipped fast"); cite or cut every number; cut adverbs (actually/really/very); start sections with the claim, not "Let's explore…"; first-person plural only with a real observation. If a sentence could appear in any company's generic LinkedIn post, rewrite or delete it. **Do NOT pad for length** — see `task-categories.md`.

## Output
```
outputs/content-drafts/<slug>/
└── post.md          ← full draft (sections 1–12)
```
`post.md` is the draft only (front matter at top for the human; everything below it = the body that becomes `contentHtml`).

## End — print exactly:
```
Draft saved: outputs/content-drafts/<slug>/post.md
Grounded in <N> sources.
Before publishing: replace [PERSONALIZE] blocks; create the hero image; then follow p8's "publish to Firestore" steps.
```
