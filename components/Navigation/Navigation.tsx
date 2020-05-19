import React from "react";
import { useStoreState } from "../../hooks";
import Link from "next/link";
import { Language, NavLink, NavProps } from "../../types/types";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import nav from "./nav.module.scss";

const Navigation: React.FC<NavProps> = (props) => {
  const { logo, links_en, links_de } = props.navigation;

  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );

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
      <div className={"smallitem"}>
        {logo && (
          <Link href="/[lang]" as={`/${Language[currentLanguage]}`}>
            <img
              src={`http://localhost:1337${logo?.url}`}
              className="withHover"
              alt={logo?.alternativeText}
            />
          </Link>
        )}
      </div>
      <div className={"smallitem alignCenter flexColumns flexEnd indieFlower"}>
        {switchContextByLanguage(links_de, links_en, currentLanguage)?.map(
          (l: NavLink) => (
            <Link
              key={l.url}
              href={`/[lang]${l.url}`}
              as={`/${Language[currentLanguage]}${l.url}`}
            >
              <a className={nav.navLink}>{l.name}</a>
            </Link>
          )
        )}
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navigation;
