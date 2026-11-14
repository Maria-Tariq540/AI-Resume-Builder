"use client";

import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, FileDown, Loader2 } from "lucide-react";
import { AtsResumeDocument } from "./AtsResumeDocument";
import { MasterProfile, BulletDiffItem } from "@/lib/schemas/ai-outputs";

interface PdfDownloadButtonProps {
  profile: MasterProfile;
  acceptedBullets: BulletDiffItem[];
  customSummary?: string;
  fileName?: string;
}

export function PdfDownloadButton({
  profile,
  acceptedBullets,
  customSummary,
  fileName = "Resume-ATS-TruthCV.pdf",
}: PdfDownloadButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 text-slate-500 text-xs font-semibold"
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        Preparing ATS PDF...
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={
        <AtsResumeDocument
          profile={profile}
          acceptedBullets={acceptedBullets}
          customSummary={customSummary}
        />
      }
      fileName={fileName}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
    >
      {({ loading }) => (
        <>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating Single-Column PDF...</span>
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4" />
              <span>Download ATS-Safe PDF</span>
            </>
          )}
        </>
      )}
    </PDFDownloadLink>
  );
}
