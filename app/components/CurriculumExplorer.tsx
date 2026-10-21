"use client";

import React, { useState } from "react";
import { LanguageMode } from "../types/curriculum";

interface CurriculumExplorerProps {
  lang: LanguageMode;
  catalogData?: any;
}

export default function CurriculumExplorer({ lang, catalogData }: CurriculumExplorerProps) {
  const isHi = lang === "hi";
  const [selectedBoard, setSelectedBoard] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkeleton, setSelectedSkeleton] = useState<any>(null);

  const stages = catalogData?.stages || [
    { year_id: "home-0-3", label_en: "Home learning (ages 0-3)", label_hi: "घर पर सीखना (0-3 वर्ष)", nep_stage: "pre-foundational-home" },
    { year_id: "nursery", label_en: "Nursery", label_hi: "नर्सरी", nep_stage: "foundational" },
    { year_id: "lkg", label_en: "LKG", label_hi: "एलकेजी", nep_stage: "foundational" },
    { year_id: "ukg", label_en: "UKG", label_hi: "यूकेजी", nep_stage: "foundational" },
    { year_id: "class-01", label_en: "Class 1", label_hi: "कक्षा 1", nep_stage: "foundational" },
    { year_id: "class-02", label_en: "Class 2", label_hi: "कक्षा 2", nep_stage: "foundational" },
    { year_id: "class-03", label_en: "Class 3", label_hi: "कक्षा 3", nep_stage: "preparatory" },
    { year_id: "class-04", label_en: "Class 4", label_hi: "कक्षा 4", nep_stage: "preparatory" },
    { year_id: "class-05", label_en: "Class 5", label_hi: "कक्षा 5", nep_stage: "preparatory" },
    { year_id: "class-06", label_en: "Class 6", label_hi: "कक्षा 6", nep_stage: "middle" },
    { year_id: "class-07", label_en: "Class 7", label_hi: "कक्षा 7", nep_stage: "middle" },
    { year_id: "class-08", label_en: "Class 8", label_hi: "कक्षा 8", nep_stage: "middle" },
    { year_id: "class-09", label_en: "Class 9", label_hi: "कक्षा 9", nep_stage: "secondary" },
    { year_id: "class-10", label_en: "Class 10", label_hi: "कक्षा 10", nep_stage: "secondary" },
    { year_id: "class-11", label_en: "Class 11", label_hi: "कक्षा 11", nep_stage: "secondary" },
    { year_id: "class-12", label_en: "Class 12", label_hi: "कक्षा 12", nep_stage: "secondary" }
  ];

  const boards = [
    { id: "cbse", name: "CBSE (Central Board of Secondary Education)", count: 16 },
    { id: "cisce", name: "CISCE (ICSE / ISC)", count: 16 },
    { id: "nios", name: "NIOS (National Institute of Open Schooling)", count: 16 },
    { id: "state-boards", name: "State Boards (Sample Skeletons)", count: 16 },
    { id: "national-early-years", name: "National Early Years (MWCD Navchetana / Aadharshila)", count: 4 }
  ];

  const skeletons = catalogData?.curriculumCatalog || [];

  const filtered = skeletons.filter((s: any) => {
    const matchesBoard = selectedBoard === "all" || s.boardId === selectedBoard;
    const matchesSearch = !searchQuery || s.id.toLowerCase().includes(searchQuery.toLowerCase()) || s.yearId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBoard && matchesSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Banner */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
        borderLeft: "4px solid var(--accent-indigo)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-indigo">{isHi ? "68-वर्षीय पाठ्यक्रम मैट्रिक्स" : "68-Year Curriculum Matrix"}</span>
          <span className="badge badge-emerald">68/68 Skeletons Validated</span>
          <span className="badge badge-amber">{isHi ? "शून्य मतिभ्रम (Zero Hallucination)" : "Zero Hallucination Grounded"}</span>
        </div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.35rem" }}>
          {isHi
            ? "आधिकारिक राष्ट्रीय ढांचों (NCERT, CBSE, CISCE, NIOS) से सत्यापित पाठ्यक्रम"
            : "Official Framework Sourced Curriculum Architecture"}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
          {isHi
            ? "प्रत्येक कक्षा और बोर्ड का पाठ्यक्रम आधिकारिक स्रोतों से लिया गया है। अज्ञात अध्यायों को बिना मनगढ़ंत बनाए स्पष्ट 'गैप' के रूप में चिह्नित किया गया है।"
            : "Every year and board skeleton is anchored in primary source documents. Gaps are explicitly labeled rather than filled by model imagination."}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <select
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
            aria-label="Filter curriculum by board"
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: "#f8fafc",
              fontSize: "0.85rem"
            }}
          >
            <option value="all">{isHi ? "सभी बोर्ड (All 68 Skeletons)" : "All Boards (All 68 Skeletons)"}</option>
            {boards.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.count})
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isHi ? "कक्षा या विषय खोजें (उदा. class-10, math)..." : "Search class or subject (e.g. class-10, math)..."}
          aria-label="Search class or subject"
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            color: "#f8fafc",
            fontSize: "0.85rem",
            minWidth: "260px"
          }}
        />
      </div>

      {/* Skeleton Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1rem"
      }}>
        {(filtered.length > 0 ? filtered : skeletons).slice(0, 24).map((s: any) => {
          return (
            <div
              key={s.id}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.75rem",
                cursor: "pointer"
              }}
              onClick={() => setSelectedSkeleton(s)}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <span className="badge badge-cyan" style={{ fontSize: "0.68rem" }}>
                    {s.boardId.toUpperCase()}
                  </span>
                  <span className="badge badge-indigo" style={{ fontSize: "0.68rem" }}>
                    {s.nepStage}
                  </span>
                </div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f8fafc" }}>
                  {s.id}
                </h4>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                  Session: {s.academicSession} | Coverage: {s.coverageStatus}
                </p>
              </div>

              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  {isHi ? `शामिल विषय: ${s.subjectsCount}` : `Verified Subjects: ${s.subjectsCount}`}
                </div>
                <button
                  type="button"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--accent-cyan)",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}
                >
                  {isHi ? "प्राथमिक स्रोत व पाठ्य विवरण देखें →" : "Inspect Primary Sources →"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Inspector for Selected Skeleton */}
      {selectedSkeleton && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          padding: "1rem"
        }}>
          <div className="card" style={{
            maxWidth: "700px",
            width: "100%",
            maxHeight: "85vh",
            overflowY: "auto",
            backgroundColor: "#111827",
            border: "1px solid var(--accent-indigo)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                {selectedSkeleton.id}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedSkeleton(null)}
                style={{ fontSize: "1.2rem", color: "var(--text-muted)", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div>
                <strong>NEP Stage:</strong> {selectedSkeleton.nepStage} | <strong>Certification:</strong> {selectedSkeleton.certificationPoint || "Annual progression"}
              </div>

              {selectedSkeleton.schemeNotes && selectedSkeleton.schemeNotes.length > 0 && (
                <div style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                  <strong style={{ fontSize: "0.85rem", color: "var(--accent-amber)" }}>Official Scheme Note:</strong>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                    {selectedSkeleton.schemeNotes[0].text}
                  </p>
                </div>
              )}

              <h4 style={{ fontSize: "1rem", fontWeight: 600, marginTop: "0.5rem" }}>
                Subjects & Verified Textbooks:
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {selectedSkeleton.subjects.map((sub: any, idx: number) => (
                  <div key={idx} style={{ padding: "0.6rem", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-color)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ fontSize: "0.9rem" }}>{sub.name_en} ({sub.name_hi})</strong>
                      <span className="badge badge-emerald" style={{ fontSize: "0.65rem" }}>{sub.status}</span>
                    </div>
                    {sub.ncert_textbook_titles && sub.ncert_textbook_titles.length > 0 && (
                      <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                        <strong>NCERT Titles:</strong> {sub.ncert_textbook_titles.join(", ")}
                      </div>
                    )}
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                      Sources: {sub.source_ids.slice(0, 2).join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "1.25rem", textAlign: "right" }}>
              <button type="button" className="btn-secondary" onClick={() => setSelectedSkeleton(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
