import { beforeEach, describe, expect, it } from "vitest";
import { addExplored, completeLesson, emptyLearning, LEARNING_KEY, learningSummary, normalizeLearning, readLearning } from "./learning";
import { ANATOMY, findGlossaryTerm, QUIZ, quizScore } from "./learning-data";
import { BREA_INTERESTS, restartBreaDemo } from "./onboarding";
beforeEach(() => localStorage.clear());
describe("Brea learning rules", () => {
  it("starts with zero of five lessons and zero badges", () => {
    expect(learningSummary(emptyLearning())).toEqual({ completed: 0, remaining: 5, percent: 0, badges: 0 });
  });
  it("first completion awards one badge and 20 percent progress", () => {
    const result = completeLesson(emptyLearning());
    expect(result.firstCompletion).toBe(true);
    expect(result.state.badges).toEqual(["anatomy-explorer"]);
    expect(learningSummary(result.state)).toEqual({ completed: 1, remaining: 4, percent: 20, badges: 1 });
  });
  it("revisits never award duplicates or repeat first completion", () => {
    const result = completeLesson(completeLesson(emptyLearning()).state);
    expect(result.firstCompletion).toBe(false);
    expect(result.state.completed).toEqual(["meet-your-breasts"]);
    expect(result.state.badges).toHaveLength(1);
  });
  it("completion does not require exploration or a quiz", () => {
    const result = completeLesson(emptyLearning()).state;
    expect(result.explored).toHaveLength(0);
    expect(result.quizResult).toBeNull();
    expect(result.completed).toContain("meet-your-breasts");
  });
  it("counts each of eight parts only once", () => {
    let state = emptyLearning();
    for (const part of ANATOMY) state = addExplored(addExplored(state, part.id), part.id);
    expect(state.explored).toHaveLength(8);
  });
  it("keeps learning progress when onboarding is restarted", () => {
    const state = completeLesson(emptyLearning()).state;
    localStorage.setItem(LEARNING_KEY, JSON.stringify(state));
    restartBreaDemo();
    expect(readLearning()).toEqual(state);
  });
  it("restores bounded lesson position and progress from storage", () => {
    localStorage.setItem(LEARNING_KEY, JSON.stringify({ ...emptyLearning(), started: true, position: 1 }));
    expect(readLearning().position).toBe(1);
    expect(readLearning().started).toBe(true);
    expect(normalizeLearning({ position: 99 }).position).toBe(2);
  });
  it("a zero quiz score never removes the completion badge", () => {
    const state = normalizeLearning({ ...completeLesson(emptyLearning()).state, quizResult: 0 });
    expect(state.quizResult).toBe(0);
    expect(state.badges).toEqual(["anatomy-explorer"]);
  });
  it("uses the three specified correct quiz answers", () => {
    expect(QUIZ.map((q) => q.correct)).toEqual([0, 1, 1]);
    expect(quizScore([0, 1, 1])).toBe(3);
    expect(quizScore([2, 0, 0])).toBe(0);
  });
  it("never invents an unknown glossary definition", () => {
    expect(findGlossaryTerm("unknown term")).toBeUndefined();
    expect(findGlossaryTerm(" areola ")?.term).toBe("Areola");
  });
  it("names the fourth pathway Find Care", () => {
    expect(BREA_INTERESTS[3].title).toBe("Find Care");
  });
});
