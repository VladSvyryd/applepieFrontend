import { useEffect, useState } from "react";
import withTranslate from "../../components/HOC/withTranslate";
import Layout from "../../components/Layout/Layout";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { useStoreState } from "../../hooks";
import { HomeProps } from "../../types/types";
import Carousel from "../../components/Carousel/Carousel";
import index from "../../pageStyles/index.module.scss";
import { motion } from "framer-motion";
import MarkdownView from "react-showdown";
const Page: NextPage<HomeProps> = (props) => {
  const { pageFromCMS } = props;
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  const [activeServiceIndex, setIndex] = useState(0);

  useEffect(() => {
    console.log(props, currentLanguage);
    console.log(pageFromCMS.first_section.images[0].url);
  }, []);
  const handleServiceHover = (index: number) => {
    setIndex(index);
  };
  const handleServiceLeave = () => {
    setIndex(0);
  };

  const handleButtonClick = () => {
    console.log("push");
  };
  return (
    <Layout
      navigation={props.navigation}
      {...props}
      horizontalFooter
      known_by={pageFromCMS.known_by}
      social_links={pageFromCMS.social_links}
      known_by_title={pageFromCMS.known_by_title}
    >
      <h1 className="visuallyHidden">Applepie</h1>
      <Carousel
        paginationObject={{
          pagination: pageFromCMS.pagination,
          goToSlide: handleButtonClick(),
        }}
      >
        <section
          className={`flexColumns alignCenter`}
          data-swiper-parallax="1500"
          style={{
            backgroundImage: `url(http://localhost:1337${pageFromCMS.intro.pictures[18]?.url})`,
            backgroundSize: "contain",
          }}
        >
          <div
            className={`smallitem responsiveSlide frameBottomTop`}
            style={{
              backgroundImage: `url(http://localhost:1337${pageFromCMS.intro.pictures[4].url}), url(http://localhost:1337${pageFromCMS.intro.pictures[5].url}),url(http://localhost:1337${pageFromCMS.intro.pictures[3].url})`,
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
                <h3 data-swiper-parallax="800" data-swiper-parallax-opacity="0">
                  {pageFromCMS.intro.description}
                </h3>

                <img
                  src={`http://localhost:1337${pageFromCMS.intro.pictures[0].url}`}
                  alt={pageFromCMS.intro.pictures[0].alternativeText}
                  className={index.leftPie}
                  style={{
                    marginTop: `-${pageFromCMS.intro.pictures[0].height / 2}px`,
                  }}
                  data-swiper-parallax-opacity="0"
                />
                <motion.button
                  className={`medium ${index.introButton}`}
                  data-swiper-parallax="1100"
                  data-swiper-parallax-opacity="0"
                  // whileHover={{ scale: 0.9 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleButtonClick()}
                >
                  {pageFromCMS.buttons[0].text}
                </motion.button>
              </div>
            </div>
          </div>
          <div
            className="smallitem responsiveSlide frameBottomTop"
            style={{ background: "tomato" }}
          >
            <div
              className={`content-frame-rightHalf ${index.height100} ${index.rightSection}`}
            >
              <img
                src={`http://localhost:1337${pageFromCMS.intro.pictures[1].url}`}
                alt={pageFromCMS.intro.pictures[1].alternativeText}
                className={index.rightPie}
                style={{
                  marginTop: `-${pageFromCMS.intro.pictures[1].height / 2}px`,
                }}
                data-swiper-parallax-opacity="0"
              />

              <motion.img
                animate={{ rotate: `${activeServiceIndex * 12}deg` }}
                src={`http://localhost:1337${pageFromCMS.intro.pictures[6].url}`}
                alt={pageFromCMS.intro.pictures[6].alternativeText}
                className={index.orbit}
                style={{
                  marginTop: `-${pageFromCMS.intro.pictures[6].height / 2}px`,
                  left: `-${pageFromCMS.intro.pictures[6].width / 2}px`,
                }}
                data-swiper-parallax-opacity="0"
                transition={{ type: "spring", damping: 300 }}
              />
              <div
                className={`${index.introServices} + ${index.verticalMargin}`}
              >
                <ul className={`${index.introServicesList} indieFlower`}>
                  {pageFromCMS.services.map((service, i) => (
                    <li
                      onMouseOver={() => handleServiceHover(i)}
                      onMouseLeave={() => handleServiceLeave()}
                      key={service.toString() + i}
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
              src={`http://localhost:1337${pageFromCMS.first_section.images[0]?.url}`}
              alt={pageFromCMS.first_section.images[0]?.alternativeText}
            />
          </div>
          <div className={index.right + " " + index.verticalMargin}>
            <h2
              data-swiper-parallax="500"
              data-swiper-parallax-opacity="0"
              className="title"
            >
              {pageFromCMS.first_section.title}
            </h2>
            <div className={index.ul}>
              <MarkdownView
                markdown={pageFromCMS.first_section.content_text}
                options={{ tables: true, emoji: true }}
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
              {pageFromCMS.second_section.title}
            </h2>
            <div className={index.ul}>
              <MarkdownView
                markdown={pageFromCMS.second_section.content_text}
                options={{ tables: true, emoji: true }}
              />
            </div>
          </div>
          <div className={index.right}>
            <img
              src={`http://localhost:1337${pageFromCMS.second_section.images[0].url}`}
              alt={pageFromCMS.second_section.images[0].alternativeText}
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
              {pageFromCMS.third_section.title}
            </h2>
            <div className={index.imagesGrid}>
              {pageFromCMS.third_section.images.map((img) => (
                <div key={img.name}>
                  <img
                    src={`http://localhost:1337${img.url}`}
                    alt={img.alternativeText}
                  />
                </div>
              ))}
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
                {pageFromCMS.forth_section.title}
              </h2>
              <h3
                className="indieFlower"
                data-swiper-parallax="700"
                data-swiper-parallax-opacity="0"
              >
                {pageFromCMS.forth_section.content_text}
              </h3>
            </div>
            <div className={index.cardsGrid}>
              {pageFromCMS.forth_section.cards.map((card) => (
                <div key={card.title}>
                  <img
                    src={`http://localhost:1337${card.image.url}`}
                    alt={card.image.alternativeText}
                  />
                  <div className={index.content}>
                    <h3 className={index.title + " indieFlower"}>
                      {card.title}
                    </h3>
                    <p>{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={index.footer}>
              <div className={index.zebra + " indieFlower"}>
                <MarkdownView
                  markdown={pageFromCMS.forth_section.button.subtext}
                  options={{ tables: true, emoji: true }}
                />
              </div>
              <img
                src={`http://localhost:1337${pageFromCMS.forth_section.images[0].url}`}
                alt={pageFromCMS.forth_section.images[0].alternativeText}
              />
              <motion.button
                className={`medium ${index.start_button}`}
                data-swiper-parallax="1100"
                data-swiper-parallax-opacity="0"
                // whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleButtonClick()}
              >
                {pageFromCMS.forth_section.button.text}
              </motion.button>
            </div>
          </div>
        </section>
        <div>Slide 6</div>
        <div>Slide 7</div>
        <div>Slide 8</div>
        <div>Slide 9</div>
      </Carousel>
    </Layout>
  );
};
Page.getInitialProps = async (ctx) => {
  const res = await fetch("http://localhost:1337/navigation");
  const navigationJson = await res.json();
  const res1 = await fetch(`http://localhost:1337/home-${ctx.query.lang}`);
  const pageJSON = await res1.json();
  // console.log(json);

  return {
    navigation: navigationJson,
    pageFromCMS: pageJSON,
  };
};
export default withTranslate(Page); // <- component is wrapped with a HOC
