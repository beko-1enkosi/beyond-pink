import { createFileRoute } from "@tanstack/react-router";
import { ScreeningLesson } from "@/components/brea/learn/ScreeningLesson";
export const Route = createFileRoute("/brea/learn/mammograms-ultrasounds-screening")({
  head: () => ({ meta: [
    { title: "Mammograms, Ultrasounds & Screening | Brea Lesson 5" },
    { name: "description", content: "Understand how mammograms and breast ultrasounds work, what they can reveal and what to expect during an appointment." },
    { property: "og:title", content: "Mammograms, Ultrasounds & Screening | Brea" },
    { property: "og:description", content: "Understanding the tools that help us look beneath the surface — an interactive Brea lesson." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: ScreeningLesson,
});
