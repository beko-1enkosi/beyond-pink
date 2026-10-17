import { beforeEach, describe, expect, it } from "vitest";
import { addExplored, addHormone, completeLesson, emptyLearning, LEARNING_KEY, learningSummary, normalizeLearning, readLearning } from "./learning";
import { ANATOMY, findGlossaryTerm, HORMONES, LESSON_ID, LESSON2_ID, QUIZ, QUIZ2, quizScore } from "./learning-data";
import { BREA_INTERESTS, restartBreaDemo } from "./onboarding";
import { LESSON3_ID } from "./learning-data";
import { QUIZ3 } from "./cancer-data";
beforeEach(() => localStorage.clear());
describe("Brea learning rules", () => {
  it("three lessons yield 60 percent and all three distinct badges", () => {
    let state = completeLesson(emptyLearning()).state;
    state = completeLesson(state, LESSON2_ID).state;
    state = completeLesson(state, LESSON3_ID).state;
    expect(learningSummary(state)).toEqual({ completed: 3, remaining: 2, percent: 60, badges: 3 });
    expect(state.badges).toEqual(["anatomy-explorer", "hormone-helper", "cell-detective"]);
  });
  it("Lesson 3 can be completed independently without exploration or quiz", () => {
    const result = completeLesson(emptyLearning(), LESSON3_ID);
    expect(result.state.completed).toEqual(["what-is-cancer"]);
    expect(result.state.badges).toEqual(["cell-detective"]);
    expect(result.state.cells).toEqual([]);
    expect(result.state.quiz3Result).toBeNull();
    expect(result.state.position3).toBe(2);
  });
  it("Lesson 3 revisits do not repeat first completion or remove earlier achievements", () => {
    const first = completeLesson(completeLesson(completeLesson(emptyLearning()).state, LESSON2_ID).state, LESSON3_ID);
    const revisit = completeLesson(first.state, LESSON3_ID);
    expect(first.firstCompletion).toBe(true);
    expect(revisit.firstCompletion).toBe(false);
    expect(revisit.state.badges).toEqual(first.state.badges);
    expect(revisit.state.completed).toEqual([LESSON_ID, LESSON2_ID, LESSON3_ID]);
  });
  it("legacy learning records preserve both previous lessons when Lesson 3 is introduced", () => {
    const old = { version: 1, completed: [LESSON_ID, LESSON2_ID], position: 2, position2: 1, started: true, started2: true, hormones: ["estrogen"], quizResult: 2, quiz2Result: 3 };
    localStorage.setItem(LEARNING_KEY, JSON.stringify(old));
    const state = readLearning();
    expect(state.badges).toEqual(["anatomy-explorer", "hormone-helper"]);
    expect(state.position2).toBe(1);
    expect(state.quizResult).toBe(2);
    expect(state.started3).toBe(false);
    expect(state.position3).toBe(0);
  });
  it("Lesson 3 resumes position and discoveries without affecting earlier lesson positions", () => {
    localStorage.setItem(LEARNING_KEY, JSON.stringify({ ...emptyLearning(), position: 1, position2: 2, position3: 1, started3: true, cells: ["dna", "dna", "nucleus", "invalid"] }));
    expect(readLearning()).toMatchObject({ position: 1, position2: 2, position3: 1, started3: true, cells: ["dna", "nucleus"] });
    expect(normalizeLearning({ position3: 99 }).position3).toBe(2);
  });
  it("Lesson 3 quiz uses answers A, B, C and never removes Cell Detective on a zero score", () => {
    expect(QUIZ3.map((q) => q.correct)).toEqual([0, 1, 2]);
    expect(quizScore([0, 1, 2], QUIZ3)).toBe(3);
    const state = normalizeLearning({ ...completeLesson(emptyLearning(), LESSON3_ID).state, quiz3Result: 0 });
    expect(state.quiz3Result).toBe(0);
    expect(state.badges).toEqual(["cell-detective"]);
  });
  it("Lessons 4 and 5 cannot earn completion or badges yet", () => {
    expect(completeLesson(emptyLearning(), "understanding-breast-cancer").state.completed).toEqual([]);
    expect(completeLesson(emptyLearning(), "screening").state.badges).toEqual([]);
  });
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
  it("Lesson 2 completion awards Hormone Helper and 40 percent progress", () => {
    const first = completeLesson(emptyLearning());
    const second = completeLesson(first.state, LESSON2_ID);
    expect(second.firstCompletion).toBe(true);
    expect(second.state.badges).toEqual(["anatomy-explorer", "hormone-helper"]);
    expect(learningSummary(second.state)).toEqual({ completed: 2, remaining: 3, percent: 40, badges: 2 });
  });
  it("Lesson 2 revisit never duplicates its badge or erases Lesson 1", () => {
    let state = completeLesson(emptyLearning()).state;
    state = completeLesson(state, LESSON2_ID).state;
    const revisit = completeLesson(state, LESSON2_ID);
    expect(revisit.firstCompletion).toBe(false);
    expect(revisit.state.completed).toEqual([LESSON_ID, LESSON2_ID]);
    expect(revisit.state.badges).toHaveLength(2);
  });
  it("counts each of four hormones only once", () => {
    let state = emptyLearning();
    for (const h of HORMONES) state = addHormone(addHormone(state, h.id), h.id);
    expect(state.hormones).toHaveLength(4);
  });
  it("a zero Lesson 2 quiz score never removes the Hormone Helper badge", () => {
    const state = normalizeLearning({ ...completeLesson(completeLesson(emptyLearning()).state, LESSON2_ID).state, quiz2Result: 0 });
    expect(state.quiz2Result).toBe(0);
    expect(state.badges).toContain("hormone-helper");
  });
  it("uses the three specified Lesson 2 quiz answers", () => {
    expect(QUIZ2.map((q) => q.correct)).toEqual([0, 0, 1]);
    expect(quizScore([0, 0, 1], QUIZ2)).toBe(3);
    expect(quizScore([1, 1, 0], QUIZ2)).toBe(0);
  });
  it("defines all new hormone glossary terms in plain language", () => {
    for (const term of ["Hormone", "Estrogen", "Progesterone", "Prolactin", "Oxytocin", "Mammary gland", "Lactation", "Milk let-down reflex", "Puberty", "Menstrual cycle", "Perimenopause", "Menopause", "Breast tenderness"]) {
      expect(findGlossaryTerm(term)?.definition.length).toBeGreaterThan(20);
    }
    expect(findGlossaryTerm("Glandular tissue")?.definition).toContain("lobules");
  });
});
