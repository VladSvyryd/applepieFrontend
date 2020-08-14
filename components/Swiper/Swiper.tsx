import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Parallax } from "swiper";

SwiperCore.use([Mousewheel, Parallax]);
const MySwiper: React.FC<any> = (props) => {
  console.log(props);
  return (
    <Swiper
      spaceBetween={0}
      simulateTouch
      roundLengths
      parallax
      centeredSlides
      allowTouchMove
      direction="horizontal"
      className="myCustomSwiper"
      onSlideChange={(swiper) => console.log("slide change", swiper)}
      slidesPerView={1}
    >
      {props.children.map((one: any) => (
        <SwiperSlide>{one}</SwiperSlide>
      ))}
    </Swiper>
  );
};
export default MySwiper;
