import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ParikshaSaathiPrototype from "../components/ParikshaSaathiPrototype";

export const metadata: Metadata = {
  title: "Pariksha Saathi: Concept Prototype",
  description:
    "Concept prototype: a weekly Hindi board-practice test distributed through a newspaper's education page, paid for by sponsors, schools and parents."
};

export default function ParikshaSaathiPage() {
  return (
    <div className="app-shell">
      <header className="top-header">
        <div className="header-row">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
              <span className="brand-badge">Concept prototype</span>
              <span className="badge badge-warn">Independent pitch, not affiliated with Amar Ujala</span>
            </div>
            <h1 style={{ margin: "0.2rem 0 0.4rem 0", fontSize: "1.85rem", fontWeight: 800 }}>
              Pariksha Saathi (परीक्षा साथी)
            </h1>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "920px", lineHeight: 1.55 }}>
              A weekly 10-minute Hindi board-practice test, printed as a QR box on the education page. Students get an instant
              chapter-wise gap report; sponsors, schools and parents pay for it.
            </p>
          </div>
          <div className="header-controls">
            <Link href="/" className="control-pill" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              ← EveryYear prototype
            </Link>
          </div>
        </div>

        <div className="kpi-strip">
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#38bdf8" }}>~54 lakh</div>
            <div className="kpi-label">UP Board 2025 candidates (Class 10 + 12)</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#34d399" }}>3</div>
            <div className="kpi-label">Revenue lines: sponsor, school, parent</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#fbbf24" }}>10 min</div>
            <div className="kpi-label">Weekly test, scored instantly</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#a78bfa" }}>8 weeks</div>
            <div className="kpi-label">Pilot in one district edition</div>
          </div>
        </div>
      </header>

      <ParikshaSaathiPrototype />

      <footer style={{ textAlign: "center", padding: "2rem 0", borderTop: "1px solid var(--border)", marginTop: "1.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
        Sources: UP Board 2025 registrations as reported on results.amarujala.com; NSS CMS: Education 2025 (PIB, 26 Aug 2025).
        Revenue figures are editable assumptions, not forecasts.
      </footer>
    </div>
  );
}
