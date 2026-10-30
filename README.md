# 🎓 EveryYear (EduAI) - AI-First Personal School & Skill Graph

> **An individual, adaptive learning plan for every year, week, and day - from Age 0 to 18.**  
> Aligned with official CBSE, ICSE, NIOS, and State Boards, plus JEE, NEET, CUET, and Digital SAT tracks.  
> Grounded in medical screen-time safety guidelines and zero syllabus hallucination.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Ready-blueviolet)](#)
[![Compliance](https://img.shields.io/badge/Compliance-NCF--SE_2023_|_DPDP_2023_|_IAP_Screen_Cap-success)](#)

---

## 🎯 1. What is the Goal? (The Big Picture in 60 Seconds)

Traditional education treats 40 unique children like an industrial assembly line: everyone moves at the **same fixed calendar speed**. If a student fails to master basic fractions in Class 6, the classroom marches forward to Class 7 linear equations anyway. This compounds small deficits into permanent academic failure, pushing families into stressful, expensive after-school coaching factories.

**EveryYear solves this by giving every child a personal AI school and learning GPS:**

1. ⚡ **Learns at the Child's Speed (No Child Left Behind):**  
   If a learner struggles with quadratic equations in Class 9, our prerequisite skill graph pinpoints the exact foundational gap (such as negative integer rules from Class 6), fixes it with bite-sized practice, and only then moves forward.
2. 🛡️ **Child Health & Pediatric Screen Safety:**  
   Grounded strictly in medical guidelines from the Indian Academy of Pediatrics (IAP):
   - **Ages 0-3:** **Zero screen time**. 100% caregiver play and sensory stimulation.
   - **Ages 3-6:** Max 30 min/day (mostly offline guided play).
   - **School Years:** Hard daily screen caps (typically 60 min/day). The rest is offline worksheets and physical activities.
3. 📚 **100% Real, Verified Official Syllabi (Zero Hallucination):**  
   Every subject, unit, and test question is mapped to official releases from **NCERT**, **CBSE**, **CISCE**, **NIOS**, and the **NTA** (JEE/NEET). The AI never makes up syllabus topics.

---

## ⚖️ The Problem vs. The EveryYear Solution

| Challenge | ❌ Traditional Education | ✅ EveryYear (EduAI) Platform |
|---|---|---|
| **Classroom Pacing** | 40 students forced to learn at 1 fixed date-based pace | Tailored daily schedule adapting to the child's exact learning velocity |
| **Foundational Gaps** | Ignored; deficits compound year after year | Diagnostic engine catches previous-grade prerequisite gaps and fixes them |
| **After-School Burden** | 3-4 disconnected tuition classes, burnout, heavy bags | 1 unified 60-min daily loop covering school boards + competitive prep |
| **Digital Wellness** | Endless passive video binging with no screen limits | Strict doctor-approved screen caps (max 60 min/day) + offline worksheets |
| **Dual-Track Prep** | Duplicate studying for Class 10/12 boards vs JEE/NEET | Shared skill graph connects school concepts directly to competitive exams |
| **Syllabus Accuracy** | Generic chatbots hallucinate non-existent syllabus rules | 100% verified primary sources from NCERT, CBSE, and NTA gazettes |

---

## 🚀 2. Quick Start: How to Run the Application

### Prerequisites
- **Node.js**: version `20.x` or higher
- **pnpm**: version `9.x` or higher (recommended), or `npm` / `yarn`

### Run in 2 Commands

```bash
# 1. Install dependencies
pnpm install

# 2. Start the local development server
pnpm dev
```

Now open **[http://localhost:3000](http://localhost:3000)** in your browser!

### Verification & Testing
```bash
# Run schema, viewport, and data integrity verification
pnpm test

# Build for production with Next.js Turbopack
pnpm build
```

---

## 📱 3. How to Use the Platform (User Walkthrough)

Using EveryYear is designed to be visual, intuitive, and simple:

```
┌────────────────────────────────────────────────────────┐
│  STEP 1: Pick Learner & Grade (Top Dropdown Selectors) │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  STEP 2: View Today's 60-Min Plan (Tab 1: Planner)     │
│  - Adjust daily minutes slider (15 to 180 min)         │
│  - See balanced timetable across Math, Science, Lang   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  STEP 3: Do the Interactive Lesson (Tab 4: Lesson)     │
│  - 5-step active loop (Intro -> Concept -> Practice -> │
│    Application -> Exit Quiz)                           │
│  - Use hints if stuck; score 100% to earn +75 XP       │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  STEP 4: Diagnose Gaps & Test Exam Readiness           │
│  - Tab 2 (Diagnostic): Identify weak prerequisite links│
│  - Tab 5 (Mock Exams): Timed CBSE / JEE / NEET tests   │
│  - Tab 8 & 10: Parent screen controls & Quest rewards  │
└────────────────────────────────────────────────────────┘
```

### Detailed Step-by-Step Instructions:

1. **Select Learner, Board & Grade:**
   - Look at the top selector bar right beneath the header.
   - Choose a sample student (e.g., Aarav - CBSE Class 7, or Ananya - NIOS Class 10).
   - Or change the board (CBSE, CISCE, NIOS, State Boards, Early Years) and grade (from 0-3 years up to Class 12).
2. **Review the Daily Plan & Timetable (Tab 1):**
   - Click **"📅 1. Day Plan & Calendar"**.
   - Use the family study slider to choose how many minutes your child has today (e.g. 60 minutes).
   - Watch the dynamic rebalancer instantly schedule today's subjects with 15% buffer time for rest and review.
3. **Launch the Daily Active Lesson (Tab 4):**
   - Click **"✍️ 4. Interactive Daily Lesson"**.
   - Step through the 5 phases of learning: Introduction -> Understand Concept -> Active Practice -> Real-World Application -> Exit Quiz.
   - Click "Reveal Hint" if you get stuck. Submit the exit ticket to earn XP and level up!
4. **Identify Prerequisite Learning Gaps (Tab 2):**
   - Click **"🔍 2. Skills Diagnostic (Find Gaps)"**.
   - Answer the 5 diagnostic questions spanning numbers, algebra, science, and reasoning.
   - If a student struggles, the engine pinpoints the exact earlier grade where the gap began.
5. **Practice Timed Mock Exams (Tab 5):**
   - Click **"📝 5. Mock Exam Engine"**.
   - Pick an exam blueprint (CBSE Class 10 Board, JEE Main, NEET UG, SAT).
   - Solve questions against the timer and receive an instant breakdown of your strengths.
6. **Parent Safety & Data Governance (Tab 8):**
   - Click **"🛡️ 8. Parent Safety & Privacy"**.
   - Check daily screen minutes against pediatric limits, toggle DPDP parental consent, and download your child's data in 1 click.
7. **Gamification & Daily Quests (Tab 10):**
   - Click **"🏆 10. Quests & Badges"** (or click your flame streak / XP pill at the top).
   - Claim completed quest rewards, view unlocked badges, and level up from *Novice Explorer* to *Grandmaster Sage*.

---

## 🗺️ 4. Visual Feature Map (All 10 Tabs Explained)

| Tab | Name | Plain-English Purpose | Primary User |
|---|---|---|---|
| **Tab 1** | **📅 Day Plan & Calendar** | View today's 60-min balanced study plan and 52-week calendar roadmap | Student & Parent |
| **Tab 2** | **🔍 Skills Diagnostic** | Diagnostic test that uncovers hidden concept gaps from past grades | Student & Teacher |
| **Tab 3** | **📖 Middle School (6-8)** | Deep dive into official new NCERT books (*Ganita Prakash*, *Curiosity*, *Poorvi*) | Middle Schoolers |
| **Tab 4** | **✍️ Interactive Daily Lesson** | 15-minute active 5-step learning loop with hints and exit ticket | Student |
| **Tab 5** | **📝 Mock Exam Engine** | Practice simulated CBSE Board, JEE Main, NEET, and SAT timed papers | Exam Aspirants |
| **Tab 6** | **🚀 Competitive Tracks** | Bridges school subjects directly into JEE, NEET, and CUET without duplication | High Schoolers |
| **Tab 7** | **🔄 AI Auto-Updater (L1-L5)** | Automatically monitors government gazettes and updates syllabi safely | System & Educators |
| **Tab 8** | **🛡️ Parent Safety & Privacy** | Screen time limits, DPDP child privacy consent, and 1-click profile export | Parents & Guardians |
| **Tab 9** | **💡 Venture Goal & FAQ** | Grounded answers to why EveryYear was built, market size, and pricing | Founders & Evaluators |
| **Tab 10** | **🏆 Quests, Badges & XP** | Daily learning missions, flame streaks, and gamified achievement badges | Student |

---

## 🗣️ 5. Plain-English Glossary (Jargon Demystified)

- **Panchpadi (पंचपदी):** The ancient 5-step learning science adopted in India's National Curriculum Framework (NCF):
  1. *Adhiti* = Introduce the idea
  2. *Bodh* = Explain the concept
  3. *Abhyas* = Practice solving
  4. *Prayog* = Apply to real life
  5. *Prasar* = Expand and master
- **Prerequisite Skill Graph (DAG):** A concept family tree. Just as you cannot do division without knowing subtraction, every concept in math and science connects to earlier building blocks.
- **IAP Screen Time Cap:** Pediatric health rules set by the Indian Academy of Pediatrics to protect developing brains and eyes (0 screens for under-3s; strictly capped for older students).
- **DPDP Act 2023 Section 9:** India's digital child data protection law. Strictly bans behavioral advertising and tracking for children, requiring verifiable parental consent.
- **5-Layer Evolution Engine:** The AI system that updates lesson plans. Layer 1 updates learner mastery in real time; Layer 3 monitors official CBSE/NCERT notices; Layer 4 tests for safety before rolling out changes.

---

## 🏗️ 6. Codebase Architecture

```
EduAI/
├── app/
│   ├── EveryYearSchoolWorkspace.tsx   # Primary interactive workspace shell
│   ├── page.tsx                       # Root server component with data hydration
│   ├── justification/page.tsx         # Executive thesis & market analysis
│   ├── aage-kya/                      # Higher-ed career roadmap pilot
│   ├── pariksha-saathi/               # Exam test companion pilot
│   ├── components/
│   │   ├── GoalAndUsageGuide.tsx      # Visual Goal & Usage Guide banner (collapsible)
│   │   ├── VentureThesisView.tsx      # Grounded strategic Q&A and metrics
│   │   ├── DailyLessonLoop.tsx        # 5-step interactive lesson player
│   │   ├── DayLevelCalendarTimetable  # Daily 60-min schedule generator
│   │   ├── CognitiveDiagnostic.tsx    # Adaptive prerequisite skill placement
│   │   ├── MiddleSchoolDeepDive.tsx   # NCERT Class 6-8 textbook explorer
│   │   ├── MockExamEngine.tsx         # CBSE / JEE / NEET timed exam engine
│   │   ├── GamificationHub.tsx        # XP, quests, streaks & badge awards
│   │   └── GovernanceAndRiskHub.tsx   # DPDP & screen time parent view
│   └── globals.css                    # Design system, themes & animations
├── content/
│   ├── index/curriculum-master-index  # Master index of boards, stages, & sources
│   └── curriculum/                    # Sourced JSON curricula (CBSE, ICSE, NIOS, etc.)
├── schemas/                           # Strict JSON schemas validating all curricula
├── scripts/test                       # Test suite checking DAG, source integrity & viewports
└── docs/                              # Detailed strategy and technical references
```

---

## 📜 7. Official Grounding Sources

Every curriculum node in this repository cites its official government publication:
- **MWCD Navchetana 2024:** [Early Childhood Care & Education (0-3)](https://spniwcd.wcd.gov.in/early-childhood-care-and-education/documents)
- **NCERT NCF-FS 2022:** [Foundational Stage (Ages 3-8)](https://ncert.nic.in/pdf/NCF_for_Foundational_Stage_20_October_2022.pdf)
- **NCERT NCF-SE 2023:** [School Education Framework (Classes 1-12)](https://ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf)
- **CBSE Academic:** [Official Senior School Curriculum 2026-27](https://cbseacademic.nic.in/curriculum_2027.html)
- **National Institute of Open Schooling (NIOS):** [Accredited Flexible Portals](https://sdmis.nios.ac.in/)
- **National Testing Agency (NTA):** [JEE Main & NEET Official Notices](https://jeemain.nta.nic.in/)
- **IAP Guidelines:** [Pediatric Screen Time Recommendations](https://pubmed.ncbi.nlm.nih.gov/34969943/)

---

*Engineered with precision for 248 million Indian students and flexible learners worldwide.*
