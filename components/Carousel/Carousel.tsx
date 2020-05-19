import Swiper, { SwiperInstance } from "react-id-swiper";
import { CarouselProps } from "../../types/types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const [s, ses] = useState({ isBeginning: true, isEnd: false });
  const params: any = {
    direction: "horizontal",
    slidesPerView: "auto",
    centeredSlides: true,
    // freeMode: true,
    spaceBetween: 30,
    mousewheel: true,
    roundLengths: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
    parallax: true,
    parallaxEl: {
      el: ".parallax-bg",
      value: "-23%",
    },
    containerClass: "myCustomSwiper",
    getSwiper: setSwiper,
  };
  const goNext = () => {
    swiper && swiper.slideNext();
  };

  const goPrev = () => {
    swiper && swiper.slidePrev();
  };
  const updateCarouselState = () => {
    // swiper && setCarouselState(swiper.isBeginning);
    swiper !== null &&
      ses(() => {
        return { isBeginning: swiper.isBeginning, isEnd: swiper.isEnd };
      });
  };
  useEffect(() => {
    swiper && swiper.on("slideChange", updateCarouselState);
  }, [swiper]);
  const arrowAnim = {
    active: (x: number) => ({
      x: x,
      transition: { duration: 0.4, yoyo: Infinity, ease: "easeIn" },
    }),
    passive: () => ({
      x: 0,
      transition: { duration: 0 },
    }),
  };
  return (
    <div className="responsiveSlide">
      <Swiper {...params}>{children}</Swiper>
      <motion.div
        className={`swiper-button-prev ${
          s.isBeginning && "swiper-button-disabled"
        }`}
        onClick={goPrev}
        animate={!s.isBeginning && s.isEnd ? "active" : "passive"}
        variants={arrowAnim}
        custom={-5}
      >
        {s.isEnd && !s.isBeginning && (
          <div className={`swiper-button-prev`}></div>
        )}
      </motion.div>
      <motion.div
        className={`swiper-button-next ${s.isEnd && "swiper-button-disabled"}`}
        onClick={goNext}
        animate={s.isBeginning && !s.isEnd ? "active" : "passive"}
        variants={arrowAnim}
        custom={5}
      >
        {s.isBeginning && <div className={`swiper-button-next`}></div>}
      </motion.div>
    </div>
  );
};
export default Carousel;
