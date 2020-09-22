// import { defaultLocale } from './config'
import { Language, locales, defaultLocale } from "../../types/types";

export const getLanguage = (langFromUrl?: string): Language => {
  // preference from the previous session
  if (typeof langFromUrl !== "undefined") {
    return isLocale(String(langFromUrl));
  } else {
    const localSetting = localStorage.getItem("applepieLanguage");

    if (localSetting && isLocale(Language[+localSetting]) >= 0) {
      return +localSetting;
    }
    return defaultLocale;
  }
};

export function isLocale(tested: string): Language {
  const curLang = locales.findIndex((locale) => Language[locale] === tested);
  if (typeof curLang !== "undefined" && curLang >= 0) {
    return curLang;
  }

  return defaultLocale;
}
