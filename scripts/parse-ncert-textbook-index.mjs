// Parses the official NCERT textbook index (https://ncert.nic.in/textbook.php),
// snapshot taken 2026-10-21, into class -> subject -> [titles].
// The page builds its dropdowns in JavaScript and lists some class/subject pairs
// more than once (old and new textbook generations), so we keep the UNION of
// every live (non-commented) title. Choosing which generation is current is done
// in the skeleton generator, against CBSE circulars, never here.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const snap = "data/sources/snapshots/ncert-textbook-index-snapshot-2026-10-21.html";
let s = fs.readFileSync(path.join(root, snap), "utf8");
s = s.replace(/^\s*\/\/.*$/gm, "").replace(/(?<!:)\/\/[^\n]*/g, "");

const re = /tclass\.value==(\d+)\)\s*&&\s*\(document\.test\.tsubject\.options\[sind\]\.text=="([^"]+)"\)\)\s*\{([\s\S]*?)\}/g;
const classes = {};
let blocks = 0;
for (const [, cls, subject, body] of s.matchAll(re)) {
  blocks++;
  const titles = [...body.matchAll(/options\[(\d+)\]\.text="([^"]*)"/g)]
    .filter(([, i, t]) => i !== "0" && t.trim()).map(([, , t]) => t.trim());
  const bucket = ((classes[cls] ||= {})[subject] ||= []);
  for (const t of titles) if (!bucket.includes(t)) bucket.push(t);
}
const out = {
  source_id: "SRC-NCERT-TEXTBOOK-INDEX",
  snapshot_file: snap,
  snapshot_taken_on: "2026-10-21",
  method: "Union of all live dropdown titles per class and subject; JavaScript comments stripped",
  blocks_parsed: blocks,
  classes,
};
const dest = "data/sources/derived/ncert-textbook-titles-by-class-2026-10-21.json";
fs.writeFileSync(path.join(root, dest), JSON.stringify(out, null, 2) + "\n");
console.log(`parsed ${blocks} blocks, ${Object.keys(classes).length} class keys -> ${dest}`);
