import { cn } from "@/lib/utils";

// Provisional Brea logo: a delicate botanical symbol (two petals and a leaf on a
// flowing stem) plus a Poppins wordmark. Pure SVG so it stays sharp at any size
// and is easy to replace later.

export function BreaSymbol({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
    >
      {/* flowing stem */}
      <path
        d="M32 56 C30 44 30 34 33 22"
        stroke="var(--brea-sage-deep)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* left petal */}
      <path
        d="M33 30 C24 28 17 21 16 11 C26 12 33 19 33 30 Z"
        fill="var(--brea-sage)"
      />
      {/* right petal */}
      <path
        d="M33 24 C41 22 47 16 48 7 C39 8 33 14 33 24 Z"
        fill="var(--brea-sage-deep)"
      />
      {/* blush accent bud */}
      <circle cx="33" cy="18" r="4" fill="var(--brea-blush)" />
      {/* small base leaf */}
      <path
        d="M31 46 C25 45 21 41 20 35 C26 36 30 40 31 46 Z"
        fill="var(--brea-blush)"
        opacity="0.75"
      />
    </svg>
  );
}

export function BreaWordmark({
  className,
  symbolClassName,
  textClassName,
}: {
  className?: string;
  symbolClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BreaSymbol className={cn("h-10 w-10", symbolClassName)} />
      <span
        className={cn(
          "font-[family-name:var(--font-brea-display)] text-3xl font-semibold tracking-tight text-brea-charcoal",
          textClassName,
        )}
      >
        Brea
      </span>
    </span>
  );
}
