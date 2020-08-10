import Head from "next/head";
import { LayoutProps, Language } from "../../types/types";
import Navigation from "../Navigation/Navigation";
import layout from "./layout.module.scss";
import { useStoreState } from "../../hooks";
// import { useRouter } from "next/router";
import Link from "next/link";

const Layout: React.FC<LayoutProps> = ({
  navigation,
  children,
  horizontalFooter = false,
  verticalFooter = false,
  simple_header = false,
  footer,
}) => {
  // const router = useRouter();
  const layoutStyle = {
    width: "100%",
    height: "100%",
  };
  const activeCarouselIndex = useStoreState(
    (state) => state.swiper.activeIndex
  );
  const invertedSlides = useStoreState((state) => state.swiper.invertedSlides);
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  // const headerBackground = () => {
  //   console.log();
  //   const url = router.pathname.split("/").pop();
  //   if (url === "agb" || url === "datenschutz" || url === "impressum")
  //     return true;
  //   return false;
  // };
  console.log({ footer });
  return (
    <div style={layoutStyle} tabIndex={-1}>
      <Head>
        <title>applepie Berlin</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {!simple_header ? (
        <header className={`${layout.header}`}>
          <Navigation
            navigation={navigation}
            activeCarouselIndex={activeCarouselIndex}
            invertedSlides={invertedSlides}
            social_links={footer?.social_links}
          />
        </header>
      ) : (
        <header className={layout.backgroundWhite}>
          <nav className={`${layout.navbar}  flexColumns  alignCenter `}>
            <Link href="/[lang]" as={`/${Language[currentLanguage]}`}>
              <img
                src={`${navigation.logo?.url}`}
                className={`withHover ${layout.logo}`}
                alt={navigation.logo?.alternativeText}
              />
            </Link>
          </nav>
        </header>
      )}
      {children}
      {horizontalFooter && !verticalFooter ? (
        <footer className={`${horizontalFooter && "fixed"} ${layout.footer}`}>
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
                    {footer?.known_by[0].name}
                  </span>
                  <a
                    href=""
                    className={`${layout.horizontalSpan}`}
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.known_by[1]?.image_alternative?.url
                          : footer?.known_by[1]?.image?.url
                      }`}
                      alt=""
                    />
                  </a>
                  <a
                    href=""
                    className={`${layout.horizontalSpan}`}
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.known_by[2]?.image_alternative?.url
                          : footer?.known_by[2]?.image?.url
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
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.social_links[0]?.image_alternative?.url
                          : footer?.social_links[0]?.image?.url
                      }`}
                      alt="instagram"
                      style={{ color: "white" }}
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    className={layout.linkWithBorder}
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.social_links[1]?.image_alternative?.url
                          : footer?.social_links[1]?.image?.url
                      }`}
                      alt="facebook"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/?hl=de"
                    className={layout.linkWithBorder}
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.social_links[2]?.image_alternative?.url
                          : footer?.social_links[2]?.image?.url
                      }`}
                      alt="linkedIn"
                    />
                  </a>
                  <a
                    href="https://slack.com/intl/en-de/?eu_nc=1"
                    className={layout.linkWithBorder}
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.social_links[3]?.image_alternative?.url
                          : footer?.social_links[3]?.image?.url
                      }`}
                      alt="slack"
                    />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </footer>
      ) : (
        <footer className={` ${layout.footer}`}>
          <div className={`content-frame  ${layout.footerContainer}`}>
            <h2 className="visuallyHidden">Applepie Footer</h2>
            <section className="flexColumns alignCenter">
              <div className="smallitem ">
                <div className={`flexColumns alignCenter`}>
                  <span
                    className={`${layout?.horizontalSpan} ${
                      invertedSlides.some((e) => e === activeCarouselIndex)
                        ? "invertedTextColorBySlide"
                        : ""
                    }`}
                  >
                    {footer?.known_by[0].name}
                  </span>
                  <a
                    href=""
                    className={`${layout.horizontalSpan}`}
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.known_by[1]?.image_alternative?.url
                          : footer?.known_by[1]?.image?.url
                      }`}
                      alt=""
                    />
                  </a>
                  <a
                    href=""
                    className={`${layout.horizontalSpan}`}
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.known_by[2]?.image_alternative?.url
                          : footer?.known_by[2]?.image?.url
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
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.social_links[0]?.image_alternative?.url
                          : footer?.social_links[0]?.image?.url
                      }`}
                      alt="instagram"
                      style={{ color: "white" }}
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    className={layout.linkWithBorder}
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.social_links[1]?.image_alternative?.url
                          : footer?.social_links[1]?.image?.url
                      }`}
                      alt="facebook"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/?hl=de"
                    className={layout.linkWithBorder}
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.social_links[2]?.image_alternative?.url
                          : footer?.social_links[2]?.image?.url
                      }`}
                      alt="linkedIn"
                    />
                  </a>
                  <a
                    href="https://slack.com/intl/en-de/?eu_nc=1"
                    className={layout.linkWithBorder}
                    tabIndex={-1}
                  >
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.social_links[3]?.image_alternative?.url
                          : footer?.social_links[3]?.image?.url
                      }`}
                      alt="slack"
                    />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
