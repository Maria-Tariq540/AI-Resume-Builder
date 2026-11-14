"use client";

import React from "react";
import { ShieldCheck, AlertOctagon, CheckCircle2, AlertTriangle, ArrowRight, Info } from "lucide-react";

interface FitGatekeeperCardProps {
  score: number;
  verdict: string;
  matchedSkills: string[];
  missingRequirements: string[];
  recommendationNote?: string;
  onProceedToDiff?: () => void;
}

export function FitGatekeeperCard({
  score,
  verdict,
  matchedSkills,
  missingRequirements,
  recommendationNote,
  onProceedToDiff,
}: FitGatekeeperCardProps) {
  // Determine color theme based on score/verdict
  let badgeColor = "bg-amber-100 text-amber-800 border-amber-300";
  let gaugeColor = "text-amber-500";
  let verdictIcon = <AlertTriangle className="w-5 h-5 text-amber-500" />;

  if (score >= 80) {
    badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
    gaugeColor = "text-emerald-500";
    verdictIcon = <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
  } else if (score < 60) {
    badgeColor = "bg-red-100 text-red-800 border-red-300";
    gaugeColor = "text-red-500";
    verdictIcon = <AlertOctagon className="w-5 h-5 text-red-600" />;
  }

  // Circular gauge calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-5">
          {/* Circular Score Gauge */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className={`${gaugeColor} transition-all duration-1000 ease-out`}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900 leading-none">{score}</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                / 100
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeColor}`}>
                {verdictIcon}
                {verdict}
              </span>
              <span className="text-xs text-slate-400">Step 1 of 3</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              &ldquo;Should You Even Apply?&rdquo; Gatekeeper
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Strict truth analysis comparing your Master Vault against Job Requirements.
            </p>
          </div>
        </div>

        {onProceedToDiff && (
          <button
            onClick={onProceedToDiff}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer shadow-sm"
          >
            <span>Review Line-by-Line Diff</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Honest Advice Banner */}
      {recommendationNote && (
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Blunt Career Coach Assessment
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{recommendationNote}</p>
          </div>
        </div>
      )}

      {/* Two Column Breakdown: Matched vs Missing */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verified Matched Skills ({matchedSkills.length})
            </h4>
            <span className="text-[10px] text-emerald-600 font-medium">Found in Vault</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100/80 text-emerald-900 border border-emerald-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Non-Negotiables */}
        <div className="p-5 rounded-xl border border-red-100 bg-red-50/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Missing Hard Requirements ({missingRequirements.length})
            </h4>
            <span className="text-[10px] text-red-600 font-medium">Honest Gaps</span>
          </div>

          {missingRequirements.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No critical dealbreakers missing! Great fit.</p>
          ) : (
            <ul className="space-y-2">
              {missingRequirements.map((item, idx) => (
                <li
                  key={idx}
                  className="text-xs text-red-900 bg-white/80 border border-red-200 px-2.5 py-1.5 rounded-lg flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="text-[11px] text-slate-500 mt-3 italic">
            *TruthCV will NEVER invent these skills on your resume. Instead, use the Interview Defense Tab to address them transparently.
          </p>
        </div>
      </div>
    </div>
  );
}
