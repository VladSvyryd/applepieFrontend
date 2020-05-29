import { useStoreActions, useStoreState } from "../../hooks";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Language, locales } from "../../types/types";
import { motion } from "framer-motion";

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
  const [toggle, setToggle] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setToggle(false);
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
  const activeCarouselIndex = useStoreState(
    (state) => state.swiper.activeIndex
  );
  const invertedSlides = useStoreState((state) => state.swiper.invertedSlides);

  const langAnim = {
    in: { opacity: 0, y: +15 },
    out: { opacity: 1, y: 0 },
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: "1",
      }}
    >
      <div onClick={() => setToggle(!toggle)}>
        {String(Language[currentLanguage]).toUpperCase()}
      </div>
      <motion.form
        animate={!toggle ? "in" : "out"}
        variants={langAnim}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: "1",
        }}
        className={`${
          invertedSlides.some((s) => s === activeCarouselIndex)
            ? "invertedTextColorBySlide"
            : ""
        }`}
      >
        {currentLanguage === 1 && (
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
        )}
        {currentLanguage === 0 && (
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
        )}
      </motion.form>
    </div>
  );
};
