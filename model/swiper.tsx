import { Action, action } from "easy-peasy";

export interface CustomSwiperModel {
  activeIndex: number;
  invertedSlides: number[];
  reviewIndex: number;
  setActiveIndex: Action<CustomSwiperModel, number>;
  setReviewIndex: Action<CustomSwiperModel, number>;
}

const swiper: CustomSwiperModel = {
  activeIndex: 0,
  reviewIndex: 0,
  invertedSlides: [3, 6, 8],
  setActiveIndex: action((state, payload) => {
    state.activeIndex = payload;
  }),
  setReviewIndex: action((state, payload) => {
    state.reviewIndex = payload;
  }),
};

export default swiper;
