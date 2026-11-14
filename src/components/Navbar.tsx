"use client";

import Link from "next/link";
import { ShieldCheck, Sparkles, FolderGit2, FileText, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-900 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="flex items-center gap-1.5">
            Truth<span className="text-blue-600 font-extrabold">CV</span>
            <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              Zero-Hallucination
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/vault" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
            <FolderGit2 className="w-4 h-4 text-slate-400" />
            Master Vault
          </Link>
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-slate-400" />
            My Applications
          </Link>
          <Link href="/resume-job-match-checker" className="hover:text-blue-600 transition-colors">
            Match Checker
          </Link>
          <Link href="/honest-ai-resume-builder" className="hover:text-blue-600 transition-colors">
            Why Honest AI
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/vault"
            className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
          >
            Edit Vault
          </Link>
          <Link
            href="/tailor/demo"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailor Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
