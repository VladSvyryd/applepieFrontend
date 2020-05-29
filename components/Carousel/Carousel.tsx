import Swiper, { SwiperInstance } from "react-id-swiper";
import { CarouselProps, Picture } from "../../types/types";
import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import car from "./car.module.scss";
import { useStoreActions, useStoreState } from "../../hooks";

export const screens = [
  {
    title: "One",
    color: "#ff0055",
    position: { left: "-12px", top: "48px" },
  },
  {
    title: "Two",
    color: "#0099ff",
    position: { left: "193px", top: "26px" },
  },
  {
    title: "Threeeee",
    color: "#22cc88",
    position: { left: "384px", top: "41px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "575px", top: "65px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "765px", top: "35px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "956px", top: "30px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "1147px", top: "55px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "1337px", top: "64px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position: { left: "1531px", top: "46px" },
  },
];

const Carousel: React.FC<CarouselProps> = ({ children, paginationObject }) => {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const [s, ses] = useState({ isBeginning: true, isEnd: false });
  const [selected, setSelected] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [paginationImgs, setPaginationImgs] = useState<Array<Picture> | null>(
    null
  );
  const setActiveIndex = useStoreActions(
    (actions) => actions.swiper.setActiveIndex
  );
  const invertedSlides = useStoreState((state) => state.swiper.invertedSlides);
  const params: any = {
    direction: "horizontal",
    longSwipes: false,
    resistanceRatio: 0,
    shortSwipes: true,
    resistance: false,
    spaceBetween: 30,
    mousewheel: true,
    roundLengths: true,
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
    if (swiper !== null) {
      setSelected(swiper.activeIndex);
      setActiveIndex(swiper.activeIndex);
    }
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
  const handleBulletHover = (i: number) => {
    setHoveredIndex(i);
  };
  const handleBulletHoverOut = () => {
    setHoveredIndex(-1);
  };
  useEffect(() => {
    if (!invertedSlides.some((s) => s === selected)) {
      setPaginationImgs(paginationObject.pagination.images);
    } else {
      paginationObject.pagination.images_alternative &&
        setPaginationImgs(paginationObject.pagination.images_alternative);
    }
  }, [selected]);
  const handleBulletClicked = (index: number) => {
    setSelected(index);
    swiper && swiper.slideTo(index);
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
              backgroundImage: `url(http://localhost:1337${
                invertedSlides.some((s) => s === selected)
                  ? paginationObject.pagination.background_alternative?.url
                  : paginationObject.pagination.background?.url
              })`,
            }}
          >
            {paginationImgs !== null &&
              paginationImgs.map((paginationBullet, i) => (
                <motion.li
                  animate
                  key={i}
                  className={`title  ${car.paginationBullet}`}
                  style={{
                    left: `${screens[i].position.left}`,
                    top: `${screens[i].position.top}`,
                  }}
                  onClick={() => handleBulletClicked(i)}
                  onMouseOver={() => handleBulletHover(i)}
                  onMouseLeave={() => handleBulletHoverOut()}
                >
                  <span
                    className={`${car.point}  ${
                      invertedSlides.some((s) => s === selected) &&
                      `${car.invertedBackgroundColor}`
                    }`}
                    key={i + "p"}
                  ></span>
                  {i === selected && (
                    <motion.div
                      layoutId="underline"
                      className={
                        car.active +
                        `${
                          invertedSlides.some((s) => s === selected)
                            ? " " + car.invertedBackgroundColor
                            : ""
                        }`
                      }
                    />
                  )}
                  <motion.img
                    animate={
                      i === selected || i === hoveredIndex
                        ? "visible"
                        : "hidden"
                    }
                    variants={bulletAnim}
                    src={`http://localhost:1337${paginationBullet.url}`}
                    alt={paginationBullet.alternativeText}
                    className={car.bullet}
                    style={{
                      width: `${paginationBullet.width * 1.5}px`,
                      height: `${paginationBullet.height * 1.5}px`,
                    }}
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
