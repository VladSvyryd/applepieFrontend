import { useState } from "react";
import withTranslate from "../../components/HOC/withTranslate";
import Layout from "../../components/Layout/Layout";
import { NextPage, NextPageContext } from "next";
import { HomeProps, NavType, HomePage } from "../../types/types";
import index from "../../pageStyles/index.module.scss";
import { motion } from "framer-motion";
import MarkdownView from "react-showdown";
import SendForm from "../../components/Form/SendForm";
import dynamic from "next/dynamic";
import ReviewCarousel from "../../components/Review/ReviewCarousel";
import { useStoreState } from "easy-peasy";
import {
  landing_de,
  landing_en,
  navigation_de,
  navigation_en,
} from "../../queries/queries";
import { client } from "../_app";
import AutoLineSwiper from "../../components/AutoLineSwiper/AutoLineSwiper";
import { ORIENTATION } from "../../model/device";
import MotionButton from "../../components/MotionButton/MotionButton";
import { useStoreActions } from "../../hooks";
import { InteractiveForm } from "../../components/InteractiveForm/InteractiveForm";
const Carousel = dynamic(() => import("../../components/Carousel/Carousel"), {
  ssr: true,
});

const Page: NextPage<HomeProps> = (props) => {
  const { pageFromCMS, navigation } = props;
  const [activeServiceIndex, setIndex] = useState(0);
  const handleServiceHover = (index: number) => {
    setIndex(index);
  };
  const handleServiceLeave = () => {
    setIndex(0);
  };
  const deviceWidth = useStoreState((state) => state.device.width);
  const orientation = useStoreState((state) => state.device.orientation);
  const setInterFormState = useStoreActions(
    (actions) => actions.device.setInterFormState
  );

  // IF for landscape mode
  //!props.isMobile ||
  //(props.isMobile && orientation === ORIENTATION.portrait) ?
  return (
    <Layout
      navigation={props.navigation}
      horizontalFooter
      known_by={pageFromCMS.known_by}
      social_links={pageFromCMS.social_links}
      known_by_title={pageFromCMS.known_by_title}
    >
      <h1 className="visuallyHidden">Applepie</h1>
      <InteractiveForm />
      <Carousel
        paginationObject={{
          pagination: pageFromCMS.pagination,
        }}
      >
        <section
          className={`flexColumns alignCenter ${index.intro}`}
          data-swiper-parallax="1500"
          style={{
            backgroundImage: `url(${
              pageFromCMS.intro.pictures && pageFromCMS.intro.pictures[7]?.url
            })`,
          }}
        >
          <div
            className={`smallitem responsiveSlide frameBottomTop ${index.leftSectionFrame}`}
            style={{
              backgroundImage: `url(${
                pageFromCMS.intro.pictures && deviceWidth >= 1400
                  ? pageFromCMS.intro.pictures[4]?.url
                  : ""
              }), url(${
                pageFromCMS.intro.pictures && deviceWidth >= 1580
                  ? pageFromCMS.intro.pictures[5]?.url
                  : ""
              }),url(${
                pageFromCMS.intro.pictures && deviceWidth >= 1580
                  ? pageFromCMS.intro.pictures[3]?.url
                  : ""
              })`,
              backgroundPosition:
                "top 0 right 100px, left center, right 100px bottom 0",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className={`content-frame-leftHalf ${index.height100} ${index.leftSection}`}
            >
              <div
                className={`${index.introDescription} + ${index.verticalMargin}`}
              >
                <h2 data-swiper-parallax="500" data-swiper-parallax-opacity="0">
                  {pageFromCMS.intro.title}
                </h2>
                <h3
                  data-swiper-parallax="800"
                  data-swiper-parallax-opacity="0"
                  className={index.descriptionDesktop}
                >
                  {pageFromCMS.intro.description}
                </h3>

                <img
                  src={`${
                    deviceWidth <= 719
                      ? pageFromCMS.intro.pictures &&
                        pageFromCMS.intro.pictures[8]?.url
                      : pageFromCMS.intro.pictures &&
                        pageFromCMS.intro.pictures[0]?.url
                  }`}
                  alt={
                    pageFromCMS.intro.pictures &&
                    pageFromCMS.intro.pictures[0]?.alternativeText
                  }
                  className={index.leftPie}
                  style={{
                    marginTop: `-${
                      deviceWidth <= 719
                        ? 0
                        : pageFromCMS.intro.pictures &&
                          pageFromCMS.intro.pictures[0]?.height / 2
                    }px`,
                  }}
                  data-swiper-parallax-opacity="0"
                />
                <MotionButton
                  text={pageFromCMS.buttons[0].text}
                  buttonType={pageFromCMS.buttons[0].type}
                  className={`medium ${index.introButton}`}
                  data-swiper-parallax="1100"
                  data-swiper-parallax-opacity="0"
                  // link={pageFromCMS.buttons[0].function}
                  onClick={() => setInterFormState(true)}
                />
              </div>
            </div>
          </div>
          <div
            className={`smallitem responsiveSlide frameBottomTop ${index.rightSection}`}
            style={{ background: "tomato" }}
          >
            <div className={`content-frame-rightHalf ${index.height100}`}>
              <img
                src={`${
                  pageFromCMS.intro.pictures &&
                  pageFromCMS.intro?.pictures[1]?.url
                }`}
                alt={
                  pageFromCMS.intro.pictures &&
                  pageFromCMS.intro?.pictures[1]?.alternativeText
                }
                className={index.rightPie}
                style={{
                  marginTop: `-${
                    pageFromCMS.intro.pictures &&
                    pageFromCMS.intro?.pictures[1]?.height / 2
                  }px`,
                }}
                data-swiper-parallax-opacity="0"
              />

              {deviceWidth >= 1400 ? (
                <motion.img
                  animate={{ rotate: `${activeServiceIndex * 12}deg` }}
                  src={`${
                    pageFromCMS.intro.pictures &&
                    pageFromCMS.intro?.pictures[6]?.url
                  }`}
                  alt={
                    pageFromCMS.intro.pictures &&
                    pageFromCMS.intro?.pictures[6]?.alternativeText
                  }
                  className={index.orbit}
                  style={{
                    marginTop: `-${
                      pageFromCMS.intro.pictures &&
                      pageFromCMS?.intro?.pictures[6]?.height / 2
                    }px`,
                    left: `-${
                      pageFromCMS.intro.pictures &&
                      pageFromCMS?.intro?.pictures[6]?.width / 2
                    }px`,
                  }}
                  data-swiper-parallax-opacity="0"
                  transition={{ type: "spring", damping: 300 }}
                />
              ) : null}
              <div
                className={`${index.introServices} + ${index.verticalMargin}`}
              >
                <ul className={`${index.introServicesList} indieFlower`}>
                  {pageFromCMS?.services?.map((service, i) => (
                    <li
                      onMouseOver={() => handleServiceHover(i)}
                      onMouseLeave={() => handleServiceLeave()}
                      key={"service_" + i}
                      data-swiper-parallax={-i * 100 + 500}
                      data-swiper-parallax-opacity="0"
                      data-middle={
                        i <= Math.floor(pageFromCMS.services.length / 2) && true
                      }
                      style={{
                        paddingLeft: `${
                          i <= Math.floor(pageFromCMS.services.length / 2) - 1
                            ? i * 15
                            : (pageFromCMS.services.length - i - 1) * 15
                        }px`,
                      }}
                    >
                      <a>{service.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section
          className={index.firstSection + " " + index.grid + " frameBottomTop"}
        >
          <div className={index.left}>
            <img
              src={`${pageFromCMS.first_section?.images[0]?.url}`}
              alt={pageFromCMS.first_section?.images[0]?.alternativeText}
              className="responsiveImg"
            />
          </div>
          <div className={index.right + " " + index.verticalMargin}>
            <h2
              data-swiper-parallax="500"
              data-swiper-parallax-opacity="0"
              className="title"
            >
              {pageFromCMS.first_section?.title}
            </h2>
            <div className={index.ul}>
              <MarkdownView
                markdown={pageFromCMS.first_section?.content_text}
              />
            </div>
          </div>
        </section>
        <section
          className={index.secondSection + " " + index.grid + " frameBottomTop"}
        >
          <div className={index.left + " " + index.verticalMargin}>
            <h2
              data-swiper-parallax="500"
              data-swiper-parallax-opacity="0"
              className="title"
            >
              {pageFromCMS.second_section?.title}
            </h2>
            <div className={index.ul}>
              <MarkdownView
                markdown={pageFromCMS.second_section?.content_text}
              />
            </div>
          </div>
          <div className={index.right}>
            <img
              src={`${pageFromCMS.second_section?.images[0]?.url}`}
              alt={pageFromCMS.second_section.images[0].alternativeText}
              className="responsiveImg"
            />
          </div>
        </section>
        <section className={index.thirdSection + " frameBottomTop"}>
          <div
            className={index.clients + " content-frame " + index.verticalMargin}
          >
            <h2
              data-swiper-parallax="500"
              data-swiper-parallax-opacity="0"
              className={index.header + " title"}
            >
              {pageFromCMS.third_section?.title}
            </h2>
            <div className={index.imagesGrid}>
              <AutoLineSwiper>
                {pageFromCMS.third_section?.images
                  ?.filter((_v, i, arr) => i < arr.length / 2)
                  .map((img) => (
                    <div key={img.name} className={index.gridImage}>
                      <img src={`${img.url}`} alt={img.alternativeText} />
                    </div>
                  ))}
              </AutoLineSwiper>
              <AutoLineSwiper rtl="rtl">
                {pageFromCMS.third_section?.images
                  ?.filter((_v, i, arr) => i >= arr.length / 2)
                  .map((img) => (
                    <div key={img.name} className={index.gridImage}>
                      <img src={`${img.url}`} alt={img.alternativeText} />
                    </div>
                  ))}
              </AutoLineSwiper>
            </div>
          </div>
        </section>
        <section
          className={
            index.thirdSection + " frameBottomTop " + index.forthSection
          }
        >
          <div
            className={
              index.instructions + " content-frame " + index.verticalMargin
            }
          >
            <div className={index.header + " title"}>
              <h2 data-swiper-parallax="500" data-swiper-parallax-opacity="0">
                {pageFromCMS.forth_section?.title}
              </h2>
              <h3
                className="indieFlower"
                data-swiper-parallax="700"
                data-swiper-parallax-opacity="0"
              >
                {pageFromCMS.forth_section?.content_text}
              </h3>
            </div>
            <div className={index.cardsGrid}>
              {pageFromCMS.forth_section.cards.length > 0 &&
                pageFromCMS.forth_section?.cards?.map((card, ind) => (
                  <div
                    key={card.title}
                    data-swiper-parallax={`${(ind + 1) * 70}`}
                    data-swiper-parallax-opacity="0"
                  >
                    <img
                      src={`${card.image?.url}`}
                      alt={card.image?.alternativeText}
                    />
                    <div className={index.content}>
                      <h3 className={"indieFlower"}>{card.title}</h3>
                      <p>{card.subtitle}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className={index.footer}>
              <div className={index.zebraContainer}>
                <div className={index.zebra + " indieFlower"}>
                  <MarkdownView
                    markdown={pageFromCMS.forth_section?.button?.subtext}
                  />
                </div>
                <img
                  src={`${pageFromCMS.forth_section?.images[0]?.url}`}
                  alt={pageFromCMS.forth_section?.images[0]?.alternativeText}
                />
              </div>
              <motion.button
                className={`medium`}
                data-swiper-parallax="1100"
                data-swiper-parallax-opacity="0"
                // whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.9 }}
              >
                {pageFromCMS.forth_section.button.text}
              </motion.button>
            </div>
          </div>
        </section>
        <section
          className={
            index.firstSection +
            " " +
            index.grid +
            " frameBottomTop " +
            index.fifthSection
          }
        >
          <div className={index.left}>
            <img
              src={`${pageFromCMS.fifth_section?.images[0]?.url}`}
              alt={pageFromCMS.fifth_section?.images[0]?.alternativeText}
              className="responsiveImg"
            />
          </div>
          <div className={index.right + " " + index.verticalMargin}>
            <h2
              data-swiper-parallax="500"
              data-swiper-parallax-opacity="0"
              className="title"
            >
              {pageFromCMS.fifth_section?.title}
            </h2>
            <div className={index.ul}>
              <MarkdownView
                markdown={pageFromCMS.fifth_section?.content_text}
                options={{ tables: true, emoji: true }}
              />
            </div>
          </div>
        </section>
        <section
          className={
            index.thirdSection + " frameBottomTop " + index.sixthSection
          }
        >
          <div
            className={`content-frame  ${index.backgroundLayer}`}
            style={{
              backgroundImage: `url(${
                pageFromCMS.sixth_section?.images[2]?.url || ""
              }),url(${pageFromCMS.sixth_section?.images[3]?.url || ""})`,
              backgroundRepeat: "no-repeat",
              width: "100%",
              display: "flex",
              backgroundPosition: "top 30% left 0%, bottom 30% right 0%",
            }}
          >
            <div className={index.clients + " " + index.verticalMargin}>
              <h2
                data-swiper-parallax="500"
                data-swiper-parallax-opacity="0"
                className={index.header}
              >
                {pageFromCMS.sixth_section?.title}
              </h2>
              <ReviewCarousel
                reviews={pageFromCMS.reviews}
                img={pageFromCMS.sixth_section?.images[1]}
                buttonImg={pageFromCMS.sixth_section?.images[0]}
              />
            </div>
          </div>
        </section>
        <section
          className={
            index.firstSection +
            " " +
            index.grid +
            " frameBottomTop " +
            index.seventhSection
          }
        >
          <div className={index.left}>
            <img
              src={
                pageFromCMS.seventh_section?.images[0]?.url
                  ? `${pageFromCMS.seventh_section?.images[0]?.url}`
                  : ""
              }
              alt={pageFromCMS.seventh_section?.images[0]?.alternativeText}
              className="responsiveImg"
            />
          </div>
          <div className={index.right + " " + index.verticalMargin}>
            <h2
              data-swiper-parallax="500"
              data-swiper-parallax-opacity="0"
              className="title"
            >
              {pageFromCMS.seventh_section?.title}
            </h2>
            <div>
              <SendForm button={pageFromCMS.seventh_section?.button} />
            </div>
          </div>
        </section>
        <section
          className={
            index.firstSection +
            " " +
            index.grid +
            " frameBottomTop " +
            index.eightSection
          }
        >
          <div className={index.left}>
            <img
              src={
                pageFromCMS.eighth_section?.images[0]?.url
                  ? `${pageFromCMS.eighth_section?.images[0]?.url}`
                  : ""
              }
              alt={pageFromCMS.eighth_section?.images[0]?.alternativeText}
              className="responsiveImg"
            />
          </div>
          <div className={index.right + " " + index.verticalMargin}>
            <h2
              data-swiper-parallax="500"
              data-swiper-parallax-opacity="0"
              className="title"
            >
              {pageFromCMS.eighth_section?.title}
            </h2>
            <div className={index.addressBlock}>
              <address>
                <h3>{pageFromCMS.contact?.title}</h3>
                {pageFromCMS.contact?.street}
                <br />
                {pageFromCMS.contact?.city}
                <br />
                {pageFromCMS.contact?.t_number}
              </address>
              <div>
                <h3>{pageFromCMS.contact?.content}</h3>
                <span>{pageFromCMS.contact?.day}</span> <br />
                <time>{pageFromCMS?.contact?.time_from.slice(0, 5)}</time> -
                <time>{pageFromCMS.contact?.time_till.slice(0, 5)}</time>
              </div>
            </div>
            <motion.button
              className={`medium ${index.introButton}`}
              data-swiper-parallax="1100"
              data-swiper-parallax-opacity="0"
              // whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.9 }}
            >
              {pageFromCMS.eighth_section?.button.text}
            </motion.button>
          </div>
        </section>
      </Carousel>
    </Layout>
    // ) : (
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "space-evenly",
    //       textAlign: "center",
    //       backgroundImage: `url(${
    //         pageFromCMS.intro.pictures && pageFromCMS.intro.pictures[7]?.url
    //       })`,
    //     }}
    //   >
    //     <img src={`${navigation?.logo?.url}`} />
    //     <h2>
    //       Du bist der Erste der das Handy seitlich dreht. Dreh es mal wieder
    //       zurück bitte. <br />
    //       applepie Funktioniert nur hochkant.🙂
    //     </h2>
    //   </div>
  );
};
Page.getInitialProps = async (context: NextPageContext) => {
  let userAgent;
  if (context.req) {
    // if you are on the server and you get a 'req' property from your context
    userAgent = context.req.headers["user-agent"]; // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent; // if you are on the client you can access the navigator from the window object
  }
  let isMobile = Boolean(
    String(userAgent).match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  let response;
  let response1;
  if (context.query.lang === "de") {
    response = await client.query({ query: landing_de });
    response1 = await client.query({ query: navigation_de });
  } else {
    response = await client.query({ query: landing_en });
    response1 = await client.query({ query: navigation_en });
  }

  // const pageJSON = await res1.json();
  // console.log(json);
  console.log({ response });
  return {
    navigation: response1.data.navigation as NavType,
    pageFromCMS: response.data.homeDe as HomePage,
    isMobile,
  };
};
export default withTranslate(Page); // <- component is wrapped with a HOC
