"use client";

import React, { useState } from "react";
import { LanguageMode } from "../types/curriculum";

interface VentureThesisViewProps {
  lang: LanguageMode;
  brandName: string;
}

export default function VentureThesisView({ lang, brandName }: VentureThesisViewProps) {
  const isHi = lang === "hi";
  const [activeQuestion, setActiveQuestion] = useState<number>(1);

  // Canonical answers live in docs/00-venture-strategy-and-naming.md (Section 2).
  const questions = [
    {
      num: 1,
      q_en: "1. Who will use it?",
      q_hi: "1. इसका उपयोग कौन करेगा?",
      ans_en: [
        "The buyer is the parent; the user is the child.",
        "Primary wedge: parents of CBSE Class 6-8 students in urban and semi-urban India who already pay for tuition, whose children study in English or Hindi, and who worry about hidden gaps before the Class 9 and 10 board years. These are the only grades deepened to chapter level today.",
        "Secondary: NIOS and homeschooling families, a small group with acute pain because nobody gives them a structured year.",
        "Deferred: JEE, NEET, CUET, UPSC, SAT, ACT, IELTS, TOEFL and ages 0-3. Each is a separate business with strong incumbents."
      ],
      ans_hi: [
        "खरीदार अभिभावक हैं; उपयोगकर्ता बच्चा है।",
        "मुख्य शुरुआती वर्ग: शहरी व अर्ध-शहरी भारत में सीबीएसई कक्षा 6-8 के बच्चों के अभिभावक, जो पहले से ट्यूशन पर खर्च करते हैं, जिनके बच्चे अंग्रेज़ी या हिंदी में पढ़ते हैं, और जो कक्षा 9-10 बोर्ड से पहले छिपी कमियों को लेकर चिंतित हैं। अभी केवल यही कक्षाएं अध्याय-स्तर तक विकसित हैं।",
        "द्वितीयक वर्ग: एनआईओएस (NIOS) और घर पर पढ़ाने वाले परिवार, जिन्हें कोई संरचित वार्षिक योजना नहीं देता।",
        "बाद में: जेईई, नीट, सीयूईटी, यूपीएससी, सैट, एक्ट, आईईएलटीएस, टोफेल और 0-3 वर्ष। इनमें से हर एक अलग व्यवसाय है, जहां मज़बूत प्रतिस्पर्धी पहले से मौजूद हैं।"
      ]
    },
    {
      num: 2,
      q_en: "2. What do they use currently?",
      q_hi: "2. वर्तमान में वे क्या उपयोग कर रहे हैं?",
      ans_en: [
        "• Neighbourhood tuition teacher (the real competitor): plans the week, holds the child accountable, clears doubts, and reports to parents on WhatsApp.",
        "• School and textbooks (NCERT, CBSE, CISCE, State Boards): structure and certification, but the pace follows the calendar, not the child's mastery.",
        "• Video apps and YouTube (PW, Vedantu, Byju's, Khan Academy, DIKSHA): unlimited content, no individual plan.",
        "• General AI chatbots (ChatGPT, Gemini, Claude): free and improving fast, but they do not know the child's board version or textbook and keep no long-term mastery record."
      ],
      ans_hi: [
        "• स्थानीय ट्यूशन शिक्षक (असली प्रतिस्पर्धी): सप्ताह की योजना बनाते हैं, बच्चे को जवाबदेह रखते हैं, शंकाएं दूर करते हैं, और व्हाट्सऐप पर अभिभावकों को बताते हैं।",
        "• विद्यालय व पाठ्यपुस्तकें (NCERT, CBSE, CISCE, राज्य बोर्ड): संरचना और प्रमाणन देते हैं, पर गति कैलेंडर से तय होती है, बच्चे की समझ से नहीं।",
        "• वीडियो ऐप्स व यूट्यूब (PW, Vedantu, Byju's, Khan Academy, DIKSHA): असीमित सामग्री, पर कोई व्यक्तिगत योजना नहीं।",
        "• सामान्य एआई चैटबॉट (ChatGPT, Gemini, Claude): मुफ़्त और तेज़ी से बेहतर हो रहे हैं, पर बच्चे का बोर्ड संस्करण या पाठ्यपुस्तक नहीं जानते और दीर्घकालिक प्रगति का रिकॉर्ड नहीं रखते।"
      ]
    },
    {
      num: 3,
      q_en: "3. How many users face this problem?",
      q_hi: "3. कितने उपयोगकर्ता इस समस्या का सामना कर रहे हैं?",
      ans_en: [
        "• All school students: 24.69 crore in 14.71 lakh schools (UDISE+ 2024-25). This headline is not the market.",
        "• CBSE Class 10 registrations, 2025: about 23.85 lakh (as reported), so CBSE Classes 6-8 hold about 70 lakh students (estimate).",
        "• 27.0% of students take private coaching nationally, 30.7% in urban areas (NSS CMS: Education 2025).",
        "• Wedge: about 20 lakh CBSE Class 6-8 families already paying for help (estimate: 70 lakh x about 30%)."
      ],
      ans_hi: [
        "• कुल स्कूली छात्र: 14.71 लाख स्कूलों में 24.69 करोड़ (UDISE+ 2024-25)। यह कुल संख्या हमारा बाज़ार नहीं है।",
        "• सीबीएसई कक्षा 10 पंजीकरण, 2025: लगभग 23.85 लाख (रिपोर्ट के अनुसार), इसलिए सीबीएसई कक्षा 6-8 में लगभग 70 लाख छात्र (अनुमान)।",
        "• देश में 27.0% छात्र निजी कोचिंग लेते हैं, शहरी क्षेत्रों में 30.7% (NSS CMS: शिक्षा 2025)।",
        "• शुरुआती बाज़ार: सीबीएसई कक्षा 6-8 के लगभग 20 लाख परिवार जो पहले से अतिरिक्त पढ़ाई पर खर्च करते हैं (अनुमान: 70 लाख x लगभग 30%)।"
      ]
    },
    {
      num: 4,
      q_en: "4. Why will our product be better?",
      q_hi: "4. हमारा उत्पाद बेहतर क्यों होगा?",
      ans_en: [
        "Honest answer: it is not better yet. These advantages are designed, not built. This app is a prototype with demo data.",
        "1. Cross-grade diagnosis tied to this term's textbook, for example: \"the Ganita Prakash trouble is a Class 5 fractions gap\". Tutors do this by instinct; apps and chatbots do not.",
        "2. A small weekly plan that fits around school homework, moving must-do board content first when days are missed.",
        "3. A weekly parent report, at skill level, that shows whether it is working.",
        "4. Price below tuition: INR 199 or INR 499 per month, the two price points to test in a pilot."
      ],
      ans_hi: [
        "ईमानदार उत्तर: अभी यह बेहतर नहीं है। ये खूबियां डिज़ाइन की गई हैं, बनी नहीं हैं। यह ऐप डेमो डेटा वाला प्रोटोटाइप है।",
        "1. इस सत्र की पाठ्यपुस्तक से जुड़ा और पिछली कक्षाओं तक जाने वाला निदान, जैसे: \"गणित प्रकाश में कठिनाई असल में कक्षा 5 के भिन्न की कमी है\"। ट्यूटर यह अंदाज़े से करते हैं; ऐप्स और चैटबॉट बिल्कुल नहीं करते।",
        "2. स्कूल के गृहकार्य के साथ फिट होने वाली छोटी साप्ताहिक योजना, जिसमें छूटे दिनों पर ज़रूरी बोर्ड सामग्री पहले आगे बढ़ती है।",
        "3. अभिभावकों के लिए साप्ताहिक, कौशल-स्तर की रिपोर्ट, जो दिखाए कि योजना काम कर रही है या नहीं।",
        "4. ट्यूशन से कम कीमत: ₹199 या ₹499 प्रति माह, ये दोनों कीमतें पायलट में परखी जाएंगी।"
      ]
    },
    {
      num: 5,
      q_en: "5. Will they pay?",
      q_hi: "5. क्या वे भुगतान करेंगे?",
      ans_en: [
        "Probably yes, for diagnosis plus accountability (not for \"a plan\"), and only at a price near what families spend today. Unproven until a pilot.",
        "• Current spend: average annual household spend on private coaching is INR 3,988 per student in urban areas and INR 1,793 in rural areas (NSS CMS: Education 2025).",
        "• A self-serve app at INR 799 to 1,499 per month is above what most families spend on coaching, and only wins if it fully replaces the tutor.",
        "• Pricing to test: Free (explorer plus one diagnostic report); Core at INR 199 or INR 499 per month (diagnosis, weekly plan, parent report); a per-learner licence for tuition teachers and small schools."
      ],
      ans_hi: [
        "शायद हां, पर निदान और जवाबदेही के लिए, \"योजना\" के लिए नहीं, और केवल उस कीमत पर जो परिवारों के आज के खर्च के आसपास हो। पायलट से पहले यह अप्रमाणित है।",
        "• मौजूदा खर्च: निजी कोचिंग पर प्रति छात्र औसत वार्षिक घरेलू खर्च शहरी क्षेत्रों में ₹3,988 और ग्रामीण क्षेत्रों में ₹1,793 है (NSS CMS: शिक्षा 2025)।",
        "• ₹799 से ₹1,499 प्रति माह वाला स्व-सेवा ऐप अधिकांश परिवारों के कोचिंग खर्च से अधिक है, और तभी सफल होगा जब वह ट्यूटर की पूरी जगह ले।",
        "• परखने योग्य मूल्य: निःशुल्क (एक्सप्लोरर और एक निदान रिपोर्ट); कोर ₹199 या ₹499 प्रति माह (निदान, साप्ताहिक योजना, अभिभावक रिपोर्ट); ट्यूशन शिक्षकों और छोटे स्कूलों के लिए प्रति-छात्र लाइसेंस।"
      ]
    },
    {
      num: 6,
      q_en: "6. What is the real problem not solved right now?",
      q_hi: "6. वह वास्तविक समस्या क्या है जो अभी हल नहीं हुई है?",
      ans_en: [
        "Content is now free and unlimited. What nobody provides cheaply is diagnosis plus follow-through:",
        "1. Knowing exactly which earlier-grade skills this child is missing, mapped to the textbook they use this term.",
        "2. Turning that into 20 to 30 minutes a day the child will actually do, alongside school homework.",
        "3. Showing the parent whether it is working.",
        "The hardest part is follow-through, not information. Getting a 12-year-old to open an app daily without a human pushing them is the unsolved problem, and the reason tuition teachers still win."
      ],
      ans_hi: [
        "अब सामग्री मुफ़्त और असीमित है। जो कोई सस्ते में नहीं देता, वह है निदान और उस पर लगातार अमल:",
        "1. ठीक-ठीक जानना कि इस बच्चे में पिछली कक्षाओं के कौन से कौशल कम हैं, और वे इस सत्र की पाठ्यपुस्तक से कैसे जुड़ते हैं।",
        "2. उसे रोज़ 20 से 30 मिनट के ऐसे काम में बदलना जो बच्चा स्कूल के गृहकार्य के साथ सच में करे।",
        "3. अभिभावक को दिखाना कि यह काम कर रहा है या नहीं।",
        "सबसे कठिन हिस्सा जानकारी नहीं, लगातार अमल है। बिना किसी व्यक्ति के कहे 12 साल के बच्चे से रोज़ ऐप खुलवाना ही अनसुलझी समस्या है, और यही कारण है कि ट्यूशन शिक्षक अब भी जीतते हैं।"
      ]
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Banner */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
        borderLeft: "4px solid var(--primary)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-blue">
            {isHi ? `${brandName} रणनीतिक थीसिस` : `${brandName} Strategic Thesis`}
          </span>
          <span className="badge badge-warn">{isHi ? "स्रोत-आधारित, अनुमान चिह्नित" : "Sourced, estimates labelled"}</span>
        </div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.35rem" }}>
          {isHi
            ? "उद्यम के 6 मूल प्रश्न और भारतीय पाठ्यक्रम निर्माण प्रक्रिया का विश्लेषण"
            : "Core Venture Questions & National Curriculum Governance Architecture"}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
          {isHi
            ? "उत्तर प्राथमिक स्रोतों (UDISE+ 2024-25, NSS CMS: शिक्षा 2025) पर आधारित हैं। अनुमान और अभी न बनी सुविधाएं अलग से चिह्नित हैं।"
            : "Answers grounded in primary data (UDISE+ 2024-25, NSS CMS: Education 2025). Estimates and features not yet built are labelled as such."}
        </p>
      </div>

      {/* Questions Tabs */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "0.5rem"
      }}>
        {questions.map((q) => {
          const isActive = activeQuestion === q.num;
          return (
            <button
              key={q.num}
              type="button"
              onClick={() => setActiveQuestion(q.num)}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: isActive ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                border: isActive ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                color: isActive ? "#ffffff" : "var(--text-secondary)",
                fontWeight: 600,
                fontSize: "0.85rem",
                textAlign: "left",
                cursor: "pointer"
              }}
            >
              {isHi ? q.q_hi : q.q_en}
            </button>
          );
        })}
      </div>

      {/* Active Question Detail */}
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--cyan)" }}>
          {isHi ? questions[activeQuestion - 1].q_hi : questions[activeQuestion - 1].q_en}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {(isHi ? questions[activeQuestion - 1].ans_hi : questions[activeQuestion - 1].ans_en).map((line, idx) => (
            <div key={idx} style={{
              fontSize: "0.92rem",
              lineHeight: 1.7,
              color: "#e2e8f0",
              padding: "0.6rem 0.85rem",
              borderRadius: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              borderLeft: "3px solid var(--primary)"
            }}>
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Governance & Self-Evolving Engine Deep-Dive */}
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span className="badge badge-green">
            {isHi ? "सीबीएसई व राष्ट्रीय संस्थान कैसे पाठ्यक्रम तय करते हैं" : "How CBSE & NCERT Create & Update Syllabi"}
          </span>
          <span className="badge badge-warn">
            {isHi ? "एआई परतें: डिज़ाइन की गईं, अभी बनी नहीं" : "AI layers: designed, not built yet"}
          </span>
        </div>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>
          {isHi
            ? "आधिकारिक पाठ्यक्रम निर्माण चक्र और एआई स्व-विकसित तंत्र (Self-Evolving System)"
            : "The Official Curriculum Governance Cycle vs AI 5-Layer Evolution"}
        </h3>
        <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <p style={{ marginBottom: "0.75rem" }}>
            {isHi
              ? "सीबीएसई स्वयं पाठ्यक्रम नहीं लिखता; वह एनसीईआरटी (NCERT) द्वारा तैयार राष्ट्रीय पाठ्यचर्या रूपरेखा (जैसे NCF 2005, NCF-FS 2022, NCF-SE 2023) को अपनाता है। पाठ्यक्रम में बदलाव विषय-वार पाठ्यक्रम समितियों (Courses of Study Committees), पाठ्यचर्या विकास समितियों और शासी निकाय (Governing Body) की स्वीकृति के बाद वार्षिक परिपत्रों (उदा. Circular Acad-49/2026) द्वारा लागू होते हैं।"
              : "CBSE does not draft foundational textbooks independently; it adopts syllabi formulated by NCERT under the National Curriculum Frameworks (NCF 2005, NCF-FS 2022, NCF-SE 2023). Syllabus revisions pass through Curriculum Committees, Courses of Study, and the Governing Body, and are promulgated via annual academic circulars (e.g. Circular Acad-49/2026 for language batch exemptions)."}
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "0.75rem",
            marginTop: "0.5rem"
          }}>
            <div style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(6, 182, 212, 0.08)", border: "1px solid rgba(6, 182, 212, 0.2)" }}>
              <strong style={{ color: "var(--cyan)", fontSize: "0.85rem" }}>{isHi ? "परत 1: तात्कालिक शिक्षार्थी मॉडल" : "Layer 1: Real-Time Learner Model"}</strong>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                Updates every interaction. {isHi ? "अभ्यास और जांच के उत्तरों से हर कौशल की पूर्व-अपेक्षित दक्षता का अनुमान।" : "Estimates per-skill prerequisite mastery from practice and check answers."}
              </p>
            </div>
            <div style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
              <strong style={{ color: "var(--accent)", fontSize: "0.85rem" }}>{isHi ? "परत 2: दैनिक सामग्री सुधार" : "Layer 2: Daily Content Optimization"}</strong>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                {isHi ? "रोज़ाना सुधार: जिन संकेतों और प्रश्न-रूपों से सबसे अधिक मापा गया लाभ हो, उन्हें आगे बढ़ाता है।" : "Daily optimization. Promotes hints and problem variations that show highest measured learning gain across cohorts."}
              </p>
            </div>
            <div style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
              <strong style={{ color: "var(--warn)", fontSize: "0.85rem" }}>{isHi ? "परत 3: आधिकारिक स्रोत निगरानी" : "Layer 3: Official Source Watcher"}</strong>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                {isHi ? "पाठ्यक्रम बदलाव पकड़ने के लिए आधिकारिक राजपत्र, सीबीएसई परिपत्र और एनसीईआरटी सूचियों की निगरानी।" : "Continuous monitoring of official gazettes, CBSE circulars, and NCERT indices to detect syllabus alterations."}
              </p>
            </div>
            <div style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.2)" }}>
              <strong style={{ color: "var(--primary)", fontSize: "0.85rem" }}>{isHi ? "परत 4: बैच-आधारित बदलाव प्रस्ताव" : "Layer 4: Cohort-Aware Change Proposals"}</strong>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                {isHi ? "लागू करने से पहले मानवीय समीक्षा ज़रूरी। कौशल ग्राफ की संगति जांचता है और चल रहे बैच की योजना सुरक्षित रखता है।" : "Requires human review before release. Validates DAG graph coherence, prevents orphaned prerequisites, and preserves batch integrity."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
