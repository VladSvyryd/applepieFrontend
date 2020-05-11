import { Action, action } from "easy-peasy";

export interface LanguageModel {
  languages: string[];
  currentLanguage: Language;
  setCurrentLanguage: Action<LanguageModel, Language>;
}
export enum Language {
  EN,
  DE,
}
const language: LanguageModel = {
  languages: ["EN", "DE"],
  currentLanguage: Language.DE,
  setCurrentLanguage: action((state, payload) => {
    state.currentLanguage = payload;
  }),
};

export default language;
