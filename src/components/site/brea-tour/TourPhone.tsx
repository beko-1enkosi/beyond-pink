import { BreaSymbol } from "@/components/brea/BreaLogo";
import { useTranslation } from "@/lib/i18n";
import { BREA_SCREENSHOTS } from "@/lib/brea-tour";
import { BotanicalSketch } from "./TourArtwork";

export function TourPhone({ slot, note }: { slot: string; note: string }) {
  const { t } = useTranslation();
  const screenshot = BREA_SCREENSHOTS[slot];
  return <figure className="tour-phone-figure" data-screenshot-slot={slot}>
    <div className="tour-phone">
      <div className="tour-phone-screen">
        {screenshot?.image ? <img src={screenshot.image} alt={t(screenshot.alt)} loading="lazy" decoding="async" className="tour-screenshot" /> :
          <div className="tour-preview" role="img" aria-label={`${t("Screenshot preview")}: ${t(screenshot?.alt ?? "Brea preview")}`}>
            <BotanicalSketch className="tour-preview-sprig" />
            <BreaSymbol className="h-24 w-24" />
            <span className="font-serif text-4xl text-brea-sage-deep">Brea</span>
            <span className="mt-3 text-xs text-foreground">{t("Brea preview")}</span>
            <span className="tour-slot-label">{slot}</span>
          </div>}
      </div>
      <span aria-hidden="true" className="tour-phone-camera" />
    </div>
    <figcaption className="tour-handwriting">{t(note)}</figcaption>
  </figure>;
}