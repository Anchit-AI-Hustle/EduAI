# EveryYear Product Architecture

**Status:** Phase 1 design document, 2026-10-22. Venture working name: EveryYear. Tagline: a plan for every year. Repository: ai-school-full-stack. Deployment target: edu-ai.anchit-tandon.com.

**Scope:** Phase 1 is data architecture only: the four JSON Schemas in `/schemas`, curriculum skeletons under `content/curriculum/<board>/<year>/`, a source evidence register, a risks register, CI validators, and a browse-only data explorer. Everything else here is planned, not built. Sections on runtime behaviour describe Phase 2 designs and use "will", "must" and "is designed to".

## 1. Product definition

EveryYear gives each learner one honest plan for every year of education, from home learning at age 0 through Class 12 and into competitive exam preparation. A learner states where they are, what they are working towards, how much time the family can give, and what device and language they have. The system answers with a year plan, a week plan and a day plan: what to study, in what order, for how long, with lessons and practice grounded in a specific version of a specific board's curriculum, and with a parent or mentor kept in the loop. The plan is not a content catalogue. It is a constrained schedule over a shared skill graph, where every syllabus claim traces to a dated official source and every learner measurement is append-only evidence. When an official syllabus changes, the plan is reconciled, not silently rewritten.

The promise: a plan for every year, not a video library; every syllabus claim sourced or labelled a gap; the plan adapts to the learner while its curriculum version stays pinned until a release is approved; Hindi and English first-class from day one; the parent sees plan, progress and changes and controls consent and screen time; learner data minimised, retained briefly, exportable and erasable.

Not promised: EveryYear does not replace a school, does not certify or examine, does not claim outcome improvement before measured evidence, and does not set board policy. These are product requirements that constrain UI claims, not marketing caveats.

## 2. Personas and permissions

| Persona | Job | Sees | Can do | Must not do |
|---|---|---|---|---|
| Student | Follow today's plan, practise, take tests, ask for a hint | Own plan, lessons, attempts, own mastery, relevant changelog | Answer, submit, request re-plan, flag confusion | See other learners, change board alone, edit content |
| Parent or guardian | Hold consent, verify the plan is real, control screen time | Weekly digest, plan summary, screen time against cap, curriculum changelog, consent settings | Grant or withdraw scopes, set caps, export or delete, message mentor | Impersonate learner, read private notes, see other children |
| Teacher or mentor | Review escalations, grade subjective work | Assigned cohort, flagged sessions, submissions, rubric | Approve or adjust deviations, score subjective work, flag content | Publish curriculum, see unrelated cohorts |
| Curriculum editor | Own one board and year band, keep it sourced and coherent | Editorial workspace, source register, diffs, proposals, coverage and gap reports | Draft mappings, approve low-risk changes, release with second approval, roll back | Change learner state, approve own major release |
| Admin | Keep the system healthy and auditable | Job health, releases, eval results, aggregate metrics, audit log | Manage jobs and flags, trigger rollback, manage roles | Read learner content without a consent scope and logged break-glass reason |

Roles are enforced server-side at route handlers and in row-level security views; the UI only hides what a role cannot do. Consent scopes are separate from roles: a parent holds consent, a mentor holds delivery rights, and both are checked independently.

## 3. End-to-end journeys

Journeys are state machines because most Phase 2 defects will be state defects: a diagnostic resumed twice, a plan accepted after its content version was superseded, an attempt submitted after timeout.

### 3.1 Onboarding and diagnostic

`profile-draft` -> `consent-pending` -> `consent-granted` -> `diagnostic-in-progress` -> `placed` -> `plan-draft`.

The profile captures only what the schemas allow: board, year, certification route, instruction language, home languages, device and bandwidth, guardian consent for minors, screen time cap, retention preference. No full date of birth, address, government identifier or free-text health data; birth is year and month only.

The diagnostic is per skill domain, not per grade. It starts at the age-typical level for the declared year and walks up or down on an adaptive staircase until each domain's estimate stabilises or the item budget is spent. Output is `placed_year_by_skill` plus per-domain confidence. Low confidence does not produce a false placement: the year plan opens with a two-week probe block whose sessions are labelled as diagnostics, and the plan is regenerated afterwards. An abandoned diagnostic resumes from the last answered item because responses are stored per item.

### 3.2 Year plan generation

Inputs: profile, placement, pinned curriculum version, family calendar, daily minute budget, term boundaries, goals and track interests. Output: terms, weeks and sessions.

Invariants checked before acceptance: (1) every session maps to a `skill_id` in the pinned curriculum version; (2) prerequisite order holds over the skill graph, except in sessions explicitly marked as probes; (3) weekly minutes stay within the learner's cap with a default 15 percent buffer; (4) every session references a grounded lesson or an explicit `gap` label, visible to learner and parent as unsourced material; (5) the plan pins `curriculum_version_id` and records `algorithm_version`, and nothing resolves "latest" at runtime.

States: `draft` -> `in-review` (when a mentor or guardian must review, for example after a large placement change) -> `accepted` -> `superseded`. An accepted plan is immutable. Changes create a new version and a diff the parent can read.

### 3.3 Weekly plan and rebalancing

The week view is derived from the accepted year plan, not authored separately. Rebalancing runs when a week closes with missed sessions, when a unit test shows mastery far from expectation, or when the learner's minute budget changes. Must-do sessions (board-mandated content) move first, should-do compress, stretch drops first. Rebalancing stays inside the current term and re-runs the invariants. The system never silently deletes a must-do session; it moves it or raises a visible conflict for a mentor.

### 3.4 Daily lesson loop

Session states: `scheduled` -> `opened` -> `explained` -> `practised` -> `checked` -> `closed`, with `skipped` and `paused` adjacent. The loop is time-boxed and screen-time aware: short objective, grounded explanation, one worked example, three to eight practice items, a check. The LLM layer may rephrase, hint, translate and generate practice variants inside the lesson's declared scope, but may not introduce a syllabus claim. Generated text stating a curriculum fact must carry `source_ids` from the lesson's evidence set, or the variant is discarded and the deterministic fallback renders: the sourced extract plus a fixed hint ladder, always available, including offline. Each transition emits an evidence event. A closed session with a check produces mastery evidence; a skipped session produces only a scheduling signal.

### 3.5 Unit test, term exam and board mock

Unit tests are session-sized and drawn from the item bank for the unit's skills. Term exams cover the term's skills against a blueprint weighted by the curriculum version's scheme notes. Board mocks use the paper pattern of the target exam year only where the pattern is sourced; otherwise the mock is labelled "pattern not verified" and cannot be presented as a board simulation. All three share rules: no LLM in the attempt path, server-side timing, autosave per response, immutable submissions, deterministic objective scoring, rubric plus human reviewer for subjective work, and attempts stamped with curriculum and item bank versions. An attempt is evidence about skills, not a report card grade.

### 3.6 Parent view

A weekly digest with five items: what was planned, what happened, what the learner struggled with at skill level, what changed in the curriculum version, and one concrete action for the parent. The digest defaults to weekly and can be turned off. The parent also sees screen time against cap, consent scopes and their history, the changelog affecting their child, and export and delete controls. No real-time location, no continuous monitoring feed, no comparison against other children.

## 4. Module map and phase boundaries

| Module | Phase | Responsibility | Depends on |
|---|---|---|---|
| Schema suite and validators | 1 | Define the four content contracts, validate every content file in CI, fail the build on violation | Nothing |
| Curriculum skeletons | 1 | One file per board per year with sourced status, gaps and machine-readable unknowns | Schemas |
| Source evidence register | 1 | Dated source records, retrieval status, snapshots, the `source_id` namespace | Nothing |
| Browse-only data explorer | 1 | Read-only rendering of skeletons, gaps, sources, coverage; no AI, no learner state | Skeletons |
| Skill graph builder | 1 and 4 | Seed domain graph in Phase 1; track branches as `exam-track-domain` nodes in Phase 4 | Source register |
| Diagnostic engine | 2 | Adaptive placement per skill domain with confidence | Graph, item bank |
| Year plan generator | 2 | Constraint solver over the graph with invariant checks and version pinning | Curriculum version, mastery |
| Daily lesson loop | 2 | Grounded delivery, hints, offline fallback, evidence emission | Lesson content, LLM gateway |
| Assessment engine and item bank | 2 | Item storage, blueprint generation, deterministic scoring, rubric workflow | Curriculum version, graph |
| Mock exam engine | 2 | Full-paper simulation with sourced patterns only | Assessment engine |
| Parent and guardian app | 2 | Consent, digest, screen time, changelog, export and delete | Consent records |
| Hindi and English UI | 2 | Locale routing, ICU messages, bilingual content fields, reviewed Hindi | All UI modules |
| Responsive app on Vercel | 2 | Server-rendered shell, installable web app, offline packs | All above |
| Deepening pipeline | 3 | One board and one grade band to unit and competency depth with full source trace | Editors, ingestion |
| Track branches | 4 | JEE, NEET, CUET, UPSC, SAT, ACT, IELTS, TOEFL off the skill graph | Graph, assessment engine |

Phase 4 is not a content rewrite. A track is a set of track-domain nodes, prerequisite edges into school-level nodes, and assessment blueprints. A track needing content no school node provides is a graph change and goes through the same review as any other.

## 5. Canonical data model

Two kinds of data exist and must never mix. **Content** is versioned, sourced, reviewed and immutable once released, stored as JSON in git under `content/curriculum/<board>/<year>/`. **Learner state** is append-only events in Postgres, projected into read models. A plan is a derived artifact that pins a content version.

### 5.1 The four schemas

| Schema file | Contract | Owns | Fails at | Breaks if wrong |
|---|---|---|---|---|
| `learner-profile.schema.json` | One learner, data-minimised, with consent for minors | Identity, birth year-month, languages, enrolment, placement, mastery snapshot, device and bandwidth, screen time policy, parent view prefs, retention | Profile save and every mastery projection | Wrong-year plans, consent bypass, over-collection |
| `skill-graph.schema.json` | Board-independent graph of domains, subdomains, units, competencies, track domains | Node identity, bilingual labels, level and kind, prerequisite and part-of edges, edge basis | Graph lint: cycles, orphans, unknown endpoints | Incoherent prerequisite order |
| `curriculum-year.schema.json` | One board, one year, one academic session | Subjects, skill coverage and depth, term and weekly structure, daily lesson template, assessment blocks, co-curricular, parent view sections, source ids, gaps | CI validation and content load | Planning skills the curriculum does not cover, unsourced mock patterns |
| `assessment.schema.json` | Items, blueprints and paper patterns | Item text, type, skill ids, difficulty, marks, time, answer key or rubric, source ids, review status | Item validation before bank entry | Untraceable or unanswerable items, fake board patterns |

Shared conventions matter more than any single field: every content object carries `source_ids` in the `SRC-` namespace or is explicitly marked a product default; status is never implicit; unknown material is a gap with an owner phase, not an omission.

### 5.2 How the pieces link

```
learner-profile.schema.json
  enrolment.board_id ----------+
  enrolment.current_year_id ---+--> content/curriculum/<board>/<year>/
  skill_mastery[].skill_id ----+            |
  placement.placed_year_by_skill            | validated by
                                            v
                                curriculum-year.schema.json
                                            |
                      subjects[].skill_ids, skills[].skill_id
                                            v
                                skill-graph.schema.json
                                            ^
                      assessment.schema.json items[].skill_id
                                            |
                      every content object's source_ids
                                            v
                                source evidence register
```

Linking is by identifier, never by title. The curriculum year lists skills; the graph gives their order; the assessment schema attaches items to the same ids; the learner profile records mastery against them. A skill id is the only join key between content and learner state, which is what lets a learner move between boards without losing mastery history.

### 5.3 Runtime entities (Phase 2, not schema files)

These are Postgres tables with JSONB payloads and are not added to `/schemas`.

| Entity | Key fields | Rules |
|---|---|---|
| Year plan | `plan_id`, `learner_id`, `curriculum_version_id`, `algorithm_version`, `status`, `terms[]` | Immutable once accepted; superseding inserts a new row and a diff |
| Session | `session_id`, `plan_id`, week, day, `skill_ids[]`, `lesson_ref`, minutes, priority, `state` | Unique per plan, week, day, slot |
| Attempt | `attempt_id`, `learner_id`, `assessment_id`, `curriculum_version_id`, times, responses, `scored_by` | Append-only after submit; scorer identity recorded |
| Evidence event | `event_id`, `learner_id`, `skill_id`, `kind`, `value`, `occurred_at`, `source_ref`, `idempotency_key` | Insert-only; idempotent on key |
| Consent record | `consent_id`, guardian ref, scopes, `notice_version`, `granted_at`, `withdrawn_at` | Withdrawal blocks new processing and starts retention clock |
| Audit event | `audit_id`, actor, role, action, target, reason, `occurred_at` | Insert-only, retained longer than learner data |

### 5.4 Privacy shape of the model

Children's data drives every choice. Collection is minimised to what the plan needs: no name required (optional nickname, capped), no address, no phone, no government identifier, no precise birth date, no contact uploads. Consent is per scope, versioned by notice version, withdrawable. No ads, no third-party trackers in the learner experience, no sale or sharing of learner data. Retention is a field, not a document: inactive learners are scheduled for erasure. Export and delete are API operations, not support tickets. Real learner data stays out until consent flows are reviewed against the legal register and the founder approves.

## 6. Technical architecture

**Application.** Next.js App Router, TypeScript, on Vercel. Server components render curriculum pages and the explorer from validated JSON. Route handlers implement section 7. Long-running jobs (source watching, cohort plan generation, eval runs) run as scheduled jobs or CI workflows with idempotent handlers, never inside a request handler.

**Content pipeline.** `content/` in git is the single source of truth. CI validates each file, lints the graph and fails on a broken `source_id`. A release produces a manifest with a content hash per file and a release version, loaded into Postgres as an immutable content version that the app reads by id. Popular board-year pages may be pre-rendered, but the authoritative read is versioned, so a cached page cannot outlive its version unknowingly.

**LLM layer.** All model calls go through a provider interface with a narrow contract: task name, retrieved context, output schema, budget, deterministic fallback. Product code gets no free-form chat method. Each output stores model id, prompt version, context ids and cited `source_ids`. On failure, timeout, budget breach or schema violation, the deterministic path renders. Model choice is configuration, not code; a model change is reviewed with an eval run.

**Storage.** Postgres for learner state, content versions, proposals, releases and audit log. Object storage for source snapshots and generated media. No learner-identifying data in URLs, logs or analytics. Backups encrypted and held to the same retention limits. Cache storage only for rate limits and idempotency, never as truth.

**i18n.** Locale-prefixed routes (`/en`, `/hi`). ICU messages with reviewed Hindi, not shipped machine output. Content carries `label_en` and `label_hi`; a missing Hindi label is a visible fallback, not a silent English page. Subset and preload Devanagari fonts. Localise numbers, dates and session format. Language is per user, and the learner and parent digest may differ.

**Observability.** Structured logs with request ids and no content payloads, error tracking with release tags, source-watch health page, dashboards for plan generation latency, lesson load on constrained networks, LLM fallback rate, eval pass rate and content coverage. Phase 2 SLOs: plan generation p95 under 4 seconds, lesson first paint p95 under 2.5 seconds on throttled 3G, error rate under 0.5 percent. Alerts go to the builder, not families.

**Safety.** Preview deployments use synthetic learners only. Feature flags gate every AI-backed surface, and a global killswitch falls back to sourced content and static plans.

## 7. API surface for Phase 2 route handlers

Conventions: JSON, UUIDs, ISO 8601 timestamps, `Idempotency-Key` on writes, cursor pagination, `ETag` on content reads, one error envelope `{"error": {"code", "message", "trace_id"}}`. Session auth uses an httpOnly cookie; role and consent scope are checked server-side.

| Method and path | Purpose | Request | Response |
|---|---|---|---|
| `POST /api/diagnostic/sessions` | Start or resume | `{learner_id, domains[], budget_items}` | `{session_id, first_item, expires_at}` |
| `POST /api/diagnostic/sessions/{id}/responses` | Submit one item | `{item_id, response, client_elapsed_ms, idempotency_key}` | `{next_item, progress}` |
| `POST /api/diagnostic/sessions/{id}/finalize` | Place learner | `{}` | `{placed_year_by_skill, confidence, probe_weeks}` |
| `POST /api/plans/year` | Generate a plan | `{learner_id, curriculum_version_id, constraints, goals[]}` | `{plan_id, status, gaps[]}` |
| `GET /api/plans/{plan_id}` | Read plan and week | query `?week=` | `{plan, sessions[], version}` |
| `POST /api/plans/{plan_id}/accept` | Accept draft | `{expected_revision, reviewer_id?}` | `{plan_id, accepted_at, supersedes}` |
| `GET /api/plans/{plan_id}/today` | Today card | none | `{sessions[], minutes_remaining, screen_budget}` |
| `POST /api/sessions/{id}/events` | Append evidence | `{event, occurred_at, idempotency_key}` | `{accepted, applied_to_mastery}` |
| `GET /api/content/{board}/{year}` | Read pinned year | query `?version=` | `{version, etag, curriculum_year, gaps[]}` |
| `POST /api/attempts` | Start assessment | `{learner_id, assessment_id, blueprint_id}` | `{attempt_id, items[], duration_s}` |
| `POST /api/attempts/{id}/submit` | Submit attempt | `{responses[], client_submitted_at}` | `{attempt_id, score, evidence_count}` |
| `POST /api/mocks` | Generate mock | `{learner_id, exam_id, pattern_version}` | `{mock_id, sections[], marks, duration_s}` |
| `GET /api/parent/digest` | Weekly digest | query `?week=` | `{planned, completed, struggles[], changes[], action}` |
| `POST /api/consent` | Grant or withdraw | `{learner_id, scopes[], notice_version, action}` | `{consent_id, effective_scopes}` |
| `GET /api/export`, `DELETE /api/learner` | Export or erase | `{learner_id, confirmation}` | job handle |

Example plan response (abridged):

```json
{
  "plan_id": "018f6c2a-...",
  "status": "draft",
  "curriculum_version_id": "cbse-class-06@2026.1.0",
  "algorithm_version": "planner-0.3",
  "terms": [{"term_id": "t1", "weeks": [{"week": 1, "sessions": [
    {"session_id": "018f6c31-...", "day": 1, "skill_ids": ["num-fractions-equivalence"],
     "lesson_ref": "lesson:cbse-06-math-frac-01", "minutes": 25,
     "priority": "must-do", "grounding": "sourced"}]}]}],
  "invariants_checked": ["prerequisite-order", "minute-budget", "source-grounding"],
  "gaps": []
}
```

The response carries its invariant list deliberately. A plan that cannot say which invariants it passed gives the parent no reason to trust it.

## 8. Why Phase 1 data architecture comes before AI generation

1. **Evaluation needs ground truth.** A generated lesson can only be judged against a curriculum that says what it must teach and which source supports it. Without schemas and sourced skeletons there is nothing to measure, only opinion.
2. **Generation multiplies whatever sits beneath it.** Strong schemas over weak content produce confidently wrong lessons at scale. Sourced skeletons with labelled gaps make "not yet sourced" a possible, honest answer.
3. **Version pinning is cheap now and expensive later.** Retrofitting version ids after learners hold plans means reconciling histories nobody kept.
4. **Legal and safety constraints are schema decisions.** Data minimisation, consent scopes and screen time caps belong in the profile contract. Adding them after the first real profile is a migration with legal exposure.
5. **Failure isolation.** Phase 1 failures are schema violations and broken source ids, caught in CI. Phase 2 failures land in a learner's week, so the plan and evidence model must be correct before anything adapts.

## 9. Failure modes and containment

| Failure | Symptom | Containment | Detection |
|---|---|---|---|
| Unsourced syllabus claim by model | Confident text, no source span | Output discarded unless it cites `source_ids` already in the lesson; deterministic extract renders instead | Grounding check per generation; eval fact set |
| Content changes after plan accepted | Lesson no longer matches pinned curriculum | Version pinning; superseding release triggers reconciliation proposal, not silent swap | Plan and content version mismatch |
| Infeasible plan for the family | Repeated missed weeks, frustration | Priority tiers, 15 percent buffer, weekly rebalance, visible conflict instead of forced deletion | Missed-session rate and conflict count |
| Prerequisite violation | Fractions before place value | Topological validator at generation; plan rejected with machine-readable reason | Invariant list in plan response |
| Child data in logs or analytics | Identifiers or content in log lines | Log allowlist, no content payloads, URL-safe ids, analytics deny list | Log scan in CI and recurring audit |
| LLM outage or cost spike | Hangs, budget burn | Circuit breaker, per-learner daily budget, deterministic fallback, killswitch | Fallback rate and spend alerts |
| Assessment integrity on shared device | Copied answers, gamed timing | No LLM in attempt path, server clock, randomised order, autosave | Attempt anomaly report |
| Hindi quality regression | Awkward or wrong Hindi | Reviewed catalogue, glossary, Hindi eval set in CI | Eval pass rate per release |
| Offline pack stale | Study from outdated lesson | Pack version and expiry; reconciliation prompt on reconnect | Pack version check |
| Parental over-monitoring | Constant checking, pressure on child | Weekly digest default, no real-time feed, skill-level signals only | Flag review and UI review |
| Graph drift after Phase 4 branches | Track prerequisites point at removed nodes | Graph lint in CI; no node deletion without alias and migration record | Orphan and cycle detection |

## 10. Open questions for Phase 2 planning

1. Who is the named human reviewer for material plan deviations: a mentor per cohort, or the parent with mentor escalation?
2. Does the parent digest default to weekly for every age, or daily for foundational years where a caregiver operates the device?
3. What are the exact probe length and item budget per domain, and who signs off item quality before a child sees it?
4. When a learner changes board mid-year, which skills are treated as equivalent for mastery carry-over?
5. Which learning-gain metric is defensible to show a parent without overclaiming: within-learner pre and post unit comparison, or a delayed retention check?
