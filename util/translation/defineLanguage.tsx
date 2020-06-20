// import { defaultLocale } from './config'
import { Language, locales, defaultLocale } from "../../types/types";

export const getLanguage = (langFromUrl?: string): Language => {
  console.log("HERE", langFromUrl);
  // preference from the previous session
  if (typeof langFromUrl !== "undefined") {
    return isLocale(String(langFromUrl));
  } else {
    const localSetting = localStorage.getItem("applepieLanguage");
    if (localSetting && isLocale(Language[+localSetting]) >= 0) {
      return +localSetting;
    } else {
      // the language setting of the browser
      const [browserSetting] = navigator.language.split("-");
      const currentLanguage = isLocale(browserSetting);
      return currentLanguage;
    }
  }
};

export function isLocale(tested: string): Language {
  const curLang = locales.findIndex((locale) => Language[locale] === tested);
  if (typeof curLang !== "undefined" && curLang) {
    return curLang;
  }
  return defaultLocale;
}
