import en from "./en.json";
import zu from "./zu.json";
import xh from "./xh.json";
import st from "./st.json";
import af from "./af.json";
import { tourDictionaries } from "./brea-tour";

export const dictionaries: Record<string, Record<string, string>> = Object.fromEntries(
  Object.entries({ en, zu, xh, st, af }).map(([language, existing]) => [language, { ...existing, ...tourDictionaries[language] }]),
);
