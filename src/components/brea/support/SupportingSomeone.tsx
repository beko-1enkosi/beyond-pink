import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ExternalLink } from "lucide-react";
import { BreaWordmark } from "@/components/brea/BreaLogo";
import { CompanionBadge, LearnButton, LearnShell, PrimaryButton, SupportPetals } from "@/components/brea/learn/LearnPrimitives";
import { LearningProfile } from "@/components/brea/learn/LearnPanels";
import { Confetti } from "@/components/brea/learn/Celebration";
import { useLearning } from "@/lib/brea/learning";
import { useChanges } from "@/lib/brea/changes";
import { markCaringExplored, useSupport } from "@/lib/brea/support";
import type { CaringId } from "@/lib/brea/support-data";
import { ACTS, SELF_CARE, SITUATIONS, SWAPS } from "@/lib/brea/caring-data";
import { cn } from "@/lib/utils";

const card = "rounded-2xl border border-brea-sage/25 bg-brea-paper shadow-brea-soft";
const choice = (on: boolean) => cn("min-h-11 rounded-2xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep motion-reduce:transition-none", on ? "border-brea-rose/50 bg-brea-blush/25 shadow-brea-soft" : "border-brea-sage/25 bg-brea-paper hover:bg-brea-sage/10");

function TogetherIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full max-w-sm" role="img" aria-label="Illustration of two people sitting together on a bench beneath leafy branches">
      <path d="M10 40 Q60 10 110 40" stroke="var(--brea-sage)" strokeWidth="2" fill="none" />
      {[25, 50, 75, 95].map((x, i) => <ellipse key={x} cx={x} cy={i % 2 ? 30 : 38} rx="7" ry="13" transform={`rotate(${i % 2 ? 40 : -40} ${x} 34)`} fill="var(--brea-sage)" opacity=".55" />)}
      <path d="M210 30 Q260 5 310 35" stroke="var(--brea-sage)" strokeWidth="2" fill="none" />
      {[230, 255, 280, 300].map((x, i) => <ellipse key={x} cx={x} cy={i % 2 ? 22 : 30} rx="7" ry="13" transform={`rotate(${i % 2 ? -40 : 40} ${x} 26)`} fill="var(--brea-sage)" opacity=".55" />)}
      <rect x="60" y="150" width="200" height="9" rx="4" fill="var(--brea-sage-deep)" opacity=".75" />
      <path d="M75 159 V185 M245 159 V185" stroke="var(--brea-sage-deep)" strokeWidth="5" strokeLinecap="round" />
      {/* person left */}
      <circle cx="128" cy="78" r="17" fill="var(--brea-anatomy)" /><path d="M111 74 Q114 56 132 58 Q146 62 145 76 Q136 66 120 70 Z" fill="var(--brea-charcoal)" opacity=".8" />
      <path d="M104 150 Q102 104 128 98 Q152 104 152 150 Z" fill="var(--brea-sage)" />
      {/* person right */}
      <circle cx="192" cy="80" r="17" fill="var(--brea-gold)" opacity=".75" /><path d="M176 78 Q178 60 194 62 Q209 64 208 82 Q206 70 194 70 Q182 72 176 78 Z" fill="var(--brea-sage-deep)" />
      <path d="M168 150 Q166 106 192 100 Q218 106 216 150 Z" fill="var(--brea-blush)" />
      {/* arm around shoulder */}
      <path d="M150 112 Q172 104 182 112" stroke="var(--brea-sage)" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M160 52 C156 46 148 50 154 56 L160 61 L166 56 C172 50 164 46 160 52 Z" fill="var(--brea-rose)" opacity=".85" />
    </svg>
  );
}

function MarkExplored({ done, onMark }: { done: boolean; onMark: () => void }) {
  return <div className="mt-6 flex justify-end">{done ? <span className="flex items-center gap-1.5 text-xs text-brea-sage-deep"><Check className="h-4 w-4" aria-hidden /> Marked as explored</span> : <LearnButton className="text-xs" onClick={onMark}>Mark as Explored</LearnButton>}</div>;
}

export function SupportingSomeone() {
  const { state: learning, name } = useLearning();
  const { state: changes } = useChanges();
  const { state, update, storageNotice } = useSupport();
  const [celebrating, setCelebrating] = useState(false);
  const [sit, setSit] = useState(0);
  const [act, setAct] = useState<string>(ACTS[0].id);
  const [self, setSelf] = useState<string>(SELF_CARE[0].id);
  const mark = (id: CaringId) => {
    const r = markCaringExplored(state, id);
    update(() => r.state);
    if (r.firstBadge) { setCelebrating(true); window.scrollTo({ top: 0 }); }
  };
  const count = state.caring.length;
  const situation = SITUATIONS[sit]!;
  const activeAct = ACTS.find((a) => a.id === act)!;

  return (
    <LearnShell>
      <header className="flex items-center justify-between gap-3"><BreaWordmark symbolClassName="h-8 w-8" textClassName="text-2xl" /><LearningProfile state={learning} name={name} changes={changes} support={state} /></header>
      <main className="mx-auto max-w-3xl">
        <nav aria-label="Support navigation" className="mt-6 flex flex-wrap gap-x-5">
          <LearnButton asChild className="border-0 px-0 text-xs"><Link to="/brea/support"><ArrowLeft /> Back to Find Support</Link></LearnButton>
          <LearnButton asChild className="border-0 px-0 text-xs"><Link to="/brea/home">Brea Home</Link></LearnButton>
        </nav>

        {celebrating ? (
          <section className="brea-fade-in relative py-8 text-center" aria-live="polite">
            <Confetti />
            <div className="brea-badge-bloom flex justify-center"><CompanionBadge earned large /></div>
            <h1 className="mt-8 break-words text-4xl sm:text-5xl">Kindness grows in the little things{name ? <>, <em className="brea-em">{name}</em></> : ""}.</h1>
            <p className="mt-4 text-sm">You’ve explored ways to offer meaningful support.</p>
            <p className="mt-2 text-sm font-medium">You earned the Compassionate Companion badge!</p>
            <p className="mt-3 text-xs text-brea-sage-deep">This recognises exploring educational guidance — not the quality of your caregiving or anyone’s health outcome.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <LearnButton onClick={() => setCelebrating(false)}>Revisit Support Guidance</LearnButton>
              <PrimaryButton asChild><Link to="/brea/support">Back to Find Support <ArrowRight /></Link></PrimaryButton>
            </div>
          </section>
        ) : (<>
          <section className="grid items-center gap-6 pb-6 pt-8 sm:grid-cols-[1.2fr_1fr]">
            <div className="min-w-0">
              <p className="text-xs tracking-wide text-brea-sage-deep">BREA · FIND SUPPORT</p>
              <h1 className="mt-3 break-words text-5xl leading-tight sm:text-6xl">Showing Up With <em className="brea-em">Love.</em></h1>
              <p className="mt-4 text-base leading-relaxed text-brea-sage-deep">Supporting someone you care about can mean listening, helping with everyday things, or simply being present. You don’t need all the answers to make a difference.</p>
              <div className="mt-5 flex items-center gap-3 text-xs text-brea-sage-deep"><SupportPetals count={count} /><span>{count} of 3 ways to support explored</span></div>
            </div>
            <div className="flex justify-center"><TogetherIllustration /></div>
          </section>
          <nav aria-label="Sections" className="flex flex-wrap gap-2 text-xs">
            {[["words", "Words That Help"], ["acts", "Little Acts of Care"], ["self", "Caring for Yourself, Too"]].map(([id, l]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-brea-sage/30 px-4 text-brea-sage-deep hover:bg-brea-sage/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep">{state.caring.includes(id as CaringId) && <Check className="h-3 w-3" aria-label="Explored" />}{l}</a>)}
          </nav>

          {/* Section 1 */}
          <section id="words" aria-labelledby="words-h" className="scroll-mt-6 pt-12">
            <p className="text-xs text-brea-sage-deep">01 · Words That Help</p>
            <h2 id="words-h" className="mt-2 text-4xl leading-tight">Sometimes, Being There Is <em className="brea-em">Enough.</em></h2>
            <p className="mt-3 text-sm leading-relaxed text-brea-sage-deep">When someone is facing uncertainty or cancer treatment, finding the right words can feel difficult. Listening and respecting their feelings are often more helpful than trying to find the perfect thing to say.</p>
            <div className={cn(card, "mt-6 p-5 sm:p-7")}>
              <h3 className="text-2xl">What Could I Say?</h3>
              <p className="mt-1 text-xs text-brea-sage-deep">Example phrases only — this is not a messaging service.</p>
              <div role="radiogroup" aria-label="Situations" className="mt-4 grid gap-2 sm:grid-cols-2">
                {SITUATIONS.map((s, i) => <button key={s.id} role="radio" aria-checked={i === sit} onClick={() => setSit(i)} className={choice(i === sit)}>{s.title}</button>)}
              </div>
              <div key={situation.id} className="brea-fade-in mt-6 space-y-3" aria-live="polite">
                <p className="text-xs text-brea-sage-deep">Situation: {situation.title}</p>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brea-sage-deep px-4 py-3 text-sm leading-relaxed text-brea-ivory"><span className="sr-only">Example response: </span>“{situation.say}”</div>
                <p className="rounded-2xl rounded-bl-sm border border-brea-rose/30 bg-brea-blush/20 px-4 py-3 text-sm leading-relaxed"><strong className="text-brea-rose-deep">Why it may help: </strong>{situation.why}</p>
              </div>
              <div className="mt-5 flex justify-end"><LearnButton className="text-xs" onClick={() => setSit((sit + 1) % SITUATIONS.length)}>Next Situation <ArrowRight /></LearnButton></div>
            </div>
            <h3 className="mt-8 text-2xl">Gentle Swaps</h3>
            <div className="mt-3 space-y-3">
              {SWAPS.map((w) => (
                <details key={w.instead} className={cn(card, "group p-5")}>
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep"><span>Instead of <span className="italic text-brea-sage-deep">“{w.instead}”</span></span><ChevronDown aria-hidden className="h-5 w-5 shrink-0 text-brea-sage-deep transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary>
                  <p className="mt-3 font-[family-name:var(--font-brea-display)] text-2xl leading-snug text-brea-rose-deep">Try “{w.tryThis}”</p>
                  <p className="mt-2 text-sm leading-relaxed">{w.why}</p>
                </details>
              ))}
            </div>
            <MarkExplored done={state.caring.includes("words")} onMark={() => mark("words")} />
          </section>

          {/* Section 2 */}
          <section id="acts" aria-labelledby="acts-h" className="scroll-mt-6 pt-12">
            <p className="text-xs text-brea-sage-deep">02 · Little Acts of Care</p>
            <h2 id="acts-h" className="mt-2 text-4xl leading-tight">Love Can Look Like the <em className="brea-em">Little Things.</em></h2>
            <p className="mt-3 text-sm leading-relaxed text-brea-sage-deep">Practical support can make everyday responsibilities feel more manageable. Rather than assuming what someone needs, offer specific help and respect their answer.</p>
            <div role="radiogroup" aria-label="Ways I can help" className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ACTS.map((a) => <button key={a.id} role="radio" aria-checked={a.id === act} onClick={() => setAct(a.id)} className={cn(choice(a.id === act), "font-[family-name:var(--font-brea-display)] text-xl leading-tight")}>{a.title}</button>)}
            </div>
            <div key={activeAct.id} className={cn(card, "brea-fade-in mt-4 p-5 sm:p-7")} aria-live="polite">
              <h3 className="text-2xl">{activeAct.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{activeAct.summary}</p>
              <ul className="mt-4 space-y-1.5 text-sm">{activeAct.examples.map((e) => <li key={e} className="flex gap-2"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brea-blush" />{e}</li>)}</ul>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <p className="rounded-2xl border border-brea-sage/25 p-4 text-sm"><span className="block text-xs text-brea-sage-deep">Instead of something vague</span><span className="italic">“Let me know if you need anything.”</span></p>
                <p className="rounded-2xl border border-brea-rose/30 bg-brea-blush/20 p-4 text-sm"><span className="block text-xs text-brea-rose-deep">Try a specific offer</span>“{activeAct.offer}”</p>
              </div>
            </div>
            <p role="note" className="mt-5 border-l-2 border-brea-rose/50 pl-4 text-sm leading-relaxed">Always ask first. Respect someone’s independence, privacy and preferences. Any medical tasks should follow guidance from their healthcare professionals.</p>
            <MarkExplored done={state.caring.includes("acts")} onMark={() => mark("acts")} />
          </section>

          {/* Section 3 */}
          <section id="self" aria-labelledby="self-h" className="scroll-mt-6 pt-12">
            <p className="text-xs text-brea-sage-deep">03 · Caring for Yourself, Too</p>
            <h2 id="self-h" className="mt-2 text-4xl leading-tight">Your Wellbeing <em className="brea-em">Matters</em>, Too.</h2>
            <p className="mt-3 text-sm leading-relaxed text-brea-sage-deep">Supporting someone you care about can be meaningful and emotionally demanding. You also deserve rest, understanding and support.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {SELF_CARE.map((c, i) => { const on = c.id === self; return (
                <button key={c.id} aria-expanded={on} onClick={() => setSelf(c.id)} className={cn(choice(on), "flex flex-col p-5")}>
                  <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden><path d="M20 36 V18" stroke="var(--brea-sage-deep)" strokeWidth="2" /><ellipse cx="14" cy="26" rx="4" ry="7" transform="rotate(-40 14 26)" fill="var(--brea-sage)" /><ellipse cx="26" cy="24" rx="4" ry="7" transform="rotate(40 26 24)" fill="var(--brea-sage)" />{i > 0 && <circle cx="20" cy="12" r={3 + i} fill="var(--brea-blush)" />}<circle cx="20" cy="12" r="2" fill="var(--brea-gold)" /></svg>
                  <span className="mt-3 font-[family-name:var(--font-brea-display)] text-2xl leading-tight">{c.title}</span>
                  {on && <span className="brea-fade-in mt-2 text-sm leading-relaxed">{c.body}</span>}
                </button>
              ); })}
            </div>
            <p className="mt-6 text-center font-[family-name:var(--font-brea-display)] text-3xl italic text-brea-rose-deep">Caring for someone doesn’t mean putting every part of your own life aside.</p>
            <aside className={cn(card, "mt-6 p-6")} aria-labelledby="cansa-h">
              <h3 id="cansa-h" className="text-2xl">Support for Caregivers in South Africa</h3>
              <p className="mt-2 text-sm leading-relaxed">CANSA offers resources and counselling support for people affected by cancer, including caregivers and families. CANSA is not an emergency service — for urgent help, contact local emergency services.</p>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <a className="inline-flex min-h-11 items-center gap-1.5 underline decoration-brea-rose underline-offset-4" href="https://cansa.org.za/cansas-care-support/cansa-tele-counselling-service/" target="_blank" rel="noopener noreferrer">Explore CANSA Counselling Support <ExternalLink aria-hidden className="h-3.5 w-3.5" /><span className="sr-only">(opens in a new tab)</span></a>
                <a className="inline-flex min-h-11 items-center gap-1.5 underline decoration-brea-rose underline-offset-4" href="https://cansa.org.za/cansas-care-support/support-groups/" target="_blank" rel="noopener noreferrer">CANSA Support Groups <ExternalLink aria-hidden className="h-3.5 w-3.5" /><span className="sr-only">(opens in a new tab)</span></a>
              </div>
            </aside>
            <MarkExplored done={state.caring.includes("self")} onMark={() => mark("self")} />
            {storageNotice && <p role="status" className="mt-2 text-right text-xs text-brea-sage-deep">Your progress couldn’t be saved on this device.</p>}
          </section>
          <p className="mt-10 text-xs leading-relaxed text-brea-sage-deep">Brea shares educational examples only. It does not offer counselling or medical advice, and nothing here is saved about the person you support. Respect their autonomy, consent and confidentiality.</p>
        </>)}
      </main>
    </LearnShell>
  );
}
