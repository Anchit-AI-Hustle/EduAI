"use client";

import React, { useState, useMemo } from "react";

type Localized = { en: string; hi: string };

interface Props {
  masterIndex: any;
  initialCurricula: Record<string, any>;
}

const UI_TEXT = {
  en: {
    subtitle:
      "AI-First School & Self-Evolving Skill Graph: Home Learning (0-3), Nursery-Class 12, Competitive (JEE, NEET, CUET, UPSC) & Study Abroad (SAT, ACT, IELTS, TOEFL)",
    tabs: {
      planner: "1. Year, Week & Day Planner",
      diagnostic: "2. Adaptive Diagnostic",
      lesson: "3. Daily Lesson Loop",
      mocks: "4. Mock Exam Engine",
      tracks: "5. Competitive & Global Tracks",
      evolution: "6. Self-Evolving Engine (L1-L5)",
      parent: "7. Parent View & Legal Risks",
      venture: "8. Venture Thesis & 5 Q&A"
    },
    boardLabel: "Select Board / Framework",
    yearLabel: "Select Stage / Year (All 16 Stages)",
    dailyBudgetLabel: "Family Daily Study Budget (Minutes)",
    learnerLabel: "Active Synthetic Learner Profile"
  },
  hi: {
    subtitle:
      "एआई-प्रथम विद्यालय और स्व-विकसित कौशल ग्राफ: गृह शिक्षण (0-3), नर्सरी से कक्षा 12, प्रतियोगी परीक्षाएं (JEE, NEET, CUET, UPSC) और विदेश अध्ययन (SAT, ACT, IELTS, TOEFL)",
    tabs: {
      planner: "1. वार्षिक, साप्ताहिक व दैनिक योजना",
      diagnostic: "2. अनुकूलित निदान (Diagnostic)",
      lesson: "3. दैनिक पाठ चक्र (Lesson Loop)",
      mocks: "4. मॉक परीक्षा इंजन",
      tracks: "5. प्रतियोगी व विदेश ट्रैक",
      evolution: "6. स्व-विकसित इंजन (L1-L5)",
      parent: "7. अभिभावक दृश्य व विधिक जोखिम",
      venture: "8. वेंचर रणनीति व 5 मुख्य प्रश्न"
    },
    boardLabel: "बोर्ड / फ्रेमवर्क चुनें",
    yearLabel: "चरण / कक्षा चुनें (सभी 16 चरण)",
    dailyBudgetLabel: "दैनिक अध्ययन समय बजट (मिनट)",
    learnerLabel: "सक्रिय शिक्षार्थी प्रोफ़ाइल"
  }
};

export default function EveryYearSchoolWorkspace({ masterIndex, initialCurricula }: Props) {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [ventureBrand, setVentureBrand] = useState<string>(masterIndex.venture.ventureName || "EveryYear");
  const [activeTab, setActiveTab] = useState<
    "planner" | "diagnostic" | "lesson" | "mocks" | "tracks" | "evolution" | "parent" | "venture"
  >("planner");

  const [selectedLearnerId, setSelectedLearnerId] = useState<string>(
    masterIndex.learners[0]?.learnerId || "learner01aaravcbse07"
  );
  const [selectedBoard, setSelectedBoard] = useState<string>("cbse");
  const [selectedYear, setSelectedYear] = useState<string>("class-07");
  const [customDailyMinutes, setCustomDailyMinutes] = useState<number>(60);

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
            <button
              type="button"
              className={`control-pill ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              English
            </button>
            <button
              type="button"
              className={`control-pill ${lang === "hi" ? "active" : ""}`}
              onClick={() => setLang("hi")}
            >
              हिन्दी
            </button>
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
            onClick={() => setActiveTab(tabKey)}
          >
            {t.tabs[tabKey]}
          </button>
        ))}
      </nav>

      {/* TAB 1: YEAR, WEEK & DAY PLANNER */}
      {activeTab === "planner" && activeCurriculum && (
        <div>
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
                        background: "#ffffff",
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
                    onClick={() => setDiagSubmitted(true)}
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
                    }}
                  >
                    Demo Fill All Correct
                  </button>
                </div>

                {diagSubmitted && (
                  <div
                    style={{
                      background: "#ffffff",
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

      {/* TAB 3: DAILY LESSON LOOP */}
      {activeTab === "lesson" && activeCurriculum && (
        <div className="card">
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
                onClick={() => setLessonStepIndex(idx)}
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
                background: "#ffffff",
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
                      ? "Mastery Evidence Event Recorded! L1 Engine promoted skill mastery (+0.05) and updated the weekly buffer."
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
          <div className="card">
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.75rem" }}>
              <div>
                <span className="badge badge-green">5-Speed Governance Architecture</span>
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
                DPDP Act 2023 Section 9 & Rule 10 Verifiable Guardian Consent Active
              </label>
              <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", margin: "0.25rem 0" }}>
                Zero behavioral tracking, zero targeted advertising, birth stored as YYYY-MM only ({activeLearner.identity.dateOfBirth}), data residency pinned to India (IN).
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
                url: "https://www.dpdpa.com/dpdpa2023/chapter-2/section9.html",
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
      )}

      {/* TAB 8: VENTURE THESIS & 5 FOUNDER QUESTIONS */}
      {activeTab === "venture" && (
        <div className="card">
          <h2>Venture Naming & Answers to the 5 Core Product Questions</h2>
          <div className="table-wrap" style={{ marginBottom: "1rem" }}>
            <table>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Primary-Sourced Answer & Strategic Wedge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>1. Who will use it?</strong>
                  </td>
                  <td>
                    (a) K-12 school-enrolled students & parents (Nursery-Class 12 across CBSE, CISCE, State Boards) needing personalized pacing; (b) Class 8-12 aspirants combining school boards with JEE, NEET, CUET, UPSC, SAT, ACT, IELTS, or TOEFL; (c) Caregivers (0-6) and NIOS open-schooling families.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>2. What do they use currently?</strong>
                  </td>
                  <td>
                    Fixed-pace school classrooms, disconnected neighbourhood tuition/coaching centers (Allen, Aakash, PW), passive video libraries (YouTube), and unpinned chatbots (ChatGPT) that hallucinate syllabus rules and lack longitudinal mastery tracking.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>3. How many users face this problem?</strong>
                  </td>
                  <td>
                    <strong>24.8 Crore (248M) to 23.29 Crore K-12 students</strong> in India (
                    <a
                      href="https://dashboard.udiseplus.gov.in/report2026/static/media/UDISE+2023_24_Booklet_nep.f2ab818294eb169c0adc.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      UDISE+ Report
                    </a>
                    ), where over 50% face multi-year foundational gaps (
                    <a
                      href="https://asercentre.org/wp-content/uploads/2022/12/ASER-2024-National-findings.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      ASER 2024
                    </a>
                    ), plus <strong>55+ lakh annual test takers</strong> across NEET UG, JEE Main, CUET UG, UPSC, and study-abroad exams.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>4. Why will our product be better?</strong>
                  </td>
                  <td>
                    One shared DAG skill graph mapping every board and exam together; a constrained year/week/day planner with a 15% rebalance buffer; strict primary-source pinning with zero syllabus hallucination; a 5-layer self-evolving curriculum engine; and native Hindi + English + Parent DPDP/IAP governance.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>5. Will they pay?</strong>
                  </td>
                  <td>
                    Yes - families already spend INR 1,500-6,000/month on local tuitions and INR 40,000-2,50,000/year on coaching. Tiered pricing: Free diagnostic & syllabus explorer; INR 499-1,499/mo Core Annual Planner; INR 1,999-3,499/mo Board + Competitive Track Bundle.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>6. What is the real unsolved problem?</strong>
                  </td>
                  <td>
                    Content availability is already solved by video apps. The real unsolved problem is <strong>longitudinal curriculum orchestration</strong>: reconciling fixed-date board syllabi and competitive tracks with an individual child&apos;s prerequisite mastery and daily family time budget.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
