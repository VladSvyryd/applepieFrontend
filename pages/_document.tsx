import Document, {
  DocumentContext,
  Html,
  Main,
  NextScript,
  Head,
  DocumentInitialProps,
} from "next/document";

class MyDocument extends Document<{
  initialProps: DocumentInitialProps;
  language: string;
}> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const { query } = ctx;
    return { ...initialProps, language: query.lang };
  }
  render() {
    const { language } = this.props;
    console.log("language", language);
    return (
      <Html lang={language}>
        <Head />
        <Main />
        <NextScript />
      </Html>
    );
  }
}

export default MyDocument;
