import "../global_styles.scss";
import "swiper/css/swiper.css";
import store from "../store";
import { StoreProvider } from "easy-peasy";
// import Loading from "../components/Loading/Loading";

export default function MyApp({ Component, pageProps, router }: any) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} key={router.route} />
      {/* <Loading /> */}
    </StoreProvider>
  );
}
