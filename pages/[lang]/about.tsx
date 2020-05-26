import Layout from "../../components/Layout/Layout";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";

const about: NextPage<any> = (props) => {
  return (
    <Layout navigation={props.navigation}>
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
        <h1 style={{ fontSize: "10em" }}>THIS IS ALL ABOUT</h1>
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
