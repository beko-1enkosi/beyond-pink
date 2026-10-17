import { describe, expect, it } from "vitest";
import { BSE_CLARIFICATION, RESEARCH_CATEGORIES, RESEARCH_LITERACY, RESEARCH_STUDIES } from "./research-data";
import { findGlossaryTerm } from "./learning-data";

describe("The Science Behind Awareness collection", () => {
  it("contains exactly the five curated verified studies", () => {
    expect(RESEARCH_STUDIES).toHaveLength(5);
    expect(RESEARCH_STUDIES.map((s) => s.id)).toEqual([
      "sa-diagnostic-delays-2026",
      "kzn-self-exam-model-2025",
      "sa-symptom-appraisal-2020",
      "screening-by-density-2024",
      "shanghai-bse-trial-2002",
    ]);
  });
  it("preserves original authors, years, journals and working https links", () => {
    for (const study of RESEARCH_STUDIES) {
      expect(study.authors.length).toBeGreaterThan(0);
      expect(study.journal.length).toBeGreaterThan(0);
      expect(study.year).toBeGreaterThan(1990);
      expect(study.link).toMatch(/^https:\/\//);
      expect(study.findings.length).toBeGreaterThanOrEqual(2);
      expect(study.limitations.length).toBeGreaterThan(0);
      expect(study.investigated.simple).not.toBe(study.investigated.detailed);
    }
    expect(RESEARCH_STUDIES.find((s) => s.id === "sa-diagnostic-delays-2026")?.authors).toContain("Reissis");
    expect(RESEARCH_STUDIES.find((s) => s.id === "shanghai-bse-trial-2002")?.year).toBe(2002);
  });
  it("offers the five filter categories with All Research first", () => {
    expect(RESEARCH_CATEGORIES[0]).toBe("All Research");
    expect(RESEARCH_CATEGORIES).toHaveLength(5);
    for (const study of RESEARCH_STUDIES) expect(RESEARCH_CATEGORIES).toContain(study.category);
  });
  it("explains the four study types in the literacy card", () => {
    expect(RESEARCH_LITERACY.map((e) => e.term)).toEqual(["Qualitative study", "Systematic review", "Randomized controlled trial", "Modeling study"]);
  });
  it("states that breast awareness does not replace screening", () => {
    expect(BSE_CLARIFICATION.body).toContain("does not replace recommended screening");
    expect(BSE_CLARIFICATION.body).toContain("has not shown that formal routine breast self-examination reduces breast cancer deaths");
  });
  it("adds the thirteen research terms to the shared MedDecode glossary", () => {
    for (const term of ["Peer-reviewed research", "Qualitative study", "Systematic review", "Randomized controlled trial", "Clinical evidence", "Study population", "Research findings", "Study limitations", "Breast density", "Tomosynthesis", "Screening", "Diagnostic delay", "Health literacy"]) {
      expect(findGlossaryTerm(term), term).toBeDefined();
    }
  });
});
