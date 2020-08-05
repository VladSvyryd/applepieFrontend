import React from "react";
import styles from "../../pageStyles/agb.module.scss";
import Layout from "../../components/Layout/Layout";
import withTranslate from "../../components/HOC/withTranslate";
import { client } from "../_app";
import { NextPageContext, NextPage } from "next";
import {
  landing_de,
  landing_en,
  navigation_de,
  navigation_en,
} from "../../queries/queries";
import { HomePage, NavType } from "../../types/types";

const datenschutz: NextPage<any> = (props) => {
  const { pageFromCMS } = props;
  return (
    <Layout
      navigation={props.navigation}
      verticalFooter={true}
      known_by={pageFromCMS.known_by}
      social_links={pageFromCMS.social_links}
      known_by_title={pageFromCMS.known_by_title}
      simple_header
    >
      <div className={`${styles.section}`}>
        <div>
          <h1>Impressum</h1>
        </div>
        <h5>Angaben gem&auml;&szlig; &sect; 5 TMG</h5>
        <p>
          Erdem G&uuml;ner
          <br />
          applepie
          <br />
          Frauenfelder Weg 7a
          <br />
          13407 Berlin
        </p>

        <h5>Kontakt</h5>
        <p>
          Telefon: +49 30 98517194‬
          <br />
          Telefax: +49 30 98517188
          <br />
          E-Mail: erdem@applepie.berlin
        </p>

        <h5>Postadresse</h5>
        <p>
          Innsbrucker Str. 25
          <br />
          10825 Berlin
        </p>
        <h5>Umsatzsteuer-ID</h5>
        <p>
          Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect;27 a
          Umsatzsteuergesetz:
          <br />
          DE305465945
        </p>

        <h5>Berufsbezeichnung und berufsrechtliche Regelungen</h5>
        <p>
          Berufsbezeichnung: Digitalagentur
          <br />
          Zust&auml;ndige Kammer: <br />
          Verliehen durch: Deutschland
          <br />
          Es gelten folgende berufsrechtliche Regelungen: <br />
          Regelungen einsehbar unter:{" "}
          <a href="https://applepie.berlin/" target="_blank" rel="noopener">
            http://applepie.berlin/
          </a>
        </p>

        <h5>Verantwortlich f&uuml;r den Inhalt nach &sect; 55 Abs. 2 RStV</h5>
        <p>
          Erdem, G&uuml;ner
          <br />
          Frauenfelder Weg, 7a
          <br />
          13407, Berlin
        </p>

        <h5>Streitschlichtung</h5>
        <p>
          Die Europ&auml;ische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          .<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>

        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h5>Haftung f&uuml;r Inhalte</h5>
        <p>
          Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG
          f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder
          gespeicherte fremde Informationen zu &uuml;berwachen oder nach
          Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit
          hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab
          dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
          m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
          werden wir diese Inhalte umgehend entfernen.
        </p>
        <h5>Haftung f&uuml;r Links</h5>
        <p>
          Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf
          deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir
          f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen.
          F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige
          Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten
          Seiten wurden zum Zeitpunkt der Verlinkung auf m&ouml;gliche
          Rechtsverst&ouml;&szlig;e &uuml;berpr&uuml;ft. Rechtswidrige Inhalte
          waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
        <p>
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
          ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
        </p>
        <h5>Urheberrecht</h5>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die
          Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes
          bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw.
          Erstellers. Downloads und Kopien dieser Seite sind nur f&uuml;r den
          privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
        <p>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
          wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
          Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
          eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Inhalte umgehend entfernen.
        </p>

        <p>
          Quelle: <a href="https://www.e-recht24.de">eRecht24</a>
        </p>
      </div>
    </Layout>
  );
};

datenschutz.getInitialProps = async (context: NextPageContext) => {
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

  let response;
  let response1;
  if (context.query.lang === "de") {
    response = await client.query({ query: landing_de });
    response1 = await client.query({ query: navigation_de });
  } else {
    response = await client.query({ query: landing_en });
    response1 = await client.query({ query: navigation_en });
  }

  // const pageJSON = await res1.json();
  // console.log(json);
  console.log({ response });
  return {
    navigation: response1.data.navigation as NavType,
    pageFromCMS: response.data.homeDe as HomePage,
    isMobile,
  };
};
export default withTranslate(datenschutz);
