import { describe, expect, it } from "vitest";
import { emptySupport, markGuideExplored, normalizeSupport } from "./support";

describe("Support Garden", () => {
  it("awards Support Pathfinder only after all three guides are explored", () => {
    let s = emptySupport();
    s = markGuideExplored(s, "before").state;
    s = markGuideExplored(s, "during").state;
    expect(s.badges).toEqual([]);
    const r = markGuideExplored(s, "after");
    expect(r.firstBadge).toBe(true);
    expect(r.state.badges).toEqual(["Support Pathfinder"]);
  });
  it("does not celebrate the badge twice", () => {
    const full = normalizeSupport({ explored: ["before", "during", "after"] });
    expect(markGuideExplored(full, "before").firstBadge).toBe(false);
  });
  it("never persists the selected tab or unknown fields", () => {
    const s = normalizeSupport({ explored: ["during", "bogus"], selected: "during", diagnosis: "x" });
    expect(s).toEqual({ version: 1, explored: ["during"], badges: [] });
  });
  it("guides are not locked behind one another", () => {
    expect(markGuideExplored(emptySupport(), "after").state.explored).toEqual(["after"]);
  });
});
