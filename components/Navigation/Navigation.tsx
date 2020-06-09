import React from "react";
import { useStoreState, useStoreActions } from "../../hooks";
import Link from "next/link";
import { Language, NavLink, NavProps } from "../../types/types";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import nav from "./nav.module.scss";
import { getLanguage } from "../../util/translation/defineLanguage";

const Navigation: React.FC<NavProps> = (props) => {
  const {
    logo,
    links,
    logo_inverted,
    plane_inverted,
    plane,
  } = props.navigation;
  const { activeCarouselIndex, invertedSlides } = props;
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );

  const setCurrentLanguage = useStoreActions(
    (actions) => actions.language.setCurrentLanguage
  );
  React.useEffect(() => {
    const myLang = getLanguage();
    setCurrentLanguage(myLang);
    // window.location.replace(`/${Language[myLang]}`);
  }, []);
  const switchContextByLanguage = (
    firstLang: any,
    secLang: any,
    currentLanguage: Language
  ) => {
    let result = firstLang;
    switch (currentLanguage) {
      case Language.de:
        result = firstLang;
        break;
      case Language.en:
        result = secLang;
        break;
      default:
        result = firstLang;
        break;
    }
    return result;
  };

  return (
    <nav className={`${nav.navbar} flexColumns alignCenter content-frame`}>
      <div className={""}>
        {logo && (
          <Link href="/[lang]" as={`/${Language[currentLanguage]}`}>
            <img
              src={`${
                !invertedSlides.some((s) => s === activeCarouselIndex)
                  ? logo?.url
                  : logo_inverted?.url
              }`}
              className="withHover"
              alt={logo?.alternativeText}
            />
          </Link>
        )}
      </div>
      <div
        className={`alignCenter flexColumns flexEnd indieFlower ${nav.mobile}`}
      >
        {links?.map((l: NavLink, index: number) => (
          <Link
            key={l.url + "nav"}
            href={`/[lang]${l.url}`}
            as={`/${Language[currentLanguage]}${l.url}`}
          >
            <a
              className={`${nav.navLink} ${
                invertedSlides.some((s) => s === activeCarouselIndex)
                  ? "invertedTextColorBySlide invertedBorderColorBySlide"
                  : ""
              }`}
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
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navigation;
