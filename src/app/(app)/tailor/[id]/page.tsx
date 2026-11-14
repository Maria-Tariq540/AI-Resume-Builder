"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileText,
  MessageSquare,
  HelpCircle,
  FileDown,
  ArrowLeft,
  Building2,
  Briefcase,
  Share2,
} from "lucide-react";
import { JobApplication, BulletDiffItem, MasterProfile } from "@/lib/schemas/ai-outputs";
import {
  getLocalApplicationById,
  saveLocalApplication,
  getLocalVault,
  SAMPLE_MASTER_PROFILE,
  SAMPLE_JOB_DESCRIPTION,
} from "@/lib/storage";
import { FitGatekeeperCard } from "@/components/workspace/FitGatekeeperCard";
import { BulletDiffEditor } from "@/components/workspace/BulletDiffEditor";
import { CoverLetterAndDmTab } from "@/components/workspace/CoverLetterAndDmTab";
import { InterviewDefenseTab } from "@/components/workspace/InterviewDefenseTab";

// Dynamically import PDF Download Button to avoid SSR canvas/window issues
const PdfDownloadButton = dynamic(
  () => import("@/components/pdf/PdfDownloadButton").then((mod) => mod.PdfDownloadButton),
  { ssr: false }
);

export default function TailorWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "demo";

  const [app, setApp] = useState<JobApplication | null>(null);
  const [activeTab, setActiveTab] = useState<"fit" | "diff" | "cover" | "interview" | "export">("fit");
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    let currentApp = getLocalApplicationById(id);

    if (!currentApp) {
      // If demo or newly visited, initialize from sample vault & JD
      const vault = getLocalVault();
      const defaultBullets: BulletDiffItem[] = [];

      let bulletCounter = 1;
      for (const exp of vault.experience || []) {
        for (const b of exp.bullets || []) {
          let suggested = b;
          let reason = "Aligns terminology to high-throughput criteria";
          let truth = "Verified from your role at " + exp.company;

          if (b.toLowerCase().includes("payment")) {
            suggested = b.replace(
              /payment processing microservice/i,
              "resilient high-throughput transaction microservice"
            );
            reason = "Matches FinTech financial reliability requirements";
            truth = "Preserves original verified $12M volume and 99.98% uptime";
          } else if (b.toLowerCase().includes("checkout")) {
            suggested = b.replace(
              /customer checkout flows into next.js app router/i,
              "high-conversion interfaces into Next.js App Router"
            );
            reason = "Highlights Next.js frontend performance criteria";
            truth = "Retains verified speed improvement (3.2s to 1.1s)";
          }

          defaultBullets.push({
            id: `b-${bulletCounter++}`,
            parent_id: exp.id,
            section: "experience",
            original_text: b,
            suggested_text: suggested,
            reason,
            truth_check: truth,
            accepted: true,
          });
        }
      }

      currentApp = {
        id: id === "demo" ? "demo" : id,
        job_title: "Senior Full Stack Developer",
        company_name: "Horizon FinTech",
        job_description: SAMPLE_JOB_DESCRIPTION,
        fit_score: 78,
        fit_verdict: "Worth Applying",
        missing_requirements: [
          "Kubernetes (EKS / Production Container Orchestration)",
          "Terraform Infrastructure as Code",
        ],
        tailored_resume: {
          bullets: defaultBullets,
          custom_summary: vault.summary,
          master_profile_snapshot: vault,
        },
        cover_letter: `Dear Hiring Team at Horizon FinTech,\n\nI am writing to express my strong enthusiasm for the Senior Full Stack Developer position. With over five years of full-stack engineering experience specializing in high-throughput TypeScript, Node.js services, and optimized PostgreSQL databases, I have spent my career solving the exact performance and reliability challenges outlined in your posting.\n\nAt Vanguard Tech Labs, I architected a core payment microservice that processed over $12M in monthly transaction volume with 99.98% uptime, while leading frontend optimizations in Next.js that reduced customer checkout latency from 3.2s to 1.1s. These experiences directly match your mission to build a resilient, real-time wealth management platform.\n\nWhile my background has primarily focused on AWS ECS and Docker rather than bare Kubernetes or Terraform, my deep familiarity with containerization and continuous integration ensures I will ramp up rapidly. I look forward to discussing how my verified technical wins can deliver immediate value.\n\nSincerely,\n${vault.full_name}`,
        recruiter_dm: `Hi! I saw the Senior Full Stack Developer role at Horizon FinTech. With 5+ yrs building scalable TypeScript & Node services handling $12M+ monthly volume, I'd love to connect and share how my background aligns with your wealth platform.`,
        interview_defense: [
          {
            question: "How did you achieve a 42% reduction in database latency at your previous role?",
            why_asked: "Recruiters test whether you actually executed database optimizations or simply put PostgreSQL on your resume.",
            honest_framing: "At Vanguard, we analyzed slow query logs under high transaction volume. We identified unindexed foreign keys on the transactions table and introduced Redis caching for read-heavy account balances, which dropped p95 response time from 180ms to 105ms.",
          },
          {
            question: "Our role requires heavy Kubernetes (EKS) and Terraform. How will you bridge this gap?",
            why_asked: "They noticed these non-negotiables were not explicitly in your primary stack.",
            honest_framing: "I have managed production containers with Docker and orchestrated services on AWS ECS with automated CI/CD in GitHub Actions. While I have not written Terraform modules in production, I understand declarative infrastructure concepts and can become proficient in your deployment pipelines within two weeks.",
          },
          {
            question: "Can you walk us through the payment microservice you built that handles $12M+ monthly volume?",
            why_asked: "Verifying whether your metrics are authentic and how you handled edge cases like idempotency and race conditions.",
            honest_framing: "We implemented idempotency keys for every API call, used PostgreSQL row-level locks during balance deductions, and integrated webhook retry queues to ensure zero double-charges during network timeouts.",
          },
          {
            question: "Why migrate checkout to Next.js App Router instead of remaining on standard React SPA?",
            why_asked: "Testing whether you understand server components, streaming, and modern web architecture.",
            honest_framing: "Our client bundle had ballooned to 2.4MB. By migrating to Next.js Server Components, we offloaded heavy rendering to the server, dramatically improving First Contentful Paint and reducing checkout drop-off.",
          },
          {
            question: "What was your approach to mentoring junior engineers and raising test coverage to 88%?",
            why_asked: "Assessing engineering culture and senior leadership capability.",
            honest_framing: "Instead of mandate, I introduced PR review checklists and pair-programming sessions on writing isolated Jest unit tests for edge cases, which naturally encouraged the team to adopt test-driven habits.",
          },
        ],
        status: "draft",
        created_at: new Date().toISOString(),
      };

      saveLocalApplication(currentApp);
    }

    setApp(currentApp);
  }, [id]);

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500">Loading Tailored Workspace...</p>
        </div>
      </div>
    );
  }

  // Diff toggles
  const handleToggleAccept = (bulletId: string) => {
    const updatedBullets = app.tailored_resume.bullets.map((b) =>
      b.id === bulletId ? { ...b, accepted: !b.accepted } : b
    );
    const updatedApp = {
      ...app,
      tailored_resume: {
        ...app.tailored_resume,
        bullets: updatedBullets,
      },
    };
    setApp(updatedApp);
    saveLocalApplication(updatedApp);
  };

  const handleAcceptAll = () => {
    const updatedBullets = app.tailored_resume.bullets.map((b) => ({ ...b, accepted: true }));
    const updatedApp = {
      ...app,
      tailored_resume: {
        ...app.tailored_resume,
        bullets: updatedBullets,
      },
    };
    setApp(updatedApp);
    saveLocalApplication(updatedApp);
  };

  const handleRejectAll = () => {
    const updatedBullets = app.tailored_resume.bullets.map((b) => ({ ...b, accepted: false }));
    const updatedApp = {
      ...app,
      tailored_resume: {
        ...app.tailored_resume,
        bullets: updatedBullets,
      },
    };
    setApp(updatedApp);
    saveLocalApplication(updatedApp);
  };

  const handleSaveCoverAndDm = (newCover: string, newDm: string) => {
    const updatedApp = {
      ...app,
      cover_letter: newCover,
      recruiter_dm: newDm,
    };
    setApp(updatedApp);
    saveLocalApplication(updatedApp);
  };

  const vaultSnapshot: MasterProfile = app.tailored_resume.master_profile_snapshot || SAMPLE_MASTER_PROFILE;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Workspace Sub-Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
              title="Back to Applications"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 leading-tight">
                  {app.job_title}
                </h1>
                <span className="text-slate-400">@</span>
                <span className="text-xs font-semibold text-slate-700">{app.company_name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {app.fit_score}% Fit
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Ground Truth: {vaultSnapshot.full_name}&apos;s Master Vault
              </p>
            </div>
          </div>

          {/* Quick PDF Action */}
          <div className="flex items-center gap-2">
            <PdfDownloadButton
              profile={vaultSnapshot}
              acceptedBullets={app.tailored_resume.bullets}
              fileName={`${vaultSnapshot.full_name || "Resume"}-${app.company_name}-TruthCV.pdf`}
            />
          </div>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-slate-100 text-xs font-medium">
          <button
            onClick={() => setActiveTab("fit")}
            className={`py-3 px-3.5 border-b-2 font-semibold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "fit"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>1. Fit Gatekeeper ({app.fit_score}%)</span>
          </button>

          <button
            onClick={() => setActiveTab("diff")}
            className={`py-3 px-3.5 border-b-2 font-semibold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "diff"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>2. Line-by-Line Track Changes Diff ({app.tailored_resume.bullets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("cover")}
            className={`py-3 px-3.5 border-b-2 font-semibold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "cover"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. Cover Letter & Recruiter DM</span>
          </button>

          <button
            onClick={() => setActiveTab("interview")}
            className={`py-3 px-3.5 border-b-2 font-semibold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "interview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>4. &ldquo;Defend Your Resume&rdquo; Prep (5 Cards)</span>
          </button>

          <button
            onClick={() => setActiveTab("export")}
            className={`py-3 px-3.5 border-b-2 font-semibold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "export"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>5. ATS PDF Export & Verify</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === "fit" && (
          <div className="space-y-6">
            <FitGatekeeperCard
              score={app.fit_score}
              verdict={app.fit_verdict}
              matchedSkills={vaultSnapshot.skills.slice(0, 8)}
              missingRequirements={app.missing_requirements || []}
              recommendationNote="Your background in high-throughput payments and React/Next.js aligns strongly with Horizon FinTech. You should highlight your PostgreSQL optimizations and be prepared to address the Kubernetes/Terraform gap in technical rounds."
              onProceedToDiff={() => setActiveTab("diff")}
            />

            {/* Target Job Description Preview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Target Job Posting Reference
              </h3>
              <pre className="text-xs font-mono bg-slate-50 p-4 rounded-xl text-slate-700 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                {app.job_description}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "diff" && (
          <BulletDiffEditor
            bullets={app.tailored_resume.bullets}
            onToggleAccept={handleToggleAccept}
            onAcceptAll={handleAcceptAll}
            onRejectAll={handleRejectAll}
          />
        )}

        {activeTab === "cover" && (
          <CoverLetterAndDmTab
            initialCoverLetter={app.cover_letter || ""}
            initialRecruiterDm={app.recruiter_dm || ""}
            jobTitle={app.job_title}
            companyName={app.company_name}
            onSave={handleSaveCoverAndDm}
          />
        )}

        {activeTab === "interview" && (
          <InterviewDefenseTab questions={app.interview_defense || []} />
        )}

        {activeTab === "export" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  ATS-Compliant Single Column Resume Document
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Single-column standard typography, zero parse-breaking graphics, selectable text.
                </p>
              </div>

              <PdfDownloadButton
                profile={vaultSnapshot}
                acceptedBullets={app.tailored_resume.bullets}
                fileName={`${vaultSnapshot.full_name || "Resume"}-${app.company_name}-TruthCV.pdf`}
              />
            </div>

            {/* Document Text Preview */}
            <div className="border border-slate-200 rounded-xl p-8 bg-slate-50/50 max-w-3xl mx-auto space-y-6 text-xs text-slate-800 font-sans shadow-inner">
              <div className="text-center border-b border-slate-300 pb-4">
                <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900">
                  {vaultSnapshot.full_name}
                </h2>
                <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap justify-center gap-2">
                  <span>{vaultSnapshot.email}</span>
                  <span>• {vaultSnapshot.phone}</span>
                  <span>• {vaultSnapshot.location}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Professional Summary
                </h4>
                <p className="text-slate-700 leading-relaxed">{vaultSnapshot.summary}</p>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Technical Skills
                </h4>
                <p className="text-slate-700">{vaultSnapshot.skills.join(" • ")}</p>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Professional Experience
                </h4>
                {vaultSnapshot.experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>
                        {exp.role} — {exp.company}
                      </span>
                      <span className="font-normal text-slate-500">
                        {exp.start_date} – {exp.end_date}
                      </span>
                    </div>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-700">
                      {exp.bullets.map((b, bIdx) => {
                        const matchedDiff = app.tailored_resume.bullets.find(
                          (item) => item.parent_id === exp.id && item.original_text === b
                        );
                        const displayedText =
                          matchedDiff && matchedDiff.accepted
                            ? matchedDiff.suggested_text
                            : b;

                        return (
                          <li key={bIdx} className="leading-relaxed">
                            {displayedText}
                            {matchedDiff && matchedDiff.accepted && matchedDiff.suggested_text !== b && (
                              <span className="ml-1 text-[10px] text-emerald-600 font-medium">
                                (Tailored)
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Featured Projects
                </h4>
                {vaultSnapshot.projects.map((proj) => (
                  <div key={proj.id} className="mb-3">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>
                        {proj.name} | {proj.tech_stack.join(", ")}
                      </span>
                      <span className="font-normal text-slate-500">{proj.link}</span>
                    </div>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-700">
                      {proj.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
