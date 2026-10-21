import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
function writeJson(rel, obj) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

const LEARNER_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://everyyear.school/schemas/learner-profile.schema.json",
  title: "EveryYear Learner Profile Schema",
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "learnerId", "createdAt", "education", "preferences", "consent", "privacy"],
  properties: {
    schemaVersion: { const: "1.0.0" },
    learnerId: { type: "string", pattern: "^[a-z0-9]{10,32}$" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
    identity: {
      type: "object",
      additionalProperties: false,
      properties: {
        displayName: { type: "string", minLength: 1, maxLength: 80 },
        preferredName: { type: "string", minLength: 1, maxLength: 40 },
        dateOfBirth: { type: "string", pattern: "^\\d{4}-\\d{2}(-\\d{2})?$" },
        guardianContactRef: { type: "string", minLength: 6 }
      }
    },
    education: {
      type: "object",
      additionalProperties: false,
      required: ["currentYearId", "boardId", "languages"],
      properties: {
        currentYearId: {
          enum: [
            "home-0-3", "nursery", "lkg", "ukg",
            "class-01", "class-02", "class-03", "class-04", "class-05",
            "class-06", "class-07", "class-08", "class-09", "class-10",
            "class-11", "class-12"
          ]
        },
        boardId: { enum: ["early-years", "cbse", "cisce", "nios", "state-boards"] },
        stateBoardId: { type: "string" },
        schoolType: { enum: ["school-enrolled", "home-learning", "open-schooling", "hybrid", "unverified"] },
        completedYearIds: { type: "array", uniqueItems: true, items: { type: "string" } },
        languages: {
          type: "array",
          minItems: 1,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["code", "role"],
            properties: {
              code: { enum: ["en", "hi", "other"] },
              otherLabel: { type: "string" },
              role: { enum: ["medium", "first-language", "second-language", "third-language"] }
            }
          }
        },
        priorBoardIds: { type: "array", items: { type: "string" } },
        mediumOfInstruction: { enum: ["en", "hi", "bilingual", "other"] }
      }
    },
    goals: {
      type: "object",
      additionalProperties: false,
      properties: {
        targetTracks: {
          type: "array",
          uniqueItems: true,
          items: { enum: ["jee", "neet", "cuet", "upsc", "sat", "act", "ielts", "toefl"] }
        },
        targetExamYear: { type: "integer", minimum: 2026, maximum: 2045 },
        weeklyStudyMinutes: { type: "integer", minimum: 30, maximum: 3600 },
        notes: { type: "string", maxLength: 500 }
      }
    },
    preferences: {
      type: "object",
      additionalProperties: false,
      required: ["uiLanguage"],
      properties: {
        uiLanguage: { enum: ["en", "hi"] },
        contentLanguageMix: {
          type: "object",
          additionalProperties: false,
          properties: {
            explanation: { enum: ["en", "hi", "both"] },
            practice: { enum: ["en", "hi", "both"] }
          }
        },
        sessionLengthMinutes: { type: "integer", minimum: 5, maximum: 90 },
        offlineFirst: { type: "boolean" },
        parentViewEnabled: { type: "boolean" },
        reducedMotion: { type: "boolean" }
      }
    },
    consent: {
      type: "object",
      additionalProperties: false,
      required: ["status", "policyVersion"],
      properties: {
        status: { enum: ["not-required", "guardian-pending", "guardian-verified", "guardian-declined", "withdrawn"] },
        policyVersion: { type: "string" },
        consentedAt: { type: "string" },
        guardianRelationship: { enum: ["parent", "legal-guardian", "other"] },
        verificationMethod: { enum: ["school-attestation", "digilocker", "payment-instrument", "in-person", "other"] },
        jurisdiction: { enum: ["IN"] },
        dataProcessingConsent: { type: "boolean" },
        mediaConsent: { type: "boolean" }
      }
    },
    privacy: {
      type: "object",
      additionalProperties: false,
      required: ["dataResidency", "retentionClass", "analyticsOptOut"],
      properties: {
        dataResidency: { const: "IN" },
        retentionClass: { enum: ["session", "one-year", "until-withdrawal", "legal-minimum"] },
        analyticsOptOut: { type: "boolean" },
        thirdPartyAiProcessingAllowed: { type: "boolean" },
        exportRequestedAt: { type: "string" },
        deletionRequestedAt: { type: "string" }
      }
    },
    diagnosticState: {
      type: "object",
      additionalProperties: false,
      properties: {
        lastDiagnosticId: { type: "string" },
        lastDiagnosticAt: { type: "string" },
        confidence: { enum: ["low", "medium", "high"] },
        masterySummary: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["skillId", "mastery", "evidenceCount"],
            properties: {
              skillId: { type: "string" },
              mastery: { type: "number", minimum: 0, maximum: 1 },
              evidenceCount: { type: "integer", minimum: 0 }
            }
          }
        }
      }
    },
    planState: {
      type: "object",
      additionalProperties: false,
      properties: {
        activePlanId: { type: "string" },
        curriculumVersion: { type: "string" },
        planRevision: { type: "integer", minimum: 1 }
      }
    },
    accessibility: {
      type: "object",
      additionalProperties: false,
      properties: {
        accommodations: { type: "array", items: { type: "object" } },
        screenTimeCapMinutesPerDay: { type: "integer", minimum: 0, maximum: 480 }
      }
    }
  }
};

const SKILL_GRAPH_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://everyyear.school/schemas/skill-graph.schema.json",
  title: "EveryYear Shared Skill Graph Schema",
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "graphVersion", "updatedAt", "domains", "skills", "edges", "provenance"],
  properties: {
    schemaVersion: { const: "1.0.0" },
    graphVersion: { type: "string" },
    updatedAt: { type: "string" },
    domains: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "name", "description"],
        properties: {
          id: { type: "string" },
          name: {
            type: "object",
            additionalProperties: false,
            required: ["en"],
            properties: { en: { type: "string" }, hi: { type: "string" } }
          },
          description: { type: "string" },
          parentDomainId: { type: "string" }
        }
      }
    },
    skills: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "name", "domainId", "stage", "description", "successCriteria", "evidenceTypes", "status"],
        properties: {
          id: { type: "string" },
          name: {
            type: "object",
            additionalProperties: false,
            required: ["en"],
            properties: { en: { type: "string" }, hi: { type: "string" } }
          },
          domainId: { type: "string" },
          stage: {
            type: "object",
            additionalProperties: false,
            required: ["fromYearId", "toYearId"],
            properties: { fromYearId: { type: "string" }, toYearId: { type: "string" } }
          },
          description: { type: "string" },
          prerequisites: { type: "array", items: { type: "string" } },
          successCriteria: { type: "array", minItems: 1, items: { type: "string" } },
          evidenceTypes: { type: "array", minItems: 1, items: { type: "string" } },
          boardAlignments: { type: "array", items: { type: "object" } },
          trackBranches: { type: "array", items: { type: "object" } },
          status: { enum: ["active", "draft", "deprecated", "merged"] }
        }
      }
    },
    edges: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["from", "to", "type"],
        properties: {
          from: { type: "string" },
          to: { type: "string" },
          type: { type: "string" },
          strength: { type: "string" }
        }
      }
    },
    coverageSummary: { type: "object" },
    provenance: {
      type: "object",
      additionalProperties: false,
      required: ["authoredBy", "reviewStatus", "license"],
      properties: {
        authoredBy: { type: "string" },
        reviewedBy: { type: "string" },
        reviewStatus: { type: "string" },
        license: { type: "string" },
        updatedFromCurriculumVersions: { type: "array", items: { type: "string" } }
      }
    }
  }
};

const CURRICULUM_YEAR_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://everyyear.school/schemas/curriculum-year.schema.json",
  title: "EveryYear Curriculum Year Plan Schema",
  type: "object",
  additionalProperties: false,
  required: [
    "schemaVersion",
    "curriculumVersionId",
    "boardId",
    "boardName",
    "yearId",
    "yearLabel",
    "nepStage",
    "ageBandYears",
    "groundingStatus",
    "screenTimePolicy",
    "subjects",
    "skillIds",
    "termPlan",
    "weeklyPlanTemplate",
    "dailyLessonTemplate",
    "assessments",
    "coCurricularPlan",
    "extracurricularPlan",
    "parentViewPlan",
    "trackBridges",
    "sourceIds",
    "knownGaps"
  ],
  properties: {
    schemaVersion: { const: "1.0.0" },
    curriculumVersionId: { type: "string" },
    boardId: { enum: ["early-years", "cbse", "cisce", "nios", "state-boards"] },
    boardName: { type: "string" },
    yearId: {
      enum: [
        "home-0-3", "nursery", "lkg", "ukg",
        "class-01", "class-02", "class-03", "class-04", "class-05",
        "class-06", "class-07", "class-08", "class-09", "class-10",
        "class-11", "class-12"
      ]
    },
    yearLabel: {
      type: "object",
      additionalProperties: false,
      required: ["en", "hi"],
      properties: { en: { type: "string" }, hi: { type: "string" } }
    },
    nepStage: { type: "string" },
    ageBandYears: { type: "string" },
    groundingStatus: { enum: ["fully-sourced", "deepened-grade-band", "skeleton-with-labelled-gaps"] },
    screenTimePolicy: {
      type: "object",
      additionalProperties: false,
      required: ["maxMinutesPerDay", "deliveryMode", "guidelineSourceId"],
      properties: {
        maxMinutesPerDay: { type: "integer", minimum: 0, maximum: 360 },
        deliveryMode: { type: "string" },
        guidelineSourceId: { type: "string" }
      }
    },
    subjects: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["subjectId", "name", "compulsory", "skillIds", "sourceIds", "units"],
        properties: {
          subjectId: { type: "string" },
          officialCode: { type: "string" },
          name: {
            type: "object",
            additionalProperties: false,
            required: ["en", "hi"],
            properties: { en: { type: "string" }, hi: { type: "string" } }
          },
          compulsory: { type: "boolean" },
          stream: { type: "string" },
          textbooks: { type: "array", items: { type: "string" } },
          skillIds: { type: "array", minItems: 1, items: { type: "string" } },
          sourceIds: { type: "array", minItems: 1, items: { type: "string" } },
          units: { type: "array", minItems: 1, items: { type: "object" } }
        }
      }
    },
    skillIds: { type: "array", minItems: 1, items: { type: "string" } },
    termPlan: { type: "array", minItems: 2, items: { type: "object" } },
    weeklyPlanTemplate: { type: "object" },
    dailyLessonTemplate: { type: "object" },
    assessments: {
      type: "object",
      additionalProperties: false,
      required: ["unitTests", "internals", "termExams", "boardStyleMocks"],
      properties: {
        unitTests: { type: "object" },
        internals: { type: "object" },
        termExams: { type: "object" },
        boardStyleMocks: { type: "object" }
      }
    },
    coCurricularPlan: { type: "array", minItems: 2, items: { type: "object" } },
    extracurricularPlan: { type: "array", minItems: 2, items: { type: "object" } },
    parentViewPlan: { type: "object" },
    trackBridges: { type: "array", items: { type: "object" } },
    sourceIds: { type: "array", minItems: 1, items: { type: "string" } },
    knownGaps: { type: "array", items: { type: "object" } }
  }
};

writeJson("schemas/learner-profile.schema.json", LEARNER_SCHEMA);
writeJson("schemas/skill-graph.schema.json", SKILL_GRAPH_SCHEMA);
writeJson("schemas/curriculum-year.schema.json", CURRICULUM_YEAR_SCHEMA);
console.log("Wrote canonical JSON schemas (learner-profile, skill-graph, curriculum-year).");
