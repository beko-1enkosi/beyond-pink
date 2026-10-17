import { createFileRoute } from "@tanstack/react-router";
import { LookingForSupport } from "@/components/brea/support/LookingForSupport";

export const Route = createFileRoute("/brea/support/looking-for-support")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Your Journey, Your Pace | Brea Support" },
    { name: "description", content: "Gentle educational guidance for before, during and after a breast-health concern, diagnosis or treatment — at your own pace." },
    { property: "og:title", content: "Your Journey, Your Pace | Brea Support" },
    { property: "og:description", content: "Explore supportive guidance for uncertainty, treatment and life afterwards with Brea." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: LookingForSupport,
});
