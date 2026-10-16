import { act, render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LANGUAGE_CODES, LANGUAGE_STORAGE_KEY, LanguageProvider, parseLanguage, translate, useTranslation } from "./i18n";

afterEach(() => { cleanup(); localStorage.clear(); });
describe("website language rules", () => {
  it("accepts exactly the five listed language codes", () => {
    expect(LANGUAGE_CODES).toEqual(["en", "zu", "xh", "st", "af"]);
    for (const code of LANGUAGE_CODES) expect(parseLanguage(code)).toBe(code);
  });
  it("defaults invalid or missing preferences to English", () => {
    expect(parseLanguage(null)).toBe("en");
    expect(parseLanguage("fr")).toBe("en");
    expect(parseLanguage({ code: "zu" })).toBe("en");
  });
  it("falls back to the English source when a translation is missing", () => {
    expect(translate("zu", "unregistered-source-key")).toBe("unregistered-source-key");
  });
  it("restores the saved choice and persists changes under one shared key", () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, "xh");
    let context: ReturnType<typeof useTranslation> | undefined;
    function Probe() { context = useTranslation(); return null; }
    render(<LanguageProvider><Probe /></LanguageProvider>);
    expect(context?.language).toBe("xh");
    expect(document.documentElement.lang).toBe("xh");
    act(() => context?.setLanguage("st"));
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("st");
    expect(document.documentElement.lang).toBe("st");
  });
  it("leaves excluded consumers in English while the website uses isiZulu", () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, "zu");
    let website: string | undefined, excluded: string | undefined;
    function Site() { website = useTranslation().language; return null; }
    function EnglishOnly() { excluded = useTranslation().language; return null; }
    render(<><LanguageProvider><Site /></LanguageProvider><EnglishOnly /></>);
    expect(website).toBe("zu");
    expect(excluded).toBe("en");
  });
});
