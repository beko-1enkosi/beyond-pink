import { useCallback, useEffect, useRef, useState } from "react";
import { BOTANICAL_NAMES, COMMENT_LIMIT, HEART_REACTIONS, POST_LIMIT, type HeartReactionId, type ReportReasonId, type SeedComment } from "./community-data";

// The Brea Garden is a browser-only community demo. Its record (brea-community-v1)
// is deliberately separate from lesson, badge and support progress, and stores only
// pseudonymous demo content: visitor posts, Support reactions, comments, reports and
// hidden items. It never stores the visitor's onboarding name or any medical data.
export const COMMUNITY_KEY = "brea-community-v1";
const CHANGE_EVENT = "brea-community-changed";

export type GardenComment = { id: string; name: string; text: string; when: string };
export type GardenPost = {
  id: string;
  name: string;
  avatar: number;
  when: string;
  text: string;
  imageId?: string; // IndexedDB key — never a base64 string
  imageAlt?: string;
  own: true;
};
export type CommunityState = {
  version: 1;
  visitorName: string;
  visitorAvatar: number;
  posts: GardenPost[];
  reactions: Record<string, HeartReactionId>; // one active heart reaction per post
  comments: Record<string, GardenComment[]>;
  hidden: string[];
  reported: Record<string, ReportReasonId>;
};

function pick<T>(list: readonly T[], rand: () => number): T { return list[Math.floor(rand() * list.length)]!; }

export function emptyCommunity(rand: () => number = Math.random): CommunityState {
  return { version: 1, visitorName: pick(BOTANICAL_NAMES, rand), visitorAvatar: Math.floor(rand() * BOTANICAL_NAMES.length), posts: [], supported: [], comments: {}, hidden: [], reported: {} };
}

export function normalizeCommunity(input: unknown, rand: () => number = Math.random): CommunityState {
  const base = emptyCommunity(rand);
  if (!input || typeof input !== "object") return base;
  const v = input as Partial<CommunityState>;
  const posts: GardenPost[] = Array.isArray(v.posts)
    ? v.posts.flatMap((p) => {
        if (!p || typeof p !== "object") return [];
        const post = p as Partial<GardenPost>;
        if (typeof post.id !== "string" || typeof post.text !== "string" || !post.text.trim()) return [];
        return [{
          id: post.id,
          name: typeof post.name === "string" && post.name.startsWith("Anonymous") ? post.name : base.visitorName,
          avatar: typeof post.avatar === "number" ? post.avatar : base.visitorAvatar,
          when: typeof post.when === "string" ? post.when : "Just now",
          text: post.text.slice(0, POST_LIMIT),
          ...(typeof post.imageId === "string" ? { imageId: post.imageId } : {}),
          ...(typeof post.imageAlt === "string" ? { imageAlt: post.imageAlt } : {}),
          own: true as const,
        }];
      })
    : [];
  const comments: Record<string, GardenComment[]> = {};
  if (v.comments && typeof v.comments === "object") {
    for (const [postId, list] of Object.entries(v.comments)) {
      if (!Array.isArray(list)) continue;
      comments[postId] = list.flatMap((c) => {
        if (!c || typeof c !== "object") return [];
        const comment = c as Partial<GardenComment>;
        if (typeof comment.id !== "string" || typeof comment.text !== "string" || !comment.text.trim()) return [];
        return [{ id: comment.id, name: typeof comment.name === "string" ? comment.name : base.visitorName, text: comment.text.slice(0, COMMENT_LIMIT), when: typeof comment.when === "string" ? comment.when : "Just now" }];
      });
    }
  }
  const reported: Record<string, ReportReasonId> = {};
  if (v.reported && typeof v.reported === "object") {
    for (const [id, reason] of Object.entries(v.reported)) if (typeof reason === "string") reported[id] = reason as ReportReasonId;
  }
  return {
    version: 1,
    visitorName: typeof v.visitorName === "string" && v.visitorName.startsWith("Anonymous") ? v.visitorName : base.visitorName,
    visitorAvatar: typeof v.visitorAvatar === "number" ? v.visitorAvatar : base.visitorAvatar,
    posts,
    supported: Array.isArray(v.supported) ? v.supported.filter((s): s is string => typeof s === "string") : [],
    comments,
    hidden: Array.isArray(v.hidden) ? v.hidden.filter((s): s is string => typeof s === "string") : [],
    reported,
  };
}

export function readCommunity(): CommunityState {
  try { return normalizeCommunity(JSON.parse(window.localStorage.getItem(COMMUNITY_KEY) ?? "null")); } catch { return emptyCommunity(); }
}

let counter = 0;
export function nextId(prefix: string): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

export function makePost(state: CommunityState, text: string, imageId?: string, imageAlt?: string): CommunityState {
  const post: GardenPost = { id: nextId("post"), name: state.visitorName, avatar: state.visitorAvatar, when: "Just now", text: text.trim().slice(0, POST_LIMIT), ...(imageId ? { imageId } : {}), ...(imageAlt ? { imageAlt } : {}), own: true };
  return normalizeCommunity({ ...state, posts: [post, ...state.posts] });
}

export function toggleSupport(state: CommunityState, postId: string): CommunityState {
  const supported = state.supported.includes(postId) ? state.supported.filter((id) => id !== postId) : [...state.supported, postId];
  return normalizeCommunity({ ...state, supported });
}

export function addComment(state: CommunityState, postId: string, text: string): CommunityState {
  const comment: GardenComment = { id: nextId("comment"), name: state.visitorName, text: text.trim().slice(0, COMMENT_LIMIT), when: "Just now" };
  return normalizeCommunity({ ...state, comments: { ...state.comments, [postId]: [...(state.comments[postId] ?? []), comment] } });
}

export function reportItem(state: CommunityState, id: string, reason: ReportReasonId, hide: boolean): CommunityState {
  const hidden = hide && !state.hidden.includes(id) ? [...state.hidden, id] : state.hidden;
  return normalizeCommunity({ ...state, reported: { ...state.reported, [id]: reason }, hidden });
}

export function deletePost(state: CommunityState, postId: string): CommunityState {
  const comments = { ...state.comments };
  delete comments[postId];
  return normalizeCommunity({ ...state, posts: state.posts.filter((p) => p.id !== postId), comments, supported: state.supported.filter((id) => id !== postId), hidden: state.hidden.filter((id) => id !== postId) });
}

export function useCommunity() {
  // Deterministic initial identity keeps SSR and first client render identical;
  // the real stored (or freshly randomized) identity loads in the effect below.
  const [state, setState] = useState<CommunityState>(() => emptyCommunity(() => 0));
  const current = useRef(state);
  const [ready, setReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState(false);
  useEffect(() => {
    const load = () => { const s = readCommunity(); current.current = s; setState(s); };
    load(); setReady(true);
    window.addEventListener("storage", load); window.addEventListener(CHANGE_EVENT, load);
    return () => { window.removeEventListener("storage", load); window.removeEventListener(CHANGE_EVENT, load); };
  }, []);
  const update = useCallback((transform: (s: CommunityState) => CommunityState) => {
    const next = normalizeCommunity(transform(current.current));
    current.current = next; setState(next);
    try { window.localStorage.setItem(COMMUNITY_KEY, JSON.stringify(next)); window.dispatchEvent(new Event(CHANGE_EVENT)); } catch { setStorageNotice(true); }
    return next;
  }, []);
  return { state, ready, update, storageNotice };
}

// ---- Browser-local image storage (IndexedDB) --------------------------------
// Images are stored as Blobs in IndexedDB rather than base64 in localStorage.
// If IndexedDB is unavailable, images live only as in-memory object URLs and an
// honest notice is shown that they may not survive a reload.
const DB_NAME = "brea-garden";
const STORE = "images";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => { req.result.createObjectStore(STORE); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB unavailable"));
  });
}

export function imagesSupported(): boolean {
  return typeof window !== "undefined" && "indexedDB" in window;
}

export async function saveImage(id: string, blob: Blob): Promise<boolean> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(blob, id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("save failed"));
    });
    db.close();
    return true;
  } catch { return false; }
}

export async function loadImage(id: string): Promise<Blob | null> {
  try {
    const db = await openDb();
    const blob = await new Promise<Blob | null>((resolve, reject) => {
      const req = db.transaction(STORE, "readonly").objectStore(STORE).get(id);
      req.onsuccess = () => resolve((req.result as Blob | undefined) ?? null);
      req.onerror = () => reject(req.error ?? new Error("load failed"));
    });
    db.close();
    return blob;
  } catch { return null; }
}

export async function removeImage(id: string): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
    db.close();
  } catch { /* best effort */ }
}

/** Hook: resolves a stored image id to an object URL, revoking it on cleanup. */
export function useStoredImage(imageId: string | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!imageId) { setUrl(null); return; }
    let objectUrl: string | null = null;
    let cancelled = false;
    void loadImage(imageId).then((blob) => {
      if (cancelled || !blob) return;
      objectUrl = URL.createObjectURL(blob);
      setUrl(objectUrl);
    });
    return () => { cancelled = true; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [imageId]);
  return url;
}

export type { SeedComment };
