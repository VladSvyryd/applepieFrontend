import "../global_styles.scss";
import "swiper/css/swiper.css";
import store from "../store";
import { StoreProvider } from "easy-peasy";
import { ApolloClient } from "apollo-client";
// import Loading from "../components/Loading/Loading";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
export const link = createHttpLink({
  uri: process.env.BACKEND_STRAPI_CMS,
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
export default function MyApp({ Component, pageProps, router }: any) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} key={router.route} />
      {/* <Loading /> */}
    </StoreProvider>
  );
}
