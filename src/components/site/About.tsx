import { useEffect, useRef, useState, type ReactNode } from "react";
import { BookOpen, HeartHandshake, Users, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Replace with the supplied About photograph (e.g. an asset pointer's .url). */
const ABOUT_IMAGE: { src: string; alt: string } | null = null;

const FRAME_RADIUS = "46% 54% 52% 48% / 54% 46% 54% 46%";

const PILLARS = [
  { icon: BookOpen, title: "Education", text: "Making breast-health information easier to understand." },
  { icon: HeartHandshake, title: "Support", text: "Helping people feel informed and supported." },
  { icon: Users, title: "Community", text: "Creating space for connection and shared experiences." },
];

const STATS = [
  { value: 2.3, decimals: 1, suffix: "M", label: "Estimated new breast cancer cases worldwide in 2022.", src: "https://gco.iarc.who.int/media/globocan/factsheets/cancers/20-breast-fact-sheet.pdf", srcLabel: "IARC GLOBOCAN 2022 — Breast fact sheet" },
  { value: 14712, decimals: 0, suffix: "", label: "Estimated new breast cancer cases among South African women in 2022.", src: "https://gco.iarc.who.int/media/globocan/factsheets/populations/710-south-africa-fact-sheet.pdf", srcLabel: "IARC GLOBOCAN 2022 — South Africa fact sheet" },
  { value: 25, decimals: 0, suffix: "%", label: "Share of new cancer cases among South African women that were breast cancer in 2022.", src: "https://gco.iarc.who.int/media/globocan/factsheets/populations/710-south-africa-fact-sheet.pdf", srcLabel: "IARC GLOBOCAN 2022 — South Africa fact sheet" },
];

function useInView<T extends Element>() {
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

function CountUp({ value, decimals, suffix, start }: { value: number; decimals: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(value); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1500);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);
  const text = n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <>{text}{suffix}</>;
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

export function About() {
  const [statsRef, statsSeen] = useInView<HTMLDivElement>();
  return (
    <section id="about" aria-labelledby="about-heading" className="relative isolate overflow-hidden bg-ivory py-16 sm:py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-sage/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-40 -z-10 h-64 w-64 rounded-full bg-blush/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.28em]">
              <span className="h-px w-8 bg-sage" aria-hidden />
              About BeyondPink
            </p>
            <h2 id="about-heading" className="mt-4 text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              Because Awareness Is Only <span className="italic text-rose">the Beginning.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-muted-foreground sm:text-lg">
              <p>Every October, the world turns pink. Ribbons are worn, stories are shared, and conversations begin.</p>
              <p className="font-serif text-2xl italic text-foreground">But what happens when October ends?</p>
              <p>The questions, uncertainty, and need for reliable information don't disappear.</p>
              <p className="font-medium text-foreground">BeyondPink exists to keep that conversation going.</p>
              <p>We believe everyone deserves accessible breast-health education, compassionate support, and the confidence to better understand their health.</p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {PILLARS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl border border-sage/40 bg-card/70 p-4 transition hover:border-sage hover:shadow-soft">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-foreground ring-1 ring-sage/50">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-xl text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} className="relative mx-auto w-full max-w-md md:max-w-none">
            <Leaf className="absolute -left-4 -top-6 z-10 h-14 w-28 text-sage" />
            <div aria-hidden className="absolute -bottom-3 -left-3 h-full w-full border border-sage/60" style={{ borderRadius: FRAME_RADIUS }} />
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-accent shadow-soft" style={{ borderRadius: FRAME_RADIUS }}>
              {ABOUT_IMAGE ? (
                <img src={ABOUT_IMAGE.src} alt={ABOUT_IMAGE.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <ImageIcon className="h-8 w-8" aria-hidden />
                  <span className="text-sm">Photograph coming soon</span>
                </div>
              )}
            </div>
            <Leaf className="absolute -bottom-6 right-2 z-10 h-14 w-28 rotate-180 text-rose/70" />
          </Reveal>
        </div>

        {/* Statistics */}
        <div ref={statsRef} className="mt-20 lg:mt-24">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Historical estimates · GLOBOCAN 2022 · not live figures
            </p>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <figure className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7">
                  <p className="font-serif text-5xl text-foreground sm:text-6xl" aria-label={`${s.value.toLocaleString("en-US")}${s.suffix}`}>
                    <span aria-hidden><CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} start={statsSeen} /></span>
                  </p>
                  <span aria-hidden className="mt-3 block h-0.5 w-10 rounded-full bg-rose" />
                  <figcaption className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{s.label}</figcaption>
                  <a href={s.src} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs text-foreground underline decoration-sage underline-offset-4 hover:decoration-rose">
                    Source: {s.srcLabel}
                  </a>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Source: International Agency for Research on Cancer (IARC), GLOBOCAN 2022.
          </p>
        </div>

        {/* Inclusivity */}
        <Reveal className="mt-16 lg:mt-20">
          <div className="relative overflow-hidden rounded-[2rem] bg-accent px-6 py-10 text-center sm:px-12 sm:py-14">
            <Leaf className="absolute -left-2 top-4 h-12 w-24 text-sage" />
            <Leaf className="absolute -right-2 bottom-4 h-12 w-24 rotate-180 text-sage" />
            <h2 className="text-3xl text-foreground sm:text-4xl">Everyone Belongs in This Conversation.</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground sm:text-lg">
              Breast cancer affects more than one gender, and its impact extends to families, friends and communities. BeyondPink welcomes women, men, caregivers, loved ones and everyone seeking understanding and support.
            </p>
            <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-background/70 px-4 py-1.5 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden />
              Breast cancer can also occur in men.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
