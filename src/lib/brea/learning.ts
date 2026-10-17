import { useEffect, useRef, useState } from "react";
import { getBreaName } from "./onboarding";
import { ANATOMY, HORMONES, LESSON_BADGES, LESSON_ID, LESSON2_ID, LESSON3_ID, LESSON4_ID, LESSONS, type AnatomyId, type HormoneId } from "./learning-data";
export const LEARNING_KEY = "brea-learning-v1";
const CHANGE_EVENT = "brea-learning-changed";
export type LearningState = {
  version: 1;
  completed: string[];
  badges: string[];
  position: number;
  started: boolean;
  explored: AnatomyId[];
  quizResult: number | null;
  position2: number;
  started2: boolean;
  hormones: HormoneId[];
  quiz2Result: number | null;
  position3: number;
  started3: boolean;
  cells: string[];
  quiz3Result: number | null;
  position4: number;
  started4: boolean;
  origins: string[];
  quiz4Result: number | null;
};
export function emptyLearning(): LearningState {
  return { version: 1, completed: [], badges: [], position: 0, started: false, explored: [], quizResult: null, position2: 0, started2: false, hormones: [], quiz2Result: null, position3: 0, started3: false, cells: [], quiz3Result: null, position4: 0, started4: false, origins: [], quiz4Result: null };
}
const clampStep = (value: unknown, max: number) => (typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(max, Math.floor(value))) : 0);
const clampScore = (value: unknown) => (typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 3 ? value : null);
export function normalizeLearning(input: unknown): LearningState {
  if (!input || typeof input !== "object") return emptyLearning();
  const value = input as Partial<LearningState>;
  // Only implemented achievements can be earned in this version.
   const implemented = [LESSON_ID, LESSON2_ID, LESSON3_ID, LESSON4_ID];
  const completed = Array.isArray(value.completed) ? [...new Set(value.completed.filter((id) => implemented.includes(id)))] : [];
  return {
    version: 1,
    completed,
    badges: completed.map((id) => LESSON_BADGES[id]).filter((badge): badge is string => typeof badge === "string"),
    position: clampStep(value.position, 2),
    started: value.started === true,
    explored: Array.isArray(value.explored) ? [...new Set(value.explored.filter((id) => ANATOMY.some((part) => part.id === id)))] : [],
    quizResult: clampScore(value.quizResult),
    position2: clampStep(value.position2, 2),
    started2: value.started2 === true,
    hormones: Array.isArray(value.hormones) ? [...new Set(value.hormones.filter((id) => HORMONES.some((h) => h.id === id)))] : [],
    quiz2Result: clampScore(value.quiz2Result),
    position3: clampStep(value.position3, 2),
    started3: value.started3 === true,
    cells: Array.isArray(value.cells) ? [...new Set(value.cells.filter((id) => ["membrane", "cytoplasm", "nucleus", "dna"].includes(id)))] : [],
    quiz3Result: clampScore(value.quiz3Result),
    position4: clampStep(value.position4, 3),
    started4: value.started4 === true,
    origins: Array.isArray(value.origins) ? [...new Set(value.origins.filter((id) => ["ducts", "lobules"].includes(id)))] : [],
    quiz4Result: clampScore(value.quiz4Result),
  };
}
export function readLearning(): LearningState {
  try { return normalizeLearning(JSON.parse(window.localStorage.getItem(LEARNING_KEY) ?? "null")); }
  catch { return emptyLearning(); }
}
export function completeLesson(state: LearningState, lessonId: string = LESSON_ID): { state: LearningState; firstCompletion: boolean } {
  if (!Object.hasOwn(LESSON_BADGES, lessonId)) return { state, firstCompletion: false };
  const firstCompletion = !state.completed.includes(lessonId);
  const patch = lessonId === LESSON4_ID ? { position4: 3, started4: true } : lessonId === LESSON3_ID ? { position3: 2, started3: true } : lessonId === LESSON2_ID ? { position2: 2, started2: true } : { position: 2, started: true };
  return { firstCompletion, state: normalizeLearning({ ...state, ...patch, completed: [...state.completed, lessonId] }) };
}
export function learningSummary(state: LearningState) {
  const completed = state.completed.filter((id) => LESSONS.some((lesson) => lesson.id === id)).length;
  return { completed, remaining: LESSONS.length - completed, percent: completed / LESSONS.length * 100, badges: state.badges.length };
}
export function addExplored(state: LearningState, id: AnatomyId): LearningState {
  return normalizeLearning({ ...state, started: true, explored: [...state.explored, id] });
}
export function addHormone(state: LearningState, id: HormoneId): LearningState {
  return normalizeLearning({ ...state, started2: true, hormones: [...state.hormones, id] });
}
export function useLearning() {
  const [state, setState] = useState<LearningState>(emptyLearning);
  const currentState = useRef(state);
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState(false);
  useEffect(() => {
    const load = () => { const saved = readLearning(); currentState.current = saved; setState(saved); setName(getBreaName()); };
    load();
    // Reuse onboarding’s display-name storage, not another personalization key.
    setReady(true);
    window.addEventListener("storage", load);
    window.addEventListener(CHANGE_EVENT, load);
    return () => { window.removeEventListener("storage", load); window.removeEventListener(CHANGE_EVENT, load); };
  }, []);
  const update = (transform: (current: LearningState) => LearningState) => {
    const next = normalizeLearning(transform(currentState.current));
    currentState.current = next;
    setState(next);
    try {
      window.localStorage.setItem(LEARNING_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch { setStorageNotice(true); }
    return next;
  };
  return { state, name, ready, update, storageNotice };
}
