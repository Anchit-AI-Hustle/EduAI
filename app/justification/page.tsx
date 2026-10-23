import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venture Justification | EveryYear",
  description:
    "Six core venture questions answered from primary data: who uses it, current alternatives, bottom-up market size, honest differentiation, willingness to pay, and the unsolved problem."
};

// Canonical answers live in docs/00-venture-strategy-and-naming.md (Section 2).
// scripts/check-venture-thesis-consistency.mjs keeps the key figures on this page in sync with it.

const PANEL: React.CSSProperties = {
  background: "var(--surface-elevated)",
  padding: "1.25rem",
  borderRadius: "12px",
  border: "1px solid var(--border)"
};
const BODY: React.CSSProperties = { color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65 };
const LEAD: React.CSSProperties = { color: "var(--text-muted)", fontSize: "0.94rem", lineHeight: 1.6 };
const CELL: React.CSSProperties = { padding: "0.75rem 0.9rem", verticalAlign: "top" };
const ROW: React.CSSProperties = { borderBottom: "1px solid var(--border)" };
const HEAD_ROW: React.CSSProperties = {
  background: "var(--surface-elevated)",
  color: "var(--text)",
  borderBottom: "2px solid var(--border)"
};
const TABLE: React.CSSProperties = { width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" };

const STATUS_BADGE = {
  Built: "badge badge-green",
  Designed: "badge badge-warn",
  Hypothesis: "badge badge-blue"
} as const;

const SOURCES = {
  udise: "https://dashboard.udiseplus.gov.in/report2026/static/media/UDISE+2024_25_Booklet_existing.118ba29d4773e6372f72.pdf",
  cbse10: "https://school.careers360.com/boards/cbse/how-many-students-appeared-in-cbse-10th-exam-2025",
  cmse: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2160863",
  dpdpAct: "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf",
  dpdpRules: "https://www.meity.gov.in/data-protection-framework"
};

function QuestionHeader({ num, title }: { num: number; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
      <span className="badge badge-blue">Question {num}</span>
      <h2 style={{ margin: 0, fontSize: "1.4rem" }}>{title}</h2>
    </div>
  );
}

function Answer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(99, 102, 241, 0.1)",
        border: "1px solid rgba(99, 102, 241, 0.35)",
        borderRadius: "10px",
        padding: "0.9rem 1.1rem",
        marginBottom: "1rem"
      }}
    >
      <p style={{ margin: 0, color: "var(--text)", fontSize: "0.98rem", lineHeight: 1.6, fontWeight: 600 }}>{children}</p>
    </div>
  );
}

function Src({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

const REALITY: { capability: string; status: keyof typeof STATUS_BADGE; evidence: string }[] = [
  {
    capability: "Curriculum skeletons for CBSE, CISCE, NIOS, State Boards and Early Years",
    status: "Built",
    evidence: "Mostly one shared template per stage. Only CBSE Classes 6 to 8 have chapter-level depth."
  },
  {
    capability: "Shared prerequisite skill graph",
    status: "Built",
    evidence: "59 skills and 62 edges: enough for CBSE 6 to 8 demos, too coarse for chapter-level diagnosis elsewhere."
  },
  {
    capability: "Diagnostic and mock bank",
    status: "Built",
    evidence: "9 diagnostic items and 6 mock blueprints (demo size)."
  },
  {
    capability: "AI tutor, adaptive rebalancer, self-evolving engine",
    status: "Designed",
    evidence: "No LLM calls or backend logic yet. Engine events shown in the app are illustrative demo data."
  },
  {
    capability: "Accounts, saved progress, guardian consent, payments",
    status: "Designed",
    evidence: "All app state lives in the browser and resets on reload."
  },
  {
    capability: "Parents pay INR 199 to 499 per month for diagnosis plus weekly plan",
    status: "Hypothesis",
    evidence: "No users or pricing test yet. Needs a 20 to 50 family pilot."
  }
];

export default function JustificationPage() {
  return (
    <div className="app-shell">
      <header className="top-header">
        <div className="header-row">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
              <span className="brand-badge">Venture Thesis</span>
              <span className="badge badge-warn">Prototype stage</span>
              <span className="badge badge-green">Revised 2026-10-23</span>
            </div>
            <h1 style={{ margin: "0.2rem 0 0.4rem 0", fontSize: "1.85rem", fontWeight: 800 }}>
              Venture Justification: Six Core Questions
            </h1>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "920px", lineHeight: 1.55 }}>
              Who uses it, what they use today, how many face the problem, why we can be better, whether they will pay,
              and what is genuinely unsolved. Every figure is sourced, and every claim is labelled Built, Designed or Hypothesis.
            </p>
          </div>
          <div className="header-controls">
            <Link href="/" className="control-pill" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              ← Return to School Workspace
            </Link>
          </div>
        </div>

        <div className="kpi-strip">
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#38bdf8" }}>~20 lakh</div>
            <div className="kpi-label">Wedge: CBSE Class 6-8 families already paying for help</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#34d399" }}>27.0%</div>
            <div className="kpi-label">Students taking private coaching (NSS 2025)</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#fbbf24" }}>INR 3,988</div>
            <div className="kpi-label">Urban coaching spend per student per year</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#a78bfa" }}>INR 199 / 499</div>
            <div className="kpi-label">Monthly price points to test in pilot</div>
          </div>
        </div>
      </header>

      <nav aria-label="Thesis Quick Jump" className="nav-tabs" style={{ position: "sticky", top: "0.75rem", zIndex: 30, backdropFilter: "blur(16px)", background: "rgba(11, 18, 34, 0.9)" }}>
        <a href="#reality-check" className="nav-tab" style={{ textDecoration: "none" }}>Reality Check</a>
        <a href="#who-will-use" className="nav-tab" style={{ textDecoration: "none" }}>Q1: Who Will Use</a>
        <a href="#current-alternatives" className="nav-tab" style={{ textDecoration: "none" }}>Q2: Current Alternatives</a>
        <a href="#market-size" className="nav-tab" style={{ textDecoration: "none" }}>Q3: How Many</a>
        <a href="#why-better" className="nav-tab" style={{ textDecoration: "none" }}>Q4: Why Better</a>
        <a href="#will-he-pay" className="nav-tab" style={{ textDecoration: "none" }}>Q5: Will He Pay</a>
        <a href="#unsolved-problem" className="nav-tab" style={{ textDecoration: "none" }}>Q6: Unsolved Problem</a>
        <a href="#risks-next" className="nav-tab" style={{ textDecoration: "none" }}>Risks &amp; Next Steps</a>
        <a href="#venture-brands" className="nav-tab" style={{ textDecoration: "none" }}>Venture Brands</a>
      </nav>

      <section id="reality-check" className="card" style={{ borderColor: "rgba(245, 158, 11, 0.35)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span className="badge badge-warn">Read First</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>Reality Check: What Exists Today</h2>
        </div>
        <p style={LEAD}>
          This is a clickable prototype plus a data architecture, not a working product yet. The answers below depend on that, so here is the status of each capability.
        </p>
        <div className="table-wrap" style={{ overflowX: "auto", marginTop: "0.75rem" }}>
          <table className="stack-table" style={TABLE}>
            <thead>
              <tr style={HEAD_ROW}>
                <th style={CELL}>Capability</th>
                <th style={CELL}>Status</th>
                <th style={CELL}>Evidence</th>
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              {REALITY.map((r) => (
                <tr key={r.capability} style={ROW}>
                  <td style={{ ...CELL, color: "var(--text)", fontWeight: 600 }}>{r.capability}</td>
                  <td data-label="Status" style={CELL}>
                    <span className={STATUS_BADGE[r.status]}>{r.status}</span>
                  </td>
                  <td data-label="Evidence" style={CELL}>{r.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="who-will-use" className="card">
        <QuestionHeader num={1} title="Who will use this product?" />
        <Answer>The buyer is the parent; the user is the child. Start with one segment that matches what is actually built.</Answer>
        <div className="grid-3">
          <div style={{ ...PANEL, borderColor: "#6366f1" }}>
            <span className="badge badge-green">Primary wedge</span>
            <h3 style={{ fontSize: "1.05rem", color: "#38bdf8", marginTop: "0.4rem" }}>Parents of CBSE Class 6-8 students</h3>
            <p style={{ ...BODY, fontSize: "0.88rem" }}>
              Urban and semi-urban families who already pay for tuition, study in English or Hindi, and worry about hidden gaps
              before the Class 9 and 10 board years. CBSE Classes 6 to 8 are the only grades deepened to chapter level in this repository.
            </p>
          </div>
          <div style={PANEL}>
            <span className="badge badge-blue">Secondary</span>
            <h3 style={{ fontSize: "1.05rem", color: "#34d399", marginTop: "0.4rem" }}>NIOS and homeschooling families</h3>
            <p style={{ ...BODY, fontSize: "0.88rem" }}>
              A small group with acute pain: nobody gives them a structured year. Certification routes through NIOS Open Basic Education,
              Secondary and Senior Secondary.
            </p>
          </div>
          <div style={PANEL}>
            <span className="badge badge-warn">Deferred</span>
            <h3 style={{ fontSize: "1.05rem", color: "#fbbf24", marginTop: "0.4rem" }}>Not in the first product</h3>
            <p style={{ ...BODY, fontSize: "0.88rem" }}>
              JEE, NEET, CUET, UPSC, SAT, ACT, IELTS, TOEFL and ages 0 to 3. Each is a separate business with strong incumbents.
              Their track files stay in the repository as architecture, not launch scope.
            </p>
          </div>
        </div>
      </section>

      <section id="current-alternatives" className="card">
        <QuestionHeader num={2} title="What does he use currently?" />
        <Answer>The real competitor is the neighbourhood tuition teacher, and free AI chatbots are the fastest-growing threat.</Answer>
        <div className="table-wrap" style={{ overflowX: "auto" }}>
          <table className="stack-table" style={TABLE}>
            <thead>
              <tr style={HEAD_ROW}>
                <th style={CELL}>Current alternative</th>
                <th style={CELL}>What it does well</th>
                <th style={CELL}>What it misses</th>
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              <tr style={ROW}>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>Neighbourhood tuition teacher</td>
                <td data-label="What it does well" style={CELL}>Plans the week, holds the child accountable, clears doubts, reports to parents on WhatsApp.</td>
                <td data-label="What it misses" style={CELL}>Diagnosis is by instinct; quality varies; rarely traces gaps back to earlier grades.</td>
              </tr>
              <tr style={ROW}>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>School and textbooks (NCERT, CBSE, CISCE, State Boards)</td>
                <td data-label="What it does well" style={CELL}>Structure, peers, certification.</td>
                <td data-label="What it misses" style={CELL}>Moves by calendar date, not by each child&apos;s mastery.</td>
              </tr>
              <tr style={ROW}>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>Video apps and YouTube (PW, Vedantu, Byju&apos;s, Khan Academy, DIKSHA)</td>
                <td data-label="What it does well" style={CELL}>Unlimited content, often free or cheap.</td>
                <td data-label="What it misses" style={CELL}>No individual plan; passive watching.</td>
              </tr>
              <tr>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>General AI chatbots (ChatGPT, Gemini, Claude)</td>
                <td data-label="What it does well" style={CELL}>Free, instant explanations, now with learning modes.</td>
                <td data-label="What it misses" style={CELL}>Do not know the child&apos;s board version or textbook; keep no long-term mastery record.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="market-size" className="card">
        <QuestionHeader num={3} title="How many users face this problem?" />
        <Answer>About 20 lakh CBSE Class 6-8 families already pay for help. That is the realistic first market, not the 24.69 crore headline.</Answer>
        <div className="table-wrap" style={{ overflowX: "auto" }}>
          <table className="stack-table" style={TABLE}>
            <thead>
              <tr style={HEAD_ROW}>
                <th style={CELL}>Step</th>
                <th style={CELL}>Figure</th>
                <th style={CELL}>Source and confidence</th>
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              <tr style={ROW}>
                <td style={CELL}>All school students (pre-primary to Class 12)</td>
                <td data-label="Figure" style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>24.69 crore in 14.71 lakh schools</td>
                <td data-label="Source and confidence" style={CELL}><Src href={SOURCES.udise}>UDISE+ 2024-25</Src>, primary</td>
              </tr>
              <tr style={ROW}>
                <td style={CELL}>CBSE Class 10 registrations, 2025</td>
                <td data-label="Figure" style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>about 23.85 lakh</td>
                <td data-label="Source and confidence" style={CELL}>CBSE figures <Src href={SOURCES.cbse10}>as reported</Src>, secondary</td>
              </tr>
              <tr style={ROW}>
                <td style={CELL}>CBSE Classes 6 to 8 (three cohorts)</td>
                <td data-label="Figure" style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>about 70 lakh</td>
                <td data-label="Source and confidence" style={CELL}>Estimate: each cohort similar in size to Class 10</td>
              </tr>
              <tr style={ROW}>
                <td style={CELL}>Students taking private coaching</td>
                <td data-label="Figure" style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>27.0% nationally, 30.7% urban</td>
                <td data-label="Source and confidence" style={CELL}><Src href={SOURCES.cmse}>NSS CMS: Education 2025 (PIB, 26 Aug 2025)</Src>, primary</td>
              </tr>
              <tr>
                <td style={{ ...CELL, color: "var(--text)", fontWeight: 700 }}>Wedge: CBSE Class 6-8 families already paying for help</td>
                <td data-label="Figure" style={{ ...CELL, color: "#34d399", fontWeight: 800 }}>about 20 lakh</td>
                <td data-label="Source and confidence" style={CELL}>Estimate: 70 lakh x about 30%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="why-better" className="card">
        <QuestionHeader num={4} title="Why will your product be better?" />
        <Answer>Honestly, it is not better yet: the advantages below are Designed, not Built. If built, this is the edge over each alternative.</Answer>
        <div className="grid-2">
          <div style={PANEL}>
            <span className={STATUS_BADGE.Designed}>Designed</span>
            <h3 style={{ fontSize: "1.05rem", color: "#818cf8", margin: "0.4rem 0" }}>1. Cross-grade diagnosis tied to this term&apos;s textbook</h3>
            <p style={{ ...BODY, fontSize: "0.88rem", margin: 0 }}>
              &quot;Your child&apos;s <em>Ganita Prakash</em> trouble is a Class 5 fractions gap.&quot; Tutors do this by instinct; apps and chatbots do not do it at all.
            </p>
          </div>
          <div style={PANEL}>
            <span className={STATUS_BADGE.Designed}>Designed</span>
            <h3 style={{ fontSize: "1.05rem", color: "#818cf8", margin: "0.4rem 0" }}>2. A small weekly plan around school homework</h3>
            <p style={{ ...BODY, fontSize: "0.88rem", margin: 0 }}>
              Must-do board content moves first when days are missed, inside a daily time budget. Not a video library.
            </p>
          </div>
          <div style={PANEL}>
            <span className={STATUS_BADGE.Designed}>Designed</span>
            <h3 style={{ fontSize: "1.05rem", color: "#818cf8", margin: "0.4rem 0" }}>3. A parent report that shows whether it works</h3>
            <p style={{ ...BODY, fontSize: "0.88rem", margin: 0 }}>
              Weekly, at skill level, readable by a parent who is not a teacher.
            </p>
          </div>
          <div style={PANEL}>
            <span className={STATUS_BADGE.Hypothesis}>Hypothesis</span>
            <h3 style={{ fontSize: "1.05rem", color: "#818cf8", margin: "0.4rem 0" }}>4. Price below tuition</h3>
            <p style={{ ...BODY, fontSize: "0.88rem", margin: 0 }}>
              INR 199 to 499 per month, tested in a pilot (see Question 5).
            </p>
          </div>
        </div>
        <p style={{ ...BODY, marginTop: "1rem", marginBottom: 0 }}>
          Chatbots lack points 1 to 3 because they do not know the board version or textbook and keep no longitudinal mastery record.
          The board-version pinning and source tracing already in this repository support that edge.
        </p>
      </section>

      <section id="will-he-pay" className="card">
        <QuestionHeader num={5} title="Will he pay?" />
        <Answer>Probably yes, for diagnosis plus accountability (not for &quot;a plan&quot;), and only at a price near what families spend today. Unproven until a pilot.</Answer>
        <ul style={{ ...BODY, paddingLeft: "1.25rem" }}>
          <li>
            <strong>What families spend now:</strong> average annual household spend on private coaching is INR 3,988 per student in urban areas
            and INR 1,793 in rural areas, rising to INR 6,384 nationally at higher secondary (<Src href={SOURCES.cmse}>NSS CMS: Education 2025</Src>).
            These are averages; tuition-paying urban families spend more.
          </li>
          <li>
            <strong>What Indian edtech history shows:</strong> parents pay for an accountable human and visible results. High-priced, sales-led
            packages failed at scale; low-priced offers grew.
          </li>
          <li>
            <strong>Implication:</strong> a self-serve app at INR 799 to 1,499 per month (INR 9,588 to 17,988 per year) is above what most families
            spend on coaching, and only wins if it fully replaces the tutor.
          </li>
        </ul>
        <div className="grid-3" style={{ marginTop: "1rem" }}>
          <div style={PANEL}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Free</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", margin: "0.3rem 0" }}>INR 0</div>
            <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>Curriculum explorer and one cross-grade diagnostic report.</div>
          </div>
          <div style={{ ...PANEL, borderColor: "#6366f1" }}>
            <div style={{ fontSize: "0.8rem", color: "#818cf8", fontWeight: 700 }}>Core (two price points to test)</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", margin: "0.3rem 0" }}>INR 199 or 499 / month</div>
            <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>Diagnosis, weekly plan, weekly parent report.</div>
          </div>
          <div style={{ ...PANEL, borderColor: "#10b981" }}>
            <div style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: 700 }}>Tutor and school channel (B2B2C)</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", margin: "0.3rem 0" }}>Per learner</div>
            <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>The same tools used by tuition teachers or small schools. Priced in the pilot.</div>
          </div>
        </div>
        <p style={{ ...LEAD, marginTop: "1rem", marginBottom: 0 }}>Competitive and study-abroad tracks are not priced until the wedge is proven.</p>
      </section>

      <section id="unsolved-problem" className="card">
        <QuestionHeader num={6} title="What is the real problem not solved right now?" />
        <Answer>Content is now free and unlimited. What nobody provides cheaply is diagnosis plus follow-through.</Answer>
        <ol style={{ ...BODY, paddingLeft: "1.25rem" }}>
          <li>Knowing exactly which earlier-grade skills <em>this</em> child is missing, mapped to the textbook they use <em>this</em> term.</li>
          <li>Turning that into 20 to 30 minutes a day the child will actually do, alongside school homework.</li>
          <li>Showing the parent whether it is working.</li>
        </ol>
        <p style={{ ...BODY, marginBottom: 0 }}>
          The hardest part is <strong>follow-through, not information</strong>. Getting a 12-year-old to open an app every day without a human
          pushing them is the unsolved problem, and the reason tuition teachers still win.
        </p>
      </section>

      <section id="risks-next" className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span className="badge badge-danger">Risks</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>Risks the Answers Depend On, and Next Steps</h2>
        </div>
        <div className="grid-2">
          <div style={PANEL}>
            <h3 style={{ fontSize: "1.05rem", color: "#f87171", marginTop: 0 }}>Children&apos;s data (DPDP Act 2023, Section 9)</h3>
            <p style={{ ...BODY, fontSize: "0.88rem", margin: 0 }}>
              Anyone under 18 is a child. The <Src href={SOURCES.dpdpAct}>Act</Src> requires verifiable parental consent and bars tracking and
              behavioural monitoring of children. Adaptive learning plus XP, streaks and leagues may count as monitoring, and the
              educational-institution exemption in the <Src href={SOURCES.dpdpRules}>DPDP Rules 2025</Src> may not cover a private app.
              Get a legal opinion before any pilot stores learner data.
            </p>
          </div>
          <div style={PANEL}>
            <h3 style={{ fontSize: "1.05rem", color: "#34d399", marginTop: 0 }}>Next steps</h3>
            <ol style={{ ...BODY, fontSize: "0.88rem", margin: 0, paddingLeft: "1.2rem" }}>
              <li>Build the real core for CBSE Class 6-8 Mathematics in English and Hindi: 300+ diagnostic items, saved progress with guardian consent, weekly parent report.</li>
              <li>Pilot with 20 to 50 parents at INR 199 and INR 499 per month before building anything else.</li>
              <li>Measure diagnostic completion, day-7 and day-28 activity, parent report opens, and paid conversion at each price.</li>
            </ol>
          </div>
        </div>
      </section>

      <section id="venture-brands" className="card">
        <h2 style={{ fontSize: "1.4rem", color: "var(--text)", marginTop: 0, marginBottom: "0.75rem" }}>
          Recommended Venture Brand Names
        </h2>
        <p style={LEAD}>
          Decision pending. The product currently appears as EveryYear (app config), EduAIon (venture config) and EduAI (repository). Pick one before any public launch.
        </p>
        <div className="grid-2" style={{ marginTop: "1rem" }}>
          <div style={{ ...PANEL, borderColor: "#6366f1" }}>
            <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#818cf8" }}>EveryYear</div>
            <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginTop: "0.4rem", lineHeight: 1.5 }}>
              States the promise directly: a plan for every year of school. Current default in the app.
            </div>
          </div>
          <div style={{ ...PANEL, borderColor: "#10b981" }}>
            <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#34d399" }}>EduAIon</div>
            <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginTop: "0.4rem", lineHeight: 1.5 }}>
              Working name in the venture config; .com, .ai, .in and .app were unregistered at the last check. Trademark search not yet done.
            </div>
          </div>
          <div style={{ ...PANEL, borderColor: "#f59e0b" }}>
            <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fbbf24" }}>Vidyapath AI</div>
            <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginTop: "0.4rem", lineHeight: 1.5 }}>
              &quot;The path of knowledge&quot;. Bilingual resonance for Hindi and English households.
            </div>
          </div>
          <div style={{ ...PANEL, borderColor: "#ec4899" }}>
            <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f472b6" }}>AarohAI</div>
            <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginTop: "0.4rem", lineHeight: 1.5 }}>
              From Sanskrit <em>Aarohan</em> (progressive ascent): a metaphor for the step-by-step mastery graph.
            </div>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2.5rem 0", borderTop: "1px solid var(--border)", marginTop: "2rem" }}>
        <Link href="/" className="control-pill" style={{ display: "inline-block", background: "var(--primary)", color: "#ffffff", padding: "0.75rem 2rem", borderRadius: "10px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
          Explore the Prototype →
        </Link>
        <div style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          Canonical source: docs/00-venture-strategy-and-naming.md · Figures from UDISE+ 2024-25, NSS CMS: Education 2025, CBSE 2025
        </div>
      </footer>
    </div>
  );
}
