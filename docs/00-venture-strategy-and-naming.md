# Venture Naming and Strategic Thesis

**Date:** 2026-10-22 (Section 2 revised 2026-10-23)
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

## 2. Answers to the Core Venture Questions (Revised 2026-10-23)

This section is the single canonical answer set. The `/justification` page and the in-app "Venture Thesis" tab (`app/components/VentureThesisView.tsx`) restate it and must stay consistent with it; `scripts/check-venture-thesis-consistency.mjs` fails CI when key figures drift.

### 2.0 Reality check: what exists today

The repository is a clickable prototype plus a data architecture, not a working product. Claims below are labelled **Built**, **Designed** (specified in `docs/01-product-architecture.md`, not implemented) or **Hypothesis** (needs a pilot to prove).

| Capability | Status | Evidence in the repository |
|---|---|---|
| Board and year curriculum skeletons (CBSE, CISCE, NIOS, State Boards, Early Years) | Built (mostly templated) | `content/curriculum/`; most years share one template; only CBSE Classes 6 to 8 have chapter-level depth (`content/deepening/cbse-middle-stage-chapters.json`) |
| Shared prerequisite skill graph | Built (coarse) | 59 skills and 62 edges in `content/skill-graph/shared-skill-graph.json`; too coarse for chapter-level diagnosis outside CBSE 6 to 8 |
| Diagnostic and mock bank | Built (demo size) | 9 diagnostic items and 6 mock blueprints in `content/assessments/diagnostic-and-mock-bank.json` |
| AI tutoring, adaptive engine, self-evolving engine | Designed | No LLM calls, no backend logic; `content/evolution/self-evolving-engine-state.json` holds illustrative demo events |
| Accounts, saved learner state, consent capture, payments | Designed | All app state is in-browser React state and resets on reload |
| XP, quests, peer leagues | Built (demo data) | `app/components/GamificationHub.tsx`; leaderboard names are fictional |

### Question 1: Who will use it?

The **buyer is the parent; the user is the child.** The first segment (the wedge) matches the one grade band the repository has actually deepened:

1. **Primary (wedge): parents of CBSE Class 6 to 8 students in urban and semi-urban India who already pay for tuition**, studying in English or Hindi, and worried about hidden gaps before the Class 9 and 10 board years.
2. **Secondary: NIOS and homeschooling families.** A small group with acute pain: nobody gives them structure, and certification routes through [NIOS](https://sdmis.nios.ac.in/).

**Deferred (not in the first product):** JEE and NEET, CUET, UPSC, SAT and ACT, IELTS and TOEFL, and ages 0 to 3. Each is a separate business with strong incumbents. The track files and early-years skeletons stay in the repository as architecture, not as launch scope.

### Question 2: What do they use currently?

- **The neighbourhood tuition teacher (the real competitor).** Plans the week, holds the child accountable, clears doubts, and reports to the parent on WhatsApp.
- **School plus printed textbooks** ([NCERT](https://ncert.nic.in/), [CBSE Academic](https://cbseacademic.nic.in/curriculum_2027.html), [CISCE](https://cisce.org/), State Boards), which move by calendar date rather than by the child's mastery.
- **Video apps and YouTube** (PW, Vedantu, Byju's, Khan Academy, DIKSHA): plenty of content, no individual plan.
- **General AI chatbots** (ChatGPT, Gemini, Claude): free, fast improving, and now offer learning modes. They do not know the child's board version or textbook and keep no long-term mastery record. This is the most underrated threat.

### Question 3: How many users face this problem?

Headline enrolment is not the market. Bottom-up sizing for the wedge:

| Step | Figure | Source and confidence |
|---|---|---|
| All school students (pre-primary to Class 12) | 24.69 crore in 14.71 lakh schools (23.29 crore in Classes 1 to 12) | [UDISE+ 2024-25](https://dashboard.udiseplus.gov.in/report2026/static/media/UDISE+2024_25_Booklet_existing.118ba29d4773e6372f72.pdf); primary |
| CBSE Class 10 registrations, 2025 | about 23.85 lakh | CBSE figures [as reported](https://school.careers360.com/boards/cbse/how-many-students-appeared-in-cbse-10th-exam-2025); secondary |
| CBSE Classes 6 to 8 (three cohorts) | about 70 lakh | Estimate: assumes each cohort is similar in size to the Class 10 cohort |
| Students taking private coaching | 27.0% nationally, 30.7% urban | [NSS CMS: Education 2025, PIB 26 Aug 2025](https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2160863); primary (`SRC-MOSPI-CMSE-2025`) |
| **Wedge: CBSE Class 6 to 8 families already paying for help** | **about 20 lakh** | Estimate: 70 lakh x about 30% |

Supporting context: [ASER 2024](https://asercentre.org/wp-content/uploads/2022/12/ASER-2024-National-findings.pdf) and [PARAKH Rashtriya Sarvekshan 2024](https://parakh.ncert.gov.in/sites/default/files/2025-07/REPORT_India_IND.pdf) document large foundational gaps that compound into middle school, which is the problem the wedge targets.

### Question 4: Why will our product be better?

**Honest answer: it is not better yet.** The advantages below are **Designed**, not **Built** (see 2.0). If built, the edge over each alternative is:

1. **Cross-grade diagnosis tied to the exact textbook this term.** Example: "your child's *Ganita Prakash* trouble is a Class 5 fractions gap". Tuition teachers do this by instinct; apps and chatbots do not do it at all.
2. **A small weekly plan that fits around school homework**, with must-do board content moved first when days are missed, instead of a video library.
3. **A parent report that shows whether it is working**, without the parent needing to be a teacher.
4. **Price** compared with tuition (see Question 5).

Chatbots lack 1 to 3 because they do not know the board version or textbook and keep no longitudinal mastery record. The board-version pinning and `sourceId` tracing in this repository support that edge.

### Question 5: Will they pay?

**Probably yes, but for diagnosis plus accountability, not for "a plan", and only at a price near what families spend today.** This is a **Hypothesis** until a pilot proves it.

- **What families spend now:** average annual household spend on private coaching is INR 3,988 per student in urban areas and INR 1,793 in rural areas, rising to INR 6,384 nationally at higher secondary ([NSS CMS: Education 2025](https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2160863)). These are averages; tuition-paying urban families spend more.
- **What Indian edtech history shows:** parents pay for an accountable human and visible results. High-priced, sales-led packages failed at scale; low-priced offers grew.
- **Implication:** a self-serve app at INR 799 to 1,499 per month (INR 9,588 to 17,988 per year) is above what most families spend on coaching and only wins if it replaces the tutor.

| Tier | Price (pilot test) | What it includes |
|---|---|---|
| Free | INR 0 | Curriculum explorer, one cross-grade diagnostic report |
| Core | **INR 199 or INR 499 per month** (two price points to test) | Diagnosis, weekly plan, weekly parent report |
| Tutor and school channel (B2B2C) | Per-learner licence, to be priced in the pilot | The same tools used by tuition teachers or small schools with their own students |

Competitive and study-abroad tracks are not priced until the wedge is proven.

### Question 6: What is the real problem that is not solved right now?

Content is now free and unlimited. What nobody provides cheaply is **diagnosis plus follow-through**:

1. Knowing exactly which earlier-grade skills *this* child is missing, mapped to the textbook they use *this* term.
2. Turning that into 20 to 30 minutes a day the child will actually do, alongside school homework.
3. Showing the parent whether it is working.

The hardest part is **follow-through, not information**. Getting a 12-year-old to open an app daily without a human pushing them is the unsolved problem, and the reason tuition teachers still win.

### 2.7 Risks the answers depend on

- **Children's data (DPDP Act 2023, Section 9):** anyone under 18 is a child. The [Act](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) requires verifiable parental consent and bars tracking and behavioural monitoring of children. Adaptive learning plus XP, streaks and leagues may count as behavioural monitoring, and the educational-institution exemption in the [DPDP Rules 2025](https://www.meity.gov.in/data-protection-framework) may not cover a private app. Get a legal opinion before any pilot that stores learner data.
- **Naming:** the product appears as EveryYear (`content/config/venture-config.json`), EduAIon (`config/venture.json`) and EduAI (repository name). Pick one before any public launch.

### 2.8 Next steps

1. Build the real core for **CBSE Class 6 to 8 Mathematics** in English and Hindi: about 300 or more diagnostic items, saved learner state with guardian consent, and a weekly parent report.
2. Run a pilot with 20 to 50 parents (WhatsApp or landing page) at INR 199 and INR 499 per month before building anything else.
3. Measure: diagnostic completion, day-7 and day-28 active rate, parent report open rate, paid conversion at each price.
