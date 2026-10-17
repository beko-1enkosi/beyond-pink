import { createFileRoute } from "@tanstack/react-router";
import { UnderstandingBreastCancer } from "@/components/brea/learn/UnderstandingBreastCancer";
export const Route = createFileRoute("/brea/learn/understanding-breast-cancer")({
  head: () => ({ meta: [
    { title: "Understanding Breast Cancer | Brea Lesson 04" },
    { name: "description", content: "Explore where breast cancer begins, cancer characteristics, risk factors and the journey toward professional diagnosis and care in Brea’s interactive Lesson 4." },
    { property: "og:title", content: "Understanding Breast Cancer | Brea Lesson 04" },
    { property: "og:description", content: "A gentle, interactive introduction to breast cancer biology, risk, investigation and treatment options." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: UnderstandingBreastCancer,
});