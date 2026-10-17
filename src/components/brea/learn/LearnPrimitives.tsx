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
function BadgeFrame({ earned, large, label, children }: { earned: boolean; large?: boolean; label: string; children: ReactNode }) {
  return <div className={cn("relative flex shrink-0 items-center justify-center rounded-full border-2 border-brea-sage/40 bg-brea-paper", large ? "h-32 w-32" : "h-16 w-16", !earned && "opacity-40")} aria-label={earned ? `${label} badge earned` : `${label} badge locked`}><span className="absolute inset-1.5 rounded-full border border-dashed border-brea-gold/70" />{children}</div>;
}
export function AnatomyBadge({ earned = false, large = false }: { earned?: boolean; large?: boolean }) {
  return <BadgeFrame earned={earned} large={large} label="Anatomy Explorer"><BreaSymbol className={large ? "h-20 w-20" : "h-11 w-11"} />{earned && <span className="absolute -bottom-1 rounded-full bg-brea-sage-deep px-2 py-0.5 text-xs text-brea-ivory">01</span>}</BadgeFrame>;
}
export function HormoneBadge({ earned = false, large = false }: { earned?: boolean; large?: boolean }) {
  const s = large ? "h-20 w-20" : "h-11 w-11";
  return <BadgeFrame earned={earned} large={large} label="Hormone Helper"><svg viewBox="0 0 48 48" className={s} aria-hidden><g fill="var(--brea-blush)">{[0, 72, 144, 216, 288].map((deg) => <ellipse key={deg} cx="24" cy="13" rx="5" ry="9" transform={`rotate(${deg} 24 24)`} />)}</g><circle cx="24" cy="24" r="5" fill="var(--brea-gold)" /><path d="M24 33 Q22 40 18 43 M24 33 Q26 40 30 43" stroke="var(--brea-sage-deep)" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>{earned && <span className="absolute -bottom-1 rounded-full bg-brea-sage-deep px-2 py-0.5 text-xs text-brea-ivory">02</span>}</BadgeFrame>;
}
