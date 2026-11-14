"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  ArrowRight,
  ExternalLink,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Trash2,
} from "lucide-react";
import { JobApplication } from "@/lib/schemas/ai-outputs";
import { getLocalApplications, saveLocalApplication, SAMPLE_JOB_DESCRIPTION, SAMPLE_MASTER_PROFILE } from "@/lib/storage";

export default function DashboardPage() {
  const [apps, setApps] = useState<JobApplication[]>([]);

  useEffect(() => {
    const list = getLocalApplications();
    setApps(list);
  }, []);

  const createDemoApplication = () => {
    const demoApp: JobApplication = {
      id: `app_${Date.now()}`,
      job_title: "Senior Full Stack Developer",
      company_name: "Horizon FinTech",
      job_description: SAMPLE_JOB_DESCRIPTION,
      fit_score: 82,
      fit_verdict: "Strong Match",
      missing_requirements: ["Kubernetes (EKS)", "Terraform IaC"],
      tailored_resume: {
        bullets: [
          {
            id: "diff-1",
            parent_id: "exp-1",
            section: "experience",
            original_text: "Architected core high-throughput payment processing microservice handling $12M+ monthly transaction volume with 99.98% uptime using Node.js and PostgreSQL.",
            suggested_text: "Architected core high-throughput financial payment microservice handling $12M+ monthly transaction volume with 99.98% uptime using Node.js and PostgreSQL.",
            reason: "Emphasizes FinTech transaction reliability from JD",
            truth_check: "Maintains original verified $12M volume and 99.98% uptime",
            accepted: true,
          },
          {
            id: "diff-2",
            parent_id: "exp-1",
            section: "experience",
            original_text: "Refactored legacy React customer checkout flows into Next.js App Router with Server Components, decreasing page load time from 3.2s to 1.1s.",
            suggested_text: "Refactored legacy customer checkout flows into Next.js App Router with React Server Components, decreasing page load latency from 3.2s to 1.1s.",
            reason: "Highlights Next.js & latency optimization keywords from JD",
            truth_check: "Retains verified speed metrics",
            accepted: true,
          },
        ],
        master_profile_snapshot: SAMPLE_MASTER_PROFILE,
      },
      cover_letter: `Dear Hiring Team at Horizon FinTech,\n\nI am thrilled to apply for the Senior Full Stack Developer role. With 5+ years building scalable TypeScript microservices handling $12M+ monthly volume, my background matches your wealth management goals.\n\nSincerely,\nAlex Morgan`,
      recruiter_dm: `Hi! I saw the Senior Full Stack Developer opening at Horizon FinTech. With 5+ yrs engineering high-throughput TypeScript & PostgreSQL services, I'd love to connect.`,
      interview_defense: [
        {
          question: "How do you handle lack of Kubernetes in production?",
          why_asked: "Verifying container orchestration capabilities.",
          honest_framing: "I run production containers on Docker & AWS ECS, with deep CI/CD experience in GitHub Actions. I can master EKS tooling quickly.",
        },
      ],
      status: "applied",
      created_at: new Date().toISOString(),
    };

    saveLocalApplication(demoApp);
    setApps([demoApp, ...apps]);
  };

  const deleteApplication = (id: string) => {
    if (confirm("Are you sure you want to delete this tailored application?")) {
      const next = apps.filter((a) => a.id !== id);
      setApps(next);
      localStorage.setItem("truthcv_applications", JSON.stringify(next));
    }
  };

  const updateStatus = (id: string, newStatus: JobApplication["status"]) => {
    const next = apps.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    setApps(next);
    localStorage.setItem("truthcv_applications", JSON.stringify(next));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Applications Tracker
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track every tailored resume version, fit score, and cold DM generated from your Master Vault.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/tailor/demo"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Tailoring Session</span>
          </Link>
        </div>
      </div>

      {/* Applications List */}
      <div className="mt-8 space-y-4">
        {apps.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Applications Saved Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              Start by pasting a job description on the home page, or load a sample tailored application to see the 3-step workspace in action.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={createDemoApplication}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition"
              >
                Load Sample Application (Horizon FinTech)
              </button>
              <Link
                href="/"
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
              >
                Go to Landing Page
              </Link>
            </div>
          </div>
        ) : (
          apps.map((app) => {
            let badgeBg = "bg-amber-100 text-amber-800 border-amber-300";
            if (app.fit_score >= 80) badgeBg = "bg-emerald-100 text-emerald-800 border-emerald-300";
            else if (app.fit_score < 60) badgeBg = "bg-red-100 text-red-800 border-red-300";

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs hover:border-slate-300 transition"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-slate-900">{app.job_title}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {app.company_name}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}>
                      {app.fit_score}% Fit ({app.fit_verdict})
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 line-clamp-2 max-w-2xl font-mono">
                    {app.job_description.slice(0, 160)}...
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {app.created_at ? new Date(app.created_at).toLocaleDateString() : "Recent"}
                    </span>
                    {app.missing_requirements && app.missing_requirements.length > 0 && (
                      <span className="text-amber-600">
                        {app.missing_requirements.length} missing non-negotiables identified
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Status Dropdown */}
                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value as JobApplication["status"])}
                    className="text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 bg-slate-50 text-slate-700 font-medium"
                  >
                    <option value="draft">Draft</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <Link
                    href={`/tailor/${app.id}`}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
                  >
                    <span>Open Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => deleteApplication(app.id)}
                    className="p-2 text-slate-400 hover:text-red-600 transition cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
