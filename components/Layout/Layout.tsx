import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { useStoreActions, useStoreState } from "../../hooks";

type LayoutProps = {
  title?: string;
  logo?: Logo;
  links_de?: [NavLink];
  language: Language;
  links_en?: [NavLink];
};
interface NavLink {
  name: string;
  url: string;
}
interface Logo {
  name: string;
  url: string;
}
const layoutStyle = {
  width: "100%",
  height: "100%",
  border: "1px solid #DDD",
};
enum Language {
  EN,
  DE,
}
const Layout: React.FC<LayoutProps> = ({
  logo,
  links_en,
  links_de,
  children,
}) => {
  // const router = useRouter();
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  // Pull out actions from our store
  const setCurrentLanguage = useStoreActions(
    (actions) => actions.language.setCurrentLanguage
  );

  const switchContextByLanguage = (
    firstLang: any,
    secLang: any,
    currentLanguage: Language
  ) => {
    let result = firstLang;
    switch (currentLanguage) {
      case Language.DE:
        result = firstLang;
        break;

      case Language.EN:
        result = secLang;
        break;

      default:
        result = firstLang;
        break;
    }
    return result;
  };
  const navigationStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };
  const navLink = {
    margin: "0 13px",
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLanguage(+event.target.value);
    switch (+event.target.value) {
      case 0:
        //router.push(router.pathname, `/en`);
        break;
      case 1:
        //router.push(router.pathname, "/de");
        break;
      default:
        break;
    }
  };

  return (
    <div style={layoutStyle}>
      <Head>
        <title>{"title"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav style={navigationStyle}>
          {logo && (
            <Link href={`/`}>
              <a>
                <img src={`http://localhost:1337${logo?.url}`} alt="" />
              </a>
            </Link>
          )}
          {currentLanguage}
          {switchContextByLanguage(links_de, links_en, currentLanguage)?.map(
            (l: NavLink) => (
              <Link key={l.url} href={`${l.url}`}>
                <a style={navLink}>{l.name}</a>
              </Link>
            )
          )}
          {
            <form>
              <label
                style={{
                  textDecoration: !currentLanguage ? `underline` : "none",
                }}
              >
                <input
                  type="radio"
                  value="0"
                  checked={currentLanguage === 0}
                  onChange={(e) => handleChange(e)}
                  style={{ display: "none" }}
                />
                EN
              </label>
              {" | "}
              <label
                style={{
                  textDecoration: currentLanguage ? `underline` : "none",
                }}
              >
                <input
                  type="radio"
                  value="1"
                  checked={currentLanguage === 1}
                  onChange={(e) => handleChange(e)}
                  style={{ display: "none" }}
                />
                DE
              </label>
            </form>
          }
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Layout;
