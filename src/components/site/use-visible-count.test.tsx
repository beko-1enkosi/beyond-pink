import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useVisibleCount } from "./use-visible-count";

let notify: IntersectionObserverCallback;
let motionChange: () => void;
let reduced = false;
let now = 0;
let nextFrame = 0;
let frames: Map<number, FrameRequestCallback>;
let current = 0;
const disconnect = vi.fn();

function Probe({ value = 14712 }: { value?: number }) {
  const { ref, count } = useVisibleCount(value);
  current = count;
  return <span ref={ref}>{count}</span>;
}

function visibility(ratio: number) {
  act(() => notify([{ isIntersecting: ratio > 0, intersectionRatio: ratio } as IntersectionObserverEntry], {} as IntersectionObserver));
}
function frameAt(time: number) {
  now = time;
  const pending = [...frames.values()];
  frames.clear();
  act(() => pending.forEach((callback) => callback(now)));
}

beforeEach(() => {
  vi.useFakeTimers();
  reduced = false; now = 0; nextFrame = 0; frames = new Map();
  vi.spyOn(performance, "now").mockImplementation(() => now);
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { frames.set(++nextFrame, callback); return nextFrame; });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { notify = callback; }
    observe() {}
    disconnect = disconnect;
  });
  vi.spyOn(window, "matchMedia").mockImplementation(() => ({
    get matches() { return reduced; },
    addEventListener: (_event: string, callback: () => void) => { motionChange = callback; },
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList));
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers(); });

describe("viewport-bound About statistics", () => {
  it("does not start until the actual number is at least half visible", () => {
    render(<Probe />);
    visibility(0.2);
    expect(frames.size).toBe(0);
    visibility(0.5);
    expect(current).toBe(0);
    frameAt(900);
    expect(current).toBeGreaterThan(0);
    expect(current).toBeLessThan(14712);
  });
  it.each([2.3, 14712, 25])("reaches the unchanged final value %s", (value) => {
    render(<Probe value={value} />);
    visibility(1); frameAt(1800);
    expect(current).toBe(value);
  });
  it("keeps the final value on screen and never loops while visible", () => {
    render(<Probe />);
    visibility(1); frameAt(1800);
    act(() => vi.advanceTimersByTime(10000));
    expect(current).toBe(14712);
    expect(frames.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });
  it("does not replay after scrolling away and back", () => {
    render(<Probe />);
    visibility(1); frameAt(1800);
    visibility(0);
    visibility(1);
    expect(current).toBe(14712);
    expect(frames.size).toBe(0);
    act(() => vi.advanceTimersByTime(5000));
    expect(current).toBe(14712);
  });
  it("cancels an in-progress count on exit and settles on the final value", () => {
    render(<Probe />);
    visibility(1); frameAt(900); visibility(0);
    expect(frames.size).toBe(0);
    expect(current).toBe(14712);
    visibility(1);
    expect(frames.size).toBe(0);
    act(() => vi.advanceTimersByTime(5000));
    expect(current).toBe(14712);
  });
  it("shows final values without animation for reduced motion", () => {
    reduced = true;
    render(<Probe />); visibility(1);
    act(() => vi.advanceTimersByTime(10000));
    expect(current).toBe(14712);
    expect(frames.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });
  it("immediately honours a change to reduced motion", () => {
    render(<Probe />); visibility(1); frameAt(900);
    reduced = true;
    act(() => motionChange());
    expect(current).toBe(14712);
    expect(frames.size).toBe(0);
  });
  it("releases animation work and its observer on unmount", () => {
    const { unmount } = render(<Probe />); visibility(1);
    unmount();
    expect(frames.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
    expect(disconnect).toHaveBeenCalled();
  });
});
