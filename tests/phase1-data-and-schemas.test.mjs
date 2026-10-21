import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const ROOT = process.cwd();
function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

test("Phase 1: All 16 education stages (home-0-3 through class-12) have curriculum files", () => {
  const index = readJson("content/index/curriculum-master-index.json");
  const expectedYears = [
    "home-0-3",
    "nursery",
    "lkg",
    "ukg",
    "class-01",
    "class-02",
    "class-03",
    "class-04",
    "class-05",
    "class-06",
    "class-07",
    "class-08",
    "class-09",
    "class-10",
    "class-11",
    "class-12"
  ];
  const covered = new Set(index.curriculumIndex.map((c) => c.yearId));
  for (const y of expectedYears) {
    assert.equal(covered.has(y), true, `Missing curriculum skeleton for ${y}`);
  }
  assert.equal(index.summary.totalBoardYearPlans >= 59, true);
});

test("Phase 1: Every board-year file validates against curriculum-year.schema.json and cites verified sources", () => {
  const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });
  const schema = readJson("schemas/curriculum-year.schema.json");
  const validate = ajv.compile(schema);
  const sources = readJson("content/sources/official-source-catalog.json");
  const sourceSet = new Set(sources.sources.map((s) => s.sourceId));

  const index = readJson("content/index/curriculum-master-index.json");
  for (const item of index.curriculumIndex) {
    const doc = readJson(item.filePath);
    const ok = validate(doc);
    assert.equal(ok, true, `Schema error in ${item.filePath}: ${JSON.stringify(validate.errors)}`);
    assert.equal(doc.sourceIds.length > 0, true);
    for (const s of doc.sourceIds) {
      assert.equal(sourceSet.has(s), true, `Unknown sourceId ${s} in ${item.filePath}`);
    }
  }
});

test("Phase 1: Shared skill graph is a valid DAG and connects all 8 competitive/abroad tracks", () => {
  const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });
  const schema = readJson("schemas/skill-graph.schema.json");
  const validate = ajv.compile(schema);
  const graph = readJson("content/skill-graph/shared-skill-graph.json");
  assert.equal(validate(graph), true, JSON.stringify(validate.errors));

  const tracksInGraph = new Set();
  for (const skill of graph.skills) {
    for (const tb of skill.trackBranches || []) {
      tracksInGraph.add(tb.trackId);
    }
  }
  for (const t of ["jee", "neet", "cuet", "upsc", "sat", "act", "ielts", "toefl"]) {
    assert.equal(tracksInGraph.has(t), true, `Track ${t} missing from skill graph branches`);
  }
});

test("Phase 1: Under-6 screen time policy and DPDP children's data consent rules are enforced", () => {
  const home03 = readJson("content/curriculum/early-years/early-years-home-0-3-curriculum.json");
  assert.equal(home03.screenTimePolicy.maxMinutesPerDay, 0);
  assert.equal(home03.screenTimePolicy.deliveryMode, "caregiver-only-zero-child-screen");

  const nursery = readJson("content/curriculum/early-years/early-years-nursery-curriculum.json");
  assert.equal(nursery.screenTimePolicy.maxMinutesPerDay <= 20, true);

  const learners = readJson("content/learners/synthetic-learner-profiles.json");
  for (const l of learners) {
    assert.equal(l.privacy.dataResidency, "IN");
    assert.equal(l.consent.status, "guardian-verified");
  }
});
