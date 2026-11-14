# 🚀 TruthCV — Zero-Hallucination AI Resume & Cover Letter Builder

**Build an honest resume. Match the right opportunities. Get hired without inventing your experience.**

TruthCV is an SEO-driven, full-stack AI-powered resume and cover letter builder designed to help job seekers create tailored, ATS-friendly job applications without compromising on honesty.

Its core principle is simple: **Zero Hallucinations. 100% Verifiable Career Information.**

Unlike conventional AI resume builders, TruthCV never fabricates skills, job titles, companies, qualifications, achievements, or performance metrics. It uses a verified **Master Career Vault** as its single source of truth, allowing AI to reframe, optimize, and tailor existing experience to specific job descriptions.

---

## ✨ Key Features

### 🛡️ 1. Zero-Hallucination AI Engine
- Strict AI output validation using Zod schemas.
- Every rewritten resume bullet includes a `truth_check` linked to verified Career Vault records.
- Each modification includes a `reason` explaining its relevance to the target job description.
- Prevents fabricated skills, achievements, employment history, and metrics.
- Includes a deterministic fallback engine when AI API credentials are unavailable.

### ⚡ 2. Instant Guest Access
- No registration or authentication required to test the application.
- Upload or paste an existing resume and job description.
- Complete resume-tailoring workflow using browser `localStorage`.
- Optional synchronization with Supabase PostgreSQL when credentials are configured.

### 🔍 3. SEO-Optimized Landing Pages
Six statically rendered landing pages targeting high-intent search queries:

| Route | Target Keyword |
|---|---|
| `/` | Free AI Resume Builder |
| `/tailor-resume-to-job-description` | Tailor Resume to Job Description |
| `/resume-job-match-checker` | Resume Job Match Checker |
| `/update-resume-for-each-job` | Update Resume for Each Job |
| `/honest-ai-resume-builder` | Honest AI Resume Builder |
| `/resume-and-cover-letter-generator` | Resume and Cover Letter Generator |

SEO implementation includes:
- Custom metadata and OpenGraph tags.
- Canonical URLs.
- JSON-LD structured data (`SoftwareApplication` and `FAQPage`).
- Automatically generated `sitemap.xml`.
- Automatically generated `robots.txt`.
- Internal linking between landing pages.

### 🗂️ 4. Master Career Vault
A centralized repository containing verified professional information:

- Personal and contact information.
- Technical and professional skills.
- Employment history and job roles.
- Academic qualifications and education.
- Projects and verified achievements.
- PDF resume parsing and automatic Vault population.

**API:** `/api/parse-resume`

### 🎯 5. Interactive Resume Tailoring Workspace

A structured five-stage workflow for creating targeted job applications.

**Step 1 — Fit Gatekeeper**
- Circular job-match score (0–100).
- Match verdict:
  - 🟢 Strong Match
  - 🟡 Worth Applying
  - 🔴 Low Fit — Reconsider
- Matched verified skills.
- Missing non-negotiable requirements.

**Step 2 — Line-by-Line Diff Editor**
- Side-by-side comparison of original and AI-rewritten resume bullets.
- Individual Accept/Reject controls.
- Every proposed modification includes a truth-check reference.
- Only accepted modifications appear in the final resume.

**Step 3 — Cover Letter & Recruiter DM**
- Personalized, targeted three-paragraph cover letter.
- LinkedIn connection message under 300 characters.
- Content grounded in verified career information.

**Step 4 — Interview Defense Preparation**
- Five challenging interview questions.
- Questions tailored to specific experience gaps and rewritten resume bullets.
- Honest, evidence-based answering scripts.
- Helps candidates confidently defend everything written in their applications.

**Step 5 — ATS-Friendly PDF Export**
- Clean, professional, single-column layout.
- Selectable PDF text.
- No unnecessary graphics or parsing-unfriendly elements.
- Designed for compatibility with Applicant Tracking Systems (ATS).

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack framework and App Router |
| TypeScript | Type safety |
| Tailwind CSS v4 | Responsive UI and styling |
| Lucide Icons | Interface icons |
| Supabase PostgreSQL | Database and cloud persistence |
| Supabase Auth | Authentication infrastructure |
| Row Level Security (RLS) | Database access protection |
| Vercel AI SDK | AI integration |
| OpenAI / Google Gemini | AI-powered content generation |
| Zod | Strict AI output validation |
| React PDF Renderer | ATS-friendly PDF generation |
| unpdf | PDF text extraction |
| LocalStorage | Guest-mode persistence |

---

## 🏗️ Project Architecture

```text
TruthCV/
│
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx
│   │   │   ├── tailor-resume-to-job-description/
│   │   │   ├── resume-job-match-checker/
│   │   │   ├── update-resume-for-each-job/
│   │   │   ├── honest-ai-resume-builder/
│   │   │   └── resume-and-cover-letter-generator/
│   │   │
│   │   ├── (app)/
│   │   │   ├── dashboard/
│   │   │   ├── vault/
│   │   │   └── tailor/
│   │   │       └── [id]/
│   │   │
│   │   ├── api/
│   │   │   ├── parse-resume/
│   │   │   ├── analyze-fit/
│   │   │   └── generate-tailored/
│   │   │
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── seo/
│   │   │   ├── LandingTemplate.tsx
│   │   │   └── InternalSeoFooter.tsx
│   │   ├── workspace/
│   │   │   ├── FitGatekeeperCard.tsx
│   │   │   ├── BulletDiffEditor.tsx
│   │   │   ├── CoverLetterAndDmTab.tsx
│   │   │   └── InterviewDefenseTab.tsx
│   │   └── pdf/
│   │       ├── AtsResumeDocument.tsx
│   │       └── PdfDownloadButton.tsx
│   │
│   └── lib/
│       ├── schemas/
│       │   └── ai-outputs.ts
│       ├── storage.ts
│       └── supabase/
│           ├── client.ts
│           └── server.ts
│
├── supabase/
│   └── schema.sql
│
├── public/
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- Git
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/TruthCV.git
```

```bash
cd TruthCV
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Configure Environment Variables

Create your local environment file:

```bash
cp .env.example .env.local
```

Add your API credentials:

```env
# AI Provider (Optional)
OPENAI_API_KEY=

# Alternatively, use Google Gemini
GOOGLE_GENERATIVE_AI_API_KEY=

# Supabase Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

**Note:** AI generation uses a deterministic fallback engine when AI credentials are not configured. Supabase credentials are optional and enable cloud persistence.

Never commit `.env.local` or expose secret API keys in client-side code.

### 4. Configure Supabase (Optional)

1. Create a project in [Supabase](https://supabase.com/).
2. Open the Supabase SQL Editor.
3. Execute the migration and schema definitions from:

```text
supabase/schema.sql
```

4. Configure the required environment variables in `.env.local`.

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:3000
```

🎉 **TruthCV is ready to run!**

---

## 🔐 Privacy & Data Integrity

TruthCV is designed around transparency and verified career information.

- Guest testing does not require account registration.
- Guest data is stored locally using browser `localStorage`.
- Cloud persistence is optional.
- Supabase Row Level Security policies help protect stored user data.
- AI-generated content must pass schema validation.
- Resume modifications retain references to their verified source records.
- Candidates retain control over which suggested changes are accepted.

**Important:** Schema validation and source references help enforce factual consistency, but they do not independently guarantee that every AI-generated statement is true. Users should review and verify all final application content.

---

## 🗺️ Development Roadmap

- [x] Project architecture and technology selection.
- [x] Zero-hallucination design specification.
- [x] Master Career Vault design.
- [x] Guest-mode workflow design.
- [x] SEO landing page structure.
- [ ] Complete resume parsing implementation.
- [ ] Complete AI-powered job-match analysis.
- [ ] Implement line-by-line resume diff editor.
- [ ] Implement cover letter and recruiter DM generation.
- [ ] Implement interview defense preparation.
- [ ] Complete ATS-friendly PDF export.
- [ ] Integrate Supabase authentication and cloud persistence.
- [ ] Perform end-to-end testing.
- [ ] Deploy production version.

---

## 🎯 Project Objectives

TruthCV aims to solve several common problems in AI-assisted job applications:

1. **AI Fabrication:** Preventing candidates from unknowingly submitting invented qualifications or experience.
2. **Generic Resumes:** Making applications more relevant to individual job descriptions.
3. **ATS Compatibility:** Producing structured resumes that are easier for Applicant Tracking Systems to parse.
4. **Application Confidence:** Helping candidates understand and defend every statement in their resumes.
5. **Career Organization:** Maintaining a reusable, verified professional profile through the Master Career Vault.

---

## 🤝 Contributing

Contributions, suggestions, feature requests, and bug reports are welcome.

To contribute:

1. Fork this repository.
2. Create a feature branch.
3. Implement your changes.
4. Test your implementation.
5. Submit a Pull Request describing your contribution.

Please ensure that all contributions preserve TruthCV's core zero-hallucination principle.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## ⭐ Support the Project

If you find TruthCV useful, consider giving this repository a ⭐ on GitHub.

Your support helps encourage the development of transparent, responsible, and trustworthy AI-powered career tools.

**TruthCV — Your Experience. Your Truth. Your Next Opportunity.**

