import { beforeEach, describe, expect, it } from "vitest";
import { CHANGES_KEY, changesSummary, completeChangesLesson, completeChangesLesson2, emptyChanges, normalizeChanges, readChanges } from "./changes";
import { CHANGES, CHANGES_QUIZ, QUADRANT_QUIZ, QUADRANTS, WHOLE_AREA } from "./changes-data";
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
  it("completing both lessons gives 2 of 2 with both badges, Lesson 2 completable first", () => {
    const r2 = completeChangesLesson2(emptyChanges());
    expect(r2.state.completed).toEqual(["know-your-quadrants"]);
    expect(r2.state.badges).toEqual(["quadrant-explorer"]);
    expect(r2.state.position2).toBe(2);
    expect(r2.state.started2).toBe(true);
    const both = completeChangesLesson(r2.state);
    expect(changesSummary(both.state)).toEqual({ completed: 2, total: 2, percent: 100 });
    expect(both.state.badges).toEqual(["quadrant-explorer", "awareness-explorer"]);
    expect(completeChangesLesson2(both.state).firstCompletion).toBe(false);
  });
  it("Lesson 2 completion never requires exploring quadrants, regions or the quiz", () => {
    expect(QUADRANTS).toHaveLength(4);
    expect(WHOLE_AREA).toHaveLength(5);
    const r = completeChangesLesson2(emptyChanges());
    expect(r.state.quadrants).toEqual([]);
    expect(r.state.regions).toEqual([]);
    expect(r.state.quiz2Result).toBeNull();
  });
  it("normalization keeps Lesson 2 fields within bounds", () => {
    const s = normalizeChanges({ position2: 9, quadrants: ["upper-outer", "bogus"], regions: ["underarm", "nope"], quiz2Result: 5 });
    expect(s.position2).toBe(2);
    expect(s.quadrants).toEqual(["upper-outer"]);
    expect(s.regions).toEqual(["underarm"]);
    expect(s.quiz2Result).toBeNull();
  });
  it("quiz answers A, B, A score 3", () => {
    expect(quizScore([0, 1, 0], CHANGES_QUIZ)).toBe(3);
  });
  it("Lesson 2 quiz answers A, B, C score 3", () => {
    expect(quizScore([0, 1, 2], QUADRANT_QUIZ)).toBe(3);
  });
  it("glossary includes the new breast-change terms", () => {
    for (const t of ["Peau d'orange", "Nipple inversion", "Breast awareness", "Axillary lymph nodes"]) expect(findGlossaryTerm(t)).toBeTruthy();
  });
  it("glossary includes the quadrant and awareness terms", () => {
    for (const t of ["Breast quadrant", "Upper outer quadrant", "Lower inner quadrant", "Clinical breast examination", "Palpation", "Breast tissue"]) expect(findGlossaryTerm(t)).toBeTruthy();
  });
});
