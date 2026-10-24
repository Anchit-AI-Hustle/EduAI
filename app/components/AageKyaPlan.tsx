"use client";

import React from "react";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./useLanguage";
import { SOURCES } from "./aageKyaData";

// Strategy page for the Aage Kya pitch: why the earlier idea was replaced,
// the six venture questions with evidence, a dated roadmap with go/stop
// gates, metrics and risks. Every string has English and Hindi versions.

interface QA {
  q: string;
  a: string;
  points: string[];
}

interface Phase {
  when: string;
  title: string;
  items: string[];
  gate: string;
}

const COPY = {
  en: {
    badge: "Strategy and roadmap",
    independent: "Independent pitch, not affiliated with Amar Ujala",
    title: "Aage Kya: Strategy, Roadmap and the Six Questions",
    lead:
      "A plan for the Senior PM, Education brief: bring the existing programmes onto one platform, take the vertical into a new area, and earn revenue in the first season.",
    back: "← Back to the prototype",
    oneLine: "The idea in one line",
    oneLineText:
      "On UP Board result day, give every Class 12 student and parent a free Hindi plan for what comes next (courses, exams, scholarships and verified colleges), and charge colleges only for enquiries made with consent (a verified parent's, for students under 18). Build it on one student profile shared with the olympiad, scholarship and workshop programmes.",
    whyChangeTitle: "Why I replaced my first idea (Pariksha Saathi)",
    whyChange: [
      "It duplicated an existing product. The Amar Ujala olympiad already gives every student an AI report on 50+ parameters, so a weekly diagnostic test competes with Amar Ujala's own offer.",
      "Its revenue leaned on selling to schools one by one, which is slow and seasonal, and its figures were not tied to anything Amar Ujala already sells.",
      "It ignored the end of the brief that pays: \"college admission\". Education is the largest buyer of print ads in India, and colleges and universities are a large part of that spend.",
      "Its roadmap stopped at an 8-week pilot, with no path to a platform."
    ],
    specTitle: "Scope",
    spec: [
      ["Goal", "A revenue-earning admission product live for the UP Board 2027 results (late April), built on a shared student profile."],
      ["Users", "Class 12 pass-outs and their parents (users); colleges and universities (payers); Amar Ujala's ad desk (seller)."],
      ["Constraints", "Hindi first and phone first; verifiable parent consent for under-18s; payment never changes the order; verification by the product team, never the ad desk; no new sales team in year one."],
      ["Out of scope in year one", "Coaching or test prep, a college app, the Class 10 stream choice and states other than UP (both planned for the 2028 results)."]
    ],
    qaTitle: "The six questions",
    qa: [
      {
        q: "1. Who will use it?",
        a: "Class 12 pass-outs in UP's district towns and their parents, mostly Hindi-medium, on a phone, on the day the result comes out. The payer is the college.",
        points: [
          "25.99 lakh students sat the UP Board Class 12 exam in 2025 and 81.15% passed, about 21 lakh.",
          "Parents decide and pay the fees, so the product speaks to them as well; for students under 18 they give consent for every enquiry.",
          "Colleges and universities pay: UP has 8,375 colleges, the most of any state (AISHE 2021-22)."
        ]
      },
      {
        q: "2. What do they use currently?",
        a: "Relatives, a teacher, the local coaching centre, print admission ads and admission agents, who are often paid by colleges. Online, the big aggregators are English-first.",
        points: [
          "Hindi news sites such as Jagran Josh and Live Hindustan publish admission news, but none turns a result into a personal plan with consented enquiries.",
          "No source today is at once neutral, in Hindi, district-level and present at the result moment.",
          "Aggregators also earn mainly from colleges, so the model is proven; the gap is language, trust and reach in small towns."
        ]
      },
      {
        q: "3. How many users face this problem?",
        a: "About 21 lakh UP Board Class 12 pass-outs every year, before counting CBSE students in UP or the other five states where Amar Ujala publishes.",
        points: [
          "27.4 lakh registered for UP Board Class 10 in 2025. Their results come out the same day, so the stream choice for Class 11 is a natural second product for the 2028 results.",
          "Fake and unrecognised institutions are a real risk in this market: UGC lists 32 fake universities, 4 of them in UP and 12 in Delhi."
        ]
      },
      {
        q: "4. Why will it be better?",
        a: "Because Amar Ujala already has the three things competitors pay for: the audience at the right moment, trust, and a sales channel to colleges.",
        points: [
          "Reach at almost no acquisition cost: the results page, district editions and 37,000+ olympiad partner schools. By contrast, CollegeDekho spent ₹126 crore on advertising and promotion in FY25 to find students.",
          "Hindi and district-first: courses, fees and distances that fit a family in Bareilly, not a metro.",
          "Trust rules a newspaper can stand behind: a free fake-university check, a visible label on paying colleges and an order that payment never changes.",
          "The right person consents: adult students themselves, and verified parents for under-18s, as India's data protection law requires."
        ]
      },
      {
        q: "5. Will they pay?",
        a: "Colleges, yes: they already do. Students and parents use it free; a small paid counselling call is a test, not a pillar.",
        points: [
          "Education took 17% of India's print ad space in January to September 2025, the largest sector (TAM AdEx).",
          "CollegeDekho's operating revenue was ₹215.6 crore in FY24 and stayed flat in FY25; it earns mainly from colleges: commissions, marketing and promotion.",
          "What is unknown is the price per enquiry; the ad desk tests it with 30 colleges before launch. Year one is small on purpose (about ₹1.2 crore in the base case): it proves price and consent before scaling."
        ]
      },
      {
        q: "6. What is the real problem not solved right now?",
        a: "Result day ends at the marksheet. A Hindi-medium family has no trusted, neutral place that turns \"I passed\" into a safe admission decision with the parent involved, so the most important spending decision of a child's education is made on ads, agents and guesswork.",
        points: [
          "The cost of a wrong choice is high: a year lost, fees paid to an unrecognised institute, or a course that does not lead to work.",
          "Amar Ujala already meets this family at that exact moment, on its results page, and today the visit ends at the marksheet."
        ]
      }
    ] as QA[],
    roadmapTitle: "Roadmap",
    roadmapLead: "Dated against the next UP Board results (usually late April), assuming I join in December 2026. Each phase ends in a gate: go, shrink or stop.",
    phases: [
      {
        when: "Month 1 (December 2026)",
        title: "Listen, audit and start legal review",
        items: [
          "Map every programme (olympiad, scholarship, workshops, results site): users, data, owners, revenue.",
          "Interview 20 parents, 10 college admission heads, 5 schools and the ad desk in two districts.",
          "Start the legal review of children's data; agree the north-star metric and the build-or-buy call on college data."
        ],
        gate: "Gate: leadership agrees on the result-day entry point and one shared profile."
      },
      {
        when: "Months 2 to 4 (January to March 2027)",
        title: "Build the minimum product",
        items: [
          "Statewide plan: courses, exams and scholarships for every UP district.",
          "College listings for three pilot zones, verified by the product team against UGC, AICTE and state affiliation lists.",
          "Profile with an age check, verifiable parent consent for under-18s and withdrawal.",
          "Enquiry dashboard; pricing test with the ad desk; sign 30 pilot colleges.",
          "Test the shared profile with olympiad Level 2 families (Class 9 and 10), who are the next cohorts."
        ],
        gate: "Gate: 25+ colleges signed and verified. If not, launch with print bundles only."
      },
      {
        when: "Month 5 (April 2027)",
        title: "Get ready for result day",
        items: [
          "\"Aage Kya\" print series in district editions with a QR code to the plan.",
          "Load-test the results page; legal sign-off on consent before the children's-data rules apply (about May 2027)."
        ],
        gate: "Gate: consent flow signed off by legal."
      },
      {
        when: "Late April to July 2027",
        title: "Launch on UP Board result day",
        items: [
          "Plan live statewide on the results page and in print; listings and enquiries in the pilot zones.",
          "Colleges billed per enquiry; season bundles sold through the ad desk; weekly metrics review."
        ],
        gate: "Gate (end of May): 5%+ of result visitors start a plan and 40%+ of them finish."
      },
      {
        when: "August to December 2027",
        title: "Review and build season two",
        items: [
          "Listings for all UP zones.",
          "Class 10 stream choice, launched on the same result day in 2028.",
          "Boards of Uttarakhand, Himachal, Haryana, Punjab and J&K, whose results come out in April to May 2028."
        ],
        gate: "Gate: 60%+ of pilot colleges sign intent to renew and upheld complaints stay under 2%."
      },
      {
        when: "2028",
        title: "One platform, all year",
        items: [
          "Season two in six states, for Class 10 and Class 12.",
          "Olympiad, scholarship, workshops and Aage Kya on one profile, with one consent; school dashboards."
        ],
        gate: "Goal: a year-round relationship with every family, not one-off events."
      }
    ] as Phase[],
    metricsTitle: "How success is measured",
    metricsHead: ["Type", "Metric"],
    metrics: [
      ["North star", "Families who sent at least one consented enquiry"],
      ["Input", "Plan starts from the results page; plan completion rate; consent rate"],
      ["Quality", "Share of enquiries called within 48 hours; enquiries that became admissions (reported by colleges)"],
      ["Revenue", "Enquiries billed; season bundles sold; college renewal rate"],
      ["Guardrails", "Upheld complaints; consent withdrawals; share of screens that are sponsored"]
    ],
    risksTitle: "Risks and how they are handled",
    risksHead: ["Risk", "Mitigation"],
    risks: [
      ["Children's data (DPDP Act and Rules)", "Age check first; adult students consent themselves; for under-18s, verifiable parent consent (for example DigiLocker or an age token, as the Rules allow), minimum fields and withdrawal at any time. No behavioural tracking of children and no targeted ads: everyone with the same answers sees the same list. Legal review from month 1."],
      ["Ad desk sells to the colleges editorial calls verified", "Verification is done by the product team from public regulator lists and is never sold; paying only adds a visible label; editorial owns the listing rules."],
      ["Enquiry fees eat into print ad spend", "Sell enquiries as an add-on to the print bundle and track each education advertiser's total spend, not just enquiries."],
      ["Bad or outdated college data", "Start with three zones; colleges must pass a recognition check before going live; students can report errors."],
      ["Revenue packed into April to July", "Class 10 stream choice and olympiad profiles spread the year; bundles booked in advance."],
      ["Competitors add Hindi", "Distribution is the moat: result day, print and partner schools are hard to copy."],
      ["Admission agents push back", "Agents can register as counsellors under the same rules, or stay outside the product."]
    ],
    stopTitle: "What would make me stop",
    stop: [
      "Fewer than 25 colleges willing to pay in the pricing test: ship as a free service funded by print bundles only.",
      "Under 2% of result visitors start a plan after two weeks of prominent placement: the entry point is wrong.",
      "Most families decline consent: enquiries are the wrong unit, move to print bundles, profiles and counselling."
    ],
    askTitle: "What I would need in week one",
    ask: [
      "Results-site traffic for the last two result days.",
      "The ad desk's list of education advertisers and their season spend.",
      "The olympiad's student and school data model.",
      "A legal review of children's data, starting in month 1."
    ],
    sourcesTitle: "Sources",
    footer: "Independent concept for a job application. Not affiliated with or endorsed by Amar Ujala. Figures are from the public sources listed; revenue figures in the prototype are editable assumptions."
  },
  hi: {
    badge: "रणनीति और रोडमैप",
    independent: "स्वतंत्र प्रस्ताव, अमर उजाला से संबद्ध नहीं",
    title: "आगे क्या: रणनीति, रोडमैप और छह सवाल",
    lead:
      "सीनियर प्रोडक्ट मैनेजर, शिक्षा की भूमिका के लिए योजना: मौजूदा कार्यक्रमों को एक प्लेटफॉर्म पर लाना, शिक्षा वर्टिकल को एक नए क्षेत्र में ले जाना, और पहले ही सीज़न में आय कमाना।",
    back: "← प्रोटोटाइप पर लौटें",
    oneLine: "एक पंक्ति में विचार",
    oneLineText:
      "यूपी बोर्ड के रिजल्ट के दिन कक्षा 12 के हर छात्र और अभिभावक को आगे की मुफ्त हिंदी योजना दें (कोर्स, परीक्षाएँ, छात्रवृत्तियाँ और सत्यापित कॉलेज), और कॉलेजों से केवल उन्हीं पूछताछ का शुल्क लें जो सहमति से भेजी गई हों (18 से कम उम्र के छात्रों के लिए सत्यापित अभिभावक की सहमति)। इसे एक ऐसी छात्र प्रोफाइल पर बनाएँ जो ओलंपियाड, छात्रवृत्ति और कार्यशाला कार्यक्रमों में साझा हो।",
    whyChangeTitle: "मैंने अपना पहला विचार (परीक्षा साथी) क्यों बदला",
    whyChange: [
      "यह एक मौजूदा प्रोडक्ट की नकल था। अमर उजाला ओलंपियाड पहले से हर छात्र को 50+ मापदंडों पर एआई रिपोर्ट देता है, इसलिए साप्ताहिक निदान टेस्ट अमर उजाला की अपनी पेशकश से ही होड़ करता।",
      "इसकी आय स्कूलों को एक-एक करके बेचने पर टिकी थी, जो धीमा और मौसमी काम है, और इसके आँकड़ों का अमर उजाला की मौजूदा बिक्री से कोई संबंध नहीं था।",
      "इसने भर्ती सूचना का वह हिस्सा छोड़ दिया जिससे आय होती है: \"कॉलेज प्रवेश\"। भारत में प्रिंट विज्ञापन का सबसे बड़ा खरीदार शिक्षा क्षेत्र है, और इस खर्च का बड़ा हिस्सा कॉलेजों और विश्वविद्यालयों का है।",
      "इसका रोडमैप 8 सप्ताह के पायलट पर रुक जाता था, प्लेटफॉर्म तक कोई रास्ता नहीं था।"
    ],
    specTitle: "दायरा",
    spec: [
      ["लक्ष्य", "यूपी बोर्ड 2027 के रिजल्ट (अप्रैल के आखिर) तक लाइव, आय कमाने वाला प्रवेश प्रोडक्ट, जो साझा छात्र प्रोफाइल पर बना हो।"],
      ["उपयोगकर्ता", "कक्षा 12 पास छात्र और उनके अभिभावक (उपयोगकर्ता); कॉलेज और विश्वविद्यालय (भुगतान करने वाले); अमर उजाला का विज्ञापन डेस्क (बेचने वाला)।"],
      ["शर्तें", "हिंदी, मोबाइल और जिले को प्राथमिकता; 18 से कम उम्र के लिए अभिभावक की सत्यापित सहमति; भुगतान से क्रम कभी नहीं बदलता; सत्यापन प्रोडक्ट टीम करे, विज्ञापन डेस्क कभी नहीं; पहले साल कोई नई बिक्री टीम नहीं।"],
      ["पहले साल दायरे से बाहर", "कोचिंग या टेस्ट की तैयारी, कॉलेज ऐप, कक्षा 10 के बाद संकाय का चुनाव और यूपी के अलावा अन्य राज्य (दोनों 2028 के रिजल्ट के लिए)।"]
    ],
    qaTitle: "छह सवाल",
    qa: [
      {
        q: "1. इसका उपयोग कौन करेगा?",
        a: "यूपी के जिला कस्बों के कक्षा 12 पास छात्र और उनके अभिभावक, ज़्यादातर हिंदी माध्यम के, फोन पर, उसी दिन जब रिजल्ट आता है। भुगतान कॉलेज करता है।",
        points: [
          "2025 में 25.99 लाख छात्र यूपी बोर्ड कक्षा 12 की परीक्षा में बैठे और 81.15% पास हुए, यानी लगभग 21 लाख।",
          "फैसला और फीस का भुगतान अभिभावक करते हैं, इसलिए प्रोडक्ट उनसे भी बात करता है; 18 से कम उम्र के छात्रों की हर पूछताछ के लिए सहमति वे ही देते हैं।",
          "कॉलेज और विश्वविद्यालय भुगतान करते हैं: यूपी में 8,375 कॉलेज हैं, किसी भी राज्य से अधिक (AISHE 2021-22)।"
        ]
      },
      {
        q: "2. वे अभी क्या इस्तेमाल करते हैं?",
        a: "रिश्तेदार, कोई शिक्षक, स्थानीय कोचिंग, अखबारों के प्रवेश विज्ञापन और प्रवेश एजेंट, जिन्हें अक्सर कॉलेज भुगतान करते हैं। ऑनलाइन, बड़े एग्रीगेटर अंग्रेज़ी-प्रधान हैं।",
        points: [
          "जागरण जोश और लाइव हिंदुस्तान जैसी हिंदी समाचार साइटें प्रवेश की खबरें छापती हैं, पर कोई भी रिजल्ट को सहमति वाली पूछताछ के साथ व्यक्तिगत योजना में नहीं बदलती।",
          "आज कोई भी स्रोत एक साथ निष्पक्ष, हिंदी में, जिला-स्तर का और रिजल्ट के पल पर मौजूद नहीं है।",
          "एग्रीगेटर भी मुख्य रूप से कॉलेजों से कमाते हैं, यानी मॉडल साबित है; कमी भाषा, भरोसे और छोटे शहरों तक पहुँच की है।"
        ]
      },
      {
        q: "3. कितने उपयोगकर्ता इस समस्या का सामना करते हैं?",
        a: "हर साल यूपी बोर्ड कक्षा 12 के लगभग 21 लाख पास छात्र, यूपी के सीबीएसई छात्रों और उन पाँच अन्य राज्यों को गिने बिना जहाँ अमर उजाला छपता है।",
        points: [
          "2025 में यूपी बोर्ड कक्षा 10 के लिए 27.4 लाख ने पंजीकरण कराया। उनका रिजल्ट भी उसी दिन आता है, इसलिए कक्षा 11 के लिए संकाय का चुनाव 2028 के रिजल्ट के लिए स्वाभाविक दूसरा प्रोडक्ट है।",
          "इस बाज़ार में फर्जी और गैर-मान्यता प्राप्त संस्थान असली खतरा हैं: यूजीसी 32 फर्जी विश्वविद्यालयों की सूची देता है, जिनमें 4 यूपी में और 12 दिल्ली में हैं।"
        ]
      },
      {
        q: "4. यह बेहतर क्यों होगा?",
        a: "क्योंकि अमर उजाला के पास पहले से वे तीन चीज़ें हैं जिनके लिए प्रतिस्पर्धी पैसा खर्च करते हैं: सही समय पर दर्शक, भरोसा, और कॉलेजों तक बिक्री का रास्ता।",
        points: [
          "लगभग बिना खर्च के पहुँच: रिजल्ट पेज, जिला संस्करण और ओलंपियाड के 37,000+ पार्टनर स्कूल। इसके उलट, कॉलेजदेखो ने FY25 में छात्रों तक पहुँचने के लिए विज्ञापन और प्रचार पर ₹126 करोड़ खर्च किए।",
          "हिंदी और जिले को प्राथमिकता: ऐसे कोर्स, फीस और दूरी जो बरेली के परिवार के हिसाब से हों, महानगर के नहीं।",
          "भरोसे के नियम जिनके पीछे एक अखबार खड़ा हो सके: मुफ्त फर्जी विश्वविद्यालय जाँच, भुगतान करने वाले कॉलेजों पर साफ लेबल, और ऐसा क्रम जिसे भुगतान कभी नहीं बदलता।",
          "सही व्यक्ति सहमति देता है: वयस्क छात्र खुद, और 18 से कम उम्र के लिए सत्यापित अभिभावक, जैसा भारत का डेटा संरक्षण कानून माँगता है।"
        ]
      },
      {
        q: "5. क्या वे भुगतान करेंगे?",
        a: "कॉलेज, हाँ: वे पहले से करते हैं। छात्र और अभिभावक इसे मुफ्त इस्तेमाल करते हैं; छोटी सशुल्क काउंसलिंग कॉल एक परीक्षण है, आय का मुख्य आधार नहीं।",
        points: [
          "जनवरी से सितंबर 2025 में भारत के प्रिंट विज्ञापन स्थान का 17% शिक्षा क्षेत्र ने लिया, जो सबसे बड़ा क्षेत्र है (TAM AdEx)।",
          "FY24 में कॉलेजदेखो की परिचालन आय ₹215.6 करोड़ थी और FY25 में लगभग उतनी ही रही; यह मुख्य रूप से कॉलेजों से कमाता है: कमीशन, मार्केटिंग और प्रचार।",
          "प्रति पूछताछ कीमत अभी अज्ञात है; लॉन्च से पहले विज्ञापन डेस्क इसे 30 कॉलेजों के साथ परखेगा। पहला साल जानबूझकर छोटा है (आधार अनुमान में लगभग ₹1.2 करोड़): बढ़ाने से पहले यह कीमत और सहमति साबित करता है।"
        ]
      },
      {
        q: "6. असली समस्या क्या है जो अभी हल नहीं हुई?",
        a: "रिजल्ट का दिन मार्कशीट पर खत्म हो जाता है। हिंदी माध्यम के परिवार के पास कोई भरोसेमंद, निष्पक्ष जगह नहीं है जो \"मैं पास हो गया\" को अभिभावक की भागीदारी के साथ प्रवेश के सुरक्षित फैसले में बदल दे, इसलिए बच्चे की पढ़ाई पर खर्च का सबसे बड़ा फैसला विज्ञापनों, एजेंटों और अंदाज़ों पर होता है।",
        points: [
          "गलत चुनाव की कीमत भारी है: एक साल का नुकसान, गैर-मान्यता प्राप्त संस्थान को दी गई फीस, या ऐसा कोर्स जिससे काम न मिले।",
          "अमर उजाला इस परिवार से ठीक उसी पल, अपने रिजल्ट पेज पर, पहले से मिलता है, और आज यह मुलाकात मार्कशीट पर खत्म हो जाती है।"
        ]
      }
    ] as QA[],
    roadmapTitle: "रोडमैप",
    roadmapLead: "अगले यूपी बोर्ड रिजल्ट (आमतौर पर अप्रैल के आखिर में) के हिसाब से तारीखें, यह मानकर कि मैं दिसंबर 2026 में जुड़ूँ। हर चरण एक पड़ाव पर खत्म होता है: आगे बढ़ें, छोटा करें या रोकें।",
    phases: [
      {
        when: "महीना 1 (दिसंबर 2026)",
        title: "सुनना, जाँचना और कानूनी समीक्षा शुरू करना",
        items: [
          "हर कार्यक्रम (ओलंपियाड, छात्रवृत्ति, कार्यशालाएँ, रिजल्ट साइट) का नक्शा: उपयोगकर्ता, डेटा, ज़िम्मेदार लोग, आय।",
          "दो जिलों में 20 अभिभावकों, 10 कॉलेज प्रवेश प्रमुखों, 5 स्कूलों और विज्ञापन डेस्क से बातचीत।",
          "बच्चों के डेटा की कानूनी समीक्षा शुरू; मुख्य मापदंड (नॉर्थ स्टार) पर सहमति और कॉलेज डेटा खुद बनाएँ या खरीदें, इसका फैसला।"
        ],
        gate: "पड़ाव: नेतृत्व रिजल्ट-दिवस के शुरुआती बिंदु और एक साझा प्रोफाइल पर सहमत हो।"
      },
      {
        when: "महीने 2 से 4 (जनवरी से मार्च 2027)",
        title: "न्यूनतम प्रोडक्ट बनाना",
        items: [
          "पूरे प्रदेश के लिए योजना: यूपी के हर जिले के लिए कोर्स, परीक्षाएँ और छात्रवृत्तियाँ।",
          "तीन पायलट ज़ोन के लिए कॉलेज सूची, जिसे प्रोडक्ट टीम यूजीसी, AICTE और राज्य संबद्धता सूचियों से जाँचे।",
          "उम्र की जाँच, 18 से कम उम्र के लिए अभिभावक की सत्यापित सहमति और सहमति वापस लेने वाली प्रोफाइल।",
          "पूछताछ डैशबोर्ड; विज्ञापन डेस्क के साथ कीमत का परीक्षण; 30 पायलट कॉलेजों से अनुबंध।",
          "ओलंपियाड लेवल 2 के परिवारों (कक्षा 9 और 10) के साथ साझा प्रोफाइल का परीक्षण, जो अगले बैच हैं।"
        ],
        gate: "पड़ाव: 25+ कॉलेज अनुबंधित और सत्यापित। ऐसा न हो तो केवल प्रिंट पैकेज के साथ लॉन्च करें।"
      },
      {
        when: "महीना 5 (अप्रैल 2027)",
        title: "रिजल्ट के दिन की तैयारी",
        items: [
          "जिला संस्करणों में \"आगे क्या\" प्रिंट शृंखला, योजना तक पहुँचाने वाले QR कोड के साथ।",
          "रिजल्ट पेज का लोड टेस्ट; बच्चों के डेटा के नियम लागू होने (लगभग मई 2027) से पहले सहमति पर कानूनी मंज़ूरी।"
        ],
        gate: "पड़ाव: सहमति की प्रक्रिया को कानूनी टीम की मंज़ूरी।"
      },
      {
        when: "अप्रैल के आखिर से जुलाई 2027",
        title: "यूपी बोर्ड रिजल्ट के दिन लॉन्च",
        items: [
          "योजना पूरे प्रदेश में रिजल्ट पेज और प्रिंट में लाइव; कॉलेज सूची और पूछताछ पायलट ज़ोन में।",
          "कॉलेजों से प्रति पूछताछ शुल्क; विज्ञापन डेस्क के ज़रिए सीज़न पैकेज की बिक्री; हर सप्ताह मापदंडों की समीक्षा।"
        ],
        gate: "पड़ाव (मई के आखिर में): रिजल्ट देखने वालों में से 5%+ योजना शुरू करें और उनमें से 40%+ पूरी करें।"
      },
      {
        when: "अगस्त से दिसंबर 2027",
        title: "समीक्षा और दूसरे सीज़न की तैयारी",
        items: [
          "यूपी के सभी ज़ोन के लिए कॉलेज सूची।",
          "कक्षा 10 के बाद संकाय का चुनाव, 2028 में उसी रिजल्ट के दिन लॉन्च।",
          "उत्तराखंड, हिमाचल, हरियाणा, पंजाब और जम्मू-कश्मीर के बोर्ड, जिनके रिजल्ट अप्रैल से मई 2028 में आते हैं।"
        ],
        gate: "पड़ाव: 60%+ पायलट कॉलेज नवीनीकरण का इरादा लिखित में दें और सही पाई गई शिकायतें 2% से कम रहें।"
      },
      {
        when: "2028",
        title: "एक प्लेटफॉर्म, पूरे साल",
        items: [
          "छह राज्यों में कक्षा 10 और कक्षा 12 के लिए दूसरा सीज़न।",
          "ओलंपियाड, छात्रवृत्ति, कार्यशालाएँ और \"आगे क्या\" एक प्रोफाइल पर, एक ही सहमति के साथ; स्कूल डैशबोर्ड।"
        ],
        gate: "लक्ष्य: एक बार के आयोजनों की जगह हर परिवार से साल भर का रिश्ता।"
      }
    ] as Phase[],
    metricsTitle: "सफलता कैसे मापी जाएगी",
    metricsHead: ["प्रकार", "मापदंड"],
    metrics: [
      ["मुख्य मापदंड (नॉर्थ स्टार)", "वे परिवार जिन्होंने सहमति के साथ कम से कम एक पूछताछ भेजी"],
      ["इनपुट", "रिजल्ट पेज से शुरू हुई योजनाएँ; योजना पूरी करने की दर; सहमति की दर"],
      ["गुणवत्ता", "48 घंटे में कॉल हुई पूछताछ का हिस्सा; प्रवेश में बदली पूछताछ (कॉलेजों के अनुसार)"],
      ["आय", "बिल हुई पूछताछ; बिके सीज़न पैकेज; कॉलेजों के नवीनीकरण की दर"],
      ["सुरक्षा सीमाएँ", "सही पाई गई शिकायतें; वापस ली गई सहमतियाँ; प्रायोजित स्क्रीन का हिस्सा"]
    ],
    risksTitle: "जोखिम और उनसे निपटने का तरीका",
    risksHead: ["जोखिम", "उपाय"],
    risks: [
      ["बच्चों का डेटा (डीपीडीपी अधिनियम और नियम)", "पहले उम्र की जाँच; वयस्क छात्र खुद सहमति दें; 18 से कम उम्र के लिए अभिभावक की सत्यापित सहमति (जैसे डिजिलॉकर या उम्र टोकन, जैसा नियम अनुमति देते हैं), न्यूनतम जानकारी और कभी भी वापसी। बच्चों के व्यवहार पर निगरानी (बिहेवियरल ट्रैकिंग) नहीं और कोई लक्षित विज्ञापन नहीं: एक जैसे जवाब देने वाले हर व्यक्ति को एक जैसी सूची दिखती है। पहले महीने से कानूनी समीक्षा।"],
      ["विज्ञापन डेस्क उन्हीं कॉलेजों को बेचे जिन्हें संपादकीय सत्यापित बताए", "सत्यापन प्रोडक्ट टीम सार्वजनिक नियामक सूचियों से करती है और यह कभी बेचा नहीं जाता; भुगतान से केवल एक साफ लेबल जुड़ता है; सूची के नियम संपादकीय टीम तय करती है।"],
      ["पूछताछ शुल्क प्रिंट विज्ञापन खर्च में से कटे", "पूछताछ को प्रिंट पैकेज के साथ अतिरिक्त सेवा के रूप में बेचें और हर शिक्षा विज्ञापनदाता का कुल खर्च देखें, केवल पूछताछ नहीं।"],
      ["कॉलेज का गलत या पुराना डेटा", "तीन ज़ोन से शुरुआत; लाइव होने से पहले कॉलेज को मान्यता जाँच पास करनी होगी; छात्र गलती की शिकायत कर सकते हैं।"],
      ["आय अप्रैल से जुलाई में सिमटी रहे", "कक्षा 10 के बाद संकाय चुनाव और ओलंपियाड प्रोफाइल से पूरे साल काम; पैकेज पहले से बुक।"],
      ["प्रतिस्पर्धी हिंदी जोड़ लें", "बढ़त वितरण में है: रिजल्ट का दिन, प्रिंट और पार्टनर स्कूल, इनकी नकल मुश्किल है।"],
      ["प्रवेश एजेंटों का विरोध", "एजेंट उन्हीं नियमों के तहत काउंसलर के रूप में जुड़ सकते हैं, या प्रोडक्ट से बाहर रह सकते हैं।"]
    ],
    stopTitle: "किन हालात में मैं रोक दूँगा",
    stop: [
      "कीमत के परीक्षण में 25 से कम कॉलेज भुगतान को तैयार हों: केवल प्रिंट पैकेज से चलने वाली मुफ्त सेवा के रूप में चलाएँ।",
      "दो सप्ताह प्रमुखता से दिखाने के बाद भी रिजल्ट देखने वालों में से 2% से कम योजना शुरू करें: शुरुआती बिंदु गलत है।",
      "ज़्यादातर परिवार सहमति न दें: पूछताछ सही इकाई नहीं है, प्रिंट पैकेज, प्रोफाइल और काउंसलिंग की ओर जाएँ।"
    ],
    askTitle: "पहले सप्ताह में मुझे क्या चाहिए",
    ask: [
      "पिछले दो रिजल्ट-दिवस का रिजल्ट साइट ट्रैफिक।",
      "विज्ञापन डेस्क की शिक्षा विज्ञापनदाताओं की सूची और उनका सीज़न खर्च।",
      "ओलंपियाड का छात्र और स्कूल डेटा मॉडल।",
      "बच्चों के डेटा पर कानूनी समीक्षा, पहले महीने से ही।"
    ],
    sourcesTitle: "स्रोत",
    footer: "नौकरी के आवेदन के लिए स्वतंत्र कॉन्सेप्ट। अमर उजाला से संबद्ध या समर्थित नहीं। आँकड़े नीचे दिए सार्वजनिक स्रोतों से हैं; प्रोटोटाइप में आय के आँकड़े बदले जा सकने वाले अनुमान हैं।"
  }
};

const SOURCE_LIST: { label: string; url: string }[] = [
  { label: "UP Board Class 12 result 2025: 25,98,560 appeared, 81.15% passed (Careers360)", url: SOURCES.upBoard2025 },
  { label: "UP Board results 2025 (IANS)", url: SOURCES.upBoardIans },
  { label: "UP Board 2025: 27.4 lakh Class 10 and 26.98 lakh Class 12 registrations (Amar Ujala results)", url: "https://results.amarujala.com/exam-alerts/up-board-exam-2025-27-4-lakh-candidates-registered-for-high-school-26-98-lakh-for-intermediate" },
  { label: "AISHE 2021-22: UP has 8,375 colleges, the most of any state (Careers360 / PTI)", url: SOURCES.aishe },
  { label: "TAM AdEx Jan to Sep 2025: education 17% of print ad space (Storyboard18)", url: SOURCES.tam2025 },
  { label: "Amar Ujala National Olympiad: Classes 1 to 10, AI report, 37,000+ partner schools", url: SOURCES.auno },
  { label: "Atul Maheshwari Chhatravritti (Amar Ujala Foundation)", url: SOURCES.amc },
  { label: "Stress-free exam programme (INMA)", url: SOURCES.stressFree },
  { label: "UGC list of fake universities, February 2026", url: SOURCES.ugcFake },
  { label: "CollegeDekho FY25: ₹126 crore advertising and promotion (Entrackr)", url: SOURCES.collegeDekhoFy25 },
  { label: "CollegeDekho FY24: ₹215.6 crore operating revenue (Inc42)", url: SOURCES.collegeDekhoFy24 },
  { label: "IRS 2019 Q4: Amar Ujala 4th by average issue readership (exchange4media)", url: SOURCES.irs2019 },
  { label: "DPDP Rules 2025: phased commencement (Shardul Amarchand Mangaldas alert)", url: SOURCES.dpdpRules },
  { label: "DPDP Act section 9: no tracking or targeted ads to children (CyberPeace)", url: SOURCES.dpdpChildren }
];

export default function AageKyaPlan() {
  const [lang, setLang] = useLanguage();
  const t = COPY[lang];

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
        <Link href="/aage-kya" className="ak-muted" style={{ display: "inline-block", marginBottom: "0.5rem" }}>
          {t.back}
        </Link>
        <header className="ak-hero">
          <h1>{t.title}</h1>
          <p className="ak-lead">{t.lead}</p>
        </header>

        <section className="ak-card" style={{ borderColor: "#bfdcd2", background: "#f4faf7" }}>
          <h2>{t.oneLine}</h2>
          <p style={{ margin: 0, fontSize: "1.05rem" }}>{t.oneLineText}</p>
        </section>

        <div className="ak-grid-2" style={{ marginTop: "0.85rem" }}>
          <section className="ak-card">
            <h2>{t.whyChangeTitle}</h2>
            <ol style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.4rem" }}>
              {t.whyChange.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
          </section>
          <section className="ak-card">
            <h2>{t.specTitle}</h2>
            <dl style={{ margin: 0, display: "grid", gap: "0.5rem" }}>
              {t.spec.map(([k, v]) => (
                <div key={k}>
                  <dt style={{ fontWeight: 700 }}>{k}</dt>
                  <dd style={{ margin: 0, color: "var(--ak-ink-2)" }}>{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <h2 style={{ margin: "1.5rem 0 0.75rem", fontSize: "1.4rem" }}>{t.qaTitle}</h2>
        <div className="ak-grid-2">
          {t.qa.map((x) => (
            <section className="ak-card" key={x.q} style={{ margin: 0 }}>
              <h3>{x.q}</h3>
              <p style={{ margin: "0 0 0.5rem", fontWeight: 600 }}>{x.a}</p>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--ak-ink-2)", display: "grid", gap: "0.3rem" }}>
                {x.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="ak-card" style={{ marginTop: "1.25rem" }}>
          <h2>{t.roadmapTitle}</h2>
          <p className="ak-muted" style={{ marginTop: 0 }}>
            {t.roadmapLead}
          </p>
          <ol className="ak-timeline" style={{ marginTop: "0.75rem" }}>
            {t.phases.map((p) => (
              <li key={p.when}>
                <div className="ak-when">{p.when}</div>
                <strong>{p.title}</strong>
                <ul style={{ margin: "0.25rem 0 0.4rem", paddingLeft: "1.1rem", color: "var(--ak-ink-2)" }}>
                  {p.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <span className="ak-tag ak-tag-brand" style={{ whiteSpace: "normal" }}>
                  {p.gate}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <div className="ak-grid-2" style={{ marginTop: "0.85rem" }}>
          <section className="ak-card" style={{ margin: 0 }}>
            <h2>{t.metricsTitle}</h2>
            <div className="ak-table-wrap">
              <table className="ak-table ak-stack">
                <thead>
                  <tr>
                    <th>{t.metricsHead[0]}</th>
                    <th>{t.metricsHead[1]}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.metrics.map(([k, v]) => (
                    <tr key={k}>
                      <td data-label={t.metricsHead[0]}>
                        <strong>{k}</strong>
                      </td>
                      <td data-label={t.metricsHead[1]}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="ak-card" style={{ margin: 0 }}>
            <h2>{t.stopTitle}</h2>
            <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "grid", gap: "0.4rem" }}>
              {t.stop.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <h3 style={{ marginTop: "1rem" }}>{t.askTitle}</h3>
            <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
              {t.ask.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="ak-card" style={{ marginTop: "0.85rem" }}>
          <h2>{t.risksTitle}</h2>
          <div className="ak-table-wrap">
            <table className="ak-table ak-stack">
              <thead>
                <tr>
                  <th>{t.risksHead[0]}</th>
                  <th>{t.risksHead[1]}</th>
                </tr>
              </thead>
              <tbody>
                {t.risks.map(([k, v]) => (
                  <tr key={k}>
                    <td data-label={t.risksHead[0]}>
                      <strong>{k}</strong>
                    </td>
                    <td data-label={t.risksHead[1]}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

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
