"use client";

import React, { useState } from "react";

interface GoalAndUsageGuideProps {
  lang: "en" | "hi";
  brandName: string;
  onSelectTab: (tabKey: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function GoalAndUsageGuide({
  lang,
  brandName,
  onSelectTab,
  isOpen,
  onToggle
}: GoalAndUsageGuideProps) {
  const isHi = lang === "hi";
  const [activeGuideView, setActiveGuideView] = useState<"goal" | "usage" | "modules" | "jargon">("goal");

  return (
    <section
      className="card guide-hero-card"
      style={{
        border: "1.5px solid rgba(99, 102, 241, 0.4)",
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(20, 30, 58, 0.95) 100%)",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.15)",
        marginBottom: "1.5rem",
        position: "relative",
        overflow: "hidden"
      }}
      aria-label="Platform Goal and Usage Guide"
    >
      {/* Decorative top accent glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #6366f1, #06b6d4, #10b981)"
        }}
      />

      {/* Guide Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          cursor: "pointer",
          paddingBottom: isOpen ? "1rem" : 0,
          borderBottom: isOpen ? "1px solid rgba(255, 255, 255, 0.08)" : "none"
        }}
        onClick={onToggle}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "1.5rem" }}>🧭</span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontSize: "0.74rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "0.15rem 0.55rem",
                  borderRadius: "999px",
                  background: "rgba(99, 102, 241, 0.2)",
                  color: "#a5b4fc",
                  border: "1px solid rgba(99, 102, 241, 0.3)"
                }}
              >
                {isHi ? "त्वरित मार्गदर्शिका" : "Quick Visual Guide"}
              </span>
              <span style={{ fontSize: "0.78rem", color: "#34d399", fontWeight: 700 }}>
                ● {isHi ? "सरल भाषा में समझें" : "Plain English • No Jargon"}
              </span>
            </div>
            <h2 style={{ margin: "0.2rem 0 0", fontSize: "1.25rem", color: "#ffffff", fontWeight: 800 }}>
              {isHi
                ? `${brandName} का लक्ष्य और उपयोग कैसे करें?`
                : `${brandName}: What is the Goal & How to Use It?`}
            </h2>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
            {isOpen
              ? (isHi ? "छिपाने के लिए क्लिक करें ▲" : "Click to minimize ▲")
              : (isHi ? "मार्गदर्शिका खोलें ▼" : "Click to view guide ▼")}
          </span>
          <button
            type="button"
            className="control-pill"
            style={{
              padding: "0.3rem 0.65rem",
              fontSize: "0.8rem",
              background: isOpen ? "rgba(255, 255, 255, 0.12)" : "linear-gradient(135deg, #4f46e5, #06b6d4)",
              color: "#ffffff"
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {isOpen ? "✕ Close" : "📖 Open Guide"}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div style={{ marginTop: "1rem" }}>
          {/* Sub-navigation for Guide */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1.25rem"
            }}
          >
            <button
              type="button"
              className={`control-pill ${activeGuideView === "goal" ? "active" : ""}`}
              onClick={() => setActiveGuideView("goal")}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <span>🎯</span>
              <span>{isHi ? "1. हमारा लक्ष्य (Goal)" : "1. The Big Goal (In 30 Sec)"}</span>
            </button>
            <button
              type="button"
              className={`control-pill ${activeGuideView === "usage" ? "active" : ""}`}
              onClick={() => setActiveGuideView("usage")}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <span>🚀</span>
              <span>{isHi ? "2. उपयोग कैसे करें (4 आसान चरण)" : "2. How to Use (4 Easy Steps)"}</span>
            </button>
            <button
              type="button"
              className={`control-pill ${activeGuideView === "modules" ? "active" : ""}`}
              onClick={() => setActiveGuideView("modules")}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <span>🗺️</span>
              <span>{isHi ? "3. सभी 10 टैब का नक्शा" : "3. Visual Tab Map (Click to Jump)"}</span>
            </button>
            <button
              type="button"
              className={`control-pill ${activeGuideView === "jargon" ? "active" : ""}`}
              onClick={() => setActiveGuideView("jargon")}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              <span>🗣️</span>
              <span>{isHi ? "4. कठिन शब्दों का सरल अर्थ" : "4. Jargon Buster (Dictionary)"}</span>
            </button>
          </div>

          {/* VIEW 1: THE BIG GOAL */}
          {activeGuideView === "goal" && (
            <div>
              <div
                style={{
                  background: "rgba(99, 102, 241, 0.1)",
                  border: "1px solid rgba(99, 102, 241, 0.25)",
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                  marginBottom: "1.25rem"
                }}
              >
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#818cf8", textTransform: "uppercase" }}>
                  {isHi ? "एक पंक्ति में लक्ष्य:" : "THE GOAL IN ONE SENTENCE:"}
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginTop: "0.25rem", lineHeight: 1.5 }}>
                  {isHi
                    ? `“प्रत्येक बच्चे को 0 से 18 वर्ष (नर्सरी से 12वीं और प्रवेश परीक्षा) तक एक व्यक्तिगत एआई स्कूल देना, जो उसकी सीखने की गति के अनुसार दिन-प्रतिदिन की योजना बनाए ताकि कोई बच्चा पीछे न छूटे।”`
                    : `“A personal AI school for your child from age 0 to 18 (Nursery to Class 12 & entrance exams) that creates an individual day-by-day learning plan adapting to their exact speed, so no child is left behind.”`}
                </div>
              </div>

              {/* 3 Core Pillars Visual Grid */}
              <div className="grid-3" style={{ gap: "1rem", marginBottom: "1rem" }}>
                {/* Pillar 1 */}
                <div
                  style={{
                    background: "rgba(14, 23, 42, 0.8)",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                    borderRadius: "12px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>⚡</span>
                    <strong style={{ color: "#38bdf8", fontSize: "1rem" }}>
                      {isHi ? "1. बच्चे की अपनी गति" : "1. Learns at Child's Speed"}
                    </strong>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                    {isHi
                      ? "स्कूल 40 बच्चों को एक ही गति से पढ़ाते हैं। अगर बच्चा भिन्न (fractions) नहीं समझा, तो वह बीजगणित (algebra) में फेल हो जाता है। यह प्लेटफॉर्म पहले बुनियादी कमी पकड़कर ठीक करता है।"
                      : "Schools teach 40 kids at 1 speed. If your child misses fractions in Class 6, they fail algebra in Class 7. Our AI pauses and fixes the prerequisite foundation first."}
                  </p>
                  <div style={{ marginTop: "auto", paddingTop: "0.5rem", fontSize: "0.78rem", color: "#38bdf8", fontWeight: 600 }}>
                    ✓ {isHi ? "शून्य फाउंडेशन गैप" : "Zero foundational gaps"}
                  </div>
                </div>

                {/* Pillar 2 */}
                <div
                  style={{
                    background: "rgba(14, 23, 42, 0.8)",
                    border: "1px solid rgba(52, 211, 153, 0.25)",
                    borderRadius: "12px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>🛡️</span>
                    <strong style={{ color: "#34d399", fontSize: "1rem" }}>
                      {isHi ? "2. बाल स्वास्थ्य व स्क्रीन सुरक्षा" : "2. Pediatric Screen Safety"}
                    </strong>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                    {isHi
                      ? "डॉक्टरों (IAP) के नियमों के अनुसार: 0-3 वर्ष के बच्चों के लिए 0 स्क्रीन। बड़े बच्चों के लिए दिन में केवल 60 मिनट की सीमा। बाकी पढ़ाई ऑफलाइन अभ्यास और वर्कशीट्स से होती है।"
                      : "Grounded in medical guidelines (IAP): 0 screen time for ages 0-3; max 60 min/day for school kids. The rest is hands-on activities, paper worksheets, and offline play."}
                  </p>
                  <div style={{ marginTop: "auto", paddingTop: "0.5rem", fontSize: "0.78rem", color: "#34d399", fontWeight: 600 }}>
                    ✓ {isHi ? "आंखों व दिमाग की पूर्ण सुरक्षा" : "Healthy eyes & balanced mind"}
                  </div>
                </div>

                {/* Pillar 3 */}
                <div
                  style={{
                    background: "rgba(14, 23, 42, 0.8)",
                    border: "1px solid rgba(251, 191, 36, 0.25)",
                    borderRadius: "12px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>📚</span>
                    <strong style={{ color: "#fbbf24", fontSize: "1rem" }}>
                      {isHi ? "3. 100% आधिकारिक पाठ्यक्रम" : "3. 100% Official Syllabi"}
                    </strong>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                    {isHi
                      ? "सीबीएसई, आईसीएसई, एनआईओएस और जेईई/नीट के आधिकारिक सिलेबस से सीधा जुड़ाव। कोई मनगढ़ंत या बिना काम की सामग्री नहीं। जो परीक्षा में आएगा, वही पढ़ाया जाता है।"
                      : "Directly verified against CBSE, CISCE, NIOS, NCERT, JEE, and NEET official releases. No AI hallucinations. Every lesson cites its official board source."}
                  </p>
                  <div style={{ marginTop: "auto", paddingTop: "0.5rem", fontSize: "0.78rem", color: "#fbbf24", fontWeight: 600 }}>
                    ✓ {isHi ? "सत्यापित स्रोत आधारित" : "Verified primary source grounding"}
                  </div>
                </div>
              </div>

              {/* Side-by-side comparison table */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "1rem",
                  marginTop: "0.75rem"
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.6rem", color: "#e2e8f0" }}>
                  ⚖️ {isHi ? "पारंपरिक स्कूल बनाम EveryYear एआई स्कूल" : "Traditional Education vs. EveryYear AI School"}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", padding: "0.75rem" }}>
                    <strong style={{ color: "#f87171", fontSize: "0.86rem", display: "block", marginBottom: "0.3rem" }}>
                      ❌ {isHi ? "पारंपरिक व्यवस्था की समस्याएं" : "The Traditional Problem"}
                    </strong>
                    <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      <li>{isHi ? "40 बच्चे, 1 गति - जो नहीं समझा वह पिछड़ गया" : "40 students, 1 pace - struggling kids fall permanently behind"}</li>
                      <li>{isHi ? "शाम को 3-4 कोचिंग - बच्चे भारी बस्ते से थक जाते हैं" : "Multiple disconnected evening tuition classes & exhaustion"}</li>
                      <li>{isHi ? "यूट्यूब पर घंटों वीडियो देखना (निष्क्रिय पढ़ाई)" : "Passive video binging with zero personalized feedback"}</li>
                      <li>{isHi ? "कक्षा 9 में बोर्ड और जेईई की दोहरी पढ़ाई का भारी दबाव" : "Dual-track chaos: board exams vs competitive test prep"}</li>
                    </ul>
                  </div>
                  <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", padding: "0.75rem" }}>
                    <strong style={{ color: "#34d399", fontSize: "0.86rem", display: "block", marginBottom: "0.3rem" }}>
                      ✅ {isHi ? "EveryYear का समाधान" : "The EveryYear Solution"}
                    </strong>
                    <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      <li>{isHi ? "व्यक्तिगत दैनिक योजना - बच्चे की अपनी गति पर" : "Personalized 60-min daily timetable tailored to student agility"}</li>
                      <li>{isHi ? "एक ही कौशल ग्राफ से स्कूल + प्रतियोगी परीक्षा दोनों की तैयारी" : "Unified skill graph: covers school boards & JEE/NEET together"}</li>
                      <li>{isHi ? "15 मिनट का सक्रिय अभ्यास (5-चरण विधि) + तुरंत उत्तर" : "Active 15-min lesson loops with diagnostic hints & exit tests"}</li>
                      <li>{isHi ? "डॉक्टर-अनुमोदित स्क्रीन सीमा + माता-पिता को पूर्ण नियंत्रण" : "Pediatrician screen caps, DPDP consent & 1-click progress export"}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: HOW TO USE IN 4 EASY STEPS */}
          {activeGuideView === "usage" && (
            <div>
              <div style={{ marginBottom: "1rem", color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                {isHi
                  ? "इस प्लेटफॉर्म का उपयोग करना बहुत आसान है। इन 4 सरल चरणों का पालन करें:"
                  : "Using this platform takes just 4 simple steps. Follow this visual walkthrough:"}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.85rem" }}>
                {/* Step 1 */}
                <div
                  style={{
                    background: "rgba(14, 23, 42, 0.8)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "12px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ background: "#4f46e5", color: "#fff", fontWeight: 800, fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "6px" }}>
                      STEP 1
                    </span>
                    <span style={{ fontSize: "1.2rem" }}>👤</span>
                  </div>
                  <strong style={{ color: "#ffffff", fontSize: "0.95rem" }}>
                    {isHi ? "1. छात्र व कक्षा चुनें" : "Select Learner & Grade"}
                  </strong>
                  <p style={{ margin: 0, fontSize: "0.84rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {isHi
                      ? "ऊपर दिए गए 3 ड्रॉपडाउन से छात्र का नाम, बोर्ड (CBSE, ICSE, NIOS आदि) और कक्षा चुनें। पूरा पाठ्यक्रम तुरंत लोड हो जाएगा।"
                      : "Use the top 3 dropdown selectors to pick a synthetic student profile, education board (CBSE, ICSE, NIOS, etc.), and grade/stage."}
                  </p>
                  <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                    <span style={{ fontSize: "0.78rem", color: "#a5b4fc" }}>
                      📍 {isHi ? "ऊपर 'Global Context' पट्टी देखें" : "Located right below this guide banner"}
                    </span>
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  style={{
                    background: "rgba(14, 23, 42, 0.8)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    borderRadius: "12px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ background: "#0284c7", color: "#fff", fontWeight: 800, fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "6px" }}>
                      STEP 2
                    </span>
                    <span style={{ fontSize: "1.2rem" }}>📅</span>
                  </div>
                  <strong style={{ color: "#ffffff", fontSize: "0.95rem" }}>
                    {isHi ? "2. आज का टाइमटेबल देखें" : "Check Today's Schedule"}
                  </strong>
                  <p style={{ margin: 0, fontSize: "0.84rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {isHi
                      ? "टैब 1 (Day Plan) पर जाएं। स्लाइडर से दैनिक अध्ययन समय (उदा. 60 मिनट) सेट करें। सिस्टम आज के विषयों का संतुलित टाइमटेबल दिखाएगा।"
                      : "Open Tab 1 (Day Plan & Calendar). Adjust the study slider (e.g. 60 min). See today's balanced timetable across math, science & languages."}
                  </p>
                  <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ padding: "0.3rem 0.7rem", fontSize: "0.8rem", width: "100%" }}
                      onClick={() => onSelectTab("planner")}
                    >
                      {isHi ? "टैब 1 पर जाएं →" : "Jump to Tab 1 (Planner) →"}
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  style={{
                    background: "rgba(14, 23, 42, 0.8)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "12px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ background: "#059669", color: "#fff", fontWeight: 800, fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "6px" }}>
                      STEP 3
                    </span>
                    <span style={{ fontSize: "1.2rem" }}>✍️</span>
                  </div>
                  <strong style={{ color: "#ffffff", fontSize: "0.95rem" }}>
                    {isHi ? "3. 15 मिनट का पाठ पूरा करें" : "Do the 15-Min Lesson"}
                  </strong>
                  <p style={{ margin: 0, fontSize: "0.84rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {isHi
                      ? "टैब 4 (Daily Lesson) खोलें। 5 आसान चरणों (परिचय ➔ समझ ➔ अभ्यास ➔ अनुप्रयोग ➔ क्विज़) में सीखें। संकेत (hints) लें और XP कमाएं।"
                      : "Open Tab 4 (Daily Lesson Loop). Step through the 5 phases: Intro ➔ Concept ➔ Practice ➔ Application ➔ Exit Quiz. Earn +75 XP!"}
                  </p>
                  <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                    <button
                      type="button"
                      className="btn btn-accent"
                      style={{ padding: "0.3rem 0.7rem", fontSize: "0.8rem", width: "100%" }}
                      onClick={() => onSelectTab("lesson")}
                    >
                      {isHi ? "टैब 4 पर जाएं →" : "Jump to Tab 4 (Lesson) →"}
                    </button>
                  </div>
                </div>

                {/* Step 4 */}
                <div
                  style={{
                    background: "rgba(14, 23, 42, 0.8)",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "12px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ background: "#d97706", color: "#fff", fontWeight: 800, fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "6px" }}>
                      STEP 4
                    </span>
                    <span style={{ fontSize: "1.2rem" }}>🔍</span>
                  </div>
                  <strong style={{ color: "#ffffff", fontSize: "0.95rem" }}>
                    {isHi ? "4. कमियां खोजें व मॉक टेस्ट दें" : "Find Gaps & Practice Mocks"}
                  </strong>
                  <p style={{ margin: 0, fontSize: "0.84rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {isHi
                      ? "टैब 2 (Diagnostic) से कमजोरियां पहचानें और टैब 5 (Mocks) से परीक्षा की तैयारी करें। टैब 10 में दैनिक क्वेस्ट और बैज अनलॉक करें।"
                      : "Run Tab 2 (Diagnostic) to find past prerequisite gaps, Tab 5 (Mock Exams) for exam practice, and Tab 10 (Quests) to claim rewards."}
                  </p>
                  <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                    <button
                      type="button"
                      className="btn"
                      style={{ padding: "0.3rem 0.7rem", fontSize: "0.8rem", width: "100%", background: "#1e293b", borderColor: "#f59e0b", color: "#fcd34d" }}
                      onClick={() => onSelectTab("diagnostic")}
                    >
                      {isHi ? "टैब 2 (कमियां खोजें) →" : "Jump to Tab 2 (Diagnostic) →"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: MODULE QUICK-JUMP DIRECTORY */}
          {activeGuideView === "modules" && (
            <div>
              <div style={{ marginBottom: "0.75rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                {isHi
                  ? "नीचे सभी 10 मॉड्यूल का सरल विवरण दिया गया है। किसी भी कार्ड पर क्लिक करके सीधे उस टैब में पहुंचें:"
                  : "Click any module below to immediately jump directly to that section of the platform:"}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.75rem" }}>
                {[
                  {
                    tab: "planner",
                    icon: "📅",
                    titleEn: "1. Day Plan & Calendar",
                    titleHi: "1. दैनिक योजना व टाइमटेबल",
                    descEn: "See your 60-min daily schedule, weekly roadmap & subject goals.",
                    descHi: "आज का 60 मिनट का संतुलित टाइमटेबल और साप्ताहिक लक्ष्य देखें।"
                  },
                  {
                    tab: "diagnostic",
                    icon: "🔍",
                    titleEn: "2. Skills Diagnostic (Find Gaps)",
                    titleHi: "2. कौशल निदान (कमियां पहचानें)",
                    descEn: "Pinpoints exactly which past-grade concepts need reinforcement.",
                    descHi: "पहचानता है कि पिछली कक्षा के कौन से सूत्र या नियम दोबारा समझने हैं।"
                  },
                  {
                    tab: "middleStage",
                    icon: "📖",
                    titleEn: "3. Middle School (Grades 6-8)",
                    titleHi: "3. माध्यमिक चरण (कक्षा 6-8)",
                    descEn: "Deep exploration of new NCERT books (Ganita Prakash, Curiosity).",
                    descHi: "नई एनसीईआरटी पुस्तकों (गणित प्रकाश, जिज्ञासा) का विस्तृत अध्ययन।"
                  },
                  {
                    tab: "lesson",
                    icon: "✍️",
                    titleEn: "4. Interactive Daily Lesson",
                    titleHi: "4. इंटरैक्टिव दैनिक पाठ",
                    descEn: "15-minute bite-sized active lesson loop with hints and exit ticket.",
                    descHi: "15 मिनट का सक्रिय पाठ: 5 आसान चरणों में सीखें और क्विज़ दें।"
                  },
                  {
                    tab: "mocks",
                    icon: "📝",
                    titleEn: "5. Mock Exam Engine",
                    titleHi: "5. मॉक परीक्षा इंजन",
                    descEn: "Simulate official CBSE Board, JEE Main & NEET timed blueprints.",
                    descHi: "सीबीएसई बोर्ड और जेईई/नीट परीक्षा के प्रारूप पर आधारित मॉक टेस्ट।"
                  },
                  {
                    tab: "tracks",
                    icon: "🚀",
                    titleEn: "6. Competitive & Global Tracks",
                    titleHi: "6. प्रतियोगी व विदेश ट्रैक",
                    descEn: "Bridges school syllabus to JEE, NEET, CUET, SAT, IELTS without duplication.",
                    descHi: "स्कूल की पढ़ाई को जेईई, नीट, सीयूईटी और सैट से बिना दोहरे समय के जोड़ता है।"
                  },
                  {
                    tab: "evolution",
                    icon: "🔄",
                    titleEn: "7. AI Auto-Updater (L1-L5)",
                    titleHi: "7. एआई स्वतः पाठ्यक्रम अद्यतन",
                    descEn: "Watches government gazettes and safely updates lessons when syllabi change.",
                    descHi: "सरकारी आदेश आते ही सुरक्षित रूप से प्रश्न बैंक और पाठ स्वतः अपडेट करता है।"
                  },
                  {
                    tab: "parent",
                    icon: "🛡️",
                    titleEn: "8. Parent Safety & Privacy",
                    titleHi: "8. अभिभावक सुरक्षा व नियंत्रण",
                    descEn: "Manage doctor-approved screen limits, consent, and export child data.",
                    descHi: "स्क्रीन टाइम कैप, गोपनीयता सहमति और 1-क्लिक डेटा डाउनलोड।"
                  },
                  {
                    tab: "venture",
                    icon: "💡",
                    titleEn: "9. Venture Goal & FAQ",
                    titleHi: "9. उद्देश्य व अक्सर पूछे जाने वाले प्रश्न",
                    descEn: "Read why EveryYear was built, market data (UDISE+), and financial model.",
                    descHi: "यह प्रोजेक्ट क्यों बना, 24.8 करोड़ छात्रों का विश्लेषण और फीस मॉडल।"
                  },
                  {
                    tab: "gamification",
                    icon: "🏆",
                    titleEn: "10. Quests, Badges & XP",
                    titleHi: "10. दैनिक क्वेस्ट, बैज व XP",
                    descEn: "Track study streaks, claim daily mission rewards, and level up.",
                    descHi: "पढ़ाई की निरंतरता (streak) बनाए रखें, बैज जीतें और लेवल बढ़ाएं।"
                  }
                ].map((item) => (
                  <button
                    key={item.tab}
                    type="button"
                    onClick={() => {
                      onSelectTab(item.tab);
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.09)",
                      borderRadius: "10px",
                      padding: "0.85rem",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.35rem",
                      transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.5)";
                      e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.09)";
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span style={{ fontSize: "1.15rem" }}>{item.icon}</span>
                      <strong style={{ fontSize: "0.88rem", color: "#ffffff" }}>
                        {isHi ? item.titleHi : item.titleEn}
                      </strong>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                      {isHi ? item.descHi : item.descEn}
                    </p>
                    <span style={{ marginTop: "auto", fontSize: "0.74rem", color: "#818cf8", fontWeight: 700 }}>
                      {isHi ? "खोलें →" : "Open Module →"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 4: JARGON BUSTER */}
          {activeGuideView === "jargon" && (
            <div>
              <div style={{ marginBottom: "0.75rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                {isHi
                  ? "शिक्षा नीतियों और तकनीकी शब्दों का सरल और स्पष्ट अर्थ:"
                  : "Demystifying complex Indian educational policy and technical terms into plain English:"}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.75rem" }}>
                {[
                  {
                    term: "Panchpadi (पंचपदी)",
                    meaningEn: "The ancient Indian 5-step learning science: 1. Introduce (Adhiti), 2. Understand (Bodh), 3. Practice (Abhyas), 4. Apply (Prayog), 5. Expand (Prasar). Our 15-minute lessons follow this exact cycle.",
                    meaningHi: "भारतीय 5-चरणीय सीखने की विधि: 1. परिचय (अधीति), 2. समझ (बोध), 3. अभ्यास, 4. प्रयोग, 5. प्रसार। हमारा 15 मिनट का पाठ इसी पर आधारित है।"
                  },
                  {
                    term: "Prerequisite Skill Graph (DAG)",
                    meaningEn: "A concept family tree. Just like you can't multiply before knowing addition, every topic from Class 1 to 12 is connected. If you struggle in algebra, EduAI instantly finds the missing Class 6 arithmetic link.",
                    meaningHi: "अवधारणाओं का पारिवारिक वृक्ष। जैसे जोड़ के बिना गुणा नहीं हो सकता, वैसे ही हर पाठ जुड़ा है। अगर बच्चा बीजगणित में अटका, तो यह तुरंत कक्षा 6 की कमी पकड़ लेता है।"
                  },
                  {
                    term: "IAP Screen Time Cap",
                    meaningEn: "Indian Academy of Pediatrics medical rules: Zero screen time for toddlers (0-3), and max 60 min/day for school students to prevent eye strain and digital burnout.",
                    meaningHi: "बाल रोग विशेषज्ञों (IAP) की स्वास्थ्य गाइडलाइन: 0-3 वर्ष के बच्चों के लिए 0 स्क्रीन, और स्कूली बच्चों के लिए अधिकतम 60 मिनट प्रतिदिन।"
                  },
                  {
                    term: "L1-L5 Self-Evolving Engine",
                    meaningEn: "How the platform updates itself: L1 updates the student's mastery score in seconds; L2 refines hints daily; L3/L4 reads official CBSE/NCERT circulars to update exam questions safely.",
                    meaningHi: "एआई के 5 स्तर: L1 छात्र की समझ को सेकंडों में नापता है; L2 हिंट्स सुधारता है; L3/L4 सरकारी आदेश पढ़कर परीक्षा प्रश्न बैंक को अपडेट करता है।"
                  },
                  {
                    term: "NCF-SE 2023 & NEP 2020",
                    meaningEn: "National Curriculum Framework for School Education. India's official modern curriculum guideline replacing rote memorization with conceptual understanding and vocational skills.",
                    meaningHi: "राष्ट्रीय पाठ्यचर्या रूपरेखा 2023। भारत का आधिकारिक नया शिक्षा मॉडल, जो रटने के बजाय व्यावहारिक समझ और कौशलों को प्राथमिकता देता है।"
                  },
                  {
                    term: "DPDP Act 2023 Section 9",
                    meaningEn: "Digital Personal Data Protection Act. Strictly protects children's privacy: requires parental consent, prohibits behavioral tracking, and gives parents a 1-click export/delete of all data.",
                    meaningHi: "डिजिटल व्यक्तिगत डेटा संरक्षण कानून। बच्चों की पूर्ण गोपनीयता सुनिश्चित करता है - माता-पिता की सहमति अनिवार्य और विज्ञापनों पर पूर्ण प्रतिबंध।"
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(14, 23, 42, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "10px",
                      padding: "0.85rem"
                    }}
                  >
                    <strong style={{ color: "#38bdf8", fontSize: "0.92rem", display: "block", marginBottom: "0.3rem" }}>
                      📖 {item.term}
                    </strong>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                      {isHi ? item.meaningHi : item.meaningEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
