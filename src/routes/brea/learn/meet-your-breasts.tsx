import { createFileRoute } from "@tanstack/react-router";
import { MeetYourBreasts } from "@/components/brea/learn/MeetYourBreasts";
export const Route = createFileRoute("/brea/learn/meet-your-breasts")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Meet Your Breasts | Brea Lesson 01" },
    { name: "description", content: "A guided Brea lesson with a layered breast anatomy explorer, curated MedDecode glossary and optional three-question quiz." },
    { property: "og:title", content: "Meet Your Breasts | Brea Lesson 01" },
    { property: "og:description", content: "Explore the structures of the breast in a gentle, interactive educational lesson." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: MeetYourBreasts,
});
