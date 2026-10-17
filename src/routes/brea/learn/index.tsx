import { createFileRoute } from "@tanstack/react-router";
import { LearnDashboard } from "@/components/brea/learn/LearnDashboard";
export const Route = createFileRoute("/brea/learn/")({
  head: () => ({ meta: [
    { title: "Learn with Brea | Your Breast-Health Learning Journey" },
    { name: "description", content: "Explore Brea’s interactive breast anatomy lesson, your learning progress and Anatomy Explorer badge." },
    { property: "og:title", content: "Learn with Brea | A Little Knowledge, a Little Growth" },
    { property: "og:description", content: "Discover your body, one little lesson at a time with Brea’s educational learning experience." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: LearnDashboard,
});
