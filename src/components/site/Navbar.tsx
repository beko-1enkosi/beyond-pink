import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, Github, Menu, X } from "lucide-react";
import logo from "@/assets/beyondpink-logo.svg.asset.json";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { GITHUB_URL, LANGUAGES, NAV_LINKS } from "./nav-config";

function useActiveSection() {
  const [active, setActive] = useState("#home");
  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

function Logo() {
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.replaceState(null, "", "#home");
      }}
      aria-label="BeyondPink — back to top"
      className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl md:h-16 md:w-16"
    >
      {/* Original SVG, scaled within a crop frame to trim its built-in whitespace */}
      <img
        src={logo.url}
        alt="BeyondPink"
        className="absolute inset-0 h-full w-full scale-[1.7] object-contain"
        style={{ transformOrigin: "52% 44%" }}
      />
    </a>
  );
}

function LanguageSelect({ className }: { className?: string }) {
  const [lang, setLang] = useState<string>("en");
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Language: ${current.name}`}
        className={cn(
          "inline-flex h-10 items-center gap-1 rounded-full px-3 text-sm font-medium transition-colors hover:bg-accent",
          className,
        )}
      >
        {current.short}
        <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem key={l.code} onSelect={() => setLang(l.code)} className="gap-2">
            {l.name}
            {l.code === lang && <Check className="ml-auto h-4 w-4" aria-hidden />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function GithubLink() {
  const base =
    "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent";
  return GITHUB_URL ? (
    <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub repository" className={base}>
      <Github className="h-5 w-5" aria-hidden />
    </a>
  ) : (
    <span className={cn(base, "cursor-default opacity-80")} title="Repository link coming soon" aria-label="GitHub repository (coming soon)" role="img">
      <Github className="h-5 w-5" aria-hidden />
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [breaOpen, setBreaOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const open = () => setBreaOpen(true);
    window.addEventListener("beyondpink:open-brea", open);
    return () => window.removeEventListener("beyondpink:open-brea", open);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300",
        scrolled
          ? "border-border bg-background/85 shadow-soft"
          : "border-transparent bg-background/60",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto grid h-[var(--nav-height)] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 px-3 sm:px-6 md:flex md:justify-between md:gap-3 lg:px-8"
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full md:hidden" aria-label="Open menu">
              <Menu className="!h-5 !w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-sm border-r bg-background p-0">
            <div className="flex h-full flex-col px-6 pb-8 pt-16">
              <SheetTitle className="font-serif text-2xl font-medium">Menu</SheetTitle>
              <ul className="mt-6 flex flex-col">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <SheetClose asChild>
                      <a
                        href={l.href}
                        className={cn(
                          "block border-b py-4 font-serif text-2xl transition-colors hover:text-foreground",
                          active === l.href ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {l.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between pt-8">
                <LanguageSelect className="border" />
                <GithubLink />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 items-center justify-center gap-1.5 md:justify-start">
          <Logo />
          <span className="truncate font-serif text-[1.45rem] font-medium leading-none sm:text-[1.6rem]">
            Beyond<span className="text-rose">Pink</span>
          </span>
        </div>

        <ul className="hidden items-center md:flex lg:gap-1">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative px-2 py-2 text-sm font-medium transition-colors lg:px-4 lg:text-[0.95rem]",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-2 -bottom-0.5 h-px origin-center bg-sage transition-transform duration-300 lg:inset-x-4",
                      isActive ? "scale-x-100 bg-rose" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-0.5 sm:gap-2">
          <LanguageSelect className="px-2 md:hidden" />
          <div className="hidden items-center md:flex">
            <LanguageSelect />
            <GithubLink />
          </div>
          <Button variant="brea" className="h-9 px-3 text-sm lg:h-11 lg:px-6 lg:text-base" onClick={() => setBreaOpen(true)}>
            Try Brea
            <ArrowRight className="hidden lg:block" aria-hidden />
          </Button>
        </div>
      </nav>

      <Dialog open={breaOpen} onOpenChange={setBreaOpen}>
        <DialogContent className="rounded-2xl bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl font-medium">Brea demo coming soon</DialogTitle>
            <DialogDescription className="pt-2 text-base">
              Brea, our interactive breast-health education and support app, is on its way.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}
