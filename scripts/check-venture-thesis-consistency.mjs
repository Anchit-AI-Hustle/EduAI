import fs from "node:fs";
import path from "node:path";

// The six venture answers appear in three places. docs/00 is canonical; the
// /justification page and the in-app thesis tab must quote the same figures.
const ROOT = process.cwd();

const THESIS_FILES = [
  "docs/00-venture-strategy-and-naming.md",
  "app/components/EveryYearJustification.tsx",
  "app/components/VentureThesisView.tsx"
];

// Numbers match only as whole figures, so "499" does not match "1,499".
const fig = (text) => new RegExp(`(?<![\\d,.])${text.replace(/[.%]/g, "\\$&")}(?![\\d,])`);

const REQUIRED_FIGURES = [
  { label: "UDISE+ 2024-25 total enrolment", pattern: fig("24.69 crore") },
  { label: "CBSE Class 10 registrations 2025", pattern: fig("23.85 lakh") },
  { label: "Private coaching share (national)", pattern: fig("27.0%") },
  { label: "Private coaching share (urban)", pattern: fig("30.7%") },
  { label: "Urban coaching spend per student", pattern: fig("3,988") },
  { label: "Wedge size", pattern: fig("20 lakh") },
  { label: "Pilot price points (two options, not a range)", pattern: /(?<![\d,])199 or (?:INR |₹)?499(?![\d,])/ }
];

// Figures and links retired on 2026-10-23 because they were inconsistent,
// unsourced, or pointed at non-official domains.
const RETIRED = [
  /260 Million/,
  /28\.5 Million/,
  /INR 799 \/ month/,
  /(?:INR |₹)?499 ?(?:-|to) ?(?:INR |₹)?1,499/,
  /1,999/,
  // Retired 2026-10-24 (replaces "IQ indices"): a short quiz cannot measure IQ,
  // and labelling a child with one misleads parents (DPDP Act 2023 Section 9).
  // Report per-skill mastery instead.
  /\bI\.?Q\.?s?\b/i,
  /intelligence quotient/i,
  /आई\.?\s?क्यू/,
  /बुद्धि\s?लब्धि/,
  /cisceboard\.org/,
  /ciseresults\.org/,
  /dpdpa\.com/,
  /righttoeducation\.in/
];

const SCAN_DIRS = ["app", "docs", "content", "config", "schemas"];
const SCAN_FILES = ["README.md", "public/manifest.json"];
const SCAN_EXTS = new Set([".ts", ".tsx", ".md", ".json"]);

function walk(dir, out) {
  for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(rel, out);
    else if (SCAN_EXTS.has(path.extname(entry.name))) out.push(rel);
  }
  return out;
}

const failures = [];

for (const file of THESIS_FILES) {
  const content = fs.readFileSync(path.join(ROOT, file), "utf8");
  for (const fig of REQUIRED_FIGURES) {
    if (!fig.pattern.test(content)) {
      failures.push(`${file}: missing ${fig.label} (${fig.pattern})`);
    }
  }
}

const scanned = SCAN_DIRS.flatMap((d) => walk(d, [])).concat(SCAN_FILES);
for (const file of scanned) {
  const content = fs.readFileSync(path.join(ROOT, file), "utf8");
  for (const pattern of RETIRED) {
    if (pattern.test(content)) {
      failures.push(`${file}: contains retired figure or link ${pattern}`);
    }
  }
}

if (failures.length > 0) {
  for (const f of failures) console.error(`FAIL: ${f}`);
  console.error(`Venture thesis consistency check FAILED with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log(
  `Venture thesis consistency check PASSED: ${REQUIRED_FIGURES.length} figures matched across ${THESIS_FILES.length} files, ${scanned.length} files free of retired figures and links.`
);
