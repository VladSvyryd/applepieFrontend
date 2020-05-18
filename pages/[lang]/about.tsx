import Layout from "../../components/Layout/Layout";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";

const about: NextPage<any> = (props) => {
  return (
    <Layout navigation={props.navigation}>
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

  return {
    navigation: navigationJson,
    pageFromCMS: pageJSON,
  };
};
export default about;
