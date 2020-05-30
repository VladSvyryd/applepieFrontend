import Head from "next/head";
import { LayoutProps } from "../../types/types";
import Navigation from "../Navigation/Navigation";
import layout from "./layout.module.scss";
import { useStoreState } from "../../hooks";

const Layout: React.FC<LayoutProps> = ({
  navigation,
  children,
  horizontalFooter = false,
  verticalFooter = false,
  social_links,
  known_by,
  known_by_title,
}) => {
  const layoutStyle = {
    width: "100%",
    height: "100%",
  };
  const activeCarouselIndex = useStoreState(
    (state) => state.swiper.activeIndex
  );
  const invertedSlides = useStoreState((state) => state.swiper.invertedSlides);
  return (
    <div style={layoutStyle}>
      <Head>
        <title>applepie Berlin</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navigation
          navigation={navigation}
          activeCarouselIndex={activeCarouselIndex}
          invertedSlides={invertedSlides}
        />
      </header>
      {children}
      {horizontalFooter && !verticalFooter ? (
        <footer className={`${horizontalFooter && "fixed"} `}>
          <div className="content-frame" style={{ height: "100%" }}>
            <h2 className="visuallyHidden">Applepie Footer</h2>
            <section
              className="flexColumns alignCenter"
              style={{ height: "100%" }}
            >
              <div className="smallitem ">
                <div className={`flexColumns alignCenter`}>
                  <span
                    className={`${layout?.horizontalSpan} ${
                      invertedSlides.some((e) => e === activeCarouselIndex)
                        ? "invertedTextColorBySlide"
                        : ""
                    }`}
                  >
                    {known_by_title}
                  </span>
                  <a href="" className={`${layout.horizontalSpan}`}>
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? known_by[0]?.image_alternative?.url
                          : known_by[0]?.image?.url
                      }`}
                      alt=""
                    />
                  </a>
                  <a href="" className={`${layout.horizontalSpan}`}>
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? known_by[1]?.image_alternative?.url
                          : known_by[1]?.image?.url
                      }`}
                      alt=""
                    />
                  </a>
                </div>
              </div>
              <div className="smallitem flexColumns flexEnd alignCenter">
                <div>
                  <a
                    href="https://www.instagram.com/?hl=de"
                    className={layout.linkWithBorder}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? social_links[0]?.image_alternative?.url
                          : social_links[0]?.image?.url
                      }`}
                      alt="instagram"
                      style={{ color: "white" }}
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    className={layout.linkWithBorder}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? social_links[1]?.image_alternative?.url
                          : social_links[1]?.image?.url
                      }`}
                      alt="facebook"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/?hl=de"
                    className={layout.linkWithBorder}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? social_links[2]?.image_alternative?.url
                          : social_links[2]?.image?.url
                      }`}
                      alt="linkedIn"
                    />
                  </a>
                  <a
                    href="https://slack.com/intl/en-de/?eu_nc=1"
                    className={layout.linkWithBorder}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? social_links[3]?.image_alternative?.url
                          : social_links[3]?.image?.url
                      }`}
                      alt="slack"
                    />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </footer>
      ) : null}
    </div>
  );
};

export default Layout;
