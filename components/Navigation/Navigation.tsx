import React from "react";
import { useStoreState, useStoreActions } from "../../hooks";
import Link from "next/link";
import { Language, NavProps, Button } from "../../types/types";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import nav from "./nav.module.scss";
import { MobileNavigation } from "../MobileNavigation/Navigation";

const Navigation: React.FC<NavProps> = (props) => {
  const {
    logo,
    links,
    logo_inverted,
    plane,
    plane_inverted,
  } = props.navigation;
  const { activeCarouselIndex, invertedSlides, social_links } = props;
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  const setInterFormState = useStoreActions(
    (actions) => actions.device.setInterFormState
  );
  const width = useStoreState((state) => state.device.width);

  return (
    <nav className={`${nav.navbar} flexColumns alignCenter content-frame `}>
      <div className={""}>
        {logo && (
          <Link
            href={`/${Language[currentLanguage]}`}
            as={`/${Language[currentLanguage]}`}
          >
            <img
              src={`${
                !invertedSlides.some((s) => s === activeCarouselIndex)
                  ? logo?.url
                  : logo_inverted?.url
              }`}
              className={`withHover ${nav.logo}`}
              alt={logo?.alternativeText}
            />
          </Link>
        )}
      </div>
      <div
        className={`alignCenter flexColumns flexEnd indieFlower ${nav.linkSection} `}
      >
        {links?.map((l: Button, index: number) =>
          l.type === "LINK" ? (
            <Link
              key={l.text + "desk_nav"}
              as={`/${Language[currentLanguage]}${l.function}`}
              href={`/${Language[currentLanguage]}${l.function}`}
            >
              <a
                tabIndex={-1}
                className={`${nav.navLink} ${
                  invertedSlides.some((s) => s === activeCarouselIndex)
                    ? "invertedTextColorBySlide invertedBorderColorBySlide"
                    : ""
                } ${nav.onlyDesktop}`}
              >
                {l.text}
                {links && index === links?.length - 1 && (
                  <img
                    src={`${
                      !invertedSlides.some((s) => s === activeCarouselIndex)
                        ? plane?.url
                        : plane_inverted?.url
                    }`}
                    alt={plane?.alternativeText}
                    className={nav.plane}
                  />
                )}
              </a>
            </Link>
          ) : (
            <span
              key={l.text + "nav_button"}
              tabIndex={-1}
              className={`${nav.navLink} ${nav.planeLink} ${
                invertedSlides.some((s) => s === activeCarouselIndex)
                  ? "invertedTextColorBySlide invertedBorderColorBySlide"
                  : ""
              } ${nav.onlyDesktop}`}
              onClick={() => {
                !l.function && setInterFormState(true);
              }}
            >
              {l.text}
              {links && index === links?.length - 1 && (
                <img
                  src={`${
                    !invertedSlides.some((s) => s === activeCarouselIndex)
                      ? plane?.url
                      : plane_inverted?.url
                  }`}
                  alt={plane?.alternativeText}
                  className={nav.plane}
                />
              )}
            </span>
          )
        )}
        <LanguageSwitcher className={nav.onlyDesktop} />
      </div>
      {width <= 1400 && (
        <MobileNavigation
          links={typeof links !== "undefined" ? links : []}
          social_links={social_links}
        />
      )}
    </nav>
  );
};

export default Navigation;
