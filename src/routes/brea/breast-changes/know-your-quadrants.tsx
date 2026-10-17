import { createFileRoute } from "@tanstack/react-router";
import { KnowYourQuadrants } from "@/components/brea/changes/KnowYourQuadrants";
export const Route = createFileRoute("/brea/breast-changes/know-your-quadrants")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Know Your Breast Quadrants | Brea" },
    { name: "description", content: "A gentle, interactive guide to the four breast quadrants and becoming familiar with your body, with Brea." },
    { property: "og:title", content: "Know Your Breast Quadrants | Brea" },
    { property: "og:description", content: "Explore the four breast quadrants and a gentle breast-awareness routine." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: KnowYourQuadrants,
});
