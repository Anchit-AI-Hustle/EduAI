import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const IGNORE_DIRS = new Set(["node_modules", ".next", ".git", "android", "ios", "out"]);
// Next.js App Router conventions allow page.tsx, layout.tsx, globals.css, route.ts
const NEXT_ROUTER_ALLOWED = new Set(["page.tsx", "layout.tsx", "route.ts", "globals.css", "not-found.tsx", "icon.svg"]);

const seenNames = new Map();
let violations = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full);
    if (entry.isDirectory()) {
      walk(full);
    } else {
      if (NEXT_ROUTER_ALLOWED.has(entry.name) && rel.startsWith("app")) continue;
      if (seenNames.has(entry.name)) {
        console.error(`FAIL: Duplicate file name '${entry.name}' at ${rel} and ${seenNames.get(entry.name)}`);
        violations++;
      } else {
        seenNames.set(entry.name, rel);
      }
    }
  }
}

walk(ROOT);

if (violations > 0) {
  console.error(`File naming check failed with ${violations} duplicate(s).`);
  process.exit(1);
}
console.log(`File naming check PASSED: ${seenNames.size} unique descriptive file names verified.`);
