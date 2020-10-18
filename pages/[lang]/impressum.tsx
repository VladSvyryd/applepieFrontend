import React from "react";
import styles from "../../pageStyles/agb.module.scss";
import Layout from "../../components/Layout/Layout";
import withTranslate from "../../components/HOC/withTranslate";
import { client } from "../_app";
import { NextPageContext, NextPage } from "next";
import {
  navigation_en,
  navigation_de,
  footer_de,
  footer_en,
  legal_links_with_text_de,
  legal_links_with_text_en,
} from "../../queries/queries";
import { NavType, Footer, Button } from "../../types/types";
import ReactMarkdown from "react-markdown";

const Impressum: NextPage<any> = (props) => {
  return (
    <Layout
      navigation={props.navigation}
      verticalFooter={true}
      simple_header
      footer={props.footer}
    >
      <div className={`${styles.section}`}>
        <ReactMarkdown source={props.legal?.subtext} />
      </div>
    </Layout>
  );
};

Impressum.getInitialProps = async (context: NextPageContext) => {
  let userAgent;
  if (context.req) {
    // if you are on the server and you get a 'req' property from your context
    userAgent = context.req.headers["user-agent"]; // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent; // if you are on the client you can access the navigator from the window object
  }
  let isMobile = Boolean(
    String(userAgent).match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  let response1;
  let response_footer;
  let response_legal;

  if (context.query.lang === "de") {
    response1 = await client.query({ query: navigation_de });
    response_footer = await client.query({ query: footer_de });
    response_legal = await client.query({ query: legal_links_with_text_de });
  } else {
    response1 = await client.query({ query: navigation_en });
    response_footer = await client.query({ query: footer_en });
    response_legal = await client.query({ query: legal_links_with_text_en });
  }

  return {
    navigation: response1.data.navigation as NavType,
    footer: response_footer.data.footer as Footer,
    legal: response_legal.data.legal.links[1] as Button,

    isMobile,
  };
};
export default withTranslate(Impressum);
