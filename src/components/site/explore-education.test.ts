import { describe, expect, it } from "vitest";
import { moveJourneyStep } from "./explore-education";

describe("Explore's three-step journey", () => {
  it("moves forward through exactly three steps and stops at the final step", () => {
    expect(moveJourneyStep(0, "next")).toBe(1);
    expect(moveJourneyStep(1, "next")).toBe(2);
    expect(moveJourneyStep(2, "next")).toBe(2);
  });
  it("moves back and never goes before the first step", () => {
    expect(moveJourneyStep(2, "back")).toBe(1);
    expect(moveJourneyStep(1, "back")).toBe(0);
    expect(moveJourneyStep(0, "back")).toBe(0);
  });
});