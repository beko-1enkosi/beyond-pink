import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { BREA_START_PATHS, getBreaName, restartBreaDemo, saveBreaName } from "./onboarding";
import { completeLesson, emptyLearning, LEARNING_KEY, readLearning } from "./learning";
import { readCommunity } from "./community";

beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });
afterEach(() => vi.unstubAllGlobals());

describe("Fresh Brea demo", () => {
  it("requires confirmation and preserves existing learning and name otherwise", async () => {
    saveBreaName("Thobeka");
    const progress = completeLesson(emptyLearning()).state;
    localStorage.setItem(LEARNING_KEY, JSON.stringify(progress));
    expect(await restartBreaDemo(false)).toBe(false);
    expect(getBreaName()).toBe("Thobeka");
    expect(readLearning()).toEqual(progress);
  });
  it("clears all Brea local/session records and images but leaves unrelated settings", async () => {
    const deleted: string[] = [];
    vi.stubGlobal("indexedDB", {
      databases: async () => [{ name: "brea-garden" }, { name: "brea-future" }, { name: "unrelated" }],
      deleteDatabase: (name: string) => {
        deleted.push(name);
        const request = {} as IDBOpenDBRequest;
        queueMicrotask(() => request.onsuccess?.call(request, new Event("success")));
        return request;
      },
    });
    for (const storage of [localStorage, sessionStorage]) {
      for (const key of ["brea-name", "brea-interest", "brea-onboarded", "brea-learning-v1", "brea-changes-v1", "brea-support-v1", "brea-community-v1", "brea-future"]) storage.setItem(key, "saved");
      storage.setItem("beyondpink-language", "zu");
    }
    expect(await restartBreaDemo(true)).toBe(true);
    expect(deleted).toEqual(["brea-garden", "brea-future"]);
    for (const storage of [localStorage, sessionStorage]) {
      expect(Object.keys(storage)).toEqual(["beyondpink-language"]);
      expect(storage.getItem("beyondpink-language")).toBe("zu");
    }
    saveBreaName("New visitor");
    expect(readLearning()).toEqual(emptyLearning());
    expect(readCommunity()).toMatchObject({ posts: [], reactions: {}, comments: {}, hidden: [], reported: {} });
  });
  it("does not pretend a failed image deletion succeeded", async () => {
    localStorage.setItem("brea-name", "Thobeka");
    vi.stubGlobal("indexedDB", { deleteDatabase: () => {
      const request = {} as IDBOpenDBRequest;
      queueMicrotask(() => request.onerror?.call(request, new Event("error")));
      return request;
    } });
    await expect(restartBreaDemo(true)).rejects.toThrow();
    expect(getBreaName()).toBe("Thobeka");
  });
});

describe("Starting pathways", () => {
  it.each([
    ["learn", "/brea/learn"], ["changes", "/brea/breast-changes"],
    ["support", "/brea/support"], ["care", "/brea/find-care"],
  ] as const)("routes %s directly to %s", (choice, destination) => {
    expect(BREA_START_PATHS[choice]).toBe(destination);
  });
});