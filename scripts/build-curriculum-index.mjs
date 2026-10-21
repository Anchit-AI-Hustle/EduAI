import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), "utf8"));
}

const venture = readJson("content/config/venture-config.json");
const sources = readJson("content/sources/official-source-catalog.json");
const skillGraph = readJson("content/skill-graph/shared-skill-graph.json");
const assessmentBank = readJson("content/assessments/diagnostic-and-mock-bank.json");
const evolutionState = readJson("content/evolution/self-evolving-engine-state.json");
const learners = readJson("content/learners/synthetic-learner-profiles.json");

const curriculumDir = path.join(ROOT, "content/curriculum");
const boardDirs = fs.readdirSync(curriculumDir).filter((d) =>
  fs.statSync(path.join(curriculumDir, d)).isDirectory()
);

const curriculumFiles = [];
for (const board of boardDirs) {
  const bPath = path.join(curriculumDir, board);
  const files = fs.readdirSync(bPath).filter((f) => f.endsWith(".json")).sort();
  for (const file of files) {
    const rel = `content/curriculum/${board}/${file}`;
    const data = readJson(rel);
    curriculumFiles.push({
      filePath: rel,
      curriculumVersionId: data.curriculumVersionId,
      boardId: data.boardId,
      boardName: data.boardName,
      yearId: data.yearId,
      yearLabel: data.yearLabel,
      nepStage: data.nepStage,
      ageBandYears: data.ageBandYears,
      groundingStatus: data.groundingStatus,
      maxScreenMinutesPerDay: data.screenTimePolicy.maxMinutesPerDay,
      deliveryMode: data.screenTimePolicy.deliveryMode,
      subjectCount: data.subjects.length,
      skillCount: data.skillIds.length,
      weeklyMinutes: data.weeklyPlanTemplate.totalMinutesPerWeek,
      sessionMinutes: data.dailyLessonTemplate.sessionMinutes,
      sourceIds: data.sourceIds,
      gapCount: data.knownGaps.length
    });
  }
}

const tracksDir = path.join(ROOT, "content/tracks");
const trackFiles = fs
  .readdirSync(tracksDir)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .map((f) => readJson(`content/tracks/${f}`));

const masterIndex = {
  generatedAt: "2026-10-22T00:00:00.000Z",
  venture,
  summary: {
    totalBoardYearPlans: curriculumFiles.length,
    totalBoards: boardDirs.length,
    totalYearsCovered: 16,
    totalSkillsInGraph: skillGraph.skills.length,
    totalSkillEdges: skillGraph.edges.length,
    totalOfficialSources: sources.sources.length,
    totalTracks: trackFiles.length,
    totalDiagnosticItems: assessmentBank.diagnosticItems.length,
    totalMockBlueprints: assessmentBank.mockBlueprints.length
  },
  curriculumIndex: curriculumFiles,
  tracks: trackFiles,
  sources: sources.sources,
  skillGraph,
  assessmentBank,
  evolutionState,
  learners
};

const outPath = path.join(ROOT, "content/index/curriculum-master-index.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(masterIndex, null, 2) + "\n", "utf8");
console.log(
  `Built master curriculum index: ${curriculumFiles.length} board-year files, ${trackFiles.length} tracks, ${sources.sources.length} official sources.`
);
