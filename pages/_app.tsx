import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../global_styles.scss";
import "swiper/swiper.scss";
import "react-datepicker/dist/react-datepicker.css";
import store from "../store";
import { StoreProvider } from "easy-peasy";
import { ApolloClient } from "apollo-client";
// import Loading from "../components/Loading/Loading";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import dynamic from "next/dynamic";
import Router from "next/router";
import { onError } from "apollo-link-error";
import NProgress from "nprogress";
Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
const DeviceWatcher = dynamic(
  () => import("../components/DeviceWatcher/DeviceWatcher"),
  {
    ssr: false,
  }
);
export const link = createHttpLink({
  uri: process.env.BACKEND_STRAPI_CMS,
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }: any) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, PAth: ${path}`
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(link),
  cache: new InMemoryCache(),
});
export default function MyApp({ Component, pageProps, router }: any) {
  return (
    <StoreProvider store={store}>
      <DeviceWatcher />
      <Component {...pageProps} key={router.route} />
      {/* <Loading /> */}
    </StoreProvider>
  );
}
