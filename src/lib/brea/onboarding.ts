// Brea demo personalization: localStorage-only, no accounts, no medical data.

export const BREA_NAME_KEY = "brea-name";
export const BREA_INTEREST_KEY = "brea-interest";
export const BREA_ONBOARDED_KEY = "brea-onboarded";

export const BREA_INTERESTS = [
  {
    id: "learn",
    title: "Learn About Breast Health",
    description: "Explore breast anatomy, breast awareness and helpful educational information.",
  },
  {
    id: "changes",
    title: "Understand Breast Changes",
    description: "Learn about common breast changes, signs to be aware of and when to seek professional care.",
  },
  {
    id: "support",
    title: "Find Support",
    description: "Discover encouragement, shared experiences and supportive resources.",
  },
  {
    id: "care",
    title: "Find Care",
    description: "Understand screening options, healthcare guidance and where to find help.",
  },
] as const;

export type BreaInterestId = (typeof BREA_INTERESTS)[number]["id"];

export const BREA_START_PATHS = {
  learn: "/brea/learn",
  changes: "/brea/breast-changes",
  support: "/brea/support",
  care: "/brea/find-care",
} as const;

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — demo continues without persistence */
  }
}

export function getBreaName(): string {
  return (safeGet(BREA_NAME_KEY) ?? "").trim();
}

export function saveBreaName(name: string) {
  safeSet(BREA_NAME_KEY, name.trim());
}

export function getBreaInterest(): BreaInterestId | null {
  const v = safeGet(BREA_INTEREST_KEY);
  return BREA_INTERESTS.some((i) => i.id === v) ? (v as BreaInterestId) : null;
}

export function saveBreaInterest(id: BreaInterestId) {
  safeSet(BREA_INTEREST_KEY, id);
}

export function isBreaOnboarded(): boolean {
  return safeGet(BREA_ONBOARDED_KEY) === "yes";
}

export function completeBreaOnboarding() {
  safeSet(BREA_ONBOARDED_KEY, "yes");
}

/** Destructive reset is opt-in; ordinary navigation and onboarding never call it. */
export async function restartBreaDemo(confirmed = false): Promise<boolean> {
  if (!confirmed) return false;
  // Delete images first. A blocked/failed database deletion must not be reported
  // as a successful fresh demo; the confirmation panel offers a retry instead.
  if ("indexedDB" in window) {
    const names = new Set(["brea-garden"]);
    if (typeof window.indexedDB.databases === "function") {
      const databases = await window.indexedDB.databases();
      for (const db of databases) if (db.name?.startsWith("brea-")) names.add(db.name);
    }
    for (const name of names) {
      await new Promise<void>((resolve, reject) => {
        const request = window.indexedDB.deleteDatabase(name);
        const timeout = window.setTimeout(() => reject(new Error("Close other Brea tabs and try again.")), 5000);
        request.onsuccess = () => { window.clearTimeout(timeout); resolve(); };
        request.onerror = () => { window.clearTimeout(timeout); reject(new Error("Brea images could not be cleared. Please try again.")); };
      });
    }
  }
  for (const storage of [window.localStorage, window.sessionStorage]) {
    const keys = Array.from({ length: storage.length }, (_, i) => storage.key(i));
    for (const key of keys) if (key?.startsWith("brea-")) storage.removeItem(key);
  }
  // Refresh every mounted progress hook before the caller leaves the page.
  window.dispatchEvent(new Event("storage"));
  return true;
}
