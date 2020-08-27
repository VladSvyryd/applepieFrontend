// import { ReviewProps } from "../../types/types";
import review from "./review.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
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
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [activeIndex, setActive] = useState<number>(0);
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

    if (swiper) {
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
  return (
    <div className={review.swiper}>
      <div className={review.semi}>
        <img src={`${img.url}`} alt={`${img.caption}`} />
      </div>
      <Swiper
        centeredSlides
        slidesPerGroup={1}
        direction="vertical"
        spaceBetween={30}
        speed={800}
        roundLengths
        className={`${review.verticalCarousel}`}
        onSwiper={(swiper: SwiperCore) => setSwiper(swiper)}
        allowTouchMove={false}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={"review-" + index}>
            <div>
              <Review review={review} index={index} count={reviews.length} />
            </div>
          </SwiperSlide>
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

export default React.memo(ReviewCarousel);
