import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import knowBodyImg from "@/assets/explore-know-your-body.webp.asset.json";
import recogniseChangesImg from "@/assets/explore-recognise-changes.webp.asset.json";
import understandJourneyImg from "@/assets/explore-understand-journey.webp.asset.json";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    title: "Know Your Body",
    img: knowBodyImg,
    alt: "Illustration of breast anatomy with labelled lymph nodes, fatty tissue, lobules, milk ducts, areola and nipple.",
    text: "Explore breast anatomy, understand how breast tissue works and discover why knowing your body matters.",
    imgBg: "bg-blush/45",
  },
  {
    title: "Recognise the Changes",
    img: recogniseChangesImg,
    alt: "Illustration of a woman with curly hair placing her hands over her chest, practising breast self-awareness.",
    text: "Learn about breast changes worth discussing with a healthcare professional, including lumps, skin changes and nipple changes.",
    imgBg: "bg-sage/20",
  },
  {
    title: "Understand Your Journey",
    img: understandJourneyImg,
    alt: "Illustration of a doctor sitting with a patient, explaining breast health using a tablet showing an anatomy diagram.",
    text: "Understand screening, diagnosis and medical terminology through clear, accessible information.",
    imgBg: "bg-ivory",
  },
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

export function Explore() {
  const openBrea = () => window.dispatchEvent(new CustomEvent("beyondpink:open-brea"));
  return (
    <section id="explore" aria-labelledby="explore-heading" className="relative isolate overflow-hidden bg-ivory py-16 sm:py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-28 top-32 -z-10 h-72 w-72 rounded-full bg-blush/35 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-24 -z-10 h-64 w-64 rounded-full bg-sage/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.28em]">
            <span className="h-px w-8 bg-sage" aria-hidden />
            Explore Breast Health
            <span className="h-px w-8 bg-sage" aria-hidden />
          </p>
          <h2 id="explore-heading" className="mt-4 text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            Knowledge Is Power. <span className="italic text-rose">Understanding Changes Everything.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-muted-foreground sm:text-lg">
            Discover the knowledge and resources to better understand breast health, recognise changes and navigate your journey with confidence.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 lg:gap-8">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 120} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-soft motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className={cn("relative flex aspect-[4/3] items-center justify-center overflow-hidden p-6 sm:p-8", card.imgBg)}>
                  <Sprig className="absolute -left-2 top-2 h-8 w-16 text-sage/50" />
                  <img
                    src={card.img.url}
                    alt={card.alt}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-2xl leading-snug text-foreground">{card.title}</h3>
                  <span aria-hidden className="mt-3 block h-0.5 w-10 rounded-full bg-rose" />
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{card.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center md:mt-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Educational preview · Brea is on its way</p>
          <ButtonBrea onClick={openBrea} />
        </Reveal>
      </div>
    </section>
  );
}

