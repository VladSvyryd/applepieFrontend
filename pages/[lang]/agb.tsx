import React from "react";
import styles from "../../pageStyles/agb.module.scss";
import Layout from "../../components/Layout/Layout";
import withTranslate from "../../components/HOC/withTranslate";
import { client } from "../_app";
import { NextPageContext, NextPage } from "next";
import { navigation_en, navigation_de } from "../../queries/queries";
import { NavType } from "../../types/types";

const agb: NextPage<any> = (props) => {
  return (
    <Layout navigation={props.navigation} verticalFooter={true} simple_header>
      <div className={`${styles.section}  `}>
        <h1>
          <span style={{ fontWeight: 400 }}>
            Allgemeine Gesch&auml;ftsbedingungen
          </span>
        </h1>
        <p>
          <strong>
            Allgemeine Gesch&auml;ftsbedingungen von der Digitalagentur
            applepie, Berlin Inh. Erdem G&uuml;ner
          </strong>
        </p>

        <p>
          <strong>Stand: 01.08.2020</strong>
        </p>

        <ol>
          <h5>
            <li>
              <strong> Gegenstand des Vertrages</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>1.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die nachstehenden allgemeinen Gesch&auml;ftsbedingungen gelten
            f&uuml;r alle Rechtsgesch&auml;fte von der Digitalagentur applepie
            Inh. Erdem G&uuml;ner, nachfolgend &bdquo;Agentur&ldquo; genannt,
            mit ihren Vertragspartnern, nachstehend in Kurzform
            &bdquo;Kunde&ldquo; genannt. Von diesen Gesch&auml;ftsbedingungen
            abweichende Bedingungen des Kunden werden von der Agentur nur nach
            gesonderter und schriftlicher Anerkennung akzeptiert.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>1.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Alle Vereinbarungen, die zwischen Agentur und Kunde zwecks
            Ausf&uuml;hrung eines Auftrages getroffen werden, sind in
            schriftlicher Form zu vereinbaren. &Auml;nderungen, Erg&auml;nzungen
            und Nebenabreden bed&uuml;rfen zu ihrer Wirksamkeit der Schriftform.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>1.3.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Diese Gesch&auml;ftsbedingungen gelten auch f&uuml;r alle
            k&uuml;nftigen Gesch&auml;ftsbeziehungen mit dem Kunden, auch wenn
            sie nicht nochmals ausdr&uuml;cklich vereinbart werden.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>1.4.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Agentur erbringt Dienstleistungen aus den Bereichen Beraten,
            Konzept, Planen, Gestalten, Produktion, Werbeschaltungen jeglicher
            Werbema&szlig;nahmen, Programmierung und Online-Marketing sowie
            sonstige Leistungen nach Absprache. Die detaillierten Beschreibungen
            der zu erbringenden Dienstleistungen ergeben sich aus den
            Ausschreibungsunterlagen, Briefings, Projektvertr&auml;gen, sowie
            deren Anlagen und Leistungsbeschreibungen der Agentur.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={2}>
          <h5>
            <li>
              <strong>
                Vertragsbestandteile und &Auml;nderungen des Vertrags
              </strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>2.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Grundlage f&uuml;r die Arbeit der Agentur und Vertragsbestandteil
            ist neben dem Projektvertrag und seinen Anlagen, das vom Kunden der
            Agentur auszuh&auml;ndigende Briefing. Wird das Briefing vom Kunden
            der Agentur m&uuml;ndlich oder fernm&uuml;ndlich mitgeteilt, so
            erstellt die Agentur &uuml;ber den Inhalt des Briefings ein
            Re-Briefing, welches dem Kunden innerhalb von 5 Werktagen nach der
            m&uuml;ndlichen oder fernm&uuml;ndlichen Mitteilung &uuml;bergeben
            wird. Dieses Re-Briefing wird verbindlicher Vertragsbestandteil,
            wenn der Kunde diesem Re-Briefing nicht innerhalb von 5 Werktagen
            Tagen schriftlich widerspricht.
          </span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Der Projektvertrag kommt bei Annahme eines Angebotes zu Stande oder
            bei Abschluss eines Projektes bzw. Agenturvertrages. Diese(r) kann
            schriftlich oder m&uuml;ndlich erfolgen.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>2.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Jede &Auml;nderung und/oder Erg&auml;nzung des Vertrages und/oder
            seiner Bestandteile bedarf der Schriftform. Dadurch entstehende
            Mehrkosten hat der Kunde zu tragen.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>2.3.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Ereignisse h&ouml;herer Gewalt berechtigen die Agentur, das vom
            Kunden beauftragte Projekt um die Dauer der Behinderung und einer
            angemessenen Anlaufzeit hinauszuschieben. Ein Schadensersatzanspruch
            des Kunden gegen die Agentur resultiert daraus nicht. Dies gilt auch
            dann, wenn dadurch f&uuml;r den Kunden wichtige Termine und/oder
            Ereignisse nicht eingehalten werden k&ouml;nnen und/oder nicht
            eintreten.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={3}>
          <h5>
            <li>
              <strong> Urheber- und Nutzungsrechte</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>3.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            S&auml;mtliche von der Agentur angefertigten Entw&uuml;rfe,
            Zeichnungen, Druckvorlagen, Konzepte, Ideen etc. sind
            urheberrechtlich gesch&uuml;tzte Werke i. S. d. &sect; 2 UrhG, und
            zwar selbst dann, wenn diese nicht die Erfordernisse des &sect; 2
            UrhG erf&uuml;llen.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>3.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            S&auml;mtliche Leistungen der Agentur d&uuml;rfen deshalb nicht ohne
            Zustimmung der Agentur genutzt, bearbeitet oder ge&auml;ndert
            werden. Jede Nachahmung, auch die von Teilen von Entw&uuml;rfen,
            Zeichnungen, Druckvorlagen, Konzepten, Ideen etc. ist nicht
            zul&auml;ssig. Ein Versto&szlig; gegen diese Bestimmung berechtigt
            die Agentur, eine Vertragsstrafe in H&ouml;he des 2,5 fachen Satzes
            der vereinbarten Verg&uuml;tung pro Versto&szlig; zu verlangen. Ist
            eine solche Verg&uuml;tung nicht vereinbart, gilt die nach dem
            Tarifvertrag f&uuml;r Design-Leistungen SDSt/AGD (neueste Fassung)
            &uuml;bliche Verg&uuml;tung als vereinbart.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>3.3.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Agentur &uuml;bertr&auml;gt dem Auftraggeber die f&uuml;r den
            jeweiligen Zweck erforderlichen Nutzungsrechte. Soweit nichts
            anderes vereinbart ist, wird jeweils nur das einfache Nutzungsrecht
            &uuml;bertragen. Die Rechte gehen erst mit vollst&auml;ndiger
            Zahlung des Gesamtauftrages auf den Auftraggeber &uuml;ber. Die
            &Uuml;bertragung einger&auml;umter Nutzungsrechte an Dritte (z.B.
            Druckereien, Agenturen) und/oder Mehrfachnutzungen sind, soweit
            nicht im Erstauftrag geregelt, honorarpflichtig und bed&uuml;rfen
            der Einwilligung der Agentur.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>3.4.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Agentur darf, die von ihr entwickelten Werbemittel angemessen
            und branchen&uuml;blich signieren und den erteilten Auftrag f&uuml;r
            Eigenwerbung publizieren. Diese Signierung und werbliche Verwendung
            k&ouml;nnen durch eine entsprechende gesonderte Vereinbarung
            zwischen Agentur und Kunde ausgeschlossen werden.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>3.5.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            &Uuml;ber den Umfang der Nutzung steht der Agentur ein
            Auskunftsanspruch zu.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={4}>
          <h5>
            <li>
              <strong> Verg&uuml;tung</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>4.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Es gilt die im Vertrag vereinbarte Verg&uuml;tung. Zahlungen sind,
            wenn nicht anders vertraglich geregelt, zu 50 % im Voraus und 50 %
            nach Fertigstellung/&Uuml;bergabe f&auml;llig. Bei reinen
            Produktionsleistungen (z. B. Print-Produktionen), die von
            Agenturseite extern eingekauft werden m&uuml;ssen, oder beim Kauf
            eines fertigen Produktes werden 100 % der zu zahlenden Summe im
            Voraus in Rechnung gestellt. Zahlungen sind, wenn nicht anders
            vereinbart, innerhalb von 7 Tagen nach Rechnungsstellung ohne jeden
            Abzug f&auml;llig. Nach Eingang der vollen Rechnungssumme bei der
            Agentur, wird das bestellte Produkt &uuml;bersandt bzw. die
            Dienstleistung ausgef&uuml;hrt. Bei &Uuml;berschreitung der
            Zahlungstermine steht der Agentur ohne weitere Mahnung ein Anspruch
            auf Verzugszinsen in H&ouml;he von 10 % &uuml;ber dem Basiszinssatz
            nach &sect;1 des Diskontsatz&uuml;berleitungsgesetzes zu. Das Recht
            zur Geltendmachung eines dar&uuml;berhinausgehenden Schadens bleibt
            von dieser Regelung unber&uuml;hrt.
          </span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Mahnkosten und die Kosten &ndash; auch au&szlig;ergerichtlicher
            &ndash; anwaltlicher Investitionen gehen zu Lasten des Kunden.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>4.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Erstreckt sich die Erarbeitung der vereinbarten Leistungen &uuml;ber
            einen l&auml;ngeren Zeitraum oder umfasst mehrere Einheiten so kann
            die Agentur dem Kunden Abschlagszahlungen &uuml;ber die bereits
            erbrachten Teilleistungen in Rechnung stellen. Diese Teilleistungen
            m&uuml;ssen nicht in einer f&uuml;r den Kunden nutzbaren Form
            vorliegen und k&ouml;nnen auch als reine Arbeitsgrundlage auf Seiten
            der Agentur verf&uuml;gbar sein.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>4.3.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Bei &Auml;nderungen oder Abbruch von Auftr&auml;gen, Arbeiten und
            dergleichen durch den Kunden und/oder wenn sich die Voraussetzungen
            f&uuml;r die Leistungserstellung &auml;ndert, werden der Agentur
            alle dadurch anfallenden Kosten ersetzet und die Agentur von
            jeglichen Verbindlichkeiten gegen&uuml;ber Dritten freigestellt.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>4.4.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Bei einem R&uuml;cktritt des Kunden von einem Auftrag vor Beginn des
            Projektes, berechnet die Agentur dem Kunden folgende
            Prozents&auml;tze vom urspr&uuml;nglich vertraglich geregelten
            Honorar als Stornogeb&uuml;hr: bis zwei Wochen vor Beginn des
            Auftrages 25 %, ab zwei Wochen vor Beginn 50 %.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>4.5.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Alle in Angeboten und Auftr&auml;gen genannten Preise und die daraus
            resultierend zu zahlende Betr&auml;ge verstehen sich zuz&uuml;glich
            der gesetzlich g&uuml;ltigen Umsatzsteuer in der jeweils geltenden
            H&ouml;he. K&uuml;nstlersozialabgabe, Z&ouml;lle, oder auch sonstige
            nachtr&auml;glich entstandenen Abgaben werden an den Kunden
            weiterberechnet.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>4.6.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Einwendungen gegen Entgeltabrechnungen von Agentur sind sofort nach
            Rechnungserhalt, aber sp&auml;testens 2 Wochen nach Abrechungs- oder
            Rechnungsdatum, ohne dass hierdurch jedoch die F&auml;lligkeit
            ber&uuml;hrt wird, zu erheben. Die Unterlassung rechtzeitiger
            Einwendungen gilt als Genehmigung.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={5}>
          <h5>
            <li>
              <strong> Eigentumsvorbehalt</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>5.1</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Agentur beh&auml;lt sich das Eigentum an den
            Liefergegest&auml;nden bis zur vollst&auml;ndigen Zahlung vor.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>5.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            An Entw&uuml;rfen und Werkzeichnungen, insbesondere bei Leistungen
            die dem Urheberrecht unterliegen (siehe 3.1.), werden nur
            Nutzungsrechte einger&auml;umt, nicht jedoch Eigentumsrechte
            &uuml;bertragen.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>5.3.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Originale sind daher in angemessener Frist unbesch&auml;digt
            zur&uuml;ckzugeben sofern keine andere Vereinbarung getroffen wurde.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>5.4</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Zusendung und etwaige R&uuml;cksendungen der Arbeiten gehen auf
            Gefahr und Rechnung des Kunden.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>5.5.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Agentur ist nicht verpflichtet Dateien, Quelldateien oder
            Layouts, die im Computer erstellt wurden an den Kunden
            herauszugeben. W&uuml;nscht der Kunde die Herausgabe der
            Computerdaten oder Quelldaten, so ist dies gesondert zu vereinbaren
            und zu verg&uuml;ten. Hat die Agentur dem Kunden Computerdateien zur
            Verf&uuml;gung gestellt, d&uuml;rfen diese nur mit vorheriger
            Zustimmung der Agentur ge&auml;ndert werden.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={6}>
          <h5>
            <li>
              <strong> Sonderleistungen, Neben- und Reisekosten</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>6.1</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Sonderleistungen wie z. B. das Korrekturlesen von Texten werden nach
            bestem Wissen sorgf&auml;ltig gelesen. Umarbeiten, &Auml;nderungen
            von Reinzeichnungen, vorbereitende Notwendigkeiten zur
            Auftragsabwicklung, Druck&uuml;berwachung etc. werden dem
            Zeitaufwand entsprechend gesondert berechnet.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>6.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Werden mehr Konzeptionen bzw. Entw&uuml;rfe von Werbemitteln auf
            Wunsch des Kunden angefertigt, so werden diese gesondert in Rechnung
            gestellt. Die Anzahl der Entw&uuml;rfe wird im Angebot festgehalten
            und bedarf eines ausf&uuml;hrlichen Briefings des Kunden. In der
            Regel beinhaltet ein Angebot 3 Entw&uuml;rfe f&uuml;r Werbemittel
            und ein Werbekonzept.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>6.3.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Auslagen f&uuml;r technische Nebenkosten, insbesondere speziellen
            Materials, Anfertigungen von Modellen, Fotos, Zwischenaufnahmen,
            Reproduktionen, Fotosatz, Druck etc. sind vom Kunden zu erstatten.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>6.4.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Kosten f&uuml;r Reisen, die im Zusammenhang mit dem Auftrag zu
            unternehmen sind, werden nur in Rechnung gestellt, wenn diese mit
            dem Kunden vereinbart worden sind.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={7}>
          <h5>
            <li>
              <strong> Zusatzleistungen</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>7.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Unvorhersehbarer Mehraufwand bedarf der gegenseitigen Absprache und
            gegebenenfalls der Nachhonorierung.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>7.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Produktions&uuml;berwachung externer Leistungen (z.B. Druck)
            durch die Agentur erfolgt nur Aufgrund besonderer Vereinbarungen.
            Bei der &Uuml;bernahme der Produktions&uuml;berwachung ist die
            Agentur berechtigt, nach eigenem Ermessen &ndash; unter
            Ber&uuml;cksichtigung der Vorstellungen und Vorgaben des Kunden
            &ndash; die notwendigen Entscheidungen zu treffen und entsprechende
            Anweisungen zu erteilen. F&uuml;r diesen Aufwand berechnet die
            Agentur eins Handling pauschale.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>7.3.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Von allen vervielf&auml;ltigten Arbeiten werden der Agentur 10-20
            ein- wandfreie ungefaltete Belege (bei wertvollen St&uuml;cken eine
            Angemessene Zahl) unentgeltlich &uuml;berlassen. Die Agentur ist
            berechtigt diese St&uuml;cke zum Zweck der Eigenwerbung zu
            verwenden.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={8}>
          <h5>
            <li>
              <strong> Kennzeichnung</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>8.1</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Agentur ist berechtigt, auf allen Werbemitteln und bei allen
            Werbema&szlig;nahmen auf den Urheber hinzuweisen, ohne dass dem
            Kunden dadurch ein Entgeltanspruch zusteht.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>8.2</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Agentur ist berechtigt auf ihren Internet-Webseiten mit Namen
            und Firmenlogo auf die Gesch&auml;ftsbeziehung hinzuweisen.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={9}>
          <h5>
            <li>
              <strong> Lieferfristen</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>9.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Lieferverpflichtungen der Agentur sind erf&uuml;llt, sobald die
            Arbeiten und Leistungen von der Agentur zur Versendung gebracht
            worden sind. Das Risiko der &Uuml;bermittlung (z.B.
            Besch&auml;digung, Verlust oder Verz&ouml;gerung), gleich mit
            welchem Medium &uuml;bermittelt wird, tr&auml;gt der Kunde.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>9.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Lieferfristen und Liefertermine sind nur verbindlich, wenn der Kunde
            etwaige Mitwirkungspflicht (z. B. Beschaffung von Unterlagen,
            Freigaben, Bereitstellung von Informationen, Erstellung von
            Leistungskatalogen/Pflichtheften ordnungsgem&auml;&szlig;
            erf&uuml;llt hat und die Termine von Agentur schriftlich
            best&auml;tigt worden sind.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>9.3.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Durch Verz&ouml;gerung auf Kundenseite kann eine fristgerechte
            Terminhaltung nicht mehr gew&auml;hrleistet werden.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>9.4.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Von der Agentur zur Verf&uuml;gung gestellte Vorlagen und
            Entw&uuml;rfe sind nach Farb-, Bild-, Strich und Tongestaltung erst
            dann verbindlich, wenn ihre entsprechende
            Realisierungsm&ouml;glichkeit schriftlich von Agentur best&auml;tigt
            worden ist.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>9.5.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Ger&auml;t die Agentur mit ihren Leistungen in Verzug, so ist ihr
            zun&auml;chst eine angemessene Nachfrist zu gew&auml;hren. Nach
            fruchtlosem Ablauf der Nachfrist kann der Kunde vom Vertrag
            zur&uuml;cktreten. Ersatz des Verzugsschadens kann nur bis zur
            H&ouml;he des Auftrag wertes (Eigenleistung ausschlie&szlig;lich
            Vorleistung und Material) verlangt werden.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={10}>
          <h5>
            <li>
              <strong> Geheimhaltungspflicht</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>10.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Agentur verpflichtet sich, s&auml;mtliche ihr im Zusammenhang
            mit dem Vertragsabschluss zug&auml;nglichen Informationen und
            Unterlagen, die als vertraulich bezeichnet werden, oder nach
            sonstigen Umst&auml;nden eindeutig als Gesch&auml;fts- oder
            Betriebsgeheimnisse des Kunden erkennbar sind, geheim zu halten und
            sie &ndash; soweit nicht zur Erreichung des Vertragszweckes geboten
            &ndash; weder aufzuzeichnen noch weiterzugeben.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>10.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Entsprechende Verpflichtungen gelten ebenfalls f&uuml;r Kunden in
            Bezug auf Gesch&auml;ft &ndash; und Betriebsgeheimnisse der Agentur
            &ndash; dies gilt insbesondere auch f&uuml;r die w&auml;hrend der
            Entwicklungsphase/Zusammenarbeit zur Kenntnis gebrachten Ideen und
            Konzepte.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>10.3.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Der Kunde ist damit einverstanden, dass pers&ouml;nliche Daten
            (Bestandsdaten) und andere Informationen, die sein Nutzungsverhalten
            betreffen (Verbindungsdaten), wie z. B. der Zeitpunkt, die Anzahl
            und Dauer der Verbindungen, Zugangsw&ouml;rter, Up- und Downloads,
            von Agentur w&auml;hrend der Dauer des Vertrages gespeichert werden,
            soweit dies zur Erf&uuml;llung des Vertragszweckes erforderlich ist.
            Mit der Erhebung und Speicherung erkl&auml;rt der Kunde sein
            Einverst&auml;ndnis. Die erhobenen Bestandsdaten verarbeitet und
            nutzt die Agentur auch zur Beratung seiner Kunden, zur Eigenwerbung
            und zur Marktforschung f&uuml;r eigene Zwecke sowie zur
            bedarfsgerechten Gestaltung seiner Leistung. Der Kunde kann einer
            solchen Nutzung der Daten widersprechen. Die Agentur wird diese
            Daten ohne dessen Einverst&auml;ndnis nicht an Dritte weiterleiten.
            Dies gilt nur insoweit nicht, als das die Daten ohnehin
            &ouml;ffentlich zug&auml;nglich sind oder die Agentur gesetzlich
            verpflichtet ist, Dritte insbesondere Strafverfolgungsbeh&ouml;rden,
            solche Daten zu offenbaren oder soweit international anerkannte
            technische Normen dies vorsehen und der Kunde nicht widerspricht.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={11}>
          <h5>
            <li>
              <strong> Pflichten des Kunden</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>11.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Der Kunde stellt der Agentur alle f&uuml;r die Durchf&uuml;hrung des
            Projekts ben&ouml;tigten Daten und Unterlagen unentgeltlich zur
            Verf&uuml;gung. Alle Arbeitsunterlagen werden von der Agentur
            sorgsam behandelt, vor dem Zugriff Dritter gesch&uuml;tzt, nur zur
            Erarbeitung des jeweiligen Auftrages genutzt und nach Beendigung des
            Auftrages an den Kunden zur&uuml;ckgegeben.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>11.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Der Kunde wird im Zusammenhang mit einem beauftragten Projekt,
            Auftragsvergaben an andere Agenturen oder Dienstleister nur nach
            R&uuml;cksprache und im Einvernehmen mit der Agentur erteilen.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={12}>
          <h5>
            <li>
              <strong> Gew&auml;hrleistung und Haftung</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>12.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Von der Agentur gelieferten Arbeiten und Leistungen hat der Kunde
            unverz&uuml;glich nach Erhalt, jedenfalls jedoch binnen von drei
            Werktagen und in jedem Falle aber vor einer Weitergabe, zu
            pr&uuml;fen und M&auml;ngel unverz&uuml;glich nach Entdeckung zu
            r&uuml;gen, Unterbleibt die unverz&uuml;gliche &Uuml;berpr&uuml;fung
            oder M&auml;ngelanzeige, bestehen keine Anspr&uuml;che des Kunden.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>12.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Bei gerechtfertigter M&auml;ngelr&uuml;ge werde die M&auml;ngel in
            angemessener Frist behoben.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>12.3.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Das Risiko der rechtlichen Zul&auml;ssigkeit, der durch die Agentur
            erarbeiteten und durchgef&uuml;hrten Ma&szlig;nahmen wird vom Kunden
            getragen. Das gilt insbesondere f&uuml;r den Fall, dass die Aktionen
            und Ma&szlig;nahmen gegen Vorschriften des Wettbewerbsrechts, des
            Urheberrechts und der speziellen Werberechtsgesetze versto&szlig;en.
            Die Agentur ist jedoch verpflichtet, auf rechtliche Risiken
            hinzuweisen, sofern ihr diese bei ihrer T&auml;tigkeit bekannt
            werden. Der Kunde stellt die Agentur von Anspr&uuml;chen Dritter
            frei, wenn die Agentur auf ausdr&uuml;cklichen Wunsch des Kunden
            gehandelt hat, obwohl sie dem Kunden Bedenken im Hinblick auf die
            Zul&auml;ssigkeit der Ma&szlig;nahmen mitgeteilt hat. Die Anmeldung
            solcher Bedenken durch die Agentur beim Kunden hat unverz&uuml;glich
            nach bekannt werden in schriftlicher Form zu erfolgen. Erachtet die
            Agentur f&uuml;r eine durchzuf&uuml;hrenden Ma&szlig;nahmen eine
            wettbewerbsrechtliche Pr&uuml;fung durch eine besonders sachkundige
            Person oder Institution f&uuml;r erforderlich, so tr&auml;gt nach
            Absprache mit der Agentur die Kosten hierf&uuml;r der Kunde.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>12.4</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Mit der Genehmigung von Entw&uuml;rfen, Reinzeichnungen oder
            Werkzeichnungen durch den Kunden &uuml;bernimmt dieser die
            Verantwortung f&uuml;r die Richtigkeit f&uuml;r Bild und Text.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>12.5.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            F&uuml;r die von Kunden freigegebene Entw&uuml;rfe, Reinzeichnungen
            oder Werkzeichnungen entf&auml;llt jede Haftung der Agentur.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>12.6.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            F&uuml;r die wettbewerbs- oder warenzeichenrechtliche
            Zul&auml;ssigkeit und Eintragsf&auml;higkeit der Entw&uuml;rfe
            haftet Agentur nicht.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>12.7.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Agentur &uuml;bernimmt keine Haftung f&uuml;r die von Kunden
            gestellten Bilder, Daten und Schriften.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>12.8.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Agentur haftet in keinem Fall wegen der in den
            Werbema&szlig;nahmen enthaltenen Sachaussagen &uuml;ber Produkte und
            Leistungen des Kunden. Die Agentur haftet auch nicht f&uuml;r die
            patent-, urheber- und markenrechtliche Schutz- oder
            Eintragungsf&auml;higkeit, der im Rahmen des Auftrages gelieferten
            Ideen, Anregungen, Vorschl&auml;ge, Konzeptionen und Entw&uuml;rfe.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>12.9.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Agentur haftet nur f&uuml;r Sch&auml;den, die sie oder ihre
            Erf&uuml;llungsgehilfen vors&auml;tzlich oder grob fahrl&auml;ssig
            herbeigef&uuml;hrt haben. Die Haftung der Agentur wird auf den
            einmaligen Ertrag der Agentur, der sich aus dem jeweiligen Auftrag
            ergibt, beschr&auml;nkt. Die Haftung der Agentur f&uuml;r
            Mangelfolgesch&auml;den aus dem Rechtsgrund der positiven
            Vertragsverletzung ist ausgeschlossen, wenn sich die Haftung der
            Agentur nicht aus einer Verletzung, der f&uuml;r die Erf&uuml;llung
            des Vertragszweckes wesentlichen Pflichten ergibt.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>12.10.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Soweit die Agentur notwendige Fremdleistungen in Auftrag gibt, sind
            die jeweiligen Auftragnehmer/Vertragspartner keine
            Erf&uuml;llungsgehilfen der Agentur. Eine Haftung f&uuml;r die
            Leistungen und Arbeitsergebnisse solcher
            Auftragnehmer/Vertragspartner wird ausgeschlossen, soweit den
            gesetzlichen Vorschriften nichts entgegensteht.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={13}>
          <h5>
            <li>
              <strong> Verwertungsgesellschaften</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>13.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Der Kunde verpflichtet sich, eventuell anfallende Geb&uuml;hren an
            Verwertungsgesellschaften wie beispielsweise an die Gema
            abzuf&uuml;hren. Werden diese Geb&uuml;hren von der Agentur
            verauslagt, so verpflichtet sich der Kunde, diese der Agentur gegen
            Nachweis zu erstatten. Dies kann je nach Absprache sofort oder auch
            nach Beendigung des Vertragsverh&auml;ltnisses erfolgen.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={14}>
          <h5>
            <li>
              <strong> Leistungen Dritter</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>14.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Von Agentur eingeschaltete Freie Mitarbeiter oder Dritte sind
            Erf&uuml;llungsgehilfen- oder Verrichtungsgehilfen der Agentur. Der
            Kunde verpflichtet sich diese, im Rahmen der
            Auftragsdurchf&uuml;hrung von Agentur eingesetzten Mitarbeiter, im
            Laufe der auf den Abschluss des Auftrages folgenden 12 Monate ohne
            Mitwirkung der Agentur weder unmittelbar noch mittelbar mit
            Projekten zu beauftragen.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={15}>
          <h5>
            <li>
              <strong> Arbeitsunterlagen und elektronische Daten</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>15.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Alle Arbeitsunterlagen, elektronische Daten und Aufzeichnungen, die
            im Rahmen der Auftragserarbeitung auf Seiten der Agentur angefertigt
            werden, verbleiben bei der Agentur. Die Herausgabe dieser Unterlagen
            und Daten kann vom Kunden nicht gefordert werden. Die Agentur
            schuldet mit der Bezahlung des vereinbarten Honorars die vereinbarte
            Leistung, nicht jedoch die zu diesem Ergebnis f&uuml;hrenden
            Zwischenschritte in Form von Skizzen, Entw&uuml;rfen,
            Produktionsdaten etc.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={16}>
          <h5>
            <li>
              <strong> Media-Planung und Media-Durchf&uuml;hrung</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>16.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Beauftragte Projekte im Bereich Media-Planung besorgt die Agentur
            nach bestem Wissen und Gewissen auf Basis der ihr zug&auml;nglichen
            Unterlagen der Medien und der allgemein zug&auml;nglichen
            Marktforschungsdaten. Ein bestimmter werblicher Erfolg schuldet die
            Agentur dem Kunden durch diese Leistungen nicht.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>16.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Bei umfangreichen Media-Leistungen ist die Agentur nach Absprache
            berechtigt, einen bestimmten Anteil der Fremdkosten dem Kunden in
            Rechnung zu stellen und die Ein Buchung bei den entsprechenden
            Medien erst nach Zahlungseingang vorzunehmen. Hierf&uuml;r wird eine
            Handlings pauschale in Rechnung gestellt. F&uuml;r eine eventuelle
            Nichteinhaltung eines Schalttermins durch einen versp&auml;teten
            Zahlungseingang haftet die Agentur nicht. Ein Schadensersatzanspruch
            des Kunden gegen die Agentur entsteht dadurch nicht.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={17}>
          <h5>
            <li>
              <strong> Vertragsdauer, K&uuml;ndigungsfristen</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>17.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Der Vertrag tritt mit seiner Unterzeichnung in Kraft. Er wird
            f&uuml;r die im Vertrag genannte Vertragslaufzeit bzw. f&uuml;r ein
            bestimmtes Projekt abgeschlossen. Ist der Vertrag auf unbestimmte
            Zeit geschlossen, kann dieser mit einer Frist von drei Monaten von
            beiden Seiten zum Monatsende gek&uuml;ndigt werden. Das Recht zur
            fristlosen K&uuml;ndigung aus wichtigem Grund bleibt von dieser
            Regelung unber&uuml;hrt. Eine K&uuml;ndigung bedarf der Schriftform.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={18}>
          <h5>
            <li>
              <strong> Streitigkeiten</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>18.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Kommt es im Laufe oder nach Beendigung eines Auftrages zu einem
            Streitfall bez&uuml;glich des beauftragten Projektes, so ist vor der
            Einleitung eines gerichtlichen Verfahrens ein
            au&szlig;ergerichtliches Mediationsverfahren zu durchlaufen. Bei
            Streitigkeiten in Fragen der Qualit&auml;tsbeurteilung oder bei der
            H&ouml;he der Honorierung werden externe Gutachten erstellt um
            m&ouml;glichst eine au&szlig;ergerichtliche Einigung zu erzielen.
            Die Kosten hierf&uuml;r werden von Kunden und Agentur geteilt.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>&nbsp;</span>
        </p>
        <ol start={19}>
          <h5>
            <li>
              <strong> Schlussbestimmungen</strong>
            </li>
          </h5>
        </ol>
        <p>
          <span style={{ fontWeight: 400 }}>19.1.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Der Kunde ist nicht dazu berechtigt, Anspr&uuml;che aus dem Vertrag
            abzutreten.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>19.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Die Allgemeinen Gesch&auml;ftsbedingungen des Kunden werden nicht
            Vertragsbestandteil.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>19.2.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Eine Aufrechnung oder die Geltendmachung eines
            Zur&uuml;ckbehaltungsrechts durch den Kunden ist nur mit anerkannten
            oder rechtskr&auml;ftig festgestellten Gegenanspr&uuml;chen
            zul&auml;ssig.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>18.3.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Es gilt das Recht der Bundesrepublik Deutschland. Erf&uuml;llungsort
            und Gerichtsstand ist Berlin.
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 400 }}>19.4.</span>
          <span style={{ fontWeight: 400 }}>
            <br />
          </span>
          <span style={{ fontWeight: 400 }}>
            Sollte eine Bestimmung dieser Allgemeinen Gesch&auml;ftsbedingungen
            ganz oder teilweise unwirksam sein oder ihre Rechtswirksamkeit zu
            einem sp&auml;teren Zeitpunkt verlieren, so wird hierdurch die
            G&uuml;ltigkeit der &uuml;brigen Bestimmungen nicht ber&uuml;hrt.
            Anstelle der unwirksamen Bestimmung soll im Wege der
            Vertragsanpassung eine andere angemessene Regelung gelten, die
            wirtschaftlich dem am N&auml;chsten kommt, was die Vertragsparteien
            gewollt h&auml;tten, wenn ihnen die Unwirksamkeit der Regelung
            bekannt gewesen w&auml;re.
          </span>
        </p>
        <p>
          <br />
          <br />
        </p>
      </div>
    </Layout>
  );
};

agb.getInitialProps = async (context: NextPageContext) => {
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
  if (context.query.lang === "de") {
    response1 = await client.query({ query: navigation_de });
  } else {
    response1 = await client.query({ query: navigation_en });
  }

  return {
    navigation: response1.data.navigation as NavType,
    isMobile,
  };
};
export default withTranslate(agb);
