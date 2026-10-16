import { useTranslation } from "@/lib/i18n";
import { useEffect, useRef, useState, type ReactNode } from "react";
import founderImg from "@/assets/founder-portrait.webp.asset.json";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PORTRAIT = {
  src: founderImg.url,
  alt: "Portrait of the BeyondPink founder in her graduation gown and cap, seated on a bench in a garden.",
};

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

function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" aria-hidden className={className}>
      <path d="M2 50 C40 46 80 30 118 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {[24, 48, 72, 96].map((x, i) => (
        <path key={x} d={`M${x} ${48 - i * 9} c-4 -12 2 -20 12 -24 c2 10 -2 20 -12 24Z`} stroke="currentColor" strokeWidth="1.1" />
      ))}
    </svg>
  );
}

/** Delicate line-art awareness ribbon. */
function Ribbon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 44" fill="none" aria-hidden className={className}>
      <path d="M16 2c5.8 0 8.2 4.8 5.9 9.8L8.5 41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 2c-5.8 0-8.2 4.8-5.9 9.8L23.5 41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Founder() {
  const { t } = useTranslation();
  return (
    <section id="founder" aria-labelledby="founder-heading" className="relative isolate overflow-hidden bg-ivory py-16 sm:py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-32 -z-10 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-32 -z-10 h-64 w-64 rounded-full bg-sage/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Portrait */}
          <Reveal className="relative order-first mx-auto w-full max-w-sm md:max-w-none lg:order-none">
            <Ribbon className="absolute -left-2 -top-4 z-10 h-11 w-8 -rotate-12 text-rose/70" />
            <Ribbon className="absolute -right-1 -top-5 z-10 h-9 w-7 rotate-12 text-rose/50" />
            <Ribbon className="absolute -bottom-4 left-6 z-10 h-9 w-7 rotate-6 text-rose/50" />
            <Ribbon className="absolute -bottom-3 right-8 z-10 h-11 w-8 -rotate-6 text-rose/70" />
            <Leaf className="absolute -left-6 bottom-16 z-10 h-12 w-24 -scale-x-100 text-sage" />
            <Leaf className="absolute -right-6 top-14 z-10 h-12 w-24 text-sage" />
            <div aria-hidden className="absolute -bottom-3 -right-3 h-full w-full rounded-[2.5rem] border border-sage/60" />
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-accent shadow-soft">
              <img src={PORTRAIT.src} alt={t(PORTRAIT.alt)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
          </Reveal>

          {/* Story */}
          <Reveal delay={150}>
            <p className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.28em]">
              <span className="h-px w-8 bg-sage" aria-hidden />{t("Meet the Founder")}</p>
            <h2 id="founder-heading" className="mt-4 text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">{t("The Heart Behind")} <span className="italic text-rose">{t("BeyondPink.")}</span>
            </h2>
            <p className="mt-4 text-lg font-medium text-foreground/85 sm:text-xl">{t("Built with purpose. Inspired by people.")}</p>
            <span aria-hidden className="mt-6 block h-0.5 w-10 rounded-full bg-rose" />

            <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-muted-foreground sm:text-lg">
              <p>{t("BeyondPink was inspired by my colleague, Nthabi, whose passion for breast cancer awareness was shaped by the loss of a friend. Her advocacy made me reflect on how little many of my peers know about breast health, even though breast cancer can affect anyone.")}</p>
              <p>{t("At 25, I wanted to take initiative and build something meaningful. With my BSc Life Sciences background, along with my Software Development skills, I saw an opportunity to bring science and technology together to turn awareness into understanding, education and support.")}</p>
            </div>

            <p className="mt-8 font-serif text-lg italic leading-snug text-foreground/80 sm:mt-10 sm:text-xl">{t("Let’s connect and keep building meaningful health innovation.")}</p>

            <Button
              asChild
              className="mt-4 h-12 w-full gap-2.5 rounded-full border border-sage/50 bg-blush/60 px-7 text-[0.95rem] font-semibold text-foreground shadow-soft transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-rose/70 hover:bg-blush hover:shadow-glow motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:mt-5 sm:w-auto"
            >
              <a
                href="https://www.linkedin.com/in/thobeka-nkosi-217640293"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("Connect with Thobeka Nkosi on LinkedIn (opens in a new tab)")}
              >
                <Linkedin aria-hidden />{t("Connect on LinkedIn")}</a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
