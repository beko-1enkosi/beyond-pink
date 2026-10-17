import { useTranslation } from "@/lib/i18n";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BookOpen, HeartHandshake, Users } from "lucide-react";
import belongImg from "@/assets/about-belong.webp.asset.json";
import { cn } from "@/lib/utils";
import { SectionWaves } from "./SectionWaves";
import { useVisibleCount } from "./use-visible-count";

const ABOUT_IMAGE = {
  src: belongImg.url,
  alt: "Illustration of a diverse crowd of people with eyes closed, pink breast-cancer awareness ribbons among them.",
};

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

function CountUp({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const { ref, count } = useVisibleCount(value);
  const text = count.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref}>{text}{suffix}</span>;
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
  const { t } = useTranslation();
  return (
    <section id="about" aria-labelledby="about-heading" className="relative isolate overflow-hidden bg-ivory py-16 sm:py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-sage/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-40 -z-10 h-64 w-64 rounded-full bg-blush/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal className="md:order-2">
            <p className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.28em]">
              <span className="h-px w-8 bg-sage" aria-hidden />{t("About BeyondPink")}</p>
            <h2 id="about-heading" className="mt-4 text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">{t("Because Awareness Is Only")} <span className="italic text-rose">{t("the Beginning.")}</span>
            </h2>
            <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-muted-foreground sm:text-lg">
              <p>{t("Every October, the world turns pink. Ribbons are worn, stories are shared, and conversations begin.")}</p>
              <p className="font-serif text-2xl italic text-foreground">{t("But what happens when October ends?")}</p>
              <p>{t("The questions, uncertainty, and need for reliable information don't disappear.")}</p>
              <p className="font-medium text-foreground">{t("BeyondPink exists to keep that conversation going.")}</p>
              <p>{t("We believe everyone deserves accessible breast-health education, compassionate support, and the confidence to better understand their health.")}</p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {PILLARS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="bp-card rounded-2xl border border-sage/40 bg-card/70 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-foreground ring-1 ring-sage/50">
                     <Icon className="bp-card-icon h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-xl text-foreground">{t(title)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(text)}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} className="relative mx-auto w-full max-w-md md:order-1 md:max-w-none">
            <Leaf className="absolute -left-4 -top-6 z-10 h-14 w-28 text-sage" />
            <div aria-hidden className="absolute -bottom-3 -left-3 h-full w-full border border-sage/60" style={{ borderRadius: FRAME_RADIUS }} />
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-accent shadow-soft" style={{ borderRadius: FRAME_RADIUS }}>
              <img src={ABOUT_IMAGE.src} alt={t(ABOUT_IMAGE.alt)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <Leaf className="absolute -bottom-6 right-2 z-10 h-14 w-28 rotate-180 text-rose/70" />
          </Reveal>
        </div>

        {/* Statistics */}
        <div className="mt-20 lg:mt-24">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">{t("Historical estimates · GLOBOCAN 2022 · not live figures")}</p>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <figure className="bp-card h-full rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7">
                  <p className="font-serif text-5xl text-foreground sm:text-6xl" aria-label={`${s.value.toLocaleString("en-US")}${s.suffix}`}>
                    <span aria-hidden><CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} /></span>
                  </p>
                  <span aria-hidden className="mt-3 block h-0.5 w-10 rounded-full bg-rose" />
                  <figcaption className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{t(s.label)}</figcaption>
                  <a href={s.src} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs text-foreground underline decoration-sage underline-offset-4 hover:decoration-rose">{t("Source:")} {t(s.srcLabel)}
                  </a>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">{t("Source: International Agency for Research on Cancer (IARC), GLOBOCAN 2022.")}</p>
        </div>

        {/* Inclusivity */}
        <Reveal className="mt-16 lg:mt-20">
          <div className="relative overflow-hidden rounded-[2rem] border border-mist-deep bg-mist px-6 py-10 text-center sm:px-10 sm:py-12 md:px-14 md:py-14">
            <Leaf className="absolute -right-2 top-2 h-9 w-20 text-sage" />
            <Leaf className="absolute -right-2 bottom-2 h-9 w-20 rotate-180 text-sage" />
            <h2 className="text-3xl text-foreground sm:text-4xl">{t("Everyone Belongs in This Conversation.")}</h2>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-muted-foreground sm:text-lg">{t("Breast cancer affects more than one gender, and its impact extends to families, friends and communities. BeyondPink welcomes women, men, caregivers, loved ones and everyone seeking understanding and support.")}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-background/70 px-4 py-1.5 text-sm text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden />{t("Breast cancer can also occur in men.")}</p>
          </div>
        </Reveal>
      </div>
      <SectionWaves />
    </section>
  );
}
