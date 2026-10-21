// Phase 3 Acceptance Tests: CBSE Middle Stage Deepening (Classes 6, 7, 8)
// Verified against NCERT NCF-SE 2023 textbooks: Ganita Prakash, Curiosity, Exploring Society.
// Constraint: zero em dashes (use hyphens).

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const rd = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
const results = [];

const test = (id, name, fn) => {
  try {
    const problems = fn() || [];
    results.push({ id, name, pass: problems.length === 0, problems });
  } catch (e) {
    results.push({ id, name, pass: false, problems: [String(e.message || e)] });
  }
};

const deepening = rd("content/deepening/cbse-middle-stage-chapters.json");
const skillGraph = rd("content/skill-graph/shared-skill-graph.json");
const sources = rd("content/sources/official-source-catalog.json");

test("AT3-01", "Middle Stage Deepening Dataset Schema & Metadata", () => {
  const problems = [];
  if (deepening.boardId !== "cbse") problems.push(`Invalid boardId: ${deepening.boardId}`);
  if (deepening.stage !== "middle-stage-grades-6-8") problems.push(`Invalid stage: ${deepening.stage}`);
  if (!Array.isArray(deepening.classes) || deepening.classes.length !== 3) {
    problems.push(`Expected 3 middle stage classes, found ${deepening.classes?.length}`);
  }
  return problems;
});

test("AT3-02", "Classes 6, 7, 8 Coverage and Screen Time Caps", () => {
  const problems = [];
  const expectedClasses = ["class-06", "class-07", "class-08"];
  const foundIds = deepening.classes.map((c) => c.yearId);
  for (const exp of expectedClasses) {
    if (!foundIds.includes(exp)) problems.push(`Missing class ${exp}`);
  }
  for (const c of deepening.classes) {
    if (typeof c.screenTimeCapMinutes !== "number" || c.screenTimeCapMinutes <= 0 || c.screenTimeCapMinutes > 120) {
      problems.push(`Invalid screenTimeCapMinutes for ${c.yearId}: ${c.screenTimeCapMinutes}`);
    }
  }
  return problems;
});

test("AT3-03", "Official NCERT Ganita Prakash & Curiosity Chapter Counts", () => {
  const problems = [];
  const c06 = deepening.classes.find((c) => c.yearId === "class-06");
  if (!c06) return ["Class 6 not found"];

  const math = c06.subjects.find((s) => s.subjectId === "math-c06");
  if (!math) problems.push("Missing math-c06 in Class 6");
  else if (math.chapters.length !== 10) {
    problems.push(`Expected 10 chapters in Ganita Prakash, found ${math.chapters.length}`);
  }

  const sci = c06.subjects.find((s) => s.subjectId === "science-c06");
  if (!sci) problems.push("Missing science-c06 in Class 6");
  else if (sci.chapters.length !== 12) {
    problems.push(`Expected 12 chapters in Curiosity, found ${sci.chapters.length}`);
  }

  return problems;
});

test("AT3-04", "Tiered Challenge Question Validity (Foundational, Standard, Olympiad)", () => {
  const problems = [];
  for (const cls of deepening.classes) {
    for (const sub of cls.subjects) {
      for (const ch of sub.chapters) {
        const tiers = ["foundational", "standard", "accelerated"];
        for (const tier of tiers) {
          const chg = ch.challenges?.[tier];
          if (!chg) {
            problems.push(`Missing challenge tier '${tier}' in ${ch.chapterId}`);
            continue;
          }
          if (!chg.prompt?.en || !chg.prompt?.hi) {
            problems.push(`Missing bilingual prompt in ${ch.chapterId} tier ${tier}`);
          }
          if (!Array.isArray(chg.options) || chg.options.length < 2) {
            problems.push(`Invalid options array in ${ch.chapterId} tier ${tier}`);
          }
          if (typeof chg.correctIndex !== "number" || chg.correctIndex < 0 || chg.correctIndex >= chg.options.length) {
            problems.push(`Invalid correctIndex (${chg.correctIndex}) in ${ch.chapterId} tier ${tier}`);
          }
          if (!chg.explanation?.en || !chg.explanation?.hi) {
            problems.push(`Missing bilingual explanation in ${ch.chapterId} tier ${tier}`);
          }
        }
      }
    }
  }
  return problems;
});

test("AT3-05", "Skill Graph Cross-Grade Prerequisite Edges", () => {
  const problems = [];
  const skillIdsInGraph = new Set(skillGraph.skills.map((s) => s.id));

  for (const cls of deepening.classes) {
    for (const sub of cls.subjects) {
      for (const ch of sub.chapters) {
        if (!skillIdsInGraph.has(ch.skillId)) {
          problems.push(`Chapter ${ch.chapterId} references unknown skillId: ${ch.skillId}`);
        }
        for (const pid of ch.prerequisiteSkillIds) {
          if (!skillIdsInGraph.has(pid)) {
            problems.push(`Chapter ${ch.chapterId} references unknown prerequisiteSkillId: ${pid}`);
          }
        }
      }
    }
  }
  return problems;
});

test("AT3-06", "DAG Acyclicity (No Cycles in Prerequisite Graph)", () => {
  const adj = new Map();
  for (const s of skillGraph.skills) adj.set(s.id, []);
  for (const e of skillGraph.edges) {
    if (adj.has(e.from)) adj.get(e.from).push(e.to);
  }

  const visited = new Map(); // 0 = unvisited, 1 = visiting, 2 = visited
  let hasCycle = false;
  let cyclePath = [];

  function dfs(node, pathArr) {
    visited.set(node, 1);
    const neighbors = adj.get(node) || [];
    for (const neighbor of neighbors) {
      if (visited.get(neighbor) === 1) {
        hasCycle = true;
        cyclePath = [...pathArr, neighbor];
        return;
      }
      if (!visited.get(neighbor)) {
        dfs(neighbor, [...pathArr, neighbor]);
      }
    }
    visited.set(node, 2);
  }

  for (const s of skillGraph.skills) {
    if (!visited.get(s.id)) {
      dfs(s.id, [s.id]);
      if (hasCycle) break;
    }
  }

  return hasCycle ? [`Cycle detected in DAG: ${cyclePath.join(" -> ")}`] : [];
});

test("AT3-07", "Zero Em Dashes Across Deepening Files", () => {
  const deepContent = fs.readFileSync(path.join(root, "content/deepening/cbse-middle-stage-chapters.json"), "utf8");
  const emDashRegex = /[\u2014\u2013]/g;
  const matches = deepContent.match(emDashRegex);
  return matches ? [`Found ${matches.length} em/en dashes in deepening JSON`] : [];
});

test("AT3-08", "Source Citation Integrity", () => {
  const validSourceIds = new Set(sources.sources.map((s) => s.sourceId));
  const problems = [];
  for (const sid of deepening.officialSources) {
    if (!validSourceIds.has(sid)) {
      problems.push(`Official source '${sid}' not registered in source catalog`);
    }
  }
  return problems;
});

let failed = false;
console.log("\n================ PHASE 3 ACCEPTANCE TESTS ================");
for (const r of results) {
  if (r.pass) {
    console.log(`PASS ${r.id}: ${r.name}`);
  } else {
    console.error(`FAIL ${r.id}: ${r.name}`);
    for (const p of r.problems) console.error(`  - ${p}`);
    failed = true;
  }
}
console.log(`\nSummary: ${results.filter((r) => r.pass).length}/${results.length} passed.`);
if (failed) process.exit(1);
