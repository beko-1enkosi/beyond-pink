import { useTranslation } from "@/lib/i18n";
import { useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ANATOMY_TERMS, CHANGE_TOPICS, JOURNEY_STEPS, moveJourneyStep, type ExplorePreviewKind } from "./explore-education";

type Props = { kind: ExplorePreviewKind; title: string; img: string; alt: string; children: ReactNode };

export function ExplorePreview({ kind, title, img, alt, children }: Props) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  const explanation = useRef<HTMLDivElement>(null);
  const selectTopic = (index: number) => {
    setSelected(index);
    requestAnimationFrame(() => explanation.current?.scrollIntoView({ block: "nearest", behavior: "instant" }));
  };
  const topics = kind === "anatomy" ? ANATOMY_TERMS : CHANGE_TOPICS;
  const topic = topics[selected] ?? topics[0];
  const step = JOURNEY_STEPS[selected] ?? JOURNEY_STEPS[0];
  return (
    <Dialog.Root onOpenChange={(open) => { if (open) setSelected(0); }}>
      <div className="group/explore-card relative h-full">
        {children}
        <Dialog.Trigger asChild>
          <Button variant="ghost" aria-label={`${t("Explore")} ${t(title)}`} className="absolute inset-0 h-full w-full rounded-[2rem] p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-sage">
            <span className="sr-only">{t("Explore")} {t(title)}</span>
          </Button>
        </Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-charcoal/45 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] flex max-h-[calc(100dvh-24px)] w-[calc(100vw-24px)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-sage/40 bg-ivory shadow-soft outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none">
          <header className="shrink-0 border-b border-sage/25 px-5 py-5 sm:px-8">
            <p className="pr-12 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{t("BeyondPink · Educational preview")}</p>
            <Dialog.Title className="mt-2 pr-10 font-serif text-3xl leading-tight sm:text-4xl">{t(kind === "changes" ? "Changes Worth Knowing" : title)}</Dialog.Title>
            <Dialog.Description className="mt-2 pr-8 text-sm leading-relaxed text-muted-foreground">{t(kind === "anatomy" ? "A closer look at breast anatomy." : kind === "changes" ? "Understanding changes without guessing what they mean." : "A general guide to screening, assessment and follow-up.")} {t("This is not the complete Brea app.")}</Dialog.Description>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label={t("Close educational preview")} title={t("Close")} className="absolute right-3 top-3 sm:right-5 sm:top-5"><X aria-hidden /></Button>
            </Dialog.Close>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8">
            {kind !== "journey" ? (
              <div className={cn("grid items-start gap-6", kind === "anatomy" && "md:grid-cols-[1.1fr_1fr]")}>
                {kind === "anatomy" && <img src={img} alt={t(alt)} className="mx-auto max-h-44 w-full object-contain sm:max-h-72 md:max-h-[440px]" />}
                <div>
                  <div role="group" aria-label={t(kind === "anatomy" ? "Breast anatomy terms" : "Breast change topics")} className={cn("grid gap-2", kind === "anatomy" ? "grid-cols-2" : "sm:grid-cols-2")}>
                    {topics.map((item, index) => (
                      <Button key={item.title} variant="outline" aria-pressed={selected === index} onClick={() => selectTopic(index)} aria-controls={`${kind}-explanation`} className={cn("h-auto min-h-11 whitespace-normal px-3 py-2 text-left leading-relaxed", selected === index && "border-sage bg-accent text-accent-foreground ring-1 ring-sage/40")}>
                        {t(item.title)}
                      </Button>
                    ))}
                  </div>
                  <div ref={explanation} id={`${kind}-explanation`} aria-live="polite" aria-atomic="true" className="mt-5 border-l-2 border-rose pl-4">
                    <h3 className="font-serif text-2xl leading-snug">{t(topic.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed">{t(topic.text)}</p>
                  </div>
                  {kind === "changes" && <p className="mt-6 rounded-lg bg-accent p-4 text-sm leading-relaxed">{t("Many breast changes are not cancer, but new or unusual changes should be assessed by a healthcare professional. This preview does not diagnose changes or calculate cancer risk.")}</p>}
                </div>
              </div>
            ) : (
              <div>
                <ol aria-label={t("Breast-health journey")} className="grid grid-cols-3 gap-2 sm:gap-4">
                  {JOURNEY_STEPS.map((item, index) => <li key={item.title} aria-current={selected === index ? "step" : undefined} className={cn("border-t-2 pt-3", selected === index ? "border-rose" : "border-sage/35")}><span className={cn("flex h-8 w-8 items-center justify-center rounded-full text-sm", selected === index ? "bg-accent text-accent-foreground" : "bg-blush/40 text-foreground")}>{index + 1}</span><p className="mt-2 text-xs leading-relaxed sm:text-sm">{t(item.title)}</p></li>)}
                </ol>
                <div aria-live="polite" aria-atomic="true" className="mt-7">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{t("Step")} {selected + 1} {t("of 3")}</p>
                  <h3 className="mt-2 font-serif text-3xl">{t(step.title)}</h3>
                  <p className="mt-2 font-medium text-sm">{t(step.subtitle)}</p>
                  <p className="mt-3 text-sm leading-relaxed">{t(step.text)}</p>
                </div>
              </div>
            )}
          </div>
          <footer className="shrink-0 border-t border-sage/25 bg-accent/40 px-5 py-3 sm:px-8">
            {kind === "journey" && <nav aria-label={t("Journey steps")} className="mb-3 flex justify-between gap-3">
              <Button variant="outline" disabled={selected === 0} onClick={() => setSelected((s) => moveJourneyStep(s, "back"))}><ArrowLeft aria-hidden />{t("Back")}</Button>
              <Button variant="outline" disabled={selected === 2} onClick={() => setSelected((s) => moveJourneyStep(s, "next"))}>{t("Next")}<ArrowRight aria-hidden /></Button>
            </nav>}
            <p className="text-xs leading-relaxed text-muted-foreground">{t("Educational information only. This preview does not replace professional medical advice, diagnosis or treatment.")}</p>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}