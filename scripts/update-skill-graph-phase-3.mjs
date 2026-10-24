// Updates shared-skill-graph.json with all Phase 3 CBSE Middle Stage micro-skills and prerequisite edges.
// Constraint: zero em dashes (use hyphens).

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const graphPath = path.join(root, "content/skill-graph/shared-skill-graph.json");
const graph = JSON.parse(fs.readFileSync(graphPath, "utf8"));

// trackBranches entries use the object shape required by
// schemas/content-skill-graph.schema.json and the track ids in content/tracks/.
const JEE_FOUNDATION = { trackId: "jee", role: "foundation", officialExamRef: "JEE Main" };
const NEET_FOUNDATION = { trackId: "neet", role: "foundation", officialExamRef: "NEET UG" };

const allPhase3Skills = [
  // Class 5 foundational bridges
  {
    id: "math-foundational-number-sense-c05",
    name: { en: "Foundational Whole Number Sense & Operations", hi: "आधारभूत पूर्ण संख्या बोध और संक्रियाएं" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-05", toYearId: "class-05" },
    description: "Multi-digit arithmetic, place value, and operational fluency from Class 5.",
    prerequisites: [],
    successCriteria: ["Performs 4-digit operations accurately"],
    evidenceTypes: ["diagnostic"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-05", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [],
    status: "active"
  },
  {
    id: "math-shapes-spatial-understanding-c05",
    name: { en: "2D and 3D Shapes & Spatial Visualization", hi: "द्विविमीय व त्रिविमीय आकृतियां और स्थानिक दृश्यीकरण" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-05", toYearId: "class-05" },
    description: "Foundational geometric shapes, angles, and symmetry from Class 5.",
    prerequisites: [],
    successCriteria: ["Identifies acute and obtuse angles visually"],
    evidenceTypes: ["diagnostic"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-05", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [],
    status: "active"
  },
  {
    id: "sci-evs-observation-c05",
    name: { en: "Environmental Observation & Ecosystem Basics", hi: "पर्यावरणीय अवलोकन और पारितंत्र आधार" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-05", toYearId: "class-05" },
    description: "Foundational EVS habitat, plant, and animal observation from Class 5.",
    prerequisites: [],
    successCriteria: ["Documents living versus non-living environmental features"],
    evidenceTypes: ["diagnostic"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-05", subject: "Environmental Studies", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [],
    status: "active"
  },

  // Class 6 Math Skills
  {
    id: "math-patterns-sequences-c06",
    name: { en: "Patterns, Figurate Numbers and Inductive Algebra", hi: "पैटर्न, आकृतिक संख्याएं और आगमनात्मक बीजगणित" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Figurate numbers, Virahanka/Fibonacci sequences, and inductive generalization.",
    prerequisites: ["math-foundational-number-sense-c05"],
    successCriteria: ["Identifies nth term in figurate number sequences"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "math-geometry-lines-angles-c06",
    name: { en: "Lines, Angles, and Geometric Spatial Reasoning", hi: "रेखाएं, कोण और ज्यामितीय स्थानिक तर्क" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Classifies acute, obtuse, linear pair, and vertically opposite angles with compass constructions.",
    prerequisites: ["math-shapes-spatial-understanding-c05"],
    successCriteria: ["Solves complementary and supplementary angle relationships"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "math-number-theory-play-c06",
    name: { en: "Divisibility Rules & Cryptarithms Number Play", hi: "विभाज्यता नियम और गुप्त अंक पहेलियां" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Systematic divisibility tests (2,3,4,5,6,8,9,11), cryptarithms, and digit sum analysis.",
    prerequisites: ["math-patterns-sequences-c06"],
    successCriteria: ["Applies divisibility tests and solves cryptarithms"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "math-data-handling-c06",
    name: { en: "Data Handling, Tally Distributions & Bar Graphs", hi: "आंकड़ा प्रबंधन, मिलान चिह्न और दंड आलेख" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Tally frequency tables, scale factors, and bar graph interpretations.",
    prerequisites: ["math-patterns-sequences-c06"],
    successCriteria: ["Constructs and reads bar graphs with appropriate scales"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [],
    status: "active"
  },
  {
    id: "math-primes-factors-c06",
    name: { en: "Prime Factorisation, HCF and LCM Applications", hi: "अभाज्य गुणनखंडन, म.स. और ल.स. अनुप्रयोग" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Sieve of Eratosthenes, prime trees, HCF, LCM, and co-prime analysis.",
    prerequisites: ["math-number-theory-play-c06"],
    successCriteria: ["Calculates HCF and LCM for real-world synchronisation problems"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "math-perimeter-area-c06",
    name: { en: "Perimeter and Area of Polygons", hi: "बहुभुजों का परिमाप और क्षेत्रफल" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Linear boundary versus 2D surface covering formulas for rectangles and squares.",
    prerequisites: ["math-geometry-lines-angles-c06"],
    successCriteria: ["Computes area and perimeter in floor plan and fencing problems"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "math-fractions-c06",
    name: { en: "Fraction Operations and Part-Whole Relations", hi: "भिन्न संक्रियाएं और भाग-पूर्ण संबंध" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Proper, improper, mixed fractions, equivalence, and addition/subtraction using LCM.",
    prerequisites: ["math-primes-factors-c06"],
    successCriteria: ["Performs unlike fraction arithmetic accurately"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "math-geometric-constructions-c06",
    name: { en: "Ruler and Compass Geometric Constructions", hi: "रूलर और परकार से ज्यामितीय रचनाएं" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Perpendicular bisectors, angle bisectors, and exact 60, 90, 120 degree angles.",
    prerequisites: ["math-geometry-lines-angles-c06"],
    successCriteria: ["Executes classical compass constructions without protractor"],
    evidenceTypes: ["practical", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "math-symmetry-c06",
    name: { en: "Line Symmetry, Reflection & Cultural Rangoli Patterns", hi: "रैखिक सममिति, परावर्तन और रंगोली पैटर्न" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Lines of symmetry in regular polygons, mirror reflection, and cultural tessellations.",
    prerequisites: ["math-geometry-lines-angles-c06"],
    successCriteria: ["Identifies multiple axes of symmetry in 2D shapes"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [],
    status: "active"
  },

  // Class 6 Science Skills
  {
    id: "sci-scientific-inquiry-c06",
    name: { en: "Scientific Inquiry and Controlled Experimentation", hi: "वैज्ञानिक अन्वेषण और नियंत्रित प्रयोग" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Observation, hypothesis formulation, variable control, and precision measurement.",
    prerequisites: ["sci-evs-observation-c05"],
    successCriteria: ["Distinguishes independent, dependent, and controlled variables"],
    evidenceTypes: ["practical", "diagnostic"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [NEET_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-biodiversity-classification-c06",
    name: { en: "Biodiversity, Venation and Habitat Adaptation", hi: "जैव विविधता, शिरा-विन्यास और आवास अनुकूलन" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Leaf venation, root morphology, and comparative habitat adaptations.",
    prerequisites: ["sci-scientific-inquiry-c06"],
    successCriteria: ["Correlates leaf venation with root system type"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [NEET_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-nutrition-health-c06",
    name: { en: "Macronutrients, Food Indicators & Deficiency Disorders", hi: "पोषक तत्व, खाद्य परीक्षण और हीनताजन्य रोग" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Iodine starch test, Biuret protein test, dietary balanced plate, and deficiency diseases.",
    prerequisites: ["sci-scientific-inquiry-c06"],
    successCriteria: ["Identifies chemical indicator reactions and deficiency causes"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [NEET_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-magnetism-c06",
    name: { en: "Magnetism, Field Poles & Navigational Compass", hi: "चुंबकत्व, चुंबकीय ध्रुव और दिक्सूचक" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Magnetic materials, pole concentration, repulsion test, and geomagnetic navigation.",
    prerequisites: ["sci-scientific-inquiry-c06"],
    successCriteria: ["Applies laws of magnetic attraction and repulsion"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION, NEET_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-measurement-motion-c06",
    name: { en: "Standard Units, Motion Types & Parallax Precision", hi: "मानक मात्रक, गति के प्रकार और दृष्टि-दोष निवारण" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "SI units, scale readings, and classification of rectilinear, circular, periodic motions.",
    prerequisites: ["sci-scientific-inquiry-c06"],
    successCriteria: ["Calculates correct length avoiding broken zero and classifies motions"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION, NEET_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-materials-properties-c06",
    name: { en: "Materials Classification, Density & Transparency", hi: "पदार्थों का वर्गीकरण, घनत्व और पारदर्शिता" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Luster, thermal insulation, floating/sinking density, transparent/translucent/opaque.",
    prerequisites: ["sci-scientific-inquiry-c06"],
    successCriteria: ["Selects appropriate materials based on physical properties"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION, NEET_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-temperature-measurement-c06",
    name: { en: "Temperature Scales, Clinical & Laboratory Thermometers", hi: "तापमान पैमाने, डॉक्टरी और प्रयोगशाला थर्मामीटर" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Celsius, Fahrenheit conversion, thermometer kink function, and thermal equilibrium.",
    prerequisites: ["sci-measurement-motion-c06"],
    successCriteria: ["Reads thermometers accurately and converts scales"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION, NEET_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-water-cycle-c06",
    name: { en: "States of Water, Hydrological Cycle & Conservation", hi: "जल की अवस्थाएं, जल चक्र और संरक्षण" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Phase transitions, condensation, transpiration, rainwater harvesting.",
    prerequisites: ["sci-materials-properties-c06"],
    successCriteria: ["Explains atmospheric condensation and water conservation methods"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [],
    status: "active"
  },
  {
    id: "sci-separation-methods-c06",
    name: { en: "Physical Separation Techniques: Filtration to Distillation", hi: "भौतिक पृथक्करण विधियां: निस्पंदन से आसवन तक" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Winnowing, sedimentation, decantation, filtration, evaporation, distillation.",
    prerequisites: ["sci-materials-properties-c06"],
    successCriteria: ["Designs multi-step separation pipelines for complex mixtures"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION, NEET_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-living-characteristics-c06",
    name: { en: "Characteristics of Living Organisms & Biological Tropisms", hi: "सजीवों के लक्षण और जैविक अनुवर्तन" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Cellular organization, stimulus response, cellular respiration versus breathing.",
    prerequisites: ["sci-biodiversity-classification-c06"],
    successCriteria: ["Differentiates breathing from cellular energy release"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [NEET_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-natural-resources-conservation-c06",
    name: { en: "Renewable Resources, Vermicomposting & 5R Waste Hierarchy", hi: "नवीकरणीय संसाधन, वर्मीकंपोस्टिंग और 5R कचरा प्रबंधन" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Red worm bio-waste processing, 5R hierarchy, and sacred grove conservation.",
    prerequisites: ["sci-water-cycle-c06"],
    successCriteria: ["Applies 5R principles to institutional waste management"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [],
    status: "active"
  },
  {
    id: "sci-astronomy-space-c06",
    name: { en: "Solar System, Earth Axial Tilt & ISRO Lunar Missions", hi: "सौरमंडल, पृथ्वी का अक्षीय झुकाव और इसरो चंद्र मिशन" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-06", toYearId: "class-06" },
    description: "Day-night rotation, 23.5 degree axial tilt seasons, Chandrayaan and Aditya-L1.",
    prerequisites: ["sci-measurement-motion-c06"],
    successCriteria: ["Explains season causes and details ISRO lunar accomplishments"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-06", subject: "Integrated Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [],
    status: "active"
  },

  // Class 7 Skills
  {
    id: "math-integers-operations-c07",
    name: { en: "Advanced Signed Integer Arithmetic & Properties", hi: "उन्नत चिन्हित पूर्णांक अंकगणित और गुणधर्म" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-07", toYearId: "class-07" },
    description: "Applies closure, commutativity, associativity, and distributivity across signed integer multiplication and division.",
    prerequisites: ["math-integers-number-patterns"],
    successCriteria: ["Applies distributive property to simplify large products", "Solves real-world elevation, temperature, and financial word problems"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-07", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "math-fractions-decimals-c07",
    name: { en: "Fraction Division & Decimal Operations", hi: "भिन्न भाग और दशमलव संक्रियाएं" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-07", toYearId: "class-07" },
    description: "Reciprocal fractions, decimal division, and word problems.",
    prerequisites: ["math-fractions-c06"],
    successCriteria: ["Solves division of fractions by multiplying by reciprocal"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-07", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "math-simple-equations-c07",
    name: { en: "Linear Equations in One Variable Transposition", hi: "एक चर वाले रैखिक समीकरण और पक्षांतरण" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-07", toYearId: "class-07" },
    description: "Setting up algebraic equations from conditions and solving via transposition.",
    prerequisites: ["math-integers-operations-c07"],
    successCriteria: ["Solves linear equations in one variable"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-07", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-plant-nutrition-c07",
    name: { en: "Autotrophic Photosynthesis & Parasitic Modes", hi: "स्वपोषी प्रकाश संश्लेषण और परजीवी पोषण" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-07", toYearId: "class-07" },
    description: "Photosynthesis chemical equation, stomatal regulation, Cuscuta parasitism, insectivorous adaptations.",
    prerequisites: ["sci-nutrition-health-c06"],
    successCriteria: ["Formulates balanced photosynthesis equation"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-07", subject: "Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [NEET_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-heat-transfer-c07",
    name: { en: "Conduction, Convection Currents & Radiant Energy", hi: "चालन, संवहन धाराएं और विकिरण ऊर्जा" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-07", toYearId: "class-07" },
    description: "Conduction in metals, coastal land/sea breeze convection, and radiation in vacuum.",
    prerequisites: ["sci-temperature-measurement-c06"],
    successCriteria: ["Explains sea breeze and thermos flask thermal insulation"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-07", subject: "Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION, NEET_FOUNDATION],
    status: "active"
  },

  // Class 8 Skills
  {
    id: "math-rational-numbers-c08",
    name: { en: "Rational Number Arithmetic & Density Property", hi: "परिमेय संख्या अंकगणित और सघनता गुणधर्म" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-08", toYearId: "class-08" },
    description: "Rigorous rational operations, multiplicative inverse, and proof of infinite density on the real line.",
    prerequisites: ["math-integers-operations-c07"],
    successCriteria: ["Computes rational arithmetic with sign consistency", "Inserts rational numbers between any two given endpoints using mean method"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-08", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "math-linear-equations-c08",
    name: { en: "Multi-Step Linear Equations & Rate Problems", hi: "बहु-चरणीय रैखिक समीकरण और दर समस्याएं" },
    domainId: "mathematical-thinking-quant",
    stage: { fromYearId: "class-08", toYearId: "class-08" },
    description: "Variables on both sides, rational denominators, cross-multiplication, and digit-reversal word problems.",
    prerequisites: ["math-simple-equations-c07"],
    successCriteria: ["Solves two-digit number problems algebraically"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-08", subject: "Mathematics", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-agriculture-crop-production-c08",
    name: { en: "Agronomy, Kharif/Rabi Crops & Drip Irrigation", hi: "कृषि विज्ञान, खरीफ/रबी फसलें और ड्रिप सिंचाई" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-08", toYearId: "class-08" },
    description: "Crop cycles, biological nitrogen fixation, modern drip vs sprinkler irrigation.",
    prerequisites: ["sci-plant-nutrition-c07"],
    successCriteria: ["Compares fertilizer degradation with organic manure"],
    evidenceTypes: ["diagnostic", "assignment"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-08", subject: "Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [NEET_FOUNDATION],
    status: "active"
  },
  {
    id: "sci-force-pressure-c08",
    name: { en: "Force Vectors, Pascal Pressure & Hydraulic Principles", hi: "बल सदिश, पास्कल दाब और द्रवस्थैतिक नियम" },
    domainId: "scientific-inquiry-empirical",
    stage: { fromYearId: "class-08", toYearId: "class-08" },
    description: "Contact and non-contact forces, P = F/A formulas, depth-dependent liquid pressure.",
    prerequisites: ["sci-measurement-motion-c06"],
    successCriteria: ["Calculates pressure from force and contact area"],
    evidenceTypes: ["diagnostic", "practical"],
    boardAlignments: [{ boardId: "cbse", yearId: "class-08", subject: "Science", sourceId: "SRC-NCERT-NCFSE-2023", alignmentStrength: "direct" }],
    trackBranches: [JEE_FOUNDATION, NEET_FOUNDATION],
    status: "active"
  }
];

const existingIds = new Set(graph.skills.map((s) => s.id));
for (const s of allPhase3Skills) {
  if (!existingIds.has(s.id)) {
    graph.skills.push(s);
  } else {
    const idx = graph.skills.findIndex((ex) => ex.id === s.id);
    graph.skills[idx] = s;
  }
}

// Add edges for all prerequisites
for (const s of allPhase3Skills) {
  for (const pid of s.prerequisites) {
    const exists = graph.edges.some((e) => e.from === pid && e.to === s.id);
    if (!exists) {
      graph.edges.push({ from: pid, to: s.id, type: "prerequisite", strength: "required" });
    }
  }
}

graph.updatedAt = "2026-10-22";
fs.writeFileSync(graphPath, JSON.stringify(graph, null, 2), "utf8");
console.log("Registered all Phase 3 Middle Stage micro-skills! Total skills:", graph.skills.length, "Total edges:", graph.edges.length);
