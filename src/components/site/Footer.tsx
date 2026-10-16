import type { ReactNode } from "react";
import { ArrowRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import logo from "@/assets/beyondpink-logo.svg.asset.json";
import { Button } from "@/components/ui/button";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Explore", href: "#explore" },
  { label: "Support", href: "#support" },
  { label: "Resources", href: "#resources" },
  { label: "Meet the Founder", href: "#founder" },
];

const SOCIALS = [
  {
    label: "GitHub",
    name: "BeyondPink on GitHub",
    href: "https://github.com/beko-1enkosi",
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    name: "Thobeka Nkosi on LinkedIn",
    href: "https://www.linkedin.com/in/thobeka-nkosi-217640293/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Instagram",
    name: "BeyondPink on Instagram",
    href: "https://www.instagram.com/bekolenkosi_/",
    icon: Instagram,
    external: true,
  },
  {
    label: "Email",
    name: "Email BeyondPink",
    href: "mailto:t2bnkosi@gmail.com",
    icon: Mail,
    external: false,
  },
];

function ColHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ivory/75">
      <span aria-hidden className="h-px w-5 bg-sage/70" />
      {children}
    </h2>
  );
}

export function Footer() {
  const openBrea = () => window.dispatchEvent(new CustomEvent("beyondpink:open-brea"));

  return (
    <footer
      id="footer"
      aria-label="Site footer"
      className="bg-charcoal-deep text-ivory"
    >
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--rose) 45%, transparent) 30%, color-mix(in oklab, var(--sage) 45%, transparent) 70%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-10 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.05fr] lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <a
                href="#home"
                aria-label="BeyondPink — back to top"
                className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-xl"
              >
                <img
                  src={logo.url}
                  alt="BeyondPink"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full scale-[1.7] object-contain"
                  style={{ transformOrigin: "52% 44%" }}
                />
              </a>
              <span className="whitespace-nowrap font-serif text-[1.5rem] font-medium leading-none">
                Beyond<span className="text-rose">Pink</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs font-serif text-lg italic leading-snug text-ivory/85">
              Beyond the Pink Ribbon. Beyond Awareness.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-quick-links">
            <ColHeading>Quick Links</ColHeading>
            <ul id="footer-quick-links" className="mt-3.5 grid grid-cols-2 gap-x-5 gap-y-2 sm:block sm:space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-ivory/80 transition-colors duration-300 hover:text-rose motion-reduce:transition-none"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-rose transition-all duration-300 ease-out group-hover:w-3 motion-reduce:transition-none"
                    />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <ColHeading>Connect</ColHeading>
            <ul className="mt-3.5 flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.external ? `${s.name} (opens in a new tab)` : `${s.name} (opens your email application)`}
                    {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-rose/60 hover:text-rose hover:shadow-glow motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <s.icon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brea */}
          <div>
            <ColHeading>Explore Brea</ColHeading>
            <div className="mt-3.5">
              <Button
                variant="brea"
                className="h-9 px-4 text-[0.85rem] shadow-glow"
                onClick={openBrea}
              >
                Try Brea
                <ArrowRight aria-hidden />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-ivory/15 pt-4 sm:mt-9">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-xs text-ivory/70">© 2026 BeyondPink. All rights reserved.</p>
            <p className="text-xs text-ivory/70">
              Educational information only. Not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
