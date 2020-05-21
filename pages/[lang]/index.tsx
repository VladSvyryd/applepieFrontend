import { useEffect, useState } from "react";
import withTranslate from "../../components/HOC/withTranslate";
import Layout from "../../components/Layout/Layout";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { useStoreState } from "../../hooks";
import { HomeProps, Picture } from "../../types/types";
import Carousel from "../../components/Carousel/Carousel";
import index from "../../pageStyles/index.module.scss";
import { motion } from "framer-motion";

const Page: NextPage<HomeProps> = (props) => {
  const { pageFromCMS } = props;
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  const [activeServiceIndex, setIndex] = useState(0);

  useEffect(() => {
    console.log(props, currentLanguage);
  }, []);
  const handleServiceHover = (index: number) => {
    setIndex(index);
  };
  const handleServiceLeave = () => {
    setIndex(0);
  };
  const blts: Picture[] = [
    pageFromCMS.intro.pictures[9],
    pageFromCMS.intro.pictures[10],
    pageFromCMS.intro.pictures[11],
    pageFromCMS.intro.pictures[12],
    pageFromCMS.intro.pictures[13],
    pageFromCMS.intro.pictures[14],
    pageFromCMS.intro.pictures[15],
    pageFromCMS.intro.pictures[16],
    pageFromCMS.intro.pictures[17],
  ];
  return (
    <Layout navigation={props.navigation} {...props} horizontalFooter>
      <h1 className="visuallyHidden">Applepie</h1>
      <Carousel
        paginationObject={{
          picture: pageFromCMS.intro.pictures[8],
          bullets: blts,
        }}
      >
        <section
          className={`flexColumns alignCenter`}
          data-swiper-parallax="1500"
          style={{
            background: "#FBD8BB",
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
                <button
                  className={`medium ${index.introButton}`}
                  data-swiper-parallax="1100"
                  data-swiper-parallax-opacity="0"
                >
                  {pageFromCMS.buttons[0].text}
                </button>
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
        <div>Slide 2</div>
        <div>Slide 3</div>
        <div>Slide 4</div>
        <div>Slide 5</div>
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
