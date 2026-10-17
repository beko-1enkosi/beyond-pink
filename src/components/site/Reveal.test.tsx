import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Reveal } from "./Reveal";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
describe("one-shot entrance enhancement", () => {
  it("animates on entry for 700ms with a 20px rise and never replays", () => {
    let notify: IntersectionObserverCallback | undefined;
    const unobserve = vi.fn();
    const watched = new Set<Element>();
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe(target: Element) { watched.add(target); }
      unobserve(target: Element) { watched.delete(target); unobserve(target); }
      disconnect() { watched.clear(); }
    });
    const animate = vi.fn(() => ({ cancel: vi.fn() }));
    vi.stubGlobal("Animation", class {});
    const original = HTMLElement.prototype.animate;
    HTMLElement.prototype.animate = animate as unknown as typeof original;
    const { unmount } = render(<Reveal delay={120}><h2>Heading</h2></Reveal>);
    const enter = () => act(() => notify?.([...watched].map((target) => ({ target, isIntersecting: true }) as IntersectionObserverEntry), {} as IntersectionObserver));
    enter(); enter();
    expect(animate).toHaveBeenCalledTimes(1);
    expect(animate).toHaveBeenCalledWith([{ opacity: 0, translate: "0 20px" }, { opacity: 1, translate: "0 0" }], expect.objectContaining({ duration: 700, delay: 120, fill: "backwards" }));
    unmount(); HTMLElement.prototype.animate = original;
  });
});