import { useEffect } from "react";
import withTranslate from "../../components/HOC/withTranslate";
import Layout from "../../components/Layout/Layout";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { useStoreState } from "../../hooks";
import { HomeProps } from "../../types/types";
import Carousel from "../../components/Carousel/Carousel";
import index from "../../pageStyles/index.module.scss";

const Page: NextPage<HomeProps> = (props) => {
  const { pageFromCMS } = props;
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  useEffect(() => {
    console.log(props, currentLanguage);
  }, []);
  return (
    <Layout navigation={props.navigation} {...props} horizontalFooter>
      <h1 className="visuallyHidden">Applepie</h1>
      <Carousel>
        <section
          className="flexColumns alignCenter"
          data-swiper-parallax="1500"
        >
          <div className="smallitem responsiveSlide frameBottomTop">
            <div className="content-frame-leftHalf">
              <div className={index.introDescription}>
                <h2
                  data-swiper-parallax="1000"
                  data-swiper-parallax-opacity="0"
                >
                  {pageFromCMS.intro.title}
                </h2>
                <h3
                  data-swiper-parallax="1300"
                  data-swiper-parallax-opacity="0"
                >
                  {pageFromCMS.intro.description}
                </h3>
              </div>
            </div>
          </div>
          <div
            className="smallitem responsiveSlide frameBottomTop"
            style={{ background: "tomato" }}
          >
            <div className="content-frame-rightHalf">
              <ul>
                {pageFromCMS.services.map((service, i) => (
                  <li key={service.toString() + i}>
                    <a>{service.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <div>Slide 2</div>
        <div>Slide 3</div>
        <div>Slide 4</div>
        <div>Slide 5</div>
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
