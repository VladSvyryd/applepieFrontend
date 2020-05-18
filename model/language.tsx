import { Action, action } from "easy-peasy";
import { Language } from "../types/types";

export interface LanguageModel {
  currentLanguage: Language;
  setCurrentLanguage: Action<LanguageModel, Language>;
}

const language: LanguageModel = {
  currentLanguage: Language.de,
  setCurrentLanguage: action((state, payload) => {
    state.currentLanguage = payload;
  }),
};

export default language;
