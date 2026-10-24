"use client";

import React, { useState } from "react";
import { LanguageMode, SkillMastery, TimetableDay } from "../types/curriculum";

interface DayLevelCalendarTimetableProps {
  lang: LanguageMode;
  calibratedTier?: string;
  focusSkill?: SkillMastery;
}

// Demo learner until the diagnostic result is passed in.
const DEMO_FOCUS_SKILL: SkillMastery = {
  skillId: "ratio-proportion",
  skill_en: "Ratio & proportion",
  skill_hi: "अनुपात व समानुपात",
  correct: 1,
  total: 2,
  likelyGapClass: 7
};

const INITIAL_DAYS: TimetableDay[] = [
  {
    dayNumber: 1,
    dayOfWeek: "Monday",
    dayOfWeek_hi: "सोमवार",
    dateStr: "Day 1 / 180",
    theme_en: "Quantitative Logic & Number Sense",
    theme_hi: "संख्या बोध व गणितीय तर्क",
    isBufferDay: false,
    screenTimeMinutes: 45,
    assignments: [
      {
        id: "asg-01",
        subject: "Mathematics",
        title_en: "Inverse Variation Micro-Proof Challenge",
        title_hi: "प्रतिलोम समानुपात प्रमाण चुनौती",
        challengeTier: "High Agility",
        estimatedMinutes: 25,
        completed: true,
        score: 95,
        skillFocus: "Quantitative Induction"
      },
      {
        id: "asg-02",
        subject: "Science",
        title_en: "Force & Friction Interactive Friction Simulator",
        title_hi: "बल और घर्षण सिमुलेटर परीक्षण",
        challengeTier: "High Agility",
        estimatedMinutes: 20,
        completed: true,
        score: 90,
        skillFocus: "Hypothesis Testing"
      }
    ]
  },
  {
    dayNumber: 2,
    dayOfWeek: "Tuesday",
    dayOfWeek_hi: "मंगलवार",
    dateStr: "Day 2 / 180",
    theme_en: "Linguistic Rigor & Deductive Reading",
    theme_hi: "भाषा प्रवीणता व तार्किक वाचन",
    isBufferDay: false,
    screenTimeMinutes: 40,
    assignments: [
      {
        id: "asg-03",
        subject: "English / Hindi",
        title_en: "Critical Reading: Identifying Rhetorical Bias in Editorials",
        title_hi: "गहन वाचन: संपादकीय में तार्किक पूर्वाग्रह पहचानना",
        challengeTier: "High Agility",
        estimatedMinutes: 25,
        completed: false,
        score: undefined,
        skillFocus: "Verbal Syllogism"
      },
      {
        id: "asg-04",
        subject: "Social Science",
        title_en: "Constitutional Safeguards & Federalism Decision Tree",
        title_hi: "संवैधानिक प्रावधान व संघवाद निर्णय वृक्ष",
        challengeTier: "Standard",
        estimatedMinutes: 15,
        completed: false,
        score: undefined,
        skillFocus: "Systemic Modelling"
      }
    ]
  },
  {
    dayNumber: 3,
    dayOfWeek: "Wednesday",
    dayOfWeek_hi: "बुधवार",
    dateStr: "Day 3 / 180",
    theme_en: "Spatial Geometry & Geometric Invariance",
    theme_hi: "ज्यामितीय संरचना व समरूपता",
    isBufferDay: false,
    screenTimeMinutes: 50,
    assignments: [
      {
        id: "asg-05",
        subject: "Mathematics",
        title_en: "Polygon Exterior Angle Sum Theorem: Visual Proof Challenge",
        title_hi: "बहुभुज के बाह्य कोणों का योग: दृश्य प्रमाण चुनौती",
        challengeTier: "High Agility",
        estimatedMinutes: 30,
        completed: false,
        score: undefined,
        skillFocus: "Spatial Transformation"
      },
      {
        id: "asg-06",
        subject: "Physics",
        title_en: "Refraction Index & Ray Path Calculation Lab",
        title_hi: "अपवर्तनांक व किरण पथ गणना लैब",
        challengeTier: "High Agility",
        estimatedMinutes: 20,
        completed: false,
        score: undefined,
        skillFocus: "Pattern Extrapolation"
      }
    ]
  },
  {
    dayNumber: 4,
    dayOfWeek: "Thursday",
    dayOfWeek_hi: "गुरुवार",
    dateStr: "Day 4 / 180",
    theme_en: "Algorithmic Thinking & Computational Logic",
    theme_hi: "कंप्यूटेशनल सोच व कलन विधि",
    isBufferDay: false,
    screenTimeMinutes: 45,
    assignments: [
      {
        id: "asg-07",
        subject: "Computing / Logic",
        title_en: "Binary Tree Search Depth Optimization",
        title_hi: "बाइनरी ट्री खोज गहराई अनुकूलन",
        challengeTier: "High Agility",
        estimatedMinutes: 25,
        completed: false,
        score: undefined,
        skillFocus: "Algorithmic Recursion"
      },
      {
        id: "asg-08",
        subject: "Chemistry",
        title_en: "Balancing Combustion Reactions via Matrix Equations",
        title_hi: "दहन अभिक्रियाओं का संतुलन: आव्यूह विधि",
        challengeTier: "Standard",
        estimatedMinutes: 20,
        completed: false,
        score: undefined,
        skillFocus: "Symbolic Algebra"
      }
    ]
  },
  {
    dayNumber: 5,
    dayOfWeek: "Friday",
    dayOfWeek_hi: "शुक्रवार",
    dateStr: "Day 5 / 180",
    theme_en: "Interdisciplinary Synthesis & Weekly Diagnostic",
    theme_hi: "समग्र पुनरावलोकन व साप्ताहिक परीक्षण",
    isBufferDay: false,
    screenTimeMinutes: 55,
    assignments: [
      {
        id: "asg-09",
        subject: "Diagnostic Check",
        title_en: "Weekly Velocity Test: 12 Timed Multi-Tier Challenges",
        title_hi: "साप्ताहिक गति परीक्षण: 12 समयबद्ध चुनौतियां",
        challengeTier: "High Agility",
        estimatedMinutes: 35,
        completed: false,
        score: undefined,
        skillFocus: "Mixed Skill Review"
      },
      {
        id: "asg-10",
        subject: "Self-Reflection",
        title_en: "Metacognitive Journal: Error Log & Strategy Audit",
        title_hi: "स्व-मूल्यांकन डायरी: त्रुटि समीक्षा व रणनीति",
        challengeTier: "Standard",
        estimatedMinutes: 20,
        completed: false,
        score: undefined,
        skillFocus: "Metacognition"
      }
    ]
  },
  {
    dayNumber: 6,
    dayOfWeek: "Saturday",
    dayOfWeek_hi: "शनिवार",
    dateStr: "Day 6 / 180",
    theme_en: "Co-Curricular, Project Lab & Life Skills",
    theme_hi: "सह-पाठ्यचर्या, प्रोजेक्ट लैब व जीवन कौशल",
    isBufferDay: false,
    screenTimeMinutes: 30,
    assignments: [
      {
        id: "asg-11",
        subject: "Project Lab",
        title_en: "Offline Community Data Collection & Graphical Representation",
        title_hi: "स्थानीय सामुदायिक डेटा संग्रह व सांख्यिकीय आलेख",
        challengeTier: "Standard",
        estimatedMinutes: 30,
        completed: false,
        score: undefined,
        skillFocus: "Empirical Reasoning"
      }
    ]
  },
  {
    dayNumber: 7,
    dayOfWeek: "Sunday",
    dayOfWeek_hi: "रविवार",
    dateStr: "Day 7 / 180",
    theme_en: "15% Buffer Slot & Rebalancing Rest Day",
    theme_hi: "15% बफर स्लॉट व विश्राम दिवस",
    isBufferDay: true,
    screenTimeMinutes: 0,
    assignments: [
      {
        id: "asg-buffer",
        subject: "Dynamic Rebalancer",
        title_en: "Catch-up buffer slot for any delayed assignment or deep rest",
        title_hi: "विलंबित असाइनमेंट के लिए बफर समय अथवा विश्राम",
        challengeTier: "Foundational",
        estimatedMinutes: 0,
        completed: true,
        skillFocus: "Rest & Cognitive Consolidation"
      }
    ]
  }
];

export default function DayLevelCalendarTimetable({
  lang,
  calibratedTier = "High Agility",
  focusSkill = DEMO_FOCUS_SKILL,
}: DayLevelCalendarTimetableProps) {
  const isHi = lang === "hi";
  const [days, setDays] = useState<TimetableDay[]>(INITIAL_DAYS);
  const [selectedDayIdx, setSelectedDayIdx] = useState(1); // Default Tuesday
  const [isRebalanced, setIsRebalanced] = useState(false);

  const selectedDay = days[selectedDayIdx];

  const handleToggleAssignment = (assignmentId: string) => {
    const updated = days.map((d, dIdx) => {
      if (dIdx !== selectedDayIdx) return d;
      return {
        ...d,
        assignments: d.assignments.map((a) => {
          if (a.id !== assignmentId) return a;
          const nextState = !a.completed;
          return {
            ...a,
            completed: nextState,
            score: nextState ? 92 : undefined
          };
        })
      };
    });
    setDays(updated);
  };

  const simulateMissedDay = () => {
    if (isRebalanced) return;
    // Move incomplete Tuesday assignments to Sunday buffer slot
    const updated = days.map((d) => {
      if (d.dayNumber === 2) {
        return {
          ...d,
          theme_en: "Missed Day (Sick / Travel Logged) - Rebalanced",
          theme_hi: "अनुपस्थित दिवस (स्वास्थ्य/यात्रा) - स्वतः पुनर्संतुलित",
          screenTimeMinutes: 0
        };
      }
      if (d.dayNumber === 7) {
        return {
          ...d,
          isBufferDay: false,
          screenTimeMinutes: 40,
          assignments: [
            ...d.assignments,
            {
              id: "asg-rebalanced-01",
              subject: "Mathematics",
              title_en: "Rebalanced: Polygon Exterior Angle Sum Challenge",
              title_hi: "पुनर्संतुलित: बहुभुज कोण योग चुनौती",
              challengeTier: "High Agility" as const,
              estimatedMinutes: 25,
              completed: false,
              skillFocus: "Spatial Transformation"
            }
          ]
        };
      }
      return d;
    });
    setDays(updated);
    setIsRebalanced(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Banner */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
        borderLeft: "4px solid var(--accent-cyan)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span className="badge badge-cyan">
                {isHi ? "दैनिक स्तर समय-सारणी कैलेंडर" : "Day-Level Calendar Timetable"}
              </span>
              <span className="badge badge-amber">
                {isHi ? `सक्रिय स्तर: ${calibratedTier}` : `Active Tier: ${calibratedTier}`}
              </span>
              <span className="badge badge-indigo">
                {isHi
                  ? `केंद्रित कौशल: ${focusSkill.skill_hi} (${focusSkill.total} में से ${focusSkill.correct} सही)`
                  : `Focus skill: ${focusSkill.skill_en} (${focusSkill.correct} of ${focusSkill.total} correct)`}
              </span>
            </div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.35rem" }}>
              {isHi
                ? "छात्र की क्षमता अनुसार अनुकूलित दैनिक समय-सारणी व असाइनमेंट"
                : "Personalised Day-Level Timetable & Dynamic Assignment Schedule"}
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", maxWidth: "800px" }}>
              {isHi
                ? "यह समय-सारणी उन कौशलों के आधार पर प्रत्येक दिन के असाइनमेंट तय करती है जिनमें छात्र की दक्षता अभी अधूरी है। स्क्रीन समय बाल-स्वास्थ्य मानकों के अनुसार सीमित है, और यदि कोई दिन छूट जाए तो साप्ताहिक बफर स्लॉट स्वतः पढ़ाई को संतुलित कर देता है।"
                : "Each day's assignments target the skills the student has not yet mastered. Screen time is strictly capped per pediatric standards, and missed days automatically shift into weekly buffer slots."}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={simulateMissedDay}
              style={{ fontSize: "0.82rem" }}
            >
              ⚡ {isHi ? "दिन अनुपस्थिति व स्वतः पुनर्संतुलन सिमुलेट करें" : "Simulate Missed Day & Auto-Rebalance"}
            </button>
          </div>
        </div>
      </div>

      {/* Week Day Selector Strip */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: "0.5rem"
      }}>
        {days.map((d, idx) => {
          const isSelected = selectedDayIdx === idx;
          const completedCount = d.assignments.filter((a) => a.completed).length;
          const totalCount = d.assignments.length;
          return (
            <button
              key={d.dayNumber}
              type="button"
              onClick={() => setSelectedDayIdx(idx)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: isSelected ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                border: isSelected ? "1.5px solid var(--accent-indigo)" : "1px solid var(--border-color)",
                textAlign: "left",
                transition: "all 0.15s ease",
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.75rem", color: isSelected ? "var(--accent-cyan)" : "var(--text-muted)", fontWeight: 600 }}>
                  {d.dateStr}
                </span>
                {d.isBufferDay && (
                  <span className="badge badge-emerald" style={{ fontSize: "0.6rem", padding: "1px 4px" }}>
                    Buffer
                  </span>
                )}
              </div>
              <strong style={{ fontSize: "0.95rem", color: isSelected ? "#fff" : "var(--text-secondary)" }}>
                {isHi ? d.dayOfWeek_hi : d.dayOfWeek}
              </strong>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                {totalCount === 0
                  ? (isHi ? "विश्राम" : "Rest")
                  : `${completedCount}/${totalCount} ${isHi ? "पूर्ण" : "Done"}`}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Details & Assignment Board */}
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                {isHi ? selectedDay.dayOfWeek_hi : selectedDay.dayOfWeek} - {isHi ? selectedDay.theme_hi : selectedDay.theme_en}
              </h3>
              {selectedDay.isBufferDay && (
                <span className="badge badge-emerald">
                  {isHi ? "15% सुरक्षित बफर स्लॉट" : "15% Built-in Buffer Slot"}
                </span>
              )}
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
              {isHi
                ? `अनुमानित स्क्रीन समय: ${selectedDay.screenTimeMinutes} मिनट (बाल स्वास्थ्य मानकों के अनुकूल)`
                : `Target Screen Time: ${selectedDay.screenTimeMinutes} mins (Compliant with pediatric screen caps)`}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {isHi ? "दैनिक प्रगति:" : "Daily Completion:"}
            </span>
            <div style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: selectedDay.assignments.every((a) => a.completed) ? "var(--accent-emerald)" : "var(--accent-cyan)"
            }}>
              {selectedDay.assignments.filter((a) => a.completed).length} / {selectedDay.assignments.length}
            </div>
          </div>
        </div>

        {/* Assignments list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {selectedDay.assignments.map((asg) => {
            return (
              <div
                key={asg.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  padding: "1rem",
                  borderRadius: "8px",
                  backgroundColor: asg.completed ? "rgba(16, 185, 129, 0.06)" : "rgba(255, 255, 255, 0.02)",
                  border: `1px solid ${asg.completed ? "rgba(16, 185, 129, 0.3)" : "var(--border-color)"}`,
                  transition: "all 0.15s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", flex: 1, minWidth: "260px" }}>
                  <input
                    type="checkbox"
                    checked={asg.completed}
                    onChange={() => handleToggleAssignment(asg.id)}
                    aria-label={`Mark ${asg.title_en} as completed`}
                    style={{
                      width: "18px",
                      height: "18px",
                      marginTop: "3px",
                      cursor: "pointer",
                      accentColor: "var(--accent-emerald)"
                    }}
                  />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
                      <span className="badge badge-indigo" style={{ fontSize: "0.68rem" }}>
                        {asg.subject}
                      </span>
                      <span className="badge badge-amber" style={{ fontSize: "0.68rem" }}>
                        {asg.challengeTier}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        ⏱ {asg.estimatedMinutes} {isHi ? "मिनट" : "mins"}
                      </span>
                    </div>
                    <div style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: asg.completed ? "var(--accent-emerald)" : "#f8fafc",
                      textDecoration: asg.completed ? "line-through" : "none"
                    }}>
                      {isHi ? asg.title_hi : asg.title_en}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                      {isHi ? "कौशल: " : "Skill focus: "}
                      <span style={{ color: "var(--text-secondary)" }}>{asg.skillFocus}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {asg.completed && asg.score && (
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                        {isHi ? "अर्जित स्कोर" : "Challenge Score"}
                      </span>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent-emerald)" }}>
                        {asg.score}%
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleToggleAssignment(asg.id)}
                    style={{
                      padding: "0.4rem 0.8rem",
                      borderRadius: "6px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      backgroundColor: asg.completed ? "rgba(16, 185, 129, 0.15)" : "var(--accent-indigo)",
                      color: asg.completed ? "#34d399" : "#fff",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    {asg.completed ? (isHi ? "पूर्ण ✓" : "Submitted ✓") : (isHi ? "शुरू करें →" : "Launch Assignment →")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
