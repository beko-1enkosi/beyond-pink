import { createFileRoute } from "@tanstack/react-router";
import { RecogniseChanges } from "@/components/brea/changes/RecogniseChanges";
export const Route = createFileRoute("/brea/breast-changes/recognise-changes")({
  head: () => ({ meta: [
    { title: "Recognise the Changes | Brea Breast Changes Lesson 01" },
    { name: "description", content: "An interactive Brea lesson on breast awareness: what's normal for you, changes worth noticing and when to seek care." },
    { property: "og:title", content: "Recognise the Changes | Brea" },
    { property: "og:description", content: "Learn to notice new or unusual breast and chest changes, calmly and inclusively." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: RecogniseChanges,
});
