import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, HeartHandshake, MapPin, Search } from "lucide-react";
import { BreaSymbol, BreaWordmark } from "@/components/brea/BreaLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BREA_INTERESTS,
  BREA_START_PATHS,
  completeBreaOnboarding,
  getBreaName,
  isBreaOnboarded,
  saveBreaInterest,
  saveBreaName,
  type BreaInterestId,
} from "@/lib/brea/onboarding";

export const Route = createFileRoute("/brea/")({
  staticData: { sitemap: false },
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

// Delicate illustrated vine with leaves, tendrils and blush blossoms.
function BotanicalVine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden className={className}>
      {/* main stem */}
      <path
        d="M10 150 C38 122 52 88 50 40 C50 30 52 20 58 12"
        stroke="var(--brea-sage)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* curling tendril */}
      <path
        d="M50 84 C70 80 84 68 88 50 C89 44 86 40 81 41 C77 42 76 47 80 49"
        stroke="var(--brea-sage)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* leaves */}
      <path d="M50 96 C32 92 20 80 18 62 C36 64 48 78 50 96 Z" fill="var(--brea-sage)" opacity="0.5" />
      <path d="M52 62 C68 58 78 46 80 30 C64 32 54 46 52 62 Z" fill="var(--brea-sage-deep)" opacity="0.42" />
      <path d="M46 122 C34 120 26 112 24 100 C36 102 44 110 46 122 Z" fill="var(--brea-sage)" opacity="0.38" />
      {/* five-petal blossom */}
      <g transform="translate(60 14)" opacity="0.85">
        <ellipse cx="0" cy="-7" rx="3.4" ry="6" fill="var(--brea-blush)" />
        <ellipse cx="6.7" cy="-2.2" rx="3.4" ry="6" fill="var(--brea-blush)" transform="rotate(72 6.7 -2.2)" />
        <ellipse cx="4.1" cy="5.7" rx="3.4" ry="6" fill="var(--brea-blush)" transform="rotate(144 4.1 5.7)" />
        <ellipse cx="-4.1" cy="5.7" rx="3.4" ry="6" fill="var(--brea-blush)" transform="rotate(216 -4.1 5.7)" />
        <ellipse cx="-6.7" cy="-2.2" rx="3.4" ry="6" fill="var(--brea-blush)" transform="rotate(288 -6.7 -2.2)" />
        <circle r="2.6" fill="var(--brea-sage-deep)" opacity="0.8" />
      </g>
      {/* small buds */}
      <circle cx="90" cy="52" r="3" fill="var(--brea-blush)" opacity="0.6" />
      <circle cx="24" cy="132" r="2.4" fill="var(--brea-blush)" opacity="0.5" />
    </svg>
  );
}

// Small sprig accent for quiet corners of a screen.
function BotanicalSprig({ className }: { className?: string }) {
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

const primaryButton =
  "inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brea-sage-deep text-base font-semibold tracking-wide text-brea-ivory shadow-[0_14px_30px_-12px_var(--brea-sage-deep)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brea-sage-deep";

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
    const previous = STEP_ORDER[i - 1];
    if (i > 1 && previous) setStep(previous); // never go back into the splash
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
    navigate({ to: BREA_START_PATHS[interest] });
  };

  const displayName = getBreaName() || name.trim();

  return (
    <div lang="en" className="min-h-dvh bg-brea-ivory font-[family-name:var(--font-brea-body)] text-brea-charcoal">
      {step === "splash" && (
        <div className="flex min-h-dvh items-center justify-center bg-brea-sage" aria-label="Brea">
          <div className="brea-splash-logo flex flex-col items-center gap-4">
            <BreaSymbol className="h-24 w-24" />
            <span className="font-[family-name:var(--font-brea-display)] text-5xl font-medium tracking-wide text-brea-ivory">
              Brea
            </span>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brea-blush" />
          </div>
        </div>
      )}

      {step === "welcome" && (
        <div className="relative flex min-h-dvh flex-col overflow-hidden px-6 py-8">
          {/* asymmetrical botanical frame */}
          <BotanicalVine className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 sm:h-56 sm:w-56" />
          <BotanicalVine className="pointer-events-none absolute -bottom-6 -right-6 h-44 w-44 rotate-180 sm:h-60 sm:w-60" />
          <BotanicalSprig className="pointer-events-none absolute -right-3 top-1/3 hidden h-24 w-24 -scale-x-100 md:block" />
          <BotanicalSprig className="pointer-events-none absolute -left-3 bottom-1/4 hidden h-20 w-20 rotate-90 md:block" />
          <div className="brea-fade-in mx-auto flex w-full max-w-md flex-1 flex-col items-center">
            <BreaWordmark className="mt-2" />
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <h1 className="font-[family-name:var(--font-brea-display)] text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
                Hi, I’m <em className="italic text-brea-sage-deep">Brea</em>.
              </h1>
              <span aria-hidden className="mt-5 h-px w-16 bg-brea-blush" />
              <p className="mt-5 max-w-sm text-base leading-relaxed text-brea-charcoal/75 sm:text-lg">
                Your breast health companion. A safe space to learn, explore and feel supported.
              </p>
            </div>
            <Button variant="ghost" type="button" onClick={() => setStep("name")} className={cn(primaryButton, "mb-4 max-w-xs")}>
              Get Started <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {step === "name" && (
        <div className="relative flex min-h-dvh flex-col overflow-hidden px-6 py-6">
          <BotanicalSprig className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 opacity-80 sm:h-36 sm:w-36" />
          <div className="brea-fade-in mx-auto flex w-full max-w-md flex-1 flex-col">
            <div className="flex items-center justify-between">
              <Button variant="ghost"
                type="button"
                onClick={goBack}
                aria-label="Back"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brea-charcoal/70 transition hover:bg-brea-sage/15"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </Button>
              <Button variant="ghost"
                type="button"
                onClick={() => submitName(true)}
                className="rounded-full px-4 py-2 text-sm font-medium text-brea-charcoal/60 underline-offset-4 transition hover:text-brea-charcoal hover:underline"
              >
                Skip
              </Button>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brea-sage-deep">
                Let’s get to know each other.
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-brea-display)] text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
                What should Brea call you?
              </h1>
              <form
                className="mt-9"
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
                    "h-16 w-full rounded-2xl border bg-brea-paper/80 px-5 text-lg shadow-[0_8px_24px_-14px_var(--brea-sage-deep)] outline-none transition placeholder:text-brea-charcoal/40 focus:border-brea-sage-deep",
                    nameError ? "border-brea-blush" : "border-brea-sage/35",
                  )}
                />
                {nameError && (
                  <p role="alert" className="mt-2 text-sm text-brea-charcoal/70">
                    Please enter a name, or choose Skip to continue without one.
                  </p>
                )}
                <Button variant="ghost" type="submit" className={cn(primaryButton, "mt-6")}>
                  Continue <ArrowRight className="h-5 w-5" aria-hidden />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {step === "greeting" && (
        <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
          <BotanicalSprig className="pointer-events-none absolute -left-5 top-10 h-24 w-24 -scale-x-100 opacity-70" />
          <BotanicalSprig className="pointer-events-none absolute -right-5 bottom-10 h-24 w-24 rotate-180 opacity-70" />
          <div className="brea-fade-in flex flex-col items-center text-center">
            <BreaSymbol className="h-20 w-20" />
            <h1 className="mt-7 font-[family-name:var(--font-brea-display)] text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              {displayName ? (
                <>
                  Nice to meet you, <em className="italic text-brea-sage-deep">{displayName}</em>!
                </>
              ) : (
                "Lovely to meet you!"
              )}
            </h1>
            <span aria-hidden className="mt-5 h-px w-14 bg-brea-blush" />
            <p className="mt-4 max-w-sm text-base text-brea-charcoal/75">
              Let’s make your experience feel a little more personal.
            </p>
          </div>
        </div>
      )}

      {step === "journey" && (
        <div className="relative flex min-h-dvh flex-col overflow-hidden px-6 py-6">
          <BotanicalSprig className="pointer-events-none absolute -right-5 -top-4 h-24 w-24 rotate-180 opacity-60" />
          <div className="brea-fade-in mx-auto flex w-full max-w-lg flex-1 flex-col">
            <Button variant="ghost"
              type="button"
              onClick={goBack}
              aria-label="Back"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brea-charcoal/70 transition hover:bg-brea-sage/15"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </Button>
            <h1 className="mt-4 font-[family-name:var(--font-brea-display)] text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Where would you like to <em className="brea-em">start</em>?
            </h1>
            <p className="mt-3 text-base text-brea-charcoal/75">
              Choose one to explore first. You can discover everything else later.
            </p>
            <div role="radiogroup" aria-label="Choose your starting pathway" className="mt-7 grid flex-1 content-start gap-3.5">
              {BREA_INTERESTS.map((item) => {
                const Icon = INTEREST_ICONS[item.id];
                const selected = interest === item.id;
                return (
                  <Button variant="ghost"
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected || (!interest && item.id === "learn") ? 0 : -1}
                    onKeyDown={(event) => {
                      const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
                      if (!direction && event.key !== "Home" && event.key !== "End") return;
                      event.preventDefault();
                      const index = BREA_INTERESTS.findIndex((choice) => choice.id === item.id);
                      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? BREA_INTERESTS.length - 1 : (index + direction + BREA_INTERESTS.length) % BREA_INTERESTS.length;
                      const next = BREA_INTERESTS[nextIndex];
                      if (!next) return;
                      setInterest(next.id);
                      const radios = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
                      radios?.[nextIndex]?.focus();
                    }}
                    onClick={() => setInterest(item.id)}
                    className={cn(
                      "flex h-auto min-h-11 w-full items-center justify-start gap-4 whitespace-normal rounded-[1.75rem] border p-4 pl-5 text-left transition duration-300",
                      selected
                        ? "border-brea-sage-deep/70 bg-brea-sage/12 shadow-[0_14px_30px_-16px_var(--brea-sage-deep)]"
                        : "border-brea-sage/25 bg-brea-paper/60 shadow-[0_6px_18px_-14px_var(--brea-sage-deep)] hover:border-brea-sage/50 hover:bg-brea-paper/80",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors",
                        selected ? "bg-brea-sage-deep text-brea-ivory" : "bg-brea-sage/15 text-brea-sage-deep",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-[family-name:var(--font-brea-display)] text-xl font-medium leading-snug">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-brea-charcoal/65">
                        {item.description}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition",
                        selected
                          ? "border-brea-sage-deep bg-brea-sage-deep text-brea-ivory"
                          : "border-brea-sage/40 text-transparent",
                      )}
                    >
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </Button>
                );
              })}
            </div>
            <Button variant="ghost"
              type="button"
              onClick={finish}
              disabled={!interest}
              className={cn(primaryButton, "mb-4 mt-6 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none")}
            >
              Continue <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
