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
    title: "Explore Care Resources",
    description: "Understand screening options, healthcare guidance and where to find help.",
  },
] as const;

export type BreaInterestId = (typeof BREA_INTERESTS)[number]["id"];

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

export function restartBreaDemo() {
  try {
    window.localStorage.removeItem(BREA_NAME_KEY);
    window.localStorage.removeItem(BREA_INTEREST_KEY);
    window.localStorage.removeItem(BREA_ONBOARDED_KEY);
  } catch {
    /* ignore */
  }
}
