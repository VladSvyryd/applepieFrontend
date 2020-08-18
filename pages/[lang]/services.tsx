import withTranslate from "../../components/HOC/withTranslate";
import Layout from "../../components/Layout/Layout";
import { NextPage, NextPageContext } from "next";
import { NavType, Footer } from "../../types/types";
import { useStoreState } from "easy-peasy";
import {
  navigation_de,
  navigation_en,
  footer_de,
  footer_en,
} from "../../queries/queries";
import { client } from "../_app";
import { ORIENTATION } from "../../model/device";
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import styles from "../../pageStyles/service.module.scss";

type ServicesProps = {
  navigation: NavType;
  footer: Footer;
  isMobile: boolean;
};
const Services: NextPage<ServicesProps> = (props) => {
  const { navigation, footer } = props;

  const orientation = useStoreState((state) => state.device.orientation);

  // IF for landscape mode
  return !props.isMobile ||
    (props.isMobile && orientation === ORIENTATION.portrait) ? (
    <Layout navigation={navigation} verticalFooter footer={footer}>
      <h1 className="visuallyHidden">Applepie</h1>
      <div className={`${styles.container} ${styles.frame}`}>
        <Grid container spacing={2}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
            <Grid key={value} item>
              <Card className={styles.root}>
                <CardActionArea>
                  <CardHeader
                    disableTypography
                    title={<span>Social Media</span>}
                    subheader={
                      <span>
                        <i>time</i> "2min"
                      </span>
                    }
                  />
                  <CardMedia
                    image={navigation.plane?.url}
                    title="Contemplative Reptile"
                    className={styles.media}
                  />
                  <CardContent>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        textAlign: "center",
      }}
    >
      <img src={`${navigation?.logo?.url}`} />
      <h2>
        Du bist der Erste der das Handy seitlich dreht. Dreh es mal wieder
        zurück bitte. <br />
        applepie Funktioniert nur hochkant.🙂
      </h2>
    </div>
  );
};
Services.getInitialProps = async (context: NextPageContext) => {
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

  if (context.query.lang === "de") {
    response1 = await client.query({ query: navigation_de });
    response_footer = await client.query({ query: footer_de });
  } else {
    response1 = await client.query({ query: navigation_en });
    response_footer = await client.query({ query: footer_en });
  }

  return {
    navigation: response1.data.navigation as NavType,
    footer: response_footer.data.footer as Footer,
    isMobile,
  };
};
export default withTranslate(Services); // <- component is wrapped with a HOC
