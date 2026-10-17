import { useTranslation } from "@/lib/i18n";
import { Link as RouterLink } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { BookOpen, HeartHandshake, MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionWaves } from "./SectionWaves";

type Link = { label: string; href: string };

const CARDS: {
  icon: typeof BookOpen;
  title: string;
  text: string;
  iconBg: string;
  links?: Link[];
  cta?: boolean;
}[] = [
  {
    icon: BookOpen,
    title: "Trusted Health Information",
    text: "Explore reliable breast cancer information from trusted health organisations.",
    iconBg: "bg-blush/45",
    links: [
      { label: "WHO Breast Cancer", href: "https://www.who.int/news-room/fact-sheets/detail/breast-cancer" },
      { label: "CANSA Breast Cancer", href: "https://cansa.org.za/breast-cancer/" },
    ],
  },
  {
    icon: HeartHandshake,
    title: "Support Organisations",
    text: "Find support groups, guidance and services for patients, survivors, men, caregivers and loved ones.",
    iconBg: "bg-sage/20",
    links: [
      { label: "CANSA Support Groups", href: "https://cansa.org.za/cansas-care-support/support-groups/" },
      { label: "CANSA Care Centres", href: "https://cansa.org.za/cansa-care-centres-contact-details/" },
    ],
  },
  {
    icon: MapPin,
    title: "Find Care Near You",
    text: "Explore Brea\u2019s planned directory of healthcare facilities and support services in South Africa.",
    iconBg: "bg-ivory",
    cta: true,
  },
];

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

function ResourceLink({ label, href }: Link) {
  const { t } = useTranslation();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link flex items-center justify-between gap-3 rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-sage hover:bg-card hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span>{t(label)}</span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-sage transition-transform duration-300 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
      <span className="sr-only">{t("(opens in a new tab)")}</span>
    </a>
  );
}

export function Resources() {
  const { t } = useTranslation();
  return (
    <section id="resources" aria-labelledby="resources-heading" className="relative isolate overflow-hidden bg-ivory py-16 sm:py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-28 top-28 -z-10 h-72 w-72 rounded-full bg-blush/35 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-28 -z-10 h-64 w-64 rounded-full bg-sage/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal contents className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-foreground/75 sm:text-xs sm:tracking-[0.28em]">
            <span className="h-px w-8 bg-sage" aria-hidden />{t("Helpful Resources")}<span className="h-px w-8 bg-sage" aria-hidden />
          </p>
          <h2 id="resources-heading" className="mt-4 text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">{t("The Right Information.")} <span className="italic text-rose">{t("The Right Support.")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-muted-foreground sm:text-lg">{t("Explore trusted breast-health information, compassionate support services and pathways to care.")}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 lg:gap-8">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 120} className="h-full">
              <article className="group bp-card relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-7">
                <Sprig className="absolute -right-3 -top-1 h-8 w-16 text-sage/40 transition-colors duration-500 group-hover:text-sage/70 motion-reduce:transition-none" />
                <span className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl text-charcoal ring-1 ring-border/60", card.iconBg)}>
                  <card.icon className="bp-card-icon h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl leading-snug text-foreground">{t(card.title)}</h3>
                <span aria-hidden className="mt-3 block h-0.5 w-10 rounded-full bg-rose" />
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{t(card.text)}</p>

                {card.links && (
                  <div className="mt-auto pt-5">
                    <div className="space-y-2.5">
                      {card.links.map((l) => (
                        <ResourceLink key={l.href} {...l} />
                      ))}
                    </div>
                  </div>
                )}

                {card.cta && (
                  <div className="mt-auto pt-5">
                    <Button variant="brea" asChild className="h-11 w-full px-5 text-sm shadow-glow"><RouterLink to="/how-brea-works">{t("Find Care in Brea")}<ArrowRight aria-hidden /></RouterLink>
                    </Button>
                    <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">{t("The directory is planned, not yet available.")}</p>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 md:mt-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-sage/35 bg-card/60 px-6 py-5 text-center sm:px-9 sm:py-6">
            <Sprig className="mx-auto mb-3 h-6 w-12 text-sage/60" />
            <p className="text-[0.82rem] leading-relaxed text-foreground/75 sm:text-sm">{t("BeyondPink provides educational information and resources only. It does not replace professional medical advice, diagnosis or treatment.")}</p>
          </div>
        </Reveal>
      </div>
      <SectionWaves />
    </section>
  );
}
