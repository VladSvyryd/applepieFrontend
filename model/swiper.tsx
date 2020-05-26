import { Action, action } from "easy-peasy";

export interface CustomSwiperModel {
  activeIndex: number;
  invertedSlides: number[];
  setActiveIndex: Action<CustomSwiperModel, number>;
}

const swiper: CustomSwiperModel = {
  activeIndex: 0,
  invertedSlides: [3, 6, 8],
  setActiveIndex: action((state, payload) => {
    state.activeIndex = payload;
  }),
};

export default swiper;
