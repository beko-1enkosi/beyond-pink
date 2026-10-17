import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, HeartHandshake, MapPin, RotateCcw, Search } from "lucide-react";
import { BreaWordmark, BreaSymbol } from "@/components/brea/BreaLogo";
import { LearnButton, LearnShell, PrimaryButton } from "@/components/brea/learn/LearnPrimitives";
import { LearningProfile } from "@/components/brea/learn/LearnPanels";
import { useLearning } from "@/lib/brea/learning";
import { useChanges } from "@/lib/brea/changes";
import { useSupport } from "@/lib/brea/support";
import { BREA_INTERESTS, getBreaInterest, isBreaOnboarded, restartBreaDemo } from "@/lib/brea/onboarding";
export const Route = createFileRoute("/brea/home")({
  head: () => ({ meta: [
    { title: "Explore Brea | Your Breast Health Companion" },
    { name: "description", content: "Your personalized Brea overview: explore breast-health learning and upcoming support and care pathways." },
    { property: "og:title", content: "Explore Brea | Your Breast Health Companion" },
    { property: "og:description", content: "A personal starting point for breast-health education and support with Brea." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: BreaHome,
});
const ICONS = { learn: BookOpen, changes: Search, support: HeartHandshake, care: MapPin };
function BreaHome() {
  const navigate = useNavigate();
  const { state, name } = useLearning();
  const { state: changes } = useChanges();
  const { state: support } = useSupport();
  const [ready, setReady] = useState(false);
  const [interest, setInterest] = useState<string | null>(null);
  useEffect(() => {
    if (!isBreaOnboarded()) { navigate({ to: "/brea", replace: true }); return; }
    setInterest(getBreaInterest());
    setReady(true);
  }, [navigate]);
  if (!ready) return <div lang="en" className="min-h-dvh bg-brea-ivory" />;
  return <LearnShell><header className="flex items-center justify-between"><BreaWordmark symbolClassName="h-8 w-8" textClassName="text-2xl" /><LearningProfile state={state} name={name} changes={changes} support={support} /></header><main className="mx-auto max-w-2xl"><section className="relative pb-8 pt-12"><BreaSymbol className="absolute right-0 top-12 hidden h-20 w-20 opacity-40 sm:block" /><p className="text-xs text-brea-sage-deep">Your space to learn & grow</p><h1 className="mt-3 max-w-lg break-words text-5xl leading-tight">Welcome to Brea{name ? <>, <em className="brea-em">{name}</em></> : ""}!</h1><p className="mt-4 text-sm leading-relaxed text-brea-sage-deep">Your journey to better breast health understanding starts here.</p></section><div className="grid gap-4 sm:grid-cols-2">{BREA_INTERESTS.map((item) => { const Icon = ICONS[item.id]; return <article key={item.id} className="flex flex-col rounded-2xl border border-brea-sage/25 bg-brea-paper p-6 shadow-brea-soft"><div className="flex justify-between gap-2"><Icon className="h-6 w-6 text-brea-sage-deep" />{interest === item.id && <span className="text-xs text-brea-sage-deep">Your focus</span>}</div><h2 className="mt-4 text-3xl leading-tight">{item.title}</h2><p className="mb-5 mt-3 text-sm leading-relaxed text-brea-sage-deep">{item.description}</p>{item.id === "learn" ? <PrimaryButton asChild className="mt-auto self-start"><Link to="/brea/learn">Explore Learning <ArrowRight /></Link></PrimaryButton> : item.id === "changes" ? <PrimaryButton asChild className="mt-auto self-start"><Link to="/brea/breast-changes">Explore Changes <ArrowRight /></Link></PrimaryButton> : item.id === "support" ? <PrimaryButton asChild className="mt-auto self-start"><Link to="/brea/support">Find Support <ArrowRight /></Link></PrimaryButton> : <span className="mt-auto text-xs text-brea-sage-deep">Coming Soon</span>}</article>; })}</div><div className="mt-8 flex flex-wrap items-center justify-between gap-4"><LearnButton onClick={() => { restartBreaDemo(); navigate({ to: "/brea" }); }} className="border-0 px-0 text-xs"><RotateCcw /> Restart Demo</LearnButton><LearnButton asChild className="border-0 px-0 text-xs"><Link to="/">Back to BeyondPink <ArrowRight /></Link></LearnButton></div></main></LearnShell>;
}
