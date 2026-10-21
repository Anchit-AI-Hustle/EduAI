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

  const questions = [
    {
      num: 1,
      q_en: "1. Who will use it?",
      q_hi: "1. इसका उपयोग कौन करेगा?",
      ans_en: [
        "1. K-12 Students & Parents (Nursery to Class 12 across CBSE, CISCE, and State Boards): Families seeking to escape one-pace classrooms and fragmented tuition by following an adaptive, prerequisite-aligned plan.",
        "2. Dual-Track Aspirants (Classes 8-12 preparing for JEE, NEET, CUET, UPSC Foundation, SAT, IELTS, TOEFL): Students juggling board requirements with high-stakes competitive examinations who need a single unified roadmap without duplicate study hours.",
        "3. Open-Schooling & Homeschool Families (Ages 0-18): Early stimulation for ages 0-3 (MWCD Navchetana), preschool play for ages 3-6 (Aadharshila, NCF-FS), and NIOS Open Basic Education / Secondary exam certification for flexible learners."
      ],
      ans_hi: [
        "1. के-12 छात्र व अभिभावक (नर्सरी से 12वीं तक सीबीएसई, आईसीएसई व राज्य बोर्ड): वे परिवार जो स्कूल की एकसमान गति व कोचिंग की दौड़ से अलग अपने बच्चे के लिए व्यक्तिगत, पूर्व-ज्ञान आधारित योजना चाहते हैं।",
        "2. दोहरे-मार्ग (Dual-Track) के छात्र (कक्षा 8-12, जेईई/नीट/सीयूईटी/सैट/आईईएलटीएस): वे छात्र जो बोर्ड परीक्षा और प्रवेश परीक्षा दोनों की तैयारी एक साथ कर रहे हैं और समय की बचत चाहते हैं।",
        "3. मुक्त विद्यालयी व घरेलू शिक्षार्थी (आयु 0-18 वर्ष): 0-3 वर्ष के लिए नवचेतना, 3-6 वर्ष के लिए आधारशिला, और एनआईओएस (NIOS) के माध्यम से कानूनी मान्यता प्राप्त अध्ययन।"
      ]
    },
    {
      num: 2,
      q_en: "2. What do they use currently?",
      q_hi: "2. वर्तमान में वे क्या उपयोग कर रहे हैं?",
      ans_en: [
        "• Physical Schools & Textbooks: Fixed-calendar classrooms (NCERT/CBSE) that move by date, not by student understanding.",
        "• Offline Neighborhood Tuitions & Coaching Factories: Local tutors for basic grades and intense test factories (Kota, PW, Allen) for Classes 9-12 that enforce their own rigid parallel schedule.",
        "• Video-Library EdTech Apps & YouTube: Catalogues of pre-recorded lectures where students watch passively without personalized feedback or prerequisite gap diagnostics.",
        "• Ad-Hoc LLM Chatbots: Generic ChatGPT / Claude / Gemini queries that answer isolated homework doubts but lack syllabus anchoring, longitudinal tracking, or board-specific constraints."
      ],
      ans_hi: [
        "• पारंपरिक विद्यालय व पाठ्यपुस्तकें: कैलेंडर के अनुसार चलने वाली कक्षाएं, जो छात्र की समझ के बजाय तारीखों के अनुसार आगे बढ़ती हैं।",
        "• स्थानीय ट्यूशन व कोचिंग संस्थान: समानांतर दबाव बनाने वाली कोचिंग संस्थाएं जो स्कूल के पाठ्यक्रम से कटी होती हैं।",
        "• वीडियो लाइब्रेरी ऐप्स व यूट्यूब: केवल व्याख्यान देखने वाले प्लेटफॉर्म, जिनमें न तो आईक्यू अनुकूलन है और न ही पूर्व-ज्ञान के अंतर की पहचान।",
        "• सामान्य एआई चैटबॉट्स: अलग-थलग गृहकार्य के उत्तर देने वाले चैटबॉट, जिनमें बोर्ड परीक्षा के सत्यापन और दीर्घकालिक पाठ्यक्रम का अभाव है।"
      ]
    },
    {
      num: 3,
      q_en: "3. How many users face this problem?",
      q_hi: "3. कितने उपयोगकर्ता इस समस्या का सामना कर रहे हैं?",
      ans_en: [
        "• 24.8 Crore (248 Million) Enrolled K-12 Students in India: Documented across 14.7 lakh schools in Ministry of Education UDISE+ 2023-24 and 2024-25 reports.",
        "• 50%+ Foundational Deficit: National surveys (ASER 2024, PARAKH Rashtriya Sarvekshan 2024) confirm that over half of Class 5 students lack Class 2 level reading and basic division mastery, creating compounding deficits.",
        "• 55+ Lakh High-Stakes Competitive Aspirants: Annual registrations include 20+ lakh in NEET UG, 13-14 lakh in JEE Main, 13-15 lakh in CUET UG, 10+ lakh in UPSC CSE, plus hundreds of thousands taking SAT/IELTS.",
        "• 3.5+ Lakh Open Schooling Enrolments: NIOS enrolls hundreds of thousands annually seeking flexible, accredited pathways."
      ],
      ans_hi: [
        "• भारत में 24.8 करोड़ (248 मिलियन) नामांकित स्कूली छात्र: शिक्षा मंत्रालय की UDISE+ 2023-24 और 2024-25 रिपोर्ट के अनुसार 14.7 लाख से अधिक स्कूलों में।",
        "• 50% से अधिक बुनियादी सीखने की कमी: असर (ASER 2024) और परख (PARAKH 2024) के अनुसार कक्षा 5 के आधे से अधिक छात्र कक्षा 2 के बुनियादी गणित व वाचन में संघर्ष करते हैं।",
        "• 55 लाख से अधिक प्रतियोगी परीक्षा अभ्यर्थी: नीट में 20+ लाख, जेईई मेन में 13-14 लाख, सीयूईटी में 14 लाख, और यूपीएससी में 10+ लाख अभ्यर्थी प्रतिवर्ष।",
        "• 3.5 लाख से अधिक मुक्त विद्यालयी छात्र: एनआईओएस में प्रतिवर्ष नामांकित होने वाले छात्र।"
      ]
    },
    {
      num: 4,
      q_en: "4. Why will our product be better?",
      q_hi: "4. हमारा उत्पाद बेहतर क्यों होगा?",
      ans_en: [
        "1. Unified Prerequisite Skill Graph: Maps CBSE, ICSE, NIOS, JEE, NEET, and SAT onto one directed acyclic graph. When a student stumbles on quadratic equations, it pinpoints the exact Class 7 signed integer gap.",
        "2. Day-Level Calendar Timetable with Dynamic Rebalancer: Creates a realistic daily schedule matching student challenge agility, capped screen time, and built-in 15% buffer slots for missed days.",
        "3. Zero Syllabus Hallucination: Every subject, chapter, and test item carries a verified primary source_id from official bodies (NCERT, CBSE, CISCE, NIOS, College Board). Gaps are labeled, never fabricated.",
        "4. 5-Layer Self-Evolving Engine: Balances real-time learner model updates (L1) and daily item optimization (L2) with human-governed, cohort-aware board syllabus updates (L3/L4)."
      ],
      ans_hi: [
        "1. एकीकृत कौशल ग्राफ (Shared Skill Graph): सीबीएसई, आईसीएसई, एनआईओएस और जेईई/नीट को एक ही ग्राफ से जोड़ता है। कक्षा 9 में द्विघात समीकरण में अटकने पर कक्षा 7 के पूर्णांक नियमों की कमी तुरंत पकड़ में आती है।",
        "2. दैनिक स्तर समय-सारणी और स्वतः पुनर्संतुलन: छात्र की आईक्यू और गति के अनुसार दैनिक असाइनमेंट, बाल स्वास्थ्य अनुसार स्क्रीन-टाइम, और 15% बफर स्लॉट।",
        "3. शून्य मतिभ्रम (Zero Hallucination): प्रत्येक विषय और पाठ का आधिकारिक स्रोत आईडी (NCERT/CBSE) से सत्यापन।",
        "4. 5-स्तरीय स्व-विकसित तंत्र: तात्कालिक सीखने की प्रगति और बैच-सुरक्षित पाठ्यक्रम अद्यतन का संतुलित समन्वय।"
      ]
    },
    {
      num: 5,
      q_en: "5. Will they pay?",
      q_hi: "5. क्या वे भुगतान करेंगे?",
      ans_en: [
        "• High Existing Household Spend: Indian families already spend INR 1,500 to INR 6,000/month on after-school tuitions and INR 40,000 to INR 2,50,000/year on test coaching.",
        "• Value Proposition: Replaces multiple uncoordinated tuitions with one coherent, board-aligned platform at a fraction of offline coaching fees.",
        "• Monetization Tiers: Free diagnostic & syllabus matrix; INR 499-1,499/month for core daily timetable and lesson loop; INR 1,999-3,499/month for integrated board + competitive test bundle."
      ],
      ans_hi: [
        "• परिवारों का मौजूदा खर्च: भारतीय परिवार पहले से ही स्थानीय ट्यूशन पर ₹1,500 - ₹6,000/माह और कोचिंग पर ₹40,000 - ₹2,50,000/वर्ष खर्च करते हैं।",
        "• मूल्य प्रस्ताव: कई अलग-थलग ट्यूशनों की जगह एक एकीकृत, आधिकारिक-बोर्ड समर्थित प्रणाली जो ऑफलाइन कोचिंग से कहीं अधिक किफायती और प्रभावी है।",
        "• मूल्य निर्धारण टियर: निःशुल्क डायग्नोस्टिक; ₹499-1,499/माह (दैनिक समय-सारणी व पाठ चक्र); ₹1,999-3,499/माह (बोर्ड + प्रतियोगी परीक्षा बंडल)।"
      ]
    },
    {
      num: 6,
      q_en: "6. What is the real problem not solved right now?",
      q_hi: "6. वह वास्तविक समस्या क्या है जो अभी हल नहीं हुई है?",
      ans_en: [
        "The real unsolved problem is the coordination and coherence gap between fixed-calendar institutional syllabi and an individual learner's real prerequisite mastery state.",
        "Content is abundant (millions of videos exist on YouTube and EdTech). What is missing is curriculum orchestration: diagnosing where the student actually is on the prerequisite graph, fitting learning into an achievable daily time budget, adjusting dynamically when life happens, and updating safely as boards revise standards."
      ],
      ans_hi: [
        "वास्तविक अनसुलझी समस्या यह है कि संस्थागत स्कूल कैलेंडर (जो केवल तारीखों के आधार पर चलता है) और छात्र की वास्तविक सीखने की स्थिति के बीच कोई तालमेल नहीं है।",
        "सामग्री की कोई कमी नहीं है (लाखों वीडियो उपलब्ध हैं)। कमी है पाठ्यक्रम संचालन (Curriculum Orchestration) की: यह जानना कि छात्र वास्तव में किस पूर्व-ज्ञान स्तर पर है, उसे दैनिक समय-सारणी में व्यवस्थित करना, और बोर्ड के परिवर्तनों के अनुसार सुरक्षित रूप से आगे बढ़ना।"
      ]
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Banner */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
        borderLeft: "4px solid var(--accent-indigo)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-indigo">
            {isHi ? `${brandName} रणनीतिक थीसिस` : `${brandName} Strategic Thesis`}
          </span>
          <span className="badge badge-cyan">{isHi ? "प्राथमिक डेटा आधारित" : "Primary Data Grounded"}</span>
        </div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.35rem" }}>
          {isHi
            ? "उद्यम के 6 मूल प्रश्न और भारतीय पाठ्यक्रम निर्माण प्रक्रिया का विश्लेषण"
            : "Core Venture Questions & National Curriculum Governance Architecture"}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
          {isHi
            ? "भारत के 24.8 करोड़ छात्रों, 55 लाख प्रतियोगी अभ्यर्थियों और बोर्ड पाठ्यक्रम निर्माण प्रणाली का विस्तृत विश्लेषण।"
            : "Data-backed answers across market size (UDISE+, ASER 2024), user psychology, pricing elasticity, and curriculum governance."}
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
                border: isActive ? "1.5px solid var(--accent-indigo)" : "1px solid var(--border-color)",
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
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--accent-cyan)" }}>
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
              borderLeft: "3px solid var(--accent-indigo)"
            }}>
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Governance & Self-Evolving Engine Deep-Dive */}
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="badge badge-emerald">
            {isHi ? "सीबीएसई व राष्ट्रीय संस्थान कैसे पाठ्यक्रम तय करते हैं" : "How CBSE & NCERT Create & Update Syllabi"}
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
              <strong style={{ color: "var(--accent-cyan)", fontSize: "0.85rem" }}>Layer 1: Real-Time Learner Model</strong>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                Updates every interaction. Calibrates student problem-solving velocity, IQ agility, and prerequisite mastery state.
              </p>
            </div>
            <div style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
              <strong style={{ color: "var(--accent-emerald)", fontSize: "0.85rem" }}>Layer 2: Daily Content Optimization</strong>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                Daily optimization. Promotes hints and problem variations that show highest measured learning gain across cohorts.
              </p>
            </div>
            <div style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
              <strong style={{ color: "var(--accent-amber)", fontSize: "0.85rem" }}>Layer 3: Official Source Watcher</strong>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                Continuous monitoring of official gazettes, CBSE circulars, and NCERT indices to detect syllabus alterations.
              </p>
            </div>
            <div style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.2)" }}>
              <strong style={{ color: "var(--accent-indigo)", fontSize: "0.85rem" }}>Layer 4: Cohort-Aware Change Proposals</strong>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                Requires human review before release. Validates DAG graph coherence, prevents orphaned prerequisites, and preserves batch integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
