"use client";

import React, { useState } from "react";
import { ShieldAlert, HelpCircle, MessageSquareQuote, CheckCircle, ChevronDown } from "lucide-react";
import { InterviewDefenseQuestion } from "@/lib/schemas/ai-outputs";

interface InterviewDefenseTabProps {
  questions: InterviewDefenseQuestion[];
}

export function InterviewDefenseTab({ questions }: InterviewDefenseTabProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
        No interview defense questions generated yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6 flex items-start gap-4 shadow-xs">
        <div className="p-2.5 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-amber-950">
            &ldquo;Defend Your Resume&rdquo; Technical Screen Prep
          </h3>
          <p className="text-xs sm:text-sm text-amber-900/90 mt-1 leading-relaxed">
            Hiring managers grill candidates on their biggest resume jumps and missing requirements.
            These 5 questions anticipate where interviewers will push hardest, giving you an honest, high-confidence script.
          </p>
        </div>
      </div>

      {/* Accordion Cards */}
      <div className="space-y-3">
        {questions.map((item, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/60 transition cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h4>
                    <span className="text-[11px] text-slate-500 mt-1 inline-block">
                      Recruiter Angle: {item.why_asked}
                    </span>
                  </div>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                    isOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                  {/* Why they ask */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                      The Hidden Recruiter Skepticism
                    </div>
                    <p className="text-slate-600 leading-relaxed">{item.why_asked}</p>
                  </div>

                  {/* Honest Framing Script */}
                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                      <MessageSquareQuote className="w-4 h-4 text-emerald-600" />
                      Honest & Grounded Answering Script
                    </div>
                    <p className="text-slate-900 font-medium leading-relaxed font-sans italic">
                      &ldquo;{item.honest_framing}&rdquo;
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-emerald-200/60 flex items-center gap-1.5 text-[11px] text-emerald-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Never confesses weakness blindly; bridges honestly to your verified wins.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
