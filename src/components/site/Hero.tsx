import { useTranslation } from "@/lib/i18n";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "@/assets/hero-1-unity.webp.asset.json";
import img2 from "@/assets/hero-2-diversity.webp.asset.json";
import img3 from "@/assets/hero-3-care.webp.v2.asset.json";
import img4 from "@/assets/hero-4-men.webp.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/section-scroll";
import { SectionWaves } from "./SectionWaves";

export const OPEN_BREA_EVENT = "beyondpink:open-brea";

const SLIDES = [
  { src: img1.url, alt: "Diverse hands holding pink awareness ribbons in a circle", title: "Unity & Awareness", pos: "50% 50%", posMobile: "50% 50%" },
  { src: img2.url, alt: "A multigenerational group of women smiling together, wearing pink ribbons", title: "Diversity & Inclusion", pos: "62% 35%", posMobile: "60% 38%" },
  { src: img3.url, alt: "Three smiling women in head coverings sitting together on a sofa", title: "Care & Support", pos: "58% 30%", posMobile: "56% 30%" },
  { src: img4.url, alt: "Two men and a woman walking outdoors wearing pink awareness clothing", title: "Men in the Conversation", pos: "58% 38%", posMobile: "56% 35%" },
] as const;

const INTERVAL = 3000;
const FRAME_RADIUS = "58% 42% 46% 54% / 46% 52% 48% 54%";

function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 120" fill="none" aria-hidden className={className}>
      <path d="M40 118 C40 80 38 50 44 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {[20, 40, 60, 80].map((y, i) => (
        <g key={y}>
          <path d={`M41 ${y + 14} C30 ${y + 8} 22 ${y} 20 ${y - 8} C30 ${y - 6} 38 ${y + 2} 41 ${y + 14}Z`} stroke="currentColor" strokeWidth="1.2" />
          {i < 3 && <path d={`M42 ${y + 4} C52 ${y - 2} 60 ${y - 10} 62 ${y - 18} C52 ${y - 16} 44 ${y - 8} 42 ${y + 4}Z`} stroke="currentColor" strokeWidth="1.2" />}
        </g>
      ))}
    </svg>
  );
}

export function Hero() {
  const { t } = useTranslation();
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
    scrollToSection("#about");
  };

  const arrowCls =
    "flex h-10 w-10 items-center justify-center rounded-full border border-sage/60 bg-background/80 text-foreground backdrop-blur-sm transition hover:border-sage hover:bg-accent";

  return (
    <section id="home" aria-label={t("Welcome to BeyondPink")} className="relative isolate overflow-hidden bg-background">
      {/* soft background accents */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-1/3 top-0 -z-10 h-64 w-64 rounded-full bg-sage/15 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-24 pt-8 sm:px-8 sm:pt-10 md:grid-cols-[1fr_1.1fr] md:gap-6 md:pb-32 md:pt-12 lg:gap-10 lg:px-10 lg:pb-40">
        {/* Text */}
        <div className="relative z-10 max-w-xl">
          <p className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.28em]">
            <span className="h-px w-8 bg-sage" aria-hidden />{t("Breast Health Awareness")}</p>
          <h1 className="mt-4 text-[2.6rem] leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[4.75rem]">{t("Beyond the Pink Ribbon.")}<span className="mt-1 block italic text-rose">{t("Beyond Awareness.")}</span>
          </h1>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">{t("Breast health is more than a conversation in October. Discover accessible education, compassionate support and a place where everyone belongs.")}</p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Button variant="brea" className="h-[3.25rem] px-7 text-base sm:px-8" onClick={() => window.dispatchEvent(new Event(OPEN_BREA_EVENT))}>{t("Try Brea")}<ArrowRight aria-hidden />
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full border-sage bg-transparent px-6 text-base text-foreground hover:bg-accent sm:px-7"
              onClick={scrollToAbout}
            >{t("Learn More")}</Button>
          </div>
        </div>

        {/* Photo frame */}
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <Sprig className="absolute -left-6 bottom-2 z-10 hidden h-32 w-20 text-sage md:block lg:-left-10 lg:h-40" />
          <Sprig className="absolute -right-2 -top-4 z-10 h-20 w-14 rotate-[200deg] text-sage/80 md:h-28 md:w-20" />
          <div aria-hidden className="absolute -bottom-3 -right-3 h-full w-full border border-rose/50" style={{ borderRadius: FRAME_RADIUS }} />
          <div
            role="region"
            aria-roledescription={t("carousel")}
            aria-label={t("BeyondPink campaign photographs")}
            className="relative aspect-[5/4] w-full overflow-hidden bg-charcoal/10 shadow-soft md:aspect-[1/1] lg:aspect-[6/5]"
            style={{ borderRadius: FRAME_RADIUS }}
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
                aria-roledescription={t("slide")}
                aria-label={`${i + 1} ${t("of")} ${n}: ${t(s.title)}`}
                aria-hidden={i !== index}
                className={cn("absolute inset-0 transition-opacity duration-[1100ms] ease-in-out", i === index ? "opacity-100" : "opacity-0")}
              >
                <img
                  src={s.src}
                  alt={t(s.alt)}
                  width={1774}
                  height={887}
                  loading="eager"
                  fetchPriority={i === 0 ? "high" : "low"}
                  decoding="async"
                  className="hero-img h-full w-full object-cover text-transparent"
                  style={{ ["--pos" as string]: s.pos, ["--pos-m" as string]: s.posMobile }}
                />
              </div>
            ))}
            <p className="sr-only" aria-live="polite">{`${t("Photograph")} ${index + 1} ${t("of")} ${n}: ${t(SLIDES[index]?.title ?? "")}`}</p>
          </div>

          {/* Controls */}
          <div className="relative z-10 mt-5 flex items-center justify-center gap-3 md:justify-end md:pr-6">
            <button type="button" onClick={() => go(index - 1)} aria-label={t("Previous photograph")} className={arrowCls}>
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <div className="flex items-center">
              {SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${t("Show photograph")} ${i + 1}: ${t(s.title)}`}
                  aria-current={i === index ? "true" : undefined}
                  className="flex h-8 w-7 items-center justify-center"
                >
                  <span className={cn("block h-2 rounded-full transition-all duration-500", i === index ? "w-6 bg-rose" : "w-2 bg-sage/60 hover:bg-sage")} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(index + 1)} aria-label={t("Next photograph")} className={arrowCls}>
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Waves */}
      <SectionWaves className="h-16 sm:h-24 lg:h-32" />
    </section>
  );
}
