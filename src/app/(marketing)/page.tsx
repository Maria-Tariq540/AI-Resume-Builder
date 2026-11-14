import { Metadata } from "next";
import { LandingTemplate } from "@/components/seo/LandingTemplate";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Free AI Resume Builder (Zero-Lies & No Hallucinations) | TruthCV",
  description:
    "Build once and tailor honestly for every job application. TruthCV uses your verified Master Career Vault to optimize bullets without inventing fake skills or metrics.",
  alternates: {
    canonical: "https://truthcv.com",
  },
  keywords: [
    "free resume builder",
    "free ai resume builder",
    "honest resume builder",
    "zero hallucination resume",
    "ats resume builder",
  ],
};

const FAQS = [
  {
    question: "How does TruthCV ensure the AI never lies or hallucinates?",
    answer:
      "Unlike generic tools like ChatGPT, TruthCV enforces a mathematical Zero-Hallucination rule. It binds the AI strictly to your Master Career Vault. The AI can reorder, reframe, and align vocabulary to the job description, but it is strictly forbidden by strict schema validation from introducing unverified tools, unearned titles, or fabricated metrics.",
  },
  {
    question: "Is TruthCV really free without a paywall?",
    answer:
      "Yes. Guest users can paste their resume and job description, run the full Fit Gatekeeper check, view the line-by-line Track Changes diff, and test all features without entering a credit card or signing up.",
  },
  {
    question: "Are the generated resumes ATS-compliant?",
    answer:
      "100%. Our PDFs are generated as single-column documents with standard ATS headers (SUMMARY, EXPERIENCE, PROJECTS, SKILLS, EDUCATION), clear typography, and selectable text. We never use multi-column tables, SVG graphs, or nested frames that confuse Workday, Taleo, and Greenhouse parsers.",
  },
  {
    question: "What is the Master Career Vault?",
    answer:
      "Your Master Vault is your single source of career truth. Instead of editing your resume from scratch for every company, you store all your legitimate projects, responsibilities, and achievements once. TruthCV then draws from this repository to customize resumes for specific roles.",
  },
];

export default function HomePage() {
  return (
    <LandingTemplate
      h1="Free AI Resume Builder That Never Lies About Your Experience."
      subtitle="Build once, tailor honestly for every job. TruthCV aligns your real achievements to target job descriptions with line-by-line track changes and zero hallucinated claims."
      targetKeyword="free resume builder"
      canonicalUrl="https://truthcv.com"
      faqs={FAQS}
      angleBadge="Free AI Resume Builder"
    />
  );
}
