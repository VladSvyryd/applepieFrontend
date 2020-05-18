import Head from "next/head";
import { LayoutProps } from "../../types/types";
import Navigation from "../Navigation/Navigation";
import layout from "./layout.module.scss";

const Layout: React.FC<LayoutProps> = ({
  navigation,
  children,
  horizontalFooter = false,
  verticalFooter = false,
}) => {
  const layoutStyle = {
    width: "100%",
    height: "100%",
  };
  return (
    <div style={layoutStyle}>
      <Head>
        <title>applepie Berlin</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navigation navigation={navigation} />
      </header>
      {children}
      {horizontalFooter && !verticalFooter ? (
        <footer className={`${horizontalFooter && "fixed"} `}>
          <div className="content-frame">
            <h2 className="visuallyHidden">Applepie Footer</h2>
            <section className="flexColumns alignCenter">
              <div className="smallitem ">
                <div className={`flexColumns alignCenter`}>
                  <span className={`${layout.horizontalSpan}`}>Known by</span>
                  <a href="" className={`${layout.horizontalSpan}`}>
                    <img
                      src={`http://localhost:1337/uploads/berlin_morgenpost_d360b8d077.png`}
                      alt=""
                    />
                  </a>
                  <a href="" className={`${layout.horizontalSpan}`}>
                    <img
                      src={`http://localhost:1337/uploads/award_icon_e3f50ba67b.png`}
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
                      src={
                        "http://localhost:1337/uploads/instagram_tiny_f53a77c1d6.svg"
                      }
                      alt="instagram"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    className={layout.linkWithBorder}
                  >
                    <img
                      src={
                        "http://localhost:1337/uploads/facebook_tiny_e6b94c53df.svg"
                      }
                      alt="facebook"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/?hl=de"
                    className={layout.linkWithBorder}
                  >
                    <img
                      src={
                        "http://localhost:1337/uploads/linkedIn_tiny_21f8889b76.svg"
                      }
                      alt="linkedIn"
                    />
                  </a>
                  <a
                    href="https://slack.com/intl/en-de/?eu_nc=1"
                    className={layout.linkWithBorder}
                  >
                    <img
                      src={
                        "http://localhost:1337/uploads/Group_49_ed1d317067.svg"
                      }
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
