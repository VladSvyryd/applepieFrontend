import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
// import ReviewCarousel from "../../components/Review/ReviewCarousel";
// import { LanguageSwitcher } from "../../components/LanguageSwitcher/LanguageSwitcher";
import { client } from "../_app";
import { landing_de } from "../../queries/queries";
import { AboutProps, HomePage } from "../../types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import MySwiper from "../../components/Swiper/swiper";

const about: NextPage<AboutProps> = (props) => {
  console.log(props);
  const children = new Array(5)
    .fill(null)
    .map((child: any, index: number) => <section>Slide{index}</section>);
  return <MySwiper>{children}</MySwiper>;
};

export const getServerSideProps: GetServerSideProps = async (
  _context: GetServerSidePropsContext
) => {
  try {
    let test = await client.query({ query: landing_de });
    console.log("RESPONSE", test);
    return {
      props: {
        pageFromCMS: test.data.homeDe as HomePage,
      },
    };
  } catch (error) {
    console.log("ERROR", error);
    return {
      props: {},
    };
  }

  // const pageJSON = await res1.json();
  // console.log(json);
  return {
    props: {},
  };
};
export default about;
