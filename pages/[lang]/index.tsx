import { useState, Fragment } from "react";
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
// import { ORIENTATION } from "../../model/device";
import { Service } from "../../components/FormSlider/FormSlider";
import { LegalNavigation } from "../../components/Legal/LegalNavigation";
const Carousel = dynamic(() => import("../../components/Swiper/Swiper"), {
  ssr: true,
});
import SwiperCore from "swiper";
import ButtonOrLink from "../../components/ButtonOrLink/ButtonOrLink";
import LineSwiper from "../../components/AutoLineSwiper/LineSwiper";
import Popover from "@material-ui/core/Popover";
import { ButtonBase } from "@material-ui/core";
const GoogleMaps = dynamic(() => import("../../components/Gmap/Gmap"), {
  ssr: false,
});

const Page: NextPage<HomeProps> = (props) => {
  const { pageFromCMS, footer, services, legal } = props;
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
  // const orientation = useStoreState((state) => state.device.orientation);

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
  console.log({pageFromCMS})
  // IF for landscape mode
  //  return !props.isMobile ||
  //     (props.isMobile && orientation === ORIENTATION.portrait) ? (
  return (
    <Layout
      navigation={props.navigation}
      horizontalFooter
      footer={footer}
      meta={pageFromCMS.meta}
      services={services}
    >
      <h1 className="visuallyHidden">Applepie</h1>
      <InteractiveForm />
      {activeCarouselIndex == 8 && <LegalNavigation links={legal} />}
      {activeCarouselIndex == 8 && (
        <motion.button
          className={`button  ${index.legal}`}
          onClick={() => setLegalOpened(true)}
          initial={{ x: +100, rotate: -90 }}
          animate={{ x: 0, rotate: -90 }}
        >
          Legal
        </motion.button>
      )}
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
                    swiper={swiper}
                    swiperSlideTo={pageFromCMS.buttons[0].slideTo}
                    linkType={pageFromCMS.buttons[0].link_type}
                    functionOrUrl={pageFromCMS.buttons[0].function}
                    linkLanguage={Language[currentLanguage]}

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
                  swiperSlideTo={pageFromCMS.buttons[0].slideTo}
                  linkType={pageFromCMS.buttons[0].link_type}
                  functionOrUrl={pageFromCMS.buttons[0].function}
                  linkLanguage={Language[currentLanguage]}
                  swiper={swiper}
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
              <div
                className={`${index.introServices} + ${index.verticalMargin}`}
              >
                <ul className={`${index.introServicesList} `}>
                  {services &&
                    services.map((service, ind) => (
                      <Fragment key={"service-fragment" + ind}>
                        <span
                          onClick={handlePopoverOpen(ind)}
                          onMouseOver={() => handleServiceHover(ind)}
                          onMouseLeave={() => handleServiceLeave()}
                          style={{
                            marginLeft: `${
                              ind <= Math.floor(services.length / 2) - 1
                                ? ind * 15
                                : (services.length - ind - 1) * 15
                            }px`,
                            borderRadius: 8,
                          }}
                        >
                          <div
                            data-swiper-parallax={`${(ind + 1) * 70}`}
                            data-swiper-parallax-opacity="0"
                            aria-describedby={
                              Boolean(anchorEl)
                                ? `service-home-${ind}`
                                : undefined
                            }
                            className={`${index.tooltip} indieFlower`}
                            style={{
                              pointerEvents: "none",
                            }}
                          >
                            {service.name}
                          </div>
                        </span>
                        <Popover
                          id={
                            openPopoverID === ind
                              ? `service-home-${ind}`
                              : undefined
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
                          <div style={{ padding: "0 13px", maxWidth: 350 }}>
                            <p>{service.description}</p>
                          </div>
                        </Popover>
                      </Fragment>
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
                  .map((img, ind) => (
                    <div
                      key={"autoSlide-1-" + img.name + ind}
                      className={index.gridImage}
                    >
                      <img src={`${img.url}`} alt={img.alternativeText} />
                    </div>
                  ))}
              </LineSwiper>
              <LineSwiper rtl>
                {pageFromCMS.third_section?.images
                  ?.filter((_v, i, arr) => i >= arr.length / 2)
                  .map((img, ind) => (
                    <div
                      key={"autoSlide-2-" + ind + img.name}
                      className={index.gridImage}
                    >
                      <img src={`${img.url}`} alt={img.alternativeText} />
                    </div>
                  ))}
              </LineSwiper>
            </div>
          </div>
        </motion.section>
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
                  <Fragment key={"test" + ind + 50}>
                    <ButtonBase
                      className={index.toolbar}
                      disabled={!props.isMobile ? true : false}
                    >
                      <div
                        key={"card_" + card.title}
                        data-swiper-parallax={`${ind * 70}`}
                        data-swiper-parallax-opacity="0"
                        aria-describedby={
                          Boolean(anchorEl)
                            ? `pie-method${ind + 50}`
                            : undefined
                        }
                        className={index.card}
                        style={
                          !props.isMobile
                            ? {
                                pointerEvents: "none",
                              }
                            : {}
                        }
                        onClick={handlePopoverOpen(ind + 50)}
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
                    </ButtonBase>
                    <Popover
                      key={"card-popover" + card.title + ind + 50}
                      id={
                        openPopoverID === ind + 50
                          ? `pie-method${ind + 50}`
                          : undefined
                      }
                      open={openPopoverID === ind + 50}
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
                  </Fragment>
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
            <GoogleMaps
              apiKey={String(process.env.GOOGLE_MAPS_API_KEY)}
              location={{
                lat: pageFromCMS.contact.lat || 52.4819721,
                lng: pageFromCMS.contact.lng || 13.3450566,
              }}
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
                <a style={{color:"white"}} href={`tel:${pageFromCMS.contact?.t_number}`}>{pageFromCMS.contact?.t_number}</a>
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
  );
  //   ) : (
  //     <div
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "space-evenly",
  //         textAlign: "center",
  //         backgroundImage: `url(${
  //           pageFromCMS.intro.pictures && pageFromCMS.intro.pictures[7]?.url
  //         })`,
  //       }}
  //     >
  //       <img src={`${props.navigation?.logo?.url}`} />
  //       <h2>
  //         Du bist der Erste der das Handy seitlich dreht. Dreh es mal wieder
  //         zurück bitte. <br />
  //         applepie Funktioniert nur hochkant.🙂
  //       </h2>
  //     </div>
  //   );
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
