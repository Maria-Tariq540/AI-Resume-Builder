import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    template: "%s | TruthCV",
    default: "TruthCV — Zero-Hallucination AI Resume & Cover Letter Builder",
  },
  description:
    "Free AI resume builder that never lies. Optimize your resume line-by-line using verified facts from your Master Career Vault. Zero fake skills, 100% ATS-safe.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://truthcv.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
