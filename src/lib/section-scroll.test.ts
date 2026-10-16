import { describe, expect, it, vi, afterEach } from "vitest";
import { scrollEase, sectionScrollTop, scrollToSection } from "./section-scroll";

afterEach(() => { vi.restoreAllMocks(); document.body.innerHTML = ""; });

describe("same-page scrolling", () => {
  it("positions a target below the sticky navbar", () => {
    expect(sectionScrollTop(500, 1000, 72)).toBe(1428);
    expect(sectionScrollTop(0, 0, 72)).toBe(0);
  });
  it("eases naturally from start to finish without overshooting", () => {
    expect(scrollEase(0)).toBe(0);
    expect(scrollEase(0.25)).toBe(0.0625);
    expect(scrollEase(0.5)).toBe(0.5);
    expect(scrollEase(0.75)).toBe(0.9375);
    expect(scrollEase(1)).toBe(1);
  });
  it("scrolls instantly without animation when reduced motion is requested", () => {
    document.body.innerHTML = '<section id="about"></section>';
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);
    vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(5000);
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({ top: 500 } as DOMRect);
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { callback(0); return 1; });
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    scrollToSection("#about");
    expect(scroll).toHaveBeenCalledExactlyOnceWith({ top: 428, behavior: "instant" });
  });
});