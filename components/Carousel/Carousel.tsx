import Swiper, { SwiperInstance } from "react-id-swiper";
import { CarouselProps } from "../../types/types";
import { useState, useEffect } from "react";

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [swiper, setSwiper] = useState<SwiperInstance>();
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
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    parallax: true,
    parallaxEl: {
      el: ".parallax-bg",
      value: "-23%",
    },
    containerClass: "myCustomSwiper",
    getSwiper: setSwiper,
  };

  useEffect(() => {
    console.log(swiper);
    swiper && swiper.on("slideChange", () => console.log(swiper.progress));
  }, [swiper]);

  return (
    <div className="responsiveSlide">
      <Swiper {...params}>{children}</Swiper>
    </div>
  );
};
export default Carousel;
