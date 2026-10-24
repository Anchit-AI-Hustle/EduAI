"use client";

import React, { useMemo, useState } from "react";

// Concept prototype: a weekly Hindi board-practice test distributed through a
// newspaper's education page (QR) and results portal, monetised through
// sponsor slots, school packs and a paid parent mock. Nothing is stored.

type Tab = "student" | "revenue" | "fit";

interface Question {
  id: string;
  chapter: string;
  text: string;
  options: string[];
  answer: number;
  gap: string;
}

// UP Board Class 10 Mathematics follows the NCERT textbook.
const QUESTIONS: Question[] = [
  {
    id: "q1",
    chapter: "वास्तविक संख्याएँ",
    text: "96 और 404 का HCF (महत्तम समापवर्तक) क्या है?",
    options: ["2", "4", "8", "12"],
    answer: 1,
    gap: "कक्षा 6: अभाज्य गुणनखंड"
  },
  {
    id: "q2",
    chapter: "बहुपद",
    text: "x² − 5x + 6 के शून्यक कौन से हैं?",
    options: ["2 और 3", "−2 और −3", "1 और 6", "−1 और 6"],
    answer: 0,
    gap: "कक्षा 9: मध्य पद विभाजन से गुणनखंडन"
  },
  {
    id: "q3",
    chapter: "द्विघात समीकरण",
    text: "x² − 4x + 4 = 0 के मूलों की प्रकृति क्या है?",
    options: ["दो भिन्न वास्तविक मूल", "दो बराबर वास्तविक मूल", "कोई वास्तविक मूल नहीं", "तीन मूल"],
    answer: 1,
    gap: "कक्षा 9: बीजीय सर्वसमिकाएँ (a − b)²"
  },
  {
    id: "q4",
    chapter: "समांतर श्रेढ़ी",
    text: "समांतर श्रेढ़ी 2, 7, 12, ... का 10वाँ पद क्या है?",
    options: ["45", "47", "50", "52"],
    answer: 1,
    gap: "कक्षा 6 और 7: संख्या पैटर्न और नियम"
  },
  {
    id: "q5",
    chapter: "त्रिकोणमिति",
    text: "sin 30° × cos 60° का मान क्या है?",
    options: ["1/4", "1/2", "√3/4", "1"],
    answer: 0,
    gap: "कक्षा 10: मानक कोणों के मान, कक्षा 7: भिन्नों का गुणा"
  }
];

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const lakh = (n: number) => `₹${(n / 100000).toLocaleString("en-IN", { maximumFractionDigits: 1 })} lakh`;

const PANEL: React.CSSProperties = {
  background: "var(--surface-elevated)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "1rem"
};

function NumberField({
  id,
  label,
  value,
  onChange,
  step = 1,
  hint
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.3rem" }}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        style={{
          width: "100%",
          padding: "0.55rem 0.7rem",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          color: "var(--text)",
          fontSize: "0.95rem"
        }}
      />
      {hint && <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{hint}</div>}
    </div>
  );
}

export default function ParikshaSaathiPrototype() {
  const [tab, setTab] = useState<Tab>("student");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  // Revenue assumptions: every default is a pilot hypothesis, editable on screen.
  const [weeklyTakers, setWeeklyTakers] = useState(50000);
  const [weeks, setWeeks] = useState(30);
  const [sponsorFee, setSponsorFee] = useState(100000);
  const [schools, setSchools] = useState(200);
  const [studentsPerSchool, setStudentsPerSchool] = useState(300);
  const [schoolPrice, setSchoolPrice] = useState(100);
  const [parentConversion, setParentConversion] = useState(2);
  const [parentPrice, setParentPrice] = useState(99);

  const score = QUESTIONS.filter((q) => answers[q.id] === q.answer).length;
  const missed = QUESTIONS.filter((q) => answers[q.id] !== q.answer);
  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  const revenue = useMemo(() => {
    const sponsor = weeks * sponsorFee;
    const school = schools * studentsPerSchool * schoolPrice;
    const parent = weeklyTakers * (parentConversion / 100) * parentPrice;
    return { sponsor, school, parent, total: sponsor + school + parent };
  }, [weeks, sponsorFee, schools, studentsPerSchool, schoolPrice, weeklyTakers, parentConversion, parentPrice]);

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setStarted(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <nav aria-label="Prototype sections" className="nav-tabs">
        {(
          [
            ["student", "1. छात्र अनुभव (Student demo)"],
            ["revenue", "2. Revenue model"],
            ["fit", "3. Why it fits Amar Ujala"]
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`nav-tab ${tab === key ? "active" : ""}`}
            aria-pressed={tab === key}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === "student" && (
        <section className="card" aria-label="Student demo" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {!started && (
            <>
              <div style={{ ...PANEL, borderStyle: "dashed" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Print touchpoint (mock of the education page box)
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "0.6rem", flexWrap: "wrap" }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "8px",
                      background:
                        "repeating-conic-gradient(var(--text) 0% 25%, var(--surface) 0% 50%) 0 0 / 18px 18px",
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: "1 1 200px" }}>
                    <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>परीक्षा साथी: इस हफ़्ते का 10 मिनट टेस्ट</div>
                    <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                      यूपी बोर्ड कक्षा 10 गणित · 5 प्रश्न · QR स्कैन करें, तुरंत अध्याय-वार रिपोर्ट पाएँ
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ ...PANEL, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                <div>
                  <span className="badge badge-warn">Sponsor slot (example)</span>
                  <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.35rem" }}>
                    &quot;इस हफ़्ते का टेस्ट [प्रायोजक का नाम] के सहयोग से&quot;: one named sponsor per weekly test, booked like a print ad.
                  </div>
                </div>
              </div>

              <button type="button" className="btn btn-primary" onClick={() => setStarted(true)} style={{ alignSelf: "flex-start" }}>
                टेस्ट शुरू करें (Start the test)
              </button>
            </>
          )}

          {started && !submitted && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <h2 style={{ margin: 0, fontSize: "1.2rem" }}>कक्षा 10 गणित · साप्ताहिक टेस्ट</h2>
                <span className="badge badge-blue">
                  {Object.keys(answers).length} / {QUESTIONS.length} उत्तर दिए
                </span>
              </div>
              {QUESTIONS.map((q, qi) => (
                <fieldset key={q.id} style={{ ...PANEL, margin: 0 }}>
                  <legend style={{ fontSize: "0.78rem", color: "var(--text-muted)", padding: "0 0.3rem" }}>
                    प्रश्न {qi + 1} · {q.chapter}
                  </legend>
                  <div style={{ fontWeight: 600, marginBottom: "0.6rem", lineHeight: 1.5 }}>{q.text}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.5rem" }}>
                    {q.options.map((opt, oi) => {
                      const selected = answers[q.id] === oi;
                      return (
                        <label
                          key={oi}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.6rem 0.75rem",
                            minHeight: "44px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            border: selected ? "1.5px solid var(--primary)" : "1px solid var(--border)",
                            background: selected ? "var(--primary-light)" : "var(--surface)"
                          }}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            checked={selected}
                            onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
              <button
                type="button"
                className="btn btn-primary"
                disabled={!allAnswered}
                onClick={() => setSubmitted(true)}
                style={{ alignSelf: "flex-start", opacity: allAnswered ? 1 : 0.5 }}
              >
                {allAnswered ? "जमा करें और रिपोर्ट देखें" : "सभी प्रश्नों के उत्तर दें"}
              </button>
            </>
          )}

          {submitted && (
            <>
              <div style={{ ...PANEL, borderColor: "var(--primary)" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>आपका स्कोर</div>
                <div style={{ fontSize: "2rem", fontWeight: 800 }}>
                  {score} / {QUESTIONS.length}
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  {score === QUESTIONS.length
                    ? "शानदार! अगले हफ़्ते कठिन स्तर का टेस्ट आपका इंतज़ार करेगा।"
                    : "अंक से ज़्यादा ज़रूरी है: कौन सी पिछली कक्षा की कमी इन गलतियों की जड़ है।"}
                </div>
              </div>

              <div className="table-wrap">
                <table className="stack-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "var(--surface-elevated)" }}>
                      <th style={{ padding: "0.7rem" }}>अध्याय</th>
                      <th style={{ padding: "0.7rem" }}>परिणाम</th>
                      <th style={{ padding: "0.7rem" }}>कमी की जड़ (पिछली कक्षा)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {QUESTIONS.map((q) => {
                      const ok = answers[q.id] === q.answer;
                      return (
                        <tr key={q.id} style={{ borderBottom: "1px solid var(--border)" }}>
                          <td style={{ padding: "0.7rem", fontWeight: 600 }}>{q.chapter}</td>
                          <td data-label="परिणाम" style={{ padding: "0.7rem" }}>
                            <span className={ok ? "badge badge-green" : "badge badge-danger"}>{ok ? "सही" : "दोहराएँ"}</span>
                            {!ok && (
                              <span style={{ marginLeft: "0.4rem", color: "var(--text-muted)" }}>
                                सही उत्तर: {q.options[q.answer]}
                              </span>
                            )}
                          </td>
                          <td data-label="कमी की जड़" style={{ padding: "0.7rem", color: "var(--text-secondary)" }}>
                            {ok ? "कोई कमी नहीं" : q.gap}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {missed.length > 0 && (
                <div style={PANEL}>
                  <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>इस हफ़्ते के 3 छोटे कदम</div>
                  <ol style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    <li>{missed[0].gap} पर 10 मिनट का दोहराव</li>
                    <li>{missed[0].chapter} के 3 अभ्यास प्रश्न (रविवार के अख़बार में)</li>
                    <li>अगले बुधवार का टेस्ट: देखें कि कमी भरी या नहीं</li>
                  </ol>
                </div>
              )}

              <div className="grid-3">
                <div style={PANEL}>
                  <span className="badge badge-green">Free</span>
                  <div style={{ fontWeight: 700, margin: "0.4rem 0" }}>अभिभावक को रिपोर्ट</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Weekly WhatsApp summary, only after a parent gives verifiable consent.
                  </div>
                </div>
                <div style={PANEL}>
                  <span className="badge badge-blue">School pack</span>
                  <div style={{ fontWeight: 700, margin: "0.4rem 0" }}>स्कूल कोड जोड़ें</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    The teacher gets a class-level gap map; the school pays per student per year.
                  </div>
                </div>
                <div style={PANEL}>
                  <span className="badge badge-warn">Paid</span>
                  <div style={{ fontWeight: 700, margin: "0.4rem 0" }}>पूरा बोर्ड मॉक: {inr(parentPrice)}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Full-length board-pattern mock with a chapter-wise report, once per exam season.
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                Demo only: nothing is saved and no personal data is collected. Buttons above are illustrative.
              </p>
              <button type="button" className="btn" onClick={reset} style={{ alignSelf: "flex-start" }}>
                फिर से करें (Restart)
              </button>
            </>
          )}
        </section>
      )}

      {tab === "revenue" && (
        <section className="card" aria-label="Revenue model" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <h2 style={{ margin: "0 0 0.3rem 0", fontSize: "1.25rem" }}>Three revenue lines, one weekly test</h2>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Every number below is an editable pilot assumption, not a forecast. Change them to see year-one revenue.
            </p>
          </div>

          <div className="grid-3">
            <div style={{ ...PANEL, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              <div style={{ fontWeight: 700 }}>A. Sponsored weekly test</div>
              <NumberField id="weeks" label="Test weeks per year" value={weeks} onChange={setWeeks} hint="School-year weeks before boards" />
              <NumberField id="sponsor-fee" label="Sponsor fee per weekly test (₹)" value={sponsorFee} onChange={setSponsorFee} step={5000} hint="Sold by ad sales as a named slot" />
              <div style={{ fontWeight: 800, color: "#34d399" }}>{lakh(revenue.sponsor)}</div>
            </div>
            <div style={{ ...PANEL, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              <div style={{ fontWeight: 700 }}>B. School pack (B2B)</div>
              <NumberField id="schools" label="Schools signed" value={schools} onChange={setSchools} />
              <NumberField id="students-per-school" label="Students per school (Classes 9-12)" value={studentsPerSchool} onChange={setStudentsPerSchool} step={10} />
              <NumberField id="school-price" label="Price per student per year (₹)" value={schoolPrice} onChange={setSchoolPrice} step={10} />
              <div style={{ fontWeight: 800, color: "#34d399" }}>{lakh(revenue.school)}</div>
            </div>
            <div style={{ ...PANEL, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              <div style={{ fontWeight: 700 }}>C. Paid parent mock</div>
              <NumberField
                id="weekly-takers"
                label="Students taking the weekly test"
                value={weeklyTakers}
                onChange={setWeeklyTakers}
                step={5000}
                hint="50,000 is about 1% of ~54 lakh 2025 UP Board candidates"
              />
              <NumberField id="parent-conversion" label="Paid conversion (%)" value={parentConversion} onChange={setParentConversion} step={0.5} />
              <NumberField id="parent-price" label="Mock price (₹, once per season)" value={parentPrice} onChange={setParentPrice} step={10} />
              <div style={{ fontWeight: 800, color: "#34d399" }}>{lakh(revenue.parent)}</div>
            </div>
          </div>

          <div style={{ ...PANEL, borderColor: "var(--primary)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Year-one revenue at these assumptions</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800 }} data-testid="total-revenue">
                {lakh(revenue.total)}
              </div>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "460px", lineHeight: 1.55 }}>
              The sponsor and school lines carry the business; the parent line is a bonus. Variable cost stays low because the
              test is 5 to 10 objective questions, scored instantly, with a teacher-reviewed question bank.
            </div>
          </div>

          <div style={PANEL}>
            <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>8-week pilot to prove it (one district edition)</div>
            <ol style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.9rem" }}>
              <li>Print the QR box every Wednesday on the education page; link it from the results portal.</li>
              <li>Sell 8 weekly sponsor slots to local coaching institutes, banks or brands through the existing ad desk.</li>
              <li>Sign 10 schools through existing school relationships for a free class report, then quote the paid pack.</li>
              <li>
                Measure: QR scans per edition, test completion rate, week-2 and week-4 return rate, sponsor renewal, school
                conversion, and parent mock purchases.
              </li>
            </ol>
          </div>
        </section>
      )}

      {tab === "fit" && (
        <section className="card" aria-label="Why it fits" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="grid-2">
            <div style={PANEL}>
              <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>Uses what Amar Ujala already has</div>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                <li>Daily print reach into Hindi-medium homes, and a results portal students already visit at board-result time.</li>
                <li>An ad sales team that can sell a weekly sponsor slot like any print booking.</li>
                <li>
                  School relationships from the Atul Maheshwari Chhatravritti scholarship exam and the Tanav Mukt Pariksha
                  (stress-free exam) programme.
                </li>
              </ul>
            </div>
            <div style={PANEL}>
              <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>Brings programmes onto one platform</div>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                <li>The same question engine can run scholarship screening rounds online.</li>
                <li>Weekly results give the stress-free exam programme a reason to stay in touch with students all year.</li>
                <li>Class-level gap maps give schools a reason to renew, not just a one-day event.</li>
              </ul>
            </div>
            <div style={PANEL}>
              <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>Market anchor</div>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                <li>About 54 lakh candidates registered for the 2025 UP Board High School and Intermediate exams.</li>
                <li>UP Board uses NCERT textbooks for core subjects in Classes 9 to 12, so one NCERT skill map serves UP Board and CBSE.</li>
                <li>27.0% of school students take private coaching (NSS CMS: Education 2025): demand for help exists and is paid for.</li>
              </ul>
            </div>
            <div style={PANEL}>
              <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>Risks and how the design handles them</div>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                <li>Children&apos;s data (DPDP Act 2023): the test works without login; contact details only with verifiable parent or school consent.</li>
                <li>Question quality: every item reviewed by a subject teacher before print; wrong items are a brand risk.</li>
                <li>Sponsor conflict: sponsors get a name and a slot, never access to student data or results.</li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
