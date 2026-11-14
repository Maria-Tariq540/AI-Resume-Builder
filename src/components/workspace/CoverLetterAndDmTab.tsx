"use client";

import React, { useState } from "react";
import { Copy, Check, Send, Sparkles, FileText, ExternalLink } from "lucide-react";

interface CoverLetterAndDmTabProps {
  initialCoverLetter: string;
  initialRecruiterDm: string;
  jobTitle: string;
  companyName: string;
  onSave?: (coverLetter: string, dm: string) => void;
}

export function CoverLetterAndDmTab({
  initialCoverLetter,
  initialRecruiterDm,
  jobTitle,
  companyName,
  onSave,
}: CoverLetterAndDmTabProps) {
  const [coverLetter, setCoverLetter] = useState(initialCoverLetter);
  const [recruiterDm, setRecruiterDm] = useState(initialRecruiterDm);
  const [copiedCover, setCopiedCover] = useState(false);
  const [copiedDm, setCopiedDm] = useState(false);

  const handleCopyCover = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopiedCover(true);
    setTimeout(() => setCopiedCover(false), 2000);
  };

  const handleCopyDm = () => {
    navigator.clipboard.writeText(recruiterDm);
    setCopiedDm(true);
    setTimeout(() => setCopiedDm(false), 2000);
  };

  const dmCharCount = recruiterDm.length;
  const isOverLimit = dmCharCount > 300;

  return (
    <div className="space-y-8">
      {/* Recruiter Cold DM Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                <Send className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Recruiter LinkedIn Cold Connection Note
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Direct, high-impact outreach under the strict 300-character LinkedIn invitation limit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-mono font-bold ${
                isOverLimit ? "text-red-600" : "text-slate-600"
              }`}
            >
              {dmCharCount} / 300 chars
            </span>
            <button
              type="button"
              onClick={handleCopyDm}
              disabled={isOverLimit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold transition cursor-pointer"
            >
              {copiedDm ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedDm ? "Copied!" : "Copy Note"}</span>
            </button>
          </div>
        </div>

        <textarea
          rows={3}
          value={recruiterDm}
          onChange={(e) => {
            setRecruiterDm(e.target.value);
            onSave?.(coverLetter, e.target.value);
          }}
          className="w-full text-xs sm:text-sm font-mono rounded-xl border border-slate-300 p-3.5 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-slate-50/50 leading-relaxed"
          placeholder="Cold recruiter connection note..."
        />
        {isOverLimit && (
          <p className="text-xs text-red-600 mt-1">
            Warning: Message exceeds LinkedIn 300 character limit by {dmCharCount - 300} characters.
          </p>
        )}
      </div>

      {/* 3-Paragraph Targeted Cover Letter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
                <FileText className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Targeted 3-Paragraph Cover Letter
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Connects 2 specific projects/roles from your Master Vault directly to {companyName || "the company"}&apos;s pain points.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyCover}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 text-xs font-semibold transition cursor-pointer"
            >
              {copiedCover ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCover ? "Copied!" : "Copy Cover Letter"}</span>
            </button>
          </div>
        </div>

        <textarea
          rows={12}
          value={coverLetter}
          onChange={(e) => {
            setCoverLetter(e.target.value);
            onSave?.(e.target.value, recruiterDm);
          }}
          className="w-full text-xs sm:text-sm font-sans rounded-xl border border-slate-300 p-4 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-slate-50/50 leading-relaxed"
          placeholder="Targeted cover letter..."
        />

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>✓ Zero hallucinated experience claims</span>
          <span>100% editable</span>
        </div>
      </div>
    </div>
  );
}
