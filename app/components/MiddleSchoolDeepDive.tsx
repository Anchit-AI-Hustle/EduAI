"use client";

import React, { useState, useMemo } from "react";

interface Challenge {
  prompt: { en: string; hi: string };
  options: string[];
  correctIndex: number;
  explanation: { en: string; hi: string };
}

interface Chapter {
  chapterNumber: number;
  chapterId: string;
  title: { en: string; hi: string };
  skillId: string;
  prerequisiteSkillIds: string[];
  notionalHours: number;
  learningOutcomes: string[];
  keyConcepts: string[];
  challenges: {
    foundational: Challenge;
    standard: Challenge;
    accelerated: Challenge;
  };
}

interface Subject {
  subjectId: string;
  subjectName: { en: string; hi: string };
  textbook: string;
  officialCode: string;
  chapters: Chapter[];
}

interface ClassStage {
  yearId: string;
  yearLabel: { en: string; hi: string };
  ageBand: string;
  screenTimeCapMinutes: number;
  subjects: Subject[];
}

interface MiddleStageDeepeningData {
  schemaVersion: string;
  deepeningId: string;
  boardId: string;
  boardName: string;
  stage: string;
  ageSpan: string;
  framework: string;
  officialSources: string[];
  classes: ClassStage[];
}

interface Props {
  deepeningData?: MiddleStageDeepeningData;
  lang?: "en" | "hi";
  onAssignToTimetable?: (chapterTitle: string, tier: string) => void;
  onAwardXp?: (amount: number, reason: string) => void;
}

export default function MiddleSchoolDeepDive({
  deepeningData,
  lang = "en",
  onAssignToTimetable,
  onAwardXp
}: Props) {
  const [selectedYearId, setSelectedYearId] = useState<string>("class-06");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("math-c06");
  const [activeChapterId, setActiveChapterId] = useState<string | null>("cbse-c06-math-ch01");
  const [activeTier, setActiveTier] = useState<"foundational" | "standard" | "accelerated">("standard");
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [masteryScore, setMasteryScore] = useState<number>(78);
  const [assignedSuccessMsg, setAssignedSuccessMsg] = useState<string>("");

  const classes = deepeningData?.classes || [];

  const currentClass = useMemo(() => {
    return classes.find((c) => c.yearId === selectedYearId) || classes[0];
  }, [classes, selectedYearId]);

  const currentSubject = useMemo(() => {
    if (!currentClass) return null;
    return (
      currentClass.subjects.find((s) => s.subjectId === selectedSubjectId) ||
      currentClass.subjects[0]
    );
  }, [currentClass, selectedSubjectId]);

  const currentChapter = useMemo(() => {
    if (!currentSubject) return null;
    return (
      currentSubject.chapters.find((ch) => ch.chapterId === activeChapterId) ||
      currentSubject.chapters[0]
    );
  }, [currentSubject, activeChapterId]);

  const handleSelectYear = (yearId: string) => {
    setSelectedYearId(yearId);
    const targetClass = classes.find((c) => c.yearId === yearId);
    if (targetClass && targetClass.subjects.length > 0) {
      setSelectedSubjectId(targetClass.subjects[0].subjectId);
      if (targetClass.subjects[0].chapters.length > 0) {
        setActiveChapterId(targetClass.subjects[0].chapters[0].chapterId);
      }
    }
    setUserSelectedOption(null);
    setSubmitted(false);
    setAssignedSuccessMsg("");
  };

  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    if (currentClass) {
      const foundSub = currentClass.subjects.find((s) => s.subjectId === subjectId);
      if (foundSub && foundSub.chapters.length > 0) {
        setActiveChapterId(foundSub.chapters[0].chapterId);
      }
    }
    setUserSelectedOption(null);
    setSubmitted(false);
    setAssignedSuccessMsg("");
  };

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setUserSelectedOption(null);
    setSubmitted(false);
    setAssignedSuccessMsg("");
  };

  const currentChallenge = useMemo(() => {
    if (!currentChapter) return null;
    return currentChapter.challenges[activeTier];
  }, [currentChapter, activeTier]);

  const handleSubmitAnswer = () => {
    if (userSelectedOption === null || !currentChallenge) return;
    setSubmitted(true);
    if (userSelectedOption === currentChallenge.correctIndex) {
      const delta = activeTier === "accelerated" ? 4 : activeTier === "standard" ? 2 : 1;
      setMasteryScore((prev) => Math.min(100, prev + delta));
      if (onAwardXp) {
        const reward = activeTier === "accelerated" ? 60 : activeTier === "standard" ? 40 : 25;
        onAwardXp(reward, `${activeTier.toUpperCase()} Challenge Solved! ⚡`);
      }
    }
  };

  const handleAssignToCalendar = () => {
    if (!currentChapter) return;
    const title = currentChapter.title[lang] || currentChapter.title.en;
    if (onAssignToTimetable) {
      onAssignToTimetable(title, activeTier);
    }
    setAssignedSuccessMsg(
      lang === "hi"
        ? `"${title}" (${activeTier}) को दैनिक समय सारिणी में सफलतापूर्वक जोड़ा गया!`
        : `"${title}" (${activeTier}) scheduled into day-level timetable!`
    );
    setTimeout(() => setAssignedSuccessMsg(""), 4000);
  };

  if (!deepeningData || classes.length === 0) {
    return (
      <div className="card" style={{ padding: "1.5rem", color: "#94a3b8" }}>
        Loading CBSE Middle Stage deepening data...
      </div>
    );
  }

  const isHindi = lang === "hi";

  return (
    <div className="card" style={{ marginTop: "1rem", borderColor: "#6366f1" }}>
      {/* Header Banner */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
            <span className="badge" style={{ background: "#4338ca", color: "#e0e7ff", fontWeight: 700 }}>
              Phase 3 Deepening
            </span>
            <span className="badge" style={{ background: "#065f46", color: "#a7f3d0" }}>
              CBSE Middle Stage (Classes 6-8)
            </span>
            <span className="badge" style={{ background: "#374151", color: "#cbd5e1" }}>
              NCF-SE 2023 Spine
            </span>
          </div>
          <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.35rem 0", color: "#f8fafc" }}>
            {isHindi
              ? "सीबीएसई माध्यमिक चरण (कक्षा 6-8): अध्यायवार शिक्षण और अनुकूली चुनौतियां"
              : "CBSE Middle Stage Deep Dive: Chapter-by-Chapter Learning & Adaptive Challenge Engine"}
          </h2>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.88rem", maxWidth: "860px" }}>
            {isHindi
              ? "एनसीईआरटी की आधिकारिक पाठ्यपुस्तकों (गणित प्रकाश, क्यूरियोसिटी, एक्सप्लोरिंग सोसाइटी, पूर्वी, मल्हार) पर आधारित पूर्ण पाठ्यक्रम, कौशल ग्राफ पूर्व-अपेक्षाएं और त्रि-स्तरीय बौद्धिक चुनौतियां।"
              : "Exhaustive chapter-level learning outcomes from official NCERT NCF-SE 2023 textbooks (Ganita Prakash, Curiosity, Exploring Society, Poorvi, Malhar) linked to DAG prerequisite edges and tiered IQ challenges."}
          </p>
        </div>

        {/* Real-time Mastery IQ Metric */}
        <div style={{ background: "rgba(99, 102, 241, 0.12)", border: "1px solid rgba(99, 102, 241, 0.3)", borderRadius: "8px", padding: "0.6rem 1rem", textAlign: "right" }}>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#a5b4fc" }}>
            {isHindi ? "माध्यमिक दक्षता सूचकांक" : "Middle Stage Mastery IQ"}
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#818cf8" }}>
            {masteryScore} <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>/ 100</span>
          </div>
        </div>
      </div>

      {/* Class Switcher */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {classes.map((cls) => {
          const isSelected = cls.yearId === selectedYearId;
          return (
            <button
              key={cls.yearId}
              type="button"
              onClick={() => handleSelectYear(cls.yearId)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: isSelected ? "2px solid #818cf8" : "1px solid #334155",
                background: isSelected ? "#312e81" : "#1e293b",
                color: isSelected ? "#ffffff" : "#cbd5e1",
                fontWeight: isSelected ? 700 : 500,
                cursor: "pointer",
                fontSize: "0.88rem"
              }}
            >
              {cls.yearLabel[lang] || cls.yearLabel.en} ({cls.ageBand})
            </button>
          );
        })}
      </div>

      {/* Subject Switcher */}
      {currentClass && (
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {currentClass.subjects.map((sub) => {
            const isSelected = sub.subjectId === selectedSubjectId;
            return (
              <button
                key={sub.subjectId}
                type="button"
                onClick={() => handleSelectSubject(sub.subjectId)}
                style={{
                  padding: "0.45rem 0.9rem",
                  borderRadius: "20px",
                  border: isSelected ? "1px solid #6366f1" : "1px solid #475569",
                  background: isSelected ? "rgba(99, 102, 241, 0.25)" : "rgba(30, 41, 59, 0.6)",
                  color: isSelected ? "#e0e7ff" : "#94a3b8",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {sub.subjectName[lang] || sub.subjectName.en} - {sub.textbook}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Two-Column Layout: Chapter List on Left, Active Chapter & Challenge on Right */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
        {/* Left Column: Chapters Directory */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <h3 style={{ fontSize: "0.95rem", margin: 0, color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {isHindi ? "अध्याय सूची" : "Chapter Directory"} ({currentSubject?.chapters.length || 0})
            </h3>
            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
              {currentSubject?.textbook}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "580px", overflowY: "auto", paddingRight: "0.3rem" }}>
            {currentSubject?.chapters.map((ch) => {
              const isSelected = ch.chapterId === activeChapterId;
              return (
                <div
                  key={ch.chapterId}
                  onClick={() => handleSelectChapter(ch.chapterId)}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: isSelected ? "1px solid #818cf8" : "1px solid #1e293b",
                    background: isSelected ? "rgba(79, 70, 229, 0.18)" : "#131c2e",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: isSelected ? "#a5b4fc" : "#64748b" }}>
                      Ch {ch.chapterNumber}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
                      {ch.notionalHours} hrs
                    </span>
                  </div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: isSelected ? "#ffffff" : "#cbd5e1" }}>
                    {ch.title[lang] || ch.title.en}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.25rem" }}>
                    Skill: <code style={{ color: "#38bdf8", background: "rgba(56, 189, 248, 0.1)", padding: "0.1rem 0.3rem", borderRadius: "3px" }}>{ch.skillId}</code>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Chapter Deep Dive & Tiered Challenge Engine */}
        {currentChapter && (
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", padding: "1.25rem" }}>
            {/* Chapter Details Header */}
            <div style={{ borderBottom: "1px solid #1e293b", paddingBottom: "1rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                <span className="badge" style={{ background: "#1e3a8a", color: "#bfdbfe" }}>
                  Ch {currentChapter.chapterNumber}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  {currentSubject?.textbook} (Code: {currentSubject?.officialCode})
                </span>
              </div>
              <h3 style={{ fontSize: "1.2rem", margin: "0 0 0.5rem 0", color: "#f8fafc" }}>
                {currentChapter.title[lang] || currentChapter.title.en}
              </h3>

              {/* NCF-SE Learning Outcomes */}
              <div style={{ marginTop: "0.75rem" }}>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#a5b4fc", fontWeight: 700, marginBottom: "0.3rem" }}>
                  {isHindi ? "एनसीएफ-एसई 2023 अधिगम प्रतिफल (Learning Outcomes)" : "NCF-SE 2023 Learning Outcomes"}
                </div>
                <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#cbd5e1", fontSize: "0.83rem", lineHeight: "1.4" }}>
                  {currentChapter.learningOutcomes.map((lo, i) => (
                    <li key={i} style={{ marginBottom: "0.2rem" }}>{lo}</li>
                  ))}
                </ul>
              </div>

              {/* Skill Prerequisites Graph Edge */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap", marginTop: "0.75rem", fontSize: "0.78rem" }}>
                <span style={{ color: "#94a3b8" }}>{isHindi ? "पूर्व-अपेक्षित कौशल:" : "Prerequisite DAG Edge:"}</span>
                {currentChapter.prerequisiteSkillIds.map((pid) => (
                  <span key={pid} style={{ background: "#1e293b", color: "#38bdf8", padding: "0.15rem 0.4rem", borderRadius: "4px", border: "1px solid #334155" }}>
                    {pid}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Tiered Challenge Card */}
            <div style={{ background: "#131d31", border: "1px solid #25334d", borderRadius: "8px", padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#38bdf8" }}>
                  {isHindi ? "अनुकूली बौद्धिक चुनौती (Adaptive Challenge)" : "Adaptive Challenge Engine"}
                </span>

                {/* Tier Switcher */}
                <div style={{ display: "flex", gap: "0.25rem", background: "#0b1120", padding: "0.2rem", borderRadius: "6px" }}>
                  {(["foundational", "standard", "accelerated"] as const).map((t) => {
                    const isTierSelected = activeTier === t;
                    const tierLabels = {
                      foundational: isHindi ? "आधारभूत" : "Foundational",
                      standard: isHindi ? "मानक" : "Standard",
                      accelerated: isHindi ? "ओलंपियाड" : "Accelerated/Olympiad"
                    };
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setActiveTier(t);
                          setUserSelectedOption(null);
                          setSubmitted(false);
                        }}
                        style={{
                          padding: "0.3rem 0.6rem",
                          borderRadius: "4px",
                          border: "none",
                          background: isTierSelected ? "#4f46e5" : "transparent",
                          color: isTierSelected ? "#ffffff" : "#94a3b8",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        {tierLabels[t]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {currentChallenge && (
                <div>
                  {/* Prompt */}
                  <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "1rem", lineHeight: "1.45" }}>
                    {currentChallenge.prompt[lang] || currentChallenge.prompt.en}
                  </div>

                  {/* Options */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                    {currentChallenge.options.map((opt, idx) => {
                      const isChosen = userSelectedOption === idx;
                      let btnBorder = "#334155";
                      let btnBg = "#1a2438";

                      if (submitted) {
                        if (idx === currentChallenge.correctIndex) {
                          btnBorder = "#10b981";
                          btnBg = "rgba(16, 185, 129, 0.2)";
                        } else if (isChosen) {
                          btnBorder = "#ef4444";
                          btnBg = "rgba(239, 68, 68, 0.2)";
                        }
                      } else if (isChosen) {
                        btnBorder = "#818cf8";
                        btnBg = "rgba(129, 140, 248, 0.2)";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={submitted}
                          onClick={() => setUserSelectedOption(idx)}
                          style={{
                            textAlign: "left",
                            padding: "0.6rem 0.85rem",
                            borderRadius: "6px",
                            border: `1px solid ${btnBorder}`,
                            background: btnBg,
                            color: "#f8fafc",
                            fontSize: "0.85rem",
                            cursor: submitted ? "default" : "pointer",
                            transition: "all 0.1s ease"
                          }}
                        >
                          <span style={{ fontWeight: 700, marginRight: "0.5rem", color: isChosen ? "#a5b4fc" : "#64748b" }}>
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Retry Actions */}
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
                    {!submitted ? (
                      <button
                        type="button"
                        onClick={handleSubmitAnswer}
                        disabled={userSelectedOption === null}
                        style={{
                          padding: "0.5rem 1.25rem",
                          borderRadius: "6px",
                          border: "none",
                          background: userSelectedOption !== null ? "#4f46e5" : "#334155",
                          color: "#ffffff",
                          fontSize: "0.84rem",
                          fontWeight: 700,
                          cursor: userSelectedOption !== null ? "pointer" : "not-allowed"
                        }}
                      >
                        {isHindi ? "उत्तर जांचें" : "Check Answer"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setUserSelectedOption(null);
                          setSubmitted(false);
                        }}
                        style={{
                          padding: "0.45rem 1rem",
                          borderRadius: "6px",
                          border: "1px solid #475569",
                          background: "#1e293b",
                          color: "#cbd5e1",
                          fontSize: "0.82rem",
                          cursor: "pointer"
                        }}
                      >
                        {isHindi ? "पुनः प्रयास करें" : "Try Another Tier"}
                      </button>
                    )}

                    {/* Assign to Timetable button */}
                    <button
                      type="button"
                      onClick={handleAssignToCalendar}
                      style={{
                        padding: "0.45rem 1rem",
                        borderRadius: "6px",
                        border: "1px solid #3b82f6",
                        background: "rgba(59, 130, 246, 0.15)",
                        color: "#93c5fd",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      {isHindi ? "कैलेंडर समय-सारिणी में जोड़ें" : "Schedule in Day Timetable"}
                    </button>
                  </div>

                  {/* Feedback Box */}
                  {submitted && (
                    <div
                      style={{
                        marginTop: "1rem",
                        padding: "0.75rem",
                        borderRadius: "6px",
                        border: `1px solid ${
                          userSelectedOption === currentChallenge.correctIndex ? "#059669" : "#dc2626"
                        }`,
                        background:
                          userSelectedOption === currentChallenge.correctIndex
                            ? "rgba(5, 150, 105, 0.12)"
                            : "rgba(220, 38, 38, 0.12)"
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          color: userSelectedOption === currentChallenge.correctIndex ? "#34d399" : "#f87171",
                          marginBottom: "0.3rem"
                        }}
                      >
                        {userSelectedOption === currentChallenge.correctIndex
                          ? isHindi
                            ? "उत्कृष्ट! सही उत्तर।"
                            : "Excellent! Correct Answer."
                          : isHindi
                          ? "गलत उत्तर। विवरण नीचे देखें:"
                          : "Incorrect. See step-by-step resolution:"}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "#cbd5e1", lineHeight: "1.4" }}>
                        {currentChallenge.explanation[lang] || currentChallenge.explanation.en}
                      </div>
                    </div>
                  )}

                  {/* Timetable Assignment Notification */}
                  {assignedSuccessMsg && (
                    <div style={{ marginTop: "0.75rem", padding: "0.5rem 0.75rem", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", borderRadius: "6px", color: "#6ee7b7", fontSize: "0.82rem" }}>
                      {assignedSuccessMsg}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
