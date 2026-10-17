import { createFileRoute } from "@tanstack/react-router";
import { BreastsAndHormones } from "@/components/brea/learn/BreastsAndHormones";
export const Route = createFileRoute("/brea/learn/breasts-and-hormones")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Breasts & Hormones | Brea Lesson 02" },
    { name: "description", content: "A guided Brea lesson exploring how hormones influence breast development, natural changes and lactation, with an interactive Hormone Garden and life-stage timeline." },
    { property: "og:title", content: "Breasts & Hormones | Brea Lesson 02" },
    { property: "og:description", content: "Discover the invisible messengers behind many of your body’s natural changes." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: BreastsAndHormones,
});
