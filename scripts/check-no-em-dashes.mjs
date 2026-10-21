import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const IGNORE_DIRS = new Set(["node_modules", ".next", ".git", "test-results"]);
const CHECK_EXTS = new Set([".json", ".md", ".mjs", ".ts", ".tsx", ".css"]);

let violations = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (CHECK_EXTS.has(path.extname(entry.name))) {
      const content = fs.readFileSync(full, "utf8");
      if (content.includes("\u2014") || content.includes("\u2013")) {
        console.error(`FAIL: Em-dash or en-dash found in ${path.relative(ROOT, full)}`);
        violations++;
      }
    }
  }
}

walk(ROOT);

if (violations > 0) {
  console.error(`Found ${violations} file(s) with forbidden em/en dashes.`);
  process.exit(1);
}
console.log("Em-dash check PASSED: 0 em/en dashes across all repo files.");
