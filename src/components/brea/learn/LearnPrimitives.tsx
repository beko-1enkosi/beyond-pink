import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { BreaSymbol } from "@/components/brea/BreaLogo";
import { cn } from "@/lib/utils";
import { DISCLAIMER } from "@/lib/brea/learning-data";
export function LearnButton({ className, variant = "ghost", ...props }: ButtonProps) {
  return <Button variant={variant} className={cn("min-h-11 h-auto rounded-full border border-brea-sage/30 px-5 py-3 whitespace-normal text-brea-sage-deep hover:bg-brea-sage/15 focus-visible:ring-brea-sage-deep", className)} {...props} />;
}
export function PrimaryButton(props: ButtonProps) {
  return <LearnButton {...props} className={cn("bg-brea-sage-deep text-brea-ivory hover:bg-brea-sage-deep/90 border-brea-sage-deep shadow-brea-soft", props.className)} />;
}
export function LearnShell({ children }: { children: ReactNode }) {
  return <div lang="en" className="brea-learning min-h-dvh bg-brea-ivory text-brea-charcoal font-[family-name:var(--font-brea-body)]"><div className="mx-auto max-w-5xl px-5 pb-32 pt-5 sm:px-8 sm:pt-8">{children}<footer className="mt-12 border-t border-brea-sage/20 pt-5 text-xs leading-relaxed text-brea-sage-deep">{DISCLAIMER}</footer></div></div>;
}
export function ProgressBar({ percent }: { percent: number }) {
  return <progress className="brea-progress mt-3 h-1.5 w-full overflow-hidden rounded-full" value={percent} max={100} aria-label="Learning progress" />;
}
export function AnatomyBadge({ earned = false, large = false }: { earned?: boolean; large?: boolean }) {
  return <div className={cn("relative flex shrink-0 items-center justify-center rounded-full border-2 border-brea-sage/40 bg-brea-paper", large ? "h-32 w-32" : "h-16 w-16", !earned && "opacity-40")} aria-label={earned ? "Anatomy Explorer badge earned" : "Anatomy Explorer badge locked"}><span className="absolute inset-1.5 rounded-full border border-dashed border-brea-gold/70" /><BreaSymbol className={large ? "h-20 w-20" : "h-11 w-11"} />{earned && <span className="absolute -bottom-1 rounded-full bg-brea-sage-deep px-2 py-0.5 text-xs text-brea-ivory">01</span>}</div>;
}
