"use client";

import React from "react";
import { Check, X, ShieldCheck, Tag, Sparkles, CheckCheck } from "lucide-react";
import { BulletDiffItem } from "@/lib/schemas/ai-outputs";

interface BulletDiffEditorProps {
  bullets: BulletDiffItem[];
  onToggleAccept: (bulletId: string) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

export function BulletDiffEditor({
  bullets,
  onToggleAccept,
  onAcceptAll,
  onRejectAll,
}: BulletDiffEditorProps) {
  const acceptedCount = bullets.filter((b) => b.accepted).length;
  const changedCount = bullets.filter((b) => b.original_text !== b.suggested_text).length;

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              Line-by-Line Track Changes Diff Editor
            </h3>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              Step 2 of 3
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare original bullet points from your Vault against AI keyword optimizations. Only accepted changes compile into your PDF.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 mr-2">
            <strong>{acceptedCount}</strong> of {bullets.length} accepted
          </span>
          <button
            type="button"
            onClick={onAcceptAll}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-semibold cursor-pointer transition"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Accept All
          </button>
          <button
            type="button"
            onClick={onRejectAll}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 font-semibold cursor-pointer transition"
          >
            <X className="w-3.5 h-3.5" />
            Keep Originals
          </button>
        </div>
      </div>

      {/* Bullet Cards List */}
      <div className="space-y-4">
        {bullets.map((bullet, idx) => {
          const isChanged = bullet.original_text !== bullet.suggested_text;

          return (
            <div
              key={bullet.id || idx}
              className={`bg-white rounded-2xl border transition-all ${
                bullet.accepted
                  ? "border-emerald-200 shadow-xs ring-1 ring-emerald-500/10"
                  : "border-slate-200 opacity-80"
              } p-5 sm:p-6`}
            >
              {/* Card Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                    Bullet #{idx + 1} • {bullet.section}
                  </span>
                  {isChanged ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                      <Sparkles className="w-3 h-3" />
                      Rephrased for ATS
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">Exact match from Vault</span>
                  )}
                </div>

                {/* Accept / Reject Toggle Button */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleAccept(bullet.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      bullet.accepted
                        ? "bg-emerald-600 text-white shadow-xs hover:bg-emerald-700"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {bullet.accepted ? "Accepted (In PDF)" : "Accept Rewrite"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (bullet.accepted) onToggleAccept(bullet.id);
                    }}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      !bullet.accepted
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    {!bullet.accepted ? "Rejected (Original Kept)" : "Reject"}
                  </button>
                </div>
              </div>

              {/* Side-by-Side or Stacked Diff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {/* Original Bullet */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1 flex items-center justify-between">
                    <span>Original from Master Vault</span>
                    {!bullet.accepted && (
                      <span className="text-emerald-700 font-semibold">Active in Resume</span>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed font-mono text-xs">
                    {bullet.original_text}
                  </p>
                </div>

                {/* Suggested Reframing */}
                <div
                  className={`p-3.5 rounded-xl border ${
                    bullet.accepted
                      ? "bg-emerald-50/40 border-emerald-200"
                      : "bg-slate-50/50 border-slate-200"
                  }`}
                >
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide mb-1 flex items-center justify-between">
                    <span>Targeted Keyword Framing</span>
                    {bullet.accepted && (
                      <span className="text-emerald-700 font-semibold">Active in Resume</span>
                    )}
                  </div>
                  <p className="text-slate-900 leading-relaxed font-mono text-xs font-medium">
                    {bullet.suggested_text}
                  </p>
                </div>
              </div>

              {/* Reasoning & Zero-Hallucination Audit Box */}
              <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-1.5 text-slate-600">
                  <Tag className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-700">Keyword Alignment:</strong> {bullet.reason}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-emerald-800">Truth Check:</strong> {bullet.truth_check}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
