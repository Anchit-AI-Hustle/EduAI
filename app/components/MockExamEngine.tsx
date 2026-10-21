"use client";

import React, { useState } from "react";
import { LanguageMode } from "../types/curriculum";

interface MockExamEngineProps {
  lang: LanguageMode;
}

interface ExamBlueprint {
  id: string;
  title_en: string;
  title_hi: string;
  board_track: string;
  officialSource: string;
  durationMinutes: number;
  totalMarks: number;
  markingScheme: string;
  questions: {
    id: string;
    text_en: string;
    text_hi: string;
    options_en: string[];
    options_hi: string[];
    correctIndex: number;
    skillNode: string;
    explanation_en: string;
    explanation_hi: string;
  }[];
}

const BLUEPRINTS: ExamBlueprint[] = [
  {
    id: "cbse-10-math",
    title_en: "CBSE Class 10 Standard Mathematics Mock Test",
    title_hi: "सीबीएसई कक्षा 10 मानक गणित मॉक परीक्षा",
    board_track: "CBSE Class X Board Examination",
    officialSource: "SRC-CBSE-CURRICULUM-2026-27-PAGE",
    durationMinutes: 15,
    totalMarks: 20,
    markingScheme: "+4 for correct, 0 for wrong (Section A Pattern)",
    questions: [
      {
        id: "q-cbse-1",
        text_en: "If the discriminant of the quadratic equation 2x^2 - 4x + k = 0 is 0, find the value of k.",
        text_hi: "यदि द्विघात समीकरण 2x^2 - 4x + k = 0 का विविक्तकर (discriminant) शून्य है, तो k का मान ज्ञात कीजिए।",
        options_en: ["k = 1", "k = 2", "k = 4", "k = -2"],
        options_hi: ["k = 1", "k = 2", "k = 4", "k = -2"],
        correctIndex: 1, // D = b^2 - 4ac = (-4)^2 - 4(2)(k) = 16 - 8k = 0 => 8k = 16 => k = 2
        skillNode: "math-algebra-quadratic-roots",
        explanation_en: "Discriminant D = b^2 - 4ac. Here a=2, b=-4, c=k. D = (-4)^2 - 4(2)(k) = 16 - 8k = 0. Thus, k = 2.",
        explanation_hi: "विविक्तकर D = b^2 - 4ac. यहाँ a=2, b=-4, c=k. D = 16 - 8k = 0, अतः k = 2."
      },
      {
        id: "q-cbse-2",
        text_en: "The distance of point P(3, 4) from the x-axis is:",
        text_hi: "बिंदु P(3, 4) की x-अक्ष से दूरी क्या है?",
        options_en: ["3 units", "4 units", "5 units", "7 units"],
        options_hi: ["3 इकाई", "4 इकाई", "5 इकाई", "7 इकाई"],
        correctIndex: 1, // distance from x axis is |y| = 4
        skillNode: "math-geometry-coordinate-distance",
        explanation_en: "The perpendicular distance of any point (x, y) from the x-axis is given by |y|. Here y = 4.",
        explanation_hi: "किसी बिंदु (x, y) की x-अक्ष से लंबवत दूरी |y| होती है। यहाँ y = 4 है।"
      }
    ]
  },
  {
    id: "jee-main-phy",
    title_en: "JEE Main Physics: Mechanics & Kinematics Blueprint",
    title_hi: "जेईई मेन भौतिकी: यांत्रिकी व गतिविज्ञान मॉक",
    board_track: "NTA JEE Main (National Testing Agency)",
    officialSource: "SRC-NTA-JEE-MAIN-2026-SYLLABUS",
    durationMinutes: 15,
    totalMarks: 20,
    markingScheme: "+4 for correct, -1 for incorrect (Official NTA Negative Marking)",
    questions: [
      {
        id: "q-jee-1",
        text_en: "A projectile is thrown with velocity v at an angle theta to the horizontal. At the highest point of its trajectory, what is its acceleration?",
        text_hi: "एक प्रक्षेप्य (projectile) को क्षैतिज से थीटा कोण पर v वेग से प्रक्षेपित किया जाता है। इसके प्रक्षेप पथ के उच्चतम बिंदु पर इसका त्वरण क्या होगा?",
        options_en: ["0", "g vertically downward", "g * sin(theta)", "g * cos(theta)"],
        options_hi: ["0", "g लंबवत नीचे की ओर", "g * sin(theta)", "g * cos(theta)"],
        correctIndex: 1, // gravity is always g downwards
        skillNode: "physics-mechanics-projectile-motion",
        explanation_en: "Gravity acts downward with constant acceleration g throughout the motion, including at the apex.",
        explanation_hi: "संपूर्ण प्रक्षेप्य गति में गुरुत्वीय त्वरण सदैव लंबवत नीचे की ओर g रहता है, उच्चतम बिंदु पर भी।"
      },
      {
        id: "q-jee-2",
        text_en: "The dimension of Planck constant (h) is identical to the dimension of:",
        text_hi: "प्लांक नियतांक (h) की विमा (dimension) किस राशि की विमा के समान है?",
        options_en: ["Linear Momentum", "Angular Momentum", "Energy", "Power"],
        options_hi: ["रैखिक संवेग", "कोणीय संवेग (Angular Momentum)", "ऊर्जा", "शक्ति"],
        correctIndex: 1, // [h] = [E/nu] = ML^2 T^-1 = [r x p] = Angular momentum
        skillNode: "physics-units-dimensions",
        explanation_en: "Planck constant h has dimensions [M L^2 T^-1], which matches angular momentum L = r x p.",
        explanation_hi: "प्लांक नियतांक h की विमा [M L^2 T^-1] होती है, जो कोणीय संवेग (L = r x p) के बराबर है।"
      }
    ]
  }
];

export default function MockExamEngine({ lang }: MockExamEngineProps) {
  const isHi = lang === "hi";
  const [selectedBlueprintIdx, setSelectedBlueprintIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const activeBlueprint = BLUEPRINTS[selectedBlueprintIdx];

  const handleSelect = (qId: string, optIdx: number) => {
    if (isCompleted) return;
    setUserAnswers({
      ...userAnswers,
      [qId]: optIdx
    });
  };

  const calculateScore = () => {
    let rawScore = 0;
    const isJee = activeBlueprint.id.includes("jee");
    activeBlueprint.questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans === undefined) {
        // unattempted: 0
      } else if (ans === q.correctIndex) {
        rawScore += 4;
      } else {
        rawScore += isJee ? -1 : 0;
      }
    });
    return rawScore;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Banner */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
        borderLeft: "4px solid var(--accent-rose)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-rose">{isHi ? "आधिकारिक मॉक परीक्षा इंजन" : "Official Mock Exam Engine"}</span>
          <span className="badge badge-indigo">{isHi ? "प्राथमिक ब्लूप्रिंट आधारित" : "Primary Blueprint Grounded"}</span>
        </div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.35rem" }}>
          {isHi
            ? "सीबीएसई, आईसीएसई व जेईई/नीट आधिकारिक पैटर्न पर आधारित मॉक परीक्षा"
            : "Board & Competitive Mock Engine with Primary Source Marking"}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
          {isHi
            ? "यह इंजन आधिकारिक बोर्ड एवं प्रतियोगी परीक्षा ब्लूप्रिंट के अनुसार परीक्षण करता है और गलत उत्तरों को कौशल ग्राफ (Skill Graph) के मूल कारणों से जोड़ता है।"
            : "Tests students against verified official examination schemes and traces every error back to its root prerequisite skill in the shared skill graph."}
        </p>
      </div>

      {/* Blueprint Selector */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {BLUEPRINTS.map((bp, idx) => {
          const isSelected = selectedBlueprintIdx === idx;
          return (
            <button
              key={bp.id}
              type="button"
              onClick={() => {
                setSelectedBlueprintIdx(idx);
                setUserAnswers({});
                setIsCompleted(false);
              }}
              style={{
                padding: "0.65rem 1rem",
                borderRadius: "8px",
                backgroundColor: isSelected ? "rgba(244, 63, 94, 0.15)" : "rgba(255, 255, 255, 0.03)",
                border: isSelected ? "1.5px solid var(--accent-rose)" : "1px solid var(--border-color)",
                color: isSelected ? "#fff" : "var(--text-secondary)",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer"
              }}
            >
              {isHi ? bp.title_hi : bp.title_en}
            </button>
          );
        })}
      </div>

      {/* Exam Details Card */}
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
              {isHi ? activeBlueprint.title_hi : activeBlueprint.title_en}
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              {isHi ? "संचालक संस्था: " : "Conducting Authority: "}
              <strong style={{ color: "var(--text-secondary)" }}>{activeBlueprint.board_track}</strong> |{" "}
              {isHi ? "स्रोत आईडी: " : "Source: "}
              <code>{activeBlueprint.officialSource}</code>
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <span className="badge badge-amber">{activeBlueprint.markingScheme}</span>
          </div>
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {activeBlueprint.questions.map((q, qIdx) => {
            const selectedOpt = userAnswers[q.id];
            return (
              <div
                key={q.id}
                style={{
                  padding: "1rem",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--border-color)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--accent-cyan)" }}>
                    Question {qIdx + 1}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Node: <code>{q.skillNode}</code>
                  </span>
                </div>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#f8fafc", marginBottom: "0.85rem" }}>
                  {isHi ? q.text_hi : q.text_en}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {(isHi ? q.options_hi : q.options_en).map((opt, oIdx) => {
                    const isPicked = selectedOpt === oIdx;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelect(q.id, oIdx)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "6px",
                          backgroundColor: isPicked ? "rgba(244, 63, 94, 0.2)" : "rgba(255, 255, 255, 0.02)",
                          border: isPicked ? "1.5px solid var(--accent-rose)" : "1px solid var(--border-color)",
                          color: isPicked ? "#fff" : "var(--text-secondary)",
                          textAlign: "left",
                          cursor: isCompleted ? "default" : "pointer"
                        }}
                      >
                        <span style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          backgroundColor: isPicked ? "var(--accent-rose)" : "rgba(255, 255, 255, 0.08)",
                          color: isPicked ? "#fff" : "var(--text-muted)"
                        }}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span style={{ fontSize: "0.88rem" }}>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {isCompleted && (
                  <div style={{
                    marginTop: "0.75rem",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    backgroundColor: selectedOpt === q.correctIndex ? "rgba(16, 185, 129, 0.1)" : "rgba(244, 63, 94, 0.1)",
                    border: `1px solid ${selectedOpt === q.correctIndex ? "rgba(16, 185, 129, 0.3)" : "rgba(244, 63, 94, 0.3)"}`
                  }}>
                    <strong style={{ fontSize: "0.85rem", color: selectedOpt === q.correctIndex ? "var(--accent-emerald)" : "var(--accent-rose)" }}>
                      {selectedOpt === q.correctIndex
                        ? (isHi ? "सटीक उत्तर (+4 अंक)" : "Correct Answer (+4 Marks)")
                        : (isHi ? `त्रुटि (सही विकल्प: ${String.fromCharCode(65 + q.correctIndex)})` : `Incorrect (Correct: ${String.fromCharCode(65 + q.correctIndex)})`)}
                    </strong>
                    <p style={{ fontSize: "0.82rem", color: "#e2e8f0", marginTop: "0.25rem" }}>
                      {isHi ? q.explanation_hi : q.explanation_en}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Score card */}
        {!isCompleted ? (
          <div style={{ textAlign: "right" }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setIsCompleted(true)}
              style={{ background: "linear-gradient(135deg, #f43f5e 0%, #6366f1 100%)" }}
            >
              {isHi ? "मॉक परीक्षा सबमिट करें ✓" : "Submit Mock Exam & Compute Rank Score ✓"}
            </button>
          </div>
        ) : (
          <div style={{
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{isHi ? "कुल प्राप्तांक" : "Exam Score"}</span>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-cyan)" }}>
                {calculateScore()} / {activeBlueprint.totalMarks}
              </div>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setUserAnswers({});
                setIsCompleted(false);
              }}
            >
              🔄 {isHi ? "पुनः प्रयास करें" : "Retake Mock"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
