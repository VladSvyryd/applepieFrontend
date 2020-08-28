import React from "react";
import Head from "next/head";
import { getLanguage } from "../util/translation/defineLanguage";
import { Language } from "../types/types";
import { useStoreActions } from "../hooks";
import { useRouter } from "next/router";

const Index: React.FC = () => {
  const router = useRouter();

  const setCurrentLanguage = useStoreActions(
    (actions) => actions.language.setCurrentLanguage
  );
  React.useEffect(() => {
    const myLang = getLanguage();
    setCurrentLanguage(myLang);
    console.log("page_language", Language[myLang]);

    // window.location.replace(`/${Language[myLang]}`);
    router.push(`/${Language[myLang]}`);
  }, []);
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
};

export default Index;
