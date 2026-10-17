import { useTranslation } from "@/lib/i18n";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { HeartHandshake, HandHeart, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import supportImg from "@/assets/support-community.webp.asset.json";
import { cn } from "@/lib/utils";
import { SectionWaves } from "./SectionWaves";

const CARDS = [
  {
    icon: HeartHandshake,
    title: "I\u2019m Looking for Support",
    text: "Find encouragement, understanding and resources for your journey.",
    iconBg: "bg-blush/45",
  },
  {
    icon: HandHeart,
    title: "I\u2019m Supporting Someone",
    text: "Learn how to show up for a loved one with compassion.",
    iconBg: "bg-sage/20",
  },
  {
    icon: Users,
    title: "I Want to Connect",
    text: "Discover Brea\u2019s planned community space, welcoming people of all genders.",
    iconBg: "bg-ivory",
  },
];

function useInView<T extends Element>() {
  const { t } = useTranslation();
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen] as const;
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("transition-all duration-700 ease-out motion-reduce:transition-none", seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100", className)}
    >
      {children}
    </div>
  );
}

function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" aria-hidden className={className}>
      <path d="M2 50 C40 46 80 30 118 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {[24, 48, 72, 96].map((x, i) => (
        <path key={x} d={`M${x} ${48 - i * 9} c-4 -12 2 -20 12 -24 c2 10 -2 20 -12 24Z`} stroke="currentColor" strokeWidth="1.1" />
      ))}
    </svg>
  );
}

export function Support() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const openBrea = () => navigate({ to: "/brea" });
  return (
    <section id="support" aria-labelledby="support-heading" className="relative isolate">
      {/* Full-bleed photographic background */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={supportImg.url}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[50%_32%]"
        />
        {/* Soft readability veil — keeps the people visible */}
        <div className="absolute inset-0 bg-ivory/30" />
        {/* Bottom half fades gently into the page background */}
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-b from-transparent via-ivory/70 to-ivory" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-32">
        <Reveal className="mx-auto max-w-3xl">
          <div className="rounded-[2.5rem] bg-ivory/45 px-6 py-9 shadow-soft backdrop-blur-sm sm:px-10 sm:py-11">
            <p className="flex items-center justify-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-foreground/80 sm:text-xs sm:tracking-[0.28em]">
              <span className="h-px w-8 bg-sage" aria-hidden />{t("Support & Community")}<span className="h-px w-8 bg-sage" aria-hidden />
            </p>
            <h2 id="support-heading" className="mt-4 text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">{t("No One Should Navigate")} <span className="italic text-rose">{t("This Alone.")}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-foreground/85 sm:text-lg">{t("Whether you’re seeking answers, supporting someone you love, or hoping to connect with people who understand, there’s a place for you here.")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 lg:gap-8">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 120} className="h-full">
              <article className="flex h-full flex-col rounded-[2rem] border border-border/80 bg-card/90 p-7 text-left shadow-soft backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8">
                <span className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl text-charcoal", card.iconBg)}>
                  <card.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl leading-snug text-foreground">{t(card.title)}</h3>
                <span aria-hidden className="mt-3 block h-0.5 w-10 rounded-full bg-rose" />
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{t(card.text)}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center md:mt-16">
          <Sprig className="mx-auto mb-5 h-7 w-14 text-sage/60" />
          <Button variant="brea" className="h-[3.25rem] px-8 text-base shadow-glow-strong" onClick={openBrea}>{t("Find Support in Brea")}<ArrowRight aria-hidden />
          </Button>
        </Reveal>
      </div>
      <SectionWaves />
    </section>
  );
}
