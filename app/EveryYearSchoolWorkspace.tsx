"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import MiddleSchoolDeepDive from "./components/MiddleSchoolDeepDive";
import GamificationHub, { Quest, BadgeItem } from "./components/GamificationHub";
import VentureThesisView from "./components/VentureThesisView";
import GoalAndUsageGuide from "./components/GoalAndUsageGuide";
import { useLanguage } from "./components/useLanguage";
import LanguageToggle from "./components/LanguageToggle";

type Localized = { en: string; hi: string };

interface Props {
  masterIndex: any;
  initialCurricula: Record<string, any>;
}

function playRewardSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16);
    osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.24);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  } catch {
    // Autoplay fallback
  }
}

function triggerHaptic(type: "light" | "medium" | "heavy" = "light") {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      if (type === "light") navigator.vibrate(12);
      else if (type === "medium") navigator.vibrate([15, 30, 20]);
      else navigator.vibrate([30, 50, 40]);
    } catch {
      // Ignored
    }
  }
}

const LEVELS = [
  { level: 1, title: "Novice Explorer", minXp: 0, nextXp: 300 },
  { level: 2, title: "Curious Learner", minXp: 300, nextXp: 700 },
  { level: 3, title: "Foundational Scholar", minXp: 700, nextXp: 1200 },
  { level: 4, title: "Mastery Seeker", minXp: 1200, nextXp: 1900 },
  { level: 5, title: "Olympiad Challenger", minXp: 1900, nextXp: 2800 },
  { level: 6, title: "Concept Artisan", minXp: 2800, nextXp: 4000 },
  { level: 7, title: "Cognitive Trailblazer", minXp: 4000, nextXp: 5500 },
  { level: 8, title: "Research Fellow", minXp: 5500, nextXp: 7200 },
  { level: 9, title: "Vedic Polymath", minXp: 7200, nextXp: 9000 },
  { level: 10, title: "Grandmaster Sage", minXp: 9000, nextXp: 15000 }
];

const INITIAL_QUESTS: Quest[] = [
  {
    id: "quest-lesson",
    title: "Daily Panchpadi Step",
    description: "Complete at least 1 Adhiti or Bodh active lesson phase",
    xpReward: 50,
    completed: false,
    progress: 0,
    target: 1
  },
  {
    id: "quest-challenge",
    title: "Cognitive Problem Solver",
    description: "Solve a Foundational or Standard tier challenge question",
    xpReward: 75,
    completed: false,
    progress: 0,
    target: 1
  },
  {
    id: "quest-exit",
    title: "Exit Ticket Mastery",
    description: "Score 100% on the end-of-lesson exit diagnostic check",
    xpReward: 100,
    completed: false,
    progress: 0,
    target: 1
  },
  {
    id: "quest-screen",
    title: "Mindful Digital Wellness",
    description: "Maintain focus time within IAP pediatric screen cap",
    xpReward: 40,
    completed: true,
    progress: 1,
    target: 1
  }
];

const INITIAL_BADGES: BadgeItem[] = [
  {
    id: "badge-first-step",
    name: "First Lesson Solved",
    icon: "🌱",
    description: "Completed your first NCF-SE 5-step learning loop",
    earned: true,
    unlockedAt: "Yesterday",
    category: "mastery"
  },
  {
    id: "badge-streak-7",
    name: "7-Day Flame",
    icon: "🔥",
    description: "Studied consecutively for 7 days without missing a session",
    earned: true,
    unlockedAt: "Today",
    category: "streak"
  },
  {
    id: "badge-math-whiz",
    name: "Ganita Explorer",
    icon: "📐",
    description: "Mastered Class 6 & 7 spatial geometry and fractions",
    earned: true,
    unlockedAt: "3 days ago",
    category: "mastery"
  },
  {
    id: "badge-olympiad",
    name: "Olympiad Contender",
    icon: "⚡",
    description: "Attempted a Tier-3 Olympiad challenge question with zero hints",
    earned: false,
    category: "olympiad"
  },
  {
    id: "badge-iap-guardian",
    name: "Screen Time Guard",
    icon: "🛡️",
    description: "Respected the 60-minute IAP pediatric health boundary for 5 days",
    earned: true,
    unlockedAt: "Today",
    category: "safety"
  },
  {
    id: "badge-mock-champion",
    name: "Exam Blueprint Master",
    icon: "🎯",
    description: "Completed a full simulated board examination blueprint",
    earned: false,
    category: "mastery"
  }
];

function TabTipBanner({
  icon,
  title,
  text,
  actionText,
  onAction
}: {
  icon: string;
  title: string;
  text: string;
  actionText?: string;
  onAction?: () => void;
}) {
  return (
    <div
      style={{
        background: "rgba(99, 102, 241, 0.08)",
        border: "1px solid rgba(99, 102, 241, 0.22)",
        borderRadius: "10px",
        padding: "0.65rem 0.95rem",
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.5rem"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.15rem" }}>{icon}</span>
        <div>
          <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#a5b4fc" }}>
            {title}:{" "}
          </span>
          <span style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>
            {text}
          </span>
        </div>
      </div>
      {actionText && onAction && (
        <button
          type="button"
          className="btn"
          onClick={onAction}
          style={{
            padding: "0.25rem 0.65rem",
            fontSize: "0.76rem",
            background: "rgba(99, 102, 241, 0.2)",
            borderColor: "rgba(99, 102, 241, 0.4)",
            color: "#ffffff"
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

const UI_TEXT = {
  en: {
    subtitle:
      "Prototype: a plan for every year of school, starting with CBSE Classes 6-8. Other boards, early years and exam tracks are included as data architecture.",
    tabs: {
      planner: "1. Year, Week & Day Planner (📅 Day Schedule)",
      diagnostic: "2. Adaptive Diagnostic (🔍 Find Gaps)",
      middleStage: "3. Middle Stage Deep Dive (📖 Grades 6-8)",
      lesson: "4. Daily Lesson Loop (✍️ 15-Min Step)",
      mocks: "5. Mock Exam Engine (📝 CBSE/JEE)",
      tracks: "6. Competitive & Global Tracks (🚀 Tracks)",
      evolution: "7. Self-Evolving Engine (L1-L5) (🔄 Auto-Update)",
      parent: "8. Parent View & Legal Risks (🛡️ Parent Safety)",
      venture: "9. Venture Thesis & 6 Q&A (💡 Goal & FAQ)",
      gamification: "10. Quests, Badges & XP Hub (🏆 Rewards)"
    },
    boardLabel: "Select Board / Framework",
    yearLabel: "Select Stage / Year (All 16 Stages)",
    dailyBudgetLabel: "Family Daily Study Budget (Minutes)",
    learnerLabel: "Active Synthetic Learner Profile"
  },
  hi: {
    subtitle:
      "प्रोटोटाइप: स्कूल के हर वर्ष की योजना, शुरुआत सीबीएसई कक्षा 6-8 से। अन्य बोर्ड, प्रारंभिक वर्ष और प्रतियोगी परीक्षा ट्रैक डेटा संरचना के रूप में शामिल हैं।",
    tabs: {
      planner: "1. वार्षिक, साप्ताहिक व दैनिक योजना (📅)",
      diagnostic: "2. अनुकूलित निदान (Diagnostic 🔍)",
      middleStage: "3. माध्यमिक चरण गहरा अध्ययन (📖 कक्षा 6-8)",
      lesson: "4. दैनिक पाठ चक्र (Lesson Loop ✍️)",
      mocks: "5. मॉक परीक्षा इंजन (📝)",
      tracks: "6. प्रतियोगी व विदेश ट्रैक (🚀)",
      evolution: "7. स्व-विकसित इंजन (L1-L5 🔄)",
      parent: "8. अभिभावक दृश्य व विधिक जोखिम (🛡️)",
      venture: "9. वेंचर रणनीति व 6 मुख्य प्रश्न (💡)",
      gamification: "10. दैनिक क्वेस्ट, बैज व एक्सपी हब (🏆)"
    },
    boardLabel: "बोर्ड / फ्रेमवर्क चुनें",
    yearLabel: "चरण / कक्षा चुनें (सभी 16 चरण)",
    dailyBudgetLabel: "दैनिक अध्ययन समय बजट (मिनट)",
    learnerLabel: "सक्रिय शिक्षार्थी प्रोफ़ाइल"
  }
};

export default function EveryYearSchoolWorkspace({ masterIndex, initialCurricula }: Props) {
  const [lang, setLang] = useLanguage();
  const [ventureBrand, setVentureBrand] = useState<string>(masterIndex.venture.ventureName || "EveryYear");
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    "planner" | "diagnostic" | "middleStage" | "lesson" | "mocks" | "tracks" | "evolution" | "parent" | "venture" | "gamification"
  >("planner");

  const [selectedLearnerId, setSelectedLearnerId] = useState<string>(
    masterIndex.learners[0]?.learnerId || "learner01aaravcbse07"
  );
  const [selectedBoard, setSelectedBoard] = useState<string>("cbse");
  const [selectedYear, setSelectedYear] = useState<string>("class-07");
  const [customDailyMinutes, setCustomDailyMinutes] = useState<number>(60);

  // Gamification state
  const [xp, setXp] = useState<number>(1420);
  const [streak] = useState<number>(7);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [xpToast, setXpToast] = useState<{ amount: number; reason: string } | null>(null);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [badges, setBadges] = useState<BadgeItem[]>(INITIAL_BADGES);

  const currentLevelInfo = useMemo(() => {
    return LEVELS.slice().reverse().find((l) => xp >= l.minXp) || LEVELS[0];
  }, [xp]);

  const awardXp = (amount: number, reason: string) => {
    setXp((prev) => prev + amount);
    setXpToast({ amount, reason });
    if (soundEnabled) {
      playRewardSound();
    }
    triggerHaptic("medium");
    setTimeout(() => {
      setXpToast(null);
    }, 2200);
  };

  const handleClaimQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId && !q.completed) {
          awardXp(q.xpReward, `Quest Claimed: ${q.title}`);
          return { ...q, completed: true };
        }
        return q;
      })
    );
  };

  // Diagnostic state
  const [diagAnswers, setDiagAnswers] = useState<Record<string, number>>({});
  const [diagSubmitted, setDiagSubmitted] = useState<boolean>(false);

  // Daily lesson state
  const [lessonStepIndex, setLessonStepIndex] = useState<number>(0);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [exitChoice, setExitChoice] = useState<number | null>(null);
  const [exitChecked, setExitChecked] = useState<boolean>(false);
  const [offlineSim, setOfflineSim] = useState<boolean>(false);

  // Mock exam state
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(
    masterIndex.assessmentBank.mockBlueprints[0]?.blueprintId || "mock-cbse-class-10-science-math"
  );
  const [mockAnswers, setMockAnswers] = useState<Record<string, number>>({});
  const [mockSubmitted, setMockSubmitted] = useState<boolean>(false);

  // Self-evolving simulation state
  const [simulatedCircularRun, setSimulatedCircularRun] = useState<boolean>(false);

  // Parent view state
  const [guardianConsentGranted, setGuardianConsentGranted] = useState<boolean>(true);
  const [parentScreenCap, setParentScreenCap] = useState<number>(60);
  const [exportedProfileJson, setExportedProfileJson] = useState<string>("");

  const t = UI_TEXT[lang];

  // Filter valid years for selected board
  const availableYearsForBoard = useMemo(() => {
    return masterIndex.curriculumIndex.filter((c: any) => c.boardId === selectedBoard);
  }, [masterIndex.curriculumIndex, selectedBoard]);

  // Ensure selectedYear is valid for selectedBoard
  const effectiveYear = useMemo(() => {
    if (availableYearsForBoard.some((c: any) => c.yearId === selectedYear)) {
      return selectedYear;
    }
    return availableYearsForBoard[0]?.yearId || "class-06";
  }, [availableYearsForBoard, selectedYear]);

  const activeCurriculum = useMemo(() => {
    const key = `${selectedBoard}:${effectiveYear}`;
    return (
      initialCurricula[key] ||
      initialCurricula["cbse:class-07"] ||
      Object.values(initialCurricula)[0]
    );
  }, [initialCurricula, selectedBoard, effectiveYear]);

  const sourceMap = useMemo(() => {
    const map: Record<string, any> = {};
    for (const s of masterIndex.sources) {
      map[s.sourceId] = s;
    }
    return map;
  }, [masterIndex.sources]);

  const skillMap = useMemo(() => {
    const map: Record<string, any> = {};
    for (const sk of masterIndex.skillGraph.skills) {
      map[sk.id] = sk;
    }
    return map;
  }, [masterIndex.skillGraph.skills]);

  const activeLearner = useMemo(() => {
    return (
      masterIndex.learners.find((l: any) => l.learnerId === selectedLearnerId) ||
      masterIndex.learners[0]
    );
  }, [masterIndex.learners, selectedLearnerId]);

  const handleSelectLearner = (learnerId: string) => {
    setSelectedLearnerId(learnerId);
    const found = masterIndex.learners.find((l: any) => l.learnerId === learnerId);
    if (found) {
      setSelectedBoard(found.education.boardId);
      setSelectedYear(found.education.currentYearId);
      setParentScreenCap(found.accessibility?.screenTimeCapMinutesPerDay ?? 60);
      setCustomDailyMinutes(Math.round((found.goals?.weeklyStudyMinutes || 360) / 6));
    }
  };

  // Diagnostic scoring
  const diagScoreSummary = useMemo(() => {
    const items = masterIndex.assessmentBank.diagnosticItems;
    let correct = 0;
    let answered = 0;
    const domainResults: Record<string, { correct: number; total: number }> = {};

    for (const item of items) {
      if (!domainResults[item.domainId]) {
        domainResults[item.domainId] = { correct: 0, total: 0 };
      }
      domainResults[item.domainId].total += 1;
      if (diagAnswers[item.itemId] !== undefined) {
        answered += 1;
        if (diagAnswers[item.itemId] === item.correctIndex) {
          correct += 1;
          domainResults[item.domainId].correct += 1;
        }
      }
    }

    const ratio = items.length > 0 ? correct / items.length : 0;
    let recommendedYear = "class-06";
    if (ratio >= 0.85) recommendedYear = "class-11";
    else if (ratio >= 0.7) recommendedYear = "class-09";
    else if (ratio >= 0.5) recommendedYear = "class-07";
    else if (ratio >= 0.3) recommendedYear = "class-04";
    else recommendedYear = "class-01";

    return { correct, answered, total: items.length, ratio, recommendedYear, domainResults };
  }, [masterIndex.assessmentBank.diagnosticItems, diagAnswers]);

  const activeMockBlueprint = useMemo(() => {
    return (
      masterIndex.assessmentBank.mockBlueprints.find(
        (b: any) => b.blueprintId === selectedBlueprintId
      ) || masterIndex.assessmentBank.mockBlueprints[0]
    );
  }, [masterIndex.assessmentBank.mockBlueprints, selectedBlueprintId]);

  const loc = (obj: Localized | undefined) => {
    if (!obj) return "";
    return obj[lang] || obj.en;
  };

  return (
    <div className="app-shell">
      <header className="top-header">
        <div className="header-row">
          <div>
            <span className="brand-badge">
              {ventureBrand} | {masterIndex.venture.productionDomain}
            </span>
            <h1 style={{ margin: "0.2rem 0 0.4rem 0", fontSize: "1.65rem" }}>
              {ventureBrand}: {lang === "en" ? "AI-First School & Skill Graph" : "एआई-प्रथम विद्यालय और कौशल ग्राफ"}
            </h1>
            <p style={{ margin: 0, color: "#e2e8f0", fontSize: "0.92rem", maxWidth: "880px" }}>
              {t.subtitle}
            </p>
          </div>
          <div className="header-controls">
            <select
              aria-label="Venture Brand Name"
              className="control-pill"
              value={ventureBrand}
              onChange={(e) => setVentureBrand(e.target.value)}
            >
              {masterIndex.venture.alternateVentureNames.map((v: any) => (
                <option key={v.name} value={v.name} style={{ color: "#0f172a" }}>
                  Brand: {v.name}
                </option>
              ))}
            </select>
            <Link
              href="/justification"
              className="control-pill"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: "rgba(99, 102, 241, 0.25)",
                borderColor: "rgba(129, 140, 248, 0.6)",
                color: "#e0e7ff"
              }}
            >
              <span>Venture Thesis &amp; 6 Q&amp;A</span>
            </Link>
            <button
              type="button"
              className={`control-pill ${showGuide ? "active" : ""}`}
              onClick={() => setShowGuide(!showGuide)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: showGuide ? "linear-gradient(135deg, #4f46e5, #06b6d4)" : "rgba(255, 255, 255, 0.08)",
                borderColor: showGuide ? "#6366f1" : "rgba(255, 255, 255, 0.16)",
                color: "#ffffff",
                fontWeight: 700
              }}
              title="Toggle Goal & Usage Guide"
            >
              <span>💡</span>
              <span>{showGuide ? (lang === "en" ? "Hide Guide" : "मार्गदर्शिका छिपाएं") : (lang === "en" ? "Goal & How To Use" : "लक्ष्य व उपयोग मार्गदर्शिका")}</span>
            </button>
            <LanguageToggle lang={lang} onChange={setLang} />
          </div>
        </div>

        <div className="kpi-strip">
          <div className="kpi-card">
            <div className="kpi-value">{masterIndex.summary.totalYearsCovered}/16</div>
            <div className="kpi-label">
              {lang === "en" ? "Stages (0-3 to Class 12)" : "शिक्षा चरण (0-3 से कक्षा 12)"}
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{masterIndex.summary.totalBoardYearPlans}</div>
            <div className="kpi-label">
              {lang === "en" ? "Board-Year Curriculum Plans" : "बोर्ड-वर्ष पाठ्यक्रम योजनाएं"}
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{masterIndex.summary.totalSkillsInGraph}</div>
            <div className="kpi-label">
              {lang === "en" ? "Shared DAG Skill Nodes" : "साझा कौशल ग्राफ नोड्स"}
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{masterIndex.summary.totalTracks}</div>
            <div className="kpi-label">
              {lang === "en" ? "Competitive & Abroad Tracks" : "प्रतियोगी व विदेश ट्रैक"}
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value">{masterIndex.summary.totalOfficialSources}</div>
            <div className="kpi-label">
              {lang === "en" ? "Verified Primary Sources" : "सत्यापित आधिकारिक स्रोत"}
            </div>
          </div>
        </div>
      </header>

      {/* Visual Platform Goal and Usage Guide */}
      <GoalAndUsageGuide
        lang={lang}
        brandName={ventureBrand}
        onSelectTab={(tabKey) => {
          setActiveTab(tabKey);
          triggerHaptic("light");
        }}
        isOpen={showGuide}
        onToggle={() => setShowGuide(!showGuide)}
      />

      {/* Floating Celebratory XP Toast */}
      {xpToast && (
        <div className="xp-toast" role="status" aria-live="polite">
          <span style={{ fontSize: "1.2rem" }}>⚡</span>
          <span>+{xpToast.amount} XP</span>
          <span style={{ opacity: 0.9, fontSize: "0.85rem", fontWeight: 600 }}>{xpToast.reason}</span>
        </div>
      )}

      {/* App-First Gamified Status Bar */}
      <div className="mobile-status-strip" aria-label="Learner Gamification and Screen Time Status">
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setActiveTab("gamification")}
            style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
            className="status-pill"
          >
            <span className="streak-flame">🔥</span>
            <span style={{ color: "#fbbf24" }}>{streak}d Streak</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gamification")}
            style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
            className="status-pill"
          >
            <span>⚡</span>
            <span style={{ color: "#818cf8" }}>{xp} XP</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gamification")}
            style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
            className="status-pill"
          >
            <span>🎖️</span>
            <span style={{ color: "#34d399" }}>
              Lvl {currentLevelInfo.level}: {currentLevelInfo.title}
            </span>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span className="status-pill" style={{ color: "var(--text-secondary)", fontSize: "0.78rem" }}>
            ⏱️ Focus: {customDailyMinutes}/{parentScreenCap}m Cap
          </span>
          <button
            type="button"
            className="control-pill"
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{ padding: "0.25rem 0.6rem", fontSize: "0.76rem" }}
            title="Toggle Reward Sound Effects"
          >
            {soundEnabled ? "🔊 FX On" : "🔇 FX Off"}
          </button>
        </div>
      </div>

      {/* Global Context Selector Bar */}
      <section className="card" aria-label="Global Learner and Stage Controls">
        <div className="grid-3">
          <div>
            <label htmlFor="learner-select" style={{ fontWeight: 700, fontSize: "0.84rem", display: "block", marginBottom: "0.3rem" }}>
              {t.learnerLabel}
            </label>
            <select
              id="learner-select"
              className="select-input"
              value={selectedLearnerId}
              onChange={(e) => handleSelectLearner(e.target.value)}
            >
              {masterIndex.learners.map((l: any) => (
                <option key={l.learnerId} value={l.learnerId}>
                  {l.identity.displayName} - {l.education.boardId.toUpperCase()} ({l.education.currentYearId})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="board-select" style={{ fontWeight: 700, fontSize: "0.84rem", display: "block", marginBottom: "0.3rem" }}>
              {t.boardLabel}
            </label>
            <select
              id="board-select"
              className="select-input"
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
            >
              <option value="cbse">CBSE (NCERT / NCF-SE 2023 Spine)</option>
              <option value="early-years">Early Years (MWCD Navchetana 0-3 & Aadharshila 3-6)</option>
              <option value="cisce">CISCE (ICSE Class 10 & ISC Class 12)</option>
              <option value="nios">NIOS (Open Basic Education, Secondary & Sr. Secondary)</option>
              <option value="state-boards">State Boards (MSBSHSE / TN-DGE / SCERT Equivalence)</option>
            </select>
          </div>
          <div>
            <label htmlFor="year-select" style={{ fontWeight: 700, fontSize: "0.84rem", display: "block", marginBottom: "0.3rem" }}>
              {t.yearLabel}
            </label>
            <select
              id="year-select"
              className="select-input"
              value={effectiveYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {availableYearsForBoard.map((c: any) => (
                <option key={c.yearId} value={c.yearId}>
                  {loc(c.yearLabel)} ({c.ageBandYears}) - {c.groundingStatus}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Main Navigation Tabs */}
      <nav className="nav-tabs" aria-label="Primary Workspace Modules">
        {(Object.keys(t.tabs) as Array<keyof typeof t.tabs>).map((tabKey) => (
          <button
            key={tabKey}
            type="button"
            className={`nav-tab ${activeTab === tabKey ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tabKey);
              triggerHaptic("light");
            }}
          >
            {t.tabs[tabKey]}
          </button>
        ))}
      </nav>

      {/* Smooth Animated Tab Content Container */}
      <div key={activeTab} className="tab-content-enter">
      {/* TAB 1: YEAR, WEEK & DAY PLANNER */}
      {activeTab === "planner" && activeCurriculum && (
        <div>
          <TabTipBanner
            icon="📅"
            title={lang === "en" ? "How to use this view" : "इस दृश्य का उपयोग कैसे करें"}
            text={
              lang === "en"
                ? "Review your child's 60-min daily schedule below. Adjust the study slider on the right to rebalance subjects automatically."
                : "नीचे 60 मिनट की दैनिक समय-सारणी देखें। दाईं ओर दिए गए स्लाइडर से दैनिक अध्ययन समय को अपनी आवश्यकता अनुसार बदलें।"
            }
            actionText={lang === "en" ? "Start Lesson →" : "पाठ शुरू करें →"}
            onAction={() => setActiveTab("lesson")}
          />
          <div className="card">
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.75rem", alignItems: "center" }}>
              <div>
                <span className="badge badge-blue">{activeCurriculum.curriculumVersionId}</span>
                <span className="badge badge-green">NEP Stage: {activeCurriculum.nepStage}</span>
                <span className="badge badge-warn">
                  Screen Cap: {activeCurriculum.screenTimePolicy.maxMinutesPerDay} min/day ({activeCurriculum.screenTimePolicy.deliveryMode})
                </span>
                <h2 style={{ margin: "0.4rem 0 0.2rem 0" }}>
                  {activeCurriculum.boardName} - {loc(activeCurriculum.yearLabel)} ({activeCurriculum.ageBandYears})
                </h2>
              </div>
              <div>
                <label htmlFor="daily-budget-input" style={{ fontSize: "0.82rem", fontWeight: 600, display: "block" }}>
                  {t.dailyBudgetLabel}: {customDailyMinutes} min/day
                </label>
                <input
                  id="daily-budget-input"
                  type="range"
                  min={15}
                  max={180}
                  step={5}
                  value={customDailyMinutes}
                  onChange={(e) => setCustomDailyMinutes(Number(e.target.value))}
                />
              </div>
            </div>

            {activeCurriculum.screenTimePolicy.maxMinutesPerDay === 0 && (
              <div
                style={{
                  background: "var(--accent-light)",
                  border: "1px solid var(--accent)",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  marginTop: "0.75rem"
                }}
              >
                <strong>IAP Pediatric Zero-Screen Protection Active (Ages 0-3):</strong> Under Indian Academy of Pediatrics guidelines (
                <a href="https://pubmed.ncbi.nlm.nih.gov/34969943/" target="_blank" rel="noreferrer">
                  SRC-IAP-SCREENTIME-2022
                </a>
                ) and MWCD Navchetana (
                <a href="https://spniwcd.wcd.gov.in/early-childhood-care-and-education/documents" target="_blank" rel="noreferrer">
                  SRC-MWCD-NAVCHETANA-2024
                </a>
                ), direct child screen exposure is locked to <strong>0 minutes/day</strong>. All sessions are delivered as offline caregiver play and audio stimulation briefs.
              </div>
            )}
          </div>

          {/* Subjects and Units */}
          <div className="card">
            <h3>
              {lang === "en"
                ? `Subjects, Official Textbooks & Competency Units (${activeCurriculum.subjects.length} Subjects)`
                : `विषय, आधिकारिक पाठ्यपुस्तकें और दक्षता इकाइयां (${activeCurriculum.subjects.length} विषय)`}
            </h3>
            <div className="grid-2">
              {activeCurriculum.subjects.map((subj: any) => (
                <div
                  key={subj.subjectId}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "0.85rem",
                    background: "var(--surface-muted)"
                  }}
                >
                  <div style={{ marginBottom: "0.35rem" }}>
                    <span className="badge badge-blue">{subj.compulsory ? "Compulsory" : "Elective/Stream"}</span>
                    {subj.officialCode && <span className="badge badge-green">Code: {subj.officialCode}</span>}
                    {subj.sourceIds.map((sid: string) => (
                      <a
                        key={sid}
                        href={sourceMap[sid]?.officialUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="badge badge-warn"
                      >
                        {sid}
                      </a>
                    ))}
                  </div>
                  <h4 style={{ margin: "0 0 0.35rem 0" }}>{loc(subj.name)}</h4>
                  {subj.textbooks && subj.textbooks.length > 0 && (
                    <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.84rem", color: "var(--text-muted)" }}>
                      <strong>Official Textbooks / Material:</strong> {subj.textbooks.join(", ")}
                    </p>
                  )}
                  {subj.units.map((u: any) => (
                    <div
                      key={u.unitId}
                      style={{
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        padding: "0.6rem",
                        marginBottom: "0.45rem"
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>
                        {loc(u.title)} ({u.notionalHours}h)
                      </div>
                      <ul style={{ margin: "0.3rem 0 0 1.1rem", padding: 0, fontSize: "0.83rem" }}>
                        {u.competencies.map((comp: string, idx: number) => (
                          <li key={idx}>{comp}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Term Plan & Weekly Plan */}
          <div className="grid-2">
            <div className="card">
              <h3>{lang === "en" ? "Term Plan (36 Academic Weeks)" : "सत्र योजना (36 शैक्षणिक सप्ताह)"}</h3>
              {activeCurriculum.termPlan.map((term: any) => (
                <div
                  key={term.termId}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "0.75rem",
                    marginBottom: "0.6rem"
                  }}
                >
                  <strong>
                    {loc(term.title)} ({term.weeks} Weeks)
                  </strong>
                  <p style={{ margin: "0.3rem 0", fontSize: "0.85rem" }}>
                    <strong>Milestone:</strong> {term.milestoneAssessment}
                  </p>
                  <div>
                    {term.focusSkills.map((skId: string) => (
                      <span key={skId} className="badge badge-blue">
                        {loc(skillMap[skId]?.name) || skId}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <h4 style={{ marginTop: "1rem" }}>
                {lang === "en" ? "Co-Curricular & Extracurricular Peer Pods" : "सह-पाठयक्रम और पीयर-पॉड गतिविधियां"}
              </h4>
              {activeCurriculum.coCurricularPlan.map((cc: any) => (
                <div key={cc.activityId} style={{ fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                  <span className="badge badge-green">{cc.weeklyMinutes} min/wk</span>
                  <strong>{loc(cc.title)}:</strong> {cc.description}
                </div>
              ))}
              {activeCurriculum.extracurricularPlan.map((ec: any) => (
                <div key={ec.clubId} style={{ fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                  <span className="badge badge-blue">{ec.frequency}</span>
                  <strong>{loc(ec.title)}:</strong> {ec.peerPodMode}
                </div>
              ))}
            </div>

            <div className="card">
              <h3>
                {lang === "en"
                  ? `Weekly Schedule (${activeCurriculum.weeklyPlanTemplate.studyDaysPerWeek} Days/Wk, ${activeCurriculum.weeklyPlanTemplate.bufferPercent}% Rebalance Buffer)`
                  : `साप्ताहिक समय-सारणी (${activeCurriculum.weeklyPlanTemplate.studyDaysPerWeek} दिन/सप्ताह, ${activeCurriculum.weeklyPlanTemplate.bufferPercent}% बफर)`}
              </h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Session Blocks & Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeCurriculum.weeklyPlanTemplate.dailySchedule.map((day: any) => (
                      <tr key={day.dayOfWeek}>
                        <td>
                          <strong>{day.dayOfWeek}</strong>
                        </td>
                        <td>
                          {day.blocks.map((b: any, i: number) => (
                            <div key={i} style={{ marginBottom: "0.25rem" }}>
                              <span className="badge badge-blue">{b.minutes}m</span>
                              <strong>{b.subjectId}</strong> ({b.mode})
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Assessments & Track Bridges & Known Gaps */}
          <div className="grid-2">
            <div className="card">
              <h3>{lang === "en" ? "Assessment Architecture (Unit, Internal, Term & Board Mock)" : "मूल्यांकन संरचना"}</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Frequency & Format</th>
                      <th>Scale & Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(["unitTests", "internals", "termExams", "boardStyleMocks"] as const).map((k) => {
                      const spec = activeCurriculum.assessments[k];
                      return (
                        <tr key={k}>
                          <td>
                            <strong>{k}</strong>
                          </td>
                          <td>
                            {spec.frequency} - {spec.format}
                          </td>
                          <td>
                            <span className="badge badge-green">{spec.marksOrScale}</span>
                            <span className="badge badge-blue">{spec.patternStatus}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>{lang === "en" ? "Primary Sources & Explicitly Labelled Gaps" : "आधिकारिक स्रोत और चिह्नित अंतराल (Gaps)"}</h3>
              <div style={{ marginBottom: "0.75rem" }}>
                <strong>Verified Official Sources Cited:</strong>
                <ul style={{ margin: "0.35rem 0 0 1.1rem", padding: 0, fontSize: "0.85rem" }}>
                  {activeCurriculum.sourceIds.map((sid: string) => {
                    const src = sourceMap[sid];
                    return (
                      <li key={sid}>
                        <a href={src?.officialUrl} target="_blank" rel="noreferrer">
                          {sid}: {src?.title}
                        </a>{" "}
                        ({src?.authority})
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <strong>Explicitly Labelled Gaps (Zero Unverified Invention Policy):</strong>
                {activeCurriculum.knownGaps.length === 0 ? (
                  <p style={{ fontSize: "0.85rem", color: "var(--accent)", margin: "0.3rem 0" }}>
                    Deepened grade band - all core units and NCERT NCF-SE 2023 textbooks mapped.
                  </p>
                ) : (
                  activeCurriculum.knownGaps.map((g: any) => (
                    <div
                      key={g.gapId}
                      style={{
                        background: "var(--warn-light)",
                        border: "1px solid var(--warn)",
                        borderRadius: "8px",
                        padding: "0.55rem",
                        marginTop: "0.4rem",
                        fontSize: "0.84rem"
                      }}
                    >
                      <span className="badge badge-warn">{g.targetPhase}</span>
                      <strong>{g.area}:</strong> {g.description}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADAPTIVE DIAGNOSTIC PLACEMENT ENGINE */}
      {activeTab === "diagnostic" && (
        <div className="card">
          <TabTipBanner
            icon="🔍"
            title={lang === "en" ? "How to use this view" : "इस दृश्य का उपयोग कैसे करें"}
            text={
              lang === "en"
                ? "Answer the diagnostic questions below. The engine detects previous-grade prerequisite gaps (e.g. Class 6 integers before Class 7 algebra) and recalibrates the plan."
                : "नीचे दिए गए प्रश्नों के उत्तर दें। इंजन पिछली कक्षा की कमियों को पहचानता है और सीखने की योजना को स्वतः समायोजित करता है।"
            }
          />
          <h2>
            {lang === "en"
              ? "Per-Domain Adaptive Skill Diagnostic & Year Placement Engine"
              : "डोमेन-आधारित अनुकूलित कौशल निदान और स्तर निर्धारण इंजन"}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {lang === "en"
              ? "Unlike grade-only placement tests, this diagnostic probes across Foundational Numeracy, Middle/Secondary Mathematics, Integrated Science, and Academic Rhetoric on the shared skill graph."
              : "यह निदान साझा कौशल ग्राफ पर बुनियादी संख्या ज्ञान, बीजगणित/कलन, विज्ञान और भाषा कौशल की जांच करके सटीक वार्षिक योजना तैयार करता है।"}
          </p>

          <div className="grid-2">
            <div>
              {masterIndex.assessmentBank.diagnosticItems.map((item: any, idx: number) => (
                <div
                  key={item.itemId}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "0.85rem",
                    marginBottom: "0.75rem"
                  }}
                >
                  <div style={{ marginBottom: "0.35rem" }}>
                    <span className="badge badge-blue">
                      Q{idx + 1} - Target: {item.targetYearId.toUpperCase()}
                    </span>
                    <span className="badge badge-green">{item.domainId}</span>
                    <span className="badge badge-warn">{item.difficulty}</span>
                  </div>
                  <p style={{ fontWeight: 600, margin: "0.3rem 0 0.6rem 0" }}>{loc(item.prompt)}</p>
                  {item.options.map((opt: Localized, optIdx: number) => {
                    const selected = diagAnswers[item.itemId] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        className={`option-btn ${selected ? "selected" : ""}`}
                        onClick={() =>
                          setDiagAnswers((prev) => ({
                            ...prev,
                            [item.itemId]: optIdx
                          }))
                        }
                      >
                        {String.fromCharCode(65 + optIdx)}. {loc(opt)}
                      </button>
                    );
                  })}
                  {diagSubmitted && (
                    <div
                      style={{
                        marginTop: "0.5rem",
                        padding: "0.5rem",
                        borderRadius: "6px",
                        background:
                          diagAnswers[item.itemId] === item.correctIndex
                            ? "var(--accent-light)"
                            : "var(--warn-light)",
                        fontSize: "0.84rem"
                      }}
                    >
                      <strong>
                        {diagAnswers[item.itemId] === item.correctIndex ? "Correct!" : "Review Prerequisite:"}
                      </strong>{" "}
                      {loc(item.explanation)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <div
                style={{
                  position: "sticky",
                  top: "1rem",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "1rem",
                  background: "var(--surface-muted)"
                }}
              >
                <h3>Diagnostic Placement Summary</h3>
                <p style={{ fontSize: "0.9rem" }}>
                  Answered: <strong>{diagScoreSummary.answered}</strong> / {diagScoreSummary.total} items
                </p>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setDiagSubmitted(true);
                      awardXp(100, "Diagnostic Placement Computed! 🧠");
                    }}
                  >
                    Compute Skill Placement
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      const auto: Record<string, number> = {};
                      for (const item of masterIndex.assessmentBank.diagnosticItems) {
                        auto[item.itemId] = item.correctIndex;
                      }
                      setDiagAnswers(auto);
                      setDiagSubmitted(true);
                      awardXp(100, "Diagnostic Placement Computed! 🧠");
                    }}
                  >
                    Demo Fill All Correct
                  </button>
                </div>

                {diagSubmitted && (
                  <div
                    style={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "0.85rem"
                    }}
                  >
                    <div className="badge badge-green">Placement Verified</div>
                    <h4 style={{ margin: "0.4rem 0" }}>
                      Score: {diagScoreSummary.correct} / {diagScoreSummary.total} (
                      {Math.round(diagScoreSummary.ratio * 100)}%)
                    </h4>
                    <p style={{ fontSize: "0.88rem" }}>
                      Recommended Baseline Plan: <strong>{diagScoreSummary.recommendedYear.toUpperCase()}</strong>
                    </p>
                    <button
                      type="button"
                      className="btn btn-accent"
                      onClick={() => {
                        setSelectedYear(diagScoreSummary.recommendedYear);
                        setActiveTab("planner");
                      }}
                    >
                      Load {diagScoreSummary.recommendedYear.toUpperCase()} Individual Year Plan
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: MIDDLE STAGE DEEP DIVE (CLASSES 6-8) */}
      {activeTab === "middleStage" && (
        <div>
          <TabTipBanner
            icon="📖"
            title={lang === "en" ? "How to use this view" : "इस दृश्य का उपयोग कैसे करें"}
            text={
              lang === "en"
                ? "Explore new NCERT textbooks (Ganita Prakash, Curiosity, Poorvi) and solve 3-tier challenge problems to earn bonus XP."
                : "नई एनसीईआरटी पाठ्यपुस्तकों (गणित प्रकाश, जिज्ञासा) का अध्ययन करें और बोनस XP जीतने के लिए स्तर-वार प्रश्नों को हल करें।"
            }
          />
          <MiddleSchoolDeepDive
            deepeningData={masterIndex.middleStageDeepening}
            lang={lang}
            onAwardXp={(amt, reason) => {
              awardXp(amt, reason);
              setQuests((prev) =>
                prev.map((q) => (q.id === "quest-challenge" ? { ...q, progress: 1, completed: true } : q))
              );
            }}
          />
        </div>
      )}

      {/* TAB: DAILY LESSON LOOP */}
      {activeTab === "lesson" && activeCurriculum && (
        <div className="card">
          <TabTipBanner
            icon="✍️"
            title={lang === "en" ? "How to use this view" : "इस दृश्य का उपयोग कैसे करें"}
            text={
              lang === "en"
                ? "Work through the 5 phases: 1. Introduction ➔ 2. Concept ➔ 3. Practice ➔ 4. Real-world Application ➔ 5. Exit Quiz. Need help? Click 'Reveal Hint'."
                : "5 चरणों में सीखें: 1. परिचय ➔ 2. अवधारणा ➔ 3. अभ्यास ➔ 4. वास्तविक अनुप्रयोग ➔ 5. क्विज़। कठिनाई होने पर 'संकेत देखें' पर क्लिक करें।"
            }
          />
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
            <div>
              <span className="badge badge-blue">
                {activeCurriculum.boardName} - {loc(activeCurriculum.yearLabel)}
              </span>
              <span className="badge badge-green">
                Time-Boxed: {activeCurriculum.dailyLessonTemplate.sessionMinutes} Minutes
              </span>
              <h2 style={{ margin: "0.3rem 0" }}>
                {lang === "en" ? "4-Step Daily Lesson Loop (Sourced + Offline Fallback)" : "4-चरणीय दैनिक पाठ चक्र"}
              </h2>
            </div>
            <button
              type="button"
              className={`btn ${offlineSim ? "btn-accent" : ""}`}
              onClick={() => setOfflineSim(!offlineSim)}
            >
              {offlineSim ? "Offline Pack Mode: ON (Deterministic)" : "Simulate Offline / Low-Bandwidth Mode"}
            </button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0" }}>
            {activeCurriculum.dailyLessonTemplate.steps.map((st: any, idx: number) => (
              <button
                key={st.stepId}
                type="button"
                className={`btn ${lessonStepIndex === idx ? "btn-primary" : ""}`}
                onClick={() => {
                  setLessonStepIndex(idx);
                  awardXp(15, `Panchpadi Step ${idx + 1} Active! 📘`);
                  setQuests((prev) =>
                    prev.map((q) => (q.id === "quest-lesson" ? { ...q, progress: 1, completed: true } : q))
                  );
                }}
              >
                {loc(st.title)} ({st.minutes}m)
              </button>
            ))}
          </div>

          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "1rem",
              background: "var(--surface-muted)"
            }}
          >
            <h3>
              {loc(activeCurriculum.dailyLessonTemplate.steps[lessonStepIndex]?.title)}
            </h3>
            <p>{activeCurriculum.dailyLessonTemplate.steps[lessonStepIndex]?.description}</p>

            <div
              style={{
                background: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "0.85rem",
                marginTop: "0.75rem"
              }}
            >
              <h4>
                Active Unit: {loc(activeCurriculum.subjects[0]?.units[0]?.title)} (
                {loc(activeCurriculum.subjects[0]?.name)})
              </h4>
              <p style={{ fontSize: "0.88rem" }}>
                <strong>Grounded Competencies:</strong>{" "}
                {activeCurriculum.subjects[0]?.units[0]?.competencies.join(" | ")}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <strong>Verified Source IDs:</strong> {activeCurriculum.subjects[0]?.sourceIds.join(", ")}
              </p>

              {/* 3-Step Deterministic Hint Ladder */}
              <div style={{ marginTop: "0.85rem" }}>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setHintLevel((prev) => (prev + 1) % 4)}
                >
                  {lang === "en"
                    ? `Reveal Guided Hint Ladder (${hintLevel}/3)`
                    : `संकेत सीढ़ी देखें (${hintLevel}/3)`}
                </button>
                {hintLevel >= 1 && (
                  <p style={{ fontSize: "0.86rem", marginTop: "0.45rem" }}>
                    <strong>Hint 1 (Prerequisite Recall):</strong> Identify the base unit or number line anchor from the previous skill node before computing.
                  </p>
                )}
                {hintLevel >= 2 && (
                  <p style={{ fontSize: "0.86rem", marginTop: "0.35rem" }}>
                    <strong>Hint 2 (Worked Representation):</strong> Break the expression into two smaller steps and check sign/unit consistency.
                  </p>
                )}
                {hintLevel >= 3 && (
                  <p style={{ fontSize: "0.86rem", marginTop: "0.35rem" }}>
                    <strong>Hint 3 (Full Sourced Step):</strong> Apply the textbook rule from{" "}
                    {activeCurriculum.subjects[0]?.textbooks?.[0] || "official NCERT module"} and verify with the exit check below.
                  </p>
                )}
              </div>

              {/* Mastery Exit Check */}
              <div style={{ marginTop: "1rem", borderTop: "1px solid var(--border)", paddingTop: "0.85rem" }}>
                <h4>Mastery Exit Ticket (Emits Append-Only Mastery Evidence Event)</h4>
                <p style={{ fontSize: "0.88rem" }}>
                  {lang === "en"
                    ? "Which statement best verifies mastery of this unit's primary competency?"
                    : "कौन-सा विकल्प इस इकाई की मुख्य दक्षता को सत्यापित करता है?"}
                </p>
                {[
                  activeCurriculum.subjects[0]?.units[0]?.competencies[0] || "Demonstrates core competency",
                  "Skips prerequisite verification and memorizes answers without units",
                  "Relies on unverified syllabus topics outside the pinned version"
                ].map((choiceText, cIdx) => (
                  <button
                    key={cIdx}
                    type="button"
                    className={`option-btn ${exitChoice === cIdx ? "selected" : ""}`}
                    onClick={() => {
                      setExitChoice(cIdx);
                      setExitChecked(true);
                      if (cIdx === 0) {
                        awardXp(50, "Exit Ticket 100% Mastered! 🎯");
                        setQuests((prev) =>
                          prev.map((q) => (q.id === "quest-exit" ? { ...q, progress: 1, completed: true } : q))
                        );
                      }
                    }}
                  >
                    {String.fromCharCode(65 + cIdx)}. {choiceText}
                  </button>
                ))}
                {exitChecked && (
                  <div
                    style={{
                      padding: "0.6rem",
                      borderRadius: "8px",
                      background: exitChoice === 0 ? "var(--accent-light)" : "var(--warn-light)",
                      fontSize: "0.85rem"
                    }}
                  >
                    {exitChoice === 0
                      ? "Correct! In the full product this answer would be saved as mastery evidence and update the weekly plan. (Demo: nothing is saved.)"
                      : "Not quite - select Option A (the official sourced competency for this unit)."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MOCK EXAM ENGINE */}
      {activeTab === "mocks" && (
        <div className="card">
          <TabTipBanner
            icon="📝"
            title={lang === "en" ? "How to use this view" : "इस दृश्य का उपयोग कैसे करें"}
            text={
              lang === "en"
                ? "Pick an official board or entrance blueprint (CBSE Class 10/12, JEE Main, NEET). Solve questions under real timed conditions and view your mastery analytics."
                : "आधिकारिक परीक्षा ब्लूप्रिंट (सीबीएसई कक्षा 10/12, जेईई मेन, नीट) चुनें। वास्तविक समय सीमा में प्रश्न हल करें और तुरंत विश्लेषण देखें।"
            }
          />
          <h2>
            {lang === "en"
              ? "Official-Blueprint Mock Exam Engine (Board, JEE, NEET, CUET, UPSC, SAT/IELTS/TOEFL)"
              : "आधिकारिक ब्लूप्रिंट मॉक परीक्षा इंजन"}
          </h2>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="mock-blueprint-select" style={{ fontWeight: 700, fontSize: "0.85rem", display: "block", marginBottom: "0.3rem" }}>
              Select Sourced Exam Blueprint:
            </label>
            <select
              id="mock-blueprint-select"
              className="select-input"
              value={selectedBlueprintId}
              onChange={(e) => {
                setSelectedBlueprintId(e.target.value);
                setMockSubmitted(false);
              }}
            >
              {masterIndex.assessmentBank.mockBlueprints.map((bp: any) => (
                <option key={bp.blueprintId} value={bp.blueprintId}>
                  {loc(bp.title)} - {bp.totalMarksOrScale} ({bp.durationMinutes} min)
                </option>
              ))}
            </select>
          </div>

          {activeMockBlueprint && (
            <div className="grid-2">
              <div>
                <span className="badge badge-green">{activeMockBlueprint.patternStatus}</span>
                <span className="badge badge-blue">{activeMockBlueprint.durationMinutes} Minutes</span>
                {activeMockBlueprint.sourceIds.map((sid: string) => (
                  <a
                    key={sid}
                    href={sourceMap[sid]?.officialUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="badge badge-warn"
                  >
                    {sid}
                  </a>
                ))}
                <h3 style={{ marginTop: "0.4rem" }}>{loc(activeMockBlueprint.title)}</h3>
                <p style={{ fontSize: "0.88rem" }}>
                  <strong>Scale & Marking:</strong> {activeMockBlueprint.totalMarksOrScale}
                </p>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Questions</th>
                        <th>Marks / Scale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeMockBlueprint.sections.map((sec: any) => (
                        <tr key={sec.sectionId}>
                          <td>{sec.name}</td>
                          <td>{sec.questionCount}</td>
                          <td>{sec.marksNote}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4>Interactive Timed Sample Section (Deterministic Scoring, Zero LLM in Attempt Path)</h4>
                {activeMockBlueprint.sampleItems.map((item: any, idx: number) => (
                  <div
                    key={item.itemId}
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "0.75rem",
                      marginBottom: "0.65rem"
                    }}
                  >
                    <p style={{ fontWeight: 600, margin: "0 0 0.5rem 0" }}>
                      Q{idx + 1}. {loc(item.prompt)}
                    </p>
                    {item.options.map((opt: Localized, oIdx: number) => (
                      <button
                        key={oIdx}
                        type="button"
                        className={`option-btn ${mockAnswers[item.itemId] === oIdx ? "selected" : ""}`}
                        onClick={() =>
                          setMockAnswers((prev) => ({
                            ...prev,
                            [item.itemId]: oIdx
                          }))
                        }
                      >
                        {String.fromCharCode(65 + oIdx)}. {loc(opt)}
                      </button>
                    ))}
                    {mockSubmitted && (
                      <div
                        style={{
                          padding: "0.5rem",
                          borderRadius: "6px",
                          background:
                            mockAnswers[item.itemId] === item.correctIndex
                              ? "var(--accent-light)"
                              : "var(--warn-light)",
                          fontSize: "0.83rem"
                        }}
                      >
                        <strong>
                          {mockAnswers[item.itemId] === item.correctIndex ? "Correct (+Marks):" : "Solution:"}
                        </strong>{" "}
                        {loc(item.explanation)}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setMockSubmitted(true)}
                >
                  Submit Mock Attempt & Score Deterministically
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: COMPETITIVE & STUDY-ABROAD TRACKS */}
      {activeTab === "tracks" && (
        <div>
          <TabTipBanner
            icon="🚀"
            title={lang === "en" ? "How to use this view" : "इस दृश्य का उपयोग कैसे करें"}
            text={
              lang === "en"
                ? "See how school subjects branch seamlessly into JEE, NEET, CUET, and SAT without duplicate study hours."
                : "देखें कि कैसे स्कूल के विषय सीधे जेईई, नीट, सीयूईटी और सैट से जुड़ते हैं। आपको स्कूल और कोचिंग में एक ही पाठ दो बार नहीं पढ़ना पड़ेगा।"
            }
          />
          <div className="card">
            <h2>
              {lang === "en"
                ? "Phase 4 Track Branches Off the Shared Skill Graph (Starting Class 8-9)"
                : "साझा कौशल ग्राफ से जुड़ी प्रतियोगी और विदेश अध्ययन शाखाएं (कक्षा 8-9 से)"}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Every competitive Indian track (JEE, NEET, CUET, UPSC) and study-abroad exam (Digital SAT, ACT, IELTS, TOEFL) is modeled as a branch off the exact same school skill graph so students never duplicate topics already mastered in school.
            </p>
          </div>
          <div className="grid-2">
            {masterIndex.tracks.map((tr: any) => (
              <div key={tr.trackId} className="card">
                <span className="badge badge-blue">{tr.category}</span>
                <span className="badge badge-green">Bridge Starts: {tr.startingYearId.toUpperCase()}</span>
                {tr.sourceIds.map((sid: string) => (
                  <a
                    key={sid}
                    href={sourceMap[sid]?.officialUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="badge badge-warn"
                  >
                    {sid}
                  </a>
                ))}
                <h3 style={{ margin: "0.4rem 0" }}>{loc(tr.title)}</h3>
                <p style={{ fontSize: "0.85rem", margin: "0.25rem 0" }}>
                  <strong>Conducting Body:</strong> {tr.conductingBody}
                </p>
                <p style={{ fontSize: "0.85rem", margin: "0.25rem 0" }}>
                  <strong>Official Pattern:</strong> {tr.examPattern.mode} - {tr.examPattern.totalMarks}
                </p>
                <div style={{ margin: "0.5rem 0" }}>
                  <strong style={{ fontSize: "0.83rem" }}>School Prerequisite Nodes:</strong>{" "}
                  {tr.prerequisiteSkillIds.map((sk: string) => (
                    <span key={sk} className="badge badge-blue">
                      {sk}
                    </span>
                  ))}
                </div>
                {tr.domains.map((dom: any, dIdx: number) => (
                  <div
                    key={dIdx}
                    style={{
                      background: "var(--surface-muted)",
                      borderRadius: "8px",
                      padding: "0.55rem",
                      marginTop: "0.4rem",
                      fontSize: "0.83rem"
                    }}
                  >
                    <strong>{dom.name}:</strong> {dom.topics.join(" | ")}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SELF-EVOLVING ENGINE (L1-L5) & GOVERNANCE */}
      {activeTab === "evolution" && (
        <div>
          <TabTipBanner
            icon="🔄"
            title={lang === "en" ? "How to use this view" : "इस दृश्य का उपयोग कैसे करें"}
            text={
              lang === "en"
                ? "Click 'Simulate Official Board Circular Diff' to see how the AI automatically catches government circulars and updates question banks safely."
                : "'Simulate Official Board Circular Diff' पर क्लिक करके देखें कि कैसे एआई सरकारी आदेश पकड़कर प्रश्न बैंक को सुरक्षित रूप से अपडेट करता है।"
            }
          />
          <div className="card">
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.75rem" }}>
              <div>
                <span className="badge badge-green">5-Speed Governance Architecture</span>{" "}
                <span className="badge badge-danger">
                  {lang === "en" ? "Demo data: illustrative events, engine not built yet" : "डेमो डेटा: उदाहरण घटनाएं, इंजन अभी बना नहीं"}
                </span>
                <h2 style={{ margin: "0.3rem 0" }}>
                  {lang === "en"
                    ? "Self-Evolving AI Curriculum Engine (Minute-by-Minute L1/L2 + Cohort-Gated L3/L4/L5)"
                    : "स्व-विकसित एआई पाठ्यक्रम इंजन (L1 से L5 सुरक्षा गेट्स के साथ)"}
                </h2>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setSimulatedCircularRun(true)}
              >
                Simulate Official Board Circular Diff & Coherence Gate
              </button>
            </div>
            {simulatedCircularRun && (
              <div
                style={{
                  background: "var(--accent-light)",
                  border: "1px solid var(--accent)",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  marginTop: "0.75rem",
                  fontSize: "0.86rem"
                }}
              >
                <strong>Simulation Executed:</strong> L3 detected circular diff on{" "}
                <code>SRC-CBSE-CURR-2026-27</code> -&gt; L4 verified 0 DAG cycles, 0 orphaned prerequisites, NCrF 1,200h annual load compliance, and NCERT 5-point rationalisation check -&gt; Drafted Cohort Change Proposal <code>CP-2026-10-03</code> pinned to <code>2027-batch</code> without disrupting active <code>2026-batch</code> plans.
              </div>
            )}
          </div>

          <div className="grid-2">
            {masterIndex.evolutionState.layers.map((layer: any) => (
              <div key={layer.layerId} className="card">
                <span className="badge badge-blue">{layer.layerId}</span>
                <span className="badge badge-green">{layer.cadence}</span>
                <h3 style={{ margin: "0.4rem 0" }}>{loc(layer.name)}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <strong>Safety Gate:</strong> {layer.gateType}
                </p>
                {layer.recentEvents &&
                  layer.recentEvents.map((ev: any, i: number) => (
                    <div
                      key={i}
                      style={{
                        background: "var(--surface-muted)",
                        padding: "0.6rem",
                        borderRadius: "8px",
                        fontSize: "0.84rem"
                      }}
                    >
                      <div>
                        <strong>{ev.timestamp}:</strong> {ev.event}
                      </div>
                      <div style={{ color: "var(--accent)", marginTop: "0.25rem" }}>
                        <strong>Action:</strong> {ev.actionTaken}
                      </div>
                    </div>
                  ))}
                {layer.monitoredSources && (
                  <div className="table-wrap" style={{ marginTop: "0.5rem" }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Source ID</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {layer.monitoredSources.map((ms: any) => (
                          <tr key={ms.sourceId}>
                            <td>
                              <a href={ms.url} target="_blank" rel="noreferrer">
                                {ms.sourceId}
                              </a>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  ms.status === "SYNCED" ? "badge-green" : "badge-warn"
                                }`}
                              >
                                {ms.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {layer.changeProposals &&
                  layer.changeProposals.map((cp: any) => (
                    <div
                      key={cp.proposalId}
                      style={{
                        background: "var(--surface-muted)",
                        padding: "0.6rem",
                        borderRadius: "8px",
                        marginTop: "0.45rem",
                        fontSize: "0.84rem"
                      }}
                    >
                      <span className="badge badge-green">{cp.status}</span>
                      <strong>
                        {cp.proposalId}: {cp.title}
                      </strong>
                      <div>Checks Passed: {cp.checksPassed.join(", ")}</div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: PARENT VIEW & LEGAL / RISK REGISTER */}
      {activeTab === "parent" && activeCurriculum && (
        <div>
          <TabTipBanner
            icon="🛡️"
            title={lang === "en" ? "How to use this view" : "इस दृश्य का उपयोग कैसे करें"}
            text={
              lang === "en"
                ? "Parents have complete control: check daily screen minutes against medical guidelines (IAP), manage privacy consent (DPDP Act), and export profile data."
                : "माता-पिता को पूर्ण नियंत्रण: डॉक्टरों द्वारा तय स्क्रीन समय सीमा देखें, गोपनीयता सहमति प्रबंधित करें और 1-क्लिक में रिपोर्ट डाउनलोड करें।"
            }
          />
          <div className="grid-2">
          <div className="card">
            <span className="badge badge-green">{activeCurriculum.parentViewPlan.cadence}</span>
            <h2>
              {lang === "en"
                ? `Parent & Guardian Governance View (${activeLearner.identity.displayName})`
                : `अभिभावक नियंत्रण और साप्ताहिक सारांश (${activeLearner.identity.displayName})`}
            </h2>
            <div style={{ marginBottom: "0.85rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={guardianConsentGranted}
                  onChange={(e) => setGuardianConsentGranted(e.target.checked)}
                />
                Guardian consent (demo toggle, DPDP Act 2023 Section 9)
              </label>
              <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", margin: "0.25rem 0" }}>
                Design target: verifiable guardian consent before any data is stored, no targeted advertising, birth stored as YYYY-MM only ({activeLearner.identity.dateOfBirth}), data kept in India. This prototype stores nothing.
              </p>
            </div>

            <div style={{ marginBottom: "0.85rem" }}>
              <label htmlFor="parent-screen-cap" style={{ fontWeight: 600, fontSize: "0.86rem", display: "block" }}>
                Guardian Daily Screen-Time Hard Cap: {parentScreenCap} min/day (Stage Policy Max:{" "}
                {activeCurriculum.screenTimePolicy.maxMinutesPerDay} min/day)
              </label>
              <input
                id="parent-screen-cap"
                type="range"
                min={0}
                max={180}
                step={5}
                value={parentScreenCap}
                onChange={(e) => setParentScreenCap(Number(e.target.value))}
              />
            </div>

            <h4>Concrete Family Actions This Week</h4>
            <ul>
              {activeCurriculum.parentViewPlan.homeActions.map((act: Localized, i: number) => (
                <li key={i} style={{ marginBottom: "0.35rem", fontSize: "0.88rem" }}>
                  {loc(act)}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.85rem" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setExportedProfileJson(JSON.stringify(activeLearner, null, 2))}
              >
                Export Learner Data (DPDP JSON)
              </button>
              {exportedProfileJson && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setExportedProfileJson("")}
                >
                  Hide Export
                </button>
              )}
            </div>
            {exportedProfileJson && (
              <pre
                style={{
                  background: "#0f172a",
                  color: "#f8fafc",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.76rem",
                  overflowX: "auto",
                  marginTop: "0.65rem"
                }}
              >
                {exportedProfileJson}
              </pre>
            )}
          </div>

          <div className="card">
            <h2>Known Risks & Statutory Mitigation Register</h2>
            {[
              {
                id: "RISK-01",
                title: "Legal Route for 'Replacing School' (RTE Act 2009 & NIOS)",
                url: "https://sdmis.nios.ac.in/static/dist/images/pdf/NIOS_Faqs.pdf",
                detail:
                  "EveryYear never claims to be a statutory school board. Regular students use it alongside CBSE/CISCE/State schools; full-time open learners certify via NIOS OBE (Classes 3, 5, 8) and NIOS Secondary/Sr. Secondary (Classes 10, 12)."
              },
              {
                id: "RISK-02",
                title: "Children's Data Law (DPDP Act 2023 Section 9 & Rule 10)",
                url: "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf",
                detail:
                  "Mandatory verifiable parental consent, opaque learner IDs, YYYY-MM birth precision, and strict prohibition on behavioral tracking or targeted ads to minors."
              },
              {
                id: "RISK-03",
                title: "Under-6 Pediatric Screen Time (IAP Guidelines)",
                url: "https://pubmed.ncbi.nlm.nih.gov/34969943/",
                detail:
                  "Hard-coded 0 min/day child screen exposure for ages 0-3 (100% caregiver play brief) and 15-20 min/day co-viewed caregiver sessions for Nursery, LKG, and UKG."
              },
              {
                id: "RISK-04",
                title: "Social Learning & Peer Development",
                url: "https://ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf",
                detail:
                  "Every year plan embeds mandatory offline co-curricular Arts/Physical Education and neighbourhood 4-6 learner Peer Pods."
              },
              {
                id: "RISK-05",
                title: "Offline & Low-Bandwidth Access",
                url: "https://dashboard.udiseplus.gov.in/report2026/static/media/UDISE+2024_25_Booklet_existing.118ba29d4773e6372f72.pdf",
                detail:
                  "Compact deterministic JSON lesson packs (<50 KB/grade) and zero LLM dependency in exam attempt paths."
              },
              {
                id: "RISK-06",
                title: "Outcome Evidence & Zero Syllabus Invention",
                url: "https://ncert.nic.in/parakh/pdf/Assessment_Framework.pdf",
                detail:
                  "Every unit cites an official sourceId; unverified state/board specifics are explicitly badged as knownGaps."
              }
            ].map((r) => (
              <div
                key={r.id}
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "0.55rem",
                  marginBottom: "0.55rem",
                  fontSize: "0.85rem"
                }}
              >
                <span className="badge badge-danger">{r.id}</span>
                <a href={r.url} target="_blank" rel="noreferrer" style={{ fontWeight: 700 }}>
                  {r.title}
                </a>
                <p style={{ margin: "0.25rem 0 0 0" }}>{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      )}

      {/* TAB 8: VENTURE THESIS & 6 CORE QUESTIONS */}
      {activeTab === "venture" && <VentureThesisView lang={lang} brandName={ventureBrand} />}

      {/* TAB 10: GAMIFICATION HUB (QUESTS, BADGES & XP) */}
      {activeTab === "gamification" && (
        <GamificationHub
          xp={xp}
          streak={streak}
          level={currentLevelInfo.level}
          levelTitle={currentLevelInfo.title}
          currentLevelBaseXp={currentLevelInfo.minXp}
          nextLevelXp={currentLevelInfo.nextXp}
          quests={quests}
          badges={badges}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onClaimQuest={handleClaimQuest}
          lang={lang}
        />
      )}
      </div>

      {/* Native-Style Mobile Sticky Bottom Tab Navigation Bar */}
      <nav className="mobile-bottom-bar" aria-label="Mobile Bottom App Navigation">
        <button
          type="button"
          className={`mobile-tab-btn ${activeTab === "planner" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("planner");
            triggerHaptic("light");
          }}
        >
          <span className="tab-icon">📅</span>
          <span>Today</span>
        </button>
        <button
          type="button"
          className={`mobile-tab-btn ${activeTab === "lesson" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("lesson");
            triggerHaptic("light");
          }}
        >
          <span className="tab-icon">📖</span>
          <span>Lesson</span>
        </button>
        <button
          type="button"
          className={`mobile-tab-btn ${activeTab === "middleStage" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("middleStage");
            triggerHaptic("light");
          }}
        >
          <span className="tab-icon">🧠</span>
          <span>Skills</span>
        </button>
        <button
          type="button"
          className={`mobile-tab-btn ${activeTab === "gamification" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("gamification");
            triggerHaptic("light");
          }}
        >
          <span className="tab-icon">⚡</span>
          <span>Quests</span>
        </button>
        <button
          type="button"
          className={`mobile-tab-btn ${
            ["parent", "mocks", "tracks", "evolution", "venture", "diagnostic"].includes(activeTab)
              ? "active"
              : ""
          }`}
          onClick={() => {
            setActiveTab("parent");
            triggerHaptic("light");
          }}
        >
          <span className="tab-icon">⚙️</span>
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}
