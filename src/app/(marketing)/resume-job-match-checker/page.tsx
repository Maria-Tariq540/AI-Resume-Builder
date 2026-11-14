import { Metadata } from "next";
import { LandingTemplate } from "@/components/seo/LandingTemplate";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Resume Job Match Checker: Should You Even Apply? | TruthCV",
  description:
    "Free resume job match checker. Get an honest fit score (0-100) and blunt missing-requirement breakdown before wasting hours applying to mismatched roles.",
  alternates: {
    canonical: "https://truthcv.com/resume-job-match-checker",
  },
  keywords: [
    "resume job match checker",
    "job fit score",
    "resume score checker",
    "ats match rate",
    "should i apply checker",
  ],
};

const FAQS = [
  {
    question: "What is the Fit Gatekeeper score?",
    answer:
      "The Fit Gatekeeper compares your Master Profile against all stated requirements in the job description, scoring from 0 to 100. Over 80 is a 'Strong Match', 60 to 79 is 'Worth Applying', and under 60 is flagged as 'Low Fit — Reconsider'.",
  },
  {
    question: "What are 'missing non-negotiables'?",
    answer:
      "These are critical dealbreaker requirements found in the job description (e.g., specific security clearances, 5+ years with a niche language, mandatory certifications) that are absent from your verified profile. TruthCV surfaces them clearly so you don't waste time on roles with zero likelihood of interview.",
  },
  {
    question: "Why not apply to everything anyway?",
    answer:
      "Blasting generic resumes damages response rates and wastes emotional energy. Applying strategically with targeted, honest resumes yields 4x higher interview invitation rates.",
  },
];

export default function ResumeJobMatchCheckerPage() {
  return (
    <LandingTemplate
      h1="Resume Job Match Checker: Should You Even Apply?"
      subtitle="Get an honest fit score and missing-requirement breakdown before wasting time. Know your odds and identify dealbreakers before hitting submit."
      targetKeyword="resume job match checker"
      canonicalUrl="https://truthcv.com/resume-job-match-checker"
      faqs={FAQS}
      angleBadge="Fit Gatekeeper & Gap Analysis"
    />
  );
}
