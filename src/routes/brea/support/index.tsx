import { BreaHomeButton } from "@/components/brea/BreaNavigation";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, HandHeart, Users } from "lucide-react";
import { CompanionBadge, LearnButton, LearnShell, PrimaryButton, SupportBadge } from "@/components/brea/learn/LearnPrimitives";
import { BreaHeader } from "@/components/brea/learn/LearnPanels";
import { GuideFlower } from "@/components/brea/support/SupportIllustrations";
import { useLearning } from "@/lib/brea/learning";
import { useChanges } from "@/lib/brea/changes";
import { useSupport } from "@/lib/brea/support";
import { COMPANION_BADGE, SUPPORT_BADGE, SUPPORT_PATHWAYS } from "@/lib/brea/support-data";

export const Route = createFileRoute("/brea/support/")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Find Support | Brea" },
    { name: "description", content: "You are not alone. Explore gentle, educational support guidance with Brea for every part of a breast-health journey." },
    { property: "og:title", content: "Find Support | Brea" },
    { property: "og:description", content: "Gentle guidance and support for wherever you are in your breast-health journey." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: SupportHome,
});

function SupportHome() {
  const { state, name } = useLearning();
  const { state: changes } = useChanges();
  const { state: support } = useSupport();
  const [featured, ...rest] = SUPPORT_PATHWAYS;
  const icons = { supporting: HandHeart, connect: Users } as const;
  return (
    <LearnShell>
      <BreaHeader state={state} name={name} changes={changes} support={support} />
      <main className="mx-auto max-w-3xl">
        <BreaHomeButton className="mt-6" />
        <section className="pb-8 pt-8">
          <p className="text-xs text-brea-sage-deep">Find Support</p>
          <h1 className="mt-3 break-words text-5xl leading-tight sm:text-6xl">You Are Not <em className="brea-em">Alone.</em></h1>
          <p className="mt-4 text-base leading-relaxed text-brea-sage-deep">Whatever brings you here, there’s space for you.</p>
        </section>
        <section aria-label="Your support garden" className="mb-8 grid min-w-0 gap-5 rounded-2xl border border-brea-sage/20 bg-brea-sage/15 p-5 sm:p-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl sm:text-3xl">Your Support Garden</h2>
            <p className="mt-2 text-xs text-brea-sage-deep">{support.badges.length} support {support.badges.length === 1 ? "badge" : "badges"} collected</p>
            <p className="mt-2 text-xs leading-relaxed text-brea-sage-deep">A gentle record of the supportive guidance you’ve explored — never a measure of how you’re feeling.</p>
          </div>
          <div aria-label="Your support badges" className="grid grid-cols-[repeat(auto-fit,64px)] gap-4">
            <SupportBadge earned={support.badges.includes(SUPPORT_BADGE)} />
            <CompanionBadge earned={support.badges.includes(COMPANION_BADGE)} />
          </div>
        </section>
        <article className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-brea-rose/25 bg-brea-blush/25 p-7 shadow-brea-soft sm:flex-row sm:items-center sm:p-9">
          <GuideFlower id="after" className="h-28 w-24 shrink-0 self-center" />
          <div className="min-w-0">
            <h2 className="text-4xl leading-tight">{featured.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-brea-charcoal">{featured.description}</p>
            <PrimaryButton asChild className="mt-6"><Link to="/brea/support/looking-for-support">Find Your Support <ArrowRight /></Link></PrimaryButton>
          </div>
        </article>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {rest.map((p) => { const Icon = icons[p.id as keyof typeof icons]; return (
            <article key={p.id} className="flex flex-col rounded-2xl border border-brea-sage/25 bg-brea-paper p-6 shadow-brea-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brea-sage/40 hover:shadow-lg focus-within:border-brea-sage-deep/50">
              <Icon aria-hidden className="h-6 w-6 text-brea-sage-deep" />
              <h2 className="mt-4 text-3xl leading-tight">{p.title}</h2>
              <p className="mb-5 mt-3 text-sm leading-relaxed text-brea-sage-deep">{p.description}</p>
              <PrimaryButton asChild className="mt-auto self-start"><Link to={p.id === "connect" ? "/brea/support/community" : "/brea/support/supporting-someone"}>{p.id === "connect" ? "Visit the Garden" : "Explore Ways to Help"} <ArrowRight /></Link></PrimaryButton>
            </article>
          ); })}
        </div>
      </main>
    </LearnShell>
  );
}
