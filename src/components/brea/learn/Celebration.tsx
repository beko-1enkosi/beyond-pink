import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/**
 * Shared Brea confetti. "badge" is the fuller first-time badge celebration;
 * "quiz" is a shorter, lighter burst. Hidden under reduced motion via CSS —
 * callers always render static congratulatory text alongside it.
 */
export function Confetti({ variant = "badge" }: { variant?: "badge" | "quiz" }) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setActive(false), 2800);
    return () => window.clearTimeout(timer);
  }, []);
  if (!active) return null;
  const count = variant === "badge" ? 36 : 24;
  return (
    <div aria-hidden className={cn("brea-confetti pointer-events-none absolute inset-0 overflow-hidden", variant === "quiz" && "brea-confetti-quiz")}>
      {Array.from({ length: count }, (_, i) => (
        <i key={i} data-shape={["petal", "leaf", "sparkle", "paper"][i % 4]} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 5) * 0.06}s` }} />
      ))}
    </div>
  );
}
