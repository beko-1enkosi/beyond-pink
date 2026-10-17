import { BreaHomeButton } from "@/components/brea/BreaNavigation";
import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ExternalLink, Phone } from "lucide-react";
import { BreaWordmark } from "@/components/brea/BreaLogo";
import { LearnButton, LearnShell, PrimaryButton, SupportBadge, SupportPetals } from "@/components/brea/learn/LearnPrimitives";
import { LearningProfile } from "@/components/brea/learn/LearnPanels";
import { Confetti } from "@/components/brea/learn/Celebration";
import { useLearning } from "@/lib/brea/learning";
import { useChanges } from "@/lib/brea/changes";
import { markGuideExplored, useSupport } from "@/lib/brea/support";
import { SUPPORT_GUIDES, type GuideId } from "@/lib/brea/support-data";
import { BRI_SUPPORT_CONTACT } from "@/lib/bri/support-contact";
import { cn } from "@/lib/utils";
import { GuideFlower } from "./SupportIllustrations";

export function LookingForSupport() {
  const { state: learning, name } = useLearning();
  const { state: changes } = useChanges();
  const { state, update, storageNotice } = useSupport();
  // Selected tab is session-only UI state and is never stored.
  const [active, setActive] = useState<GuideId>("before");
  const [celebrating, setCelebrating] = useState(false);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const guide = SUPPORT_GUIDES.find((g) => g.id === active)!;
  const explored = state.explored.includes(active);

  const onKey = (e: KeyboardEvent, index: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = SUPPORT_GUIDES[(index + dir + SUPPORT_GUIDES.length) % SUPPORT_GUIDES.length]!;
    setActive(next.id); tabs.current[next.id]?.focus();
  };
  const mark = () => {
    const result = markGuideExplored(state, active);
    update(() => result.state);
    if (result.firstBadge) setCelebrating(true);
  };

  return (
    <LearnShell>
      <header className="flex items-center justify-between gap-3"><BreaWordmark symbolClassName="h-8 w-8" textClassName="text-2xl" /><LearningProfile state={learning} name={name} changes={changes} support={state} /></header>
      <main className="mx-auto max-w-3xl">
        <nav aria-label="Support navigation" className="mt-6 flex flex-wrap items-center gap-3">
          <LearnButton asChild className="border-0 px-0 text-xs"><Link to="/brea/support"><ArrowLeft /> Back to Find Support</Link></LearnButton>
          <BreaHomeButton />
        </nav>

        {celebrating ? (
          <section className="brea-fade-in relative py-8 text-center" aria-live="polite">
            <Confetti />
            <div className="brea-badge-bloom flex justify-center"><SupportBadge earned large /></div>
            <h1 className="mt-8 break-words text-4xl sm:text-5xl">Your Support Garden is blooming{name ? <>, <em className="brea-em">{name}</em></> : ""}!</h1>
            <p className="mt-4 text-sm font-medium">You earned the Support Pathfinder badge.</p>
            <p className="mt-3 text-xs text-brea-sage-deep">This recognises exploring supportive information — not health progress or recovery.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <LearnButton onClick={() => setCelebrating(false)}>Keep Reading</LearnButton>
              <PrimaryButton asChild><Link to="/brea/support">Back to Find Support <ArrowRight /></Link></PrimaryButton>
            </div>
          </section>
        ) : (<>
          <section className="pb-6 pt-8">
            <p className="text-xs text-brea-sage-deep">I’m Looking for Support</p>
            <h1 className="mt-3 break-words text-5xl leading-tight sm:text-6xl">Your Journey, <em className="brea-em">Your Pace.</em></h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brea-sage-deep">There’s no single way to navigate uncertainty, diagnosis or recovery. Explore the support that feels relevant to you.</p>
            <div className="mt-5 flex items-center gap-3 text-xs text-brea-sage-deep"><SupportPetals count={state.explored.length} /><span>{state.explored.length} of 3 support petals collected</span></div>
          </section>

          <div role="tablist" aria-label="Support guides" className="grid grid-cols-3 gap-2 sm:gap-4">
            {SUPPORT_GUIDES.map((g, i) => {
              const selected = g.id === active;
              return (
                <button key={g.id} ref={(el) => { tabs.current[g.id] = el; }} role="tab" id={`tab-${g.id}`} aria-selected={selected} aria-controls="support-panel" tabIndex={selected ? 0 : -1} onClick={() => setActive(g.id)} onKeyDown={(e) => onKey(e, i)}
                  className={cn("flex min-h-11 flex-col items-center rounded-2xl border px-2 py-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep motion-reduce:transition-none sm:px-4", selected ? "border-brea-rose/40 bg-brea-blush/25 shadow-brea-soft" : "border-brea-sage/25 bg-brea-paper hover:bg-brea-sage/10")}>
                  <GuideFlower id={g.id} className="h-14 w-12 sm:h-16 sm:w-14" />
                  <span className="mt-2 font-[family-name:var(--font-brea-display)] text-2xl leading-none">{g.label}</span>
                  <span className="mt-1 hidden text-xs leading-snug text-brea-sage-deep sm:block">{g.tagline}</span>
                  {state.explored.includes(g.id) && <span className="mt-1 flex items-center gap-1 text-[0.7rem] text-brea-rose-deep"><Check className="h-3 w-3" aria-hidden />Explored</span>}
                </button>
              );
            })}
          </div>

          <section id="support-panel" role="tabpanel" aria-labelledby={`tab-${active}`} key={active} className="brea-fade-in mt-8">
            <h2 className="text-4xl leading-tight">{guide.label} — <em className="brea-em">{guide.tagline}</em></h2>
            <p className="mt-3 text-sm leading-relaxed text-brea-sage-deep">{guide.intro}</p>
            <div className="mt-6 space-y-3">
              {guide.cards.map((c, i) => (
                <details key={c.title} open={i === 0} className="group rounded-2xl border border-brea-sage/25 bg-brea-paper p-5 shadow-brea-soft">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-lg font-[family-name:var(--font-brea-display)] text-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep">{c.title}<ChevronDown aria-hidden className="h-5 w-5 shrink-0 text-brea-sage-deep transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary>
                  <p className="mt-3 text-sm leading-relaxed">{c.body}</p>
                  {c.points && <><p className="mt-4 text-xs text-brea-sage-deep">{c.pointsLabel}</p><ul className="mt-2 space-y-1.5 text-sm">{c.points.map((p) => <li key={p} className="flex gap-2"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brea-blush" />{p}</li>)}</ul></>}
                </details>
              ))}
            </div>
            <p role="note" className="mt-5 border-l-2 border-brea-rose/50 pl-4 text-sm leading-relaxed">{guide.note}</p>
            {guide.closing && <p className="mt-6 text-center font-[family-name:var(--font-brea-display)] text-3xl italic text-brea-rose-deep">{guide.closing}</p>}
            <div className="mt-6 flex justify-end">
              {explored ? <span className="flex items-center gap-1.5 text-xs text-brea-sage-deep"><Check className="h-4 w-4" aria-hidden /> Marked as explored</span> : <LearnButton className="text-xs" onClick={mark}>Mark as Explored</LearnButton>}
            </div>
            {storageNotice && <p role="status" className="mt-2 text-right text-xs text-brea-sage-deep">Your progress couldn’t be saved on this device.</p>}
          </section>
        </>)}

        <section aria-labelledby="support-resources" className="mt-12 rounded-3xl border border-brea-sage/25 bg-brea-paper p-6 sm:p-8">
          <h2 id="support-resources" className="text-3xl">Where to find support</h2>
          <p className="mt-3 text-sm leading-relaxed">Support can come from your healthcare team, hospital or clinic social workers, qualified counsellors and reputable support organisations. Brea is an educational companion — it does not offer live counselling or emergency help.</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex flex-wrap items-center gap-2"><Phone aria-hidden className="h-4 w-4 text-brea-sage-deep" />{BRI_SUPPORT_CONTACT.name}: <a className="font-medium underline decoration-brea-rose underline-offset-4" href={BRI_SUPPORT_CONTACT.href}>{BRI_SUPPORT_CONTACT.number}</a><span className="text-xs text-brea-sage-deep">({BRI_SUPPORT_CONTACT.purpose})</span></li>
            <li><a className="inline-flex items-center gap-1.5 underline decoration-brea-rose underline-offset-4" href="https://cansa.org.za/" target="_blank" rel="noopener noreferrer">Cancer Association of South Africa (CANSA) <ExternalLink aria-hidden className="h-3.5 w-3.5" /></a></li>
          </ul>
          <p className="mt-5 rounded-2xl bg-brea-blush/20 p-4 text-sm leading-relaxed"><strong>Need urgent help?</strong> If you or someone else needs urgent medical or mental-health assistance, contact your local emergency services or go to the nearest emergency unit straight away.</p>
        </section>
      </main>
    </LearnShell>
  );
}
