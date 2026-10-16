import { cn } from "@/lib/utils";

/** The original Hero divider, shared without changing its paths or palette. */
export function SectionWaves({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 140" preserveAspectRatio="none" className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full sm:h-14 lg:h-16", className)}>
      <path d="M0 70 C240 20 420 120 720 80 C1000 42 1200 110 1440 60 L1440 140 L0 140Z" fill="var(--blush)" opacity="0.75" />
      <path d="M0 96 C260 60 480 130 760 104 C1040 78 1220 126 1440 92 L1440 140 L0 140Z" fill="var(--sage)" opacity="0.45" />
      <path d="M0 84 C300 52 520 118 800 92" stroke="var(--sage)" strokeWidth="1.5" fill="none" />
      <path d="M0 118 C280 96 520 140 820 122 C1080 106 1260 136 1440 116 L1440 140 L0 140Z" fill="var(--ivory)" />
    </svg>
  );
}