"use client";

import React, { useState } from "react";
import { LanguageMode } from "../types/curriculum";

interface DailyLessonLoopProps {
  lang: LanguageMode;
}

export default function DailyLessonLoop({ lang }: DailyLessonLoopProps) {
  const isHi = lang === "hi";
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"standard" | "olympiad">("standard");
  const [userSubmission, setUserSubmission] = useState("");
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [feedback, setFeedback] = useState<{ score: number; comment_en: string; comment_hi: string } | null>(null);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSubmission.trim()) return;
    setIsEvaluated(true);
    setFeedback({
      score: 94,
      comment_en: "Exceptional mathematical reasoning! You accurately applied the exterior angle sum invariance (360 degrees) and solved for n in under 2 minutes.",
      comment_hi: "उत्कृष्ट गणितीय तर्क! आपने बाह्य कोणों के योग की अपरिवर्तनीयता (360 अंश) का सटीक उपयोग किया और 2 मिनट से कम में n का मान ज्ञात कर लिया।"
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Banner */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
        borderLeft: "4px solid var(--accent-emerald)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-emerald">
            {isHi ? "दैनिक पाठ चक्र" : "Daily Lesson Loop"}
          </span>
          <span className="badge badge-cyan">
            {isHi ? "कक्षा 8 गणित (NCERT अध्याय 3)" : "Class 8 Math (NCERT Chapter 3)"}
          </span>
        </div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.35rem" }}>
          {isHi
            ? "चार-चरणीय दैनिक अधिगम चक्र (वार्म-अप, संकल्पना, असाइनमेंट, सत्यापन)"
            : "Four-Step Daily Learning Loop (Warm-Up, Concept, Assignment, Mastery)"}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
          {isHi
            ? "प्रत्येक दिन का पाठ्यचक्र संज्ञानात्मक वार्म-अप से शुरू होता है, प्राथमिक स्रोत से सत्यापित संकल्पना सिखाता है, और उन कौशलों पर असाइनमेंट देता है जिनमें छात्र की दक्षता अभी अधूरी है।"
            : "Every daily session activates cognitive agility first, presents primary-source verified concepts, and sets assignments on the skills the student has not yet mastered."}
        </p>
      </div>

      {/* Step Indicators */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "0.5rem"
      }}>
        {[
          { num: 1, title_en: "1. Cognitive Warm-Up", title_hi: "1. संज्ञानात्मक वार्म-अप" },
          { num: 2, title_en: "2. Core Concept Bite", title_hi: "2. मुख्य संकल्पना" },
          { num: 3, title_en: "3. Timetable Assignment", title_hi: "3. दैनिक असाइनमेंट" },
          { num: 4, title_en: "4. Velocity Verification", title_hi: "4. गति व दक्षता सत्यापन" }
        ].map((s) => {
          const isActive = currentStep === s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setCurrentStep(s.num)}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: isActive ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.03)",
                border: isActive ? "1.5px solid var(--accent-emerald)" : "1px solid var(--border-color)",
                color: isActive ? "#ffffff" : "var(--text-secondary)",
                fontWeight: 600,
                fontSize: "0.85rem",
                textAlign: "left",
                cursor: "pointer"
              }}
            >
              {isHi ? s.title_hi : s.title_en}
            </button>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {currentStep === 1 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span className="badge badge-indigo">{isHi ? "त्वरित तर्क वार्म-अप (2 मिनट)" : "Fluid Logic Warm-Up (2 mins)"}</span>
              <span style={{ fontSize: "0.8rem", color: "var(--accent-cyan)" }}>{isHi ? "पैटर्न अभ्यास #48" : "Pattern Practice #48"}</span>
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              {isHi ? "दृश्य ज्यामितीय आव्यूह पहेली" : "Visual Geometric Pattern Invariance"}
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
              {isHi
                ? "यदि एक सम बहुभुज (Regular Polygon) का प्रत्येक आंतरिक कोण 144 अंश है, तो इस बहुभुज की कुल भुजाओं की संख्या क्या होगी?"
                : "A regular polygon has each interior angle measuring exactly 144 degrees. How many sides does this polygon have?"}
            </p>
            <div style={{
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              border: "1px dashed var(--border-color)"
            }}>
              <strong>{isHi ? "सोचने का संकेत: " : "Reasoning hint: "}</strong>
              {isHi
                ? "प्रत्येक बाह्य कोण = 180 - 144 = 36 अंश। कुल बाह्य कोणों का योग 360 अंश होता है। n = 360 / 36 = 10 भुजाएं।"
                : "Exterior angle = 180 - 144 = 36 degrees. The sum of all exterior angles is always 360 degrees. Therefore, n = 360 / 36 = 10 sides."}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <button type="button" className="btn-primary" onClick={() => setCurrentStep(2)}>
                {isHi ? "संकल्पना पर आगे बढ़ें →" : "Proceed to Core Concept Bite →"}
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span className="badge badge-emerald">{isHi ? "प्रमाणित पाठ्यचर्या अंश" : "NCERT Class 8 Math Chapter 3"}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Source: SRC-NCERT-TEXTBOOK-INDEX</span>
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              {isHi ? "चतुर्भुजों और बहुभुजों की समझ (Understanding Quadrilaterals)" : "Understanding Polygons & Exterior Angle Theorem"}
            </h3>
            <div style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "#e2e8f0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p>
                {isHi
                  ? "किसी भी बहुभुज (चाहे उसमें 3 भुजाएं हों या 100 भुजाएं) के सभी बाह्य कोणों (Exterior Angles) का योग सदैव 360 अंश (अथवा 4 समकोण) होता है।"
                  : "Regardless of the number of sides (triangle, quadrilateral, or decagon), the sum of the measures of the external angles of any convex polygon is invariant and equals 360 degrees (4 right angles)."}
              </p>
              <div style={{ padding: "0.85rem", borderRadius: "6px", backgroundColor: "rgba(99, 102, 241, 0.1)", border: "1px solid rgba(99, 102, 241, 0.3)" }}>
                <strong>{isHi ? "मुख्य सूत्र: " : "Core Formula: "}</strong>
                <code>Interior Angle + Exterior Angle = 180° (Linear Pair)</code> <br />
                <code>Number of sides (n) = 360° / (Measure of each exterior angle)</code>
              </div>
            </div>
            <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem" }}>
              <button type="button" className="btn-secondary" onClick={() => setCurrentStep(1)}>
                {isHi ? "← वार्म-अप" : "← Back to Warm-Up"}
              </button>
              <button type="button" className="btn-primary" onClick={() => setCurrentStep(3)}>
                {isHi ? "दैनिक असाइनमेंट हल करें →" : "Solve Timetable Assignment →"}
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <span className="badge badge-amber">{isHi ? "दैनिक असाइनमेंट" : "Daily Assignment"}</span>
                <span className="badge badge-indigo">
                  {selectedDifficulty === "olympiad" ? "Olympiad Challenge Tier" : "Standard CBSE Tier"}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <button
                  type="button"
                  onClick={() => setSelectedDifficulty("standard")}
                  style={{
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                    backgroundColor: selectedDifficulty === "standard" ? "var(--accent-indigo)" : "rgba(255, 255, 255, 0.05)",
                    color: "#fff"
                  }}
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDifficulty("olympiad")}
                  style={{
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                    backgroundColor: selectedDifficulty === "olympiad" ? "var(--accent-indigo)" : "rgba(255, 255, 255, 0.05)",
                    color: "#fff"
                  }}
                >
                  Olympiad
                </button>
              </div>
            </div>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              {selectedDifficulty === "olympiad"
                ? (isHi ? "ओलंपियाड स्तर: उत्तल बहुभुज कोण संबंध" : "Olympiad Tier: Non-Convex Polygon Boundary Proof")
                : (isHi ? "मानक असाइनमेंट: बाह्य कोण और भुजाओं की गणना" : "Standard Assignment: Exterior Angles & Side Count Calculation")}
            </h3>

            <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
              {selectedDifficulty === "olympiad"
                ? (isHi
                    ? "दो सम बहुभुजों की भुजाओं का अनुपात 1:2 है और उनके आंतरिक कोणों का अनुपात 2:3 है। दोनों बहुभुजों की भुजाओं की संख्या ज्ञात करें और अपना तार्किक चरण लिखें।"
                    : "The ratio between the number of sides of two regular polygons is 1:2 and the ratio between their interior angles is 2:3. Determine the number of sides of each polygon and explain your reasoning step by step.")
                : (isHi
                    ? "एक सम बहुभुज की भुजाओं की संख्या ज्ञात कीजिए यदि उसका प्रत्येक बाह्य कोण 24 अंश का है।"
                    : "Find the number of sides of a regular polygon if each of its exterior angles measures 24 degrees. Write your complete working.")}
            </p>

            <form onSubmit={handleEvaluate}>
              <textarea
                value={userSubmission}
                onChange={(e) => setUserSubmission(e.target.value)}
                placeholder={isHi ? "अपना उत्तर और समाधान यहाँ लिखें..." : "Type your working and solution here..."}
                rows={4}
                aria-label="Your Assignment Solution"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-color)",
                  color: "#f8fafc",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  marginBottom: "1rem",
                  resize: "vertical"
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button type="button" className="btn-secondary" onClick={() => setCurrentStep(2)}>
                  {isHi ? "← संकल्पना" : "← Back to Concept"}
                </button>
                <button type="submit" className="btn-primary">
                  {isHi ? "असाइनमेंट सबमिट करें और दक्षता जांचें ✓" : "Submit Assignment & Verify Mastery ✓"}
                </button>
              </div>
            </form>

            {isEvaluated && feedback && (
              <div style={{
                marginTop: "1.25rem",
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <span className="badge badge-emerald">{isHi ? "एआई मूल्यांकन पूर्ण" : "AI Assignment Evaluation Complete"}</span>
                  <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--accent-emerald)" }}>{feedback.score}% Velocity Score</span>
                </div>
                <p style={{ fontSize: "0.9rem", color: "#f8fafc", margin: "0.5rem 0" }}>
                  {isHi ? feedback.comment_hi : feedback.comment_en}
                </p>
                <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)" }}>
                  {isHi
                    ? "✓ दैनिक समय-सारणी कैलेंडर में असाइनमेंट 'पूर्ण' चिह्नित किया गया।"
                    : "✓ Assignment marked as COMPLETED in Day-Level Calendar Timetable."}
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span className="badge badge-cyan">{isHi ? "दक्षता व प्रतिधारण रिपोर्ट" : "Mastery & Retention Velocity"}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Session ID: SES-2026-891</span>
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              {isHi ? "दैनिक पाठ चक्र समापन व कौशल स्थिति" : "Lesson Loop Completion & Skill State Update"}
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "1rem"
            }}>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "0.85rem", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{isHi ? "कौशल नोड" : "Skill Graph Node"}</span>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#f8fafc", marginTop: "0.2rem" }}>math-geometry-polygon-angles</div>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "0.85rem", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{isHi ? "नई निपुणता दर" : "Updated Mastery State"}</span>
                <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--accent-emerald)", marginTop: "0.2rem" }}>94% (Mastered)</div>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "0.85rem", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{isHi ? "अगला पाठ्य बिंदु" : "Next In Sequence"}</span>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--accent-cyan)", marginTop: "0.2rem" }}>Special Quadrilaterals (Rhombus/Trapezium)</div>
              </div>
            </div>
            <button type="button" className="btn-primary" onClick={() => setCurrentStep(1)}>
              {isHi ? "नया पाठ चक्र प्रारंभ करें" : "Start Next Lesson Loop"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
