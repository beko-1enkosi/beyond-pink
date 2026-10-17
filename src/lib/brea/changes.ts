import { useEffect, useRef, useState } from "react";
import { getBreaName } from "./onboarding";
import { CHANGES, CHANGES_BADGES, CHANGES_LESSON1_ID, CHANGES_LESSON2_ID, CHANGES_LESSONS, NORMAL_CARDS, QUADRANTS, WHOLE_AREA, type ChangeId, type NormalCardId, type QuadrantId, type WholeAreaId } from "./changes-data";
// Separate from brea-learning-v1 so the five-lesson Learning Garden is never affected.
export const CHANGES_KEY = "brea-changes-v1";
const CHANGE_EVENT = "brea-changes-changed";
export type ChangesState = { version: 1; completed: string[]; badges: string[]; position: number; started: boolean; normals: NormalCardId[]; explored: ChangeId[]; quizResult: number | null; position2: number; started2: boolean; quadrants: QuadrantId[]; regions: WholeAreaId[]; quiz2Result: number | null };
export function emptyChanges(): ChangesState {
  return { version: 1, completed: [], badges: [], position: 0, started: false, normals: [], explored: [], quizResult: null, position2: 0, started2: false, quadrants: [], regions: [], quiz2Result: null };
}
export function normalizeChanges(input: unknown): ChangesState {
  if (!input || typeof input !== "object") return emptyChanges();
  const v = input as Partial<ChangesState>;
  const completed = Array.isArray(v.completed) ? [...new Set(v.completed.filter((id) => id === CHANGES_LESSON1_ID || id === CHANGES_LESSON2_ID))] : [];
  return {
    version: 1,
    completed,
    badges: completed.map((id) => CHANGES_BADGES[id]).filter((b): b is string => typeof b === "string"),
    position: typeof v.position === "number" && Number.isFinite(v.position) ? Math.max(0, Math.min(2, Math.floor(v.position))) : 0,
    started: v.started === true,
    normals: Array.isArray(v.normals) ? [...new Set(v.normals.filter((id) => NORMAL_CARDS.some((c) => c.id === id)))] : [],
    explored: Array.isArray(v.explored) ? [...new Set(v.explored.filter((id) => CHANGES.some((c) => c.id === id)))] : [],
    quizResult: typeof v.quizResult === "number" && Number.isInteger(v.quizResult) && v.quizResult >= 0 && v.quizResult <= 3 ? v.quizResult : null,
    position2: typeof v.position2 === "number" && Number.isFinite(v.position2) ? Math.max(0, Math.min(2, Math.floor(v.position2))) : 0,
    started2: v.started2 === true,
    quadrants: Array.isArray(v.quadrants) ? [...new Set(v.quadrants.filter((id) => QUADRANTS.some((q) => q.id === id)))] : [],
    regions: Array.isArray(v.regions) ? [...new Set(v.regions.filter((id) => WHOLE_AREA.some((r) => r.id === id)))] : [],
    quiz2Result: typeof v.quiz2Result === "number" && Number.isInteger(v.quiz2Result) && v.quiz2Result >= 0 && v.quiz2Result <= 3 ? v.quiz2Result : null,
  };
}
export function readChanges(): ChangesState {
  try { return normalizeChanges(JSON.parse(window.localStorage.getItem(CHANGES_KEY) ?? "null")); } catch { return emptyChanges(); }
}
export function completeChangesLesson(state: ChangesState) {
  const firstCompletion = !state.completed.includes(CHANGES_LESSON1_ID);
  return { firstCompletion, state: normalizeChanges({ ...state, started: true, position: 2, completed: [...state.completed, CHANGES_LESSON1_ID] }) };
}
export function completeChangesLesson2(state: ChangesState) {
  const firstCompletion = !state.completed.includes(CHANGES_LESSON2_ID);
  return { firstCompletion, state: normalizeChanges({ ...state, started2: true, position2: 2, completed: [...state.completed, CHANGES_LESSON2_ID] }) };
}
export function changesSummary(state: ChangesState) {
  const completed = state.completed.length;
  return { completed, total: CHANGES_LESSONS.length, percent: (completed / CHANGES_LESSONS.length) * 100 };
}
export function useChanges() {
  const [state, setState] = useState<ChangesState>(emptyChanges);
  const current = useRef(state);
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState(false);
  useEffect(() => {
    const load = () => { const s = readChanges(); current.current = s; setState(s); setName(getBreaName()); };
    load(); setReady(true);
    window.addEventListener("storage", load); window.addEventListener(CHANGE_EVENT, load);
    return () => { window.removeEventListener("storage", load); window.removeEventListener(CHANGE_EVENT, load); };
  }, []);
  const update = (transform: (s: ChangesState) => ChangesState) => {
    const next = normalizeChanges(transform(current.current));
    current.current = next; setState(next);
    try { window.localStorage.setItem(CHANGES_KEY, JSON.stringify(next)); window.dispatchEvent(new Event(CHANGE_EVENT)); } catch { setStorageNotice(true); }
    return next;
  };
  return { state, name, ready, update, storageNotice };
}
