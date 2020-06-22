// import { ReviewProps } from "../../types/types";
import review from "./review.module.scss";
import Swiper, { SwiperInstance } from "react-id-swiper";
import { useState, useEffect } from "react";
import { useStoreActions } from "../../hooks";
import React from "react";
import { motion } from "framer-motion";
import { ReviewCarouselProps } from "../../types/types";
import Review from "./Review";

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
  reviews,
  img,
  buttonImg,
}) => {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const [activeIndex, setActive] = useState<number>(0);
  const params: any = {
    direction: "vertical",
    spaceBetween: 30,
    speed: 800,
    roundLengths: true,
    allowTouchMove: false,
    containerClass: `${review.verticalCarousel}`,
    getSwiper: setSwiper,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 50,
      },
    },
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
  console.log(buttonImg);
  return (
    <div
      className={review.swiper}
      style={
        img
          ? {
              backgroundImage: `url(${img.url})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top 0% right 72%",
            }
          : {}
      }
    >
      <Swiper {...params}>
        {reviews.map((review, index) => (
          <div key={"review-" + index}>
            <Review review={review} index={index} count={reviews.length} />
          </div>
        ))}
      </Swiper>
      {reviews.length > 1 && (
        <div className={review.pagination}>
          <motion.div
            whileTap={{
              scale: `${swiper !== null && 0 === activeIndex ? 1 : 0.9}`,
            }}
            variants={variants}
            onClick={() => goPrev()}
            animate={swiper !== null && 0 === activeIndex ? "off" : "on"}
          >
            <img
              src={`${buttonImg?.url}`}
              alt={buttonImg?.alternativeText}
              style={{ transform: "rotate(180deg)" }}
            />
          </motion.div>
          <motion.div
            whileTap={{
              scale: `${
                swiper !== null && reviews.length - 1 === activeIndex ? 1 : 0.9
              }`,
            }}
            onClick={() => goNext()}
            variants={variants}
            animate={
              swiper !== null && reviews.length - 1 === activeIndex
                ? "off"
                : "on"
            }
          >
            <img src={`${buttonImg?.url}`} alt={buttonImg?.alternativeText} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ReviewCarousel;
