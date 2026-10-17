import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Search } from "lucide-react";
import { BreaWordmark } from "@/components/brea/BreaLogo";
import { AwarenessBadge, LearnButton, LearnShell, PrimaryButton, ProgressBar } from "@/components/brea/learn/LearnPrimitives";
import { LearningProfile } from "@/components/brea/learn/LearnPanels";
import { useLearning } from "@/lib/brea/learning";
import { changesSummary, useChanges } from "@/lib/brea/changes";
import { CHANGES_LESSON1_ID } from "@/lib/brea/changes-data";
import { isBreaOnboarded } from "@/lib/brea/onboarding";

function BotanicalComposition() {
  return <svg viewBox="0 0 200 160" className="h-36 w-44 shrink-0" role="img" aria-label="A blush flower among sage leaves, viewed through a small magnifying glass."><path d="M100 150 Q96 110 100 70" stroke="var(--brea-sage-deep)" strokeWidth="2.5" fill="none" /><g fill="var(--brea-sage)" opacity=".8"><ellipse cx="78" cy="110" rx="10" ry="24" transform="rotate(-40 78 110)" /><ellipse cx="122" cy="102" rx="10" ry="24" transform="rotate(40 122 102)" /><ellipse cx="70" cy="70" rx="7" ry="16" transform="rotate(-60 70 70)" opacity=".6" /></g><g fill="var(--brea-blush)">{[0, 72, 144, 216, 288].map((d) => <ellipse key={d} cx="100" cy="46" rx="11" ry="18" transform={`rotate(${d} 100 62)`} />)}</g><circle cx="100" cy="62" r="7" fill="var(--brea-gold)" /><circle cx="146" cy="44" r="20" fill="var(--brea-ivory)" fillOpacity=".5" stroke="var(--brea-rose)" strokeWidth="3" /><path d="M160 58 L176 74" stroke="var(--brea-rose)" strokeWidth="5" strokeLinecap="round" /></svg>;
}

export function BreastChangesDashboard() {
  const navigate = useNavigate();
  const learning = useLearning();
  const { state, ready } = useChanges();
  const [allowed, setAllowed] = useState(false);
  useEffect(() => { if (!isBreaOnboarded()) { navigate({ to: "/brea", replace: true }); return; } setAllowed(true); }, [navigate]);
  if (!allowed || !ready) return <div lang="en" className="min-h-dvh bg-brea-ivory" />;
  const summary = changesSummary(state);
  const done = state.completed.includes(CHANGES_LESSON1_ID);
  const started = state.started || state.explored.length > 0;
  return <LearnShell><header className="flex items-center justify-between gap-3"><BreaWordmark symbolClassName="h-8 w-8" textClassName="text-2xl" /><LearningProfile state={learning.state} name={learning.name} /></header><main className="mx-auto max-w-2xl">
    <LearnButton asChild className="mt-6 border-0 px-0 text-xs"><Link to="/brea/home"><ArrowLeft /> Brea Home</Link></LearnButton>
    <section className="flex flex-col-reverse items-start gap-4 pb-8 pt-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs text-brea-sage-deep">Understand Breast Changes</p><h1 className="mt-3 text-5xl leading-[1.05] sm:text-6xl">Understand Your <em className="brea-em">Breast Changes</em></h1><p className="mt-4 max-w-md text-sm leading-relaxed text-brea-sage-deep">Get to know what’s normal for your body, what changes to notice and when to seek care.</p></div><BotanicalComposition /></section>
    <div className="rounded-2xl border border-brea-sage/25 bg-brea-paper p-5 shadow-brea-soft"><div className="flex items-center justify-between text-sm"><span className="font-[family-name:var(--font-brea-display)] text-xl">Your Awareness Journey</span><span className="text-brea-sage-deep">{summary.completed} of {summary.total} lessons completed</span></div><ProgressBar percent={summary.percent} /></div>
    <article className="relative mt-6 overflow-hidden rounded-3xl border border-brea-rose/30 bg-brea-paper p-6 shadow-brea-soft sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="font-[family-name:var(--font-brea-display)] text-sm italic text-brea-rose-deep">Lesson 01{done && <span className="ml-2 inline-flex items-center gap-1 not-italic text-brea-sage-deep"><Check className="h-4 w-4" /> Completed</span>}</p><h2 className="mt-2 text-4xl">Recognise the <em className="brea-em">Changes</em></h2><p className="mt-3 max-w-sm text-sm leading-relaxed text-brea-sage-deep">Explore the signs and changes that are important to know about.</p></div><AwarenessBadge earned={done} /></div><PrimaryButton asChild className="mt-6"><Link to="/brea/breast-changes/recognise-changes">{done ? "Revisit Lesson" : started ? "Continue Learning" : "Start Learning"} <ArrowRight /></Link></PrimaryButton></article>
    <article className="mt-4 rounded-2xl border border-dashed border-brea-sage/40 bg-brea-paper/60 p-5"><div className="flex items-center justify-between gap-3"><p className="font-[family-name:var(--font-brea-display)] text-sm italic text-brea-rose-deep">Lesson 02</p><span className="rounded-full bg-brea-sage/15 px-3 py-1 text-xs text-brea-sage-deep">Coming Soon</span></div><h2 className="mt-2 flex items-center gap-2 text-2xl"><Search className="h-5 w-5 text-brea-sage-deep" aria-hidden />Know Your Breast Quadrants</h2><p className="mt-2 text-sm leading-relaxed text-brea-sage-deep">Discover the four breast quadrants and learn a gentle approach to breast awareness.</p></article>
    <div className="mt-8 flex flex-wrap gap-3"><LearnButton asChild className="text-xs"><Link to="/brea/learn">Learn About Breast Health <ArrowRight /></Link></LearnButton><LearnButton asChild className="text-xs"><Link to="/brea/home">Explore other pathways <ArrowRight /></Link></LearnButton></div>
  </main></LearnShell>;
}
