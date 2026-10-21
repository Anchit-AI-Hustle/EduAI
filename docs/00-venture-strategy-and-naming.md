# Venture Naming and Strategic Thesis

**Date:** 2026-10-22
**Repository:** `ai-school-full-stack`
**Deployment Target:** `edu-ai.anchit-tandon.com`

## 1. Venture Name Options and Architecture Configuration

The codebase isolates the venture brand in `content/config/venture-config.json` so you can switch the display name across the entire application in one line without touching schema or route logic. Five candidate names were evaluated for clarity, recall, bilingual resonance, and long-term positioning:

| Candidate Name | Meaning and Positioning | Domain Angle | Best Fit |
|---|---|---|---|
| **EveryYear** (Default in config) | "An individual plan for every year of a learner's education" - directly states the product promise from age 0 to Class 12 and competitive tracks | `everyyear.school` / `edu-ai.anchit-tandon.com` | Global and Indian parents seeking structured annual continuity |
| **AarohAI** | Derived from Sanskrit *Aarohana* (ascent, progressive stages of growth) + AI | `aaroh.ai` / `aaroh.school` | Strong Indian cultural root paired with skill-ladder progression |
| **Vidyapath AI** | *Vidya* (knowledge) + *Path* (structured route/curriculum graph) | `vidyapath.ai` | Clear bilingual positioning for Hindi and English households |
| **Kramik AI** | *Kramik* (sequential, step-by-step mastery across prerequisites) | `kramik.ai` | Deep focus on the prerequisite skill graph and mastery progression |
| **EduAIon** | Education + "AI always on" for lifelong learning | `eduaion.com` | Broad cradle-to-career umbrella brand |

---

## 2. Answers to the Core Venture Questions (Sourced from Primary Data)

### Question 1: Who will use it?

Three primary user segments and two secondary institutional users interact with the platform:

1. **School-Enrolled Students and Parents (Nursery to Class 12 across CBSE, CISCE, and State Boards):** Families whose children attend regular schools but suffer from one-pace-fits-all classrooms, fragmented after-school tuition, and multi-year foundational skill gaps.
2. **Dual-Track Aspirants (Classes 8 to 12 preparing for JEE, NEET, CUET, UPSC Foundations, SAT, ACT, IELTS, or TOEFL):** Learners who must reconcile their school board syllabus (CBSE, ISC, or State Board) with competitive or study-abroad test blueprints without burning out on duplicate lectures.
3. **Open-Schooling, Homeschooling, and Flexible-Schedule Learners (Ages 0 to 18):**
   - Caregivers running structured home stimulation for ages 0-3 ([MWCD Navchetana 2024](https://spniwcd.wcd.gov.in/early-childhood-care-and-education/documents)) and early childhood play-based learning for ages 3-6 ([MWCD Aadharshila 2024](https://spniwcd.wcd.gov.in/early-childhood-care-and-education/documents), [NCERT NCF-FS 2022](https://ncert.nic.in/pdf/NCF_for_Foundational_Stage_20_October_2022.pdf)).
   - Families using the [National Institute of Open Schooling (NIOS)](https://sdmis.nios.ac.in/) Open Basic Education (Levels A, B, C for Classes 3, 5, 8) and Secondary/Senior Secondary certifications (Classes 10 and 12) due to sports, performing arts, health, neurodiversity, or frequent relocation.

### Question 2: What do they use currently?

Families currently patch together four disconnected tools:
- **Physical Schools and Printed Textbooks:** [NCERT](https://ncert.nic.in/), [CBSE Academic](https://cbseacademic.nic.in/curriculum_2027.html), [CISCE](https://cisceboard.org/), or State Board classrooms that teach to the calendar date rather than individual prerequisite mastery.
- **Offline Neighborhood Tuitions and Coaching Factories:** Local after-school tutors for Classes 1-8 and large coaching institutes (Allen, Aakash, PW, local test-prep centers) for Classes 9-12 that run a separate parallel schedule disconnected from the child's school calendar.
- **Video-Library EdTech Apps and YouTube Channels:** Passive video catalogues (YouTube, PW, Khan Academy, Diksha) where students binge lectures without a constrained year plan, weekly rebalancer, or cross-grade prerequisite diagnostic.
- **Ad-Hoc Chatbots (ChatGPT, Gemini, Claude):** Unpinned conversational tools that answer homework questions on demand but do not know the student's exact board version, do not prevent hallucinated syllabus topics, and do not track longitudinal skill mastery.

### Question 3: How many users face this problem?

Primary government and survey data confirm the scale across India:
- **24.8 Crore (248 Million) to 23.29 Crore Enrolled K-12 Students:** According to the Ministry of Education's [UDISE+ 2023-24 Report](https://dashboard.udiseplus.gov.in/report2026/static/media/UDISE+2023_24_Booklet_nep.f2ab818294eb169c0adc.pdf) and [UDISE+ 2024-25 Report](https://dashboard.udiseplus.gov.in/report2026/static/media/UDISE+2024_25_Booklet_existing.118ba29d4773e6372f72.pdf), India has over 232.9 million to 248 million students enrolled from primary to higher secondary across 14.7+ lakh schools, plus tens of millions of children aged 0-6 covered by early childhood frameworks ([MWCD ECCE](https://wcd.gov.in/offerings/early-childhood-care-and-education)).
- **Severe Multi-Year Foundational Gaps (50%+ Behind Grade Level):** The [ASER 2024 National Findings](https://asercentre.org/wp-content/uploads/2022/12/ASER-2024-National-findings.pdf) and [PARAKH Rashtriya Sarvekshan 2024 National Report](https://parakh.ncert.gov.in/sites/default/files/2025-07/REPORT_India_IND.pdf) document that while enrollment exceeds 95%, more than half of Class 5 students struggle with Class 2 level foundational reading and division tasks, creating compounding deficits in middle and secondary school.
- **55+ Lakh Annual High-Stakes Competitive Test Takers:** Over 20 lakh candidates register annually for [NEET UG](https://neet.nta.nic.in/), 12-14 lakh for [JEE Main](https://jeemain.nta.nic.in/document/syllabus-2026/), 13-15 lakh for [CUET UG](https://cuet.nta.nic.in/cuetug-2026-syllabus/), 10+ lakh for [UPSC CSE](https://www.upsc.gov.in/examinations/revised-syllabus-scheme), and hundreds of thousands of Indian students take [Digital SAT](https://satsuite.collegeboard.org/sat), [IELTS](https://ielts.org/), and [TOEFL iBT](https://www.ets.org/toefl.html).
- **3.5+ Lakh Annual Open-Schooling Learners:** [NIOS](https://sdmis.nios.ac.in/) enrolls hundreds of thousands of learners each year across Open Basic Education, Secondary, and Senior Secondary courses as the largest open schooling system in the world.

### Question 4: Why will our product be better?

1. **One Shared Prerequisite Skill Graph Across All Boards and Tracks:** Instead of treating CBSE, ICSE, NIOS, State Boards, JEE, NEET, CUET, and SAT as separate silos, every board unit and exam section maps onto a single directed acyclic skill graph (`content/skill-graph/shared-skill-graph.json`). When a Class 9 student struggles with quadratic equations, the diagnostic traces the exact missing Class 6-7 prerequisite (such as integer operations or linear expressions) and schedules a bridge block before moving forward.
2. **Constrained Year, Week, and Day Planner (Not a Video Library):** The system computes a mathematically feasible schedule that respects weekly minute caps, a 15% buffer for missed days, and pediatric screen-time caps ([IAP Guidelines](https://pubmed.ncbi.nlm.nih.gov/34969943/)). When a learner misses three days, the weekly rebalancer automatically shifts must-do board competencies first instead of piling up an impossible backlog.
3. **Zero Syllabus Hallucination (Strict Primary-Source Pinning):** Every subject, unit, and mock blueprint carries a verified `sourceId` from `content/sources/official-source-catalog.json`. Where official chapter-level data is not yet ingested, the system explicitly labels the gap rather than letting an LLM invent syllabus claims.
4. **Five-Layer Self-Evolving Architecture:** While traditional textbooks take 5-18 years between National Curriculum Frameworks ([NCF 2005 to NCF-SE 2023](https://ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf)), our platform updates individual mastery in real time (L1), optimizes practice item variants daily on measured learning gain (L2), watches official board circulars continuously (L3), generates cohort-pinned curriculum change proposals with automated prerequisite coherence checks (L4), and surfaces frontier skills (L5).
5. **Bilingual First-Class Design (Hindi and English) with Parent Governance:** Every skill, lesson loop, diagnostic item, and parent digest runs natively in English and Hindi, while parents control screen-time caps and data consent under [DPDP Act 2023 Section 9](https://www.dpdpa.com/dpdpa2023/chapter-2/section9.html).

### Question 5: Will they pay?

Yes, because Indian households already allocate significant post-tax income to supplemental education and test preparation, and our architecture replaces fragmented spend at a fraction of the cost:
- **Existing Household Spend:** Urban and semi-urban Indian families spend INR 1,500 to INR 6,000/month ($18-$70/month) on neighborhood subject tuitions for Classes 1-10, and INR 40,000 to INR 2,50,000/year ($500-$3,000/year) on JEE/NEET/SAT coaching and test series.
- **High-Value Willingness-to-Pay Wedges:**
  - **Tier 1 (Free / Public Good Diagnostic & Curriculum Explorer):** Full access to the official board syllabus explorer, cross-grade skill diagnostic, and open source-changelog to build parent trust with zero customer acquisition friction.
  - **Tier 2 (Core Annual Planner & Daily Loop - INR 499 to INR 1,499/month):** Personalized year/week/day dynamic plan, bilingual daily lesson loop, unit tests, and weekly parent digest for Nursery to Class 12.
  - **Tier 3 (Integrated Board + Competitive Track Bundle - INR 1,999 to INR 3,499/month):** Synchronized school board + JEE/NEET/CUET/SAT/IELTS planner, full-length official-pattern mock engine, error-log remediation, and human mentor review escalations.

### Question 6: What is the real problem that is not solved right now?

The real unsolved problem in education is **the coordination and coherence gap between fixed-pace institutional syllabi and an individual learner's real-time mastery state**:
- Schools and boards ([CBSE](https://cbseacademic.nic.in/), [CISCE](https://cisceboard.org/), State Boards) are legally and operationally built to move a cohort through a fixed annual document by calendar date, assuming every child entering Class 8 has mastered 100% of Classes 1-7.
- Video apps and coaching centers solve **content availability** (there are millions of hours of videos explaining Newton's laws or fractions), but content was never the bottleneck.
- Nobody solves **longitudinal curriculum orchestration**: diagnosing a learner's true prerequisite boundary per skill domain, reconciling their school syllabus with their future competitive track on one shared skill graph, fitting that into a realistic daily time budget that adapts when life happens, and evolving the plan safely whenever boards revise their syllabus.
