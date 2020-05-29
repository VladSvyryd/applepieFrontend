import Layout from "../../components/Layout/Layout";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";
import ReviewCarousel from "../../components/Review/ReviewCarousel";
import Review from "../../components/Review/Review";
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
        }}
      >
        <ReviewCarousel>
          <Review />
          <Review />
          <Review />
          <Review />
        </ReviewCarousel>
        <LanguageSwitcher />
      </section>
    </Layout>
  );
};
about.getInitialProps = async () => {
  const res = await fetch("http://localhost:1337/navigation");
  const navigationJson = await res.json();
  const res1 = await fetch("http://localhost:1337/home-de");
  const pageJSON = await res1.json();
  // console.log(json);

  return {
    navigation: navigationJson,
    pageFromCMS: pageJSON,
  };
};
export default about;
