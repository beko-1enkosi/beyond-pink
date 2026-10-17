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

function HomeSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden className={className}>
      <path
        d="M40 72 C38 54 39 38 46 22"
        stroke="var(--brea-sage)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path d="M43 44 C33 42 27 35 26 25 C35 27 41 34 43 44 Z" fill="var(--brea-sage)" opacity="0.5" />
      <path d="M44 32 C52 30 57 24 58 15 C50 17 45 23 44 32 Z" fill="var(--brea-sage-deep)" opacity="0.4" />
      <circle cx="46" cy="20" r="3.2" fill="var(--brea-blush)" opacity="0.75" />
    </svg>
  );
}

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
    <div lang="en" className="relative flex min-h-dvh flex-col overflow-hidden bg-brea-ivory font-[family-name:var(--font-brea-body)] text-brea-charcoal">
      <HomeSprig className="pointer-events-none absolute -left-5 bottom-8 h-28 w-28 opacity-70" />
      <HomeSprig className="pointer-events-none absolute -right-5 top-24 hidden h-24 w-24 rotate-180 opacity-60 sm:block" />
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
          <h1 className="mt-7 font-[family-name:var(--font-brea-display)] text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
            {name ? (
              <>
                Welcome to Brea, <em className="italic text-brea-sage-deep">{name}</em>!
              </>
            ) : (
              "Welcome to Brea!"
            )}
          </h1>
          <span aria-hidden className="mx-auto mt-5 block h-px w-14 bg-brea-blush" />
          <p className="mt-4 text-base leading-relaxed text-brea-charcoal/75">
            Your journey to better breast health understanding starts here.
          </p>
          {interest && (
            <p className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full border border-brea-sage/35 bg-brea-sage/12 px-5 py-2.5 text-sm font-medium text-brea-sage-deep">
              <Sparkles className="h-4 w-4" aria-hidden /> Your focus: {interest.title}
            </p>
          )}
          <p className="mt-8 rounded-[1.75rem] border border-brea-blush/40 bg-white/60 p-5 text-sm leading-relaxed text-brea-charcoal/70 shadow-[0_10px_28px_-18px_var(--brea-sage-deep)]">
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
