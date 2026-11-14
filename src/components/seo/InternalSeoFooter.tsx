import Link from "next/link";
import { ShieldAlert, CheckCircle2, Lock, Sparkles } from "lucide-react";

export const SEO_LINKS = [
  {
    href: "/",
    keyword: "Free AI Resume Builder",
    label: "Free Resume Builder (Zero-Lies)",
    desc: "Build once, tailor honestly for every job without hallucinated credentials.",
  },
  {
    href: "/tailor-resume-to-job-description",
    keyword: "Tailor Resume to Job Description",
    label: "Tailor to Job Description",
    desc: "Line-by-line ATS keyword alignment without fake metrics or made-up tools.",
  },
  {
    href: "/resume-job-match-checker",
    keyword: "Resume Job Match Checker",
    label: "Job Match & Fit Checker",
    desc: "Honest fit score & missing-requirement breakdown before wasting time.",
  },
  {
    href: "/update-resume-for-each-job",
    keyword: "Update Resume for Each Job",
    label: "Update Resume Per Job",
    desc: "Store your Master Career Vault once and generate targeted versions per role.",
  },
  {
    href: "/honest-ai-resume-builder",
    keyword: "Honest AI Resume Tailor Without Lying",
    label: "Honest AI Resume Builder",
    desc: "Reframe your real achievements with zero fabricated buzzwords.",
  },
  {
    href: "/resume-and-cover-letter-generator",
    keyword: "Resume and Cover Letter Generator from Job Description",
    label: "Resume & Cover Letter Generator",
    desc: "Matched tone, aligned bullet points, and recruiter cold DM included.",
  },
];

export function InternalSeoFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-24">
      {/* Trust Banner */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-900/30 text-blue-400 rounded-lg shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Zero-Hallucination Guarantee</h4>
              <p className="text-slate-400 text-xs mt-1">
                TruthCV never invents numbers, technologies, or job titles. Every bullet point is mathematically verified against your Master Vault.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-900/30 text-emerald-400 rounded-lg shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">ATS-Safe Single Column</h4>
              <p className="text-slate-400 text-xs mt-1">
                Single-column, selectable-text PDFs with zero graphic bloat or parse-breaking tables. Passes Taleo, Workday, and Greenhouse.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-900/30 text-indigo-400 rounded-lg shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Guest First & Private</h4>
              <p className="text-slate-400 text-xs mt-1">
                Run complete tailoring flows without an account wall. Your data is strictly stored locally until you choose to connect Supabase.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Internal SEO Hub Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Career Tools & Free Resume Guides</span>
          </div>
          <h3 className="text-lg font-bold text-white">Explore TruthCV Dedicated ATS Solutions</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEO_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 hover:border-slate-700 transition"
            >
              <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition flex items-center justify-between">
                <span>{link.label}</span>
                <span className="text-slate-500 group-hover:translate-x-1 transition-transform">→</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{link.desc}</p>
              <div className="mt-2.5 inline-block text-[11px] text-slate-500 font-mono">
                Keyword: <span className="text-slate-400">{link.keyword}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">TruthCV</span>
            <span>— The Honest AI Resume Builder & Cover Letter Generator.</span>
          </div>
          <div>
            Built with Next.js 16, Supabase, Tailwind CSS & Vercel AI SDK. Zero fake metrics guaranteed.
          </div>
        </div>
      </div>
    </footer>
  );
}
