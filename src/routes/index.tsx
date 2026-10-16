import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Explore } from "@/components/site/Explore";
import { Support } from "@/components/site/Support";
import { Resources } from "@/components/site/Resources";
import { Founder } from "@/components/site/Founder";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BeyondPink — Beyond the Pink Ribbon. Beyond Awareness." },
      {
        name: "description",
        content:
          "BeyondPink is a breast-health awareness campaign encouraging education, understanding, compassion and meaningful support.",
      },
      { property: "og:title", content: "BeyondPink — Beyond the Pink Ribbon. Beyond Awareness." },
      {
        property: "og:description",
        content: "A breast-health education and awareness campaign for South Africa and the world.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        {/* Sections are placeholders — content added in later steps */}
        <Hero />
        <About />
        <Explore />
        <Support />
        <Resources />
        <Founder />
      </main>
      <Footer />
    </>
  );
}
