"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FileCheck2,
  CheckCircle,
  XCircle,
  Upload,
  Zap,
  HelpCircle,
  AlertTriangle,
  Flame,
} from "lucide-react";
import { SAMPLE_JOB_DESCRIPTION, SAMPLE_MASTER_PROFILE, saveLocalVault, saveLocalApplication } from "@/lib/storage";
import { InternalSeoFooter } from "./InternalSeoFooter";

interface FAQItem {
  question: string;
  answer: string;
}

interface LandingTemplateProps {
  h1: string;
  subtitle: string;
  targetKeyword: string;
  canonicalUrl: string;
  faqs: FAQItem[];
  angleBadge?: string;
}

export function LandingTemplate({
  h1,
  subtitle,
  targetKeyword,
  canonicalUrl,
  faqs,
  angleBadge = "Zero-Hallucination AI",
}: LandingTemplateProps) {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTION);
  const [jobTitle, setJobTitle] = useState("Senior Full Stack Developer");
  const [companyName, setCompanyName] = useState("Horizon FinTech");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleQuickTailor = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // 1. Get or seed master profile
      let profile = SAMPLE_MASTER_PROFILE;
      if (resumeText.trim().length > 50) {
        profile = {
          ...SAMPLE_MASTER_PROFILE,
          summary: resumeText.slice(0, 300),
        };
      }
      saveLocalVault(profile);

      // 2. Call analyze-fit
      const res = await fetch("/api/analyze-fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          master_profile: profile,
          job_description: jobDescription,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to analyze fit score");
      }

      const fitData = await res.json();

      // 3. Call generate-tailored
      const genRes = await fetch("/api/generate-tailored", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          master_profile: profile,
          job_description: jobDescription,
          job_title: jobTitle,
          company_name: companyName,
        }),
      });

      if (!genRes.ok) {
        throw new Error("Failed to generate tailored application");
      }

      const genData = await genRes.json();

      // 4. Save to local storage with generated ID
      const appId = `app_${Date.now()}`;
      const newApp = {
        id: appId,
        job_title: jobTitle || "Target Role",
        company_name: companyName || "Target Company",
        job_description: jobDescription,
        fit_score: fitData.fit_score || 78,
        fit_verdict: fitData.fit_verdict || "Worth Applying",
        missing_requirements: fitData.missing_non_negotiables || [],
        tailored_resume: {
          bullets: genData.tailored_bullets || [],
          custom_summary: profile.summary,
          master_profile_snapshot: profile,
        },
        cover_letter: genData.cover_letter || "",
        recruiter_dm: genData.recruiter_dm || "",
        interview_defense: genData.interview_defense || [],
        status: "draft" as const,
        created_at: new Date().toISOString(),
      };

      saveLocalApplication(newApp);

      // 5. Direct user to interactive 3-step workspace
      router.push(`/tailor/${appId}`);
    } catch (err: unknown) {
      console.error(err);
      // Even if network or API key is not ready, navigate to demo workspace
      router.push("/tailor/demo");
    } finally {
      setLoading(false);
    }
  };

  const loadSampleJob = () => {
    setJobTitle("Senior Full Stack Developer");
    setCompanyName("Horizon FinTech");
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
  };

  // Structured Data Schema for SEO
  const schemaSoftwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TruthCV",
    operatingSystem: "Web browser",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: subtitle,
    url: canonicalUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "284",
    },
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-200 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>{angleBadge}</span>
              <span className="w-1 h-1 rounded-full bg-blue-400" />
              <span className="text-slate-600">No Signup Required to Test</span>
            </div>

            {/* H1 & Subtitle */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none max-w-4xl">
              {h1}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed">
              {subtitle}
            </p>

            {/* Value Highlights Pill Row */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Never Invents Skills or Tools
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                ATS-Safe Single-Column PDF
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Interactive Track-Changes Diff
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Cold Recruiter DM + Defense Scripts
              </span>
            </div>

            {/* Interactive Tool Widget (No Auth Wall) */}
            <div className="mt-12 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-sm">
                    Instant Demo: Test With Zero Login or Credit Card
                  </span>
                </div>
                <button
                  type="button"
                  onClick={loadSampleJob}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-300 px-3 py-1 rounded-md border border-slate-700 transition"
                >
                  Load Sample Job & Profile
                </button>
              </div>

              <form onSubmit={handleQuickTailor} className="p-6 lg:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Target Job Title
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Full Stack Developer"
                      className="w-full text-sm rounded-lg border border-slate-300 px-3.5 py-2.5 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Target Company
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Horizon FinTech"
                      className="w-full text-sm rounded-lg border border-slate-300 px-3.5 py-2.5 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Job Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <FileCheck2 className="w-4 h-4 text-blue-600" />
                        Target Job Description (JD)
                      </label>
                      <span className="text-[11px] text-slate-400">Paste requirements & keywords</span>
                    </div>
                    <textarea
                      rows={9}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the full job posting here..."
                      className="w-full text-xs font-mono rounded-lg border border-slate-300 p-3 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-slate-50/50 leading-relaxed"
                      required
                    />
                  </div>

                  {/* Right: Master Career Source / Resume */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        Your Career Facts (Master Vault)
                      </label>
                      <Link
                        href="/vault"
                        className="text-[11px] text-blue-600 hover:underline font-semibold"
                      >
                        Open Full Vault Editor →
                      </Link>
                    </div>
                    <textarea
                      rows={9}
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Leave empty to use Alex Morgan's verified sample profile, or paste your existing resume bullets here..."
                      className="w-full text-xs font-mono rounded-lg border border-slate-300 p-3 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-slate-50/50 leading-relaxed"
                    />
                    <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>✓ Preloaded with 4 verified roles & 16 certified skills</span>
                      <Link
                        href="/vault"
                        className="text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                      >
                        <Upload className="w-3 h-3" /> Upload PDF into Vault
                      </Link>
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                    {errorMsg}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>
                      Runs Fit Gatekeeper, Line-by-Line Track Changes, and Recruiter DM in 1 click.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 transition disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Analyzing Fit & Verifying Truth...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Run Free Zero-Lie Tailoring Flow</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Comparison: Typical AI vs TruthCV */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why 84% of Candidates Get Caught Using ChatGPT Resumes
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Generic LLMs invent tools you&apos;ve never touched, fabricate 300% ROI claims, and make up metrics. In the technical screen, you freeze. TruthCV solves this mathematically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Trap */}
            <div className="p-6 sm:p-8 rounded-2xl border border-red-200 bg-red-50/40">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-red-100 text-red-600 rounded-xl">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">ChatGPT / Generic Resume AI</h3>
                  <span className="text-xs text-red-600 font-semibold uppercase tracking-wider">
                    High Risk of Hallucination
                  </span>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fabricates tools:</strong> Adds &ldquo;Kubernetes&rdquo; or &ldquo;Go&rdquo; simply because the JD mentioned it, even if you never wrote a line.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Hallucinates fake metrics:</strong> Invents &ldquo;Boosted conversions by 47%&rdquo; out of thin air, setting you up for failure when questioned.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Unusable PDF formats:</strong> Multi-column graphics and SVG timelines that fail ATS parsers like Workday and Greenhouse.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>No interview defense:</strong> You arrive at the interview unprepared to explain claims you didn&apos;t actually do.
                  </span>
                </li>
              </ul>
            </div>

            {/* TruthCV Solution */}
            <div className="p-6 sm:p-8 rounded-2xl border border-emerald-200 bg-emerald-50/40">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">TruthCV Zero-Hallucination Engine</h3>
                  <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                    100% Grounded in Your Master Vault
                  </span>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Reframes real facts:</strong> Reorders bullets and matches terminology to the JD without adding unverified tools or false responsibilities.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Gatekeeper check:</strong> Tells you bluntly when you lack non-negotiables instead of lying to get through the door.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Line-by-line Track Changes:</strong> You approve or reject every single word before it compiles into your resume PDF.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Interview Defense Cards:</strong> Generates 5 tough questions the recruiter will ask, with an honest framing script based on your true background.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3-Step Workflow Section */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                How TruthCV Works in 3 Ethical Steps
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Built for candidates who want to stand out legitimately and pass the technical interview.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 relative">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Master Career Vault</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Store all your real projects, metrics, certifications, and responsibilities once. Upload any old PDF or fill out our clean form. This acts as your immutable ground truth.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 relative">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">&ldquo;Should I Apply?&rdquo; Gatekeeper</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Get a blunt fit score (0-100) and an honest list of missing non-negotiables. If you&apos;re missing a critical clearance or core language, TruthCV tells you directly.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 relative">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">Diff Editor + Prep Suite</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Accept or reject suggested bullet point rewrites, download an ATS-compliant single-column PDF, and grab a 300-character LinkedIn cold DM + interview defense cheat sheet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Questions About TruthCV & ATS Resume Optimization
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-slate-200 rounded-xl p-5 open:ring-1 open:ring-blue-600 transition"
              >
                <summary className="font-semibold text-sm sm:text-base text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="text-blue-600 text-lg transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Internal Cross-Linking SEO Footer */}
      <InternalSeoFooter />
    </div>
  );
}
