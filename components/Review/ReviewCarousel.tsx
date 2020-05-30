// import { ReviewProps } from "../../types/types";
import review from "./review.module.scss";
import Swiper, { SwiperInstance } from "react-id-swiper";
import { useState, useEffect } from "react";
import { useStoreActions } from "../../hooks";
import React from "react";
import { motion } from "framer-motion";

const ReviewCarousel: React.FC<any> = ({ children, img, buttonImg }) => {
  const [elements, setElements] = useState<React.FC | undefined>(children);
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const [activeIndex, setActive] = useState<number>(0);
  const params: any = {
    direction: "vertical",
    spaceBetween: 30,
    mousewheel: true,
    roundLengths: true,
    containerClass: `${review.verticalCarousel}`,
    getSwiper: setSwiper,
  };
  const setReviewActiveIndex = useStoreActions(
    (actions) => actions.swiper.setReviewIndex
  );
  const goNext = () => {
    swiper && swiper.slideNext();
    console.log("next");
  };

  const goPrev = () => {
    swiper && swiper.slidePrev();
    console.log(children);
  };
  const updateCarouselState = () => {
    // swiper && setCarouselState(swiper.isBeginning);

    if (swiper !== null) {
      setReviewActiveIndex(swiper.activeIndex);
      setActive(swiper.activeIndex);
    }
  };
  useEffect(() => {
    swiper && swiper.on("slideChange", updateCarouselState);
  }, [swiper]);
  const variants = {
    on: { opacity: 1 },
    off: { opacity: 0.3 },
  };
  useEffect(() => {
    setElements(
      React.Children.map(children, (child, index) => {
        return (
          <div>
            {React.cloneElement(child, {
              index,
            })}
          </div>
        );
      })
    );
  }, []);
  return (
    <div
      className={review.swiper}
      style={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top 0% left 28%",
      }}
    >
      <Swiper {...params}>{elements}</Swiper>
      <div className={review.pagination}>
        <motion.div
          whileTap={{ scale: 0.9 }}
          variants={variants}
          onClick={() => goPrev()}
          animate={swiper !== null && 0 === activeIndex ? "off" : "on"}
        >
          <img src={`${buttonImg}`} style={{ transform: "rotate(180deg)" }} />
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => goNext()}
          variants={variants}
          animate={
            swiper !== null && children.length - 1 === activeIndex
              ? "off"
              : "on"
          }
        >
          <img src={`${buttonImg}`} />
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
