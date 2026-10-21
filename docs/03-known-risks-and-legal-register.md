# Known Risks, Legal Routes, and Mitigation Register

**Date:** 2026-10-22
**Repository:** `ai-school-full-stack`
**Status:** Mandatory Phase 1 Risk Register (Grounded in Primary Indian Statutory and Pediatric Sources)

## 1. Summary Risk Matrix

| Risk ID | Risk Area | Primary Statutory / Clinical Source | Severity | Architectural Mitigation Built into Phase 1 & 2 |
|---|---|---|---|---|
| **RISK-01** | Legal route for "replacing school" and board certification | [RTE Act 2009](https://righttoeducation.in/sites/default/files/Right%20of%20Children%20to%20Free%20and%20Compulsory%20Education%20Act%202009%20(English).pdf), [NIOS SDMIS Portal & FAQs](https://sdmis.nios.ac.in/static/dist/images/pdf/NIOS_Faqs.pdf), [CBSE Curriculum Rules](https://cbseacademic.nic.in/curriculum_2027.html) | Critical | Never claim the web app is a statutory school or issues board certificates directly. Enrolment schema explicitly tracks `schoolType` (`school-enrolled`, `open-schooling`, `home-learning`, `hybrid`) and maps formal certification to NIOS OBE (Classes 3, 5, 8) and NIOS Secondary/Senior Secondary (Classes 10, 12) or regular CBSE/CISCE/State school registration. |
| **RISK-02** | Children's personal data protection and verifiable guardian consent | [DPDP Act 2023 Section 9](https://www.dpdpa.com/dpdpa2023/chapter-2/section9.html) & [DPDP Rules 2025 Rule 10](https://www.dpdpa.com/dpdparules/rule10.html) | Critical | `learner-profile.schema.json` enforces data minimisation (opaque `learnerId`, `YYYY-MM` birth precision only, no raw phone/email/address in learner records), requires `guardian-verified` consent status before processing, and strictly bans behavioral tracking, profiling, and targeted advertising (`analyticsOptOut`, `thirdPartyAiProcessingAllowed: false`). |
| **RISK-03** | Under-6 screen time and pediatric developmental safety | [Indian Academy of Pediatrics (IAP) Screen Time Guidelines](https://pubmed.ncbi.nlm.nih.gov/34969943/) & [IAP Parent Guidelines](https://iapindia.org/guidelines-for-parents/) | High | Hard-coded `screenTimePolicy` in every year file: `0 minutes/day` child screen time for `home-0-3` (100% caregiver offline play brief), max `15-20 minutes/day` co-viewed caregiver-guided interaction for `nursery`, `lkg`, and `ukg` (well within IAP's <60 min/day cap for ages 2-5), and enforced session caps for Classes 1-12. |
| **RISK-04** | Social learning, peer interaction, and isolation risk in digital learning | [NCERT NCF-FS 2022](https://ncert.nic.in/pdf/NCF_for_Foundational_Stage_20_October_2022.pdf) & [NCF-SE 2023](https://ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf) | High | Every curriculum year schema requires both a `coCurricularPlan` and an `extracurricularPlan` with explicit `peerPodMode` (small 4-6 learner synchronous/offline neighbourhood pods, debate circles, team sports, community service, and hands-on lab/maker work). |
| **RISK-05** | Offline and low-bandwidth access across semi-urban and rural India | [UDISE+ 2024-25 Infrastructure Data](https://dashboard.udiseplus.gov.in/report2026/static/media/UDISE+2024_25_Booklet_existing.118ba29d4773e6372f72.pdf) & [ASER 2024](https://asercentre.org/wp-content/uploads/2022/12/ASER-2024-National-findings.pdf) | High | Every daily lesson template includes deterministic JSON lesson packs (`offlineFallbackReady: true`), printable/audio-first caregiver briefs, and zero dependence on streaming video or live LLM calls during assessments. |
| **RISK-06** | Unverified outcome claims and syllabus hallucination | [PARAKH Assessment Framework](https://ncert.nic.in/parakh/pdf/Assessment_Framework.pdf) | High | Every syllabus unit and mock exam blueprint must cite a verified `sourceId` in `official-source-catalog.json` or carry an explicit `knownGaps` entry. Outcome reporting is restricted to auditable within-learner mastery evidence across the skill graph. |

---

## 2. Detailed Risk Analysis and Controls

### 2.1 Legal Route for "Replacing School" (`RISK-01`)

Under the [Right of Children to Free and Compulsory Education (RTE) Act, 2009](https://righttoeducation.in/sites/default/files/Right%20of%20Children%20to%20Free%20and%20Compulsory%20Education%20Act%202009%20(English).pdf), children aged 6 to 14 have a statutory right to elementary education in a recognized school. Furthermore, boards such as [CBSE](https://cbseacademic.nic.in/curriculum_2027.html) and [CISCE](https://cisceboard.org/) require physical school affiliation, laboratory infrastructure, and attendance records for regular Class 10 and Class 12 candidates (with narrow statutory exemptions for private/patrachar candidates).

**How our system handles this honestly:**
- **For School-Enrolled Students (95%+ of users):** The platform operates as an AI academic spine and mastery planner alongside their recognized CBSE, CISCE, or State Board school.
- **For Full-Time Open/Home Learners:** Formal certification is routed through the [National Institute of Open Schooling (NIOS)](https://sdmis.nios.ac.in/), an autonomous institution under the Ministry of Education, Government of India:
  - **Elementary Equivalence (Classes 3, 5, and 8):** NIOS [Open Basic Education (OBE)](https://rcpune.nios.ac.in/open-basic-education-courses-material.html) Levels A (equivalent to Class 3), B (equivalent to Class 5), and C (equivalent to Class 8).
  - **Secondary Certification (Class 10):** [NIOS Secondary Course](https://sdmis.nios.ac.in/static/dist/images/pdf/subjects-available/subjects-available.pdf) (minimum age 14 years).
  - **Senior Secondary Certification (Class 12):** [NIOS Senior Secondary Course](https://rcpune.nios.ac.in/senior-secondary-courses-material.html) (minimum age 15 years, after passing Secondary), recognized by UGC, IITs/NITs ([JEE Main](https://jeemain.nta.nic.in/document/syllabus-2026/)), NMC ([NEET UG](https://neet.nta.nic.in/)), and [CUET UG](https://cuet.nta.nic.in/cuetug-2026-syllabus/).

### 2.2 Children's Data Protection Law (`RISK-02`)

Under [Section 9 of India's Digital Personal Data Protection (DPDP) Act, 2023](https://www.dpdpa.com/dpdpa2023/chapter-2/section9.html) and [Rule 10 of the DPDP Rules, 2025](https://www.dpdpa.com/dpdparules/rule10.html), any Data Fiduciary processing personal data of a child (defined in India as any individual under 18 years of age) must:
1. Obtain **verifiable consent of the parent or lawful guardian** before processing any personal data of a child.
2. Not undertake processing that is likely to cause any detrimental effect on the well-being of a child.
3. **Not undertake tracking or behavioral monitoring of children or targeted advertising directed at children.**

**Architectural Controls Implemented:**
- `schemas/learner-profile.schema.json` requires `consent.status` (`guardian-verified` before live persistence), `consent.verificationMethod` (`digilocker`, `payment-instrument`, `school-attestation`, `in-person`), and `privacy.dataResidency: "IN"`.
- Zero ad-tech scripts, zero behavioral retargeting pixels, and strict separation of guardian contact credentials from the learner's mastery events.
- One-click JSON data export and permanent erasure endpoints in the Parent View.

### 2.3 Under-6 Screen Time and Early Years Pedagogy (`RISK-03`)

Both the [Indian Academy of Pediatrics (IAP) Guidelines on Screen Time and Digital Wellness](https://pubmed.ncbi.nlm.nih.gov/34969943/) and [NCERT NCF-FS 2022](https://ncert.nic.in/pdf/NCF_for_Foundational_Stage_20_October_2022.pdf) warn against passive screen exposure in early childhood:
- **Ages 0 to 24 Months (`home-0-3`):** IAP mandates **zero screen exposure** for infants and toddlers under 2 years (except occasional family video calls). In our platform, the `home-0-3` curriculum sets `maxMinutesPerDay: 0` for the child and `deliveryMode: "caregiver-only-zero-child-screen"`. The interface is exclusively a daily activity card and audio guide for the parent/caregiver based on [MWCD Navchetana 2024](https://spniwcd.wcd.gov.in/early-childhood-care-and-education/documents).
- **Ages 2 to 5 Years (`nursery`, `lkg`, `ukg`):** IAP caps total screen time at **less than 1 hour per day** of supervised, co-viewed educational media. Our curriculum skeletons enforce `15 to 20 minutes/day` of caregiver co-viewed interaction (`co-viewed-caregiver-guided`), with the remaining 45-60 minutes dedicated to physical play, storytelling, clay/blocks, and nature walks from [MWCD Aadharshila 2024](https://spniwcd.wcd.gov.in/early-childhood-care-and-education/documents).
- **Ages 6 to 10 Years (`class-01` to `class-05`):** IAP recommends under 2 hours/day of recreational + supplemental screen time. Our planner caps daily digital lesson blocks at `25 to 40 minutes/day`, paired with paper workbook tasks and oral reading checks.

### 2.4 Social Learning and Peer Development (`RISK-04`)

An AI tutor cannot replace peer negotiation, empathy, physical teamwork, or public speaking. Every single year file in `content/curriculum/` embeds:
- **Co-Curricular Plan:** Art and craft (*Kala*), physical education and yoga, vocal/instrumental music, and storytelling/drama aligned with [NCF-SE 2023](https://ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf).
- **Extracurricular Peer Pods:** Structured weekly peer-pod missions (science fair teams, bilingual debate circles, math olympiad circles, community gardening, and sports clubs) so learners collaborate with peers locally or in moderated small cohorts.

### 2.5 Offline and Low-Bandwidth Access (`RISK-05`)

To serve learners on intermittent mobile connections or shared household smartphones:
- All curriculum skeletons, skill graphs, diagnostic items, and daily lesson templates are compact, deterministic JSON payloads (<50 KB per grade) that render instantaneously without waiting on streaming video.
- When an LLM or network connection is unavailable, the daily lesson loop falls back deterministically to the sourced concept summary, worked example, fixed 3-step hint ladder, and local practice check.

### 2.6 Outcome Evidence and Assessment Honesty (`RISK-06`)

- Mock exams for boards or competitive tracks whose exact section blueprints are verified ([CBSE](https://cbseacademic.nic.in/curriculum_2027.html), [JEE Main](https://jeemain.nta.nic.in/document/syllabus-2026/), [NEET UG](https://www.nta.ac.in/Download/Notice/Notice_20260108180635.pdf), [CUET UG](https://cuet.nta.nic.in/cuetug-2026-syllabus/), [UPSC](https://www.upsc.gov.in/examinations/revised-syllabus-scheme), [Digital SAT](https://satsuite.collegeboard.org/sat/whats-on-the-test), [IELTS](https://ielts.org/take-a-test/test-types/ielts-academic-test), [TOEFL iBT](https://www.ets.org/toefl/test-takers/ibt/about/content.html)) carry `patternStatus: "sourced-official-pattern"`.
- Where a board or state variation does not yet have a full chapter-by-chapter specimen paper ingested in Phase 1, the schema forces `patternStatus: "pattern-labelled-gap"` and displays an explicit gap badge in the UI.
