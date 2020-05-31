import Layout from "../../components/Layout/Layout";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";
import ReviewCarousel from "../../components/Review/ReviewCarousel";
import { AboutProps } from "../../types/types";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher2";

const about: NextPage<AboutProps> = (props) => {
  const { pageFromCMS } = props;

  return (
    <Layout
      navigation={props.navigation}
      {...props}
      horizontalFooter
      known_by={pageFromCMS.known_by}
      social_links={pageFromCMS.social_links}
      known_by_title={pageFromCMS.known_by_title}
    >
      <section
        className={true && `frameBottomTop`}
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          background: "black",
        }}
      >
        <ReviewCarousel
          reviews={[
            pageFromCMS.reviews[0],
            pageFromCMS.reviews[0],
            pageFromCMS.reviews[0],
          ]}
          img={pageFromCMS.sixth_section?.images[1]}
          buttonImg={pageFromCMS.sixth_section?.images[0]}
        />
        <LanguageSwitcher />
      </section>
    </Layout>
  );
};
about.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.BACKEND_STRAPI_CMS}/navigation`);

  const navigationJson = await res.json();
  const res1 = await fetch(
    `${process.env.BACKEND_STRAPI_CMS}/home-${ctx.query.lang}`
  );

  const pageJSON = await res1.json();
  // console.log(json);

  return {
    navigation: navigationJson,
    pageFromCMS: pageJSON,
  };
};
export default about;
