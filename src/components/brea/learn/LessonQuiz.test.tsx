import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LessonQuiz } from "./LessonQuiz";
import { Confetti } from "./Celebration";
import { QUIZ } from "@/lib/brea/learning-data";

vi.mock("@tanstack/react-router", () => ({ Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a> }));
afterEach(() => { cleanup(); vi.useRealTimers(); });
describe("quiz completion and bounded celebrations", () => {
  it.each([[0, 1, 1, 3], [1, 0, 0, 0]])("reports actual score and celebrates independently of correctness", (a, b, c, score) => {
    vi.useFakeTimers(); const result = vi.fn();
    render(<LessonQuiz onResult={result} onClose={vi.fn()} />);
    [a, b, c].forEach((answer, index) => {
      fireEvent.click(screen.getByRole("button", { name: new RegExp(QUIZ[index].answers[answer].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) }));
      fireEvent.click(screen.getByRole("button", { name: "Check Answer" }));
      fireEvent.click(screen.getByRole("button", { name: index === 2 ? "See My Score" : "Next Question" }));
    });
    expect(result).toHaveBeenCalledExactlyOnceWith(score);
    expect(document.querySelector(".brea-confetti")).not.toBeNull();
    act(() => vi.advanceTimersByTime(2800));
    expect(document.querySelector(".brea-confetti")).toBeNull();
    expect(result).toHaveBeenCalledTimes(1);
  });
  it("removes a badge burst after 2.8 seconds and never repeats it while mounted", () => {
    vi.useFakeTimers(); render(<Confetti />);
    expect(document.querySelector(".brea-confetti")).not.toBeNull();
    act(() => vi.advanceTimersByTime(2800)); expect(document.querySelector(".brea-confetti")).toBeNull();
    act(() => vi.advanceTimersByTime(10000)); expect(document.querySelector(".brea-confetti")).toBeNull();
  });
});