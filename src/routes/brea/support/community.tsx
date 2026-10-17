import { createFileRoute } from "@tanstack/react-router";
import { CommunityGarden } from "@/components/brea/support/CommunityGarden";

export const Route = createFileRoute("/brea/support/community")({
  head: () => ({ meta: [
    { title: "The Brea Garden | Brea" },
    { name: "description", content: "A welcoming, pseudonymous community demo where people share experiences, offer encouragement and feel connected." },
    { property: "og:title", content: "The Brea Garden | Brea" },
    { property: "og:description", content: "Stories that connect us — a gentle, browser-local community preview." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: CommunityGarden,
});
