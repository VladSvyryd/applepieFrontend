import Layout from "../components/Layout/Layout";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";

const about: NextPage<any> = (props) => {
  return (
    <Layout
      title={props.navigation.title}
      logo={props.navigation.logo}
      links_de={props.navigation.links_de}
      links_en={props.navigation.links_en}
      language={props.navigation.language}
    >
      <div>ABOUT US</div>;
    </Layout>
  );
};
about.getInitialProps = async () => {
  const res = await fetch("http://localhost:1337/navigation");
  const navigationJson = await res.json();
  const res1 = await fetch("http://localhost:1337/home-de");
  const pageJSON = await res1.json();
  // console.log(json);
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return {
    navigation: navigationJson,
    pageFromCMS: pageJSON,
  };
};
export default about;
