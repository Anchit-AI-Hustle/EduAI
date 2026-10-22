import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venture Justification & Curriculum Science | EduAI",
  description:
    "Comprehensive venture thesis answering the core market questions, TAM/SAM analysis, syllabus governance teardown, and minute-by-minute self-evolving AI architecture."
};

export default function JustificationPage() {
  return (
    <div className="app-shell">
      {/* Top Header Command Shell */}
      <header className="top-header">
        <div className="header-row">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
              <span className="brand-badge">Official Strategic Thesis</span>
              <span className="badge badge-purple">NCF-SE 2023 Compliant</span>
              <span className="badge badge-cyan">DPDP 2023 Aligned</span>
            </div>
            <h1 style={{ margin: "0.2rem 0 0.4rem 0", fontSize: "1.85rem", fontWeight: 800 }}>
              Venture Justification &amp; Curriculum Formulation Science
            </h1>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "920px", lineHeight: 1.55 }}>
              Definitive answers to the core strategic market questions: user segmentation, current alternatives, 
              empirical TAM sizing, structural moats, willingness to pay, biological velocity mismatch, and 
              the CBSE syllabus formulation process compared to EduAI minute-by-minute AI evolution.
            </p>
          </div>
          <div className="header-controls">
            <Link href="/" className="control-pill" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              ← Return to School Workspace
            </Link>
          </div>
        </div>

        {/* Top KPI Metrics Strip */}
        <div className="kpi-strip">
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#38bdf8" }}>260M</div>
            <div className="kpi-label">Total K-12 Student TAM (UDISE+)</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#34d399" }}>$7.2B</div>
            <div className="kpi-label">Annual Shadow Coaching Spend (NSSO)</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#fbbf24" }}>1 : 40+</div>
            <div className="kpi-label">Traditional Classroom Bottleneck</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-value" style={{ color: "#a78bfa" }}>0 to 90 min</div>
            <div className="kpi-label">IAP Pediatric Screen Time Guard</div>
          </div>
        </div>
      </header>

      {/* Sticky Quick-Jump Navigation Bar */}
      <nav aria-label="Thesis Quick Jump" className="nav-tabs" style={{ position: "sticky", top: "0.75rem", zIndex: 30, backdropFilter: "blur(16px)", background: "rgba(11, 18, 34, 0.9)" }}>
        <a href="#executive-synthesis" className="nav-tab" style={{ textDecoration: "none" }}>Executive Synthesis</a>
        <a href="#who-will-use" className="nav-tab" style={{ textDecoration: "none" }}>Q1: Who Will Use</a>
        <a href="#current-alternatives" className="nav-tab" style={{ textDecoration: "none" }}>Q2: Current Alternatives</a>
        <a href="#market-size" className="nav-tab" style={{ textDecoration: "none" }}>Q3: Market Size (TAM)</a>
        <a href="#why-better" className="nav-tab" style={{ textDecoration: "none" }}>Q4: Why Better</a>
        <a href="#will-he-pay" className="nav-tab" style={{ textDecoration: "none" }}>Q5: Will He Pay</a>
        <a href="#unsolved-problem" className="nav-tab" style={{ textDecoration: "none" }}>Q6: Unsolved Problem</a>
        <a href="#cbse-vs-ai" className="nav-tab" style={{ textDecoration: "none" }}>CBSE vs AI Evolution</a>
        <a href="#venture-brands" className="nav-tab" style={{ textDecoration: "none" }}>Venture Brands</a>
      </nav>

      {/* Executive Summary Card */}
      <section id="executive-synthesis" className="card" style={{ borderColor: "rgba(99, 102, 241, 0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span className="badge badge-blue">Foundational Premise</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
            Executive Synthesis: The Cradle-to-Career Educational Bottleneck
          </h2>
        </div>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.65, fontSize: "0.96rem", marginBottom: "1rem" }}>
          Education in India and worldwide remains fundamentally tethered to historical batch-processing models formulated during the industrial 
          revolution. Students are grouped strictly by chronological birth year rather than individual cognitive velocity, mathematical challenge-solving 
          ability, or conceptual mastery. When a student falls behind in a single prerequisite skill (such as negative integer operations or fractional 
          ratios in Class 6), the traditional school marches forward to linear equations in Class 7. This compounds unaddressed learning deficits 
          into permanent academic failure.
        </p>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.65, fontSize: "0.96rem", margin: 0 }}>
          EduAI replaces batch education with a unified, self-evolving Directed Acyclic Graph (DAG) spanning early childhood stimulation (0-3 years) 
          through competitive entrance examinations (JEE, NEET, CUET, UPSC, SAT). Each learner is placed into an automated, day-level adaptive 
          schedule bounded by pediatric screen-time safety caps, ensuring that no child moves to higher-order challenges without foundational mastery.
        </p>
      </section>

      {/* Question 1: Who will use? */}
      <section id="who-will-use" className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span className="badge badge-purple">Question 1</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
            Who will use this product?
          </h2>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.94rem", lineHeight: 1.6 }}>
          EduAI is engineered for five distinct, highly motivated user segments spanning the cradle-to-career learning journey:
        </p>
        <div className="grid-3" style={{ marginTop: "1rem" }}>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <span className="badge badge-blue">Segment 1</span>
            <h3 style={{ fontSize: "1.05rem", color: "#38bdf8", marginTop: "0.4rem" }}>Aspiring Middle-Class Parents (Classes 1-10)</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Parents seeking academic excellence without subjecting 10-year-olds to tuition factories. They require a verifiable daily dashboard, 
              guaranteed screen-time limits, bilingual English/Hindi support, and clear evidence of school syllabus mastery.
            </p>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <span className="badge badge-green">Segment 2</span>
            <h3 style={{ fontSize: "1.05rem", color: "#34d399", marginTop: "0.4rem" }}>Competitive Exam Aspirants (Classes 8-12)</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Tier-2, Tier-3, and rural students who cannot relocate to Kota or pay INR 2,00,000 annually. They require rigorous problem sets 
              calibrated to actual NTA patterns (JEE, NEET, CUET) with step-by-step diagnostic feedback.
            </p>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <span className="badge badge-warn">Segment 3</span>
            <h3 style={{ fontSize: "1.05rem", color: "#fbbf24", marginTop: "0.4rem" }}>Homeschoolers &amp; NIOS Open Candidates</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Families stepping off the conventional school assembly line. Under National Institute of Open Schooling (NIOS) OBE, 
              Secondary, and Sr. Secondary frameworks, they require an end-to-end accredited curriculum with self-paced mastery.
            </p>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <span className="badge badge-cyan">Segment 4</span>
            <h3 style={{ fontSize: "1.05rem", color: "#22d3ee", marginTop: "0.4rem" }}>Global Study-Abroad Candidates (SAT, ACT, IELTS)</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Indian and international students targeting undergraduate or postgraduate programs abroad who need integrated English 
              rhetoric and standardized quantitative problem-solving built directly into their high school years.
            </p>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <span className="badge badge-purple">Segment 5</span>
            <h3 style={{ fontSize: "1.05rem", color: "#c084fc", marginTop: "0.4rem" }}>Early Childhood Caregivers (Ages 0-3 &amp; Nursery-UKG)</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Parents navigating early brain development. In compliance with MWCD Navchetana 2024, they receive offline, 
              play-based, screen-free caregiver activity routines for motor, sensory, and language stimulation.
            </p>
          </div>
        </div>
      </section>

      {/* Question 2: What does he use currently? */}
      <section id="current-alternatives" className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span className="badge badge-purple">Question 2</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
            What does he use currently?
          </h2>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.94rem", lineHeight: 1.6 }}>
          Currently, students and parents are forced into an uncoordinated patchwork of fragmented, expensive, and stressful alternatives:
        </p>
        <div style={{ overflowX: "auto", marginTop: "1rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "var(--surface-elevated)", color: "var(--text)", borderBottom: "2px solid var(--border)" }}>
                <th style={{ padding: "0.85rem 1rem" }}>Current Alternative</th>
                <th style={{ padding: "0.85rem 1rem" }}>Annual Cost</th>
                <th style={{ padding: "0.85rem 1rem" }}>Core Failure / Bottleneck</th>
                <th style={{ padding: "0.85rem 1rem" }}>EduAI Solution Advantage</th>
              </tr>
            </thead>
            <tbody style={{ color: "var(--text-secondary)" }}>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#ffffff" }}>Traditional Private School</td>
                <td style={{ padding: "0.85rem 1rem" }}>INR 50,000 to 2,50,000</td>
                <td style={{ padding: "0.85rem 1rem" }}>1:40 batch ratio; pace set for the median; no individualized remediation.</td>
                <td style={{ padding: "0.85rem 1rem", color: "#34d399", fontWeight: 600 }}>1:1 cognitive diagnostic and dynamic pacing for every micro-skill.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#ffffff" }}>Offline Coaching Factories (Kota/Allen/Aakash)</td>
                <td style={{ padding: "0.85rem 1rem" }}>INR 1,50,000 to 3,50,000 + Living</td>
                <td style={{ padding: "0.85rem 1rem" }}>Extreme psychological pressure, geographic relocation, high burnout rate.</td>
                <td style={{ padding: "0.85rem 1rem", color: "#34d399", fontWeight: 600 }}>Democratized access at home; adaptive challenge tiers; psychological safety.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#ffffff" }}>Legacy EdTech Video Apps (Byju, PW, Vedantu)</td>
                <td style={{ padding: "0.85rem 1rem" }}>INR 15,000 to 70,000</td>
                <td style={{ padding: "0.85rem 1rem" }}>Passive 60-minute video lectures; excessive screen time; zero daily timetable logic.</td>
                <td style={{ padding: "0.85rem 1rem", color: "#34d399", fontWeight: 600 }}>Active 5-step NCF loop (Adhiti to Prasar); 30-min caps; offline exercises.</td>
              </tr>
              <tr>
                <td style={{ padding: "0.85rem 1rem", fontWeight: 700, color: "#ffffff" }}>Unstructured YouTube &amp; Telegram Piracy</td>
                <td style={{ padding: "0.85rem 1rem" }}>Free (High Attention Cost)</td>
                <td style={{ padding: "0.85rem 1rem" }}>No syllabus alignment; no diagnostics; high algorithm distraction and dopamine traps.</td>
                <td style={{ padding: "0.85rem 1rem", color: "#34d399", fontWeight: 600 }}>Curated, verified primary syllabus spine with zero advertisement traps.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Question 3: How many users face this problem? */}
      <section id="market-size" className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span className="badge badge-purple">Question 3</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
            How many users face this problem? (Empirical TAM/SAM/SOM Sizing)
          </h2>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.94rem", lineHeight: 1.6 }}>
          The addressable population is quantified using official datasets from the Ministry of Education (UDISE+), 
          National Testing Agency (NTA), and Open Doors International Student Census:
        </p>
        <div className="grid-3" style={{ marginTop: "1rem" }}>
          <div style={{ background: "var(--surface-elevated)", padding: "1.35rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <span className="badge badge-blue">TAM</span>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", margin: "0.4rem 0" }}>260 Million K-12 Students</div>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
              India has 1.48 million schools and 260 million enrolled students across Central, State, and Open Boards (UDISE+ 2022-23). 
              Over 95 million are in private schools or seeking supplementary tutoring.
            </p>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.35rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <span className="badge badge-green">SAM</span>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", margin: "0.4rem 0" }}>28.5 Million High-Intent Learners</div>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
              Composed of 16M students in CBSE/ICSE English-medium schools, 1.4M JEE Main applicants, 2.4M NEET UG applicants, 
              1.4M CUET UG applicants, 1M UPSC candidates, and 2.7M NIOS/Open School candidates.
            </p>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.35rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <span className="badge badge-warn">SOM</span>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", margin: "0.4rem 0" }}>1.2 Million Early Adopters (Years 1-3)</div>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
              Digitally connected families in Tier-1 and Tier-2 cities spending INR 1,000 to 5,000 monthly on tuition, plus homeschoolers 
              seeking a formal, legally compliant AI schooling operating system.
            </p>
          </div>
        </div>
      </section>

      {/* Question 4: Why will your product be better? */}
      <section id="why-better" className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span className="badge badge-purple">Question 4</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
            Why will your product be better? (Core Architectural Moats)
          </h2>
        </div>
        <div className="grid-2" style={{ marginTop: "1rem" }}>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "1.05rem", color: "#818cf8", marginTop: 0 }}>1. Unified 16-Stage DAG Skill Graph</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Instead of treating Class 6, Class 10, and JEE as isolated silos, every chapter connects into a single continuous 
              prerequisite graph. If a Class 11 physics student fails Newton third law calculations, EduAI traces back to Class 7 
              balanced forces and repairs the root deficit instantly.
            </p>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "1.05rem", color: "#818cf8", marginTop: 0 }}>2. Day-Level Calendar with Challenge IQ Rebalancing</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Not a static video playlist. Learning is organized into an hour-by-hour calendar. Daily assignments evaluate challenge-solving 
              ability and IQ indices; when a student scores below 60%, the calendar automatically shifts tomorrow schedule to insert 
              targeted concept repair blocks.
            </p>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "1.05rem", color: "#818cf8", marginTop: 0 }}>3. Zero Hallucination, Official Primary Source Grounding</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Every syllabus code, unit weight, and textbook title is anchored in official government documents (NCF-SE 2023, NCERT NSTC 2023, 
              CBSE Curriculum 2026-27). Gaps are labeled explicitly rather than hallucinated.
            </p>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "1.05rem", color: "#818cf8", marginTop: 0 }}>4. Pediatric Screen-Time Guardrails</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Strict compliance with Indian Academy of Pediatrics (IAP 2022) guidelines: 0 min for under 3s, 30 min for Nursery-UKG, 
              60 min for Middle Stage. Balances digital quizzes with offline pen-and-paper and physical motor tasks.
            </p>
          </div>
        </div>
      </section>

      {/* Question 5: Will he pay? */}
      <section id="will-he-pay" className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span className="badge badge-purple">Question 5</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
            Will he pay? (Willingness to Pay &amp; Unit Economics)
          </h2>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.94rem", lineHeight: 1.6 }}>
          Yes, with overwhelming empirical backing. In India, education is culturally prioritized as the single highest-ROI family investment:
        </p>
        <ul style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65, paddingLeft: "1.25rem" }}>
          <li><strong>Household Wallet Share:</strong> The NSSO 75th Round demonstrates that Indian middle-class families spend 15% to 30% of total disposable income on private tutoring and school fees.</li>
          <li><strong>Substitution Economics:</strong> EduAI at INR 799/month (INR 9,588/year) replaces INR 36,000 to 1,50,000 in fragmented local coaching, delivering an immediate 75% to 90% cost savings for parents with demonstrably superior cognitive placement.</li>
          <li><strong>Freemium Tier:</strong> Core NCF-SE syllabus skeleton and basic diagnostic remain permanently accessible; premium subscription unlocks daily adaptive timetable rebalancing, AI Socratic mentor, and competitive track branches.</li>
        </ul>
        <div className="grid-3" style={{ marginTop: "1rem" }}>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Tier 1: Foundational Access</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ffffff", margin: "0.3rem 0" }}>Free Forever</div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Curriculum explorer, official textbooks list, basic diagnostic, offline worksheets.</div>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid #6366f1" }}>
            <div style={{ fontSize: "0.8rem", color: "#818cf8", fontWeight: 700 }}>Tier 2: AI Individual School</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ffffff", margin: "0.3rem 0" }}>INR 799 / month</div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Day-level adaptive timetable, cognitive IQ challenges, bilingual loop, parent report card.</div>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid #10b981" }}>
            <div style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: 700 }}>Tier 3: Competitive &amp; Global</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ffffff", margin: "0.3rem 0" }}>INR 1,499 / month</div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>JEE/NEET/UPSC/SAT tracks, full mock exam engine with step-by-step AI marking rubrics.</div>
          </div>
        </div>
      </section>

      {/* Question 6: What is the real problem not solved right now? */}
      <section id="unsolved-problem" className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span className="badge badge-purple">Question 6</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
            What is the real problem not solved right now?
          </h2>
        </div>
        <div style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.35)", borderRadius: "10px", padding: "1.1rem", marginBottom: "1.25rem" }}>
          <p style={{ margin: 0, color: "#fca5a5", fontSize: "0.95rem", lineHeight: 1.6, fontWeight: 600 }}>
            The fundamental unresolved problem in education is the Mismatch of Biological Velocity: 
            Children learn at completely different speeds across different cognitive domains, but schools enforce a rigid, 
            calendar-driven synchronized march.
          </p>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.94rem", lineHeight: 1.65 }}>
          A child can be two years ahead in spatial geometry while struggling with signed integers. In current schools, 
          that child is either bored to tears or left behind in confusion. No teacher managing 45 children can redesign 
          45 individual daily timetables every morning. 
          EduAI solves this by computing a student cognitive state across thousands of micro-skills and assembling a bespoke 
          daily schedule every dawn, recalibrated dynamically based on every challenge answer submitted.
        </p>
      </section>

      {/* Regulatory Science: CBSE vs AI Evolution */}
      <section id="cbse-vs-ai" className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span className="badge badge-green">Regulatory Science</span>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>
            How CBSE and NCERT Decide Syllabi vs. EduAI Self-Evolving AI
          </h2>
        </div>

        <div className="grid-2" style={{ marginTop: "1rem" }}>
          {/* Left: Official Human Process */}
          <div style={{ background: "var(--surface-elevated)", padding: "1.35rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "1.1rem", color: "#f59e0b", marginTop: 0 }}>
              How CBSE &amp; NCERT Formulate Syllabi (Human Cycle: 5-10 Years)
            </h3>
            <ol style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
              <li><strong>Curricular Goals (CGs):</strong> National steering committees define broad educational goals derived from National Education Policy (NEP 2020).</li>
              <li><strong>Competency Mapping (Cs):</strong> High-powered committees (like NSTC 2023) translate goals into stage-wise observable competencies.</li>
              <li><strong>Learning Outcomes (LOs):</strong> Subject focus groups map each competency to grade-level outcomes and author textbooks (*Ganita Prakash*, *Curiosity*).</li>
              <li><strong>Field Piloting &amp; Feedback:</strong> Draft textbooks are piloted in select Kendriya Vidyalayas and Navodaya Vidyalayas; feedback takes 1 to 2 years.</li>
              <li><strong>Annual Board Circulars:</strong> CBSE issues rationalization and deletion circulars annually (e.g. Circular Acad-45/2024), leaving schools scrambling.</li>
            </ol>
          </div>

          {/* Right: AI Minute-by-Minute Process */}
          <div style={{ background: "var(--surface-elevated)", padding: "1.35rem", borderRadius: "12px", border: "1px solid #6366f1" }}>
            <h3 style={{ fontSize: "1.1rem", color: "#818cf8", marginTop: 0 }}>
              How EduAI Self-Evolving Engine Works (AI Cycle: Minute-by-Minute)
            </h3>
            <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
              <li><strong>Level 1 (Autonomous Micro-Tuning):</strong> Monitors real-time error rates across millions of challenge submissions. If 70% of students struggle on a concept, hint ladders and prerequisite links are adjusted dynamically.</li>
              <li><strong>Level 2 (Diagnostic Recalibration):</strong> Re-weights item difficulty parameters based on empirical item response theory (IRT) curves.</li>
              <li><strong>Level 3 (Regulatory Ingestion):</strong> Scrapes and parses official CBSE and NTA academic circulars within minutes of publication, marking syllabus additions or deletions automatically.</li>
              <li><strong>Level 4 (Prerequisite Edge Rewiring):</strong> Automatically discovers unmapped concept dependencies when students exhibiting high performance on skill A consistently fail skill B.</li>
              <li><strong>Level 5 (Human-in-the-Loop Governance):</strong> Flags major policy changes for educational board approval before pushing live to student timetables.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Venture Naming Recommendations */}
      <section id="venture-brands" className="card">
        <h2 style={{ fontSize: "1.4rem", color: "#ffffff", marginTop: 0, marginBottom: "0.75rem" }}>
          Recommended Venture Brand Names
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.94rem", lineHeight: 1.6 }}>
          Per the initial venture brief, here is the strategic naming architecture:
        </p>
        <div className="grid-2" style={{ marginTop: "1rem" }}>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid #6366f1" }}>
            <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#818cf8" }}>EveryYear</div>
            <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginTop: "0.4rem", lineHeight: 1.5 }}>
              Highlights the individual year-by-year plan covering 0-3 through Class 12. Friendly, universal, and memorable.
            </div>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid #10b981" }}>
            <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#34d399" }}>EduAI (Current Repo)</div>
            <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginTop: "0.4rem", lineHeight: 1.5 }}>
              Clean, authoritative, and direct. Signals cutting-edge AI infrastructure and multi-platform native intelligence.
            </div>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid #f59e0b" }}>
            <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fbbf24" }}>Vidyapath AI</div>
            <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginTop: "0.4rem", lineHeight: 1.5 }}>
              Culturally resonant in India. Translates to "The Path of Knowledge", bridging traditional Indian schooling with AI personalization.
            </div>
          </div>
          <div style={{ background: "var(--surface-elevated)", padding: "1.25rem", borderRadius: "12px", border: "1px solid #ec4899" }}>
            <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f472b6" }}>AarohAI</div>
            <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginTop: "0.4rem", lineHeight: 1.5 }}>
              From Sanskrit 'Aarohan' (ascending / progressive ascent). Perfect metaphor for the step-by-step mastery graph.
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer style={{ textAlign: "center", padding: "2.5rem 0", borderTop: "1px solid var(--border)", marginTop: "2rem" }}>
        <Link href="/" className="control-pill" style={{ display: "inline-block", background: "var(--primary)", color: "#ffffff", padding: "0.75rem 2rem", borderRadius: "10px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
          Explore Live Platform Dashboard →
        </Link>
        <div style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          EduAI · Grounded in NCF-SE 2023, NCERT, CBSE Circulars, and DPDP 2023 Guidelines
        </div>
      </footer>
    </div>
  );
}
