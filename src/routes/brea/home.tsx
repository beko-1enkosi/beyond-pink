import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { BreaSymbol, BreaWordmark } from "@/components/brea/BreaLogo";
import {
  BREA_INTERESTS,
  getBreaInterest,
  getBreaName,
  isBreaOnboarded,
  restartBreaDemo,
} from "@/lib/brea/onboarding";

export const Route = createFileRoute("/brea/home")({
  head: () => ({
    meta: [
      { title: "Brea Home | Your Breast Health Companion" },
      {
        name: "description",
        content: "Your personalized Brea starting point — breast-health education and support, prepared just for you.",
      },
      { property: "og:title", content: "Brea Home" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BreaHome,
});

function BreaHome() {
  const navigate = useNavigate();
  // Render nothing until we know whether onboarding is complete (localStorage).
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isBreaOnboarded()) {
      navigate({ to: "/brea", replace: true });
      return;
    }
    setReady(true);
  }, [navigate]);

  if (!ready) return <div lang="en" className="min-h-dvh bg-brea-ivory" />;

  const name = getBreaName();
  const interest = BREA_INTERESTS.find((i) => i.id === getBreaInterest());

  return (
    <div lang="en" className="flex min-h-dvh flex-col bg-brea-ivory font-[family-name:var(--font-brea-body)] text-brea-charcoal">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <BreaWordmark symbolClassName="h-8 w-8" textClassName="text-2xl" />
        <button
          type="button"
          onClick={() => {
            restartBreaDemo();
            navigate({ to: "/brea" });
          }}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brea-sage/40 px-4 text-sm font-medium text-brea-charcoal/70 transition hover:bg-brea-sage/15"
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> Restart Demo
        </button>
      </header>
      <main className="flex flex-1 items-center justify-center px-6 pb-16">
        <div className="brea-fade-in w-full max-w-md text-center">
          <BreaSymbol className="mx-auto h-16 w-16" />
          <h1 className="mt-6 font-[family-name:var(--font-brea-display)] text-3xl font-bold leading-tight sm:text-4xl">
            {name ? `Welcome to Brea, ${name}!` : "Welcome to Brea!"}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-brea-charcoal/75">
            Your journey to better breast health understanding starts here.
          </p>
          {interest && (
            <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-brea-sage/40 bg-brea-sage/15 px-5 py-2.5 text-sm font-medium text-brea-sage-deep">
              <Sparkles className="h-4 w-4" aria-hidden /> Your focus: {interest.title}
            </p>
          )}
          <p className="mt-8 rounded-3xl border border-brea-blush/50 bg-white/70 p-5 text-sm leading-relaxed text-brea-charcoal/70 shadow-sm">
            We’re preparing your personalized dashboard. Brea is an educational companion and never replaces
            advice from a qualified healthcare professional.
          </p>
          <p className="mt-6 text-sm text-brea-charcoal/60">
            <Link to="/" className="font-medium text-brea-sage-deep underline-offset-4 hover:underline">
              ← Back to BeyondPink
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
