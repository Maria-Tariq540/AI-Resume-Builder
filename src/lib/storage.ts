import { MasterProfile, JobApplication } from "./schemas/ai-outputs";

export const SAMPLE_MASTER_PROFILE: MasterProfile = {
  full_name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA (Open to Remote)",
  linkedin_url: "https://linkedin.com/in/alexmorgan-dev",
  portfolio_url: "https://alexmorgan.dev",
  summary: "Full-stack software engineer with 5+ years of experience designing scalable distributed web services, RESTful & GraphQL APIs, and modern React/TypeScript frontends. Proven track record reducing API latency by 38% and leading migration from legacy monolith to microservices.",
  skills: [
    "TypeScript",
    "JavaScript (ES6+)",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "Docker",
    "AWS (ECS, S3, RDS)",
    "Redis",
    "GraphQL",
    "REST APIs",
    "Jest",
    "Git",
    "CI/CD (GitHub Actions)",
    "Agile / Scrum"
  ],
  experience: [
    {
      id: "exp-1",
      role: "Senior Full Stack Engineer",
      company: "Vanguard Tech Labs",
      location: "San Francisco, CA",
      start_date: "2022-03",
      end_date: "Present",
      current: true,
      bullets: [
        "Architected core high-throughput payment processing microservice handling $12M+ monthly transaction volume with 99.98% uptime using Node.js and PostgreSQL.",
        "Refactored legacy React customer checkout flows into Next.js App Router with Server Components, decreasing page load time from 3.2s to 1.1s.",
        "Implemented Redis distributed caching layer and query indexing, reducing p95 database query latency by 42%.",
        "Mentored 4 junior and mid-level engineers, instituted automated PR review checklists, and raised unit test coverage from 61% to 88% using Jest."
      ]
    },
    {
      id: "exp-2",
      role: "Software Engineer",
      company: "Apex Cloud Solutions",
      location: "Austin, TX",
      start_date: "2020-01",
      end_date: "2022-02",
      bullets: [
        "Built responsive customer dashboard components in TypeScript and Tailwind CSS utilized by over 85,000 active enterprise users.",
        "Engineered RESTful analytics endpoints in Node.js connected to AWS RDS PostgreSQL with tokenized JWT authentication.",
        "Automated deployment pipelines using Docker and GitHub Actions, cutting staging release cycle time from 45 minutes to 8 minutes.",
        "Collaborated closely with product managers and UX designers to ship 14 sprint features ahead of schedule."
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "PulseQueue — Distributed Task Orchestrator",
      tech_stack: ["TypeScript", "Node.js", "Redis", "Docker", "Tailwind CSS"],
      link: "https://github.com/alexmorgan/pulse-queue",
      bullets: [
        "Engineered open-source background task processor with guaranteed at-least-once delivery semantics and real-time WebSocket status dashboard.",
        "Benchmarked throughput up to 14,000 messages/sec on a single Redis node with zero message drops during graceful worker failover."
      ]
    },
    {
      id: "proj-2",
      name: "SchemaGuard — SQL Schema Drift Detector",
      tech_stack: ["Next.js", "PostgreSQL", "Tailwind CSS", "TypeScript"],
      link: "https://schemaguard.dev",
      bullets: [
        "Built a developer CLI and web UI that inspects PostgreSQL migrations and flags breaking schema changes before pull requests merge.",
        "Adopted by over 1,200 GitHub repositories with 450+ GitHub stars."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science",
      institution: "University of Washington",
      year: "2019",
      gpa: "3.8 / 4.0"
    }
  ]
};

export const SAMPLE_JOB_DESCRIPTION = `Senior Full Stack Developer
Company: Horizon FinTech

About the Role:
We are seeking an experienced Senior Full Stack Developer to lead development on our real-time wealth management platform. You will design resilient backend microservices, streamline high-load SQL databases, and craft responsive React/Next.js interfaces.

Key Requirements:
- 4+ years of professional full-stack development experience with TypeScript, React, and Node.js.
- Strong proficiency with relational databases (PostgreSQL preferred), schema design, and query optimization.
- Experience with cloud architecture on AWS (ECS, S3, RDS) and containerization with Docker.
- Experience building and maintaining CI/CD pipelines (GitHub Actions).
- Track record of improving web performance, Core Web Vitals, and API latency.
- Bonus: Experience with Redis caching and real-time distributed systems.
- Must have: Experience handling financial or compliance-heavy transactions.
- Must have: In-depth experience with Kubernetes (EKS) and Terraform infrastructure as code.`;

const VAULT_STORAGE_KEY = "truthcv_master_vault";
const APPLICATIONS_STORAGE_KEY = "truthcv_applications";

export function getLocalVault(): MasterProfile {
  if (typeof window === "undefined") return SAMPLE_MASTER_PROFILE;
  try {
    const raw = localStorage.getItem(VAULT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(SAMPLE_MASTER_PROFILE));
      return SAMPLE_MASTER_PROFILE;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_MASTER_PROFILE;
  }
}

export function saveLocalVault(profile: MasterProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error("Failed to save vault to localStorage", err);
  }
}

export function getLocalApplications(): JobApplication[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalApplication(app: JobApplication): void {
  if (typeof window === "undefined") return;
  try {
    const apps = getLocalApplications();
    const existingIdx = apps.findIndex((a) => a.id === app.id);
    if (existingIdx >= 0) {
      apps[existingIdx] = app;
    } else {
      apps.unshift(app);
    }
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
  } catch (err) {
    console.error("Failed to save application to localStorage", err);
  }
}

export function getLocalApplicationById(id: string): JobApplication | null {
  if (typeof window === "undefined") return null;
  const apps = getLocalApplications();
  return apps.find((a) => a.id === id) || null;
}
