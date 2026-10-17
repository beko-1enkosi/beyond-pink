import { createFileRoute } from "@tanstack/react-router";
import { WhatIsCancer } from "@/components/brea/learn/WhatIsCancer";
export const Route = createFileRoute("/brea/learn/what-is-cancer")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "What Is Cancer? | Brea Lesson 03" },
    { name: "description", content: "Explore cells, DNA, growth controls and benign versus malignant tumors in Brea’s gentle interactive introduction to cancer biology." },
    { property: "og:title", content: "What Is Cancer? | Brea Lesson 03" },
    { property: "og:description", content: "Understanding the story of our cells. A thoughtful educational journey through cells and cancer biology." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: WhatIsCancer,
});