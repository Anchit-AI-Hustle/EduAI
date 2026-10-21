import fs from "node:fs";
import path from "node:path";
import EveryYearSchoolWorkspace from "./EveryYearSchoolWorkspace";

export default function HomePage() {
  const contentDir = path.join(process.cwd(), "content");
  const masterIndexPath = path.join(contentDir, "index", "curriculum-master-index.json");
  const masterIndex = JSON.parse(fs.readFileSync(masterIndexPath, "utf8"));

  const initialCurricula: Record<string, any> = {};
  for (const item of masterIndex.curriculumIndex) {
    const full = path.join(
      contentDir,
      "curriculum",
      item.boardId,
      `${item.boardId}-${item.yearId}-curriculum.json`
    );
    const data = JSON.parse(fs.readFileSync(full, "utf8"));
    initialCurricula[`${item.boardId}:${item.yearId}`] = data;
  }

  return (
    <main>
      <EveryYearSchoolWorkspace
        masterIndex={masterIndex}
        initialCurricula={initialCurricula}
      />
    </main>
  );
}
