# Phase 1 Acceptance Tests - Data Architecture

Written before any data was created. Runnable version: `npm run test:phase1` (scripts/run-phase-1-acceptance-tests.mjs).

| ID | Test | Pass condition |
|---|---|---|
| AT-01 | Stage ladder complete | Exactly 16 years in order: home-0-3, nursery, lkg, ukg, class-01 to class-12 |
| AT-02 | Board registry complete | Contains national-early-years, cbse, cisce, nios, state-boards |
| AT-03 | Skeleton for every year | A curriculum skeleton file exists for every (board, year) pair in the matrix (national-early-years covers the 4 pre-school years; every other board covers all 16) |
| AT-04 | Skeleton shape | Every skeleton validates against schemas/curriculum-year.schema.json, including subjects, skills, term plan, weekly plan, daily lesson template, unit tests, internals, term exams, board-style mocks, co-curricular, extracurricular, parent view, sources, gaps |
| AT-05 | Sources resolve | Every source_id used anywhere in data/ exists in the official source register, and every register entry has URL, issuing body, type, retrieval date and verification status |
| AT-06 | Gaps labelled | Every skeleton not fully sourced lists at least one gap, and every gap says what is missing and where it will be sourced from |
| AT-07 | Skill graph integrity | Every skill domain referenced by a skeleton exists in the skill graph; no dangling edges; no prerequisite cycles |
| AT-08 | Learner profile schema | Synthetic sample validates; an under-18 profile without guardian consent is rejected |
| AT-09 | No long dashes | No U+2014 or U+2013 characters in any authored file (raw source snapshots excluded) |
| AT-10 | Descriptive unique names | All file names under data/, docs/, schemas/, scripts/ are unique and none is generic (data.json, index.json, file.json, untitled, temp) |
| AT-11 | No invented textbook titles | Every NCERT textbook title in a CBSE skeleton appears verbatim in the derived NCERT index |
| AT-12 | Track branches present | JEE Main, JEE Advanced, NEET UG, CUET UG, UPSC CSE, SAT, ACT, IELTS, TOEFL each have an official URL, branch-off skill domains and an earliest start year of class-08 or class-09 |
| AT-13 | Risks register | docs/risks-and-legal-register.md exists and covers legal route, children's data law, under-6 screen time, social learning, offline and low-bandwidth access, outcome evidence |
