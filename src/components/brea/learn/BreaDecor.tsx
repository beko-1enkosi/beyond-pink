import { TriangleAlert } from "lucide-react";
import { DISCLAIMER } from "@/lib/brea/learning-data";
import { cn } from "@/lib/utils";

/**
 * Decorative layer for Brea screens: soft sage botanical leaves fixed along
 * page corners and edges, behind all content and non-interactive. Fewer and
 * smaller leaves render on mobile to avoid clutter.
 */
function Leaf({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 80 120" aria-hidden="true" className={cn("pointer-events-none absolute", flip && "-scale-x-100", className)}>
      <path d="M40 112 C38 84 38 56 42 22" stroke="var(--brea-sage-deep)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M41 92 C26 90 14 78 12 58 C30 60 41 72 41 92 Z" fill="var(--brea-sage)" opacity="0.55" />
      <path d="M41 66 C56 64 68 52 70 32 C52 34 41 46 41 66 Z" fill="var(--brea-sage)" opacity="0.45" />
      <path d="M41 44 C30 42 22 34 20 20 C32 22 40 30 41 44 Z" fill="var(--brea-sage-deep)" opacity="0.35" />
      <circle cx="42" cy="18" r="4" fill="var(--brea-blush)" opacity="0.6" />
    </svg>
  );
}

export function BotanicalBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* top-left corner */}
      <Leaf className="left-[-18px] top-[-10px] h-28 w-20 opacity-40 sm:h-44 sm:w-32" />
      {/* top-right corner */}
      <Leaf flip className="right-[-16px] top-[12%] hidden h-40 w-28 opacity-30 sm:block" />
      {/* left edge, mid page — desktop only */}
      <Leaf className="left-[-24px] top-[55%] hidden h-48 w-32 opacity-25 md:block" />
      {/* bottom-right corner */}
      <Leaf flip className="bottom-[-14px] right-[-20px] h-24 w-16 opacity-35 sm:h-40 sm:w-28" />
      {/* small blush bud accent, bottom-left — desktop only */}
      <svg viewBox="0 0 40 40" className="absolute bottom-[18%] left-[6%] hidden h-10 w-10 opacity-30 lg:block">
        <circle cx="20" cy="20" r="7" fill="var(--brea-blush)" />
        <path d="M20 27 C18 33 14 36 10 37 M20 27 C22 33 26 36 30 37" stroke="var(--brea-sage-deep)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}


/** Soft pale-yellow medical information capsule shown near the bottom of Brea screens. */
export function DisclaimerCapsule({ className }: { className?: string }) {
  return (
    <p role="note" className={cn("flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-sm leading-relaxed sm:px-5", className)} style={{ background: "#FFF3CC", borderColor: "color-mix(in oklab, var(--brea-gold) 55%, transparent)", color: "var(--brea-charcoal)" }}>
      <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--brea-gold)" }} />
      <span>{DISCLAIMER}</span>
    </p>
  );
}
