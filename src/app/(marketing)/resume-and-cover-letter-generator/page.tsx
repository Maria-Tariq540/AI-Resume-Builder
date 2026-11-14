import { Metadata } from "next";
import { LandingTemplate } from "@/components/seo/LandingTemplate";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Resume & Cover Letter Generator from Job Description | TruthCV",
  description:
    "Generate tailored resumes and honest 3-paragraph cover letters directly from any job description. Includes under-300-char LinkedIn recruiter cold DM.",
  alternates: {
    canonical: "https://truthcv.com/resume-and-cover-letter-generator",
  },
  keywords: [
    "resume and cover letter generator from job description",
    "ai cover letter generator",
    "tailored resume and cover letter",
    "linkedin recruiter cold message generator",
  ],
};

const FAQS = [
  {
    question: "How does the Cover Letter generator avoid sounding generic?",
    answer:
      "Most AI cover letters are vague fluff. TruthCV writes a concise 3-paragraph letter that directly links two specific projects or accomplishments from your Master Vault to the exact pain points highlighted in the job posting.",
  },
  {
    question: "What is the Recruiter Cold DM?",
    answer:
      "When reaching out to recruiters on LinkedIn, message requests are capped at 300 characters. TruthCV crafts a punchy, tailored cold message that mentions the exact job title and your #1 matching skill within the character limit.",
  },
  {
    question: "Can I edit the generated cover letter and message?",
    answer:
      "Absolutely. Both the cover letter and the recruiter message are fully editable in our interactive workspace, with 1-click copy to clipboard buttons.",
  },
];

export default function ResumeAndCoverLetterGeneratorPage() {
  return (
    <LandingTemplate
      h1="Resume & Cover Letter Generator from Any Job Description."
      subtitle="Matched tone, aligned bullet points, and recruiter cold DM included. Everything you need to submit a compelling, 100% honest application package."
      targetKeyword="resume and cover letter generator from job description"
      canonicalUrl="https://truthcv.com/resume-and-cover-letter-generator"
      faqs={FAQS}
      angleBadge="Complete Application Suite"
    />
  );
}
