import "../global_styles.css";
import store from "../store";
import { StoreProvider } from "easy-peasy";
import Loading from "../components/Loading/Loading";
export default function MyApp({ Component, pageProps, router }: any) {
  return (
    // <AnimatePresence exitBeforeEnter={true}>

    <StoreProvider store={store}>
      <Component {...pageProps} key={router.route} />
      <Loading />
    </StoreProvider>
    // </AnimatePresence>
  );
}
