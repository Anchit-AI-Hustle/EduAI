// Builds every Phase 1 data file from the facts below. Each board fact cites a
// source_id from data/sources/official-source-register.json. Anything that is a
// product design choice is labelled basis: "product-default". Nothing in here is
// chapter-level syllabus content; that is ingested in Phase 3.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const BUILT_ON = "2026-10-21";
const SESSION = "2026-27";
const write = (rel, obj) => {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n");
};
const cls = (n) => `class-${String(n).padStart(2, "0")}`;
const YEARS = ["home-0-3", "nursery", "lkg", "ukg", ...Array.from({ length: 12 }, (_, i) => cls(i + 1))];
const EARLY = YEARS.slice(0, 4);
const classNum = (y) => (y.startsWith("class-") ? parseInt(y.slice(6), 10) : null);

// ---------- 1. Stage ladder ----------
const HI_EARLY = { "home-0-3": "घर पर सीखना (0-3 वर्ष)", nursery: "नर्सरी", lkg: "एलकेजी", ukg: "यूकेजी" };
const EN_EARLY = { "home-0-3": "Home learning (ages 0-3)", nursery: "Nursery", lkg: "LKG", ukg: "UKG" };
const nepStage = (y) => {
  if (y === "home-0-3") return "pre-foundational-home";
  if (EARLY.includes(y)) return "foundational";
  const n = classNum(y);
  return n <= 2 ? "foundational" : n <= 5 ? "preparatory" : n <= 8 ? "middle" : "secondary";
};
const NIOS_POINT = { "class-03": "NIOS OBE Level A (equivalent to Class 3)", "class-05": "NIOS OBE Level B (equivalent to Class 5)", "class-08": "NIOS OBE Level C (equivalent to Class 8)", "class-10": "NIOS Secondary (equivalent to Class X)", "class-12": "NIOS Senior Secondary (equivalent to Class XII)" };
const ageBand = (y) => {
  if (y === "home-0-3") return [0, 3];
  const i = EARLY.indexOf(y);
  if (i > 0) return [2 + i, 3 + i];
  const n = classNum(y);
  return [n + 5, n + 6];
};
write("data/stages/education-stage-ladder.json", {
  ladder_id: "education-stage-ladder",
  built_on: BUILT_ON,
  age_basis: "Foundational stage = 3 preschool years at ages 3-6 then Classes 1-2 at ages 6-8 (SRC-MOE-DOSEL-ECCE-LETTER, SRC-PRS-NEP-2020-SUMMARY). Per-year bands are derived by counting one year per class and are typical, not eligibility rules. Nursery, LKG and UKG are mapped to the three preschool years by convention (product assumption).",
  source_ids: ["SRC-MOE-DOSEL-ECCE-LETTER", "SRC-PRS-NEP-2020-SUMMARY", "SRC-NEP-2020", "SRC-RS-UQ319-2024-07-24", "SRC-NIOS-OBE-GUIDELINE", "SRC-NIOS-FAQ"],
  years: YEARS.map((y, idx) => ({
    order: idx + 1,
    year_id: y,
    label_en: EN_EARLY[y] || `Class ${classNum(y)}`,
    label_hi: HI_EARLY[y] || `कक्षा ${classNum(y)}`,
    nep_stage: nepStage(y),
    typical_age_band: { from: ageBand(y)[0], to: ageBand(y)[1] },
    national_framework: y === "home-0-3" ? "Navchetana (MWCD, 2024)" : EARLY.includes(y) ? "Aadharshila (MWCD, 2024) and NCF-FS" : null,
    nios_certification_point: NIOS_POINT[y] || null,
    board_exam_year_cbse_cisce: ["class-10", "class-12"].includes(y),
    competitive_tracks_open: classNum(y) !== null && classNum(y) >= 8,
  })),
});

// ---------- 2. Board registry ----------
write("data/boards/board-registry.json", {
  registry_id: "board-registry",
  built_on: BUILT_ON,
  rollout_order: ["cbse", "cisce", "state-boards", "nios"],
  rollout_note: "Per brief: CBSE first, then ICSE (CISCE), state boards and NIOS. NIOS is the likely certification route for learners not enrolled in a school (see docs/risks-and-legal-register.md), so its skeleton is built now even though its depth comes later.",
  boards: [
    { board_id: "national-early-years", name: "National early-years frameworks (Navchetana 0-3, Aadharshila 3-6, NCF-FS)", covers_years: EARLY, certification_points: [], official_status: "national-framework", source_ids: ["SRC-RS-UQ319-2024-07-24", "SRC-MOE-DOSEL-ECCE-LETTER"] },
    { board_id: "cbse", name: "Central Board of Secondary Education", covers_years: YEARS.filter((y) => !EARLY.includes(y)), early_years_handling: "defers-to-national-framework", certification_points: [{ year_id: "class-10", exam: "Secondary School Examination (Class X)" }, { year_id: "class-12", exam: "Senior School Certificate Examination (Class XII)" }], official_url: "https://cbseacademic.nic.in/curriculum_2027.html", source_ids: ["SRC-CBSE-CIRC-ACAD-14-2026", "SRC-CBSE-PRIVATE-CANDIDATE-BYELAWS"] },
    { board_id: "cisce", name: "Council for the Indian School Certificate Examinations", covers_years: YEARS.filter((y) => y !== "home-0-3"), certification_points: [{ year_id: "class-10", exam: "ICSE (Class X)" }, { year_id: "class-12", exam: "ISC (Class XII)" }], official_url: "https://cisce.org/?p=9225", source_ids: ["SRC-CISCE-PUBLICATIONS"], notes: "Pre-school to Class VIII curriculum and full ICSE/ISC regulations not yet ingested; cisce.org blocked from build environment." },
    { board_id: "nios", name: "National Institute of Open Schooling", covers_years: ["class-03", "class-05", "class-08", "class-10", "class-12"], preparation_years_mapped: true, certification_points: Object.entries(NIOS_POINT).map(([year_id, exam]) => ({ year_id, exam })), official_url: "https://grs.nios.ac.in/faq", source_ids: ["SRC-NIOS-OBE-GUIDELINE", "SRC-NIOS-SDMIS-OBE", "SRC-NIOS-FAQ", "SRC-NIOS-SENIOR-SECONDARY-SCHEME"] },
    { board_id: "state-boards", name: "State and UT boards (placeholder, not yet catalogued)", covers_years: YEARS.filter((y) => y !== "home-0-3"), certification_points: [], official_status: "gap", source_ids: [], notes: "Each state board needs its own registry entry, sourced from that board's official syllabus site." },
  ],
});

// ---------- 3. Shared skill graph ----------
const N = (skill_id, label_en, label_hi, kind, source_ids, level = "domain", parent_id = null) => ({ skill_id, label_en, label_hi, level, kind, parent_id, source_ids });
const PBPB = ["SRC-PIB-POSHAN-BHI-PADHAI-BHI"];
const IDX = ["SRC-NCERT-TEXTBOOK-INDEX"];
const SAT = ["SRC-COLLEGEBOARD-SAT-CONTENT"];
const nodes = [
  N("ed-responsive-caregiving-stimulation", "Responsive caregiving and early stimulation (0-3)", "उत्तरदायी देखभाल और प्रारंभिक उत्तेजना (0-3)", "early-development", ["SRC-RS-UQ319-2024-07-24"]),
  N("ed-physical-motor", "Physical and motor development", "शारीरिक और गतिक विकास", "early-development", PBPB),
  N("ed-cognitive", "Cognitive development", "संज्ञानात्मक विकास", "early-development", PBPB),
  N("ed-socio-emotional-ethical", "Socio-emotional and ethical development", "सामाजिक-भावनात्मक और नैतिक विकास", "early-development", PBPB),
  N("ed-cultural-artistic", "Cultural and artistic development", "सांस्कृतिक और कलात्मक विकास", "early-development", PBPB),
  N("ed-communication-early-language", "Communication and early language", "संवाद और प्रारंभिक भाषा", "early-development", PBPB),
  N("ed-literacy-numeracy", "Early literacy and numeracy", "प्रारंभिक साक्षरता और संख्या ज्ञान", "early-development", PBPB),
  N("lang-english", "English", "अंग्रेज़ी", "language", IDX),
  N("lang-hindi", "Hindi", "हिंदी", "language", IDX),
  N("lang-sanskrit", "Sanskrit", "संस्कृत", "language", IDX),
  N("lang-urdu", "Urdu", "उर्दू", "language", IDX),
  N("lang-other-indian", "Other Indian languages (R3 options)", "अन्य भारतीय भाषाएँ (R3 विकल्प)", "language", ["SRC-CBSE-CIRC-ACAD-33-2026"]),
  N("area-mathematics", "Mathematics", "गणित", "curricular-area", IDX),
  N("area-world-around-us", "The World Around Us", "हमारे आसपास की दुनिया", "curricular-area", IDX),
  N("area-science", "Science", "विज्ञान", "curricular-area", IDX),
  N("area-social-science", "Social Science", "सामाजिक विज्ञान", "curricular-area", IDX),
  N("area-arts", "Arts education", "कला शिक्षा", "curricular-area", IDX),
  N("area-physical-education-wellbeing", "Physical education and well-being", "शारीरिक शिक्षा और कल्याण", "curricular-area", IDX),
  N("area-vocational-skill-education", "Vocational and skill education", "व्यावसायिक और कौशल शिक्षा", "curricular-area", IDX),
  ...[
    ["physics", "Physics", "भौतिकी"], ["chemistry", "Chemistry", "रसायन विज्ञान"], ["biology", "Biology", "जीव विज्ञान"],
    ["accountancy", "Accountancy", "लेखाशास्त्र"], ["business-studies", "Business Studies", "व्यवसाय अध्ययन"], ["economics", "Economics", "अर्थशास्त्र"],
    ["history", "History", "इतिहास"], ["geography", "Geography", "भूगोल"], ["political-science", "Political Science", "राजनीति विज्ञान"],
    ["sociology", "Sociology", "समाजशास्त्र"], ["psychology", "Psychology", "मनोविज्ञान"], ["computer-science", "Computer Science", "कंप्यूटर विज्ञान"],
    ["informatics-practices", "Informatics Practices", "इन्फॉर्मेटिक्स प्रैक्टिसेज"], ["home-science", "Home Science", "गृह विज्ञान"],
  ].map(([id, en, hi]) => N(`ss-${id}`, en, hi, "senior-secondary-discipline", IDX)),
  N("sat-reading-writing", "SAT Reading and Writing", "SAT पठन और लेखन", "exam-track-domain", SAT),
  N("sat-rw-information-and-ideas", "SAT: Information and Ideas", "SAT: Information and Ideas", "exam-track-domain", SAT, "subdomain", "sat-reading-writing"),
  N("sat-rw-craft-and-structure", "SAT: Craft and Structure", "SAT: Craft and Structure", "exam-track-domain", SAT, "subdomain", "sat-reading-writing"),
  N("sat-rw-expression-of-ideas", "SAT: Expression of Ideas", "SAT: Expression of Ideas", "exam-track-domain", SAT, "subdomain", "sat-reading-writing"),
  N("sat-rw-standard-english-conventions", "SAT: Standard English Conventions", "SAT: Standard English Conventions", "exam-track-domain", SAT, "subdomain", "sat-reading-writing"),
  N("sat-math", "SAT Math", "SAT गणित", "exam-track-domain", SAT),
  N("sat-math-algebra", "SAT: Algebra", "SAT: Algebra", "exam-track-domain", SAT, "subdomain", "sat-math"),
  N("sat-math-advanced-math", "SAT: Advanced Math", "SAT: Advanced Math", "exam-track-domain", SAT, "subdomain", "sat-math"),
  N("sat-math-problem-solving-data-analysis", "SAT: Problem-Solving and Data Analysis", "SAT: Problem-Solving and Data Analysis", "exam-track-domain", SAT, "subdomain", "sat-math"),
  N("sat-math-geometry-trigonometry", "SAT: Geometry and Trigonometry", "SAT: Geometry and Trigonometry", "exam-track-domain", SAT, "subdomain", "sat-math"),
];
const E = (from, to, type, basis, source_ids = []) => ({ from, to, type, basis, source_ids });
const edges = [
  ...["ed-physical-motor", "ed-cognitive", "ed-socio-emotional-ethical", "ed-communication-early-language"].map((t) => E("ed-responsive-caregiving-stimulation", t, "prerequisite_of", "design-assumption")),
  ...["lang-english", "lang-hindi"].map((t) => E("ed-communication-early-language", t, "prerequisite_of", "design-assumption")),
  ...["area-mathematics", "lang-english", "lang-hindi"].map((t) => E("ed-literacy-numeracy", t, "prerequisite_of", "design-assumption")),
  ...["area-science", "area-social-science"].map((t) => E("area-world-around-us", t, "prerequisite_of", "structural-sequence-in-official-books", IDX)),
  ...["ss-physics", "ss-chemistry", "ss-biology"].map((t) => E("area-science", t, "prerequisite_of", "structural-sequence-in-official-books", IDX)),
  ...["ss-history", "ss-geography", "ss-political-science", "ss-economics", "ss-sociology"].map((t) => E("area-social-science", t, "prerequisite_of", "structural-sequence-in-official-books", IDX)),
  E("area-mathematics", "ss-physics", "prerequisite_of", "design-assumption"),
  E("area-mathematics", "sat-math", "maps_to", "design-assumption"),
  E("lang-english", "sat-reading-writing", "maps_to", "design-assumption"),
  ...nodes.filter((n) => n.parent_id).map((n) => E(n.skill_id, n.parent_id, "part_of", "official-domain-structure", SAT)),
];
write("data/skill-graph/skill-graph-seed-domains.json", { graph_id: "shared-skill-graph", version: "0.1.0-domains", built_on: BUILT_ON, depth_note: "Domain level only. Units and competencies are added per board and grade in Phase 3, each mapped to these domains.", nodes, edges });

// ---------- 4. Tracks registry ----------
const T = (track_id, name, body, official_url, source_ids, earliest_start_year, branches_from_skill_ids, syllabus_status, notes) => ({ track_id, name, conducting_body: body, official_url, source_ids, earliest_start_year, earliest_start_basis: "product-default per brief (tracks branch off from Class 8-9)", branches_from_skill_ids, syllabus_status, notes });
write("data/tracks/competitive-and-study-abroad-track-registry.json", {
  registry_id: "competitive-and-study-abroad-track-registry",
  built_on: BUILT_ON,
  phase: "phase-4 (registered now so the skill graph and learner profile can reference tracks)",
  tracks: [
    T("jee-main", "JEE (Main)", "National Testing Agency", "https://jeemain.nta.nic.in/", ["SRC-NTA-JEE-MAIN"], "class-09", ["area-mathematics", "ss-physics", "ss-chemistry"], "gap", "Syllabus and eligibility to ingest from the current NTA information bulletin; site blocked from build environment."),
    T("jee-advanced", "JEE (Advanced)", "Indian Institutes of Technology", "https://jeeadv.ac.in/", ["SRC-JEE-ADVANCED"], "class-09", ["area-mathematics", "ss-physics", "ss-chemistry"], "gap", "Syllabus to ingest from jeeadv.ac.in."),
    T("neet-ug", "NEET (UG)", "National Testing Agency (syllabus by National Medical Commission)", "https://neet.nta.nic.in/", ["SRC-NTA-NEET-UG", "SRC-NMC"], "class-09", ["ss-physics", "ss-chemistry", "ss-biology"], "gap", "Syllabus to ingest from NMC and the NTA bulletin."),
    T("cuet-ug", "CUET (UG)", "National Testing Agency", "https://cuet.nta.nic.in/", ["SRC-NTA-CUET-UG"], "class-09", ["lang-english", "area-mathematics", "area-social-science", "area-science"], "gap", "Subject-wise syllabi to ingest; site blocked from build environment."),
    T("upsc-cse", "UPSC Civil Services Examination", "Union Public Service Commission", "https://upsc.gov.in/", ["SRC-UPSC"], "class-09", ["area-social-science", "ss-history", "ss-geography", "ss-political-science", "ss-economics"], "gap", "Long-horizon track (eligibility requires a degree); school years build foundations only. Syllabus to ingest from the CSE notification."),
    T("sat", "SAT", "College Board", "https://satsuite.collegeboard.org/sat", ["SRC-COLLEGEBOARD-SAT-CONTENT"], "class-09", ["sat-reading-writing", "sat-math", "lang-english", "area-mathematics"], "domains-sourced", "Content domains sourced from College Board pages (snapshots stored). Skill-level specifications still to ingest."),
    T("act", "ACT", "ACT, Inc.", "https://www.act.org/", ["SRC-ACT"], "class-09", ["lang-english", "area-mathematics", "area-science"], "gap", "Test sections and specifications to ingest from act.org."),
    T("ielts", "IELTS", "IELTS partners", "https://ielts.org/", ["SRC-IELTS"], "class-08", ["lang-english"], "gap", "Format to ingest from ielts.org."),
    T("toefl", "TOEFL", "ETS", "https://www.ets.org/toefl.html", ["SRC-ETS-TOEFL"], "class-08", ["lang-english"], "gap", "Format to ingest from ets.org."),
  ],
});

// ---------- 5. Board subject sets ----------
const S = (subject_id, name_en, name_hi, skill_ids, en, hi = [], extra = {}) => ({ subject_id, name_en, name_hi, name_hi_basis: "ui-translation", skill_ids, ncert_textbook_titles: en, ncert_hindi_medium_titles: hi, ...extra });
const ENG = (t) => S("english", "English", "अंग्रेज़ी", ["lang-english"], t, [], { language_slot: "any" });
const HIN = (t) => S("hindi", "Hindi", "हिंदी", ["lang-hindi"], t, [], { language_slot: "any" });
const SAN = (t) => S("sanskrit", "Sanskrit", "संस्कृत", ["lang-sanskrit"], t, [], { language_slot: "any" });
const MAT = (en, hi) => S("mathematics", "Mathematics", "गणित", ["area-mathematics"], en, hi);
const SCI = (en, hi) => S("science", "Science", "विज्ञान", ["area-science"], en, hi);
const SST = (en, hi) => S("social-science", "Social Science", "सामाजिक विज्ञान", ["area-social-science"], en, hi);
const TWAU = (en, hi) => S("the-world-around-us", "The World Around Us", "हमारे आसपास की दुनिया", ["area-world-around-us"], en, hi);
const ART = (en, hi) => S("arts", "Arts", "कला", ["area-arts"], en, hi);
const PE = (en, hi, label = "Physical Education and Well Being") => S("physical-education-wellbeing", label, "शारीरिक शिक्षा और कल्याण", ["area-physical-education-wellbeing"], en, hi);
const VOC = (en, hi, label = "Vocational Education") => S("vocational-education", label, "व्यावसायिक शिक्षा", ["area-vocational-skill-education"], en, hi);
const D = (id, en_name, hi_name, en, hi = []) => S(id, en_name, hi_name, [`ss-${id}`], en, hi);

const CBSE_SUBJECTS = {
  1: [ENG(["Mridang"]), HIN(["Sarangi"]), MAT(["Joyful-Mathematics (English)"], ["Joyful-Mathematics (Hindi)"])],
  2: [ENG(["Mridang"]), HIN(["Sarangi"]), MAT(["Joyful-Mathematics (English)"], ["Joyful-Mathematics (Hindi)"])],
  3: [ENG(["Santoor"]), HIN(["Veena"]), MAT(["Maths Mela"], ["Ganit Mela"]), TWAU(["Our Wondrous World"], ["Hamara Adhbhut Sansar"]), ART(["Bansuri - I"], ["Bansuri - I (Hindi)"]), PE(["Khel Yoga"], ["Khel Yoga (Hindi)"])],
  4: [ENG(["Santoor"]), HIN(["Veena"]), MAT(["Math-Mela"], ["Ganit Mela"]), TWAU(["Our Wonderous World"], ["Hamara Adhbhut Sansar"]), ART(["Bansuri"], ["Bansuri - I (Hindi)"]), PE(["Khel Yoga"], ["Khel Yoga(Hindi)"])],
  5: [ENG(["Santoor"]), HIN(["Veena"]), MAT(["Math-Mela"], ["Ganit-Mela"]), TWAU(["Our Wonderous World"], ["Hamara Adbhut Sansar"]), ART(["Bansuri"], ["Bansuri (Hindi)"]), PE(["Khel Yoga"], [])],
  6: [ENG(["Poorvi"]), HIN(["Malhar"]), SAN(["Deepakam"]), MAT(["Ganita Prakash"], ["Ganita Prakash (Hindi)"]), SCI(["Curiosity"], ["Jigyasa"]), SST(["Exploring Society India and Beyond"], ["Samaj Ka Aadhyan: Bharat or uske aage"]), ART(["Kriti-I"], ["Kriti-I (Hindi)"]), PE(["Khel Yatra"], ["Khel Yatra (Hindi)"]), VOC(["Kaushal Bodh"], ["Kaushal Bodh (Hindi)"])],
  7: [ENG(["Poorvi"]), HIN(["Malhar"]), SAN(["Deepakam"]), MAT(["Ganita Prakash", "Ganita Prakash-II"], ["Ganita Prakash(Hindi)", "Ganita Prakash-II (Hindi)"]), SCI(["Curiosity"], ["Jigyasa"]), SST(["Exploring Society India and Beyond Part-I", "Exploring Society India and Beyond Part-II"], ["Samaj Ka Aadhyan: Bharat or uske aage Part-I", "Samaj Ka Aadhyan: Bharat or uske aage Part-II"]), ART(["Kriti"], ["Kriti-I (Hindi)"]), PE(["Khel Yatra"], ["Khel Yatra (Hindi)"]), VOC(["Kaushal Bodh"], ["Kaushal Bodh(Hindi)"])],
  8: [ENG(["Poorvi"]), HIN(["Malhar"]), SAN(["Deepakam"]), MAT(["Ganita Prakash Part-I", "Ganita Prakash Part-II"], ["Ganita Prakash Part-I (Hindi)", "Ganita Prakash Part-II (Hindi)"]), SCI(["Curiosity"], ["Jigyasa"]), SST(["Exploring Society India and Beyond Part-I", "Exploring Society India and Beyond Part-II"], ["Samaj Ka Aadhyan: Bharat or uske aage Part-I"]), ART(["Kriti"], ["Kriti (Hindi)"]), PE(["Khel Yatra"], ["Khel Yatra ( Hindi)"]), VOC(["Kaushal Bodh"], ["Kaushal Bodh (Hindi)"])],
  9: [ENG(["Kaveri"]), HIN(["Ganga"]), SAN(["Sharada", "Risikulya(R2)"]), MAT(["Ganita Manjari", "Ganita Manjari PART-II"], ["Ganita Manjari (Hindi)"]), SCI(["Exploration"], ["Anveshan"]), SST(["Understanding Society India and Beyond PART-I", "Understanding Society India and Beyond PART-II"], []), ART(["Madhurima"], []), PE(["Khel Praveen"], []), VOC(["Kaushal Vikas"], [], "Skill Education")],
  10: [ENG(["First Flight", "Foot Prints Without feet Supp. Reader"]), HIN(["Kshitij-2", "Sparsh", "Sanchayan Bhag-2", "Kritika"]), SAN(["Shemushi"]), MAT(["Mathematics"], ["Ganit"]), SCI(["Science"], ["Vigyan"]), SST(["Contemporary India", "Understanding Economic Development"], ["Samkalin Bharat", "Arthik Vikas ki Samajh"]), PE(["Health and Physical Education"], [], "Health and Physical Education")],
  11: [ENG(["Hornbill", "Snapshots Suppl.Reader English", "Woven Words"]), HIN(["Aroh", "Vitan", "Antra", "Antral"]), SAN(["Bhaswati", "Shashwati"]), MAT(["Mathematics"], ["Ganit"]), D("physics", "Physics", "भौतिकी", ["Physics Part-I", "Physics Part-II"], ["Bhautiki-I", "Bhautiki-II"]), D("chemistry", "Chemistry", "रसायन विज्ञान", ["Chemistry Part-I", "Chemistry Part II"], ["Rasayan Vigyan bhag-I", "Rasayan Vigyan bhag-II"]), D("biology", "Biology", "जीव विज्ञान", ["Biology"], ["Jeev Vigyan"]), D("accountancy", "Accountancy", "लेखाशास्त्र", ["Financial Accounting-I", "Accountancy-II"], ["Lekhashastra-I", "Lekhashastra-II"]), D("business-studies", "Business Studies", "व्यवसाय अध्ययन", ["Business Studies"], ["Vyavsay Adhyanan"]), D("economics", "Economics", "अर्थशास्त्र", ["Indian Economic Development", "Statistics for Economics"], ["Sankhyiki", "Bhartiya Airthryavstha Ka Vikas"]), D("history", "History", "इतिहास", ["Themes in World History"], ["Vishwa Itihas Ke Kuch Vishay"]), D("geography", "Geography", "भूगोल", ["Fundamental of Physical Geography", "India Physical Environment", "Pratical Work in Geography"], ["Bhautique Bhugol ke Mool Sidhant", "Bhugol Main Prayogatmak Karya"]), D("political-science", "Political Science", "राजनीति विज्ञान", ["Political Theory", "India Constitution at Work"], ["Raajneeti Sidhant", "Bharat ka Samvidhan Sidhant aur Vyavhar"]), D("sociology", "Sociology", "समाजशास्त्र", ["Introducing Sociology", "Understanding Society"], ["Samaj Shastra Parichay-I", "Samaj ka Bodh"]), D("psychology", "Psychology", "मनोविज्ञान", ["Introduction to Psychology"], ["Manovigyan"]), D("computer-science", "Computer Science", "कंप्यूटर विज्ञान", ["Computer Science"]), D("informatics-practices", "Informatics Practices", "इन्फॉर्मेटिक्स प्रैक्टिसेज", ["Informatics Practices"]), D("home-science", "Home Science", "गृह विज्ञान", ["Human Ecology and Family Sciences Part I", "Human Ecology and Family Sciences Part II"]), PE(["Health and Physical Education"], [], "Health and Physical Education")],
  12: [ENG(["Flamingo", "Vistas", "Kaliedoscope"]), HIN(["Aroh", "Vitan", "Antra", "Antral Bhag 2"]), SAN(["Bhaswati", "Shaswati"]), MAT(["Mathematics Part-I", "Mathematics Part-II"], ["Ganit-I", "Ganit-II"]), D("physics", "Physics", "भौतिकी", ["Physics Part-I", "Physics Part-II"], ["Bhautiki-I", "Bhautiki-II"]), D("chemistry", "Chemistry", "रसायन विज्ञान", ["Chemistry-I", "Chemistry-II"], ["Rasayan vigyan bhag I", "Rasayan vigyan bhag II"]), D("biology", "Biology", "जीव विज्ञान", ["Biology"], ["Jeev Vigyan"]), D("accountancy", "Accountancy", "लेखाशास्त्र", ["Accountancy-I", "Accountancy Part-II"], ["Lekhashastra Part-I", "Lekhashastra Part-II"]), D("business-studies", "Business Studies", "व्यवसाय अध्ययन", ["Business Studies-I", "Business Studies-II"], ["Vyavasai Adhyan-I", "Vyavasai Adhyan-II"]), D("economics", "Economics", "अर्थशास्त्र", ["Introductory Microeconomics", "Introductory Macroeconomics"], ["Vyashthi Arthshasrta", "Samashty Arthshastra Ek Parichay"]), D("history", "History", "इतिहास", ["Themes in Indian History-I", "Themes in Indian History-II", "Themes in Indian History-III"], ["Bharatiya Itihas ke kuchh Vishay-I", "Bharatiya Itihas ke kuchh Vishay-II", "Bharatiya Itihas ke kuchh Vishay-III"]), D("geography", "Geography", "भूगोल", ["Fundamentals of Human Geography", "India -People And Economy", "Practical Work in Geography Part II"], ["Manav Bhugol Ke Mool Sidhant"]), D("political-science", "Political Science", "राजनीति विज्ञान", ["Contemporary World Politics", "Politics in India Since Independence"], ["Samkalin Vishwa Rajniti", "Swatantra Bharat Mein Rajniti-II"]), D("sociology", "Sociology", "समाजशास्त्र", ["Indian Society", "Social Change and Development in India"], ["Bhartiya Samaj", "Bharat main Samajik Parivartan aur Vikas"]), D("psychology", "Psychology", "मनोविज्ञान", ["Psychology"], ["Manovigyan"]), D("computer-science", "Computer Science", "कंप्यूटर विज्ञान", ["Computer Science"]), D("informatics-practices", "Informatics Practices", "इन्फॉर्मेटिक्स प्रैक्टिसेज", ["Informatics Practices"]), D("home-science", "Home Science", "गृह विज्ञान", ["Human Ecology and Family Sciences Part I", "Human Ecology and Family Sciences Part II"])],
};
// Source evidence for which textbook generation is current, per class.
const CBSE_CLASS_SOURCES = (n) => {
  const s = ["SRC-NCERT-TEXTBOOK-INDEX"];
  if (n <= 8) s.push("SRC-NCERT-PRICE-LIST-2025");
  if ([4, 5, 7, 8].includes(n)) s.push("SRC-CBSE-CIRC-ACAD-12-2025");
  if ([5, 8].includes(n)) s.push("SRC-CBSE-CIRC-ACAD-48-2025");
  if (n >= 9) s.push("SRC-CBSE-CIRC-ACAD-14-2026", "SRC-CBSE-CURRICULUM-2026-27-PAGE");
  if (n === 9 || n === 10 || n === 6) s.push("SRC-CBSE-CIRC-ACAD-33-2026", "SRC-CBSE-CIRC-ACAD-49-2026");
  return s;
};

// ---------- 6. Shared skeleton blocks ----------
const isEarly = (y) => EARLY.includes(y);
const stageSkills = (y) => {
  if (y === "home-0-3") return ["ed-responsive-caregiving-stimulation", "ed-physical-motor", "ed-cognitive", "ed-socio-emotional-ethical", "ed-communication-early-language"];
  if (isEarly(y)) return ["ed-physical-motor", "ed-cognitive", "ed-socio-emotional-ethical", "ed-cultural-artistic", "ed-communication-early-language", "ed-literacy-numeracy"];
  const n = classNum(y);
  if (n <= 2) return ["lang-english", "lang-hindi", "area-mathematics", "ed-physical-motor", "ed-cultural-artistic", "ed-socio-emotional-ethical"];
  if (n <= 5) return ["lang-english", "lang-hindi", "area-mathematics", "area-world-around-us", "area-arts", "area-physical-education-wellbeing"];
  if (n <= 10) return ["lang-english", "lang-hindi", "lang-sanskrit", "area-mathematics", "area-science", "area-social-science", "area-arts", "area-physical-education-wellbeing", "area-vocational-skill-education"];
  return ["lang-english", "lang-hindi", "area-mathematics", "ss-physics", "ss-chemistry", "ss-biology", "ss-accountancy", "ss-business-studies", "ss-economics", "ss-history", "ss-geography", "ss-political-science", "area-physical-education-wellbeing"];
};
const WHO = ["SRC-WHO-UNDER-5-ACTIVITY-SCREEN-SLEEP-2019"];
const dailyTemplate = (y) => {
  if (y === "home-0-3") return { status: "skeleton", basis: "product-default", loop: ["caregiver-reads-activity-card", "responsive-play-and-talk", "daily-routine-as-learning", "caregiver-logs-observation"], screen_minutes_cap: 0, source_ids: [...WHO, "SRC-RS-UQ319-2024-07-24"], notes: ["Child-facing screen time set to 0 for the whole 0-3 band. WHO 2019 does not recommend sedentary screen time under 2 and caps age 2 at 1 hour; this product is stricter so one rule covers the band. The app is caregiver-facing only."] };
  if (isEarly(y)) return { status: "skeleton", basis: "product-default", loop: ["caregiver-reads-activity-card", "hands-on-play", "talk-and-name", "short-optional-screen-moment", "caregiver-logs-observation"], screen_minutes_cap: 15, source_ids: WHO, notes: ["15 minutes of child-facing screen per day is a product cap, well inside the WHO 2019 ceiling of 1 hour total sedentary screen time for ages 3-4. WHO's under-5 guideline does not cover age 5-6; same cap applied by product choice."] };
  return { status: "skeleton", basis: "product-default", loop: ["recall-warm-up", "new-idea", "worked-example", "guided-practice", "independent-practice", "exit-check", "offline-practice-task"], screen_minutes_cap: null, source_ids: [], notes: ["School-age screen cap is guardian-set; Phase 2 decides the product default."] };
};
const termPlan = (y) => isEarly(y)
  ? { status: "skeleton", basis: "product-default", terms: [{ term_id: "continuous-year", label_en: "Continuous year (observation-based, no exams)", label_hi: "पूरा वर्ष (अवलोकन आधारित, कोई परीक्षा नहीं)" }] }
  : { status: "skeleton", basis: "product-default", terms: [{ term_id: "term-1", label_en: "Term 1", label_hi: "सत्र 1" }, { term_id: "term-2", label_en: "Term 2", label_hi: "सत्र 2" }], notes: ["Two-term split is a product default until each board's academic calendar guidance is ingested."] };
const weeklyPlan = () => ({ status: "gap", basis: "not-yet-sourced", weeks_per_year: null, sessions_per_week: null, notes: ["Periods per week per subject to come from each board's scheme of studies; product defaults set in Phase 2 where boards are silent."] });
const certificationYear = (board, y) => (["cbse", "cisce"].includes(board) && ["class-10", "class-12"].includes(y)) || (board === "nios" && NIOS_POINT[y]);
const assessments = (board, y) => {
  const n = classNum(y);
  const nepExam = [3, 5, 8].includes(n);
  if (isEarly(y)) {
    const na = { status: "not-applicable", basis: "product-default", notes: ["No tests before Class 1; progress is tracked through caregiver and teacher observation."] };
    return { unit_tests: na, internals: { status: "skeleton", basis: "product-default", notes: ["Observation log against development domains."] }, term_exams: na, board_style_mocks: { ...na, applicable: false } };
  }
  return {
    unit_tests: { status: "skeleton", basis: "product-default", notes: ["One short unit check per unit once units are ingested."] },
    internals: { status: "gap", basis: "not-yet-sourced", notes: ["Board internal-assessment components and weights not yet ingested."] },
    term_exams: { status: "skeleton", basis: "product-default", source_ids: nepExam ? ["SRC-PRS-NEP-2020-SUMMARY", "SRC-NEP-2020"] : [], notes: nepExam ? ["NEP 2020 proposes school examinations in Grades 3, 5 and 8; implementation by this board not yet confirmed."] : [] },
    board_style_mocks: certificationYear(board, y)
      ? { status: "gap", basis: "not-yet-sourced", applicable: true, notes: [`Certification year (${board === "nios" ? NIOS_POINT[y] : y === "class-10" ? "Class X board exam" : "Class XII board exam"}). Paper pattern and marking scheme to be ingested from the board before mocks are generated.`] }
      : { status: "not-applicable", basis: "product-default", applicable: false },
  };
};
const coCurricular = (y, subjects) => {
  if (isEarly(y)) return { status: "skeleton", basis: "national-framework", areas: ["art-and-craft", "music-and-movement", "free-and-guided-play", "storytelling"], source_ids: PBPB, notes: ["Areas mirror the cultural/artistic and physical/motor development domains."] };
  const official = subjects.filter((s) => ["arts", "physical-education-wellbeing", "vocational-education"].includes(s.subject_id)).map((s) => s.name_en);
  return official.length
    ? { status: "partially-sourced", basis: "board-mandated", areas: official, source_ids: ["SRC-NCERT-TEXTBOOK-INDEX"], notes: ["Listed areas have official NCERT textbooks for this class."] }
    : { status: "gap", basis: "not-yet-sourced", areas: [], notes: ["Board co-curricular requirements for this year not yet sourced."] };
};
const extracurricular = (y) => ({ status: "skeleton", basis: "product-default", areas: isEarly(y) ? ["outdoor-play", "family-activities", "neighbourhood-walks"] : ["clubs", "sports", "competitions-and-olympiads", "community-service", "reading-programme", "in-person-peer-group"], notes: ["In-person peer activities are included on purpose to address the social learning risk."] });
const parentView = (y) => ({ status: "skeleton", basis: "product-default", sections: ["this-week", "skill-progress", isEarly(y) ? "observations-and-milestones" : "assessments-and-feedback", "screen-time", "what-to-do-at-home", "consent-and-data"] });
const commonGaps = (id, y, resolve) => [
  { gap_id: `G-${id}-UNITS`, missing: "Unit and chapter level content and learning outcomes for this year", resolve_from: resolve, phase: "phase-3" },
  { gap_id: `G-${id}-PERIODS`, missing: "Periods or sessions per week per subject", resolve_from: "Board scheme of studies; product default where the board is silent", phase: "phase-2" },
  ...(isEarly(y) ? [] : [{ gap_id: `G-${id}-INTERNALS`, missing: "Internal assessment components and weightage", resolve_from: "Board curriculum or assessment framework document", phase: "phase-3" }]),
];

const skeleton = (board, y, cfg) => {
  const id = `${board}-${y}`;
  const subjects = (cfg.subjects || []).map((s) => ({ status: cfg.subjectStatus || "partially-sourced", source_ids: cfg.source_ids, ...s, notes: s.notes || [] }));
  const skillIds = [...new Set([...subjects.flatMap((s) => s.skill_ids), ...(cfg.extraSkills || stageSkills(y))])];
  return {
    skeleton_id: id,
    board_id: board,
    year_id: y,
    academic_session: SESSION,
    nep_stage: nepStage(y),
    coverage_status: cfg.coverage_status,
    certification_point: board === "nios" ? NIOS_POINT[y] || null : certificationYear(board, y) ? (y === "class-10" ? "Class X board examination" : "Class XII board examination") : null,
    scheme_notes: cfg.scheme_notes || [],
    subjects,
    skills: skillIds.map((skill_id) => ({ skill_id, depth: "domain-only" })),
    term_plan: termPlan(y),
    weekly_plan: weeklyPlan(),
    daily_lesson_template: dailyTemplate(y),
    assessments: assessments(board, y),
    co_curricular: coCurricular(y, subjects),
    extracurricular: extracurricular(y),
    parent_view: parentView(y),
    source_ids: [...new Set(cfg.source_ids)],
    gaps: [...(cfg.gaps || []), ...commonGaps(id.toUpperCase(), y, cfg.resolve || "Board official syllabus")],
    generated_by: "scripts/generate-curriculum-skeletons.mjs",
    built_on: BUILT_ON,
  };
};

const out = [];
// national-early-years
for (const y of EARLY) {
  const home = y === "home-0-3";
  out.push(skeleton("national-early-years", y, {
    coverage_status: "partially-sourced",
    source_ids: home ? ["SRC-RS-UQ319-2024-07-24", ...WHO] : ["SRC-RS-UQ319-2024-07-24", "SRC-MOE-DOSEL-ECCE-LETTER", "SRC-PIB-POSHAN-BHI-PADHAI-BHI", "SRC-NCERT-LO-FOUNDATIONAL", ...WHO],
    scheme_notes: home
      ? [{ text: "Navchetana (National Framework for Early Childhood Stimulation for Children from Birth to Three Years, 2024) guides holistic early stimulation through responsive caregiving at home and at Anganwadi centres.", source_ids: ["SRC-RS-UQ319-2024-07-24"] }]
      : [{ text: "Aadharshila (National Curriculum for ECCE for Children from Three to Six Years, 2024) and NCF-FS cover the three preschool years of the Foundational Stage.", source_ids: ["SRC-RS-UQ319-2024-07-24", "SRC-MOE-DOSEL-ECCE-LETTER"] },
         { text: "Development domains: physical/motor, cognitive, socio-emotional-ethical, cultural/artistic, communication and early language, literacy and numeracy.", source_ids: ["SRC-PIB-POSHAN-BHI-PADHAI-BHI"] }],
    resolve: home ? "Navchetana framework document (MWCD)" : "Aadharshila curriculum document (MWCD), NCF-FS 2022 and NCERT Learning Outcomes for the Foundational Stage",
    gaps: [{ gap_id: `G-NEY-${y.toUpperCase()}-FRAMEWORK-TEXT`, missing: `${home ? "Navchetana" : "Aadharshila and NCF-FS"} full text not yet ingested, so age-wise activities are not yet listed`, resolve_from: home ? "MWCD Navchetana PDF" : "MWCD Aadharshila PDF and NCERT NCF-FS 2022", phase: "phase-3" }],
  }));
}
// cbse
for (const y of YEARS) {
  if (isEarly(y)) {
    out.push(skeleton("cbse", y, { coverage_status: "defers-to-national-framework", source_ids: ["SRC-MOE-DOSEL-ECCE-LETTER", "SRC-CBSE-CIRC-ACAD-48-2025"], scheme_notes: [{ text: "Pre-primary years follow the national Foundational Stage frameworks; this file points to national-early-years for content.", source_ids: ["SRC-MOE-DOSEL-ECCE-LETTER"] }], resolve: "data/curriculum/national-early-years", gaps: [{ gap_id: `G-CBSE-${y.toUpperCase()}-BALVATIKA`, missing: "Any CBSE-specific pre-primary (Balvatika) guidance for affiliated schools", resolve_from: "cbseacademic.nic.in circulars", phase: "phase-3" }] }));
    continue;
  }
  const n = classNum(y);
  const extraGaps = [];
  const notes = [];
  if (n <= 2) extraGaps.push({ gap_id: `G-CBSE-${y.toUpperCase()}-ARTS-PE`, missing: "Arts and physical education materials for Classes 1-2 (no titles in the NCERT index for these classes)", resolve_from: "NCF-FS 2022 and NCERT Jaadui Pitara", phase: "phase-3" });
  if (n === 6 || n === 7 || n === 8) {
    notes.push({ text: "Three-language (R1, R2, R3) rules for this batch are set out by batch in CBSE Acad-49/2026; full rules still to be ingested.", source_ids: ["SRC-CBSE-CIRC-ACAD-49-2026"] });
    extraGaps.push({ gap_id: `G-CBSE-${y.toUpperCase()}-R3`, missing: "Batch-specific R3 rules and approved R3 language list", resolve_from: "CBSE Acad-49/2026 full text", phase: "phase-2" });
  }
  if (n === 9) {
    notes.push({ text: "CBSE applies the NCF-2023 scheme of studies in Class IX from 2026-27.", source_ids: ["SRC-CBSE-CIRC-ACAD-14-2026"] });
    notes.push({ text: "From 1 July 2026 three languages (R1, R2, R3) are compulsory in Class IX, at least two native Indian languages; Class IX uses Class VI R3 textbooks until dedicated books exist; no Class X board exam for R3, assessment is school-based.", source_ids: ["SRC-CBSE-CIRC-ACAD-33-2026"] });
    extraGaps.push({ gap_id: "G-CBSE-CLASS-09-TWO-LEVEL-MATHS-SCIENCE", missing: "Reported two-level (standard and advanced) Mathematics and Science for Class IX from 2026-27 is unverified", resolve_from: "CBSE Secondary Curriculum Part-I 2026-27 (Class IX) initial pages", phase: "phase-2" });
    extraGaps.push({ gap_id: "G-CBSE-CLASS-09-ICT", missing: "ICT textbook listed by NCERT as Coming Soon", resolve_from: "NCERT textbook index on release", phase: "phase-3" });
  }
  if (n === 10) {
    notes.push({ text: "The 2026-27 Class X batch is not the NCF-2023 batch; NCERT still lists the earlier Class 10 textbooks. Batch language rules are in Acad-49/2026.", source_ids: ["SRC-NCERT-TEXTBOOK-INDEX", "SRC-CBSE-CIRC-ACAD-49-2026"] });
    extraGaps.push({ gap_id: "G-CBSE-CLASS-10-HINDI-COURSE-AB", missing: "Split of Hindi titles between Course A and Course B", resolve_from: "CBSE Secondary Curriculum Part-I 2026-27 (Class X) Hindi syllabus", phase: "phase-3" });
    extraGaps.push({ gap_id: "G-CBSE-CLASS-10-EXAM-SCHEME", missing: "Board examination scheme for the 2027 Class X exam (sittings, paper pattern, internal split)", resolve_from: "CBSE Secondary Curriculum Part-I 2026-27 (Class X) and exam circulars", phase: "phase-2" });
    extraGaps.push({ gap_id: "G-CBSE-CLASS-10-SOCIAL-SCIENCE-HISTORY-POLITY", missing: "History and Political Science textbook titles for Class 10 not captured from the NCERT index snapshot", resolve_from: "NCERT textbook index (full Social Science dropdown)", phase: "phase-3" });
  }
  if (n >= 11) {
    notes.push({ text: "Subjects listed are those with NCERT textbooks for this class. Which subjects CBSE offers, stream rules and Core vs Elective language papers come from the Senior Secondary Curriculum Part-II 2026-27.", source_ids: ["SRC-NCERT-TEXTBOOK-INDEX", "SRC-CBSE-CURRICULUM-2026-27-PAGE"] });
    extraGaps.push({ gap_id: `G-CBSE-${y.toUpperCase()}-SUBJECT-OFFER`, missing: "Official CBSE subject offer, combinations, Core vs Elective split for English and Hindi, and Applied Mathematics", resolve_from: "CBSE Senior Secondary Curriculum Part-II 2026-27", phase: "phase-2" });
  }
  out.push(skeleton("cbse", y, { coverage_status: "partially-sourced", subjects: CBSE_SUBJECTS[n], source_ids: CBSE_CLASS_SOURCES(n), scheme_notes: notes, gaps: extraGaps, resolve: n >= 9 ? "CBSE Curriculum 2026-27 subject PDFs (cbseacademic.nic.in/curriculum_2027.html) and NCERT textbook contents" : "NCERT textbook contents and NCERT learning outcomes" }));
}
// cisce
for (const y of YEARS) {
  const n = classNum(y);
  const secondary = n >= 9;
  out.push(skeleton("cisce", y, {
    coverage_status: y === "home-0-3" ? "not-offered-by-board" : "gap",
    source_ids: ["SRC-CISCE-PUBLICATIONS"],
    scheme_notes: secondary ? [{ text: n <= 10 ? "CISCE has published ICSE Regulations and Syllabuses for the 2028 examination (the Class IX cohort of 2026-27)." : "CISCE has published ISC Regulations and Syllabuses for the 2027 examination; the ISC 2028 listing was not confirmed on the official page.", source_ids: ["SRC-CISCE-PUBLICATIONS"] }] : [],
    resolve: secondary ? "CISCE Regulations and Syllabuses (ICSE 2028, ISC 2028) PDFs" : "CISCE curriculum for Pre-School to Class VIII",
    extraSkills: y === "home-0-3" ? ["ed-responsive-caregiving-stimulation"] : stageSkills(y),
    gaps: [{ gap_id: `G-CISCE-${y.toUpperCase()}-SUBJECTS`, missing: y === "home-0-3" ? "CISCE does not cover ages 0-3; learners use national-early-years" : "Official CISCE subject list and groups for this year not yet ingested (cisce.org blocked from build environment); skills mapped from NEP stage via the shared graph", resolve_from: y === "home-0-3" ? "data/curriculum/national-early-years" : "cisce.org Regulations and Syllabuses, fetched from an unblocked network", phase: "phase-3" }],
  }));
}
// nios
const NIOS_SS_SUBJECTS = [
  { subject_id: "hindi", name_en: "Hindi (301)", name_hi: "हिंदी (301)", name_hi_basis: "ui-translation", skill_ids: ["lang-hindi"] },
  { subject_id: "bengali", name_en: "Bengali (303)", name_hi: "बांग्ला (303)", name_hi_basis: "ui-translation", skill_ids: ["lang-other-indian"] },
  { subject_id: "gujarati", name_en: "Gujarati (307)", name_hi: "गुजराती (307)", name_hi_basis: "ui-translation", skill_ids: ["lang-other-indian"] },
  { subject_id: "punjabi", name_en: "Punjabi (310)", name_hi: "पंजाबी (310)", name_hi_basis: "ui-translation", skill_ids: ["lang-other-indian"] },
  { subject_id: "physics", name_en: "Physics (312)", name_hi: "भौतिकी (312)", name_hi_basis: "ui-translation", skill_ids: ["ss-physics"] },
  { subject_id: "chemistry", name_en: "Chemistry (313)", name_hi: "रसायन विज्ञान (313)", name_hi_basis: "ui-translation", skill_ids: ["ss-chemistry"] },
  { subject_id: "biology", name_en: "Biology (314)", name_hi: "जीव विज्ञान (314)", name_hi_basis: "ui-translation", skill_ids: ["ss-biology"] },
  { subject_id: "business-studies", name_en: "Business Studies (319)", name_hi: "व्यवसाय अध्ययन (319)", name_hi_basis: "ui-translation", skill_ids: ["ss-business-studies"] },
  { subject_id: "psychology", name_en: "Psychology (328)", name_hi: "मनोविज्ञान (328)", name_hi_basis: "ui-translation", skill_ids: ["ss-psychology"] },
  { subject_id: "computer-science", name_en: "Computer Science (330)", name_hi: "कंप्यूटर विज्ञान (330)", name_hi_basis: "ui-translation", skill_ids: ["ss-computer-science"] },
  { subject_id: "physical-education-and-yog", name_en: "Physical Education and Yog (373)", name_hi: "शारीरिक शिक्षा और योग (373)", name_hi_basis: "ui-translation", skill_ids: ["area-physical-education-wellbeing"] },
];
for (const y of YEARS) {
  const n = classNum(y);
  const point = NIOS_POINT[y];
  const next = n === null ? null : n <= 3 ? "class-03" : n <= 5 ? "class-05" : n <= 8 ? "class-08" : n <= 10 ? "class-10" : "class-12";
  const srcs = n === null ? ["SRC-NIOS-SDMIS-OBE"] : n <= 8 ? ["SRC-NIOS-OBE-GUIDELINE", "SRC-NIOS-SDMIS-OBE"] : n <= 10 ? ["SRC-NIOS-FAQ"] : ["SRC-NIOS-FAQ", "SRC-NIOS-SENIOR-SECONDARY-SCHEME"];
  const notes = [];
  if (n !== null && n <= 8) notes.push({ text: "NIOS Open Basic Education has three levels: A (equivalent to Class 3), B (Class 5), C (Class 8), recognised by the Government of India as equivalent to formal schooling; extended to children aged 6-14 in 2000.", source_ids: ["SRC-NIOS-OBE-GUIDELINE", "SRC-NIOS-SDMIS-OBE"] });
  if (n === 9 || n === 10) notes.push({ text: "NIOS Secondary (equivalent to Class X) requires a pass in Class VIII and age 14 or above; 32 subjects including 17 languages are offered.", source_ids: ["SRC-NIOS-FAQ"] });
  if (n === 11 || n === 12) notes.push({ text: "NIOS Senior Secondary (equivalent to Class XII): minimum age 15; pass in at least 5 subjects including one or at most two languages; up to 7 subjects.", source_ids: ["SRC-NIOS-FAQ", "SRC-NIOS-SENIOR-SECONDARY-SCHEME"] });
  out.push(skeleton("nios", y, {
    coverage_status: point ? "partially-sourced" : "not-offered-by-board",
    subjects: n === 12 ? NIOS_SS_SUBJECTS : [],
    subjectStatus: "partially-sourced",
    source_ids: srcs,
    scheme_notes: notes,
    resolve: "NIOS prospectus and self-learning material for the level",
    gaps: [
      point
        ? { gap_id: `G-NIOS-${y.toUpperCase()}-LEVEL-CONTENT`, missing: `${point}: full subject list and course content not yet ingested${n === 12 ? " (only part of the subject table was read)" : ""}`, resolve_from: "NIOS prospectus and NIOS self-learning material", phase: "phase-3" }
        : { gap_id: `G-NIOS-${y.toUpperCase()}-PREPARATION-YEAR`, missing: n === null ? "NIOS does not cover pre-school years; learners use national-early-years" : `NIOS has no separate certification for this year; plan prepares the learner for the next NIOS point (${NIOS_POINT[next]})`, resolve_from: n === null ? "data/curriculum/national-early-years" : "NIOS course content for the next level, split across preparation years by product design", phase: "phase-3" },
    ],
  }));
}
// state boards
for (const y of YEARS) {
  out.push(skeleton("state-boards", y, {
    coverage_status: "gap",
    source_ids: [],
    resolve: "Each state or UT board's official syllabus site",
    gaps: [{ gap_id: `G-STATE-${y.toUpperCase()}-CATALOGUE`, missing: "State and UT boards not yet catalogued; skills mapped from NEP stage via the shared graph", resolve_from: "Official websites of each state and UT school board, one registry entry per board", phase: "phase-3" }],
  }));
}
for (const s of out) write(`data/curriculum/${s.board_id}/${s.skeleton_id}-curriculum-skeleton.json`, s);

// ---------- 7. Board subject to skill map (flattened view) ----------
const mapRows = out.flatMap((s) => s.subjects.map((sub) => ({ board_id: s.board_id, year_id: s.year_id, subject_id: sub.subject_id, subject_name_en: sub.name_en, skill_ids: sub.skill_ids })));
write("data/skill-graph/board-subject-to-skill-domain-map.json", { map_id: "board-subject-to-skill-domain-map", built_on: BUILT_ON, note: "Every board subject maps onto shared skill-graph domains so one learner record works across boards.", rows: mapRows });

// ---------- 8. Synthetic learner profile (test fixture, not a real child) ----------
write("data/examples/synthetic-learner-profile-sample.json", {
  schema_version: "1.0.0",
  learner_id: "3f2b6c1e-8a4d-4f7a-9c2e-1b5d7e9a0c11",
  created_at: "2026-10-21T09:00:00Z",
  is_minor: true,
  birth_year_month: "2017-06",
  nickname: "Test Learner",
  languages: { home_languages: ["hi", "en"], instruction_language: "hi", r1: "Hindi", r2: "English", r3: null },
  enrolment: { board_id: "cbse", current_year_id: "class-04", academic_session: "2026-27", certification_route: "nios-open-schooling" },
  placement: { diagnostic_version: "0.0.0-not-built", placed_year_by_skill: { "area-mathematics": "class-04", "lang-english": "class-03" }, confidence: 0.5 },
  skill_mastery: [{ skill_id: "area-mathematics", mastery: 0.4, evidence_count: 0 }],
  goals: { track_ids: [] },
  accessibility: { audio_first: false, font_scale: 1, reduced_motion: false },
  device_and_network: { primary_device: "shared-family-device", bandwidth: "3g", offline_packs_enabled: true },
  screen_time_policy: { daily_learner_screen_minutes_cap: 60, basis: "guardian-set" },
  guardian_consent: { guardian_ref: "9a1c2e3d-4b5f-4c6a-8d7e-0f1a2b3c4d5e", relationship: "parent", verification_method: "voluntarily-provided-details-verified", scopes: ["learning-delivery", "progress-reports-to-guardian", "diagnostic-assessment"], notice_version: "draft-0", granted_at: "2026-10-21T09:00:00Z", withdrawn_at: null },
  parent_view_prefs: { language: "hi", digest: "weekly" },
  data_retention: { erase_after_inactive_days: 365 },
});

console.log(`wrote ${out.length} curriculum skeletons, ${nodes.length} skill nodes, ${edges.length} edges, ${mapRows.length} subject-map rows`);
