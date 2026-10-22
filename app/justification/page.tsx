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
    <main style={{ minHeight: "100vh", background: "#0a0e17", color: "#f8fafc", padding: "1.5rem 1rem", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Navigation Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1rem" }}>
          <div>
            <Link href="/" style={{ color: "#818cf8", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              ← Return to Main School Workspace
            </Link>
            <h1 style={{ fontSize: "2rem", margin: "0.5rem 0 0.2rem 0", fontWeight: 800, color: "#ffffff" }}>
              Venture Justification &amp; Strategic Thesis
            </h1>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.95rem" }}>
              Six Core Market Inquiries, Empirical TAM Quantification, CBSE Curriculum Formulation Science, and Minute-by-Minute AI Evolution
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ background: "#4338ca", color: "#e0e7ff", padding: "0.35rem 0.75rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700 }}>
              Official Venture Dossier
            </span>
          </div>
        </div>

        {/* Quick Jump Navigation */}
        <nav aria-label="Dossier Quick Jump" style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.75rem", background: "#0d1527", padding: "0.6rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <a href="#executive-synthesis" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderRadius: "6px", background: "rgba(255,255,255,0.04)" }}>Executive Synthesis</a>
          <a href="#who-will-use" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderRadius: "6px", background: "rgba(255,255,255,0.04)" }}>Q1: Who Will Use</a>
          <a href="#current-alternatives" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderRadius: "6px", background: "rgba(255,255,255,0.04)" }}>Q2: Current Alternatives</a>
          <a href="#market-size" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderRadius: "6px", background: "rgba(255,255,255,0.04)" }}>Q3: Market Size (TAM)</a>
          <a href="#why-better" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderRadius: "6px", background: "rgba(255,255,255,0.04)" }}>Q4: Why Better</a>
          <a href="#will-he-pay" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderRadius: "6px", background: "rgba(255,255,255,0.04)" }}>Q5: Will He Pay</a>
          <a href="#unsolved-problem" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderRadius: "6px", background: "rgba(255,255,255,0.04)" }}>Q6: Unsolved Problem</a>
          <a href="#cbse-vs-ai" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderRadius: "6px", background: "rgba(255,255,255,0.04)" }}>CBSE vs AI Evolution</a>
          <a href="#venture-brands" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.78rem", padding: "0.35rem 0.65rem", borderRadius: "6px", background: "rgba(255,255,255,0.04)" }}>Venture Brands</a>
        </nav>

        {/* Executive Summary Card */}
        <section id="executive-synthesis" style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.25rem", color: "#38bdf8", marginTop: 0, marginBottom: "0.75rem" }}>
            Executive Synthesis: The Cradle-to-Career Educational Problem
          </h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.6, margin: "0 0 1rem 0", fontSize: "0.95rem" }}>
            Education in India and globally is structured around historical batch-processing models designed during the industrial revolution. 
            Students are grouped strictly by chronological birth year rather than individual cognitive velocity, mathematical challenge-solving 
            ability, or conceptual mastery. When a student falls behind in a prerequisite skill (such as fractional operations in Class 6), 
            the school system marches forward to linear algebra in Class 7, compounding learning deficits into permanent failure. 
            EduAI solves this foundational bottleneck by constructing a unified, self-evolving Directed Acyclic Graph (DAG) spanning 
            early childhood stimulation (0-3 years) through competitive entrance exams (JEE, NEET, UPSC, SAT), placing each child into 
            a day-level adaptive timetable bounded by pediatric screen-time safety caps.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ background: "#1f2937", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid #6366f1" }}>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>Total K-12 Population</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff" }}>260 Million</div>
              <div style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>India UDISE+ Official Census</div>
            </div>
            <div style={{ background: "#1f2937", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid #10b981" }}>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>Annual Coaching Spend</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff" }}>$7.2 Billion</div>
              <div style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>NSSO 75th Round Household Survey</div>
            </div>
            <div style={{ background: "#1f2937", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid #f59e0b" }}>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>Batch Teacher Ratio</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff" }}>1 : 40+</div>
              <div style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>Average Urban Classroom Bottleneck</div>
            </div>
            <div style={{ background: "#1f2937", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid #ec4899" }}>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>EduAI Daily Screen Guard</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff" }}>0 to 90 min</div>
              <div style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>IAP Pediatric Guideline Compliance</div>
            </div>
          </div>
        </section>

        {/* Question 1: Who will use? */}
        <section id="who-will-use" style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ background: "#4f46e5", color: "#ffffff", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>
              Question 1
            </span>
            <h2 style={{ fontSize: "1.35rem", margin: 0, color: "#ffffff" }}>
              Who will use this product?
            </h2>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6 }}>
            EduAI serves five distinct, highly motivated user segments spanning the cradle-to-career continuum:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ background: "#1e293b", padding: "1.2rem", borderRadius: "8px", border: "1px solid #334155" }}>
              <h3 style={{ fontSize: "1rem", color: "#38bdf8", marginTop: 0 }}>1. Aspiring Middle-Class Parents (Classes 1-10)</h3>
              <p style={{ fontSize: "0.86rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                Parents seeking academic excellence without sending 10-year-olds to tuition factories. They need a verifiable daily dashboard, 
                guaranteed screen-time limits, bilingual English/Hindi support, and clear evidence of school syllabus mastery.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.2rem", borderRadius: "8px", border: "1px solid #334155" }}>
              <h3 style={{ fontSize: "1rem", color: "#34d399", marginTop: 0 }}>2. Competitive Exam Aspirants (Classes 8-12: JEE, NEET, CUET)</h3>
              <p style={{ fontSize: "0.86rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                Tier-2, Tier-3, and rural students who cannot relocate to Kota, Hyderabad, or Delhi, or afford INR 2,00,000 per year coaching fees. 
                They require rigorous challenge-level problem sets calibrated to actual NTA patterns with step-by-step diagnostic feedback.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.2rem", borderRadius: "8px", border: "1px solid #334155" }}>
              <h3 style={{ fontSize: "1rem", color: "#f472b6", marginTop: 0 }}>3. Homeschoolers &amp; NIOS Open Candidates</h3>
              <p style={{ fontSize: "0.86rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                Families stepping off the conventional school assembly line. Under National Institute of Open Schooling (NIOS) OBE, 
                Secondary, and Sr. Secondary frameworks, they require an end-to-end accredited curriculum with self-paced mastery.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.2rem", borderRadius: "8px", border: "1px solid #334155" }}>
              <h3 style={{ fontSize: "1rem", color: "#fbbf24", marginTop: 0 }}>4. Global Study-Abroad Candidates (SAT, ACT, IELTS, TOEFL)</h3>
              <p style={{ fontSize: "0.86rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                Indian and international students targeting undergraduate or postgraduate programs abroad who need integrated English 
                rhetoric and standardized quantitative problem-solving built directly into their high school years.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.2rem", borderRadius: "8px", border: "1px solid #334155" }}>
              <h3 style={{ fontSize: "1rem", color: "#a78bfa", marginTop: 0 }}>5. Early Childhood Caregivers (Ages 0-3 &amp; Nursery-UKG)</h3>
              <p style={{ fontSize: "0.86rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                Mothers and fathers navigating early brain development. In compliance with MWCD Navchetana 2024, they receive offline, 
                play-based, screen-free caregiver activity routines for motor, sensory, and language stimulation.
              </p>
            </div>
          </div>
        </section>

        {/* Question 2: What does he use currently? */}
        <section id="current-alternatives" style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ background: "#4f46e5", color: "#ffffff", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>
              Question 2
            </span>
            <h2 style={{ fontSize: "1.35rem", margin: 0, color: "#ffffff" }}>
              What does he use currently?
            </h2>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Currently, students and parents are forced into an uncoordinated patchwork of fragmented, expensive, and stressful alternatives:
          </p>
          <div style={{ overflowX: "auto", marginTop: "1rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#1e293b", color: "#cbd5e1", borderBottom: "2px solid #334155" }}>
                  <th style={{ padding: "0.75rem 1rem" }}>Current Alternative</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Annual Cost</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Core Failure / Bottleneck</th>
                  <th style={{ padding: "0.75rem 1rem" }}>EduAI Solution Advantage</th>
                </tr>
              </thead>
              <tbody style={{ color: "#94a3b8" }}>
                <tr style={{ borderBottom: "1px solid #1f2937" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#ffffff" }}>Traditional Private School</td>
                  <td style={{ padding: "0.75rem 1rem" }}>INR 50,000 to 2,50,000</td>
                  <td style={{ padding: "0.75rem 1rem" }}>1:40 batch ratio; pace set for the median; no individualized remediation.</td>
                  <td style={{ padding: "0.75rem 1rem", color: "#34d399" }}>1:1 cognitive diagnostic and dynamic pacing for every micro-skill.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #1f2937" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#ffffff" }}>Offline Coaching Factories (Kota/Allen/Aakash)</td>
                  <td style={{ padding: "0.75rem 1rem" }}>INR 1,50,000 to 3,50,000 + Living</td>
                  <td style={{ padding: "0.75rem 1rem" }}>Extreme psychological pressure, geographic barrier, high drop-out rate.</td>
                  <td style={{ padding: "0.75rem 1rem", color: "#34d399" }}>Democratized access at home; adaptive IQ tiers; psychological safety.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #1f2937" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#ffffff" }}>Legacy EdTech Video Apps (Byju, PW, Vedantu)</td>
                  <td style={{ padding: "0.75rem 1rem" }}>INR 15,000 to 70,000</td>
                  <td style={{ padding: "0.75rem 1rem" }}>Passive 60-minute video lectures; excessive screen time; zero daily timetable logic.</td>
                  <td style={{ padding: "0.75rem 1rem", color: "#34d399" }}>Active 5-step NCF loop (Adhiti to Prasar); 30-min caps; offline exercises.</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#ffffff" }}>Unstructured YouTube &amp; Telegram Piracy</td>
                  <td style={{ padding: "0.75rem 1rem" }}>Free (High Attention Cost)</td>
                  <td style={{ padding: "0.75rem 1rem" }}>No syllabus alignment; no diagnostics; high algorithm distraction and dopamine traps.</td>
                  <td style={{ padding: "0.75rem 1rem", color: "#34d399" }}>Curated, verified primary syllabus spine with zero advertisement traps.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Question 3: How many users face this problem? */}
        <section id="market-size" style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ background: "#4f46e5", color: "#ffffff", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>
              Question 3
            </span>
            <h2 style={{ fontSize: "1.35rem", margin: 0, color: "#ffffff" }}>
              How many users face this problem? (Market Sizing)
            </h2>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6 }}>
            The addressable population is quantified using official datasets from the Ministry of Education (UDISE+), 
            National Testing Agency (NTA), and Open Doors International Student Census:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "0.8rem", color: "#a5b4fc", fontWeight: 700, textTransform: "uppercase" }}>Total Addressable Market (TAM)</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", margin: "0.3rem 0" }}>260 Million K-12 Students</div>
              <p style={{ fontSize: "0.84rem", color: "#94a3b8", margin: 0, lineHeight: 1.45 }}>
                India has 1.48 million schools and 260 million enrolled students across Central, State, and Open Boards (UDISE+ 2022-23). 
                Over 95 million are in private schools or seeking supplementary tutoring.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: 700, textTransform: "uppercase" }}>Serviceable Addressable Market (SAM)</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", margin: "0.3rem 0" }}>28.5 Million High-Intent Learners</div>
              <p style={{ fontSize: "0.84rem", color: "#94a3b8", margin: 0, lineHeight: 1.45 }}>
                Composed of 16M students in CBSE/ICSE English-medium schools, 1.4M JEE Main applicants, 2.4M NEET UG applicants, 
                1.4M CUET UG applicants, 1M UPSC candidates, and 2.7M NIOS/Open School candidates.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "0.8rem", color: "#f59e0b", fontWeight: 700, textTransform: "uppercase" }}>Serviceable Obtainable Market (SOM)</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", margin: "0.3rem 0" }}>1.2 Million Early Adopters (Years 1-3)</div>
              <p style={{ fontSize: "0.84rem", color: "#94a3b8", margin: 0, lineHeight: 1.45 }}>
                Digitally connected families in Tier-1 and Tier-2 cities spending INR 1,000 to 5,000 monthly on tuition, plus homeschoolers 
                seeking a formal, legally compliant AI schooling operating system.
              </p>
            </div>
          </div>
        </section>

        {/* Question 4: Why will your product be better? */}
        <section id="why-better" style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ background: "#4f46e5", color: "#ffffff", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>
              Question 4
            </span>
            <h2 style={{ fontSize: "1.35rem", margin: 0, color: "#ffffff" }}>
              Why will your product be better? (Core Architectural Moat)
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ background: "#1e293b", padding: "1.2rem", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "0.95rem", color: "#818cf8", marginTop: 0 }}>1. Unified 16-Stage DAG Skill Graph</h3>
              <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                Instead of treating Class 6, Class 10, and JEE as separate universes, every chapter connects into a single continuous 
                prerequisite tree. If a Class 11 physics student fails Newton third law calculations, EduAI traces back to Class 7 
                balanced forces and repairs the root deficit instantly.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.2rem", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "0.95rem", color: "#818cf8", marginTop: 0 }}>2. Day-Level Calendar with Challenge IQ Rebalancing</h3>
              <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                Not a static video playlist. Learning is organized into an hour-by-hour calendar. Daily assignments evaluate challenge-solving 
                ability and IQ indices; when a student scores below 60%, the calendar automatically shifts tomorrow schedule to insert 
                targeted concept repair blocks.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.2rem", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "0.95rem", color: "#818cf8", marginTop: 0 }}>3. Zero Hallucination, Official Primary Source Grounding</h3>
              <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                Every syllabus code, unit weight, and textbook title is anchored in official government documents (NCF-SE 2023, NCERT NSTC 2023, 
                CBSE Curriculum 2026-27). Gaps are labeled explicitly rather than hallucinated.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.2rem", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "0.95rem", color: "#818cf8", marginTop: 0 }}>4. Pediatric Screen-Time Guardrails</h3>
              <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                Strict compliance with Indian Academy of Pediatrics (IAP 2022) guidelines: 0 min for under 3s, 30 min for Nursery-UKG, 
                60 min for Middle Stage. Balances digital quizzes with offline pen-and-paper and physical motor tasks.
              </p>
            </div>
          </div>
        </section>

        {/* Question 5: Will he pay? */}
        <section id="will-he-pay" style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ background: "#4f46e5", color: "#ffffff", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>
              Question 5
            </span>
            <h2 style={{ fontSize: "1.35rem", margin: 0, color: "#ffffff" }}>
              Will he pay? (Willingness to Pay &amp; Unit Economics)
            </h2>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Yes, with overwhelming empirical backing. In India, education is culturally prioritized as the single highest-ROI family investment:
          </p>
          <ul style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.6, paddingLeft: "1.2rem" }}>
            <li><strong>Household Wallet Share:</strong> The NSSO 75th Round demonstrates that Indian middle-class families spend 15% to 30% of total disposable income on private tutoring and school fees.</li>
            <li><strong>Substitution Economics:</strong> EduAI at INR 799/month (INR 9,588/year) replaces INR 36,000 to 1,50,000 in fragmented local coaching, delivering an immediate 75% to 90% cost savings for parents with demonstrably superior cognitive placement.</li>
            <li><strong>Freemium Tier:</strong> Core NCF-SE syllabus skeleton and basic diagnostic remain permanently accessible; premium subscription unlocks daily adaptive timetable rebalancing, AI Socratic mentor, and competitive track branches.</li>
          </ul>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Tier 1: Foundational Access</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff" }}>Free Forever</div>
              <div style={{ fontSize: "0.78rem", color: "#cbd5e1", marginTop: "0.4rem" }}>Curriculum explorer, official textbooks list, basic diagnostic, offline worksheets.</div>
            </div>
            <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px", border: "1px solid #6366f1" }}>
              <div style={{ fontSize: "0.8rem", color: "#818cf8", fontWeight: 700 }}>Tier 2: AI Individual School</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff" }}>INR 799 / month</div>
              <div style={{ fontSize: "0.78rem", color: "#cbd5e1", marginTop: "0.4rem" }}>Day-level adaptive timetable, cognitive IQ challenges, bilingual loop, parent report card.</div>
            </div>
            <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px", border: "1px solid #10b981" }}>
              <div style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: 700 }}>Tier 3: Competitive &amp; Global</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff" }}>INR 1,499 / month</div>
              <div style={{ fontSize: "0.78rem", color: "#cbd5e1", marginTop: "0.4rem" }}>JEE/NEET/UPSC/SAT tracks, full mock exam engine with step-by-step AI marking rubrics.</div>
            </div>
          </div>
        </section>

        {/* Question 6: What is the real problem not solved right now? */}
        <section id="unsolved-problem" style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ background: "#4f46e5", color: "#ffffff", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>
              Question 6
            </span>
            <h2 style={{ fontSize: "1.35rem", margin: 0, color: "#ffffff" }}>
              What is the real problem not solved right now?
            </h2>
          </div>
          <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
            <p style={{ margin: 0, color: "#fca5a5", fontSize: "0.92rem", lineHeight: 1.5, fontWeight: 500 }}>
              The fundamental unresolved problem in education is the <strong>Mismatch of Biological Velocity</strong>: 
              Children learn at completely different speeds across different cognitive domains, but schools enforce a rigid, 
              calendar-driven synchronized march.
            </p>
          </div>
          <p style={{ color: "#cbd5e1", fontSize: "0.92rem", lineHeight: 1.6 }}>
            A child can be two years ahead in spatial geometry while struggling with signed integers. In current schools, 
            that child is either bored to tears or left behind in confusion. No teacher managing 45 children can redesign 
            45 individual daily timetables every morning. 
            EduAI solves this by computing a student cognitive state across thousands of micro-skills and assembling a bespoke 
            daily schedule every dawn, recalibrated dynamically based on every challenge answer submitted.
          </p>
        </section>

        {/* How CBSE Prepares Syllabus & Self-Evolving Engine */}
        <section id="cbse-vs-ai" style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ background: "#059669", color: "#ffffff", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>
              Regulatory Science
            </span>
            <h2 style={{ fontSize: "1.35rem", margin: 0, color: "#ffffff" }}>
              How CBSE and NCERT Decide Syllabi vs. EduAI Self-Evolving AI
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem", marginTop: "1rem" }}>
            {/* Left: Official Human Process */}
            <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px", border: "1px solid #334155" }}>
              <h3 style={{ fontSize: "1.05rem", color: "#f59e0b", marginTop: 0 }}>
                How CBSE &amp; NCERT Formulate Syllabi (Human Cycle: 5-10 Years)
              </h3>
              <ol style={{ paddingLeft: "1.2rem", color: "#cbd5e1", fontSize: "0.84rem", lineHeight: 1.55 }}>
                <li><strong>Curricular Goals (CGs):</strong> National steering committees define broad educational goals derived from National Education Policy (NEP 2020).</li>
                <li><strong>Competency Mapping (Cs):</strong> High-powered committees (like NSTC 2023) translate goals into stage-wise observable competencies.</li>
                <li><strong>Learning Outcomes (LOs):</strong> Subject focus groups map each competency to grade-level outcomes and author textbooks (*Ganita Prakash*, *Curiosity*).</li>
                <li><strong>Field Piloting &amp; Feedback:</strong> Draft textbooks are piloted in select Kendriya Vidyalayas and Navodaya Vidyalayas; feedback takes 1 to 2 years.</li>
                <li><strong>Annual Board Circulars:</strong> CBSE issues rationalization and deletion circulars annually (e.g. Circular Acad-45/2024), leaving schools scrambling.</li>
              </ol>
            </div>

            {/* Right: AI Minute-by-Minute Process */}
            <div style={{ background: "#1e293b", padding: "1.25rem", borderRadius: "8px", border: "1px solid #6366f1" }}>
              <h3 style={{ fontSize: "1.05rem", color: "#818cf8", marginTop: 0 }}>
                How EduAI Self-Evolving Engine Works (AI Cycle: Minute-by-Minute)
              </h3>
              <ul style={{ paddingLeft: "1.2rem", color: "#cbd5e1", fontSize: "0.84rem", lineHeight: 1.55 }}>
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
        <section id="venture-brands" style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.35rem", color: "#ffffff", marginTop: 0, marginBottom: "0.75rem" }}>
            Recommended Venture Brand Names
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.92rem", lineHeight: 1.6 }}>
            Per the initial venture brief, here is the strategic naming architecture:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px", border: "1px solid #6366f1" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#818cf8" }}>EveryYear</div>
              <div style={{ fontSize: "0.78rem", color: "#cbd5e1", marginTop: "0.3rem" }}>
                Highlights the individual year-by-year plan covering 0-3 through Class 12. Friendly, universal, and memorable.
              </div>
            </div>
            <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px", border: "1px solid #10b981" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#34d399" }}>EduAI (Current Repo)</div>
              <div style={{ fontSize: "0.78rem", color: "#cbd5e1", marginTop: "0.3rem" }}>
                Clean, authoritative, and direct. Signals cutting-edge AI infrastructure and multi-platform native intelligence.
              </div>
            </div>
            <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px", border: "1px solid #f59e0b" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fbbf24" }}>Vidyapath AI</div>
              <div style={{ fontSize: "0.78rem", color: "#cbd5e1", marginTop: "0.3rem" }}>
                Culturally resonant in India. Translates to "The Path of Knowledge", bridging traditional Indian schooling with AI personalization.
              </div>
            </div>
            <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "8px", border: "1px solid #ec4899" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f472b6" }}>AarohAI</div>
              <div style={{ fontSize: "0.78rem", color: "#cbd5e1", marginTop: "0.3rem" }}>
                From Sanskrit 'Aarohan' (ascending / progressive ascent). Perfect metaphor for the step-by-step mastery graph.
              </div>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <div style={{ textAlign: "center", padding: "2rem 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{ display: "inline-block", background: "#4f46e5", color: "#ffffff", padding: "0.75rem 1.75rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
            Explore Live Platform Dashboard →
          </Link>
          <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "#64748b" }}>
            EduAI · Verified against NCF-SE 2023, CBSE, NCERT, and DPDP 2023 Guidelines
          </div>
        </div>
      </div>
    </main>
  );
}
