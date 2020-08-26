import { ReactNodeArray, useState } from "react";
import autoSlide from "./autoLineSwiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
type AutoLineSwiperProps = {
  children: ReactNodeArray;
  rtl?: boolean;
};

const LineSwiper: React.FC<AutoLineSwiperProps> = ({
  children,
  rtl = false,
}) => {
  const params: any = {
    centeredSlides: true,
    loop: true,
    slidesPerGroup: 1,
    allowTouchMove: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    containerClass: `${autoSlide.mySlider}`,
    breakpoints: {
      320: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 0,
        centeredSlides: false,
      },
      450: {
        slidesPerView: 3,
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
  SwiperCore.use([Autoplay]);
  const [, setSwiper] = useState<SwiperCore>();
  return (
    <Swiper
      {...params}
      centeredSlides
      slidesPerGroup={1}
      direction="horizontal"
      allowTouchMove={false}
      className={`${autoSlide.mySlider} ${rtl && autoSlide.reverse}`}
      containerClass={autoSlide.mySlider}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      loopedSlides={3}
      onSwiper={(swiper: SwiperCore) => setSwiper(swiper)}
      breakpoints={{
        320: {
          slidesPerView: 3,
          spaceBetween: 0,
          centeredSlides: false,
        },
        450: {
          slidesPerView: 3,
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
      }}
    >
      {children &&
        children.map((one: any, index: number) => (
          <SwiperSlide
            key={"auto-slide" + index}
            className={` ${rtl ? autoSlide.reverse : ""}`}
          >
            {one}
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
export default LineSwiper;
