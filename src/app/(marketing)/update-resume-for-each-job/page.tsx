import { Metadata } from "next";
import { LandingTemplate } from "@/components/seo/LandingTemplate";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Update Your Resume for Each Job Automatically | TruthCV",
  description:
    "Update your resume for each job automatically without manual re-writing. Store your Master Career Vault once and generate targeted, ATS-safe versions per role.",
  alternates: {
    canonical: "https://truthcv.com/update-resume-for-each-job",
  },
  keywords: [
    "update resume for each job",
    "customize resume per job",
    "tailor resume for every application",
    "career vault resume generator",
  ],
};

const FAQS = [
  {
    question: "How does updating a resume for each job improve callback rates?",
    answer:
      "Recruiters and ATS software prioritize resumes that demonstrate immediate relevance to the specific requirements of the role. Customizing your phrasing and bullet emphasis for each application increases interview invitations by up to 300%.",
  },
  {
    question: "Do I have to retype my experience every time?",
    answer:
      "No! That is the core advantage of TruthCV's Master Career Vault. You enter all your accomplishments, metrics, and skills once into your Vault. Whenever you want to apply to a new role, TruthCV automatically pulls and reorders relevant bullet points in seconds.",
  },
  {
    question: "Can I manage multiple tailored versions?",
    answer:
      "Yes. The TruthCV Dashboard tracks every job application you generate, keeping full version history, fit scores, tailored PDFs, cover letters, and recruiter notes in one organized place.",
  },
];

export default function UpdateResumeForEachJobPage() {
  return (
    <LandingTemplate
      h1="Update Your Resume for Each Job Automatically."
      subtitle="Store your Master Career Vault once and generate targeted versions per role. Never duplicate manual tailoring effort again."
      targetKeyword="update resume for each job"
      canonicalUrl="https://truthcv.com/update-resume-for-each-job"
      faqs={FAQS}
      angleBadge="Multi-Version Career Vault"
    />
  );
}
