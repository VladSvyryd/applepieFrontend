import Layout from "../../components/Layout/Layout";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
// import ReviewCarousel from "../../components/Review/ReviewCarousel";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher2";
import { client } from "../_app";
import {
  landing_de,
  landing_en,
  navigation_de,
  navigation_en,
} from "../../queries/queries";
import { AboutProps, HomePage, NavType } from "../../types/types";
// import gql from "graphql-tag";

const about: NextPage<AboutProps> = (props) => {
  const { pageFromCMS } = props;
  console.log(pageFromCMS);
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
          background: "lightblue",
        }}
      >
        {/* <ReviewCarousel
          reviews={[
            pageFromCMS.reviews[0],
            pageFromCMS.reviews[0],
            pageFromCMS.reviews[0],
          ]}
          img={pageFromCMS.sixth_section?.images[1]}
          buttonImg={pageFromCMS.sixth_section?.images[0]}
        /> */}
        <LanguageSwitcher />
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
