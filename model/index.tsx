import language, { LanguageModel } from "./language";
import swiper, { CustomSwiperModel } from "./swiper";
import device, { DeviceModel } from "./device";

export interface StoreModel {
  language: LanguageModel;
  swiper: CustomSwiperModel;
  device: DeviceModel;
}

const model: StoreModel = {
  language,
  swiper,
  device,
};

export default model;
