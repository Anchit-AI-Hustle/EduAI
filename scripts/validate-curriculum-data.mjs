import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const ROOT = process.cwd();

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), "utf8"));
}

const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });

const learnerSchema = readJson("schemas/learner-profile.schema.json");
const skillGraphSchema = readJson("schemas/skill-graph.schema.json");
const curriculumYearSchema = readJson("schemas/curriculum-year.schema.json");
const sourceCatalogSchema = readJson("schemas/official-source-catalog.schema.json");
const assessmentSchema = readJson("schemas/assessment-blueprint.schema.json");

const validateLearner = ajv.compile(learnerSchema);
const validateSkillGraph = ajv.compile(skillGraphSchema);
const validateCurriculumYear = ajv.compile(curriculumYearSchema);
const validateSourceCatalog = ajv.compile(sourceCatalogSchema);
const validateAssessment = ajv.compile(assessmentSchema);

let failures = 0;

function check(label, valid, errors) {
  if (!valid) {
    console.error(`FAIL: ${label}`, JSON.stringify(errors, null, 2));
    failures++;
  }
}

const sourceCatalog = readJson("content/sources/official-source-catalog.json");
check("official-source-catalog.json", validateSourceCatalog(sourceCatalog), validateSourceCatalog.errors);

const validSourceIds = new Set(sourceCatalog.sources.map((s) => s.sourceId));

const skillGraph = readJson("content/skill-graph/shared-skill-graph.json");
check("shared-skill-graph.json", validateSkillGraph(skillGraph), validateSkillGraph.errors);

const validSkillIds = new Set(skillGraph.skills.map((s) => s.id));

const adj = new Map();
for (const s of skillGraph.skills) {
  adj.set(s.id, []);
  for (const p of s.prerequisites || []) {
    if (!validSkillIds.has(p)) {
      console.error(`FAIL: Unknown prerequisite ${p} in skill ${s.id}`);
      failures++;
    }
  }
  for (const align of s.boardAlignments || []) {
    if (!validSourceIds.has(align.sourceId)) {
      console.error(`FAIL: Unknown sourceId ${align.sourceId} in skill ${s.id}`);
      failures++;
    }
  }
}
for (const e of skillGraph.edges) {
  if (!validSkillIds.has(e.from) || !validSkillIds.has(e.to)) {
    console.error(`FAIL: Edge endpoint missing: ${e.from} -> ${e.to}`);
    failures++;
  } else {
    adj.get(e.from).push(e.to);
  }
}

const visited = new Set();
const inStack = new Set();
function hasCycle(node) {
  if (inStack.has(node)) return true;
  if (visited.has(node)) return false;
  visited.add(node);
  inStack.add(node);
  for (const next of adj.get(node) || []) {
    if (hasCycle(next)) return true;
  }
  inStack.delete(node);
  return false;
}
for (const id of validSkillIds) {
  if (hasCycle(id)) {
    console.error(`FAIL: Cycle detected in skill graph involving ${id}`);
    failures++;
  }
}

const learners = readJson("content/learners/synthetic-learner-profiles.json");
for (const l of learners) {
  check(`learner ${l.learnerId}`, validateLearner(l), validateLearner.errors);
}

const assessmentBank = readJson("content/assessments/diagnostic-and-mock-bank.json");
check("diagnostic-and-mock-bank.json", validateAssessment(assessmentBank), validateAssessment.errors);

for (const item of assessmentBank.diagnosticItems) {
  if (!validSkillIds.has(item.skillId)) {
    console.error(`FAIL: Diagnostic item ${item.itemId} references unknown skill ${item.skillId}`);
    failures++;
  }
  for (const src of item.sourceIds) {
    if (!validSourceIds.has(src)) {
      console.error(`FAIL: Diagnostic item ${item.itemId} references unknown source ${src}`);
      failures++;
    }
  }
}

const expectedYears = new Set([
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
]);
const foundYears = new Set();

const curriculumDir = path.join(ROOT, "content/curriculum");
let totalFiles = 0;
for (const board of fs.readdirSync(curriculumDir)) {
  const bPath = path.join(curriculumDir, board);
  if (!fs.statSync(bPath).isDirectory()) continue;
  for (const file of fs.readdirSync(bPath).filter((f) => f.endsWith(".json"))) {
    const rel = `content/curriculum/${board}/${file}`;
    const doc = readJson(rel);
    totalFiles++;
    foundYears.add(doc.yearId);
    check(rel, validateCurriculumYear(doc), validateCurriculumYear.errors);
    for (const sid of doc.skillIds) {
      if (!validSkillIds.has(sid)) {
        console.error(`FAIL: ${rel} references unknown skillId ${sid}`);
        failures++;
      }
    }
    for (const src of doc.sourceIds) {
      if (!validSourceIds.has(src)) {
        console.error(`FAIL: ${rel} references unknown sourceId ${src}`);
        failures++;
      }
    }
  }
}

for (const y of expectedYears) {
  if (!foundYears.has(y)) {
    console.error(`FAIL: Missing curriculum skeleton for year ${y}`);
    failures++;
  }
}

if (failures > 0) {
  console.error(`Validation failed with ${failures} error(s).`);
  process.exit(1);
}

console.log(
  `Validation PASSED: ${totalFiles} board-year files, ${expectedYears.size}/16 stages covered, ${skillGraph.skills.length} DAG skills verified, ${sourceCatalog.sources.length} primary sources verified.`
);
