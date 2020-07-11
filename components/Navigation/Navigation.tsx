import React from "react";
import { useStoreState } from "../../hooks";
import Link from "next/link";
import { Language, NavLink, NavProps } from "../../types/types";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import nav from "./nav.module.scss";
import { MobileNavigation } from "../MobileNavigation/Navigation";

const Navigation: React.FC<NavProps> = (props) => {
  const {
    logo,
    links,
    logo_inverted,
    plane_inverted,
    plane,
  } = props.navigation;
  const { activeCarouselIndex, invertedSlides, social_links } = props;
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  return (
    <nav className={`${nav.navbar} flexColumns alignCenter content-frame `}>
      <div className={""}>
        {logo && (
          <Link href="/[lang]" as={`/${Language[currentLanguage]}`}>
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
        {links?.map((l: NavLink, index: number) => (
          <Link
            key={l.url + "nav"}
            href={`/[lang]${l.url}`}
            as={`/${Language[currentLanguage]}${l.url}`}
          >
            <a
              tabIndex={-1}
              className={`${nav.navLink} ${
                invertedSlides.some((s) => s === activeCarouselIndex)
                  ? "invertedTextColorBySlide invertedBorderColorBySlide"
                  : ""
              } ${nav.onlyDesktop}`}
            >
              {l.name}
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
        ))}
        <LanguageSwitcher className={nav.onlyDesktop} />
      </div>
      <MobileNavigation
        links={typeof links !== "undefined" ? links : []}
        social_links={social_links}
      />
    </nav>
  );
};

export default Navigation;
