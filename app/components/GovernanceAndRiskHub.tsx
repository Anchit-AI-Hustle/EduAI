"use client";

import React, { useState } from "react";
import { LanguageMode } from "../types/curriculum";

interface GovernanceAndRiskHubProps {
  lang: LanguageMode;
}

export default function GovernanceAndRiskHub({ lang }: GovernanceAndRiskHubProps) {
  const isHi = lang === "hi";
  const [parentConsentGranted, setParentConsentGranted] = useState(false);
  const [screenCapEnforced, setScreenCapEnforced] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Banner */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
        borderLeft: "4px solid var(--accent-amber)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="badge badge-amber">{isHi ? "विधिक व जोखिम नियंत्रण कक्ष" : "Legal Governance & Risk Control"}</span>
          <span className="badge badge-emerald">DPDP Act 2023 Sec 9 Compliant</span>
        </div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.35rem" }}>
          {isHi
            ? "कानूनी मान्यता, बाल डेटा सुरक्षा एवं बाल स्वास्थ्य दिशानिर्देश"
            : "Certification Legality, Child Data Governance & Health Guardrails"}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
          {isHi
            ? "आधिकारिक मान्यता प्राप्त करने के विधिक मार्ग (NIOS व बोर्ड पंजीकरण), बाल डेटा गोपनीयता (DPDP Act 2023), और स्क्रीन-टाइम नियंत्रण।"
            : "Covers the verified legal routes for certification (NIOS / board private candidate routes), strict DPDP 2023 Section 9 compliance, and screen-time caps."}
        </p>
      </div>

      {/* Grid of Key Risk Pillars */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1.25rem"
      }}>
        {/* Pillar 1: Legal Route for Replacing School */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span className="badge badge-cyan">{isHi ? "वैध प्रमाणीकरण मार्ग" : "Legal Schooling Route"}</span>
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            {isHi ? "एनआईओएस (NIOS) व बोर्ड परीक्षा मार्ग" : "NIOS Open Basic Education & Board Exams"}
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {isHi
              ? "भारत में 'स्कूल प्रतिस्थापन' का एकमात्र पूर्णतः कानूनी व मान्यता प्राप्त मार्ग राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान (NIOS) है। इसमें OBE स्तर A (कक्षा 3), B (कक्षा 5), C (कक्षा 8), और माध्यमिक (कक्षा 10) एवं उच्च माध्यमिक (कक्षा 12) प्रमाण पत्र भारत सरकार द्वारा वैध हैं।"
              : "The primary legally recognized route in India for home-educated learners is the National Institute of Open Schooling (NIOS). NIOS Open Basic Education (OBE Level A/B/C for Classes 3, 5, 8) and Secondary/Senior Secondary certifications (Classes 10/12) are fully recognized across Indian universities and competitive examinations."}
          </p>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
            Primary Basis: <code>SRC-NIOS-OBE-GUIDELINE</code>, <code>SRC-RTE-ACT-2009</code>
          </div>
        </div>

        {/* Pillar 2: DPDP Act 2023 Child Data Duties */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span className="badge badge-rose">DPDP Act 2023 Sec 9</span>
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            {isHi ? "सत्यापित अभिभावक सहमति व शून्य ट्रैकिंग" : "Parental Consent & Zero Commercial Profiling"}
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {isHi
              ? "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 (धारा 9) के अनुसार 18 वर्ष से कम उम्र के बच्चों के डेटा पर अभिभावक की स्पष्ट सहमति अनिवार्य है। हमारा प्लेटफॉर्म कभी भी लक्षित विज्ञापन (targeted ads) या व्यवहारिक ट्रैकिंग नहीं करता।"
              : "Under DPDP Act 2023 Section 9, processing children's data requires verifiable parental consent. The platform forbids behavioral profiling, commercial tracking, or targeted advertising. Learner accounts use data minimization (birth year-month only, no exact dates or Aadhaar)."}
          </p>
          <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              id="parent-consent-toggle"
              checked={parentConsentGranted}
              onChange={(e) => setParentConsentGranted(e.target.checked)}
              style={{ cursor: "pointer", accentColor: "var(--accent-emerald)" }}
            />
            <label htmlFor="parent-consent-toggle" style={{ fontSize: "0.82rem", color: "#f8fafc", cursor: "pointer" }}>
              {isHi ? "सत्यापित अभिभावक सहमति सक्रिय करें" : "Simulate Verifiable Parental Consent Token"}
            </label>
          </div>
        </div>

        {/* Pillar 3: Pediatric Screen-Time Limits */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span className="badge badge-amber">{isHi ? "बाल स्वास्थ्य दिशानिर्देश" : "Pediatric Health"}</span>
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            {isHi ? "6 वर्ष से कम उम्र हेतु स्क्रीन-टाइम सीमा" : "Under-6 Screen-Time Strict Guardrails"}
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {isHi
              ? "भारतीय बाल चिकित्सा अकादमी (IAP 2021) व WHO दिशानिर्देशों के अनुसार 2 वर्ष से कम आयु के लिए शून्य स्क्रीन-टाइम और 2-5 वर्ष हेतु अधिकतम 60 मिनट की सीमा का पालन किया जाता है। प्रारंभिक वर्षों (0-3 व 3-6) में माता-पिता आधारित भौतिक गतिविधियों को प्राथमिकता दी जाती है।"
              : "Following Indian Academy of Pediatrics (IAP 2021) and WHO guidelines, screen time for ages 0-2 is strictly zero (parental audio/play guidance only), and capped at 60 mins/day for ages 3-6 with active caregiver participation."}
          </p>
          <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="badge badge-emerald">
              {screenCapEnforced ? (isHi ? "दैनिक स्क्रीन कैप सक्रिय: 45 मिनट" : "Active Screen Cap: 45 mins/day") : "Unrestricted"}
            </span>
          </div>
        </div>

        {/* Pillar 4: 5-Layer Self-Evolving Engine */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span className="badge badge-indigo">{isHi ? "5-स्तरीय स्व-विकसित तंत्र" : "5-Layer Self-Evolving Engine"}</span>
          </div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
            {isHi ? "वास्तविक समय vs बैच नियंत्रित अद्यतन" : "Real-Time Mastery vs Controlled Board Releases"}
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {isHi
              ? "L1 (व्यक्तिगत निपुणता) प्रत्येक प्रश्न पर तात्कालिक अपडेट होती है। L2 (अभ्यास सुधार) दैनिक अधिगम लाभ पर आधारित है। L3 (बोर्ड परिपत्र निगरानी) निरंतर चलती है, जबकि L4 (बोर्ड पाठ्यक्रम परिवर्तन) हमेशा बैच-सचेत और मानव-स्वीकृत चेंज-प्रपोजल के माध्यम से होता है।"
              : "L1 (Learner Model) updates real-time per interaction. L2 (Content Quality) evolves daily based on measured learning gain. L3 (Official Source Watch) runs continuously. L4 (Board Alignment) requires human approval and cohort-awareness so enrolled board students are never thrown off schedule."}
          </p>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
            Architecture Ref: <code>docs/02-curriculum-governance-and-self-evolving-engine.md</code>
          </div>
        </div>
      </div>
    </div>
  );
}
