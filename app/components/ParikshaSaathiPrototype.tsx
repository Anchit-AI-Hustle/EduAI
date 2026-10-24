"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./useLanguage";

// Concept prototype: a weekly Hindi board-practice test distributed through a
// newspaper's education page (QR) and results portal, monetised through
// sponsor slots, school packs and a paid parent mock. Nothing is stored.
// Every string has English and Hindi versions; the toggle switches the page.

type Tab = "student" | "revenue" | "fit";

interface QuestionText {
  chapter: string;
  text: string;
  options: string[];
  gap: string;
}

interface Question {
  id: string;
  answer: number;
  en: QuestionText;
  hi: QuestionText;
}

// UP Board Class 10 Mathematics follows the NCERT textbook. Each gap names an
// earlier-class prerequisite, never a Class 10 skill.
const QUESTIONS: Question[] = [
  {
    id: "q1",
    answer: 1,
    en: {
      chapter: "Real Numbers",
      text: "What is the HCF (highest common factor) of 96 and 404?",
      options: ["2", "4", "8", "12"],
      gap: "Class 6: prime factorisation"
    },
    hi: {
      chapter: "वास्तविक संख्याएँ",
      text: "96 और 404 का HCF (महत्तम समापवर्तक) क्या है?",
      options: ["2", "4", "8", "12"],
      gap: "कक्षा 6: अभाज्य गुणनखंड"
    }
  },
  {
    id: "q2",
    answer: 0,
    en: {
      chapter: "Polynomials",
      text: "What are the zeroes of x² − 5x + 6?",
      options: ["2 and 3", "−2 and −3", "1 and 6", "−1 and 6"],
      gap: "Class 9: factorising by splitting the middle term"
    },
    hi: {
      chapter: "बहुपद",
      text: "x² − 5x + 6 के शून्यक कौन से हैं?",
      options: ["2 और 3", "−2 और −3", "1 और 6", "−1 और 6"],
      gap: "कक्षा 9: मध्य पद विभाजन से गुणनखंडन"
    }
  },
  {
    id: "q3",
    answer: 1,
    en: {
      chapter: "Quadratic Equations",
      text: "What is the nature of the roots of x² − 4x + 4 = 0?",
      options: ["Two distinct real roots", "Two equal real roots", "No real roots", "Three roots"],
      gap: "Class 9: algebraic identities (a − b)²"
    },
    hi: {
      chapter: "द्विघात समीकरण",
      text: "x² − 4x + 4 = 0 के मूलों की प्रकृति क्या है?",
      options: ["दो भिन्न वास्तविक मूल", "दो बराबर वास्तविक मूल", "कोई वास्तविक मूल नहीं", "तीन मूल"],
      gap: "कक्षा 9: बीजीय सर्वसमिकाएँ (a − b)²"
    }
  },
  {
    id: "q4",
    answer: 1,
    en: {
      chapter: "Arithmetic Progressions",
      text: "What is the 10th term of the arithmetic progression 2, 7, 12, ...?",
      options: ["45", "47", "50", "52"],
      gap: "Classes 6 and 7: number patterns and rules"
    },
    hi: {
      chapter: "समांतर श्रेढ़ी",
      text: "समांतर श्रेढ़ी 2, 7, 12, ... का 10वाँ पद क्या है?",
      options: ["45", "47", "50", "52"],
      gap: "कक्षा 6 और 7: संख्या पैटर्न और नियम"
    }
  },
  {
    id: "q5",
    answer: 0,
    en: {
      chapter: "Trigonometry",
      text: "For an acute angle A, sin A = 3/5. What is cos A?",
      options: ["4/5", "3/4", "5/4", "5/3"],
      gap: "Class 7: Pythagoras theorem (sides of a right triangle)"
    },
    hi: {
      chapter: "त्रिकोणमिति",
      text: "एक न्यूनकोण A के लिए sin A = 3/5 है। cos A का मान क्या है?",
      options: ["4/5", "3/4", "5/4", "5/3"],
      gap: "कक्षा 7: पाइथागोरस प्रमेय (समकोण त्रिभुज की भुजाएँ)"
    }
  }
];

const COPY = {
  en: {
    badges: ["Concept prototype", "Independent pitch, not affiliated with Amar Ujala"],
    title: "Pariksha Saathi (परीक्षा साथी)",
    subtitle:
      "A weekly 10-minute Hindi board-practice test, printed as a QR box on the education page. Students get an instant chapter-wise gap report; sponsors, schools and parents pay for it.",
    whyLink: "Why it works: 6 questions →",
    backLink: "← EveryYear prototype",
    kpis: [
      ["~54 lakh", "UP Board 2025 candidates (Class 10 + 12)"],
      ["3", "Revenue lines: sponsor, school, parent"],
      ["10 min", "Weekly test, scored instantly"],
      ["8 weeks", "Pilot in one district edition"]
    ],
    tabsLabel: "Prototype sections",
    tabs: { student: "1. Student demo", revenue: "2. Revenue model", fit: "3. Why it fits Amar Ujala" },
    student: {
      printLabel: "Print touchpoint (mock of the education page box)",
      boxTitle: "Pariksha Saathi: this week's 10-minute test",
      boxSub: "UP Board Class 10 Maths · 5 questions · Scan the QR for an instant chapter-wise report",
      sponsorBadge: "Sponsor slot (example)",
      sponsorText: "\"This week's test is supported by [Sponsor name]\": one named sponsor per weekly test, booked like a print ad.",
      start: "Start the test",
      quizTitle: "Class 10 Maths · Weekly test",
      answered: "answered",
      questionWord: "Question",
      submit: "Submit and see report",
      answerAll: "Answer all questions",
      scoreLabel: "Your score",
      perfect: "Excellent! Next week's test will be at a harder level.",
      notPerfect: "More important than the score: which earlier-class skills may be behind these mistakes.",
      heads: ["Chapter", "Result", "Likely cause: review this skill"],
      labels: ["Result", "Likely cause"],
      correct: "Correct",
      review: "Review",
      correctAnswer: "Correct answer:",
      noReview: "No review needed yet",
      note: "One question cannot confirm a gap: the mistake may be haste or arithmetic. A cause counts as a real gap only when it repeats across weekly tests.",
      stepsTitle: "3 small steps this week",
      step1: (gap: string) => `10-minute review of ${gap}`,
      step2: (chapter: string) => `3 practice questions on ${chapter} (in Sunday's paper)`,
      step3: "Next Wednesday's test: see if the gap has closed",
      ctas: [
        ["Free", "Report to parents", "Weekly WhatsApp summary, only after a parent gives verifiable consent."],
        ["School pack", "Add school code", "The teacher gets a class-level gap map; the school pays per student per year."],
        ["Paid", "Full board mock:", "Full-length board-pattern mock with a chapter-wise report, once per exam season."]
      ],
      demoNote: "Demo only: nothing is saved and no personal data is collected. Buttons above are illustrative.",
      restart: "Restart"
    },
    revenue: {
      title: "Three revenue lines, one weekly test",
      lead: "Every number below is an editable pilot assumption, not a forecast. Change them to see year-one revenue.",
      a: "A. Sponsored weekly test",
      weeks: "Test weeks per year",
      weeksHint: "School-year weeks before boards",
      sponsorFee: "Sponsor fee per weekly test (₹)",
      sponsorFeeHint: "Sold by ad sales as a named slot",
      b: "B. School pack (B2B)",
      schools: "Schools signed",
      studentsPerSchool: "Students per school (Classes 9-12)",
      schoolPrice: "Price per student per year (₹)",
      c: "C. Paid parent mock",
      weeklyTakers: "Students taking the weekly test",
      weeklyTakersHint: "50,000 is about 1% of ~54 lakh 2025 UP Board candidates",
      conversion: "Paid conversion (%)",
      mockPrice: "Mock price (₹, once per season)",
      totalLabel: "Year-one revenue at these assumptions",
      totalNote:
        "The sponsor and school lines carry the business; the parent line is a bonus. Variable cost stays low because the test is 5 to 10 objective questions, scored instantly, with a teacher-reviewed question bank.",
      pilotTitle: "8-week pilot to prove it (one district edition)",
      pilot: [
        "Print the QR box every Wednesday on the education page; link it from the results portal.",
        "Sell 8 weekly sponsor slots to local coaching institutes, banks or brands through the existing ad desk.",
        "Sign 10 schools through existing school relationships for a free class report, then quote the paid pack.",
        "Measure: QR scans per edition, test completion rate, week-2 and week-4 return rate, sponsor renewal, school conversion, and parent mock purchases."
      ]
    },
    fit: [
      [
        "Uses what Amar Ujala already has",
        [
          "Daily print reach into Hindi-medium homes, and a results portal students already visit at board-result time.",
          "An ad sales team that can sell a weekly sponsor slot like any print booking.",
          "School relationships from the Atul Maheshwari Chhatravritti scholarship exam and the Tanav Mukt Pariksha (stress-free exam) programme."
        ]
      ],
      [
        "Brings programmes onto one platform",
        [
          "The same question engine can run scholarship screening rounds online.",
          "Weekly results give the stress-free exam programme a reason to stay in touch with students all year.",
          "Class-level gap maps give schools a reason to renew, not just a one-day event."
        ]
      ],
      [
        "Market anchor",
        [
          "About 54 lakh candidates registered for the 2025 UP Board High School and Intermediate exams.",
          "UP Board uses NCERT textbooks for core subjects in Classes 9 to 12, so one NCERT skill map serves UP Board and CBSE.",
          "27.0% of school students take private coaching (NSS CMS: Education 2025): demand for help exists and is paid for."
        ]
      ],
      [
        "Risks and how the design handles them",
        [
          "Children's data (DPDP Act 2023): the test works without login; contact details only with verifiable parent or school consent.",
          "Question quality: every item reviewed by a subject teacher before print; wrong items are a brand risk.",
          "Sponsor conflict: sponsors get a name and a slot, never access to student data or results."
        ]
      ]
    ] as [string, string[]][],
    lakhUnit: "lakh",
    croreUnit: "crore",
    footer:
      "Sources: UP Board 2025 registrations as reported on results.amarujala.com; NSS CMS: Education 2025 (PIB, 26 Aug 2025). Revenue figures are editable assumptions, not forecasts."
  },
  hi: {
    badges: ["कॉन्सेप्ट प्रोटोटाइप", "स्वतंत्र प्रस्ताव, अमर उजाला से संबद्ध नहीं"],
    title: "परीक्षा साथी (Pariksha Saathi)",
    subtitle:
      "हर सप्ताह 10 मिनट का हिंदी बोर्ड-अभ्यास टेस्ट, जो शिक्षा पेज पर QR बॉक्स के रूप में छपता है। छात्रों को तुरंत अध्याय-वार कमियों की रिपोर्ट मिलती है; प्रायोजक, स्कूल और अभिभावक इसका भुगतान करते हैं।",
    whyLink: "यह क्यों काम करेगा: 6 प्रश्न →",
    backLink: "← EveryYear प्रोटोटाइप",
    kpis: [
      ["~54 लाख", "यूपी बोर्ड 2025 परीक्षार्थी (कक्षा 10 + 12)"],
      ["3", "आय के स्रोत: प्रायोजक, स्कूल, अभिभावक"],
      ["10 मिनट", "साप्ताहिक टेस्ट, तुरंत अंक"],
      ["8 सप्ताह", "एक जिला संस्करण में पायलट"]
    ],
    tabsLabel: "प्रोटोटाइप के भाग",
    tabs: { student: "1. छात्र अनुभव", revenue: "2. आय मॉडल", fit: "3. अमर उजाला के लिए क्यों उपयुक्त" },
    student: {
      printLabel: "प्रिंट पर कैसा दिखेगा (शिक्षा पेज बॉक्स का नमूना)",
      boxTitle: "परीक्षा साथी: इस सप्ताह का 10 मिनट का टेस्ट",
      boxSub: "यूपी बोर्ड कक्षा 10 गणित · 5 प्रश्न · QR स्कैन करें, तुरंत अध्याय-वार रिपोर्ट पाएँ",
      sponsorBadge: "प्रायोजक स्लॉट (उदाहरण)",
      sponsorText: "\"इस सप्ताह का टेस्ट [प्रायोजक का नाम] के सहयोग से\": हर साप्ताहिक टेस्ट का एक नामित प्रायोजक, जिसकी बुकिंग प्रिंट विज्ञापन की तरह होती है।",
      start: "टेस्ट शुरू करें",
      quizTitle: "कक्षा 10 गणित · साप्ताहिक टेस्ट",
      answered: "उत्तर दिए",
      questionWord: "प्रश्न",
      submit: "जमा करें और रिपोर्ट देखें",
      answerAll: "सभी प्रश्नों के उत्तर दें",
      scoreLabel: "आपका स्कोर",
      perfect: "शानदार! अगले सप्ताह कठिन स्तर का टेस्ट आपका इंतजार करेगा।",
      notPerfect: "अंक से ज्यादा जरूरी है: इन गलतियों के पीछे किन पिछली कक्षाओं के कौशल हो सकते हैं।",
      heads: ["अध्याय", "परिणाम", "संभावित कारण: यह कौशल दोहराएँ"],
      labels: ["परिणाम", "संभावित कारण"],
      correct: "सही",
      review: "दोहराएँ",
      correctAnswer: "सही उत्तर:",
      noReview: "अभी दोहराने की जरूरत नहीं",
      note: "एक प्रश्न से पक्का निदान नहीं होता: गलती जल्दबाजी या गणना की भी हो सकती है। जो कारण अगले सप्ताहों के टेस्ट में भी दोहराया जाए, वही असली कमी मानी जाती है।",
      stepsTitle: "इस सप्ताह के 3 छोटे कदम",
      step1: (gap: string) => `${gap} पर 10 मिनट का दोहराव`,
      step2: (chapter: string) => `"${chapter}" अध्याय के 3 अभ्यास प्रश्न (रविवार के अखबार में)`,
      step3: "अगले बुधवार का टेस्ट: देखें कि कमी भरी या नहीं",
      ctas: [
        ["मुफ्त", "अभिभावक को रिपोर्ट", "साप्ताहिक व्हाट्सऐप सारांश, केवल अभिभावक की सत्यापन-योग्य सहमति के बाद।"],
        ["स्कूल पैक", "स्कूल कोड जोड़ें", "शिक्षक को कक्षा-स्तर पर कमियों का नक्शा मिलता है; स्कूल प्रति छात्र प्रति वर्ष भुगतान करता है।"],
        ["सशुल्क", "पूरा बोर्ड मॉक:", "बोर्ड पैटर्न पर पूरा मॉक टेस्ट, अध्याय-वार रिपोर्ट के साथ, हर परीक्षा सत्र में एक बार।"]
      ],
      demoNote: "केवल डेमो: कुछ भी सहेजा नहीं जाता और कोई व्यक्तिगत डेटा नहीं लिया जाता। ऊपर के बटन केवल उदाहरण हैं।",
      restart: "दोबारा शुरू करें"
    },
    revenue: {
      title: "एक साप्ताहिक टेस्ट, आय के तीन स्रोत",
      lead: "नीचे का हर आँकड़ा पायलट के लिए बदलने योग्य अनुमान है, पूर्वानुमान नहीं। पहले साल की आय देखने के लिए इन्हें बदलें।",
      a: "क. प्रायोजित साप्ताहिक टेस्ट",
      weeks: "साल में टेस्ट के सप्ताह",
      weeksHint: "बोर्ड परीक्षा से पहले के स्कूली सप्ताह",
      sponsorFee: "प्रति साप्ताहिक टेस्ट प्रायोजक शुल्क (₹)",
      sponsorFeeHint: "विज्ञापन टीम इसे एक नामित स्लॉट के रूप में बेचेगी",
      b: "ख. स्कूल पैक (B2B)",
      schools: "जुड़े स्कूल",
      studentsPerSchool: "प्रति स्कूल छात्र (कक्षा 9-12)",
      schoolPrice: "प्रति छात्र वार्षिक कीमत (₹)",
      c: "ग. अभिभावकों के लिए सशुल्क मॉक",
      weeklyTakers: "साप्ताहिक टेस्ट देने वाले छात्र",
      weeklyTakersHint: "50,000 यानी 2025 के लगभग 54 लाख यूपी बोर्ड परीक्षार्थियों का लगभग 1%",
      conversion: "भुगतान करने वालों का प्रतिशत (%)",
      mockPrice: "मॉक की कीमत (₹, हर सत्र में एक बार)",
      totalLabel: "इन अनुमानों पर पहले साल की आय",
      totalNote:
        "व्यवसाय मुख्य रूप से प्रायोजकों और स्कूलों से चलेगा; अभिभावकों से आय अतिरिक्त है। परिवर्ती लागत कम रहती है क्योंकि टेस्ट में 5 से 10 वस्तुनिष्ठ प्रश्न होते हैं, जो तुरंत जाँचे जाते हैं, और प्रश्न बैंक की जाँच शिक्षक करते हैं।",
      pilotTitle: "इसे साबित करने के लिए 8 सप्ताह का पायलट (एक जिला संस्करण)",
      pilot: [
        "हर बुधवार शिक्षा पेज पर QR बॉक्स छापें; रिजल्ट पोर्टल से उसका लिंक दें।",
        "मौजूदा विज्ञापन डेस्क के जरिए स्थानीय कोचिंग संस्थानों, बैंकों या ब्रांडों को 8 साप्ताहिक प्रायोजक स्लॉट बेचें।",
        "मौजूदा स्कूल संबंधों से 10 स्कूलों को मुफ्त कक्षा रिपोर्ट के लिए जोड़ें, फिर सशुल्क पैक की कीमत बताएँ।",
        "मापें: हर संस्करण में QR स्कैन, टेस्ट पूरा करने की दर, दूसरे और चौथे सप्ताह में लौटने की दर, प्रायोजक नवीनीकरण, स्कूलों का सशुल्क पैक लेना और अभिभावक मॉक की खरीद।"
      ]
    },
    fit: [
      [
        "अमर उजाला के पास जो पहले से है, उसी का उपयोग",
        [
          "हिंदी माध्यम के घरों तक रोज की प्रिंट पहुँच, और रिजल्ट पोर्टल जिस पर छात्र बोर्ड परिणाम के समय पहले से आते हैं।",
          "विज्ञापन टीम, जो साप्ताहिक प्रायोजक स्लॉट को किसी भी प्रिंट बुकिंग की तरह बेच सकती है।",
          "अतुल माहेश्वरी छात्रवृत्ति परीक्षा और तनाव मुक्त परीक्षा कार्यक्रम से बने स्कूल संबंध।"
        ]
      ],
      [
        "सभी कार्यक्रम एक प्लेटफॉर्म पर",
        [
          "वही प्रश्न इंजन छात्रवृत्ति के चयन चरण ऑनलाइन चला सकता है।",
          "साप्ताहिक परिणाम तनाव मुक्त परीक्षा कार्यक्रम को पूरे साल छात्रों से जुड़े रहने का कारण देते हैं।",
          "कक्षा-स्तर पर कमियों का नक्शा स्कूलों को नवीनीकरण का कारण देता है, केवल एक दिन का कार्यक्रम नहीं।"
        ]
      ],
      [
        "बाजार का आधार",
        [
          "2025 की यूपी बोर्ड हाईस्कूल और इंटरमीडिएट परीक्षाओं के लिए लगभग 54 लाख परीक्षार्थी पंजीकृत हुए।",
          "यूपी बोर्ड कक्षा 9 से 12 के मुख्य विषयों में एनसीईआरटी पाठ्यपुस्तकें इस्तेमाल करता है, इसलिए एक ही एनसीईआरटी कौशल नक्शा यूपी बोर्ड और सीबीएसई दोनों के काम आता है।",
          "27.0% स्कूली छात्र निजी कोचिंग लेते हैं (NSS CMS: शिक्षा 2025): मदद की माँग मौजूद है और उस पर पैसा खर्च होता है।"
        ]
      ],
      [
        "जोखिम और डिजाइन में उनका समाधान",
        [
          "बच्चों का डेटा (DPDP अधिनियम 2023): टेस्ट बिना लॉगिन के चलता है; संपर्क विवरण केवल अभिभावक या स्कूल की सत्यापन-योग्य सहमति से।",
          "प्रश्नों की गुणवत्ता: छपने से पहले हर प्रश्न की जाँच विषय शिक्षक करते हैं; गलत प्रश्न ब्रांड के लिए जोखिम हैं।",
          "प्रायोजक से टकराव: प्रायोजकों को केवल नाम और स्लॉट मिलता है, छात्रों का डेटा या परिणाम कभी नहीं।"
        ]
      ]
    ] as [string, string[]][],
    lakhUnit: "लाख",
    croreUnit: "करोड़",
    footer:
      "स्रोत: यूपी बोर्ड 2025 पंजीकरण, results.amarujala.com की रिपोर्ट के अनुसार; NSS CMS: शिक्षा 2025 (PIB, 26 अगस्त 2025)। आय के आँकड़े बदलने योग्य अनुमान हैं, पूर्वानुमान नहीं।"
  }
};

const KPI_COLORS = ["#38bdf8", "#34d399", "#fbbf24", "#a78bfa"];
const CTA_BADGES = ["badge badge-green", "badge badge-blue", "badge badge-warn"];

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const PANEL: React.CSSProperties = {
  background: "var(--surface-elevated)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "1rem"
};
const LIST: React.CSSProperties = { margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.9rem" };

function NumberField({
  id,
  label,
  value,
  onChange,
  step = 1,
  hint
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.3rem" }}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        style={{
          width: "100%",
          padding: "0.55rem 0.7rem",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          color: "var(--text)",
          fontSize: "0.95rem"
        }}
      />
      {hint && <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{hint}</div>}
    </div>
  );
}

export default function ParikshaSaathiPrototype() {
  const [lang, setLang] = useLanguage();
  const t = COPY[lang];
  const s = t.student;
  const r = t.revenue;
  // Indian units: below 1 crore in lakh, from 1 crore (100 lakh) upwards in crore.
  const lakh = (n: number) =>
    n >= 10000000
      ? `₹${(n / 10000000).toLocaleString("en-IN", { maximumFractionDigits: 2 })} ${t.croreUnit}`
      : `₹${(n / 100000).toLocaleString("en-IN", { maximumFractionDigits: 1 })} ${t.lakhUnit}`;

  const [tab, setTab] = useState<Tab>("student");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  // Revenue assumptions: every default is a pilot hypothesis, editable on screen.
  const [weeklyTakers, setWeeklyTakers] = useState(50000);
  const [weeks, setWeeks] = useState(30);
  const [sponsorFee, setSponsorFee] = useState(100000);
  const [schools, setSchools] = useState(200);
  const [studentsPerSchool, setStudentsPerSchool] = useState(300);
  const [schoolPrice, setSchoolPrice] = useState(100);
  const [parentConversion, setParentConversion] = useState(2);
  const [parentPrice, setParentPrice] = useState(99);

  const score = QUESTIONS.filter((q) => answers[q.id] === q.answer).length;
  const missed = QUESTIONS.filter((q) => answers[q.id] !== q.answer);
  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  const revenue = useMemo(() => {
    const sponsor = weeks * sponsorFee;
    const school = schools * studentsPerSchool * schoolPrice;
    const parent = weeklyTakers * (parentConversion / 100) * parentPrice;
    return { sponsor, school, parent, total: sponsor + school + parent };
  }, [weeks, sponsorFee, schools, studentsPerSchool, schoolPrice, weeklyTakers, parentConversion, parentPrice]);

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setStarted(false);
  };

  return (
    <div className="app-shell" lang={lang}>
      <header className="top-header">
        <div className="header-row">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
              <span className="brand-badge">{t.badges[0]}</span>
              <span className="badge badge-warn">{t.badges[1]}</span>
              <Link href="/aage-kya" className="badge badge-green" style={{ textDecoration: "none" }}>
                {lang === "en" ? "Newer concept: Aage Kya →" : "नया कॉन्सेप्ट: आगे क्या →"}
              </Link>
            </div>
            <h1 style={{ margin: "0.2rem 0 0.4rem 0", fontSize: "1.85rem", fontWeight: 800 }}>{t.title}</h1>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "920px", lineHeight: 1.55 }}>{t.subtitle}</p>
          </div>
          <div className="header-controls">
            <LanguageToggle lang={lang} onChange={setLang} />
            <Link href="/pariksha-saathi/justification" className="control-pill" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "var(--primary)", color: "#ffffff" }}>
              {t.whyLink}
            </Link>
            <Link href="/" className="control-pill" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              {t.backLink}
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

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <nav aria-label={t.tabsLabel} className="nav-tabs">
          {(["student", "revenue", "fit"] as Tab[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`nav-tab ${tab === key ? "active" : ""}`}
              aria-pressed={tab === key}
              onClick={() => setTab(key)}
            >
              {t.tabs[key]}
            </button>
          ))}
        </nav>

        {tab === "student" && (
          <section className="card" aria-label={t.tabs.student} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {!started && (
              <>
                <div style={{ ...PANEL, borderStyle: "dashed" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.printLabel}</div>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "0.6rem", flexWrap: "wrap" }}>
                    <div
                      aria-hidden="true"
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "8px",
                        background: "repeating-conic-gradient(var(--text) 0% 25%, var(--surface) 0% 50%) 0 0 / 18px 18px",
                        flexShrink: 0
                      }}
                    />
                    <div style={{ flex: "1 1 200px" }}>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>{s.boxTitle}</div>
                      <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{s.boxSub}</div>
                    </div>
                  </div>
                </div>

                <div style={PANEL}>
                  <span className="badge badge-warn">{s.sponsorBadge}</span>
                  <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.35rem" }}>{s.sponsorText}</div>
                </div>

                <button type="button" className="btn btn-primary" onClick={() => setStarted(true)} style={{ alignSelf: "flex-start" }}>
                  {s.start}
                </button>
              </>
            )}

            {started && !submitted && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                  <h2 style={{ margin: 0, fontSize: "1.2rem" }}>{s.quizTitle}</h2>
                  <span className="badge badge-blue">
                    {Object.keys(answers).length} / {QUESTIONS.length} {s.answered}
                  </span>
                </div>
                {QUESTIONS.map((q, qi) => {
                  const text = q[lang];
                  return (
                    <fieldset key={q.id} style={{ ...PANEL, margin: 0 }}>
                      <legend style={{ fontSize: "0.78rem", color: "var(--text-muted)", padding: "0 0.3rem" }}>
                        {s.questionWord} {qi + 1} · {text.chapter}
                      </legend>
                      <div style={{ fontWeight: 600, marginBottom: "0.6rem", lineHeight: 1.5 }}>{text.text}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.5rem" }}>
                        {text.options.map((opt, oi) => {
                          const selected = answers[q.id] === oi;
                          return (
                            <label
                              key={oi}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.6rem 0.75rem",
                                minHeight: "44px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                border: selected ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                                background: selected ? "var(--primary-light)" : "var(--surface)"
                              }}
                            >
                              <input type="radio" name={q.id} checked={selected} onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))} />
                              <span>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  );
                })}
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!allAnswered}
                  onClick={() => setSubmitted(true)}
                  style={{ alignSelf: "flex-start", opacity: allAnswered ? 1 : 0.5 }}
                >
                  {allAnswered ? s.submit : s.answerAll}
                </button>
              </>
            )}

            {submitted && (
              <>
                <div style={{ ...PANEL, borderColor: "var(--primary)" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{s.scoreLabel}</div>
                  <div style={{ fontSize: "2rem", fontWeight: 800 }}>
                    {score} / {QUESTIONS.length}
                  </div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{score === QUESTIONS.length ? s.perfect : s.notPerfect}</div>
                </div>

                <div className="table-wrap">
                  <table className="stack-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
                    <thead>
                      <tr style={{ background: "var(--surface-elevated)" }}>
                        {s.heads.map((h) => (
                          <th key={h} style={{ padding: "0.7rem" }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {QUESTIONS.map((q) => {
                        const ok = answers[q.id] === q.answer;
                        const text = q[lang];
                        return (
                          <tr key={q.id} style={{ borderBottom: "1px solid var(--border)" }}>
                            <td style={{ padding: "0.7rem", fontWeight: 600 }}>{text.chapter}</td>
                            <td data-label={s.labels[0]} style={{ padding: "0.7rem" }}>
                              <span className={ok ? "badge badge-green" : "badge badge-danger"}>{ok ? s.correct : s.review}</span>
                              {!ok && (
                                <span style={{ marginLeft: "0.4rem", color: "var(--text-muted)" }}>
                                  {s.correctAnswer} {text.options[q.answer]}
                                </span>
                              )}
                            </td>
                            <td data-label={s.labels[1]} style={{ padding: "0.7rem", color: "var(--text-secondary)" }}>
                              {ok ? s.noReview : text.gap}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>{s.note}</p>

                {missed.length > 0 && (
                  <div style={PANEL}>
                    <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>{s.stepsTitle}</div>
                    <ol style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      <li>{s.step1(missed[0][lang].gap)}</li>
                      <li>{s.step2(missed[0][lang].chapter)}</li>
                      <li>{s.step3}</li>
                    </ol>
                  </div>
                )}

                <div className="grid-3">
                  {s.ctas.map(([badge, title, body], i) => (
                    <div key={badge} style={PANEL}>
                      <span className={CTA_BADGES[i]}>{badge}</span>
                      <div style={{ fontWeight: 700, margin: "0.4rem 0" }}>
                        {title}
                        {i === 2 ? ` ${inr(parentPrice)}` : ""}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{body}</div>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>{s.demoNote}</p>
                <button type="button" className="btn" onClick={reset} style={{ alignSelf: "flex-start" }}>
                  {s.restart}
                </button>
              </>
            )}
          </section>
        )}

        {tab === "revenue" && (
          <section className="card" aria-label={t.tabs.revenue} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <h2 style={{ margin: "0 0 0.3rem 0", fontSize: "1.25rem" }}>{r.title}</h2>
              <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>{r.lead}</p>
            </div>

            <div className="grid-3">
              <div style={{ ...PANEL, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                <div style={{ fontWeight: 700 }}>{r.a}</div>
                <NumberField id="weeks" label={r.weeks} value={weeks} onChange={setWeeks} hint={r.weeksHint} />
                <NumberField id="sponsor-fee" label={r.sponsorFee} value={sponsorFee} onChange={setSponsorFee} step={5000} hint={r.sponsorFeeHint} />
                <div style={{ fontWeight: 800, color: "#34d399" }}>{lakh(revenue.sponsor)}</div>
              </div>
              <div style={{ ...PANEL, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                <div style={{ fontWeight: 700 }}>{r.b}</div>
                <NumberField id="schools" label={r.schools} value={schools} onChange={setSchools} />
                <NumberField id="students-per-school" label={r.studentsPerSchool} value={studentsPerSchool} onChange={setStudentsPerSchool} step={10} />
                <NumberField id="school-price" label={r.schoolPrice} value={schoolPrice} onChange={setSchoolPrice} step={10} />
                <div style={{ fontWeight: 800, color: "#34d399" }}>{lakh(revenue.school)}</div>
              </div>
              <div style={{ ...PANEL, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                <div style={{ fontWeight: 700 }}>{r.c}</div>
                <NumberField id="weekly-takers" label={r.weeklyTakers} value={weeklyTakers} onChange={setWeeklyTakers} step={5000} hint={r.weeklyTakersHint} />
                <NumberField id="parent-conversion" label={r.conversion} value={parentConversion} onChange={setParentConversion} step={0.5} />
                <NumberField id="parent-price" label={r.mockPrice} value={parentPrice} onChange={setParentPrice} step={10} />
                <div style={{ fontWeight: 800, color: "#34d399" }}>{lakh(revenue.parent)}</div>
              </div>
            </div>

            <div style={{ ...PANEL, borderColor: "var(--primary)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{r.totalLabel}</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800 }} data-testid="total-revenue">
                  {lakh(revenue.total)}
                </div>
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "460px", lineHeight: 1.55 }}>{r.totalNote}</div>
            </div>

            <div style={PANEL}>
              <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>{r.pilotTitle}</div>
              <ol style={LIST}>
                {r.pilot.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {tab === "fit" && (
          <section className="card" aria-label={t.tabs.fit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="grid-2">
              {t.fit.map(([heading, items]) => (
                <div key={heading} style={PANEL}>
                  <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>{heading}</div>
                  <ul style={LIST}>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer style={{ textAlign: "center", padding: "2rem 0", borderTop: "1px solid var(--border)", marginTop: "1.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
        {t.footer}
      </footer>
    </div>
  );
}
