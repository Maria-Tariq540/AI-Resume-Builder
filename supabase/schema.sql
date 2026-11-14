-- TruthCV: Zero-Hallucination AI Resume & Cover Letter Builder
-- Database Schema for Supabase PostgreSQL with Row Level Security (RLS)

-- 1. Master Career Vault (Source of Truth)
create table if not exists master_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  full_name text not null,
  email text,
  phone text,
  location text,
  linkedin_url text,
  portfolio_url text,
  summary text,
  skills jsonb default '[]'::jsonb, -- e.g. ["Python", "SQL", "Project Management"]
  experience jsonb default '[]'::jsonb, -- [{id, role, company, start_date, end_date, bullets: []}]
  projects jsonb default '[]'::jsonb, -- [{id, name, tech_stack: [], bullets: []}]
  education jsonb default '[]'::jsonb, -- [{id, degree, institution, year, gpa}]
  updated_at timestamptz default now()
);

-- 2. Job Applications & Tailored Versions
create table if not exists job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  job_title text not null,
  company_name text not null,
  job_description text not null,
  fit_score integer not null, -- 0 to 100
  fit_verdict text not null, -- "Strong Match" | "Worth Applying" | "Stretch / Risky"
  missing_requirements jsonb default '[]'::jsonb,
  tailored_resume jsonb not null, -- Stores original vs suggested bullets + accepted status
  cover_letter text,
  recruiter_dm text,
  interview_defense jsonb default '[]'::jsonb, -- [{question, why_asked, honest_framing}]
  status text default 'draft', -- draft | applied | interviewing | rejected
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table master_profiles enable row level security;
alter table job_applications enable row level security;

-- Policies for master_profiles
create policy "Users can view their own master profiles"
  on master_profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert their own master profiles"
  on master_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own master profiles"
  on master_profiles for update
  using (auth.uid() = user_id);

create policy "Users can delete their own master profiles"
  on master_profiles for delete
  using (auth.uid() = user_id);

-- Policies for job_applications
create policy "Users can view their own job applications"
  on job_applications for select
  using (auth.uid() = user_id);

create policy "Users can insert their own job applications"
  on job_applications for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own job applications"
  on job_applications for update
  using (auth.uid() = user_id);

create policy "Users can delete their own job applications"
  on job_applications for delete
  using (auth.uid() = user_id);
