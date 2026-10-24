"use client";

import React, { useMemo, useState } from "react";
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
  UGC_FAKE_UP,
  type Bi,
  type Budget,
  type College,
  type Income,
  type Interest,
  type Reach,
  type Stream
} from "./aageKyaData";
import type { LanguageMode } from "../types/curriculum";

// Concept prototype: "Aage Kya?" turns the board-results moment into a Hindi
// admission plan and parent-approved enquiries that colleges pay for. Nothing
// is stored or sent; colleges and enquiries are fictional demo data.

type Tab = "student" | "college" | "revenue" | "platform";
type Step = 0 | 1 | 2 | 3 | 4;
type Scenario = "low" | "base" | "high";

const DEMO_OTP = "2468";
const PARTNER_ID = "c2";

const pick = (b: Bi, lang: LanguageMode) => b[lang];
const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

interface RevenueInputs {
  passed: number;
  reachPct: number;
  completePct: number;
  consentPct: number;
  perStudent: number;
  price: number;
  bundles: number;
  bundlePrice: number;
  counselPct: number;
  counselPrice: number;
}

const PRESETS: Record<Scenario, RevenueInputs> = {
  low: { passed: 2109000, reachPct: 3, completePct: 40, consentPct: 15, perStudent: 2, price: 150, bundles: 40, bundlePrice: 75000, counselPct: 0.5, counselPrice: 299 },
  base: { passed: 2109000, reachPct: 8, completePct: 55, consentPct: 25, perStudent: 2.5, price: 250, bundles: 100, bundlePrice: 120000, counselPct: 1, counselPrice: 299 },
  high: { passed: 2109000, reachPct: 15, completePct: 65, consentPct: 35, perStudent: 3, price: 400, bundles: 200, bundlePrice: 200000, counselPct: 2, counselPrice: 299 }
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

const COPY = {
  en: {
    badge: "Concept prototype",
    independent: "Independent pitch, not affiliated with Amar Ujala",
    demoData: "Demo data: colleges and enquiries are fictional",
    title: "Aage Kya? (आगे क्या?)",
    lead:
      "On result day about 21 lakh UP Board Class 12 students pass, and each family asks the same question: what next? Aage Kya answers it in Hindi, on the results page they already open, and turns the answer into parent-approved admission enquiries that colleges pay for.",
    planLink: "Strategy, roadmap and the 6 questions",
    kpis: [
      { v: "25.99 lakh", l: "sat UP Board Class 12 in 2025; 81.15% passed", s: "UPMSP result, April 2025" },
      { v: "8,375", l: "colleges in UP, the most of any state", s: "AISHE 2021-22" },
      { v: "17%", l: "of India's print ad space bought by education, the largest sector", s: "TAM AdEx, Jan to Sep 2025" },
      { v: "37,000+", l: "partner schools already on the Amar Ujala olympiad (AUNO)", s: "amarujalaolympiad.com" }
    ],
    tabs: { student: "1. Student demo", college: "2. College dashboard", revenue: "3. Revenue model", platform: "4. One platform" } as Record<Tab, string>,
    phoneTitle: "results page",
    stepNames: ["Result", "4 questions", "Your plan", "Parent consent", "Done"],
    resultTitle: "UP Board Class 12 result (demo)",
    resultName: "Demo student",
    passed: "Passed",
    resultCta: "Aage kya? See your plan in 2 minutes",
    resultNote: "Free. No login. Nothing is shared without a parent's OTP.",
    qStream: "Your Class 12 stream",
    qMarks: "Your percentage",
    qInterest: "What interests you most?",
    qBudget: "Fees your family can manage",
    qIncome: "Family income a year (only to match scholarships)",
    qReach: "Where do you want to study?",
    qDistrict: "Home district",
    next: "Show my plan",
    back: "Back",
    planFor: (district: string) => `Your plan, near ${district}`,
    coursesTitle: "Courses that fit you",
    examsTitle: "Exams not to miss",
    examsNote: "Typical windows only. Always confirm dates on the official site.",
    official: "Official site",
    scholarTitle: "Scholarships you may qualify for",
    scholarNote: "Rules change every year. Confirm on the official portal before you apply.",
    scholarNone: "Ask each college about its own merit scholarship before paying fees.",
    collegesTitle: "Colleges that fit (demo)",
    collegesNote: "Order is by fit to your answers, never by payment. Sponsored listings are labelled and only appear when they fit.",
    sponsored: "Sponsored",
    fee: "Fee a year",
    distance: (km: number) => `${km} km from district headquarters`,
    ask: "Ask this college to call me",
    noColleges: "No demo college fits these answers. Try a higher budget or \"Anywhere in UP\".",
    neetNote: "MBBS and BDS seats are allotted only through NEET counselling, so no college is listed for them here.",
    checkTitle: "Is this college genuine? Check any name",
    checkPlaceholder: "Type a college or university name",
    checkBtn: "Check",
    checkFake: (name: string) => `Warning: "${name}" is on the UGC list of fake universities (February 2026). Its degrees are not valid. Do not pay any fee.`,
    checkOk: "Not on the UGC fake-university list. That alone does not prove recognition: also check UGC, AICTE or the state university's affiliation list.",
    checkSource: "Source: UGC list of fake universities, February 2026 (4 of the 32 are in UP).",
    toConsent: (n: number) => `Continue with ${n} college${n === 1 ? "" : "s"}`,
    pickOne: "Tick at least one college to get a call, or keep the plan for yourself.",
    savePlan: "Plan saved to your profile (demo).",
    consentTitle: "Parent approval",
    consentLead: "Most Class 12 students are under 18, so a parent or guardian approves before any college sees your details.",
    shares: "What the colleges will see",
    sharesList: ["Student's first name", "Parent's mobile number", "Stream and a marks band (for example 70 to 80%)", "District and the course you chose"],
    notShared: "Never shared: exact marks, family income, roll number",
    studentName: "Student's first name",
    parentPhone: "Parent's mobile number",
    phoneHelp: "10 digits, starting with 6, 7, 8 or 9",
    sendOtp: "Send OTP to parent",
    otpSent: (otp: string) => `Demo only: no SMS is sent. Use OTP ${otp}.`,
    otpLabel: "OTP",
    verify: "Verify",
    otpWrong: "That OTP does not match.",
    otpOk: "Parent's number verified.",
    agree: "I am the parent or guardian. I agree to share these details with the colleges ticked above, only for admission calls. I can withdraw this at any time.",
    share: "Share and request calls",
    doneTitle: "Done. Colleges will call within 48 hours.",
    doneLead: (n: number) => `Your details went to ${n} college${n === 1 ? "" : "s"}. Each one has agreed to call within 48 hours, not to resell your number and to delete it if you withdraw.`,
    doneProfile: "Your plan is saved to one student profile: the same profile could later hold olympiad results and scholarship forms.",
    withdraw: "Withdraw consent",
    withdrawn: "Consent withdrawn. In the real product, colleges get a deletion request at once.",
    startOver: "Start over",
    seeDashboard: "See it on the college dashboard",
    whyTitle: "What is happening, and why",
    why: [
      { h: "1. The highest-intent moment", p: "The result page is where families already come, in Hindi, on a phone. Today it ends at the marksheet. Aage Kya starts there, at zero acquisition cost." },
      { h: "2. Four questions, not forty", p: "Stream, marks, interest, budget, income band and distance are enough to narrow courses, exams, scholarships and colleges. No caste or exact income is asked." },
      { h: "3. Useful before it is commercial", p: "Exams, scholarships and the fake-university check are free and unsponsored. That is what earns trust for the paid part." },
      { h: "4. The parent decides", p: "Under India's data protection law a child's data needs verifiable parental consent. The OTP goes to the parent, and consent can be withdrawn." },
      { h: "5. Colleges pay for consented enquiries", p: "Not for clicks or data dumps. Each enquiry is one family that asked for a call, with the parent's approval on record." }
    ],
    collegeTitle: "Prerna Institute of Technology (fictional), admissions desk",
    collegeLead: "What a paying college sees. Every enquiry is consented, verified and capped to the fields the family agreed to share.",
    kpiEnq: "Enquiries this week",
    kpiConsent: "Parent-approved",
    kpiCalled: "Called so far",
    kpiBill: (price: string) => `Billed this week at ${price} each`,
    thWhen: "When",
    thWho: "Student",
    thDistrict: "District",
    thProfile: "Stream and marks",
    thCourse: "Course",
    thConsent: "Consent",
    thStatus: "Status",
    consentBadge: "Parent OTP",
    status: { new: "New", called: "Called", visit: "Campus visit", admitted: "Admitted", no: "Not interested" },
    yours: "Just now",
    yoursHint: "Complete the student demo and tick Prerna Institute of Technology to see your own enquiry arrive here.",
    rulesTitle: "Rules every paying college accepts",
    rules: [
      "Passes a recognition check (UGC, AICTE or state affiliation) before going live.",
      "Calls within 48 hours; slow responders are paused.",
      "No resale or sharing of numbers; deletion on withdrawal.",
      "Two upheld complaints and the college is removed for the season."
    ],
    bundleTitle: "Admission-season bundle, sold by the existing ad desk",
    bundle: [
      "District-edition print ads in the admission series",
      "A sponsored slot on the plan page, labelled, shown only to students it fits",
      "Pay-per-enquiry billing, with a monthly enquiry report"
    ],
    priceNote: "Price per enquiry is the biggest unknown. No public benchmark exists, so the first test with the ad desk is what colleges will pay.",
    revTitle: "Year-one revenue from one season of UP Board Class 12 only",
    revLead: "Every figure is an editable assumption except the pass count. Choose a scenario, then change any number.",
    scen: { low: "Low", base: "Base", high: "High" } as Record<Scenario, string>,
    inPassed: "UP Board Class 12 passed (2025)",
    inReach: "Open Aage Kya from the result (%)",
    inComplete: "Finish the plan (%)",
    inConsent: "Request calls with parent consent (%)",
    inPer: "Colleges chosen per family",
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
    notForecast: "An illustration, not a forecast. Excludes CBSE students, Class 10 stream choice and the five other states where Amar Ujala publishes.",
    mustBeTrue: "What has to be true",
    mustList: [
      "The results page can carry a prominent Aage Kya entry on result day.",
      "Colleges will pay per consented enquiry, at a price the ad desk tests before launch.",
      "Parents will approve by OTP; if consent rates are low, the model shrinks to sponsorship only."
    ],
    platTitle: "One student, one profile: the programmes Amar Ujala already runs",
    platLead: "The brief asks to bring existing programmes onto one platform. Today they sit on separate sites. Aage Kya is the missing last step, and the shared profile is the platform.",
    journey: [
      { when: "Class 1 to 10", h: "Amar Ujala National Olympiad (AUNO)", p: "School-level olympiad with an AI report for each student; the site cites 37,000+ partner schools.", tag: "Runs today", url: SOURCES.auno },
      { when: "Class 9 to 12", h: "Atul Maheshwari Chhatravritti", p: "Amar Ujala Foundation's merit-cum-means scholarship exam.", tag: "Runs today", url: SOURCES.amc },
      { when: "Board exam season", h: "Tanav Mukt Pariksha (stress-free exam) workshops", p: "School sessions with psychologists and officers, reported by INMA as 55 sessions across 10 zones.", tag: "Runs today", url: SOURCES.stressFree },
      { when: "Result day", h: "results.amarujala.com", p: "Where students and parents check board results.", tag: "Runs today", url: SOURCES.results },
      { when: "After Class 12", h: "Aage Kya: plan, scholarships, verified colleges", p: "The new step that turns the result into an admission decision and revenue.", tag: "New", url: "" }
    ],
    runsToday: "Runs today",
    isNew: "New",
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
      "रिजल्ट के दिन यूपी बोर्ड कक्षा 12 के लगभग 21 लाख छात्र पास होते हैं, और हर परिवार एक ही सवाल पूछता है: आगे क्या? \"आगे क्या\" इसका जवाब हिंदी में, उसी रिजल्ट पेज पर देता है जिसे वे पहले से खोलते हैं, और इस जवाब को अभिभावक की मंज़ूरी वाली प्रवेश पूछताछ में बदलता है, जिसके लिए कॉलेज भुगतान करते हैं।",
    planLink: "रणनीति, रोडमैप और 6 सवाल",
    kpis: [
      { v: "25.99 लाख", l: "छात्र 2025 में यूपी बोर्ड कक्षा 12 की परीक्षा में बैठे; 81.15% पास", s: "यूपी बोर्ड परिणाम, अप्रैल 2025" },
      { v: "8,375", l: "कॉलेज यूपी में, किसी भी राज्य से अधिक", s: "AISHE 2021-22" },
      { v: "17%", l: "भारत के प्रिंट विज्ञापन स्थान में शिक्षा क्षेत्र का हिस्सा, सबसे बड़ा क्षेत्र", s: "TAM AdEx, जनवरी से सितंबर 2025" },
      { v: "37,000+", l: "पार्टनर स्कूल पहले से अमर उजाला ओलंपियाड (AUNO) से जुड़े", s: "amarujalaolympiad.com" }
    ],
    tabs: { student: "1. छात्र डेमो", college: "2. कॉलेज डैशबोर्ड", revenue: "3. आय मॉडल", platform: "4. एक प्लेटफॉर्म" } as Record<Tab, string>,
    phoneTitle: "रिजल्ट पेज",
    stepNames: ["रिजल्ट", "4 सवाल", "आपकी योजना", "अभिभावक की सहमति", "पूरा"],
    resultTitle: "यूपी बोर्ड कक्षा 12 परिणाम (डेमो)",
    resultName: "डेमो छात्र",
    passed: "उत्तीर्ण",
    resultCta: "आगे क्या? 2 मिनट में अपनी योजना देखें",
    resultNote: "मुफ्त। लॉगिन नहीं। अभिभावक के OTP के बिना कुछ भी साझा नहीं होता।",
    qStream: "कक्षा 12 में आपका संकाय",
    qMarks: "आपका प्रतिशत",
    qInterest: "आपकी सबसे ज़्यादा रुचि किसमें है?",
    qBudget: "परिवार कितनी फीस दे सकता है",
    qIncome: "परिवार की सालाना आय (केवल छात्रवृत्ति मिलाने के लिए)",
    qReach: "आप कहाँ पढ़ना चाहते हैं?",
    qDistrict: "गृह जिला",
    next: "मेरी योजना दिखाएँ",
    back: "पीछे",
    planFor: (district: string) => `आपकी योजना, ${district} के पास`,
    coursesTitle: "आपके लिए उपयुक्त कोर्स",
    examsTitle: "ये परीक्षाएँ न छूटें",
    examsNote: "केवल सामान्य समय दिया गया है। तिथियाँ हमेशा आधिकारिक वेबसाइट पर जाँचें।",
    official: "आधिकारिक वेबसाइट",
    scholarTitle: "छात्रवृत्तियाँ जिनके लिए आप पात्र हो सकते हैं",
    scholarNote: "नियम हर वर्ष बदलते हैं। आवेदन से पहले आधिकारिक पोर्टल पर जाँचें।",
    scholarNone: "फीस देने से पहले हर कॉलेज से उसकी अपनी मेरिट छात्रवृत्ति के बारे में पूछें।",
    collegesTitle: "उपयुक्त कॉलेज (डेमो)",
    collegesNote: "क्रम आपके जवाबों से मेल के आधार पर है, भुगतान के आधार पर कभी नहीं। प्रायोजित कॉलेज पर लेबल लगा होता है और वह तभी दिखता है जब आपके लिए उपयुक्त हो।",
    sponsored: "प्रायोजित",
    fee: "सालाना फीस",
    distance: (km: number) => `जिला मुख्यालय से ${km} किमी`,
    ask: "यह कॉलेज मुझे कॉल करे",
    noColleges: "इन जवाबों पर कोई डेमो कॉलेज उपयुक्त नहीं है। अधिक बजट या \"यूपी में कहीं भी\" चुनकर देखें।",
    neetNote: "एमबीबीएस और बीडीएस की सीटें केवल NEET काउंसलिंग से मिलती हैं, इसलिए उनके लिए यहाँ कोई कॉलेज नहीं दिखाया गया है।",
    checkTitle: "क्या यह कॉलेज असली है? कोई भी नाम जाँचें",
    checkPlaceholder: "कॉलेज या विश्वविद्यालय का नाम लिखें",
    checkBtn: "जाँचें",
    checkFake: (name: string) => `चेतावनी: "${name}" यूजीसी की फर्जी विश्वविद्यालयों की सूची (फरवरी 2026) में है। इसकी डिग्री मान्य नहीं है। कोई फीस न दें।`,
    checkOk: "यह यूजीसी की फर्जी विश्वविद्यालयों की सूची में नहीं है। केवल इससे मान्यता साबित नहीं होती: यूजीसी, AICTE या राज्य विश्वविद्यालय की संबद्धता सूची भी देखें।",
    checkSource: "स्रोत: यूजीसी की फर्जी विश्वविद्यालयों की सूची, फरवरी 2026 (32 में से 4 यूपी में)।",
    toConsent: (n: number) => `${n} कॉलेज के साथ आगे बढ़ें`,
    pickOne: "कॉल पाने के लिए कम से कम एक कॉलेज चुनें, या योजना अपने पास रखें।",
    savePlan: "योजना आपकी प्रोफाइल में सहेजी गई (डेमो)।",
    consentTitle: "अभिभावक की मंज़ूरी",
    consentLead: "कक्षा 12 के ज़्यादातर छात्र 18 वर्ष से कम के होते हैं, इसलिए किसी भी कॉलेज को आपकी जानकारी दिखने से पहले अभिभावक मंज़ूरी देते हैं।",
    shares: "कॉलेज क्या देखेंगे",
    sharesList: ["छात्र का पहला नाम", "अभिभावक का मोबाइल नंबर", "संकाय और अंकों का दायरा (जैसे 70 से 80%)", "जिला और चुना गया कोर्स"],
    notShared: "कभी साझा नहीं होगा: सटीक अंक, परिवार की आय, रोल नंबर",
    studentName: "छात्र का पहला नाम",
    parentPhone: "अभिभावक का मोबाइल नंबर",
    phoneHelp: "10 अंक, 6, 7, 8 या 9 से शुरू",
    sendOtp: "अभिभावक को OTP भेजें",
    otpSent: (otp: string) => `केवल डेमो: कोई SMS नहीं भेजा जाता। OTP ${otp} डालें।`,
    otpLabel: "OTP",
    verify: "पुष्टि करें",
    otpWrong: "यह OTP मेल नहीं खाता।",
    otpOk: "अभिभावक का नंबर सत्यापित हुआ।",
    agree: "मैं अभिभावक हूँ। मैं ये जानकारी ऊपर चुने गए कॉलेजों के साथ, केवल प्रवेश से जुड़ी कॉल के लिए, साझा करने की सहमति देता/देती हूँ। मैं इसे कभी भी वापस ले सकता/सकती हूँ।",
    share: "साझा करें और कॉल माँगें",
    doneTitle: "हो गया। कॉलेज 48 घंटे में कॉल करेंगे।",
    doneLead: (n: number) => `आपकी जानकारी ${n} कॉलेज को भेजी गई। हर कॉलेज ने 48 घंटे में कॉल करने, नंबर आगे न बेचने और सहमति वापस लेने पर उसे मिटाने का वादा किया है।`,
    doneProfile: "आपकी योजना एक छात्र प्रोफाइल में सहेजी गई है: आगे इसी प्रोफाइल में ओलंपियाड के परिणाम और छात्रवृत्ति के फॉर्म भी रह सकते हैं।",
    withdraw: "सहमति वापस लें",
    withdrawn: "सहमति वापस ले ली गई। असली प्रोडक्ट में कॉलेजों को तुरंत डेटा मिटाने का अनुरोध जाता है।",
    startOver: "फिर से शुरू करें",
    seeDashboard: "कॉलेज डैशबोर्ड पर देखें",
    whyTitle: "क्या हो रहा है, और क्यों",
    why: [
      { h: "1. सबसे ज़्यादा ज़रूरत का पल", p: "रिजल्ट पेज पर परिवार पहले से आते हैं, हिंदी में, फोन पर। आज यह मार्कशीट पर खत्म हो जाता है। \"आगे क्या\" वहीं से शुरू होता है, बिना ग्राहक जुटाने के खर्च के।" },
      { h: "2. चालीस नहीं, चार सवाल", p: "संकाय, अंक, रुचि, बजट, आय का दायरा और दूरी, इतने से कोर्स, परीक्षाएँ, छात्रवृत्तियाँ और कॉलेज छँट जाते हैं। जाति या सटीक आय नहीं पूछी जाती।" },
      { h: "3. पहले उपयोगी, फिर व्यावसायिक", p: "परीक्षाएँ, छात्रवृत्तियाँ और फर्जी विश्वविद्यालय की जाँच मुफ्त हैं और इनमें कोई प्रायोजन नहीं। यही सशुल्क हिस्से के लिए भरोसा बनाता है।" },
      { h: "4. फैसला अभिभावक का", p: "भारत के डेटा संरक्षण कानून के तहत बच्चे के डेटा के लिए अभिभावक की सत्यापित सहमति ज़रूरी है। OTP अभिभावक को जाता है, और सहमति वापस ली जा सकती है।" },
      { h: "5. कॉलेज सहमति वाली पूछताछ के लिए भुगतान करते हैं", p: "क्लिक या डेटा के ढेर के लिए नहीं। हर पूछताछ एक ऐसा परिवार है जिसने कॉल माँगी, और अभिभावक की मंज़ूरी दर्ज है।" }
    ],
    collegeTitle: "प्रेरणा इंस्टीट्यूट ऑफ टेक्नोलॉजी (काल्पनिक), प्रवेश डेस्क",
    collegeLead: "भुगतान करने वाला कॉलेज क्या देखता है। हर पूछताछ सहमति वाली और सत्यापित है, और उतनी ही जानकारी तक सीमित है जितनी परिवार ने साझा करने की अनुमति दी।",
    kpiEnq: "इस सप्ताह की पूछताछ",
    kpiConsent: "अभिभावक की मंज़ूरी वाली",
    kpiCalled: "अब तक कॉल की गईं",
    kpiBill: (price: string) => `इस सप्ताह का बिल, ${price} प्रति पूछताछ`,
    thWhen: "कब",
    thWho: "छात्र",
    thDistrict: "जिला",
    thProfile: "संकाय और अंक",
    thCourse: "कोर्स",
    thConsent: "सहमति",
    thStatus: "स्थिति",
    consentBadge: "अभिभावक OTP",
    status: { new: "नई", called: "कॉल हुई", visit: "कैंपस विज़िट", admitted: "प्रवेश हुआ", no: "रुचि नहीं" },
    yours: "अभी",
    yoursHint: "छात्र डेमो पूरा करें और प्रेरणा इंस्टीट्यूट ऑफ टेक्नोलॉजी चुनें, तो आपकी अपनी पूछताछ यहाँ दिखेगी।",
    rulesTitle: "हर भुगतान करने वाला कॉलेज ये नियम मानता है",
    rules: [
      "लाइव होने से पहले मान्यता की जाँच (यूजीसी, AICTE या राज्य संबद्धता) पास करनी होगी।",
      "48 घंटे में कॉल करनी होगी; देर करने वाले कॉलेज रोक दिए जाते हैं।",
      "नंबर बेचना या आगे देना मना है; सहमति वापस लेने पर डेटा मिटाना होगा।",
      "दो सही पाई गई शिकायतों पर कॉलेज पूरे सीज़न के लिए हटा दिया जाता है।"
    ],
    bundleTitle: "प्रवेश सीज़न का पैकेज, मौजूदा विज्ञापन डेस्क के ज़रिए",
    bundle: [
      "प्रवेश शृंखला में जिला संस्करणों के प्रिंट विज्ञापन",
      "योजना पेज पर लेबल वाला प्रायोजित स्थान, केवल उन्हीं छात्रों को जिनके लिए उपयुक्त हो",
      "प्रति पूछताछ भुगतान, मासिक पूछताछ रिपोर्ट के साथ"
    ],
    priceNote: "प्रति पूछताछ कीमत सबसे बड़ा अनजाना पहलू है। कोई सार्वजनिक मानक नहीं है, इसलिए विज्ञापन डेस्क के साथ पहला परीक्षण यही होगा कि कॉलेज कितना देंगे।",
    revTitle: "केवल यूपी बोर्ड कक्षा 12 के एक सीज़न से पहले साल की आय",
    revLead: "पास छात्रों की संख्या के अलावा हर आँकड़ा बदला जा सकने वाला अनुमान है। कोई परिदृश्य चुनें, फिर कोई भी संख्या बदलें।",
    scen: { low: "कम", base: "आधार", high: "अधिक" } as Record<Scenario, string>,
    inPassed: "यूपी बोर्ड कक्षा 12 में पास (2025)",
    inReach: "रिजल्ट से \"आगे क्या\" खोलने वाले (%)",
    inComplete: "योजना पूरी करने वाले (%)",
    inConsent: "अभिभावक की सहमति से कॉल माँगने वाले (%)",
    inPer: "हर परिवार द्वारा चुने गए कॉलेज",
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
    mustBeTrue: "क्या सच होना चाहिए",
    mustList: [
      "रिजल्ट के दिन रिजल्ट पेज पर \"आगे क्या\" का प्रमुख प्रवेश बिंदु दिखाया जा सके।",
      "कॉलेज सहमति वाली हर पूछताछ के लिए भुगतान करें, उस कीमत पर जिसे विज्ञापन डेस्क लॉन्च से पहले परखे।",
      "अभिभावक OTP से मंज़ूरी दें; सहमति की दर कम हो तो मॉडल केवल प्रायोजन तक सिमट जाएगा।"
    ],
    platTitle: "एक छात्र, एक प्रोफाइल: अमर उजाला के पहले से चल रहे कार्यक्रम",
    platLead: "भर्ती की सूचना कहती है कि मौजूदा कार्यक्रमों को एक प्लेटफॉर्म पर लाना है। आज वे अलग-अलग वेबसाइटों पर हैं। \"आगे क्या\" छूटा हुआ आखिरी कदम है, और साझा प्रोफाइल ही प्लेटफॉर्म है।",
    journey: [
      { when: "कक्षा 1 से 10", h: "अमर उजाला नेशनल ओलंपियाड (AUNO)", p: "हर छात्र के लिए एआई रिपोर्ट वाला स्कूल-स्तरीय ओलंपियाड; वेबसाइट 37,000+ पार्टनर स्कूल बताती है।", tag: "आज चल रहा है", url: SOURCES.auno },
      { when: "कक्षा 9 से 12", h: "अतुल माहेश्वरी छात्रवृत्ति", p: "अमर उजाला फाउंडेशन की मेरिट और आर्थिक ज़रूरत पर आधारित छात्रवृत्ति परीक्षा।", tag: "आज चल रहा है", url: SOURCES.amc },
      { when: "बोर्ड परीक्षा का समय", h: "तनाव मुक्त परीक्षा कार्यशालाएँ", p: "मनोवैज्ञानिकों और अधिकारियों के साथ स्कूल सत्र; INMA के अनुसार 10 ज़ोन में 55 सत्र।", tag: "आज चल रहा है", url: SOURCES.stressFree },
      { when: "रिजल्ट का दिन", h: "results.amarujala.com", p: "जहाँ छात्र और अभिभावक बोर्ड परिणाम देखते हैं।", tag: "आज चल रहा है", url: SOURCES.results },
      { when: "कक्षा 12 के बाद", h: "आगे क्या: योजना, छात्रवृत्तियाँ, सत्यापित कॉलेज", p: "नया कदम, जो रिजल्ट को प्रवेश के फैसले और आय में बदलता है।", tag: "नया", url: "" }
    ],
    runsToday: "आज चल रहा है",
    isNew: "नया",
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
  const lo = Math.max(33, Math.floor(m / 10) * 10);
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
  value: T;
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
  const [checkResult, setCheckResult] = useState<"" | "fake" | "ok">("");
  const [checkMatch, setCheckMatch] = useState("");
  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpState, setOtpState] = useState<"" | "ok" | "wrong">("");
  const [agree, setAgree] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  // College dashboard state
  const [statuses, setStatuses] = useState<Record<string, string>>({ e1: "new", e2: "called", e3: "visit", e4: "new", you: "new" });

  // Revenue state
  const [scenario, setScenario] = useState<Scenario>("base");
  const [rev, setRev] = useState<RevenueInputs>(PRESETS.base);

  const district = DISTRICTS[districtIdx];
  const budgetMax = BUDGETS.find((b) => b.id === budget)?.max ?? Infinity;

  const plan = useMemo(() => {
    let courses = COURSES.filter((c) => c.streams.includes(stream) && c.interests.includes(interest));
    if (courses.length === 0) courses = COURSES.filter((c) => c.streams.includes(stream) && c.interests.includes("unsure"));
    courses = courses.slice(0, 4);
    const courseIds = new Set(courses.map((c) => c.id));
    const examIds = Array.from(new Set(courses.flatMap((c) => c.exams)));
    const scholarships = SCHOLARSHIPS.filter((s) => s.fits(income));
    const fit = DEMO_COLLEGES.map((c) => ({ c, match: c.courses.filter((id) => courseIds.has(id)).length }))
      .filter(({ c, match }) => match > 0 && c.fee <= budgetMax && (reach === "state" || c.km <= 15))
      .sort((a, b) => b.match - a.match || a.c.fee - b.c.fee || a.c.km - b.c.km)
      .map(({ c }) => c);
    const sponsored = fit.find((c) => c.sponsored) ?? null;
    const organic = fit.filter((c) => !c.sponsored);
    return { courses, examIds, scholarships, sponsored, organic, hasMbbs: courseIds.has("mbbs") };
  }, [stream, interest, income, budgetMax, reach]);

  const visibleIds = new Set([...(plan.sponsored ? [plan.sponsored.id] : []), ...plan.organic.map((c) => c.id)]);
  const chosenVisible = chosen.filter((id) => visibleIds.has(id));
  const phoneValid = /^[6-9]\d{9}$/.test(phone);
  const done = step === 4 && !withdrawn;
  const sentToPartner = done && chosenVisible.includes(PARTNER_ID);

  const toggleCollege = (id: string) =>
    setChosen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const runCheck = () => {
    const q = checkText.trim().toLowerCase();
    if (q.length < 3) {
      setCheckResult("");
      return;
    }
    const hit = UGC_FAKE_UP.find((u) => u.keys.some((k) => q.includes(k) || (q.length >= 6 && k.includes(q))));
    setCheckResult(hit ? "fake" : "ok");
    setCheckMatch(hit ? hit[lang] : "");
  };

  const reset = () => {
    setStep(0);
    setChosen([]);
    setStudentName("");
    setPhone("");
    setOtpSent(false);
    setOtp("");
    setOtpState("");
    setAgree(false);
    setWithdrawn(false);
    setCheckText("");
    setCheckResult("");
  };

  const r = useMemo(() => {
    const plans = rev.passed * (rev.reachPct / 100) * (rev.completePct / 100);
    const families = plans * (rev.consentPct / 100);
    const enquiries = families * rev.perStudent;
    const enqRev = enquiries * rev.price;
    const bundleRev = rev.bundles * rev.bundlePrice;
    const counselRev = plans * (rev.counselPct / 100) * rev.counselPrice;
    return { plans, families, enquiries, enqRev, bundleRev, counselRev, total: enqRev + bundleRev + counselRev };
  }, [rev]);

  const setPreset = (s: Scenario) => {
    setScenario(s);
    setRev(PRESETS[s]);
  };
  const setField = (k: keyof RevenueInputs, v: string) => {
    const n = Number(v);
    setRev((prev) => ({ ...prev, [k]: Number.isFinite(n) && n >= 0 ? n : 0 }));
  };

  const revFields: { k: keyof RevenueInputs; label: string; step: number }[] = [
    { k: "passed", label: t.inPassed, step: 1000 },
    { k: "reachPct", label: t.inReach, step: 1 },
    { k: "completePct", label: t.inComplete, step: 1 },
    { k: "consentPct", label: t.inConsent, step: 1 },
    { k: "perStudent", label: t.inPer, step: 0.5 },
    { k: "price", label: t.inPrice, step: 10 },
    { k: "bundles", label: t.inBundles, step: 5 },
    { k: "bundlePrice", label: t.inBundlePrice, step: 5000 },
    { k: "counselPct", label: t.inCounsel, step: 0.5 },
    { k: "counselPrice", label: t.inCounselPrice, step: 10 }
  ];

  const enquiries: (Enquiry & { mine?: boolean })[] = [
    ...(sentToPartner
      ? [
          {
            id: "you",
            when: { en: t.yours, hi: t.yours },
            who: studentName.trim() ? `${studentName.trim().slice(0, 1).toUpperCase()}***` : "D***",
            district,
            profile: { en: `${STREAMS.find((s) => s.id === stream)!.label.en}, ${marksBand(marks, "en")}`, hi: `${STREAMS.find((s) => s.id === stream)!.label.hi}, ${marksBand(marks, "hi")}` },
            course: plan.courses[0]?.name ?? { en: "-", hi: "-" },
            mine: true
          }
        ]
      : []),
    ...BASE_ENQUIRIES
  ];
  const calledCount = enquiries.filter((e) => (statuses[e.id] ?? "new") !== "new").length;

  const collegeCard = (c: College, isSponsored: boolean) => (
    <li className="ak-item" key={c.id} style={isSponsored ? { borderColor: "#f3d7a6", background: "#fffaf0" } : undefined}>
      <div className="ak-item-head">
        <strong>{pick(c.name, lang)}</strong>
        <span className="ak-row" style={{ gap: "0.3rem" }}>
          {isSponsored && <span className="ak-tag ak-tag-amber">{t.sponsored}</span>}
          <span className="ak-tag">{pick(c.kind, lang)}</span>
        </span>
      </div>
      <p>
        ✓ {pick(c.recognition, lang)}
      </p>
      <p>
        {t.fee}: <strong className="ak-num">{inr(c.fee)}</strong> · {t.distance(c.km)}
      </p>
      <p>
        {c.courses
          .map((id) => COURSES.find((x) => x.id === id))
          .filter((x): x is NonNullable<typeof x> => Boolean(x))
          .map((x) => pick(x.name, lang))
          .join(", ")}
      </p>
      <label className="ak-check" style={{ marginTop: "0.5rem" }}>
        <input type="checkbox" checked={chosen.includes(c.id)} onChange={() => toggleCollege(c.id)} />
        <span>{t.ask}</span>
      </label>
    </li>
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

        <section className="ak-kpis" aria-label="Key numbers">
          {t.kpis.map((k) => (
            <div className="ak-kpi" key={k.v}>
              <div className="ak-kpi-value">{k.v}</div>
              <div className="ak-kpi-label">{k.l}</div>
              <div className="ak-kpi-src">{k.s}</div>
            </div>
          ))}
        </section>

        <div className="ak-tabs" role="tablist" aria-label="Prototype sections">
          {(Object.keys(t.tabs) as Tab[]).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
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
                  {Math.min(step + 1, 5)} / 5 · {t.stepNames[step]}
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
                    <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>{t.resultTitle}</div>
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
                  <fieldset className="ak-field">
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
                  <h2 style={{ fontSize: "1.15rem", margin: "0 0 0.25rem" }}>{t.planFor(pick(district, lang))}</h2>
                  <p className="ak-muted" style={{ margin: 0 }}>
                    {pick(STREAMS.find((s) => s.id === stream)!.label, lang)} · {marks}% · {pick(INTERESTS.find((i) => i.id === interest)!.label, lang)}
                  </p>

                  <div className="ak-section-title">{t.coursesTitle}</div>
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
                      <div className="ak-section-title">{t.examsTitle}</div>
                      <ul className="ak-list">
                        {plan.examIds.map((id) => {
                          const ex = EXAMS[id];
                          return (
                            <li className="ak-item" key={id}>
                              <div className="ak-item-head">
                                <strong>{pick(ex.name, lang)}</strong>
                                <a href={ex.url} target="_blank" rel="noreferrer">
                                  {t.official} ↗
                                </a>
                              </div>
                              <p>
                                {pick(ex.by, lang)}. {pick(ex.window, lang)}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                      <p className="ak-muted">{t.examsNote}</p>
                    </>
                  )}

                  <div className="ak-section-title">{t.scholarTitle}</div>
                  {plan.scholarships.length > 0 ? (
                    <ul className="ak-list">
                      {plan.scholarships.map((s) => (
                        <li className="ak-item" key={s.id}>
                          <div className="ak-item-head">
                            <strong>{pick(s.name, lang)}</strong>
                            <a href={s.url} target="_blank" rel="noreferrer">
                              {t.official} ↗
                            </a>
                          </div>
                          <p>{pick(s.rule, lang)}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="ak-muted">{t.scholarNone}</p>
                  )}
                  <p className="ak-muted">{t.scholarNote}</p>

                  <div className="ak-section-title">{t.collegesTitle}</div>
                  <p className="ak-muted" style={{ marginTop: 0 }}>
                    {t.collegesNote}
                  </p>
                  {plan.hasMbbs && <div className="ak-alert ak-alert-amber">{t.neetNote}</div>}
                  <ul className="ak-list" data-testid="ak-colleges" style={{ marginTop: "0.5rem" }}>
                    {plan.sponsored && collegeCard(plan.sponsored, true)}
                    {plan.organic.map((c) => collegeCard(c, false))}
                  </ul>
                  {!plan.sponsored && plan.organic.length === 0 && <div className="ak-alert ak-alert-amber">{t.noColleges}</div>}

                  <div className="ak-section-title">{t.checkTitle}</div>
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
                      <div className="ak-alert ak-alert-green" data-testid="ak-check-result">
                        {t.checkOk}
                      </div>
                    )}
                  </div>
                  <p className="ak-muted">{t.checkSource}</p>

                  <div className="ak-row" style={{ marginTop: "0.75rem" }}>
                    <button type="button" className="ak-btn ak-btn-ghost" onClick={() => setStep(1)}>
                      {t.back}
                    </button>
                    <button type="button" className="ak-btn" style={{ flex: 1 }} disabled={chosenVisible.length === 0} onClick={() => setStep(3)}>
                      {t.toConsent(chosenVisible.length)}
                    </button>
                  </div>
                  {chosenVisible.length === 0 && <p className="ak-muted">{t.pickOne}</p>}
                </div>
              )}

              {step === 3 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (otpState === "ok" && agree) setStep(4);
                  }}
                >
                  <h2 style={{ fontSize: "1.15rem", margin: "0 0 0.25rem" }}>{t.consentTitle}</h2>
                  <p className="ak-muted" style={{ marginTop: 0 }}>
                    {t.consentLead}
                  </p>
                  <div className="ak-item" style={{ marginBottom: "0.75rem" }}>
                    <strong>{t.shares}</strong>
                    <ul style={{ margin: "0.35rem 0 0", paddingLeft: "1.1rem", fontSize: "0.9rem" }}>
                      {t.sharesList.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <p style={{ fontWeight: 600 }}>{t.notShared}</p>
                    <p>
                      {chosenVisible
                        .map((id) => DEMO_COLLEGES.find((c) => c.id === id))
                        .filter((c): c is College => Boolean(c))
                        .map((c) => pick(c.name, lang))
                        .join(", ")}
                    </p>
                  </div>
                  <div className="ak-field">
                    <label htmlFor="ak-name">{t.studentName}</label>
                    <input id="ak-name" className="ak-input" value={studentName} maxLength={30} onChange={(e) => setStudentName(e.target.value)} />
                  </div>
                  <div className="ak-field">
                    <label htmlFor="ak-phone">{t.parentPhone}</label>
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
                        setOtpSent(false);
                        setOtpState("");
                        setOtp("");
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
                            }}
                          />
                          <button type="button" className="ak-btn ak-btn-ghost" onClick={() => setOtpState(otp === DEMO_OTP ? "ok" : "wrong")}>
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
                    <span>{t.agree}</span>
                  </label>
                  <div className="ak-row">
                    <button type="button" className="ak-btn ak-btn-ghost" onClick={() => setStep(2)}>
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
                  {!withdrawn ? (
                    <>
                      <div className="ak-alert ak-alert-green" style={{ marginTop: 0 }}>
                        <strong>{t.doneTitle}</strong>
                      </div>
                      <p>{t.doneLead(chosenVisible.length)}</p>
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
                    <div className="ak-alert ak-alert-amber" style={{ marginTop: 0 }}>
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
                        borderLeft: `3px solid ${i === Math.min(step, 4) ? "var(--ak-brand)" : "var(--ak-line)"}`,
                        paddingLeft: "0.7rem"
                      }}
                    >
                      <strong>{w.h}</strong>
                      <div className="ak-muted" style={{ fontSize: "0.92rem", color: "var(--ak-ink-2)" }}>
                        {w.p}
                      </div>
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
              <div className="ak-kpis" style={{ margin: "0.75rem 0" }}>
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
                <table className="ak-table ak-stack">
                  <thead>
                    <tr>
                      <th>{t.thWhen}</th>
                      <th>{t.thWho}</th>
                      <th>{t.thDistrict}</th>
                      <th>{t.thProfile}</th>
                      <th>{t.thCourse}</th>
                      <th>{t.thConsent}</th>
                      <th>{t.thStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((e) => (
                      <tr key={e.id} style={e.mine ? { background: "#f0f9f5" } : undefined} data-testid={e.mine ? "ak-my-enquiry" : undefined}>
                        <td data-label={t.thWhen}>{pick(e.when, lang)}</td>
                        <td data-label={t.thWho}>{e.who}</td>
                        <td data-label={t.thDistrict}>{pick(e.district, lang)}</td>
                        <td data-label={t.thProfile}>{pick(e.profile, lang)}</td>
                        <td data-label={t.thCourse}>{pick(e.course, lang)}</td>
                        <td data-label={t.thConsent}>
                          <span className="ak-tag ak-tag-brand">✓ {t.consentBadge}</span>
                        </td>
                        <td data-label={t.thStatus}>
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
              <div className="ak-row" role="group" aria-label={t.funnel} style={{ marginBottom: "0.85rem" }}>
                {(["low", "base", "high"] as Scenario[]).map((s) => (
                  <button key={s} type="button" className="ak-tab" aria-pressed={scenario === s} onClick={() => setPreset(s)}>
                    {t.scen[s]}
                  </button>
                ))}
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
            <div className="ak-card">
              <h3>{t.mustBeTrue}</h3>
              <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
                {t.mustList.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
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
                      <span className={`ak-tag ${j.url ? "" : "ak-tag-amber"}`}>{j.tag}</span>
                    </div>
                    <div className="ak-muted" style={{ color: "var(--ak-ink-2)" }}>
                      {j.p}{" "}
                      {j.url && (
                        <a href={j.url} target="_blank" rel="noreferrer" className="ak-break">
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
                <table className="ak-table ak-stack">
                  <thead>
                    <tr>
                      <th>{t.gainsWho}</th>
                      <th>{t.gainsWhat}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.gains.map((g) => (
                      <tr key={g.who}>
                        <td data-label={t.gainsWho}>
                          <strong>{g.who}</strong>
                        </td>
                        <td data-label={t.gainsWhat}>{g.what}</td>
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
