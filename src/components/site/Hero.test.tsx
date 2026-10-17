import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Hero } from "./Hero";

vi.mock("@/lib/i18n", () => ({ useTranslation: () => ({ t: (text: string) => text }) }));
vi.mock("@tanstack/react-router", () => ({ Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a> }));
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });
const active = () => document.querySelector('[aria-roledescription="slide"][aria-hidden="false"]')?.getAttribute("aria-label");

describe("campaign photo timing", () => {
  it("advances every two seconds through all four photos and loops", () => {
    vi.useFakeTimers(); render(<Hero />);
    for (const number of [2, 3, 4, 1]) {
      act(() => vi.advanceTimersByTime(1999));
      expect(active()?.startsWith(`${number} of`)).toBe(false);
      act(() => vi.advanceTimersByTime(1));
      expect(active()?.startsWith(`${number} of`)).toBe(true);
    }
  });
  it("resets the full timer even when the currently active dot is selected", () => {
    vi.useFakeTimers(); render(<Hero />);
    act(() => vi.advanceTimersByTime(1500));
    fireEvent.click(screen.getByRole("button", { name: /Show photograph 1:/ }));
    act(() => vi.advanceTimersByTime(1999)); expect(active()).toContain("1 of");
    act(() => vi.advanceTimersByTime(1)); expect(active()).toContain("2 of");
    fireEvent.click(screen.getByRole("button", { name: "Next photograph" }));
    expect(active()).toContain("3 of");
    act(() => vi.advanceTimersByTime(2000)); expect(active()).toContain("4 of");
  });
  it("cleans up the autoplay timer on unmount", () => {
    vi.useFakeTimers(); const { unmount } = render(<Hero />);
    unmount(); expect(vi.getTimerCount()).toBe(0);
  });
  it("keeps manual controls usable without autoplay for reduced motion", () => {
    vi.useFakeTimers();
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList);
    render(<Hero />); act(() => vi.advanceTimersByTime(10000)); expect(active()).toContain("1 of");
    fireEvent.click(screen.getByRole("button", { name: "Next photograph" })); expect(active()).toContain("2 of");
  });
});