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
  Button,
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
  legal_links_de,
  legal_links_en,
} from "../../queries/queries";
import { client } from "../_app";
import { useStoreActions } from "../../hooks";
import InteractiveForm from "../../components/InteractiveForm/InteractiveForm";
import { ORIENTATION } from "../../model/device";
import { Service } from "../../components/FormSlider/FormSlider";
import { LegalNavigation } from "../../components/Legal/LegalNavigation";
const Carousel = dynamic(() => import("../../components/Swiper/Swiper"), {
  ssr: true,
});
import SwiperCore from "swiper";
import ButtonOrLink from "../../components/ButtonOrLink/ButtonOrLink";
import LineSwiper from "../../components/AutoLineSwiper/LineSwiper";
import Popover from "@material-ui/core/Popover";
import GoogleMaps from "../../components/Gmap/Gmap";

const Page: NextPage<HomeProps> = (props) => {
  const { pageFromCMS, footer, services, legal } = props;
  const [activeServiceIndex, setIndex] = useState(0);
  const interactiveFormIsOpen = useStoreState(
    (state) => state.device.interactiveFormOpened
  );
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

  const setLegalOpened = useStoreActions(
    (actions) => actions.device.setLegalOpened
  );

  const activeCarouselIndex = useStoreState(
    (state) => state.swiper.activeIndex
  );

  const invertedSlides = useStoreState((state) => state.swiper.invertedSlides);
  const checkIfIsInverted = () => {
    return invertedSlides.some((e: any) => e === activeCarouselIndex);
  };

  const backgroundAnim = {
    on: {
      backgroundColor: "#2e2c41",
      transition: { duration: 0.3 },
    },
    off: { backgroundColor: "#fff", transition: { duration: 0.3 } },
  };
  const [swiper, setSwiper] = useState<SwiperCore | undefined>();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [openPopoverID, setOpenPopoverID] = useState<number | null>();
  const handlePopoverOpen = (popoverId: number) => (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenPopoverID(popoverId);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenPopoverID(null);
  };

  // IF for landscape mode
  return !props.isMobile ||
    (props.isMobile && orientation === ORIENTATION.portrait) ? (
    <Layout
      navigation={props.navigation}
      horizontalFooter
      legal={legal}
      footer={footer}
    >
      <h1 className="visuallyHidden">Applepie</h1>
      {interactiveFormIsOpen && <InteractiveForm />}
      {interactiveFormIsOpen && <LegalNavigation links={legal} />}
      <motion.button
        className={`button  ${index.legal}`}
        onClick={() => setLegalOpened(true)}
      >
        Legal
      </motion.button>
      <Carousel
        paginationObject={{
          pagination: pageFromCMS.pagination,
        }}
        isMobile={props.isMobile}
        swiper={swiper}
        setSwiper={setSwiper}
      >
        <section
          className={`flexColumns alignCenter ${index.intro}`}
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
                <div>
                  <h2
                    data-swiper-parallax="500"
                    data-swiper-parallax-opacity="0"
                  >
                    {pageFromCMS.intro.title}
                  </h2>
                  <h3
                    data-swiper-parallax="800"
                    data-swiper-parallax-opacity="0"
                    className={index.descriptionDesktop}
                  >
                    {pageFromCMS.intro.description}
                  </h3>
                  <ButtonOrLink
                    buttonType={pageFromCMS.buttons[0].type}
                    title={pageFromCMS.buttons[0].text}
                    button_type={pageFromCMS.buttons[0].button_type}
                    className={`medium button ${index.descriptionDesktop}`}
                  />
                </div>
                <img
                  src={`${
                    pageFromCMS.intro.pictures &&
                    pageFromCMS.intro.pictures[0]?.url
                  }`}
                  alt={
                    pageFromCMS.intro.pictures &&
                    pageFromCMS.intro.pictures[0]?.alternativeText
                  }
                  className={`${index.leftPie} ${index.leftPieDesktop}`}
                  data-swiper-parallax-opacity="0"
                />
                <img
                  src={`${
                    pageFromCMS.intro.pictures &&
                    pageFromCMS.intro.pictures[8]?.url
                  }`}
                  alt={
                    pageFromCMS.intro.pictures &&
                    pageFromCMS.intro.pictures[8]?.alternativeText
                  }
                  className={`${index.leftPie} ${index.leftPieMobile}`}
                  data-swiper-parallax-opacity="0"
                />
                <ButtonOrLink
                  buttonType={pageFromCMS.buttons[0].type}
                  title={pageFromCMS.buttons[0].text}
                  button_type={pageFromCMS.buttons[0].button_type}
                  className={`medium button ${index.buttonMobile}`}
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

              {deviceWidth >= 1390 ? (
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
              <LineSwiper>
                {pageFromCMS.third_section?.images
                  ?.filter((_v, i, arr) => i < arr.length / 2)
                  .map((img) => (
                    <div key={img.name} className={index.gridImage}>
                      <img src={`${img.url}`} alt={img.alternativeText} />
                    </div>
                  ))}
              </LineSwiper>
              <LineSwiper rtl>
                {pageFromCMS.third_section?.images
                  ?.filter((_v, i, arr) => i >= arr.length / 2)
                  .map((img) => (
                    <div key={img.name} className={index.gridImage}>
                      <img src={`${img.url}`} alt={img.alternativeText} />
                    </div>
                  ))}
              </LineSwiper>
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
                  <>
                    <div
                      key={card.title}
                      data-swiper-parallax={`${(ind + 1) * 70}`}
                      data-swiper-parallax-opacity="0"
                      aria-describedby={
                        Boolean(anchorEl) ? `pie-method${ind}` : undefined
                      }
                      style={
                        !props.isMobile
                          ? {
                              pointerEvents: "none",
                            }
                          : {}
                      }
                      onClick={handlePopoverOpen(ind)}
                    >
                      <div className={index.cardImage}>
                        <img
                          src={`${card.image?.url}`}
                          alt={card.image?.alternativeText}
                        />
                      </div>
                      <div className={index.content}>
                        <h3 className={"indieFlower"}>{card.title}</h3>
                        <p>{card.subtitle}</p>
                      </div>
                    </div>
                    <Popover
                      key={card.title + ind}
                      id={
                        openPopoverID === ind ? `pie-method${ind}` : undefined
                      }
                      open={openPopoverID === ind}
                      anchorEl={anchorEl}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <p className={index.popover}>{card.subtitle}</p>
                    </Popover>
                  </>
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
              <ButtonOrLink
                className="medium button"
                buttonType={pageFromCMS.forth_section.button.type}
                swiperSlideTo={pageFromCMS.forth_section.button.slideTo}
                title={pageFromCMS.forth_section.button.text}
                linkType={pageFromCMS.forth_section.button.link_type}
                functionOrUrl={pageFromCMS.forth_section.button.function}
                linkLanguage={Language[currentLanguage]}
                swiper={swiper}
                button_type={pageFromCMS.forth_section.button.button_type}
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
            {/* <img
              src={
              }
              alt={pageFromCMS.eighth_section?.images[0]?.alternativeText}
              className="responsiveImg"
            /> */}
            <GoogleMaps
              apiKey={String(process.env.GOOGLE_MAPS_API_KEY)}
              location={{ lat: 52.4819721, lng: 13.3450566 }}
              defaultZoom={8}
              maxZoom={20}
              frameImgUrl={
                pageFromCMS.eighth_section?.images[0]?.url
                  ? `${pageFromCMS.eighth_section?.images[0]?.url}`
                  : ""
              }
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
            <ButtonOrLink
              className={`button medium ${index.introButton}`}
              buttonType={pageFromCMS.eighth_section.button.type}
              swiperSlideTo={pageFromCMS.eighth_section.button.slideTo}
              title={pageFromCMS.eighth_section?.button.text}
              linkType={pageFromCMS.eighth_section.button.link_type}
              functionOrUrl={pageFromCMS.eighth_section.button.function}
              linkLanguage={Language[currentLanguage]}
              swiper={swiper}
              button_type={pageFromCMS.eighth_section.button.button_type}
            />
          </div>
        </motion.section>
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
  let responseLegal;

  if (context.query.lang === "de") {
    response = await client.query({ query: landing_de });
    response1 = await client.query({ query: navigation_de });
    response_footer = await client.query({ query: footer_de });
    responseServices = await client.query({ query: services_de });
    responseLegal = await client.query({ query: legal_links_de });
  } else {
    response = await client.query({ query: landing_en });
    response1 = await client.query({ query: navigation_en });
    response_footer = await client.query({ query: footer_en });
    responseServices = await client.query({ query: services_en });
    responseLegal = await client.query({ query: legal_links_en });
  }

  return {
    navigation: response1.data.navigation as NavType,
    pageFromCMS: response.data.homeDe as HomePage,
    footer: response_footer.data.footer as Footer,
    isMobile,
    services: responseServices.data.service.service as Service[],
    legal: responseLegal.data.legal.links as Button[],
  };
};

export default withTranslate(Page); // <- component is wrapped with a HOC
