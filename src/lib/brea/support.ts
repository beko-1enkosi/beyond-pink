import { useEffect, useRef, useState } from "react";
import { getBreaName } from "./onboarding";
import { GUIDE_IDS, SUPPORT_BADGE, type GuideId } from "./support-data";
// Separate Support Garden record. Stores only explored guide IDs and the earned badge —
// never the selected Before/During/After tab or any personal or medical status.
export const SUPPORT_KEY = "brea-support-v1";
const CHANGE_EVENT = "brea-support-changed";
export type SupportState = { version: 1; explored: GuideId[]; badges: string[] };
export function emptySupport(): SupportState { return { version: 1, explored: [], badges: [] }; }
export function normalizeSupport(input: unknown): SupportState {
  if (!input || typeof input !== "object") return emptySupport();
  const v = input as Partial<SupportState>;
  const explored = Array.isArray(v.explored) ? GUIDE_IDS.filter((id) => v.explored!.includes(id)) : [];
  return { version: 1, explored, badges: explored.length === GUIDE_IDS.length ? [SUPPORT_BADGE] : [] };
}
export function markGuideExplored(state: SupportState, id: GuideId): { state: SupportState; firstBadge: boolean } {
  const next = normalizeSupport({ ...state, explored: [...state.explored, id] });
  return { state: next, firstBadge: !state.badges.includes(SUPPORT_BADGE) && next.badges.includes(SUPPORT_BADGE) };
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
