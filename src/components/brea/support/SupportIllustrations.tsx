import type { GuideId } from "@/lib/brea/support-data";

/** Botanical storytelling: bud (Before), bloom (During), mature flower with leaves (After). */
export function GuideFlower({ id, className }: { id: GuideId; className?: string }) {
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden>
      <path d="M32 78 Q31 56 32 38" stroke="var(--brea-sage-deep)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {id === "before" && <><ellipse cx="24" cy="62" rx="4" ry="8" transform="rotate(-40 24 62)" fill="var(--brea-sage)" /><path d="M32 22 C40 30 40 40 32 44 C24 40 24 30 32 22 Z" fill="var(--brea-blush)" /><path d="M32 44 C27 40 26 34 28 30 M32 44 C37 40 38 34 36 30" stroke="var(--brea-sage-deep)" strokeWidth="1.5" fill="none" /></>}
      {id === "during" && <><ellipse cx="22" cy="60" rx="4.5" ry="9" transform="rotate(-40 22 60)" fill="var(--brea-sage)" /><g fill="var(--brea-blush)">{[0, 72, 144, 216, 288].map((d) => <ellipse key={d} cx="32" cy="18" rx="6" ry="10" transform={`rotate(${d} 32 30)`} />)}</g><circle cx="32" cy="30" r="5" fill="var(--brea-gold)" /></>}
      {id === "after" && <><ellipse cx="21" cy="58" rx="5" ry="10" transform="rotate(-45 21 58)" fill="var(--brea-sage)" /><ellipse cx="43" cy="52" rx="5" ry="10" transform="rotate(45 43 52)" fill="var(--brea-sage)" /><ellipse cx="22" cy="44" rx="3.5" ry="7" transform="rotate(-50 22 44)" fill="var(--brea-sage-deep)" opacity=".6" /><g fill="var(--brea-blush)">{[0, 45, 90, 135, 180, 225, 270, 315].map((d) => <ellipse key={d} cx="32" cy="14" rx="5.5" ry="11" transform={`rotate(${d} 32 26)`} />)}</g><g fill="var(--brea-rose)" opacity=".55">{[22, 112, 202, 292].map((d) => <ellipse key={d} cx="32" cy="19" rx="3.5" ry="7" transform={`rotate(${d} 32 26)`} />)}</g><circle cx="32" cy="26" r="5" fill="var(--brea-gold)" /></>}
    </svg>
  );
}
