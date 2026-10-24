"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./useLanguage";
import {
  BUDGETS,
  COURSES,
  DEMO_COLLEGES,
  DISTRICTS,
  EXAMS,
  INCOMES,
  INTERESTS,
  REACHES,
  SCHOLARSHIPS,
  SOURCES,
  STREAMS,
  findFakeUniversity,
  type Bi,
  type Budget,
  type College,
  type Course,
  type Income,
  type Interest,
  type Reach,
  type Stream
} from "./aageKyaData";
import type { LanguageMode } from "../types/curriculum";

// Concept prototype: "Aage Kya?" turns the board-results moment into a Hindi
// admission plan and consented enquiries that colleges pay for. Nothing is
// stored or sent; colleges and enquiries are fictional demo data.

type Tab = "student" | "college" | "revenue" | "platform";
type Step = 0 | 1 | 2 | 3 | 4;
type Scenario = "low" | "base" | "high" | "custom";

const DEMO_OTP = "2468";
const PARTNER_ID = "c2";
const TABS: Tab[] = ["student", "college", "revenue", "platform"];

const pick = (b: Bi, lang: LanguageMode) => b[lang];
const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

interface RevenueInputs {
  passed: number;
  reachPct: number;
  completePct: number;
  coveragePct: number;
  consentPct: number;
  perStudent: number;
  paidPct: number;
  price: number;
  bundles: number;
  bundlePrice: number;
  counselPct: number;
  counselPrice: number;
}

const PERCENT_FIELDS: (keyof RevenueInputs)[] = ["reachPct", "completePct", "coveragePct", "consentPct", "paidPct", "counselPct"];

const PRESETS: Record<Exclude<Scenario, "custom">, RevenueInputs> = {
  low: { passed: 2109000, reachPct: 3, completePct: 40, coveragePct: 25, consentPct: 15, perStudent: 2, paidPct: 60, price: 150, bundles: 25, bundlePrice: 75000, counselPct: 0.5, counselPrice: 299 },
  base: { passed: 2109000, reachPct: 8, completePct: 55, coveragePct: 40, consentPct: 25, perStudent: 2.5, paidPct: 70, price: 250, bundles: 60, bundlePrice: 120000, counselPct: 1, counselPrice: 299 },
  high: { passed: 2109000, reachPct: 15, completePct: 65, coveragePct: 70, consentPct: 35, perStudent: 3, paidPct: 80, price: 400, bundles: 150, bundlePrice: 200000, counselPct: 2, counselPrice: 299 }
};

interface Enquiry {
  id: string;
  when: Bi;
  who: string;
  district: Bi;
  profile: Bi;
  course: Bi;
}

const BASE_ENQUIRIES: Enquiry[] = [
  { id: "e1", when: { en: "Today, 10:42", hi: "आज, 10:42" }, who: "R*** K***", district: { en: "Kanpur Nagar", hi: "कानपुर नगर" }, profile: { en: "Science (Maths), 70 to 80%", hi: "विज्ञान (गणित), 70 से 80%" }, course: { en: "B.Tech", hi: "बी.टेक" } },
  { id: "e2", when: { en: "Today, 09:15", hi: "आज, 09:15" }, who: "S*** Y***", district: { en: "Kanpur Dehat", hi: "कानपुर देहात" }, profile: { en: "Commerce, 60 to 70%", hi: "वाणिज्य, 60 से 70%" }, course: { en: "BBA", hi: "बीबीए" } },
  { id: "e3", when: { en: "Yesterday, 18:30", hi: "कल, 18:30" }, who: "A*** P***", district: { en: "Unnao", hi: "उन्नाव" }, profile: { en: "Science (Biology), 80 to 90%", hi: "विज्ञान (जीव विज्ञान), 80 से 90%" }, course: { en: "B.Pharm", hi: "बी.फार्मा" } },
  { id: "e4", when: { en: "Yesterday, 12:05", hi: "कल, 12:05" }, who: "M*** S***", district: { en: "Kanpur Nagar", hi: "कानपुर नगर" }, profile: { en: "Science (Maths), 60 to 70%", hi: "विज्ञान (गणित), 60 से 70%" }, course: { en: "BCA", hi: "बीसीए" } }
];

const INITIAL_STATUSES: Record<string, string> = { e1: "new", e2: "called", e3: "visit", e4: "new", you: "new" };

const COPY = {
  en: {
    badge: "Concept prototype",
    independent: "Independent pitch, not affiliated with Amar Ujala",
    demoData: "Demo data: colleges and enquiries are fictional",
    title: "Aage Kya? (आगे क्या?)",
    lead:
      "On result day about 21 lakh UP Board Class 12 students pass, and each family asks the same question: what next? Aage Kya answers it in Hindi, on the results page they already open, and turns the answer into consented admission enquiries that colleges pay for.",
    planLink: "Strategy, roadmap and the 6 questions",
    kpiLabel: "Key numbers",
    tabsLabel: "Prototype sections",
    kpis: [
      { v: "25.99 lakh", l: "sat UP Board Class 12 in 2025; 81.15% passed", s: "UPMSP result, April 2025" },
      { v: "8,375", l: "colleges in UP, the most of any state", s: "AISHE 2021-22" },
      { v: "17%", l: "of India's print ad space bought by education, the largest sector", s: "TAM AdEx, Jan to Sep 2025" },
      { v: "37,000+", l: "partner schools already on the Amar Ujala olympiad (AUNO)", s: "amarujalaolympiad.com" }
    ],
    tabs: { student: "1. Student demo", college: "2. College dashboard", revenue: "3. Revenue model", platform: "4. One platform" } as Record<Tab, string>,
    phoneTitle: "results page",
    stepNames: ["Result", "Questions", "Your plan", "Consent", "Done"],
    resultTitle: "UP Board Class 12 result (demo)",
    resultName: "Demo student",
    passed: "Passed",
    resultCta: "Aage kya? See your plan in 2 minutes",
    resultNote: "Free. No login. Nothing is shared without consent.",
    qTitle: "Seven quick answers",
    qStream: "Your Class 12 stream",
    qMarks: "Your percentage",
    qInterest: "What interests you most?",
    qBudget: "Fees your family can manage",
    qIncome: "Family income a year (only to check scholarship eligibility)",
    qReach: "Where do you want to study?",
    qDistrict: "Home district",
    next: "Show my plan",
    back: "Back",
    planFor: (district: string) => `Your plan for ${district} and nearby`,
    coursesTitle: "Courses that fit you",
    examsTitle: "Entrance exams: what you can still do",
    stillOpen: "Still possible this year",
    nextYear: "Mostly closed by result day",
    examsNote: "Typical windows only. Always confirm dates on the official site.",
    official: "Official site",
    scholarTitle: "Scholarships you may qualify for",
    scholarNote: "Rules change every year. Confirm on the official portal before you apply.",
    scholarNone: "Ask each college about its own merit scholarship before paying fees.",
    collegesTitle: "Colleges that fit (demo)",
    collegesNote: "Order is by fit to your answers only. Colleges marked \"Paying partner\" pay for enquiries; payment never moves a college up the list.",
    paying: "Paying partner",
    fee: "Fee a year",
    distance: (km: number) => `${km} km from district headquarters`,
    ask: "Ask this college to call us",
    askFor: (name: string) => `Ask ${name} to call us`,
    noColleges: "No demo college fits these answers. Try a higher budget or \"Anywhere in UP\".",
    neetNote: "MBBS and BDS seats are allotted only through NEET counselling, so no college is listed for them here.",
    checkTitle: "Is this institution genuine? Check any name",
    checkPlaceholder: "Type a college or university name",
    checkBtn: "Check",
    checkFake: (name: string) => `Warning: "${name}" is on the UGC list of fake universities (February 2026). Its degrees are not valid. Do not pay any fee.`,
    checkOk: "Not found on the UGC fake-university list. That alone does not prove recognition: also check UGC, AICTE or the state university's affiliation list.",
    checkShort: "Type at least two distinctive words of the name, for example \"Bhartiya Shiksha Parishad\".",
    checkSource: "Source: UGC list of fake universities, February 2026: 32 in India, 4 in UP and 12 in Delhi.",
    toConsent: (n: number) => `Continue with ${n} college${n === 1 ? "" : "s"}`,
    pickOne: "Tick at least one college to get a call, or just save the plan.",
    saveOnly: "Just save my plan",
    consentTitle: "Consent",
    adultQ: "Is the student 18 or older?",
    yes: "Yes",
    no: "No, under 18",
    consentAdult: "The student gives consent with their own mobile number.",
    consentMinor: "A parent or guardian must give consent before any college sees the details. In the real product the parent's identity and age are also verified (for example through DigiLocker), as India's data protection rules require.",
    shares: "What the colleges will see",
    sharesList: ["Student's first name", "The mobile number below", "Stream and a marks band (for example 70 to 80%)", "District, and the course matched to each college"],
    notShared: "Never shared: exact marks, family income, roll number",
    goesTo: "Goes to",
    studentName: "Student's first name",
    phoneParent: "Parent's or guardian's mobile number",
    phoneStudent: "Student's mobile number",
    phoneHelp: "A 10-digit number starting with 6, 7, 8 or 9",
    sendOtp: "Send OTP",
    otpSent: (otp: string) => `Demo only: no SMS is sent. Use OTP ${otp}.`,
    otpLabel: "OTP",
    verify: "Verify",
    otpWrong: "That OTP does not match.",
    otpOk: "Number verified.",
    agreeParent: "I am the parent or guardian. I agree to share these details with the colleges listed above, only for admission calls. I can withdraw this at any time.",
    agreeAdult: "I am the student and I am 18 or older. I agree to share these details with the colleges listed above, only for admission calls. I can withdraw this at any time.",
    share: "Share and request calls",
    doneTitle: "Done. Colleges will call within 48 hours.",
    doneLead: (n: number) => `Your details went to ${n} college${n === 1 ? "" : "s"}. Each one has agreed to call within 48 hours, not to resell the number and to delete it if you withdraw.`,
    savedTitle: "Plan saved. No college will call.",
    savedLead: "You can come back to it, share it with family on WhatsApp, or request calls later.",
    doneProfile: "The plan is saved to one student profile: the same profile could later hold olympiad results and scholarship forms.",
    withdraw: "Withdraw consent",
    withdrawn: "Consent withdrawn. In the real product, colleges get a deletion request at once.",
    startOver: "Start over",
    seeDashboard: "See it on the college dashboard",
    whyTitle: "What is happening, and why",
    why: [
      { h: "1. The highest-intent moment", p: "The result page is where families already come, in Hindi, on a phone. Today it ends at the marksheet. Aage Kya starts there, with no cost of finding users." },
      { h: "2. A few quick answers, not a long form", p: "Stream, marks, interest, budget, income band, distance and district are enough to narrow courses, exams, scholarships and colleges. No caste or exact income is asked." },
      { h: "3. Useful before it is commercial", p: "Exam guidance, scholarship matching and the fake-university check are free and never sponsored. That is what earns trust for the paid part." },
      { h: "4. The right person consents", p: "An adult student consents for themselves. For a student under 18, India's data protection law needs verifiable consent from a parent, so the OTP goes to the parent." },
      { h: "5. Colleges pay for consented enquiries", p: "Not for clicks, ranking or data dumps. Each enquiry is one family that asked for a call, with consent on record." }
    ],
    collegeTitle: "Prerna Institute of Technology (fictional), admissions desk",
    collegeLead: "What a paying college sees. Every enquiry is consented, verified and limited to the fields the family agreed to share.",
    kpiEnq: "Enquiries this week",
    kpiConsent: "With recorded consent",
    kpiCalled: "Called so far",
    kpiBill: (price: string) => `Billed this week at ${price} each`,
    thWhen: "When",
    thWho: "Student",
    thDistrict: "District",
    thProfile: "Stream and marks",
    thCourse: "Course",
    thConsent: "Consent",
    thStatus: "Status",
    consentBadge: "OTP consent",
    status: { new: "New", called: "Called", visit: "Campus visit", admitted: "Admitted", no: "Not interested" },
    yours: "Just now",
    yoursHint: "Complete the student demo and tick Prerna Institute of Technology to see your own enquiry arrive here.",
    rulesTitle: "Rules every paying college accepts",
    rules: [
      "Passes a recognition check (UGC, AICTE or state affiliation) by the product team before going live; paying never affects it.",
      "Calls within 48 hours; slow responders are paused.",
      "No resale or sharing of numbers; deletion on withdrawal.",
      "Two upheld complaints and the college is removed for the season."
    ],
    bundleTitle: "Admission-season bundle, sold by the existing ad desk",
    bundle: [
      "District-edition print ads in the \"Aage Kya\" admission series",
      "A full college profile and the \"Paying partner\" label; the order stays by fit only",
      "Enquiries billed separately, per consented enquiry, with a monthly report"
    ],
    priceNote: "Price per enquiry is the biggest unknown. No public benchmark exists, so the first test with the ad desk is what colleges will pay.",
    revTitle: "Year-one revenue from one season of UP Board Class 12 only",
    revLead: "Every figure is an editable assumption except the pass count. Choose a scenario, then change any number.",
    scenLabel: "Scenario",
    scen: { low: "Low", base: "Base", high: "High", custom: "Custom" } as Record<Scenario, string>,
    inPassed: "UP Board Class 12 passed (2025)",
    inReach: "Open Aage Kya from the result (%)",
    inComplete: "Finish the plan (%)",
    inCoverage: "Live in districts with college listings (%)",
    inConsent: "Request calls with consent (%)",
    inPer: "Colleges chosen per family",
    inPaid: "Enquiries that go to paying colleges (%)",
    inPrice: "Price per enquiry (₹)",
    inBundles: "Colleges buying the season bundle",
    inBundlePrice: "Bundle price (₹)",
    inCounsel: "Paid 1-to-1 counselling call (% of plans)",
    inCounselPrice: "Counselling price (₹)",
    funnel: "Funnel",
    fPlans: "Plans finished",
    fFamilies: "Families requesting calls",
    fEnquiries: "Enquiries billed",
    rEnq: "Enquiry revenue",
    rBundle: "Bundle revenue",
    rCounsel: "Counselling revenue",
    rTotal: "Year-one revenue on these assumptions",
    notForecast: "An illustration, not a forecast. Excludes CBSE students, the Class 10 stream choice and the five other states where Amar Ujala publishes.",
    whySmall: "Why start this small",
    whySmallText: "Year one is a wedge: it proves the price per enquiry and the consent rate in pilot zones, before the same profile is extended to Class 10 results, more districts and other states.",
    mustBeTrue: "What has to be true",
    mustList: [
      "The results page can carry a prominent Aage Kya entry on result day.",
      "Colleges will pay per consented enquiry, at a price the ad desk tests before launch.",
      "Families will consent by OTP; if consent rates are low, the model shrinks to print bundles and profiles only."
    ],
    platTitle: "One student, one profile: the programmes Amar Ujala already runs",
    platLead: "The brief asks to bring existing programmes onto one platform. Today they sit on separate sites. Aage Kya is the missing last step, and the shared profile is the platform.",
    journey: [
      { when: "Class 1 to 10", h: "Amar Ujala National Olympiad (AUNO)", p: "School-level olympiad with an AI report for each student; the site cites 37,000+ partner schools.", url: SOURCES.auno },
      { when: "Class 9 to 12", h: "Atul Maheshwari Chhatravritti", p: "Amar Ujala Foundation's merit-cum-means scholarship exam.", url: SOURCES.amc },
      { when: "Board exam season", h: "Tanav Mukt Pariksha (stress-free exam) workshops", p: "School sessions with psychologists and officers, reported by INMA as 55 sessions across 10 zones.", url: SOURCES.stressFree },
      { when: "Result day", h: "results.amarujala.com", p: "Where students and parents check board results.", url: SOURCES.results },
      { when: "After Class 12", h: "Aage Kya: plan, scholarships, verified colleges", p: "The new step that turns the result into an admission decision and revenue.", url: "" }
    ],
    runsToday: "Running now",
    isNew: "New",
    sourceFor: (name: string) => `Source: ${name}`,
    gainsTitle: "What each side gets from one profile",
    gains: [
      { who: "Student", what: "Enters details once; the plan, olympiad results and scholarship forms stay in one place." },
      { who: "Parent", what: "One consent switch for every programme, and a clear record of who has their child's data." },
      { who: "School", what: "One dashboard for olympiad, workshops and where their Class 12 students went next." },
      { who: "Amar Ujala", what: "One consented audience across programmes, a year-round relationship instead of one-off events, and a new product for the ad desk to sell." }
    ],
    gainsWho: "Who",
    gainsWhat: "What they get",
    footer: "Independent concept prototype for a job application. Not affiliated with or endorsed by Amar Ujala. No data is stored or sent.",
    sourcesTitle: "Sources"
  },
  hi: {
    badge: "कॉन्सेप्ट प्रोटोटाइप",
    independent: "स्वतंत्र प्रस्ताव, अमर उजाला से संबद्ध नहीं",
    demoData: "डेमो डेटा: कॉलेज और पूछताछ काल्पनिक हैं",
    title: "आगे क्या? (Aage Kya?)",
    lead:
      "रिजल्ट के दिन यूपी बोर्ड कक्षा 12 के लगभग 21 लाख छात्र पास होते हैं, और हर परिवार एक ही सवाल पूछता है: आगे क्या? \"आगे क्या\" इसका जवाब हिंदी में, उसी रिजल्ट पेज पर देता है जिसे वे पहले से खोलते हैं, और इस जवाब को सहमति वाली प्रवेश पूछताछ में बदलता है, जिसके लिए कॉलेज भुगतान करते हैं।",
    planLink: "रणनीति, रोडमैप और 6 सवाल",
    kpiLabel: "मुख्य आँकड़े",
    tabsLabel: "प्रोटोटाइप के हिस्से",
    kpis: [
      { v: "25.99 लाख", l: "छात्र 2025 में यूपी बोर्ड कक्षा 12 की परीक्षा में बैठे; 81.15% पास", s: "यूपी बोर्ड परिणाम, अप्रैल 2025" },
      { v: "8,375", l: "कॉलेज यूपी में, किसी भी राज्य से अधिक", s: "AISHE 2021-22" },
      { v: "17%", l: "भारत के प्रिंट विज्ञापन स्थान में शिक्षा क्षेत्र का हिस्सा, सबसे बड़ा क्षेत्र", s: "TAM AdEx, जनवरी से सितंबर 2025" },
      { v: "37,000+", l: "पार्टनर स्कूल पहले से अमर उजाला ओलंपियाड (AUNO) से जुड़े", s: "amarujalaolympiad.com" }
    ],
    tabs: { student: "1. छात्र डेमो", college: "2. कॉलेज डैशबोर्ड", revenue: "3. आय मॉडल", platform: "4. एक प्लेटफॉर्म" } as Record<Tab, string>,
    phoneTitle: "रिजल्ट पेज",
    stepNames: ["रिजल्ट", "सवाल", "आपकी योजना", "सहमति", "पूरा"],
    resultTitle: "यूपी बोर्ड कक्षा 12 परिणाम (डेमो)",
    resultName: "डेमो छात्र",
    passed: "उत्तीर्ण",
    resultCta: "आगे क्या? 2 मिनट में अपनी योजना देखें",
    resultNote: "मुफ्त। लॉगिन नहीं। सहमति के बिना कुछ भी साझा नहीं होता।",
    qTitle: "सात आसान सवाल",
    qStream: "कक्षा 12 में आपका संकाय (स्ट्रीम)",
    qMarks: "आपका प्रतिशत",
    qInterest: "आपकी सबसे ज़्यादा रुचि किसमें है?",
    qBudget: "परिवार कितनी फीस दे सकता है",
    qIncome: "परिवार की सालाना आय (केवल छात्रवृत्ति की पात्रता देखने के लिए)",
    qReach: "आप कहाँ पढ़ना चाहते हैं?",
    qDistrict: "गृह जिला",
    next: "मेरी योजना दिखाएँ",
    back: "पीछे",
    planFor: (district: string) => `${district} और आसपास के लिए आपकी योजना`,
    coursesTitle: "आपके लिए उपयुक्त कोर्स",
    examsTitle: "प्रवेश परीक्षाएँ: अभी क्या कर सकते हैं",
    stillOpen: "इस वर्ष अभी संभव",
    nextYear: "रिजल्ट तक ज़्यादातर बंद",
    examsNote: "केवल सामान्य समय दिया गया है। तिथियाँ हमेशा आधिकारिक वेबसाइट पर जाँचें।",
    official: "आधिकारिक वेबसाइट",
    scholarTitle: "छात्रवृत्तियाँ जिनके लिए आप पात्र हो सकते हैं",
    scholarNote: "नियम हर वर्ष बदलते हैं। आवेदन से पहले आधिकारिक पोर्टल पर जाँचें।",
    scholarNone: "फीस देने से पहले हर कॉलेज से उसकी अपनी मेरिट छात्रवृत्ति के बारे में पूछें।",
    collegesTitle: "उपयुक्त कॉलेज (डेमो)",
    collegesNote: "क्रम केवल आपके जवाबों से मेल के आधार पर है। \"भुगतान करने वाला पार्टनर\" लिखे कॉलेज पूछताछ के लिए भुगतान करते हैं; भुगतान से कोई कॉलेज सूची में ऊपर नहीं आता।",
    paying: "भुगतान करने वाला पार्टनर",
    fee: "सालाना फीस",
    distance: (km: number) => `जिला मुख्यालय से ${km} किमी`,
    ask: "यह कॉलेज हमें कॉल करे",
    askFor: (name: string) => `${name} हमें कॉल करे`,
    noColleges: "इन जवाबों पर कोई डेमो कॉलेज उपयुक्त नहीं है। अधिक बजट या \"यूपी में कहीं भी\" चुनकर देखें।",
    neetNote: "एमबीबीएस और बीडीएस की सीटें केवल NEET काउंसलिंग से मिलती हैं, इसलिए उनके लिए यहाँ कोई कॉलेज नहीं दिखाया गया है।",
    checkTitle: "क्या यह संस्थान असली है? कोई भी नाम जाँचें",
    checkPlaceholder: "कॉलेज या विश्वविद्यालय का नाम लिखें",
    checkBtn: "जाँचें",
    checkFake: (name: string) => `चेतावनी: "${name}" यूजीसी की फर्जी विश्वविद्यालयों की सूची (फरवरी 2026) में है। इसकी डिग्री मान्य नहीं है। कोई फीस न दें।`,
    checkOk: "यूजीसी की फर्जी विश्वविद्यालयों की सूची में नहीं मिला। केवल इससे मान्यता साबित नहीं होती: यूजीसी, AICTE या राज्य विश्वविद्यालय की संबद्धता सूची भी देखें।",
    checkShort: "नाम के कम से कम दो खास शब्द लिखें, जैसे \"भारतीय शिक्षा परिषद\"।",
    checkSource: "स्रोत: यूजीसी की फर्जी विश्वविद्यालयों की सूची, फरवरी 2026: भारत में 32, जिनमें 4 यूपी में और 12 दिल्ली में।",
    toConsent: (n: number) => `${n} कॉलेज के साथ आगे बढ़ें`,
    pickOne: "कॉल पाने के लिए कम से कम एक कॉलेज चुनें, या केवल योजना सहेजें।",
    saveOnly: "केवल मेरी योजना सहेजें",
    consentTitle: "सहमति",
    adultQ: "क्या छात्र की उम्र 18 वर्ष या उससे अधिक है?",
    yes: "हाँ",
    no: "नहीं, 18 से कम",
    consentAdult: "छात्र अपने मोबाइल नंबर से खुद सहमति देता/देती है।",
    consentMinor: "किसी भी कॉलेज को जानकारी दिखने से पहले माता-पिता या अभिभावक की सहमति ज़रूरी है। असली प्रोडक्ट में अभिभावक की पहचान और उम्र की भी पुष्टि होती है (जैसे डिजिलॉकर से), जैसा भारत के डेटा संरक्षण नियम माँगते हैं।",
    shares: "कॉलेज क्या देखेंगे",
    sharesList: ["छात्र का पहला नाम", "नीचे दिया गया मोबाइल नंबर", "संकाय और अंकों का दायरा (जैसे 70 से 80%)", "जिला, और हर कॉलेज से मेल खाता कोर्स"],
    notShared: "कभी साझा नहीं होगा: सटीक अंक, परिवार की आय, रोल नंबर",
    goesTo: "किसे जाएगी",
    studentName: "छात्र का पहला नाम",
    phoneParent: "माता-पिता या अभिभावक का मोबाइल नंबर",
    phoneStudent: "छात्र का मोबाइल नंबर",
    phoneHelp: "10 अंकों का नंबर, जो 6, 7, 8 या 9 से शुरू हो",
    sendOtp: "OTP भेजें",
    otpSent: (otp: string) => `केवल डेमो: कोई SMS नहीं भेजा जाता। OTP ${otp} डालें।`,
    otpLabel: "OTP",
    verify: "पुष्टि करें",
    otpWrong: "यह OTP मेल नहीं खाता।",
    otpOk: "नंबर सत्यापित हुआ।",
    agreeParent: "मैं माता-पिता या अभिभावक हूँ। मैं ये जानकारी ऊपर दिए कॉलेजों के साथ, केवल प्रवेश से जुड़ी कॉल के लिए, साझा करने की सहमति देता/देती हूँ। मैं इसे कभी भी वापस ले सकता/सकती हूँ।",
    agreeAdult: "मैं छात्र हूँ और मेरी उम्र 18 वर्ष या उससे अधिक है। मैं ये जानकारी ऊपर दिए कॉलेजों के साथ, केवल प्रवेश से जुड़ी कॉल के लिए, साझा करने की सहमति देता/देती हूँ। मैं इसे कभी भी वापस ले सकता/सकती हूँ।",
    share: "साझा करें और कॉल माँगें",
    doneTitle: "हो गया। कॉलेज 48 घंटे में कॉल करेंगे।",
    doneLead: (n: number) => `आपकी जानकारी ${n} कॉलेज को भेजी गई। हर कॉलेज ने 48 घंटे में कॉल करने, नंबर आगे न बेचने और सहमति वापस लेने पर उसे मिटाने का वादा किया है।`,
    savedTitle: "योजना सहेज ली गई। कोई कॉलेज कॉल नहीं करेगा।",
    savedLead: "आप इसे बाद में देख सकते हैं, परिवार के साथ व्हाट्सऐप पर साझा कर सकते हैं, या बाद में कॉल माँग सकते हैं।",
    doneProfile: "योजना एक छात्र प्रोफाइल में सहेजी गई है: आगे इसी प्रोफाइल में ओलंपियाड के परिणाम और छात्रवृत्ति के फॉर्म भी रह सकते हैं।",
    withdraw: "सहमति वापस लें",
    withdrawn: "सहमति वापस ले ली गई। असली प्रोडक्ट में कॉलेजों को तुरंत डेटा मिटाने का अनुरोध जाता है।",
    startOver: "फिर से शुरू करें",
    seeDashboard: "कॉलेज डैशबोर्ड पर देखें",
    whyTitle: "क्या हो रहा है, और क्यों",
    why: [
      { h: "1. सबसे ज़्यादा ज़रूरत का पल", p: "रिजल्ट पेज पर परिवार पहले से आते हैं, हिंदी में, फोन पर। आज यह मार्कशीट पर खत्म हो जाता है। \"आगे क्या\" वहीं से शुरू होता है, और उपयोगकर्ता जुटाने का कोई खर्च नहीं।" },
      { h: "2. लंबा फॉर्म नहीं, कुछ आसान सवाल", p: "संकाय, अंक, रुचि, बजट, आय का दायरा, दूरी और जिला, इतने से कोर्स, परीक्षाएँ, छात्रवृत्तियाँ और कॉलेज छँट जाते हैं। जाति या सटीक आय नहीं पूछी जाती।" },
      { h: "3. पहले उपयोगी, फिर व्यावसायिक", p: "परीक्षाओं की जानकारी, छात्रवृत्ति की पात्रता और फर्जी विश्वविद्यालय की जाँच मुफ्त है और कभी प्रायोजित नहीं होती। यही सशुल्क हिस्से के लिए भरोसा बनाता है।" },
      { h: "4. सही व्यक्ति सहमति देता है", p: "18 वर्ष या उससे अधिक का छात्र खुद सहमति देता है। 18 से कम उम्र के छात्र के लिए भारत का डेटा संरक्षण कानून अभिभावक की सत्यापित सहमति माँगता है, इसलिए OTP अभिभावक को जाता है।" },
      { h: "5. कॉलेज सहमति वाली पूछताछ के लिए भुगतान करते हैं", p: "क्लिक, रैंकिंग या डेटा के ढेर के लिए नहीं। हर पूछताछ एक ऐसा परिवार है जिसने कॉल माँगी, और उसकी सहमति दर्ज है।" }
    ],
    collegeTitle: "प्रेरणा इंस्टीट्यूट ऑफ टेक्नोलॉजी (काल्पनिक), प्रवेश डेस्क",
    collegeLead: "भुगतान करने वाला कॉलेज क्या देखता है। हर पूछताछ सहमति वाली और सत्यापित है, और उतनी ही जानकारी तक सीमित है जितनी साझा करने की सहमति परिवार ने दी।",
    kpiEnq: "इस सप्ताह की पूछताछ",
    kpiConsent: "दर्ज सहमति के साथ",
    kpiCalled: "अब तक कॉल की गईं",
    kpiBill: (price: string) => `इस सप्ताह का बिल, ${price} प्रति पूछताछ`,
    thWhen: "कब",
    thWho: "छात्र",
    thDistrict: "जिला",
    thProfile: "संकाय और अंक",
    thCourse: "कोर्स",
    thConsent: "सहमति",
    thStatus: "स्थिति",
    consentBadge: "OTP सहमति",
    status: { new: "नई", called: "कॉल हुई", visit: "कैंपस विज़िट", admitted: "प्रवेश हुआ", no: "रुचि नहीं" },
    yours: "अभी",
    yoursHint: "छात्र डेमो पूरा करें और प्रेरणा इंस्टीट्यूट ऑफ टेक्नोलॉजी चुनें, तो आपकी अपनी पूछताछ यहाँ दिखेगी।",
    rulesTitle: "हर भुगतान करने वाला कॉलेज ये नियम मानता है",
    rules: [
      "लाइव होने से पहले प्रोडक्ट टीम द्वारा मान्यता की जाँच (यूजीसी, AICTE या राज्य संबद्धता); भुगतान का इस पर कोई असर नहीं।",
      "48 घंटे में कॉल करनी होगी; देर करने वाले कॉलेज रोक दिए जाते हैं।",
      "नंबर बेचना या आगे देना मना है; सहमति वापस लेने पर डेटा मिटाना होगा।",
      "दो सही पाई गई शिकायतों पर कॉलेज पूरे सीज़न के लिए हटा दिया जाता है।"
    ],
    bundleTitle: "प्रवेश सीज़न का पैकेज, मौजूदा विज्ञापन डेस्क के ज़रिए",
    bundle: [
      "\"आगे क्या\" प्रवेश शृंखला में जिला संस्करणों के प्रिंट विज्ञापन",
      "कॉलेज की पूरी प्रोफाइल और \"भुगतान करने वाला पार्टनर\" लेबल; क्रम केवल उपयुक्तता से",
      "पूछताछ का बिल अलग से, प्रति सहमति वाली पूछताछ, मासिक रिपोर्ट के साथ"
    ],
    priceNote: "प्रति पूछताछ कीमत सबसे बड़ा अनजाना पहलू है। कोई सार्वजनिक मानक नहीं है, इसलिए विज्ञापन डेस्क के साथ पहला परीक्षण यही होगा कि कॉलेज कितना देंगे।",
    revTitle: "केवल यूपी बोर्ड कक्षा 12 के एक सीज़न से पहले साल की आय",
    revLead: "पास छात्रों की संख्या के अलावा हर आँकड़ा बदला जा सकने वाला अनुमान है। कोई परिदृश्य चुनें, फिर कोई भी संख्या बदलें।",
    scenLabel: "परिदृश्य",
    scen: { low: "कम", base: "आधार", high: "अधिक", custom: "बदला हुआ" } as Record<Scenario, string>,
    inPassed: "यूपी बोर्ड कक्षा 12 में पास (2025)",
    inReach: "रिजल्ट से \"आगे क्या\" खोलने वाले (%)",
    inComplete: "योजना पूरी करने वाले (%)",
    inCoverage: "कॉलेज सूची वाले जिलों में रहने वाले (%)",
    inConsent: "सहमति के साथ कॉल माँगने वाले (%)",
    inPer: "हर परिवार द्वारा चुने गए कॉलेज",
    inPaid: "भुगतान करने वाले कॉलेजों को जाने वाली पूछताछ (%)",
    inPrice: "प्रति पूछताछ कीमत (₹)",
    inBundles: "सीज़न पैकेज खरीदने वाले कॉलेज",
    inBundlePrice: "पैकेज की कीमत (₹)",
    inCounsel: "सशुल्क व्यक्तिगत काउंसलिंग कॉल (% योजनाओं का)",
    inCounselPrice: "काउंसलिंग की कीमत (₹)",
    funnel: "फनल",
    fPlans: "पूरी हुई योजनाएँ",
    fFamilies: "कॉल माँगने वाले परिवार",
    fEnquiries: "बिल हुई पूछताछ",
    rEnq: "पूछताछ से आय",
    rBundle: "पैकेज से आय",
    rCounsel: "काउंसलिंग से आय",
    rTotal: "इन अनुमानों पर पहले साल की आय",
    notForecast: "यह एक उदाहरण है, पूर्वानुमान नहीं। इसमें सीबीएसई छात्र, कक्षा 10 के बाद संकाय का चुनाव और वे पाँच अन्य राज्य शामिल नहीं हैं जहाँ अमर उजाला छपता है।",
    whySmall: "इतनी छोटी शुरुआत क्यों",
    whySmallText: "पहला साल एक शुरुआती कदम है: यह पायलट ज़ोन में प्रति पूछताछ कीमत और सहमति की दर साबित करता है, उसके बाद यही प्रोफाइल कक्षा 10 के रिजल्ट, और जिलों और दूसरे राज्यों तक बढ़ती है।",
    mustBeTrue: "क्या सच होना चाहिए",
    mustList: [
      "रिजल्ट के दिन रिजल्ट पेज पर \"आगे क्या\" का प्रमुख शुरुआती बिंदु दिखाया जा सके।",
      "कॉलेज सहमति वाली हर पूछताछ के लिए भुगतान करें, उस कीमत पर जिसे विज्ञापन डेस्क लॉन्च से पहले परखे।",
      "परिवार OTP से सहमति दें; सहमति की दर कम हो तो मॉडल केवल प्रिंट पैकेज और प्रोफाइल तक सिमट जाएगा।"
    ],
    platTitle: "एक छात्र, एक प्रोफाइल: अमर उजाला के पहले से चल रहे कार्यक्रम",
    platLead: "भर्ती की सूचना कहती है कि मौजूदा कार्यक्रमों को एक प्लेटफॉर्म पर लाना है। आज वे अलग-अलग वेबसाइटों पर हैं। \"आगे क्या\" छूटा हुआ आखिरी कदम है, और साझा प्रोफाइल ही प्लेटफॉर्म है।",
    journey: [
      { when: "कक्षा 1 से 10", h: "अमर उजाला नेशनल ओलंपियाड (AUNO)", p: "हर छात्र के लिए एआई रिपोर्ट वाला स्कूल-स्तरीय ओलंपियाड; वेबसाइट 37,000+ पार्टनर स्कूल बताती है।", url: SOURCES.auno },
      { when: "कक्षा 9 से 12", h: "अतुल माहेश्वरी छात्रवृत्ति", p: "अमर उजाला फाउंडेशन की मेरिट और आर्थिक ज़रूरत पर आधारित छात्रवृत्ति परीक्षा।", url: SOURCES.amc },
      { when: "बोर्ड परीक्षा का समय", h: "तनावमुक्त परीक्षा कार्यशालाएँ", p: "मनोवैज्ञानिकों और अधिकारियों के साथ स्कूल सत्र; INMA के अनुसार 10 ज़ोन में 55 सत्र।", url: SOURCES.stressFree },
      { when: "रिजल्ट का दिन", h: "results.amarujala.com", p: "जहाँ छात्र और अभिभावक बोर्ड परिणाम देखते हैं।", url: SOURCES.results },
      { when: "कक्षा 12 के बाद", h: "आगे क्या: योजना, छात्रवृत्तियाँ, सत्यापित कॉलेज", p: "नया कदम, जो रिजल्ट को प्रवेश के फैसले और आय में बदलता है।", url: "" }
    ],
    runsToday: "अभी जारी",
    isNew: "नया",
    sourceFor: (name: string) => `स्रोत: ${name}`,
    gainsTitle: "एक प्रोफाइल से हर पक्ष को क्या मिलता है",
    gains: [
      { who: "छात्र", what: "जानकारी एक बार भरनी होती है; योजना, ओलंपियाड के परिणाम और छात्रवृत्ति के फॉर्म एक ही जगह रहते हैं।" },
      { who: "अभिभावक", what: "हर कार्यक्रम के लिए एक ही सहमति का बटन, और साफ रिकॉर्ड कि बच्चे का डेटा किसके पास है।" },
      { who: "स्कूल", what: "ओलंपियाड, कार्यशालाओं और कक्षा 12 के बाद छात्र कहाँ गए, सबके लिए एक डैशबोर्ड।" },
      { who: "अमर उजाला", what: "सभी कार्यक्रमों में सहमति वाला एक ही दर्शक वर्ग, एक बार के आयोजनों की जगह साल भर का रिश्ता, और विज्ञापन डेस्क के लिए बेचने को एक नया प्रोडक्ट।" }
    ],
    gainsWho: "कौन",
    gainsWhat: "उन्हें क्या मिलता है",
    footer: "नौकरी के आवेदन के लिए स्वतंत्र कॉन्सेप्ट प्रोटोटाइप। अमर उजाला से संबद्ध या समर्थित नहीं। कोई डेटा सहेजा या भेजा नहीं जाता।",
    sourcesTitle: "स्रोत"
  }
};

const SOURCE_LIST: { label: string; url: string }[] = [
  { label: "UP Board Class 12 result 2025 (Careers360)", url: SOURCES.upBoard2025 },
  { label: "UP Board results 2025 (IANS)", url: SOURCES.upBoardIans },
  { label: "AISHE 2021-22: UP has the most colleges (Careers360 / PTI)", url: SOURCES.aishe },
  { label: "TAM AdEx Jan to Sep 2025: education 17% of print ad space (Storyboard18)", url: SOURCES.tam2025 },
  { label: "Amar Ujala National Olympiad (AUNO)", url: SOURCES.auno },
  { label: "UGC list of fake universities (Feb 2026)", url: SOURCES.ugcFake },
  { label: "UP scholarship portal", url: SOURCES.upScholarship },
  { label: "National Scholarship Portal", url: SOURCES.nsp }
];

function marksBand(m: number, lang: LanguageMode) {
  const lo = Math.max(30, Math.floor(m / 10) * 10);
  const hi = Math.min(100, lo + 10);
  return lang === "en" ? `${lo} to ${hi}%` : `${lo} से ${hi}%`;
}

function money(n: number, lang: LanguageMode) {
  if (n >= 10000000) {
    const v = (n / 10000000).toLocaleString("en-IN", { maximumFractionDigits: 2 });
    return lang === "en" ? `₹${v} crore` : `₹${v} करोड़`;
  }
  const v = (n / 100000).toLocaleString("en-IN", { maximumFractionDigits: 1 });
  return lang === "en" ? `₹${v} lakh` : `₹${v} लाख`;
}

function Chips<T extends string>({
  name,
  options,
  value,
  onChange,
  lang
}: {
  name: string;
  options: { id: T; label: Bi }[];
  value: T | "";
  onChange: (v: T) => void;
  lang: LanguageMode;
}) {
  return (
    <div className="ak-chips">
      {options.map((o) => (
        <label className="ak-chip" key={o.id}>
          <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} />
          <span>{pick(o.label, lang)}</span>
        </label>
      ))}
    </div>
  );
}

const ADULT_OPTIONS: { id: "yes" | "no"; label: Bi }[] = [
  { id: "yes", label: { en: "Yes", hi: "हाँ" } },
  { id: "no", label: { en: "No, under 18", hi: "नहीं, 18 से कम" } }
];

export default function AageKyaPrototype() {
  const [lang, setLang] = useLanguage();
  const t = COPY[lang];
  const [tab, setTab] = useState<Tab>("student");

  // Student flow state
  const [step, setStep] = useState<Step>(0);
  const [stream, setStream] = useState<Stream>("pcm");
  const [marks, setMarks] = useState(72);
  const [interest, setInterest] = useState<Interest>("tech");
  const [budget, setBudget] = useState<Budget>("mid");
  const [income, setIncome] = useState<Income>("upto45");
  const [reach, setReach] = useState<Reach>("district");
  const [districtIdx, setDistrictIdx] = useState(0);
  const [chosen, setChosen] = useState<string[]>([]);
  const [checkText, setCheckText] = useState("");
  const [checkResult, setCheckResult] = useState<"" | "fake" | "ok" | "short">("");
  const [checkMatch, setCheckMatch] = useState("");
  const [adult, setAdult] = useState<"" | "yes" | "no">("");
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpState, setOtpState] = useState<"" | "ok" | "wrong">("");
  const [agree, setAgree] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  // College dashboard state
  const [statuses, setStatuses] = useState<Record<string, string>>(INITIAL_STATUSES);

  // Revenue state
  const [scenario, setScenario] = useState<Scenario>("base");
  const [rev, setRev] = useState<RevenueInputs>(PRESETS.base);

  // Move focus to the new step's heading so keyboard and screen-reader users
  // land on the new content (skipped on first render).
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepHeading.current?.focus();
  }, [step]);

  const district = DISTRICTS[districtIdx];
  const budgetMax = BUDGETS.find((b) => b.id === budget)?.max ?? Infinity;

  const plan = useMemo(() => {
    let courses = COURSES.filter((c) => c.streams.includes(stream) && c.interests.includes(interest));
    if (courses.length === 0) courses = COURSES.filter((c) => c.streams.includes(stream) && c.interests.includes("unsure"));
    courses = courses.slice(0, 4);
    const courseIds = new Set(courses.map((c) => c.id));
    const examIds = Array.from(new Set(courses.flatMap((c) => c.exams)));
    const scholarships = SCHOLARSHIPS.filter((s) => s.fits(income, marks));
    // One list, ordered by fit only. Paying status is a label, never a boost.
    const colleges = DEMO_COLLEGES.map((c) => ({ c, match: c.courses.filter((id) => courseIds.has(id)).length }))
      .filter(({ c, match }) => match > 0 && c.fee <= budgetMax && (reach === "state" || c.km <= 15))
      .sort((a, b) => b.match - a.match || a.c.fee - b.c.fee || a.c.km - b.c.km)
      .map(({ c }) => c);
    return { courses, examIds, scholarships, colleges, hasMbbs: courseIds.has("mbbs") };
  }, [stream, interest, income, marks, budgetMax, reach]);

  // Drop ticks for colleges that are no longer in the plan, so they cannot
  // reappear later.
  const visibleKey = plan.colleges.map((c) => c.id).join(",");
  useEffect(() => {
    const visible = new Set(visibleKey.split(","));
    setChosen((prev) => (prev.every((id) => visible.has(id)) ? prev : prev.filter((id) => visible.has(id))));
  }, [visibleKey]);

  const courseFor = (c: College): Course | undefined => plan.courses.find((x) => c.courses.includes(x.id));
  const chosenColleges = plan.colleges.filter((c) => chosen.includes(c.id));
  const phoneValid = /^[6-9]\d{9}$/.test(phone);
  const shared = step === 4 && !savedOnly && !withdrawn;
  const partner = chosenColleges.find((c) => c.id === PARTNER_ID);
  const sentToPartner = shared && Boolean(partner);

  const resetConsent = () => {
    setOtpSent(false);
    setOtp("");
    setOtpState("");
    setAgree(false);
  };

  // Any change to who receives the details voids an earlier consent.
  const toggleCollege = (id: string) => {
    setChosen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setAgree(false);
  };

  const runCheck = () => {
    const hit = findFakeUniversity(checkText);
    if (hit) {
      setCheckMatch(`${lang === "hi" && hit.hi ? hit.hi : hit.name}, ${hit.place} (${hit.state})`);
      setCheckResult("fake");
      return;
    }
    const words = checkText.trim().split(/\s+/).filter((w) => w.length > 1);
    setCheckResult(words.length < 2 ? "short" : "ok");
  };

  const reset = () => {
    setStep(0);
    setChosen([]);
    setAdult("");
    setStudentName("");
    setPhone("");
    resetConsent();
    setSavedOnly(false);
    setWithdrawn(false);
    setCheckText("");
    setCheckResult("");
    setStatuses(INITIAL_STATUSES);
  };

  const verifyOtp = () => setOtpState(otp === DEMO_OTP ? "ok" : "wrong");

  const r = useMemo(() => {
    const plans = rev.passed * (rev.reachPct / 100) * (rev.completePct / 100);
    const families = plans * (rev.coveragePct / 100) * (rev.consentPct / 100);
    const enquiries = families * rev.perStudent * (rev.paidPct / 100);
    const enqRev = enquiries * rev.price;
    const bundleRev = rev.bundles * rev.bundlePrice;
    const counselRev = plans * (rev.counselPct / 100) * rev.counselPrice;
    return { plans, families, enquiries, enqRev, bundleRev, counselRev, total: enqRev + bundleRev + counselRev };
  }, [rev]);

  const setPreset = (s: Exclude<Scenario, "custom">) => {
    setScenario(s);
    setRev(PRESETS[s]);
  };
  const setField = (k: keyof RevenueInputs, v: string) => {
    let n = Number(v);
    if (!Number.isFinite(n) || n < 0) n = 0;
    if (PERCENT_FIELDS.includes(k)) n = Math.min(100, n);
    setScenario("custom");
    setRev((prev) => ({ ...prev, [k]: n }));
  };

  const revFields: { k: keyof RevenueInputs; label: string; step: number }[] = [
    { k: "passed", label: t.inPassed, step: 1000 },
    { k: "reachPct", label: t.inReach, step: 1 },
    { k: "completePct", label: t.inComplete, step: 1 },
    { k: "coveragePct", label: t.inCoverage, step: 5 },
    { k: "consentPct", label: t.inConsent, step: 1 },
    { k: "perStudent", label: t.inPer, step: 0.5 },
    { k: "paidPct", label: t.inPaid, step: 5 },
    { k: "price", label: t.inPrice, step: 10 },
    { k: "bundles", label: t.inBundles, step: 5 },
    { k: "bundlePrice", label: t.inBundlePrice, step: 5000 },
    { k: "counselPct", label: t.inCounsel, step: 0.5 },
    { k: "counselPrice", label: t.inCounselPrice, step: 10 }
  ];

  const streamLabel = STREAMS.find((s) => s.id === stream)!.label;
  const enquiries: (Enquiry & { mine?: boolean })[] = [
    ...(sentToPartner && partner
      ? [
          {
            id: "you",
            when: { en: t.yours, hi: t.yours },
            who: studentName.trim() ? `${studentName.trim().slice(0, 1).toUpperCase()}***` : "D***",
            district,
            profile: { en: `${streamLabel.en}, ${marksBand(marks, "en")}`, hi: `${streamLabel.hi}, ${marksBand(marks, "hi")}` },
            course: courseFor(partner)?.name ?? { en: "-", hi: "-" },
            mine: true
          }
        ]
      : []),
    ...BASE_ENQUIRIES
  ];
  const calledCount = enquiries.filter((e) => (statuses[e.id] ?? "new") !== "new").length;

  const onTabKey = (e: React.KeyboardEvent) => {
    const i = TABS.indexOf(tab);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setTab(TABS[next]);
    document.getElementById(`tab-${TABS[next]}`)?.focus();
  };

  const collegeCard = (c: College) => {
    const name = pick(c.name, lang);
    return (
      <li className="ak-item" key={c.id}>
        <div className="ak-item-head">
          <strong>{name}</strong>
          <span className="ak-row" style={{ gap: "0.3rem" }}>
            {c.paying && <span className="ak-tag ak-tag-amber">{t.paying}</span>}
            <span className="ak-tag">{pick(c.kind, lang)}</span>
          </span>
        </div>
        <p>✓ {pick(c.recognition, lang)}</p>
        <p>
          {t.fee}: <strong className="ak-num">{inr(c.fee)}</strong> · {t.distance(c.km)}
        </p>
        <p>
          {c.courses
            .map((id) => COURSES.find((x) => x.id === id))
            .filter((x): x is Course => Boolean(x))
            .map((x) => pick(x.name, lang))
            .join(", ")}
        </p>
        <label className="ak-check" style={{ marginTop: "0.5rem" }}>
          <input type="checkbox" checked={chosen.includes(c.id)} onChange={() => toggleCollege(c.id)} aria-label={t.askFor(name)} />
          <span aria-hidden="true">{t.ask}</span>
        </label>
      </li>
    );
  };

  const stepTitle = (text: string) => (
    <h2 ref={stepHeading} tabIndex={-1} style={{ fontSize: "1.15rem", margin: "0 0 0.25rem", outline: "none" }}>
      {text}
    </h2>
  );

  return (
    <div className="ak-page" lang={lang}>
      <div className="ak-wrap">
        <div className="ak-topbar">
          <div className="ak-tags">
            <span className="ak-tag ak-tag-brand">{t.badge}</span>
            <span className="ak-tag ak-tag-amber">{t.independent}</span>
          </div>
          <LanguageToggle lang={lang} onChange={setLang} className="ak-lang" />
        </div>

        <header className="ak-hero">
          <h1>{t.title}</h1>
          <p className="ak-lead">{t.lead}</p>
          <div className="ak-row">
            <Link className="ak-btn" href="/aage-kya/plan">
              {t.planLink} →
            </Link>
            <span className="ak-tag">{t.demoData}</span>
          </div>
        </header>

        <section className="ak-kpis" aria-label={t.kpiLabel}>
          {t.kpis.map((k) => (
            <div className="ak-kpi" key={k.v}>
              <div className="ak-kpi-value">{k.v}</div>
              <div className="ak-kpi-label">{k.l}</div>
              <div className="ak-kpi-src">{k.s}</div>
            </div>
          ))}
        </section>

        <div className="ak-tabs" role="tablist" aria-label={t.tabsLabel} onKeyDown={onTabKey}>
          {TABS.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={tab === id}
              aria-controls={tab === id ? `panel-${id}` : undefined}
              tabIndex={tab === id ? 0 : -1}
              className="ak-tab"
              onClick={() => setTab(id)}
            >
              {t.tabs[id]}
            </button>
          ))}
        </div>

        {tab === "student" && (
          <section id="panel-student" role="tabpanel" aria-labelledby="tab-student" className="ak-split">
            <div className="ak-phone">
              <div className="ak-phone-bar">
                <span>{t.phoneTitle}</span>
                <span>
                  {step + 1} / 5 · {t.stepNames[step]}
                </span>
              </div>
              <div className="ak-steps" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className={i <= step ? "on" : ""} />
                ))}
              </div>

              {step === 0 && (
                <div>
                  <div className="ak-result">
                    <h2 style={{ fontSize: "0.85rem", fontWeight: 400, opacity: 0.9, margin: 0 }}>{t.resultTitle}</h2>
                    <div style={{ fontWeight: 700, marginTop: "0.25rem" }}>{t.resultName}</div>
                    <div className="ak-row" style={{ justifyContent: "space-between", marginTop: "0.5rem" }}>
                      <span className="ak-big ak-num">{marks}%</span>
                      <span className="ak-tag" style={{ background: "#fff", color: "#0b4a3e" }}>
                        {t.passed}
                      </span>
                    </div>
                  </div>
                  <button type="button" className="ak-btn ak-btn-block" style={{ marginTop: "0.9rem" }} onClick={() => setStep(1)}>
                    {t.resultCta}
                  </button>
                  <p className="ak-muted" style={{ marginTop: "0.5rem" }}>
                    {t.resultNote}
                  </p>
                </div>
              )}

              {step === 1 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(2);
                  }}
                >
                  {stepTitle(t.qTitle)}
                  <fieldset className="ak-field" style={{ marginTop: "0.6rem" }}>
                    <legend>{t.qStream}</legend>
                    <Chips name="stream" options={STREAMS} value={stream} onChange={setStream} lang={lang} />
                  </fieldset>
                  <div className="ak-field">
                    <label htmlFor="ak-marks">
                      {t.qMarks}: <span className="ak-num">{marks}%</span>
                    </label>
                    <input id="ak-marks" className="ak-range" type="range" min={33} max={100} value={marks} onChange={(e) => setMarks(Number(e.target.value))} />
                  </div>
                  <fieldset className="ak-field">
                    <legend>{t.qInterest}</legend>
                    <Chips name="interest" options={INTERESTS} value={interest} onChange={setInterest} lang={lang} />
                  </fieldset>
                  <fieldset className="ak-field">
                    <legend>{t.qBudget}</legend>
                    <Chips name="budget" options={BUDGETS} value={budget} onChange={setBudget} lang={lang} />
                  </fieldset>
                  <fieldset className="ak-field">
                    <legend>{t.qIncome}</legend>
                    <Chips name="income" options={INCOMES} value={income} onChange={setIncome} lang={lang} />
                  </fieldset>
                  <fieldset className="ak-field">
                    <legend>{t.qReach}</legend>
                    <Chips name="reach" options={REACHES} value={reach} onChange={setReach} lang={lang} />
                  </fieldset>
                  <div className="ak-field">
                    <label htmlFor="ak-district">{t.qDistrict}</label>
                    <select id="ak-district" className="ak-select" value={districtIdx} onChange={(e) => setDistrictIdx(Number(e.target.value))}>
                      {DISTRICTS.map((d, i) => (
                        <option key={d.en} value={i}>
                          {pick(d, lang)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="ak-row">
                    <button type="button" className="ak-btn ak-btn-ghost" onClick={() => setStep(0)}>
                      {t.back}
                    </button>
                    <button type="submit" className="ak-btn" style={{ flex: 1 }}>
                      {t.next}
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <div>
                  {stepTitle(t.planFor(pick(district, lang)))}
                  <p className="ak-muted" style={{ margin: 0 }}>
                    {pick(streamLabel, lang)} · {marks}% · {pick(INTERESTS.find((i) => i.id === interest)!.label, lang)}
                  </p>

                  <h3 className="ak-section-title">{t.coursesTitle}</h3>
                  <ul className="ak-list" data-testid="ak-courses">
                    {plan.courses.map((c) => (
                      <li className="ak-item" key={c.id}>
                        <div className="ak-item-head">
                          <strong>{pick(c.name, lang)}</strong>
                          <span className="ak-tag">{pick(c.years, lang)}</span>
                        </div>
                        <p>{pick(c.what, lang)}</p>
                      </li>
                    ))}
                  </ul>

                  {plan.examIds.length > 0 && (
                    <>
                      <h3 className="ak-section-title">{t.examsTitle}</h3>
                      <ul className="ak-list" data-testid="ak-exams">
                        {plan.examIds.map((id) => {
                          const ex = EXAMS[id];
                          const exName = pick(ex.name, lang);
                          return (
                            <li className="ak-item" key={id}>
                              <div className="ak-item-head">
                                <strong>{exName}</strong>
                                <span className={`ak-tag ${ex.open ? "ak-tag-brand" : "ak-tag-red"}`}>{ex.open ? t.stillOpen : t.nextYear}</span>
                              </div>
                              <p style={{ fontWeight: 600, color: "var(--ak-ink)" }}>{pick(ex.thisYear, lang)}</p>
                              <p>
                                {pick(ex.by, lang)}. {pick(ex.window, lang)}{" "}
                                <a href={ex.url} target="_blank" rel="noreferrer" aria-label={`${t.official}: ${exName}`}>
                                  {t.official} ↗
                                </a>
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                      <p className="ak-muted">{t.examsNote}</p>
                    </>
                  )}

                  <h3 className="ak-section-title">{t.scholarTitle}</h3>
                  {plan.scholarships.length > 0 ? (
                    <ul className="ak-list" data-testid="ak-scholarships">
                      {plan.scholarships.map((s) => {
                        const sName = pick(s.name, lang);
                        return (
                          <li className="ak-item" key={s.id}>
                            <strong>{sName}</strong>
                            <p>{pick(s.rule, lang)}</p>
                            <p>
                              <a href={s.url} target="_blank" rel="noreferrer" aria-label={`${t.official}: ${sName}`}>
                                {t.official} ↗
                              </a>
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="ak-muted" data-testid="ak-scholarships">
                      {t.scholarNone}
                    </p>
                  )}
                  <p className="ak-muted">{t.scholarNote}</p>

                  <h3 className="ak-section-title">{t.collegesTitle}</h3>
                  <p className="ak-muted" style={{ marginTop: 0 }}>
                    {t.collegesNote}
                  </p>
                  {plan.hasMbbs && <div className="ak-alert ak-alert-amber">{t.neetNote}</div>}
                  <ul className="ak-list" data-testid="ak-colleges" style={{ marginTop: "0.5rem" }}>
                    {plan.colleges.map((c) => collegeCard(c))}
                  </ul>
                  {plan.colleges.length === 0 && <div className="ak-alert ak-alert-amber">{t.noColleges}</div>}

                  <h3 className="ak-section-title">{t.checkTitle}</h3>
                  <form
                    className="ak-row"
                    style={{ flexWrap: "nowrap" }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      runCheck();
                    }}
                  >
                    <label htmlFor="ak-check" className="ak-sr">
                      {t.checkPlaceholder}
                    </label>
                    <input
                      id="ak-check"
                      className="ak-input"
                      placeholder={t.checkPlaceholder}
                      value={checkText}
                      onChange={(e) => {
                        setCheckText(e.target.value);
                        setCheckResult("");
                      }}
                    />
                    <button type="submit" className="ak-btn ak-btn-ghost">
                      {t.checkBtn}
                    </button>
                  </form>
                  <div aria-live="polite">
                    {checkResult === "fake" && (
                      <div className="ak-alert ak-alert-red" data-testid="ak-check-result">
                        {t.checkFake(checkMatch)}
                      </div>
                    )}
                    {checkResult === "ok" && (
                      <div className="ak-alert ak-alert-neutral" data-testid="ak-check-result">
                        {t.checkOk}
                      </div>
                    )}
                    {checkResult === "short" && (
                      <div className="ak-alert ak-alert-neutral" data-testid="ak-check-result">
                        {t.checkShort}
                      </div>
                    )}
                  </div>
                  <p className="ak-muted">
                    <a href={SOURCES.ugcFake} target="_blank" rel="noreferrer">
                      {t.checkSource}
                    </a>
                  </p>

                  <div className="ak-row" style={{ marginTop: "0.75rem" }}>
                    <button type="button" className="ak-btn ak-btn-ghost" onClick={() => setStep(1)}>
                      {t.back}
                    </button>
                    <button
                      type="button"
                      className="ak-btn"
                      style={{ flex: 1 }}
                      disabled={chosenColleges.length === 0}
                      aria-describedby={chosenColleges.length === 0 ? "ak-pick-one" : undefined}
                      onClick={() => {
                        setSavedOnly(false);
                        resetConsent();
                        setStep(3);
                      }}
                    >
                      {t.toConsent(chosenColleges.length)}
                    </button>
                  </div>
                  {chosenColleges.length === 0 && (
                    <p className="ak-muted" id="ak-pick-one">
                      {t.pickOne}
                    </p>
                  )}
                  <button
                    type="button"
                    className="ak-btn ak-btn-ghost ak-btn-block"
                    style={{ marginTop: "0.5rem" }}
                    onClick={() => {
                      setSavedOnly(true);
                      setStep(4);
                    }}
                  >
                    {t.saveOnly}
                  </button>
                </div>
              )}

              {step === 3 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (otpState === "ok" && agree) setStep(4);
                  }}
                >
                  {stepTitle(t.consentTitle)}
                  <fieldset className="ak-field" style={{ marginTop: "0.5rem" }}>
                    <legend>{t.adultQ}</legend>
                    <Chips
                      name="adult"
                      options={ADULT_OPTIONS}
                      value={adult}
                      onChange={(v) => {
                        setAdult(v);
                        resetConsent();
                      }}
                      lang={lang}
                    />
                  </fieldset>
                  {adult && (
                    <>
                      <p className="ak-muted" style={{ marginTop: 0 }}>
                        {adult === "yes" ? t.consentAdult : t.consentMinor}
                      </p>
                      <div className="ak-item" style={{ marginBottom: "0.75rem" }}>
                        <strong>{t.shares}</strong>
                        <ul style={{ margin: "0.35rem 0 0", paddingLeft: "1.1rem", fontSize: "0.9rem" }}>
                          {t.sharesList.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                        <p style={{ fontWeight: 600 }}>{t.notShared}</p>
                        <p style={{ fontWeight: 600, marginTop: "0.5rem" }}>{t.goesTo}:</p>
                        <ul style={{ margin: "0.2rem 0 0", paddingLeft: "1.1rem", fontSize: "0.9rem" }} data-testid="ak-goes-to">
                          {chosenColleges.map((c) => {
                            const course = courseFor(c);
                            return (
                              <li key={c.id}>
                                {pick(c.name, lang)}: {course ? pick(course.name, lang) : "-"}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="ak-field">
                        <label htmlFor="ak-name">{t.studentName}</label>
                        <input id="ak-name" className="ak-input" value={studentName} maxLength={30} onChange={(e) => setStudentName(e.target.value)} />
                      </div>
                      <div className="ak-field">
                        <label htmlFor="ak-phone">{adult === "yes" ? t.phoneStudent : t.phoneParent}</label>
                        <input
                          id="ak-phone"
                          className="ak-input"
                          inputMode="numeric"
                          autoComplete="tel"
                          maxLength={10}
                          value={phone}
                          aria-describedby="ak-phone-help"
                          onChange={(e) => {
                            setPhone(e.target.value.replace(/\D/g, ""));
                            resetConsent();
                          }}
                        />
                        <div id="ak-phone-help" className="ak-muted">
                          {t.phoneHelp}
                        </div>
                      </div>
                      {!otpSent ? (
                        <button type="button" className="ak-btn ak-btn-ghost ak-btn-block" disabled={!phoneValid} onClick={() => setOtpSent(true)}>
                          {t.sendOtp}
                        </button>
                      ) : (
                        <>
                          <div className="ak-alert ak-alert-amber" data-testid="ak-otp-hint">
                            {t.otpSent(DEMO_OTP)}
                          </div>
                          <div className="ak-field" style={{ marginTop: "0.6rem" }}>
                            <label htmlFor="ak-otp">{t.otpLabel}</label>
                            <div className="ak-row" style={{ flexWrap: "nowrap" }}>
                              <input
                                id="ak-otp"
                                className="ak-input"
                                inputMode="numeric"
                                maxLength={4}
                                value={otp}
                                onChange={(e) => {
                                  setOtp(e.target.value.replace(/\D/g, ""));
                                  setOtpState("");
                                  setAgree(false);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    verifyOtp();
                                  }
                                }}
                              />
                              <button type="button" className="ak-btn ak-btn-ghost" onClick={verifyOtp}>
                                {t.verify}
                              </button>
                            </div>
                            <div aria-live="polite">
                              {otpState === "ok" && <div className="ak-alert ak-alert-green">{t.otpOk}</div>}
                              {otpState === "wrong" && <div className="ak-alert ak-alert-red">{t.otpWrong}</div>}
                            </div>
                          </div>
                        </>
                      )}
                      <label className="ak-check" style={{ margin: "0.75rem 0" }}>
                        <input type="checkbox" checked={agree} disabled={otpState !== "ok"} onChange={(e) => setAgree(e.target.checked)} />
                        <span>{adult === "yes" ? t.agreeAdult : t.agreeParent}</span>
                      </label>
                    </>
                  )}
                  <div className="ak-row">
                    <button
                      type="button"
                      className="ak-btn ak-btn-ghost"
                      onClick={() => {
                        resetConsent();
                        setStep(2);
                      }}
                    >
                      {t.back}
                    </button>
                    <button type="submit" className="ak-btn" style={{ flex: 1 }} disabled={!(otpState === "ok" && agree)}>
                      {t.share}
                    </button>
                  </div>
                </form>
              )}

              {step === 4 && (
                <div>
                  {savedOnly ? (
                    <>
                      {stepTitle(t.savedTitle)}
                      <p>{t.savedLead}</p>
                      <p className="ak-muted">{t.doneProfile}</p>
                    </>
                  ) : !withdrawn ? (
                    <>
                      {stepTitle(t.doneTitle)}
                      <p>{t.doneLead(chosenColleges.length)}</p>
                      <p className="ak-muted">{t.doneProfile}</p>
                      <div className="ak-row">
                        <button type="button" className="ak-btn" onClick={() => setTab("college")}>
                          {t.seeDashboard}
                        </button>
                        <button type="button" className="ak-btn ak-btn-ghost" onClick={() => setWithdrawn(true)}>
                          {t.withdraw}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="ak-alert ak-alert-amber" style={{ marginTop: 0 }} role="status">
                      {t.withdrawn}
                    </div>
                  )}
                  <button type="button" className="ak-btn ak-btn-ghost ak-btn-block" style={{ marginTop: "0.75rem" }} onClick={reset}>
                    {t.startOver}
                  </button>
                </div>
              )}
            </div>

            <aside className="ak-explain" aria-label={t.whyTitle}>
              <div className="ak-card">
                <h2>{t.whyTitle}</h2>
                <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "grid", gap: "0.7rem" }}>
                  {t.why.map((w, i) => (
                    <li
                      key={w.h}
                      style={{
                        borderLeft: `3px solid ${i === step ? "var(--ak-brand)" : "var(--ak-line)"}`,
                        paddingLeft: "0.7rem"
                      }}
                    >
                      <strong>{w.h}</strong>
                      <div style={{ fontSize: "0.92rem", color: "var(--ak-ink-2)" }}>{w.p}</div>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </section>
        )}

        {tab === "college" && (
          <section id="panel-college" role="tabpanel" aria-labelledby="tab-college">
            <div className="ak-card">
              <h2>{t.collegeTitle}</h2>
              <p className="ak-muted" style={{ marginTop: 0 }}>
                {t.collegeLead}
              </p>
              <div className="ak-kpis" style={{ margin: "0.75rem 0" }} data-testid="ak-college-kpis">
                <div className="ak-kpi">
                  <div className="ak-kpi-value ak-num" data-testid="ak-enq-count">
                    {enquiries.length}
                  </div>
                  <div className="ak-kpi-label">{t.kpiEnq}</div>
                </div>
                <div className="ak-kpi">
                  <div className="ak-kpi-value">100%</div>
                  <div className="ak-kpi-label">{t.kpiConsent}</div>
                </div>
                <div className="ak-kpi">
                  <div className="ak-kpi-value ak-num">
                    {calledCount} / {enquiries.length}
                  </div>
                  <div className="ak-kpi-label">{t.kpiCalled}</div>
                </div>
                <div className="ak-kpi">
                  <div className="ak-kpi-value ak-num">{inr(enquiries.length * rev.price)}</div>
                  <div className="ak-kpi-label">{t.kpiBill(inr(rev.price))}</div>
                </div>
              </div>
              <div className="ak-table-wrap">
                <table className="ak-table ak-stack" role="table">
                  <thead role="rowgroup">
                    <tr role="row">
                      <th role="columnheader">{t.thWhen}</th>
                      <th role="columnheader">{t.thWho}</th>
                      <th role="columnheader">{t.thDistrict}</th>
                      <th role="columnheader">{t.thProfile}</th>
                      <th role="columnheader">{t.thCourse}</th>
                      <th role="columnheader">{t.thConsent}</th>
                      <th role="columnheader">{t.thStatus}</th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {enquiries.map((e) => (
                      <tr role="row" key={e.id} style={e.mine ? { background: "#f0f9f5" } : undefined} data-testid={e.mine ? "ak-my-enquiry" : undefined}>
                        <td role="cell" data-label={t.thWhen}>
                          {pick(e.when, lang)}
                        </td>
                        <td role="cell" data-label={t.thWho}>
                          {e.who}
                        </td>
                        <td role="cell" data-label={t.thDistrict}>
                          {pick(e.district, lang)}
                        </td>
                        <td role="cell" data-label={t.thProfile}>
                          {pick(e.profile, lang)}
                        </td>
                        <td role="cell" data-label={t.thCourse}>
                          {pick(e.course, lang)}
                        </td>
                        <td role="cell" data-label={t.thConsent}>
                          <span className="ak-tag ak-tag-brand">✓ {t.consentBadge}</span>
                        </td>
                        <td role="cell" data-label={t.thStatus}>
                          <select
                            className="ak-select"
                            aria-label={`${t.thStatus}: ${e.who}`}
                            value={statuses[e.id] ?? "new"}
                            onChange={(ev) => setStatuses((prev) => ({ ...prev, [e.id]: ev.target.value }))}
                          >
                            {(Object.keys(t.status) as (keyof typeof t.status)[]).map((s) => (
                              <option key={s} value={s}>
                                {t.status[s]}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!sentToPartner && <p className="ak-muted">{t.yoursHint}</p>}
            </div>
            <div className="ak-grid-2" style={{ marginTop: "0.85rem" }}>
              <div className="ak-card">
                <h3>{t.rulesTitle}</h3>
                <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
                  {t.rules.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="ak-card">
                <h3>{t.bundleTitle}</h3>
                <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
                  {t.bundle.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="ak-alert ak-alert-amber">{t.priceNote}</div>
              </div>
            </div>
          </section>
        )}

        {tab === "revenue" && (
          <section id="panel-revenue" role="tabpanel" aria-labelledby="tab-revenue">
            <div className="ak-card">
              <h2>{t.revTitle}</h2>
              <p className="ak-muted" style={{ marginTop: 0 }}>
                {t.revLead}
              </p>
              <div className="ak-row" role="group" aria-label={t.scenLabel} style={{ marginBottom: "0.85rem" }}>
                {(["low", "base", "high"] as const).map((s) => (
                  <button key={s} type="button" className="ak-tab" aria-pressed={scenario === s} onClick={() => setPreset(s)}>
                    {t.scen[s]}
                  </button>
                ))}
                {scenario === "custom" && <span className="ak-tag">{t.scen.custom}</span>}
              </div>
              <div className="ak-grid-2">
                <div className="ak-grid-2" style={{ alignContent: "start" }}>
                  {revFields.map((f) => (
                    <div className="ak-field" key={f.k} style={{ margin: 0 }}>
                      <label htmlFor={`rev-${f.k}`} style={{ fontSize: "0.85rem" }}>
                        {f.label}
                      </label>
                      <input
                        id={`rev-${f.k}`}
                        className="ak-input ak-num"
                        type="number"
                        min={0}
                        max={PERCENT_FIELDS.includes(f.k) ? 100 : undefined}
                        step={f.step}
                        value={rev[f.k]}
                        onChange={(e) => setField(f.k, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="ak-item">
                    <strong>{t.funnel}</strong>
                    <p>
                      {t.fPlans}: <strong className="ak-num">{Math.round(r.plans).toLocaleString("en-IN")}</strong>
                    </p>
                    <p>
                      {t.fFamilies}: <strong className="ak-num">{Math.round(r.families).toLocaleString("en-IN")}</strong>
                    </p>
                    <p>
                      {t.fEnquiries}: <strong className="ak-num">{Math.round(r.enquiries).toLocaleString("en-IN")}</strong>
                    </p>
                  </div>
                  <div className="ak-item" style={{ marginTop: "0.6rem" }}>
                    <p>
                      {t.rEnq}: <strong className="ak-num">{money(r.enqRev, lang)}</strong>
                    </p>
                    <p>
                      {t.rBundle}: <strong className="ak-num">{money(r.bundleRev, lang)}</strong>
                    </p>
                    <p>
                      {t.rCounsel}: <strong className="ak-num">{money(r.counselRev, lang)}</strong>
                    </p>
                  </div>
                  <div className="ak-item" style={{ marginTop: "0.6rem", background: "var(--ak-brand-soft)", borderColor: "#bfdcd2" }}>
                    <div className="ak-muted" style={{ color: "var(--ak-brand-2)" }}>
                      {t.rTotal}
                    </div>
                    <div className="ak-total ak-num" data-testid="ak-total">
                      {money(r.total, lang)}
                    </div>
                  </div>
                  <p className="ak-muted">{t.notForecast}</p>
                </div>
              </div>
            </div>
            <div className="ak-grid-2" style={{ marginTop: "0.85rem" }}>
              <div className="ak-card" style={{ margin: 0 }}>
                <h3>{t.whySmall}</h3>
                <p style={{ margin: 0 }}>{t.whySmallText}</p>
              </div>
              <div className="ak-card" style={{ margin: 0 }}>
                <h3>{t.mustBeTrue}</h3>
                <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
                  {t.mustList.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {tab === "platform" && (
          <section id="panel-platform" role="tabpanel" aria-labelledby="tab-platform">
            <div className="ak-card">
              <h2>{t.platTitle}</h2>
              <p className="ak-muted" style={{ marginTop: 0 }}>
                {t.platLead}
              </p>
              <ol className="ak-timeline" style={{ marginTop: "1rem" }}>
                {t.journey.map((j) => (
                  <li key={j.h} className={j.url ? "" : "new"}>
                    <div className="ak-when">{j.when}</div>
                    <div className="ak-row" style={{ gap: "0.4rem" }}>
                      <strong>{j.h}</strong>
                      <span className={`ak-tag ${j.url ? "" : "ak-tag-amber"}`}>{j.url ? t.runsToday : t.isNew}</span>
                    </div>
                    <div style={{ color: "var(--ak-ink-2)", fontSize: "0.9rem" }}>
                      {j.p}{" "}
                      {j.url && (
                        <a href={j.url} target="_blank" rel="noreferrer" aria-label={t.sourceFor(j.h)}>
                          ↗
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="ak-card">
              <h3>{t.gainsTitle}</h3>
              <div className="ak-table-wrap">
                <table className="ak-table ak-stack" role="table">
                  <thead role="rowgroup">
                    <tr role="row">
                      <th role="columnheader">{t.gainsWho}</th>
                      <th role="columnheader">{t.gainsWhat}</th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {t.gains.map((g) => (
                      <tr role="row" key={g.who}>
                        <td role="cell" data-label={t.gainsWho}>
                          <strong>{g.who}</strong>
                        </td>
                        <td role="cell" data-label={t.gainsWhat}>
                          {g.what}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        <footer className="ak-footer">
          <p>{t.footer}</p>
          <strong>{t.sourcesTitle}</strong>
          <ol>
            {SOURCE_LIST.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </footer>
      </div>
    </div>
  );
}
