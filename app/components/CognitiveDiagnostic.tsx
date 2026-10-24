"use client";

import React, { useState } from "react";
import { ChallengeItem, LanguageMode, SkillMastery } from "../types/curriculum";

interface CognitiveDiagnosticProps {
  lang: LanguageMode;
  onAssessmentComplete?: (results: {
    skillMastery: SkillMastery[];
    placedLevel: string;
    gapDetected: string;
    recommendedTier: string;
  }) => void;
}

const SAMPLE_CHALLENGES: ChallengeItem[] = [
  {
    id: "diag-01",
    domain: "Number Patterns & Logic",
    title_en: "Recursive Number Grid Sequence",
    title_hi: "संख्या ग्रिड अनुक्रम पहेली",
    question_en: "Identify the missing value in the 3x3 matrix: [Row 1: 4, 9, 13], [Row 2: 7, 16, 23], [Row 3: 5, 25, ?]",
    question_hi: "3x3 आव्यूह में अज्ञात संख्या पहचानें: [पंक्ति 1: 4, 9, 13], [पंक्ति 2: 7, 16, 23], [पंक्ति 3: 5, 25, ?]",
    options_en: ["28", "30", "32", "35"],
    options_hi: ["28", "30", "32", "35"],
    correctIndex: 1, // 5 + 25 = 30
    difficulty: "intermediate",
    cognitiveSkill: "Pattern Deduction & Arithmetic Summation",
    hint_en: "Notice the relationship between the first two numbers in each row and the third number.",
    hint_hi: "प्रत्येक पंक्ति की पहली दो संख्याओं और तीसरी संख्या के बीच संबंध देखें।",
    solution_en: "In every row, Column 1 + Column 2 = Column 3. Row 1: 4 + 9 = 13. Row 2: 7 + 16 = 23. Row 3: 5 + 25 = 30.",
    solution_hi: "प्रत्येक पंक्ति में, स्तम्भ 1 + स्तम्भ 2 = स्तम्भ 3. पंक्ति 3: 5 + 25 = 30.",
    prerequisiteGrade: "Class 6 Math (Basic Operations & Number Sense)"
  },
  {
    id: "diag-02",
    domain: "Spatial & Algorithmic Problem Solving",
    title_en: "Gear Rotation Velocity & Direction",
    title_hi: "गियर चक्रण गति और दिशा",
    question_en: "Three interlocking gears A, B, and C have 12, 24, and 36 teeth respectively. If Gear A rotates 6 complete turns clockwise, how many turns does Gear C make and in which direction?",
    question_hi: "तीन जुड़े हुए गियर A, B और C में क्रमशः 12, 24 और 36 दांते हैं। यदि गियर A दक्षिणावर्त (clockwise) 6 पूरे चक्कर लगाता है, तो गियर C कितने चक्कर किस दिशा में लगाएगा?",
    options_en: ["2 turns clockwise", "2 turns counter-clockwise", "3 turns clockwise", "1 turn counter-clockwise"],
    options_hi: ["2 चक्कर दक्षिणावर्त (clockwise)", "2 चक्कर वामावर्त (counter-clockwise)", "3 चक्कर दक्षिणावर्त", "1 चक्कर वामावर्त"],
    correctIndex: 0, // Gear A (12 teeth) * 6 turns = 72 teeth passed. Gear C (36 teeth) turns 72/36 = 2 turns. Direction: A is CW -> B is CCW -> C is CW!
    difficulty: "advanced",
    cognitiveSkill: "Mechanical Reasoning & Ratio Invariance",
    hint_en: "Adjacent interlocked gears always turn in opposite directions. The total teeth moved is constant.",
    hint_hi: "परस्पर जुड़े दो गियर हमेशा विपरीत दिशाओं में घूमते हैं। कुल घूमे गए दांतों की संख्या समान रहती है।",
    solution_en: "Gear A moves 12 * 6 = 72 teeth. Gear C with 36 teeth rotates 72 / 36 = 2 turns. Direction: A rotates CW -> B rotates CCW -> C rotates CW.",
    solution_hi: "गियर A द्वारा कुल दांते = 12 * 6 = 72. गियर C (36 दांते) = 72 / 36 = 2 चक्कर। दिशा: A दक्षिणावर्त -> B वामावर्त -> C दक्षिणावर्त।",
    prerequisiteGrade: "Class 7 Math (Ratios & Fractions) & Physics"
  },
  {
    id: "diag-03",
    domain: "Linguistic & Deductive Logic",
    title_en: "Conditional Propositional Inference",
    title_hi: "तार्किक निष्कर्ष व अनुमान",
    question_en: "Premise 1: All prime numbers greater than 2 are odd. Premise 2: The sum of two odd integers is always even. If p and q are two distinct primes greater than 2, what can be deduced about (p + q)?",
    question_hi: "कथन 1: 2 से बड़ी सभी अभाज्य संख्याएं विषम हैं। कथन 2: दो विषम पूर्णांकों का योग सदैव सम होता है। यदि p और q, 2 से बड़ी दो भिन्न अभाज्य संख्याएं हैं, तो (p + q) के बारे में क्या सत्य है?",
    options_en: [
      "(p + q) must be prime",
      "(p + q) must be even and composite",
      "(p + q) is always divisible by 4",
      "(p + q) cannot be predicted without values"
    ],
    options_hi: [
      "(p + q) सदैव अभाज्य संख्या होगी",
      "(p + q) सदैव सम व संयुक्त (composite) संख्या होगी",
      "(p + q) सदैव 4 से भाज्य होगी",
      "मान जाने बिना कुछ नहीं कहा जा सकता"
    ],
    correctIndex: 1, // sum of two odd numbers is even; since p, q > 2, p+q >= 3+5 = 8 > 2, hence an even number > 2 must be composite!
    difficulty: "intermediate",
    cognitiveSkill: "Abstract Symbolic Deduction",
    hint_en: "What is the smallest possible value for p + q if both are primes strictly greater than 2?",
    hint_hi: "यदि p और q दोनों 2 से बड़े अभाज्य हैं, तो p + q का न्यूनतम मान क्या होगा?",
    solution_en: "Since p and q are primes > 2, both are odd. Sum of two odd integers is even. The smallest distinct primes > 2 are 3 and 5, so p + q >= 8. Any even integer greater than 2 is divisible by 2 and therefore composite.",
    solution_hi: "चूँकि p और q दोनों 2 से बड़े अभाज्य हैं, दोनों विषम होंगे। दो विषम संख्याओं का योग सदैव सम होता है। न्यूनतम मान 3 + 5 = 8 होगा। 2 से बड़ा प्रत्येक सम पूर्णांक 2 से भाज्य होता है, अतः सदैव संयुक्त (composite) होगा।",
    prerequisiteGrade: "Class 6/7 Math (Number Properties)"
  },
  {
    id: "diag-04",
    domain: "Quantitative Modelling & Challenge Agility",
    title_en: "Work Rate & Equilibrium Optimization",
    title_hi: "कार्य-दर व संतुलन समस्या",
    question_en: "An algorithm processes 400 data tasks in 5 hours using 2 parallel processor threads. How many hours will it take to process 1,200 data tasks if processor threads are expanded to 6?",
    question_hi: "एक एल्गोरिदम 2 समानांतर प्रोसेसर थ्रेड्स की सहायता से 400 डेटा कार्यों को 5 घंटे में पूरा करता है। यदि प्रोसेसर थ्रेड्स को बढ़ाकर 6 कर दिया जाए, तो 1,200 डेटा कार्यों को पूरा करने में कितने घंटे लगेंगे?",
    options_en: ["4 hours", "5 hours", "6 hours", "7.5 hours"],
    options_hi: ["4 घंटे", "5 घंटे", "6 घंटे", "7.5 घंटे"],
    correctIndex: 1, // 400 / (5 * 2) = 40 tasks/thread-hour. Total thread-hours needed for 1200 = 1200 / 40 = 30 thread-hours. With 6 threads: 30 / 6 = 5 hours!
    difficulty: "advanced",
    cognitiveSkill: "Multivariable Rate Inversion",
    hint_en: "Calculate the rate of 1 thread working for 1 hour.",
    hint_hi: "1 थ्रेड द्वारा 1 घंटे में संपन्न कार्य-दर ज्ञात करें।",
    solution_en: "Single thread rate = 400 / (5 * 2) = 40 tasks/hr. To do 1,200 tasks requires 1,200 / 40 = 30 thread-hours. With 6 threads, Time = 30 / 6 = 5 hours.",
    solution_hi: "1 थ्रेड की दर = 400 / (5 * 2) = 40 कार्य प्रति घंटा। 1,200 कार्यों के लिए कुल 30 थ्रेड-घंटे चाहिए। 6 थ्रेड्स के साथ, समय = 30 / 6 = 5 घंटे।",
    prerequisiteGrade: "Class 8 Math (Direct and Inverse Proportions)"
  }
];

// Each item probes one skill and its earliest prerequisite class. A miss points
// to that class as the likely gap; with two items per skill it is a lead to
// check, not a confirmed cause.
const SKILLS: Record<string, { en: string; hi: string }> = {
  "number-patterns": { en: "Number patterns & properties", hi: "संख्या पैटर्न व गुणधर्म" },
  "ratio-proportion": { en: "Ratio & proportion", hi: "अनुपात व समानुपात" }
};

const ITEM_SKILLS: Record<string, { skillId: string; prereqClass: number }> = {
  "diag-01": { skillId: "number-patterns", prereqClass: 6 },
  "diag-02": { skillId: "ratio-proportion", prereqClass: 7 },
  "diag-03": { skillId: "number-patterns", prereqClass: 6 },
  "diag-04": { skillId: "ratio-proportion", prereqClass: 8 }
};

function computeSkillMastery(answers: Record<number, number>): SkillMastery[] {
  const bySkill = new Map<string, SkillMastery>();
  SAMPLE_CHALLENGES.forEach((c, idx) => {
    const { skillId, prereqClass } = ITEM_SKILLS[c.id];
    const entry = bySkill.get(skillId) ?? {
      skillId,
      skill_en: SKILLS[skillId].en,
      skill_hi: SKILLS[skillId].hi,
      correct: 0,
      total: 0,
      likelyGapClass: null
    };
    entry.total += 1;
    if (answers[idx] === c.correctIndex) {
      entry.correct += 1;
    } else if (entry.likelyGapClass === null || prereqClass < entry.likelyGapClass) {
      entry.likelyGapClass = prereqClass;
    }
    bySkill.set(skillId, entry);
  });
  return [...bySkill.values()];
}

function tierFor(percentage: number) {
  return percentage >= 75 ? "High Agility" : percentage >= 50 ? "Standard" : "Foundational Scaffold";
}

export default function CognitiveDiagnostic({
  lang,
  onAssessmentComplete,
}: CognitiveDiagnosticProps) {
  const isHi = lang === "hi";
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentChallenge = SAMPLE_CHALLENGES[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optIdx
    });
  };

  const handleNext = () => {
    if (currentIdx < SAMPLE_CHALLENGES.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsSubmitted(true);
      if (onAssessmentComplete) {
        const skillMastery = computeSkillMastery(selectedAnswers);
        const correct = skillMastery.reduce((sum, m) => sum + m.correct, 0);
        const firstGap = skillMastery.find((m) => m.likelyGapClass !== null);
        onAssessmentComplete({
          skillMastery,
          placedLevel: "Class 8 (Accelerated STEM)",
          gapDetected: firstGap ? `${firstGap.skill_en}: likely gap at Class ${firstGap.likelyGapClass}` : "None found",
          recommendedTier: tierFor(Math.round((correct / SAMPLE_CHALLENGES.length) * 100))
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    SAMPLE_CHALLENGES.forEach((c, idx) => {
      if (selectedAnswers[idx] === c.correctIndex) {
        correct++;
      }
    });
    const percentage = Math.round((correct / SAMPLE_CHALLENGES.length) * 100);
    return { correct, total: SAMPLE_CHALLENGES.length, percentage, skillMastery: computeSkillMastery(selectedAnswers) };
  };

  const scoreData = calculateScore();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Intro card */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)",
        borderLeft: "4px solid var(--accent-indigo)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span className="badge badge-indigo">
                {isHi ? "कौशल-वार दक्षता जांच" : "Per-Skill Mastery Check"}
              </span>
              <span className="badge badge-emerald">
                {isHi ? "दैनिक समय-सारणी से जुड़ा हुआ" : "Connected to Day Calendar"}
              </span>
            </div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.35rem" }}>
              {isHi
                ? "कौशल दक्षता निदान: पिछली कक्षा की कमी पहचानें"
                : "Skill Mastery Diagnostic: Find the Earlier-Class Gap"}
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", maxWidth: "800px" }}>
              {isHi
                ? "यह छोटी जांच दिखाती है कि छात्र ने किन कौशलों में दक्षता पा ली है और किनमें पिछली कक्षा की कोई कमी होने की संभावना है। हर कौशल पर कुछ ही प्रश्न हैं, इसलिए यह एक शुरुआती संकेत है, बुद्धि का माप नहीं। परिणाम दैनिक समय-सारणी में असाइनमेंट का स्तर (Tier) तय करते हैं।"
                : "This short check shows which skills your child has mastered and which likely have an earlier-class gap. With only a few questions per skill it is an early signal, not a measure of intelligence. Results set the assignment tier in the daily timetable."}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {isHi ? "प्रश्न प्रगति" : "Challenge Progress"}
            </span>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--accent-cyan)" }}>
              {currentIdx + 1} / {SAMPLE_CHALLENGES.length}
            </div>
          </div>
        </div>
      </div>

      {!isSubmitted ? (
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Question header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <span className="badge badge-cyan" style={{ marginRight: "0.5rem" }}>
                {currentChallenge.domain}
              </span>
              <span className="badge badge-amber">
                {currentChallenge.difficulty.toUpperCase()}
              </span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {isHi ? "आवश्यक पूर्व-ज्ञान: " : "Prerequisite: "}
              <strong style={{ color: "var(--text-secondary)" }}>{currentChallenge.prerequisiteGrade}</strong>
            </span>
          </div>

          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
              {isHi ? currentChallenge.title_hi : currentChallenge.title_en}
            </h3>
            <p style={{ fontSize: "0.98rem", lineHeight: 1.6, color: "#e2e8f0" }}>
              {isHi ? currentChallenge.question_hi : currentChallenge.question_en}
            </p>
          </div>

          {/* Options grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {(isHi ? currentChallenge.options_hi : currentChallenge.options_en).map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentIdx] === oIdx;
              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelectOption(oIdx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.85rem 1rem",
                    borderRadius: "0.5rem",
                    backgroundColor: isSelected ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                    border: isSelected ? "1.5px solid var(--accent-indigo)" : "1px solid var(--border-color)",
                    color: isSelected ? "#ffffff" : "var(--text-secondary)",
                    textAlign: "left",
                    transition: "all 0.15s ease"
                  }}
                >
                  <span style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    backgroundColor: isSelected ? "var(--accent-indigo)" : "rgba(255, 255, 255, 0.08)",
                    color: isSelected ? "#fff" : "var(--text-muted)"
                  }}>
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span style={{ fontSize: "0.92rem", flex: 1 }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Hint toggle */}
          <div>
            {!showHint[currentIdx] ? (
              <button
                type="button"
                onClick={() => setShowHint({ ...showHint, [currentIdx]: true })}
                style={{ fontSize: "0.82rem", color: "var(--accent-amber)", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
              >
                💡 {isHi ? "संकेत देखें (-5% स्कोर समायोजन)" : "Need a hint? (-5% velocity score)"}
              </button>
            ) : (
              <div style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: "rgba(245, 158, 11, 0.1)",
                border: "1px dashed rgba(245, 158, 11, 0.3)",
                fontSize: "0.85rem",
                color: "#fde68a"
              }}>
                <strong>{isHi ? "तार्किक संकेत: " : "Logic Hint: "}</strong>
                {isHi ? currentChallenge.hint_hi : currentChallenge.hint_en}
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={handlePrev}
              disabled={currentIdx === 0}
              style={{ opacity: currentIdx === 0 ? 0.4 : 1, cursor: currentIdx === 0 ? "not-allowed" : "pointer" }}
            >
              {isHi ? "← पिछला प्रश्न" : "← Previous"}
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={handleNext}
              disabled={selectedAnswers[currentIdx] === undefined}
              style={{
                opacity: selectedAnswers[currentIdx] === undefined ? 0.5 : 1,
                cursor: selectedAnswers[currentIdx] === undefined ? "not-allowed" : "pointer"
              }}
            >
              {currentIdx === SAMPLE_CHALLENGES.length - 1
                ? (isHi ? "मूल्यांकन पूर्ण करें ✓" : "Complete & Generate Profile ✓")
                : (isHi ? "अगला प्रश्न →" : "Next Challenge →")}
            </button>
          </div>
        </div>
      ) : (
        /* Result & per-skill mastery card */
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="card" style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)",
            border: "1px solid rgba(16, 185, 129, 0.3)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span className="badge badge-emerald">
                {isHi ? "मूल्यांकन पूर्ण" : "Diagnostic Completed"}
              </span>
              <span className="badge badge-cyan">
                {isHi ? "समय-सारणी अद्यतन" : "Timetable Calibrated"}
              </span>
            </div>

            <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              {isHi ? "कौशल-वार दक्षता रिपोर्ट" : "Mastery by Skill Report"}
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              margin: "1rem 0"
            }}>
              {scoreData.skillMastery.map((m) => (
                <div key={m.skillId} style={{ background: "rgba(255, 255, 255, 0.04)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {isHi ? m.skill_hi : m.skill_en}
                  </span>
                  <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--accent-cyan)", marginTop: "0.2rem" }}>
                    {isHi ? `${m.total} में से ${m.correct} सही` : `${m.correct} of ${m.total} correct`}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: m.likelyGapClass === null ? "var(--accent-emerald)" : "var(--accent-rose)" }}>
                    {m.likelyGapClass === null
                      ? (isHi ? "इस जांच में कोई कमी नहीं मिली" : "No gap found in this check")
                      : (isHi ? `संभावित कमी: कक्षा ${m.likelyGapClass}` : `Likely gap at Class ${m.likelyGapClass}`)}
                  </span>
                </div>
              ))}

              <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {isHi ? "सटीकता दर" : "Accuracy Score"}
                </span>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#f8fafc", marginTop: "0.2rem" }}>
                  {scoreData.correct} / {scoreData.total} ({scoreData.percentage}%)
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  {isHi ? "प्रमाणित प्रश्नों पर" : "On verified primary items"}
                </span>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {isHi ? "दैनिक असाइनमेंट स्तर" : "Calibrated Day Tier"}
                </span>
                <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--accent-amber)", marginTop: "0.2rem" }}>
                  {tierFor(scoreData.percentage)}
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  {isHi ? "कैलेंडर असाइनमेंट टियर" : "Assigned in Day Calendar"}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentIdx(0);
                  setSelectedAnswers({});
                  setShowHint({});
                }}
              >
                🔄 {isHi ? "पुनः परीक्षण लें" : "Retake Diagnostic"}
              </button>
            </div>
          </div>

          {/* Solutions breakdown */}
          <div className="card">
            <h4 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>
              {isHi ? "प्रश्नों का तार्किक विश्लेषण व समाधान" : "Item-by-Item Logical Breakdown"}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {SAMPLE_CHALLENGES.map((ch, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === ch.correctIndex;
                return (
                  <div key={idx} style={{
                    padding: "0.85rem",
                    borderRadius: "6px",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: `1px solid ${isCorrect ? "rgba(16, 185, 129, 0.3)" : "rgba(244, 63, 94, 0.3)"}`
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                        {idx + 1}. {isHi ? ch.title_hi : ch.title_en}
                      </span>
                      <span className={isCorrect ? "badge badge-emerald" : "badge badge-rose"}>
                        {isCorrect ? (isHi ? "सही ✓" : "Correct ✓") : (isHi ? "गलत ✗" : "Needs Review ✗")}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                      <strong>{isHi ? "समाधान: " : "Solution: "}</strong>
                      {isHi ? ch.solution_hi : ch.solution_en}
                    </p>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      {isHi ? "कौशल डोमेन: " : "Skill Domain: "}{ch.cognitiveSkill} | {isHi ? "प्राथमिक आधार: " : "Official Basis: "}{ch.prerequisiteGrade}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
