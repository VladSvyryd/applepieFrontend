import Head from "next/head";

import { LayoutProps, Language } from "../../types/types";
import Navigation from "../Navigation/Navigation";
import layout from "./layout.module.scss";
import { useStoreState } from "../../hooks";
import Link from "next/link";
import React from "react";

const Layout: React.FC<LayoutProps> = ({
  navigation,
  children,
  horizontalFooter = false,
  verticalFooter = false,
  simple_header = false,
  footer,
  meta,
  services,
}) => {
  const activeCarouselIndex = useStoreState(
    (state) => state.swiper.activeIndex
  );
  const invertedSlides = useStoreState((state) => state.swiper.invertedSlides);
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flex: "0 0 100%",
        flexDirection: "column",
      }}
      tabIndex={-1}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <title>{(meta && meta.title) || "applepie Berlin"}</title>
        <meta
          name="title"
          content={(meta && meta.title) || "applepie Berlin"}
        />
        <meta
          name="description"
          content={(meta && meta.description) || "applepie Berlin"}
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://applepie.berlin" />
        <meta
          property="og:title"
          content={(meta && meta.title) || "applepie Berlin"}
        />
        <meta
          property="og:description"
          content={(meta && meta.description) || "applepie Berlin"}
        />
        <meta
          property="og:image"
          content={(meta && meta.image?.image?.url) || ""}
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://applepie.berlin" />
        <meta
          property="twitter:title"
          content={(meta && meta.title) || "applepie Berlin"}
        />
        <meta
          property="twitter:description"
          content={(meta && meta.description) || "applepie Berlin"}
        />
        <meta
          property="twitter:image"
          content={(meta && meta.image?.image?.url) || ""}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MPKRV7F');`,
          }}
        />
        {/* End Google Tag Manager */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {!simple_header ? (
        <header className={`${layout.header}`}>
          <Navigation
            navigation={navigation}
            activeCarouselIndex={activeCarouselIndex}
            invertedSlides={invertedSlides}
            social_links={footer?.social_links}
            services={services}
          />
        </header>
      ) : (
        <header>
          <nav
            className={`${layout.navbar} ${layout.backgroundWhite}  flexColumns  alignCenter `}
          >
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
      {/* Google Tag Manager (noscript) */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MPKRV7F" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
      {/* End Google Tag Manager (noscript) */}
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
                  <span className={`${layout.horizontalSpan}`}>
                    <img
                      src={`${
                        invertedSlides.some((e) => e === activeCarouselIndex)
                          ? footer?.known_by[1]?.image_alternative?.url
                          : footer?.known_by[1]?.image?.url
                      }`}
                      alt=""
                    />
                  </span>
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
        <footer className={` ${layout.footer}`} style={{ marginTop: "auto" }}>
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

export default React.memo(Layout);
