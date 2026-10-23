import fs from "node:fs";
import path from "node:path";

// The six venture answers appear in three places. docs/00 is canonical; the
// /justification page and the in-app thesis tab must quote the same figures.
const ROOT = process.cwd();

const THESIS_FILES = [
  "docs/00-venture-strategy-and-naming.md",
  "app/justification/page.tsx",
  "app/components/VentureThesisView.tsx"
];

const REQUIRED_FIGURES = [
  { label: "UDISE+ 2024-25 total enrolment", text: "24.69 crore" },
  { label: "CBSE Class 10 registrations 2025", text: "23.85 lakh" },
  { label: "Private coaching share (national)", text: "27.0%" },
  { label: "Private coaching share (urban)", text: "30.7%" },
  { label: "Urban coaching spend per student", text: "3,988" },
  { label: "Wedge size", text: "20 lakh" },
  { label: "Pilot price point (low)", text: "199" },
  { label: "Pilot price point (high)", text: "499" }
];

// Figures and links retired on 2026-10-23 because they were inconsistent,
// unsourced, or pointed at non-official domains.
const RETIRED = [
  "260 Million",
  "28.5 Million",
  "INR 799 / month",
  "1,999-3,499",
  "1,999 to INR 3,499",
  "IQ indices",
  "cisceboard.org",
  "ciseresults.org",
  "dpdpa.com",
  "righttoeducation.in"
];

const SCAN_DIRS = ["app", "docs", "content/sources", "content/config"];
const SCAN_FILES = ["README.md"];
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
    if (!content.includes(fig.text)) {
      failures.push(`${file}: missing ${fig.label} ("${fig.text}")`);
    }
  }
}

const scanned = SCAN_DIRS.flatMap((d) => walk(d, [])).concat(SCAN_FILES);
for (const file of scanned) {
  const content = fs.readFileSync(path.join(ROOT, file), "utf8");
  for (const text of RETIRED) {
    if (content.includes(text)) {
      failures.push(`${file}: contains retired figure or link "${text}"`);
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
