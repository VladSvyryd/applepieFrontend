import Layout from "../../components/Layout/Layout";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
// import ReviewCarousel from "../../components/Review/ReviewCarousel";
// import { LanguageSwitcher } from "../../components/LanguageSwitcher/LanguageSwitcher";
import { client } from "../_app";
import {
  landing_de,
  landing_en,
  navigation_de,
  navigation_en,
} from "../../queries/queries";
import { AboutProps, HomePage, NavType } from "../../types/types";
import AutoLineSwiper from "../../components/AutoLineSwiper/AutoLineSwiper";
import aboutStyles from "../../pageStyles/about.module.scss";

const about: NextPage<AboutProps> = (props) => {
  const { pageFromCMS } = props;
  console.log(pageFromCMS);

  return (
    <Layout
      navigation={props.navigation}
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "lightblue",
        }}
      >
        <AutoLineSwiper>
          <div className={aboutStyles.card}>
            <img src="https://applepie-strapi.s3.eu-central-1.amazonaws.com/Cola_1b99714759.svg" />
          </div>
          <div className={aboutStyles.card}>
            <img src="https://applepie-strapi.s3.eu-central-1.amazonaws.com/reply_7131e40200.svg" />
          </div>
          <div className={aboutStyles.card}>
            <img src="https://applepie-strapi.s3.eu-central-1.amazonaws.com/entre_les_lignes_4195a29300.svg" />
          </div>
          <div className={aboutStyles.card}>
            <img src="https://applepie-strapi.s3.eu-central-1.amazonaws.com/cierra_482ba7715b.svg" />
          </div>
          <div className={aboutStyles.card}>
            <img src="https://applepie-strapi.s3.eu-central-1.amazonaws.com/Delabuu_6b68e56b54.svg" />
          </div>
        </AutoLineSwiper>
        <AutoLineSwiper rtl="rtl">
          <div className={aboutStyles.card}>
            <img src="https://applepie-strapi.s3.eu-central-1.amazonaws.com/reply_7131e40200.svg" />
          </div>

          <div className={aboutStyles.card}>
            <img src="https://applepie-strapi.s3.eu-central-1.amazonaws.com/cierra_482ba7715b.svg" />
          </div>
          <div className={aboutStyles.card}>
            <img src="https://applepie-strapi.s3.eu-central-1.amazonaws.com/Cola_1b99714759.svg" />
          </div>
          <div className={aboutStyles.card}>
            <img src="https://applepie-strapi.s3.eu-central-1.amazonaws.com/Delabuu_6b68e56b54.svg" />
          </div>
          <div className={aboutStyles.card}>
            <img src="https://applepie-strapi.s3.eu-central-1.amazonaws.com/entre_les_lignes_4195a29300.svg" />
          </div>
        </AutoLineSwiper>
      </section>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // const res = await fetch(`${process.env.BACKEND_STRAPI_CMS}/navigation`);

  // const navigationJson = await res.json();
  // const res1 = await fetch(
  //   `${process.env.BACKEND_STRAPI_CMS}/home-${ctx.query.lang}`
  // );
  let response;
  let response1;
  if (context.query.lang === "de") {
    response = await client.query({ query: landing_de });
    response1 = await client.query({ query: navigation_de });
  } else {
    response = await client.query({ query: landing_en });
    response1 = await client.query({ query: navigation_en });
  }

  // const pageJSON = await res1.json();
  // console.log(json);
  console.log({ response });
  return {
    props: {
      navigation: response1.data.navigation as NavType,
      pageFromCMS: response.data.homeDe as HomePage,
    },
  };
};
export default about;
