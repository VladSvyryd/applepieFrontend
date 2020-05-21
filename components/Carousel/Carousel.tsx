import Swiper, { SwiperInstance } from "react-id-swiper";
import { CarouselProps } from "../../types/types";
import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import car from "./car.module.scss";

export const screens = [
  {
    title: "One",
    color: "#ff0055",
    position: { left: "3px", top: "57px" },
  },
  {
    title: "Two",
    color: "#0099ff",
    position: { left: "193px", top: "35px" },
  },
  {
    title: "Threeeee",
    color: "#22cc88",
    position: { left: "384px", top: "48px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "575px", top: "75px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "765px", top: "47px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "956px", top: "40px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "1147px", top: "62px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "1337px", top: "74px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "1531px", top: "56px" },
  },
];

const Carousel: React.FC<CarouselProps> = ({ children, paginationObject }) => {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const [s, ses] = useState({ isBeginning: true, isEnd: false });
  const [selected, setSelected] = useState(0);
  const params: any = {
    direction: "horizontal",
    slidesPerView: "auto",
    centeredSlides: true,
    // freeMode: true,
    spaceBetween: 30,
    mousewheel: true,
    roundLengths: true,
    // pagination: {
    //   el: ".swiper-pagination",
    //   type: "bullets",
    //   clickable: true,
    // },
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
    swiper !== null && setSelected(swiper.activeIndex);
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

  const bulletAnim = {
    visible: () => ({
      y: 0,
      scale: 1,
      opacity: 1,
    }),
    hidden: () => ({
      y: 25,
      scale: 0,
      opacity: 0,
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
      <AnimateSharedLayout>
        <div className={car.paginationContainer}>
          <ol
            className={car.pagination}
            style={{
              backgroundImage: `url(http://localhost:1337${paginationObject.picture.url})`,
            }}
          >
            {screens.map((_value, i) => (
              <motion.li
                animate
                key={i}
                className={`title ${i === selected && "selected"} ${
                  car.paginationBullet
                }`}
                style={{
                  left: `${screens[i].position.left}`,
                  top: `${screens[i].position.top}`,
                }}
                onClick={() => setSelected(i)}
              >
                {i === selected && (
                  <motion.div layoutId="underline" className={car.active} />
                )}
                <motion.img
                  animate={i === selected ? "visible" : "hidden"}
                  variants={bulletAnim}
                  src={`http://localhost:1337${paginationObject.bullets[i].url}`}
                  alt={paginationObject.bullets[i].alternativeText}
                  className={car.bullet}
                />
              </motion.li>
            ))}
            {children !== null && (
              <div className={car.counter}>
                <span>{selected + 1}</span>
                <span>/</span>
                <span>
                  {children !== null && children !== undefined
                    ? screens.length
                    : null}
                </span>
              </div>
            )}
          </ol>
        </div>
      </AnimateSharedLayout>
    </div>
  );
};
export default Carousel;
