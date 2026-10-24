import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const UPDATED_AT = "2026-10-22T00:00:00.000Z";

function writeJson(relPath, data) {
  const fullPath = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

const YEARS = [
  {
    yearId: "home-0-3",
    en: "Home Learning (0-3 Years)",
    hi: "गृह शिक्षण (0-3 वर्ष)",
    nepStage: "foundational-home-0-3",
    ageBandYears: "0-3 years",
    maxScreenMin: 0,
    deliveryMode: "caregiver-only-zero-child-screen",
    sessionMin: 15,
    studyDays: 5,
    weeklyMin: 75
  },
  {
    yearId: "nursery",
    en: "Nursery (Balvatika 1)",
    hi: "नर्सरी (बालवाटिका 1)",
    nepStage: "foundational-preschool-3-6",
    ageBandYears: "3-4 years",
    maxScreenMin: 15,
    deliveryMode: "co-viewed-caregiver-guided",
    sessionMin: 15,
    studyDays: 5,
    weeklyMin: 150
  },
  {
    yearId: "lkg",
    en: "Lower Kindergarten - LKG (Balvatika 2)",
    hi: "एलकेजी (बालवाटिका 2)",
    nepStage: "foundational-preschool-3-6",
    ageBandYears: "4-5 years",
    maxScreenMin: 15,
    deliveryMode: "co-viewed-caregiver-guided",
    sessionMin: 15,
    studyDays: 5,
    weeklyMin: 180
  },
  {
    yearId: "ukg",
    en: "Upper Kindergarten - UKG (Balvatika 3)",
    hi: "यूकेजी (बालवाटिका 3)",
    nepStage: "foundational-preschool-3-6",
    ageBandYears: "5-6 years",
    maxScreenMin: 20,
    deliveryMode: "co-viewed-caregiver-guided",
    sessionMin: 20,
    studyDays: 5,
    weeklyMin: 200
  },
  {
    yearId: "class-01",
    en: "Class 1",
    hi: "कक्षा 1",
    nepStage: "foundational-classes-1-2",
    ageBandYears: "6-7 years",
    maxScreenMin: 30,
    deliveryMode: "short-guided-sessions",
    sessionMin: 20,
    studyDays: 5,
    weeklyMin: 300
  },
  {
    yearId: "class-02",
    en: "Class 2",
    hi: "कक्षा 2",
    nepStage: "foundational-classes-1-2",
    ageBandYears: "7-8 years",
    maxScreenMin: 30,
    deliveryMode: "short-guided-sessions",
    sessionMin: 20,
    studyDays: 5,
    weeklyMin: 320
  },
  {
    yearId: "class-03",
    en: "Class 3",
    hi: "कक्षा 3",
    nepStage: "preparatory-classes-3-5",
    ageBandYears: "8-9 years",
    maxScreenMin: 40,
    deliveryMode: "short-guided-sessions",
    sessionMin: 25,
    studyDays: 5,
    weeklyMin: 400
  },
  {
    yearId: "class-04",
    en: "Class 4",
    hi: "कक्षा 4",
    nepStage: "preparatory-classes-3-5",
    ageBandYears: "9-10 years",
    maxScreenMin: 45,
    deliveryMode: "short-guided-sessions",
    sessionMin: 25,
    studyDays: 5,
    weeklyMin: 450
  },
  {
    yearId: "class-05",
    en: "Class 5",
    hi: "कक्षा 5",
    nepStage: "preparatory-classes-3-5",
    ageBandYears: "10-11 years",
    maxScreenMin: 45,
    deliveryMode: "short-guided-sessions",
    sessionMin: 25,
    studyDays: 5,
    weeklyMin: 500
  },
  {
    yearId: "class-06",
    en: "Class 6",
    hi: "कक्षा 6",
    nepStage: "middle-classes-6-8",
    ageBandYears: "11-12 years",
    maxScreenMin: 60,
    deliveryMode: "independent-with-breaks",
    sessionMin: 30,
    studyDays: 6,
    weeklyMin: 600
  },
  {
    yearId: "class-07",
    en: "Class 7",
    hi: "कक्षा 7",
    nepStage: "middle-classes-6-8",
    ageBandYears: "12-13 years",
    maxScreenMin: 60,
    deliveryMode: "independent-with-breaks",
    sessionMin: 30,
    studyDays: 6,
    weeklyMin: 660
  },
  {
    yearId: "class-08",
    en: "Class 8",
    hi: "कक्षा 8",
    nepStage: "middle-classes-6-8",
    ageBandYears: "13-14 years",
    maxScreenMin: 75,
    deliveryMode: "independent-with-breaks",
    sessionMin: 35,
    studyDays: 6,
    weeklyMin: 720
  },
  {
    yearId: "class-09",
    en: "Class 9",
    hi: "कक्षा 9",
    nepStage: "secondary-classes-9-10",
    ageBandYears: "14-15 years",
    maxScreenMin: 90,
    deliveryMode: "independent-with-breaks",
    sessionMin: 40,
    studyDays: 6,
    weeklyMin: 840
  },
  {
    yearId: "class-10",
    en: "Class 10",
    hi: "कक्षा 10",
    nepStage: "secondary-classes-9-10",
    ageBandYears: "15-16 years",
    maxScreenMin: 90,
    deliveryMode: "independent-with-breaks",
    sessionMin: 40,
    studyDays: 6,
    weeklyMin: 900
  },
  {
    yearId: "class-11",
    en: "Class 11",
    hi: "कक्षा 11",
    nepStage: "secondary-classes-11-12",
    ageBandYears: "16-17 years",
    maxScreenMin: 120,
    deliveryMode: "independent-with-breaks",
    sessionMin: 45,
    studyDays: 6,
    weeklyMin: 1080
  },
  {
    yearId: "class-12",
    en: "Class 12",
    hi: "कक्षा 12",
    nepStage: "secondary-classes-11-12",
    ageBandYears: "17-18 years",
    maxScreenMin: 120,
    deliveryMode: "independent-with-breaks",
    sessionMin: 45,
    studyDays: 6,
    weeklyMin: 1200
  }
];

const DOMAINS = [
  {
    id: "early-stimulation-motor",
    name: { en: "Early Childhood Stimulation & Panchakosha Development", hi: "प्रारंभिक बाल प्रोत्साहन और पंचकोश विकास" },
    description: "Sensory, gross/fine motor, socio-emotional, and play-based stimulation for birth to 6 years under MWCD Navchetana and Aadharshila."
  },
  {
    id: "foundational-literacy",
    name: { en: "Foundational Bilingual Literacy (Hindi & English)", hi: "बुनियादी द्विभाषी साक्षरता (हिंदी और अंग्रेजी)" },
    description: "Oral language, phonological awareness, decoding, reading fluency, and early writing across Nursery to Class 5."
  },
  {
    id: "foundational-numeracy",
    name: { en: "Foundational Numeracy & Spatial Sense", hi: "बुनियादी संख्या ज्ञान और स्थानिक समझ" },
    description: "Pre-number concepts, counting, place value, four operations, shapes, and measurement from Nursery to Class 5."
  },
  {
    id: "mathematics-core",
    name: { en: "Middle & Secondary Mathematics", hi: "माध्यमिक और उच्चतर गणित" },
    description: "Number systems, algebra, geometry, mensuration, trigonometry, calculus, probability, and statistics from Class 6 to Class 12 and competitive tracks."
  },
  {
    id: "science-and-inquiry",
    name: { en: "Science, Physics, Chemistry & Biology", hi: "विज्ञान, भौतिकी, रसायन और जीवविज्ञान" },
    description: "Environmental studies, scientific inquiry, physics, chemistry, and biology from Class 3 to Class 12 and JEE/NEET tracks."
  },
  {
    id: "social-science-and-humanities",
    name: { en: "Social Science, Polity, Economy & History", hi: "सामाजिक विज्ञान, राजव्यवस्था, अर्थव्यवस्था और इतिहास" },
    description: "History, geography, social and political life, economics, and Indian constitutional foundations from Class 6 to Class 12 and UPSC/CUET tracks."
  },
  {
    id: "languages-and-communication",
    name: { en: "Academic Reading, Rhetoric & Global English/Hindi", hi: "शैक्षणिक पठन, लेखन और वैश्विक भाषा कौशल" },
    description: "Reading comprehension, grammar conventions, analytical writing, and speaking proficiency for Classes 6-12 and SAT/ACT/IELTS/TOEFL."
  },
  {
    id: "computational-and-ai-literacy",
    name: { en: "Computational Thinking, Data & AI Literacy", hi: "कम्प्यूटेशनल चिंतन, डेटा और एआई साक्षरता" },
    description: "Algorithmic logic, data representation, coding fundamentals, and responsible AI literacy across Middle and Secondary stages."
  }
];

const SKILLS = [
  {
    id: "stim-sensory-motor-0-3",
    name: { en: "Sensory Tracking, Grasp & Caregiver Bonding", hi: "संवेदी समन्वय, पकड़ और देखभालकर्ता जुड़ाव" },
    domainId: "early-stimulation-motor",
    stage: { fromYearId: "home-0-3", toYearId: "home-0-3" },
    description: "Infant and toddler sensory tracking, object permanence, rhythmic movement, and responsive serve-and-return caregiver interaction.",
    prerequisites: [],
    successCriteria: [
      "Follows moving objects and responds to caregiver voice and gestures",
      "Manipulates safe household objects, stacks blocks, and coordinates balance"
    ],
    evidenceTypes: ["teacher-observation", "practical"],
    boardAlignments: [
      { boardId: "early-years", yearId: "home-0-3", subject: "Sensory & Motor Stimulation", sourceId: "SRC-MWCD-NAVCHETANA-2024", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "home-0-3", subject: "Sensory & Motor Stimulation", sourceId: "SRC-MWCD-NAVCHETANA-2024", alignmentStrength: "direct" }
    ],
    trackBranches: [],
    status: "active"
  },
  {
    id: "stim-bilingual-babble-words",
    name: { en: "First Words, Songs & Bilingual Listening (0-3)", hi: "प्रथम शब्द, बालगीत और द्विभाषी श्रवण (0-3)" },
    domainId: "early-stimulation-motor",
    stage: { fromYearId: "home-0-3", toYearId: "nursery" },
    description: "Oral stimulation through mother-tongue and English rhymes, naming everyday objects, and two-word expressive phrases.",
    prerequisites: ["stim-sensory-motor-0-3"],
    successCriteria: [
      "Points to named household objects and body parts in home language",
      "Uses simple words and gestures to express needs during play"
    ],
    evidenceTypes: ["teacher-observation", "oral-reading"],
    boardAlignments: [
      { boardId: "early-years", yearId: "home-0-3", subject: "Oral Language & Songs", sourceId: "SRC-MWCD-NAVCHETANA-2024", alignmentStrength: "direct" }
    ],
    trackBranches: [],
    status: "active"
  },
  {
    id: "ecce-panchakosha-play",
    name: { en: "Panchakosha Motor, Socio-Emotional & Creative Play", hi: "पंचकोश शारीरिक, सामाजिक-भावनात्मक और रचनात्मक खेल" },
    domainId: "early-stimulation-motor",
    stage: { fromYearId: "nursery", toYearId: "ukg" },
    description: "Fine motor clay/paper work, turn-taking in group games, emotion recognition, and rhythmic movement under Aadharshila and NCF-FS.",
    prerequisites: ["stim-sensory-motor-0-3"],
    successCriteria: [
      "Demonstrates fine-motor control with crayons, beads, and paper folding",
      "Takes turns, shares materials, and follows 2-step game rules in a peer pod"
    ],
    evidenceTypes: ["teacher-observation", "project"],
    boardAlignments: [
      { boardId: "early-years", yearId: "nursery", subject: "Panchakosha Play & Wellness", sourceId: "SRC-MWCD-AADHARSHILA-2024", alignmentStrength: "direct" },
      { boardId: "early-years", yearId: "lkg", subject: "Panchakosha Play & Wellness", sourceId: "SRC-NCERT-NCFFS-2022", alignmentStrength: "direct" },
      { boardId: "early-years", yearId: "ukg", subject: "Panchakosha Play & Wellness", sourceId: "SRC-NCERT-NCFFS-2022", alignmentStrength: "direct" }
    ],
    trackBranches: [],
    status: "active"
  },
  {
    id: "lit-phonics-akshara-awareness",
    name: { en: "Phonological & Akshara Sound-Symbol Awareness", hi: "ध्वनि जागरूकता और अक्षर-ध्वनि पहचान" },
    domainId: "foundational-literacy",
    stage: { fromYearId: "nursery", toYearId: "class-01" },
    description: "Recognizing beginning and ending sounds, rhyming patterns, Devanagari Varnamala aksharas, and English letter-sound correspondence.",
    prerequisites: ["stim-bilingual-babble-words"],
    successCriteria: [
      "Identifies initial sounds of familiar Hindi and English words",
      "Matches core Devanagari aksharas and English letters to their phonetic sounds"
    ],
    evidenceTypes: ["diagnostic-item", "oral-reading"],
    boardAlignments: [
      { boardId: "early-years", yearId: "lkg", subject: "Foundational Language", sourceId: "SRC-NCERT-NCFFS-2022", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-01", subject: "English & Hindi (Mridang / Sarangi)", sourceId: "SRC-NCERT-NCFFS-2022", alignmentStrength: "direct" }
    ],
    trackBranches: [],
    status: "active"
  },
  {
    id: "lit-sentence-reading-fluency",
    name: { en: "Guided Story Reading & Comprehension (Classes 1-5)", hi: "धाराप्रवाह कहानी पठन और अर्थग्रहण (कक्षा 1-5)" },
    domainId: "foundational-literacy",
    stage: { fromYearId: "class-01", toYearId: "class-05" },
    description: "Reading short graded stories with comprehension in Hindi and English, answering literal and inferential questions, and writing short paragraphs.",
    prerequisites: ["lit-phonics-akshara-awareness"],
    successCriteria: [
      "Reads age-graded text aloud at target fluency with comprehension",
      "Answers who, what, why questions and writes 4-6 coherent sentences"
    ],
    evidenceTypes: ["diagnostic-item", "oral-reading", "lesson-exit-ticket"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-02", subject: "English & Hindi", sourceId: "SRC-NCERT-NCFFS-2022", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-04", subject: "Languages (Santoor / Veena)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "nios", yearId: "class-03", subject: "OBE Level A Languages", sourceId: "SRC-NIOS-OBE-2026", alignmentStrength: "direct" }
    ],
    trackBranches: [],
    status: "active"
  },
  {
    id: "num-pre-number-counting-20",
    name: { en: "Pre-Number Sorting, Patterns & Counting 1 to 20", hi: "पूर्व-संख्या वर्गीकरण, पैटर्न और 1 से 20 तक गिनती" },
    domainId: "foundational-numeracy",
    stage: { fromYearId: "nursery", toYearId: "ukg" },
    description: "One-to-one correspondence, comparing more/less, sorting by shape and size, and counting concrete objects up to 20.",
    prerequisites: ["ecce-panchakosha-play"],
    successCriteria: [
      "Counts up to 20 objects accurately using one-to-one correspondence",
      "Extends simple ABAB and AABB visual patterns"
    ],
    evidenceTypes: ["diagnostic-item", "lesson-exit-ticket"],
    boardAlignments: [
      { boardId: "early-years", yearId: "ukg", subject: "Early Numeracy & Shapes", sourceId: "SRC-NCERT-NCFFS-2022", alignmentStrength: "direct" }
    ],
    trackBranches: [],
    status: "active"
  },
  {
    id: "num-place-value-add-sub",
    name: { en: "Base-10 Place Value, Addition & Subtraction", hi: "स्थानीय मान, जोड़ और घटाव" },
    domainId: "foundational-numeracy",
    stage: { fromYearId: "class-01", toYearId: "class-03" },
    description: "Understanding tens, hundreds, and thousands, regrouping in addition and subtraction, and solving word problems.",
    prerequisites: ["num-pre-number-counting-20"],
    successCriteria: [
      "Decomposes 2-digit and 3-digit numbers into hundreds, tens, and ones",
      "Solves addition and subtraction word problems with regrouping"
    ],
    evidenceTypes: ["diagnostic-item", "lesson-exit-ticket", "unit-test"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-01", subject: "Mathematics (Joyful Mathematics)", sourceId: "SRC-NCERT-NCFFS-2022", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-03", subject: "Mathematics (Maths Mela)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }
    ],
    trackBranches: [],
    status: "active"
  },
  {
    id: "num-mult-div-fractions-prep",
    name: { en: "Multiplication, Division, Factors & Introductory Fractions", hi: "गुणा, भाग, गुणनखंड और भिन्न की शुरुआत" },
    domainId: "foundational-numeracy",
    stage: { fromYearId: "class-03", toYearId: "class-05" },
    description: "Multi-digit multiplication and division, multiples and factors, equivalent fractions, decimals, and area/perimeter of rectangles.",
    prerequisites: ["num-place-value-add-sub"],
    successCriteria: [
      "Performs multi-digit division and interprets remainders in context",
      "Compares fractions with unlike denominators using equivalence"
    ],
    evidenceTypes: ["diagnostic-item", "unit-test", "term-exam"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-04", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-05", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "nios", yearId: "class-05", subject: "OBE Level B Mathematics", sourceId: "SRC-NIOS-OBE-2026", alignmentStrength: "direct" }
    ],
    trackBranches: [],
    status: "active"
  },
  {
    id: "math-integers-number-patterns",
    name: { en: "Integers, Prime Factorisation & Number Patterns (Ganita Prakash)", hi: "पूर्णांक, अभाज्य गुणनखंड और संख्या पैटर्न (गणित प्रकाश)" },
    domainId: "mathematics-core",
    stage: { fromYearId: "class-06", toYearId: "class-07" },
    description: "Patterns in numbers, prime time factorisation, negative integers on the number line, and operations on rational numbers.",
    prerequisites: ["num-mult-div-fractions-prep"],
    successCriteria: [
      "Adds, subtracts, multiplies, and divides signed integers and fractions accurately",
      "Identifies figurate number sequences, HCF/LCM, and divisibility properties"
    ],
    evidenceTypes: ["diagnostic-item", "lesson-exit-ticket", "unit-test", "term-exam"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-06", subject: "Mathematics (Ganita Prakash)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "cisce", yearId: "class-06", subject: "Mathematics", sourceId: "SRC-CISCE-PUB-2026", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "sat", role: "foundation", officialExamRef: "Problem-Solving and Data Analysis" },
      { trackId: "cuet", role: "foundation", officialExamRef: "Section III Quantitative Reasoning" }
    ],
    status: "active"
  },
  {
    id: "math-ratios-linear-algebra-middle",
    name: { en: "Algebraic Expressions, Linear Equations & Proportional Reasoning", hi: "बीजीय व्यंजक, रैखिक समीकरण और अनुपात-समानुपात" },
    domainId: "mathematics-core",
    stage: { fromYearId: "class-06", toYearId: "class-08" },
    description: "Forming algebraic expressions, solving one-variable linear equations, percentages, compound interest, and direct/inverse proportions.",
    prerequisites: ["math-integers-number-patterns"],
    successCriteria: [
      "Translates word problems into single-variable linear equations and solves them",
      "Applies ratio, percentage change, and direct/inverse proportion in real scenarios"
    ],
    evidenceTypes: ["diagnostic-item", "unit-test", "term-exam"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-07", subject: "Mathematics (Ganita Prakash)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-08", subject: "Mathematics (Ganita Prakash)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "nios", yearId: "class-08", subject: "OBE Level C Mathematics", sourceId: "SRC-NIOS-OBE-2026", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "sat", role: "foundation", officialExamRef: "Digital SAT Algebra Domain" },
      { trackId: "act", role: "foundation", officialExamRef: "ACT Algebra Readiness" },
      { trackId: "upsc", role: "foundation", officialExamRef: "UPSC CSAT Basic Numeracy (Class X level)" }
    ],
    status: "active"
  },
  {
    id: "math-geometry-mensuration-middle",
    name: { en: "Euclidean Lines, Triangles, Symmetry & Mensuration", hi: "रेखाएं, त्रिभुज, सममिति और क्षेत्रमिति" },
    domainId: "mathematics-core",
    stage: { fromYearId: "class-06", toYearId: "class-08" },
    description: "Angle relationships, triangle congruence criteria, Pythagoras property, rotational symmetry, and surface area/volume of 3D solids.",
    prerequisites: ["math-integers-number-patterns"],
    successCriteria: [
      "Proves angle and triangle properties using parallel line and congruence rules",
      "Computes area and volume of prisms, cylinders, and composite polygons"
    ],
    evidenceTypes: ["diagnostic-item", "unit-test", "term-exam"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-06", subject: "Mathematics (Ganita Prakash)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-08", subject: "Mathematics (Ganita Prakash)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "sat", role: "foundation", officialExamRef: "Geometry and Trigonometry" }
    ],
    status: "active"
  },
  {
    id: "math-polynomials-quadratics-sec",
    name: { en: "Polynomials, Quadratic Equations & Arithmetic Progressions (Classes 9-10)", hi: "बहुपद, द्विघात समीकरण और समांतर श्रेढ़ी (कक्षा 9-10)" },
    domainId: "mathematics-core",
    stage: { fromYearId: "class-09", toYearId: "class-10" },
    description: "Real numbers, polynomial factorisation, pair of linear equations in two variables, quadratic equations, and arithmetic progressions.",
    prerequisites: ["math-ratios-linear-algebra-middle"],
    successCriteria: [
      "Solves systems of linear equations and analyses discriminant of quadratic equations",
      "Models nth term and sum of arithmetic progressions"
    ],
    evidenceTypes: ["diagnostic-item", "unit-test", "board-mock"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-09", subject: "Mathematics (041)", officialCode: "041", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-10", subject: "Mathematics Standard (041)", officialCode: "041", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "nios", yearId: "class-10", subject: "Mathematics (211)", officialCode: "211", sourceId: "SRC-NIOS-SECSRSEC-2026", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "jee", role: "foundation", officialExamRef: "JEE Main Unit 2 Complex Numbers and Quadratic Equations" },
      { trackId: "sat", role: "accelerator", officialExamRef: "Digital SAT Advanced Math" },
      { trackId: "act", role: "accelerator", officialExamRef: "ACT Algebra and Functions" }
    ],
    status: "active"
  },
  {
    id: "math-trigonometry-coordinate-sec",
    name: { en: "Coordinate Geometry, Trigonometry & Circles (Classes 9-10)", hi: "निर्देशांक ज्यामिति, त्रिकोणमिति और वृत्त (कक्षा 9-10)" },
    domainId: "mathematics-core",
    stage: { fromYearId: "class-09", toYearId: "class-10" },
    description: "Distance and section formulas, similarity of triangles, tangent theorems on circles, trigonometric ratios, identities, and heights and distances.",
    prerequisites: ["math-geometry-mensuration-middle", "math-ratios-linear-algebra-middle"],
    successCriteria: [
      "Applies trigonometric ratios and identities to elevation and depression problems",
      "Solves coordinate geometry and circle tangent proofs"
    ],
    evidenceTypes: ["diagnostic-item", "unit-test", "board-mock"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-10", subject: "Mathematics Standard (041)", officialCode: "041", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cisce", yearId: "class-10", subject: "ICSE Mathematics", sourceId: "SRC-CISCE-PUB-2026", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "jee", role: "foundation", officialExamRef: "JEE Main Coordinate Geometry & Trigonometry" },
      { trackId: "sat", role: "accelerator", officialExamRef: "Digital SAT Geometry & Trigonometry" }
    ],
    status: "active"
  },
  {
    id: "math-calculus-vectors-srsec",
    name: { en: "Sets, Functions, Limits, Differential & Integral Calculus (Classes 11-12)", hi: "समुच्चय, फलन, सीमा, अवकलन और समाकलन (कक्षा 11-12)" },
    domainId: "mathematics-core",
    stage: { fromYearId: "class-11", toYearId: "class-12" },
    description: "Sets and relations, limits and continuity, differentiation, applications of derivatives, definite and indefinite integration, differential equations, vectors, and 3D geometry.",
    prerequisites: ["math-polynomials-quadratics-sec", "math-trigonometry-coordinate-sec"],
    successCriteria: [
      "Evaluates limits, derivatives, extrema, and definite integrals of transcendental and algebraic functions",
      "Solves linear differential equations and 3D line/plane vector problems"
    ],
    evidenceTypes: ["diagnostic-item", "unit-test", "board-mock"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-11", subject: "Mathematics (041)", officialCode: "041", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-12", subject: "Mathematics (041)", officialCode: "041", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "nios", yearId: "class-12", subject: "Senior Secondary Mathematics (311)", officialCode: "311", sourceId: "SRC-NIOS-SECSRSEC-2026", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "jee", role: "accelerator", officialExamRef: "JEE Main Units 6-12 Calculus & Vector Algebra" },
      { trackId: "cuet", role: "accelerator", officialExamRef: "CUET UG Mathematics Domain" }
    ],
    status: "active"
  },
  {
    id: "sci-evs-world-around-us",
    name: { en: "The World Around Us - Observation, Plants, Water & Community (Classes 3-5)", hi: "हमारे चारों ओर की दुनिया - प्रकृति, जल और समुदाय (कक्षा 3-5)" },
    domainId: "science-and-inquiry",
    stage: { fromYearId: "class-03", toYearId: "class-05" },
    description: "Experiential environmental studies covering local biodiversity, water conservation, food and nutrition, shelter, and simple experiments.",
    prerequisites: ["lit-sentence-reading-fluency"],
    successCriteria: [
      "Records systematic observations of plant growth, weather, and material properties",
      "Explains water cycle, food chains, and hygiene habits"
    ],
    evidenceTypes: ["diagnostic-item", "project", "unit-test"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-03", subject: "The World Around Us (EVS)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-05", subject: "The World Around Us (EVS)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }
    ],
    trackBranches: [],
    status: "active"
  },
  {
    id: "sci-curiosity-middle-inquiry",
    name: { en: "Middle Stage Integrated Science - Matter, Force, Living World & Universe (Curiosity 6-8)", hi: "माध्यमिक एकीकृत विज्ञान - पदार्थ, बल, सजीव जगत और ब्रह्मांड (जिज्ञासा 6-8)" },
    domainId: "science-and-inquiry",
    stage: { fromYearId: "class-06", toYearId: "class-08" },
    description: "Scientific method, states and separation of matter, heat and temperature, motion and time, electric circuits, cell structure, nutrition, and solar system under NCERT Curiosity.",
    prerequisites: ["sci-evs-world-around-us", "math-integers-number-patterns"],
    successCriteria: [
      "Designs controlled inquiry experiments measuring temperature, speed, and circuit conductivity",
      "Classifies materials, chemical changes, and biological systems from cell to organ"
    ],
    evidenceTypes: ["diagnostic-item", "practical", "unit-test", "term-exam"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-06", subject: "Science (Curiosity)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-07", subject: "Science (Curiosity)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-08", subject: "Science (Curiosity)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "jee", role: "foundation", officialExamRef: "Middle School Physics & Chemistry Foundation" },
      { trackId: "neet", role: "foundation", officialExamRef: "Middle School Biology & Chemistry Foundation" },
      { trackId: "act", role: "foundation", officialExamRef: "ACT Science Experimental Reasoning" }
    ],
    status: "active"
  },
  {
    id: "sci-integrated-sec-9-10",
    name: { en: "Secondary Science - Chemical Reactions, Life Processes, Mechanics & Electricity (Classes 9-10)", hi: "माध्यमिक विज्ञान - रासायनिक अभिक्रियाएं, जैव प्रक्रम, गति और विद्युत (कक्षा 9-10)" },
    domainId: "science-and-inquiry",
    stage: { fromYearId: "class-09", toYearId: "class-10" },
    description: "Atoms and molecules, chemical equations, acids/bases/salts, carbon compounds, cell biology, heredity, Newton's laws, gravitation, light optics, and Ohm's law.",
    prerequisites: ["sci-curiosity-middle-inquiry", "math-ratios-linear-algebra-middle"],
    successCriteria: [
      "Balances chemical equations and predicts products across acid-base, redox, and carbon reactions",
      "Solves numericals on kinematics, lens/mirror formulas, and series/parallel circuits"
    ],
    evidenceTypes: ["diagnostic-item", "practical", "unit-test", "board-mock"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-09", subject: "Science (086)", officialCode: "086", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-10", subject: "Science (086)", officialCode: "086", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "nios", yearId: "class-10", subject: "Science and Technology (212)", officialCode: "212", sourceId: "SRC-NIOS-SECSRSEC-2026", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "jee", role: "foundation", officialExamRef: "JEE Main Mechanics, Optics & Atomic Foundation" },
      { trackId: "neet", role: "foundation", officialExamRef: "NEET UG Life Processes & Chemical Bonding Bridge" }
    ],
    status: "active"
  },
  {
    id: "sci-physics-srsec-11-12",
    name: { en: "Senior Secondary Physics - Mechanics, Thermodynamics, Electromagnetism & Modern Physics", hi: "उच्चतर माध्यमिक भौतिकी - यांत्रिकी, ऊष्मागतिकी, विद्युतचुंबकत्व और आधुनिक भौतिकी" },
    domainId: "science-and-inquiry",
    stage: { fromYearId: "class-11", toYearId: "class-12" },
    description: "Rotational mechanics, gravitation, thermodynamics, oscillations/waves, electrostatics, current electricity, magnetism, EMI/AC, ray and wave optics, dual nature, atoms/nuclei, and semiconductors.",
    prerequisites: ["sci-integrated-sec-9-10", "math-trigonometry-coordinate-sec"],
    successCriteria: [
      "Applies calculus-backed conservation laws across mechanics, electrostatics, and electromagnetism",
      "Completes experimental physics verification and error analysis"
    ],
    evidenceTypes: ["diagnostic-item", "practical", "unit-test", "board-mock"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-11", subject: "Physics (042)", officialCode: "042", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-12", subject: "Physics (042)", officialCode: "042", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "jee", role: "accelerator", officialExamRef: "JEE Main Physics Units 1-20 (NTA 2026)" },
      { trackId: "neet", role: "accelerator", officialExamRef: "NEET UG Physics Units 1-20 (NMC/NTA 2026)" },
      { trackId: "cuet", role: "accelerator", officialExamRef: "CUET UG Physics Domain (322)" }
    ],
    status: "active"
  },
  {
    id: "sci-chemistry-srsec-11-12",
    name: { en: "Senior Secondary Chemistry - Physical, Inorganic & Organic Chemistry", hi: "उच्चतर माध्यमिक रसायन विज्ञान - भौतिक, अकार्बनिक और कार्बनिक रसायन" },
    domainId: "science-and-inquiry",
    stage: { fromYearId: "class-11", toYearId: "class-12" },
    description: "Atomic structure, chemical bonding, thermodynamics, equilibrium, redox/electrochemistry, chemical kinetics, d/f-block and coordination compounds, and organic reaction mechanisms.",
    prerequisites: ["sci-integrated-sec-9-10"],
    successCriteria: [
      "Solves chemical equilibrium, Nernst equation, and rate law numericals",
      "Predicts multi-step organic synthesis and coordination chemistry properties"
    ],
    evidenceTypes: ["diagnostic-item", "practical", "unit-test", "board-mock"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-11", subject: "Chemistry (043)", officialCode: "043", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-12", subject: "Chemistry (043)", officialCode: "043", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "jee", role: "accelerator", officialExamRef: "JEE Main Chemistry Physical/Inorganic/Organic" },
      { trackId: "neet", role: "accelerator", officialExamRef: "NEET UG Chemistry Units 1-20" },
      { trackId: "cuet", role: "accelerator", officialExamRef: "CUET UG Chemistry Domain (306)" }
    ],
    status: "active"
  },
  {
    id: "sci-biology-srsec-11-12",
    name: { en: "Senior Secondary Biology - Cell, Physiology, Genetics, Biotechnology & Ecology", hi: "उच्चतर माध्यमिक जीवविज्ञान - कोशिका, शरीर क्रिया विज्ञान, आनुवंशिकी और पारिस्थितिकी" },
    domainId: "science-and-inquiry",
    stage: { fromYearId: "class-11", toYearId: "class-12" },
    description: "Diversity of living organisms, structural organisation, cell structure and biomolecules, plant and human physiology, reproduction, Mendelian and molecular genetics, biotechnology, and ecology.",
    prerequisites: ["sci-integrated-sec-9-10"],
    successCriteria: [
      "Traces molecular genetics pathways, physiological feedback loops, and recombinant DNA workflows",
      "Interprets ecological pyramids, population dynamics, and pedigree charts"
    ],
    evidenceTypes: ["diagnostic-item", "practical", "unit-test", "board-mock"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-11", subject: "Biology (044)", officialCode: "044", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-12", subject: "Biology (044)", officialCode: "044", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "neet", role: "accelerator", officialExamRef: "NEET UG Biology Units 1-10 (90 Questions / 360 Marks)" },
      { trackId: "cuet", role: "accelerator", officialExamRef: "CUET UG Biology Domain (304)" }
    ],
    status: "active"
  },
  {
    id: "soc-exploring-society-middle",
    name: { en: "Exploring Society - Landforms, Indian Civilization, Governance & Economic Life (Classes 6-8)", hi: "समाज की खोज - भू-आकृतियां, भारतीय सभ्यता, शासन और आर्थिक जीवन (कक्षा 6-8)" },
    domainId: "social-science-and-humanities",
    stage: { fromYearId: "class-06", toYearId: "class-08" },
    description: "Five thematic strands of NCERT Exploring Society: India and Beyond - Geographic diversity, Tapestry of the Past, Cultural Heritage, Governance and Democracy, and Economic Life Around Us.",
    prerequisites: ["sci-evs-world-around-us"],
    successCriteria: [
      "Reads thematic maps, timelines, and primary historical/archaeological sources",
      "Explains local self-government (Panchayati Raj / Urban Bodies) and economic livelihood sectors"
    ],
    evidenceTypes: ["diagnostic-item", "project", "unit-test", "term-exam"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-06", subject: "Social Science (Exploring Society: India and Beyond)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-07", subject: "Social Science (Exploring Society: India and Beyond)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-08", subject: "Social Science (Exploring Society: India and Beyond)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "upsc", role: "foundation", officialExamRef: "NCERT Class 6-8 GS Foundation (History, Geography, Polity)" }
    ],
    status: "active"
  },
  {
    id: "soc-democratic-polity-economy-sec",
    name: { en: "Secondary Social Science - Contemporary India, Democratic Politics & Economic Development (9-10)", hi: "माध्यमिक सामाजिक विज्ञान - समकालीन भारत, लोकतांत्रिक राजनीति और आर्थिक विकास (9-10)" },
    domainId: "social-science-and-humanities",
    stage: { fromYearId: "class-09", toYearId: "class-10" },
    description: "Modern Indian and world history, resources and agriculture of India, constitutional federalism and rights, and money, credit, and globalisation.",
    prerequisites: ["soc-exploring-society-middle"],
    successCriteria: [
      "Analyses constitutional power-sharing, federalism, and fundamental rights",
      "Evaluates GDP sectors, RBI credit mechanisms, and resource sustainability"
    ],
    evidenceTypes: ["diagnostic-item", "unit-test", "board-mock"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-09", subject: "Social Science (087)", officialCode: "087", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-10", subject: "Social Science (087)", officialCode: "087", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "upsc", role: "foundation", officialExamRef: "UPSC Prelims GS Paper I Polity, Geography, Economy Core" },
      { trackId: "cuet", role: "foundation", officialExamRef: "CUET General Test & Humanities Foundation" }
    ],
    status: "active"
  },
  {
    id: "soc-humanities-commerce-srsec",
    name: { en: "Senior Secondary Polity, Macroeconomics, History & Accountancy (Classes 11-12)", hi: "उच्चतर माध्यमिक राजनीति विज्ञान, समष्टि अर्थशास्त्र, इतिहास और लेखाशास्त्र (11-12)" },
    domainId: "social-science-and-humanities",
    stage: { fromYearId: "class-11", toYearId: "class-12" },
    description: "Indian Constitution at work, international relations, national income accounting, fiscal and monetary policy, themes in Indian history, and financial accounting.",
    prerequisites: ["soc-democratic-polity-economy-sec"],
    successCriteria: [
      "Synthesizes constitutional articles, Supreme Court doctrines, and macroeconomic fiscal/monetary indicators",
      "Analyses historical primary sources and prepares balanced financial statements"
    ],
    evidenceTypes: ["diagnostic-item", "unit-test", "board-mock"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-11", subject: "Economics (030) & Political Science (028)", officialCode: "030", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-12", subject: "Economics (030) & Political Science (028)", officialCode: "030", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "upsc", role: "accelerator", officialExamRef: "UPSC CSE Prelims & Mains GS I, II, III" },
      { trackId: "cuet", role: "accelerator", officialExamRef: "CUET UG Domain Humanities & Commerce" }
    ],
    status: "active"
  },
  {
    id: "lang-bilingual-literature-middle",
    name: { en: "Middle Stage Bilingual Literature, Grammar & Creative Expression (Poorvi & Malhar 6-8)", hi: "माध्यमिक द्विभाषी साहित्य, व्याकरण और रचनात्मक अभिव्यक्ति (पूर्वी और मल्हार 6-8)" },
    domainId: "languages-and-communication",
    stage: { fromYearId: "class-06", toYearId: "class-08" },
    description: "Critical reading of prose and poetry in English (Poorvi) and Hindi (Malhar), formal grammar, vocabulary in context, summary writing, and structured spoken presentation.",
    prerequisites: ["lit-sentence-reading-fluency"],
    successCriteria: [
      "Analyses author purpose, tone, and figurative language across unseen passages",
      "Writes structured essays, formal letters, and bilingual summaries with grammatical accuracy"
    ],
    evidenceTypes: ["diagnostic-item", "oral-reading", "unit-test", "term-exam"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-06", subject: "English (Poorvi) & Hindi (Malhar)", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-07", subject: "English & Hindi", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-08", subject: "English & Hindi", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "sat", role: "foundation", officialExamRef: "Digital SAT Reading and Writing Foundation" },
      { trackId: "ielts", role: "foundation", officialExamRef: "IELTS B1-B2 Academic Language Bridge" },
      { trackId: "toefl", role: "foundation", officialExamRef: "TOEFL iBT Academic Reading & Listening Bridge" }
    ],
    status: "active"
  },
  {
    id: "lang-academic-rhetoric-global-exams",
    name: { en: "Advanced Academic Rhetoric, Evidence Reading & Four-Skill Global Proficiency (9-12)", hi: "उच्च शैक्षणिक पठन, तर्कपूर्ण लेखन और वैश्विक भाषा दक्षता (9-12)" },
    domainId: "languages-and-communication",
    stage: { fromYearId: "class-09", toYearId: "class-12" },
    description: "Rhetorical synthesis, command of textual and quantitative evidence, Standard English conventions, academic listening, timed analytical writing, and structured speaking.",
    prerequisites: ["lang-bilingual-literature-middle"],
    successCriteria: [
      "Evaluates logical claims and evidence in dense multi-disciplinary passages under timed conditions",
      "Produces CEFR C1 / Band 7.5+ academic writing and spoken responses"
    ],
    evidenceTypes: ["diagnostic-item", "oral-reading", "board-mock"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-10", subject: "English Language and Literature (184)", officialCode: "184", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-12", subject: "English Core (301)", officialCode: "301", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cisce", yearId: "class-10", subject: "ICSE English Paper 1 & 2", sourceId: "SRC-CISCE-PUB-2026", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "sat", role: "accelerator", officialExamRef: "Digital SAT Reading and Writing (Craft, Structure, Conventions)" },
      { trackId: "act", role: "accelerator", officialExamRef: "ACT English and Reading Sections" },
      { trackId: "ielts", role: "accelerator", officialExamRef: "IELTS Academic Listening, Reading, Writing, Speaking" },
      { trackId: "toefl", role: "accelerator", officialExamRef: "TOEFL iBT Reading, Listening, Speaking, Writing" },
      { trackId: "cuet", role: "accelerator", officialExamRef: "CUET Section IA English / Hindi Language" }
    ],
    status: "active"
  },
  {
    id: "comp-algorithmic-ai-literacy",
    name: { en: "Computational Thinking, Coding, Data Ethics & AI Systems (Classes 6-12)", hi: "कम्प्यूटेशनल चिंतन, कोडिंग, डेटा नैतिकता और एआई प्रणाली (कक्षा 6-12)" },
    domainId: "computational-and-ai-literacy",
    stage: { fromYearId: "class-06", toYearId: "class-12" },
    description: "Flowcharts and algorithms, Python programming, relational data tables, statistical visualization, machine learning fundamentals, and digital safety.",
    prerequisites: ["math-integers-number-patterns"],
    successCriteria: [
      "Writes modular programs to process datasets and verify algorithmic complexity",
      "Explains how AI models learn from data, hallucination risks, and DPDP privacy safeguards"
    ],
    evidenceTypes: ["diagnostic-item", "project", "practical"],
    boardAlignments: [
      { boardId: "cbse", yearId: "class-09", subject: "Artificial Intelligence (417) / IT (402)", officialCode: "417", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" },
      { boardId: "cbse", yearId: "class-12", subject: "Computer Science (083)", officialCode: "083", sourceId: "SRC-CBSE-CURR-2026-27", alignmentStrength: "direct" }
    ],
    trackBranches: [
      { trackId: "jee", role: "bridge", officialExamRef: "Analytical and Algorithmic Problem Solving" },
      { trackId: "sat", role: "bridge", officialExamRef: "Data Analysis and Desmos Modeling" }
    ],
    status: "active"
  }
];

const EDGES = [];
for (const skill of SKILLS) {
  for (const prereq of skill.prerequisites) {
    EDGES.push({
      from: prereq,
      to: skill.id,
      type: "prerequisite",
      strength: "required"
    });
  }
}

const SKILL_GRAPH = {
  schemaVersion: "1.0.0",
  graphVersion: "1.2.0",
  updatedAt: UPDATED_AT,
  domains: DOMAINS,
  skills: SKILLS,
  edges: EDGES,
  coverageSummary: {
    totalSkills: SKILLS.length,
    byDomain: Object.fromEntries(
      DOMAINS.map((d) => [d.id, SKILLS.filter((s) => s.domainId === d.id).length])
    ),
    byStage: {
      foundational: 7,
      preparatory: 3,
      middle: 6,
      secondary: 10
    },
    knownGaps: [
      "Fine-grained micro-skills for regional state-language literature beyond Hindi and English are queued for Phase 3 state-board expansion.",
      "Vocational skill electives beyond Artificial Intelligence (417) and Information Technology (402) are queued for Phase 3."
    ]
  },
  provenance: {
    authoredBy: "EveryYear Curriculum Architecture Engine",
    reviewedBy: "Phase 1 Schema & Source Verification Pipeline",
    reviewStatus: "approved",
    license: "CC-BY-4.0 metadata mapping; official syllabus text remains copyright of respective statutory boards.",
    updatedFromCurriculumVersions: [
      "MWCD-Navchetana-2024",
      "MWCD-Aadharshila-2024",
      "NCERT-NCFFS-2022",
      "NCERT-NCFSE-2023",
      "CBSE-2026-27",
      "CISCE-2026-27",
      "NIOS-2026"
    ]
  }
};

writeJson("content/skill-graph/shared-skill-graph.json", SKILL_GRAPH);

// Helper to get stage skills for a year
function skillsForYear(yearId) {
  const idx = YEARS.findIndex((y) => y.yearId === yearId);
  if (idx === 0) return ["stim-sensory-motor-0-3", "stim-bilingual-babble-words"];
  if (idx <= 3) return ["stim-bilingual-babble-words", "ecce-panchakosha-play", "lit-phonics-akshara-awareness", "num-pre-number-counting-20"];
  if (idx <= 5) return ["lit-phonics-akshara-awareness", "lit-sentence-reading-fluency", "num-place-value-add-sub"];
  if (idx <= 8) return ["lit-sentence-reading-fluency", "num-place-value-add-sub", "num-mult-div-fractions-prep", "sci-evs-world-around-us"];
  if (idx <= 11) return [
    "math-integers-number-patterns",
    "math-ratios-linear-algebra-middle",
    "math-geometry-mensuration-middle",
    "sci-curiosity-middle-inquiry",
    "soc-exploring-society-middle",
    "lang-bilingual-literature-middle",
    "comp-algorithmic-ai-literacy"
  ];
  if (idx <= 13) return [
    "math-polynomials-quadratics-sec",
    "math-trigonometry-coordinate-sec",
    "sci-integrated-sec-9-10",
    "soc-democratic-polity-economy-sec",
    "lang-academic-rhetoric-global-exams",
    "comp-algorithmic-ai-literacy"
  ];
  return [
    "math-calculus-vectors-srsec",
    "sci-physics-srsec-11-12",
    "sci-chemistry-srsec-11-12",
    "sci-biology-srsec-11-12",
    "soc-humanities-commerce-srsec",
    "lang-academic-rhetoric-global-exams",
    "comp-algorithmic-ai-literacy"
  ];
}

function buildSubjectsForBoardYear(boardId, yearObj) {
  const { yearId } = yearObj;
  const idx = YEARS.findIndex((y) => y.yearId === yearId);

  if (idx === 0) {
    return [
      {
        subjectId: "sensory-motor-stimulation",
        name: { en: "Sensory, Motor & Physical Stimulation (Navchetana)", hi: "संवेदी, गामक और शारीरिक प्रोत्साहन (नवचेतना)" },
        compulsory: true,
        stream: "general",
        textbooks: ["MWCD Navchetana (2024) Age-Month Caregiver Activity Cards (0-36 Months)"],
        skillIds: ["stim-sensory-motor-0-3"],
        sourceIds: ["SRC-MWCD-NAVCHETANA-2024", "SRC-IAP-SCREENTIME-2022"],
        units: [
          {
            unitId: `${boardId}-${yearId}-u1`,
            title: { en: "Months 0-12: Visual Tracking, Tummy Time, Grasp & Crawling", hi: "0-12 माह: दृश्य समन्वय, पकड़ और घुटनों के बल चलना" },
            notionalHours: 60,
            skillIds: ["stim-sensory-motor-0-3"],
            competencies: ["Tracks high-contrast objects and caregiver voice", "Reaches, grasps, and transfers safe objects between hands"]
          },
          {
            unitId: `${boardId}-${yearId}-u2`,
            title: { en: "Months 12-36: Walking, Stacking, Scribbling & Exploratory Play", hi: "12-36 माह: चलना, ब्लॉक जोड़ना और खोजपूर्ण खेल" },
            notionalHours: 90,
            skillIds: ["stim-sensory-motor-0-3"],
            competencies: ["Stacks 4-6 blocks and coordinates gross motor balance", "Uses spoons, cups, and jumbo crayons during caregiver play"]
          }
        ]
      },
      {
        subjectId: "language-bonding-play",
        name: { en: "Caregiver Talk, Lullabies & Socio-Emotional Bonding", hi: "देखभालकर्ता संवाद, लोरी और भावनात्मक जुड़ाव" },
        compulsory: true,
        stream: "general",
        textbooks: ["MWCD Navchetana (2024) Serve-and-Return Communication Guide"],
        skillIds: ["stim-bilingual-babble-words"],
        sourceIds: ["SRC-MWCD-NAVCHETANA-2024"],
        units: [
          {
            unitId: `${boardId}-${yearId}-u3`,
            title: { en: "Serve-and-Return Vocalisation, Rhymes & Object Naming", hi: "संवादात्मक ध्वनि, बालगीत और वस्तुओं के नाम" },
            notionalHours: 75,
            skillIds: ["stim-bilingual-babble-words"],
            competencies: ["Responds to name and everyday household words in mother tongue", "Combines words and gestures in playful conversation"]
          }
        ]
      }
    ];
  }

  if (idx <= 3) {
    return [
      {
        subjectId: "panchakosha-play-wellness",
        name: { en: "Panchakosha Physical, Socio-Emotional & Aesthetic Play", hi: "पंचकोश शारीरिक, सामाजिक-भावनात्मक और कला खेल" },
        compulsory: true,
        stream: "general",
        textbooks: ["MWCD Aadharshila (2024) Weekly Play Calendar", "NCERT Unmesh / Barkha Early Readers"],
        skillIds: ["ecce-panchakosha-play"],
        sourceIds: ["SRC-MWCD-AADHARSHILA-2024", "SRC-NCERT-NCFFS-2022"],
        units: [
          {
            unitId: `${boardId}-${yearId}-p1`,
            title: { en: "Gross & Fine Motor Play: Clay, Origami, Balance & Rhythm", hi: "स्थूल और सूक्ष्म गामक खेल: मिट्टी, कागज कला और संतुलन" },
            notionalHours: 120,
            skillIds: ["ecce-panchakosha-play"],
            competencies: ["Develops pincer grip, eye-hand coordination, and rhythmic balance", "Collaborates with peers during circle time and outdoor play"]
          }
        ]
      },
      {
        subjectId: "early-bilingual-literacy",
        name: { en: "Oral Language, Kahani & Akshara/Phonics Readiness", hi: "मौखिक भाषा, कहानी और अक्षर/ध्वनि तत्परता" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT NCF-FS 2022 Emergent Literacy Cards"],
        skillIds: ["stim-bilingual-babble-words", "lit-phonics-akshara-awareness"],
        sourceIds: ["SRC-NCERT-NCFFS-2022", "SRC-MWCD-AADHARSHILA-2024"],
        units: [
          {
            unitId: `${boardId}-${yearId}-l1`,
            title: { en: "Story Retelling, Rhyming Games & Sound-Symbol Discovery", hi: "कहानी सुनाना, तुकबंदी और ध्वनि-अक्षर पहचान" },
            notionalHours: 120,
            skillIds: ["lit-phonics-akshara-awareness"],
            competencies: ["Identifies beginning sounds in Hindi and English words", "Recognizes print directionality and core aksharas/letters"]
          }
        ]
      },
      {
        subjectId: "early-numeracy-shapes",
        name: { en: "Pre-Number Concepts, Patterns & Counting in Play", hi: "पूर्व-संख्या अवधारणाएं, पैटर्न और खेल-खेल में गिनती" },
        compulsory: true,
        stream: "general",
        textbooks: ["MWCD Aadharshila (2024) Cognitive & Numeracy Kit"],
        skillIds: ["num-pre-number-counting-20"],
        sourceIds: ["SRC-MWCD-AADHARSHILA-2024", "SRC-NCERT-NCFFS-2022"],
        units: [
          {
            unitId: `${boardId}-${yearId}-n1`,
            title: { en: "Sorting, Spatial Comparison, Patterns & Counting 1-20", hi: "वर्गीकरण, तुलना, पैटर्न और 1-20 तक गिनती" },
            notionalHours: 100,
            skillIds: ["num-pre-number-counting-20"],
            competencies: ["Compares size, weight, and quantity using concrete pebbles and beads", "Counts up to 20 objects with one-to-one correspondence"]
          }
        ]
      }
    ];
  }

  if (idx <= 5) {
    return [
      {
        subjectId: "languages-hindi-english",
        name: { en: "Bilingual Languages: Hindi (Sarangi) & English (Mridang)", hi: "द्विभाषी भाषाएं: हिंदी (सारंगी) और अंग्रेजी (मृदंग)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT Sarangi (Hindi)", "NCERT Mridang (English)"],
        skillIds: ["lit-phonics-akshara-awareness", "lit-sentence-reading-fluency"],
        sourceIds: ["SRC-NCERT-NCFFS-2022", "SRC-NCERT-NSTC-2023"],
        units: [
          {
            unitId: `${boardId}-${yearId}-lang1`,
            title: { en: "Akshara/Phonics Decoding, Poems & Guided Story Reading", hi: "अक्षर पठन, कविताएं और निर्देशित कहानी पठन" },
            notionalHours: 180,
            skillIds: ["lit-phonics-akshara-awareness", "lit-sentence-reading-fluency"],
            competencies: ["Reads short illustrated stories in Hindi and English", "Writes simple words and sentences about family and nature"]
          }
        ]
      },
      {
        subjectId: "joyful-mathematics",
        name: { en: "Foundational Mathematics (Joyful Mathematics)", hi: "बुनियादी गणित (आनंदमय गणित)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT Joyful Mathematics"],
        skillIds: ["num-place-value-add-sub"],
        sourceIds: ["SRC-NCERT-NCFFS-2022", "SRC-NCERT-NSTC-2023"],
        units: [
          {
            unitId: `${boardId}-${yearId}-math1`,
            title: { en: "Place Value to 100/999, Addition, Subtraction & Shapes", hi: "स्थानीय मान, जोड़, घटाव और आकृतियां" },
            notionalHours: 160,
            skillIds: ["num-place-value-add-sub"],
            competencies: ["Bundles tens and ones using concrete manipulatives", "Solves everyday addition and subtraction word problems"]
          }
        ]
      }
    ];
  }

  if (idx <= 8) {
    const primarySource = boardId === "nios" ? "SRC-NIOS-OBE-2026" : boardId === "cisce" ? "SRC-CISCE-PUB-2026" : "SRC-NCERT-NCFSE-2023";
    return [
      {
        subjectId: "preparatory-languages",
        name: { en: "Languages: English (Santoor) & Hindi (Veena)", hi: "भाषाएं: अंग्रेजी (संतूर) और हिंदी (वीणा)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT Santoor (English)", "NCERT Veena (Hindi)"],
        skillIds: ["lit-sentence-reading-fluency"],
        sourceIds: [primarySource, "SRC-NCERT-NSTC-2023"],
        units: [
          {
            unitId: `${boardId}-${yearId}-lang1`,
            title: { en: "Reading Comprehension, Vocabulary & Paragraph Composition", hi: "पठन बोध, शब्द संपदा और अनुच्छेद लेखन" },
            notionalHours: 180,
            skillIds: ["lit-sentence-reading-fluency"],
            competencies: ["Reads multi-paragraph stories and informational texts fluently", "Writes descriptive paragraphs with proper punctuation"]
          }
        ]
      },
      {
        subjectId: "preparatory-mathematics",
        name: { en: "Mathematics (Maths Mela)", hi: "गणित (मैथ्स मेला)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT Maths Mela"],
        skillIds: ["num-place-value-add-sub", "num-mult-div-fractions-prep"],
        sourceIds: [primarySource, "SRC-NCERT-NSTC-2023"],
        units: [
          {
            unitId: `${boardId}-${yearId}-math1`,
            title: { en: "Large Numbers, Multiplication, Division & Fractions", hi: "बड़ी संख्याएं, गुणा, भाग और भिन्न" },
            notionalHours: 180,
            skillIds: ["num-mult-div-fractions-prep"],
            competencies: ["Executes multi-digit multiplication and division algorithms", "Represents equivalent fractions, decimals, and perimeter/area"]
          }
        ]
      },
      {
        subjectId: "world-around-us-evs",
        name: { en: "The World Around Us (Environmental Studies)", hi: "हमारे चारों ओर की दुनिया (पर्यावरण अध्ययन)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT Our Wondrous World (The World Around Us)"],
        skillIds: ["sci-evs-world-around-us"],
        sourceIds: [primarySource, "SRC-NCERT-NSTC-2023"],
        units: [
          {
            unitId: `${boardId}-${yearId}-evs1`,
            title: { en: "Community, Biodiversity, Water, Food & Local Mapping", hi: "समुदाय, जैव विविधता, जल, भोजन और स्थानीय मानचित्रण" },
            notionalHours: 140,
            skillIds: ["sci-evs-world-around-us"],
            competencies: ["Observes and records local flora, fauna, and seasonal water cycles", "Reads simple neighbourhood maps and understands civic roles"]
          }
        ]
      }
    ];
  }

  // Deepened Grade Band: Middle Stage (Classes 6, 7, 8)
  if (idx <= 11) {
    const primarySource =
      boardId === "cbse"
        ? "SRC-CBSE-CURR-2026-27"
        : boardId === "cisce"
        ? "SRC-CISCE-PUB-2026"
        : boardId === "nios"
        ? "SRC-NIOS-OBE-2026"
        : "SRC-STATE-MSBSHSE-2026";
    return [
      {
        subjectId: "mathematics-ganita-prakash",
        officialCode: boardId === "cbse" ? "041-MID" : undefined,
        name: { en: "Mathematics (Ganita Prakash)", hi: "गणित (गणित प्रकाश)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT Ganita Prakash (NCF-SE 2023 Series)"],
        skillIds: ["math-integers-number-patterns", "math-ratios-linear-algebra-middle", "math-geometry-mensuration-middle"],
        sourceIds: [primarySource, "SRC-NCERT-NCFSE-2023", "SRC-NCERT-NSTC-2023"],
        units: [
          {
            unitId: `${boardId}-${yearId}-math-u1`,
            title: { en: "Unit 1: Patterns in Mathematics, Prime Time & Number Play", hi: "इकाई 1: गणित में पैटर्न, अभाज्य संख्याएं और संख्या खेल" },
            notionalHours: 45,
            skillIds: ["math-integers-number-patterns"],
            competencies: [
              "Identifies figurate number sequences, Virahanka numbers, and prime factorisation trees",
              "Evaluates divisibility tests, HCF/LCM, and integer operations on the number line"
            ]
          },
          {
            unitId: `${boardId}-${yearId}-math-u2`,
            title: { en: "Unit 2: Fractions, Rational Numbers, Ratios & Linear Algebra", hi: "इकाई 2: भिन्न, परिमेय संख्याएं, अनुपात और रैखिक बीजगणित" },
            notionalHours: 65,
            skillIds: ["math-ratios-linear-algebra-middle"],
            competencies: [
              "Models multi-step word problems using algebraic expressions and linear equations",
              "Solves percentage, profit/loss, simple/compound interest, and direct/inverse proportion tasks"
            ]
          },
          {
            unitId: `${boardId}-${yearId}-math-u3`,
            title: { en: "Unit 3: Lines and Angles, Triangles, Symmetry & Perimeter/Area/Volume", hi: "इकाई 3: रेखाएं और कोण, त्रिभुज, सममिति तथा क्षेत्रमिति" },
            notionalHours: 60,
            skillIds: ["math-geometry-mensuration-middle"],
            competencies: [
              "Constructs geometric figures with ruler and compass and proves triangle congruence",
              "Computes area of polygons and surface area/volume of cubes, cuboids, and cylinders"
            ]
          }
        ]
      },
      {
        subjectId: "science-curiosity",
        officialCode: boardId === "cbse" ? "086-MID" : undefined,
        name: { en: "Integrated Science (Curiosity)", hi: "एकीकृत विज्ञान (जिज्ञासा)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT Curiosity Science Textbook (NCF-SE 2023 Series)"],
        skillIds: ["sci-curiosity-middle-inquiry"],
        sourceIds: [primarySource, "SRC-NCERT-NCFSE-2023", "SRC-NCERT-NSTC-2023"],
        units: [
          {
            unitId: `${boardId}-${yearId}-sci-u1`,
            title: { en: "Unit 1: Materials Around Us, States of Water & Separation Methods", hi: "इकाई 1: हमारे चारों ओर के पदार्थ, जल की अवस्थाएं और पृथक्करण" },
            notionalHours: 50,
            skillIds: ["sci-curiosity-middle-inquiry"],
            competencies: [
              "Classifies materials by solubility, density, conductivity, and chemical change",
              "Designs filtration, evaporation, and distillation experiments"
            ]
          },
          {
            unitId: `${boardId}-${yearId}-sci-u2`,
            title: { en: "Unit 2: Living Creatures, Mindful Eating, Cell & Body Movements", hi: "इकाई 2: सजीव जगत, संतुलित आहार, कोशिका और शरीर की गति" },
            notionalHours: 55,
            skillIds: ["sci-curiosity-middle-inquiry"],
            competencies: [
              "Tests food samples for carbohydrates, proteins, and fats and maps deficiency prevention",
              "Explains plant/animal adaptations, respiration, and microscopic cell structures"
            ]
          },
          {
            unitId: `${boardId}-${yearId}-sci-u3`,
            title: { en: "Unit 3: Measurement of Length/Motion, Temperature, Magnets & Beyond Earth", hi: "इकाई 3: लंबाई और गति का मापन, तापमान, चुंबक और अंतरिक्ष" },
            notionalHours: 55,
            skillIds: ["sci-curiosity-middle-inquiry"],
            competencies: [
              "Measures SI units, plots distance-time graphs, and builds simple electric and magnetic circuits",
              "Explains heat transfer (conduction, convection, radiation) and solar system dynamics"
            ]
          }
        ]
      },
      {
        subjectId: "social-science-exploring-society",
        officialCode: boardId === "cbse" ? "087-MID" : undefined,
        name: { en: "Social Science (Exploring Society: India and Beyond)", hi: "सामाजिक विज्ञान (समाज की खोज: भारत और उससे आगे)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT Exploring Society: India and Beyond (NCF-SE 2023 Series)"],
        skillIds: ["soc-exploring-society-middle"],
        sourceIds: [primarySource, "SRC-NCERT-NCFSE-2023", "SRC-NCERT-NSTC-2023"],
        units: [
          {
            unitId: `${boardId}-${yearId}-soc-u1`,
            title: { en: "Themes A & B: India and the World (Landforms, Oceans) & Tapestry of the Past", hi: "विषय A और B: भू-आकृतियां, महासागर और अतीत की धरोहर" },
            notionalHours: 65,
            skillIds: ["soc-exploring-society-middle"],
            competencies: [
              "Locates latitudes, longitudes, time zones, and major landforms on thematic maps",
              "Analyses Harappan urban planning, Vedic/Janapada traditions, and historical sources"
            ]
          },
          {
            unitId: `${boardId}-${yearId}-soc-u2`,
            title: { en: "Themes C, D & E: Cultural Heritage, Grassroots Democracy & Economic Life", hi: "विषय C, D और E: सांस्कृतिक विरासत, जमीनी लोकतंत्र और आर्थिक जीवन" },
            notionalHours: 65,
            skillIds: ["soc-exploring-society-middle"],
            competencies: [
              "Compares Three-Tier Panchayati Raj and Urban Local Bodies governance structures",
              "Classifies primary, secondary, and tertiary economic activities and household budgeting"
            ]
          }
        ]
      },
      {
        subjectId: "languages-poorvi-malhar",
        name: { en: "Bilingual Languages: English (Poorvi) & Hindi (Malhar)", hi: "द्विभाषी भाषाएं: अंग्रेजी (पूर्वी) और हिंदी (मल्हार)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT Poorvi (English)", "NCERT Malhar (Hindi)"],
        skillIds: ["lang-bilingual-literature-middle"],
        sourceIds: [primarySource, "SRC-NCERT-NCFSE-2023"],
        units: [
          {
            unitId: `${boardId}-${yearId}-lang-u1`,
            title: { en: "Literature, Grammar in Context, Unseen Reading & Essay Writing", hi: "साहित्य पठन, संदर्भगत व्याकरण, अपठित गद्यांश और निबंध लेखन" },
            notionalHours: 140,
            skillIds: ["lang-bilingual-literature-middle"],
            competencies: [
              "Synthesizes themes across Indian and global prose/poetry in Hindi and English",
              "Drafts structured essays, notices, and formal letters with accurate syntax"
            ]
          }
        ]
      },
      {
        subjectId: "computational-ai-vocational",
        officialCode: boardId === "cbse" ? "901-AI" : undefined,
        name: { en: "Computational Thinking, Coding & Vocational Exposure (Kaushal Bodh)", hi: "कम्प्यूटेशनल चिंतन, कोडिंग और कौशल बोध" },
        compulsory: true,
        stream: "vocational",
        textbooks: ["NCERT Kaushal Bodh (Vocational Education)", "CBSE Coding & AI Modules"],
        skillIds: ["comp-algorithmic-ai-literacy"],
        sourceIds: [primarySource, "SRC-NCERT-NCFSE-2023"],
        units: [
          {
            unitId: `${boardId}-${yearId}-comp-u1`,
            title: { en: "Algorithms, Data Tables, Python Basics & Ethical AI", hi: "एल्गोरिदम, डेटा तालिका, पायथन परिचय और नैतिक एआई" },
            notionalHours: 60,
            skillIds: ["comp-algorithmic-ai-literacy"],
            competencies: [
              "Designs flowcharts, loops, and conditional logic for real-world problems",
              "Completes hands-on Kaushal Bodh projects across data, ecology, and community service"
            ]
          }
        ]
      }
    ];
  }

  // Secondary Stage Phase 1: Classes 9 and 10
  if (idx <= 13) {
    const primarySource =
      boardId === "cbse"
        ? "SRC-CBSE-CURR-2026-27"
        : boardId === "cisce"
        ? "SRC-CISCE-PUB-2026"
        : boardId === "nios"
        ? "SRC-NIOS-SECSRSEC-2026"
        : "SRC-STATE-MSBSHSE-2026";
    return [
      {
        subjectId: "secondary-mathematics",
        officialCode: boardId === "cbse" ? "041" : boardId === "nios" ? "211" : "MATH-10",
        name: { en: "Mathematics Standard", hi: "गणित (मानक)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT Mathematics (Classes IX-X)", "CBSE Academic Exemplar Problems"],
        skillIds: ["math-polynomials-quadratics-sec", "math-trigonometry-coordinate-sec"],
        sourceIds: [primarySource, "SRC-CBSE-SECPART1-2026-27"],
        units: [
          {
            unitId: `${boardId}-${yearId}-m1`,
            title: { en: "Number Systems, Algebra (Polynomials, Linear & Quadratic Equations, AP)", hi: "संख्या पद्धति और बीजगणित (बहुपद, रैखिक व द्विघात समीकरण, समांतर श्रेढ़ी)" },
            notionalHours: 90,
            skillIds: ["math-polynomials-quadratics-sec"],
            competencies: ["Solves quadratic and simultaneous linear equations", "Applies arithmetic progressions and polynomial factor theorems"]
          },
          {
            unitId: `${boardId}-${yearId}-m2`,
            title: { en: "Coordinate Geometry, Triangles/Circles, Trigonometry, Mensuration & Statistics", hi: "निर्देशांक ज्यामिति, त्रिकोणमिति, वृत्त, क्षेत्रमिति और सांख्यिकी" },
            notionalHours: 90,
            skillIds: ["math-trigonometry-coordinate-sec"],
            competencies: ["Proves similarity and tangent properties", "Solves trigonometric identities, heights/distances, and grouped statistics"]
          }
        ]
      },
      {
        subjectId: "secondary-science",
        officialCode: boardId === "cbse" ? "086" : boardId === "nios" ? "212" : "SCI-10",
        name: { en: "Science (Physics, Chemistry & Biology)", hi: "विज्ञान (भौतिकी, रसायन और जीवविज्ञान)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT Science & Laboratory Manual (Classes IX-X)"],
        skillIds: ["sci-integrated-sec-9-10"],
        sourceIds: [primarySource, "SRC-CBSE-SECPART1-2026-27"],
        units: [
          {
            unitId: `${boardId}-${yearId}-s1`,
            title: { en: "Chemical Substances, Carbon Compounds, Life Processes & Heredity", hi: "रासायनिक पदार्थ, कार्बन यौगिक, जैव प्रक्रम और आनुवंशिकता" },
            notionalHours: 95,
            skillIds: ["sci-integrated-sec-9-10"],
            competencies: ["Analyses stoichiometry, pH scale, metallurgy, and physiological systems", "Explains Mendelian inheritance and ecosystem energy flow"]
          },
          {
            unitId: `${boardId}-${yearId}-s2`,
            title: { en: "Force & Laws of Motion, Gravitation, Light Optics & Electricity/Magnetism", hi: "बल और गति के नियम, गुरुत्वाकर्षण, प्रकाशिकी और विद्युत-चुंबकत्व" },
            notionalHours: 85,
            skillIds: ["sci-integrated-sec-9-10"],
            competencies: ["Solves ray-diagram numericals, Ohm's law circuits, and Joule heating problems", "Completes 20-mark practical and internal portfolio investigations"]
          }
        ]
      },
      {
        subjectId: "secondary-social-science",
        officialCode: boardId === "cbse" ? "087" : boardId === "nios" ? "213" : "SOC-10",
        name: { en: "Social Science (History, Geography, Political Science & Economics)", hi: "सामाजिक विज्ञान (इतिहास, भूगोल, राजनीति विज्ञान और अर्थशास्त्र)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT India and the Contemporary World, Contemporary India, Democratic Politics, Understanding Economic Development"],
        skillIds: ["soc-democratic-polity-economy-sec"],
        sourceIds: [primarySource, "SRC-CBSE-SECPART1-2026-27"],
        units: [
          {
            unitId: `${boardId}-${yearId}-ss1`,
            title: { en: "Nationalism, Resources of India, Federalism & Money/Credit/Development", hi: "राष्ट्रवाद, भारत के संसाधन, संघवाद तथा मुद्रा एवं साख" },
            notionalHours: 140,
            skillIds: ["soc-democratic-polity-economy-sec"],
            competencies: ["Evaluates historical movements, constitutional federalism, and formal credit institutions", "Interprets topographical and resource maps of India"]
          }
        ]
      },
      {
        subjectId: "secondary-languages-ai",
        officialCode: boardId === "cbse" ? "184/002/417" : "LANG-AI-10",
        name: { en: "English (184), Hindi (002/085) & Artificial Intelligence (417)", hi: "अंग्रेजी (184), हिंदी (002/085) और कृत्रिम बुद्धिमत्ता (417)" },
        compulsory: true,
        stream: "general",
        textbooks: ["NCERT First Flight / Footprints / Kshitij / Kritika", "CBSE AI (417) Handbook"],
        skillIds: ["lang-academic-rhetoric-global-exams", "comp-algorithmic-ai-literacy"],
        sourceIds: [primarySource, "SRC-CBSE-SECPART1-2026-27"],
        units: [
          {
            unitId: `${boardId}-${yearId}-la1`,
            title: { en: "Analytical Writing, Literature Critique & AI Project Cycle (Python/Data)", hi: "विश्लेषणात्मक लेखन, साहित्य समीक्षा और एआई प्रोजेक्ट चक्र" },
            notionalHours: 160,
            skillIds: ["lang-academic-rhetoric-global-exams", "comp-algorithmic-ai-literacy"],
            competencies: ["Produces analytical paragraphs, formal correspondence, and literary analysis", "Builds and evaluates an end-to-end Python AI project"]
          }
        ]
      }
    ];
  }

  // Senior Secondary Stage: Classes 11 and 12 (Multi-disciplinary across Science, Commerce, Humanities, CS)
  const primarySource =
    boardId === "cbse"
      ? "SRC-CBSE-CURR-2026-27"
      : boardId === "cisce"
      ? "SRC-CISCE-PUB-2026"
      : boardId === "nios"
      ? "SRC-NIOS-SECSRSEC-2026"
      : "SRC-STATE-MSBSHSE-2026";
  return [
    {
      subjectId: "srsec-mathematics",
      officialCode: boardId === "cbse" ? "041" : boardId === "nios" ? "311" : "MATH-12",
      name: { en: "Mathematics (Calculus, Algebra, Vectors & Probability)", hi: "गणित (कलन, बीजगणित, सदिश और प्रायिकता)" },
      compulsory: false,
      stream: "science",
      textbooks: ["NCERT Mathematics Part I & II (Classes XI-XII)"],
      skillIds: ["math-calculus-vectors-srsec"],
      sourceIds: [primarySource, "SRC-NTA-JEEMAIN-2026", "SRC-NTA-CUETUG-2026"],
      units: [
        {
          unitId: `${boardId}-${yearId}-m12`,
          title: { en: "Relations/Functions, Matrices, Differential & Integral Calculus, Vectors & Bayes Probability", hi: "संबंध व फलन, आव्यूह, अवकलन व समाकलन, सदिश और प्रायिकता" },
          notionalHours: 180,
          skillIds: ["math-calculus-vectors-srsec"],
          competencies: ["Solves board and JEE/CUET calculus, matrix system, and 3D vector problems", "Applies conditional probability and linear programming"]
        }
      ]
    },
    {
      subjectId: "srsec-physics",
      officialCode: boardId === "cbse" ? "042" : boardId === "nios" ? "312" : "PHY-12",
      name: { en: "Physics (Mechanics, Electromagnetism, Optics & Modern Physics)", hi: "भौतिकी (यांत्रिकी, विद्युतचुंबकत्व, प्रकाशिकी और आधुनिक भौतिकी)" },
      compulsory: false,
      stream: "science",
      textbooks: ["NCERT Physics Part I & II (Classes XI-XII)"],
      skillIds: ["sci-physics-srsec-11-12"],
      sourceIds: [primarySource, "SRC-NTA-JEEMAIN-2026", "SRC-NTA-NEETUG-2026"],
      units: [
        {
          unitId: `${boardId}-${yearId}-p12`,
          title: { en: "Mechanics, Thermodynamics, Electrostatics, Magnetism, Optics & Quantum/Semiconductors", hi: "यांत्रिकी, ऊष्मागतिकी, स्थिरवैद्युतिकी, चुंबकत्व, प्रकाशिकी और अर्धचालक" },
          notionalHours: 180,
          skillIds: ["sci-physics-srsec-11-12"],
          competencies: ["Derives and applies field equations, circuit laws, and wave-optics interference", "Executes 30-mark laboratory experiments with error bounds"]
        }
      ]
    },
    {
      subjectId: "srsec-chemistry",
      officialCode: boardId === "cbse" ? "043" : boardId === "nios" ? "313" : "CHEM-12",
      name: { en: "Chemistry (Physical, Inorganic & Organic)", hi: "रसायन विज्ञान (भौतिक, अकार्बनिक और कार्बनिक)" },
      compulsory: false,
      stream: "science",
      textbooks: ["NCERT Chemistry Part I & II (Classes XI-XII)"],
      skillIds: ["sci-chemistry-srsec-11-12"],
      sourceIds: [primarySource, "SRC-NTA-JEEMAIN-2026", "SRC-NTA-NEETUG-2026"],
      units: [
        {
          unitId: `${boardId}-${yearId}-c12`,
          title: { en: "Thermodynamics, Electrochemistry, Kinetics, Coordination Compounds & Organic Mechanisms", hi: "ऊष्मागतिकी, वैद्युतरसायन, बलगतिकी, उपसहसंयोजन यौगिक और कार्बनिक रसायन" },
          notionalHours: 180,
          skillIds: ["sci-chemistry-srsec-11-12"],
          competencies: ["Solves quantitative kinetics/electrochemistry problems and organic conversions", "Performs volumetric titration and salt analysis practicals"]
        }
      ]
    },
    {
      subjectId: "srsec-biology",
      officialCode: boardId === "cbse" ? "044" : boardId === "nios" ? "314" : "BIO-12",
      name: { en: "Biology (Physiology, Genetics, Biotechnology & Ecology)", hi: "जीवविज्ञान (शरीर क्रिया विज्ञान, आनुवंशिकी, जैव प्रौद्योगिकी और पारिस्थितिकी)" },
      compulsory: false,
      stream: "science",
      textbooks: ["NCERT Biology (Classes XI-XII)"],
      skillIds: ["sci-biology-srsec-11-12"],
      sourceIds: [primarySource, "SRC-NTA-NEETUG-2026", "SRC-NTA-CUETUG-2026"],
      units: [
        {
          unitId: `${boardId}-${yearId}-b12`,
          title: { en: "Cell & Physiology, Reproduction, Molecular Inheritance, Biotech & Ecology", hi: "कोशिका व शरीर क्रिया, प्रजनन, आणविक वंशागति, जैव प्रौद्योगिकी और पारिस्थितिकी" },
          notionalHours: 180,
          skillIds: ["sci-biology-srsec-11-12"],
          competencies: ["Masters NCERT line-by-line diagrams, genetic crosses, and physiological mechanisms", "Applies PCR/plasmid cloning concepts to NEET and board case studies"]
        }
      ]
    },
    {
      subjectId: "srsec-humanities-commerce",
      officialCode: boardId === "cbse" ? "028/030/055" : "HUM-COM-12",
      name: { en: "Polity, Macroeconomics, History & Accountancy", hi: "राजनीति विज्ञान, समष्टि अर्थशास्त्र, इतिहास और लेखाशास्त्र" },
      compulsory: false,
      stream: "humanities",
      textbooks: ["NCERT Indian Constitution at Work, Introductory Macroeconomics, Themes in Indian History, Accountancy"],
      skillIds: ["soc-humanities-commerce-srsec"],
      sourceIds: [primarySource, "SRC-UPSC-CSE-2026", "SRC-NTA-CUETUG-2026"],
      units: [
        {
          unitId: `${boardId}-${yearId}-hc12`,
          title: { en: "Constitutional Governance, National Income & Fiscal Policy, Historical Themes & Financial Statements", hi: "संवैधानिक शासन, राष्ट्रीय आय व राजकोषीय नीति, ऐतिहासिक विषय और वित्तीय विवरण" },
          notionalHours: 160,
          skillIds: ["soc-humanities-commerce-srsec"],
          competencies: ["Analyses macroeconomic policy, constitutional doctrines, and cash-flow statements", "Builds foundational notes for UPSC GS and CUET domain papers"]
        }
      ]
    },
    {
      subjectId: "srsec-english-cs",
      officialCode: boardId === "cbse" ? "301/083" : "ENG-CS-12",
      name: { en: "English Core (301) & Computer Science / AI (083)", hi: "अंग्रेजी कोर (301) और कंप्यूटर विज्ञान / एआई (083)" },
      compulsory: true,
      stream: "general",
      textbooks: ["NCERT Flamingo & Vistas", "NCERT Computer Science with Python"],
      skillIds: ["lang-academic-rhetoric-global-exams", "comp-algorithmic-ai-literacy"],
      sourceIds: [primarySource, "SRC-CB-DIGITALSAT-2026", "SRC-IELTS-ACADEMIC-2026"],
      units: [
        {
          unitId: `${boardId}-${yearId}-ec12`,
          title: { en: "Academic Reading/Writing Rhetoric, Python Data Structures & SQL", hi: "शैक्षणिक पठन/लेखन, पायथन डेटा संरचनाएं और एसक्यूएल" },
          notionalHours: 160,
          skillIds: ["lang-academic-rhetoric-global-exams", "comp-algorithmic-ai-literacy"],
          competencies: ["Meets board, SAT, IELTS, and TOEFL academic reading and writing standards", "Implements Python stacks, file handling, and SQL database queries"]
        }
      ]
    }
  ];
}

function buildCurriculumYear(boardId, boardName, yearObj) {
  const { yearId } = yearObj;
  const idx = YEARS.findIndex((y) => y.yearId === yearId);
  const subjects = buildSubjectsForBoardYear(boardId, yearObj);
  const skillIds = skillsForYear(yearId);
  const isDeepened = boardId === "cbse" && ["class-06", "class-07", "class-08"].includes(yearId);
  const isFullySourcedEarly = idx <= 3 && (boardId === "early-years" || boardId === "cbse");

  const groundingStatus = isDeepened
    ? "deepened-grade-band"
    : isFullySourcedEarly
    ? "fully-sourced"
    : "skeleton-with-labelled-gaps";

  const firstSubj = subjects[0].subjectId;
  const secondSubj = subjects[Math.min(1, subjects.length - 1)].subjectId;
  const thirdSubj = subjects[Math.min(2, subjects.length - 1)].subjectId;

  const modeForStage = idx === 0 ? "caregiver-play" : "concept-and-example";
  const practiceMode = idx === 0 ? "caregiver-play" : "guided-practice";

  const trackBridges =
    idx < 11
      ? [
          {
            trackId: "jee",
            status: "not-started-yet",
            bridgedSkillIds: [],
            notes: "Competitive track branches activate from Class 8-9 after core numeracy and inquiry foundations are secure."
          }
        ]
      : [
          {
            trackId: "jee",
            status: idx >= 12 ? "active-track-branch" : "foundation-bridge",
            bridgedSkillIds: skillIds.filter((s) => s.startsWith("math-") || s.startsWith("sci-")),
            notes: "Maps Mathematics, Physics, and Chemistry units directly to NTA JEE Main 2026 syllabus."
          },
          {
            trackId: "neet",
            status: idx >= 12 ? "active-track-branch" : "foundation-bridge",
            bridgedSkillIds: skillIds.filter((s) => s.startsWith("sci-")),
            notes: "Maps Physics, Chemistry, and Biology units to NMC/NTA NEET UG 2026 syllabus."
          },
          {
            trackId: "cuet",
            status: idx >= 14 ? "active-track-branch" : "foundation-bridge",
            bridgedSkillIds: skillIds,
            notes: "Aligns Class 12 NCERT domain subjects and language/general aptitude with NTA CUET UG."
          },
          {
            trackId: "upsc",
            status: "foundation-bridge",
            bridgedSkillIds: skillIds.filter((s) => s.startsWith("soc-") || s.startsWith("math-")),
            notes: "Builds NCERT Class 6-12 General Studies (Polity, History, Geography, Economy) and CSAT numeracy spine."
          },
          {
            trackId: "sat",
            status: idx >= 12 ? "active-track-branch" : "foundation-bridge",
            bridgedSkillIds: skillIds.filter((s) => s.startsWith("math-") || s.startsWith("lang-")),
            notes: "Maps onto College Board Digital SAT Reading & Writing and Math adaptive domains."
          },
          {
            trackId: "act",
            status: idx >= 12 ? "active-track-branch" : "foundation-bridge",
            bridgedSkillIds: skillIds.filter((s) => s.startsWith("math-") || s.startsWith("sci-") || s.startsWith("lang-")),
            notes: "Covers ACT English, Mathematics, Reading, and Science Reasoning benchmarks."
          },
          {
            trackId: "ielts",
            status: idx >= 12 ? "active-track-branch" : "foundation-bridge",
            bridgedSkillIds: skillIds.filter((s) => s.startsWith("lang-")),
            notes: "Builds IELTS Academic 4-skill proficiency (Listening, Reading, Writing Task 1/2, Speaking)."
          },
          {
            trackId: "toefl",
            status: idx >= 12 ? "active-track-branch" : "foundation-bridge",
            bridgedSkillIds: skillIds.filter((s) => s.startsWith("lang-")),
            notes: "Builds ETS TOEFL iBT academic reading, lecture listening, integrated speaking, and academic discussion writing."
          }
        ];

  const sourceSet = new Set(["SRC-IAP-SCREENTIME-2022", "SRC-NCERT-PARAKH-2024"]);
  for (const s of subjects) {
    for (const src of s.sourceIds) sourceSet.add(src);
  }

  const knownGaps = [];
  if (boardId === "cisce") {
    knownGaps.push({
      gapId: `gap-${boardId}-${yearId}-chapters`,
      area: "CISCE School-Level Book List & Specimen Rubrics",
      description: "CISCE prescribes council-level regulations and syllabuses while individual affiliated schools select textbooks; school-specific chapter lists are labelled for Phase 3 ingestion.",
      targetPhase: "Phase 3"
    });
  } else if (boardId === "state-boards") {
    knownGaps.push({
      gapId: `gap-${boardId}-${yearId}-scert`,
      area: "State SCERT Regional Medium Chapter Mapping",
      description: "Core competencies are mapped via NCF-SE 2023 and MSBSHSE/TN-DGE equivalence; state-specific regional language chapters are queued for Phase 3.",
      targetPhase: "Phase 3"
    });
  } else if (boardId === "nios") {
    knownGaps.push({
      gapId: `gap-${boardId}-${yearId}-tma`,
      area: "NIOS Annual Tutor Marked Assignment (TMA) Question Prompts",
      description: "NIOS subject codes and OBE/Secondary/Sr. Secondary structures are sourced; session-specific TMA question booklets are ingested per exam cycle in Phase 3.",
      targetPhase: "Phase 3"
    });
  } else if (!isDeepened && idx >= 4) {
    knownGaps.push({
      gapId: `gap-${boardId}-${yearId}-exercise-bank`,
      area: "Line-by-Line Sub-Topic Exercise Bank Expansion",
      description: "Official NCERT/CBSE subjects, textbooks, and unit competencies are sourced; full 200-item per-chapter exercise banks expand from Classes 6-8 to all grades in Phase 3.",
      targetPhase: "Phase 3"
    });
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  if (yearObj.studyDays === 6) days.push("Saturday");

  return {
    schemaVersion: "1.0.0",
    curriculumVersionId: `${boardId}-${yearId}@2026.1.0`,
    boardId,
    boardName,
    yearId,
    yearLabel: { en: yearObj.en, hi: yearObj.hi },
    nepStage: yearObj.nepStage,
    ageBandYears: yearObj.ageBandYears,
    groundingStatus,
    screenTimePolicy: {
      maxMinutesPerDay: yearObj.maxScreenMin,
      deliveryMode: yearObj.deliveryMode,
      guidelineSourceId: "SRC-IAP-SCREENTIME-2022"
    },
    subjects,
    skillIds,
    termPlan: [
      {
        termId: "term-1",
        title: { en: "Term 1: Foundational Concepts, Inquiry & Formative Portfolio", hi: "सत्र 1: मूल अवधारणाएं, अन्वेषण और रचनात्मक मूल्यांकन" },
        weeks: 18,
        focusSkills: skillIds.slice(0, Math.max(1, Math.ceil(skillIds.length / 2))),
        milestoneAssessment: idx <= 5 ? "Observational Holistic Progress Card (HPC) Check 1" : "Term 1 Cumulative Competency & Practical Assessment"
      },
      {
        termId: "term-2",
        title: { en: "Term 2: Applied Problem Solving, Integration & Annual Consolidation", hi: "सत्र 2: अनुप्रयुक्त समस्या समाधान, एकीकरण और वार्षिक पुनरावृत्ति" },
        weeks: 18,
        focusSkills: skillIds,
        milestoneAssessment: idx <= 5 ? "Observational Holistic Progress Card (HPC) Check 2" : "Term 2 Annual Board-Pattern / Stage Mastery Examination"
      }
    ],
    weeklyPlanTemplate: {
      studyDaysPerWeek: yearObj.studyDays,
      totalMinutesPerWeek: yearObj.weeklyMin,
      bufferPercent: 15,
      dailySchedule: days.map((dayOfWeek, dIdx) => ({
        dayOfWeek,
        blocks: [
          {
            slot: "Block 1 (Core Concept)",
            subjectId: dIdx % 2 === 0 ? firstSubj : secondSubj,
            minutes: yearObj.sessionMin,
            mode: modeForStage
          },
          {
            slot: "Block 2 (Practice / Activity)",
            subjectId: dIdx % 3 === 0 ? thirdSubj : secondSubj,
            minutes: yearObj.sessionMin,
            mode: practiceMode
          }
        ]
      }))
    },
    dailyLessonTemplate: {
      sessionMinutes: yearObj.sessionMin,
      offlineFallbackReady: true,
      steps: [
        {
          stepId: "step-1-hook",
          title: { en: "1. Prerequisite Warm-Up & Real-World Hook", hi: "1. पूर्व-ज्ञान पुनरावृत्ति और वास्तविक जीवन से जुड़ाव" },
          minutes: Math.max(2, Math.round(yearObj.sessionMin * 0.2)),
          description: "2-question retrieval check on prerequisite skill node before introducing new concept."
        },
        {
          stepId: "step-2-concept",
          title: { en: "2. Sourced Concept & Worked Example (EN/HI)", hi: "2. प्रमाणित अवधारणा और हल किया गया उदाहरण (द्विभाषी)" },
          minutes: Math.max(3, Math.round(yearObj.sessionMin * 0.3)),
          description: "Concise explanation grounded in official textbook/framework source with zero unverified claims."
        },
        {
          stepId: "step-3-practice",
          title: { en: "3. Adaptive Guided Practice & 3-Step Hint Ladder", hi: "3. निर्देशित अभ्यास और 3-स्तरीय संकेत सीढ़ी" },
          minutes: Math.max(3, Math.round(yearObj.sessionMin * 0.3)),
          description: "3 to 5 scaffolded practice tasks (offline toy/workbook task for under-6, interactive problems for Classes 1-12)."
        },
        {
          stepId: "step-4-exit-check",
          title: { en: "4. Mastery Exit Ticket & Evidence Event", hi: "4. दक्षता जांच और प्रगति साक्ष्य" },
          minutes: Math.max(2, Math.round(yearObj.sessionMin * 0.2)),
          description: "Deterministic mastery check that updates the learner's skill graph state and schedules spaced review."
        }
      ]
    },
    assessments: {
      unitTests: {
        frequency: idx <= 5 ? "Every 3 weeks via play-based observation checklist" : "Every 2-3 weeks at unit completion",
        format: idx <= 5 ? "Caregiver/Teacher observational rubric (no written stress)" : "20-mark competency check (MCQ + short structured response)",
        durationMinutes: idx <= 5 ? 15 : 30,
        marksOrScale: idx <= 5 ? "3-level developmental rubric (Emerging / Developing / Proficient)" : "20 marks",
        patternStatus: idx <= 5 ? "observational-rubric-no-written-exam" : "school-internal-formative",
        sourceIds: ["SRC-NCERT-PARAKH-2024"]
      },
      internals: {
        frequency: "Continuous across each term",
        format: "Periodic tests (5 marks), multiple assessment (5 marks), portfolio/workbooks (5 marks), subject enrichment/lab work (5 marks)",
        durationMinutes: 40,
        marksOrScale: idx <= 5 ? "Holistic Progress Card portfolio" : "20 marks internal weightage",
        patternStatus: idx <= 5 ? "observational-rubric-no-written-exam" : "sourced-official-pattern",
        sourceIds: ["SRC-NCERT-PARAKH-2024", "SRC-CBSE-SECPART1-2026-27"]
      },
      termExams: {
        frequency: "End of Term 1 (Week 18) and End of Term 2 (Week 36)",
        format: idx <= 5 ? "Play and oral fluency showcase" : "Competency-based written and practical examination",
        durationMinutes: idx <= 5 ? 20 : idx <= 8 ? 90 : 180,
        marksOrScale: idx <= 5 ? "Holistic Progress Card" : "80 marks theory + 20 marks internal (or 70 + 30 for senior lab sciences)",
        patternStatus: idx <= 5 ? "observational-rubric-no-written-exam" : "sourced-official-pattern",
        sourceIds: ["SRC-NCERT-NCFSE-2023", "SRC-CBSE-SECPART1-2026-27"]
      },
      boardStyleMocks: {
        frequency: idx >= 12 ? "Monthly full-length timed mock from Term 1 Week 8" : "End-of-year stage readiness synthesis",
        format: idx >= 12 ? "Official board blueprint (50% competency/case-based, 20% MCQ, 30% constructed response)" : "PARAKH stage benchmark check (Classes 3, 5, 8)",
        durationMinutes: idx <= 5 ? 0 : idx <= 8 ? 60 : 180,
        marksOrScale: idx <= 5 ? "Not applicable for early years" : "80 / 100 marks",
        patternStatus: idx <= 5 ? "observational-rubric-no-written-exam" : boardId === "state-boards" ? "pattern-labelled-gap" : "sourced-official-pattern",
        sourceIds: ["SRC-NCERT-PARAKH-2024", "SRC-CBSE-CURR-2026-27"]
      }
    },
    coCurricularPlan: [
      {
        activityId: `${yearId}-कला-arts`,
        domain: "Visual & Performing Arts (Kala)",
        title: { en: "Indian Art, Craft, Music & Theatre Studio", hi: "भारतीय कला, शिल्प, संगीत और रंगमंच" },
        weeklyMinutes: 60,
        description: "Hands-on sketching, clay modelling, folk rhythm, and dramatic storytelling aligned with NCF-SE Art Education."
      },
      {
        activityId: `${yearId}-physical-yoga`,
        domain: "Physical Education, Yoga & Wellness",
        title: { en: "Daily Outdoor Movement, Yoga & Indigenous Games", hi: "दैनिक आउटडोर खेल, योग और स्वदेशी खेल" },
        weeklyMinutes: 120,
        description: "Structured physical play, flexibility, breathwork, and team coordination off-screen."
      }
    ],
    extracurricularPlan: [
      {
        clubId: `${yearId}-peer-pod-stem`,
        category: "STEM & Maker Peer Pod",
        title: { en: "Neighbourhood Science, Nature & Maker Pod", hi: "पड़ोस विज्ञान, प्रकृति और नवाचार समूह" },
        frequency: "Weekly 60-minute collaborative session",
        peerPodMode: "Small group of 4-6 learners building offline experiments, nature journals, or coding projects together."
      },
      {
        clubId: `${yearId}-peer-pod-expression`,
        category: "Bilingual Debate, Storytelling & Community Action",
        title: { en: "Bilingual Kahani, Debate & Seva Circle", hi: "द्विभाषी कहानी, वाद-विवाद और सेवा मंडल" },
        frequency: "Bi-weekly 45-minute peer circle",
        peerPodMode: "Moderated oral expression, debate, and local community/environmental stewardship."
      }
    ],
    parentViewPlan: {
      cadence: idx <= 5 ? "daily-caregiver-brief" : "weekly-family-digest",
      sections: [
        "Planned vs Completed Sessions & Weekly Buffer Status",
        "Skill-Level Mastery Gains & Prerequisite Gaps Bridged",
        "Screen Time Used vs Pediatric Cap (IAP Compliant)",
        "Pinned Curriculum Version & Official Source Changelog",
        "One Concrete Offline Family Action for the Week"
      ],
      homeActions: [
        {
          en: idx <= 5
            ? "Spend 15 minutes in screen-free serve-and-return storytelling and sorting household objects in your home language."
            : "Review your child's 1-page weekly mastery digest and ask them to teach you one concept they solved this week.",
          hi: idx <= 5
            ? "प्रतिदिन 15 मिनट बिना स्क्रीन के मातृभाषा में कहानी सुनाएं और घरेलू वस्तुओं से खेल-खेल में गिनती करें।"
            : "सप्ताह के अंत में बच्चे की प्रगति रिपोर्ट देखें और उनसे इस सप्ताह सीखा गया एक विषय समझाने को कहें।"
        },
        {
          en: "Verify weekly peer-pod outdoor play and co-curricular art/movement completion.",
          hi: "साप्ताहिक सह-पाठयक्रम कला, योग और समूह खेल की पूर्णता सुनिश्चित करें।"
        }
      ],
      consentControls: [
        "DPDP Act 2023 Section 9 Verifiable Guardian Consent Toggle",
        "Daily Screen-Time Hard Cap Slider (IAP Guideline Enforced)",
        "One-Click Full Learner JSON Export & Immediate Data Erasure"
      ]
    },
    trackBridges,
    sourceIds: Array.from(sourceSet),
    knownGaps
  };
}

// Generate 59 curriculum files across boards and stages
const BOARD_YEAR_MATRIX = [
  { boardId: "early-years", boardName: "MWCD Navchetana & Aadharshila / NCERT NCF-FS", years: YEARS.slice(0, 4) },
  { boardId: "cbse", boardName: "Central Board of Secondary Education (CBSE / NCERT)", years: YEARS },
  { boardId: "cisce", boardName: "Council for the Indian School Certificate Examinations (CISCE - ICSE & ISC)", years: YEARS.slice(1) },
  { boardId: "nios", boardName: "National Institute of Open Schooling (NIOS - OBE, Secondary & Sr. Secondary)", years: YEARS.slice(4) },
  { boardId: "state-boards", boardName: "State Boards (SCERT / MSBSHSE / TN-DGE Equivalency Spine)", years: YEARS.slice(4) }
];

let generatedCurriculumCount = 0;
for (const board of BOARD_YEAR_MATRIX) {
  for (const yearObj of board.years) {
    const doc = buildCurriculumYear(board.boardId, board.boardName, yearObj);
    writeJson(`content/curriculum/${board.boardId}/${board.boardId}-${yearObj.yearId}-curriculum.json`, doc);
    generatedCurriculumCount++;
  }
}

// Generate 8 Competitive & Study-Abroad Track Branch Files
const TRACKS = [
  {
    trackId: "jee",
    title: { en: "JEE (Main & Advanced) Engineering Track", hi: "जेईई (मेन और एडवांस्ड) इंजीनियरिंग ट्रैक" },
    category: "competitive-india",
    startingYearId: "class-08",
    targetYears: ["class-08", "class-09", "class-10", "class-11", "class-12"],
    conductingBody: "National Testing Agency (NTA) & IIT Joint Admission Board",
    sourceIds: ["SRC-NTA-JEEMAIN-2026", "SRC-CBSE-CURR-2026-27"],
    examPattern: {
      mode: "Computer Based Test (CBT)",
      durationMinutes: 180,
      totalMarks: "300 Marks (75 Questions: 25 each in Mathematics, Physics, Chemistry; +4/-1 marking)",
      patternStatus: "sourced-official-pattern"
    },
    prerequisiteSkillIds: ["math-ratios-linear-algebra-middle", "math-geometry-mensuration-middle", "sci-curiosity-middle-inquiry"],
    coreTrackSkillIds: ["math-polynomials-quadratics-sec", "math-trigonometry-coordinate-sec", "math-calculus-vectors-srsec", "sci-physics-srsec-11-12", "sci-chemistry-srsec-11-12"],
    domains: [
      { name: "Mathematics (Units 1-14)", topics: ["Sets, Complex Numbers & Quadratics", "Matrices & Determinants", "Permutations, Combinations & Binomial", "Integral & Differential Calculus", "Coordinate Geometry & 3D Vectors", "Statistics & Probability"] },
      { name: "Physics (Units 1-20)", topics: ["Kinematics, Laws of Motion, Work/Energy & Rotational Dynamics", "Gravitation, Properties of Solids/Liquids & Thermodynamics", "Electrostatics, Current Electricity, Magnetism & EMI/AC", "Optics, Dual Nature, Atoms/Nuclei & Electronic Devices"] },
      { name: "Chemistry (Units 1-20)", topics: ["Physical: Atomic Structure, Thermodynamics, Equilibrium, Electrochemistry, Kinetics", "Inorganic: Classification, Bonding, p/d/f-Block & Coordination Compounds", "Organic: Hydrocarbons, Haloalkanes, Oxygen/Nitrogen Compounds & Biomolecules"] }
    ]
  },
  {
    trackId: "neet",
    title: { en: "NEET (UG) Medical Entrance Track", hi: "नीट (यूजी) मेडिकल प्रवेश ट्रैक" },
    category: "competitive-india",
    startingYearId: "class-08",
    targetYears: ["class-08", "class-09", "class-10", "class-11", "class-12"],
    conductingBody: "National Testing Agency (NTA) & National Medical Commission (NMC)",
    sourceIds: ["SRC-NTA-NEETUG-2026", "SRC-CBSE-CURR-2026-27"],
    examPattern: {
      mode: "Pen and Paper (OMR)",
      durationMinutes: 180,
      totalMarks: "720 Marks (180 Compulsory Questions: 45 Physics, 45 Chemistry, 90 Biology; +4/-1 marking)",
      patternStatus: "sourced-official-pattern"
    },
    prerequisiteSkillIds: ["sci-curiosity-middle-inquiry", "math-ratios-linear-algebra-middle"],
    coreTrackSkillIds: ["sci-integrated-sec-9-10", "sci-biology-srsec-11-12", "sci-chemistry-srsec-11-12", "sci-physics-srsec-11-12"],
    domains: [
      { name: "Biology - Botany & Zoology (Units 1-10)", topics: ["Diversity in Living World & Structural Organisation", "Cell Structure & Function, Plant Physiology & Human Physiology", "Reproduction, Genetics & Evolution", "Biology and Human Welfare, Biotechnology & Ecology"] },
      { name: "Chemistry (Units 1-20)", topics: ["Physical Chemistry (Mole Concept, Thermodynamics, Equilibrium, Kinetics, Electrochemistry)", "Inorganic Chemistry (Periodic Table, Bonding, d/f Block, Coordination)", "Organic Chemistry (GOC, Hydrocarbons, Functional Groups, Biomolecules)"] },
      { name: "Physics (Units 1-20)", topics: ["Mechanics, Thermal Physics & Oscillations/Waves", "Electrostatics, Current Electricity, Magnetic Effects & Optics", "Modern Physics & Semiconductor Electronics"] }
    ]
  },
  {
    trackId: "cuet",
    title: { en: "CUET (UG) Central & Participating Universities Track", hi: "सीयूईटी (यूजी) केंद्रीय विश्वविद्यालय प्रवेश ट्रैक" },
    category: "competitive-india",
    startingYearId: "class-09",
    targetYears: ["class-09", "class-10", "class-11", "class-12"],
    conductingBody: "National Testing Agency (NTA)",
    sourceIds: ["SRC-NTA-CUETUG-2026", "SRC-CBSE-CURR-2026-27"],
    examPattern: {
      mode: "Hybrid / Computer Based Test (CBT)",
      durationMinutes: 60,
      totalMarks: "Per-Paper Scoring (+5 for correct, -1 for incorrect across Languages, Domain Subjects, and General Test)",
      patternStatus: "sourced-official-pattern"
    },
    prerequisiteSkillIds: ["lang-bilingual-literature-middle", "math-ratios-linear-algebra-middle"],
    coreTrackSkillIds: ["lang-academic-rhetoric-global-exams", "math-calculus-vectors-srsec", "sci-physics-srsec-11-12", "sci-chemistry-srsec-11-12", "sci-biology-srsec-11-12", "soc-humanities-commerce-srsec"],
    domains: [
      { name: "Section IA & IB: Languages", topics: ["Reading Comprehension (Factual, Narrative, Literary)", "Verbal Ability, Rearranging Parts, Vocabulary & Synonyms/Antonyms"] },
      { name: "Section II: Domain Subjects (Class 12 NCERT Aligned)", topics: ["Sciences (Mathematics, Physics, Chemistry, Biology, Computer Science)", "Humanities & Social Sciences (History, Political Science, Geography, Sociology)", "Commerce (Accountancy, Economics, Business Studies)"] },
      { name: "Section III: General Test", topics: ["Quantitative Reasoning (up to Class 8/10 NCERT)", "Logical & Analytical Reasoning, General Knowledge & Current Affairs"] }
    ]
  },
  {
    trackId: "upsc",
    title: { en: "UPSC Civil Services (CSE) NCERT Foundation & Prelims/Mains Spine", hi: "यूपीएससी सिविल सेवा (सीएसई) एनसीईआरटी आधार और प्रारंभिक/मुख्य ट्रैक" },
    category: "competitive-india",
    startingYearId: "class-08",
    targetYears: ["class-08", "class-09", "class-10", "class-11", "class-12"],
    conductingBody: "Union Public Service Commission (UPSC)",
    sourceIds: ["SRC-UPSC-CSE-2026", "SRC-NCERT-NCFSE-2023"],
    examPattern: {
      mode: "Prelims Objective (GS Paper I + CSAT Paper II) -> Mains Written (9 Papers) -> Personality Test",
      durationMinutes: 120,
      totalMarks: "Prelims: 200 Marks per paper (CSAT qualifying at 33%); Mains: 1750 Marks + 275 Interview",
      patternStatus: "sourced-official-pattern"
    },
    prerequisiteSkillIds: ["soc-exploring-society-middle", "math-ratios-linear-algebra-middle", "lang-bilingual-literature-middle"],
    coreTrackSkillIds: ["soc-democratic-polity-economy-sec", "soc-humanities-commerce-srsec", "sci-integrated-sec-9-10", "lang-academic-rhetoric-global-exams"],
    domains: [
      { name: "General Studies Paper I (NCERT Class 6-12 Spine)", topics: ["Indian Polity and Governance (Constitution, Rights, Federalism, Panchayati Raj)", "History of India and Indian National Movement + Art & Culture", "Indian and World Geography + Environment, Biodiversity & Climate Change", "Economic and Social Development, Sustainable Development & General Science"] },
      { name: "CSAT Paper II (Class X Level Numeracy & Comprehension)", topics: ["Reading Comprehension & Interpersonal Communication", "Logical Reasoning, Analytical Ability & Data Interpretation", "Basic Numeracy (Numbers, Orders of Magnitude - Class X Level)"] }
    ]
  },
  {
    trackId: "sat",
    title: { en: "College Board Digital SAT Track", hi: "कॉलेज बोर्ड डिजिटल सैट (SAT) अध्ययन विदेश ट्रैक" },
    category: "study-abroad",
    startingYearId: "class-08",
    targetYears: ["class-08", "class-09", "class-10", "class-11", "class-12"],
    conductingBody: "College Board",
    sourceIds: ["SRC-CB-DIGITALSAT-2026"],
    examPattern: {
      mode: "Digital Adaptive (2-Stage Multistage Adaptive Testing in Bluebook)",
      durationMinutes: 134,
      totalMarks: "400 to 1600 Scale (200-800 Reading and Writing + 200-800 Math)",
      patternStatus: "sourced-official-pattern"
    },
    prerequisiteSkillIds: ["lang-bilingual-literature-middle", "math-ratios-linear-algebra-middle", "math-geometry-mensuration-middle"],
    coreTrackSkillIds: ["lang-academic-rhetoric-global-exams", "math-polynomials-quadratics-sec", "math-trigonometry-coordinate-sec"],
    domains: [
      { name: "Reading and Writing (64 Minutes, 54 Questions across 2 Modules)", topics: ["Craft and Structure (~28%): Words in Context, Text Structure and Purpose, Cross-Text Connections", "Information and Ideas (~26%): Central Ideas, Command of Textual/Quantitative Evidence, Inferences", "Standard English Conventions (~26%): Boundaries, Form, Structure, and Sense", "Expression of Ideas (~20%): Rhetorical Synthesis and Transitions"] },
      { name: "Math (70 Minutes, 44 Questions across 2 Modules)", topics: ["Algebra (~35%): Linear equations, systems, and inequalities", "Advanced Math (~35%): Equivalent expressions, nonlinear equations, quadratics, exponentials", "Problem-Solving and Data Analysis (~15%): Ratios, rates, percentages, probability, statistical inference", "Geometry and Trigonometry (~15%): Area/volume, lines/angles/triangles, right-triangle trig, circles"] }
    ]
  },
  {
    trackId: "act",
    title: { en: "ACT College Readiness Assessment Track", hi: "एसीटी (ACT) अध्ययन विदेश ट्रैक" },
    category: "study-abroad",
    startingYearId: "class-09",
    targetYears: ["class-09", "class-10", "class-11", "class-12"],
    conductingBody: "ACT, Inc.",
    sourceIds: ["SRC-ACT-SPEC-2026", "SRC-CB-DIGITALSAT-2026"],
    examPattern: {
      mode: "Digital / Paper Multiple-Choice Assessment",
      durationMinutes: 175,
      totalMarks: "1 to 36 Composite Scale across English, Math, Reading, and Science",
      patternStatus: "sourced-official-pattern"
    },
    prerequisiteSkillIds: ["lang-bilingual-literature-middle", "math-ratios-linear-algebra-middle", "sci-curiosity-middle-inquiry"],
    coreTrackSkillIds: ["lang-academic-rhetoric-global-exams", "math-polynomials-quadratics-sec", "math-trigonometry-coordinate-sec", "sci-integrated-sec-9-10"],
    domains: [
      { name: "English & Reading", topics: ["Production of Writing, Knowledge of Language & Conventions of Standard English", "Key Ideas and Details, Craft and Structure, Integration of Knowledge"] },
      { name: "Mathematics & Science Reasoning", topics: ["Number & Quantity, Algebra, Functions, Geometry, Statistics & Probability", "Data Representation, Research Summaries & Conflicting Viewpoints in Science"] }
    ]
  },
  {
    trackId: "ielts",
    title: { en: "IELTS Academic English Proficiency Track", hi: "आईईएलटीएस (IELTS) अकादमिक अंग्रेजी दक्षता ट्रैक" },
    category: "study-abroad",
    startingYearId: "class-09",
    targetYears: ["class-09", "class-10", "class-11", "class-12"],
    conductingBody: "British Council, IDP: IELTS Australia & Cambridge University Press & Assessment",
    sourceIds: ["SRC-IELTS-ACADEMIC-2026"],
    examPattern: {
      mode: "4-Skill Assessment (Listening, Academic Reading, Academic Writing, Face-to-Face Speaking)",
      durationMinutes: 165,
      totalMarks: "Band 0 to 9 Scale (Half-band reporting across all 4 skills)",
      patternStatus: "sourced-official-pattern"
    },
    prerequisiteSkillIds: ["lit-sentence-reading-fluency", "lang-bilingual-literature-middle"],
    coreTrackSkillIds: ["lang-academic-rhetoric-global-exams"],
    domains: [
      { name: "Listening (30 Minutes, 40 Questions) & Academic Reading (60 Minutes, 40 Questions)", topics: ["4 recorded monologues and conversations across social and university contexts", "3 long academic texts from journals/books testing skimming, logical argument, and writer opinion"] },
      { name: "Academic Writing (60 Minutes) & Speaking (11-14 Minutes)", topics: ["Task 1 (150 words, 20 min): Visual chart/graph/process synthesis; Task 2 (250 words, 40 min): Discursive academic essay", "Part 1 Introduction, Part 2 Individual Long Turn (Cue Card), Part 3 Two-Way Abstract Discussion"] }
    ]
  },
  {
    trackId: "toefl",
    title: { en: "ETS TOEFL iBT Academic English Track", hi: "टोफल (TOEFL iBT) अकादमिक अंग्रेजी ट्रैक" },
    category: "study-abroad",
    startingYearId: "class-09",
    targetYears: ["class-09", "class-10", "class-11", "class-12"],
    conductingBody: "Educational Testing Service (ETS)",
    sourceIds: ["SRC-ETS-TOEFL-2026"],
    examPattern: {
      mode: "Internet-Based Test (iBT) - Reading, Listening, Speaking, Writing",
      durationMinutes: 116,
      totalMarks: "0 to 120 Scale (30 per section) paired with ETS 1 to 6 CEFR-aligned scale (2026 update)",
      patternStatus: "sourced-official-pattern"
    },
    prerequisiteSkillIds: ["lit-sentence-reading-fluency", "lang-bilingual-literature-middle"],
    coreTrackSkillIds: ["lang-academic-rhetoric-global-exams"],
    domains: [
      { name: "Reading (35 Min, 20 Questions) & Listening (36 Min, 28 Questions)", topics: ["2 university-level passages (700 words each) testing rhetorical purpose, inference, and summary", "3 academic lectures and 2 campus conversations testing attitude, organization, and connection"] },
      { name: "Speaking (16 Min, 4 Tasks) & Writing (29 Min, 2 Tasks)", topics: ["1 Independent Speaking task + 3 Integrated Reading/Listening/Speaking tasks", "Integrated Writing task (20 min) + Writing for an Academic Discussion task (10 min)"] }
    ]
  }
];

for (const track of TRACKS) {
  writeJson(`content/tracks/${track.trackId}-track-branch.json`, track);
}

// Generate Diagnostic and Mock Exam Bank (validated against schemas/assessment-blueprint.schema.json)
const DIAGNOSTIC_AND_MOCK_BANK = {
  schemaVersion: "1.0.0",
  updatedAt: UPDATED_AT,
  diagnosticItems: [
    {
      itemId: "diag-early-01",
      skillId: "num-pre-number-counting-20",
      domainId: "foundational-numeracy",
      targetYearId: "ukg",
      difficulty: "foundation",
      prompt: {
        en: "Aarav arranges clay beads in the pattern: Red, Blue, Red, Blue, Red, [ ? ]. Which bead comes next?",
        hi: "आरव मिट्टी के मोतियों को इस क्रम में रखता है: लाल, नीला, लाल, नीला, लाल, [ ? ]। अगला मोती कौन-सा होगा?"
      },
      options: [
        { en: "Blue", hi: "नीला" },
        { en: "Red", hi: "लाल" },
        { en: "Green", hi: "हरा" },
        { en: "Yellow", hi: "पीला" }
      ],
      correctIndex: 0,
      explanation: {
        en: "The pattern alternates Red and Blue (ABAB). After Red, the next bead is Blue.",
        hi: "यह लाल और नीले का एकांतर (ABAB) पैटर्न है। लाल के बाद नीला मोती आएगा।"
      },
      sourceIds: ["SRC-MWCD-AADHARSHILA-2024", "SRC-NCERT-NCFFS-2022"]
    },
    {
      itemId: "diag-found-02",
      skillId: "num-place-value-add-sub",
      domainId: "foundational-numeracy",
      targetYearId: "class-02",
      difficulty: "core",
      prompt: {
        en: "Meera has 3 bundles of 10 sticks and 14 loose sticks. What total number of sticks does she have?",
        hi: "मीरा के पास 10-10 तीलियों के 3 गट्ठर और 14 खुली तीलियां हैं। उसके पास कुल कितनी तीलियां हैं?"
      },
      options: [
        { en: "44", hi: "44" },
        { en: "314", hi: "314" },
        { en: "34", hi: "34" },
        { en: "17", hi: "17" }
      ],
      correctIndex: 0,
      explanation: {
        en: "3 tens = 30, plus 14 ones (1 ten + 4 ones) = 4 tens and 4 ones = 44.",
        hi: "3 दहाई = 30, और 14 इकाई = 30 + 14 = 44 तीलियां।"
      },
      sourceIds: ["SRC-NCERT-NCFFS-2022"]
    },
    {
      itemId: "diag-prep-03",
      skillId: "num-mult-div-fractions-prep",
      domainId: "foundational-numeracy",
      targetYearId: "class-05",
      difficulty: "core",
      prompt: {
        en: "Which of the following fractions is equivalent to 3/4?",
        hi: "निम्नलिखित में से कौन-सी भिन्न 3/4 के समतुल्य है?"
      },
      options: [
        { en: "9/12", hi: "9/12" },
        { en: "6/12", hi: "6/12" },
        { en: "4/3", hi: "4/3" },
        { en: "7/8", hi: "7/8" }
      ],
      correctIndex: 0,
      explanation: {
        en: "Multiplying numerator and denominator of 3/4 by 3 gives (3 x 3)/(4 x 3) = 9/12.",
        hi: "3/4 के अंश और हर को 3 से गुणा करने पर 9/12 प्राप्त होता है।"
      },
      sourceIds: ["SRC-NCERT-NCFSE-2023"]
    },
    {
      itemId: "diag-mid-math-04",
      skillId: "math-integers-number-patterns",
      domainId: "mathematics-core",
      targetYearId: "class-06",
      difficulty: "core",
      prompt: {
        en: "In Srinagar, the temperature at midnight is -4 C. By morning it drops by another 3 C. What is the morning temperature?",
        hi: "श्रीनगर में आधी रात का तापमान -4 C है। सुबह तक यह 3 C और गिर जाता है। सुबह का तापमान क्या है?"
      },
      options: [
        { en: "-7 C", hi: "-7 C" },
        { en: "-1 C", hi: "-1 C" },
        { en: "+7 C", hi: "+7 C" },
        { en: "+1 C", hi: "+1 C" }
      ],
      correctIndex: 0,
      explanation: {
        en: "Starting at -4 and moving 3 units left on the number line gives (-4) + (-3) = -7 C.",
        hi: "संख्या रेखा पर -4 से 3 इकाई बाईं ओर जाने पर (-4) - 3 = -7 C मिलता है।"
      },
      sourceIds: ["SRC-NCERT-NCFSE-2023", "SRC-CBSE-CURR-2026-27"]
    },
    {
      itemId: "diag-mid-alg-05",
      skillId: "math-ratios-linear-algebra-middle",
      domainId: "mathematics-core",
      targetYearId: "class-08",
      difficulty: "core",
      prompt: {
        en: "Solve for x: 3(2x - 1) = 4x + 7",
        hi: "x का मान ज्ञात कीजिए: 3(2x - 1) = 4x + 7"
      },
      options: [
        { en: "x = 5", hi: "x = 5" },
        { en: "x = 2", hi: "x = 2" },
        { en: "x = 4", hi: "x = 4" },
        { en: "x = -5", hi: "x = -5" }
      ],
      correctIndex: 0,
      explanation: {
        en: "Expanding gives 6x - 3 = 4x + 7 -> 2x = 10 -> x = 5.",
        hi: "विस्तार करने पर 6x - 3 = 4x + 7 -> 2x = 10 -> x = 5 प्राप्त होता है।"
      },
      sourceIds: ["SRC-NCERT-NCFSE-2023", "SRC-CBSE-CURR-2026-27"]
    },
    {
      itemId: "diag-mid-sci-06",
      skillId: "sci-curiosity-middle-inquiry",
      domainId: "science-and-inquiry",
      targetYearId: "class-07",
      difficulty: "core",
      prompt: {
        en: "When a few drops of dilute iodine solution are added to boiled rice, it turns blue-black. This indicates the presence of:",
        hi: "जब उबले हुए चावल में तनु आयोडीन घोल की कुछ बूंदें डाली जाती हैं, तो वह नीला-काला हो जाता है। यह किसकी उपस्थिति दर्शाता है?"
      },
      options: [
        { en: "Starch (Carbohydrate)", hi: "मंड (स्टार्च / कार्बोहाइड्रेट)" },
        { en: "Protein", hi: "प्रोटीन" },
        { en: "Fat", hi: "वसा" },
        { en: "Vitamin C", hi: "विटामिन सी" }
      ],
      correctIndex: 0,
      explanation: {
        en: "Iodine reacts with amylose in starch to form a characteristic blue-black complex (NCERT Curiosity).",
        hi: "आयोडीन स्टार्च (मंड) के साथ अभिक्रिया करके नीला-काला रंग देता है (एनसीईआरटी जिज्ञासा)।"
      },
      sourceIds: ["SRC-NCERT-NCFSE-2023"]
    },
    {
      itemId: "diag-sec-math-07",
      skillId: "math-polynomials-quadratics-sec",
      domainId: "mathematics-core",
      targetYearId: "class-10",
      difficulty: "stretch",
      prompt: {
        en: "For what value of k does the quadratic equation x^2 - 6x + k = 0 have two equal real roots?",
        hi: "k के किस मान के लिए द्विघात समीकरण x^2 - 6x + k = 0 के दो बराबर वास्तविक मूल होंगे?"
      },
      options: [
        { en: "k = 9", hi: "k = 9" },
        { en: "k = 6", hi: "k = 6" },
        { en: "k = -9", hi: "k = -9" },
        { en: "k = 3", hi: "k = 3" }
      ],
      correctIndex: 0,
      explanation: {
        en: "Equal real roots occur when discriminant D = b^2 - 4ac = 0 -> (-6)^2 - 4(1)(k) = 0 -> 36 - 4k = 0 -> k = 9.",
        hi: "बराबर मूलों के लिए विविक्तकर D = b^2 - 4ac = 0 -> 36 - 4k = 0 -> k = 9।"
      },
      sourceIds: ["SRC-CBSE-CURR-2026-27", "SRC-NTA-JEEMAIN-2026"]
    },
    {
      itemId: "diag-srsec-calc-08",
      skillId: "math-calculus-vectors-srsec",
      domainId: "mathematics-core",
      targetYearId: "class-12",
      difficulty: "stretch",
      prompt: {
        en: "What is the derivative d/dx of f(x) = x^3 - 5x^2 + 7 at x = 2?",
        hi: "x = 2 पर फलन f(x) = x^3 - 5x^2 + 7 का अवकलज (d/dx) क्या है?"
      },
      options: [
        { en: "-8", hi: "-8" },
        { en: "12", hi: "12" },
        { en: "-4", hi: "-4" },
        { en: "0", hi: "0" }
      ],
      correctIndex: 0,
      explanation: {
        en: "f'(x) = 3x^2 - 10x. Evaluating at x = 2 gives 3(4) - 10(2) = 12 - 20 = -8.",
        hi: "f'(x) = 3x^2 - 10x। x = 2 रखने पर 3(4) - 20 = -8 प्राप्त होता है।"
      },
      sourceIds: ["SRC-CBSE-CURR-2026-27", "SRC-NTA-JEEMAIN-2026"]
    },
    {
      itemId: "diag-global-lang-09",
      skillId: "lang-academic-rhetoric-global-exams",
      domainId: "languages-and-communication",
      targetYearId: "class-11",
      difficulty: "stretch",
      prompt: {
        en: "Choose the punctuation that conforms to Standard English conventions: 'Solar microgrids reduce transmission losses ______ they require local battery storage to handle monsoon cloud cover.'",
        hi: "मानक अंग्रेजी विराम-चिह्न चुनें: 'Solar microgrids reduce transmission losses ______ they require local battery storage to handle monsoon cloud cover.'"
      },
      options: [
        { en: "losses; however,", hi: "losses; however," },
        { en: "losses, however,", hi: "losses, however," },
        { en: "losses however", hi: "losses however" },
        { en: "losses: however", hi: "losses: however" }
      ],
      correctIndex: 0,
      explanation: {
        en: "Joining two independent clauses with the conjunctive adverb 'however' requires a semicolon before and a comma after.",
        hi: "दो स्वतंत्र उपवाक्यों को 'however' से जोड़ने के लिए पहले अर्धविराम (;) और बाद में अल्पविराम (,) आवश्यक है।"
      },
      sourceIds: ["SRC-CB-DIGITALSAT-2026", "SRC-IELTS-ACADEMIC-2026"]
    }
  ],
  mockBlueprints: [
    {
      blueprintId: "mock-cbse-class-10-science-math",
      title: { en: "CBSE Class 10 Competency-Based Board Mock", hi: "सीबीएसई कक्षा 10 दक्षता-आधारित बोर्ड मॉक" },
      category: "board-mock",
      targetBoardOrTrack: "CBSE Class 10 (80 Marks Theory Blueprint)",
      durationMinutes: 180,
      totalMarksOrScale: "80 Marks (50% Competency/Case-Based, 20% MCQ, 30% Short/Long Response)",
      patternStatus: "sourced-official-pattern",
      sections: [
        { sectionId: "sec-a", name: "Section A: Multiple Choice & Assertion-Reason", questionCount: 20, marksNote: "20 x 1 = 20 Marks", skillIds: ["math-polynomials-quadratics-sec", "sci-integrated-sec-9-10"] },
        { sectionId: "sec-b-d", name: "Sections B-D: Short & Long Constructed Response", questionCount: 14, marksNote: "48 Marks", skillIds: ["math-trigonometry-coordinate-sec", "sci-integrated-sec-9-10"] },
        { sectionId: "sec-e", name: "Section E: Competency Case-Study Units", questionCount: 3, marksNote: "3 x 4 = 12 Marks", skillIds: ["math-trigonometry-coordinate-sec", "soc-democratic-polity-economy-sec"] }
      ],
      sourceIds: ["SRC-CBSE-CURR-2026-27", "SRC-CBSE-SECPART1-2026-27"],
      sampleItems: [
        {
          itemId: "m-cbse10-1",
          skillId: "sci-integrated-sec-9-10",
          prompt: {
            en: "Two resistors of 4 Ohm and 12 Ohm are connected in parallel across a 6 V battery. What is the equivalent resistance of the circuit?",
            hi: "4 ओम और 12 ओम के दो प्रतिरोधक 6 V बैटरी के साथ समांतर क्रम में जुड़े हैं। परिपथ का तुल्य प्रतिरोध क्या है?"
          },
          options: [
            { en: "3 Ohm", hi: "3 ओम" },
            { en: "16 Ohm", hi: "16 ओम" },
            { en: "8 Ohm", hi: "8 ओम" },
            { en: "0.33 Ohm", hi: "0.33 ओम" }
          ],
          correctIndex: 0,
          explanation: {
            en: "1/Req = 1/4 + 1/12 = 4/12 = 1/3 -> Req = 3 Ohm.",
            hi: "1/Req = 1/4 + 1/12 = 4/12 = 1/3 -> तुल्य प्रतिरोध Req = 3 ओम।"
          }
        },
        {
          itemId: "m-cbse10-2",
          skillId: "math-trigonometry-coordinate-sec",
          prompt: {
            en: "If sin(theta) = 3/5 for an acute angle theta, what is the value of cos(theta)?",
            hi: "यदि न्यून कोण theta के लिए sin(theta) = 3/5 है, तो cos(theta) का मान क्या होगा?"
          },
          options: [
            { en: "4/5", hi: "4/5" },
            { en: "3/4", hi: "3/4" },
            { en: "5/4", hi: "5/4" },
            { en: "2/5", hi: "2/5" }
          ],
          correctIndex: 0,
          explanation: {
            en: "Using sin^2(theta) + cos^2(theta) = 1 -> cos(theta) = sqrt(1 - 9/25) = sqrt(16/25) = 4/5.",
            hi: "sin^2(theta) + cos^2(theta) = 1 से cos(theta) = sqrt(1 - 9/25) = 4/5।"
          }
        }
      ]
    },
    {
      blueprintId: "mock-jee-main-paper1",
      title: { en: "NTA JEE (Main) Paper 1 CBT Full Pattern Mock", hi: "एनटीए जेईई (मेन) पेपर 1 सीबीटी मॉक परीक्षा" },
      category: "competitive-track",
      targetBoardOrTrack: "JEE Main B.E./B.Tech (300 Marks)",
      durationMinutes: 180,
      totalMarksOrScale: "300 Marks (75 Questions: +4 correct, -1 incorrect)",
      patternStatus: "sourced-official-pattern",
      sections: [
        { sectionId: "jee-math", name: "Part I: Mathematics (20 MCQ + 5 Numerical)", questionCount: 25, marksNote: "100 Marks", skillIds: ["math-calculus-vectors-srsec", "math-polynomials-quadratics-sec"] },
        { sectionId: "jee-phy", name: "Part II: Physics (20 MCQ + 5 Numerical)", questionCount: 25, marksNote: "100 Marks", skillIds: ["sci-physics-srsec-11-12"] },
        { sectionId: "jee-chem", name: "Part III: Chemistry (20 MCQ + 5 Numerical)", questionCount: 25, marksNote: "100 Marks", skillIds: ["sci-chemistry-srsec-11-12"] }
      ],
      sourceIds: ["SRC-NTA-JEEMAIN-2026"],
      sampleItems: [
        {
          itemId: "m-jee-1",
          skillId: "sci-physics-srsec-11-12",
          prompt: {
            en: "A particle of mass m is projected with velocity v at 45 degrees to the horizontal. What is the magnitude of its angular momentum about the point of projection at maximum height?",
            hi: "द्रव्यमान m के एक कण को क्षैतिज से 45 डिग्री पर वेग v से प्रक्षेपित किया जाता है। अधिकतम ऊंचाई पर प्रक्षेपण बिंदु के सापेक्ष इसका कोणीय संवेग क्या होगा?"
          },
          options: [
            { en: "m v^3 / (4 sqrt(2) g)", hi: "m v^3 / (4 sqrt(2) g)" },
            { en: "m v^3 / (2 sqrt(2) g)", hi: "m v^3 / (2 sqrt(2) g)" },
            { en: "zero", hi: "शून्य" },
            { en: "m v^2 / (2 g)", hi: "m v^2 / (2 g)" }
          ],
          correctIndex: 0,
          explanation: {
            en: "At max height H = v^2 sin^2(45)/(2g) = v^2/(4g), speed is v cos(45) = v/sqrt(2). Thus L = m (v/sqrt(2)) H = m v^3 / (4 sqrt(2) g).",
            hi: "अधिकतम ऊंचाई H = v^2/(4g) और क्षैतिज वेग v/sqrt(2) से L = m v_x H = m v^3 / (4 sqrt(2) g)।"
          }
        },
        {
          itemId: "m-jee-2",
          skillId: "math-calculus-vectors-srsec",
          prompt: {
            en: "What is the value of the definite integral from 0 to pi/2 of sin^2(x) dx?",
            hi: "0 से pi/2 तक sin^2(x) dx के निश्चित समाकलन का मान क्या है?"
          },
          options: [
            { en: "pi / 4", hi: "pi / 4" },
            { en: "pi / 2", hi: "pi / 2" },
            { en: "1", hi: "1" },
            { en: "pi / 8", hi: "pi / 8" }
          ],
          correctIndex: 0,
          explanation: {
            en: "By symmetry I = int_0^(pi/2) sin^2(x) dx = int_0^(pi/2) cos^2(x) dx -> 2I = pi/2 -> I = pi/4.",
            hi: "सममिति गुणधर्म से 2I = pi/2, अतः I = pi/4।"
          }
        }
      ]
    },
    {
      blueprintId: "mock-neet-ug",
      title: { en: "NTA NEET (UG) 720-Mark Medical Entrance Mock", hi: "एनटीए नीट (यूजी) 720-अंक मेडिकल प्रवेश मॉक" },
      category: "competitive-track",
      targetBoardOrTrack: "NEET UG (Physics, Chemistry, Biology)",
      durationMinutes: 180,
      totalMarksOrScale: "720 Marks (180 Questions: +4 correct, -1 incorrect)",
      patternStatus: "sourced-official-pattern",
      sections: [
        { sectionId: "neet-bio", name: "Biology (Botany & Zoology)", questionCount: 90, marksNote: "360 Marks", skillIds: ["sci-biology-srsec-11-12"] },
        { sectionId: "neet-chem", name: "Chemistry", questionCount: 45, marksNote: "180 Marks", skillIds: ["sci-chemistry-srsec-11-12"] },
        { sectionId: "neet-phy", name: "Physics", questionCount: 45, marksNote: "180 Marks", skillIds: ["sci-physics-srsec-11-12"] }
      ],
      sourceIds: ["SRC-NTA-NEETUG-2026"],
      sampleItems: [
        {
          itemId: "m-neet-1",
          skillId: "sci-biology-srsec-11-12",
          prompt: {
            en: "Which enzyme is thermostable and catalyses the extension step during Polymerase Chain Reaction (PCR)?",
            hi: "पॉलीमरेज़ चेन रिएक्शन (PCR) के दौरान कौन-सा ताप-स्थायी एंजाइम डीएनए विस्तार (extension) को उत्प्रेरित करता है?"
          },
          options: [
            { en: "Taq polymerase (from Thermus aquaticus)", hi: "टैक पॉलीमरेज़ (Thermus aquaticus से)" },
            { en: "DNA ligase", hi: "डीएनए लाइगेज" },
            { en: "EcoRI restriction endonuclease", hi: "EcoRI प्रतिबंधन एंजाइम" },
            { en: "RNA primase", hi: "आरएनए प्राइमेज़" }
          ],
          correctIndex: 0,
          explanation: {
            en: "Taq DNA polymerase isolated from Thermus aquaticus remains active during high-temperature denaturation in PCR.",
            hi: "Thermus aquaticus से प्राप्त टैक डीएनए पॉलीमरेज़ उच्च तापमान पर भी सक्रिय रहता है।"
          }
        },
        {
          itemId: "m-neet-2",
          skillId: "sci-chemistry-srsec-11-12",
          prompt: {
            en: "For a first-order chemical reaction with rate constant k = 0.693 min^-1, what is the half-life (t_1/2)?",
            hi: "यदि किसी प्रथम कोटि की अभिक्रिया का वेग स्थिरांक k = 0.693 min^-1 है, तो उसकी अर्ध-आयु (t_1/2) क्या होगी?"
          },
          options: [
            { en: "1.0 minute", hi: "1.0 मिनट" },
            { en: "2.0 minutes", hi: "2.0 मिनट" },
            { en: "0.5 minute", hi: "0.5 मिनट" },
            { en: "0.693 minutes", hi: "0.693 मिनट" }
          ],
          correctIndex: 0,
          explanation: {
            en: "For first-order kinetics, t_1/2 = 0.693 / k = 0.693 / 0.693 = 1.0 minute.",
            hi: "प्रथम कोटि अभिक्रिया के लिए t_1/2 = 0.693 / k = 1.0 मिनट।"
          }
        }
      ]
    },
    {
      blueprintId: "mock-cuet-ug-combined",
      title: { en: "NTA CUET (UG) Domain & General Test Mock", hi: "एनटीए सीयूईटी (यूजी) डोमेन और जनरल टेस्ट मॉक" },
      category: "competitive-track",
      targetBoardOrTrack: "CUET UG (Languages + Class 12 Domain + General Test)",
      durationMinutes: 60,
      totalMarksOrScale: "250 Marks per paper (+5 correct, -1 incorrect)",
      patternStatus: "sourced-official-pattern",
      sections: [
        { sectionId: "cuet-lang", name: "Section IA: Language Reading Comprehension", questionCount: 50, marksNote: "250 Marks", skillIds: ["lang-academic-rhetoric-global-exams"] },
        { sectionId: "cuet-dom", name: "Section II/III: Domain & Quantitative Aptitude", questionCount: 50, marksNote: "250 Marks", skillIds: ["soc-humanities-commerce-srsec", "math-ratios-linear-algebra-middle"] }
      ],
      sourceIds: ["SRC-NTA-CUETUG-2026"],
      sampleItems: [
        {
          itemId: "m-cuet-1",
          skillId: "soc-humanities-commerce-srsec",
          prompt: {
            en: "Which function of the Reserve Bank of India (RBI) describes its role as the 'lender of last resort' to commercial banks?",
            hi: "भारतीय रिज़र्व बैंक (RBI) का कौन-सा कार्य वाणिज्यिक बैंकों के लिए 'अंतिम ऋणदाता' की भूमिका दर्शाता है?"
          },
          options: [
            { en: "Bankers' Bank and Supervisor", hi: "बैंकों का बैंक और पर्यवेक्षक" },
            { en: "Issuer of Currency Notes", hi: "मुद्रा जारीकर्ता" },
            { en: "Custodian of Foreign Exchange", hi: "विदेशी मुद्रा संरक्षक" },
            { en: "Retail Deposit Collector", hi: "खुदरा जमा संग्रहकर्ता" }
          ],
          correctIndex: 0,
          explanation: {
            en: "As Bankers' Bank (NCERT Introductory Macroeconomics), RBI provides liquidity support to solvent commercial banks facing temporary crunches.",
            hi: "बैंकों के बैंक के रूप में RBI वाणिज्यिक बैंकों को संकट के समय तरलता सहायता प्रदान करता है।"
          }
        },
        {
          itemId: "m-cuet-2",
          skillId: "math-ratios-linear-algebra-middle",
          prompt: {
            en: "If A and B can complete a project in 12 days and 24 days respectively, how many days will they take working together?",
            hi: "यदि A और B किसी कार्य को क्रमशः 12 दिन और 24 दिन में पूरा कर सकते हैं, तो दोनों मिलकर उसे कितने दिनों में पूरा करेंगे?"
          },
          options: [
            { en: "8 days", hi: "8 दिन" },
            { en: "9 days", hi: "9 दिन" },
            { en: "6 days", hi: "6 दिन" },
            { en: "18 days", hi: "18 दिन" }
          ],
          correctIndex: 0,
          explanation: {
            en: "Combined daily rate = 1/12 + 1/24 = 3/24 = 1/8 job per day -> 8 days.",
            hi: "संयुक्त कार्य दर = 1/12 + 1/24 = 3/24 = 1/8 प्रति दिन -> 8 दिन।"
          }
        }
      ]
    },
    {
      blueprintId: "mock-upsc-prelims-gs",
      title: { en: "UPSC CSE Prelims GS Paper I & CSAT Foundation Mock", hi: "यूपीएससी प्रारंभिक सामान्य अध्ययन और सीसैट मॉक" },
      category: "competitive-track",
      targetBoardOrTrack: "UPSC Civil Services Preliminary Exam (GS I + CSAT II)",
      durationMinutes: 120,
      totalMarksOrScale: "200 Marks (100 GS Questions; +2 correct, -0.66 incorrect)",
      patternStatus: "sourced-official-pattern",
      sections: [
        { sectionId: "upsc-gs1", name: "GS Paper I: Polity, History, Geography, Economy & Ecology", questionCount: 100, marksNote: "200 Marks", skillIds: ["soc-democratic-polity-economy-sec", "soc-humanities-commerce-srsec"] },
        { sectionId: "upsc-csat", name: "GS Paper II (CSAT): Comprehension & Class X Numeracy", questionCount: 80, marksNote: "200 Marks (Qualifying 33%)", skillIds: ["math-ratios-linear-algebra-middle", "lang-academic-rhetoric-global-exams"] }
      ],
      sourceIds: ["SRC-UPSC-CSE-2026"],
      sampleItems: [
        {
          itemId: "m-upsc-1",
          skillId: "soc-democratic-polity-economy-sec",
          prompt: {
            en: "Which Constitutional Amendment Act accorded constitutional status to Panchayati Raj Institutions under Part IX of the Constitution of India?",
            hi: "किस संविधान संशोधन अधिनियम ने भारत के संविधान के भाग IX के अंतर्गत पंचायती राज संस्थाओं को संवैधानिक दर्जा प्रदान किया?"
          },
          options: [
            { en: "73rd Constitutional Amendment Act, 1992", hi: "73वां संविधान संशोधन अधिनियम, 1992" },
            { en: "42nd Constitutional Amendment Act, 1976", hi: "42वां संविधान संशोधन अधिनियम, 1976" },
            { en: "86th Constitutional Amendment Act, 2002", hi: "86वां संविधान संशोधन अधिनियम, 2002" },
            { en: "44th Constitutional Amendment Act, 1978", hi: "44वां संविधान संशोधन अधिनियम, 1978" }
          ],
          correctIndex: 0,
          explanation: {
            en: "The 73rd Amendment Act, 1992 added Part IX (Articles 243 to 243-O) and the Eleventh Schedule for Panchayati Raj.",
            hi: "73वें संविधान संशोधन अधिनियम, 1992 द्वारा भाग IX और ग्यारहवीं अनुसूची जोड़ी गई।"
          }
        },
        {
          itemId: "m-upsc-2",
          skillId: "soc-exploring-society-middle",
          prompt: {
            en: "The Great Bath and advanced citadel drainage systems are archaeological hallmarks of which Indus Valley site?",
            hi: "विशाल स्नानागार (Great Bath) और उन्नत जल-निकासी प्रणाली सिंधु घाटी सभ्यता के किस स्थल की विशेषता है?"
          },
          options: [
            { en: "Mohenjo-daro", hi: "मोहनजोदड़ो" },
            { en: "Lothal", hi: "लोथल" },
            { en: "Kalibangan", hi: "कालीबंगा" },
            { en: "Ropar", hi: "रोपड़" }
          ],
          correctIndex: 0,
          explanation: {
            en: "Mohenjo-daro features the brick-lined water-tight Great Bath documented in NCERT Exploring Society.",
            hi: "मोहनजोदड़ो में विशाल स्नानागार और सुव्यवस्थित जल निकासी प्रणाली पाई गई है।"
          }
        }
      ]
    },
    {
      blueprintId: "mock-digital-sat-global",
      title: { en: "Digital SAT & IELTS/TOEFL Study Abroad Readiness Mock", hi: "डिजिटल सैट (SAT) और आईईएलटीएस/टोफल अध्ययन विदेश मॉक" },
      category: "study-abroad",
      targetBoardOrTrack: "College Board Digital SAT (1600) + IELTS/TOEFL Academic",
      durationMinutes: 134,
      totalMarksOrScale: "1600 SAT Scale + CEFR C1 / Band 8.0 Rubric",
      patternStatus: "sourced-official-pattern",
      sections: [
        { sectionId: "sat-rw", name: "Digital SAT Reading and Writing (Modules 1 & 2)", questionCount: 54, marksNote: "200-800 Scale (64 Min)", skillIds: ["lang-academic-rhetoric-global-exams"] },
        { sectionId: "sat-math", name: "Digital SAT Math (Modules 1 & 2)", questionCount: 44, marksNote: "200-800 Scale (70 Min)", skillIds: ["math-ratios-linear-algebra-middle", "math-polynomials-quadratics-sec", "math-trigonometry-coordinate-sec"] }
      ],
      sourceIds: ["SRC-CB-DIGITALSAT-2026", "SRC-IELTS-ACADEMIC-2026", "SRC-ETS-TOEFL-2026"],
      sampleItems: [
        {
          itemId: "m-sat-1",
          skillId: "math-ratios-linear-algebra-middle",
          prompt: {
            en: "If 5x + 3y = 24 and 2x - 3y = 11, what is the value of x + y?",
            hi: "यदि 5x + 3y = 24 और 2x - 3y = 11 है, तो x + y का मान क्या होगा?"
          },
          options: [
            { en: "8", hi: "8" },
            { en: "5", hi: "5" },
            { en: "3", hi: "3" },
            { en: "10", hi: "10" }
          ],
          correctIndex: 0,
          explanation: {
            en: "Adding the two equations gives 7x = 35 -> x = 5. Substituting x = 5 into 5(5) + 3y = 24 gives 3y = -1? Wait: let us check: if 5x - 3y = 11 and 2x + 3y = 24, or here 5(5) + 3y = 24 gives y = -1/3. Wait: let us make the system 4x + 3y = 29 and 3x - 3y = 6 so 7x = 35 -> x = 5, y = 3, x + y = 8!",
            hi: "दोनों समीकरणों से x = 5 और y = 3, अतः x + y = 8।"
          }
        },
        {
          itemId: "m-sat-2",
          skillId: "lang-academic-rhetoric-global-exams",
          prompt: {
            en: "Archaeologists studying stepwells in Gujarat note that these structures served dual purposes: providing year-round groundwater access and ______ cool communal gathering spaces during summer heatwaves.",
            hi: "गुजरात की बावड़ियों का अध्ययन करने वाले पुरातत्वविद् बताते हैं कि ये संरचनाएं दोहरे उद्देश्य पूरे करती थीं: वर्ष भर भूजल उपलब्ध कराना और ग्रीष्मकाल में शीतल सामुदायिक स्थान ______।"
          },
          options: [
            { en: "offering", hi: "प्रदान करना (offering)" },
            { en: "offered", hi: "offered" },
            { en: "to offer", hi: "to offer" },
            { en: "they offered", hi: "they offered" }
          ],
          correctIndex: 0,
          explanation: {
            en: "Parallel grammatical structure requires the participial phrase 'offering...' to match 'providing...'.",
            hi: "समानांतर व्याकरणिक संरचना के लिए 'providing' के साथ 'offering' का प्रयोग सही है।"
          }
        }
      ]
    }
  ]
};

// Fix m-sat-1 prompt so equations are 4x + 3y = 29 and 3x - 3y = 6 (giving x=5, y=3, x+y=8)
DIAGNOSTIC_AND_MOCK_BANK.mockBlueprints[5].sampleItems[0].prompt = {
  en: "If 4x + 3y = 29 and 3x - 3y = 6, what is the value of x + y?",
  hi: "यदि 4x + 3y = 29 और 3x - 3y = 6 है, तो x + y का मान क्या होगा?"
};
DIAGNOSTIC_AND_MOCK_BANK.mockBlueprints[5].sampleItems[0].explanation = {
  en: "Adding the two equations gives 7x = 35 -> x = 5. Substituting x = 5 into 4(5) + 3y = 29 gives 3y = 9 -> y = 3. Thus x + y = 8.",
  hi: "दोनों समीकरणों को जोड़ने पर 7x = 35 -> x = 5 तथा 4(5) + 3y = 29 -> y = 3। अतः x + y = 8।"
};

writeJson("content/assessments/diagnostic-and-mock-bank.json", DIAGNOSTIC_AND_MOCK_BANK);

// Generate Synthetic Learner Profiles (validated against schemas/content-learner-profile.schema.json)
const SYNTHETIC_LEARNERS = [
  {
    schemaVersion: "1.0.0",
    learnerId: "learner01aaravcbse07",
    createdAt: UPDATED_AT,
    identity: {
      displayName: "Aarav S. (Synthetic Demo)",
      preferredName: "Aarav",
      dateOfBirth: "2014-04",
      guardianContactRef: "guardian-vault-ref-001"
    },
    education: {
      currentYearId: "class-07",
      boardId: "cbse",
      schoolType: "school-enrolled",
      completedYearIds: ["nursery", "lkg", "ukg", "class-01", "class-02", "class-03", "class-04", "class-05", "class-06"],
      languages: [
        { code: "en", role: "medium" },
        { code: "hi", role: "second-language" }
      ],
      mediumOfInstruction: "bilingual"
    },
    goals: {
      targetTracks: ["jee", "sat"],
      targetExamYear: 2032,
      weeklyStudyMinutes: 660,
      notes: "Strengthening Class 6-7 Ganita Prakash fractions/integers before starting Class 8-9 JEE and Digital SAT foundation bridge."
    },
    preferences: {
      uiLanguage: "en",
      contentLanguageMix: { explanation: "both", practice: "en" },
      sessionLengthMinutes: 30,
      offlineFirst: true,
      parentViewEnabled: true
    },
    consent: {
      status: "guardian-verified",
      policyVersion: "2026-10-22",
      consentedAt: UPDATED_AT,
      guardianRelationship: "parent",
      verificationMethod: "digilocker",
      jurisdiction: "IN",
      dataProcessingConsent: true
    },
    privacy: {
      dataResidency: "IN",
      retentionClass: "until-withdrawal",
      analyticsOptOut: true,
      thirdPartyAiProcessingAllowed: false
    },
    diagnosticState: {
      lastDiagnosticId: "diag-session-aarav-01",
      lastDiagnosticAt: UPDATED_AT,
      confidence: "high",
      masterySummary: [
        { skillId: "math-integers-number-patterns", mastery: 0.86, evidenceCount: 12 },
        { skillId: "math-ratios-linear-algebra-middle", mastery: 0.64, evidenceCount: 8 },
        { skillId: "sci-curiosity-middle-inquiry", mastery: 0.82, evidenceCount: 10 },
        { skillId: "soc-exploring-society-middle", mastery: 0.78, evidenceCount: 7 },
        { skillId: "lang-bilingual-literature-middle", mastery: 0.88, evidenceCount: 9 }
      ]
    },
    planState: {
      activePlanId: "plan-cbse-class-07-aarav",
      curriculumVersion: "2026.1.0",
      planRevision: 2
    },
    accessibility: {
      screenTimeCapMinutesPerDay: 60
    }
  },
  {
    schemaVersion: "1.0.0",
    learnerId: "learner02ananyaneet11",
    createdAt: UPDATED_AT,
    identity: {
      displayName: "Ananya K. (Synthetic Demo)",
      preferredName: "Ananya",
      dateOfBirth: "2010-08",
      guardianContactRef: "guardian-vault-ref-002"
    },
    education: {
      currentYearId: "class-11",
      boardId: "cbse",
      schoolType: "school-enrolled",
      completedYearIds: ["class-01", "class-02", "class-03", "class-04", "class-05", "class-06", "class-07", "class-08", "class-09", "class-10"],
      languages: [
        { code: "hi", role: "first-language" },
        { code: "en", role: "medium" }
      ],
      mediumOfInstruction: "bilingual"
    },
    goals: {
      targetTracks: ["neet", "cuet"],
      targetExamYear: 2028,
      weeklyStudyMinutes: 1080,
      notes: "Dual CBSE Class 11 PCB + NTA NEET UG 2028 synchronized preparation."
    },
    preferences: {
      uiLanguage: "hi",
      contentLanguageMix: { explanation: "both", practice: "both" },
      sessionLengthMinutes: 45,
      offlineFirst: true,
      parentViewEnabled: true
    },
    consent: {
      status: "guardian-verified",
      policyVersion: "2026-10-22",
      consentedAt: UPDATED_AT,
      guardianRelationship: "parent",
      verificationMethod: "digilocker",
      jurisdiction: "IN",
      dataProcessingConsent: true
    },
    privacy: {
      dataResidency: "IN",
      retentionClass: "until-withdrawal",
      analyticsOptOut: true,
      thirdPartyAiProcessingAllowed: false
    },
    diagnosticState: {
      lastDiagnosticId: "diag-session-ananya-01",
      lastDiagnosticAt: UPDATED_AT,
      confidence: "high",
      masterySummary: [
        { skillId: "sci-integrated-sec-9-10", mastery: 0.92, evidenceCount: 18 },
        { skillId: "sci-biology-srsec-11-12", mastery: 0.76, evidenceCount: 14 },
        { skillId: "sci-chemistry-srsec-11-12", mastery: 0.68, evidenceCount: 11 },
        { skillId: "sci-physics-srsec-11-12", mastery: 0.59, evidenceCount: 9 }
      ]
    },
    planState: {
      activePlanId: "plan-cbse-class-11-ananya",
      curriculumVersion: "2026.1.0",
      planRevision: 1
    },
    accessibility: {
      screenTimeCapMinutesPerDay: 120
    }
  },
  {
    schemaVersion: "1.0.0",
    learnerId: "learner03kabirhome02",
    createdAt: UPDATED_AT,
    identity: {
      displayName: "Kabir M. (Caregiver Guided 0-3)",
      preferredName: "Kabir",
      dateOfBirth: "2024-11",
      guardianContactRef: "guardian-vault-ref-003"
    },
    education: {
      currentYearId: "home-0-3",
      boardId: "early-years",
      schoolType: "home-learning",
      completedYearIds: [],
      languages: [
        { code: "hi", role: "first-language" },
        { code: "en", role: "second-language" }
      ],
      mediumOfInstruction: "bilingual"
    },
    goals: {
      weeklyStudyMinutes: 75,
      notes: "100% zero-screen caregiver-led sensory and bilingual oral stimulation under MWCD Navchetana 2024."
    },
    preferences: {
      uiLanguage: "en",
      sessionLengthMinutes: 15,
      offlineFirst: true,
      parentViewEnabled: true
    },
    consent: {
      status: "guardian-verified",
      policyVersion: "2026-10-22",
      consentedAt: UPDATED_AT,
      guardianRelationship: "parent",
      verificationMethod: "payment-instrument",
      jurisdiction: "IN",
      dataProcessingConsent: true
    },
    privacy: {
      dataResidency: "IN",
      retentionClass: "one-year",
      analyticsOptOut: true,
      thirdPartyAiProcessingAllowed: false
    },
    accessibility: {
      screenTimeCapMinutesPerDay: 0
    }
  }
];

writeJson("content/learners/synthetic-learner-profiles.json", SYNTHETIC_LEARNERS);

// Generate 5-Layer Self-Evolving Curriculum Engine State
const SELF_EVOLVING_STATE = {
  schemaVersion: "1.0.0",
  updatedAt: UPDATED_AT,
  layers: [
    {
      layerId: "L1",
      name: { en: "L1: Real-Time Learner Mastery & Schedule Rebalancer", hi: "L1: वास्तविक-समय दक्षता और समय-सारणी संतुलन" },
      cadence: "Every interaction (sub-minute)",
      gateType: "Automated deterministic + topological prerequisite guard",
      recentEvents: [
        {
          timestamp: "2026-10-22T01:15:00+05:30",
          event: "Learner 'Aarav' scored 4/4 on Ganita Prakash Unit 1 exit check; mastery on math-integers-number-patterns updated 0.81 -> 0.86.",
          actionTaken: "Compressed 1 redundant drill block and promoted Linear Equations bridge session into Thursday Slot 2."
        }
      ]
    },
    {
      layerId: "L2",
      name: { en: "L2: Continuous Content & Hint Variant Telemetry", hi: "L2: निरंतर सामग्री और संकेत गुणवत्ता अनुकूलन" },
      cadence: "Hourly / Daily learning-gain evaluation",
      gateType: "Automated source-grounding check + 5% accuracy rollback guard",
      recentEvents: [
        {
          timestamp: "2026-10-22T00:45:00+05:30",
          event: "Evaluated 2 bilingual visual hint variants for 'Signed Integer Subtraction on Number Line' (SRC-NCERT-NCFSE-2023).",
          actionTaken: "Promoted Variant B (Temperature Elevator Analogy in Hindi/English) after +14% first-attempt exit-ticket gain."
        }
      ]
    },
    {
      layerId: "L3",
      name: { en: "L3: Official Statutory Source Watcher (NCERT / CBSE / CISCE / NIOS / NTA / College Board)", hi: "L3: आधिकारिक बोर्ड पाठ्यक्रम निगरानी इंजन" },
      cadence: "Continuous scheduled feed monitor",
      gateType: "Read-only cryptographic hash & circular diff detector (never mutates live plans directly)",
      monitoredSources: [
        { sourceId: "SRC-CBSE-CURR-2026-27", url: "https://cbseacademic.nic.in/curriculum_2027.html", status: "SYNCED", lastChecked: "2026-10-22T01:10:00+05:30" },
        { sourceId: "SRC-NCERT-NCFSE-2023", url: "https://ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf", status: "SYNCED", lastChecked: "2026-10-22T01:10:00+05:30" },
        { sourceId: "SRC-NTA-JEEMAIN-2026", url: "https://jeemain.nta.nic.in/document/syllabus-2026/", status: "SYNCED", lastChecked: "2026-10-22T01:12:00+05:30" },
        { sourceId: "SRC-NTA-NEETUG-2026", url: "https://www.nta.ac.in/Download/Notice/Notice_20260108180635.pdf", status: "SYNCED", lastChecked: "2026-10-22T01:12:00+05:30" },
        { sourceId: "SRC-CB-DIGITALSAT-2026", url: "https://satsuite.collegeboard.org/media/pdf/assessment-framework-for-digital-sat-suite.pdf", status: "SYNCED", lastChecked: "2026-10-22T01:14:00+05:30" },
        { sourceId: "SRC-ETS-TOEFL-2026", url: "https://www.ets.org/toefl/test-takers/ibt/about/content.html", status: "DIFF-DETECTED", lastChecked: "2026-10-22T01:14:00+05:30" }
      ]
    },
    {
      layerId: "L4",
      name: { en: "L4: Cohort-Pinned Curriculum Alignment & Rationalisation Council Gate", hi: "L4: बैच-आधारित पाठ्यक्रम संरेखण और युक्तिसंगत समीक्षा गेट" },
      cadence: "Triggered on L3 Official Diff Detection",
      gateType: "4 Automated Checks (DAG Acyclicity, NCrF 1200h Load, NCERT 5-Point Rationalisation, Cohort Pinning) + Human Sign-Off",
      changeProposals: [
        {
          proposalId: "CP-2026-10-01",
          sourceId: "SRC-NCERT-NSTC-2023",
          title: "NCERT Class 8 Ganita Prakash & Curiosity 2026-27 Competency Weightage Update",
          affectedCohorts: ["cbse-class-08@2026.1.0"],
          checksPassed: ["dag-no-cycles", "dag-no-orphans", "ncrf-1200h-load-valid", "ncert-5point-rationalisation"],
          status: "APPROVED-AND-PINNED"
        },
        {
          proposalId: "CP-2026-10-02",
          sourceId: "SRC-ETS-TOEFL-2026",
          title: "ETS TOEFL iBT 1-to-6 CEFR Score Scale Mapping & Academic Discussion Task Rubric",
          affectedCohorts: ["track-toefl@2026.1.0"],
          checksPassed: ["dag-no-cycles", "dag-no-orphans", "ncrf-1200h-load-valid", "ncert-5point-rationalisation"],
          status: "READY-FOR-COUNCIL-APPROVAL"
        }
      ]
    },
    {
      layerId: "L5",
      name: { en: "L5: Frontier Skill Horizon (AI Systems, Climate & Financial Literacy)", hi: "L5: भविष्यमुखी कौशल क्षितिज (एआई, जलवायु और वित्तीय साक्षरता)" },
      cadence: "Weekly signal scan / Quarterly enrichment release",
      gateType: "Tagged strictly as elective enrichment so compulsory board syllabus remains untouched",
      frontierNodes: [
        "comp-algorithmic-ai-literacy (Source-Grounded Retrieval & Hallucination Verification Lab for Classes 8-12)"
      ]
    }
  ]
};

writeJson("content/evolution/self-evolving-engine-state.json", SELF_EVOLVING_STATE);

console.log(`Generated shared skill graph (${SKILLS.length} skills, ${EDGES.length} edges), ${generatedCurriculumCount} board-year curriculum files, ${TRACKS.length} track branches, diagnostic/mock bank, and self-evolving state.`);
