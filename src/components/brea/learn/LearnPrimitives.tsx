import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { BreaSymbol } from "@/components/brea/BreaLogo";
import { cn } from "@/lib/utils";
import { BotanicalBackdrop, DisclaimerCapsule } from "./BreaDecor";
export function LearnButton({ className, variant = "ghost", ...props }: ButtonProps) {
  return <Button variant={variant} className={cn("min-h-11 h-auto rounded-full border border-brea-sage/30 px-5 py-3 whitespace-normal text-brea-sage-deep hover:bg-brea-sage/15 focus-visible:ring-brea-sage-deep", className)} {...props} />;
}
export function PrimaryButton(props: ButtonProps) {
  return <LearnButton {...props} className={cn("bg-brea-sage-deep text-brea-ivory hover:bg-brea-sage-deep/90 border-brea-sage-deep shadow-brea-soft", props.className)} />;
}
export function LearnShell({ children }: { children: ReactNode }) {
  return <div lang="en" className="brea-learning relative min-h-dvh bg-brea-ivory text-brea-charcoal font-[family-name:var(--font-brea-body)]"><BotanicalBackdrop /><div className="relative z-10 mx-auto max-w-5xl px-5 pb-32 pt-5 sm:px-8 sm:pt-8">{children}<footer className="mt-12"><DisclaimerCapsule /></footer></div></div>;
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

export function CellBadge({ earned = false, large = false }: { earned?: boolean; large?: boolean }) {
  return <BadgeFrame earned={earned} large={large} label="Cell Detective"><svg viewBox="0 0 64 64" className={large ? "h-20 w-20" : "h-11 w-11"} aria-hidden><circle cx="27" cy="27" r="18" fill="var(--brea-sage)" opacity=".5" /><circle cx="27" cy="27" r="8" fill="var(--brea-blush)" /><circle cx="27" cy="27" r="22" stroke="var(--brea-sage-deep)" strokeWidth="2.5" fill="none" /><path d="M43 43 L56 56" stroke="var(--brea-sage-deep)" strokeWidth="5" strokeLinecap="round" /><circle cx="15" cy="23" r="2" fill="var(--brea-gold)" /><path d="M25 21 Q33 25 25 29 T29 34" stroke="var(--brea-ivory)" fill="none" strokeWidth="1.5" /></svg>{earned && <span className="absolute -bottom-1 rounded-full bg-brea-sage-deep px-2 py-0.5 text-xs text-brea-ivory">03</span>}</BadgeFrame>;
}
export function ScreeningBadge({ earned = false, large = false }: { earned?: boolean; large?: boolean }) {
  return <BadgeFrame earned={earned} large={large} label="Screening Smart"><svg viewBox="0 0 64 64" className={large ? "h-20 w-20" : "h-11 w-11"} aria-hidden><circle cx="32" cy="32" r="17" fill="var(--brea-blush)" /><rect x="22" y="14" width="20" height="7" rx="2.5" fill="var(--brea-sage-deep)" /><rect x="24" y="21" width="16" height="22" rx="3" fill="var(--brea-ivory)" stroke="var(--brea-sage-deep)" strokeWidth="2" /><path d="M27 32 Q32 24 37 32 Q32 40 27 32 Z" fill="var(--brea-rose, #B65F7B)" opacity=".85" /><circle cx="32" cy="32" r="2" fill="var(--brea-gold)" /><path d="M14 50 Q20 44 26 50 M38 50 Q44 44 50 50" stroke="var(--brea-sage)" strokeWidth="2" fill="none" strokeLinecap="round" /><circle cx="14" cy="18" r="2" fill="var(--brea-gold)" /><circle cx="50" cy="18" r="2" fill="var(--brea-gold)" /></svg>{earned && <span className="absolute -bottom-1 rounded-full bg-brea-sage-deep px-2 py-0.5 text-xs text-brea-ivory">05</span>}</BadgeFrame>;
}
export function AdvocateBadge({ earned = false, large = false }: { earned?: boolean; large?: boolean }) {
  return <BadgeFrame earned={earned} large={large} label="Breast Health Advocate"><svg viewBox="0 0 64 64" className={large ? "h-20 w-20" : "h-11 w-11"} aria-hidden><path d="M14 49 Q10 30 23 15 M50 49 Q54 30 41 15" fill="none" stroke="var(--brea-sage-deep)" strokeWidth="2" /><g fill="var(--brea-sage)"><ellipse cx="14" cy="33" rx="5" ry="10" transform="rotate(-35 14 33)" /><ellipse cx="20" cy="24" rx="5" ry="9" transform="rotate(30 20 24)" /><ellipse cx="50" cy="33" rx="5" ry="10" transform="rotate(35 50 33)" /><ellipse cx="44" cy="24" rx="5" ry="9" transform="rotate(-30 44 24)" /></g><path d="M25 13 Q32 7 39 13 Q44 21 33 35 L23 51 L17 47 L30 28 Q20 18 25 13 Z M27 15 Q25 20 32 25 Q39 20 37 15 Q32 12 27 15 Z" fill="var(--brea-blush)" fillRule="evenodd" /><path d="M35 28 L48 47 L41 51 L29 33" fill="var(--brea-blush)" /><circle cx="13" cy="49" r="2" fill="var(--brea-gold)" /><circle cx="51" cy="49" r="2" fill="var(--brea-gold)" /></svg>{earned && <span className="absolute -bottom-1 rounded-full bg-brea-sage-deep px-2 py-0.5 text-xs text-brea-ivory">04</span>}</BadgeFrame>;
}
