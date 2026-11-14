# TruthCV — Zero-Hallucination AI Resume & Cover Letter Builder

TruthCV is an SEO-driven, full-stack web application designed for honest, high-impact job applications. It enforces a strict **Zero-Hallucination Rule**: the AI is mathematically prohibited from fabricating skills, companies, job titles, or fake metrics, reframing and optimizing only verified facts stored in the candidate's **Master Career Vault**.

---

## 🚀 Key Features

1. **Zero-Hallucination Constraint**:
   - AI outputs are strictly validated via Zod schemas (`src/lib/schemas/ai-outputs.ts`).
   - Every bullet rephrasing includes a `truth_check` linking back to verified Vault records and a `reason` explaining which JD keyword it addresses.
2. **No Auth Wall for Testing**:
   - Guest users can paste or upload a resume + job description and run the complete tailoring flow immediately using `localStorage`.
   - Seamlessly syncs to Supabase PostgreSQL when credentials are provided.
3. **6 Force-Static SEO Landing Pages**:
   - Statically rendered with custom metadata, OpenGraph tags, canonical URLs, and JSON-LD `SoftwareApplication` + `FAQPage` schemas:
     - `/` — Free AI Resume Builder That Never Lies About Your Experience
     - `/tailor-resume-to-job-description` — Tailor Your Resume to Any Job Description in 30 Seconds
     - `/resume-job-match-checker` — Resume Job Match Checker: Should You Even Apply?
     - `/update-resume-for-each-job` — Update Your Resume for Each Job Automatically
     - `/honest-ai-resume-builder` — The Honest AI Resume Builder (Zero Hallucinations)
     - `/resume-and-cover-letter-generator` — Resume & Cover Letter Generator from Any Job Description
   - Automatically generated `/sitemap.xml` and `/robots.txt`.
4. **Master Career Vault (`/vault`)**:
   - Central repository for all verified career history: contact info, skills tags, roles, projects, and education.
   - Includes PDF resume text extractor (`/api/parse-resume`) to auto-populate the Vault.
5. **Interactive 3-Step Workspace (`/tailor/[id]`)**:
   - **Step 1: Fit Gatekeeper (`FitGatekeeperCard.tsx`)**: Circular match gauge (0-100), verdict badge ("Strong Match" | "Worth Applying" | "Low Fit — Reconsider"), matched verified skills, and missing non-negotiables alert.
   - **Step 2: Line-by-Line Track Changes Diff Editor (`BulletDiffEditor.tsx`)**: Split diff cards with individual Accept/Reject toggles. Only accepted changes compile into the final resume.
   - **Step 3: Cover Letter & Recruiter DM (`CoverLetterAndDmTab.tsx`)**: Targeted 3-paragraph cover letter + under-300-char LinkedIn cold connection note.
   - **Step 4: "Defend Your Resume" Prep (`InterviewDefenseTab.tsx`)**: 5 tough interview questions targeting your specific gaps and reframed bullets with grounded honest answering scripts.
   - **Step 5: ATS-Safe PDF Export (`AtsResumeDocument.tsx`)**: Single-column clean typography, zero parse-breaking graphics, 100% selectable text.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions, TypeScript)
- **Styling**: Tailwind CSS v4 + Lucide Icons
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS)
- **AI Engine**: Vercel AI SDK (`ai` + `@ai-sdk/openai` / `@ai-sdk/google`) with deterministic fallback
- **PDF Generation & Parsing**: `@react-pdf/renderer` + `unpdf`

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your optional API keys:
- `OPENAI_API_KEY` or `GOOGLE_GENERATIVE_AI_API_KEY` (AI generation falls back gracefully to a deterministic rules engine if omitted).
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Enables cloud persistence).

### 3. Supabase Database Setup
Execute the migration SQL in your Supabase SQL Editor:
```sql
-- See supabase/schema.sql for the complete schema and RLS policies
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🗂️ Project Architecture

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                                     # / (Free AI Resume Builder)
│   │   ├── tailor-resume-to-job-description/page.tsx
│   │   ├── resume-job-match-checker/page.tsx
│   │   ├── update-resume-for-each-job/page.tsx
│   │   ├── honest-ai-resume-builder/page.tsx
│   │   └── resume-and-cover-letter-generator/page.tsx
│   ├── (app)/
│   │   ├── dashboard/page.tsx                           # Applications tracker & history
│   │   ├── vault/page.tsx                               # Master Career Vault editor & PDF parser
│   │   └── tailor/[id]/page.tsx                         # 3-step workspace (Fit -> Diff -> Export)
│   ├── api/
│   │   ├── parse-resume/route.ts                        # PDF text extractor into Vault JSON
│   │   ├── analyze-fit/route.ts                         # Gatekeeper fit score & gap analysis
│   │   └── generate-tailored/route.ts                   # Diff bullets + Cover letter + Cold DM + Defense
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Navbar.tsx
│   ├── seo/
│   │   ├── LandingTemplate.tsx                          # SEO layout + JSON-LD schema + Quick test demo
│   │   └── InternalSeoFooter.tsx                        # Cross-links all 6 keyword pages
│   ├── workspace/
│   │   ├── FitGatekeeperCard.tsx                        # Score gauge, matched & missing requirements
│   │   ├── BulletDiffEditor.tsx                         # Track Changes with Accept / Reject toggles
│   │   ├── CoverLetterAndDmTab.tsx                      # 3-paragraph letter & 300-char LinkedIn DM
│   │   └── InterviewDefenseTab.tsx                      # 5 tough technical screen questions & scripts
│   └── pdf/
│       ├── AtsResumeDocument.tsx                        # Clean single-column ATS React-PDF document
│       └── PdfDownloadButton.tsx                        # Client-side dynamic PDF download trigger
├── lib/
│   ├── schemas/ai-outputs.ts                            # Strict Zod schemas enforcing Zero-Hallucination
│   ├── storage.ts                                       # LocalStorage adapter & sample candidate data
│   └── supabase/ (client.ts, server.ts)                 # SSR & browser Supabase clients with fallbacks
└── supabase/
    └── schema.sql                                       # PostgreSQL schema with Row Level Security
```
