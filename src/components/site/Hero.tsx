import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "@/assets/hero-1-unity.webp.asset.json";
import img2 from "@/assets/hero-2-diversity.webp.asset.json";
import img3 from "@/assets/hero-3-care.webp.asset.json";
import img4 from "@/assets/hero-4-men.webp.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const OPEN_BREA_EVENT = "beyondpink:open-brea";

const SLIDES = [
  { src: img1.url, alt: "Diverse hands holding pink awareness ribbons in a circle", title: "Unity & Awareness", pos: "50% 50%", posMobile: "50% 50%" },
  { src: img2.url, alt: "A multigenerational group of women smiling together, wearing pink ribbons", title: "Diversity & Inclusion", pos: "55% 35%", posMobile: "62% 40%" },
  { src: img3.url, alt: "Three smiling women in head coverings sitting together on a sofa", title: "Care & Support", pos: "55% 30%", posMobile: "58% 30%" },
  { src: img4.url, alt: "Two men and a woman walking outdoors wearing pink awareness clothing", title: "Men in the Conversation", pos: "60% 40%", posMobile: "56% 35%" },
] as const;

const INTERVAL = 5500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = SLIDES.length;

  const go = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % n), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, reduced, n]);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    history.replaceState(null, "", "#about");
  };

  return (
    <section
      id="home"
      aria-label="Welcome to BeyondPink"
      className="relative isolate flex h-[calc(96svh-var(--nav-height))] min-h-[600px] w-full overflow-hidden bg-charcoal md:h-[calc(88vh-var(--nav-height))] md:min-h-[600px] lg:max-h-[900px]"
    >
      {/* Slides */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="BeyondPink campaign photographs"
        className="absolute inset-0 -z-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(index - 1);
          if (e.key === "ArrowRight") go(index + 1);
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
          setPaused(true);
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          touchX.current = null;
          setPaused(false);
          if (start == null) return;
          const dx = (e.changedTouches[0]?.clientX ?? start) - start;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}: ${s.title}`}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            <img
              src={s.src}
              alt={s.alt}
              width={1774}
              height={887}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              className="hero-img h-full w-full object-cover"
              style={{ ["--pos" as string]: s.pos, ["--pos-m" as string]: s.posMobile }}
            />
          </div>
        ))}

        {/* Readability overlays */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.18 0.01 350 / 0.78) 0%, oklch(0.18 0.01 350 / 0.55) 32%, oklch(0.18 0.01 350 / 0.12) 60%, transparent 78%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(0deg, oklch(0.16 0.01 350 / 0.88) 0%, oklch(0.16 0.01 350 / 0.6) 40%, oklch(0.16 0.01 350 / 0.1) 70%, transparent 85%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
          style={{ background: "linear-gradient(0deg, oklch(0.16 0.01 350 / 0.45), transparent)" }}
        />

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photograph"
          className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 bg-ivory/10 text-ivory backdrop-blur-sm transition hover:border-ivory/60 hover:bg-ivory/20 sm:flex lg:left-5"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photograph"
          className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 bg-ivory/10 text-ivory backdrop-blur-sm transition hover:border-ivory/60 hover:bg-ivory/20 sm:flex lg:right-5"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-1 sm:bottom-7">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous photograph"
            className="flex h-9 w-9 items-center justify-center text-ivory/80 sm:hidden"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show photograph ${i + 1}: ${s.title}`}
              aria-current={i === index ? "true" : undefined}
              className="flex h-8 w-8 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all duration-500",
                  i === index ? "w-7 bg-rose shadow-glow" : "w-2 bg-ivory/60 hover:bg-ivory",
                )}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next photograph"
            className="flex h-9 w-9 items-center justify-center text-ivory/80 sm:hidden"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {`Photograph ${index + 1} of ${n}: ${SLIDES[index]?.title}`}
        </p>
      </div>

      {/* Fixed text */}
      <div className="pointer-events-none mx-auto flex w-full max-w-7xl items-end px-5 pb-20 sm:px-16 sm:pb-24 md:items-center md:pb-0 lg:px-20">
        <div className="pointer-events-auto max-w-xl text-ivory">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ivory/85 sm:text-xs sm:tracking-[0.28em]">
            BeyondPink <span className="mx-1.5 text-rose">•</span> Breast Health Awareness
          </p>
          <h1 className="mt-4 text-[2.35rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Beyond the Pink Ribbon.
            <span className="mt-1 block italic text-rose">Beyond Awareness.</span>
          </h1>
          <p className="mt-4 max-w-md text-[0.95rem] sm:mt-5 sm:text-base leading-relaxed text-ivory/90 sm:text-lg">
            Breast health is more than a conversation in October. Discover accessible education,
            compassionate support and a place where everyone belongs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
            <Button
              variant="brea"
              className="h-12 px-6 text-base sm:px-7"
              onClick={() => window.dispatchEvent(new Event(OPEN_BREA_EVENT))}
            >
              Try Brea
              <ArrowRight aria-hidden />
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full border-ivory/50 bg-ivory/10 px-6 text-base sm:px-7 text-ivory backdrop-blur-sm hover:border-ivory hover:bg-ivory/20 hover:text-ivory"
              onClick={scrollToAbout}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
