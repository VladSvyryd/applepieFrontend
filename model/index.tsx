import language, { LanguageModel } from "./language";

export interface StoreModel {
  language: LanguageModel;
}

const model: StoreModel = {
  language,
};

export default model;
