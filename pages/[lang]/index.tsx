import { useState } from "react";
import withTranslate from "../../components/HOC/withTranslate";
import Layout from "../../components/Layout/Layout";
import { NextPage, NextPageContext } from "next";
import {
  HomeProps,
  NavType,
  HomePage,
  Language,
  Footer,
} from "../../types/types";
import index from "../../pageStyles/index.module.scss";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import SendForm from "../../components/Form/SendForm";
import dynamic from "next/dynamic";
import ReviewCarousel from "../../components/Review/ReviewCarousel";
import { useStoreState } from "easy-peasy";
import {
  landing_de,
  landing_en,
  navigation_de,
  navigation_en,
  footer_de,
  footer_en,
  services_de,
  services_en,
} from "../../queries/queries";
import { client } from "../_app";
import AutoLineSwiper from "../../components/AutoLineSwiper/AutoLineSwiper";
// import { ORIENTATION } from "../../model/device";
import MotionButton from "../../components/MotionButton/MotionButton";
import { useStoreActions } from "../../hooks";
import InteractiveForm from "../../components/InteractiveForm/InteractiveForm";
import { ORIENTATION } from "../../model/device";
import Link from "next/link";
import { Service } from "../../components/FormSlider/FormSlider";
const Carousel = dynamic(() => import("../../components/Carousel/Carousel"), {
  ssr: true,
});

const Page: NextPage<HomeProps> = (props) => {
  const { pageFromCMS, footer, services } = props;
  const [activeServiceIndex, setIndex] = useState(0);
  const handleServiceHover = (index: number) => {
    setIndex(index);
  };
  const handleServiceLeave = () => {
    setIndex(0);
  };

  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  const deviceWidth = useStoreState((state) => state.device.width);
  const orientation = useStoreState((state) => state.device.orientation);
  const setInterFormState = useStoreActions(
    (actions) => actions.device.setInterFormState
  );
  const activeCarouselIndex = useStoreState(
    (state) => state.swiper.activeIndex
  );
  const invertedSlides = useStoreState((state) => state.swiper.invertedSlides);
  const checkIfIsInverted = () => {
    console.log(
      "inverted: ",
      invertedSlides.some((e: any) => e === activeCarouselIndex)
    );
    return invertedSlides.some((e: any) => e === activeCarouselIndex);
  };

  const backgroundAnim = {
    on: {
      backgroundColor: "#2e2c41",
      transition: { duration: 0.3 },
    },
    off: { backgroundColor: "#fff", transition: { duration: 0.3 } },
  };
  // IF for landscape mode
  return !props.isMobile ||
    (props.isMobile && orientation === ORIENTATION.portrait) ? (
    <Layout navigation={props.navigation} horizontalFooter footer={footer}>
      <h1 className="visuallyHidden">Applepie</h1>
      <InteractiveForm />
      <Carousel
        paginationObject={{
          pagination: pageFromCMS.pagination,
        }}
        isMobile={props.isMobile}
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
                  className={`medium button ${index.introButton}`}
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
                  animate={{ rotate: `${(activeServiceIndex + 1) * 12}deg` }}
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
                  {services &&
                    services.map((service, i) => (
                      <li
                        onMouseOver={() => handleServiceHover(i)}
                        onMouseLeave={() => handleServiceLeave()}
                        key={"service_" + i}
                        data-swiper-parallax={-i * 100 + 500}
                        data-swiper-parallax-opacity="0"
                        data-middle={
                          i <= Math.floor(services.length / 2) && true
                        }
                        style={{
                          paddingLeft: `${
                            i <= Math.floor(services.length / 2) - 1
                              ? i * 15
                              : (services.length - i - 1) * 15
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
              <ReactMarkdown source={pageFromCMS.first_section?.content_text} />
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
              <ReactMarkdown
                source={pageFromCMS.second_section?.content_text}
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
        <motion.section
          className={index.thirdSection + " frameBottomTop"}
          animate={checkIfIsInverted() ? "on" : "off"}
          variants={backgroundAnim}
        >
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
        </motion.section>
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
                  <ReactMarkdown
                    source={pageFromCMS.forth_section?.button?.subtext}
                  />
                </div>
                <img
                  src={`${pageFromCMS.forth_section?.images[0]?.url}`}
                  alt={pageFromCMS.forth_section?.images[0]?.alternativeText}
                />
              </div>
              <motion.button
                className={`medium button`}
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
              <ReactMarkdown source={pageFromCMS.fifth_section?.content_text} />
            </div>
          </div>
        </section>
        <motion.section
          className={
            index.thirdSection + " frameBottomTop " + index.sixthSection
          }
          animate={checkIfIsInverted() ? "on" : "off"}
          variants={backgroundAnim}
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
        </motion.section>
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
        <motion.section
          className={
            index.firstSection +
            " " +
            index.grid +
            " frameBottomTop " +
            index.eightSection
          }
          animate={checkIfIsInverted() ? "on" : "off"}
          variants={backgroundAnim}
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
              className={`button medium ${index.introButton}`}
              data-swiper-parallax="1100"
              data-swiper-parallax-opacity="0"
              // whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.9 }}
            >
              {pageFromCMS.eighth_section?.button.text}
            </motion.button>
            <motion.button
              className={`button medium ${index.legal}`}
              // whileHover={{ scale: 0.9 }}
              onClick={() => null}
            >
              Legal
            </motion.button>
          </div>
        </motion.section>
        <section>
          <div className={index.last + " frameBottomTop"}>
            <ul className={index.ul}>
              <Link
                href={`/[lang]/agb`}
                as={`/${Language[currentLanguage]}/agb`}
              >
                <a className={index.li} tabIndex={-1}>
                  AGB
                </a>
              </Link>
              <Link
                href={`/[lang]/impressum`}
                as={`/${Language[currentLanguage]}/impressum`}
              >
                <a className={index.li} tabIndex={-1}>
                  Impressum
                </a>
              </Link>
              <Link
                href={`/[lang]/datenschutz`}
                as={`/${Language[currentLanguage]}/impressum`}
              >
                <a className={index.li} tabIndex={-1}>
                  Datenschutz
                </a>
              </Link>
            </ul>
          </div>
        </section>
      </Carousel>
    </Layout>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        textAlign: "center",
        backgroundImage: `url(${
          pageFromCMS.intro.pictures && pageFromCMS.intro.pictures[7]?.url
        })`,
      }}
    >
      <img src={`${props.navigation?.logo?.url}`} />
      <h2>
        Du bist der Erste der das Handy seitlich dreht. Dreh es mal wieder
        zurück bitte. <br />
        applepie Funktioniert nur hochkant.🙂
      </h2>
    </div>
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
  let response_footer;
  let responseServices;

  if (context.query.lang === "de") {
    response = await client.query({ query: landing_de });
    response1 = await client.query({ query: navigation_de });
    response_footer = await client.query({ query: footer_de });
    responseServices = await client.query({ query: services_de });
  } else {
    response = await client.query({ query: landing_en });
    response1 = await client.query({ query: navigation_en });
    response_footer = await client.query({ query: footer_en });
    responseServices = await client.query({ query: services_en });
  }

  return {
    navigation: response1.data.navigation as NavType,
    pageFromCMS: response.data.homeDe as HomePage,
    footer: response_footer.data.footer as Footer,
    isMobile,
    services: responseServices.data.service.service as Service[],
  };
};
export default withTranslate(Page); // <- component is wrapped with a HOC
