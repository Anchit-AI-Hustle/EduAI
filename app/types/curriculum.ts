// Type definitions for EduAIon / EveryYear curriculum architecture

export type LanguageMode = "en" | "hi";

export interface StageInfo {
  order: number;
  year_id: string;
  label_en: string;
  label_hi: string;
  nep_stage: string;
  typical_age_band: {
    from: number;
    to: number;
  };
  national_framework: string;
  nios_certification_point: string | null;
  board_exam_year_cbse_cisce: boolean;
  competitive_tracks_open: boolean;
}

export interface BoardInfo {
  board_id: string;
  name_en: string;
  name_hi: string;
  jurisdiction: string;
  role: string;
  official_site: string;
  supported_years: string[];
}

export interface TrackInfo {
  track_id: string;
  name_en: string;
  name_hi: string;
  category: string;
  conducting_body: string;
  official_site: string;
  opens_at_class: string;
  domains: string[];
}

export interface SubjectItem {
  status: string;
  source_ids: string[];
  subject_id: string;
  name_en: string;
  name_hi: string;
  skill_ids: string[];
  ncert_textbook_titles?: string[];
  ncert_hindi_medium_titles?: string[];
  notes?: string[];
}

export interface CurriculumSkeleton {
  id: string;
  boardId: string;
  yearId: string;
  academicSession: string;
  nepStage: string;
  coverageStatus: string;
  certificationPoint: string | null;
  subjectsCount: number;
  subjects: SubjectItem[];
  schemeNotes: { text: string; source_ids: string[] }[];
}

export interface ChallengeItem {
  id: string;
  domain: string;
  title_en: string;
  title_hi: string;
  question_en: string;
  question_hi: string;
  options_en: string[];
  options_hi: string[];
  correctIndex: number;
  difficulty: "beginner" | "intermediate" | "advanced" | "olympiad";
  cognitiveSkill: string;
  hint_en: string;
  hint_hi: string;
  solution_en: string;
  solution_hi: string;
  prerequisiteGrade: string;
}

// Mastery is reported per skill (items correct out of items asked), never as a
// single intelligence score: a short quiz cannot measure intelligence.
export interface SkillMastery {
  skillId: string;
  skill_en: string;
  skill_hi: string;
  correct: number;
  total: number;
  likelyGapClass: number | null;
}

export interface TimetableDay {
  dayNumber: number;
  dayOfWeek: string;
  dayOfWeek_hi: string;
  dateStr: string;
  theme_en: string;
  theme_hi: string;
  isBufferDay: boolean;
  screenTimeMinutes: number;
  assignments: {
    id: string;
    subject: string;
    title_en: string;
    title_hi: string;
    challengeTier: "Foundational" | "Standard" | "High Agility";
    estimatedMinutes: number;
    completed: boolean;
    score?: number;
    skillFocus: string;
  }[];
}
