import { createFileRoute } from "@tanstack/react-router";
import { FindCare } from "@/components/brea/care/FindCare";

export const Route = createFileRoute("/brea/find-care")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "Find Care in South Africa | Brea" },
    { name: "description", content: "Explore a curated South African breast-health directory with sourced healthcare facilities, screening services and cancer-support contacts." },
    { property: "og:title", content: "Find Care in South Africa | Brea" },
    { property: "og:description", content: "Care closer to you: search credible breast-health facility information and regional cancer-support contacts with Brea." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: FindCare,
});