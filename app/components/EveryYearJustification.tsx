"use client";

import React from "react";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./useLanguage";

// Canonical answers live in docs/00-venture-strategy-and-naming.md (Section 2).
// scripts/check-venture-thesis-consistency.mjs keeps the key figures in this file in sync with it.

const PANEL: React.CSSProperties = {
  background: "var(--surface-elevated)",
  padding: "1.25rem",
  borderRadius: "12px",
  border: "1px solid var(--border)"
};
const BODY: React.CSSProperties = { color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65 };
const LEAD: React.CSSProperties = { color: "var(--text-muted)", fontSize: "0.94rem", lineHeight: 1.6 };
const CELL: React.CSSProperties = { padding: "0.75rem 0.9rem", verticalAlign: "top" };
const ROW: React.CSSProperties = { borderBottom: "1px solid var(--border)" };
const HEAD_ROW: React.CSSProperties = {
  background: "var(--surface-elevated)",
  color: "var(--text)",
  borderBottom: "2px solid var(--border)"
};
const TABLE: React.CSSProperties = { width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" };
const STRONG_CELL: React.CSSProperties = { ...CELL, color: "var(--text)", fontWeight: 700 };

type Status = "built" | "designed" | "hypothesis";
const STATUS_BADGE: Record<Status, string> = {
  built: "badge badge-green",
  designed: "badge badge-warn",
  hypothesis: "badge badge-blue"
};

const SOURCES = {
  udise: "https://dashboard.udiseplus.gov.in/report2026/static/media/UDISE+2024_25_Booklet_existing.118ba29d4773e6372f72.pdf",
  cbse10: "https://school.careers360.com/boards/cbse/how-many-students-appeared-in-cbse-10th-exam-2025",
  cmse: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2160863",
  dpdpAct: "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf",
  dpdpRules: "https://www.meity.gov.in/data-protection-framework"
};

function Src({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

const COPY = {
  en: {
    badges: ["Venture Thesis", "Prototype stage", "Revised 2026-10-23"],
    title: "Venture Justification: Six Core Questions",
    subtitle:
      "Who uses it, what they use today, how many face the problem, why we can be better, whether they will pay, and what is genuinely unsolved. Every figure is sourced, and every claim is labelled Built, Designed or Hypothesis.",
    back: "← Return to School Workspace",
    kpis: [
      ["~20 lakh", "Wedge: CBSE Class 6-8 families already paying for help"],
      ["27.0%", "Students taking private coaching (NSS 2025)"],
      ["INR 3,988", "Urban coaching spend per student per year"],
      ["INR 199 / 499", "Monthly price points to test in pilot"]
    ],
    nav: ["Reality Check", "Q1: Who Will Use", "Q2: Current Alternatives", "Q3: How Many", "Q4: Why Better", "Q5: Will He Pay", "Q6: Unsolved Problem", "Risks & Next Steps", "Venture Brands"],
    question: "Question",
    status: { built: "Built", designed: "Designed", hypothesis: "Hypothesis" },
    reality: {
      badge: "Read First",
      title: "Reality Check: What Exists Today",
      lead: "This is a clickable prototype plus a data architecture, not a working product yet. The answers below depend on that, so here is the status of each capability.",
      heads: ["Capability", "Status", "Evidence"],
      rows: [
        ["Curriculum skeletons for CBSE, CISCE, NIOS, State Boards and Early Years", "built", "Mostly one shared template per stage. Only CBSE Classes 6 to 8 have chapter-level depth."],
        ["Shared prerequisite skill graph", "built", "59 skills and 62 edges: enough for CBSE 6 to 8 demos, too coarse for chapter-level diagnosis elsewhere."],
        ["Diagnostic and mock bank", "built", "9 diagnostic items and 6 mock blueprints (demo size)."],
        ["AI tutor, adaptive rebalancer, self-evolving engine", "designed", "No LLM calls or backend logic yet. Engine events shown in the app are illustrative demo data."],
        ["Accounts, saved progress, guardian consent, payments", "designed", "All app state lives in the browser and resets on reload."],
        ["Parents pay INR 199 or 499 per month for diagnosis plus weekly plan", "hypothesis", "No users or pricing test yet. Needs a 20 to 50 family pilot."]
      ] as [string, Status, string][]
    },
    q1: {
      title: "Who will use this product?",
      answer: "The buyer is the parent; the user is the child. Start with one segment that matches what is actually built.",
      cards: [
        ["Primary wedge", "Parents of CBSE Class 6-8 students", "Urban and semi-urban families who already pay for tuition, whose children study in English or Hindi, and who worry about hidden gaps before the Class 9 and 10 board years. CBSE Classes 6 to 8 are the only grades deepened to chapter level in this repository."],
        ["Secondary", "NIOS and homeschooling families", "A small group with acute pain: nobody gives them a structured year. Certification routes through NIOS Open Basic Education, Secondary and Senior Secondary."],
        ["Deferred", "Not in the first product", "JEE, NEET, CUET, UPSC, SAT, ACT, IELTS, TOEFL and ages 0 to 3. Each is a separate business with strong incumbents. Their track files stay in the repository as architecture, not launch scope."]
      ]
    },
    q2: {
      title: "What does he use currently?",
      answer: "The real competitor is the neighbourhood tuition teacher, and free AI chatbots are the fastest-growing threat.",
      heads: ["Current alternative", "What it does well", "What it misses"],
      rows: [
        ["Neighbourhood tuition teacher", "Plans the week, holds the child accountable, clears doubts, reports to parents on WhatsApp.", "Diagnosis is by instinct; quality varies; rarely traces gaps back to earlier grades."],
        ["School and textbooks (NCERT, CBSE, CISCE, State Boards)", "Structure, peers, certification.", "Moves by calendar date, not by each child's mastery."],
        ["Video apps and YouTube (PW, Vedantu, Byju's, Khan Academy, DIKSHA)", "Unlimited content, often free or cheap.", "No individual plan; passive watching."],
        ["General AI chatbots (ChatGPT, Gemini, Claude)", "Free, instant explanations, now with learning modes.", "Do not know the child's board version or textbook; keep no long-term mastery record."]
      ]
    },
    q3: {
      title: "How many users face this problem?",
      answer: "About 20 lakh CBSE Class 6-8 families already pay for help. That is the realistic first market, not the 24.69 crore headline.",
      heads: ["Step", "Figure", "Source and confidence"],
      rows: [
        ["All school students (pre-primary to Class 12)", "24.69 crore in 14.71 lakh schools"],
        ["CBSE Class 10 registrations, 2025", "about 23.85 lakh"],
        ["CBSE Classes 6 to 8 (three cohorts)", "about 70 lakh"],
        ["Students taking private coaching", "27.0% nationally, 30.7% urban"],
        ["Wedge: CBSE Class 6-8 families already paying for help", "about 20 lakh"]
      ],
      udise: "UDISE+ 2024-25",
      primary: "primary",
      secondary: "secondary",
      cbsePrefix: "CBSE figures ",
      asReported: "as reported",
      cohortEstimate: "Estimate: each cohort similar in size to Class 10",
      cmse: "NSS CMS: Education 2025 (PIB, 26 Aug 2025)",
      wedgeEstimate: "Estimate: 70 lakh x about 30%"
    },
    q4: {
      title: "Why will your product be better?",
      answer: "Honestly, it is not better yet: the advantages below are Designed, not Built. If built, this is the edge over each alternative.",
      cards: [
        ["designed", "1. Cross-grade diagnosis tied to this term's textbook", "\"Your child's Ganita Prakash trouble is a Class 5 fractions gap.\" Tutors do this by instinct; apps and chatbots do not do it at all."],
        ["designed", "2. A small weekly plan around school homework", "Must-do board content moves first when days are missed, inside a daily time budget. Not a video library."],
        ["designed", "3. A parent report that shows whether it works", "Weekly, at skill level, readable by a parent who is not a teacher."],
        ["hypothesis", "4. Price below tuition", "INR 199 or INR 499 per month, the two price points to test in a pilot (see Question 5)."]
      ] as [Status, string, string][],
      footer:
        "Chatbots lack points 1 to 3 because they do not know the board version or textbook and keep no longitudinal mastery record. The board-version pinning and source tracing already in this repository support that edge."
    },
    q5: {
      title: "Will he pay?",
      answer: "Probably yes, for diagnosis plus accountability (not for \"a plan\"), and only at a price near what families spend today. Unproven until a pilot.",
      spendLabel: "What families spend now:",
      spendText:
        "average annual household spend on private coaching is INR 3,988 per student in urban areas and INR 1,793 in rural areas, rising to INR 6,384 nationally at higher secondary",
      spendSource: "NSS CMS: Education 2025",
      spendTail: "These are averages; tuition-paying urban families spend more.",
      historyLabel: "What Indian edtech history shows:",
      historyText: "parents pay for an accountable human and visible results. High-priced, sales-led packages failed at scale; low-priced offers grew.",
      implicationLabel: "Implication:",
      implicationText:
        "a self-serve app at INR 799 to 1,499 per month (INR 9,588 to 17,988 per year) is above what most families spend on coaching, and only wins if it fully replaces the tutor.",
      tiers: [
        ["Free", "INR 0", "Curriculum explorer and one cross-grade diagnostic report."],
        ["Core (two price points to test)", "INR 199 or 499 / month", "Diagnosis, weekly plan, weekly parent report."],
        ["Tutor and school channel (B2B2C)", "Per learner", "The same tools used by tuition teachers or small schools. Priced in the pilot."]
      ],
      footer: "Competitive and study-abroad tracks are not priced until the wedge is proven."
    },
    q6: {
      title: "What is the real problem not solved right now?",
      answer: "Content is now free and unlimited. What nobody provides cheaply is diagnosis plus follow-through.",
      list: [
        "Knowing exactly which earlier-grade skills this child is missing, mapped to the textbook they use this term.",
        "Turning that into 20 to 30 minutes a day the child will actually do, alongside school homework.",
        "Showing the parent whether it is working."
      ],
      strong: "The hardest part is follow-through, not information.",
      rest: "Getting a 12-year-old to open an app every day without a human pushing them is the unsolved problem, and the reason tuition teachers still win."
    },
    risks: {
      badge: "Risks",
      title: "Risks the Answers Depend On, and Next Steps",
      dpdpTitle: "Children's data (DPDP Act 2023, Section 9)",
      dpdp: [
        "Anyone under 18 is a child. The ",
        "Act",
        " requires verifiable parental consent and bars tracking and behavioural monitoring of children. Adaptive learning plus XP, streaks and leagues may count as monitoring, and the educational-institution exemption in the ",
        "DPDP Rules 2025",
        " may not cover a private app. Get a legal opinion before any pilot stores learner data."
      ],
      nextTitle: "Next steps",
      next: [
        "Build the real core for CBSE Class 6-8 Mathematics in English and Hindi: 300+ diagnostic items, saved progress with guardian consent, weekly parent report.",
        "Pilot with 20 to 50 parents at INR 199 and INR 499 per month before building anything else.",
        "Measure diagnostic completion, day-7 and day-28 activity, parent report opens, and paid conversion at each price."
      ]
    },
    brands: {
      title: "Recommended Venture Brand Names",
      lead: "Decision pending. The product currently appears as EveryYear (app config), EduAIon (venture config) and EduAI (repository). Pick one before any public launch.",
      items: [
        ["EveryYear", "States the promise directly: a plan for every year of school. Current default in the app."],
        ["EduAIon", "Working name in the venture config; .com, .ai, .in and .app were unregistered at the last check. Trademark search not yet done."],
        ["Vidyapath AI", "\"The path of knowledge\". Bilingual resonance for Hindi and English households."],
        ["AarohAI", "From Sanskrit Aarohan (progressive ascent): a metaphor for the step-by-step mastery graph."]
      ]
    },
    cta: "Explore the Prototype →",
    footnote: "Canonical source: docs/00-venture-strategy-and-naming.md · Figures from UDISE+ 2024-25, NSS CMS: Education 2025, CBSE 2025"
  },
  hi: {
    badges: ["वेंचर थीसिस", "प्रोटोटाइप चरण", "संशोधित 2026-10-23"],
    title: "वेंचर का औचित्य: छह मूल प्रश्न",
    subtitle:
      "इसका उपयोग कौन करेगा, वे आज क्या उपयोग करते हैं, कितने लोग इस समस्या का सामना करते हैं, हम बेहतर क्यों हो सकते हैं, क्या वे भुगतान करेंगे, और असल में क्या अनसुलझा है। हर आँकड़े का स्रोत दिया गया है, और हर दावे को बना हुआ, डिजाइन किया गया या परिकल्पना के रूप में चिह्नित किया गया है।",
    back: "← स्कूल वर्कस्पेस पर लौटें",
    kpis: [
      ["~20 लाख", "शुरुआती बाजार: सीबीएसई कक्षा 6-8 के वे परिवार जो पहले से अतिरिक्त पढ़ाई पर खर्च करते हैं"],
      ["27.0%", "निजी कोचिंग लेने वाले छात्र (NSS 2025)"],
      ["₹3,988", "शहरी क्षेत्र में प्रति छात्र वार्षिक कोचिंग खर्च"],
      ["₹199 / ₹499", "पायलट में परखने के लिए मासिक कीमतें"]
    ],
    nav: ["वास्तविकता जाँच", "प्र1: कौन उपयोग करेगा", "प्र2: मौजूदा विकल्प", "प्र3: कितने लोग", "प्र4: बेहतर क्यों", "प्र5: क्या वे भुगतान करेंगे", "प्र6: अनसुलझी समस्या", "जोखिम और अगले कदम", "वेंचर ब्रांड नाम"],
    question: "प्रश्न",
    status: { built: "बना हुआ", designed: "डिजाइन किया गया", hypothesis: "परिकल्पना" },
    reality: {
      badge: "पहले पढ़ें",
      title: "वास्तविकता जाँच: आज क्या मौजूद है",
      lead: "यह एक क्लिक करने योग्य प्रोटोटाइप और डेटा ढाँचा है, अभी पूरा उत्पाद नहीं। नीचे के उत्तर इसी पर निर्भर हैं, इसलिए हर क्षमता की स्थिति यहाँ दी गई है।",
      heads: ["क्षमता", "स्थिति", "प्रमाण"],
      rows: [
        ["सीबीएसई, सीआईएससीई, एनआईओएस, राज्य बोर्ड और प्रारंभिक वर्षों के पाठ्यक्रम ढाँचे", "built", "अधिकतर हर चरण के लिए एक ही साझा टेम्पलेट। केवल सीबीएसई कक्षा 6 से 8 अध्याय-स्तर तक विकसित हैं।"],
        ["साझा पूर्व-अपेक्षा कौशल ग्राफ", "built", "59 कौशल और 62 कड़ियाँ: सीबीएसई 6 से 8 के डेमो के लिए पर्याप्त, बाकी जगह अध्याय-स्तरीय निदान के लिए पर्याप्त बारीक नहीं।"],
        ["निदान और मॉक प्रश्न बैंक", "built", "9 निदान प्रश्न और 6 मॉक ब्लूप्रिंट (डेमो आकार)।"],
        ["एआई ट्यूटर, अनुकूली पुनर्संतुलन, स्वयं विकसित होने वाला इंजन", "designed", "अभी कोई एलएलएम कॉल या बैकएंड लॉजिक नहीं। ऐप में दिखी इंजन घटनाएँ केवल उदाहरण (डेमो डेटा) हैं।"],
        ["खाते, सहेजी गई प्रगति, अभिभावक सहमति, भुगतान", "designed", "ऐप की सारी स्थिति ब्राउजर में रहती है और पेज दोबारा खोलने पर मिट जाती है।"],
        ["अभिभावक निदान और साप्ताहिक योजना के लिए ₹199 या ₹499 प्रति माह देंगे", "hypothesis", "अभी कोई उपयोगकर्ता या कीमत परीक्षण नहीं। 20 से 50 परिवारों का पायलट चाहिए।"]
      ] as [string, Status, string][]
    },
    q1: {
      title: "इस उत्पाद का उपयोग कौन करेगा?",
      answer: "खरीदार अभिभावक हैं; उपयोगकर्ता बच्चा है। उसी एक वर्ग से शुरुआत करें जो वास्तव में बने हिस्से से मेल खाता है।",
      cards: [
        ["मुख्य शुरुआती वर्ग", "सीबीएसई कक्षा 6-8 के छात्रों के अभिभावक", "शहरी और अर्ध-शहरी परिवार जो पहले से ट्यूशन पर खर्च करते हैं, जिनके बच्चे अंग्रेजी या हिंदी में पढ़ते हैं, और जो कक्षा 9 और 10 के बोर्ड वर्षों से पहले छिपी कमियों को लेकर चिंतित हैं। इस रिपॉजिटरी में केवल सीबीएसई कक्षा 6 से 8 ही अध्याय-स्तर तक विकसित हैं।"],
        ["द्वितीयक", "एनआईओएस और घर पर पढ़ाने वाले परिवार", "एक छोटा वर्ग जिसकी समस्या गहरी है: कोई उन्हें संरचित वार्षिक योजना नहीं देता। प्रमाणन एनआईओएस ओपन बेसिक एजुकेशन, सेकेंडरी और सीनियर सेकेंडरी के माध्यम से होता है।"],
        ["बाद में", "पहले उत्पाद में नहीं", "जेईई, नीट, सीयूईटी, यूपीएससी, सैट, एक्ट, आईईएलटीएस, टोफेल और 0 से 3 वर्ष। इनमें से हर एक अलग व्यवसाय है जिसमें मजबूत प्रतिस्पर्धी पहले से हैं। इनकी ट्रैक फाइलें रिपॉजिटरी में ढाँचे के रूप में रहेंगी, लॉन्च के दायरे में नहीं।"]
      ]
    },
    q2: {
      title: "वे अभी क्या उपयोग करते हैं?",
      answer: "असली प्रतिस्पर्धी मोहल्ले का ट्यूशन शिक्षक है, और मुफ्त एआई चैटबॉट सबसे तेजी से बढ़ता खतरा हैं।",
      heads: ["मौजूदा विकल्प", "यह क्या अच्छा करता है", "इसमें क्या कमी है"],
      rows: [
        ["मोहल्ले का ट्यूशन शिक्षक", "सप्ताह की योजना बनाता है, बच्चे को जवाबदेह रखता है, शंकाएँ दूर करता है, व्हाट्सऐप पर अभिभावकों को बताता है।", "निदान अंदाजे से होता है; गुणवत्ता अलग-अलग होती है; पिछली कक्षाओं की कमियों तक शायद ही पहुँचता है।"],
        ["स्कूल और पाठ्यपुस्तकें (NCERT, CBSE, CISCE, राज्य बोर्ड)", "संरचना, सहपाठी, प्रमाणन।", "ये कैलेंडर की तारीख से चलते हैं, हर बच्चे की समझ से नहीं।"],
        ["वीडियो ऐप्स और यूट्यूब (PW, Vedantu, Byju's, Khan Academy, DIKSHA)", "असीमित सामग्री, अक्सर मुफ्त या सस्ती।", "कोई व्यक्तिगत योजना नहीं; केवल देखना।"],
        ["सामान्य एआई चैटबॉट (ChatGPT, Gemini, Claude)", "मुफ्त, तुरंत व्याख्या, अब लर्निंग मोड के साथ।", "बच्चे का बोर्ड संस्करण या पाठ्यपुस्तक नहीं जानते; लंबे समय का प्रगति रिकॉर्ड नहीं रखते।"]
      ]
    },
    q3: {
      title: "कितने उपयोगकर्ता इस समस्या का सामना करते हैं?",
      answer: "सीबीएसई कक्षा 6-8 के लगभग 20 लाख परिवार पहले से अतिरिक्त पढ़ाई पर खर्च करते हैं। यही यथार्थवादी पहला बाजार है, 24.69 करोड़ की कुल संख्या नहीं।",
      heads: ["चरण", "आँकड़ा", "स्रोत और विश्वसनीयता"],
      rows: [
        ["सभी स्कूली छात्र (प्री-प्राइमरी से कक्षा 12)", "14.71 लाख स्कूलों में 24.69 करोड़"],
        ["सीबीएसई कक्षा 10 पंजीकरण, 2025", "लगभग 23.85 लाख"],
        ["सीबीएसई कक्षा 6 से 8 (तीन बैच)", "लगभग 70 लाख"],
        ["निजी कोचिंग लेने वाले छात्र", "देश में 27.0%, शहरी क्षेत्रों में 30.7%"],
        ["शुरुआती बाजार: सीबीएसई कक्षा 6-8 के वे परिवार जो पहले से खर्च करते हैं", "लगभग 20 लाख"]
      ],
      udise: "UDISE+ 2024-25",
      primary: "प्राथमिक स्रोत",
      secondary: "द्वितीयक स्रोत",
      cbsePrefix: "सीबीएसई आँकड़े, ",
      asReported: "रिपोर्ट के अनुसार",
      cohortEstimate: "अनुमान: हर बैच कक्षा 10 जितना बड़ा",
      cmse: "NSS CMS: शिक्षा 2025 (PIB, 26 अगस्त 2025)",
      wedgeEstimate: "अनुमान: 70 लाख x लगभग 30%"
    },
    q4: {
      title: "हमारा उत्पाद बेहतर क्यों होगा?",
      answer: "ईमानदार उत्तर: अभी यह बेहतर नहीं है। नीचे की खूबियाँ डिजाइन की गई हैं, बनी नहीं हैं। बन जाने पर हर विकल्प के मुकाबले बढ़त यह होगी।",
      cards: [
        ["designed", "1. इस सत्र की पाठ्यपुस्तक से जुड़ा, पिछली कक्षाओं तक जाने वाला निदान", "\"आपके बच्चे की गणित प्रकाश में कठिनाई असल में कक्षा 5 के भिन्न की कमी है।\" ट्यूटर यह अंदाजे से करते हैं; ऐप्स और चैटबॉट बिल्कुल नहीं करते।"],
        ["designed", "2. स्कूल के गृहकार्य के साथ छोटी साप्ताहिक योजना", "छूटे दिनों में जरूरी बोर्ड सामग्री पहले आगे बढ़ती है, रोज के तय समय के भीतर। यह वीडियो लाइब्रेरी नहीं है।"],
        ["designed", "3. अभिभावक रिपोर्ट जो दिखाए कि यह काम कर रहा है या नहीं", "साप्ताहिक, कौशल-स्तर पर, ऐसे अभिभावक के लिए भी समझने योग्य जो शिक्षक नहीं है।"],
        ["hypothesis", "4. ट्यूशन से कम कीमत", "₹199 या ₹499 प्रति माह, ये दोनों कीमतें पायलट में परखी जाएँगी (प्रश्न 5 देखें)।"]
      ] as [Status, string, string][],
      footer:
        "चैटबॉट में बिंदु 1 से 3 नहीं हैं, क्योंकि वे बोर्ड संस्करण या पाठ्यपुस्तक नहीं जानते और लंबे समय का प्रगति रिकॉर्ड नहीं रखते। इस रिपॉजिटरी में पहले से मौजूद बोर्ड-संस्करण पिनिंग और स्रोत ट्रेसिंग इस बढ़त का आधार हैं।"
    },
    q5: {
      title: "क्या वे भुगतान करेंगे?",
      answer: "शायद हाँ, पर निदान और जवाबदेही के लिए, \"योजना\" के लिए नहीं, और केवल उस कीमत पर जो परिवारों के आज के खर्च के आसपास हो। पायलट से पहले यह अप्रमाणित है।",
      spendLabel: "परिवार अभी कितना खर्च करते हैं:",
      spendText:
        "निजी कोचिंग पर प्रति छात्र औसत वार्षिक घरेलू खर्च शहरी क्षेत्रों में ₹3,988 और ग्रामीण क्षेत्रों में ₹1,793 है, जो उच्च माध्यमिक स्तर पर देश भर में ₹6,384 तक जाता है",
      spendSource: "NSS CMS: शिक्षा 2025",
      spendTail: "ये औसत हैं; ट्यूशन पर खर्च करने वाले शहरी परिवार इससे अधिक खर्च करते हैं।",
      historyLabel: "भारतीय एडटेक का अनुभव क्या बताता है:",
      historyText: "अभिभावक जवाबदेह व्यक्ति और दिखने वाले परिणाम के लिए भुगतान करते हैं। ऊँची कीमत वाले, बिक्री-आधारित पैकेज बड़े स्तर पर असफल रहे; कम कीमत वाले ऑफर बढ़े।",
      implicationLabel: "निष्कर्ष:",
      implicationText:
        "₹799 से ₹1,499 प्रति माह (₹9,588 से ₹17,988 प्रति वर्ष) वाला स्व-सेवा ऐप अधिकांश परिवारों के कोचिंग खर्च से अधिक है, और तभी सफल होगा जब वह ट्यूटर की पूरी जगह ले।",
      tiers: [
        ["मुफ्त", "₹0", "पाठ्यक्रम एक्सप्लोरर और पिछली कक्षाओं तक जाने वाली एक निदान रिपोर्ट।"],
        ["कोर (परखने के लिए दो कीमतें)", "₹199 या ₹499 / माह", "निदान, साप्ताहिक योजना, साप्ताहिक अभिभावक रिपोर्ट।"],
        ["ट्यूटर और स्कूल चैनल (B2B2C)", "प्रति छात्र", "यही टूल ट्यूशन शिक्षक या छोटे स्कूल इस्तेमाल करेंगे। कीमत पायलट में तय होगी।"]
      ],
      footer: "प्रतियोगी और विदेश-अध्ययन ट्रैक की कीमत तब तक तय नहीं होगी जब तक शुरुआती बाजार साबित न हो जाए।"
    },
    q6: {
      title: "वह असली समस्या क्या है जो अभी हल नहीं हुई?",
      answer: "अब सामग्री मुफ्त और असीमित है। जो कोई सस्ते में नहीं देता, वह है निदान और उस पर लगातार अमल।",
      list: [
        "ठीक-ठीक जानना कि इस बच्चे में पिछली कक्षाओं के कौन से कौशल कम हैं, और वे इस सत्र की पाठ्यपुस्तक से कैसे जुड़ते हैं।",
        "उसे रोज 20 से 30 मिनट के ऐसे काम में बदलना जो बच्चा स्कूल के गृहकार्य के साथ सच में करे।",
        "अभिभावक को दिखाना कि यह काम कर रहा है या नहीं।"
      ],
      strong: "सबसे कठिन हिस्सा जानकारी नहीं, लगातार अमल है।",
      rest: "बिना किसी व्यक्ति के कहे 12 साल के बच्चे से रोज ऐप खुलवाना ही अनसुलझी समस्या है, और यही कारण है कि ट्यूशन शिक्षक अब भी जीतते हैं।"
    },
    risks: {
      badge: "जोखिम",
      title: "जिन जोखिमों पर उत्तर निर्भर हैं, और अगले कदम",
      dpdpTitle: "बच्चों का डेटा (DPDP अधिनियम 2023, धारा 9)",
      dpdp: [
        "18 वर्ष से कम आयु का हर व्यक्ति बच्चा माना जाता है। ",
        "अधिनियम",
        " के तहत अभिभावक की सत्यापन-योग्य सहमति जरूरी है और बच्चों की ट्रैकिंग व व्यवहार निगरानी पर रोक है। अनुकूली शिक्षण के साथ XP, स्ट्रीक और लीग को निगरानी माना जा सकता है, और ",
        "DPDP नियम 2025",
        " में शैक्षणिक संस्थानों को मिली छूट शायद किसी निजी ऐप पर लागू न हो। किसी भी पायलट में छात्र डेटा सहेजने से पहले कानूनी राय लें।"
      ],
      nextTitle: "अगले कदम",
      next: [
        "सीबीएसई कक्षा 6-8 गणित के लिए अंग्रेजी और हिंदी में असली मूल ढाँचा बनाएँ: 300+ निदान प्रश्न, अभिभावक सहमति के साथ सहेजी गई प्रगति, साप्ताहिक अभिभावक रिपोर्ट।",
        "कुछ और बनाने से पहले 20 से 50 अभिभावकों के साथ ₹199 और ₹499 प्रति माह पर पायलट करें।",
        "मापें: निदान पूरा होने की दर, 7वें और 28वें दिन की सक्रियता, अभिभावक रिपोर्ट कितनी बार खोली गई, और हर कीमत पर भुगतान करने वालों का अनुपात।"
      ]
    },
    brands: {
      title: "सुझाए गए वेंचर ब्रांड नाम",
      lead: "निर्णय बाकी है। उत्पाद अभी EveryYear (ऐप कॉन्फिग), EduAIon (वेंचर कॉन्फिग) और EduAI (रिपॉजिटरी) के नाम से दिखता है। किसी भी सार्वजनिक लॉन्च से पहले एक नाम चुनें।",
      items: [
        ["EveryYear", "वादा सीधे कहता है: स्कूल के हर वर्ष की योजना। ऐप में अभी यही डिफॉल्ट है।"],
        ["EduAIon", "वेंचर कॉन्फिग में कार्यकारी नाम; पिछली जाँच में .com, .ai, .in और .app पंजीकृत नहीं थे। ट्रेडमार्क खोज अभी नहीं हुई।"],
        ["Vidyapath AI", "\"ज्ञान का पथ\"। हिंदी और अंग्रेजी दोनों तरह के परिवारों में अपनापन।"],
        ["AarohAI", "संस्कृत के आरोहण (क्रमिक चढ़ाई) से: चरण-दर-चरण दक्षता ग्राफ का रूपक।"]
      ]
    },
    cta: "प्रोटोटाइप देखें →",
    footnote: "मूल स्रोत: docs/00-venture-strategy-and-naming.md · आँकड़े: UDISE+ 2024-25, NSS CMS: शिक्षा 2025, CBSE 2025"
  }
};

const NAV_IDS = ["reality-check", "who-will-use", "current-alternatives", "market-size", "why-better", "will-he-pay", "unsolved-problem", "risks-next", "venture-brands"];
const KPI_COLORS = ["#38bdf8", "#34d399", "#fbbf24", "#a78bfa"];
const CARD_BADGES = ["badge badge-green", "badge badge-blue", "badge badge-warn"];
const CARD_COLORS = ["#38bdf8", "#34d399", "#fbbf24"];
const TIER_STYLES = [
  { border: "var(--border)", color: "var(--text-muted)" },
  { border: "#6366f1", color: "#818cf8" },
  { border: "#10b981", color: "#34d399" }
];
const BRAND_STYLES = [
  ["#6366f1", "#818cf8"],
  ["#10b981", "#34d399"],
  ["#f59e0b", "#fbbf24"],
  ["#ec4899", "#f472b6"]
];

function QuestionHeader({ label, num, title }: { label: string; num: number; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
      <span className="badge badge-blue">
        {label} {num}
      </span>
      <h2 style={{ margin: 0, fontSize: "1.4rem" }}>{title}</h2>
    </div>
  );
}

function Answer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(99, 102, 241, 0.1)",
        border: "1px solid rgba(99, 102, 241, 0.35)",
        borderRadius: "10px",
        padding: "0.9rem 1.1rem",
        marginBottom: "1rem"
      }}
    >
      <p style={{ margin: 0, color: "var(--text)", fontSize: "0.98rem", lineHeight: 1.6, fontWeight: 600 }}>{children}</p>
    </div>
  );
}

export default function EveryYearJustification() {
  const [lang, setLang] = useLanguage();
  const t = COPY[lang];
  const q3Sources: React.ReactNode[] = [
    <>
      <Src href={SOURCES.udise}>{t.q3.udise}</Src>, {t.q3.primary}
    </>,
    <>
      {t.q3.cbsePrefix}
      <Src href={SOURCES.cbse10}>{t.q3.asReported}</Src>, {t.q3.secondary}
    </>,
    t.q3.cohortEstimate,
    <>
      <Src href={SOURCES.cmse}>{t.q3.cmse}</Src>, {t.q3.primary}
    </>,
    t.q3.wedgeEstimate
  ];

  return (
    <div className="app-shell" lang={lang}>
      {/* Top Global Mode Navigation Bar (Separates Platform Prototype vs Venture Justification) */}
      <nav className="global-mode-header" aria-label="Global Mode Navigation">
        <div className="global-mode-brand">
          <span className="brand-logo-gem">✦</span>
          <span className="brand-title">EveryYear</span>
          <span className="badge badge-green" style={{ fontSize: "0.72rem" }}>
            {lang === "en" ? "Venture Strategy Dossier" : "उद्यम रणनीति दस्तावेज"}
          </span>
        </div>
        <div className="global-mode-pills" role="tablist" aria-label="Platform and Thesis Modes">
          <Link
            href="/"
            className="global-pill"
            title={lang === "en" ? "Launch Interactive Student and Parent Learning App" : "सक्रिय विद्यार्थी अध्ययन ऐप खोलें"}
          >
            <span>🎒</span>
            <span>{lang === "en" ? "Launch Usable Platform (App)" : "लर्निंग ऐप चलाएं"}</span>
          </Link>
          <button
            type="button"
            className="global-pill active"
            title={lang === "en" ? "Currently Viewing 6 Core Venture Questions" : "6 मुख्य रणनीतिक प्रश्न"}
          >
            <span>📊</span>
            <span>{lang === "en" ? "Venture Justification (Active)" : "उद्यम औचित्य (सक्रिय)"}</span>
          </button>
          <Link
            href="/pariksha-saathi"
            className="global-pill secondary-pill"
            title="Pariksha Saathi Newspaper Prototype"
          >
            <span>📰</span>
            <span>Pariksha Saathi</span>
          </Link>
          <Link
            href="/aage-kya"
            className="global-pill secondary-pill"
            title="Aage Kya Career Navigator"
          >
            <span>🧭</span>
            <span>Aage Kya</span>
          </Link>
        </div>
      </nav>

      <header className="top-header">
        <div className="header-row">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
              <span className="brand-badge">{t.badges[0]}</span>
              <span className="badge badge-warn">{t.badges[1]}</span>
              <span className="badge badge-green">{t.badges[2]}</span>
            </div>
            <h1 style={{ margin: "0.2rem 0 0.4rem 0", fontSize: "1.85rem", fontWeight: 800 }}>{t.title}</h1>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "920px", lineHeight: 1.55 }}>{t.subtitle}</p>
          </div>
          <div className="header-controls">
            <LanguageToggle lang={lang} onChange={setLang} />
            <Link href="/" className="control-pill" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              {t.back}
            </Link>
          </div>
        </div>

        <div className="kpi-strip">
          {t.kpis.map(([value, label], i) => (
            <div key={i} className="kpi-card">
              <div className="kpi-value" style={{ color: KPI_COLORS[i] }}>
                {value}
              </div>
              <div className="kpi-label">{label}</div>
            </div>
          ))}
        </div>
      </header>

      <nav aria-label={lang === "hi" ? "थीसिस में सीधे जाएँ" : "Thesis Quick Jump"} className="nav-tabs" style={{ position: "sticky", top: "0.75rem", zIndex: 30, backdropFilter: "blur(16px)", background: "rgba(11, 18, 34, 0.9)" }}>
        {t.nav.map((label, i) => (
          <a key={NAV_IDS[i]} href={`#${NAV_IDS[i]}`} className="nav-tab" style={{ textDecoration: "none" }}>
            {label}
          </a>
        ))}
      </nav>

      {/* Executive Comparison Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.12) 100%)",
          border: "1.5px solid rgba(99, 102, 241, 0.35)",
          borderRadius: "14px",
          padding: "1.1rem 1.35rem",
          margin: "1rem 0 1.25rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}
      >
        <div style={{ maxWidth: "820px" }}>
          <span className="badge badge-blue" style={{ marginBottom: "0.35rem" }}>
            {lang === "en" ? "Architecture Note: Two Distinct Experiences" : "संरचना स्पष्टीकरण: दो अलग-अलग अनुभव"}
          </span>
          <h3 style={{ margin: "0.2rem 0 0.35rem 0", fontSize: "1.2rem", fontWeight: 800 }}>
            {lang === "en"
              ? "Separately Usable: Learning Platform Prototype vs. Venture Justification"
              : "अलग-अलग उपयोग योग्य: लर्निंग प्लेटफॉर्म प्रोटोटाइप बनाम उद्यम औचित्य"}
          </h3>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.55 }}>
            {lang === "en"
              ? "You are currently reading the strategic venture dossier (6 core questions, bottom-up TAM/SAM/SOM market models, and regulatory defensibility). To test the day-to-day student experience (15-min Panchpadi lesson, interactive practice, screen-time caps, and WhatsApp updates), launch the learning app prototype."
              : "आप अभी रणनीतिक उद्यम दस्तावेज पढ़ रहे हैं (6 मुख्य प्रश्न, बाजार आकार और नियमन सुरक्षा)। विद्यार्थी और अभिभावक के वास्तविक दैनिक अनुभव के लिए सक्रिय प्लेटफॉर्म प्रोटोटाइप चलाएं।"}
          </p>
        </div>
        <Link
          href="/"
          className="btn btn-primary"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.65rem 1.35rem",
            fontWeight: 800,
            fontSize: "0.92rem",
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)"
          }}
        >
          <span>🚀</span>
          <span>{lang === "en" ? "Launch Usable Platform (App)" : "सक्रिय ऐप चलाएं"}</span>
        </Link>
      </div>

      <section id="reality-check" className="card" style={{ borderColor: "rgba(245, 158, 11, 0.35)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span className="badge badge-warn">{t.reality.badge}</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>{t.reality.title}</h2>
        </div>
        <p style={LEAD}>{t.reality.lead}</p>
        <div className="table-wrap" style={{ overflowX: "auto", marginTop: "0.75rem" }}>
          <table className="stack-table" style={TABLE}>
            <thead>
              <tr style={HEAD_ROW}>
                {t.reality.heads.map((h) => (
                  <th key={h} style={CELL}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              {t.reality.rows.map(([capability, status, evidence]) => (
                <tr key={capability} style={ROW}>
                  <td style={{ ...CELL, color: "var(--text)", fontWeight: 600 }}>{capability}</td>
                  <td data-label={t.reality.heads[1]} style={CELL}>
                    <span className={STATUS_BADGE[status]}>{t.status[status]}</span>
                  </td>
                  <td data-label={t.reality.heads[2]} style={CELL}>
                    {evidence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="who-will-use" className="card">
        <QuestionHeader label={t.question} num={1} title={t.q1.title} />
        <Answer>{t.q1.answer}</Answer>
        <div className="grid-3">
          {t.q1.cards.map(([badge, heading, body], i) => (
            <div key={heading} style={{ ...PANEL, ...(i === 0 ? { borderColor: "#6366f1" } : {}) }}>
              <span className={CARD_BADGES[i]}>{badge}</span>
              <h3 style={{ fontSize: "1.05rem", color: CARD_COLORS[i], marginTop: "0.4rem" }}>{heading}</h3>
              <p style={{ ...BODY, fontSize: "0.88rem" }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="current-alternatives" className="card">
        <QuestionHeader label={t.question} num={2} title={t.q2.title} />
        <Answer>{t.q2.answer}</Answer>
        <div className="table-wrap" style={{ overflowX: "auto" }}>
          <table className="stack-table" style={TABLE}>
            <thead>
              <tr style={HEAD_ROW}>
                {t.q2.heads.map((h) => (
                  <th key={h} style={CELL}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              {t.q2.rows.map(([alt, good, miss], i) => (
                <tr key={alt} style={i < t.q2.rows.length - 1 ? ROW : undefined}>
                  <td style={STRONG_CELL}>{alt}</td>
                  <td data-label={t.q2.heads[1]} style={CELL}>
                    {good}
                  </td>
                  <td data-label={t.q2.heads[2]} style={CELL}>
                    {miss}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="market-size" className="card">
        <QuestionHeader label={t.question} num={3} title={t.q3.title} />
        <Answer>{t.q3.answer}</Answer>
        <div className="table-wrap" style={{ overflowX: "auto" }}>
          <table className="stack-table" style={TABLE}>
            <thead>
              <tr style={HEAD_ROW}>
                {t.q3.heads.map((h) => (
                  <th key={h} style={CELL}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              {t.q3.rows.map(([step, figure], i) => {
                const last = i === t.q3.rows.length - 1;
                return (
                  <tr key={step} style={last ? undefined : ROW}>
                    <td style={last ? STRONG_CELL : CELL}>{step}</td>
                    <td data-label={t.q3.heads[1]} style={{ ...CELL, color: last ? "#34d399" : "var(--text)", fontWeight: last ? 800 : 700 }}>
                      {figure}
                    </td>
                    <td data-label={t.q3.heads[2]} style={CELL}>
                      {q3Sources[i]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section id="why-better" className="card">
        <QuestionHeader label={t.question} num={4} title={t.q4.title} />
        <Answer>{t.q4.answer}</Answer>
        <div className="grid-2">
          {t.q4.cards.map(([status, heading, body]) => (
            <div key={heading} style={PANEL}>
              <span className={STATUS_BADGE[status]}>{t.status[status]}</span>
              <h3 style={{ fontSize: "1.05rem", color: "#818cf8", margin: "0.4rem 0" }}>{heading}</h3>
              <p style={{ ...BODY, fontSize: "0.88rem", margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
        <p style={{ ...BODY, marginTop: "1rem", marginBottom: 0 }}>{t.q4.footer}</p>
      </section>

      <section id="will-he-pay" className="card">
        <QuestionHeader label={t.question} num={5} title={t.q5.title} />
        <Answer>{t.q5.answer}</Answer>
        <ul style={{ ...BODY, paddingLeft: "1.25rem" }}>
          <li>
            <strong>{t.q5.spendLabel}</strong> {t.q5.spendText} (<Src href={SOURCES.cmse}>{t.q5.spendSource}</Src>). {t.q5.spendTail}
          </li>
          <li>
            <strong>{t.q5.historyLabel}</strong> {t.q5.historyText}
          </li>
          <li>
            <strong>{t.q5.implicationLabel}</strong> {t.q5.implicationText}
          </li>
        </ul>
        <div className="grid-3" style={{ marginTop: "1rem" }}>
          {t.q5.tiers.map(([name, price, body], i) => (
            <div key={name} style={{ ...PANEL, borderColor: TIER_STYLES[i].border }}>
              <div style={{ fontSize: "0.8rem", color: TIER_STYLES[i].color, fontWeight: i ? 700 : 400 }}>{name}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", margin: "0.3rem 0" }}>{price}</div>
              <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>{body}</div>
            </div>
          ))}
        </div>
        <p style={{ ...LEAD, marginTop: "1rem", marginBottom: 0 }}>{t.q5.footer}</p>
      </section>

      <section id="unsolved-problem" className="card">
        <QuestionHeader label={t.question} num={6} title={t.q6.title} />
        <Answer>{t.q6.answer}</Answer>
        <ol style={{ ...BODY, paddingLeft: "1.25rem" }}>
          {t.q6.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p style={{ ...BODY, marginBottom: 0 }}>
          <strong>{t.q6.strong}</strong> {t.q6.rest}
        </p>
      </section>

      <section id="risks-next" className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span className="badge badge-danger">{t.risks.badge}</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>{t.risks.title}</h2>
        </div>
        <div className="grid-2">
          <div style={PANEL}>
            <h3 style={{ fontSize: "1.05rem", color: "#f87171", marginTop: 0 }}>{t.risks.dpdpTitle}</h3>
            <p style={{ ...BODY, fontSize: "0.88rem", margin: 0 }}>
              {t.risks.dpdp[0]}
              <Src href={SOURCES.dpdpAct}>{t.risks.dpdp[1]}</Src>
              {t.risks.dpdp[2]}
              <Src href={SOURCES.dpdpRules}>{t.risks.dpdp[3]}</Src>
              {t.risks.dpdp[4]}
            </p>
          </div>
          <div style={PANEL}>
            <h3 style={{ fontSize: "1.05rem", color: "#34d399", marginTop: 0 }}>{t.risks.nextTitle}</h3>
            <ol style={{ ...BODY, fontSize: "0.88rem", margin: 0, paddingLeft: "1.2rem" }}>
              {t.risks.next.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="venture-brands" className="card">
        <h2 style={{ fontSize: "1.4rem", color: "var(--text)", marginTop: 0, marginBottom: "0.75rem" }}>{t.brands.title}</h2>
        <p style={LEAD}>{t.brands.lead}</p>
        <div className="grid-2" style={{ marginTop: "1rem" }}>
          {t.brands.items.map(([name, body], i) => (
            <div key={name} style={{ ...PANEL, borderColor: BRAND_STYLES[i][0] }}>
              <div style={{ fontSize: "1.15rem", fontWeight: 700, color: BRAND_STYLES[i][1] }}>{name}</div>
              <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginTop: "0.4rem", lineHeight: 1.5 }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2.5rem 0", borderTop: "1px solid var(--border)", marginTop: "2rem" }}>
        <Link href="/" className="control-pill" style={{ display: "inline-block", background: "var(--primary)", color: "#ffffff", padding: "0.75rem 2rem", borderRadius: "10px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
          {t.cta}
        </Link>
        <div style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>{t.footnote}</div>
      </footer>
    </div>
  );
}
