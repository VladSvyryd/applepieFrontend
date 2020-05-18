import { useStoreActions, useStoreState } from "../../hooks";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Language, locales } from "../../types/types";

export default () => {
  const router = useRouter();
  // const router = useRouter();
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  // Pull out actions from our store
  const setCurrentLanguage = useStoreActions(
    (actions) => actions.language.setCurrentLanguage
  );
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      localStorage.setItem("applepieLanguage", event.target.value);
      setCurrentLanguage(+event.target.value);
      const regex = new RegExp(
        `^/(${locales.map((i) => Language[i]).join("|")})`
      );
      router.push(
        router.pathname,
        router.asPath.replace(regex, `/${Language[+event.target.value]}`)
      );
    },
    [router]
  );

  return (
    <form>
      <label
        style={{
          textDecoration: !currentLanguage ? `underline` : "none",
        }}
      >
        <input
          type="radio"
          value="0"
          checked={currentLanguage === 0}
          onChange={(e) => handleChange(e)}
          style={{ display: "none" }}
        />
        EN
      </label>
      {" | "}
      <label
        style={{
          textDecoration: currentLanguage ? `underline` : "none",
        }}
      >
        <input
          type="radio"
          value="1"
          checked={currentLanguage === 1}
          onChange={(e) => handleChange(e)}
          style={{ display: "none" }}
        />
        DE
      </label>
    </form>
  );
};
