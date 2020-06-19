import Swiper from "react-id-swiper";
import { ReactNode } from "react";
import autoSlide from "./autoLineSwiper.module.scss";

type AutoLineSwiperProps = {
  children: ReactNode;
  rtl?: string;
};

const AutoLineSwiper: React.FC<AutoLineSwiperProps> = ({
  children,
  rtl = "",
}) => {
  const params: any = {
    centeredSlides: true,
    loop: true,
    slidesPerGroup: 1,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    containerClass: `${autoSlide.mySlider}`,
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 50,
      },
      450: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      },

      768: {
        slidesPerView: 3,
      },
      850: {
        slidesPerView: 3,
      },
      1264: {
        slidesPerView: 5,
      },
    },
  };
  return (
    <Swiper {...params} rtl={rtl} noSwiping={true}>
      {children}
    </Swiper>
  );
};
export default AutoLineSwiper;
