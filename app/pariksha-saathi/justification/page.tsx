import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pariksha Saathi: Justification",
  description:
    "Why a weekly Hindi board-practice test, sold through a newspaper's print reach and ad desk, is worth piloting: six questions answered from primary data."
};

const PANEL: React.CSSProperties = {
  background: "var(--surface-elevated)",
  padding: "1.1rem",
  borderRadius: "12px",
  border: "1px solid var(--border)"
};
const BODY: React.CSSProperties = { color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65 };
const CELL: React.CSSProperties = { padding: "0.7rem 0.85rem", verticalAlign: "top" };
const ROW: React.CSSProperties = { borderBottom: "1px solid var(--border)" };
const TABLE: React.CSSProperties = { width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" };
const HEAD_ROW: React.CSSProperties = { background: "var(--surface-elevated)", borderBottom: "2px solid var(--border)" };

const SOURCES = {
  upBoard: "https://results.amarujala.com/exam-alerts/up-board-exam-2025-27-4-lakh-candidates-registered-for-high-school-26-98-lakh-for-intermediate",
  cmse: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2160863",
  amc: "https://foundation.amarujala.com/atul-maheshwari-chhatravritti-amc",
  stressFree: "https://www.inma.org/blogs/ideas/post.cfm/amar-ujala-supports-students-beyond-tests-with-stress-free-exam-programme"
};

function Src({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Question({ num, title, answer, children }: { num: number; title: string; answer: string; children: React.ReactNode }) {
  return (
    <section id={`q${num}`} className="card">
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        <span className="badge badge-blue">Question {num}</span>
        <h2 style={{ margin: 0, fontSize: "1.35rem" }}>{title}</h2>
      </div>
      <div
        style={{
          background: "rgba(99, 102, 241, 0.1)",
          border: "1px solid rgba(99, 102, 241, 0.35)",
          borderRadius: "10px",
          padding: "0.85rem 1.05rem",
          marginBottom: "1rem"
        }}
      >
        <p style={{ margin: 0, fontWeight: 600, lineHeight: 1.6 }}>{answer}</p>
      </div>
      {children}
    </section>
  );
}

export default function ParikshaSaathiJustificationPage() {
  return (
    <div className="app-shell">
      <header className="top-header">
        <div className="header-row">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
              <span className="brand-badge">Concept justification</span>
              <span className="badge badge-warn">Independent pitch, not affiliated with Amar Ujala</span>
            </div>
            <h1 style={{ margin: "0.2rem 0 0.4rem 0", fontSize: "1.85rem", fontWeight: 800 }}>
              Pariksha Saathi: Why It Is Worth a Pilot
            </h1>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "920px", lineHeight: 1.55 }}>
              Six questions answered for a weekly Hindi board-practice test that runs on a newspaper&apos;s print reach and ad desk.
              Figures are sourced; anything not yet proven is marked as an assumption for the pilot to test.
            </p>
          </div>
          <div className="header-controls">
            <Link href="/pariksha-saathi" className="control-pill" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              ← Back to the prototype
            </Link>
          </div>
        </div>
        <nav aria-label="Jump to question" className="nav-tabs" style={{ marginTop: "1rem" }}>
          {["Who", "Today", "How many", "Why better", "Will they pay", "Real problem"].map((label, i) => (
            <a key={label} href={`#q${i + 1}`} className="nav-tab" style={{ textDecoration: "none" }}>
              Q{i + 1}: {label}
            </a>
          ))}
          <a href="#pilot" className="nav-tab" style={{ textDecoration: "none" }}>
            Pilot &amp; kill criteria
          </a>
        </nav>
      </header>

      <Question
        num={1}
        title="Who will use it?"
        answer="Two sides. Students use it free; sponsors, schools and parents pay. The newspaper's own ad desk and education desk run it."
      >
        <div className="table-wrap">
          <table className="stack-table" style={TABLE}>
            <thead>
              <tr style={HEAD_ROW}>
                <th style={CELL}>User</th>
                <th style={CELL}>What they get</th>
                <th style={CELL}>Pays?</th>
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              <tr style={ROW}>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>UP Board students, Classes 9 to 12, mostly Hindi-medium</td>
                <td data-label="What they get" style={CELL}>A 10-minute weekly test and a chapter-wise report of which earlier-class skills to review</td>
                <td data-label="Pays?" style={CELL}>No, free</td>
              </tr>
              <tr style={ROW}>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>Sponsors: coaching institutes, banks, local and national brands</td>
                <td data-label="What they get" style={CELL}>One named weekly slot in front of exam-year families, with QR scans as proof of reach</td>
                <td data-label="Pays?" style={CELL}>Yes, per weekly test</td>
              </tr>
              <tr style={ROW}>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>Schools and teachers</td>
                <td data-label="What they get" style={CELL}>A class-level gap map every week, without setting or marking a test</td>
                <td data-label="Pays?" style={CELL}>Yes, per student per year</td>
              </tr>
              <tr style={ROW}>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>Parents</td>
                <td data-label="What they get" style={CELL}>A weekly summary (with consent) and an optional full board-pattern mock</td>
                <td data-label="Pays?" style={CELL}>Optional, once per season</td>
              </tr>
              <tr>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>Newspaper teams: education desk, ad sales, foundation</td>
                <td data-label="What they get" style={CELL}>A year-round education product to sell and report on, not only result-day traffic</td>
                <td data-label="Pays?" style={CELL}>Runs it</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Question>

      <Question
        num={2}
        title="What do they use currently?"
        answer="Students practise from guess papers, guide books and YouTube, which give answers but never tell them why they got something wrong."
      >
        <div className="grid-2">
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>Students and parents</div>
            <ul style={{ ...BODY, margin: 0, paddingLeft: "1.2rem" }}>
              <li>Guide books, guess papers and model papers: answers, no diagnosis.</li>
              <li>Free Hindi YouTube channels and apps: explanations, no weekly routine or report.</li>
              <li>Local tuition, where families can afford it (see Question 3).</li>
            </ul>
          </div>
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>Schools</div>
            <ul style={{ ...BODY, margin: 0, paddingLeft: "1.2rem" }}>
              <li>Paper unit tests marked by hand; a mark per student, rarely a class-wide view of which skill is weak.</li>
            </ul>
          </div>
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>Sponsors</div>
            <ul style={{ ...BODY, margin: 0, paddingLeft: "1.2rem" }}>
              <li>Standard print and digital display ads around exam and result season, with reach estimated, not measured.</li>
            </ul>
          </div>
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>The newspaper</div>
            <ul style={{ ...BODY, margin: 0, paddingLeft: "1.2rem" }}>
              <li>Strong result-day traffic and separate school programmes, such as the{" "}
                <Src href={SOURCES.amc}>Atul Maheshwari scholarship exam</Src> and the{" "}
                <Src href={SOURCES.stressFree}>stress-free exam programme</Src>, without one product joining them up.</li>
            </ul>
          </div>
        </div>
      </Question>

      <Question
        num={3}
        title="How many users face this problem?"
        answer="About 54 lakh students registered for the 2025 UP Board Class 10 and 12 exams. Reaching 1% of them each week is about 54,000 test-takers."
      >
        <div className="table-wrap">
          <table className="stack-table" style={TABLE}>
            <thead>
              <tr style={HEAD_ROW}>
                <th style={CELL}>Fact</th>
                <th style={CELL}>Figure</th>
                <th style={CELL}>Source</th>
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              <tr style={ROW}>
                <td style={CELL}>UP Board 2025 registrations, Class 10 + Class 12</td>
                <td data-label="Figure" style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>about 54 lakh (27.4 lakh + 26.98 lakh)</td>
                <td data-label="Source" style={CELL}><Src href={SOURCES.upBoard}>results.amarujala.com</Src>, as reported</td>
              </tr>
              <tr style={ROW}>
                <td style={CELL}>Students taking private coaching</td>
                <td data-label="Figure" style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>27.0% nationally; 25.5% rural, 30.7% urban</td>
                <td data-label="Source" style={CELL}><Src href={SOURCES.cmse}>NSS CMS: Education 2025 (PIB)</Src></td>
              </tr>
              <tr style={ROW}>
                <td style={CELL}>Average yearly coaching spend per student</td>
                <td data-label="Figure" style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>₹1,793 rural, ₹3,988 urban</td>
                <td data-label="Source" style={CELL}><Src href={SOURCES.cmse}>NSS CMS: Education 2025 (PIB)</Src></td>
              </tr>
              <tr>
                <td style={CELL}>Implication</td>
                <td data-label="Figure" style={{ ...CELL, color: "#34d399", fontWeight: 700 }}>About 3 in 4 students take no private coaching</td>
                <td data-label="Source" style={CELL}>Derived from the 27.0% figure</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ ...BODY, marginBottom: 0, marginTop: "0.9rem" }}>
          Classes 9 and 11, and other Hindi-belt boards, are not counted here, so the real pool is larger.
        </p>
      </Question>

      <Question
        num={4}
        title="Why will it be better?"
        answer="Not because of technology alone: anyone can build a quiz. The edge is distribution, habit and trust that only a daily Hindi newspaper has."
      >
        <div className="grid-2">
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>1. It reaches students apps cannot</div>
            <p style={{ ...BODY, margin: 0 }}>A printed QR box arrives in Hindi-medium homes every day. No app install, no ad spend to acquire users.</p>
          </div>
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>2. It explains why, not just what</div>
            <p style={{ ...BODY, margin: 0 }}>Each wrong answer points to the earlier-class skill to review. Guess papers and videos only give the right answer.</p>
          </div>
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>3. A weekly habit, not a seasonal spike</div>
            <p style={{ ...BODY, margin: 0 }}>Same day, same page, every week. Result-day readers become year-round readers.</p>
          </div>
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>4. Sponsors get measurable reach</div>
            <p style={{ ...BODY, margin: 0 }}>QR scans and completed tests per edition prove reach, which a plain display ad cannot.</p>
          </div>
        </div>
        <p style={{ ...BODY, marginTop: "0.9rem", marginBottom: 0 }}>
          <strong>Honest limit:</strong> today this is a clickable prototype with 5 questions. The question bank, teacher review and
          QR tracking still have to be built, and the pilot has to show students come back.
        </p>
      </Question>

      <Question
        num={5}
        title="Will they pay?"
        answer="Students will not, and should not have to. Sponsors and schools are the realistic payers; parents are a small bonus."
      >
        <div className="table-wrap">
          <table className="stack-table" style={TABLE}>
            <thead>
              <tr style={HEAD_ROW}>
                <th style={CELL}>Payer</th>
                <th style={CELL}>Why they would pay</th>
                <th style={CELL}>Prototype default (assumption)</th>
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              <tr style={ROW}>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>Sponsors</td>
                <td data-label="Why they would pay" style={CELL}>Education advertisers want exam-year families; a named weekly slot with measured scans is easier to justify than a display ad</td>
                <td data-label="Default" style={CELL}>30 weeks × ₹1 lakh = ₹30 lakh</td>
              </tr>
              <tr style={ROW}>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>Schools</td>
                <td data-label="Why they would pay" style={CELL}>A weekly class gap map saves teachers time and gives schools something to show parents</td>
                <td data-label="Default" style={CELL}>200 schools × 300 students × ₹100 = ₹60 lakh</td>
              </tr>
              <tr style={ROW}>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>Parents</td>
                <td data-label="Why they would pay" style={CELL}>A full board-pattern mock just before exams, priced far below tuition</td>
                <td data-label="Default" style={CELL}>2% of 50,000 × ₹99 = ₹1 lakh</td>
              </tr>
              <tr>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>Total, year one</td>
                <td data-label="Why they would pay" style={CELL}>At these assumptions</td>
                <td data-label="Default" style={{ ...CELL, color: "#34d399", fontWeight: 800 }}>about ₹91 lakh</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ ...BODY, marginTop: "0.9rem", marginBottom: 0 }}>
          Why students stay free: average rural coaching spend is only ₹1,793 a year, so charging students would shrink the audience
          that sponsors and schools are paying to reach. Sponsor fees and school prices are guesses until the ad desk and 10 pilot
          schools confirm them.
        </p>
      </Question>

      <Question
        num={6}
        title="What is the real problem not solved right now?"
        answer="Hindi-medium board students practise a lot but get no feedback on why they go wrong; and the newspaper's education audience is seasonal, so it cannot be monetised all year."
      >
        <ol style={{ ...BODY, paddingLeft: "1.2rem", marginBottom: 0 }}>
          <li>
            <strong>For students:</strong> practice material is everywhere, but nothing tells a Class 10 student that their quadratic
            mistakes come from a Class 9 factorisation gap. About 3 in 4 take no private coaching that could tell them.
          </li>
          <li>
            <strong>For schools:</strong> teachers mark tests but rarely see which skill the whole class is weak in.
          </li>
          <li>
            <strong>For the newspaper:</strong> education traffic spikes on result day and fades, and the school programmes run as
            separate events. A weekly test turns that into one year-round product that ad sales can sell.
          </li>
        </ol>
      </Question>

      <section id="pilot" className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span className="badge badge-green">Proof</span>
          <h2 style={{ margin: 0, fontSize: "1.35rem" }}>8-Week Pilot and What Would Prove It Wrong</h2>
        </div>
        <div className="grid-2">
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>Pilot (one district edition)</div>
            <ol style={{ ...BODY, margin: 0, paddingLeft: "1.2rem" }}>
              <li>QR box every Wednesday on the education page, linked from the results portal.</li>
              <li>8 weekly sponsor slots sold through the existing ad desk.</li>
              <li>10 schools get a free class report, then a quote for the paid pack.</li>
              <li>Every question reviewed by a subject teacher before print.</li>
            </ol>
          </div>
          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>Stop or rethink if (proposed thresholds)</div>
            <ul style={{ ...BODY, margin: 0, paddingLeft: "1.2rem" }}>
              <li>Fewer than 60% of students who scan the QR finish the test.</li>
              <li>Fewer than 20% of week-1 students return by week 4.</li>
              <li>No sponsor renews after the pilot.</li>
              <li>Fewer than 3 of the 10 pilot schools agree to pay.</li>
            </ul>
          </div>
        </div>
        <p style={{ ...BODY, marginTop: "0.9rem", marginBottom: 0 }}>
          <strong>Risks handled in the design:</strong> the test works without login, and contact details are collected only with
          verifiable parent or school consent (DPDP Act 2023). Sponsors never see student data or results. Wrong questions are a
          brand risk, so teacher review comes before print.
        </p>
      </section>

      <footer style={{ textAlign: "center", padding: "2rem 0", borderTop: "1px solid var(--border)", marginTop: "1.5rem" }}>
        <Link href="/pariksha-saathi" className="control-pill" style={{ display: "inline-block", background: "var(--primary)", color: "#ffffff", padding: "0.7rem 1.8rem", borderRadius: "10px", fontWeight: 700, textDecoration: "none" }}>
          Try the prototype →
        </Link>
        <div style={{ marginTop: "0.9rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Independent concept pitch, not affiliated with or endorsed by Amar Ujala. Revenue figures are assumptions, not forecasts.
        </div>
      </footer>
    </div>
  );
}
