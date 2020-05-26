import language, { LanguageModel } from "./language";
import swiper, { CustomSwiperModel } from "./swiper";

export interface StoreModel {
  language: LanguageModel;
  swiper: CustomSwiperModel;
}

const model: StoreModel = {
  language,
  swiper,
};

export default model;
