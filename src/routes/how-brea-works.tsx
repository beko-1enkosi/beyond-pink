import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelect } from "@/components/site/Navbar";
import { LanguageProvider, useTranslation } from "@/lib/i18n";
import { scrollToSection } from "@/lib/section-scroll";
import { BreaSymbol } from "@/components/brea/BreaLogo";
import logo from "@/assets/beyondpink-logo.svg.asset.json";
import { TOUR_STEPS, BREA_LAUNCH_DESTINATION } from "@/lib/brea-tour";
import { TourPhone } from "@/components/site/brea-tour/TourPhone";
import { BotanicalSketch, SketchConnector, TourReveal } from "@/components/site/brea-tour/TourArtwork";

export const Route = createFileRoute("/how-brea-works")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "How Brea Works — A Little Tour | BeyondPink" },
      { name: "description", content: "Explore Brea in four gentle steps: a personal welcome, breast-health learning, compassionate support and finding care across South Africa." },
      { property: "og:title", content: "A Little Tour of Brea — BeyondPink" },
      { property: "og:description", content: "An illustrated introduction to your breast-health companion. Explore the journey or launch Brea whenever you feel ready." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://beyond-pink.lovable.app/how-brea-works" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://beyond-pink.lovable.app/how-brea-works" }, { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&display=swap" }],
  }),
  component: HowBreaWorks,
});

function EditorialText({ text }: { text: string }) {
  const { t } = useTranslation();
  return <>{t(text).split("|").map((part, i) => i % 2 ? <em key={i} className="text-tour-rose">{part}</em> : part)}</>;
}
function LaunchButton({ prominent = false }: { prominent?: boolean }) {
  const { t } = useTranslation();
  return <Button variant="ghost" asChild className={`tour-button tour-button-rose ${prominent ? "tour-button-glow" : ""}`}><Link to={BREA_LAUNCH_DESTINATION}>{t("Launch Brea")}<ArrowRight aria-hidden="true" /></Link></Button>;
}
function HowBreaWorks() { return <LanguageProvider><TourPage /></LanguageProvider>; }
function TourPage() {
  const { t } = useTranslation();
  return <div className="brea-tour">
    <a href="#tour-main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-card focus:p-4">{t("Skip to main content")}</a>
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <nav aria-label={t("Main")} className="tour-navigation mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <Link to="/" aria-label={t("Back to BeyondPink")} className="flex items-center gap-2">
          <span className="tour-logo-frame"><img src={logo.url} alt="" className="h-full w-full object-contain" /></span>
          <span className="font-serif text-2xl">Beyond<span className="text-tour-rose">Pink</span></span>
        </Link>
        <span className="hidden text-xs text-muted-foreground lg:block">{t("How Brea Works")}</span>
        <div className="flex flex-wrap items-center gap-2"><LanguageSelect className="min-h-11" /><Button variant="ghost" asChild className="tour-skip"><Link to="/brea">{t("Skip Intro")}</Link></Button><LaunchButton /></div>
      </nav>
    </header>
    <main id="tour-main">
      <section className="tour-hero relative mx-auto max-w-6xl px-5 text-center sm:px-8" aria-labelledby="tour-heading">
        <BotanicalSketch className="tour-hero-botanical" />
        <div className="tour-hero-symbol mx-auto"><BreaSymbol className="h-24 w-24" /><svg viewBox="0 0 180 100" fill="none" aria-hidden="true"><path d="M10 60 C30 15 61 8 76 21 M105 22 Q143 2 166 59 M141 74 Q152 92 167 83" stroke="var(--sage)" strokeWidth="1.2" strokeDasharray="2 5" strokeLinecap="round" /></svg></div>
        <p className="text-xs font-medium text-olive">{t("BEYONDPINK PRESENTS")}</p>
        <h1 id="tour-heading" className="tour-title mt-5"><EditorialText text="A Little Tour of |Brea.|" /></h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed sm:text-lg">{t("Get to know your breast health companion, one gentle step at a time.")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Button variant="ghost" className="tour-button tour-button-sage" onClick={() => { scrollToSection("#step-01"); document.getElementById("step-01-heading")?.focus({ preventScroll: true }); }}>{t("Explore the Journey")}<ArrowDown aria-hidden="true" /></Button><Button variant="outline" asChild className="tour-button"><Link to="/brea">{t("Skip Intro")}<ArrowRight aria-hidden="true" /></Link></Button></div>
        <p className="mt-5 text-xs text-muted-foreground">{t("Brea is available in English.")}</p>
        <div className="tour-hero-end"><span /><p className="tour-handwriting">{t("A gentle journey in four steps")}</p><span /></div>
      </section>
      <div className="tour-walkthrough mx-auto max-w-6xl px-5 sm:px-8">
        {TOUR_STEPS.map((step, index) => <section key={step.id} id={`step-${step.id}`} aria-labelledby={`step-${step.id}-heading`}>
          <TourReveal className={`tour-step ${index % 2 ? "tour-step-reverse" : ""}`}>
            <div className={`tour-phones ${step.slots.length === 2 ? "tour-phone-pair" : ""}`}>
              <BotanicalSketch className="tour-phone-botanical" />
              {step.slots.map((slot, i) => <TourPhone key={slot} slot={slot} note={step.notes[i] ?? ""} />)}
            </div>
            <div className="tour-step-copy">
              <p className="tour-handwriting text-tour-rose">{t(step.label)}</p>
              <h2 id={`step-${step.id}-heading`} tabIndex={-1} className="tour-step-heading mt-4"><EditorialText text={step.title} /></h2>
              <span className="mt-5 block h-px w-14 bg-sage" aria-hidden="true" />
              <p className="mt-5 text-base leading-[1.85]">{t(step.text)}</p>
              {"safety" in step && <p className="tour-safety mt-5 text-sm leading-relaxed">{t(step.safety)}</p>}
            </div>
          </TourReveal>
          {index < 3 && <SketchConnector reverse={index % 2 === 1} />}
        </section>)}
      </div>
      <section className="tour-closing relative mt-20 px-5 pb-20 pt-14 text-center sm:mt-28 sm:px-8" aria-labelledby="tour-closing-heading">
        <BotanicalSketch className="tour-closing-botanical" />
        <TourReveal><p className="tour-handwriting text-olive">BeyondPink &amp; Brea</p><h2 id="tour-closing-heading" className="tour-closing-heading mx-auto mt-4 max-w-xl"><EditorialText text="Ready to Begin Your |Journey?|" /></h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed">{t("There's no perfect place to start. Just a little curiosity and a space to explore.")}</p>
        <SketchConnector short /><LaunchButton prominent /><p className="mt-5 text-xs text-muted-foreground">{t("Brea is available in English.")}</p>
        <Button variant="ghost" asChild className="tour-back mt-5 min-h-11"><Link to="/"><ArrowLeft aria-hidden="true" />{t("Back to BeyondPink")}</Link></Button></TourReveal>
      </section>
    </main>
    <footer className="border-t border-border px-5 py-7 text-center text-xs leading-relaxed"><p>© 2026 BeyondPink</p><p className="mx-auto mt-2 max-w-lg">{t("Educational information only. Not a substitute for professional medical advice.")}</p></footer>
  </div>;
}