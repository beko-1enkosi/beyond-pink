import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, HeartHandshake, MapPin, Search } from "lucide-react";
import { BreaSymbol, BreaWordmark } from "@/components/brea/BreaLogo";
import { cn } from "@/lib/utils";
import {
  BREA_INTERESTS,
  completeBreaOnboarding,
  getBreaName,
  isBreaOnboarded,
  saveBreaInterest,
  saveBreaName,
  type BreaInterestId,
} from "@/lib/brea/onboarding";

export const Route = createFileRoute("/brea/")({
  head: () => ({
    meta: [
      { title: "Brea | Your Breast Health Companion" },
      {
        name: "description",
        content:
          "Brea is a warm, interactive breast-health education and support companion from BeyondPink. Learn, explore and feel supported.",
      },
      { property: "og:title", content: "Brea | Your Breast Health Companion" },
      {
        property: "og:description",
        content: "A safe space to learn, explore and feel supported — the interactive companion from BeyondPink.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BreaOnboarding,
});

const INTEREST_ICONS = {
  learn: BookOpen,
  changes: Search,
  support: HeartHandshake,
  care: MapPin,
} as const;

type Step = "splash" | "welcome" | "name" | "greeting" | "journey";
const STEP_ORDER: Step[] = ["splash", "welcome", "name", "greeting", "journey"];

function BotanicalCorner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className}>
      <path d="M8 112 C30 90 40 60 38 20" stroke="var(--brea-sage)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M38 60 C24 56 14 46 12 32 C26 34 36 44 38 60 Z" fill="var(--brea-sage)" opacity="0.45" />
      <path d="M40 38 C52 34 60 26 62 14 C50 16 42 26 40 38 Z" fill="var(--brea-sage-deep)" opacity="0.4" />
      <circle cx="40" cy="24" r="5" fill="var(--brea-blush)" opacity="0.7" />
      <circle cx="20" cy="78" r="4" fill="var(--brea-blush)" opacity="0.5" />
    </svg>
  );
}

function BreaOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("splash");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState<BreaInterestId | null>(null);
  const [nameError, setNameError] = useState(false);
  const timers = useRef<number[]>([]);

  // Returning users who finished onboarding go straight to their home.
  useEffect(() => {
    if (isBreaOnboarded()) {
      navigate({ to: "/brea/home", replace: true });
    }
  }, [navigate]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  // Splash → Welcome after ~1.5s.
  useEffect(() => {
    if (step === "splash") schedule(() => setStep("welcome"), 1500);
  }, [step]);

  // Greeting → Journey after ~1.5s.
  useEffect(() => {
    if (step === "greeting") schedule(() => setStep("journey"), 1500);
  }, [step]);

  const goBack = () => {
    const i = STEP_ORDER.indexOf(step);
    if (i > 1) setStep(STEP_ORDER[i - 1]!); // never go back into the splash
  };

  const submitName = (skip: boolean) => {
    const trimmed = name.trim();
    if (!skip && !trimmed) {
      setNameError(true);
      return;
    }
    saveBreaName(skip ? "" : trimmed);
    setStep("greeting");
  };

  const finish = () => {
    if (!interest) return;
    saveBreaInterest(interest);
    completeBreaOnboarding();
    navigate({ to: "/brea/home" });
  };

  const displayName = getBreaName() || name.trim();

  return (
    <div lang="en" className="min-h-dvh bg-brea-ivory font-[family-name:var(--font-brea-body)] text-brea-charcoal">
      {step === "splash" && (
        <div className="flex min-h-dvh items-center justify-center bg-brea-sage" aria-label="Brea">
          <div className="brea-splash-logo flex flex-col items-center gap-3">
            <BreaSymbol className="h-24 w-24" />
            <span className="font-[family-name:var(--font-brea-display)] text-4xl font-semibold tracking-tight text-brea-ivory">
              Brea
            </span>
            <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-brea-blush" />
          </div>
        </div>
      )}

      {step === "welcome" && (
        <div className="relative flex min-h-dvh flex-col overflow-hidden px-6 py-8">
          <BotanicalCorner className="pointer-events-none absolute -left-4 -top-4 h-32 w-32 sm:h-44 sm:w-44" />
          <BotanicalCorner className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 rotate-180 sm:h-44 sm:w-44" />
          <BotanicalCorner className="pointer-events-none absolute -right-6 top-1/4 hidden h-28 w-28 -scale-x-100 md:block" />
          <BotanicalCorner className="pointer-events-none absolute -left-6 bottom-1/4 hidden h-28 w-28 rotate-90 md:block" />
          <div className="brea-fade-in mx-auto flex w-full max-w-md flex-1 flex-col items-center">
            <BreaWordmark className="mt-2" />
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <h1 className="font-[family-name:var(--font-brea-display)] text-4xl font-bold leading-tight sm:text-5xl">
                Hi, I’m Brea.
              </h1>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-brea-charcoal/75 sm:text-lg">
                Your breast health companion. A safe space to learn, explore and feel supported.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep("name")}
              className="mb-4 inline-flex h-14 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-brea-sage-deep font-[family-name:var(--font-brea-display)] text-lg font-semibold text-brea-ivory shadow-lg transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brea-sage-deep"
            >
              Get Started <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      )}

      {step === "name" && (
        <div className="relative flex min-h-dvh flex-col px-6 py-6">
          <div className="brea-fade-in mx-auto flex w-full max-w-md flex-1 flex-col">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                aria-label="Back"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brea-charcoal/70 transition hover:bg-brea-sage/15"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => submitName(true)}
                className="rounded-full px-4 py-2 text-sm font-medium text-brea-charcoal/60 underline-offset-4 transition hover:text-brea-charcoal hover:underline"
              >
                Skip
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brea-sage-deep">
                Let’s get to know each other.
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-brea-display)] text-3xl font-bold leading-tight sm:text-4xl">
                What should Brea call you?
              </h1>
              <form
                className="mt-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitName(false);
                }}
              >
                <label htmlFor="brea-name" className="sr-only">
                  Your first name
                </label>
                <input
                  id="brea-name"
                  type="text"
                  autoComplete="given-name"
                  maxLength={40}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(false);
                  }}
                  placeholder="Your first name"
                  aria-invalid={nameError}
                  className={cn(
                    "h-16 w-full rounded-2xl border-2 bg-white/80 px-5 text-lg shadow-sm outline-none transition placeholder:text-brea-charcoal/40 focus:border-brea-sage-deep",
                    nameError ? "border-brea-blush" : "border-brea-sage/40",
                  )}
                />
                {nameError && (
                  <p role="alert" className="mt-2 text-sm text-brea-charcoal/70">
                    Please enter a name, or choose Skip to continue without one.
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brea-sage-deep font-[family-name:var(--font-brea-display)] text-lg font-semibold text-brea-ivory shadow-lg transition hover:brightness-110"
                >
                  Continue <ArrowRight className="h-5 w-5" aria-hidden />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {step === "greeting" && (
        <div className="flex min-h-dvh items-center justify-center px-6">
          <div className="brea-fade-in flex flex-col items-center text-center">
            <BreaSymbol className="h-20 w-20" />
            <h1 className="mt-6 font-[family-name:var(--font-brea-display)] text-3xl font-bold leading-tight sm:text-4xl">
              {displayName ? `Nice to meet you, ${displayName}!` : "Lovely to meet you!"}
            </h1>
            <p className="mt-3 max-w-sm text-base text-brea-charcoal/75">
              Let’s make your experience feel a little more personal.
            </p>
          </div>
        </div>
      )}

      {step === "journey" && (
        <div className="flex min-h-dvh flex-col px-6 py-6">
          <div className="brea-fade-in mx-auto flex w-full max-w-lg flex-1 flex-col">
            <button
              type="button"
              onClick={goBack}
              aria-label="Back"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brea-charcoal/70 transition hover:bg-brea-sage/15"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </button>
            <h1 className="mt-4 font-[family-name:var(--font-brea-display)] text-3xl font-bold leading-tight sm:text-4xl">
              What brings you to Brea today?
            </h1>
            <p className="mt-3 text-base text-brea-charcoal/75">
              Choose what you’d like to explore first. You can always discover more later.
            </p>
            <div role="radiogroup" aria-label="Choose your journey" className="mt-6 grid flex-1 content-start gap-4">
              {BREA_INTERESTS.map((item) => {
                const Icon = INTEREST_ICONS[item.id];
                const selected = interest === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setInterest(item.id)}
                    className={cn(
                      "flex min-h-11 w-full items-start gap-4 rounded-3xl border-2 p-5 text-left shadow-sm transition",
                      selected
                        ? "border-brea-sage-deep bg-brea-sage/15 shadow-md"
                        : "border-brea-sage/30 bg-white/70 hover:border-brea-sage/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                        selected ? "bg-brea-sage-deep text-brea-ivory" : "bg-brea-sage/20 text-brea-sage-deep",
                      )}
                    >
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-[family-name:var(--font-brea-display)] text-base font-semibold">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-brea-charcoal/70">
                        {item.description}
                      </span>
                    </span>
                    {selected && (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brea-sage-deep text-brea-ivory">
                        <Check className="h-4 w-4" aria-hidden />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={finish}
              disabled={!interest}
              className="mb-4 mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brea-sage-deep font-[family-name:var(--font-brea-display)] text-lg font-semibold text-brea-ivory shadow-lg transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
