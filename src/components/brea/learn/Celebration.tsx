import { cn } from "@/lib/utils";

/**
 * Shared Brea confetti. "badge" is the fuller first-time badge celebration;
 * "quiz" is a shorter, lighter burst. Hidden under reduced motion via CSS —
 * callers always render static congratulatory text alongside it.
 */
export function Confetti({ variant = "badge" }: { variant?: "badge" | "quiz" }) {
  const count = variant === "badge" ? 36 : 14;
  return (
    <div aria-hidden className={cn("brea-confetti pointer-events-none absolute inset-0 overflow-hidden", variant === "quiz" && "brea-confetti-quiz")}>
      {Array.from({ length: count }, (_, i) => (
        <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 7) * 0.08}s`, transform: `rotate(${i * 29}deg)` }} />
      ))}
    </div>
  );
}
