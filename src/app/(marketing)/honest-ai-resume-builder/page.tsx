import { Metadata } from "next";
import { LandingTemplate } from "@/components/seo/LandingTemplate";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "The Honest AI Resume Builder (Zero Hallucinations) | TruthCV",
  description:
    "AI resume tailor without lying. Reframe your real achievements with zero fabricated buzzwords, zero made-up metrics, and full confidence in your interview.",
  alternates: {
    canonical: "https://truthcv.com/honest-ai-resume-builder",
  },
  keywords: [
    "ai resume tailor without lying",
    "honest ai resume builder",
    "zero hallucination resume generator",
    "ethical ai resume maker",
  ],
};

const FAQS = [
  {
    question: "Why do so many candidates get rejected for ChatGPT resumes?",
    answer:
      "Recruiters can spot generic buzzwords ('spearheaded dynamic synergies', 'revolutionized paradigms') instantly. Even worse, generic LLMs frequently fabricate experience with technologies you've never used. When a hiring manager asks you to explain the metric or code on the phone, the illusion shatters.",
  },
  {
    question: "What does 'Zero-Hallucination' actually mean?",
    answer:
      "In TruthCV, every suggested revision must cite a specific fact, project, or role present in your verified Master Vault. The AI model output is strictly validated against schemas that reject any hallucinated claims or invented statistics.",
  },
  {
    question: "What are the 'Interview Defense' cards?",
    answer:
      "For every application, TruthCV anticipates 5 difficult, probing questions a hiring manager will ask regarding your reframed bullets and any missing requirements. It supplies you with an honest, conversational script so you can answer transparently with confidence.",
  },
];

export default function HonestAiResumeBuilderPage() {
  return (
    <LandingTemplate
      h1="The Honest AI Resume Builder (Zero Hallucinations)."
      subtitle="Reframe your real achievements—zero fabricated buzzwords. Be 100% prepared to defend every single bullet point in your technical interview."
      targetKeyword="ai resume tailor without lying"
      canonicalUrl="https://truthcv.com/honest-ai-resume-builder"
      faqs={FAQS}
      angleBadge="Ethical Zero-Hallucination Engine"
    />
  );
}
