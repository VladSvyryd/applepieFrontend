import { Action, action } from "easy-peasy";

export interface CustomSwiperModel {
  activeIndex: number;
  reviewIndex: number;
  invertedSlides: number[];
  activeIndexHistory: [number];
  setActiveIndex: Action<CustomSwiperModel, number>;
  updateActiveIndexHistory: Action<CustomSwiperModel, number>;
  setReviewIndex: Action<CustomSwiperModel, number>;
  swipeTo: Function | null;
  setSwiperSlideTo: Action<CustomSwiperModel, Function>;
}

const swiper: CustomSwiperModel = {
  activeIndex: 0,
  reviewIndex: 0,
  invertedSlides: [3, 6, 8],
  activeIndexHistory: [0],
  swipeTo: null,
  setActiveIndex: action((state, payload) => {
    state.activeIndex = payload;
    state.activeIndexHistory.findIndex((index) => +index === +payload) == -1 &&
      state.activeIndexHistory.push(payload);
  }),
  updateActiveIndexHistory: action((state, payload) => {
    state.activeIndexHistory.findIndex((index) => index === payload) == -1 &&
      state.activeIndexHistory.push(payload);
  }),
  setReviewIndex: action((state, payload) => {
    state.reviewIndex = payload;
  }),
  setSwiperSlideTo: action((state, payload) => {
    state.swipeTo = payload;
  }),
};

export default swiper;
