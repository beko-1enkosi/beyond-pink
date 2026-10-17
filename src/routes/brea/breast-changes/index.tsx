import { createFileRoute } from "@tanstack/react-router";
import { BreastChangesDashboard } from "@/components/brea/changes/BreastChangesDashboard";
export const Route = createFileRoute("/brea/breast-changes/")({
  head: () => ({ meta: [
    { title: "Understand Your Breast Changes | Brea" },
    { name: "description", content: "Get to know what's normal for your body, what changes to notice and when to seek care, with Brea." },
    { property: "og:title", content: "Understand Your Breast Changes | Brea" },
    { property: "og:description", content: "A gentle breast-awareness pathway from Brea." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: BreastChangesDashboard,
});
