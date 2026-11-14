import { Metadata } from "next";
import { LandingTemplate } from "@/components/seo/LandingTemplate";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tailor Resume to Job Description in 30 Seconds | TruthCV",
  description:
    "Tailor your resume to any job description with line-by-line ATS keyword alignment. Never invent fake skills. Reframes verified accomplishments accurately.",
  alternates: {
    canonical: "https://truthcv.com/tailor-resume-to-job-description",
  },
  keywords: [
    "tailor resume to job description",
    "customize resume for job description",
    "ats keyword resume optimizer",
    "resume job description alignment",
  ],
};

const FAQS = [
  {
    question: "How does line-by-line tailoring work?",
    answer:
      "TruthCV analyzes your target job description and compares each requirement against the verified bullets in your Master Career Vault. It highlights where matching skills exist and rewrites bullets to emphasize relevant terminology, presenting an interactive Accept/Reject toggle for every change.",
  },
  {
    question: "Will the AI add keywords for skills I do not have?",
    answer:
      "Never. TruthCV's Zero-Hallucination prompt constraint strictly checks that every output bullet references only tools, accomplishments, and responsibilities explicitly recorded in your Vault. If a JD requires a skill you lack, it flags it as a missing requirement rather than lying.",
  },
  {
    question: "How does this help bypass ATS filters?",
    answer:
      "Applicant Tracking Systems scan for exact or synonymous terminology. By aligning the specific verbs and nouns you actually used to match the phrasing in the job description, your resume achieves high relevance scores legitimately.",
  },
];

export default function TailorResumePage() {
  return (
    <LandingTemplate
      h1="Tailor Your Resume to Any Job Description in 30 Seconds."
      subtitle="Line-by-line ATS keyword alignment without fake skills. Rephrase and highlight your authentic achievements to match recruiter criteria perfectly."
      targetKeyword="tailor resume to job description"
      canonicalUrl="https://truthcv.com/tailor-resume-to-job-description"
      faqs={FAQS}
      angleBadge="Instant ATS Keyword Alignment"
    />
  );
}
