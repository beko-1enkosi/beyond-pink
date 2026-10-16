import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries } from "./locales";

export const LANGUAGE_CODES = ["en", "zu", "xh", "st", "af"] as const;
export type Language = typeof LANGUAGE_CODES[number];
export const LANGUAGE_STORAGE_KEY = "beyondpink-language";
export function parseLanguage(value: unknown): Language {
  return LANGUAGE_CODES.find((code) => code === value) ?? "en";
}
export function translate(language: Language, key: string): string {
  return dictionaries[language]?.[key] || dictionaries["en"]?.[key] || key;
}
type TranslationContext = { language: Language; setLanguage: (language: Language) => void; t: (key: string) => string };
const Context = createContext<TranslationContext>({ language: "en", setLanguage: () => {}, t: (key) => key });
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Both SSR and hydration start in English; storage is read only after commit.
  const [language, updateLanguage] = useState<Language>("en");
  useEffect(() => {
    try { updateLanguage(parseLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY))); } catch { /* Storage may be disabled. */ }
    const sync = (event: StorageEvent) => { if (event.key === LANGUAGE_STORAGE_KEY) updateLanguage(parseLanguage(event.newValue)); };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const setLanguage = (value: Language) => {
    const next = parseLanguage(value);
    updateLanguage(next);
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, next); } catch { /* Selection still works without storage. */ }
  };
  return <Context.Provider value={{ language, setLanguage, t: (key) => translate(language, key) }}>{children}</Context.Provider>;
}
export function useTranslation() { return useContext(Context); }
