// Phase 1 acceptance tests. Mirrors docs/phase-1-acceptance-tests.md.
// Exit code 0 only if every test passes.
import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const rd = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const exists = (p) => fs.existsSync(path.join(root, p));
const results = [];
const test = (id, name, fn) => {
  try {
    const problems = fn() || [];
    results.push({ id, name, pass: problems.length === 0, problems });
  } catch (e) {
    results.push({ id, name, pass: false, problems: [String(e.message || e)] });
  }
};
const walk = (dir, skip = []) => {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (skip.some((s) => p.includes(s))) continue;
    e.isDirectory() ? out.push(...walk(p, skip)) : out.push(p);
  }
  return out;
};

const EXPECTED_YEARS = ["home-0-3", "nursery", "lkg", "ukg",
  ...Array.from({ length: 12 }, (_, i) => `class-${String(i + 1).padStart(2, "0")}`)];
const EXPECTED_BOARDS = ["national-early-years", "cbse", "cisce", "nios", "state-boards"];
const EARLY = ["home-0-3", "nursery", "lkg", "ukg"];

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

test("AT-01", "Stage ladder complete", () => {
  const ladder = rd("data/stages/education-stage-ladder.json");
  const ids = ladder.years.map((y) => y.year_id);
  return JSON.stringify(ids) === JSON.stringify(EXPECTED_YEARS) ? [] : [`got ${ids.join(",")}`];
});

test("AT-02", "Board registry complete", () => {
  const reg = rd("data/boards/board-registry.json");
  const ids = reg.boards.map((b) => b.board_id);
  return EXPECTED_BOARDS.filter((b) => !ids.includes(b)).map((b) => `missing board ${b}`);
});

const matrix = [];
for (const b of EXPECTED_BOARDS) for (const y of (b === "national-early-years" ? EARLY : EXPECTED_YEARS)) matrix.push([b, y]);
const skelPath = (b, y) => `data/curriculum/${b}/${b}-${y}-curriculum-skeleton.json`;

test("AT-03", "Skeleton for every (board, year)", () =>
  matrix.filter(([b, y]) => !exists(skelPath(b, y))).map(([b, y]) => `missing ${skelPath(b, y)}`));

test("AT-04", "Skeleton shape validates", () => {
  const validate = ajv.compile(rd("schemas/curriculum-year.schema.json"));
  const problems = [];
  for (const [b, y] of matrix) {
    if (!exists(skelPath(b, y))) { problems.push(`missing ${b}/${y}`); continue; }
    if (!validate(rd(skelPath(b, y)))) problems.push(`${b}/${y}: ${ajv.errorsText(validate.errors)}`);
  }
  return problems;
});

test("AT-05", "Every source_id resolves", () => {
  const reg = rd("data/sources/official-source-register.json");
  const validate = ajv.compile(rd("schemas/official-source-register.schema.json"));
  const problems = validate(reg) ? [] : [ajv.errorsText(validate.errors)];
  const ids = new Set(reg.sources.map((s) => s.source_id));
  for (const f of walk(path.join(root, "data"), ["snapshots"])) {
    if (!f.endsWith(".json") || f.endsWith("official-source-register.json")) continue;
    const txt = fs.readFileSync(f, "utf8");
    for (const m of txt.matchAll(/"(SRC-[A-Z0-9-]+)"/g)) if (!ids.has(m[1])) problems.push(`${path.relative(root, f)} -> unknown ${m[1]}`);
  }
  return [...new Set(problems)];
});

test("AT-06", "Gaps labelled", () => {
  const problems = [];
  for (const [b, y] of matrix) {
    if (!exists(skelPath(b, y))) continue;
    const s = rd(skelPath(b, y));
    if (s.coverage_status !== "sourced" && s.gaps.length === 0) problems.push(`${b}/${y} is ${s.coverage_status} but has no gaps`);
    for (const g of s.gaps) if (!g.gap_id || !g.missing || !g.resolve_from) problems.push(`${b}/${y} gap incomplete`);
  }
  return problems;
});

test("AT-07", "Skill graph integrity", () => {
  const g = rd("data/skill-graph/skill-graph-seed-domains.json");
  const validate = ajv.compile(rd("schemas/skill-graph.schema.json"));
  const problems = validate(g) ? [] : [ajv.errorsText(validate.errors)];
  const ids = new Set(g.nodes.map((n) => n.skill_id));
  for (const e of g.edges) {
    if (!ids.has(e.from)) problems.push(`dangling from ${e.from}`);
    if (!ids.has(e.to)) problems.push(`dangling to ${e.to}`);
  }
  // cycle check on prerequisite edges
  const adj = {};
  for (const e of g.edges.filter((x) => x.type === "prerequisite_of")) (adj[e.from] ||= []).push(e.to);
  const state = {};
  const dfs = (n) => { state[n] = 1; for (const m of adj[n] || []) { if (state[m] === 1) problems.push(`cycle at ${m}`); else if (!state[m]) dfs(m); } state[n] = 2; };
  for (const n of ids) if (!state[n]) dfs(n);
  for (const [b, y] of matrix) {
    if (!exists(skelPath(b, y))) continue;
    for (const sk of rd(skelPath(b, y)).skills) if (!ids.has(sk.skill_id)) problems.push(`${b}/${y} references unknown skill ${sk.skill_id}`);
  }
  for (const t of rd("data/tracks/competitive-and-study-abroad-track-registry.json").tracks)
    for (const d of t.branches_from_skill_ids) if (!ids.has(d)) problems.push(`track ${t.track_id} references unknown skill ${d}`);
  return problems;
});

test("AT-08", "Learner profile schema", () => {
  const validate = ajv.compile(rd("schemas/learner-profile.schema.json"));
  const sample = rd("data/examples/synthetic-learner-profile-sample.json");
  const problems = validate(sample) ? [] : [`sample invalid: ${ajv.errorsText(validate.errors)}`];
  const bad = structuredClone(sample);
  delete bad.guardian_consent;
  if (validate(bad)) problems.push("under-18 profile without guardian_consent was accepted");
  return problems;
});

test("AT-09", "No em or en dashes in authored files", () => {
  const files = walk(root, ["node_modules", ".git", "snapshots", ".next"]);
  return files.filter((f) => /\.(md|json|mjs|js|html|css|txt)$/.test(f))
    .filter((f) => /[\u2013\u2014]/.test(fs.readFileSync(f, "utf8")))
    .map((f) => `dash found in ${path.relative(root, f)}`);
});

test("AT-10", "Unique, descriptive file names", () => {
  const files = ["data", "docs", "schemas", "scripts"].flatMap((d) => walk(path.join(root, d)));
  const seen = {}; const problems = [];
  const generic = /^(data|index|file|untitled|temp|test|output|new)\.(json|md|mjs|js|html)$/i;
  for (const f of files) {
    const b = path.basename(f);
    if (generic.test(b)) problems.push(`generic name ${path.relative(root, f)}`);
    if (seen[b]) problems.push(`duplicate name ${b}`); seen[b] = true;
  }
  return problems;
});

test("AT-11", "No invented NCERT titles in CBSE skeletons", () => {
  const idx = rd("data/sources/derived/ncert-textbook-titles-by-class-2026-10-21.json");
  const problems = [];
  for (const y of EXPECTED_YEARS.filter((x) => x.startsWith("class-"))) {
    const n = String(parseInt(y.slice(6), 10));
    const s = rd(skelPath("cbse", y));
    for (const subj of s.subjects) for (const t of [...(subj.ncert_textbook_titles || []), ...(subj.ncert_hindi_medium_titles || [])]) {
      const all = Object.values(idx.classes[n] || {}).flat();
      if (!all.includes(t)) problems.push(`cbse/${y} title not in NCERT index: ${t}`);
    }
  }
  return problems;
});

test("AT-12", "Track branches present", () => {
  const t = rd("data/tracks/competitive-and-study-abroad-track-registry.json").tracks;
  const need = ["jee-main", "jee-advanced", "neet-ug", "cuet-ug", "upsc-cse", "sat", "act", "ielts", "toefl"];
  const problems = need.filter((n) => !t.find((x) => x.track_id === n)).map((n) => `missing track ${n}`);
  for (const x of t) {
    if (!/^https:\/\//.test(x.official_url)) problems.push(`${x.track_id} no official url`);
    if (!["class-08", "class-09"].includes(x.earliest_start_year)) problems.push(`${x.track_id} bad start ${x.earliest_start_year}`);
    if (!x.branches_from_skill_ids.length) problems.push(`${x.track_id} no branch skills`);
  }
  return problems;
});

test("AT-13", "Risks register covers required areas", () => {
  const txt = fs.readFileSync(path.join(root, "docs/risks-and-legal-register.md"), "utf8").toLowerCase();
  return ["legal route", "children's data", "screen time", "social learning", "low-bandwidth", "outcome evidence"]
    .filter((k) => !txt.includes(k)).map((k) => `risk area missing: ${k}`);
});

let fail = 0;
for (const r of results) {
  console.log(`${r.pass ? "PASS" : "FAIL"} ${r.id} ${r.name}${r.pass ? "" : "\n   - " + r.problems.slice(0, 8).join("\n   - ") + (r.problems.length > 8 ? `\n   ... +${r.problems.length - 8} more` : "")}`);
  if (!r.pass) fail++;
}
console.log(`\n${results.length - fail}/${results.length} passed, files in curriculum matrix: ${matrix.length}`);
process.exit(fail ? 1 : 0);
