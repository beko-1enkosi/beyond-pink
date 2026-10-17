import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { installSectionScrolling } from "@/lib/section-scroll";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Explore } from "@/components/site/Explore";
import { Support } from "@/components/site/Support";
import { Resources } from "@/components/site/Resources";
import { Founder } from "@/components/site/Founder";
import { Footer } from "@/components/site/Footer";
import { Bri } from "@/components/bri/Bri";
import { LanguageProvider } from "@/lib/i18n";
import socialImage from "@/assets/beyondpink-social.jpg.asset.json";

const SITE_URL = "https://beyond-pink.lovable.app/";
const SOCIAL_IMAGE_URL = new URL(socialImage.url, SITE_URL).href;
const SOCIAL_TITLE = "BeyondPink | Beyond Awareness";
const SOCIAL_DESCRIPTION = "Beyond the Pink Ribbon. Beyond Awareness. Empowering everyone through breast-health education, understanding and support.";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "BeyondPink | Beyond the Pink Ribbon. Beyond Awareness." },
      {
        name: "description",
        content:
          "BeyondPink is a breast-health awareness campaign rooted in South Africa and welcoming everyone. Explore breast-health education, trusted resources, compassionate support and our upcoming Brea app.",
      },
      { property: "og:title", content: SOCIAL_TITLE },
      {
        property: "og:description",
        content: SOCIAL_DESCRIPTION,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "BeyondPink" },
      { property: "og:image", content: SOCIAL_IMAGE_URL },
      { property: "og:image:secure_url", content: SOCIAL_IMAGE_URL },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Diverse hands holding pink awareness ribbons, the BeyondPink logo, and the words Beyond the Pink Ribbon. Beyond Awareness. Education • Understanding • Support." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SOCIAL_TITLE },
      { name: "twitter:description", content: SOCIAL_DESCRIPTION },
      { name: "twitter:image", content: SOCIAL_IMAGE_URL },
      { name: "twitter:image:alt", content: "BeyondPink — Beyond the Pink Ribbon. Beyond Awareness. Diverse hands holding pink awareness ribbons." },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});

function Index() {
  useEffect(installSectionScrolling, []);
  return (
    <>
      <LanguageProvider>
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
      </LanguageProvider>
      <div lang="en"><Bri /></div>
    </>
  );
}
