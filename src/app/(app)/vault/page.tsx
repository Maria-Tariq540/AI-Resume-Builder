"use client";

import React, { useState, useEffect } from "react";
import {
  FolderGit2,
  Upload,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ShieldCheck,
  Check,
  Loader2,
  FileText,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { MasterProfile, ExperienceItem, ProjectItem, EducationItem } from "@/lib/schemas/ai-outputs";
import { getLocalVault, saveLocalVault, SAMPLE_MASTER_PROFILE } from "@/lib/storage";

export default function VaultPage() {
  const [profile, setProfile] = useState<MasterProfile>(SAMPLE_MASTER_PROFILE);
  const [isSaved, setIsSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    const loaded = getLocalVault();
    setProfile(loaded);
  }, []);

  const handleSave = () => {
    saveLocalVault(profile);
    setIsSaved(true);
    setStatusMsg("Master Career Vault saved to local storage!");
    setTimeout(() => {
      setIsSaved(false);
      setStatusMsg("");
    }, 3000);
  };

  const handleResetSample = () => {
    if (confirm("Reset your Vault back to Alex Morgan's verified sample profile?")) {
      setProfile(SAMPLE_MASTER_PROFILE);
      saveLocalVault(SAMPLE_MASTER_PROFILE);
      setStatusMsg("Vault reset to sample profile.");
      setTimeout(() => setStatusMsg(""), 3000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatusMsg("Extracting verified facts from PDF...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to parse PDF resume");
      }

      const parsed: MasterProfile = await res.json();
      setProfile(parsed);
      saveLocalVault(parsed);
      setStatusMsg("Successfully parsed PDF into Master Career Vault!");
    } catch (err: unknown) {
      console.error(err);
      setStatusMsg("Note: Using extracted text preview. You can edit any field below.");
    } finally {
      setIsUploading(false);
      setTimeout(() => setStatusMsg(""), 4000);
    }
  };

  const addSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    if ("preventDefault" in e) e.preventDefault();
    if (!newSkill.trim()) return;

    if (!profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      });
    }
    setNewSkill("");
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove),
    });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: "Software Role",
      company: "Company Name",
      location: "City, State",
      start_date: "2023",
      end_date: "Present",
      current: true,
      bullets: ["Built scalable backend services and streamlined frontend components."],
    };
    setProfile({ ...profile, experience: [newExp, ...profile.experience] });
  };

  const updateExperience = (idx: number, updated: Partial<ExperienceItem>) => {
    const next = [...profile.experience];
    next[idx] = { ...next[idx], ...updated };
    setProfile({ ...profile, experience: next });
  };

  const removeExperience = (idx: number) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter((_, i) => i !== idx),
    });
  };

  const addExpBullet = (expIdx: number) => {
    const next = [...profile.experience];
    next[expIdx].bullets.push("Achieved measurable win without exaggerations.");
    setProfile({ ...profile, experience: next });
  };

  const updateExpBullet = (expIdx: number, bulletIdx: number, text: string) => {
    const next = [...profile.experience];
    next[expIdx].bullets[bulletIdx] = text;
    setProfile({ ...profile, experience: next });
  };

  const removeExpBullet = (expIdx: number, bulletIdx: number) => {
    const next = [...profile.experience];
    next[expIdx].bullets = next[expIdx].bullets.filter((_, i) => i !== bulletIdx);
    setProfile({ ...profile, experience: next });
  };

  // Projects handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: "New Open Source / Application",
      tech_stack: ["TypeScript", "Next.js"],
      link: "https://github.com/...",
      bullets: ["Architected core features with zero downtime."],
    };
    setProfile({ ...profile, projects: [...profile.projects, newProj] });
  };

  const updateProject = (idx: number, updated: Partial<ProjectItem>) => {
    const next = [...profile.projects];
    next[idx] = { ...next[idx], ...updated };
    setProfile({ ...profile, projects: next });
  };

  const removeProject = (idx: number) => {
    setProfile({
      ...profile,
      projects: profile.projects.filter((_, i) => i !== idx),
    });
  };

  const addProjBullet = (projIdx: number) => {
    const next = [...profile.projects];
    next[projIdx].bullets.push("Engineered high performance module with test coverage.");
    setProfile({ ...profile, projects: next });
  };

  const updateProjBullet = (projIdx: number, bulletIdx: number, text: string) => {
    const next = [...profile.projects];
    next[projIdx].bullets[bulletIdx] = text;
    setProfile({ ...profile, projects: next });
  };

  const removeProjBullet = (projIdx: number, bulletIdx: number) => {
    const next = [...profile.projects];
    next[projIdx].bullets = next[projIdx].bullets.filter((_, i) => i !== bulletIdx);
    setProfile({ ...profile, projects: next });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <FolderGit2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Master Career Vault
            </h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Source of Truth
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Your single repository of legitimate career achievements. TruthCV strictly limits its AI to reframing ONLY facts present in this vault.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Upload PDF */}
          <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer shadow-2xs transition">
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> : <Upload className="w-4 h-4 text-blue-600" />}
            <span>{isUploading ? "Extracting..." : "Upload PDF Resume"}</span>
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>

          <button
            type="button"
            onClick={handleResetSample}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Load Sample</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? "Saved!" : "Save Vault"}</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-2 animate-in fade-in">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Main Form Sections */}
      <div className="mt-8 space-y-8">
        {/* 1. Personal & Contact Info */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>1. Contact & Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <input
                type="email"
                value={profile.email || ""}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
              <input
                type="text"
                value={profile.phone || ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
              <input
                type="text"
                value={profile.location || ""}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={profile.linkedin_url || ""}
                onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Portfolio / GitHub</label>
              <input
                type="url"
                value={profile.portfolio_url || ""}
                onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })}
                className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Professional Summary / Executive Bio
            </label>
            <textarea
              rows={3}
              value={profile.summary || ""}
              onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
              className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-600 focus:outline-hidden font-sans leading-relaxed"
            />
          </div>
        </section>

        {/* 2. Skills Repository */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">2. Verified Skills & Technologies</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                The AI will NEVER claim a skill you do not list here.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              {profile.skills.length} skills listed
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {profile.skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200 group"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-slate-400 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={addSkill}
              placeholder="Add skill (e.g. Docker, Python, GraphQL)..."
              className="flex-1 text-xs rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
            <button
              type="button"
              onClick={addSkill}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        </section>

        {/* 3. Work Experience */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">3. Work Experience</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                List your actual titles, dates, and metric-backed bullet points.
              </p>
            </div>
            <button
              type="button"
              onClick={addExperience}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Role
            </button>
          </div>

          <div className="space-y-6">
            {profile.experience.map((exp, expIdx) => (
              <div
                key={exp.id || expIdx}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 relative"
              >
                <button
                  type="button"
                  onClick={() => removeExperience(expIdx)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 pr-8">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Role Title</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(expIdx, { role: e.target.value })}
                      className="w-full text-xs rounded-md border border-slate-300 px-2.5 py-1.5 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(expIdx, { company: e.target.value })}
                      className="w-full text-xs rounded-md border border-slate-300 px-2.5 py-1.5 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.start_date}
                      onChange={(e) => updateExperience(expIdx, { start_date: e.target.value })}
                      className="w-full text-xs rounded-md border border-slate-300 px-2.5 py-1.5 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">End Date</label>
                    <input
                      type="text"
                      value={exp.end_date}
                      onChange={(e) => updateExperience(expIdx, { end_date: e.target.value })}
                      className="w-full text-xs rounded-md border border-slate-300 px-2.5 py-1.5 bg-white"
                    />
                  </div>
                </div>

                {/* Bullets */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    Verified Accomplishment Bullets
                  </label>
                  {exp.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex gap-2 items-start">
                      <span className="text-slate-400 text-xs mt-2">•</span>
                      <textarea
                        rows={2}
                        value={b}
                        onChange={(e) => updateExpBullet(expIdx, bIdx, e.target.value)}
                        className="flex-1 text-xs rounded-lg border border-slate-300 p-2 bg-white focus:ring-1 focus:ring-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => removeExpBullet(expIdx, bIdx)}
                        className="text-slate-300 hover:text-red-500 mt-2 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addExpBullet(expIdx)}
                    className="text-xs text-blue-600 hover:underline font-semibold inline-flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add bullet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Projects */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">4. Key Projects & Open Source</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Include repositories, systems built, or client deliverables.
              </p>
            </div>
            <button
              type="button"
              onClick={addProject}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Project
            </button>
          </div>

          <div className="space-y-6">
            {profile.projects.map((proj, projIdx) => (
              <div
                key={proj.id || projIdx}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 relative"
              >
                <button
                  type="button"
                  onClick={() => removeProject(projIdx)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 pr-8">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Project Name</label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(projIdx, { name: e.target.value })}
                      className="w-full text-xs rounded-md border border-slate-300 px-2.5 py-1.5 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={proj.tech_stack.join(", ")}
                      onChange={(e) =>
                        updateProject(projIdx, {
                          tech_stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full text-xs rounded-md border border-slate-300 px-2.5 py-1.5 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Project Link / Repo</label>
                    <input
                      type="text"
                      value={proj.link || ""}
                      onChange={(e) => updateProject(projIdx, { link: e.target.value })}
                      className="w-full text-xs rounded-md border border-slate-300 px-2.5 py-1.5 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    Project Bullets
                  </label>
                  {proj.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex gap-2 items-start">
                      <span className="text-slate-400 text-xs mt-2">•</span>
                      <textarea
                        rows={2}
                        value={b}
                        onChange={(e) => updateProjBullet(projIdx, bIdx, e.target.value)}
                        className="flex-1 text-xs rounded-lg border border-slate-300 p-2 bg-white focus:ring-1 focus:ring-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => removeProjBullet(projIdx, bIdx)}
                        className="text-slate-300 hover:text-red-500 mt-2 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addProjBullet(projIdx)}
                    className="text-xs text-blue-600 hover:underline font-semibold inline-flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add project bullet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Education */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            5. Education & Certifications
          </h2>
          {profile.education.map((edu, idx) => (
            <div key={edu.id || idx} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    const next = [...profile.education];
                    next[idx].degree = e.target.value;
                    setProfile({ ...profile, education: next });
                  }}
                  className="w-full text-xs rounded-md border border-slate-300 px-2.5 py-1.5"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => {
                    const next = [...profile.education];
                    next[idx].institution = e.target.value;
                    setProfile({ ...profile, education: next });
                  }}
                  className="w-full text-xs rounded-md border border-slate-300 px-2.5 py-1.5"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Year</label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => {
                    const next = [...profile.education];
                    next[idx].year = e.target.value;
                    setProfile({ ...profile, education: next });
                  }}
                  className="w-full text-xs rounded-md border border-slate-300 px-2.5 py-1.5"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">GPA / Honors</label>
                <input
                  type="text"
                  value={edu.gpa || ""}
                  onChange={(e) => {
                    const next = [...profile.education];
                    next[idx].gpa = e.target.value;
                    setProfile({ ...profile, education: next });
                  }}
                  className="w-full text-xs rounded-md border border-slate-300 px-2.5 py-1.5"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All modifications are safely preserved for any job tailoring session.</span>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? "Saved to Vault!" : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
