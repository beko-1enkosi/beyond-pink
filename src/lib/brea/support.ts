import { useEffect, useRef, useState } from "react";
import { getBreaName } from "./onboarding";
import { CARING_IDS, COMPANION_BADGE, GUIDE_IDS, SUPPORT_BADGE, type CaringId, type GuideId } from "./support-data";
// Separate Support Garden record. Stores only explored guide IDs and the earned badge —
// never the selected Before/During/After tab or any personal or medical status.
export const SUPPORT_KEY = "brea-support-v1";
const CHANGE_EVENT = "brea-support-changed";
// `caring` holds explored Supporting Someone section IDs only — never details about another person.
export type SupportState = { version: 1; explored: GuideId[]; caring: CaringId[]; badges: string[] };
export function emptySupport(): SupportState { return { version: 1, explored: [], caring: [], badges: [] }; }
export function normalizeSupport(input: unknown): SupportState {
  if (!input || typeof input !== "object") return emptySupport();
  const v = input as Partial<SupportState>;
  const explored = Array.isArray(v.explored) ? GUIDE_IDS.filter((id) => v.explored!.includes(id)) : [];
  const caring = Array.isArray(v.caring) ? CARING_IDS.filter((id) => v.caring!.includes(id)) : [];
  const badges: string[] = [];
  if (explored.length === GUIDE_IDS.length) badges.push(SUPPORT_BADGE);
  if (caring.length === CARING_IDS.length) badges.push(COMPANION_BADGE);
  return { version: 1, explored, caring, badges };
}
export function markGuideExplored(state: SupportState, id: GuideId): { state: SupportState; firstBadge: boolean } {
  const next = normalizeSupport({ ...state, explored: [...state.explored, id] });
  return { state: next, firstBadge: !state.badges.includes(SUPPORT_BADGE) && next.badges.includes(SUPPORT_BADGE) };
}
export function markCaringExplored(state: SupportState, id: CaringId): { state: SupportState; firstBadge: boolean } {
  const next = normalizeSupport({ ...state, caring: [...state.caring, id] });
  return { state: next, firstBadge: !state.badges.includes(COMPANION_BADGE) && next.badges.includes(COMPANION_BADGE) };
}
export function readSupport(): SupportState {
  try { return normalizeSupport(JSON.parse(window.localStorage.getItem(SUPPORT_KEY) ?? "null")); } catch { return emptySupport(); }
}
export function useSupport() {
  const [state, setState] = useState<SupportState>(emptySupport);
  const current = useRef(state);
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState(false);
  useEffect(() => {
    const load = () => { const s = readSupport(); current.current = s; setState(s); setName(getBreaName()); };
    load(); setReady(true);
    window.addEventListener("storage", load); window.addEventListener(CHANGE_EVENT, load);
    return () => { window.removeEventListener("storage", load); window.removeEventListener(CHANGE_EVENT, load); };
  }, []);
  const update = (transform: (s: SupportState) => SupportState) => {
    const next = normalizeSupport(transform(current.current));
    current.current = next; setState(next);
    try { window.localStorage.setItem(SUPPORT_KEY, JSON.stringify(next)); window.dispatchEvent(new Event(CHANGE_EVENT)); } catch { setStorageNotice(true); }
    return next;
  };
  return { state, name, ready, update, storageNotice };
}
