"use client";

import React from "react";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./useLanguage";

const PANEL: React.CSSProperties = {
  background: "var(--surface-elevated)",
  padding: "1.1rem",
  borderRadius: "12px",
  border: "1px solid var(--border)"
};
const BODY: React.CSSProperties = { color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65 };
const CELL: React.CSSProperties = { padding: "0.7rem 0.85rem", verticalAlign: "top" };
const ROW: React.CSSProperties = { borderBottom: "1px solid var(--border)" };
const TABLE: React.CSSProperties = { width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" };
const HEAD_ROW: React.CSSProperties = { background: "var(--surface-elevated)", borderBottom: "2px solid var(--border)" };
const STRONG_CELL: React.CSSProperties = { ...CELL, color: "var(--text)", fontWeight: 700 };

const SOURCES = {
  upBoard: "https://results.amarujala.com/exam-alerts/up-board-exam-2025-27-4-lakh-candidates-registered-for-high-school-26-98-lakh-for-intermediate",
  cmse: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2160863",
  amc: "https://foundation.amarujala.com/atul-maheshwari-chhatravritti-amc",
  stressFree: "https://www.inma.org/blogs/ideas/post.cfm/amar-ujala-supports-students-beyond-tests-with-stress-free-exam-programme"
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
    badges: ["Concept justification", "Independent pitch, not affiliated with Amar Ujala"],
    title: "Pariksha Saathi: Why It Is Worth a Pilot",
    subtitle:
      "Six questions answered for a weekly Hindi board-practice test that runs on a newspaper's print reach and ad desk. Figures are sourced; anything not yet proven is marked as an assumption for the pilot to test.",
    back: "← Back to the prototype",
    jumpLabel: "Jump to question",
    qPrefix: "Q",
    nav: ["Who", "Today", "How many", "Why better", "Will they pay", "Real problem"],
    navPilot: "Pilot & kill criteria",
    question: "Question",
    q1: {
      title: "Who will use it?",
      answer: "Two sides. Students use it free; sponsors, schools and parents pay. The newspaper's own ad desk and education desk run it.",
      heads: ["User", "What they get", "Pays?"],
      rows: [
        ["UP Board students, Classes 9 to 12, mostly Hindi-medium", "A 10-minute weekly test and a chapter-wise report of which earlier-class skills to review", "No, free"],
        ["Sponsors: coaching institutes, banks, local and national brands", "One named weekly slot in front of exam-year families, with QR scans as proof of reach", "Yes, per weekly test"],
        ["Schools and teachers", "A class-level gap map every week, without setting or marking a test", "Yes, per student per year"],
        ["Parents", "A weekly summary (with consent) and an optional full board-pattern mock", "Optional, once per season"],
        ["Newspaper teams: education desk, ad sales, foundation", "A year-round education product to sell and report on, not only result-day traffic", "Runs it"]
      ]
    },
    q2: {
      title: "What do they use currently?",
      answer: "Students practise from guess papers, guide books and YouTube, which give answers but never tell them why they got something wrong.",
      panels: [
        ["Students and parents", ["Guide books, guess papers and model papers: answers, no diagnosis.", "Free Hindi YouTube channels and apps: explanations, no weekly routine or report.", "Local tuition, where families can afford it (see Question 3)."]],
        ["Schools", ["Paper unit tests marked by hand; a mark per student, rarely a class-wide view of which skill is weak."]],
        ["Sponsors", ["Standard print and digital display ads around exam and result season, with reach estimated, not measured."]]
      ] as [string, string[]][],
      paperTitle: "The newspaper",
      paper: ["Strong result-day traffic and separate school programmes, such as the ", "Atul Maheshwari scholarship exam", " and the ", "stress-free exam programme", ", without one product joining them up."]
    },
    q3: {
      title: "How many users face this problem?",
      answer: "About 54 lakh students registered for the 2025 UP Board Class 10 and 12 exams. Reaching 1% of them each week is about 54,000 test-takers.",
      heads: ["Fact", "Figure", "Source"],
      rows: [
        ["UP Board 2025 registrations, Class 10 + Class 12", "about 54 lakh (27.4 lakh + 26.98 lakh)"],
        ["Students taking private coaching", "27.0% nationally; 25.5% rural, 30.7% urban"],
        ["Average yearly coaching spend per student", "₹1,793 rural, ₹3,988 urban"],
        ["Implication", "About 3 in 4 students take no private coaching"]
      ],
      asReported: ", as reported",
      cmse: "NSS CMS: Education 2025 (PIB)",
      derived: "Derived from the 27.0% figure",
      note: "Classes 9 and 11, and other Hindi-belt boards, are not counted here, so the real pool is larger."
    },
    q4: {
      title: "Why will it be better?",
      answer: "Not because of technology alone: anyone can build a quiz. The edge is distribution, habit and trust that only a daily Hindi newspaper has.",
      cards: [
        ["1. It reaches students apps cannot", "A printed QR box arrives in Hindi-medium homes every day. No app install, no ad spend to acquire users."],
        ["2. It explains why, not just what", "Each wrong answer points to the earlier-class skill to review. Guess papers and videos only give the right answer."],
        ["3. A weekly habit, not a seasonal spike", "Same day, same page, every week. Result-day readers become year-round readers."],
        ["4. Sponsors get measurable reach", "QR scans and completed tests per edition prove reach, which a plain display ad cannot."]
      ],
      limitLabel: "Honest limit:",
      limit: "today this is a clickable prototype with 5 questions. The question bank, teacher review and QR tracking still have to be built, and the pilot has to show students come back."
    },
    q5: {
      title: "Will they pay?",
      answer: "Students will not, and should not have to. Sponsors and schools are the realistic payers; parents are a small bonus.",
      heads: ["Payer", "Why they would pay", "Prototype default (assumption)"],
      defaultLabel: "Default",
      rows: [
        ["Sponsors", "Education advertisers want exam-year families; a named weekly slot with measured scans is easier to justify than a display ad", "30 weeks × ₹1 lakh = ₹30 lakh"],
        ["Schools", "A weekly class gap map saves teachers time and gives schools something to show parents", "200 schools × 300 students × ₹100 = ₹60 lakh"],
        ["Parents", "A full board-pattern mock just before exams, priced far below tuition", "2% of 50,000 × ₹99 = ₹1 lakh"],
        ["Total, year one", "At these assumptions", "about ₹91 lakh"]
      ],
      note:
        "Why students stay free: average rural coaching spend is only ₹1,793 a year, so charging students would shrink the audience that sponsors and schools are paying to reach. Sponsor fees and school prices are guesses until the ad desk and 10 pilot schools confirm them."
    },
    q6: {
      title: "What is the real problem not solved right now?",
      answer:
        "Hindi-medium board students practise a lot but get no feedback on why they go wrong; and the newspaper's education audience is seasonal, so it cannot be monetised all year.",
      list: [
        ["For students:", "practice material is everywhere, but nothing tells a Class 10 student that their quadratic mistakes come from a Class 9 factorisation gap. About 3 in 4 take no private coaching that could tell them."],
        ["For schools:", "teachers mark tests but rarely see which skill the whole class is weak in."],
        ["For the newspaper:", "education traffic spikes on result day and fades, and the school programmes run as separate events. A weekly test turns that into one year-round product that ad sales can sell."]
      ]
    },
    pilot: {
      badge: "Proof",
      title: "8-Week Pilot and What Would Prove It Wrong",
      planTitle: "Pilot (one district edition)",
      plan: [
        "QR box every Wednesday on the education page, linked from the results portal.",
        "8 weekly sponsor slots sold through the existing ad desk.",
        "10 schools get a free class report, then a quote for the paid pack.",
        "Every question reviewed by a subject teacher before print."
      ],
      stopTitle: "Stop or rethink if (proposed thresholds)",
      stop: [
        "Fewer than 60% of students who scan the QR finish the test.",
        "Fewer than 20% of week-1 students return by week 4.",
        "No sponsor renews after the pilot.",
        "Fewer than 3 of the 10 pilot schools agree to pay."
      ],
      risksLabel: "Risks handled in the design:",
      risks:
        "the test works without login, and contact details are collected only with verifiable parent or school consent (DPDP Act 2023). Sponsors never see student data or results. Wrong questions are a brand risk, so teacher review comes before print."
    },
    cta: "Try the prototype →",
    footnote: "Independent concept pitch, not affiliated with or endorsed by Amar Ujala. Revenue figures are assumptions, not forecasts."
  },
  hi: {
    badges: ["कॉन्सेप्ट का औचित्य", "स्वतंत्र प्रस्ताव, अमर उजाला से संबद्ध नहीं"],
    title: "परीक्षा साथी: पायलट क्यों करना चाहिए",
    subtitle:
      "एक साप्ताहिक हिंदी बोर्ड-अभ्यास टेस्ट के लिए छह प्रश्नों के उत्तर, जो अख़बार की प्रिंट पहुँच और विज्ञापन डेस्क पर चलता है। आँकड़ों के स्रोत दिए गए हैं; जो अभी साबित नहीं है, उसे पायलट में परखने के लिए मान्यता के रूप में चिह्नित किया गया है।",
    back: "← प्रोटोटाइप पर लौटें",
    jumpLabel: "प्रश्न पर जाएँ",
    qPrefix: "प्र",
    nav: ["कौन", "आज क्या", "कितने", "बेहतर क्यों", "भुगतान", "असली समस्या"],
    navPilot: "पायलट और रुकने के मानदंड",
    question: "प्रश्न",
    q1: {
      title: "इसका उपयोग कौन करेगा?",
      answer: "दो पक्ष हैं। छात्र इसे मुफ़्त में इस्तेमाल करते हैं; प्रायोजक, स्कूल और अभिभावक भुगतान करते हैं। अख़बार की अपनी विज्ञापन डेस्क और शिक्षा डेस्क इसे चलाती हैं।",
      heads: ["उपयोगकर्ता", "उन्हें क्या मिलता है", "भुगतान?"],
      rows: [
        ["यूपी बोर्ड के छात्र, कक्षा 9 से 12, अधिकतर हिंदी माध्यम", "10 मिनट का साप्ताहिक टेस्ट और अध्याय-वार रिपोर्ट कि पिछली कक्षाओं के कौन से कौशल दोहराने हैं", "नहीं, मुफ़्त"],
        ["प्रायोजक: कोचिंग संस्थान, बैंक, स्थानीय और राष्ट्रीय ब्रांड", "परीक्षा वर्ष वाले परिवारों के सामने एक नामित साप्ताहिक स्लॉट, पहुँच के प्रमाण के रूप में QR स्कैन के साथ", "हाँ, प्रति साप्ताहिक टेस्ट"],
        ["स्कूल और शिक्षक", "हर सप्ताह कक्षा-स्तर पर कमियों का नक्शा, बिना टेस्ट बनाए या जाँचे", "हाँ, प्रति छात्र प्रति वर्ष"],
        ["अभिभावक", "साप्ताहिक सारांश (सहमति के साथ) और वैकल्पिक पूरा बोर्ड-पैटर्न मॉक", "वैकल्पिक, हर सत्र में एक बार"],
        ["अख़बार की टीमें: शिक्षा डेस्क, विज्ञापन बिक्री, फ़ाउंडेशन", "पूरे साल चलने वाला शिक्षा उत्पाद, जिसे बेचा और रिपोर्ट किया जा सके, केवल रिज़ल्ट के दिन का ट्रैफ़िक नहीं", "इसे चलाती हैं"]
      ]
    },
    q2: {
      title: "वे अभी क्या उपयोग करते हैं?",
      answer: "छात्र गेस पेपर, गाइड बुक और यूट्यूब से अभ्यास करते हैं, जो उत्तर तो देते हैं पर यह कभी नहीं बताते कि गलती क्यों हुई।",
      panels: [
        ["छात्र और अभिभावक", ["गाइड बुक, गेस पेपर और मॉडल पेपर: उत्तर मिलते हैं, निदान नहीं।", "मुफ़्त हिंदी यूट्यूब चैनल और ऐप: व्याख्या मिलती है, पर न साप्ताहिक दिनचर्या, न रिपोर्ट।", "स्थानीय ट्यूशन, जहाँ परिवार खर्च उठा सकते हैं (प्रश्न 3 देखें)।"]],
        ["स्कूल", ["हाथ से जाँचे जाने वाले काग़ज़ी यूनिट टेस्ट; हर छात्र के अंक, पर शायद ही पूरी कक्षा का यह चित्र कि कौन सा कौशल कमज़ोर है।"]],
        ["प्रायोजक", ["परीक्षा और रिज़ल्ट के मौसम में सामान्य प्रिंट और डिजिटल डिस्प्ले विज्ञापन, जिनकी पहुँच अनुमानित होती है, मापी नहीं जाती।"]]
      ] as [string, string[]][],
      paperTitle: "अख़बार",
      paper: ["रिज़ल्ट के दिन भारी ट्रैफ़िक और अलग-अलग स्कूल कार्यक्रम, जैसे ", "अतुल माहेश्वरी छात्रवृत्ति परीक्षा", " और ", "तनाव मुक्त परीक्षा कार्यक्रम", ", पर इन्हें जोड़ने वाला कोई एक उत्पाद नहीं।"]
    },
    q3: {
      title: "कितने उपयोगकर्ता इस समस्या का सामना करते हैं?",
      answer: "2025 की यूपी बोर्ड कक्षा 10 और 12 की परीक्षाओं के लिए लगभग 54 लाख छात्र पंजीकृत हुए। हर सप्ताह इनमें से 1% तक पहुँचना यानी लगभग 54,000 टेस्ट देने वाले छात्र।",
      heads: ["तथ्य", "आँकड़ा", "स्रोत"],
      rows: [
        ["यूपी बोर्ड 2025 पंजीकरण, कक्षा 10 + कक्षा 12", "लगभग 54 लाख (27.4 लाख + 26.98 लाख)"],
        ["निजी कोचिंग लेने वाले छात्र", "देश में 27.0%; गाँवों में 25.5%, शहरों में 30.7%"],
        ["प्रति छात्र औसत वार्षिक कोचिंग खर्च", "गाँवों में ₹1,793, शहरों में ₹3,988"],
        ["निष्कर्ष", "लगभग 4 में से 3 छात्र कोई निजी कोचिंग नहीं लेते"]
      ],
      asReported: ", रिपोर्ट के अनुसार",
      cmse: "NSS CMS: शिक्षा 2025 (PIB)",
      derived: "27.0% के आँकड़े से निकाला गया",
      note: "कक्षा 9 और 11, और हिंदी पट्टी के दूसरे बोर्ड यहाँ नहीं गिने गए हैं, इसलिए असली संख्या इससे बड़ी है।"
    },
    q4: {
      title: "यह बेहतर क्यों होगा?",
      answer: "केवल तकनीक के कारण नहीं: क्विज़ तो कोई भी बना सकता है। असली बढ़त पहुँच, आदत और भरोसा है, जो केवल एक दैनिक हिंदी अख़बार के पास है।",
      cards: [
        ["1. यह उन छात्रों तक पहुँचता है जहाँ ऐप्स नहीं पहुँचते", "छपा हुआ QR बॉक्स हर दिन हिंदी माध्यम के घरों में पहुँचता है। न ऐप इंस्टॉल, न उपयोगकर्ता लाने के लिए विज्ञापन खर्च।"],
        ["2. यह बताता है क्यों, केवल क्या नहीं", "हर गलत उत्तर उस पिछली कक्षा के कौशल की ओर इशारा करता है जिसे दोहराना है। गेस पेपर और वीडियो केवल सही उत्तर देते हैं।"],
        ["3. साप्ताहिक आदत, मौसमी उछाल नहीं", "हर सप्ताह वही दिन, वही पेज। रिज़ल्ट के दिन आने वाले पाठक पूरे साल के पाठक बनते हैं।"],
        ["4. प्रायोजकों को मापने योग्य पहुँच", "हर संस्करण में QR स्कैन और पूरे हुए टेस्ट पहुँच साबित करते हैं, जो सामान्य डिस्प्ले विज्ञापन नहीं कर सकता।"]
      ],
      limitLabel: "ईमानदार सीमा:",
      limit: "आज यह 5 प्रश्नों वाला क्लिक करने योग्य प्रोटोटाइप है। प्रश्न बैंक, शिक्षक जाँच और QR ट्रैकिंग अभी बननी हैं, और पायलट को दिखाना होगा कि छात्र लौटकर आते हैं।"
    },
    q5: {
      title: "क्या वे भुगतान करेंगे?",
      answer: "छात्र नहीं देंगे, और उन्हें देना भी नहीं चाहिए। प्रायोजक और स्कूल असली भुगतानकर्ता हैं; अभिभावकों से आय एक छोटा अतिरिक्त लाभ है।",
      heads: ["भुगतानकर्ता", "वे क्यों भुगतान करेंगे", "प्रोटोटाइप की डिफ़ॉल्ट मान्यता"],
      defaultLabel: "डिफ़ॉल्ट",
      rows: [
        ["प्रायोजक", "शिक्षा विज्ञापनदाता परीक्षा वर्ष वाले परिवारों तक पहुँचना चाहते हैं; मापे गए स्कैन वाले नामित साप्ताहिक स्लॉट का खर्च डिस्प्ले विज्ञापन से ज़्यादा आसानी से सही ठहराया जा सकता है", "30 सप्ताह × ₹1 लाख = ₹30 लाख"],
        ["स्कूल", "साप्ताहिक कक्षा-स्तर का नक्शा शिक्षकों का समय बचाता है और स्कूलों को अभिभावकों को दिखाने के लिए कुछ ठोस देता है", "200 स्कूल × 300 छात्र × ₹100 = ₹60 लाख"],
        ["अभिभावक", "परीक्षा से ठीक पहले पूरा बोर्ड-पैटर्न मॉक, ट्यूशन से बहुत कम कीमत पर", "50,000 का 2% × ₹99 = ₹1 लाख"],
        ["कुल, पहला वर्ष", "इन मान्यताओं पर", "लगभग ₹91 लाख"]
      ],
      note:
        "छात्र मुफ़्त क्यों रहें: ग्रामीण क्षेत्रों में औसत कोचिंग खर्च केवल ₹1,793 सालाना है, इसलिए छात्रों से शुल्क लेने पर वह दर्शक वर्ग घट जाएगा जिस तक पहुँचने के लिए प्रायोजक और स्कूल भुगतान कर रहे हैं। जब तक विज्ञापन डेस्क और 10 पायलट स्कूल पुष्टि न करें, प्रायोजक शुल्क और स्कूल कीमतें अनुमान ही हैं।"
    },
    q6: {
      title: "वह असली समस्या क्या है जो अभी हल नहीं हुई?",
      answer:
        "हिंदी माध्यम के बोर्ड छात्र खूब अभ्यास करते हैं, पर उन्हें यह पता नहीं चलता कि गलती क्यों होती है; और अख़बार का शिक्षा दर्शक वर्ग मौसमी है, इसलिए उससे पूरे साल कमाई नहीं हो पाती।",
      list: [
        ["छात्रों के लिए:", "अभ्यास सामग्री हर जगह है, पर कोई कक्षा 10 के छात्र को यह नहीं बताता कि द्विघात समीकरण की गलतियाँ कक्षा 9 के गुणनखंडन की कमी से आती हैं। लगभग 4 में से 3 छात्र कोई निजी कोचिंग नहीं लेते जो उन्हें यह बता सके।"],
        ["स्कूलों के लिए:", "शिक्षक टेस्ट जाँचते हैं, पर शायद ही देख पाते हैं कि पूरी कक्षा किस कौशल में कमज़ोर है।"],
        ["अख़बार के लिए:", "शिक्षा ट्रैफ़िक रिज़ल्ट के दिन उछलता है और फिर घट जाता है, और स्कूल कार्यक्रम अलग-अलग आयोजनों की तरह चलते हैं। साप्ताहिक टेस्ट इसे पूरे साल चलने वाले एक उत्पाद में बदल देता है, जिसे विज्ञापन टीम बेच सकती है।"]
      ]
    },
    pilot: {
      badge: "प्रमाण",
      title: "8 सप्ताह का पायलट, और क्या इसे गलत साबित करेगा",
      planTitle: "पायलट (एक ज़िला संस्करण)",
      plan: [
        "हर बुधवार शिक्षा पेज पर QR बॉक्स, रिज़ल्ट पोर्टल से लिंक के साथ।",
        "मौजूदा विज्ञापन डेस्क के ज़रिए 8 साप्ताहिक प्रायोजक स्लॉट बेचे जाएँ।",
        "10 स्कूलों को मुफ़्त कक्षा रिपोर्ट, फिर सशुल्क पैक का प्रस्ताव।",
        "छपने से पहले हर प्रश्न की जाँच विषय शिक्षक करें।"
      ],
      stopTitle: "रोकें या दोबारा सोचें, अगर (प्रस्तावित सीमाएँ)",
      stop: [
        "QR स्कैन करने वाले 60% से कम छात्र टेस्ट पूरा करें।",
        "पहले सप्ताह के 20% से कम छात्र चौथे सप्ताह तक लौटें।",
        "पायलट के बाद कोई प्रायोजक नवीनीकरण न करे।",
        "10 पायलट स्कूलों में से 3 से कम भुगतान के लिए तैयार हों।"
      ],
      risksLabel: "डिज़ाइन में संभाले गए जोखिम:",
      risks:
        "टेस्ट बिना लॉगिन के चलता है, और संपर्क विवरण केवल अभिभावक या स्कूल की सत्यापन-योग्य सहमति से लिए जाते हैं (DPDP अधिनियम 2023)। प्रायोजक कभी छात्रों का डेटा या परिणाम नहीं देखते। गलत प्रश्न ब्रांड के लिए जोखिम हैं, इसलिए छपने से पहले शिक्षक जाँच होती है।"
    },
    cta: "प्रोटोटाइप आज़माएँ →",
    footnote: "स्वतंत्र कॉन्सेप्ट प्रस्ताव, अमर उजाला से संबद्ध या उसके द्वारा समर्थित नहीं। आय के आँकड़े मान्यताएँ हैं, पूर्वानुमान नहीं।"
  }
};

function Question({ id, label, title, answer, children }: { id: string; label: string; title: string; answer: string; children: React.ReactNode }) {
  return (
    <section id={id} className="card">
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        <span className="badge badge-blue">{label}</span>
        <h2 style={{ margin: 0, fontSize: "1.35rem" }}>{title}</h2>
      </div>
      <div
        style={{
          background: "rgba(99, 102, 241, 0.1)",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          borderRadius: "10px",
          padding: "0.85rem 1.05rem",
          marginBottom: "1rem"
        }}
      >
        <p style={{ margin: 0, fontWeight: 600, lineHeight: 1.6 }}>{answer}</p>
      </div>
      {children}
    </section>
  );
}

export default function ParikshaSaathiJustification() {
  const [lang, setLang] = useLanguage();
  const t = COPY[lang];
  const q3Sources: React.ReactNode[] = [
    <>
      <Src href={SOURCES.upBoard}>results.amarujala.com</Src>
      {t.q3.asReported}
    </>,
    <Src href={SOURCES.cmse}>{t.q3.cmse}</Src>,
    <Src href={SOURCES.cmse}>{t.q3.cmse}</Src>,
    t.q3.derived
  ];

  return (
    <div className="app-shell" lang={lang}>
      <header className="top-header">
        <div className="header-row">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
              <span className="brand-badge">{t.badges[0]}</span>
              <span className="badge badge-warn">{t.badges[1]}</span>
            </div>
            <h1 style={{ margin: "0.2rem 0 0.4rem 0", fontSize: "1.85rem", fontWeight: 800 }}>{t.title}</h1>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "920px", lineHeight: 1.55 }}>{t.subtitle}</p>
          </div>
          <div className="header-controls">
            <LanguageToggle lang={lang} onChange={setLang} />
            <Link href="/pariksha-saathi" className="control-pill" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              {t.back}
            </Link>
          </div>
        </div>
        <nav aria-label={t.jumpLabel} className="nav-tabs" style={{ marginTop: "1rem" }}>
          {t.nav.map((label, i) => (
            <a key={i} href={`#q${i + 1}`} className="nav-tab" style={{ textDecoration: "none" }}>
              {t.qPrefix}
              {i + 1}: {label}
            </a>
          ))}
          <a href="#pilot" className="nav-tab" style={{ textDecoration: "none" }}>
            {t.navPilot}
          </a>
        </nav>
      </header>

      <Question id="q1" label={`${t.question} 1`} title={t.q1.title} answer={t.q1.answer}>
        <div className="table-wrap">
          <table className="stack-table" style={TABLE}>
            <thead>
              <tr style={HEAD_ROW}>
                {t.q1.heads.map((h) => (
                  <th key={h} style={CELL}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              {t.q1.rows.map(([user, gets, pays], i) => (
                <tr key={user} style={i < t.q1.rows.length - 1 ? ROW : undefined}>
                  <td style={STRONG_CELL}>{user}</td>
                  <td data-label={t.q1.heads[1]} style={CELL}>
                    {gets}
                  </td>
                  <td data-label={t.q1.heads[2]} style={CELL}>
                    {pays}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Question>

      <Question id="q2" label={`${t.question} 2`} title={t.q2.title} answer={t.q2.answer}>
        <div className="grid-2">
          {t.q2.panels.map(([heading, items]) => (
            <div key={heading} style={PANEL}>
              <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>{heading}</div>
              <ul style={{ ...BODY, margin: 0, paddingLeft: "1.2rem" }}>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>{t.q2.paperTitle}</div>
            <ul style={{ ...BODY, margin: 0, paddingLeft: "1.2rem" }}>
              <li>
                {t.q2.paper[0]}
                <Src href={SOURCES.amc}>{t.q2.paper[1]}</Src>
                {t.q2.paper[2]}
                <Src href={SOURCES.stressFree}>{t.q2.paper[3]}</Src>
                {t.q2.paper[4]}
              </li>
            </ul>
          </div>
        </div>
      </Question>

      <Question id="q3" label={`${t.question} 3`} title={t.q3.title} answer={t.q3.answer}>
        <div className="table-wrap">
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
              {t.q3.rows.map(([fact, figure], i) => {
                const last = i === t.q3.rows.length - 1;
                return (
                  <tr key={fact} style={last ? undefined : ROW}>
                    <td style={CELL}>{fact}</td>
                    <td data-label={t.q3.heads[1]} style={{ ...CELL, color: last ? "#34d399" : "var(--text)", fontWeight: 700 }}>
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
        <p style={{ ...BODY, marginBottom: 0, marginTop: "0.9rem" }}>{t.q3.note}</p>
      </Question>

      <Question id="q4" label={`${t.question} 4`} title={t.q4.title} answer={t.q4.answer}>
        <div className="grid-2">
          {t.q4.cards.map(([heading, body]) => (
            <div key={heading} style={PANEL}>
              <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>{heading}</div>
              <p style={{ ...BODY, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
        <p style={{ ...BODY, marginTop: "0.9rem", marginBottom: 0 }}>
          <strong>{t.q4.limitLabel}</strong> {t.q4.limit}
        </p>
      </Question>

      <Question id="q5" label={`${t.question} 5`} title={t.q5.title} answer={t.q5.answer}>
        <div className="table-wrap">
          <table className="stack-table" style={TABLE}>
            <thead>
              <tr style={HEAD_ROW}>
                {t.q5.heads.map((h) => (
                  <th key={h} style={CELL}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              {t.q5.rows.map(([payer, why, value], i) => {
                const last = i === t.q5.rows.length - 1;
                return (
                  <tr key={payer} style={last ? undefined : ROW}>
                    <td style={STRONG_CELL}>{payer}</td>
                    <td data-label={t.q5.heads[1]} style={CELL}>
                      {why}
                    </td>
                    <td data-label={t.q5.defaultLabel} style={last ? { ...CELL, color: "#34d399", fontWeight: 800 } : CELL}>
                      {value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ ...BODY, marginTop: "0.9rem", marginBottom: 0 }}>{t.q5.note}</p>
      </Question>

      <Question id="q6" label={`${t.question} 6`} title={t.q6.title} answer={t.q6.answer}>
        <ol style={{ ...BODY, paddingLeft: "1.2rem", marginBottom: 0 }}>
          {t.q6.list.map(([label, text]) => (
            <li key={label}>
              <strong>{label}</strong> {text}
            </li>
          ))}
        </ol>
      </Question>

      <section id="pilot" className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span className="badge badge-green">{t.pilot.badge}</span>
          <h2 style={{ margin: 0, fontSize: "1.35rem" }}>{t.pilot.title}</h2>
        </div>
        <div className="grid-2">
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>{t.pilot.planTitle}</div>
            <ol style={{ ...BODY, margin: 0, paddingLeft: "1.2rem" }}>
              {t.pilot.plan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>{t.pilot.stopTitle}</div>
            <ul style={{ ...BODY, margin: 0, paddingLeft: "1.2rem" }}>
              {t.pilot.stop.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p style={{ ...BODY, marginTop: "0.9rem", marginBottom: 0 }}>
          <strong>{t.pilot.risksLabel}</strong> {t.pilot.risks}
        </p>
      </section>

      <footer style={{ textAlign: "center", padding: "2rem 0", borderTop: "1px solid var(--border)", marginTop: "1.5rem" }}>
        <Link href="/pariksha-saathi" className="control-pill" style={{ display: "inline-block", background: "var(--primary)", color: "#ffffff", padding: "0.7rem 1.8rem", borderRadius: "10px", fontWeight: 700, textDecoration: "none" }}>
          {t.cta}
        </Link>
        <div style={{ marginTop: "0.9rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>{t.footnote}</div>
      </footer>
    </div>
  );
}
