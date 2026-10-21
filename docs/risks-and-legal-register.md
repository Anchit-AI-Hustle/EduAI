# Risks and Legal Register

Status as of 2026-10-21. Facts cite source IDs from `data/sources/official-source-register.json`. Anything not verified in this build is marked **UNVERIFIED** and must not drive product decisions until checked. This register is not legal advice; items marked "needs counsel" need a qualified Indian education and data-protection lawyer.

## R1. Legal route for "replacing school"

| | |
|---|---|
| Verified | CBSE private candidature is limited to defined categories (for example candidates who failed a previous Board exam, and specified NCT Delhi categories). A child who never enrolled in a CBSE school is not generally eligible to sit CBSE Class X or XII as a private candidate. (SRC-CBSE-PRIVATE-CANDIDATE-BYELAWS, SRC-DELHI-HC-LPA-113-2025) |
| Verified | NIOS certifies at five points: OBE Level A (Class 3), B (Class 5), C (Class 8), Secondary (Class X), Senior Secondary (Class XII). OBE was extended to children aged 6-14 in 2000 and is recognised by the Government of India as equivalent to formal schooling. Secondary needs a Class VIII pass and age 14; Senior Secondary minimum age is 15. NIOS states its Secondary and Senior Secondary certificates have the same recognition as other Boards. (SRC-NIOS-OBE-GUIDELINE, SRC-NIOS-SDMIS-OBE, SRC-NIOS-FAQ, SRC-NIOS-RC-DEHRADUN-FAQ) |
| Impact | For a learner outside any school, NIOS is the realistic certification route. CBSE and CISCE content can still be taught, but certification through those boards needs enrolment in an affiliated school. NIOS age floors mean an accelerated learner cannot certify early. |
| UNVERIFIED | How the Right to Education Act 2009 (compulsory schooling ages 6-14) applies to a child learning at home and certifying through NIOS OBE. **Needs counsel.** |
| Mitigation in build | `certification_route` field in the learner profile; NIOS skeletons map every non-certifying year to the next NIOS point; CBSE/CISCE positioned as "learn to this syllabus", not "certified by". |
| Owner / next step | Legal opinion before any public claim that the product "replaces school". No marketing copy uses that phrase until then. |

## R2. Children's data law

| | |
|---|---|
| Verified (secondary, law-firm analysis of the gazette) | DPDP Rules 2025 were notified on 14 Nov 2025 with three commencement dates: 14 Nov 2025, 14 Nov 2026 and 14 May 2027. Verifiable parental consent for anyone under 18, and the bar on tracking, behavioural monitoring and targeted advertising directed at children, apply from 14 May 2027. Certain fiduciaries, including educational institutions, are exempt for limited purposes (educational activities and child safety). (SRC-DPDP-RULES-2025-COMMENCEMENT) |
| Impact | Adaptive AI tutoring is, by design, monitoring of learning behaviour. Whether an online AI school qualifies for the educational-institution exemption, and whether adaptive learning counts as "behavioural monitoring", is unresolved. If not exempt, the core adaptive loop needs a lawful basis that is still being interpreted. |
| Mitigation in build | Learner profile is data-minimised (birth year-month only, no government IDs, no free-text health data). Guardian consent is required by schema for every minor (AT-08 enforces it). Consent scopes are explicit, withdrawable and versioned. No ads, no third-party data sharing, retention limit field. |
| UNVERIFIED | Exact Rule 10 wording of the verifiable-consent mechanisms (schema enum paraphrases them; gap G-LEGAL-RULE-10-TEXT). Primary gazette text not yet attached. |
| Owner / next step | Attach the MeitY gazette text; **needs counsel** on the educational-institution exemption and on whether mastery tracking is behavioural monitoring. Must be settled before any real child data is collected (Phase 2 prototype runs on synthetic data only). |

## R3. Screen time for under-6 learners

| | |
|---|---|
| Verified (secondary reports of the WHO 2019 guideline) | Under 1 year: screen time not recommended. Age 1: sedentary screen time not recommended. Age 2: no more than 1 hour. Ages 3-4: no more than 1 hour, less is better. (SRC-WHO-UNDER-5-ACTIVITY-SCREEN-SLEEP-2019) |
| Impact | An "AI-first" product for ages 0-6 cannot be screen-first without contradicting the guideline. |
| Mitigation in build | Ages 0-3: child-facing screen cap 0; the app is for the caregiver only (activity cards, observation log). Nursery to UKG: product cap of 15 child-facing minutes a day, well inside the WHO ceiling. Early-years daily loop is hands-on play led by the caregiver. |
| Owner / next step | Attach the WHO publication itself; check Indian Academy of Pediatrics guidance (**UNVERIFIED**, not yet sourced). |

## R4. Social learning

| | |
|---|---|
| Verified | Nothing external verified yet. The national early-years frameworks list socio-emotional-ethical development as a core domain. (SRC-PIB-POSHAN-BHI-PADHAI-BHI) |
| Impact | A home-based AI school removes daily peer interaction, group work, sport and conflict-resolution practice. This is the most likely reason parents and regulators will reject the model. |
| Mitigation in build | Every year's extracurricular plan includes an in-person peer group; socio-emotional development is a skill-graph domain, so it is tracked like any subject; parent view shows it. |
| Owner / next step | Phase 2 needs a real design for peer pods (local learning groups, community spaces, sport) and a way to measure social outcomes. Open. |

## R5. Offline and low-bandwidth access

| | |
|---|---|
| Verified | Nothing external verified yet; no access statistics are used in this build. |
| Impact | Many target learners use a shared phone on an unreliable connection. A heavy, always-online app excludes them. |
| Mitigation in build | Learner profile records device and bandwidth (including no device, caregiver-led) and offline packs. Every school-age daily loop ends with an offline practice task. Phase 2 prototype: installable web app, text-first and audio-first, offline lesson packs, tested at 390px. |
| Owner / next step | Phase 2 performance budget and offline test on a throttled connection. |

## R6. Outcome evidence

| | |
|---|---|
| Verified | NEP 2020 proposes school examinations in Grades 3, 5 and 8 (SRC-PRS-NEP-2020-SUMMARY); NIOS certification points are external, independent outcome checks. |
| Impact | There is no evidence yet that an AI-first school produces outcomes equal to a good school. Claims of efficacy cannot be made. |
| Mitigation in build | Diagnostic placement gives a baseline; mastery is tracked per shared-skill domain; external checkpoints (NIOS levels, board exams) give independent measures. |
| Owner / next step | Before any public launch: a small, consented pilot with a pre-registered evaluation plan and an external comparison. No efficacy claims in copy until results exist. |

## R7. Additional risks found while building Phase 1

| Risk | Detail | Next step |
|---|---|---|
| Content rights | NCERT textbooks are free to read online, but rights to reproduce, adapt or feed them to an AI model are **UNVERIFIED**. | Check NCERT copyright terms; until then lessons link to official books and generate original practice only. |
| Policy churn | CBSE introduced compulsory R3 for Class IX within the session (Acad-33/2026 dated 15.05.2026, effective 01.07.2026), and NCERT Class 9 Part-II books arrived mid-session. | Curriculum files are versioned per academic session; source register records retrieval dates; re-check before each session. |
| Blocked official sites | cbseacademic.nic.in curriculum page, cisce.org, nios.ac.in, jeemain.nta.nic.in, cuet.nta.nic.in and upsc.gov.in returned proxy errors from the build environment. | Ingest those documents from an unblocked network (local machine or Claude Code) in Phase 3. |
| AI accuracy | A model can produce plausible but wrong syllabus content. | Lessons may only use content traced to an ingested official document; every fact keeps a source ID; human review before learners see new content. |
