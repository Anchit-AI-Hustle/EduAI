# Master Build Prompt for Claude Code: Gyaneon

> Paste everything below this line into Claude Code, opened in the folder that contains this repo (`ai-school-full-stack`). Venture name is a variable: if the founder picks a different name, replace `Gyaneon` everywhere via `VENTURE_NAME` in `config/venture.json`.

---

## 0. Who you are working for and the end goal

You are building **Gyaneon** (नित्यशाला, "the ever-school"): an AI-first learning system that covers a person's whole life of learning, from birth to retirement, in Hindi and English first, built on India's official frameworks, and that keeps itself current as those frameworks and the world change.

End goal, in one line: **any learner, any age, any path (school board, competitive exam, study abroad, vocation, profession, reskilling) gets an individual plan for every year, every week and every day, grounded only in verified sources, that adapts to them in real time and updates itself safely when the source curriculum changes.**

The founder is a solo builder. He wants execution, not questions, except for irreversible decisions (money, data deletion, anything public, account changes, real children's data). He reviews one phase at a time.

## 1. Standing rules (write these into `CLAUDE.md` first, then follow them for the whole project)

1. **Best tool.** Use the most accurate tool or API available. Verify every API, parameter, limit and price against official docs or the connector schema. Never invent.
2. **Input check.** If a task is unclear, rewrite it as a spec (Goal, Users, Inputs, Outputs, Constraints, Acceptance tests, Out of scope, Assumptions). If clear, say so and proceed.
3. **Tests first.** Write acceptance tests before code. Read existing code and data before changing anything. Re-run all earlier tests after every fix.
4. **Never invent curriculum.** Every syllabus fact carries a `source_id` from `data/sources/official-source-register.json`. Unknowns are labelled gaps, never filled by the model.
5. **Every device.** Every UI works at 390px, 820px and 1440px with zero console errors. Capture screenshots and console logs at each size (Playwright).
6. **Deploys.** Every push: CI green. Every Vercel deploy: state READY, live URL loads and works. Show the evidence.
7. **10/10 or stop and report.** Score implementation, approach logic, output accuracy, output quality. 10/10 means all acceptance tests pass, zero console errors, three viewports pass, CI green, deploy READY, live URL checked. If an external limit blocks it, say exactly what and how to clear it.
8. **Delivery format per phase.** Test evidence (logs), the 4 scores, open issues worth fixing, then STOP and wait for "go" before the next phase.
9. **Writing.** No em dashes or en dashes anywhere (code comments, docs, UI copy). Use hyphens. Every downloadable file has a unique descriptive name.
10. **Ask before:** creating or changing any GitHub repo visibility, buying domains, spending money, making anything public, collecting any real learner data, sending any email or message.
11. **Design.** For UI work use the ui-ux-pro-max skill if installed, otherwise the frontend-design skill. Deliberate design pass, no template look.
12. **Self-review.** Before delivering, review your own work as a sceptical reviewer against the spec and list what you would still fix.

## 2. Starting state (already built, read before touching anything)

The repo already contains Phase 1 (data architecture). Run `npm ci && npm run test:phase1` first. Expected: **13/13 pass, 68 curriculum skeletons.**

- `schemas/`: learner profile, skill graph, curriculum year, official source register (JSON Schema 2020-12).
- `data/stages/education-stage-ladder.json`: 16 years (home 0-3, nursery, LKG, UKG, Classes 1-12) with NEP stage, ages, NIOS certification points.
- `data/boards/board-registry.json`: national early years, CBSE, CISCE, NIOS, state boards (placeholder).
- `data/curriculum/<board>/<board>-<year>-curriculum-skeleton.json`: 68 files; CBSE subjects and NCERT textbook titles copied verbatim from the official NCERT index snapshot.
- `data/skill-graph/`: 43 domain nodes, 30 edges, and a board subject to skill map.
- `data/tracks/`: JEE Main, JEE Advanced, NEET UG, CUET UG, UPSC CSE, SAT (domains sourced), ACT, IELTS, TOEFL.
- `docs/risks-and-legal-register.md`: read it. Key facts: NIOS is the realistic certification route for a learner outside school; DPDP Rules 2025 children's-data duties apply from 14 May 2027; under-5 screen time limits; social learning risk.
- `docs/how-indian-curriculum-is-made-and-changed-research-2026-10-21.md`: read it. Your curriculum engine mirrors this governance chain.

Known Phase 1 gaps you inherit: chapter-level content not ingested; CISCE and state board subject lists missing; several official sites blocked from the earlier build sandbox (cbseacademic.nic.in curriculum page, cisce.org, nios.ac.in, NTA, UPSC). You run on the founder's machine, so fetch them directly now.

## 3. Full scope (all ages, all paths)

Build the whole map now as skeletons, then deepen in phases. The life ladder extends Phase 1's 16 school years:

| Band | Years | Official spine to source | Phase |
|---|---|---|---|
| Home 0-3 | 1 | Navchetana (MWCD 2024) | have skeleton |
| Pre-school | 3 | Aadharshila (MWCD 2024), NCF-FS 2022 | have skeleton |
| School | 12 | NCF-SE 2023; CBSE, CISCE, NIOS, state boards | have skeleton |
| Competitive and study abroad | from Class 8-9 | NTA, IITs, NMC, UPSC, College Board, ACT, IELTS, ETS | 4 |
| Higher education | UG, PG | NCrF levels 4.5-8, NHEQF, UGC | 6 |
| Vocation and skills | NSQF levels | NCVET, National Qualifications Register, Sector Skill Council qualification packs | 6 |
| Professions | every occupation | Candidate catalogues to VERIFY before use: National Classification of Occupations (India), ISCO-08 (ILO), O*NET (US), ESCO (EU) | 6 |
| Reskilling and later life | open-ended | NCrF lifelong learning provisions, Academic Bank of Credits | 6 |

**All professions** means a profession graph, not hand-written courses: each occupation maps to required competencies, each competency maps to skill-graph nodes, each node already knows its prerequisites back to school level. A nurse, an electrician, a CA and a data engineer all get a path computed from the same graph. Do not hand-author profession content; ingest official occupational standards and qualification packs, cite them, and label gaps.

## 4. The self-evolving engine (the core of the venture)

"Updates every minute" is right for some layers and dangerous for others. Build five layers with different speeds and different gates:

| Layer | What changes | Speed | Gate |
|---|---|---|---|
| L1 Learner model | Each learner's mastery, pace, next lesson | Every interaction (real time) | Automatic |
| L2 Content quality | Explanations, hints, practice items, examples | Continuous; promote or retire variants daily on measured learning gain | Automatic within guardrails: only items already traced to a source; auto-rollback if gain drops or error reports rise |
| L3 Source watch | Detect any change on official sources (circulars, syllabus PDFs, textbook index, exam bulletins) | As often as the hosting plan allows (verify Vercel cron limits in docs; use GitHub Actions or a worker if finer schedules are needed) | Automatic detection, snapshot and diff only; never edits curriculum |
| L4 Curriculum alignment | What a cohort must learn for a board, exam or qualification | When L3 detects an official change | AI drafts a Change Proposal (diff, affected learners by batch, coherence report); a named human approves; release is versioned and cohort-aware |
| L5 Frontier curriculum | New skills beyond official syllabi (new tools, jobs, research) | Weekly signal scan, quarterly release | Proposal, expert review panel, public changelog. Never alters certification content |

Why the gates: India's own record shows piecemeal edits break coherence and unannounced changes destroy trust (see research doc, section 4). So every L4 and L5 change must pass, before release:

1. **Coherence checks on the skill graph:** no orphaned prerequisites, no cycles, no topic removed in one grade that a later grade depends on.
2. **Load check:** total notional hours per year stay within the NCrF yardstick (1,200 hours = 40 credits) for the stage.
3. **Rationalisation criteria as automated checks:** overlap within the same class across subjects; overlap across classes in the same subject; difficulty; relevance. (These are NCERT's own published criteria, Lok Sabha UQ 156, 18.07.2022.)
4. **Batch rules:** changes apply to the right cohort only (CBSE issues rules per batch, for example Acad-49/2026).
5. **Public changelog:** every change, however small, with date, reason, source and approver. Parents can see what changed for their child.

Mirror the official governance chain as roles in the admin console: Framework (policy), Syllabus committee (subject owners), Oversight (coherence and safety), Board release. One person can hold several roles at the start; the system still records who approved what.

## 5. Architecture (minimal first, then grow)

Verify every library version and API before use. Prefer boring, proven pieces.

- **App:** Next.js (App Router) monorepo deployed on Vercel. Installable PWA with offline lesson packs. Hindi and English from day one (i18n with full Devanagari support).
- **Database:** Postgres via Neon on the Vercel Marketplace (founder's preferred route). Migrations in repo.
- **Curriculum as code:** `data/` stays the source of truth, validated by schemas and tests in CI; loaded into Postgres on deploy. Every curriculum release is a git tag plus a DB version.
- **Core tables:** learners, guardians, consents, skill_nodes, skill_edges, frameworks, framework_versions, curriculum_years, units, competencies, content_items (with source_ids and review_status), assessment_items, attempts (append-only evidence events), mastery_states, plans (year, term, week, day), source_documents, source_snapshots, source_diffs, change_proposals, releases, changelog_entries, occupations, occupation_competencies.
- **AI:** Anthropic API. Look up the current model IDs in docs.claude.com; do not hard-code from memory. Generation is retrieval-grounded: the model only writes lessons and items from ingested official text plus the skill graph, and every output stores the source_ids it used. Keep an evaluation set (accuracy against source, age-appropriateness, Hindi quality, safety) that runs in CI on any prompt change.
- **Apps (one codebase, role-based):** Learner, Parent (consent, weekly view, screen time, changelog), Mentor or teacher, Admin and curriculum council console.
- **Observability:** structured logs, error tracking, a status page for source-watch jobs, a dashboard of learning gain by skill.
- **Privacy by design:** data minimisation (birth year-month only), consent per scope, no ads, no third-party sharing, retention limits, export and delete on request. Synthetic data only until the founder approves real data and legal review is done.

## 6. Phases (do one, show evidence, stop)

| Phase | Build | Acceptance tests (write first) |
|---|---|---|
| 0 Setup | Import Phase 1; `CLAUDE.md` from section 1; CI (lint, schema tests, Playwright); link Vercel project `ai-school-full-stack` to the GitHub repo (repo must be **private**; ask before any visibility change) | Phase 1 tests 13/13 in CI; preview deploy READY |
| 2 Prototype | Diagnostic placement (per skill domain, not per grade), year-plan generator, daily lesson loop, mock exam engine, Hindi and English, parent view, offline pack for one week; synthetic learners only | Placement on 20 synthetic profiles matches expected year within one level; plans generate for all 16 years; 0 console errors at 390, 820, 1440; Lighthouse PWA installable; works offline for a cached week |
| 3 Deepen | Ingest full CBSE Classes 6-8 (new NCERT series complete and stable; R3 rules) to unit and competency level; then extend grade by grade and board by board | 100% of units traced to a source; zero ungrounded items in eval; coherence checks pass |
| 4 Tracks | JEE, NEET, CUET, UPSC foundations, SAT, ACT, IELTS, TOEFL as branches off the skill graph | Each track's syllabus fully sourced; branch nodes connect to school prerequisites |
| 5 Self-evolving engine | L2 to L5 as specified in section 4, with admin council console and public changelog | Simulated official change (fixture circular) flows: detect, diff, proposal, coherence report, approval, cohort-only release, changelog entry; rollback works |
| 6 Lifelong and professions | NCrF and NSQF levels, occupation catalogue, profession paths computed from the graph, Academic Bank of Credits fields (no integration until verified and approved) | 10 sample occupations get a full computed path back to school prerequisites, every competency sourced |
| 7 Pilot readiness | DPDP consent flows checked against the gazette text, safety review, outcome evaluation plan, peer-pod design for social learning | Legal checklist signed off by founder; no real data before this |

## 7. Decisions only the founder makes (ask, never assume)

GitHub repo owner (`anchit-tandon` or `Anchit-AI-Hustle`), domain purchase and which TLD, trademark filing, any public URL, real learner data, payments, any partnership claims, any claim that the product "replaces school" or improves outcomes.

## 8. First reply expected from you

1. Confirm you read the repo, `docs/` and this prompt.
2. Run Phase 1 tests and paste the log.
3. List what you will do in Phase 0, the acceptance tests, and the one decision you need (repo owner). Then wait.
