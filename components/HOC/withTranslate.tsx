import React from "react";
import { NextPage, NextPageContext } from "next";
import Error from "next/error";
import { Language } from "../../types/types";

export default (WrappedPage: NextPage<any>) => {
  const WithLocale: NextPage<any> = ({ locale, ...pageProps }) => {
    // Pull out actions from our store
    if (!locale) {
      // no valid locale detected
      return <Error statusCode={404} />;
    }

    return <WrappedPage {...pageProps} />;
  };

  WithLocale.getInitialProps = async (ctx: NextPageContext) => {
    // retrieve initial props of the wrapped component
    let pageProps = {};
    if (WrappedPage.getInitialProps) {
      pageProps = await WrappedPage.getInitialProps(ctx);
    }
    if (
      typeof ctx.query.lang !== "string" ||
      !Object.keys(Language).some((l) => l === ctx.query.lang)
    ) {
      // in case the value of 'lang' is not a valid locale return it as undefined
      return { ...pageProps, locale: undefined };
    }

    // the locale is valid
    return { ...pageProps, locale: ctx.query.lang };
  };

  return WithLocale;
};
