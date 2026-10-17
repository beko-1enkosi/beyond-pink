import { beforeEach, describe, expect, it } from "vitest";
import { CHANGES_KEY, changesSummary, completeChangesLesson, emptyChanges, normalizeChanges, readChanges } from "./changes";
import { CHANGES, CHANGES_QUIZ } from "./changes-data";
import { LEARNING_KEY, readLearning } from "./learning";
import { findGlossaryTerm, quizScore } from "./learning-data";
beforeEach(() => localStorage.clear());
describe("Breast Changes pathway", () => {
  it("starts at 0 of 2 and completing Lesson 1 gives 1 of 2 with Awareness Explorer", () => {
    expect(changesSummary(emptyChanges())).toEqual({ completed: 0, total: 2, percent: 0 });
    const r = completeChangesLesson(emptyChanges());
    expect(changesSummary(r.state)).toEqual({ completed: 1, total: 2, percent: 50 });
    expect(r.state.badges).toEqual(["awareness-explorer"]);
    expect(completeChangesLesson(r.state).firstCompletion).toBe(false);
  });
  it("completion never requires exploring all seven changes or the quiz", () => {
    expect(CHANGES).toHaveLength(7);
    const r = completeChangesLesson(emptyChanges());
    expect(r.state.explored).toEqual([]);
    expect(r.state.quizResult).toBeNull();
  });
  it("stores progress separately from the Learning Garden", () => {
    const garden = { version: 1, completed: ["meet-your-breasts", "breasts-hormones", "what-is-cancer", "understanding-breast-cancer", "screening"] };
    localStorage.setItem(LEARNING_KEY, JSON.stringify(garden));
    localStorage.setItem(CHANGES_KEY, JSON.stringify(completeChangesLesson(emptyChanges()).state));
    expect(readLearning().completed).toHaveLength(5);
    expect(readLearning().badges).not.toContain("awareness-explorer");
    expect(readChanges().completed).toEqual(["recognise-changes"]);
  });
  it("rejects unbuilt Lesson 2 completion", () => {
    expect(normalizeChanges({ completed: ["know-your-quadrants"] }).completed).toEqual([]);
  });
  it("quiz answers A, B, A score 3", () => {
    expect(quizScore([0, 1, 0], CHANGES_QUIZ)).toBe(3);
  });
  it("glossary includes the new breast-change terms", () => {
    for (const t of ["Peau d'orange", "Nipple inversion", "Breast awareness", "Axillary lymph nodes"]) expect(findGlossaryTerm(t)).toBeTruthy();
  });
});
