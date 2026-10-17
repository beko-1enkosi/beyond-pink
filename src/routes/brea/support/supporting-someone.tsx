import { createFileRoute } from "@tanstack/react-router";
import { SupportingSomeone } from "@/components/brea/support/SupportingSomeone";

export const Route = createFileRoute("/brea/support/supporting-someone")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Showing Up With Love | Brea Support" },
    { name: "description", content: "Gentle educational guidance on what to say, practical ways to help and caring for yourself while supporting someone through breast-health concerns." },
    { property: "og:title", content: "Showing Up With Love | Brea Support" },
    { property: "og:description", content: "Words that help, little acts of care and caring for yourself, too." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: SupportingSomeone,
});
