export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Explore", href: "#explore" },
  { label: "Support", href: "#support" },
  { label: "Resources", href: "#resources" },
] as const;

export const LANGUAGES = [{ code: "en", short: "EN", name: "English" }] as const;

/** Set once the repository URL is provided. */
export const GITHUB_URL: string | null = null;
