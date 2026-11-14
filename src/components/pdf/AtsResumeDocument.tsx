"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { MasterProfile, BulletDiffItem } from "@/lib/schemas/ai-outputs";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: "#111827",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: "#1e293b",
    paddingBottom: 10,
    textAlign: "center",
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#0f172a",
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
    fontSize: 8.5,
    color: "#475569",
  },
  contactItem: {
    marginHorizontal: 3,
  },
  section: {
    marginTop: 10,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 2,
    marginBottom: 6,
    color: "#0f172a",
  },
  summaryText: {
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.45,
    marginBottom: 4,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 4,
    marginBottom: 1,
  },
  roleText: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  companyText: {
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#334155",
  },
  dateText: {
    fontSize: 8.5,
    fontFamily: "Helvetica",
    color: "#64748b",
  },
  bulletRow: {
    flexDirection: "row",
    marginTop: 2.5,
    marginBottom: 1,
    paddingLeft: 6,
  },
  bulletPoint: {
    width: 10,
    fontSize: 9,
    color: "#0f172a",
  },
  bulletContent: {
    flex: 1,
    fontSize: 8.8,
    color: "#334155",
    lineHeight: 1.35,
  },
  skillsText: {
    fontSize: 8.8,
    color: "#334155",
    lineHeight: 1.4,
  },
});

interface AtsResumeDocumentProps {
  profile: MasterProfile;
  acceptedBullets?: BulletDiffItem[];
  customSummary?: string;
}

export function AtsResumeDocument({
  profile,
  acceptedBullets,
  customSummary,
}: AtsResumeDocumentProps) {
  // Build a lookup map of accepted bullet texts by parent ID and original text
  const bulletLookup = new Map<string, string>();
  if (acceptedBullets) {
    for (const b of acceptedBullets) {
      // If accepted, use suggested_text; otherwise use original_text
      const textToUse = b.accepted ? b.suggested_text : b.original_text;
      bulletLookup.set(`${b.parent_id}:::${b.original_text}`, textToUse);
    }
  }

  const getBullet = (parentId: string, originalText: string) => {
    return bulletLookup.get(`${parentId}:::${originalText}`) || originalText;
  };

  return (
    <Document title={`${profile.full_name || "Resume"} - TruthCV`} author={profile.full_name}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.full_name || "Alex Morgan"}</Text>
          <View style={styles.contactRow}>
            {profile.email && <Text style={styles.contactItem}>{profile.email}</Text>}
            {profile.phone && <Text style={styles.contactItem}>• {profile.phone}</Text>}
            {profile.location && <Text style={styles.contactItem}>• {profile.location}</Text>}
            {profile.linkedin_url && <Text style={styles.contactItem}>• {profile.linkedin_url}</Text>}
            {profile.portfolio_url && <Text style={styles.contactItem}>• {profile.portfolio_url}</Text>}
          </View>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{customSummary || profile.summary}</Text>
        </View>

        {/* Technical Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <Text style={styles.skillsText}>{profile.skills.join(" • ")}</Text>
          </View>
        )}

        {/* Professional Experience */}
        {profile.experience && profile.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {profile.experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 6 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.roleText}>
                    {exp.role}{" "}
                    <Text style={styles.companyText}>
                      — {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </Text>
                  </Text>
                  <Text style={styles.dateText}>
                    {exp.start_date} – {exp.end_date || "Present"}
                  </Text>
                </View>

                {exp.bullets.map((b, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletContent}>{getBullet(exp.id, b)}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {profile.projects && profile.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Projects</Text>
            {profile.projects.map((proj) => (
              <View key={proj.id} style={{ marginBottom: 5 }}>
                <View style={styles.entryHeader}>
                  <Text style={styles.roleText}>
                    {proj.name}{" "}
                    {proj.tech_stack?.length > 0 && (
                      <Text style={styles.companyText}>| {proj.tech_stack.join(", ")}</Text>
                    )}
                  </Text>
                  {proj.link && <Text style={styles.dateText}>{proj.link}</Text>}
                </View>
                {proj.bullets.map((b, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletContent}>{getBullet(proj.id, b)}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {profile.education && profile.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {profile.education.map((edu) => (
              <View key={edu.id} style={styles.entryHeader}>
                <Text style={styles.roleText}>
                  {edu.degree}{" "}
                  <Text style={styles.companyText}>— {edu.institution}</Text>
                  {edu.gpa ? <Text style={styles.companyText}> (GPA: {edu.gpa})</Text> : null}
                </Text>
                <Text style={styles.dateText}>{edu.year}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
