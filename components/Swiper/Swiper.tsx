import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Parallax, Lazy } from "swiper";
import { Image, DEVICE, Pagination } from "../../types/types";
import {
  useState,
  useEffect,
  ReactNodeArray,
  Dispatch,
  SetStateAction,
  memo,
} from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import car from "./car.module.scss";
import { useStoreState, useStoreActions } from "../../hooks";

export const screens = [
  {
    title: "One",
    color: "#ff0055",
    position_desktop: { left: "-12px", top: "48px" },
    position_tablet: { left: "-12px", top: "48px" },
    position_mobile: { left: "-10px", top: "25px" },
  },
  {
    title: "Two",
    color: "#0099ff",
    position_desktop: { left: "193px", top: "26px" },
    position_tablet: { left: "75px", top: "27px" },
    position_mobile: { left: "23px", top: "4px" },
  },
  {
    title: "Threeeee",
    color: "#22cc88",
    position_desktop: { left: "384px", top: "43px" },
    position_tablet: { left: "164px", top: "36px" },
    position_mobile: { left: "57px", top: "16px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position_desktop: { left: "575px", top: "63px" },
    position_tablet: { left: "249px", top: "65px" },
    position_mobile: { left: "94px", top: "43px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position_desktop: { left: "765px", top: "33px" },
    position_tablet: { left: "343px", top: "37px" },
    position_mobile: { left: "127px", top: "13px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position_desktop: { left: "956px", top: "32px" },
    position_tablet: { left: "430px", top: "30px" },
    position_mobile: { left: "161px", top: "7px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position_desktop: { left: "1147px", top: "59px" },
    position_tablet: { left: "517px", top: "53px" },
    position_mobile: { left: "195px", top: "32px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position_desktop: { left: "1337px", top: "62px" },
    position_tablet: { left: "605px", top: "64px" },
    position_mobile: { left: "230px", top: "42px" },
  },
  {
    title: "Four",
    color: "#ffaa00",
    position_desktop: { left: "1469px", top: "48px" },
    position_tablet: { left: "691px", top: "48px" },
    position_mobile: { left: "260px", top: "27px" },
  },
];
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
  visibleAndHovered: () => ({
    y: -5,
    transition: { yoyo: 3, duration: 0.2 },
  }),
};
const captionAnim = {
  visible: () => ({
    y: 0,
    scale: 1,
    opacity: 1,
  }),
  hidden: () => ({
    y: -25,
    scale: 0,
    opacity: 0,
  }),
};
SwiperCore.use([Mousewheel, Parallax, Lazy]);
type CarouselProps = {
  children: ReactNodeArray;
  paginationObject: {
    pagination: Pagination;
  };
  isMobile: boolean;
  slideTo?: void;
  swiper: SwiperCore | undefined;
  setSwiper: Dispatch<SetStateAction<SwiperCore | undefined>>;
};

const MySwiper: React.FC<CarouselProps> = ({
  children,
  paginationObject,
  isMobile,
  swiper,
  setSwiper,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const invertedSlides = [3, 4, 8];
  const width = useStoreState((state) => state.device.width);
  const [respScreens, setRespScreens] = useState<any>(null);

  const setSelected = useStoreActions(
    (actions) => actions.swiper.setActiveIndex
  );
  const updateActiveIndexHistory = useStoreActions(
    (actions) => actions.swiper.updateActiveIndexHistory
  );
  const selected = useStoreState((state) => state.swiper.activeIndex);
  const activeIndexHistory = useStoreState(
    (state) => state.swiper.activeIndexHistory
  );

  function updateCarouselState(swiperIndex: SwiperCore) {
    setSelected(swiperIndex.activeIndex);
    updateActiveIndexHistory(swiperIndex.activeIndex);
  }

  const [paginationImg, setPaginationImg] = useState({
    image: paginationObject.pagination.background[0],
    image_alternative: paginationObject.pagination.background_alternative[0],
  });
  const defineDevice = (window_width: number) => {
    if (window_width >= 320 && window_width <= 768) {
      return DEVICE.MOBILE;
    } else if (window_width > 768 && window_width <= 1580) {
      return DEVICE.TABLET;
    } else if (window_width > 1580) {
      return DEVICE.DESKTOP;
    }
    return DEVICE.DESKTOP;
  };

  const handleBulletHover = (i: number) => {
    setHoveredIndex(i);
  };
  const handleBulletHoverOut = () => {
    setHoveredIndex(-1);
  };
  const handleBulletClicked = (index: number) => {
    setSelected(index);
    swiper && swiper.slideTo(index);
  };
  const defineBulletPositions = () => {
    const dev = defineDevice(width);
    // setDevice(dev);

    if (dev === 0) {
      setRespScreens(screens.map((screen) => screen["position_mobile"]));
      setPaginationImg({
        image: paginationObject.pagination.background[2],
        image_alternative:
          paginationObject.pagination.background_alternative[2],
      });
    } else if (dev === 1) {
      setRespScreens(screens.map((screen) => screen["position_tablet"]));
      setPaginationImg({
        image: paginationObject.pagination.background[1],
        image_alternative:
          paginationObject.pagination.background_alternative[1],
      });
    } else if (dev === 2) {
      setRespScreens(screens.map((screen) => screen["position_desktop"]));
      setPaginationImg({
        image: paginationObject.pagination.background[0],
        image_alternative:
          paginationObject.pagination.background_alternative[0],
      });
    } else {
      setRespScreens(screens.map((screen) => screen["position_desktop"]));
      setPaginationImg({
        image: paginationObject.pagination.background[0],
        image_alternative:
          paginationObject.pagination.background_alternative[0],
      });
    }
  };

  useEffect(() => {
    defineBulletPositions();
  }, [width]);

  const returnAnimateClass = (i: number) => {
    if (activeIndexHistory.findIndex((li) => li == i) != -1) {
      if (!isMobile && i === hoveredIndex) return "visibleAndHovered";
      return "visible";
    }
    if (i === hoveredIndex) {
      return "visible";
    }

    return "hidden";
  };

  return (
    <div className="responsiveSlide">
      <Swiper
        spaceBetween={0}
        roundLengths
        parallax
        centeredSlides
        direction="horizontal"
        className="myCustomSwiper"
        onSlideChange={(swiper: SwiperCore) => updateCarouselState(swiper)}
        slidesPerView={1}
        onSwiper={(swiper: SwiperCore) => setSwiper(swiper)}
        mousewheel={{ releaseOnEdges: false, sensitivity: 0.2 }}
        preloadImages={false}
        watchSlidesVisibility
        lazy={true}
        preventInteractionOnTransition={true}
      >
        {children &&
          children.map((one: any, index: number) => (
            <SwiperSlide key={"main-slide" + index}>
              {({ isVisible, isNext, isPrev }: any) =>
                index == children.length - 1 ||
                isNext ||
                isPrev ||
                index == 0 ||
                isVisible
                  ? one
                  : null
              }
            </SwiperSlide>
          ))}
      </Swiper>
      <AnimateSharedLayout>
        <div className={car.paginationContainer}>
          <ol
            className={car.pagination}
            style={{
              backgroundImage: `url(${
                paginationObject && invertedSlides.some((s) => s === selected)
                  ? paginationImg.image_alternative?.url
                  : paginationImg.image?.url
              })`,
            }}
          >
            {paginationObject.pagination.icons !== null &&
              paginationObject.pagination.icons.map(
                (paginationBullet: Image, i) => (
                  <motion.li
                    animate
                    key={"my_slide-" + i}
                    className={`title  ${car.paginationBullet}`}
                    style={{
                      left: `${respScreens !== null && respScreens[i].left}`,
                      top: `${respScreens !== null && respScreens[i].top}`,
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
                      key={"my_slide-image" + i}
                      animate={returnAnimateClass(i)}
                      variants={bulletAnim}
                      src={`${
                        invertedSlides.some((s) => s === selected)
                          ? paginationBullet.image_alternative?.url
                          : paginationBullet.image?.url
                      }`}
                      alt={paginationBullet.image?.alternativeText}
                      className={car.bullet}
                      style={{
                        width: `${
                          width >= 768
                            ? paginationBullet.image?.width * 1.2
                            : paginationBullet.image?.width * 0.9
                        }px`,
                        height: `${
                          width >= 768
                            ? paginationBullet.image?.height * 1.2
                            : paginationBullet.image?.height * 0.9
                        }px`,
                      }}
                    />
                    <motion.div
                      animate={
                        width >= 768
                          ? activeIndexHistory.findIndex((li) => li == i) !=
                              -1 || i === hoveredIndex
                            ? "visible"
                            : "hidden"
                          : selected === i
                          ? "visible"
                          : "hidden"
                      }
                      variants={captionAnim}
                      className={
                        car.caption +
                        `${
                          invertedSlides.some((s) => s === selected)
                            ? " invertedTextColorBySlide"
                            : ""
                        }`
                      }
                    >
                      <span> {paginationBullet.name}</span>
                    </motion.div>
                  </motion.li>
                )
              )}
          </ol>
        </div>
      </AnimateSharedLayout>
    </div>
  );
};
export default memo(MySwiper);
