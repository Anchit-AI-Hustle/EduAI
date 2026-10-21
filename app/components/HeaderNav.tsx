"use client";

import React from "react";
import { LanguageMode } from "../types/curriculum";

interface HeaderNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: LanguageMode;
  setLang: (lang: LanguageMode) => void;
  brandName: string;
  setBrandName: (brand: string) => void;
}

export const BRAND_OPTIONS = [
  { id: "EduAIon", name: "EduAIon", tagline: "AI on. Always learning." },
  { id: "EveryYear", name: "EveryYear", tagline: "An individual plan for every year." },
  { id: "AarohAI", name: "AarohAI", tagline: "Ascent through step-by-step mastery." },
  { id: "Vidyapath", name: "Vidyapath AI", tagline: "One unified skill graph." }
];

export default function HeaderNav({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  brandName,
  setBrandName,
}: HeaderNavProps) {
  const isHi = lang === "hi";

  const navItems = [
    { id: "overview", labelEn: "Venture Thesis", labelHi: "रणनीतिक शोध", badge: "Live" },
    { id: "diagnostic", labelEn: "Cognitive Diagnostic & IQ", labelHi: "बुद्धिमता व क्षमता परीक्षण", badge: "Adaptive" },
    { id: "timetable", labelEn: "Day-Level Calendar", labelHi: "दैनिक समय-सारणी", badge: "Dynamic" },
    { id: "lesson-loop", labelEn: "Daily Lesson Loop", labelHi: "दैनिक अभ्यास चक्र", badge: "Interactive" },
    { id: "mock-engine", labelEn: "Mock Exam Engine", labelHi: "बोर्ड व प्रवेश परीक्षा", badge: "CBSE/JEE" },
    { id: "curriculum", labelEn: "68-Year Matrix", labelHi: "68-वर्ष पाठ्यक्रम", badge: "Verified" },
    { id: "governance", labelEn: "Governance & Risk", labelHi: "नियमन व सुरक्षा", badge: "DPDP 2023" }
  ];

  return (
    <header style={{
      borderBottom: "1px solid var(--border-color)",
      backgroundColor: "rgba(10, 14, 23, 0.95)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      padding: "0.75rem 0"
    }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {/* Top bar: Brand + Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "#fff"
            }}>
              E
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  {brandName}
                </span>
                <span className="badge badge-cyan" style={{ fontSize: "0.65rem" }}>
                  Self-Evolving v0.2
                </span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                {isHi ? "0 से 12वीं कक्षा व प्रतियोगी परीक्षाओं की संपूर्ण व्यक्तिगत शिक्षा" : "Personalised cradle-to-career learning path on official standards"}
              </p>
            </div>
          </div>

          {/* Right controls: Brand selector + Language toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <select
              aria-label="Select venture brand"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                padding: "0.35rem 0.6rem",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: 500,
                outline: "none"
              }}
            >
              {BRAND_OPTIONS.map((b) => (
                <option key={b.id} value={b.name}>
                  Brand: {b.name}
                </option>
              ))}
            </select>

            <div style={{
              display: "flex",
              backgroundColor: "var(--bg-secondary)",
              padding: "2px",
              borderRadius: "6px",
              border: "1px solid var(--border-color)"
            }}>
              <button
                type="button"
                onClick={() => setLang("en")}
                style={{
                  padding: "0.3rem 0.6rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  borderRadius: "4px",
                  backgroundColor: !isHi ? "var(--accent-indigo)" : "transparent",
                  color: !isHi ? "#fff" : "var(--text-secondary)"
                }}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                style={{
                  padding: "0.3rem 0.6rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  borderRadius: "4px",
                  backgroundColor: isHi ? "var(--accent-indigo)" : "transparent",
                  color: isHi ? "#fff" : "var(--text-secondary)"
                }}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>

        {/* Tab navigation: Horizontal scrollable for mobile 390px, tablet 820px and desktop */}
        <nav
          aria-label="Main Navigation"
          style={{
            display: "flex",
            gap: "0.35rem",
            overflowX: "auto",
            paddingBottom: "0.25rem",
            scrollbarWidth: "none"
          }}
        >
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentTab(item.id)}
                style={{
                  padding: "0.45rem 0.85rem",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  backgroundColor: isActive ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                  border: isActive ? "1px solid rgba(99, 102, 241, 0.5)" : "1px solid transparent",
                  borderRadius: "6px",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "all 0.15s ease"
                }}
              >
                <span>{isHi ? item.labelHi : item.labelEn}</span>
                <span style={{
                  fontSize: "0.65rem",
                  padding: "1px 5px",
                  borderRadius: "4px",
                  backgroundColor: isActive ? "var(--accent-indigo)" : "rgba(255, 255, 255, 0.08)",
                  color: isActive ? "#ffffff" : "var(--text-muted)"
                }}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
