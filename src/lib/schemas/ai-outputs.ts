import { z } from "zod";

// Experience Bullet Schema
export const ExperienceBulletSchema = z.object({
  id: z.string(),
  text: z.string(),
});

// Work Experience Entry
export const ExperienceItemSchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  location: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  current: z.boolean().optional(),
  bullets: z.array(z.string()),
});

// Project Item
export const ProjectItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  tech_stack: z.array(z.string()),
  link: z.string().optional(),
  bullets: z.array(z.string()),
});

// Education Item
export const EducationItemSchema = z.object({
  id: z.string(),
  degree: z.string(),
  institution: z.string(),
  year: z.string(),
  gpa: z.string().optional(),
});

// Master Career Vault Schema
export const MasterProfileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  linkedin_url: z.string().optional().or(z.literal("")),
  portfolio_url: z.string().optional().or(z.literal("")),
  summary: z.string().optional().or(z.literal("")),
  skills: z.array(z.string()).default([]),
  experience: z.array(ExperienceItemSchema).default([]),
  projects: z.array(ProjectItemSchema).default([]),
  education: z.array(EducationItemSchema).default([]),
});

export type MasterProfile = z.infer<typeof MasterProfileSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type ProjectItem = z.infer<typeof ProjectItemSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;

// Fit Gatekeeper Schema (Step B)
export const FitAnalysisSchema = z.object({
  fit_score: z.number().min(0).max(100),
  fit_verdict: z.enum(["Strong Match", "Worth Applying", "Low Fit — Reconsider"]),
  matched_skills: z.array(z.string()).describe("Verified skills from Vault that match JD keywords"),
  missing_non_negotiables: z.array(z.string()).describe("Hard requirements in JD that are absent from Master Vault"),
  recommendation_note: z.string().describe("Blunt 2-sentence honest advice on whether to proceed and where the biggest hurdles lie"),
});

export type FitAnalysis = z.infer<typeof FitAnalysisSchema>;

// Bullet Diff Item (Step C)
export const BulletDiffItemSchema = z.object({
  id: z.string(),
  parent_id: z.string().describe("ID of parent experience or project"),
  section: z.enum(["experience", "projects"]),
  original_text: z.string(),
  suggested_text: z.string(),
  reason: z.string().describe("Specific JD keyword or requirement this addresses"),
  truth_check: z.string().describe("Confirmation of which Vault facts support this rewrite without new claims"),
  accepted: z.boolean().default(true),
});

export type BulletDiffItem = z.infer<typeof BulletDiffItemSchema>;

// Interview Defense Question (Step D)
export const InterviewDefenseQuestionSchema = z.object({
  question: z.string().describe("Tough question recruiter will ask about a missing requirement or reframed bullet"),
  why_asked: z.string().describe("The underlying skepticism or concern"),
  honest_framing: z.string().describe("Tactical, 100% truthful answering script grounded in actual Vault background"),
});

export type InterviewDefenseQuestion = z.infer<typeof InterviewDefenseQuestionSchema>;

// Complete Tailored Response Schema (Step C & D)
export const TailoredGenerationSchema = z.object({
  tailored_bullets: z.array(BulletDiffItemSchema),
  cover_letter: z.string().describe("3 concise paragraphs connecting 2 specific Vault projects/roles to company pain points in JD"),
  recruiter_dm: z.string().max(300).describe("Recruiter cold message under 300 characters for LinkedIn connection note"),
  interview_defense: z.array(InterviewDefenseQuestionSchema).length(5).describe("5 tough questions with honest scripts"),
});

export type TailoredGeneration = z.infer<typeof TailoredGenerationSchema>;

// Complete Job Application Record
export const JobApplicationSchema = z.object({
  id: z.string(),
  job_title: z.string(),
  company_name: z.string(),
  job_description: z.string(),
  fit_score: z.number(),
  fit_verdict: z.string(),
  missing_requirements: z.array(z.string()),
  tailored_resume: z.object({
    bullets: z.array(BulletDiffItemSchema),
    custom_summary: z.string().optional(),
    master_profile_snapshot: MasterProfileSchema,
  }),
  cover_letter: z.string().optional(),
  recruiter_dm: z.string().optional(),
  interview_defense: z.array(InterviewDefenseQuestionSchema).optional(),
  status: z.enum(["draft", "applied", "interviewing", "rejected"]).default("draft"),
  created_at: z.string().optional(),
});

export type JobApplication = z.infer<typeof JobApplicationSchema>;
