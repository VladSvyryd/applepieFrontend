// import { defaultLocale } from './config'
import { Language, locales, defaultLocale } from "../../types/types";

export function getLanguage(): Language {
  // preference from the previous session
  const localSetting = localStorage.getItem("applepieLanguage");
  if (localSetting && isLocale(Language[+localSetting])) {
    console.log(Language[+localSetting]);
    return +localSetting;
  }
  // the language setting of the browser
  const [browserSetting] = navigator.language.split("-");
  const currentLanguage = isLocale(browserSetting);
  console.log("from DEFIENE", currentLanguage);
  if (typeof currentLanguage !== "undefined") {
    return currentLanguage;
  }

  return defaultLocale;
}
export function isLocale(tested: string): Language | undefined {
  return locales.find((locale) => Language[locale] === tested);
}
